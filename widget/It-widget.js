(() => {
  // 🔐 Allow Webflow Preview & Production domains
  const isAllowedDomain = (hostname) => {
    return (
      hostname.endsWith(".webflow.io") ||
      hostname.endsWith(".canvas.webflow.com") ||
      hostname.includes("welobadge.com") || // il tuo dominio
      hostname.includes("cdn.jsdelivr.net") ||
      hostname.includes("statically.io")
    );
  };

  if (!isAllowedDomain(window.location.hostname)) {
    console.warn("[Welo Badge] Domain not allowed:", window.location.hostname);
    return;
  }

  // 🔹 Formattazione numeri recensioni
  function formatReviews(num) {
    if (num < 10000) return num.toLocaleString("it-IT");
    if (num < 1000000) {
      const k = (num / 1000).toFixed(1);
      return k.endsWith(".0") ? `${parseInt(k)}K` : `${k}K`;
    }
    const m = (num / 1000000).toFixed(1);
    return m.endsWith(".0") ? `${parseInt(m)}M` : `${m}M`;
  }

  // 🔹 CSS inline (iniettato automaticamente)
  const CSS = `
    .welo-badge-xr92{display:inline-flex;align-items:center;justify-content:center;gap:6px;background:transparent;border:1px solid #e6e6e6;border-radius:40px;padding:10px 18px;font-family:"Inter",-apple-system,BlinkMacSystemFont,sans-serif;font-size:15px;color:#111;text-decoration:none;line-height:1;font-weight:500;box-shadow:0 1px 3px rgba(0,0,0,.06);transition:all .25s ease}
    .welo-badge-xr92:hover{transform:translateY(-1px);box-shadow:0 3px 8px rgba(0,0,0,.08)}
    .welo-badge-xr92 strong{font-weight:700}
    .welo-badge-xr92 img{display:inline-block;vertical-align:middle}
    .welo-logo-xr92{height:17px;width:auto;margin:0 2px;position:relative;top:-.5px}
    .welo-star-xr92{height:15px;width:auto;margin-left:3px;position:relative;top:-.5px}
    .welo-divider-xr92{color:#999;font-weight:400;margin:0 1px}
    @media (max-width:768px){.welo-badge-xr92{font-size:14px;padding:8px 14px;gap:4px}.welo-logo-xr92{height:13px}.welo-star-xr92{height:13px}}
    @media (max-width:480px){.welo-badge-xr92{font-size:12.5px;padding:12px 10px}}
  `;
  const style = document.createElement("style");
  style.textContent = CSS;
  document.head.appendChild(style);

  const logoUrl =
    "https://cdn.prod.website-files.com/672c7e4b5413fe846587b57a/682461741cc0cd01187ea413_Rectangle%207089%201.png";
  const starUrl =
    "https://cdn.prod.website-files.com/672c7e4b5413fe846587b57a/6821f39414601e1d161f5d08_Image%20(1).png";

  async function renderBadge(el) {
    const company = el.getAttribute("data-welo") || "welo";
    const jsonUrl = `https://cdn.statically.io/gh/WeloVerify/welo-reviews-data/main/data/${company}.json`;

    let data;
    try {
      const res = await fetch(jsonUrl, { cache: "no-store" });
      if (!res.ok) throw new Error("No data found");
      data = await res.json();
    } catch (err) {
      console.warn("[Welo Badge] Error loading data:", err.message);
      data = { reviews: 0, rating: 0 };
    }

    const formattedReviews = formatReviews(Number(data.reviews || 0));
    const rating = Number(data.rating || 0).toFixed(1);
    const weloPage = `https://www.welobadge.com/welo-page/${company}`;

    el.innerHTML = `
      <a href="${weloPage}" target="_blank" rel="noopener noreferrer" class="welo-badge-xr92">
        <strong>${formattedReviews}</strong>
        <span>Recensioni verificate da</span>
        <img src="${logoUrl}" alt="Welo" class="welo-logo-xr92" />
        <strong>Welo</strong>
        <span class="welo-divider-xr92">|</span>
        <strong>${rating}</strong>
        <img src="${starUrl}" alt="Rating star" class="welo-star-xr92" />
      </a>
    `;
  }

  function init() {
    document.querySelectorAll(".welo-badge").forEach(renderBadge);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

