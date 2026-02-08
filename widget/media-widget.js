/* =========================================================
   WELO • MEDIA REVIEWS WIDGET (UPDATED)
   Fixes:
   ✅ Safari: smoother 3D tilt (no perspective() in transform + RAF updates, no jitter)
   ✅ Videos: start muted by default (autoplay-safe)
   ✅ Desktop: video starts on FIRST hover (preload + canplay retry)
   ✅ Mobile: NO hover-play while scrolling (tap-only with move threshold)
   ✅ Mobile: tap toggles play/pause (keeps playing until next tap)
   ✅ Images: bottom-left “+” button + click/tap flips card to show review text (images only)
   ✅ Mobile header layout fixed (no overlapping CTA)
   ✅ Slightly shorter cards
   ✅ More space under subtitle
   ✅ Slightly reduced 3D tilt
   ✅ Hover shadow a bit stronger
   ✅ On hover (desktop) or while playing (mobile): caption + dark gradient disappear
========================================================= */

(() => {
  const STYLE_ID = "welo-media-widget-styles";
  const FONT_ID = "welo-media-widget-font";

  // ✅ Defaults (override via data-attributes)
  const DEFAULT_PROJECT_URL = "https://ufqvcojyfsnscuddadnw.supabase.co";
  const DEFAULT_FUNCTION_PATH = "/functions/v1/welo-media-reviews";
  const DEFAULT_BUCKET_PUBLIC_PATH = "/storage/v1/object/public/reviews-proof/";
  const DEFAULT_WELO_PAGE_BASE = "https://www.welobadge.com/welo-page/";

  const I18N = {
    it: {
      title: "Video recensioni",
      subtitle: "Guarda cosa dicono i nostri clienti",
      more: "Mostra di più",
      viewMore: "Vedi altre recensioni",
      muted: "Audio disattivato",
      unmuted: "Audio attivo",
      anonymous: "Cliente",
      timeAgo: (n, unit) => `${n} ${unit} fa`,
      readReview: "Leggi recensione",
      closeReview: "Chiudi recensione",
      noReviewText: "Testo recensione non disponibile",
    },
    en: {
      title: "Video reviews",
      subtitle: "See what our customers say",
      more: "Show more",
      viewMore: "View more reviews",
      muted: "Muted",
      unmuted: "Sound on",
      anonymous: "Customer",
      timeAgo: (n, unit) => `${n} ${unit} ago`,
      readReview: "Read review",
      closeReview: "Close review",
      noReviewText: "Review text not available",
    },
  };

  // ---------- Utils ----------
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  function pickLocale(el) {
    const raw =
      (el.getAttribute("data-locale") ||
        el.getAttribute("data-lang") ||
        el.getAttribute("data-language") ||
        el.getAttribute("data-market") ||
        el.getAttribute("data-country") ||
        "")
        .toLowerCase()
        .trim();

    if (raw === "it" || raw === "ita" || raw === "italy" || raw === "it-it") return "it";
    if (raw === "us" || raw === "en" || raw === "eng" || raw === "en-us" || raw === "uk" || raw === "en-gb") return "en";

    const nav = (navigator.language || "en").toLowerCase();
    return nav.startsWith("it") ? "it" : "en";
  }

  function ensureFont() {
    if (document.getElementById(FONT_ID)) return;
    const link = document.createElement("link");
    link.id = FONT_ID;
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap";
    document.head.appendChild(link);
  }

  function ensureStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const css = `
/* ============ WELO MEDIA WIDGET (namespaced) ============ */
.wm-root, .wm-root * { box-sizing: border-box; }
.wm-root{
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  width: 100%;
  background: #fff;
  color: #0a0a0a;
  overflow: visible;
}
.wm-wrap{
  width: min(1200px, 100%);
  margin: 0 auto;
  padding: 0 16px 18px 16px;
  background:#fff;
  overflow: visible;
  isolation: isolate;
}

/* Header */
.wm-header{
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap:16px;
  padding: 6px 0 40px 0; /* ✅ more space under subtitle */
  background:#fff;
  flex-wrap: wrap; /* ✅ prevents overlap */
}
.wm-hgroup{ min-width:0; }
.wm-title{
  font-size: 30px;
  line-height: 1.05;
  font-weight: 600;
  letter-spacing: -0.03em;
  margin: 0;
}
.wm-subtitle{
  margin-top: 10px;
  font-size: 18px;
  line-height: 1.35;
  font-weight: 500;
  color: #6b7280;
}

/* CTA */
.wm-cta{
  flex: 0 0 auto;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:10px;
  padding:14px 18px;
  border-radius:999px;
  border:1px solid rgba(10,10,10,.12);
  background:#0a0a0a;
  color:#fff;
  text-decoration:none;
  font-weight:600;
  font-size:14px;
  line-height:1;
  white-space:nowrap;
  transition: transform .15s ease, box-shadow .15s ease, opacity .15s ease;
  box-shadow: 0 10px 30px rgba(0,0,0,.10);
  max-width: 100%;
}
.wm-cta:hover{ transform: translateY(-1px); box-shadow: 0 16px 40px rgba(0,0,0,.16); }
.wm-cta:active{ transform: translateY(0) scale(.98); opacity:.95; }
.wm-cta svg{ width:16px; height:16px; }

/* Grid */
.wm-gridWrap{ background:#fff; overflow: visible; }
.wm-grid{
  display:grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  background:#fff;
  overflow: visible;
}

/* Responsive */
@media (max-width: 980px){
  .wm-grid{ grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 720px){
  .wm-header{
    flex-direction: column;
    align-items: stretch;
    padding-bottom: 34px;
  }
  .wm-title{ font-size: 30px; }
  .wm-subtitle{ font-size: 18px; }
  .wm-cta{ width: 100%; }
}
@media (max-width: 520px){
  .wm-grid{ grid-template-columns: repeat(1, minmax(0, 1fr)); }
  .wm-title{ font-size: 28px; }
}

/* Card */
.wm-cardWrap{
  perspective: 900px;
  -webkit-perspective: 900px;
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  background:#fff;
  border-radius: 18px;
  overflow: visible;
  touch-action: pan-y;
  will-change: transform;
}
.wm-card{
  position: relative;
  width: 100%;
  aspect-ratio: 10 / 16; /* ✅ keep height exactly the same */
  border-radius: 24px;
  overflow: hidden;
  background:#fff;

  /* ✅ IMPORTANT: no perspective() here (Safari jitter fix) */
  transform: rotateX(0deg) rotateY(0deg) translateZ(0.01px);
  transform-origin: center;

  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;

  transition: transform 180ms ease, box-shadow 160ms ease, filter 160ms ease;
  will-change: transform, box-shadow;
}
/* ✅ While moving: disable transform transition (prevents “vibration”) */
.wm-card.is-tilting{
  transition: box-shadow 160ms ease, filter 160ms ease;
}

/* Flip (IMAGES ONLY) */
.wm-inner{
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  transition: transform 520ms cubic-bezier(.2,.9,.2,1);
  will-change: transform;
}
.wm-cardWrap.is-flipped .wm-inner{
  transform: rotateY(180deg);
}
.wm-face{
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  border-radius: 24px;
  overflow:hidden;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.wm-back{
  transform: rotateY(180deg);
  background:#fff;
  color:#0a0a0a;
  display:flex;
  flex-direction:column;
  padding:18px 18px 18px 18px;
  gap:12px;
}
.wm-backTop{
  display:flex;
  flex-direction:column;
  gap:6px;
}
.wm-backName{
  font-size:16px;
  font-weight:600;
  letter-spacing:-0.01em;
  color:#0a0a0a;
}
.wm-backDate{
  font-size:13px;
  font-weight:500;
  color:#6b7280;
}
.wm-reviewText{
  flex: 1 1 auto;
  overflow:auto;
  -webkit-overflow-scrolling: touch;
  padding-right: 4px;
  font-size:16px;
  line-height:1.5;
  font-weight:500;
  color:#111827;
  white-space: pre-wrap;
}
.wm-reviewText::-webkit-scrollbar{ width:0; height:0; }

/* “+” button (images only) */
.wm-flipBtn{
  position:absolute;
  left:14px;
  bottom:14px;
  z-index:7;
  width:56px;
  height:56px;
  border-radius:999px;
  border:1px solid rgba(10,10,10,.08);
  background: rgba(255,255,255,.95);
  box-shadow: 0 14px 35px rgba(0,0,0,.18);
  display:grid;
  place-items:center;
  cursor:pointer;
  padding:0;
  transition: transform .16s ease, box-shadow .16s ease, opacity .16s ease;
}
.wm-flipBtn:hover{ box-shadow: 0 18px 45px rgba(0,0,0,.22); transform: translateY(-1px); }
.wm-flipBtn:active{ transform: translateY(0) scale(.98); opacity:.95; }
.wm-flipBtn svg{
  width:22px;
  height:22px;
  stroke:#6b7280;
  stroke-width:2.6;
  stroke-linecap:round;
}
.wm-cardWrap.is-flipped .wm-flipBtn{
  transform: rotate(45deg);
}

/* Media */
.wm-media{
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  object-fit: cover;
  display:block;
  user-select:none;
  -webkit-user-drag:none;
  pointer-events:none;

  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0.01px);
}

/* Placeholder (helps when video first frame is loading) */
.wm-ph{
  position:absolute;
  inset:0;
  background: linear-gradient(180deg, #f3f4f6 0%, #e5e7eb 100%);
  opacity: 0;
  transition: opacity .18s ease;
}
.wm-cardWrap.is-video .wm-ph{ opacity: 1; }
.wm-cardWrap.is-ready .wm-ph{ opacity: 0; }

/* Gradient + Caption */
.wm-grad{
  position:absolute;
  inset:0;
  background: linear-gradient(to top, rgba(0,0,0,.76) 0%, rgba(0,0,0,.20) 38%, rgba(0,0,0,0) 62%);
  pointer-events:none;
  opacity: 1;
  transition: opacity .18s ease;
}
.wm-caption{
  position:absolute;
  left:18px; right:18px; bottom:18px;
  color:#fff;
  z-index:4;
  transition: opacity .18s ease, transform .18s ease;
}
.wm-name{
  font-size:18px;
  line-height:1.15;
  font-weight:500;
  letter-spacing:-0.01em;
  margin:0;
}
.wm-date{
  margin-top:8px;
  font-size:15px;
  line-height:1.2;
  font-weight:400;
  color: rgba(255,255,255,.86);
}

/* Play icon (videos only) */
.wm-play{
  position:absolute;
  inset:0;
  display:grid;
  place-items:center;
  z-index:3;
  pointer-events:none;
  transition: opacity .15s ease, transform .15s ease;
}
.wm-playIcon{
  width:84px;
  height:84px;
  filter: drop-shadow(0 10px 25px rgba(0,0,0,.25));
}

/* Mute toggle (videos only) */
.wm-audio{
  position:absolute;
  top:14px; right:14px;
  z-index:8;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  width:44px; height:44px;
  border-radius:999px;
  border:1px solid rgba(255,255,255,.22);
  background: rgba(0,0,0,.45);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  cursor:pointer;
  opacity:0;
  transform: translateY(-4px);
  transition: opacity .16s ease, transform .16s ease;
}
.wm-audio svg{ width:20px; height:20px; fill:#fff; }
.wm-audio:active{ transform: translateY(0) scale(.96); }

/* Desktop hover effects ONLY on hover-capable devices */
@media (hover: hover) and (pointer: fine){
  .wm-cardWrap:hover .wm-card{
    box-shadow: 0 22px 60px rgba(0,0,0,.22);
  }
  .wm-cardWrap:hover .wm-caption{
    opacity:0;
    transform: translateY(8px);
  }
  .wm-cardWrap:hover .wm-grad{ opacity:0; }
  .wm-cardWrap:hover .wm-play{ opacity:0; transform: scale(.98); }
  .wm-cardWrap:hover .wm-audio{ opacity:1; transform: translateY(0); }
}

/* Playing state (used on mobile tap + also set on desktop hover) */
.wm-cardWrap.is-playing .wm-caption{ opacity:0; transform: translateY(8px); }
.wm-cardWrap.is-playing .wm-grad{ opacity:0; }
.wm-cardWrap.is-playing .wm-play{ opacity:0; transform: scale(.98); }
.wm-cardWrap.is-playing .wm-audio{ opacity:1; transform: translateY(0); }
.wm-cardWrap.is-playing .wm-card{ box-shadow: 0 22px 60px rgba(0,0,0,.22); }

/* Loading / empty */
.wm-status{
  padding: 18px 0 6px 0;
  color:#6b7280;
  font-size:14px;
}
.wm-moreBtn{
  margin: 18px auto 0 auto;
  display:none;
  padding:12px 18px;
  border-radius:12px;
  border:1px solid rgba(10,10,10,.12);
  background:#fff;
  color:#0a0a0a;
  font-weight:600;
  cursor:pointer;
  transition: transform .14s ease, box-shadow .14s ease;
}
.wm-moreBtn:hover{ transform: translateY(-1px); box-shadow: 0 12px 30px rgba(0,0,0,.10); }
.wm-moreBtn:active{ transform: translateY(0) scale(.98); }

/* Reduce motion */
@media (prefers-reduced-motion: reduce){
  .wm-card{ transition: box-shadow 160ms ease; transform:none !important; }
  .wm-inner{ transition: none !important; }
}
    `;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = css;
    document.head.appendChild(style);
  }

  function isVideoUrl(url = "") {
    const u = url.toLowerCase().split("?")[0];
    return u.endsWith(".mp4") || u.endsWith(".webm") || u.endsWith(".mov") || u.endsWith(".m4v");
  }

  function safeStr(v, fallback = "") {
    if (typeof v === "string" && v.trim()) return v.trim();
    return fallback;
  }

  function parseDate(v) {
    if (!v) return null;
    if (v instanceof Date) return v;
    if (typeof v === "number") return new Date(v);
    const d = new Date(v);
    return isNaN(d.getTime()) ? null : d;
  }

  function relativeTimeFromNow(date, locale) {
    const t = I18N[locale] || I18N.en;
    const d = parseDate(date);
    if (!d) return "";

    const now = new Date();
    const diffMs = now - d;
    const diffSec = Math.floor(diffMs / 1000);

    const minutes = Math.floor(diffSec / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years >= 1) return t.timeAgo(years, locale === "it" ? (years === 1 ? "anno" : "anni") : (years === 1 ? "year" : "years"));
    if (months >= 1) return t.timeAgo(months, locale === "it" ? (months === 1 ? "mese" : "mesi") : (months === 1 ? "month" : "months"));
    if (days >= 1) return t.timeAgo(days, locale === "it" ? (days === 1 ? "giorno" : "giorni") : (days === 1 ? "day" : "days"));
    if (hours >= 1) return t.timeAgo(hours, locale === "it" ? (hours === 1 ? "ora" : "ore") : (hours === 1 ? "hour" : "hours"));
    if (minutes >= 1) return t.timeAgo(minutes, locale === "it" ? (minutes === 1 ? "minuto" : "minuti") : (minutes === 1 ? "minute" : "minutes"));
    return locale === "it" ? "poco fa" : "just now";
  }

  // ---------- SVGs ----------
  function playSvg() {
    return `
<svg class="wm-playIcon" viewBox="0 0 96 96" aria-hidden="true">
  <defs>
    <filter id="wmSoft" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="rgba(0,0,0,.25)"/>
    </filter>
  </defs>
  <g filter="url(#wmSoft)">
    <path d="M40 30 L68 48 L40 66 Q34 70 34 64 V32 Q34 26 40 30Z" fill="#fff" opacity="0.98"/>
  </g>
</svg>`;
  }

  function plusSvg() {
    return `
<svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="M12 5v14"></path>
  <path d="M5 12h14"></path>
</svg>`;
  }

  function iconMuted() {
    return `
<svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="M11 5.5 7.9 8H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2.9L11 18.5a1 1 0 0 0 1.6-.8V6.3A1 1 0 0 0 11 5.5Z"></path>
  <path d="M16.5 9.5 21 14m0-4.5-4.5 4.5" stroke="#fff" stroke-width="2" stroke-linecap="round" fill="none"></path>
</svg>`;
  }
  function iconUnmuted() {
    return `
<svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="M11 5.5 7.9 8H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2.9L11 18.5a1 1 0 0 0 1.6-.8V6.3A1 1 0 0 0 11 5.5Z"></path>
  <path d="M15.5 9.2c1.2 1.2 1.2 4.4 0 5.6" stroke="#fff" stroke-width="2" stroke-linecap="round" fill="none"></path>
  <path d="M18.2 6.6c3 3 3 7.8 0 10.8" stroke="#fff" stroke-width="2" stroke-linecap="round" fill="none" opacity=".85"></path>
</svg>`;
  }

  // ---------- Widget ----------
  function buildWidget(el) {
    ensureFont();
    ensureStyles();

    // Force the mount element to be white too (helps when Webflow section is weird)
    try { el.style.background = "#fff"; } catch (_) {}

    const locale = pickLocale(el);
    const t = I18N[locale] || I18N.en;

    const company =
      el.getAttribute("data-welo") ||
      el.getAttribute("data-company") ||
      el.getAttribute("data-slug") ||
      "";

    if (!company) {
      el.innerHTML = `<div class="wm-root"><div class="wm-wrap"><div class="wm-status">Missing data-welo (company slug).</div></div></div>`;
      return;
    }

    const projectUrl = el.getAttribute("data-project-url") || DEFAULT_PROJECT_URL;
    const apiUrl = el.getAttribute("data-api") || `${projectUrl}${DEFAULT_FUNCTION_PATH}`;
    const storageBase = el.getAttribute("data-storage-base") || `${projectUrl}${DEFAULT_BUCKET_PUBLIC_PATH}`;

    const limit = parseInt(el.getAttribute("data-limit") || "24", 10);
    const initial = parseInt(el.getAttribute("data-initial") || "8", 10);
    const step = parseInt(el.getAttribute("data-step") || String(initial), 10);

    const weloPageUrl =
      el.getAttribute("data-url") ||
      `${DEFAULT_WELO_PAGE_BASE}${encodeURIComponent(company)}`;

    // Optional anon key if your function requires it
    const anonKey = el.getAttribute("data-anon-key") || "";

    // Device capability
    const HOVER_CAPABLE = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Root markup
    el.innerHTML = `
<div class="wm-root">
  <div class="wm-wrap">
    <div class="wm-header">
      <div class="wm-hgroup">
        <div class="wm-title">${t.title}</div>
        <div class="wm-subtitle">${t.subtitle}</div>
      </div>
      <a class="wm-cta" href="${weloPageUrl}" target="_blank" rel="noopener">
        ${t.viewMore}
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 17L17 7M9 7h8v8" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
    </div>

    <div class="wm-gridWrap">
      <div class="wm-grid" aria-live="polite"></div>
      <div class="wm-status" style="display:none;"></div>
      <button class="wm-moreBtn" type="button">${t.more}</button>
    </div>
  </div>
</div>
    `;

    const grid = el.querySelector(".wm-grid");
    const status = el.querySelector(".wm-status");
    const moreBtn = el.querySelector(".wm-moreBtn");

    // ✅ Always start muted (autoplay-safe)
    let muted = true;

    // State
    let items = [];
    let shown = 0;

    function normalizeItem(item) {
      const rawUrl =
        item.url ||
        item.mediaUrl ||
        item.media_url ||
        item.public_url ||
        item.proof_url ||
        item.prove_di_acquisto_url ||
        "";

      const proofPath = item.prove_di_acquisto || item.proof_path || item.path || "";
      const url = rawUrl || (proofPath ? `${storageBase}${proofPath}` : "");

      const name =
        item.author ||
        item.author_name ||
        item.reviewer ||
        item.reviewer_name ||
        item.display_name ||
        item.name ||
        "";

      const created =
        item.created_at ||
        item.createdAt ||
        item.date ||
        item.timestamp ||
        item.inserted_at ||
        item.submitted_at ||
        null;

      const text =
        item.review_text ||
        item.reviewText ||
        item.review ||
        item.text ||
        item.comment ||
        item.caption ||
        item.message ||
        item.description ||
        "";

      const isVideo =
        item.type === "video" ||
        item.media_type === "video" ||
        isVideoUrl(url);

      return {
        url,
        name: safeStr(name, t.anonymous),
        date: created,
        isVideo,
        text: safeStr(text, ""),
      };
    }

    function setStatus(msg, show = true) {
      status.style.display = show ? "block" : "none";
      status.textContent = msg || "";
    }

    // Pause all other videos (nice on mobile)
    function pauseAllExcept(exceptVideo) {
      grid.querySelectorAll("video.wm-media").forEach((v) => {
        if (v === exceptVideo) return;
        try { v.pause(); } catch (_) {}
        const wrap = v.closest(".wm-cardWrap");
        if (wrap) wrap.classList.remove("is-playing");
      });
    }

    // Lazy-load videos when near viewport
    const videoObserver = ("IntersectionObserver" in window)
      ? new IntersectionObserver((entries, obs) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const v = entry.target;
            if (v && v.dataset && v.dataset.src && !v.src) {
              v.src = v.dataset.src;
              v.preload = "metadata";
              try { v.load(); } catch (_) {}
            }
            obs.unobserve(v);
          });
        }, { rootMargin: "900px 0px", threshold: 0.01 })
      : null;

    function ensureVideoSrc(videoEl) {
      if (!videoEl) return;
      if (!videoEl.src && videoEl.dataset && videoEl.dataset.src) {
        videoEl.src = videoEl.dataset.src;
        videoEl.preload = "metadata";
        try { videoEl.load(); } catch (_) {}
      }
    }

    async function playWithFallback(videoEl) {
      if (!videoEl) return;
      ensureVideoSrc(videoEl);

      // ✅ keep muted truly enforced (Safari/autoplay)
      videoEl.muted = muted;
      videoEl.defaultMuted = muted;

      if (muted) {
        videoEl.setAttribute("muted", "");
        videoEl.volume = 0;
      } else {
        videoEl.removeAttribute("muted");
        videoEl.volume = 1;
      }

      const tryPlay = async () => {
        try {
          await videoEl.play();
          return true;
        } catch (e) {
          // If unmuted blocks autoplay, fallback to muted
          if (!videoEl.muted) {
            videoEl.muted = true;
            videoEl.defaultMuted = true;
            videoEl.setAttribute("muted", "");
            videoEl.volume = 0;
            try { await videoEl.play(); return true; } catch (_) {}
          }
          return false;
        }
      };

      // Try immediately
      const ok = await tryPlay();
      if (ok) return;

      // Retry once when it can play (first hover issue fix)
      await new Promise((resolve) => {
        let done = false;
        const finish = () => { if (done) return; done = true; resolve(); };

        const onCanPlay = async () => {
          videoEl.removeEventListener("canplay", onCanPlay);
          await tryPlay();
          finish();
        };

        videoEl.addEventListener("canplay", onCanPlay, { once: true });
        setTimeout(finish, 900);
      });
    }

    function createCard(it) {
      const wrap = document.createElement("div");
      wrap.className = "wm-cardWrap";
      wrap.classList.add(it.isVideo ? "is-video" : "is-image");

      const card = document.createElement("div");
      card.className = "wm-card";

      // Flip inner (front always, back only for images)
      const inner = document.createElement("div");
      inner.className = "wm-inner";

      const front = document.createElement("div");
      front.className = "wm-face wm-front";

      // Media
      let mediaEl;
      if (it.isVideo) {
        const v = document.createElement("video");
        v.className = "wm-media";
        v.dataset.src = it.url;     // ✅ lazy src
        v.preload = "none";

        // ✅ start muted always
        v.muted = true;
        v.defaultMuted = true;
        v.setAttribute("muted", "");
        v.volume = 0;

        v.loop = true;
        v.playsInline = true;
        v.setAttribute("webkit-playsinline", "true");
        v.setAttribute("playsinline", "true");
        v.disablePictureInPicture = true;
        v.disableRemotePlayback = true;
        v.controls = false;
        v.controlsList = "nodownload noplaybackrate noremoteplayback";
        v.crossOrigin = "anonymous";

        v.addEventListener("loadeddata", () => {
          wrap.classList.add("is-ready");
        }, { once: true });

        if (videoObserver) videoObserver.observe(v);
        else {
          v.src = it.url;
          v.preload = "metadata";
          try { v.load(); } catch (_) {}
        }

        mediaEl = v;
      } else {
        const img = document.createElement("img");
        img.className = "wm-media";
        img.src = it.url;
        img.alt = it.name;
        img.loading = "lazy";
        img.decoding = "async";
        mediaEl = img;

        wrap.classList.add("is-ready");
      }

      // Placeholder (videos)
      const ph = document.createElement("div");
      ph.className = "wm-ph";

      // Gradient overlay
      const grad = document.createElement("div");
      grad.className = "wm-grad";

      // Caption
      const caption = document.createElement("div");
      caption.className = "wm-caption";

      const nm = document.createElement("div");
      nm.className = "wm-name";
      nm.textContent = it.name;

      const dt = document.createElement("div");
      dt.className = "wm-date";
      dt.textContent = relativeTimeFromNow(it.date, locale);

      caption.appendChild(nm);
      caption.appendChild(dt);

      // Play icon (video)
      let play = null;
      if (it.isVideo) {
        play = document.createElement("div");
        play.className = "wm-play";
        play.innerHTML = playSvg();
      }

      // Audio toggle (video)
      let audioBtn = null;
      if (it.isVideo) {
        audioBtn = document.createElement("button");
        audioBtn.type = "button";
        audioBtn.className = "wm-audio";
        audioBtn.setAttribute("aria-label", muted ? t.muted : t.unmuted);
        audioBtn.innerHTML = muted ? iconMuted() : iconUnmuted();

        audioBtn.addEventListener("click", async (e) => {
          e.preventDefault();
          e.stopPropagation();

          muted = !muted;
          try { localStorage.setItem("welo_media_muted", String(muted)); } catch (_) {}

          grid.querySelectorAll("video.wm-media").forEach((vid) => {
            vid.muted = muted;
            vid.defaultMuted = muted;

            if (muted) {
              vid.setAttribute("muted", "");
              vid.volume = 0;
            } else {
              vid.removeAttribute("muted");
              vid.volume = 1;
            }

            if (!muted && !vid.paused) {
              vid.play().catch(() => {});
            }
          });

          audioBtn.setAttribute("aria-label", muted ? t.muted : t.unmuted);
          audioBtn.innerHTML = muted ? iconMuted() : iconUnmuted();
        });
      }

      // Build FRONT face
      front.appendChild(mediaEl);
      if (it.isVideo) front.appendChild(ph);
      front.appendChild(grad);
      if (play) front.appendChild(play);
      if (audioBtn) front.appendChild(audioBtn);
      front.appendChild(caption);

      inner.appendChild(front);

      // Build BACK face (images only)
      if (!it.isVideo) {
        const back = document.createElement("div");
        back.className = "wm-face wm-back";

        const top = document.createElement("div");
        top.className = "wm-backTop";

        const bName = document.createElement("div");
        bName.className = "wm-backName";
        bName.textContent = it.name;

        const bDate = document.createElement("div");
        bDate.className = "wm-backDate";
        bDate.textContent = relativeTimeFromNow(it.date, locale);

        top.appendChild(bName);
        top.appendChild(bDate);

        const reviewText = document.createElement("div");
        reviewText.className = "wm-reviewText";
        reviewText.textContent = it.text || t.noReviewText;

        back.appendChild(top);
        back.appendChild(reviewText);

        inner.appendChild(back);

        // “+” button (images only)
        const flipBtn = document.createElement("button");
        flipBtn.type = "button";
        flipBtn.className = "wm-flipBtn";
        flipBtn.setAttribute("aria-label", t.readReview);
        flipBtn.innerHTML = plusSvg();

        const toggleFlip = (force) => {
          const next = typeof force === "boolean" ? force : !wrap.classList.contains("is-flipped");
          if (next) wrap.classList.add("is-flipped");
          else wrap.classList.remove("is-flipped");
          flipBtn.setAttribute("aria-label", next ? t.closeReview : t.readReview);

          // keep it stable when flipping
          resetTilt();
        };

        flipBtn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFlip();
        });

        // Click anywhere on image card toggles flip (desktop)
        wrap.addEventListener("click", (e) => {
          // avoid any weirdness if user clicks while selecting text on back
          if (e.defaultPrevented) return;
          toggleFlip();
        });

        // Mobile tap protection (avoid flipping while scrolling)
        if (!HOVER_CAPABLE) {
          let downX = 0, downY = 0, downT = 0;
          let pointerId = null;

          wrap.addEventListener("pointerdown", (e) => {
            if (e.pointerType !== "touch") return;
            pointerId = e.pointerId;
            downX = e.clientX;
            downY = e.clientY;
            downT = Date.now();
          });

          wrap.addEventListener("pointerup", (e) => {
            if (e.pointerType !== "touch") return;
            if (pointerId !== e.pointerId) return;

            const dx = Math.abs(e.clientX - downX);
            const dy = Math.abs(e.clientY - downY);
            const dtap = Date.now() - downT;

            const isTap = dx < 10 && dy < 10 && dtap < 450;
            if (!isTap) return;

            toggleFlip();
          });

          wrap.addEventListener("pointercancel", (e) => {
            if (e.pointerType !== "touch") return;
            pointerId = null;
          });
        }

        card.appendChild(flipBtn);
      }

      card.appendChild(inner);
      wrap.appendChild(card);

      // ===== Interactions (Tilt + Video hover) =====
      const MAX_TILT = 3.2;

      let raf = 0;
      let lastX = 0;
      let lastY = 0;
      let rect = null;

      function applyTiltFrame() {
        raf = 0;
        if (!rect) rect = card.getBoundingClientRect();

        const x = (lastX - rect.left) / rect.width;
        const y = (lastY - rect.top) / rect.height;

        const ry = clamp((x - 0.5) * (MAX_TILT * 2), -MAX_TILT, MAX_TILT);
        const rx = clamp((0.5 - y) * (MAX_TILT * 2), -MAX_TILT, MAX_TILT);

        card.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(0.01px)`;
      }

      function onMove(e) {
        // ✅ if flipped (images), keep stable
        if (wrap.classList.contains("is-flipped")) return;

        lastX = e.clientX;
        lastY = e.clientY;

        if (!raf) {
          card.classList.add("is-tilting");
          raf = requestAnimationFrame(applyTiltFrame);
        }
      }

      function resetTilt() {
        if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
        rect = null;
        card.classList.remove("is-tilting");
        card.style.transform = `rotateX(0deg) rotateY(0deg) translateZ(0.01px)`;
      }

      // Desktop hover: tilt + preview play on hover (videos only)
      if (HOVER_CAPABLE && !REDUCED_MOTION) {
        wrap.addEventListener("pointerenter", () => {
          rect = card.getBoundingClientRect();

          if (!it.isVideo) return;
          const v = card.querySelector("video.wm-media");
          if (!v) return;

          wrap.classList.add("is-playing");
          ensureVideoSrc(v);

          try { v.currentTime = 0; } catch (_) {}
          playWithFallback(v).catch(() => {});
        });

        wrap.addEventListener("pointermove", onMove, { passive: true });

        wrap.addEventListener("pointerleave", () => {
          resetTilt();
          wrap.classList.remove("is-playing");

          if (it.isVideo) {
            const v = card.querySelector("video.wm-media");
            if (v) {
              try { v.pause(); } catch (_) {}
              try { v.currentTime = 0; } catch (_) {}
            }
          }
        });
      } else {
        // No hover devices: keep tilt off
        resetTilt();
      }

      // Mobile tap behaviour: tap toggles play/pause (videos only)
      if (!HOVER_CAPABLE && it.isVideo) {
        let downX = 0, downY = 0, downT = 0;
        let pointerId = null;

        wrap.addEventListener("pointerdown", (e) => {
          if (e.pointerType !== "touch") return;
          pointerId = e.pointerId;
          downX = e.clientX;
          downY = e.clientY;
          downT = Date.now();
        });

        wrap.addEventListener("pointerup", async (e) => {
          if (e.pointerType !== "touch") return;
          if (pointerId !== e.pointerId) return;

          const dx = Math.abs(e.clientX - downX);
          const dy = Math.abs(e.clientY - downY);
          const dtap = Date.now() - downT;

          // ✅ treat as TAP only if tiny movement (prevents scroll-trigger play)
          const isTap = dx < 10 && dy < 10 && dtap < 450;
          if (!isTap) return;

          const v = card.querySelector("video.wm-media");
          if (!v) return;

          // Toggle
          if (v.paused) {
            pauseAllExcept(v);
            wrap.classList.add("is-playing");
            ensureVideoSrc(v);
            await playWithFallback(v);
          } else {
            try { v.pause(); } catch (_) {}
            wrap.classList.remove("is-playing");
          }
        });

        wrap.addEventListener("pointercancel", (e) => {
          if (e.pointerType !== "touch") return;
          pointerId = null;
        });
      }

      return wrap;
    }

    function render() {
      grid.innerHTML = "";
      setStatus("");

      const slice = items.slice(0, shown);
      slice.forEach((it) => grid.appendChild(createCard(it)));

      moreBtn.style.display = items.length > shown ? "inline-block" : "none";
    }

    moreBtn.addEventListener("click", () => {
      shown = Math.min(items.length, shown + step);
      render();
    });

    async function load() {
      setStatus(locale === "it" ? "Caricamento…" : "Loading…", true);

      try {
        const url = new URL(apiUrl);
        url.searchParams.set("company", company);
        url.searchParams.set("limit", String(limit));

        const headers = {};
        if (anonKey) headers["Authorization"] = `Bearer ${anonKey}`;

        const res = await fetch(url.toString(), {
          method: "GET",
          headers,
          cache: "no-store",
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        const rawItems = Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : [];
        items = rawItems.map(normalizeItem).filter((x) => !!x.url);

        shown = Math.min(initial, items.length);

        if (!items.length) {
          setStatus(locale === "it" ? "Nessun media disponibile." : "No media available.", true);
          moreBtn.style.display = "none";
          grid.innerHTML = "";
          return;
        }

        setStatus("", false);
        render();
      } catch (err) {
        console.error("Welo media widget error:", err);
        setStatus(locale === "it" ? "Errore nel caricamento dei media." : "Error loading media.", true);
      }
    }

    load();
  }

  function init() {
    const nodes = [
      ...document.querySelectorAll(".welo-media-widget"),
      ...document.querySelectorAll("[data-welo-media]"),
    ];
    const unique = Array.from(new Set(nodes));
    unique.forEach(buildWidget);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
