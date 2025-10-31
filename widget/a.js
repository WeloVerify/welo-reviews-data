(() => {
  document.addEventListener("DOMContentLoaded", async function () {
    const widgetDiv = document.querySelector(".welo-widget[data-welo]");
    if (!widgetDiv) return;

    const companySlug = widgetDiv.getAttribute("data-welo") || "welo";

    /* --- URL DATI JSON (sempre live, no cache) --- */
    const dataUrl = `https://cdn.jsdelivr.net/gh/WeloVerify/welo-reviews-data/data/${companySlug}.json?t=${Date.now()}`;

    /* --- IMMAGINI --- */
    const logoUrl =
      "https://cdn.prod.website-files.com/672c7e4b5413fe846587b57a/682461741cc0cd01187ea413_Rectangle%207089%201.png";
    const starUrl =
      "https://cdn.prod.website-files.com/672c7e4b5413fe846587b57a/6821f39414601e1d161f5d08_Image%20(1).png";

    /* --- LINK ALLA PAGINA WELO --- */
    const weloPageUrl = `https://www.welobadge.com/welo-page/${companySlug}`;

    /* --- FORMATTATORE NUMERI (1.2K, 3.4M ecc.) --- */
    const formatReviews = (num) =>
      num < 10000
        ? num.toLocaleString("it-IT")
        : num < 1000000
        ? `${(num / 1000).toFixed(1).replace(/\.0$/, "")}K`
        : `${(num / 1000000).toFixed(1).replace(/\.0$/, "")}M`;

    /* --- RECUPERA DATI JSON --- */
    let data;
    try {
      const res = await fetch(dataUrl, { cache: "no-store" });
      if (!res.ok) throw new Error("Errore caricamento JSON");
      data = await res.json();
    } catch (err) {
      console.warn("Welo Widget: errore caricamento dati, fallback attivo", err);
      data = { reviews: 1495, rating: 4.6 };
    }

    const formattedReviews = formatReviews(data.reviews || 0);

    /* --- CREA BADGE HTML --- */
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

    /* --- STILI --- */
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
      .welo-logo-xr92 { height: 17px; width: auto; margin: 0 2px; position: relative; top: -0.5px; }
      .welo-star-xr92 { height: 15px; width: auto; margin-left: 3px; position: relative; top: -0.5px; }
      .welo-divider-xr92 { color: #999; font-weight: 400; margin: 0 1px; }
      @media (max-width: 768px) {
        .welo-badge-xr92 { font-size: 14px; padding: 8px 14px; gap: 4px; }
        .welo-logo-xr92 { height: 15px; }
        .welo-star-xr92 { height: 13px; }
      }
      @media (max-width: 480px) {
        .welo-badge-xr92 { font-size: 12.5px; padding: 8px 12px; }
      }
    `;
    document.head.appendChild(style);
  });
})();

