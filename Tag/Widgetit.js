(function() {
  const scripts = document.querySelectorAll('script[data-url]');
  const thisScript = scripts[scripts.length - 1];

  const targetURL = thisScript?.getAttribute("data-url") || "https://www.welobadge.com";
  const align = (thisScript?.getAttribute("data-align") || "center").toLowerCase();

  // Crea il container principale
  const container = document.createElement("div");
  container.style.position = "relative";
  container.style.zIndex = "99999";
  container.style.width = "100%";
  container.style.display = "flex";
  container.style.justifyContent =
    align === "left" ? "flex-start" :
    align === "right" ? "flex-end" : "center";

  // Crea il link principale
  const widget = document.createElement("a");
  widget.href = targetURL;
  widget.target = "_blank";
  widget.rel = "noopener";
  widget.className = "tagwelo-widget";
  widget.innerHTML = `
    <div class="tagwelo-dot"></div>
    <span class="tagwelo-text">Risultati verificati da</span>
    <img 
      src="https://cdn.prod.website-files.com/672c7e4b5413fe846587b57a/682461741cc0cd01187ea413_Rectangle%207089%201.png" 
      alt="Welo Badge" 
      class="tagwelo-logo" 
    />
    <span class="tagwelo-badge">Welo</span>
  `;

  container.appendChild(widget);
  thisScript.parentNode.insertBefore(container, thisScript);

  // Stili isolati
  const style = document.createElement("style");
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap');

    .tagwelo-widget {
      display: inline-flex !important;
      align-items: center !important;
      background: #fff !important;
      border: 1px solid #DBDBDB !important;
      border-radius: 99px !important;
      padding: 10px 14px !important;
      box-shadow: 0 2px 6px rgba(0,0,0,0.05) !important;
      font-family: 'Inter', sans-serif !important;
      font-weight: 600 !important;
      font-size: 14px !important;
      color: #000 !important;
      letter-spacing: -0.01em !important;
      text-decoration: none !important;
      transition: all 0.25s ease !important;
    }

    .tagwelo-widget:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 4px 14px rgba(0,0,0,0.12) !important;
    }

    .tagwelo-dot {
      width: 9px !important;
      height: 9px !important;
      background: #A5B900 !important;
      border-radius: 50% !important;
      margin-right: 8px !important;
      position: relative !important;
      box-shadow: 0 0 0 rgba(165,185,0, 0.4) !important;
      animation: tagwelo-pulse 1.6s infinite ease-out !important;
    }

    @keyframes tagwelo-pulse {
      0% { box-shadow: 0 0 0 0 rgba(165,185,0, 0.4); }
      70% { box-shadow: 0 0 0 8px rgba(165,185,0, 0); }
      100% { box-shadow: 0 0 0 0 rgba(165,185,0, 0); }
    }

    .tagwelo-logo {
      height: 14px !important;
      margin: 0 6px 0 5px !important;
      transition: transform 0.25s ease, filter 0.3s ease !important;
    }

    .tagwelo-widget:hover .tagwelo-logo {
      transform: scale(1.08) !important;
    }

    .tagwelo-dark {
      background: #151515 !important;
      border: 1px solid #2A2A2A !important;
      color: #fff !important;
      box-shadow: 0 2px 6px rgba(0,0,0,0.4) !important;
    }

    .tagwelo-dark .tagwelo-logo {
      filter: invert(1) brightness(1.3) !important;
    }

    .tagwelo-dark:hover {
      box-shadow: 0 4px 14px rgba(255,255,255,0.1) !important;
    }
  `;
  document.head.appendChild(style);

  // Calcolo luminosità sfondo
  const getLuminance = rgb => {
    const [r, g, b] = rgb.match(/\d+/g).map(Number);
    const [R, G, B] = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  };

  // Rileva il colore del body
  const bg = window.getComputedStyle(document.body).backgroundColor;
  const luminance = getLuminance(bg);
  const isDark = luminance < 0.5;
  if (isDark) widget.classList.add("tagwelo-dark");
})();
