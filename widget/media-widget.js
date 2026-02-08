/* =========================================================
   WELO • MEDIA REVIEWS WIDGET (Video + Images)
   - Premium grid like reference
   - Same-size cards
   - Mobile horizontal scroll (no stacking)
   - IT/EN via data-locale="IT" | "US" | "EN"
   - Show more
   - Lightbox
========================================================= */

(() => {
  /* =========================
     CONFIG
  ========================= */
  const PROJECT_URL = "https://ufqvcojyfsnscuddadnw.supabase.co";
  const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmcXZjb2p5ZnNuc2N1ZGRhZG53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MTg2NjksImV4cCI6MjA2MzM5NDY2OX0.iYJVmg9PXxOu0R3z62iRzr4am0q8ZSc8THlB2rE2oQM";

  const EDGE_FN = `${PROJECT_URL}/functions/v1/welo-media-reviews`;
  const STORAGE_PUBLIC_BASE = `${PROJECT_URL}/storage/v1/object/public/reviews-proof/`;

  const DEFAULT_WELO_PAGE_BASE = "https://www.welobadge.com/welo-page/";

  const I18N = {
    it: {
      title: "Video recensioni",
      subtitle: "Guarda cosa dicono i nostri clienti",
      cta: "Vedi altre recensioni",
      showMore: "Mostra di più",
      empty: "Nessun contenuto ancora.",
      close: "Chiudi",
    },
    en: {
      title: "Video reviews",
      subtitle: "See what our customers say",
      cta: "View more reviews",
      showMore: "Show more",
      empty: "No content yet.",
      close: "Close",
    },
  };

  /* =========================
     ONE-TIME INJECT (Font + CSS)
  ========================= */
  function ensureInter() {
    if (document.querySelector('link[data-welo-inter="1"]')) return;

    const pre1 = document.createElement("link");
    pre1.rel = "preconnect";
    pre1.href = "https://fonts.googleapis.com";
    pre1.setAttribute("data-welo-inter", "1");

    const pre2 = document.createElement("link");
    pre2.rel = "preconnect";
    pre2.href = "https://fonts.gstatic.com";
    pre2.crossOrigin = "anonymous";
    pre2.setAttribute("data-welo-inter", "1");

    const font = document.createElement("link");
    font.rel = "stylesheet";
    font.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap";
    font.setAttribute("data-welo-inter", "1");

    document.head.appendChild(pre1);
    document.head.appendChild(pre2);
    document.head.appendChild(font);
  }

  function ensureStyles() {
    if (document.getElementById("welo-media-widget-styles")) return;

    const css = `
/* ====== ROOT WRAPPER ====== */
.welo-media-wrap, .welo-media-wrap *{
  box-sizing:border-box;
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: geometricPrecision;
}

.welo-media-wrap{
  width:100%;
}

/* ====== HEADER ====== */
.welo-media-head{
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap:16px;
  margin-bottom:18px;
}

.welo-media-title{
  font-size:32px;
  line-height:1.05;
  font-weight:500;
  margin:0;
  color:#0b0b0b;
  letter-spacing:-0.02em;
}

.welo-media-subtitle{
  margin-top:8px;
  margin-bottom:0;
  font-size:18px;
  line-height:1.35;
  font-weight:400;
  color:#9aa0a6;
}

@media (max-width: 767px){
  .welo-media-title{ font-size:26px; }
  .welo-media-subtitle{ font-size:16px; }
}

/* ====== CTA BUTTON (top-right) ====== */
.welo-media-cta{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:10px;
  padding:14px 18px;
  border-radius:999px;
  background:#0b0b0b;
  color:#fff;
  font-size:14px;
  font-weight:500;
  text-decoration:none;
  white-space:nowrap;
  border:1px solid rgba(255,255,255,0.08);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  transition: transform .18s ease, opacity .18s ease;
  user-select:none;
}

.welo-media-cta:hover{ opacity:.92; transform: translateY(-1px); }
.welo-media-cta:active{ transform: translateY(0px); }

.welo-media-cta svg{ width:16px; height:16px; opacity:.95; }

/* ====== GRID ====== */
.welo-media-grid{
  display:grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap:22px;
  width:100%;
}

/* Tablet */
@media (max-width: 991px){
  .welo-media-grid{ grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

/* Mobile: horizontal scroll (no stacking) */
@media (max-width: 767px){
  .welo-media-grid{
    display:flex;
    gap:14px;
    overflow-x:auto;
    padding-bottom:6px;
    scroll-snap-type:x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width:none;
  }
  .welo-media-grid::-webkit-scrollbar{ display:none; }
}

/* ====== CARD ====== */
.welo-media-card{
  position:relative;
  border-radius:26px;
  overflow:hidden;
  background:#0b0b0b;
  box-shadow: 0 10px 30px rgba(0,0,0,0.10);
  cursor:pointer;
  transform: translateZ(0);
}

/* Same size everywhere (taller like you asked) */
.welo-media-card::before{
  content:"";
  display:block;
  width:100%;
  aspect-ratio: 4 / 3;
}

/* Mobile card width */
@media (max-width: 767px){
  .welo-media-card{
    flex: 0 0 82vw;
    max-width: 420px;
    scroll-snap-align:start;
  }
}

/* Media layer (image/video) */
.welo-media-media{
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  object-fit:cover;
  display:block;
  background:#0b0b0b;
}

/* Subtle hover */
@media (hover:hover) and (pointer:fine){
  .welo-media-card:hover .welo-media-media{
    transform: scale(1.03);
    transition: transform .28s ease;
  }
}

/* Overlay gradient */
.welo-media-overlay{
  position:absolute;
  inset:auto 0 0 0;
  padding:18px 18px 16px;
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.55) 42%, rgba(0,0,0,.78) 100%);
}

/* Text sizes requested */
.welo-media-card-title{
  margin:0;
  color:#fff;
  font-size:18px;
  font-weight:500;
  line-height:1.2;
  letter-spacing:-0.01em;
  display:-webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
  overflow:hidden;
}

.welo-media-card-desc{
  margin-top:8px;
  margin-bottom:0;
  color:rgba(255,255,255,0.88);
  font-size:15px;
  font-weight:400;
  line-height:1.35;
  display:-webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
  overflow:hidden;
}

/* Play icon (video only) */
.welo-media-play{
  position:absolute;
  left:50%;
  top:50%;
  transform: translate(-50%, -50%);
  width:86px;
  height:86px;
  display:flex;
  align-items:center;
  justify-content:center;
  pointer-events:none;
  filter: drop-shadow(0 10px 18px rgba(0,0,0,0.35));
  opacity: .98;
}

.welo-media-play svg{
  width:84px;
  height:84px;
}

/* ====== SHOW MORE ====== */
.welo-media-more-wrap{
  display:flex;
  justify-content:center;
  margin-top:18px;
}

.welo-media-more{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  padding:14px 22px;
  border-radius:12px;
  border:1px solid rgba(0,0,0,0.10);
  background:#0b0b0b;
  color:#fff;
  font-size:14px;
  font-weight:500;
  cursor:pointer;
  transition: transform .18s ease, opacity .18s ease;
  min-width: 180px;
}

.welo-media-more:hover{ opacity:.92; transform: translateY(-1px); }
.welo-media-more:active{ transform: translateY(0px); }

/* ====== EMPTY ====== */
.welo-media-empty{
  border-radius:18px;
  border:1px solid rgba(0,0,0,0.08);
  padding:28px 18px;
  color:#6b7280;
  font-size:14px;
}

/* ====== LIGHTBOX ====== */
.welo-media-lightbox{
  position:fixed;
  inset:0;
  z-index:999999;
  display:none;
  align-items:center;
  justify-content:center;
  background: rgba(10,12,16,.86);
  backdrop-filter: blur(6px);
  padding:18px;
}

.welo-media-lightbox.is-open{ display:flex; }

.welo-media-lightbox-inner{
  position:relative;
  width:min(980px, 96vw);
  max-height: 86vh;
  border-radius:22px;
  overflow:hidden;
  background:#000;
  box-shadow: 0 30px 80px rgba(0,0,0,0.35);
}

.welo-media-lightbox-media{
  width:100%;
  height:100%;
  max-height:86vh;
  display:block;
  object-fit:contain;
  background:#000;
}

.welo-media-lightbox video{
  width:100%;
  height:auto;
  max-height:86vh;
  display:block;
}

.welo-media-lightbox-close{
  position:absolute;
  top:12px;
  right:12px;
  width:40px;
  height:40px;
  border-radius:999px;
  border:none;
  background: rgba(0,0,0,.55);
  color:#fff;
  display:flex;
  align-items:center;
  justify-content:center;
  cursor:pointer;
  transition: transform .18s ease, background .18s ease;
}

.welo-media-lightbox-close:hover{
  background: rgba(0,0,0,.72);
  transform: scale(1.06);
}

.welo-media-lightbox-close svg{ width:18px; height:18px; }

    `;

    const style = document.createElement("style");
    style.id = "welo-media-widget-styles";
    style.textContent = css;
    document.head.appendChild(style);
  }

  /* =========================
     HELPERS
  ========================= */
  function normalizeLocale(raw) {
    const s = String(raw || "").trim().toLowerCase();
    if (s === "it" || s === "italy" || s === "ita" || s === "it-it" || s === "it_it") return "it";
    if (s === "us" || s === "usa" || s === "en" || s === "uk" || s === "en-us" || s === "en_us" || s === "en-gb" || s === "en_gb") return "en";
    // fallback path
    if (window.location.pathname.startsWith("/en")) return "en";
    // fallback browser
    if ((navigator.language || "").toLowerCase().startsWith("en")) return "en";
    return "it";
  }

  function clampText(str, max = 110) {
    const s = String(str || "").replace(/\s+/g, " ").trim();
    if (!s) return "";
    return s.length > max ? s.slice(0, max - 1) + "…" : s;
  }

  function detectTypeFromUrl(url) {
    const u = String(url || "").toLowerCase();
    if (/\.(mp4|mov|webm|ogg)(\?|#|$)/i.test(u)) return "video";
    return "image";
  }

  function publicUrlFromMaybePath(maybePathOrUrl) {
    const v = String(maybePathOrUrl || "").trim();
    if (!v) return "";
    if (v.startsWith("http://") || v.startsWith("https://")) return v;

    // treat as storage path: "Welo/filename.mp4"
    const cleaned = v.replace(/^\/+/, "");
    const encoded = cleaned
      .split("/")
      .map((seg) => encodeURIComponent(seg))
      .join("/");
    return STORAGE_PUBLIC_BASE + encoded;
  }

  function extractFirstMedia(item) {
    // Support multiple shapes:
    // item.media: [{url,type}] OR item.media_url OR item.url OR item.path OR item.prove_di_acquisto
    if (!item) return { url: "", type: "image" };

    // array
    if (Array.isArray(item.media) && item.media.length) {
      const m = item.media[0] || {};
      const url = publicUrlFromMaybePath(m.url || m.path || m.src || "");
      const type = m.type || detectTypeFromUrl(url);
      return { url, type };
    }

    // direct fields
    const direct =
      item.media_url ||
      item.mediaUrl ||
      item.url ||
      item.src ||
      item.path ||
      item.file ||
      item.file_path ||
      "";

    if (direct) {
      const url = publicUrlFromMaybePath(direct);
      return { url, type: item.type || item.media_type || detectTypeFromUrl(url) };
    }

    // prove_di_acquisto can be comma-separated paths
    const prova = item.prove_di_acquisto || item.prove_di_acquisto_path || item["prove_di_acquisto"] || "";
    if (prova) {
      const first = String(prova)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)[0];
      const url = publicUrlFromMaybePath(first);
      return { url, type: detectTypeFromUrl(url) };
    }

    return { url: "", type: "image" };
  }

  function buildPlayIcon() {
    // Rounded triangle (white) like your reference
    const wrap = document.createElement("div");
    wrap.className = "welo-media-play";
    wrap.innerHTML = `
<svg viewBox="0 0 120 120" fill="none" aria-hidden="true">
  <path
    d="M48.5 35.5C45.3 33.7 41.5 33.7 38.5 35.4C35.4 37.2 33.5 40.5 33.5 44V76C33.5 79.5 35.4 82.8 38.5 84.6C41.5 86.3 45.3 86.3 48.5 84.5L80.5 68.5C83.9 66.8 86 63.5 86 60C86 56.5 83.9 53.2 80.5 51.5L48.5 35.5Z"
    fill="white"
  />
</svg>`;
    return wrap;
  }

  function ensureLightbox() {
    let lb = document.querySelector(".welo-media-lightbox");
    if (lb) return lb;

    lb = document.createElement("div");
    lb.className = "welo-media-lightbox";
    lb.innerHTML = `
      <div class="welo-media-lightbox-inner" role="dialog" aria-modal="true">
        <button class="welo-media-lightbox-close" type="button" aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
        <div class="welo-media-lightbox-slot"></div>
      </div>
    `;
    document.body.appendChild(lb);

    const closeBtn = lb.querySelector(".welo-media-lightbox-close");
    const close = () => {
      lb.classList.remove("is-open");
      document.body.style.overflow = "";
      const slot = lb.querySelector(".welo-media-lightbox-slot");
      slot.innerHTML = "";
    };

    closeBtn.addEventListener("click", close);
    lb.addEventListener("click", (e) => {
      if (e.target === lb) close();
    });
    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
    });

    lb.openMedia = ({ url, type }) => {
      const slot = lb.querySelector(".welo-media-lightbox-slot");
      slot.innerHTML = "";

      if (type === "video") {
        const v = document.createElement("video");
        v.src = url;
        v.controls = true;
        v.playsInline = true;
        v.setAttribute("playsinline", "");
        v.setAttribute("webkit-playsinline", "");
        slot.appendChild(v);
      } else {
        const img = document.createElement("img");
        img.src = url;
        img.className = "welo-media-lightbox-media";
        img.alt = "";
        slot.appendChild(img);
      }

      lb.classList.add("is-open");
      document.body.style.overflow = "hidden";
    };

    return lb;
  }

  /* =========================
     FETCH
  ========================= */
  async function fetchItems(company, limit) {
    const url = `${EDGE_FN}?company=${encodeURIComponent(company)}&limit=${encodeURIComponent(
      limit
    )}`;

    const res = await fetch(url, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });

    const data = await res.json().catch(() => ({}));
    const items = Array.isArray(data.items) ? data.items : [];
    return items;
  }

  /* =========================
     RENDER ONE WIDGET
  ========================= */
  async function mount(el) {
    const company = (el.getAttribute("data-welo") || "").trim();
    if (!company) return;

    const locale = normalizeLocale(el.getAttribute("data-locale"));
    const t = I18N[locale];

    const baseLimit = Math.max(1, Number(el.getAttribute("data-limit") || 8));
    const step = Math.max(1, Number(el.getAttribute("data-step") || 4));

    const weloUrl =
      (el.getAttribute("data-url") || "").trim() || `${DEFAULT_WELO_PAGE_BASE}${company}`;

    // shell
    const wrap = document.createElement("div");
    wrap.className = "welo-media-wrap";

    wrap.innerHTML = `
      <div class="welo-media-head">
        <div>
          <h2 class="welo-media-title">${t.title}</h2>
          <p class="welo-media-subtitle">${t.subtitle}</p>
        </div>
        <a class="welo-media-cta" href="${weloUrl}" target="_blank" rel="noopener">
          <span>${t.cta}</span>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M7 17L17 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M10 7H17V14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </a>
      </div>

      <div class="welo-media-grid" aria-live="polite"></div>

      <div class="welo-media-more-wrap" style="display:none;">
        <button class="welo-media-more" type="button">${t.showMore}</button>
      </div>
    `;

    el.innerHTML = "";
    el.appendChild(wrap);

    const grid = wrap.querySelector(".welo-media-grid");
    const moreWrap = wrap.querySelector(".welo-media-more-wrap");
    const moreBtn = wrap.querySelector(".welo-media-more");

    const lightbox = ensureLightbox();

    let currentLimit = baseLimit;
    let cached = [];

    function buildCard(item) {
      const { url, type } = extractFirstMedia(item);
      if (!url) return null;

      const title = clampText(item.title || item.Titolo || item.review_title || "", 54);
      const desc = clampText(item.text || item.Testo || item.review_text || item.description || "", 88);

      const card = document.createElement("div");
      card.className = "welo-media-card";
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");

      // Media element
      let mediaEl;
      if (type === "video") {
        const v = document.createElement("video");
        v.className = "welo-media-media";
        v.src = url;
        v.muted = true;
        v.playsInline = true;
        v.setAttribute("playsinline", "");
        v.setAttribute("webkit-playsinline", "");
        v.preload = "metadata";
        v.disablePictureInPicture = true;

        // try to show first frame
        const showFrame = () => {
          try {
            if (v.currentTime < 0.12) v.currentTime = 0.12;
          } catch (e) {}
        };
        if (v.readyState >= 2) showFrame();
        else {
          v.addEventListener("loadedmetadata", showFrame, { once: true });
          v.addEventListener("loadeddata", showFrame, { once: true });
        }

        mediaEl = v;
      } else {
        const img = document.createElement("img");
        img.className = "welo-media-media";
        img.src = url;
        img.alt = "";
        img.loading = "lazy";
        mediaEl = img;
      }

      card.appendChild(mediaEl);

      // Play icon for video
      if (type === "video") {
        card.appendChild(buildPlayIcon());
      }

      // Overlay text (optional, but kept short)
      const overlay = document.createElement("div");
      overlay.className = "welo-media-overlay";
      overlay.innerHTML = `
        ${title ? `<h3 class="welo-media-card-title">${escapeHtml(title)}</h3>` : ""}
        ${desc ? `<p class="welo-media-card-desc">${escapeHtml(desc)}</p>` : ""}
      `;
      card.appendChild(overlay);

      // Open lightbox on click
      const open = () => lightbox.openMedia({ url, type });
      card.addEventListener("click", open);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });

      return card;
    }

    function render(items) {
      grid.innerHTML = "";
      const cards = [];

      items.forEach((it) => {
        const c = buildCard(it);
        if (c) cards.push(c);
      });

      if (!cards.length) {
        grid.innerHTML = `<div class="welo-media-empty">${t.empty}</div>`;
        moreWrap.style.display = "none";
        return;
      }

      cards.forEach((c) => grid.appendChild(c));

      // Show more visibility:
      // If API returns fewer than limit, we hide; otherwise we show and fetch more on click
      moreWrap.style.display = (items.length >= currentLimit) ? "flex" : "none";
    }

    async function load() {
      try {
        const items = await fetchItems(company, currentLimit);
        cached = items;
        render(cached);
      } catch (e) {
        console.error("Welo media widget error:", e);
        grid.innerHTML = `<div class="welo-media-empty">${t.empty}</div>`;
        moreWrap.style.display = "none";
      }
    }

    moreBtn.addEventListener("click", async () => {
      currentLimit += step;

      // Re-fetch with higher limit (simple pagination without server changes)
      await load();

      // smooth scroll for mobile horizontal list (optional)
      try {
        if (window.innerWidth <= 767) {
          grid.scrollBy({ left: grid.clientWidth * 0.8, behavior: "smooth" });
        }
      } catch (e) {}
    });

    await load();
  }

  function escapeHtml(str) {
    return String(str || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  /* =========================
     BOOT
  ========================= */
  function boot() {
    ensureInter();
    ensureStyles();

    const nodes = Array.from(document.querySelectorAll(".welo-media-widget"));
    if (!nodes.length) return;

    nodes.forEach((el) => mount(el));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
