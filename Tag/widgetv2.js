(() => {
  const thisScript = document.currentScript;
  if (!thisScript) return;

  const targetURL = thisScript.getAttribute("data-url") || "https://www.welobadge.com";
  const align = (thisScript.getAttribute("data-align") || "center").toLowerCase();
  const langAttr = (thisScript.getAttribute("data-lang") || "").toUpperCase();

  // ✅ Fallback lingua automatica dal browser
  const browserLang = navigator.language?.toLowerCase().includes("en") ? "US" : "IT";
  const lang = (langAttr === "US" || langAttr === "IT") ? langAttr : browserLang;

  // ✅ Testo in base alla lingua
  const textByLang = lang === "US" ? "Partners verified by" : "Partner verificati da";

  // ✅ crea container univoco e stabile
  const container = document.createElement("div");
  container.className = "tagwelo-container";
  Object.assign(container.style, {
    display: "flex",
    justifyContent:
      align === "left" ? "flex-start" :
      align === "right" ? "flex-end" : "center",
    width: "100%",
    margin: "18px 0",
    position: "relative",
    overflow: "visible",
    transform: "translateZ(0)",
    zIndex: "10"
  });

  thisScript.parentNode.insertBefore(container, thisScript);

  // ✅ crea il widget (usa già la lingua corretta)
  const widget = document.createElement("a");
  widget.href = targetURL;
  widget.target = "_blank";
  widget.rel = "noopener";
  widget.className = "tagwelo-widget";
  widget.innerHTML = `
    <div class="tagwelo-dot"></div>
    <span class="tagwelo-text">${textByLang}</span>
    <img
      src="https://cdn.prod.website-files.com/672c7e4b5413fe846587b57a/682461741cc0cd01187ea413_Rectangle%207089%201.png"
      alt="Welo Badge"
      class="tagwelo-logo"
    />
    <span class="tagwelo-badge">Welo</span>
  `;
  container.appendChild(widget);

  // ✅ stili isolati e puliti (con guard)
  if (!document.getElementById("tagwelo-style-partners")) {
    const style = document.createElement("style");
    style.id = "tagwelo-style-partners";
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap');

      .tagwelo-widget {
        display: inline-flex;
        align-items: center;
        justify-content: center;
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
        line-height: 1;
        position: relative;
        overflow: visible;
        white-space: nowrap;
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
        box-shadow: 0 0 0 rgba(165,185,0,0.4);
        animation: tagwelo-pulse 1.6s infinite ease-out;
        flex-shrink: 0;
      }

      @keyframes tagwelo-pulse {
        0% { box-shadow: 0 0 0 0 rgba(165,185,0,0.4); }
        70% { box-shadow: 0 0 0 8px rgba(165,185,0,0); }
        100% { box-shadow: 0 0 0 0 rgba(165,185,0,0); }
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
  }

  // ✅ utils per tema automatico (sfondo reale sotto al widget)
  const getEffectiveBackground = (el) => {
    while (el && el !== document.documentElement) {
      const cs = window.getComputedStyle(el);
      const bg = cs.backgroundColor;
      const bgImg = cs.backgroundImage;

      if (bgImg && bgImg !== "none") {
        return (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") ? bg : "rgb(0,0,0)";
      }
      if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") return bg;

      el = el.parentElement;
    }
    return window.getComputedStyle(document.body).backgroundColor || "rgb(255,255,255)";
  };

  const getLuminance = (rgb) => {
    const m = (rgb || "").match(/[\d.]+/g);
    if (!m || m.length < 3) return 1;

    const r8 = Math.max(0, Math.min(255, Number(m[0])));
    const g8 = Math.max(0, Math.min(255, Number(m[1])));
    const b8 = Math.max(0, Math.min(255, Number(m[2])));

    const toLin = (v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };

    const R = toLin(r8), G = toLin(g8), B = toLin(b8);
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  };

  const applyTheme = () => {
    widget.classList.remove("tagwelo-dark");

    requestAnimationFrame(() => {
      setTimeout(() => {
        const rect = widget.getBoundingClientRect();
        if (!rect.width || !rect.height) return;

        const x = Math.min(window.innerWidth - 1, Math.max(0, rect.left + rect.width / 2));
        const y = Math.min(window.innerHeight - 1, Math.max(0, rect.top + rect.height / 2));

        // nascondi temporaneamente per campionare sotto
        const prevVis = widget.style.visibility;
        const prevPE = container.style.pointerEvents;

        container.style.pointerEvents = "none";
        widget.style.visibility = "hidden";

        const underEl = document.elementFromPoint(x, y);

        widget.style.visibility = prevVis;
        container.style.pointerEvents = prevPE;

        const bg = getEffectiveBackground(underEl || container.parentElement || document.body);
        const lum = getLuminance(bg);

        if (lum < 0.55) widget.classList.add("tagwelo-dark");
        else widget.classList.remove("tagwelo-dark");
      }, 30);
    });
  };

  // ✅ applica subito + dopo load
  applyTheme();
  window.addEventListener("load", applyTheme, { once: true });

  // ✅ aggiorna su resize/scroll e se cambia tema (class/style)
  window.addEventListener("resize", applyTheme);
  window.addEventListener("scroll", applyTheme, { passive: true });

  const mo = new MutationObserver(() => applyTheme());
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style"] });
})();
