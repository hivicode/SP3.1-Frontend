from flask import Flask, request, jsonify, send_from_directory, render_template, redirect, url_for, session
from flask_cors import CORS
from werkzeug.utils import secure_filename
import sqlite3
import os
import uuid
import json
from datetime import datetime
from functools import wraps

# =============================================================================
# CONFIGURATION
# =============================================================================


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "data.db")
UPLOAD_DIR = os.path.join(BASE_DIR, "static", "uploads")
ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png", "gif", "webp"}

app = Flask(__name__)
CORS(app)
app.secret_key = app.secret_key or "secret123"

# =============================================================================
# DATABASE + STORAGE
# =============================================================================

def ensure_dirs():
    os.makedirs(UPLOAD_DIR, exist_ok=True)


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON;")
    return conn


def init_db():
    conn = get_db()
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS properti (
            kode_rumah TEXT PRIMARY KEY,
            nama_rumah TEXT NOT NULL,
            alamat TEXT NOT NULL,
            kota TEXT NOT NULL,
            tipe TEXT NOT NULL,
            harga INTEGER NOT NULL,
            rating REAL DEFAULT 0,
            kamar_tidur INTEGER NOT NULL,
            kamar_mandi INTEGER NOT NULL,
            luas_tanah INTEGER NOT NULL,
            luas_bangunan INTEGER NOT NULL,
            garasi INTEGER NOT NULL,
            fitur TEXT,
            deskripsi TEXT
        )
        """
    )
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS properti_gambar (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            kode_rumah TEXT NOT NULL,
            filename TEXT NOT NULL,
            FOREIGN KEY (kode_rumah) REFERENCES properti(kode_rumah) ON DELETE CASCADE
        )
        """
    )
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS booking (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            kode_rumah TEXT NOT NULL,
            nama_depan TEXT NOT NULL,
            nama_belakang TEXT NOT NULL,
            email TEXT NOT NULL,
            telepon TEXT NOT NULL,
            metode_pembayaran TEXT NOT NULL,
            booking_fee INTEGER NOT NULL,
            status TEXT NOT NULL DEFAULT 'pending',
            dibuat_pada TEXT NOT NULL,
            FOREIGN KEY (kode_rumah) REFERENCES properti(kode_rumah) ON DELETE CASCADE
        )
        """
    )
    # Backfill status column if table existed before
    cols = conn.execute("PRAGMA table_info(booking)").fetchall()
    has_status = any(c[1] == "status" for c in cols)
    if not has_status:
        conn.execute("ALTER TABLE booking ADD COLUMN status TEXT NOT NULL DEFAULT 'pending'")
        conn.commit()
    conn.commit()
    # Backfill deskripsi kolom jika belum ada
    cols = conn.execute("PRAGMA table_info(properti)").fetchall()
    has_desc = any(c[1] == "deskripsi" for c in cols)
    if not has_desc:
        conn.execute("ALTER TABLE properti ADD COLUMN deskripsi TEXT")
        conn.commit()
    conn.close()


# =============================================================================
# SERIALIZATION + HELPERS
# =============================================================================
def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def parse_fitur(raw):
    if raw is None:
        return []
    if isinstance(raw, list):
        return [str(x).strip() for x in raw if str(x).strip()]
    text = str(raw).strip()
    if not text:
        return []
    if text.startswith("["):
        try:
            parsed = json.loads(text)
            if isinstance(parsed, list):
                return [str(x).strip() for x in parsed if str(x).strip()]
        except json.JSONDecodeError:
            pass
    return [x.strip() for x in text.split(",") if x.strip()]


def compute_property_status(conn, kode_rumah):
    status = "available"
    b = conn.execute(
        "SELECT status FROM booking WHERE kode_rumah = ? ORDER BY id DESC LIMIT 1",
        (kode_rumah,),
    ).fetchone()
    if b:
        st = (b["status"] or "").lower()
        if st == "confirmed":
            status = "sold"
        elif st == "pending":
            status = "onbook"
    return status


def serialize_properti(row, images, status="available"):
    fitur = []
    if row["fitur"]:
        try:
            fitur = json.loads(row["fitur"])
        except json.JSONDecodeError:
            fitur = parse_fitur(row["fitur"])
    return {
        "kode_rumah": row["kode_rumah"],
        "nama_rumah": row["nama_rumah"],
        "alamat": row["alamat"],
        "kota": row["kota"],
        "tipe": row["tipe"],
        "harga": row["harga"],
        "rating": row["rating"],
        "kamar_tidur": row["kamar_tidur"],
        "kamar_mandi": row["kamar_mandi"],
        "luas_tanah": row["luas_tanah"],
        "luas_bangunan": row["luas_bangunan"],
        "garasi": row["garasi"],
        "fitur": fitur,
        "gambar": images,
        "status": status,
        "deskripsi": row["deskripsi"] or "",
    }


def serialize_booking(row):
    return {
        "id": row["id"],
        "kode_rumah": row["kode_rumah"],
        "nama_depan": row["nama_depan"],
        "nama_belakang": row["nama_belakang"],
        "email": row["email"],
        "telepon": row["telepon"],
        "metode_pembayaran": row["metode_pembayaran"],
        "booking_fee": row["booking_fee"],
        "status": row["status"],
        "dibuat_pada": row["dibuat_pada"],
        "nama_rumah": row["nama_rumah"],
        "alamat": row["alamat"],
        "kota": row["kota"],
    }


# =============================================================================
# AUTH GUARDS
# =============================================================================
def login_required(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        if not session.get("user"):
            return redirect(url_for("login", next=request.path))
        return view(*args, **kwargs)
    return wrapped


@app.template_filter("rupiah")
def rupiah_filter(value):
    try:
        num = int(value)
    except (TypeError, ValueError):
        num = 0
    return f"Rp {num:,}".replace(",", ".")


@app.template_filter("dt_id")
def dt_id_filter(value):
    try:
        dt = datetime.fromisoformat(value)
    except Exception:
        return value
    return dt.strftime("%d %b %Y, %H:%M")


def save_images(files):
    filenames = []
    for file in files:
        if not file or not file.filename:
            continue
        if not allowed_file(file.filename):
            continue
        safe_name = secure_filename(file.filename)
        ext = os.path.splitext(safe_name)[1].lower()
        unique_name = f"{uuid.uuid4().hex}{ext}"
        dest = os.path.join(UPLOAD_DIR, unique_name)
        file.save(dest)
        filenames.append(unique_name)
    return filenames


def delete_images(filenames):
    for filename in filenames:
        path = os.path.join(UPLOAD_DIR, filename)
        if os.path.exists(path):
            os.remove(path)


# =============================================================================
# STATIC UPLOADS
# =============================================================================
@app.route("/uploads/<filename>")
def serve_upload(filename):
    return send_from_directory(UPLOAD_DIR, filename)


# =============================================================================
# API ROUTES
# =============================================================================
@app.route("/api/properti", methods=["GET"])
def list_properti():
    q = request.args.get("q", "").strip()
    conn = get_db()
    cur = conn.cursor()
    if q:
        like = f"%{q}%"
        cur.execute(
            """
            SELECT * FROM properti
            WHERE nama_rumah LIKE ? OR alamat LIKE ? OR kota LIKE ?
            ORDER BY nama_rumah ASC
            """,
            (like, like, like),
        )
    else:
        cur.execute("SELECT * FROM properti ORDER BY nama_rumah ASC")
    rows = cur.fetchall()
    data = []
    for row in rows:
        img_rows = conn.execute(
            "SELECT filename FROM properti_gambar WHERE kode_rumah = ?",
            (row["kode_rumah"],),
        ).fetchall()
        images = [f"/uploads/{r['filename']}" for r in img_rows]
        status = compute_property_status(conn, row["kode_rumah"])
        data.append(serialize_properti(row, images, status))
    conn.close()
    return jsonify(data)


@app.route("/api/properti/<kode>", methods=["GET"])
def get_properti(kode):
    conn = get_db()
    row = conn.execute(
        "SELECT * FROM properti WHERE kode_rumah = ?",
        (kode,),
    ).fetchone()
    if not row:
        conn.close()
        return jsonify({"message": "Properti tidak ditemukan"}), 404
    img_rows = conn.execute(
        "SELECT filename FROM properti_gambar WHERE kode_rumah = ?",
        (kode,),
    ).fetchall()
    images = [f"/uploads/{r['filename']}" for r in img_rows]
    status = compute_property_status(conn, kode)
    data = serialize_properti(row, images, status)
    conn.close()
    return jsonify(data)


@app.route("/api/properti", methods=["POST"])
def create_properti():
    payload = request.form
    kode_rumah = payload.get("kode_rumah", "").strip()
    if not kode_rumah:
        return jsonify({"message": "kode_rumah wajib diisi"}), 400

    fitur_list = parse_fitur(payload.get("fitur"))
    fitur_json = json.dumps(fitur_list, ensure_ascii=False)

    conn = get_db()
    try:
        conn.execute(
            """
            INSERT INTO properti (
                kode_rumah, nama_rumah, alamat, kota, tipe, harga, rating,
                kamar_tidur, kamar_mandi, luas_tanah, luas_bangunan, garasi, fitur, deskripsi
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                kode_rumah,
                payload.get("nama_rumah", "").strip(),
                payload.get("alamat", "").strip(),
                payload.get("kota", "").strip(),
                payload.get("tipe", "").strip(),
                int(payload.get("harga", 0) or 0),
                float(payload.get("rating", 0) or 0),
                int(payload.get("kamar_tidur", 0) or 0),
                int(payload.get("kamar_mandi", 0) or 0),
                int(payload.get("luas_tanah", 0) or 0),
                int(payload.get("luas_bangunan", 0) or 0),
                int(payload.get("garasi", 0) or 0),
                fitur_json,
                payload.get("deskripsi", "").strip(),
            ),
        )
        filenames = save_images(request.files.getlist("gambar"))
        for filename in filenames:
            conn.execute(
                "INSERT INTO properti_gambar (kode_rumah, filename) VALUES (?, ?)",
                (kode_rumah, filename),
            )
        conn.commit()
    except sqlite3.IntegrityError:
        conn.close()
        return jsonify({"message": "kode_rumah sudah terpakai"}), 400

    row = conn.execute(
        "SELECT * FROM properti WHERE kode_rumah = ?",
        (kode_rumah,),
    ).fetchone()
    img_rows = conn.execute(
        "SELECT filename FROM properti_gambar WHERE kode_rumah = ?",
        (kode_rumah,),
    ).fetchall()
    images = [f"/uploads/{r['filename']}" for r in img_rows]
    data = serialize_properti(row, images)
    conn.close()
    return jsonify(data), 201


@app.route("/api/properti/<kode>", methods=["PUT"])
def update_properti(kode):
    payload = request.form
    fitur_list = parse_fitur(payload.get("fitur"))
    fitur_json = json.dumps(fitur_list, ensure_ascii=False)

    conn = get_db()
    row = conn.execute(
        "SELECT * FROM properti WHERE kode_rumah = ?",
        (kode,),
    ).fetchone()
    if not row:
        conn.close()
        return jsonify({"message": "Properti tidak ditemukan"}), 404

    conn.execute(
        """
        UPDATE properti SET
            nama_rumah = ?,
            alamat = ?,
            kota = ?,
            tipe = ?,
            harga = ?,
            rating = ?,
            kamar_tidur = ?,
            kamar_mandi = ?,
            luas_tanah = ?,
            luas_bangunan = ?,
            garasi = ?,
            fitur = ?,
            deskripsi = ?
        WHERE kode_rumah = ?
        """,
        (
            payload.get("nama_rumah", row["nama_rumah"]).strip(),
            payload.get("alamat", row["alamat"]).strip(),
            payload.get("kota", row["kota"]).strip(),
            payload.get("tipe", row["tipe"]).strip(),
            int(payload.get("harga", row["harga"]) or 0),
            float(payload.get("rating", row["rating"]) or 0),
            int(payload.get("kamar_tidur", row["kamar_tidur"]) or 0),
            int(payload.get("kamar_mandi", row["kamar_mandi"]) or 0),
            int(payload.get("luas_tanah", row["luas_tanah"]) or 0),
            int(payload.get("luas_bangunan", row["luas_bangunan"]) or 0),
            int(payload.get("garasi", row["garasi"]) or 0),
            fitur_json,
            payload.get("deskripsi", row["deskripsi"] or "").strip(),
            kode,
        ),
    )

    new_files = request.files.getlist("gambar")
    if new_files:
        img_rows = conn.execute(
            "SELECT filename FROM properti_gambar WHERE kode_rumah = ?",
            (kode,),
        ).fetchall()
        old_files = [r["filename"] for r in img_rows]
        conn.execute("DELETE FROM properti_gambar WHERE kode_rumah = ?", (kode,))
        delete_images(old_files)

        filenames = save_images(new_files)
        for filename in filenames:
            conn.execute(
                "INSERT INTO properti_gambar (kode_rumah, filename) VALUES (?, ?)",
                (kode, filename),
            )

    conn.commit()
    row = conn.execute(
        "SELECT * FROM properti WHERE kode_rumah = ?",
        (kode,),
    ).fetchone()
    img_rows = conn.execute(
        "SELECT filename FROM properti_gambar WHERE kode_rumah = ?",
        (kode,),
    ).fetchall()
    images = [f"/uploads/{r['filename']}" for r in img_rows]
    data = serialize_properti(row, images)
    conn.close()
    return jsonify(data)


@app.route("/api/properti/<kode>", methods=["DELETE"])
def delete_properti(kode):
    conn = get_db()
    img_rows = conn.execute(
        "SELECT filename FROM properti_gambar WHERE kode_rumah = ?",
        (kode,),
    ).fetchall()
    old_files = [r["filename"] for r in img_rows]
    conn.execute("DELETE FROM properti WHERE kode_rumah = ?", (kode,))
    conn.commit()
    conn.close()
    delete_images(old_files)
    return jsonify({"message": "Properti dihapus"})


@app.route("/api/booking", methods=["GET"])
def list_booking():
    conn = get_db()
    rows = conn.execute(
        """
        SELECT b.*, p.nama_rumah, p.alamat, p.kota
        FROM booking b
        JOIN properti p ON p.kode_rumah = b.kode_rumah
        ORDER BY b.dibuat_pada DESC
        """
    ).fetchall()
    data = [serialize_booking(row) for row in rows]
    conn.close()
    return jsonify(data)


@app.route("/api/booking", methods=["POST"])
def create_booking():
    payload = request.get_json(silent=True) or {}
    required_fields = [
        "kode_rumah",
        "nama_depan",
        "nama_belakang",
        "email",
        "telepon",
        "metode_pembayaran",
        "booking_fee",
    ]
    missing = [f for f in required_fields if not str(payload.get(f, "")).strip()]
    if missing:
        return jsonify({"message": "Data booking belum lengkap.", "missing": missing}), 400

    conn = get_db()
    properti = conn.execute(
        "SELECT kode_rumah FROM properti WHERE kode_rumah = ?",
        (payload["kode_rumah"],),
    ).fetchone()
    if not properti:
        conn.close()
        return jsonify({"message": "Properti tidak ditemukan"}), 404

    dibuat_pada = datetime.utcnow().isoformat()
    conn.execute(
        """
        INSERT INTO booking (
            kode_rumah, nama_depan, nama_belakang, email, telepon,
            metode_pembayaran, booking_fee, status, dibuat_pada
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            payload["kode_rumah"],
            payload["nama_depan"].strip(),
            payload["nama_belakang"].strip(),
            payload["email"].strip(),
            payload["telepon"].strip(),
            payload["metode_pembayaran"].strip(),
            int(payload.get("booking_fee", 0) or 0),
            payload.get("status", "pending").strip() or "pending",
            dibuat_pada,
        ),
    )
    conn.commit()
    row = conn.execute(
        """
        SELECT b.*, p.nama_rumah, p.alamat, p.kota
        FROM booking b
        JOIN properti p ON p.kode_rumah = b.kode_rumah
        WHERE b.id = last_insert_rowid()
        """
    ).fetchone()
    conn.close()
    return jsonify(serialize_booking(row)), 201


@app.route("/api/booking/<int:booking_id>/status", methods=["PATCH"])
def update_booking_status(booking_id):
    payload = request.get_json(silent=True) or {}
    new_status = str(payload.get("status", "")).strip().lower()
    if new_status not in {"pending", "confirmed", "cancelled"}:
        return jsonify({"message": "Status tidak valid"}), 400

    conn = get_db()
    row = conn.execute("SELECT id FROM booking WHERE id = ?", (booking_id,)).fetchone()
    if not row:
        conn.close()
        return jsonify({"message": "Booking tidak ditemukan"}), 404

    conn.execute(
        "UPDATE booking SET status = ? WHERE id = ?",
        (new_status, booking_id),
    )
    conn.commit()
    row = conn.execute(
        """
        SELECT b.*, p.nama_rumah, p.alamat, p.kota
        FROM booking b
        JOIN properti p ON p.kode_rumah = b.kode_rumah
        WHERE b.id = ?
        """,
        (booking_id,),
    ).fetchone()
    conn.close()
    return jsonify(serialize_booking(row))


# =============================================================================
# ADMIN ROUTES
# =============================================================================
@app.route("/admin")
@login_required
def admin_index():
    conn = get_db()
    rows = conn.execute("SELECT * FROM properti ORDER BY nama_rumah ASC").fetchall()
    data = []
    for row in rows:
        img_rows = conn.execute(
            "SELECT filename FROM properti_gambar WHERE kode_rumah = ?",
            (row["kode_rumah"],),
        ).fetchall()
        images = [f"/uploads/{r['filename']}" for r in img_rows]
        data.append(serialize_properti(row, images))
    # Hitung tipe teratas
    type_counts = {}
    for row in rows:
        tipe = row["tipe"]
        type_counts[tipe] = type_counts.get(tipe, 0) + 1
    top_type = max(type_counts, key=type_counts.get) if type_counts else "-"

    # Hitung status booking
    booking_rows = conn.execute(
        "SELECT status, COUNT(*) as c FROM booking GROUP BY status"
    ).fetchall()
    booking_counts = {"total": 0, "pending": 0, "confirmed": 0, "cancelled": 0}
    for r in booking_rows:
        status = r["status"]
        booking_counts["total"] += r["c"]
        if status in booking_counts:
            booking_counts[status] = r["c"]
    conn.close()
    return render_template(
        "admin_index.html",
        properti_list=data,
        top_type=top_type,
        booking_counts=booking_counts,
    )


@app.route("/admin/customers")
@login_required
def admin_customers():
    conn = get_db()
    rows = conn.execute(
        """
        SELECT b.*, p.nama_rumah, p.alamat, p.kota
        FROM booking b
        JOIN properti p ON p.kode_rumah = b.kode_rumah
        ORDER BY b.dibuat_pada DESC
        """
    ).fetchall()
    data = [serialize_booking(row) for row in rows]
    conn.close()
    return render_template("admin_customers.html", booking_list=data)


@app.route("/admin/add", methods=["GET", "POST"])
@login_required
def admin_add():
    if request.method == "POST":
        payload = request.form
        kode_rumah = payload.get("kode_rumah", "").strip()
        if not kode_rumah:
            return render_template("admin_form.html", error="Kode rumah wajib diisi.", properti=None)

        fitur_list = parse_fitur(request.form.getlist("fitur"))
        fitur_json = json.dumps(fitur_list, ensure_ascii=False)

        conn = get_db()
        try:
            conn.execute(
                """
                INSERT INTO properti (
                    kode_rumah, nama_rumah, alamat, kota, tipe, harga, rating,
                    kamar_tidur, kamar_mandi, luas_tanah, luas_bangunan, garasi, fitur, deskripsi
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    kode_rumah,
                    payload.get("nama_rumah", "").strip(),
                    payload.get("alamat", "").strip(),
                    payload.get("kota", "").strip(),
                    payload.get("tipe", "").strip(),
                    int(payload.get("harga", 0) or 0),
                    float(payload.get("rating", 0) or 0),
                    int(payload.get("kamar_tidur", 0) or 0),
                    int(payload.get("kamar_mandi", 0) or 0),
                    int(payload.get("luas_tanah", 0) or 0),
                    int(payload.get("luas_bangunan", 0) or 0),
                    int(payload.get("garasi", 0) or 0),
                    fitur_json,
                    payload.get("deskripsi", "").strip(),
                ),
            )
            filenames = save_images(request.files.getlist("gambar"))
            for filename in filenames:
                conn.execute(
                    "INSERT INTO properti_gambar (kode_rumah, filename) VALUES (?, ?)",
                    (kode_rumah, filename),
                )
            conn.commit()
        except sqlite3.IntegrityError:
            conn.close()
            return render_template("admin_form.html", error="Kode rumah sudah dipakai.", properti=None)
        conn.close()
        return redirect(url_for("admin_index"))

    return render_template("admin_form.html", properti=None, error=None)


@app.route("/admin/edit/<kode>", methods=["GET", "POST"])
@login_required
def admin_edit(kode):
    conn = get_db()
    row = conn.execute(
        "SELECT * FROM properti WHERE kode_rumah = ?",
        (kode,),
    ).fetchone()
    if not row:
        conn.close()
        return redirect(url_for("admin_index"))

    img_rows = conn.execute(
        "SELECT filename FROM properti_gambar WHERE kode_rumah = ?",
        (kode,),
    ).fetchall()
    images = [f"/uploads/{r['filename']}" for r in img_rows]
    properti = serialize_properti(row, images)

    if request.method == "POST":
        fitur_list = parse_fitur(request.form.getlist("fitur"))
        fitur_json = json.dumps(fitur_list, ensure_ascii=False)

        conn.execute(
            """
            UPDATE properti SET
                nama_rumah = ?,
                alamat = ?,
                kota = ?,
                tipe = ?,
                harga = ?,
                rating = ?,
                kamar_tidur = ?,
                kamar_mandi = ?,
                luas_tanah = ?,
                luas_bangunan = ?,
                garasi = ?,
                fitur = ?,
                deskripsi = ?
            WHERE kode_rumah = ?
            """,
            (
                request.form.get("nama_rumah", row["nama_rumah"]).strip(),
                request.form.get("alamat", row["alamat"]).strip(),
                request.form.get("kota", row["kota"]).strip(),
                request.form.get("tipe", row["tipe"]).strip(),
                int(request.form.get("harga", row["harga"]) or 0),
                float(request.form.get("rating", row["rating"]) or 0),
                int(request.form.get("kamar_tidur", row["kamar_tidur"]) or 0),
                int(request.form.get("kamar_mandi", row["kamar_mandi"]) or 0),
                int(request.form.get("luas_tanah", row["luas_tanah"]) or 0),
                int(request.form.get("luas_bangunan", row["luas_bangunan"]) or 0),
                int(request.form.get("garasi", row["garasi"]) or 0),
                fitur_json,
                request.form.get("deskripsi", row["deskripsi"] or "").strip(),
                kode,
            ),
        )

        incoming_files = request.files.getlist("gambar")
        new_files = [f for f in incoming_files if getattr(f, "filename", "").strip()]
        if new_files:
            old_files = [r["filename"] for r in img_rows]
            conn.execute("DELETE FROM properti_gambar WHERE kode_rumah = ?", (kode,))
            delete_images(old_files)

            filenames = save_images(new_files)
            for filename in filenames:
                conn.execute(
                    "INSERT INTO properti_gambar (kode_rumah, filename) VALUES (?, ?)",
                    (kode, filename),
                )

        conn.commit()
        conn.close()
        return redirect(url_for("admin_index"))

    conn.close()
    return render_template("admin_form.html", properti=properti, error=None)


@app.route("/admin/delete/<kode>", methods=["POST"])
@login_required
def admin_delete(kode):
    conn = get_db()
    img_rows = conn.execute(
        "SELECT filename FROM properti_gambar WHERE kode_rumah = ?",
        (kode,),
    ).fetchall()
    old_files = [r["filename"] for r in img_rows]
    conn.execute("DELETE FROM properti WHERE kode_rumah = ?", (kode,))
    conn.commit()
    conn.close()
    delete_images(old_files)
    return redirect(url_for("admin_index"))


@app.route("/admin/booking/<int:booking_id>/status", methods=["POST"])
@login_required
def admin_booking_status(booking_id):
    new_status = str(request.form.get("status", "")).strip().lower()
    if new_status not in {"pending", "confirmed", "cancelled"}:
        return redirect(url_for("admin_customers"))
    conn = get_db()
    row = conn.execute("SELECT id FROM booking WHERE id = ?", (booking_id,)).fetchone()
    if not row:
        conn.close()
        return redirect(url_for("admin_customers"))
    conn.execute(
        "UPDATE booking SET status = ? WHERE id = ?",
        (new_status, booking_id),
    )
    conn.commit()
    conn.close()
    return redirect(url_for("admin_customers"))


# =============================================================================
# AUTH ROUTES
# =============================================================================
@app.route("/login", methods=["GET", "POST"])
def login():
    error = None
    if request.method == "POST":
        username = request.form.get("username", "")
        password = request.form.get("password", "")
        if username == "admin" and password == "admin":
            session["user"] = username
            return redirect(request.args.get("next") or url_for("admin_index"))
        error = "Username atau password salah."
    return render_template("login.html", error=error)


@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("login"))


# =============================================================================
# ENTRYPOINT
# =============================================================================
@app.route("/")
def root():
    return redirect(url_for("login"))


if __name__ == "__main__":
    ensure_dirs()
    init_db()
    app.run(port=2022, debug=True)
