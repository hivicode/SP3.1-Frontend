from flask import Flask, send_from_directory
import os

# =============================================================================
# CONFIGURATION
# =============================================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = BASE_DIR

app = Flask(
    __name__,
    static_folder=STATIC_DIR,
    static_url_path=""
)

# =============================================================================
# ROUTES
# =============================================================================

@app.route("/")
def serve_index():
    return send_from_directory(STATIC_DIR, "index.html")


@app.route("/<path:path>")
def serve_static(path):
    # Serve any file from the Frontend folder (HTML, CSS, JS, images)
    return send_from_directory(STATIC_DIR, path)

# =============================================================================
# ENTRYPOINT
# =============================================================================

if __name__ == "__main__":
    app.run(port=702, debug=True)
