(function () {
  "use strict";

  // =========================
  // CONFIG
  // =========================
  const API_BASE =
    "https://ufqvcojyfsnscuddadnw.supabase.co/functions/v1/welo-media-reviews";
  const STYLE_ID = "welo-media-widget-styles-v3";

  // =========================
  // LOCALE (IT/US come richiesto)
  // =========================
  function normalizeLocale(raw) {
    if (!raw) return null;
    const v = String(raw).trim().toLowerCase();
    if (v === "it" || v === "ita" || v === "italy" || v === "it-it") return "it";
    if (v === "en" || v === "us" || v === "usa" || v === "uk" || v === "en-us" || v === "en-gb")
      return "en";
    return null;
  }

  function detectLocaleFromElement(el) {
    // 1) data-locale (se mai lo usi)
    const dl = normalizeLocale(el.getAttribute("data-locale"));
    if (dl) return dl;

    // 2) data-country="IT" | "US"
    const dc = normalizeLocale(el.getAttribute("data-country"));
    if (dc) return dc;

    // 3) fallback path
    const p = (window.location.pathname || "").toLowerCase();
    if (p.startsWith("/en")) return "en";
    return "it";
  }

  const TEXTS = {
    it: {
      title: "Video recensioni",
      subtitleVideo: "Video dalla tua Welo Page",
      subtitleMedia: "Video e immagini dalla tua Welo Page",
      cta: "Vedi altre recensioni",
      loading: "Caricamento…",
      empty: "Ancora nessun contenuto disponibile.",
      close: "Chiudi",
      prev: "Precedente",
      next: "Successivo",
    },
    en: {
      title: "Video reviews",
      subtitleVideo: "Videos from your Welo Page",
      subtitleMedia: "Videos and photos from your Welo Page",
      cta: "View more reviews",
      loading: "Loading…",
      empty: "No media available yet.",
      close: "Close",
      prev: "Previous",
      next: "Next",
    },
  };

  // =========================
  // HELPERS
  // =========================
  function clamp(n, min, max) {
    n = Number(n);
    if (!Number.isFinite(n)) return min;
    return Math.min(Math.max(n, min), max);
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function safeText(str) {
    const s = String(str || "").trim();
    // niente wall of text: taglia duro
    if (s.length > 140) return s.slice(0, 137) + "…";
    return s;
  }

  function buildUrl(company, limit) {
    const u = new URL(API_BASE);
    u.searchParams.set("company", company);
    u.searchParams.set("limit", String(limit));
    return u.toString();
  }

  function isVideoItem(item) {
    return item && item.type === "video";
  }

  // pattern “mosaic” stile premium
  // (si ripete per creare un layout simile allo screenshot)
  const MOSAIC_PATTERN = [
    "xl", // 1 grande
    "md", // 2
    "lg", // 3
    "md", // 4
    "md", // 5
    "md", // 6
    "lg", // 7
    "md", // 8
    "md", // 9
    "md", // 10
    "lg", // 11
    "md", // 12
  ];

  function getSizeClass(index) {
    const key = MOSAIC_PATTERN[index % MOSAIC_PATTERN.length] || "md";
    return "wm-size-" + key;
  }

  // =========================
  // STYLES
  // =========================
  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const css = `
/* =========================
   WELO • MEDIA WIDGET v3
   Mosaic premium (no stars/date)
   ========================= */
.welo-media-widget {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
}

.wm-wrap { width:100%; }
.wm-head {
  display:flex;
  align-items:flex-end;
  justify-content:space-between;
  gap:16px;
  margin-bottom: 18px;
}
.wm-hgroup { display:flex; flex-direction:column; gap:6px; }
.wm-title {
  font-size: 40px;
  line-height: 1.05;
  font-weight: 700;
  letter-spacing: -0.02em;
  color:#0b0b0b;
  margin:0;
}
.wm-subtitle {
  font-size: 20px;
  line-height: 1.25;
  color:#9ca3af;
  font-weight: 500;
  margin:0;
}

.wm-cta {
  display:inline-flex;
  align-items:center;
  gap:10px;
  padding: 14px 18px;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  background:#0b0b0b;
  color:#fff;
  text-decoration:none;
  font-size: 14px;
  font-weight: 650;
  transition: transform .15s ease, opacity .15s ease;
  white-space:nowrap;
}
.wm-cta:hover { opacity:.92; transform: translateY(-1px); }
.wm-cta svg { width:16px; height:16px; }

.wm-grid {
  display:grid;
  gap: 16px;
  grid-auto-flow: dense;
}

/* Desktop: 12 colonne */
@media (min-width: 1024px){
  .wm-grid { grid-template-columns: repeat(12, 1fr); }
  .wm-size-xl { grid-column: span 6; grid-row: span 2; }
  .wm-size-lg { grid-column: span 4; grid-row: span 2; }
  .wm-size-md { grid-column: span 4; grid-row: span 1; }
}

/* Tablet: 6 colonne */
@media (min-width: 640px) and (max-width: 1023px){
  .wm-grid { grid-template-columns: repeat(6, 1fr); }
  .wm-size-xl { grid-column: span 6; grid-row: span 2; }
  .wm-size-lg { grid-column: span 3; grid-row: span 2; }
  .wm-size-md { grid-column: span 3; grid-row: span 1; }
}

/* Mobile: 2 colonne */
@media (max-width: 639px){
  .wm-title { font-size: 28px; }
  .wm-subtitle { font-size: 16px; }
  .wm-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .wm-size-xl { grid-column: span 2; grid-row: span 2; }
  .wm-size-lg { grid-column: span 2; grid-row: span 1; }
  .wm-size-md { grid-column: span 1; grid-row: span 1; }
}

/* Tile */
.wm-tile {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  background: #0a0a0a;
  border: 1px solid #eef0f3;
  cursor: pointer;
  transform: translateZ(0);
  box-shadow: 0 1px 0 rgba(0,0,0,.04);
  transition: transform .18s ease, box-shadow .18s ease;
  min-height: 230px;
}
.wm-tile:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 50px rgba(0,0,0,.14);
}
.wm-media {
  position:absolute;
  inset:0;
}
.wm-media img,
.wm-media video {
  width:100%;
  height:100%;
  object-fit: cover;
  display:block;
  transform: scale(1.02);
  transition: transform .35s ease;
}
.wm-tile:hover .wm-media img,
.wm-tile:hover .wm-media video {
  transform: scale(1.06);
}

/* overlay gradient */
.wm-overlay {
  position:absolute;
  inset:0;
  background: linear-gradient(
    to top,
    rgba(0,0,0,.78) 0%,
    rgba(0,0,0,.28) 40%,
    rgba(0,0,0,0) 70%
  );
  pointer-events:none;
}

/* play icon for videos */
.wm-play {
  position:absolute;
  left: 18px;
  top: 18px;
  width: 56px;
  height: 56px;
  border-radius: 999px;
  background: rgba(255,255,255,.92);
  box-shadow: 0 10px 26px rgba(0,0,0,.30);
  display:flex;
  align-items:center;
  justify-content:center;
  pointer-events:none;
}
.wm-play:before {
  content:"";
  margin-left: 4px;
  width: 0; height: 0;
  border-style: solid;
  border-width: 10px 0 10px 16px;
  border-color: transparent transparent transparent #111;
}

/* short text (optional) */
.wm-copy {
  position:absolute;
  left: 18px;
  right: 18px;
  bottom: 16px;
  display:flex;
  flex-direction:column;
  gap: 6px;
  color:#fff;
}
.wm-copy-title {
  font-size: 16px;
  font-weight: 750;
  line-height: 1.25;
  letter-spacing: -0.01em;
  display:-webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow:hidden;
}
.wm-copy-desc {
  font-size: 13px;
  line-height: 1.35;
  color: rgba(255,255,255,.84);
  font-weight: 550;
  display:-webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow:hidden;
}

/* Loading / empty */
.wm-loading, .wm-empty {
  border: 1px dashed #e5e7eb;
  border-radius: 18px;
  padding: 18px;
  background: #fff;
  color: #6b7280;
  font-weight: 650;
}

/* Modal */
.wm-modal {
  position: fixed;
  inset: 0;
  z-index: 999999;
  display:none;
  align-items:center;
  justify-content:center;
  padding: 16px;
  background: rgba(10,12,16,.86);
  backdrop-filter: blur(4px);
}
.wm-modal.is-open { display:flex; }
.wm-modal-inner {
  width: min(1050px, 96vw);
  border-radius: 18px;
  overflow:hidden;
  background:#000;
  position:relative;
  box-shadow: 0 28px 90px rgba(0,0,0,.48);
}
.wm-modal-media {
  width:100%;
  max-height: 84vh;
  display:block;
  object-fit: contain;
  background:#000;
}
.wm-modal-close {
  position:absolute;
  top: 12px;
  right: 12px;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border:none;
  cursor:pointer;
  background: rgba(0,0,0,.55);
  color:#fff;
  font-size: 22px;
  display:flex;
  align-items:center;
  justify-content:center;
  transition: transform .15s ease, background .15s ease;
}
.wm-modal-close:hover { transform: scale(1.06); background: rgba(0,0,0,.75); }

.wm-nav {
  position:absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 46px;
  height: 46px;
  border-radius: 999px;
  border:none;
  cursor:pointer;
  background: rgba(0,0,0,.55);
  color:#fff;
  font-size: 22px;
  display:flex;
  align-items:center;
  justify-content:center;
  transition: transform .15s ease, background .15s ease, opacity .15s ease;
}
.wm-nav:hover { transform: translateY(-50%) scale(1.06); background: rgba(0,0,0,.75); }
.wm-nav[disabled] { opacity: .35; cursor: default; transform: translateY(-50%); }
.wm-prev { left: 12px; }
.wm-next { right: 12px; }
    `.trim();

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = css;
    document.head.appendChild(style);
  }

  // =========================
  // VIDEO THUMB (first frame)
  // =========================
  function initVideoThumbs(root) {
    const vids = root.querySelectorAll("video[data-wm-thumb='1']");
    vids.forEach(function (v) {
      try {
        v.muted = true;
        v.playsInline = true;
        v.setAttribute("playsinline", "");
        v.setAttribute("webkit-playsinline", "");
        v.preload = "metadata";

        const showFrame = function () {
          try {
            if (v.currentTime < 0.1) v.currentTime = 0.1;
          } catch (_) {}
        };

        if (v.readyState >= 2) showFrame();
        else {
          v.addEventListener("loadeddata", showFrame, { once: true });
          v.addEventListener("loadedmetadata", showFrame, { once: true });
        }
      } catch (_) {}
    });
  }

  // =========================
  // MODAL
  // =========================
  function buildModal(locale) {
    const t = TEXTS[locale] || TEXTS.it;

    const modal = document.createElement("div");
    modal.className = "wm-modal";
    modal.setAttribute("aria-hidden", "true");

    modal.innerHTML =
      '<div class="wm-modal-inner" role="dialog" aria-modal="true">' +
      '<button class="wm-modal-close" type="button" aria-label="' +
      escapeHtml(t.close) +
      '">×</button>' +
      '<button class="wm-nav wm-prev" type="button" aria-label="' +
      escapeHtml(t.prev) +
      '">‹</button>' +
      '<button class="wm-nav wm-next" type="button" aria-label="' +
      escapeHtml(t.next) +
      '">›</button>' +
      '<div class="wm-modal-slot"></div>' +
      "</div>";

    document.body.appendChild(modal);

    const closeBtn = modal.querySelector(".wm-modal-close");
    const prevBtn = modal.querySelector(".wm-prev");
    const nextBtn = modal.querySelector(".wm-next");
    const slot = modal.querySelector(".wm-modal-slot");

    const state = { items: [], index: 0 };

    function render() {
      slot.innerHTML = "";
      const item = state.items[state.index];
      if (!item) return;

      if (isVideoItem(item)) {
        const video = document.createElement("video");
        video.className = "wm-modal-media";
        video.src = item.url;
        video.controls = true;
        video.playsInline = true;
        video.autoplay = true;
        slot.appendChild(video);
      } else {
        const img = document.createElement("img");
        img.className = "wm-modal-media";
        img.src = item.url;
        img.alt = "";
        slot.appendChild(img);
      }

      prevBtn.disabled = state.index <= 0;
      nextBtn.disabled = state.index >= state.items.length - 1;
    }

    function open(items, startIndex) {
      state.items = items || [];
      state.index = clamp(startIndex || 0, 0, Math.max(0, state.items.length - 1));
      render();
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function close() {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      state.items = [];
      state.index = 0;
      slot.innerHTML = "";
    }

    closeBtn.addEventListener("click", close);
    modal.addEventListener("click", function (e) {
      if (e.target === modal) close();
    });

    prevBtn.addEventListener("click", function () {
      if (state.index <= 0) return;
      state.index -= 1;
      render();
    });

    nextBtn.addEventListener("click", function () {
      if (state.index >= state.items.length - 1) return;
      state.index += 1;
      render();
    });

    document.addEventListener("keydown", function (e) {
      if (!modal.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prevBtn.click();
      if (e.key === "ArrowRight") nextBtn.click();
    });

    return { open };
  }

  // =========================
  // RENDER
  // =========================
  function render(el) {
    injectStyles();

    const locale = detectLocaleFromElement(el);
    const t = TEXTS[locale] || TEXTS.it;

    const company = (el.getAttribute("data-welo") || "").trim();
    if (!company) return;

    const only = (el.getAttribute("data-only") || "video").trim().toLowerCase();
    const limit = clamp(el.getAttribute("data-limit") || 12, 1, 50);
    const showText = (el.getAttribute("data-show-text") || "true").trim().toLowerCase() !== "false";
    const url = (el.getAttribute("data-url") || "").trim();

    const subtitle = only === "media" ? t.subtitleMedia : t.subtitleVideo;

    el.innerHTML =
      '<div class="wm-wrap">' +
      '<div class="wm-head">' +
      '<div class="wm-hgroup">' +
      '<h3 class="wm-title">' +
      escapeHtml(t.title) +
      "</h3>" +
      '<p class="wm-subtitle">' +
      escapeHtml(subtitle) +
      "</p>" +
      "</div>" +
      (url
        ? '<a class="wm-cta" href="' +
          escapeHtml(url) +
          '" target="_blank" rel="noopener">' +
          escapeHtml(t.cta) +
          ' <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 17L17 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M10 7H17V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
          "</a>"
        : "") +
      "</div>" +
      '<div class="wm-loading">' +
      escapeHtml(t.loading) +
      "</div>" +
      "</div>";

    const wrap = el.querySelector(".wm-wrap");
    const loadingBox = el.querySelector(".wm-loading");

    const modal = buildModal(locale);

    fetch(buildUrl(company, limit), { method: "GET" })
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        const items = Array.isArray(data && data.items) ? data.items : [];

        // filtro client-side (in caso il backend ritorni tutto)
        const filtered = items.filter(function (it) {
          if (!it || !it.url) return false;
          if (only === "media") return true;
          return it.type === "video";
        });

        if (!filtered.length) {
          loadingBox.outerHTML = '<div class="wm-empty">' + escapeHtml(t.empty) + "</div>";
          return;
        }

        const grid = document.createElement("div");
        grid.className = "wm-grid";

        filtered.forEach(function (item, idx) {
          const tile = document.createElement("div");
          tile.className = "wm-tile " + getSizeClass(idx);
          tile.setAttribute("role", "button");
          tile.setAttribute("tabindex", "0");

          // media layer
          const media = document.createElement("div");
          media.className = "wm-media";

          if (isVideoItem(item)) {
            const v = document.createElement("video");
            v.src = item.url;
            v.setAttribute("data-wm-thumb", "1");
            v.muted = true;
            v.playsInline = true;
            v.preload = "metadata";
            media.appendChild(v);

            const play = document.createElement("div");
            play.className = "wm-play";
            tile.appendChild(play);
          } else {
            const img = document.createElement("img");
            img.src = item.url;
            img.alt = "";
            img.loading = "lazy";
            media.appendChild(img);
          }

          tile.appendChild(media);

          // overlay gradient
          const overlay = document.createElement("div");
          overlay.className = "wm-overlay";
          tile.appendChild(overlay);

          // short text overlay (optional)
          if (showText) {
            const title = safeText(item.title || "");
            const desc = safeText(item.text || "");

            if (title || desc) {
              const copy = document.createElement("div");
              copy.className = "wm-copy";

              if (title) {
                const ct = document.createElement("div");
                ct.className = "wm-copy-title";
                ct.textContent = title;
                copy.appendChild(ct);
              }

              if (desc) {
                const cd = document.createElement("div");
                cd.className = "wm-copy-desc";
                cd.textContent = desc;
                copy.appendChild(cd);
              }

              tile.appendChild(copy);
            }
          }

          function open() {
            modal.open(filtered, idx);
          }

          tile.addEventListener("click", open);
          tile.addEventListener("keydown", function (e) {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              open();
            }
          });

          grid.appendChild(tile);
        });

        loadingBox.remove();
        wrap.appendChild(grid);

        // set first-frame thumbs for videos
        initVideoThumbs(wrap);
      })
      .catch(function () {
        loadingBox.outerHTML = '<div class="wm-empty">' + escapeHtml(t.empty) + "</div>";
      });
  }

  // =========================
  // INIT (multi-widgets safe)
  // =========================
  function init() {
    const nodes = document.querySelectorAll(".welo-media-widget");
    nodes.forEach(function (el) {
      try {
        render(el);
      } catch (_) {}
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
