/* =========================================================
   WELO • MEDIA REVIEWS WIDGET
   - Same-size cards (image + video)
   - 3D tilt on hover
   - Video plays on hover (no fullscreen, no controls)
   - Mute toggle top-right (videos only)
   - Caption (name + date) hidden ONLY on hover
   - White background fixed (no "grey clipping")
   - Show more / Mostra di più
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

    if (raw === "it" || raw === "ita" || raw === "italy" || raw === "it-it" || raw === "it") return "it";
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
.wm-root { 
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; 
  width: 100%;
  background: #fff;
  color: #0a0a0a;
  overflow: visible;
}
.wm-wrap {
  width: min(1200px, 100%);
  margin: 0 auto;
  padding: 0 16px 26px 16px;
  background: #fff;
  overflow: visible;
}

.wm-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 6px 0 46px 0; /* ✅ (2) più spazio tra subtitle e cards */
  background: #fff;
}
.wm-hgroup { min-width: 0; }
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
  color: #6b7280;
}

.wm-cta {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  border-radius: 999px;
  border: 1px solid rgba(10,10,10,.12);
  background: #0a0a0a;
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  line-height: 1;
  white-space: nowrap;
  transition: transform .15s ease, box-shadow .15s ease, opacity .15s ease;
  box-shadow: 0 10px 30px rgba(0,0,0,.10);
}
.wm-cta:hover { transform: translateY(-1px); box-shadow: 0 16px 40px rgba(0,0,0,.16); }
.wm-cta:active { transform: translateY(0px) scale(.98); opacity: .95; }
.wm-cta svg { width: 16px; height: 16px; }

.wm-gridWrap {
  background: #fff;
  overflow: visible;
}

.wm-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  background: #fff;
  overflow: visible;
}

/* ✅ Mobile optimized */
@media (max-width: 980px) {
  .wm-title { font-size: 32px; }
  .wm-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 420px) {
  .wm-title { font-size: 28px; }
  .wm-grid { grid-template-columns: repeat(1, minmax(0, 1fr)); }
  .wm-cta { width: 100%; justify-content: center; }
}

/* Card wrapper gives perspective */
.wm-cardWrap {
  perspective: 900px;
  background: #fff;
  border-radius: 24px;
  overflow: visible;
}

/* Card itself */
.wm-card {
  position: relative;
  width: 100%;
  aspect-ratio: 5 / 8;         /* ✅ (1) leggermente meno alta (prima 3/5) */
  border-radius: 24px;
  overflow: hidden;
  background: #fff;
  transform-style: preserve-3d;
  transform: perspective(900px) rotateX(0deg) rotateY(0deg);
  transition: transform 120ms ease, box-shadow 160ms ease, filter 160ms ease;
  will-change: transform, box-shadow;
}

/* ✅ (4) shadow hover più visibile */
.wm-cardWrap:hover .wm-card {
  box-shadow: 0 24px 70px rgba(0,0,0,.22);
}

/* Media (img/video) */
.wm-media {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  user-select: none;
  -webkit-user-drag: none;
  pointer-events: none;
}

/* Soft gradient bottom for caption */
.wm-grad {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,.78) 0%, rgba(0,0,0,.22) 35%, rgba(0,0,0,0) 60%);
  pointer-events: none;
  transition: opacity .18s ease; /* ✅ (5) fade out */
}

/* ✅ (5) su hover sparisce anche il gradiente scuro */
.wm-cardWrap:hover .wm-grad {
  opacity: 0;
}

/* Caption (name + date) — hidden ONLY on hover */
.wm-caption {
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 18px;
  color: #fff;
  z-index: 4;
  transition: opacity .18s ease, transform .18s ease;
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
  color: rgba(255,255,255,.86);
}

/* ✅ hide caption on hover */
.wm-cardWrap:hover .wm-caption {
  opacity: 0;
  transform: translateY(8px);
}

/* Play icon (videos only) */
.wm-play {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  z-index: 3;
  pointer-events: none;
  transition: opacity .15s ease, transform .15s ease;
}
.wm-cardWrap:hover .wm-play {
  opacity: .0;
  transform: scale(.98);
}
.wm-playIcon {
  width: 84px;
  height: 84px;
  filter: drop-shadow(0 10px 25px rgba(0,0,0,.25));
}

/* Mute toggle top-right (videos only) */
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
  border: 1px solid rgba(255,255,255,.22);
  background: rgba(0,0,0,.45);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  cursor: pointer;
  opacity: 0;
  transform: translateY(-4px);
  transition: opacity .16s ease, transform .16s ease;
}
.wm-cardWrap:hover .wm-audio { opacity: 1; transform: translateY(0); }
.wm-audio svg { width: 20px; height: 20px; fill: #fff; }
.wm-audio:active { transform: translateY(0) scale(.96); }

/* Loading / empty */
.wm-status {
  padding: 18px 0 6px 0;
  color: #6b7280;
  font-size: 14px;
}

.wm-moreBtn {
  margin: 18px auto 0 auto;
  display: none;
  padding: 12px 18px;
  border-radius: 12px;
  border: 1px solid rgba(10,10,10,.12);
  background: #fff;
  color: #0a0a0a;
  font-weight: 600;
  cursor: pointer;
  transition: transform .14s ease, box-shadow .14s ease;
}
.wm-moreBtn:hover { transform: translateY(-1px); box-shadow: 0 12px 30px rgba(0,0,0,.10); }
.wm-moreBtn:active { transform: translateY(0) scale(.98); }

/* Reduce motion */
@media (prefers-reduced-motion: reduce) {
  .wm-card { transition: box-shadow 160ms ease; transform: none !important; }
  .wm-cardWrap:hover .wm-card { transform: none !important; }
}
@media (hover: none) {
  .wm-card { transform: none !important; }
  .wm-cardWrap:hover .wm-play { opacity: 1; }
  .wm-audio { opacity: 1; transform: none; }
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

    const anonKey = el.getAttribute("data-anon-key") || "";

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

    // Global mute preference
    let muted = true;
    try {
      const saved = localStorage.getItem("welo_media_muted");
      if (saved !== null) muted = saved === "true";
    } catch (_) {}

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

      const isVideo =
        item.type === "video" ||
        item.media_type === "video" ||
        isVideoUrl(url);

      return {
        url,
        name: safeStr(name, t.anonymous),
        date: created,
        isVideo,
      };
    }

    function setStatus(msg, show = true) {
      status.style.display = show ? "block" : "none";
      status.textContent = msg || "";
    }

    function createCard(it) {
      const wrap = document.createElement("div");
      wrap.className = "wm-cardWrap";

      const card = document.createElement("div");
      card.className = "wm-card";

      let mediaEl;
      if (it.isVideo) {
        const v = document.createElement("video");
        v.className = "wm-media";
        v.src = it.url;
        v.muted = muted;
        v.loop = true;
        v.playsInline = true;
        v.preload = "metadata";
        v.setAttribute("webkit-playsinline", "true");
        v.setAttribute("playsinline", "true");
        v.disablePictureInPicture = true;
        v.controls = false;
        v.crossOrigin = "anonymous";
        mediaEl = v;
      } else {
        const img = document.createElement("img");
        img.className = "wm-media";
        img.src = it.url;
        img.alt = it.name;
        img.loading = "lazy";
        img.decoding = "async";
        mediaEl = img;
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
          try { localStorage.setItem("welo_media_muted", String(muted)); } catch (_) {}

          grid.querySelectorAll("video.wm-media").forEach((vid) => {
            vid.muted = muted;
            if (!muted) {
              vid.volume = 1;
              vid.play().catch(() => {});
            }
          });

          audioBtn.setAttribute("aria-label", muted ? t.muted : t.unmuted);
          audioBtn.innerHTML = muted ? iconMuted() : iconUnmuted();
        });
      }

      card.appendChild(mediaEl);
      card.appendChild(grad);
      if (play) card.appendChild(play);
      if (audioBtn) card.appendChild(audioBtn);
      card.appendChild(caption);

      wrap.appendChild(card);

      // ===== Hover behaviour: 3D tilt + video play =====
      const maxTilt = 3; // ✅ (3) tilt ridotto (prima 4)

      function resetTilt() {
        card.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg)`;
      }

      function onMove(e) {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;

        const ry = clamp((x - 0.5) * (maxTilt * 2), -maxTilt, maxTilt);
        const rx = clamp((0.5 - y) * (maxTilt * 2), -maxTilt, maxTilt);

        card.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      }

      wrap.addEventListener("pointermove", (e) => {
        if (window.matchMedia("(hover: none)").matches) return;
        onMove(e);
      });

      wrap.addEventListener("pointerleave", () => {
        resetTilt();
        if (it.isVideo) {
          const v = card.querySelector("video.wm-media");
          if (v) {
            v.pause();
            try { v.currentTime = 0; } catch (_) {}
          }
        }
      });

      wrap.addEventListener("pointerenter", () => {
        if (it.isVideo) {
          const v = card.querySelector("video.wm-media");
          if (!v) return;
          v.muted = muted;

          try { v.currentTime = 0; } catch (_) {}
          v.play().catch(() => {});
        }
      });

      // Mobile: tap to play/pause
      wrap.addEventListener("click", () => {
        if (!it.isVideo) return;
        const v = card.querySelector("video.wm-media");
        if (!v) return;

        if (v.paused) {
          v.muted = muted;
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      });

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
      setStatus("", false);
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
