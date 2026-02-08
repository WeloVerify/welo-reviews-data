(function () {
  "use strict";

  // =========================
  // CONFIG
  // =========================
  const API_BASE =
    "https://ufqvcojyfsnscuddadnw.supabase.co/functions/v1/welo-media-reviews";
  const STYLE_ID = "welo-media-widget-styles-v4";
  const FONT_ID = "welo-inter-font";

  // =========================
  // LOCALE (IT/US)
  // =========================
  function normalizeLocale(raw) {
    if (!raw) return null;
    const v = String(raw).trim().toLowerCase();
    if (v === "it" || v === "ita" || v === "italy" || v === "it-it") return "it";
    if (
      v === "en" ||
      v === "us" ||
      v === "usa" ||
      v === "uk" ||
      v === "en-us" ||
      v === "en-gb"
    )
      return "en";
    return null;
  }

  function detectLocale(el) {
    const dl = normalizeLocale(el.getAttribute("data-locale"));
    if (dl) return dl;

    const dc = normalizeLocale(el.getAttribute("data-country"));
    if (dc) return dc;

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
      showMore: "Mostra di più",
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
      showMore: "Show more",
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

  function safeText(str, maxLen) {
    const s = String(str || "").trim();
    if (!s) return "";
    if (s.length > maxLen) return s.slice(0, maxLen - 1) + "…";
    return s;
  }

  function buildUrl(company, limit) {
    const u = new URL(API_BASE);
    u.searchParams.set("company", company);
    u.searchParams.set("limit", String(limit));
    return u.toString();
  }

  function isVideo(item) {
    return item && item.type === "video";
  }

  // =========================
  // STYLES (uniform cards like EightSleep)
  // =========================
  function injectFont() {
    if (document.getElementById(FONT_ID)) return;
    const link = document.createElement("link");
    link.id = FONT_ID;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap";
    document.head.appendChild(link);
  }

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    injectFont();

    const css = `
/* =========================
   WELO • MEDIA WIDGET v4
   Uniform grid (EightSleep-like)
   ========================= */
.welo-media-widget {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.wm-wrap { width:100%; }

.wm-head {
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap:16px;
  margin-bottom: 18px;
}
.wm-hgroup { display:flex; flex-direction:column; gap:8px; }
.wm-title {
  font-size: 44px;
  line-height: 1.02;
  font-weight: 800;
  letter-spacing: -0.03em;
  color:#0b0b0b;
  margin:0;
}
.wm-subtitle {
  font-size: 20px;
  line-height: 1.25;
  color:#9ca3af;
  font-weight: 600;
  margin:0;
}

.wm-cta {
  display:inline-flex;
  align-items:center;
  gap:10px;
  padding: 14px 18px;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  background:#0b0b0b;
  color:#fff;
  text-decoration:none;
  font-size: 14px;
  font-weight: 700;
  transition: transform .15s ease, opacity .15s ease;
  white-space:nowrap;
}
.wm-cta:hover { opacity:.92; transform: translateY(-1px); }
.wm-cta svg { width:16px; height:16px; }

@media (max-width: 640px){
  .wm-head { flex-direction:column; align-items:flex-start; }
  .wm-title { font-size: 30px; }
  .wm-subtitle { font-size: 16px; }
  .wm-cta { padding: 12px 14px; border-radius: 14px; }
}

/* GRID: all same size */
.wm-grid{
  display:grid;
  gap: 18px;
}
@media (min-width: 1024px){
  .wm-grid{ grid-template-columns: repeat(4, minmax(0, 1fr)); }
}
@media (min-width: 740px) and (max-width: 1023px){
  .wm-grid{ grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
@media (min-width: 480px) and (max-width: 739px){
  .wm-grid{ grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
}
@media (max-width: 479px){
  .wm-grid{ grid-template-columns: repeat(1, minmax(0, 1fr)); gap: 14px; }
}

/* TILE */
.wm-tile{
  position:relative;
  border-radius: 22px;
  overflow:hidden;
  background:#0a0a0a;
  border: 1px solid #eef0f3;
  cursor:pointer;
  transform: translateZ(0);
  box-shadow: 0 1px 0 rgba(0,0,0,.04);
  transition: transform .18s ease, box-shadow .18s ease;
  aspect-ratio: 3 / 4; /* SAME SIZE ALWAYS */
  min-height: 320px;
}
@media (max-width: 640px){
  .wm-tile{ min-height: 380px; }
}
.wm-tile:hover{
  transform: translateY(-2px);
  box-shadow: 0 18px 50px rgba(0,0,0,.14);
}

.wm-media{
  position:absolute;
  inset:0;
}
.wm-media img,
.wm-media video{
  width:100%;
  height:100%;
  object-fit: cover;
  display:block;
  transform: scale(1.02);
  transition: transform .35s ease;
}
.wm-tile:hover .wm-media img,
.wm-tile:hover .wm-media video{
  transform: scale(1.06);
}

/* bottom gradient for text */
.wm-overlay{
  position:absolute;
  inset:0;
  background: linear-gradient(
    to top,
    rgba(0,0,0,.86) 0%,
    rgba(0,0,0,.30) 42%,
    rgba(0,0,0,0) 72%
  );
  pointer-events:none;
}

/* PLAY ICON (big, centered, like screenshot) */
.wm-play{
  position:absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 84px;
  height: 84px;
  border-radius: 999px;
  background: rgba(255,255,255,.92);
  box-shadow: 0 14px 34px rgba(0,0,0,.32);
  display:flex;
  align-items:center;
  justify-content:center;
  pointer-events:none;
  transition: transform .18s ease, background .18s ease;
}
.wm-tile:hover .wm-play{
  transform: translate(-50%, -50%) scale(1.05);
  background: rgba(255,255,255,.96);
}
.wm-play:before{
  content:"";
  margin-left: 6px;
  width:0;height:0;
  border-style: solid;
  border-width: 14px 0 14px 22px;
  border-color: transparent transparent transparent #0b0b0b;
}

/* TEXT (short, premium) */
.wm-copy{
  position:absolute;
  left: 18px;
  right: 18px;
  bottom: 18px;
  display:flex;
  flex-direction:column;
  gap: 8px;
  color:#fff;
}
.wm-copy-title{
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.15;
  display:-webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow:hidden;
}
.wm-copy-desc{
  font-size: 15px;
  line-height: 1.35;
  color: rgba(255,255,255,.88);
  font-weight: 600;
  display:-webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow:hidden;
}

/* Loading / empty */
.wm-loading, .wm-empty{
  border: 1px dashed #e5e7eb;
  border-radius: 18px;
  padding: 18px;
  background: #fff;
  color: #6b7280;
  font-weight: 700;
}

/* SHOW MORE button (center) */
.wm-more-wrap{
  display:flex;
  justify-content:center;
  margin-top: 18px;
}
.wm-more{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  padding: 14px 22px;
  min-width: 220px;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  background:#0b0b0b;
  color:#fff;
  font-size: 14px;
  font-weight: 800;
  cursor:pointer;
  transition: transform .15s ease, opacity .15s ease;
}
.wm-more:hover{ opacity:.92; transform: translateY(-1px); }
.wm-more:active{ transform: translateY(0px); }

/* MODAL */
.wm-modal{
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
.wm-modal.is-open{ display:flex; }
.wm-modal-inner{
  width: min(1100px, 96vw);
  border-radius: 18px;
  overflow:hidden;
  background:#000;
  position:relative;
  box-shadow: 0 28px 90px rgba(0,0,0,.48);
}
.wm-modal-media{
  width:100%;
  max-height: 84vh;
  display:block;
  object-fit: contain;
  background:#000;
}
.wm-modal-close{
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
.wm-modal-close:hover{ transform: scale(1.06); background: rgba(0,0,0,.75); }

.wm-nav{
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
.wm-nav:hover{ transform: translateY(-50%) scale(1.06); background: rgba(0,0,0,.75); }
.wm-nav[disabled]{ opacity:.35; cursor: default; transform: translateY(-50%); }
.wm-prev{ left: 12px; }
.wm-next{ right: 12px; }
    `.trim();

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = css;
    document.head.appendChild(style);
  }

  // =========================
  // VIDEO THUMB (first frame)
  // =========================
  function primeVideoFrame(video) {
    try {
      video.muted = true;
      video.playsInline = true;
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      video.preload = "metadata";

      const showFrame = function () {
        try {
          if (video.currentTime < 0.1) video.currentTime = 0.1;
        } catch (_) {}
      };

      if (video.readyState >= 2) showFrame();
      else {
        video.addEventListener("loadeddata", showFrame, { once: true });
        video.addEventListener("loadedmetadata", showFrame, { once: true });
      }
    } catch (_) {}
  }

  // =========================
  // LAZY LOAD videos (optimized)
  // =========================
  function lazyLoadVideos(root) {
    const vids = Array.from(root.querySelectorAll("video[data-src]"));
    if (!vids.length) return;

    if (!("IntersectionObserver" in window)) {
      vids.forEach(function (v) {
        v.src = v.getAttribute("data-src");
        v.removeAttribute("data-src");
        v.load();
        primeVideoFrame(v);
      });
      return;
    }

    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          const v = e.target;
          const src = v.getAttribute("data-src");
          if (src) {
            v.src = src;
            v.removeAttribute("data-src");
            v.load();
            primeVideoFrame(v);
          }
          io.unobserve(v);
        });
      },
      { root: null, threshold: 0.15 }
    );

    vids.forEach(function (v) {
      io.observe(v);
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

      if (isVideo(item)) {
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
  // FETCH + RENDER
  // =========================
  function renderWidget(el) {
    injectStyles();

    const locale = detectLocale(el);
    const t = TEXTS[locale] || TEXTS.it;

    const company = (el.getAttribute("data-welo") || "").trim();
    if (!company) return;

    const only = (el.getAttribute("data-only") || "video").trim().toLowerCase(); // video | media
    const showText =
      (el.getAttribute("data-show-text") || "true").trim().toLowerCase() !== "false";

    const initialLimit = clamp(el.getAttribute("data-limit") || 8, 1, 50);
    const step = clamp(el.getAttribute("data-step") || 4, 1, 20);

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

    let currentLimit = initialLimit;

    function paint(items, totalCount) {
      // filtro client-side
      const filtered = (items || []).filter(function (it) {
        if (!it || !it.url) return false;
        if (only === "media") return true;
        return it.type === "video";
      });

      loadingBox.remove();

      // remove old grid / button
      const oldGrid = wrap.querySelector(".wm-grid");
      if (oldGrid) oldGrid.remove();
      const oldMore = wrap.querySelector(".wm-more-wrap");
      if (oldMore) oldMore.remove();

      if (!filtered.length) {
        const empty = document.createElement("div");
        empty.className = "wm-empty";
        empty.textContent = t.empty;
        wrap.appendChild(empty);
        return;
      }

      const grid = document.createElement("div");
      grid.className = "wm-grid";

      filtered.forEach(function (item, idx) {
        const tile = document.createElement("div");
        tile.className = "wm-tile";
        tile.setAttribute("role", "button");
        tile.setAttribute("tabindex", "0");

        const media = document.createElement("div");
        media.className = "wm-media";

        if (isVideo(item)) {
          const v = document.createElement("video");
          v.setAttribute("data-src", item.url); // lazy load
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

        const overlay = document.createElement("div");
        overlay.className = "wm-overlay";
        tile.appendChild(overlay);

        if (showText) {
          const title = safeText(item.title || "", 60);
          const desc = safeText(item.text || "", 90);

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

      wrap.appendChild(grid);
      lazyLoadVideos(wrap);

      // show more button only if there are more total items
      const total = Number(totalCount || 0);
      const currentlyShown = filtered.length;

      // Nota: count viene dal backend (totale); items.length è quanto hai caricato con limit
      if (total > items.length) {
        const moreWrap = document.createElement("div");
        moreWrap.className = "wm-more-wrap";
        moreWrap.innerHTML =
          '<button type="button" class="wm-more">' + escapeHtml(t.showMore) + "</button>";
        wrap.appendChild(moreWrap);

        moreWrap.querySelector(".wm-more").addEventListener("click", function () {
          currentLimit = clamp(currentLimit + step, 1, 50);
          fetchAndRender();
        });
      }
    }

    function fetchAndRender() {
      // ripristina loading solo la prima volta: no, manteniamo smooth
      fetch(buildUrl(company, currentLimit), { method: "GET" })
        .then(function (r) {
          return r.json();
        })
        .then(function (data) {
          const items = Array.isArray(data && data.items) ? data.items : [];
          const count = data && typeof data.count !== "undefined" ? data.count : items.length;
          paint(items, count);
        })
        .catch(function () {
          loadingBox.outerHTML = '<div class="wm-empty">' + escapeHtml(t.empty) + "</div>";
        });
    }

    fetchAndRender();
  }

  // =========================
  // INIT
  // =========================
  function init() {
    const nodes = document.querySelectorAll(".welo-media-widget");
    nodes.forEach(function (el) {
      try {
        renderWidget(el);
      } catch (_) {}
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
