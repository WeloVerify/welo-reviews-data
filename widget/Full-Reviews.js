/*!
 * Welo Reviews Widget — v1.3.2
 * Embed:
 *  <div
 *    data-welo-reviews
 *    data-company="Acme Inc"
 *    data-stars="4-5"
 *    data-language="US"
 *    data-welo-page="https://..."
 *  ></div>
 *  <script src="https://.../Full-Reviews.js" defer></script>
 */

(function () {
  "use strict";

  /* ================= CONFIG ================= */
  const SUPABASE_URL = "https://ufqvcojyfsnscuddadnw.supabase.co";
  const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmcXZjb2p5ZnNuc2N1ZGRhZG53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MTg2NjksImV4cCI6MjA2MzM5NDY2OX0.iYJVmg9PXxOu0R3z62iRzr4am0q8ZSc8THlB2rE2oQM";

  const TABLE_REVIEWS = "lascia_una_recensione";
  const FIELD_COMPANY = "azienda";
  const FIELD_STATUS = "status";
  const APPROVED_VALUE = "Approved";

  const STORAGE_BASE =
    SUPABASE_URL + "/storage/v1/object/public/reviews-proof/";

  /* ================= ASSETS ================= */
  const FULL_STAR =
    "https://cdn.prod.website-files.com/672c7e4b5413fe846587b57a/6821f39414601e1d161f5d08_Image%20(1).png";
  const EMPTY_STAR =
    "https://cdn.prod.website-files.com/672c7e4b5413fe846587b57a/6821f538aef398e5e5d89974_Image%20(2).png";
  const BUTTON_ICON =
    "https://cdn.prod.website-files.com/672c7e4b5413fe846587b57a/67cf055c4add3a04ada1cca4_Group%201597880572.png";
  const VER_ICON =
    "https://cdn.prod.website-files.com/672c7e4b5413fe846587b57a/67c5867114795e1d6d4cc213_Vector.png";
  const FLAG_ICON =
    "https://cdn.prod.website-files.com/672c7e4b5413fe846587b57a/68388cede00174b6fb950e50_solar_flag-outline.svg";
  const SHARE_ICON =
    "https://cdn.prod.website-files.com/672c7e4b5413fe846587b57a/68388cef10c9406397f55734_Vector.svg";

  /* ================= I18N ================= */
  const TEXTS = {
    it: {
      headerTitle: "Guarda le nostre recensioni",
      openWeloPage: "Apri la Welo Page",

      newest: "Più recenti",
      oldest: "Più vecchie",
      withMedia: "Solo recensioni con allegati",

      noReviews: "Ancora nessuna recensione, scrivi tu la prima.",
      writeReview: "Scrivi una recensione",
      verified: "Verificata da Welo",
      loadMore: "Carica di più",
      share: "Condividi",
      shareCopied: "Link copiato negli appunti",
      report: "Report",
      onlyMediaHint: "Stai visualizzando solo le recensioni con foto o video.",
      noMediaMatch: "Nessuna recensione con allegati corrisponde ai filtri.",
      copyLink: "Copia questo link:",
      justNow: "Pochi istanti fa",
      today: "Oggi",
      oneDayAgo: "un giorno fa",
      daysAgo: "giorni fa",
      oneWeekAgo: "una settimana fa",
      weeksAgo: "settimane fa",
      oneMonthAgo: "un mese fa",
      monthsAgo: "mesi fa",
      oneYearAgo: "un anno fa",
      yearsAgo: "anni fa",
    },
    en: {
      headerTitle: "See our reviews",
      openWeloPage: "Open the Welo Page",

      newest: "Newest",
      oldest: "Oldest",
      withMedia: "Only reviews with attachments",

      noReviews: "No reviews yet, be the first to write one.",
      writeReview: "Write a review",
      verified: "Verified by Welo",
      loadMore: "Load more",
      share: "Share",
      shareCopied: "Link copied to clipboard",
      report: "Report",
      onlyMediaHint: "Showing only reviews with photos or videos.",
      noMediaMatch: "No reviews with attachments match your filters.",
      copyLink: "Copy this link:",
      justNow: "Just now",
      today: "Today",
      oneDayAgo: "1 day ago",
      daysAgo: "days ago",
      oneWeekAgo: "1 week ago",
      weeksAgo: "weeks ago",
      oneMonthAgo: "1 month ago",
      monthsAgo: "months ago",
      oneYearAgo: "1 year ago",
      yearsAgo: "years ago",
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

  // overwrite existing styles (avoid old css stuck)
  function injectStyles() {
    const existing = document.getElementById("welo-reviews-widget-styles");
    const style = existing || document.createElement("style");
    style.id = "welo-reviews-widget-styles";

    style.textContent = `
/* ===================== */
/* WELO REVIEWS WIDGET */
/* ===================== */
.welo-reviews-widget,
.welo-reviews-widget button,
.welo-reviews-widget a,
.welo-reviews-widget span,
.welo-reviews-widget div {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.welo-reviews-widget { text-align: left !important; }

/* HEADER */
.welo-reviews-widget .welo-header {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 22px;
  padding-bottom: 15px;
}
.welo-reviews-widget .welo-header-title {
  font-size: 35px;
  line-height: 1.08;
  letter-spacing: -0.02em;
  font-weight: 600;
  color: #1b1b1b;
}
@media (max-width: 767px) {
  .welo-reviews-widget .welo-header-title { font-size: 26px; }
}
.welo-reviews-widget .welo-open-page-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 10px 18px;
  border-radius: 999px;
  border: 1px solid #d4d4d4;
  background: #ffffff;
  color: #1b1b1b;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.25s ease, transform 0.1s ease, opacity 0.2s ease;
}
.welo-reviews-widget .welo-open-page-btn:hover { background: #efefef; }
.welo-reviews-widget .welo-open-page-btn:active { transform: translateY(1px); }
.welo-reviews-widget .welo-open-page-btn[aria-disabled="true"] {
  opacity: .45;
  pointer-events: none;
}

/* CONTROLS (FORCE LEFT) */
.welo-reviews-widget .reviews-controls {
  display: flex;
  justify-content: flex-start !important;
  align-items: flex-start;
  width: 100%;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
}
.welo-reviews-widget .sort-pill-group {
  display: flex;
  justify-content: flex-start !important;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-left: 0 !important;
  margin-right: auto !important;
}
.welo-reviews-widget .sort-pill {
  padding: 6px 14px;
  border-radius: 10px;
  border: 1px solid #e5e5e5;
  background: #fafafa;
  font-size: 14px;
  color: #1b1b1b;
  cursor: pointer;
  transition: all 0.18s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.welo-reviews-widget .sort-pill:hover { background: #f0f0f0; }
.welo-reviews-widget .sort-pill.active {
  background: #1b1b1b;
  color: #ffffff;
  border-color: #1b1b1b;
  font-weight: 500;
}
@media (max-width: 767px) {
  .welo-reviews-widget .sort-pill-group {
    overflow-x: auto;
    padding-bottom: 4px;
    -webkit-overflow-scrolling: touch;
    flex-wrap: nowrap;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .welo-reviews-widget .sort-pill-group::-webkit-scrollbar { display: none; }
  .welo-reviews-widget .sort-pill { white-space: nowrap; }
}

/* REVIEW CARD */
.welo-reviews-widget .review-card {
  background: #ffffff;
  border: 1px solid #dbdbdb;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 26px;
  position: relative;
  transition: box-shadow 0.2s ease;
}
.welo-reviews-widget .review-card:hover { box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04); }
@media (max-width: 767px) { .welo-reviews-widget .review-card { padding: 16px; } }

/* STARS */
.welo-reviews-widget .review-stars { display: flex; gap: 3px; margin-bottom: 14px; }
.welo-reviews-widget .review-stars img { width: 19px; height: 19px; }

/* VERIFIED BADGE */
.welo-reviews-widget .review-verified {
  position: absolute;
  top: 18px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.welo-reviews-widget .review-verified img { width: 18px; height: 18px; }
.welo-reviews-widget .review-verified span { font-size: 15px; font-weight: 600; color: #1b1b1b; }
@media (max-width: 767px) {
  .welo-reviews-widget .review-verified img { width: 16px; height: 16px; }
  .welo-reviews-widget .review-verified span { font-size: 13px; }
}

/* TEXT */
.welo-reviews-widget .review-title { font-size: 18px; font-weight: 500; color: #1b1b1b; margin-bottom: 8px; }
@media (max-width: 767px) { .welo-reviews-widget .review-title { font-size: 17px; } }
.welo-reviews-widget .review-text { font-size: 15px; color: #525252; line-height: 1.55; margin-bottom: 16px; }
.welo-reviews-widget .review-footer { display: flex; align-items: center; gap: 10px; }
.welo-reviews-widget .review-author { font-size: 14px; font-weight: 600; color: #a1a1a1; }
.welo-reviews-widget .review-date { font-size: 14px; color: #a1a1a1; }

/* ACTIONS */
.welo-reviews-widget .review-actions {
  margin-top: 7px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.welo-reviews-widget .review-report,
.welo-reviews-widget .review-share {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #a1a1a1;
  cursor: pointer;
  text-decoration: none;
  transition: opacity 0.2s ease;
}
.welo-reviews-widget .review-report:hover,
.welo-reviews-widget .review-share:hover { opacity: 0.7; }
.welo-reviews-widget .review-report img,
.welo-reviews-widget .review-share img { width: 15px; opacity: 0.75; }

/* NO REVIEWS */
.welo-reviews-widget .no-reviews-box {
  width: 100%;
  background: #ffffff;
  border: 1px solid #eaeaea;
  padding: 48px 20px;
  border-radius: 16px;
  text-align: center;
}
.welo-reviews-widget .no-reviews-text { font-size: 17px; color: #1b1b1b; margin-bottom: 24px; }
.welo-reviews-widget .review-button {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 220px;
  width: 100%;
  margin: 0 auto;
  min-height: 44px;
  padding: 10px 20px;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #1b1b1b;
  background-color: transparent;
  border: 1px solid #d4d4d4;
  border-radius: 200px;
  text-decoration: none;
  transition: background-color 0.25s ease;
  cursor: pointer;
}
.welo-reviews-widget .review-button:hover { background-color: #efefef; }
.welo-reviews-widget .review-button img { width: 18px; height: 18px; }
@media (max-width: 767px) {
  .welo-reviews-widget .review-button { max-width: none; width: 100%; }
}

/* LOAD MORE */
.welo-reviews-widget .load-more-reviews {
  margin: 8px auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 220px;
  width: 100%;
  min-height: 44px;
  padding: 10px 20px;
  border-radius: 999px;
  border: none;
  background: #1b1b1b;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.1s ease;
}
.welo-reviews-widget .load-more-reviews:hover { opacity: 0.9; }
.welo-reviews-widget .load-more-reviews:active { transform: translateY(1px); }

/* MEDIA THUMBS */
.welo-reviews-widget .review-media { display: flex; align-items: center; margin-bottom: 14px; }
.welo-reviews-widget .review-media-thumb {
  position: relative;
  width: 84px;
  height: 84px;
  border-radius: 22px;
  overflow: hidden;
  border: 1px solid #dbdbdb;
  background: #050505;
  cursor: pointer;
  flex-shrink: 0;
  transition: transform 0.25s ease;
}
.welo-reviews-widget .review-media-thumb + .review-media-thumb { margin-left: -50px; }
.welo-reviews-widget .review-media-thumb--main { transform: rotate(-5deg); box-shadow: 0 8px 18px rgba(0, 0, 0, 0.18); }
.welo-reviews-widget .review-media-thumb--secondary { transform: none; box-shadow: none; }
.welo-reviews-widget .review-media-thumb img,
.welo-reviews-widget .review-media-thumb video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.25s ease;
  pointer-events: none;
}
.welo-reviews-widget .review-media-thumb img:hover { transform: scale(1.06); }
.welo-reviews-widget .review-media-video-thumb { width: 100%; height: 100%; background: #050505; position: relative; overflow: hidden; }
.welo-reviews-widget .review-media-play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
}
.welo-reviews-widget .review-media-play-icon::before {
  content: "";
  width: 0; height: 0;
  border-style: solid;
  border-width: 6px 0 6px 10px;
  border-color: transparent transparent transparent #000000;
  margin-left: 2px;
}
.welo-reviews-widget .review-media-thumb:hover .review-media-play-icon {
  transform: translate(-50%, -50%) scale(1.1);
  background: #ffffff;
}

/* HINT */
.welo-reviews-widget .reviews-active-hint { font-size: 13px; color: #6b7280; margin-bottom: 10px; }

/* LIGHTBOX */
.welo-review-lightbox-overlay {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: rgba(10, 12, 16, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.22s ease;
  overscroll-behavior: contain;
  backdrop-filter: blur(4px);
}
.welo-review-lightbox-overlay.is-visible { opacity: 1; pointer-events: auto; }
.welo-review-lightbox-inner {
  position: relative;
  max-width: min(96vw, 720px);
  width: 100%;
  padding: 24px 56px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}
.welo-review-lightbox-media-container {
  flex: 1;
  max-width: 640px;
  max-height: 80vh;
  border-radius: 22px;
  overflow: hidden;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.welo-review-lightbox-media { max-width: 100%; max-height: 100%; display: block; }
.welo-review-lightbox-media video {
  width: 100%;
  height: auto;
  max-height: 80vh;
  object-fit: contain;
}
.welo-review-lightbox-close {
  position: absolute;
  top: 14px; right: 14px;
  width: 38px; height: 38px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.55);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 50;
  transition: all 0.22s ease;
  backdrop-filter: blur(3px);
}
.welo-review-lightbox-close:hover { background: rgba(0, 0, 0, 0.75); transform: scale(1.08); }
.welo-review-lightbox-close svg { width: 18px; height: 18px; }
.welo-review-lightbox-nav {
  width: 44px; height: 44px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.55);
  color: #ffffff;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 40;
  transition: all 0.22s ease;
  backdrop-filter: blur(3px);
}
.welo-review-lightbox-prev,
.welo-review-lightbox-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.welo-review-lightbox-prev { left: 16px; }
.welo-review-lightbox-next { right: 16px; }
.welo-review-lightbox-nav:hover {
  background: rgba(0, 0, 0, 0.75);
  transform: translateY(-50%) scale(1.1);
}
.welo-review-lightbox-nav[disabled] { opacity: 0.35; cursor: default; transform: translateY(-50%); }
.welo-review-lightbox-counter {
  position: absolute;
  bottom: 18px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.55);
  color: #ffffff;
  padding: 6px 14px;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 500;
  z-index: 40;
  backdrop-filter: blur(3px);
}
@media (max-width: 767px) {
  .welo-review-lightbox-inner { padding: 18px 20px; }
  .welo-review-lightbox-media-container { max-height: 78vh; border-radius: 20px; }
  .welo-review-lightbox-nav { width: 38px; height: 38px; font-size: 22px; }
  .welo-review-lightbox-prev { left: 8px; }
  .welo-review-lightbox-next { right: 8px; }
  .welo-review-lightbox-close { top: 10px; right: 10px; width: 34px; height: 34px; }
  .welo-review-lightbox-counter { bottom: 12px; font-size: 12px; padding: 5px 10px; }
}
    `.trim();

    if (!existing) document.head.appendChild(style);
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

  function detectLocaleFromElement(el) {
    const forced = (el.getAttribute("data-locale") || "auto").toLowerCase();
    if (forced === "it" || forced === "en") return forced;

    const langs = []
      .concat(navigator.languages || [])
      .concat([navigator.language || ""])
      .map((l) => String(l || "").toLowerCase())
      .filter(Boolean);

    const hasItalian = langs.some((l) => l.startsWith("it"));
    const hasEnglish = langs.some((l) => l.startsWith("en"));

    if (hasItalian) return "it";
    if (hasEnglish) return "en";

    const htmlLang = (document.documentElement.lang || "").toLowerCase();
    if (htmlLang.startsWith("it")) return "it";
    if (htmlLang.startsWith("en")) return "en";

    return "it";
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
      .map(function (segment) {
        return encodeURIComponent(segment);
      })
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
    if (c === "united kingdom" || c === "uk" || c === "gb") return "United Kingdom";
    return country;
  }

  function preferredCountriesFromElement(el, locale) {
    const raw =
      (el.getAttribute("data-language") || el.getAttribute("data-lenguage") || "")
        .trim()
        .toUpperCase();

    if (raw === "US") return ["United States of America"];
    if (raw === "IT") return ["Italy"];
    if (raw === "UK" || raw === "GB") return ["United Kingdom"];

    if (raw && raw.length > 2) return [raw];

    if (locale === "it") return ["Italy"];
    return ["United States of America", "United Kingdom"];
  }

  function sortReviewsByPreferredCountryAndDate(reviews, preferredCountries, activeSort) {
    if (!Array.isArray(reviews)) return [];

    const preferredSet = new Set((preferredCountries || []).map((c) => normalizeCountry(c)));
    const preferred = [];
    const other = [];

    reviews.forEach(function (review) {
      const country = normalizeCountry(getCountryFromRow(review));
      (preferredSet.has(country) ? preferred : other).push(review);
    });

    function sortByDate(group, order) {
      return group.sort(function (a, b) {
        const dateA = new Date(a["Submitted at"] || a.created_at || 0);
        const dateB = new Date(b["Submitted at"] || b.created_at || 0);
        return order === "newest" ? dateB - dateA : dateA - dateB;
      });
    }

    return sortByDate(preferred, activeSort).concat(sortByDate(other, activeSort));
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

    if (diffDays < 7) return diffDays === 1 ? T.oneDayAgo : `${diffDays} ${T.daysAgo}`;
    if (diffWeeks < 4) return diffWeeks === 1 ? T.oneWeekAgo : `${diffWeeks} ${T.weeksAgo}`;
    if (diffMonths < 12) return diffMonths === 1 ? T.oneMonthAgo : `${diffMonths} ${T.monthsAgo}`;
    return diffYears === 1 ? T.oneYearAgo : `${diffYears} ${T.yearsAgo}`;
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

  async function fetchReviewsForCompany(companyName) {
    const companyRaw = String(companyName || "").trim();
    const companySlug = makeSlug(companyRaw);

    let data = await supabaseFetch({
      [FIELD_COMPANY]: `ilike.${companyRaw}`,
      [FIELD_STATUS]: `eq.${APPROVED_VALUE}`,
      select: "*",
    });

    if (!data.length && companySlug && companySlug.toLowerCase() !== companyRaw.toLowerCase()) {
      data = await supabaseFetch({
        [FIELD_COMPANY]: `ilike.${companySlug}`,
        [FIELD_STATUS]: `eq.${APPROVED_VALUE}`,
        select: "*",
      });
    }

    return data;
  }

  function parseAllowedStars(spec) {
    const raw = String(spec || "").trim().toLowerCase();
    const all = [5, 4, 3, 2, 1];

    if (!raw || raw === "all") return all;

    const plus = raw.match(/^(\d)\s*\+$/);
    if (plus) {
      const n = Number(plus[1]);
      return all.filter((x) => x >= n);
    }

    const range = raw.match(/^(\d)\s*-\s*(\d)$/);
    if (range) {
      const a = Number(range[1]);
      const b = Number(range[2]);
      const min = Math.min(a, b);
      const max = Math.max(a, b);
      return all.filter((x) => x >= min && x <= max);
    }

    const single = raw.match(/^(\d)$/);
    if (single) {
      const n = Number(single[1]);
      if (n >= 1 && n <= 5) return [n];
    }

    return all;
  }

  /* ================= LIGHTBOX ================= */
  function createLightbox(instanceId) {
    const overlay = document.createElement("div");
    overlay.className = "welo-review-lightbox-overlay";
    overlay.setAttribute("aria-hidden", "true");
    overlay.setAttribute("data-welo-lightbox", instanceId);

    overlay.innerHTML = `
      <div class="welo-review-lightbox-inner">
        <button class="welo-review-lightbox-close" type="button" aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <button class="welo-review-lightbox-nav welo-review-lightbox-prev" type="button" aria-label="Previous">‹</button>

        <div class="welo-review-lightbox-media-container"></div>

        <button class="welo-review-lightbox-nav welo-review-lightbox-next" type="button" aria-label="Next">›</button>

        <div class="welo-review-lightbox-counter"></div>
      </div>
    `;

    document.body.appendChild(overlay);

    const mediaContainer = overlay.querySelector(".welo-review-lightbox-media-container");
    const closeBtn = overlay.querySelector(".welo-review-lightbox-close");
    const prevBtn = overlay.querySelector(".welo-review-lightbox-prev");
    const nextBtn = overlay.querySelector(".welo-review-lightbox-next");
    const counter = overlay.querySelector(".welo-review-lightbox-counter");

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
        video.className = "welo-review-lightbox-media";
        video.style.width = "100%";
        video.style.height = "auto";
        video.style.maxHeight = "80vh";
        video.style.objectFit = "contain";
        mediaContainer.appendChild(video);
        if (!isMobile()) video.play().catch(() => {});
      } else {
        const img = document.createElement("img");
        img.src = item.url;
        img.alt = "";
        img.className = "welo-review-lightbox-media";
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
      document.body.style.overflow = "hidden";
      overlay.setAttribute("aria-hidden", "false");
    }

    function close() {
      overlay.classList.remove("is-visible");
      document.body.style.overflow = "";
      overlay.setAttribute("aria-hidden", "true");
      state.media = [];
      state.index = 0;
      mediaContainer.innerHTML = "";
      counter.textContent = "";
    }

    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) close();
    });

    prevBtn.addEventListener("click", function () {
      const total = state.media.length;
      if (total <= 1) return;
      state.index = (state.index - 1 + total) % total;
      renderMedia();
    });

    nextBtn.addEventListener("click", function () {
      const total = state.media.length;
      if (total <= 1) return;
      state.index = (state.index + 1) % total;
      renderMedia();
    });

    document.addEventListener("keydown", function (e) {
      if (!overlay.classList.contains("is-visible")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prevBtn.click();
      if (e.key === "ArrowRight") nextBtn.click();
    });

    overlay.addEventListener(
      "touchmove",
      function (e) {
        if (!overlay.classList.contains("is-visible")) return;
        if (!e.target.closest(".welo-review-lightbox-media-container")) e.preventDefault();
      },
      { passive: false }
    );

    return { open, close };
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

  /* ================= MAIN ================= */
  function mountWidget(placeholderEl) {
    const company = (placeholderEl.getAttribute("data-company") || "").trim();
    if (!company) {
      console.warn("[Welo Reviews Widget] Missing data-company on:", placeholderEl);
      return;
    }

    const locale = detectLocaleFromElement(placeholderEl);
    const T = TEXTS[locale];

    const REPORT_URL =
      locale === "en"
        ? "https://www.welobadge.com/en/contact-us"
        : "https://www.welobadge.com/contattaci";

    const writeReviewFallbackUrl =
      locale === "en" ? "https://www.welobadge.com/en" : "https://www.welobadge.com";

    const weloPageUrl =
      (placeholderEl.getAttribute("data-welo-page") || "").trim() ||
      (placeholderEl.getAttribute("data-welo-page-url") || "").trim();

    const preferredCountries = preferredCountriesFromElement(placeholderEl, locale);

    const allowedStars = parseAllowedStars(placeholderEl.getAttribute("data-stars"));
    const allowedStarsSet = new Set(allowedStars);

    const instanceId = "welo_" + Math.random().toString(36).slice(2, 10);
    const lightbox = createLightbox(instanceId);

    let ALL_REVIEWS = [];
    let CURRENT_REVIEWS = [];
    let visibleCount = 4;

    let activeSort = "newest";
    let attachmentsOnly = false;

    placeholderEl.innerHTML = `
      <div class="welo-reviews-widget" data-welo-instance="${instanceId}">
        <div class="welo-header">
          <div class="welo-header-title">${escapeHtml(T.headerTitle)}</div>
          <a
            class="welo-open-page-btn"
            href="${escapeHtml(weloPageUrl || "#")}"
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled="${weloPageUrl ? "false" : "true"}"
          >
            ${escapeHtml(T.openWeloPage)}
          </a>
        </div>

        <div class="reviews-controls">
          <div class="sort-pill-group">
            <button class="sort-pill active" data-sort="newest">${escapeHtml(T.newest)}</button>
            <button class="sort-pill" data-sort="oldest">${escapeHtml(T.oldest)}</button>
            <button class="sort-pill sort-pill-attachments" data-attachments="false">
              ${escapeHtml(T.withMedia)}
            </button>
          </div>
        </div>

        <div class="reviews-list"></div>
      </div>
    `;

    const widgetRoot = placeholderEl.querySelector(".welo-reviews-widget");
    const listEl = placeholderEl.querySelector(".reviews-list");

    const headerBtn = widgetRoot.querySelector(".welo-open-page-btn");
    if (!weloPageUrl && headerBtn) {
      headerBtn.addEventListener("click", function (e) {
        e.preventDefault();
      });
    }

    function initVideoThumbPreviews() {
      const videos = listEl.querySelectorAll(".review-media-video-thumb video");
      videos.forEach(function (video) {
        try {
          video.muted = true;
          video.playsInline = true;
          video.setAttribute("playsinline", "");
          video.setAttribute("webkit-playsinline", "");
          video.setAttribute("preload", "metadata");

          const showFrame = function () {
            try {
              if (video.currentTime < 0.1) video.currentTime = 0.1;
            } catch (_) {}
          };

          if (video.readyState >= 2) showFrame();
          else {
            video.addEventListener("loadeddata", showFrame, { once: true });
            video.addEventListener("loadedmetadata", showFrame, { once: true });
          }
        } catch (_) {}
      });
    }

    function recomputeAndRender() {
      let base = ALL_REVIEWS.filter(function (r) {
        const s = Number(r["Da 1 a 5 stelle come lo valuti?"]) || 0;
        return allowedStarsSet.has(s);
      });

      if (attachmentsOnly) {
        base = base.filter(function (r) {
          return parseMediaFromRow(r).length > 0;
        });
      }

      CURRENT_REVIEWS = sortReviewsByPreferredCountryAndDate(
        base,
        preferredCountries,
        activeSort
      );

      visibleCount = 4;
      renderReviews();
    }

    function renderReviews() {
      const data = CURRENT_REVIEWS || [];

      let activeFiltersHint = "";
      if (attachmentsOnly) {
        activeFiltersHint = `<div class="reviews-active-hint">${escapeHtml(
          T.onlyMediaHint
        )}</div>`;
      }

      if (!data.length) {
        const emptyText = attachmentsOnly ? T.noMediaMatch : T.noReviews;

        // IMPORTANT CHANGE:
        // When empty-state appears, the button must go to the Welo Page (data-welo-page).
        // If missing, fallback to old behavior.
        const buttonHtml = weloPageUrl
          ? `
            <a class="review-button" href="${escapeHtml(weloPageUrl)}" target="_blank" rel="noopener noreferrer">
              <img src="${BUTTON_ICON}" alt="" />
              ${escapeHtml(T.writeReview)}
            </a>
          `
          : `
            <button class="review-button" type="button" data-action="write-review">
              <img src="${BUTTON_ICON}" alt="" />
              ${escapeHtml(T.writeReview)}
            </button>
          `;

        listEl.innerHTML = `
          <div class="no-reviews-box">
            <div class="no-reviews-text">${escapeHtml(emptyText)}</div>
            ${buttonHtml}
          </div>
        `;
        return;
      }

      const toShow = data.slice(0, visibleCount);

      const cardsHtml = toShow
        .map(function (r) {
          const stars = Number(r["Da 1 a 5 stelle come lo valuti?"]) || 0;

          const rawDate = new Date(r["Submitted at"] || r.created_at || "");
          const relativeDate = formatRelativeTime(rawDate, locale);

          const starsHtml =
            Array(stars)
              .fill(`<img src="${FULL_STAR}" alt="" />`)
              .join("") +
            Array(Math.max(0, 5 - stars))
              .fill(`<img src="${EMPTY_STAR}" alt="" />`)
              .join("");

          const media = parseMediaFromRow(r);
          let mediaHtml = "";

          if (media.length > 0) {
            const mediaAttr = encodeURIComponent(JSON.stringify(media));

            const thumbsHtml = media
              .map(function (item, index) {
                const isMain = index === 0;
                const classes =
                  "review-media-thumb " +
                  (isMain
                    ? "review-media-thumb--main"
                    : "review-media-thumb--secondary");

                let inner = "";
                if (item.type === "image") {
                  inner = `<img src="${item.url}" alt="" loading="lazy" />`;
                } else {
                  inner =
                    `<div class="review-media-video-thumb">` +
                    `<video src="${item.url}" muted playsinline preload="metadata"></video>` +
                    `</div>` +
                    `<div class="review-media-play-icon"></div>`;
                }

                const zIndex = media.length - index;

                return `
                  <div class="${classes}" data-action="open-media" data-media="${mediaAttr}" data-index="${index}" style="z-index:${zIndex};">
                    ${inner}
                  </div>
                `;
              })
              .join("");

            mediaHtml = `<div class="review-media">${thumbsHtml}</div>`;
          }

          const safeTitle = escapeHtml(r.Titolo || "");
          const safeText = escapeHtml(r.Testo || "");
          const safeAuthor = escapeHtml(r["Nome e cognome"] || "");

          return `
            <div class="review-card">
              <div class="review-verified">
                <img src="${VER_ICON}" alt="" />
                <span>${escapeHtml(T.verified)}</span>
              </div>

              <div class="review-stars">${starsHtml}</div>

              <div class="review-title">${safeTitle}</div>
              <div class="review-text">${safeText}</div>

              ${mediaHtml}

              <div class="review-footer">
                <span class="review-author">${safeAuthor}</span>
                <span class="review-date">${escapeHtml(relativeDate)}</span>
              </div>

              <div class="review-actions">
                <a class="review-report" href="${REPORT_URL}" target="_blank" rel="noopener noreferrer">
                  <img src="${FLAG_ICON}" alt="" />
                  <span>${escapeHtml(T.report)}</span>
                </a>

                <a class="review-share" href="#" data-action="share" data-stars="${stars}"
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

      let loadMoreHtml = "";
      if (visibleCount < data.length) {
        loadMoreHtml = `
          <button class="load-more-reviews" type="button" data-action="load-more">
            ${escapeHtml(T.loadMore)}
          </button>
        `;
      }

      listEl.innerHTML = activeFiltersHint + cardsHtml + loadMoreHtml;
      initVideoThumbPreviews();
    }

    widgetRoot.addEventListener("click", async function (e) {
      const btn = e.target.closest("button, a, .review-media-thumb");
      if (!btn) return;

      const action = btn.getAttribute("data-action");

      if (btn.classList.contains("sort-pill") && btn.hasAttribute("data-sort")) {
        widgetRoot
          .querySelectorAll('.sort-pill[data-sort]')
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        activeSort = btn.getAttribute("data-sort") === "oldest" ? "oldest" : "newest";
        recomputeAndRender();
        return;
      }

      if (btn.classList.contains("sort-pill-attachments")) {
        attachmentsOnly = !attachmentsOnly;
        btn.classList.toggle("active", attachmentsOnly);
        recomputeAndRender();
        return;
      }

      if (action === "load-more") {
        visibleCount += 4;
        renderReviews();
        return;
      }

      if (action === "open-media") {
        const encoded = btn.getAttribute("data-media");
        const index = Number(btn.getAttribute("data-index")) || 0;
        if (!encoded) return;
        try {
          const media = JSON.parse(decodeURIComponent(encoded));
          lightbox.open(media, index);
        } catch (err) {
          console.error("[Welo Widget] Media parse error", err);
        }
        return;
      }

      if (action === "share") {
        e.preventDefault();
        const stars = Number(btn.getAttribute("data-stars")) || 0;
        const title = decodeURIComponent(btn.getAttribute("data-title") || "");
        const text = decodeURIComponent(btn.getAttribute("data-text") || "");
        await shareReview(locale, stars, title, text);
        return;
      }

      // fallback only if we don't have a weloPageUrl (because now empty-state uses link)
      if (action === "write-review") {
        if (typeof window.openWeloReviewPopup === "function") {
          window.openWeloReviewPopup();
          return;
        }
        const url = writeReviewFallbackUrl + "/?company=" + encodeURIComponent(company);
        window.open(url, "_blank", "noopener");
        return;
      }
    });

    async function load() {
      try {
        const data = await fetchReviewsForCompany(company);
        ALL_REVIEWS = data;

        activeSort = "newest";
        attachmentsOnly = false;

        widgetRoot
          .querySelectorAll('.sort-pill[data-sort]')
          .forEach((b) => b.classList.remove("active"));
        widgetRoot.querySelector('.sort-pill[data-sort="newest"]')?.classList.add("active");
        widgetRoot.querySelector(".sort-pill-attachments")?.classList.remove("active");

        recomputeAndRender();
      } catch (err) {
        console.error("[Welo Reviews Widget] Load error:", err);
        listEl.innerHTML = `<div class="no-reviews-box"><div class="no-reviews-text">Widget error.</div></div>`;
      }
    }

    load();
  }

  /* ================= BOOT ================= */
  function boot() {
    injectInterFontOnce();
    injectStyles();

    const nodes = document.querySelectorAll("[data-welo-reviews]");
    nodes.forEach(mountWidget);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

