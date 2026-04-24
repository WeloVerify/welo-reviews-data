(() => {
  const STYLE_ID = "welo-media-widget-styles";
  const FONT_ID = "welo-media-widget-font";

  const DEFAULT_PROJECT_URL = "https://ufqvcojyfsnscuddadnw.supabase.co";
  const DEFAULT_FUNCTION_PATH = "/functions/v1/welo-media-reviews";
  const DEFAULT_BUCKET_PUBLIC_PATH = "/storage/v1/object/public/reviews-proof/";
  const DEFAULT_WELO_PAGE_BASE = "https://www.welobadge.com/welo-page/";

  const MUX_VIDEO_SCRIPT = "https://cdn.jsdelivr.net/npm/@mux/mux-video";

  const I18N = {
    it: {
      title: "Video recensioni",
      subtitle: "Guarda cosa dicono i nostri clienti",
      more: "Mostra di più",
      viewMore: "Vedi altre recensioni",
      muted: "Audio disattivato",
      unmuted: "Audio attivo",
      anonymous: "Cliente",
      loading: "Caricamento…",
      noMedia: "Nessun media disponibile.",
      error: "Errore nel caricamento dei media.",
      missingCompany: "Manca data-welo, aggiungi il nome azienda.",
      timeAgo: (n, unit) => `${n} ${unit} fa`,
    },
    en: {
      title: "Video reviews",
      subtitle: "See what our customers say",
      more: "Show more",
      viewMore: "View more reviews",
      muted: "Muted",
      unmuted: "Sound on",
      anonymous: "Customer",
      loading: "Loading…",
      noMedia: "No media available.",
      error: "Error loading media.",
      missingCompany: "Missing data-welo, add the company name.",
      timeAgo: (n, unit) => `${n} ${unit} ago`,
    },
  };

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  function createSlug(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9\s_-]/g, "")
      .replace(/[_\s]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function normalizeCompany(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function getItemCompany(item) {
    return (
      item.azienda ||
      item.company ||
      item.company_name ||
      item.companyName ||
      item.business ||
      item.business_name ||
      item.businessName ||
      item.slug ||
      item.company_slug ||
      item.companySlug ||
      ""
    );
  }

  function matchesExactCompany(item, company) {
    const targetName = normalizeCompany(company);
    const targetSlug = createSlug(company);

    const itemCompany = getItemCompany(item);
    const itemName = normalizeCompany(itemCompany);
    const itemSlug = createSlug(itemCompany);

    return itemName === targetName || itemSlug === targetSlug;
  }

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

    if (
      raw === "us" ||
      raw === "en" ||
      raw === "eng" ||
      raw === "en-us" ||
      raw === "uk" ||
      raw === "en-gb"
    ) {
      return "en";
    }

    const nav = (navigator.language || "en").toLowerCase();
    return nav.startsWith("it") ? "it" : "en";
  }

  function pickTheme(el) {
    const raw = (el.getAttribute("data-theme") || "auto").toLowerCase().trim();

    if (raw === "light" || raw === "white") return "light";
    if (raw === "dark" || raw === "black") return "dark";

    if (raw === "auto") {
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      return prefersDark ? "dark" : "light";
    }

    return "light";
  }

  function ensureFont() {
    if (document.getElementById(FONT_ID)) return;

    const link = document.createElement("link");
    link.id = FONT_ID;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap";

    document.head.appendChild(link);
  }

  function loadMuxVideoOnce() {
    return new Promise(function (resolve, reject) {
      if (window.customElements && customElements.get("mux-video")) {
        resolve();
        return;
      }

      const existing = document.querySelector('script[src*="@mux/mux-video"]');

      if (existing) {
        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", reject, { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = MUX_VIDEO_SCRIPT;
      script.defer = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function ensureStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const css = `
.wm-root,
.wm-root * {
  box-sizing: border-box;
}

.wm-root {
  --wm-bg: #ffffff;
  --wm-fg: #0a0a0a;
  --wm-muted: #6b7280;
  --wm-border: rgba(10, 10, 10, 0.12);
  --wm-card: #ffffff;
  --wm-card-border: rgba(10, 10, 10, 0.10);
  --wm-shadow: rgba(0, 0, 0, 0.10);

  --wm-cta-bg: #0a0a0a;
  --wm-cta-fg: #ffffff;
  --wm-cta-border: rgba(10, 10, 10, 0.12);

  --wm-more-bg: #ffffff;
  --wm-more-fg: #0a0a0a;
  --wm-more-border: rgba(10, 10, 10, 0.12);

  --wm-ph-a: #f3f4f6;
  --wm-ph-b: #e5e7eb;

  width: 100%;
  background: var(--wm-bg);
  color: var(--wm-fg);
  overflow: visible;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
}

.wm-root[data-theme="dark"] {
  --wm-bg: #0a0a0a;
  --wm-fg: #ffffff;
  --wm-muted: rgba(255, 255, 255, 0.72);
  --wm-border: rgba(255, 255, 255, 0.14);
  --wm-card: #0a0a0a;
  --wm-card-border: rgba(255, 255, 255, 0.12);
  --wm-shadow: rgba(0, 0, 0, 0.35);

  --wm-cta-bg: #ffffff;
  --wm-cta-fg: #0a0a0a;
  --wm-cta-border: rgba(255, 255, 255, 0.18);

  --wm-more-bg: rgba(255, 255, 255, 0.06);
  --wm-more-fg: #ffffff;
  --wm-more-border: rgba(255, 255, 255, 0.16);

  --wm-ph-a: rgba(255, 255, 255, 0.10);
  --wm-ph-b: rgba(255, 255, 255, 0.06);
}

.wm-wrap {
  width: min(1200px, 100%);
  margin: 0 auto;
  padding: 0 16px 18px 16px;
  background: var(--wm-bg);
  overflow: visible;
  isolation: isolate;
}

.wm-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 6px 0 40px 0;
  background: var(--wm-bg);
  flex-wrap: wrap;
}

.wm-hgroup {
  min-width: 0;
}

.wm-title {
  font-size: 30px;
  line-height: 1.05;
  font-weight: 600;
  letter-spacing: -0.03em;
  margin: 0;
}

.wm-subtitle {
  margin-top: 10px;
  font-size: 18px;
  line-height: 1.35;
  font-weight: 500;
  color: var(--wm-muted);
}

.wm-cta {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 18px;
  border-radius: 999px;
  border: 1px solid var(--wm-cta-border);
  background: var(--wm-cta-bg);
  color: var(--wm-cta-fg);
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  line-height: 1;
  white-space: nowrap;
  transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;
  box-shadow: 0 10px 30px var(--wm-shadow);
  max-width: 100%;
}

.wm-cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 16px 40px var(--wm-shadow);
}

.wm-cta:active {
  transform: translateY(0) scale(0.98);
  opacity: 0.95;
}

.wm-cta svg {
  width: 16px;
  height: 16px;
}

.wm-gridWrap {
  background: var(--wm-bg);
  overflow: visible;
}

.wm-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  background: var(--wm-bg);
  overflow: visible;
}

@media (max-width: 980px) {
  .wm-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .wm-header {
    flex-direction: column;
    align-items: stretch;
    padding-bottom: 34px;
  }

  .wm-title {
    font-size: 30px;
  }

  .wm-subtitle {
    font-size: 18px;
  }

  .wm-cta {
    width: 100%;
  }
}

@media (max-width: 520px) {
  .wm-grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  .wm-title {
    font-size: 28px;
  }
}

.wm-cardWrap {
  perspective: 900px;
  background: var(--wm-bg);
  border-radius: 18px;
  overflow: visible;
  touch-action: pan-y;
}

.wm-card {
  position: relative;
  width: 100%;
  aspect-ratio: 10 / 16;
  border-radius: 24px;
  overflow: hidden;
  background: var(--wm-card);
  border: 1px solid var(--wm-card-border);
  transform-style: preserve-3d;
  transform: perspective(900px) rotateX(0deg) rotateY(0deg);
  transition: transform 120ms ease, box-shadow 160ms ease, filter 160ms ease;
  will-change: transform, box-shadow;
}

.wm-media,
mux-video.wm-media {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  user-select: none;
  -webkit-user-drag: none;
  pointer-events: none;
  background: #000;
}

mux-video.wm-media::part(video) {
  object-fit: cover;
}

.wm-media-fallback {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  background: #000;
}

.wm-ph {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, var(--wm-ph-a) 0%, var(--wm-ph-b) 100%);
  opacity: 0;
  transition: opacity 0.18s ease;
}

.wm-cardWrap.is-video .wm-ph {
  opacity: 1;
}

.wm-cardWrap.is-ready .wm-ph {
  opacity: 0;
}

.wm-grad {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.76) 0%, rgba(0, 0, 0, 0.20) 38%, rgba(0, 0, 0, 0) 62%);
  pointer-events: none;
  opacity: 1;
  transition: opacity 0.18s ease;
}

.wm-caption {
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 18px;
  color: #fff;
  z-index: 4;
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.wm-name {
  font-size: 18px;
  line-height: 1.15;
  font-weight: 500;
  letter-spacing: -0.01em;
  margin: 0;
}

.wm-date {
  margin-top: 8px;
  font-size: 15px;
  line-height: 1.2;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.86);
}

.wm-play {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  z-index: 3;
  pointer-events: none;
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.wm-playIcon {
  width: 84px;
  height: 84px;
  filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.25));
}

.wm-audio {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 5;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  cursor: pointer;
  opacity: 0;
  transform: translateY(-4px);
  transition: opacity 0.16s ease, transform 0.16s ease;
}

.wm-audio svg {
  width: 20px;
  height: 20px;
  fill: #fff;
}

.wm-audio:active {
  transform: translateY(0) scale(0.96);
}

@media (hover: hover) and (pointer: fine) {
  .wm-cardWrap:hover .wm-card {
    box-shadow: 0 22px 60px rgba(0, 0, 0, 0.22);
  }

  .wm-cardWrap:hover .wm-caption {
    opacity: 0;
    transform: translateY(8px);
  }

  .wm-cardWrap:hover .wm-grad {
    opacity: 0;
  }

  .wm-cardWrap:hover .wm-play {
    opacity: 0;
    transform: scale(0.98);
  }

  .wm-cardWrap:hover .wm-audio {
    opacity: 1;
    transform: translateY(0);
  }
}

.wm-cardWrap.is-playing .wm-caption {
  opacity: 0;
  transform: translateY(8px);
}

.wm-cardWrap.is-playing .wm-grad {
  opacity: 0;
}

.wm-cardWrap.is-playing .wm-play {
  opacity: 0;
  transform: scale(0.98);
}

.wm-cardWrap.is-playing .wm-audio {
  opacity: 1;
  transform: translateY(0);
}

.wm-cardWrap.is-playing .wm-card {
  box-shadow: 0 22px 60px rgba(0, 0, 0, 0.22);
}

.wm-status {
  padding: 18px 0 6px 0;
  color: var(--wm-muted);
  font-size: 14px;
}

.wm-moreBtn {
  margin: 18px auto 0 auto;
  display: none;
  padding: 12px 18px;
  border-radius: 12px;
  border: 1px solid var(--wm-more-border);
  background: var(--wm-more-bg);
  color: var(--wm-more-fg);
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.14s ease, box-shadow 0.14s ease;
}

.wm-moreBtn:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.10);
}

.wm-moreBtn:active {
  transform: translateY(0) scale(0.98);
}

@media (prefers-reduced-motion: reduce) {
  .wm-card {
    transition: box-shadow 160ms ease;
    transform: none !important;
  }
}
    `;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = css;
    document.head.appendChild(style);
  }

  function isVideoUrl(url = "") {
    const u = String(url || "").toLowerCase().split("?")[0];

    return (
      u.endsWith(".mp4") ||
      u.endsWith(".webm") ||
      u.endsWith(".mov") ||
      u.endsWith(".m4v") ||
      u.endsWith(".ogg") ||
      u.endsWith(".m3u8")
    );
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

    if (years >= 1) {
      return t.timeAgo(
        years,
        locale === "it" ? (years === 1 ? "anno" : "anni") : years === 1 ? "year" : "years"
      );
    }

    if (months >= 1) {
      return t.timeAgo(
        months,
        locale === "it" ? (months === 1 ? "mese" : "mesi") : months === 1 ? "month" : "months"
      );
    }

    if (days >= 1) {
      return t.timeAgo(
        days,
        locale === "it" ? (days === 1 ? "giorno" : "giorni") : days === 1 ? "day" : "days"
      );
    }

    if (hours >= 1) {
      return t.timeAgo(
        hours,
        locale === "it" ? (hours === 1 ? "ora" : "ore") : hours === 1 ? "hour" : "hours"
      );
    }

    if (minutes >= 1) {
      return t.timeAgo(
        minutes,
        locale === "it" ? (minutes === 1 ? "minuto" : "minuti") : minutes === 1 ? "minute" : "minutes"
      );
    }

    return locale === "it" ? "poco fa" : "just now";
  }

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

  function getMuxPlaybackId(item) {
    return (
      item.playback_id ||
      item.playbackId ||
      item.mux_playback_id ||
      item.muxPlaybackId ||
      ""
    );
  }

  function isMuxItem(item) {
    const provider = String(item.provider || item.video_provider || "").toLowerCase();
    const muxStatus = String(item.mux_status || item.status_mux || "").toLowerCase();

    return (
      provider === "mux" ||
      !!getMuxPlaybackId(item) ||
      muxStatus === "ready"
    );
  }

  function buildMuxUrl(playbackId) {
    return playbackId ? `https://stream.mux.com/${playbackId}.m3u8` : "";
  }

  function buildMuxThumbnail(playbackId) {
    return playbackId ? `https://image.mux.com/${playbackId}/thumbnail.jpg` : "";
  }

  function buildWidget(el) {
    ensureFont();
    ensureStyles();

    const locale = pickLocale(el);
    const t = I18N[locale] || I18N.en;

    const company = safeStr(
      el.getAttribute("data-welo") ||
        el.getAttribute("data-company") ||
        el.getAttribute("data-slug") ||
        ""
    );

    if (!company) {
      el.innerHTML = `
        <div class="wm-root">
          <div class="wm-wrap">
            <div class="wm-status">${t.missingCompany}</div>
          </div>
        </div>
      `;
      return;
    }

    const companySlug = createSlug(company);
    const theme = pickTheme(el);

    const projectUrl = el.getAttribute("data-project-url") || DEFAULT_PROJECT_URL;
    const apiUrl = el.getAttribute("data-api") || `${projectUrl}${DEFAULT_FUNCTION_PATH}`;
    const storageBase =
      el.getAttribute("data-storage-base") || `${projectUrl}${DEFAULT_BUCKET_PUBLIC_PATH}`;

    const limit = parseInt(el.getAttribute("data-limit") || "24", 10);
    const initial = parseInt(el.getAttribute("data-initial") || "8", 10);
    const step = parseInt(el.getAttribute("data-step") || String(initial), 10);

    const weloPageUrl =
      el.getAttribute("data-url") || `${DEFAULT_WELO_PAGE_BASE}${companySlug}`;

    const only = (el.getAttribute("data-only") || "media").toLowerCase().trim();
    const anonKey = el.getAttribute("data-anon-key") || "";

    const HOVER_CAPABLE =
      window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const REDUCED_MOTION =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    try {
      el.style.background = "transparent";
    } catch (_) {}

    el.innerHTML = `
<div class="wm-root" data-theme="${theme}">
  <div class="wm-wrap">
    <div class="wm-header">
      <div class="wm-hgroup">
        <div class="wm-title">${t.title}</div>
        <div class="wm-subtitle">${t.subtitle}</div>
      </div>

      <a class="wm-cta" href="${weloPageUrl}" target="_blank" rel="noopener">
        ${t.viewMore}
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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

    let muted = true;

    try {
      const saved = localStorage.getItem("welo_media_muted");
      if (saved === "false") muted = false;
    } catch (_) {}

    let items = [];
    let shown = 0;

    function normalizeStoragePath(path) {
      if (!path) return "";
      if (path.startsWith("http://") || path.startsWith("https://")) return path;

      const cleaned = String(path).replace(/^\/+/, "");
      const encoded = cleaned
        .split("/")
        .map((seg) => encodeURIComponent(seg))
        .join("/");

      return `${storageBase}${encoded}`;
    }

    function normalizeItem(item) {
      const playbackId = getMuxPlaybackId(item);
      const provider = isMuxItem(item) && playbackId ? "mux" : "supabase";

      const rawUrl =
        item.url ||
        item.mediaUrl ||
        item.media_url ||
        item.public_url ||
        item.proof_url ||
        item.prove_di_acquisto_url ||
        item.mux_playback_url ||
        item.playback_url ||
        "";

      const proofPath =
        item.prove_di_acquisto ||
        item.proof_path ||
        item.path ||
        "";

      const muxUrl = playbackId ? buildMuxUrl(playbackId) : "";
      const url = provider === "mux"
        ? (rawUrl || muxUrl)
        : (rawUrl || normalizeStoragePath(proofPath));

      const thumbnail =
        item.thumbnail ||
        item.thumbnail_url ||
        item.mux_thumbnail_url ||
        item.poster ||
        item.poster_url ||
        (playbackId ? buildMuxThumbnail(playbackId) : "");

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

      const isVideo =
        provider === "mux" ||
        item.type === "video" ||
        item.media_type === "video" ||
        isVideoUrl(url);

      return {
        url,
        thumbnail,
        playbackId,
        provider,
        name: safeStr(name, t.anonymous),
        date: created,
        isVideo,
        company: getItemCompany(item),
      };
    }

    function setStatus(msg, show = true) {
      status.style.display = show ? "block" : "none";
      status.textContent = msg || "";
    }

    function pauseMedia(mediaEl) {
      if (!mediaEl) return;

      try {
        mediaEl.pause();
      } catch (_) {}

      try {
        mediaEl.currentTime = 0;
      } catch (_) {}
    }

    function pauseAllExcept(exceptMedia) {
      grid.querySelectorAll("video.wm-media, mux-video.wm-media").forEach((media) => {
        if (media === exceptMedia) return;

        pauseMedia(media);

        const wrap = media.closest(".wm-cardWrap");
        if (wrap) wrap.classList.remove("is-playing");
      });
    }

    const videoObserver =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries, obs) => {
              entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const v = entry.target;

                if (v && v.dataset && v.dataset.src && !v.src) {
                  v.src = v.dataset.src;
                  v.preload = "metadata";

                  try {
                    v.load();
                  } catch (_) {}
                }

                obs.unobserve(v);
              });
            },
            { rootMargin: "900px 0px", threshold: 0.01 }
          )
        : null;

    function ensureVideoSrc(videoEl) {
      if (!videoEl) return;

      if (videoEl.tagName && videoEl.tagName.toLowerCase() === "mux-video") {
        return;
      }

      if (!videoEl.src && videoEl.dataset && videoEl.dataset.src) {
        videoEl.src = videoEl.dataset.src;
        videoEl.preload = "metadata";

        try {
          videoEl.load();
        } catch (_) {}
      }
    }

    async function playWithFallback(mediaEl) {
      if (!mediaEl) return;

      ensureVideoSrc(mediaEl);
      mediaEl.muted = muted;

      const tryPlay = async () => {
        try {
          await mediaEl.play();
          return true;
        } catch (e) {
          if (!mediaEl.muted) {
            mediaEl.muted = true;

            try {
              await mediaEl.play();
              return true;
            } catch (_) {}
          }

          return false;
        }
      };

      const ok = await tryPlay();

      if (ok) return;

      await new Promise((resolve) => {
        let done = false;

        const finish = () => {
          if (done) return;
          done = true;
          resolve();
        };

        const onCanPlay = async () => {
          mediaEl.removeEventListener("canplay", onCanPlay);
          await tryPlay();
          finish();
        };

        mediaEl.addEventListener("canplay", onCanPlay, { once: true });
        setTimeout(finish, 900);
      });
    }

    function createCard(it) {
      const wrap = document.createElement("div");
      wrap.className = "wm-cardWrap";

      if (it.isVideo) wrap.classList.add("is-video");

      const card = document.createElement("div");
      card.className = "wm-card";

      const ph = document.createElement("div");
      ph.className = "wm-ph";

      let mediaEl;

      if (it.isVideo && it.provider === "mux" && it.playbackId) {
        const mv = document.createElement("mux-video");

        mv.className = "wm-media";
        mv.setAttribute("playback-id", it.playbackId);
        mv.setAttribute("stream-type", "on-demand");
        mv.setAttribute("metadata-video-title", "Welo video review");
        mv.setAttribute("playsinline", "");
        mv.setAttribute("webkit-playsinline", "");
        mv.setAttribute("muted", "");
        mv.setAttribute("loop", "");
        mv.setAttribute("preload", "metadata");

        mv.muted = muted;
        mv.loop = true;
        mv.playsInline = true;

        if (it.thumbnail) {
          mv.setAttribute("poster", it.thumbnail);

          const fallbackImg = document.createElement("img");
          fallbackImg.className = "wm-media-fallback";
          fallbackImg.src = it.thumbnail;
          fallbackImg.alt = it.name;
          fallbackImg.loading = "lazy";
          fallbackImg.decoding = "async";
          card.appendChild(fallbackImg);

          mv.addEventListener(
            "loadeddata",
            () => {
              fallbackImg.remove();
              wrap.classList.add("is-ready");
            },
            { once: true }
          );
        } else {
          mv.addEventListener(
            "loadeddata",
            () => {
              wrap.classList.add("is-ready");
            },
            { once: true }
          );
        }

        mediaEl = mv;
      } else if (it.isVideo) {
        const v = document.createElement("video");

        v.className = "wm-media";
        v.dataset.src = it.url;
        v.preload = "none";
        v.muted = muted;
        v.loop = true;
        v.playsInline = true;
        v.setAttribute("webkit-playsinline", "true");
        v.setAttribute("playsinline", "true");
        v.disablePictureInPicture = true;
        v.disableRemotePlayback = true;
        v.controls = false;
        v.controlsList = "nodownload noplaybackrate noremoteplayback";
        v.crossOrigin = "anonymous";

        v.addEventListener(
          "loadeddata",
          () => {
            wrap.classList.add("is-ready");
          },
          { once: true }
        );

        if (videoObserver) {
          videoObserver.observe(v);
        } else {
          v.src = it.url;
          v.preload = "metadata";

          try {
            v.load();
          } catch (_) {}
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

      const grad = document.createElement("div");
      grad.className = "wm-grad";

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

      let play = null;

      if (it.isVideo) {
        play = document.createElement("div");
        play.className = "wm-play";
        play.innerHTML = playSvg();
      }

      let audioBtn = null;

      if (it.isVideo) {
        audioBtn = document.createElement("button");
        audioBtn.type = "button";
        audioBtn.className = "wm-audio";
        audioBtn.setAttribute("aria-label", muted ? t.muted : t.unmuted);
        audioBtn.innerHTML = muted ? iconMuted() : iconUnmuted();

        audioBtn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();

          muted = !muted;

          try {
            localStorage.setItem("welo_media_muted", String(muted));
          } catch (_) {}

          grid.querySelectorAll("video.wm-media, mux-video.wm-media").forEach((vid) => {
            vid.muted = muted;

            if (!muted && !vid.paused) {
              try {
                vid.volume = 1;
              } catch (_) {}

              vid.play().catch(() => {});
            }
          });

          grid.querySelectorAll(".wm-audio").forEach((btn) => {
            btn.setAttribute("aria-label", muted ? t.muted : t.unmuted);
            btn.innerHTML = muted ? iconMuted() : iconUnmuted();
          });
        });
      }

      card.appendChild(mediaEl);
      card.appendChild(ph);
      card.appendChild(grad);

      if (play) card.appendChild(play);
      if (audioBtn) card.appendChild(audioBtn);

      card.appendChild(caption);
      wrap.appendChild(card);

      const MAX_TILT = 3.2;

      function resetTilt() {
        card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
      }

      function onMove(e) {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;

        const ry = clamp((x - 0.5) * (MAX_TILT * 2), -MAX_TILT, MAX_TILT);
        const rx = clamp((0.5 - y) * (MAX_TILT * 2), -MAX_TILT, MAX_TILT);

        card.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      }

      if (HOVER_CAPABLE && !REDUCED_MOTION) {
        wrap.addEventListener("pointermove", (e) => onMove(e));

        wrap.addEventListener("pointerenter", async () => {
          if (!it.isVideo) return;

          const media = card.querySelector("video.wm-media, mux-video.wm-media");
          if (!media) return;

          wrap.classList.add("is-playing");
          ensureVideoSrc(media);

          try {
            media.currentTime = 0;
          } catch (_) {}

          await playWithFallback(media);
        });

        wrap.addEventListener("pointerleave", () => {
          resetTilt();
          wrap.classList.remove("is-playing");

          if (it.isVideo) {
            const media = card.querySelector("video.wm-media, mux-video.wm-media");
            pauseMedia(media);
          }
        });
      } else {
        resetTilt();
      }

      if (!HOVER_CAPABLE && it.isVideo) {
        let downX = 0;
        let downY = 0;
        let downT = 0;
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

          const isTap = dx < 10 && dy < 10 && dtap < 450;

          if (!isTap) return;

          const media = card.querySelector("video.wm-media, mux-video.wm-media");
          if (!media) return;

          if (media.paused) {
            pauseAllExcept(media);
            wrap.classList.add("is-playing");
            ensureVideoSrc(media);
            await playWithFallback(media);
          } else {
            pauseMedia(media);
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
      setStatus("", false);

      const slice = items.slice(0, shown);

      slice.forEach((it) => {
        grid.appendChild(createCard(it));
      });

      moreBtn.style.display = items.length > shown ? "inline-block" : "none";
    }

    moreBtn.addEventListener("click", () => {
      shown = Math.min(items.length, shown + step);
      render();
    });

    async function load() {
      setStatus(t.loading, true);

      try {
        const url = new URL(apiUrl);

        url.searchParams.set("company", company);
        url.searchParams.set("company_slug", companySlug);
        url.searchParams.set("exact", "true");
        url.searchParams.set("limit", String(limit));

        const headers = {};

        if (anonKey) {
          headers.Authorization = `Bearer ${anonKey}`;
          headers.apikey = anonKey;
        }

        const res = await fetch(url.toString(), {
          method: "GET",
          headers,
          cache: "no-store",
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();

        let rawItems = Array.isArray(data?.items)
          ? data.items
          : Array.isArray(data)
            ? data
            : [];

        rawItems = rawItems.filter((item) => matchesExactCompany(item, company));

        rawItems = rawItems
          .map(normalizeItem)
          .filter((x) => !!x.url || !!x.playbackId);

        if (only === "video") {
          rawItems = rawItems.filter((x) => x.isVideo);
        }

        const hasMuxVideos = rawItems.some((x) => x.provider === "mux" && x.playbackId);

        if (hasMuxVideos) {
          try {
            await loadMuxVideoOnce();
          } catch (e) {
            console.warn("Welo media widget: Mux video script failed to load", e);
          }
        }

        items = rawItems;
        shown = Math.min(initial, items.length);

        if (!items.length) {
          setStatus(t.noMedia, true);
          moreBtn.style.display = "none";
          grid.innerHTML = "";
          return;
        }

        setStatus("", false);
        render();
      } catch (err) {
        console.error("Welo media widget error:", err);
        setStatus(t.error, true);
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
