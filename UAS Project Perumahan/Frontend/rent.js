(function () {
    /* ==========================================================================
       CONFIGURATION + UTILITIES
       ========================================================================== */
    const API_BASE = "http://localhost:2022";
    const money = (n) => {
      const x = Math.max(0, Number(n) || 0);
      return "Rp " + x.toLocaleString("id-ID");
    };
  
    const qs = (sel, root = document) => root.querySelector(sel);
    const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  
    const getIdParam = () => new URLSearchParams(window.location.search).get("id") || "";
  
    const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

    const apiUrl = (path) => `${API_BASE}${path}`;
    const isAbsoluteUrl = (src) => /^https?:\/\//i.test(src || "");

    const normalizeImageUrl = (src) => {
      if (!src) return "";
      if (isAbsoluteUrl(src)) return src;
      return apiUrl(src.startsWith("/") ? src : `/${src}`);
    };

    /* ==========================================================================
       API NORMALIZATION
       ========================================================================== */
    const mapApiProperty = (p) => ({
      id: p.kode_rumah,
      name: p.nama_rumah,
      city: p.kota,
      address: p.alamat,
      type: p.tipe,
      price: p.harga,
      rating: p.rating,
      bedrooms: p.kamar_tidur,
      bathrooms: p.kamar_mandi,
      areaSqm: p.luas_bangunan,
      garages: p.garasi,
      features: Array.isArray(p.fitur) ? p.fitur : [],
      images: Array.isArray(p.gambar) ? p.gambar.map(normalizeImageUrl) : [],
      status: p.status || "available",
      description: p.deskripsi || p.description || ""
    });

    const fetchJSON = async (path) => {
      const res = await fetch(apiUrl(path));
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      return res.json();
    };
  
    /* ==========================================================================
       LOCAL STORAGE + FILTER HELPERS
       ========================================================================== */
    const saveJSON = (key, value) => localStorage.setItem(key, JSON.stringify(value));
    const readJSON = (key) => {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      try { return JSON.parse(raw); } catch { return null; }
    };
  
    const normalizeText = (s) => String(s || "").toLowerCase().trim();
    const hasFeature = (p, f) => (p.features || []).includes(f);
    const formatFeature = (value) => {
      const text = String(value || "").trim();
      return text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
    };
  
    /* ==========================================================================
       DISPLAY HELPERS
       ========================================================================== */
    const renderStars = (rating) => {
      const r = Number(rating) || 0;
      const full = clamp(Math.round(r), 0, 5);
      return "★".repeat(full) + "☆".repeat(5 - full);
    };
  
    /* ==========================================================================
       LISTING PAGE
       ========================================================================== */
    const initListing = async () => {
      const cards = qs("#cards");
      if (!cards) return;
  
      const searchInput = qs("#searchInput");
      const sortSelect = qs("#sortSelect");
      const typeSelect = qs("#typeSelect");
      const bedroomsSelect = qs("#bedroomsSelect");
      const bathroomsSelect = qs("#bathroomsSelect");
      const pageSizeSelect = qs("#pageSizeSelect");
  
      const minPrice = qs("#minPrice");
      const maxPrice = qs("#maxPrice");
      const minPriceRange = qs("#minPriceRange");
      const maxPriceRange = qs("#maxPriceRange");
      const priceLabel = qs("#priceLabel");
  
      const featureParking = qs("#featureParking");
      const featurePool = qs("#featurePool");
      const featureGarden = qs("#featureGarden");
      const featureGym = qs("#featureGym");
  
      const foundLabel = qs("#foundLabel");
      const prevPageBtn = qs("#prevPageBtn");
      const nextPageBtn = qs("#nextPageBtn");
      const pageNumbers = qs("#pageNumbers");
      const applyFiltersBtn = qs("#applyFiltersBtn");
      const resetFiltersBtn = qs("#resetFiltersBtn");
  
      const gridBtn = qs("#gridBtn");
      const listBtn = qs("#listBtn");
  
      const state = {
        view: readJSON("planb_view") || "grid",
        page: 1,
        properties: []
      };
  
      const setView = (v) => {
        state.view = v === "list" ? "list" : "grid";
        saveJSON("planb_view", state.view);
  
        gridBtn.classList.toggle("is-active", state.view === "grid");
        listBtn.classList.toggle("is-active", state.view === "list");
        cards.classList.toggle("is-grid", state.view === "grid");
        cards.classList.toggle("is-list", state.view === "list");
      };
  
      const parseMoneyInput = (el) => {
        const raw = String(el.value || "").replace(/[^\d]/g, "");
        return raw ? Number(raw) : 0;
      };
  
      const syncMoneyInputs = (minV, maxV) => {
        minPrice.value = minV ? String(minV) : "";
        maxPrice.value = maxV ? String(maxV) : "";
        priceLabel.textContent = money(minV) + " - " + money(maxV);
      };
  
      const syncRanges = (minV, maxV) => {
        minPriceRange.value = String(minV);
        maxPriceRange.value = String(maxV);
      };
  
      const readFiltersFromDOM = () => {
        const q = normalizeText(searchInput.value);
        const type = typeSelect.value;
        const beds = bedroomsSelect.value ? Number(bedroomsSelect.value) : 0;
        const baths = bathroomsSelect.value ? Number(bathroomsSelect.value) : 0;
  
        const minV = clamp(parseMoneyInput(minPrice) || Number(minPriceRange.value), 0, 5000000000);
        const maxV = clamp(parseMoneyInput(maxPrice) || Number(maxPriceRange.value), 0, 5000000000);
  
        const low = Math.min(minV, maxV);
        const high = Math.max(minV, maxV);
  
        const feats = {
          parking: featureParking.checked,
          pool: featurePool.checked,
          garden: featureGarden.checked,
          gym: featureGym.checked
        };
  
        return { q, type, beds, baths, low, high, feats };
      };

      let appliedFilters = null;

      const getFilters = () => appliedFilters || readFiltersFromDOM();
  
      const applyPriceFromRanges = () => {
        const a = Number(minPriceRange.value);
        const b = Number(maxPriceRange.value);
        const low = Math.min(a, b);
        const high = Math.max(a, b);
        syncMoneyInputs(low, high);
      };
  
      const applyRangesFromMoney = () => {
        const a = clamp(parseMoneyInput(minPrice), 0, 5000000000);
        const b = clamp(parseMoneyInput(maxPrice), 0, 5000000000);
        const low = Math.min(a, b);
        const high = Math.max(a, b);
        syncRanges(low, high);
        syncMoneyInputs(low, high);
      };
  
      const sortItems = (items, mode) => {
        const arr = items.slice();
        if (mode === "priceAsc") return arr.sort((a, b) => (a.price || 0) - (b.price || 0));
        if (mode === "priceDesc") return arr.sort((a, b) => (b.price || 0) - (a.price || 0));
        if (mode === "bedsDesc") return arr.sort((a, b) => b.bedrooms - a.bedrooms);
        if (mode === "ratingDesc") return arr.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        return arr;
      };
  
      const filterItems = () => {
        const items = state.properties;
        const f = getFilters();
  
        const filtered = items.filter((p) => {
          const text = normalizeText(p.name + " " + p.address + " " + p.city);
          if (f.q && !text.includes(f.q)) return false;
  
          if (f.type && p.type !== f.type) return false;
          if (f.beds && (p.bedrooms || 0) < f.beds) return false;
          if (f.baths && (p.bathrooms || 0) < f.baths) return false;
  
          const price = Number(p.price) || 0;
          if (price < f.low || price > f.high) return false;
  
          if (f.feats.parking && !hasFeature(p, "parking")) return false;
          if (f.feats.pool && !hasFeature(p, "pool")) return false;
          if (f.feats.garden && !hasFeature(p, "garden")) return false;
          if (f.feats.gym && !hasFeature(p, "gym")) return false;
  
          return true;
        });
  
        return sortItems(filtered, sortSelect.value);
      };
  
      const cardHTML = (p) => {
        const img = (p.images && p.images[0]) ? p.images[0] : "";
        const meta = `${p.bedrooms} bedrooms · ${p.bathrooms} bathrooms · ${p.areaSqm} m² · ${p.garages} garages`;
        const stars = renderStars(p.rating);
  
        const isBlocked = p.status && p.status !== "available";
        const statusBadge = isBlocked ? `<div class="rent-status-badge">${p.status}</div>` : "";

        const inner =
          `<div class="rent-card-img-wrap ${isBlocked ? "is-blocked" : ""}">
             <img class="rent-card-img" src="${img}" alt="${p.name}"/>
             ${statusBadge}
           </div>
           <div class="rent-card-body">
             <div class="rent-card-title">${p.name}</div>
             <div class="text-size-small text-style-muted">${p.address}, ${p.city}</div>
             <div class="rent-card-meta">
               <span>${stars} ${Number(p.rating).toFixed(1)}</span>
               <span>${meta}</span>
             </div>
             <div class="rent-card-price">
               <div>
                 <div class="rent-price">${money(p.price)}</div>
               </div>
               <div class="rent-link-btn" style="text-decoration:none;">View</div>
             </div>
           </div>`;
  
        const blockedClass = isBlocked ? " is-blocked" : "";
        if (state.view === "list") {
          return `<a class="rent-card-link rent-list-row${blockedClass}" href="property.html?id=${encodeURIComponent(p.id)}">${inner}</a>`;
        }
        return `<a class="rent-card-link${blockedClass}" href="property.html?id=${encodeURIComponent(p.id)}">${inner}</a>`;
      };
  
      const renderPagination = (page, totalPages) => {
        prevPageBtn.disabled = page <= 1;
        nextPageBtn.disabled = page >= totalPages;
        pageNumbers.innerHTML = "";
  
        const maxButtons = 7;
        const start = Math.max(1, page - 3);
        const end = Math.min(totalPages, start + maxButtons - 1);
        const s2 = Math.max(1, end - maxButtons + 1);
  
        for (let i = s2; i <= end; i++) {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "rent-page-number" + (i === page ? " is-active" : "");
          btn.textContent = String(i);
          btn.addEventListener("click", () => {
            state.page = i;
            render();
          });
          pageNumbers.appendChild(btn);
        }
      };
  
      const render = () => {
        const items = filterItems();
        const pageSize = Number(pageSizeSelect.value) || 9;
        const total = items.length;
  
        foundLabel.textContent = `${total} properties found`;
  
        const totalPages = Math.max(1, Math.ceil(total / pageSize));
        state.page = clamp(state.page, 1, totalPages);
  
        const start = (state.page - 1) * pageSize;
        const pageItems = items.slice(start, start + pageSize);
  
        cards.innerHTML = pageItems.map(cardHTML).join("");
        renderPagination(state.page, totalPages);
      };
  
      const resetFilters = () => {
        searchInput.value = "";
        sortSelect.value = "featured";
        typeSelect.value = "";
        bedroomsSelect.value = "";
        bathroomsSelect.value = "";
  
        featureParking.checked = false;
        featurePool.checked = false;
        featureGarden.checked = false;
        featureGym.checked = false;
  
        minPrice.value = "";
        maxPrice.value = "";
        minPriceRange.value = "0";
        maxPriceRange.value = "5000000000";
        syncMoneyInputs(0, 5000000000);
  
        state.page = 1;
        appliedFilters = readFiltersFromDOM();
        render();
      };

      const applyFilters = () => {
        applyRangesFromMoney();
        state.page = 1;
        appliedFilters = readFiltersFromDOM();
        render();
      };
  
      const loadProperties = async () => {
        foundLabel.textContent = "Loading properties...";
        try {
          const data = await fetchJSON("/api/properti");
          state.properties = Array.isArray(data) ? data.map(mapApiProperty) : [];
        } catch (err) {
          state.properties = [];
          foundLabel.textContent = "Gagal memuat data.";
        }
      };

      applyPriceFromRanges();
      setView(state.view);
      appliedFilters = readFiltersFromDOM();
      await loadProperties();
      render();
  
      gridBtn.addEventListener("click", () => { setView("grid"); render(); });
      listBtn.addEventListener("click", () => { setView("list"); render(); });
  
      applyFiltersBtn.addEventListener("click", applyFilters);
      resetFiltersBtn.addEventListener("click", resetFilters);
  
      sortSelect.addEventListener("change", () => { state.page = 1; render(); });
      pageSizeSelect.addEventListener("change", () => { state.page = 1; render(); });
  
      searchInput.addEventListener("keydown", (e) => {
        if (e.key !== "Enter") return;
        e.preventDefault();
        applyFilters();
      });

      minPrice.addEventListener("input", () => { applyRangesFromMoney(); });
      maxPrice.addEventListener("input", () => { applyRangesFromMoney(); });
  
      minPriceRange.addEventListener("input", () => { applyPriceFromRanges(); });
      maxPriceRange.addEventListener("input", () => { applyPriceFromRanges(); });
  
      typeSelect.addEventListener("change", () => { });
      bedroomsSelect.addEventListener("change", () => { });
      bathroomsSelect.addEventListener("change", () => { });
      [featureParking, featurePool, featureGarden, featureGym].forEach((el) => {
        el.addEventListener("change", () => { });
      });
  
      prevPageBtn.addEventListener("click", () => {
        state.page = Math.max(1, state.page - 1);
        render();
      });
  
      nextPageBtn.addEventListener("click", () => {
        state.page = state.page + 1;
        render();
      });
    };
  
    const initProperty = async () => {
      /* ==========================================================================
         PROPERTY DETAIL PAGE
         ========================================================================== */
      const root = qs("#propertyRoot");
      if (!root) return;
  
      const id = getIdParam();
      if (!id) {
        root.innerHTML = `<div class="rent-card"><div class="heading-style-h2">Properti tidak ditemukan</div><div class="text-size-small text-style-muted">Kembali ke listing untuk pilih properti.</div></div>`;
        return;
      }

      let p = null;
      try {
        const data = await fetchJSON(`/api/properti/${encodeURIComponent(id)}`);
        p = mapApiProperty(data);
      } catch (err) {
        p = null;
      }
  
      if (!p) {
        root.innerHTML = `<div class="rent-card"><div class="heading-style-h2">Properti tidak ditemukan</div><div class="text-size-small text-style-muted">Kembali ke listing untuk pilih properti.</div></div>`;
        return;
      }
  
      const mainImg = (p.images && p.images[0]) ? p.images[0] : "";
      const thumbs = (p.images || []);
  
      root.innerHTML = `
        <section class="rent-detail-main">
          <div class="rent-gallery">
            <div class="rent-gallery-main">
              <div class="rent-main-img-wrap ${p.status !== 'available' ? 'is-blocked' : ''}">
                <img id="galleryMain" src="${mainImg}" alt="${p.name}"/>
                ${p.status !== "available" ? `<div class="rent-status-badge">${p.status}</div>` : ""}
              </div>
            </div>
            <div class="rent-thumbs">
              ${thumbs.map((src, idx) => `
                <button type="button" class="rent-thumb ${p.status !== 'available' ? 'is-blocked' : ''}" data-idx="${idx}">
                  <img src="${src}" alt="${p.name} thumbnail ${idx + 1}"/>
                  ${p.status !== "available" ? `<div class="rent-status-badge">${p.status}</div>` : ""}
                </button>
              `).join("")}
            </div>
          </div>
  
          <div class="rent-detail-content">
            <div class="rent-detail-title">
              <div class="text-style-allcaps text-size-small">${p.type}</div>
              <h2 class="heading-style-h2">${p.name}</h2>
              <div class="text-size-small text-style-muted">${renderStars(p.rating)} ${Number(p.rating).toFixed(1)} · ${p.address}, ${p.city}</div>
            </div>
  
            <div class="rent-kpis">
              <div class="rent-chip"><span class="material-symbols-rounded">bed</span>${p.bedrooms} Beds</div>
              <div class="rent-chip"><span class="material-symbols-rounded">bathtub</span>${p.bathrooms} Baths</div>
              <div class="rent-chip"><span class="material-symbols-rounded">square_foot</span>${p.areaSqm} m²</div>
              <div class="rent-chip"><span class="material-symbols-rounded">garage</span>${p.garages} Garages</div>
            </div>

            <div class="text-rich-text">
              <p>${p.deskripsi || p.description || "Belum ada deskripsi."}</p>
            </div>

            <div>
              <div class="text-style-allcaps text-size-small">Amenities</div>
              <div class="rent-kpis" style="margin-top:.5rem;">
                ${(p.features || []).map((f) => `<div class="rent-chip">${formatFeature(f)}</div>`).join("")}
              </div>
            </div>
          </div>
        </section>
  
        <aside class="rent-detail-aside">
          <div class="rent-booking">
            <div class="rent-booking-head">
              <div>
                <div class="rent-booking-price">${money(p.price)}</div>
              </div>
              <div class="text-size-small text-style-muted">${renderStars(p.rating)} ${Number(p.rating).toFixed(1)}</div>
            </div>
  
            <div class="rent-booking-form">
              <div class="rent-field">
                <label class="text-size-small text-style-allcaps" for="bookingFee">Booking fee (opsional)</label>
                <input id="bookingFee" class="form-field w-input" inputmode="numeric" placeholder="5000000"/>
              </div>

              <button id="buyBtn" type="button" class="button w-inline-block rent-primary-btn">
                <div class="button-text">
                  <div class="button_text">Ajukan Pembelian</div>
                  <div class="button-text-animation">
                    <div class="button_text">Ajukan Pembelian</div>
                  </div>
                </div>
                <img src="https://wubflow-shield.nocodexport.dev/685077c466f113761c6d796b/6853ff8bb7215267b2f31695_Kaleo_Icon.svg" loading="lazy" alt="Kaleo Icon" class="button-image"/>
              </button>
  
              <div class="text-size-small text-style-muted">Isi booking fee jika ingin mengunci unit, lalu lanjut ke checkout.</div>
            </div>
          </div>
        </aside>
      `;
  
      const galleryMain = qs("#galleryMain");
      qsa(".rent-thumb", root).forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = Number(btn.getAttribute("data-idx") || "0");
          const src = (p.images || [])[idx] || mainImg;
          galleryMain.src = src;
        });
      });

      const bookingFeeInput = qs("#bookingFee");
      const buyBtn = qs("#buyBtn");
      const bookingBox = qs(".rent-booking");

      const parseFee = () => {
        const raw = String(bookingFeeInput.value || "").replace(/[^\d]/g, "");
        return raw ? Number(raw) : 0;
      };

      if (p.status !== "available") {
        if (bookingBox) bookingBox.classList.add("is-blocked");
        buyBtn.disabled = true;
        buyBtn.querySelector(".button_text").textContent = p.status === "sold" ? "Sold" : "On Book";
      }

      buyBtn.addEventListener("click", () => {
        const bookingFee = parseFee();

        const purchase = {
          propertyId: p.id,
          bookingFee,
          createdAt: Date.now()
        };

        saveJSON("planb_purchase", purchase);
        window.location.href = "checkout.html";
      });
    };
  
    const initCheckout = async () => {
      const box = qs("#summaryBox");
      const form = qs("#checkoutForm");
      if (!box || !form) return;

      const payMethods = qsa("input[name=\"payMethod\"]", form);
      const cardFields = qs("#cardFields", form);
      const altPayNote = qs("#altPayNote", form);
      const cardInputs = ["#cardNumber", "#expiry", "#cvv", "#cardName"].map((sel) => qs(sel, form));

      const updatePaymentUI = () => {
        const selected = payMethods.find((el) => el.checked)?.value || "visa";
        const isCard = selected === "visa" || selected === "mastercard";

        if (cardFields) {
          cardFields.style.display = isCard ? "" : "none";
        }
        if (altPayNote) {
          altPayNote.style.display = isCard ? "none" : "";
        }
        cardInputs.forEach((input) => {
          if (!input) return;
          input.required = isCard;
          if (!isCard) input.value = "";
        });
      };

      const purchase = readJSON("planb_purchase");
      if (!purchase) {
        box.innerHTML = `<div class="rent-summary-top"><div class="heading-style-h2">Belum ada pengajuan</div><div class="text-size-small text-style-muted">Silakan pilih properti lalu klik Ajukan Pembelian.</div><a href="listing.html" class="button w-inline-block" style="margin-top:.75rem;"><div class="button-text"><div class="button_text">Kembali ke Listing</div><div class="button-text-animation"><div class="button_text">Kembali ke Listing</div></div></div><img src="https://wubflow-shield.nocodexport.dev/685077c466f113761c6d796b/6853ff8bb7215267b2f31695_Kaleo_Icon.svg" loading="lazy" alt="Kaleo Icon" class="button-image"/></a></div>`;
        form.addEventListener("submit", (e) => e.preventDefault());
        return;
      }
  
      let p = null;
      try {
        const data = await fetchJSON(`/api/properti/${encodeURIComponent(purchase.propertyId)}`);
        p = mapApiProperty(data);
      } catch (err) {
        p = null;
      }
      if (!p) return;
  
      const img = (p.images && p.images[0]) ? p.images[0] : "";
      const bookingFee = Number(purchase.bookingFee) || 0;
  
      box.innerHTML = `
        <div class="rent-summary-top">
          <div class="rent-summary-img"><img src="${img}" alt="${p.name}"/></div>
          <div>
            <div class="text-weight-bold">${p.name}</div>
            <div class="text-size-small text-style-muted">${p.city}</div>
            <div class="text-size-small text-style-muted">${p.address}</div>
          </div>
        </div>
  
        <div class="rent-summary-lines">
          <div class="rent-summary-line">
            <span>Harga rumah</span>
            <span>${money(p.price)}</span>
          </div>
          <div class="rent-summary-line">
            <span>Booking fee (dibayar sekarang)</span>
            <span>${money(bookingFee)}</span>
          </div>
          <div class="rent-summary-line is-total">
            <span>Total dibayar sekarang</span>
            <span>${money(bookingFee)}</span>
          </div>
        </div>
      `;

      updatePaymentUI();
      payMethods.forEach((el) => {
        el.addEventListener("change", updatePaymentUI);
      });

      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const firstName = qs("#firstName").value.trim();
        const lastName = qs("#lastName").value.trim();
        const email = qs("#email").value.trim();
        const phone = qs("#phone").value.trim();
        const cardNumber = qs("#cardNumber").value.trim();
        const expiry = qs("#expiry").value.trim();
        const cvv = qs("#cvv").value.trim();
        const cardName = qs("#cardName").value.trim();

        const selectedMethod = payMethods.find((el) => el.checked)?.value || "visa";
        const needsCard = selectedMethod === "visa" || selectedMethod === "mastercard";

        if (!firstName || !lastName || !email || !phone) {
          alert("Lengkapi semua data checkout.");
          return;
        }

        if (needsCard && (!cardNumber || !expiry || !cvv || !cardName)) {
          alert("Lengkapi semua data checkout.");
          return;
        }
  
        const payload = {
          kode_rumah: p.id,
          nama_depan: firstName,
          nama_belakang: lastName,
          email,
          telepon: phone,
          metode_pembayaran: selectedMethod,
          booking_fee: bookingFee
        };

        try {
          const res = await fetch(apiUrl("/api/booking"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });
          if (!res.ok) throw new Error("Request failed");
          localStorage.removeItem("planb_purchase");
          alert("Pengajuan pembelian berhasil! Tim kami akan menghubungi Anda.");
          window.location.href = "listing.html";
        } catch (err) {
          alert("Gagal mengirim data booking. Coba lagi.");
        }
      });
    };
  
    /* ==========================================================================
       BOOTSTRAP
       ========================================================================== */
    document.addEventListener("DOMContentLoaded", () => {
      const page = document.body?.dataset?.page || "";
      if (page === "listing") initListing();
      if (page === "property") initProperty();
      if (page === "checkout") initCheckout();
    });
  })();
