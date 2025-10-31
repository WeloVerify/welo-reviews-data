(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const script = document.currentScript;
    const slug = script.getAttribute("data-welo") || "welo";

    // Crea container se non esiste
    let el = document.getElementById("welo-widget-xr92");
    if (!el) {
      el = document.createElement("div");
      el.id = "welo-widget-xr92";
      script.parentNode.insertBefore(el, script);
    }

    // --- STILI ---
    const style = document.createElement("style");
    style.textContent = `
      .welo-badge {
        display:inline-flex;
        align-items:center;
        gap:6px;
        font-family:Inter,sans-serif;
        font-size:15px;
        border:1px solid #e5e5e5;
        border-radius:40px;
        padding:10px 18px;
        text-decoration:none;
        color:#111;
      }
      .welo-badge img{height:16px;vertical-align:middle;}
    `;
    document.head.appendChild(style);

    // --- BADGE ---
    const badge = document.createElement("a");
    badge.href = `https://www.welobadge.com/welo-page/${slug}`;
    badge.target = "_blank";
    badge.className = "welo-badge";
    badge.innerHTML = `
      <strong>1.495</strong>
      <span>Recensioni verificate da</span>
      <img src="https://cdn.prod.website-files.com/672c7e4b5413fe846587b57a/682461741cc0cd01187ea413_Rectangle%207089%201.png" alt="Welo">
      <strong>Welo</strong>
      <span>|</span>
      <strong>4.6 ★</strong>
    `;

    el.appendChild(badge);
  });
})();


