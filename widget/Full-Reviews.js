/*!
 * Welo Reviews Widget — v2.1.0
 *
 * Embed example:
 * <div
 *   data-welo-reviews
 *   data-company="Truswave"
 *   data-stars="all"
 *   data-language="US"
 *   data-locale="en"
 *   data-theme="auto"
 *   data-welo-page="https://www.welobadge.com/en/welo-page/truswave"
 * ></div>
 * <script src="https://weloverify.github.io/welo-reviews-data/widget/Full-Reviews.js" defer></script>
 */

(function () {
  "use strict";

  /* =========================================================
     CONFIG
  ========================================================= */
  const SUPABASE_URL = "https://ufqvcojyfsnscuddadnw.supabase.co";
  const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmcXZjb2p5ZnNuc2N1ZGRhZG53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MTg2NjksImV4cCI6MjA2MzM5NDY2OX0.iYJVmg9PXxOu0R3z62iRzr4am0q8ZSc8THlB2rE2oQM";

  const TABLE_REVIEWS = "lascia_una_recensione";
  const FIELD_COMPANY = "azienda";
  const FIELD_STATUS = "status";
  const FIELD_STARS = "Da 1 a 5 stelle come lo valuti?";
  const APPROVED_VALUES = ["Approved", "approved"];

  const STORAGE_BASE =
    SUPABASE_URL + "/storage/v1/object/public/reviews-proof/";

  /* =========================================================
     ASSETS
  ========================================================= */
  const BUTTON_ICON =
    "https://cdn.prod.website-files.com/672c7e4b5413fe846587b57a/67cf055c4add3a04ada1cca4_Group%201597880572.png";
  const VER_ICON =
    "https://cdn.prod.website-files.com/672c7e4b5413fe846587b57a/67c5867114795e1d6d4cc213_Vector.png";
  const FLAG_ICON =
    "https://cdn.prod.website-files.com/672c7e4b5413fe846587b57a/68388cede00174b6fb950e50_solar_flag-outline.svg";
  const SHARE_ICON =
    "https://cdn.prod.website-files.com/672c7e4b5413fe846587b57a/68388cef10c9406397f55734_Vector.svg";

  /* =========================================================
     I18N
  ========================================================= */
  const TEXTS = {
    it: {
      writeReview: "Scrivi una recensione",
      newest: "Più recenti",
      oldest: "Più vecchie",
      withMedia: "Con allegati",
      noReviews: "Ancora nessuna recensione, scrivi tu la prima.",
      noReviewsMedia: "Nessuna recensione con allegati corrisponde ai filtri.",
      verified: "Verificata da Welo",
      verifiedTooltip:
        "La recensione è stata verificata da Welo. Scopri il nostro processo di verifica:",
      readMore: "Leggi di più",
      loadMore: "Carica di più",
      share: "Condividi",
      shareCopied: "Link copiato negli appunti",
      report: "Segnala",
      onlyMediaHint: "Stai visualizzando solo le recensioni con foto o video.",
      copyLink: "Copia questo link:",
      justNow: "Pochi istanti fa",
      today: "Oggi",
      oneDayAgo: "1 giorno fa",
      daysAgo: "giorni fa",
      oneWeekAgo: "1 settimana fa",
      weeksAgo: "settimane fa",
      oneMonthAgo: "1 mese fa",
      monthsAgo: "mesi fa",
      oneYearAgo: "1 anno fa",
      yearsAgo: "anni fa",
      widgetError: "Errore widget.",
      loading: "Caricamento recensioni...",
      basedOn: "Basato su",
      reviewSingular: "recensione",
      reviewPlural: "recensioni",
      ariaStars: "su 5 stelle"
    },
    en: {
      writeReview: "Write a review",
      newest: "Newest",
      oldest: "Oldest",
      withMedia: "With media",
      noReviews: "No reviews yet, be the first to write one.",
      noReviewsMedia: "No reviews with attachments match the filters.",
      verified: "Verified by Welo",
      verifiedTooltip:
        "This review was verified by Welo. Learn about our verification process:",
      readMore: "Read more",
      loadMore: "Load more",
      share: "Share",
      shareCopied: "Link copied to clipboard",
      report: "Report",
      onlyMediaHint: "Showing only reviews with photos or videos.",
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
      widgetError: "Widget error.",
      loading: "Loading reviews...",
      basedOn: "Based on",
      reviewSingular: "review",
      reviewPlural: "reviews",
      ariaStars: "out of 5 stars"
    }
  };

  /* =========================================================
     GLOBAL GUARDS
  ========================================================= */
  if (window.__WELO_REVIEWS_WIDGET_V210__) return;
  window.__WELO_REVIEWS_WIDGET_V210__ = true;

  /* =========================================================
     THEME
  ========================================================= */
  const AUTO_THEME_WIDGETS = new Set();

  function normalizeThemeValue(value) {
    const v = String(value || "").trim().toLowerCase();
    if (v === "dark") return "dark";
    if (v === "auto") return "auto";
    return "light";
  }

  function getResolvedTheme(theme) {
    if (theme === "dark") return "dark";
    if (theme === "auto") {
      try {
        return window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      } catch (_) {
        return "light";
      }
    }
    return "light";
  }

  function applyWidgetTheme(widgetRoot, themeValue) {
    if (!widgetRoot) return;

    const theme = normalizeThemeValue(themeValue);
    const resolved = getResolvedTheme(theme);

    widgetRoot.setAttribute("data-theme", theme);
    widgetRoot.setAttribute("data-resolved-theme", resolved);

    if (theme === "auto") {
      AUTO_THEME_WIDGETS.add(widgetRoot);
    } else {
      AUTO_THEME_WIDGETS.delete(widgetRoot);
    }
  }

  function refreshAutoThemeWidgets() {
    AUTO_THEME_WIDGETS.forEach(function (widgetRoot) {
      if (!widgetRoot || !document.body.contains(widgetRoot)) {
        AUTO_THEME_WIDGETS.delete(widgetRoot);
        return;
      }
      widgetRoot.setAttribute("data-resolved-theme", getResolvedTheme("auto"));
    });
  }

  function installAutoThemeHandlersOnce() {
    if (window.__weloReviewsAutoThemeInstalled) return;
    window.__weloReviewsAutoThemeInstalled = true;

    if (!window.matchMedia) return;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = function () {
      refreshAutoThemeWidgets();
    };

    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", onChange);
    } else if (typeof mq.addListener === "function") {
      mq.addListener(onChange);
    }
  }

  /* =========================================================
     STYLES
  ========================================================= */
  function injectInterFontOnce() {
    if (document.querySelector('link[data-welo-inter="1"]')) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap";
    link.setAttribute("data-welo-inter", "1");
    document.head.appendChild(link);
  }

  function injectStyles() {
    if (document.getElementById("welo-reviews-widget-styles-v210")) return;

    const style = document.createElement("style");
    style.id = "welo-reviews-widget-styles-v210";
    style.textContent = `
.welo-reviews-widget-shell,
.welo-reviews-widget-shell *,
.welo-reviews-widget-shell *::before,
.welo-reviews-widget-shell *::after {
  box-sizing: border-box;
}

.welo-reviews-widget-shell,
.welo-reviews-widget-shell button,
.welo-reviews-widget-shell a,
.welo-reviews-widget-shell span,
.welo-reviews-widget-shell div {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

.welo-reviews-widget-shell {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.welo-reviews-widget {
  width: 100%;
  text-align: left !important;
  --welo-header-title: #111111;
  --welo-text: #5d5d5d;
  --welo-text-strong: #111111;
  --welo-muted: #8d8d8d;
  --welo-surface: #ffffff;
  --welo-surface-2: #fafafa;
  --welo-border: #e6e6e6;
  --welo-border-soft: #efefef;
  --welo-stroke-section: #ececec;
  --welo-pill-bg: #ffffff;
  --welo-pill-hover: #f7f7f7;
  --welo-pill-border: #e4e4e4;
  --welo-pill-text: #111111;
  --welo-pill-active-bg: #1b1b1b;
  --welo-pill-active-text: #ffffff;
  --welo-pill-active-border: #1b1b1b;
  --welo-btn-bg: #111111;
  --welo-btn-hover: #1e1e1e;
  --welo-btn-border: #111111;
  --welo-btn-text: #ffffff;
  --welo-btn-secondary-bg: #ffffff;
  --welo-btn-secondary-hover: #fafafa;
  --welo-btn-secondary-border: #e3e3e3;
  --welo-btn-secondary-text: #111111;
  --welo-tooltip-bg: #ffffff;
  --welo-tooltip-border: #e8e8e8;
  --welo-tooltip-text: #5d5d5d;
  --welo-tooltip-link: #111111;
  --welo-star-filled: #111111;
  --welo-star-empty: #d5d5d5;
  --welo-verified-icon-filter: none;
  --welo-action-icon-filter: none;
  --welo-card-shadow: 0 2px 12px rgba(0, 0, 0, 0.028);
  --welo-card-shadow-hover: 0 10px 28px rgba(0, 0, 0, 0.06);
}

.welo-reviews-widget[data-resolved-theme="dark"] {
  --welo-header-title: #ffffff;
  --welo-text: #d2d2d2;
  --welo-text-strong: #ffffff;
  --welo-muted: #b2b2b2;
  --welo-surface: #121212;
  --welo-surface-2: #171717;
  --welo-border: #272727;
  --welo-border-soft: #2a2a2a;
  --welo-stroke-section: #262626;
  --welo-pill-bg: #121212;
  --welo-pill-hover: #1a1a1a;
  --welo-pill-border: #2b2b2b;
  --welo-pill-text: #ffffff;
  --welo-pill-active-bg: #232323;
  --welo-pill-active-text: #ffffff;
  --welo-pill-active-border: #313131;
  --welo-btn-bg: #ffffff;
  --welo-btn-hover: #ededed;
  --welo-btn-border: #ffffff;
  --welo-btn-text: #111111;
  --welo-btn-secondary-bg: #121212;
  --welo-btn-secondary-hover: #1b1b1b;
  --welo-btn-secondary-border: #2a2a2a;
  --welo-btn-secondary-text: #ffffff;
  --welo-tooltip-bg: #151515;
  --welo-tooltip-border: #2b2b2b;
  --welo-tooltip-text: #ffffff;
  --welo-tooltip-link: #ffffff;
  --welo-star-filled: #ffffff;
  --welo-star-empty: rgba(255,255,255,0.22);
  --welo-verified-icon-filter: brightness(0) invert(1);
  --welo-action-icon-filter: brightness(0) invert(1);
  --welo-card-shadow: 0 2px 12px rgba(0, 0, 0, 0.14);
  --welo-card-shadow-hover: 0 12px 28px rgba(0, 0, 0, 0.22);
}

.welo-reviews-widget .welo-summary {
  width: 100%;
  padding: 8px 0 26px;
  border-bottom: 1px solid var(--welo-stroke-section);
  margin-bottom: 22px;
}

.welo-reviews-widget .welo-summary-verified {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  padding: 9px 13px;
  border-radius: 999px;
  background: var(--welo-btn-secondary-bg);
  border: 1px solid var(--welo-btn-secondary-border);
  margin-bottom: 18px;
}

.welo-reviews-widget .welo-summary-verified img {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  display: block;
  filter: var(--welo-verified-icon-filter);
}

.welo-reviews-widget .welo-summary-verified span {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--welo-text-strong);
  line-height: 1;
}

.welo-reviews-widget .welo-summary-main {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 18px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}

.welo-reviews-widget .welo-summary-score {
  font-size: 92px;
  line-height: 0.92;
  font-weight: 700;
  letter-spacing: -0.08em;
  color: var(--welo-header-title);
}

.welo-reviews-widget .welo-summary-side {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 8px;
  padding-bottom: 12px;
}

.welo-reviews-widget .welo-summary-stars {
  display: flex;
  align-items: center;
  gap: 4px;
}

.welo-reviews-widget .welo-summary-star {
  width: 24px;
  height: 24px;
  display: block;
  flex-shrink: 0;
}

.welo-reviews-widget .welo-summary-meta {
  font-size: 18px;
  line-height: 1.2;
  font-weight: 700;
  color: var(--welo-text-strong);
  letter-spacing: -0.02em;
}

.welo-reviews-widget .welo-summary-actions {
  display: flex;
  justify-content: center;
}

.welo-reviews-widget .welo-summary-write-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 13px 18px;
  border-radius: 999px;
  border: 1px solid var(--welo-btn-border);
  background: var(--welo-btn-bg);
  color: var(--welo-btn-text);
  font-size: 15px;
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
  text-decoration: none;
  transition: background-color 0.22s ease, transform 0.1s ease, opacity 0.2s ease;
}

.welo-reviews-widget .welo-summary-write-btn:hover {
  background: var(--welo-btn-hover);
}

.welo-reviews-widget .welo-summary-write-btn:active {
  transform: translateY(1px);
}

.welo-reviews-widget .welo-verified-tooltip {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: min(360px, 82vw);
  background: var(--welo-tooltip-bg);
  border: 1px solid var(--welo-tooltip-border);
  border-radius: 12px;
  padding: 12px 13px;
  box-shadow: 0 16px 38px rgba(0, 0, 0, 0.08);
  font-size: 13px;
  line-height: 1.48;
  color: var(--welo-tooltip-text);
  opacity: 0;
  transform: translateY(-6px);
  pointer-events: none;
  transition: opacity 0.18s ease, transform 0.18s ease;
  z-index: 30;
}

.welo-reviews-widget .welo-verified-tooltip a {
  color: var(--welo-tooltip-link);
  text-decoration: underline;
  font-weight: 600;
}

@media (hover: hover) and (pointer: fine) {
  .welo-reviews-widget .welo-summary-verified:hover .welo-verified-tooltip,
  .welo-reviews-widget .review-verified:hover .welo-verified-tooltip {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
}

.welo-reviews-widget .welo-summary-verified.is-tooltip-open .welo-verified-tooltip,
.welo-reviews-widget .review-verified.is-tooltip-open .welo-verified-tooltip {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.welo-reviews-widget .reviews-controls {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  position: relative;
  z-index: 5;
}

.welo-reviews-widget .sort-pill-group {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  min-width: 0;
}

.welo-reviews-widget .sort-pill {
  appearance: none;
  -webkit-appearance: none;
  border: 1px solid var(--welo-pill-border);
  background: var(--welo-pill-bg);
  color: var(--welo-pill-text);
  min-height: 48px;
  padding: 0 24px;
  border-radius: 18px;
  font-size: 17px;
  font-weight: 500;
  letter-spacing: -0.02em;
  cursor: pointer;
  transition: background-color 0.18s ease, border-color 0.18s ease, color 0.18s ease, transform 0.1s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  flex: 0 0 auto;
  position: relative;
  pointer-events: auto;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}

.welo-reviews-widget .sort-pill:hover {
  background: var(--welo-pill-hover);
}

.welo-reviews-widget .sort-pill:active {
  transform: translateY(1px);
}

.welo-reviews-widget .sort-pill.active {
  background: var(--welo-pill-active-bg);
  color: var(--welo-pill-active-text);
  border-color: var(--welo-pill-active-border);
}

.welo-reviews-widget .review-card {
  background: var(--welo-surface);
  border: 1px solid var(--welo-border);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 18px;
  position: relative;
  transition: border-color 0.22s ease, box-shadow 0.22s ease, background-color 0.22s ease;
  box-shadow: var(--welo-card-shadow);
}

.welo-reviews-widget .review-card:hover {
  box-shadow: var(--welo-card-shadow-hover);
}

.welo-reviews-widget .review-stars {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 14px;
  padding-right: 190px;
}

.welo-reviews-widget .review-star {
  display: inline-flex;
  width: 18px;
  height: 18px;
  line-height: 0;
  flex-shrink: 0;
}

.welo-reviews-widget .review-star svg {
  width: 18px;
  height: 18px;
  display: block;
}

.welo-reviews-widget .review-star.is-filled {
  color: var(--welo-star-filled);
}

.welo-reviews-widget .review-star.is-empty {
  color: var(--welo-star-empty);
}

.welo-reviews-widget .review-verified {
  position: absolute;
  top: 16px;
  right: 16px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  padding: 8px 12px;
  border-radius: 999px;
  background: var(--welo-btn-secondary-bg);
  border: 1px solid var(--welo-btn-secondary-border);
  z-index: 5;
}

.welo-reviews-widget .review-verified img {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  display: block;
  filter: var(--welo-verified-icon-filter);
}

.welo-reviews-widget .review-verified span {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--welo-text-strong);
  line-height: 1;
}

.welo-reviews-widget .review-title {
  font-size: 18px;
  line-height: 1.3;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--welo-text-strong);
  margin-bottom: 10px;
  padding-right: 210px;
  word-break: break-word;
}

.welo-reviews-widget .review-text {
  font-size: 15px;
  color: var(--welo-text);
  line-height: 1.68;
  margin-bottom: 16px;
  white-space: pre-line;
  word-break: break-word;
}

.welo-reviews-widget .review-footer {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.welo-reviews-widget .review-author {
  font-size: 14px;
  font-weight: 600;
  color: var(--welo-text-strong);
  letter-spacing: -0.01em;
}

.welo-reviews-widget .review-date {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: var(--welo-muted);
}

.welo-reviews-widget .review-date::before {
  content: "•";
  color: #cfcfcf;
  font-size: 12px;
  line-height: 1;
}

.welo-reviews-widget .review-actions {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid var(--welo-border-soft);
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.welo-reviews-widget .review-report,
.welo-reviews-widget .review-share {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-height: 34px;
  padding: 6px 8px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
  color: var(--welo-muted);
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.18s ease, color 0.18s ease, opacity 0.18s ease;
}

.welo-reviews-widget .review-report:hover,
.welo-reviews-widget .review-share:hover {
  background: var(--welo-surface-2);
  color: var(--welo-text-strong);
}

.welo-reviews-widget .review-report img,
.welo-reviews-widget .review-share img {
  width: 14px;
  height: 14px;
  opacity: 0.8;
  flex-shrink: 0;
  filter: var(--welo-action-icon-filter);
}

.welo-reviews-widget .no-reviews-box {
  width: 100%;
  background: var(--welo-surface);
  border: 1px solid var(--welo-border);
  padding: 44px 20px;
  border-radius: 16px;
  text-align: center;
  box-shadow: var(--welo-card-shadow);
}

.welo-reviews-widget .no-reviews-text {
  font-size: 16px;
  color: var(--welo-text-strong);
  margin-bottom: 20px;
  line-height: 1.5;
}

.welo-reviews-widget .review-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  max-width: 240px;
  width: 100%;
  min-height: 44px;
  padding: 10px 20px;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--welo-btn-text);
  background-color: var(--welo-btn-bg);
  border: 1px solid var(--welo-btn-border);
  border-radius: 999px;
  text-decoration: none;
  transition: background-color 0.22s ease, color 0.2s ease, border-color 0.2s ease, transform 0.1s ease;
  cursor: pointer;
}

.welo-reviews-widget .review-button:hover {
  background-color: var(--welo-btn-hover);
}

.welo-reviews-widget .review-button:active {
  transform: translateY(1px);
}

.welo-reviews-widget .review-button img {
  width: 18px;
  height: 18px;
  filter: var(--welo-action-icon-filter);
}

.welo-reviews-widget .load-more-reviews {
  margin: 12px auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 220px;
  width: 100%;
  min-height: 44px;
  padding: 10px 18px;
  border-radius: 999px;
  border: 1px solid var(--welo-btn-border);
  background: var(--welo-btn-bg);
  color: var(--welo-btn-text);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.1s ease, background-color 0.2s ease;
}

.welo-reviews-widget .load-more-reviews:hover {
  background: var(--welo-btn-hover);
}

.welo-reviews-widget .load-more-reviews:active {
  transform: translateY(1px);
}

.welo-reviews-widget .review-media {
  display: flex;
  align-items: center;
  margin: 2px 0 16px;
  padding-top: 2px;
}

.welo-reviews-widget .review-media-thumb {
  position: relative;
  width: 84px;
  height: 84px;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid var(--welo-border);
  background: #050505;
  cursor: pointer;
  flex-shrink: 0;
  transition: border-color 0.2s ease;
}

.welo-reviews-widget .review-media-thumb + .review-media-thumb {
  margin-left: -46px;
}

.welo-reviews-widget .review-media-thumb--main {
  transform: rotate(-5deg);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.14);
}

.welo-reviews-widget .review-media-thumb--secondary {
  transform: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.welo-reviews-widget .review-media-thumb img,
.welo-reviews-widget .review-media-thumb video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  pointer-events: none;
}

.welo-reviews-widget .review-media-video-thumb {
  width: 100%;
  height: 100%;
  background: #050505;
  position: relative;
  overflow: hidden;
}

.welo-reviews-widget .review-media-play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.94);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.28);
}

.welo-reviews-widget .review-media-play-icon::before {
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 6px 0 6px 10px;
  border-color: transparent transparent transparent #000000;
  margin-left: 2px;
}

.welo-reviews-widget .reviews-active-hint {
  font-size: 13px;
  color: var(--welo-text);
  margin-bottom: 12px;
  padding-left: 2px;
}

.welo-review-lightbox-overlay {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: rgba(10, 12, 16, 0.88);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.22s ease;
  backdrop-filter: blur(8px);
}

.welo-review-lightbox-overlay.is-visible {
  opacity: 1;
  pointer-events: auto;
}

.welo-review-lightbox-inner {
  position: relative;
  max-width: min(96vw, 760px);
  width: 100%;
  padding: 24px 56px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

.welo-review-lightbox-media-container {
  flex: 1;
  max-width: 660px;
  max-height: 82vh;
  border-radius: 20px;
  overflow: hidden;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
}

.welo-review-lightbox-media {
  max-width: 100%;
  max-height: 100%;
  display: block;
}

.welo-review-lightbox-close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.52);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 50;
}

.welo-review-lightbox-close svg {
  width: 18px;
  height: 18px;
}

.welo-review-lightbox-nav {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.52);
  color: #ffffff;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 40;
}

.welo-review-lightbox-prev,
.welo-review-lightbox-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.welo-review-lightbox-prev { left: 16px; }
.welo-review-lightbox-next { right: 16px; }

.welo-review-lightbox-counter {
  position: absolute;
  bottom: 18px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.52);
  color: #ffffff;
  padding: 7px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: -0.01em;
  z-index: 40;
}

@media (max-width: 767px) {
  .welo-reviews-widget .welo-summary {
    padding: 2px 0 20px;
    margin-bottom: 18px;
  }

  .welo-reviews-widget .welo-summary-verified {
    margin-bottom: 14px;
    padding: 8px 11px;
  }

  .welo-reviews-widget .welo-summary-verified img {
    width: 15px;
    height: 15px;
  }

  .welo-reviews-widget .welo-summary-verified span {
    font-size: 12px;
  }

  .welo-reviews-widget .welo-summary-main {
    gap: 12px;
    margin-bottom: 14px;
    align-items: center;
  }

  .welo-reviews-widget .welo-summary-score {
    font-size: 70px;
  }

  .welo-reviews-widget .welo-summary-side {
    align-items: center;
    padding-bottom: 0;
  }

  .welo-reviews-widget .welo-summary-star {
    width: 20px;
    height: 20px;
  }

  .welo-reviews-widget .welo-summary-meta {
    font-size: 15px;
    text-align: center;
  }

  .welo-reviews-widget .welo-summary-actions {
    width: 100%;
  }

  .welo-reviews-widget .welo-summary-write-btn {
    width: 100%;
    min-height: 46px;
    font-size: 14px;
  }

  .welo-reviews-widget .reviews-controls {
    margin-bottom: 16px;
  }

  .welo-reviews-widget .sort-pill-group {
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    width: 100%;
    padding-bottom: 4px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
    touch-action: pan-x;
    gap: 8px;
  }

  .welo-reviews-widget .sort-pill-group::-webkit-scrollbar {
    display: none;
  }

  .welo-reviews-widget .sort-pill {
    min-height: 42px;
    padding: 0 18px;
    font-size: 15px;
    border-radius: 16px;
  }

  .welo-reviews-widget .review-card {
    padding: 16px;
    margin-bottom: 14px;
  }

  .welo-reviews-widget .review-stars {
    padding-right: 0;
    margin-bottom: 12px;
  }

  .welo-reviews-widget .review-star,
  .welo-reviews-widget .review-star svg {
    width: 17px;
    height: 17px;
  }

  .welo-reviews-widget .review-verified {
    position: relative;
    top: auto;
    right: auto;
    margin-bottom: 12px;
    width: fit-content;
    max-width: 100%;
    padding: 8px 11px;
  }

  .welo-reviews-widget .review-verified img {
    width: 15px;
    height: 15px;
  }

  .welo-reviews-widget .review-verified span {
    font-size: 12px;
  }

  .welo-reviews-widget .review-title {
    font-size: 17px;
    margin-bottom: 8px;
    padding-right: 0;
  }

  .welo-reviews-widget .review-text {
    font-size: 14px;
    line-height: 1.62;
    margin-bottom: 14px;
  }

  .welo-reviews-widget .review-media {
    margin-bottom: 14px;
  }

  .welo-reviews-widget .review-media-thumb {
    width: 74px;
    height: 74px;
    border-radius: 16px;
  }

  .welo-reviews-widget .review-media-thumb + .review-media-thumb {
    margin-left: -38px;
  }

  .welo-reviews-widget .review-button {
    max-width: none;
    width: 100%;
  }

  .welo-review-lightbox-inner {
    padding: 18px 20px;
  }

  .welo-review-lightbox-media-container {
    max-height: 78vh;
    border-radius: 18px;
  }

  .welo-review-lightbox-nav {
    width: 38px;
    height: 38px;
    font-size: 22px;
  }

  .welo-review-lightbox-prev { left: 8px; }
  .welo-review-lightbox-next { right: 8px; }

  .welo-review-lightbox-close {
    top: 10px;
    right: 10px;
    width: 34px;
    height: 34px;
  }

  .welo-review-lightbox-counter {
    bottom: 12px;
    font-size: 12px;
    padding: 5px 10px;
  }

  .welo-reviews-widget .welo-verified-tooltip {
    width: min(300px, calc(100vw - 56px));
    font-size: 12px;
  }
}
    `;
    document.head.appendChild(style);
  }

  /* =========================================================
     UTILS
  ========================================================= */
  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function safeJsonParse(value, fallback) {
    try {
      return JSON.parse(value);
    } catch (_) {
      return fallback;
    }
  }

  function detectLocaleFromElement(el) {
    const explicit = String(el.getAttribute("data-locale") || "")
      .trim()
      .toLowerCase();

    if (explicit === "it" || explicit === "en") return explicit;

    const htmlLang = String(document.documentElement.lang || "")
      .trim()
      .toLowerCase();

    if (htmlLang.startsWith("it")) return "it";
    if (htmlLang.startsWith("en")) return "en";

    const langs = []
      .concat(navigator.languages || [])
      .concat([navigator.language || ""])
      .map(function (l) {
        return String(l || "").toLowerCase();
      })
      .filter(Boolean);

    if (langs.some(function (l) { return l.startsWith("it"); })) return "it";
    return "en";
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

  function getCompanyCandidates(input) {
    const raw = String(input || "").trim();
    const slug = makeSlug(raw);
    const spaced = slug.replace(/-/g, " ").trim();
    const titled = spaced
      .split(" ")
      .filter(Boolean)
      .map(function (part) {
        return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
      })
      .join(" ");

    return Array.from(new Set([raw, slug, spaced, titled].filter(Boolean)));
  }

  function getPublicUrlFromPath(path) {
    if (!path) return null;
    if (/^https?:\/\//i.test(String(path))) return String(path);

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
    const raw =
      row.prove_di_acquisto ||
      row["prove_di_acquisto"] ||
      row.media ||
      row["media"] ||
      "";

    if (!raw) return [];

    return String(raw)
      .split(",")
      .map(function (s) {
        return s.trim();
      })
      .filter(Boolean)
      .map(function (path) {
        const url = getPublicUrlFromPath(path);
        const isVideo = /\.(mp4|mov|webm|ogg|m4v)$/i.test(path);
        return {
          url: url,
          type: isVideo ? "video" : "image"
        };
      })
      .filter(function (item) {
        return !!item.url;
      });
  }

  function getCountryFromRow(row) {
    return (
      row["Respondent's country"] ||
      row.Paese ||
      row.country ||
      row.Country ||
      ""
    );
  }

  function normalizeCountry(country) {
    if (!country) return "";
    const c = String(country).trim().toLowerCase();

    if (c === "italy" || c === "italia" || c === "it") return "Italy";
    if (
      c === "united states of america" ||
      c === "united states" ||
      c === "usa" ||
      c === "us"
    ) return "United States of America";
    if (c === "united kingdom" || c === "uk" || c === "gb") return "United Kingdom";

    return String(country).trim();
  }

  function preferredCountriesFromElement(el, locale) {
    const raw = String(
      el.getAttribute("data-language") ||
      el.getAttribute("data-lenguage") ||
      ""
    )
      .trim()
      .toUpperCase();

    if (raw === "US") return ["United States of America"];
    if (raw === "IT") return ["Italy"];
    if (raw === "UK" || raw === "GB") return ["United Kingdom"];

    return locale === "it"
      ? ["Italy"]
      : ["United States of America", "United Kingdom"];
  }

  function formatRelativeTime(dateObj, locale) {
    const T = TEXTS[locale];
    if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) return "";

    const now = new Date();
    const diffMs = now.getTime() - dateObj.getTime();
    if (diffMs < 0) return T.justNow;

    const dayMs = 1000 * 60 * 60 * 24;
    const diffDays = Math.floor(diffMs / dayMs);
    if (diffDays <= 0) return T.today;

    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffDays < 7) return diffDays === 1 ? T.oneDayAgo : diffDays + " " + T.daysAgo;
    if (diffWeeks < 4) return diffWeeks === 1 ? T.oneWeekAgo : diffWeeks + " " + T.weeksAgo;
    if (diffMonths < 12) return diffMonths === 1 ? T.oneMonthAgo : diffMonths + " " + T.monthsAgo;
    return diffYears === 1 ? T.oneYearAgo : diffYears + " " + T.yearsAgo;
  }

  function formatReviewCount(value, locale) {
    return new Intl.NumberFormat(locale === "it" ? "it-IT" : "en-US").format(
      Number(value || 0)
    );
  }

  function formatSummaryScore(value) {
    const n = Number(value || 0);
    if (!Number.isFinite(n)) return "0.0";

    const rounded = Math.round(n * 100) / 100;
    if (Math.round(rounded * 10) === rounded * 10) return rounded.toFixed(1);
    return rounded.toFixed(2);
  }

  function buildSummaryMetaText(total, locale) {
    const T = TEXTS[locale];
    const count = formatReviewCount(total, locale);
    const word = Number(total) === 1 ? T.reviewSingular : T.reviewPlural;
    return T.basedOn + " " + count + " " + word;
  }

  function buildAverageStar(percent, id) {
    const width = Math.max(0, Math.min(100, percent));
    return `
      <svg class="welo-summary-star" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="${id}">
            <rect x="0" y="0" width="${width}%" height="100%"></rect>
          </clipPath>
        </defs>
        <path
          d="M11.998 2.5l2.78 5.633 6.217.904-4.498 4.385 1.062 6.191-5.561-2.924-5.56 2.924 1.061-6.191L3 9.037l6.218-.904L11.998 2.5z"
          fill="currentColor"
          style="color:var(--welo-star-empty)"
        />
        <path
          clip-path="url(#${id})"
          d="M11.998 2.5l2.78 5.633 6.217.904-4.498 4.385 1.062 6.191-5.561-2.924-5.56 2.924 1.061-6.191L3 9.037l6.218-.904L11.998 2.5z"
          fill="currentColor"
          style="color:var(--welo-star-filled)"
        />
      </svg>
    `;
  }

  function buildAverageStars(average, uidPrefix) {
    return Array.from({ length: 5 })
      .map(function (_, index) {
        const fill = Math.max(0, Math.min(1, Number(average || 0) - index)) * 100;
        return buildAverageStar(fill, uidPrefix + "-" + index);
      })
      .join("");
  }

  function renderCardStars(stars) {
    let html = "";
    for (let i = 0; i < 5; i++) {
      const filled = i < stars;
      html += `
        <span class="review-star ${filled ? "is-filled" : "is-empty"}" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.998 2.5l2.78 5.633 6.217.904-4.498 4.385 1.062 6.191-5.561-2.924-5.56 2.924 1.061-6.191L3 9.037l6.218-.904L11.998 2.5z"></path>
          </svg>
        </span>
      `;
    }
    return html;
  }

  function sortReviewsByPreferredCountryAndDate(reviews, preferredCountries, activeSort) {
    const preferredSet = new Set(
      (preferredCountries || []).map(function (c) {
        return normalizeCountry(c);
      })
    );

    const preferred = [];
    const other = [];

    reviews.forEach(function (review) {
      const country = normalizeCountry(getCountryFromRow(review));
      if (preferredSet.has(country)) preferred.push(review);
      else other.push(review);
    });

    function byDate(a, b) {
      const dateA = new Date(a["Submitted at"] || a.created_at || a.createdAt || 0).getTime();
      const dateB = new Date(b["Submitted at"] || b.created_at || b.createdAt || 0).getTime();
      return activeSort === "oldest" ? dateA - dateB : dateB - dateA;
    }

    preferred.sort(byDate);
    other.sort(byDate);

    return preferred.concat(other);
  }

  function computeStats(rows) {
    let total = 0;
    let weighted = 0;

    rows.forEach(function (row) {
      const stars = Number(row[FIELD_STARS]) || 0;
      if (stars >= 1 && stars <= 5) {
        total += 1;
        weighted += stars;
      }
    });

    return {
      total: total,
      average: total > 0 ? weighted / total : 0
    };
  }

  function parseAllowedStars(spec) {
    const raw = String(spec || "").trim().toLowerCase();
    const all = [5, 4, 3, 2, 1];

    if (!raw || raw === "all") return all;

    const plus = raw.match(/^(\d)\+$/);
    if (plus) {
      const n = Number(plus[1]);
      return all.filter(function (x) { return x >= n; });
    }

    const range = raw.match(/^(\d)\s*-\s*(\d)$/);
    if (range) {
      const a = Number(range[1]);
      const b = Number(range[2]);
      const min = Math.min(a, b);
      const max = Math.max(a, b);
      return all.filter(function (x) { return x >= min && x <= max; });
    }

    const single = raw.match(/^(\d)$/);
    if (single) {
      const n = Number(single[1]);
      if (n >= 1 && n <= 5) return [n];
    }

    return all;
  }

  function getWeloPageUrl(placeholderEl, company, locale) {
    const direct =
      String(placeholderEl.getAttribute("data-welo-page") || "").trim() ||
      String(placeholderEl.getAttribute("data-welo-page-url") || "").trim();

    if (direct) return direct;

    const slug = makeSlug(company);
    if (locale === "en") {
      return "https://www.welobadge.com/en/welo-page/" + encodeURIComponent(slug);
    }
    return "https://www.welobadge.com/welo-page/" + encodeURIComponent(slug);
  }

  /* =========================================================
     SUPABASE
  ========================================================= */
  async function supabaseFetch(url) {
    const res = await fetch(url, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: "Bearer " + SUPABASE_ANON_KEY
      },
      cache: "no-store"
    });

    if (!res.ok) {
      const text = await res.text().catch(function () { return ""; });
      throw new Error("Supabase error " + res.status + ": " + text);
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  }

  function buildBaseRestUrl() {
    return SUPABASE_URL + "/rest/v1/" + TABLE_REVIEWS;
  }

  async function fetchReviewsForCompany(companyName) {
    const candidates = getCompanyCandidates(companyName);
    const statuses = APPROVED_VALUES;

    for (let s = 0; s < statuses.length; s++) {
      const status = statuses[s];

      for (let i = 0; i < candidates.length; i++) {
        const candidate = candidates[i];
        const exactUrl =
          buildBaseRestUrl() +
          "?select=*" +
          "&" + encodeURIComponent(FIELD_STATUS) + "=eq." + encodeURIComponent(status) +
          "&" + encodeURIComponent(FIELD_COMPANY) + "=ilike." + encodeURIComponent(candidate);

        try {
          const exact = await supabaseFetch(exactUrl);
          if (exact.length) return exact;
        } catch (_) {}

        const wildcardUrl =
          buildBaseRestUrl() +
          "?select=*" +
          "&" + encodeURIComponent(FIELD_STATUS) + "=eq." + encodeURIComponent(status) +
          "&" + encodeURIComponent(FIELD_COMPANY) + "=ilike." + encodeURIComponent("*" + candidate + "*");

        try {
          const wildcard = await supabaseFetch(wildcardUrl);
          if (wildcard.length) return wildcard;
        } catch (_) {}
      }
    }

    return [];
  }

  /* =========================================================
     LIGHTBOX
  ========================================================= */
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

    function render() {
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
        video.style.maxHeight = "82vh";
        video.style.objectFit = "contain";
        mediaContainer.appendChild(video);
      } else {
        const img = document.createElement("img");
        img.src = item.url;
        img.alt = "";
        img.className = "welo-review-lightbox-media";
        img.style.maxWidth = "100%";
        img.style.maxHeight = "82vh";
        img.style.objectFit = "contain";
        mediaContainer.appendChild(img);
      }

      const total = state.media.length;
      counter.textContent = (state.index + 1) + " / " + total;
      counter.style.display = total > 1 ? "block" : "none";
      prevBtn.disabled = total <= 1;
      nextBtn.disabled = total <= 1;
    }

    function open(media, startIndex) {
      if (!Array.isArray(media) || !media.length) return;
      state.media = media;
      state.index = Number(startIndex) || 0;
      render();
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
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) close();
    });

    prevBtn.addEventListener("click", function () {
      if (state.media.length <= 1) return;
      state.index = (state.index - 1 + state.media.length) % state.media.length;
      render();
    });

    nextBtn.addEventListener("click", function () {
      if (state.media.length <= 1) return;
      state.index = (state.index + 1) % state.media.length;
      render();
    });

    document.addEventListener("keydown", function (e) {
      if (!overlay.classList.contains("is-visible")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prevBtn.click();
      if (e.key === "ArrowRight") nextBtn.click();
    });

    return { open, close };
  }

  /* =========================================================
     TOOLTIP HANDLERS
  ========================================================= */
  function installVerifiedTooltipHandlersOnce() {
    if (window.__weloReviewsTooltipHandlersInstalledV210) return;
    window.__weloReviewsTooltipHandlersInstalledV210 = true;

    function closeAll() {
      document
        .querySelectorAll(".welo-reviews-widget .review-verified.is-tooltip-open, .welo-reviews-widget .welo-summary-verified.is-tooltip-open")
        .forEach(function (el) {
          el.classList.remove("is-tooltip-open");
        });
    }

    document.addEventListener("pointerdown", function (e) {
      const insideLink = e.target.closest(".welo-reviews-widget .welo-verified-tooltip a");
      if (insideLink) return;

      const trigger = e.target.closest(".welo-reviews-widget .review-verified, .welo-reviews-widget .welo-summary-verified");
      if (!trigger) {
        closeAll();
        return;
      }

      if (window.matchMedia && window.matchMedia("(hover: none), (pointer: coarse)").matches) {
        const wasOpen = trigger.classList.contains("is-tooltip-open");
        closeAll();
        if (!wasOpen) trigger.classList.add("is-tooltip-open");
        e.preventDefault();
      }
    }, { passive: false });

    document.addEventListener("keydown", function (e) {
      const active = document.activeElement;
      if (!active) return;
      if (!active.classList) return;
      if (
        !active.classList.contains("review-verified") &&
        !active.classList.contains("welo-summary-verified")
      ) return;

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const wasOpen = active.classList.contains("is-tooltip-open");
        closeAll();
        if (!wasOpen) active.classList.add("is-tooltip-open");
      }
    });

    window.addEventListener("resize", closeAll);
    window.addEventListener("scroll", closeAll, { passive: true });
  }

  /* =========================================================
     SHARE
  ========================================================= */
  async function shareReview(locale, stars, title, text) {
    const T = TEXTS[locale];
    const baseUrl = window.location.href.split("#")[0];
    const shareTitle =
      locale === "it"
        ? "Recensione da " + stars + "★ su Welo"
        : stars + "★ review on Welo";

    const shareText =
      locale === "it"
        ? title + "\n\n" + text + "\n\nLeggi la recensione su Welo:"
        : title + "\n\n" + text + "\n\nRead the review on Welo:";

    try {
      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: baseUrl
        });
        return;
      }

      const fallbackText = shareTitle + "\n\n" + shareText + "\n" + baseUrl;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(fallbackText);
        alert(T.shareCopied);
        return;
      }

      window.prompt(T.copyLink, baseUrl);
    } catch (_) {}
  }

  /* =========================================================
     MOUNT
  ========================================================= */
  function mountWidget(placeholderEl) {
    if (!placeholderEl || placeholderEl.__weloMounted) return;
    placeholderEl.__weloMounted = true;

    const company = String(placeholderEl.getAttribute("data-company") || "").trim();
    if (!company) {
      console.warn("[Welo Reviews Widget] Missing data-company.");
      return;
    }

    const locale = detectLocaleFromElement(placeholderEl);
    const T = TEXTS[locale];
    const themeValue = normalizeThemeValue(placeholderEl.getAttribute("data-theme") || "light");
    const preferredCountries = preferredCountriesFromElement(placeholderEl, locale);
    const allowedStarsSet = new Set(parseAllowedStars(placeholderEl.getAttribute("data-stars")));
    const weloPageUrl = getWeloPageUrl(placeholderEl, company, locale);

    const REPORT_URL =
      locale === "en"
        ? "https://www.welobadge.com/en/contact-us"
        : "https://www.welobadge.com/contattaci";

    const VERIFIED_PROCESS_URL =
      locale === "en"
        ? "https://www.welobadge.com/en/verified-reviews"
        : "https://www.welobadge.com/recensioni-verificate";

    const instanceId = "welo_" + Math.random().toString(36).slice(2, 10);
    const lightbox = createLightbox(instanceId);

    let ALL_REVIEWS = [];
    let CURRENT_REVIEWS = [];
    let STATS = { total: 0, average: 0 };
    let activeSort = "newest";
    let attachmentsOnly = false;
    let visibleCount = 4;

    placeholderEl.classList.add("welo-reviews-widget-shell");
    placeholderEl.innerHTML = `
      <div class="welo-reviews-widget" data-welo-instance="${instanceId}">
        <div class="welo-summary">
          <div class="welo-summary-verified" role="button" tabindex="0" aria-label="${escapeHtml(T.verified)}">
            <img src="${VER_ICON}" alt="">
            <span>${escapeHtml(T.verified)}</span>
            <div class="welo-verified-tooltip" role="tooltip">
              ${escapeHtml(T.verifiedTooltip)}
              <a href="${escapeHtml(VERIFIED_PROCESS_URL)}" target="_blank" rel="noopener noreferrer">${escapeHtml(T.readMore)}</a>
            </div>
          </div>

          <div class="welo-summary-main">
            <div class="welo-summary-score">0.0</div>
            <div class="welo-summary-side">
              <div class="welo-summary-stars"></div>
              <div class="welo-summary-meta">${escapeHtml(T.basedOn)} 0 ${escapeHtml(T.reviewPlural)}</div>
            </div>
          </div>

          <div class="welo-summary-actions">
            <a class="welo-summary-write-btn" href="${escapeHtml(weloPageUrl)}" target="_blank" rel="noopener noreferrer">
              ${escapeHtml(T.writeReview)}
            </a>
          </div>
        </div>

        <div class="reviews-controls">
          <div class="sort-pill-group">
            <button class="sort-pill active" type="button" data-sort="newest">${escapeHtml(T.newest)}</button>
            <button class="sort-pill" type="button" data-sort="oldest">${escapeHtml(T.oldest)}</button>
            <button class="sort-pill sort-pill-attachments" type="button" data-attachments="true">${escapeHtml(T.withMedia)}</button>
          </div>
        </div>

        <div class="reviews-list">
          <div class="no-reviews-box">
            <div class="no-reviews-text">${escapeHtml(T.loading)}</div>
          </div>
        </div>
      </div>
    `;

    const widgetRoot = placeholderEl.querySelector(".welo-reviews-widget");
    const listEl = placeholderEl.querySelector(".reviews-list");
    const summaryScoreEl = placeholderEl.querySelector(".welo-summary-score");
    const summaryStarsEl = placeholderEl.querySelector(".welo-summary-stars");
    const summaryMetaEl = placeholderEl.querySelector(".welo-summary-meta");

    applyWidgetTheme(widgetRoot, themeValue);

    function updateSummary() {
      const uid = "welo-summary-star-" + Math.random().toString(36).slice(2, 9);
      summaryScoreEl.textContent = formatSummaryScore(STATS.average);
      summaryStarsEl.innerHTML = buildAverageStars(STATS.average, uid);
      summaryMetaEl.textContent = buildSummaryMetaText(STATS.total, locale);
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
      let base = ALL_REVIEWS.filter(function (row) {
        const stars = Number(row[FIELD_STARS]) || 0;
        return allowedStarsSet.has(stars);
      });

      if (attachmentsOnly) {
        base = base.filter(function (row) {
          return parseMediaFromRow(row).length > 0;
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
      if (!CURRENT_REVIEWS.length) {
        const text = attachmentsOnly ? T.noReviewsMedia : T.noReviews;
        listEl.innerHTML = `
          <div class="no-reviews-box">
            <div class="no-reviews-text">${escapeHtml(text)}</div>
            <a class="review-button" href="${escapeHtml(weloPageUrl)}" target="_blank" rel="noopener noreferrer">
              <img src="${BUTTON_ICON}" alt="">
              ${escapeHtml(T.writeReview)}
            </a>
          </div>
        `;
        return;
      }

      const hint = attachmentsOnly
        ? `<div class="reviews-active-hint">${escapeHtml(T.onlyMediaHint)}</div>`
        : "";

      const cards = CURRENT_REVIEWS.slice(0, visibleCount).map(function (r) {
        const stars = Number(r[FIELD_STARS]) || 0;
        const title = String(r.Titolo || r.title || "");
        const text = String(r.Testo || r.text || "");
        const author = String(r["Nome e cognome"] || r.nome || r.name || "");
        const date = new Date(r["Submitted at"] || r.created_at || r.createdAt || "");
        const relativeDate = formatRelativeTime(date, locale);
        const media = parseMediaFromRow(r);

        let mediaHtml = "";
        if (media.length) {
          const encodedMedia = encodeURIComponent(JSON.stringify(media));

          mediaHtml = `
            <div class="review-media">
              ${media.map(function (item, index) {
                const classes =
                  "review-media-thumb " +
                  (index === 0
                    ? "review-media-thumb--main"
                    : "review-media-thumb--secondary");

                const inner =
                  item.type === "video"
                    ? `
                      <div class="review-media-video-thumb">
                        <video src="${escapeHtml(item.url)}" muted playsinline preload="metadata"></video>
                      </div>
                      <div class="review-media-play-icon"></div>
                    `
                    : `<img src="${escapeHtml(item.url)}" alt="" loading="lazy">`;

                return `
                  <div
                    class="${classes}"
                    data-action="open-media"
                    data-media="${encodedMedia}"
                    data-index="${index}"
                    style="z-index:${media.length - index};"
                  >
                    ${inner}
                  </div>
                `;
              }).join("")}
            </div>
          `;
        }

        return `
          <div class="review-card">
            <div class="review-verified" role="button" tabindex="0" aria-label="${escapeHtml(T.verified)}">
              <img src="${VER_ICON}" alt="">
              <span>${escapeHtml(T.verified)}</span>
              <div class="welo-verified-tooltip" role="tooltip">
                ${escapeHtml(T.verifiedTooltip)}
                <a href="${escapeHtml(VERIFIED_PROCESS_URL)}" target="_blank" rel="noopener noreferrer">${escapeHtml(T.readMore)}</a>
              </div>
            </div>

            <div class="review-stars" aria-label="${stars} ${escapeHtml(T.ariaStars)}">
              ${renderCardStars(stars)}
            </div>

            <div class="review-title">${escapeHtml(title)}</div>
            <div class="review-text">${escapeHtml(text)}</div>

            ${mediaHtml}

            <div class="review-footer">
              <span class="review-author">${escapeHtml(author)}</span>
              <span class="review-date">${escapeHtml(relativeDate)}</span>
            </div>

            <div class="review-actions">
              <a class="review-report" href="${escapeHtml(REPORT_URL)}" target="_blank" rel="noopener noreferrer">
                <img src="${FLAG_ICON}" alt="">
                <span>${escapeHtml(T.report)}</span>
              </a>

              <a
                class="review-share"
                href="#"
                data-action="share"
                data-stars="${stars}"
                data-title="${encodeURIComponent(title)}"
                data-text="${encodeURIComponent(text)}"
              >
                <img src="${SHARE_ICON}" alt="">
                <span>${escapeHtml(T.share)}</span>
              </a>
            </div>
          </div>
        `;
      }).join("");

      const loadMore =
        visibleCount < CURRENT_REVIEWS.length
          ? `
            <button class="load-more-reviews" type="button" data-action="load-more">
              ${escapeHtml(T.loadMore)}
            </button>
          `
          : "";

      listEl.innerHTML = hint + cards + loadMore;
      initVideoThumbPreviews();
    }

    widgetRoot.addEventListener("click", function (e) {
      const target = e.target.closest("button, a, .review-media-thumb");
      if (!target) return;

      if (target.matches(".sort-pill[data-sort]")) {
        widgetRoot.querySelectorAll('.sort-pill[data-sort]').forEach(function (btn) {
          btn.classList.remove("active");
        });
        target.classList.add("active");
        activeSort = target.getAttribute("data-sort") === "oldest" ? "oldest" : "newest";
        recomputeAndRender();
        return;
      }

      if (target.classList.contains("sort-pill-attachments")) {
        attachmentsOnly = !attachmentsOnly;
        target.classList.toggle("active", attachmentsOnly);
        recomputeAndRender();
        return;
      }

      const action = target.getAttribute("data-action");

      if (action === "load-more") {
        visibleCount += 4;
        renderReviews();
        return;
      }

      if (action === "open-media") {
        const encoded = target.getAttribute("data-media");
        const index = Number(target.getAttribute("data-index")) || 0;
        const media = safeJsonParse(decodeURIComponent(encoded || ""), []);
        if (media.length) lightbox.open(media, index);
        return;
      }

      if (action === "share") {
        e.preventDefault();
        const stars = Number(target.getAttribute("data-stars")) || 0;
        const title = decodeURIComponent(target.getAttribute("data-title") || "");
        const text = decodeURIComponent(target.getAttribute("data-text") || "");
        shareReview(locale, stars, title, text);
      }
    });

    async function load() {
      try {
        const data = await fetchReviewsForCompany(company);
        ALL_REVIEWS = Array.isArray(data) ? data : [];
        STATS = computeStats(ALL_REVIEWS);
        updateSummary();
        recomputeAndRender();
      } catch (err) {
        console.error("[Welo Reviews Widget] Load error:", err);
        listEl.innerHTML = `
          <div class="no-reviews-box">
            <div class="no-reviews-text">${escapeHtml(T.widgetError)}</div>
          </div>
        `;
      }
    }

    load();
  }

  /* =========================================================
     BOOT
  ========================================================= */
  function boot() {
    injectInterFontOnce();
    injectStyles();
    installAutoThemeHandlersOnce();
    installVerifiedTooltipHandlersOnce();

    document.querySelectorAll("[data-welo-reviews]").forEach(mountWidget);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }

  const observer = new MutationObserver(function () {
    document.querySelectorAll("[data-welo-reviews]").forEach(mountWidget);
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
