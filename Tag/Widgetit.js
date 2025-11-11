(() => {
  const thisScript = document.currentScript;
  if (!thisScript) return;

  const targetURL = thisScript.getAttribute("data-url") || "https://www.welobadge.com";
  const align = (thisScript.getAttribute("data-align") || "center").toLowerCase();

  // ✅ crea container univoco (prima dello script per evitare conflitti)
  const container = document.createElement("div");
  container.className = "tagwelo-container";
  container.style.display = "flex";
  container.style.justifyContent =
    align === "left" ? "flex-start" :
    align === "right" ? "flex-end" : "center";
  container.style.width = "100%";
  container.style.margin = "20px 0";
  container.style.position = "relative";
  container.style.zIndex = "99999";

  thisScript.parentNode.insertBefore(container, thisScript);

  // ✅ crea contenuto widget
  container.innerHTML = `
    <a href="${targetURL}" target="_blank" rel="noopener" class="tagwelo-widget">
      <div class="tagwelo-dot"></div>
      <span class="tagwelo-text">Risultati verificati da</span>
      <img 
        src="https://cdn.prod.website-files.com/672c7e4b5413fe846587b57a/682461741cc0cd01187ea413_Rectangle%207089%201.png"
        alt="Welo Badge"
        class="tagwelo-logo"
      />
      <span class="tagwelo-badge">Welo</span>
    </a>
  `;

  // ✅ stili isolati con prefisso (no conflitti)
  const style = document.createElement("style");
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap');

    .tagwelo-widget {
      display: inline-flex;
      align-items: center;
      background: #fff;
      border: 1px solid #DBDBDB;
      border-radius: 99px;
      padding: 10px 14px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.05);
      font-family: 'Inter', sans-serif;
      font-weight: 600;
      font-size: 14px;
      color: #000;
      letter-spacing: -0.01em;
      text-decoration: none;
      transition: all 0.25s ease;
    }

    .tagwelo-widget:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 14px rgba(0,0,0,0.12);
    }

    .tagwelo-dot {
      width: 9px;
      height: 9px;
      background: #A5B900;
      border-radius: 50%;
      margin-right: 8px;
      position: relative;
      box-shadow: 0 0 0 rgba(165,185,0, 0.4);
      animation: tagwelo-pulse 1.6s infinite ease-out;
    }

    @keyframes tagwelo-pulse {
      0% { box-shadow: 0 0 0 0 rgba(165,185,0, 0.4); }
      70% { box-shadow: 0 0 0 8px rgba(165,185,0, 0); }
      100% { box-shadow: 0 0 0 0 rgba(165,185,0, 0); }
    }

    .tagwelo-logo {
      height: 14px;
      margin: 0 6px 0 5px;
      transition: transform 0.25s ease, filter 0.3s ease;
    }

    .tagwelo-widget:hover .tagwelo-logo {
      transform: scale(1.08);
    }

    .tagwelo-dark {
      background: #151515 !important;
      border: 1px solid #2A2A2A !important;
      color: #fff !important;
      box-shadow: 0 2px 6px rgba(0,0,0,0.4) !important;
    }

    .tagwelo-dark .tagwelo-logo {
      filter: invert(1) brightness(1.3);
    }

    .tagwelo-dark:hover {
      box-shadow: 0 4px 14px rgba(255,255,255,0.1) !important;
    }
  `;
  document.head.appendChild(style);

  // ✅ rileva tema scuro
  const getLuminance = (rgb) => {
    const [r, g, b] = rgb.match(/\d+/g).map(Number);
    const [R, G, B] = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  };

  const bg = window.getComputedStyle(document.body).backgroundColor;
  const luminance = getLuminance(bg);
  if (luminance < 0.5) {
    container.querySelector('.tagwelo-widget').classList.add('tagwelo-dark');
  }
})();
