<script>
(() => {
  const thisScript = document.currentScript;

  document.addEventListener("DOMContentLoaded", async function () {
    const widgetDiv = document.querySelector(".welo-widget[data-welo]");
    if (!widgetDiv) return;

    const companySlug = widgetDiv.getAttribute("data-welo") || "welo";

    const align = String(
      widgetDiv.getAttribute("data-align") ||
      thisScript?.getAttribute("data-align") ||
      ""
    )
      .toLowerCase()
      .trim();

    if (align === "left" || align === "start") widgetDiv.style.textAlign = "left";
    if (align === "center" || align === "middle") widgetDiv.style.textAlign = "center";
    if (align === "right" || align === "end") widgetDiv.style.textAlign = "right";

    const dataUrl = `https://raw.githubusercontent.com/WeloVerify/welo-reviews-data/main/data/${companySlug}.json?ts=${Date.now()}`;

    const logoUrl =
      "https://cdn.prod.website-files.com/672c7e4b5413fe846587b57a/682461741cc0cd01187ea413_Rectangle%207089%201.png";
    const starUrl =
      "https://cdn.prod.website-files.com/672c7e4b5413fe846587b57a/6821f39414601e1d161f5d08_Image%20(1).png";

    const weloPageUrl = `https://www.welobadge.com/en/welo-page/${companySlug}`;

    const SUPABASE_URL = "https://ufqvcojyfsnscuddadnw.supabase.co";
    const SUPABASE_ANON_KEY =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmcXZjb2p5ZnNuc2N1ZGRhZG53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MTg2NjksImV4cCI6MjA2MzM5NDY2OX0.iYJVmg9PXxOu0R3z62iRzr4am0q8ZSc8THlB2rE2oQM";

    const TABLE_NAME = "lascia_una_recensione";
    const STAR_FIELD = "Da 1 a 5 stelle come lo valuti?";
    const APPROVED_STATUS = "Approved";

    function formatReviews(num) {
      const value = Number(num) || 0;

      if (value < 10000) {
        return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
      if (value < 1000000) {
        return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}K`.replace(".0", "");
      }
      return `${(value / 1000000).toFixed(1)}M`.replace(".0", "");
    }

    function normalizeNumber(value) {
      if (value === null || value === undefined) return null;
      const cleaned = String(value).trim().replace(",", ".");
      if (!cleaned) return null;
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

      rows.forEach(function (row) {
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

    async function fetchSupabaseStats() {
      try {
        const params = new URLSearchParams({
          azienda: "eq." + companySlug,
          status: "eq." + APPROVED_STATUS,
          select: "*"
        });

        const response = await fetch(
          SUPABASE_URL + "/rest/v1/" + TABLE_NAME + "?" + params.toString(),
          {
            headers: {
              apikey: SUPABASE_ANON_KEY,
              Authorization: "Bearer " + SUPABASE_ANON_KEY
            },
            cache: "no-store"
          }
        );

        if (!response.ok) throw new Error("Supabase request failed");

        let rows = await response.json();
        if (!Array.isArray(rows)) rows = [];

        return computeSupabaseStats(rows);
      } catch (err) {
        console.warn("Welo Widget: errore Supabase", err);
        return { reviews: 0, rating: 0 };
      }
    }

    let data;
    try {
      const res = await fetch(dataUrl, { cache: "no-store" });
      if (!res.ok) throw new Error("Errore caricamento JSON");
      data = await res.json();
    } catch (err) {
      console.warn("Welo Widget: errore caricamento JSON, fallback attivo", err);
      data = { reviews: 0, rating: 0 };
    }

    let finalReviews = hasValidReviewsCount(data.reviews) ? Number(data.reviews) : 0;
    let finalRating = hasValidRating(data.rating) ? Number(String(data.rating).replace(",", ".")) : 0;

    if (!hasValidReviewsCount(data.reviews) || !hasValidRating(data.rating)) {
      const supabaseStats = await fetchSupabaseStats();

      if (!hasValidReviewsCount(data.reviews)) {
        finalReviews = supabaseStats.reviews;
      }

      if (!hasValidRating(data.rating)) {
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

    const style = document.createElement("style");
    style.textContent = `
      .welo-badge-xr92 {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        background: white !important;
        border: 1px solid #e6e6e6;
        border-radius: 40px;
        padding: 10px 18px;
        font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 15px;
        color: #111;
        text-decoration: none;
        line-height: 1;
        font-weight: 500;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
        transition: all 0.25s ease;
      }
      .welo-badge-xr92:hover {
        transform: translateY(-1px);
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
      }
      .welo-badge-xr92 strong { font-weight: 700; }
      .welo-badge-xr92 img { display: inline-block; vertical-align: middle; }
      .welo-logo-xr92 { height: 15px; width: auto; margin: 0 2px; position: relative; top: -0.5px; }
      .welo-star-xr92 { height: 17px; width: auto; margin-left: 3px; position: relative; top: -0.5px; }
      .welo-divider-xr92 { color: #999; font-weight: 400; margin: 0 1px; }
      @media (max-width: 768px) {
        .welo-badge-xr92 { font-size: 14px; padding: 8px 14px; gap: 4px; }
        .welo-logo-xr92 { height: 13px; }
        .welo-star-xr92 { height: 15px; }
      }
      @media (max-width: 480px) {
        .welo-badge-xr92 { font-size: 12.5px; padding: 10px 12px; }
      }
    `;
    document.head.appendChild(style);
  });
})();
</script>
