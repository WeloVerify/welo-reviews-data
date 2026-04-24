(() => {
  "use strict";

  const currentScript = document.currentScript;

  const SUPABASE_URL = "https://ufqvcojyfsnscuddadnw.supabase.co";
  const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmcXZjb2p5ZnNuc2N1ZGRhZG53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MTg2NjksImV4cCI6MjA2MzM5NDY2OX0.iYJVmg9PXxOu0R3z62iRzr4am0q8ZSc8THlB2rE2oQM";

  const TABLE_NAME = "lascia_una_recensione";
  const STAR_FIELD = "Da 1 a 5 stelle come lo valuti?";
  const GITHUB_PAGES_BASE = "https://weloverify.github.io/welo-reviews-data";

  const logoUrl =
    "https://cdn.prod.website-files.com/672c7e4b5413fe846587b57a/682461741cc0cd01187ea413_Rectangle%207089%201.png";

  const starUrl =
    "https://cdn.prod.website-files.com/672c7e4b5413fe846587b57a/6821f39414601e1d161f5d08_Image%20(1).png";

  function injectStylesOnce() {
    if (document.getElementById("welo-badge-xr92-styles")) return;

    const style = document.createElement("style");
    style.id = "welo-badge-xr92-styles";
    style.textContent = `
      .welo-widget {
        display: inline-block;
      }

      .welo-badge-xr92 {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        background: #fff !important;
        border: 1px solid #e6e6e6;
        border-radius: 40px;
        padding: 10px 18px;
        font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 15px;
        color: #111 !important;
        text-decoration: none !important;
        line-height: 1;
        font-weight: 500;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
        transition: all 0.25s ease;
        white-space: nowrap;
      }

      .welo-badge-xr92:hover {
        transform: translateY(-1px);
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
      }

      .welo-badge-xr92 strong {
        font-weight: 700;
      }

      .welo-badge-xr92 img {
        display: inline-block;
        vertical-align: middle;
      }

      .welo-logo-xr92 {
        height: 15px;
        width: auto;
        margin: 0 2px;
        position: relative;
        top: -0.5px;
      }

      .welo-star-xr92 {
        height: 17px;
        width: auto;
        margin-left: 3px;
        position: relative;
        top: -0.5px;
      }

      .welo-divider-xr92 {
        color: #999;
        font-weight: 400;
        margin: 0 1px;
      }

      .welo-widget-status {
        font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 13px;
        color: #888;
      }

      @media (max-width: 768px) {
        .welo-badge-xr92 {
          font-size: 14px;
          padding: 8px 14px;
          gap: 4px;
        }

        .welo-logo-xr92 {
          height: 13px;
        }

        .welo-star-xr92 {
          height: 15px;
        }
      }

      @media (max-width: 480px) {
        .welo-badge-xr92 {
          font-size: 12.5px;
          padding: 10px 12px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function createUrlSlug(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9\s_-]/g, "")
      .replace(/[_\s]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function slugToWords(value) {
    return String(value || "")
      .trim()
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function titleCase(value) {
    return String(value || "")
      .split(" ")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(" ");
  }

  function getCompanyCandidates(companyName) {
    const raw = String(companyName || "").trim();
    const cleanSlug = createUrlSlug(raw);
    const spaced = slugToWords(raw);
    const spacedFromSlug = slugToWords(cleanSlug);
    const titled = titleCase(spaced);
    const titledFromSlug = titleCase(spacedFromSlug);

    return Array.from(
      new Set(
        [
          raw,
          cleanSlug,
          spaced,
          spacedFromSlug,
          titled,
          titledFromSlug,
          raw.toLowerCase(),
          spaced.toLowerCase(),
          spacedFromSlug.toLowerCase()
        ].filter(Boolean)
      )
    );
  }

  function formatReviews(num) {
    const value = Number(num) || 0;

    if (value < 10000) {
      return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    if (value < 1000000) {
      return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}`.replace(".0", "") + "K";
    }

    return `${(value / 1000000).toFixed(1)}`.replace(".0", "") + "M";
  }

  function normalizeNumber(value) {
    if (value === null || value === undefined) return null;

    const raw = String(value).trim().toLowerCase();

    if (
      !raw ||
      raw === "0" ||
      raw === "0.0" ||
      raw === "-" ||
      raw === "n/a" ||
      raw === "na" ||
      raw === "none" ||
      raw === "null" ||
      raw === "undefined"
    ) {
      return null;
    }

    const cleaned = raw.replace(",", ".");
    const num = parseFloat(cleaned);

    return Number.isFinite(num) ? num : null;
  }

  function hasValidReviewsCount(value) {
    const num = normalizeNumber(value);
    return num !== null && num > 0;
  }

  function hasValidRating(value) {
    const num = normalizeNumber(value);
    return num !== null && num > 0 && num <= 5;
  }

  function computeSupabaseStats(rows) {
    let total = 0;
    let weighted = 0;

    rows.forEach((row) => {
      const stars = Number(row[STAR_FIELD]) || 0;

      if (stars >= 1 && stars <= 5) {
        total += 1;
        weighted += stars;
      }
    });

    return {
      reviews: total,
      rating: total > 0 ? weighted / total : 0
    };
  }

  async function fetchSupabaseStats(companyName) {
    const candidates = getCompanyCandidates(companyName);

    try {
      const companyFilter = candidates
        .map((value) => `azienda.ilike.*${value}*`)
        .join(",");

      const params = new URLSearchParams();
      params.set("select", "*");
      params.set("status", "in.(Approved,approved)");
      params.set("or", `(${companyFilter})`);

      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/${TABLE_NAME}?${params.toString()}`,
        {
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`
          },
          cache: "no-store"
        }
      );

      if (!response.ok) {
        const text = await response.text().catch(() => "");
        throw new Error("Supabase request failed: " + text);
      }

      let rows = await response.json();
      if (!Array.isArray(rows)) rows = [];

      return computeSupabaseStats(rows);
    } catch (err) {
      console.warn("Welo Widget: errore Supabase", err);
      return { reviews: 0, rating: 0 };
    }
  }

  async function fetchJsonData(companyName) {
    const jsonSlug = createUrlSlug(companyName);
    const dataUrl = `${GITHUB_PAGES_BASE}/data/${jsonSlug}.json?ts=${Date.now()}`;

    try {
      const res = await fetch(dataUrl, { cache: "no-store" });

      if (!res.ok) {
        throw new Error("JSON not found");
      }

      return await res.json();
    } catch (err) {
      console.warn("Welo Widget: JSON non trovato, fallback Supabase attivo", err);
      return { reviews: 0, rating: 0 };
    }
  }

  async function renderWidget(widgetDiv) {
    const companyName = (widgetDiv.getAttribute("data-welo") || "welo").trim();
    const urlSlug = createUrlSlug(companyName);

    const align = String(
      widgetDiv.getAttribute("data-align") ||
        currentScript?.getAttribute("data-align") ||
        ""
    )
      .toLowerCase()
      .trim();

    if (align === "left" || align === "start") widgetDiv.style.textAlign = "left";
    if (align === "center" || align === "middle") widgetDiv.style.textAlign = "center";
    if (align === "right" || align === "end") widgetDiv.style.textAlign = "right";

    widgetDiv.innerHTML = `<span class="welo-widget-status">Loading...</span>`;

    const weloPageUrl = `https://www.welobadge.com/en/welo-page/${urlSlug}`;

    try {
      const data = await fetchJsonData(companyName);

      let finalReviews = hasValidReviewsCount(data.reviews)
        ? Number(data.reviews)
        : 0;

      let finalRating = hasValidRating(data.rating)
        ? Number(String(data.rating).replace(",", "."))
        : 0;

      const needsReviewsFallback = !hasValidReviewsCount(data.reviews);
      const needsRatingFallback = !hasValidRating(data.rating);

      if (needsReviewsFallback || needsRatingFallback) {
        const supabaseStats = await fetchSupabaseStats(companyName);

        if (needsReviewsFallback) {
          finalReviews = supabaseStats.reviews;
        }

        if (needsRatingFallback) {
          finalRating = supabaseStats.rating;
        }
      }

      const formattedReviews = formatReviews(finalReviews);

      widgetDiv.innerHTML = `
        <a class="welo-badge-xr92" href="${weloPageUrl}" target="_blank" rel="noopener noreferrer">
          <strong>${formattedReviews}</strong>
          <span>Reviews verified by</span>
          <img src="${logoUrl}" alt="Welo" class="welo-logo-xr92" />
          <strong>Welo</strong>
          <span class="welo-divider-xr92">|</span>
          <strong>${Number(finalRating || 0).toFixed(1)}</strong>
          <img src="${starUrl}" alt="Rating star" class="welo-star-xr92" />
        </a>
      `;
    } catch (err) {
      console.error("Welo Widget render error:", err);
      widgetDiv.innerHTML = `<span class="welo-widget-status">Widget unavailable</span>`;
    }
  }

  async function boot() {
    injectStylesOnce();

    const widgets = document.querySelectorAll(".welo-widget[data-welo]");
    if (!widgets.length) return;

    for (const widget of widgets) {
      await renderWidget(widget);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
