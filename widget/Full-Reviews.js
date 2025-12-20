/*!
 * Welo Reviews Carousel Widget — v2
 * Embed:
 *  <div data-welo-reviews data-company="Acme Inc" data-stars="4-5" data-language="IT"></div>
 *  <script src="https://.../Full-Reviews.js" defer></script>
 */

(function () {
  "use strict";

  /* ================= CONFIG ================= */
  const SUPABASE_URL = "https://ufqvcojyfsnscuddadnw.supabase.co";
  const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmcXZjb2p5ZnNuc2N1ZGRhZG53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MTg2NjksImV4cCI6MjA2MzM5NDY2OX0.iYJVmg9PXxOu0R3z62iRzr4am0q8ZSc8THlB2rE2oQM";

  const TABLE_REVIEWS = "lascia_una_recensione";
  const FIELD_COMPANY = "azienda"; // <- campo in Supabase
  const FIELD_STATUS = "status";
  const APPROVED_VALUE = "Approved";

  const STORAGE_BASE =
    SUPABASE_URL + "/storage/v1/object/public/reviews-proof/";

  /* ================= ASSETS ================= */
  const FULL_STAR =
    "https://cdn.prod.website-files.com/672c7e4b5413fe846587b57a/6821f39414601e1d161f5d08_Image%20(1).png";
  const EMPTY_STAR =
    "https://cdn.prod.website-files.com/672c7e4b5413fe846587b57a/6821f538aef398e5e5d89974_Image%20(2).png";
  const VER_ICON =
    "https://cdn.prod.website-files.com/672c7e4b5413fe846587b57a/67c5867114795e1d6d4cc213_Vector.png";
  const FLAG_ICON =
    "https://cdn.prod.website-files.com/672c7e4b5413fe846587b57a/68388cede00174b6fb950e50_solar_flag-outline.svg";
  const SHARE_ICON =
    "https://cdn.prod.website-files.com/672c7e4b5413fe846587b57a/68388cef10c9406397f55734_Vector.svg";

  /* ================= TEXTS ================= */
  const TEXTS = {
    it: {
      title: "Guarda le nostre recensioni",
      verified: "Verificata da Welo",
      report: "Report",
      share: "Condividi",
      shareCopied: "Link copiato negli appunti",
      noReviews: "Ancora nessuna recensione da mostrare.",
      justNow: "Pochi istanti fa",
      today: "Oggi",
      dayAgo: "un giorno fa",
      daysAgo: "giorni fa",
      weekAgo: "una settimana fa",
      weeksAgo: "settimane fa",
      monthAgo: "un mese fa",
      monthsAgo: "mesi fa",
      yearAgo: "un anno fa",
      yearsAgo: "anni fa",
      copyLink: "Copia questo link:",
      prev: "Precedente",
      next: "Successiva",
    },
    en: {
      title: "See our reviews",
      verified: "Verified by Welo",
      report: "Report",
      share: "Share",
      shareCopied: "Link copied to clipboard",
      noReviews: "No reviews to show yet.",
      justNow: "Just now",
      today: "Today",
      dayAgo: "1 day ago",
      daysAgo: "days ago",
      weekAgo: "1 week ago",
      weeksAgo: "weeks ago",
      monthAgo: "1 month ago",
      monthsAgo: "months ago",
      yearAgo: "1 year ago",
      yearsAgo: "years ago",
      copyLink: "Copy this link:",
      prev: "Previous",
      next: "Next",
    },
  };

  /* ================= STYLE ================= */
  function injectInterFontOnce() {
    if (document.querySelector('link[data-welo-inter="1"]')) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap";
    link.setAttribute("data-welo-inter", "1");
    document.head.appendChild(link);
  }

  function injectStylesOnce() {
    if (document.getElementById("welo-reviews-carousel-styles")) return;

    const style = document.createElement("style");
    style.id = "welo-reviews-carousel-styles";
    style.textContent = `
/* ===================== */
/* WELO REVIEWS CAROUSEL */
/* ===================== */
.welo-reviews-widget,
.welo-reviews-widget button,
.welo-reviews-widget a,
.welo-reviews-widget span,
.welo-reviews-widget div {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.welo-reviews-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}

.welo-reviews-title {
  font-size: 18px;
  font-weight: 600;
  color: #1b1b1b;
}

@media (max-width: 767px) {
  .welo-reviews-title { font-size: 17px; }
}

/* CAROUSEL WRAP */
.welo-carousel {
  position: relative;
}

/* viewport scroll */
.welo-carousel-viewport {
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding: 2px 2px 10px 2px;
}
.welo-carousel-viewport::-webkit-scrollbar { display: none; }

/* track */
.welo-carousel-track {
  display: flex;
  gap: 16px;
  align-items: stretch;
}

/* arrows */
.welo-carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 42px;
  height: 42px;
  border-radius: 999px;
  border: 1px solid #e5e5e5;
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform .18s ease, opacity .18s ease, background .18s ease;
  z-index: 5;
  box-shadow: 0 10px 25px rgba(0,0,0,0.06);
}
.welo-carousel-arrow:hover { transform: translateY(-50%) scale(1.04); background: #fff; }
.welo-carousel-arrow:disabled { opacity: .35; cursor: default; transform: translateY(-50%); box-shadow: none; }
.welo-carousel-arrow-left { left: -10px; }
.welo-carousel-arrow-right { right: -10px; }

@media (max-width: 767px) {
  .welo-carousel-arrow-left { left: -6px; }
  .welo-carousel-arrow-right { right: -6px; }
}

/* REVIEW CARD (stile attuale) */
.welo-review-card {
  scroll-snap-align: start;
  background: #ffffff;
  border: 1px solid #dbdbdb;
  border-radius: 16px;
  padding: 20px;
  position: relative;
  transition: box-shadow 0.2s ease;
  flex: 0 0 auto;
  width: min(380px, 86vw);
}
.welo-review-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.04); }

@media (max-width: 767px) {
  .welo-review-card { padding: 16px; width: 86vw; }
}

/* stars */
.welo-review-stars {
  display: flex;
  gap: 3px;
  margin-bottom: 14px;
}
.welo-review-stars img { width: 19px; height: 19px; }

/* verified badge */
.welo-review-verified {
  position: absolute;
  top: 18px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.welo-review-verified img { width: 18px; height: 18px; }
.welo-review-verified span {
  font-size: 15px;
  font-weight: 600;
  color: #1b1b1b;
}

@media (max-width: 767px) {
  .welo-review-verified img { width: 16px; height: 16px; }
  .welo-review-verified span { font-size: 13px; }
}

/* text */
.welo-review-title {
  font-size: 18px;
  font-weight: 500;
  color: #1b1b1b;
  margin-bottom: 8px;
}
.welo-review-text {
  font-size: 15px;
  color: #525252;
  line-height: 1.55;
  margin-bottom: 16px;
}

/* footer */
.welo-review-footer {
  display: flex;
  align-items: center;
  gap: 10px;
}
.welo-review-author {
  font-size: 14px;
  font-weight: 600;
  color: #a1a1a1;
}
.welo-review-date {
  font-size: 14px;
  color: #a1a1a1;
}

/* actions */
.welo-review-actions {
  margin-top: 7px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.welo-review-report,
.welo-review-share {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #a1a1a1;
  cursor: pointer;
  text-decoration: none;
  transition: opacity 0.2s ease;
}
.welo-review-report:hover,
.welo-review-share:hover { opacity: 0.7; }
.welo-review-report img,
.welo-review-share img { width: 15px; opacity: 0.75; }

/* empty */
.welo-no-reviews {
  width: 100%;
  background: #ffffff;
  border: 1px solid #eaeaea;
  padding: 34px 18px;
  border-radius: 16px;
  text-align: center;
  color: #1b1b1b;
  font-size: 15px;
}

/* LIGHTBOX overlay */
.welo-lightbox-overlay {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: rgba(10,12,16,0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.22s ease;
  overscroll-behavior: contain;
  backdrop-filter: blur(4px);
}
.welo-lightbox-overlay.is-visible { opacity: 1; pointer-events: auto; }
.welo-lightbox-inner {
  position: relative;
  max-width: min(96vw, 720px);
  width: 100%;
  padding: 24px 56px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}
.welo-lightbox-media-container {
  flex: 1;
  max-width: 640px;
  max-height: 80vh;
  border-radius: 22px;
  overflow: hidden;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.welo-lightbox-media { max-width: 100%; max-height: 100%; display: block; }
.welo-lightbox-media video { width: 100%; max-height: 80vh; object-fit: contain; }

.welo-lightbox-close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: none;
  background: rgba(0,0,0,0.55);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 50;
  transition: all 0.22s ease;
  backdrop-filter: blur(3px);
}
.welo-lightbox-close:hover { background: rgba(0,0,0,0.75); transform: scale(1.08); }
.welo-lightbox-close svg { width: 18px; height: 18px; }

.welo-lightbox-nav {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: rgba(0,0,0,0.55);
  color: #fff;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 40;
  transition: all 0.22s ease;
  backdrop-filter: blur(3px);
}
.welo-lightbox-prev,
.welo-lightbox-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.welo-lightbox-prev { left: 16px; }
.welo-lightbox-next { right: 16px; }
.welo-lightbox-nav:hover { background: rgba(0,0,0,0.75); transform: translateY(-50%) scale(1.1); }
.welo-lightbox-nav[disabled] { opacity: .35; cursor: default; transform: translateY(-50%); }

.welo-lightbox-counter {
  position: absolute;
  bottom: 18px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.55);
  color: #fff;
  padding: 6px 14px;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 500;
  z-index: 40;
  backdrop-filter: blur(3px);
}

@media (max-width: 767px) {
  .welo-lightbox-inner { padding: 18px 20px; }
  .welo-lightbox-media-container { max-height: 78vh; border-radius: 20px; }
  .welo-lightbox-nav { width: 38px; height: 38px; font-size: 22px; }
  .welo-lightbox-prev { left: 8px; }
  .welo-lightbox-next { right: 8px; }
  .welo-lightbox-close { top: 10px; right: 10px; width: 34px; height: 34px; }
  .welo-lightbox-counter { bottom: 12px; font-size: 12px; padding: 5px 10px; }
}
    `.trim();

    document.head.appendChild(style);
  }

  /* ================= HELPERS ================= */
  function escapeHtml(str) {
    return String(str || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function makeSlug(input) {
    return String(input || "")
      .trim()
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function getPublicUrlFromPath(path) {
    if (!path) return null;
    if (String(path).startsWith("http")) return String(path);

    const cleaned = String(path).replace(/^\/+/, "");
    const encoded = cleaned
      .split("/")
      .map((seg) => encodeURIComponent(seg))
      .join("/");

    return STORAGE_BASE + encoded;
  }

  function parseMediaFromRow(row) {
    const raw = row.prove_di_acquisto || row["prove_di_acquisto"] || "";
    if (!raw) return [];

    return String(raw)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((path) => {
        const url = getPublicUrlFromPath(path);
        const isVideo = /\.(mp4|mov|webm|ogg)$/i.test(path);
        return { url, type: isVideo ? "video" : "image" };
      });
  }

  function getCountryFromRow(row) {
    return row["Respondent's country"] || row.Paese || "";
  }

  function normalizeCountry(country) {
    if (!country) return "";
    const c = String(country).toLowerCase().trim();
    if (c === "italy" || c === "italia" || c === "it") return "Italy";
    if (
      c === "united states of america" ||
      c === "usa" ||
      c === "us" ||
      c === "united states"
    )
      return "United States of America";
    if (c === "united kingdom" || c === "uk") return "United Kingdom";
    return country;
  }

  function resolvePreferredCountry(code) {
    const v = String(code || "").trim().toUpperCase();
    if (v === "IT") return "Italy";
    if (v === "US") return "United States of America";
    if (v === "UK") return "United Kingdom";
    // se già passa un paese completo
    return String(code || "").trim();
  }

  function inferUiLocaleFromLanguageCode(dataLanguage) {
    const v = String(dataLanguage || "").trim().toUpperCase();
    // richiesto: IT -> italiano, US -> inglese
    if (v === "US" || v === "UK") return "en";
    return "it";
  }

  function parseStarsRange(spec) {
    const raw = String(spec || "").trim();
    if (!raw) return null; // no filter

    // "4-5"
    const m = raw.match(/^(\d)\s*-\s*(\d)$/);
    if (m) {
      const a = Number(m[1]);
      const b = Number(m[2]);
      const min = Math.min(a, b);
      const max = Math.max(a, b);
      return { min, max };
    }

    // "4+" => 4..5
    const p = raw.match(/^(\d)\s*\+$/);
    if (p) {
      const min = Number(p[1]);
      return { min, max: 5 };
    }

    // single "5"
    const s = raw.match(/^(\d)$/);
    if (s) {
      const n = Number(s[1]);
      return { min: n, max: n };
    }

    // fallback: no filter
    return null;
  }

  function sortWithPreferredCountryThenNewest(reviews, preferredCountry) {
    const pref = [];
    const other = [];

    reviews.forEach((r) => {
      const c = normalizeCountry(getCountryFromRow(r));
      if (preferredCountry && c === preferredCountry) pref.push(r);
      else other.push(r);
    });

    function newestFirst(arr) {
      return arr.sort((a, b) => {
        const da = new Date(a["Submitted at"] || a.created_at || 0);
        const db = new Date(b["Submitted at"] || b.created_at || 0);
        return db - da;
      });
    }

    return newestFirst(pref).concat(newestFirst(other));
  }

  function formatRelativeTime(dateObj, locale) {
    const T = TEXTS[locale];
    if (!(dateObj instanceof Date) || isNaN(dateObj)) return "";

    const now = new Date();
    let diffMs = now.getTime() - dateObj.getTime();
    if (diffMs < 0) return T.justNow;

    const dayMs = 1000 * 60 * 60 * 24;
    const diffDays = Math.floor(diffMs / dayMs);
    if (diffDays === 0) return T.today;

    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffDays < 7) return diffDays === 1 ? T.dayAgo : `${diffDays} ${T.daysAgo}`;
    if (diffWeeks < 4) return diffWeeks === 1 ? T.weekAgo : `${diffWeeks} ${T.weeksAgo}`;
    if (diffMonths < 12) return diffMonths === 1 ? T.monthAgo : `${diffMonths} ${T.monthsAgo}`;
    return diffYears === 1 ? T.yearAgo : `${diffYears} ${T.yearsAgo}`;
  }

  async function supabaseFetch(paramsObj) {
    const params = new URLSearchParams();
    Object.keys(paramsObj).forEach((k) => params.set(k, paramsObj[k]));

    const url = `${SUPABASE_URL}/rest/v1/${TABLE_REVIEWS}?${params.toString()}`;
    const res = await fetch(url, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: "Bearer " + SUPABASE_ANON_KEY,
      },
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Supabase error ${res.status}: ${text}`);
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  }

  // Case-insensitive exact-ish match con ilike (senza wildcard)
  async function fetchReviewsForCompany(companyName) {
    const companyRaw = String(companyName || "").trim();
    const companySlug = makeSlug(companyRaw);

    let data = await supabaseFetch({
      [FIELD_COMPANY]: `ilike.${companyRaw}`,
      [FIELD_STATUS]: `eq.${APPROVED_VALUE}`,
      select: "*",
    });

    // fallback: prova anche lo slug
    if (!data.length && companySlug && companySlug.toLowerCase() !== companyRaw.toLowerCase()) {
      data = await supabaseFetch({
        [FIELD_COMPANY]: `ilike.${companySlug}`,
        [FIELD_STATUS]: `eq.${APPROVED_VALUE}`,
        select: "*",
      });
    }

    return data;
  }

  /* ================= LIGHTBOX ================= */
  function ensureLightboxOnce() {
    let overlay = document.querySelector(".welo-lightbox-overlay");
    if (overlay) return overlay;

    overlay = document.createElement("div");
    overlay.className = "welo-lightbox-overlay";
    overlay.setAttribute("aria-hidden", "true");

    overlay.innerHTML = `
      <div class="welo-lightbox-inner">
        <button class="welo-lightbox-close" type="button" aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <button class="welo-lightbox-nav welo-lightbox-prev" type="button" aria-label="Previous">‹</button>

        <div class="welo-lightbox-media-container"></div>

        <button class="welo-lightbox-nav welo-lightbox-next" type="button" aria-label="Next">›</button>

        <div class="welo-lightbox-counter"></div>
      </div>
    `;
    document.body.appendChild(overlay);

    const mediaContainer = overlay.querySelector(".welo-lightbox-media-container");
    const closeBtn = overlay.querySelector(".welo-lightbox-close");
    const prevBtn = overlay.querySelector(".welo-lightbox-prev");
    const nextBtn = overlay.querySelector(".welo-lightbox-next");
    const counter = overlay.querySelector(".welo-lightbox-counter");

    const state = { media: [], index: 0 };

    function isMobile() {
      return window.innerWidth <= 767;
    }

    function updateNav() {
      const total = state.media.length;
      const current = state.index + 1;
      counter.textContent = `${current} / ${total}`;
      counter.style.display = total > 1 ? "block" : "none";
      prevBtn.disabled = total <= 1;
      nextBtn.disabled = total <= 1;
    }

    function renderMedia() {
      const item = state.media[state.index];
      if (!item) return;

      mediaContainer.innerHTML = "";

      if (item.type === "video") {
        const video = document.createElement("video");
        video.src = item.url;
        video.controls = true;
        video.playsInline = true;
        video.className = "welo-lightbox-media";
        video.style.width = "100%";
        video.style.maxHeight = "80vh";
        video.style.objectFit = "contain";
        mediaContainer.appendChild(video);

        if (!isMobile()) video.play().catch(() => {});
      } else {
        const img = document.createElement("img");
        img.src = item.url;
        img.alt = "";
        img.className = "welo-lightbox-media";
        img.style.maxWidth = "100%";
        img.style.maxHeight = "80vh";
        img.style.objectFit = "contain";
        mediaContainer.appendChild(img);
      }

      updateNav();
    }

    function open(mediaArray, startIndex) {
      if (!mediaArray || !mediaArray.length) return;
      state.media = mediaArray;
      state.index = Number(startIndex) || 0;
      renderMedia();
      overlay.classList.add("is-visible");
      overlay.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function close() {
      overlay.classList.remove("is-visible");
      overlay.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      state.media = [];
      state.index = 0;
      mediaContainer.innerHTML = "";
      counter.textContent = "";
    }

    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });

    prevBtn.addEventListener("click", () => {
      const total = state.media.length;
      if (total <= 1) return;
      state.index = (state.index - 1 + total) % total;
      renderMedia();
    });

    nextBtn.addEventListener("click", () => {
      const total = state.media.length;
      if (total <= 1) return;
      state.index = (state.index + 1) % total;
      renderMedia();
    });

    document.addEventListener("keydown", (e) => {
      if (!overlay.classList.contains("is-visible")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prevBtn.click();
      if (e.key === "ArrowRight") nextBtn.click();
    });

    overlay.addEventListener(
      "touchmove",
      function (e) {
        if (!overlay.classList.contains("is-visible")) return;
        if (!e.target.closest(".welo-lightbox-media-container")) e.preventDefault();
      },
      { passive: false }
    );

    overlay._weloOpen = open;
    return overlay;
  }

  /* ================= SHARE ================= */
  async function shareReview(locale, stars, title, text) {
    const T = TEXTS[locale];
    const starLine = stars > 0 ? "★".repeat(stars) + " " : "";
    const baseUrl = window.location.href.split("#")[0];

    const shareTitle =
      locale === "en" ? `${stars}★ review on Welo` : `Recensione da ${stars}★ su Welo`;

    const shareText =
      locale === "en"
        ? `${starLine}${title}\n\n${text}\n\nRead it on Welo: `
        : `${starLine}${title}\n\n${text}\n\nLeggi la recensione su Welo: `;

    try {
      if (navigator.share) {
        await navigator.share({ title: shareTitle, text: shareText, url: baseUrl });
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(`${shareTitle}\n\n${shareText}${baseUrl}`);
        alert(T.shareCopied);
      } else {
        window.prompt(T.copyLink, baseUrl);
      }
    } catch (_) {}
  }

  /* ================= MOUNT ================= */
  function mountWidget(el) {
    const company = (el.getAttribute("data-company") || "").trim();
    if (!company) {
      console.warn("[Welo Reviews] Missing data-company", el);
      return;
    }

    const starsSpec = el.getAttribute("data-stars") || "";
    const starsRange = parseStarsRange(starsSpec);

    const langCode = el.getAttribute("data-language") || "IT";
    const preferredCountry = resolvePreferredCountry(langCode);
    const uiLocale = inferUiLocaleFromLanguageCode(langCode);
    const T = TEXTS[uiLocale];

    const customTitle = (el.getAttribute("data-title") || "").trim();
    const titleText = customTitle || T.title;

    const REPORT_URL =
      uiLocale === "en"
        ? "https://www.welobadge.com/en/contact-us"
        : "https://www.welobadge.com/contattaci";

    const instanceId = "welo_" + Math.random().toString(36).slice(2, 10);

    // shell
    el.innerHTML = `
      <div class="welo-reviews-widget" data-welo-instance="${instanceId}">
        <div class="welo-reviews-header">
          <div class="welo-reviews-title">${escapeHtml(titleText)}</div>
        </div>

        <div class="welo-carousel">
          <button class="welo-carousel-arrow welo-carousel-arrow-left" type="button" aria-label="${escapeHtml(
            T.prev
          )}">‹</button>

          <div class="welo-carousel-viewport">
            <div class="welo-carousel-track"></div>
          </div>

          <button class="welo-carousel-arrow welo-carousel-arrow-right" type="button" aria-label="${escapeHtml(
            T.next
          )}">›</button>
        </div>
      </div>
    `;

    const root = el.querySelector(".welo-reviews-widget");
    const viewport = el.querySelector(".welo-carousel-viewport");
    const track = el.querySelector(".welo-carousel-track");
    const btnPrev = el.querySelector(".welo-carousel-arrow-left");
    const btnNext = el.querySelector(".welo-carousel-arrow-right");

    const lightbox = ensureLightboxOnce();

    function updateArrowState() {
      const maxScroll = viewport.scrollWidth - viewport.clientWidth;
      const x = viewport.scrollLeft;
      btnPrev.disabled = x <= 2;
      btnNext.disabled = x >= maxScroll - 2;
    }

    function scrollByOneCard(dir) {
      const firstCard = track.querySelector(".welo-review-card");
      const step = firstCard ? firstCard.offsetWidth + 16 : 320;
      viewport.scrollBy({ left: dir * step, behavior: "smooth" });
    }

    btnPrev.addEventListener("click", () => scrollByOneCard(-1));
    btnNext.addEventListener("click", () => scrollByOneCard(1));
    viewport.addEventListener("scroll", () => updateArrowState(), { passive: true });
    window.addEventListener("resize", () => updateArrowState());

    // Delegation: media click + share
    root.addEventListener("click", async function (e) {
      const mediaEl = e.target.closest("[data-action='open-media']");
      if (mediaEl) {
        const encoded = mediaEl.getAttribute("data-media");
        const index = Number(mediaEl.getAttribute("data-index")) || 0;
        try {
          const media = JSON.parse(decodeURIComponent(encoded));
          if (typeof lightbox._weloOpen === "function") lightbox._weloOpen(media, index);
        } catch (err) {
          console.error("[Welo Reviews] media parse error", err);
        }
        return;
      }

      const shareEl = e.target.closest("[data-action='share']");
      if (shareEl) {
        e.preventDefault();
        const stars = Number(shareEl.getAttribute("data-stars")) || 0;
        const title = decodeURIComponent(shareEl.getAttribute("data-title") || "");
        const text = decodeURIComponent(shareEl.getAttribute("data-text") || "");
        await shareReview(uiLocale, stars, title, text);
      }
    });

    function renderStars(stars) {
      const filled = Array(stars).fill(`<img src="${FULL_STAR}" alt="" />`).join("");
      const empty = Array(Math.max(0, 5 - stars))
        .fill(`<img src="${EMPTY_STAR}" alt="" />`)
        .join("");
      return filled + empty;
    }

    function renderCards(reviews) {
      if (!reviews.length) {
        track.innerHTML = `<div class="welo-no-reviews">${escapeHtml(T.noReviews)}</div>`;
        btnPrev.disabled = true;
        btnNext.disabled = true;
        return;
      }

      const cards = reviews
        .map((r) => {
          const stars = Number(r["Da 1 a 5 stelle come lo valuti?"]) || 0;
          const date = new Date(r["Submitted at"] || r.created_at || "");
          const rel = formatRelativeTime(date, uiLocale);

          const media = parseMediaFromRow(r);
          let mediaHtml = "";

          if (media.length > 0) {
            const mediaAttr = encodeURIComponent(JSON.stringify(media));
            // thumbnails semplici (1 o più) – click apre lightbox
            const thumbs = media
              .slice(0, 3)
              .map((item, idx) => {
                const isVideo = item.type === "video";
                const inner = isVideo
                  ? `<div style="width:84px;height:84px;border-radius:22px;overflow:hidden;border:1px solid #dbdbdb;background:#050505;display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;">VIDEO</div>`
                  : `<img src="${item.url}" alt="" style="width:84px;height:84px;object-fit:cover;border-radius:22px;border:1px solid #dbdbdb;display:block;" loading="lazy" />`;

                return `
                  <div
                    data-action="open-media"
                    data-media="${mediaAttr}"
                    data-index="${idx}"
                    style="cursor:pointer;flex:0 0 auto;"
                  >
                    ${inner}
                  </div>
                `;
              })
              .join("");

            mediaHtml = `<div style="display:flex;gap:10px;margin-bottom:14px;">${thumbs}</div>`;
          }

          return `
            <div class="welo-review-card">
              <div class="welo-review-verified">
                <img src="${VER_ICON}" alt="" />
                <span>${escapeHtml(T.verified)}</span>
              </div>

              <div class="welo-review-stars">${renderStars(stars)}</div>

              <div class="welo-review-title">${escapeHtml(r.Titolo || "")}</div>
              <div class="welo-review-text">${escapeHtml(r.Testo || "")}</div>

              ${mediaHtml}

              <div class="welo-review-footer">
                <span class="welo-review-author">${escapeHtml(r["Nome e cognome"] || "")}</span>
                <span class="welo-review-date">${escapeHtml(rel)}</span>
              </div>

              <div class="welo-review-actions">
                <a class="welo-review-report" href="${REPORT_URL}" target="_blank" rel="noopener">
                  <img src="${FLAG_ICON}" alt="" />
                  <span>${escapeHtml(T.report)}</span>
                </a>

                <a class="welo-review-share" href="#"
                   data-action="share"
                   data-stars="${stars}"
                   data-title="${encodeURIComponent(r.Titolo || "")}"
                   data-text="${encodeURIComponent(r.Testo || "")}">
                  <img src="${SHARE_ICON}" alt="" />
                  <span>${escapeHtml(T.share)}</span>
                </a>
              </div>
            </div>
          `;
        })
        .join("");

      track.innerHTML = cards;

      // dopo render, set arrows
      requestAnimationFrame(() => updateArrowState());
    }

    async function load() {
      try {
        let data = await fetchReviewsForCompany(company);

        // filter stars range se presente
        if (starsRange) {
          data = data.filter((r) => {
            const s = Number(r["Da 1 a 5 stelle come lo valuti?"]) || 0;
            return s >= starsRange.min && s <= starsRange.max;
          });
        }

        // ordering: preferred country first, then newest
        data = sortWithPreferredCountryThenNewest(data, preferredCountry);

        renderCards(data);
      } catch (err) {
        console.error("[Welo Reviews] load error:", err);
        track.innerHTML = `<div class="welo-no-reviews">${escapeHtml(T.noReviews)}</div>`;
        btnPrev.disabled = true;
        btnNext.disabled = true;
      }
    }

    load();
  }

  /* ================= BOOT ================= */
  function boot() {
    injectInterFontOnce();
    injectStylesOnce();

    const nodes = document.querySelectorAll("[data-welo-reviews]");
    nodes.forEach(mountWidget);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
