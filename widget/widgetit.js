(() => {
  document.addEventListener("DOMContentLoaded", async function () {
    const widgetDiv = document.querySelector(".welo-widget[data-welo]");
    if (!widgetDiv) return;

    const companySlug = widgetDiv.getAttribute("data-welo") || "welo";

    /* --- URL JSON (RAW GITHUB, ZERO CACHE) --- */
    const dataUrl = `https://raw.githubusercontent.com/WeloVerify/welo-reviews-data/main/data/${companySlug}.json?ts=${Date.now()}`;

    const logoUrl =
      "https://cdn.prod.website-files.com/672c7e4b5413fe846587b57a/682461741cc0cd01187ea413_Rectangle%207089%201.png";
    const starUrl =
      "https://cdn.prod.website-files.com/672c7e4b5413fe846587b57a/6821f39414601e1d161f5d08_Image%20(1).png";

    const weloPageUrl = `https://www.welobadge.com/welo-page/${companySlug}`;

    function formatReviews(num) {
      if (num < 10000) return num.toLocaleString("it-IT");
      if (num < 1000000) return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}K`;
      return `${(num / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
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

    const formattedReviews = formatReviews(data.reviews || 0);

    widgetDiv.innerHTML = `
      <a class="welo-badge-xr92" href="${weloPageUrl}" target="_blank" rel="noopener noreferrer">
        <strong>${formattedReviews}</strong>
        <span>Recensioni verificate da</span>
        <img src="${logoUrl}" alt="Welo" class="welo-logo-xr92" />
        <strong>Welo</strong>
        <span class="welo-divider-xr92">|</span>
        <strong>${(data.rating || 0).toFixed(1)}</strong>
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
        background: transparent;
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
      .welo-star-xr92 { height: 15px; width: auto; margin-left: 3px; position: relative; top: -0.5px; }
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
