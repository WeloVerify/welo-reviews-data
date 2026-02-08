/*!
 * WELO • Media Reviews Widget (Images + Videos)
 * - Same-size cards (image + video)
 * - Hover: 3D tilt + video autoplay (no fullscreen)
 * - Video: mute toggle top-right + play icon overlay
 * - Caption: only Name + Date
 * - i18n: data-country="IT|US" or data-lang="it|en"
 */

(() => {
  "use strict";

  // =========================
  // CONFIG (override via <script data-*>)
  // =========================
  const DEFAULT_PROJECT_URL = "https://ufqvcojyfsnscuddadnw.supabase.co";
  const DEFAULT_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmcXZjb2p5ZnNuc2N1ZGRhZG53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MTg2NjksImV4cCI6MjA2MzM5NDY2OX0.iYJVmg9PXxOu0R3z62iRzr4am0q8ZSc8THlB2rE2oQM";

  const STYLE_ID = "welo-media-widget-styles-v3";
  const FONT_ID = "welo-inter-font-v1";

  const I18N = {
    it: {
      title: "Video recensioni",
      subtitle: "Guarda cosa dicono i nostri clienti",
      cta: "Vedi altre recensioni",
      showMore: "Mostra di più",
      verifiedCustomer: "Cliente verificato",
    },
    en: {
      title: "Video reviews",
      subtitle: "See what our customers say",
      cta: "View more reviews",
      showMore: "Show more",
      verifiedCustomer: "Verified customer",
    },
  };

  // =========================
  // HELPERS
  // =========================
  const isTouchLike = () =>
    window.matchMedia &&
    (window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(pointer: coarse)").matches);

  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

  const escapeHtml = (s) =>
    String(s ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  function findScriptSelf() {
    // Best effort: currentScript OR last script that includes media-widget.js
    const cs = document.currentScript;
    if (cs && cs.src && cs.src.includes("media-widget.js")) return cs;
    const scripts = Array.from(document.scripts).reverse();
    return (
      scripts.find((s) => (s.src || "").includes("media-widget.js")) || cs || null
    );
  }

  function normalizeLocale(raw) {
    const v = String(raw || "").trim().toLowerCase();
    if (!v) return "it";
    if (v === "it" || v === "ita" || v === "italy") return "it";
    if (v === "en" || v === "us" || v === "uk" || v === "usa" || v === "english")
      return "en";
    return v.startsWith("en") ? "en" : "it";
  }

  function getLocaleFromScript(scriptEl) {
    const lang = scriptEl?.dataset?.lang;
    const country = scriptEl?.dataset?.country;
    const locale = scriptEl?.dataset?.locale;

    // Priority: data-lang > data-locale > data-country
    if (lang) return normalizeLocale(lang);
    if (locale) return normalizeLocale(locale);
    if (country) return normalizeLocale(country);
    return "it";
  }

  function formatRelativeDate(input, locale) {
    if (!input) return "";
    const d = new Date(input);
    if (Number.isNaN(d.getTime())) return "";

    const now = new Date();
    const diffMs = d.getTime() - now.getTime();
    const diffSec = Math.round(diffMs / 1000);

    const rtf = new Intl.RelativeTimeFormat(locale === "it" ? "it-IT" : "en-US", {
      numeric: "auto",
    });

    const abs = Math.abs(diffSec);
    const MIN = 60;
    const H = 60 * MIN;
    const D = 24 * H;
    const W = 7 * D;
    const M = 30 * D;
    const Y = 365 * D;

    if (abs < MIN) return rtf.format(Math.round(diffSec), "second");
    if (abs < H) return rtf.format(Math.round(diffSec / MIN), "minute");
    if (abs < D) return rtf.format(Math.round(diffSec / H), "hour");
    if (abs < W) return rtf.format(Math.round(diffSec / D), "day");
    if (abs < M) return rtf.format(Math.round(diffSec / W), "week");
    if (abs < Y) return rtf.format(Math.round(diffSec / M), "month");
    return rtf.format(Math.round(diffSec / Y), "year");
  }

  function pick(obj, keys) {
    for (const k of keys) {
      if (obj && obj[k] !== undefined && obj[k] !== null && obj[k] !== "")
        return obj[k];
    }
    return null;
  }

  function isVideoByUrl(url) {
    const u = String(url || "").toLowerCase();
    return (
      u.endsWith(".mp4") ||
      u.endsWith(".mov") ||
      u.endsWith(".webm") ||
      u.endsWith(".m4v") ||
      u.includes("video")
    );
  }

  function buildPublicStorageUrl(projectUrl, bucket, path) {
    // path like "Welo/xxx.mp4"
    const cleanPath = String(path || "").replace(/^\/+/, "");
    return `${projectUrl}/storage/v1/object/public/${bucket}/${cleanPath}`;
  }

  function injectInterFontOnce() {
    if (document.getElementById(FONT_ID)) return;

    const link = document.createElement("link");
    link.id = FONT_ID;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap";
    document.head.appendChild(link);
  }

  function injectStylesOnce() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
/* =========================
   WELO • Media Widget (scoped)
   ========================= */
.wm-root{font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif; width:100%}
.wm-wrap{width:100%}
.wm-head{display:flex; align-items:flex-start; justify-content:space-between; gap:16px; margin:0 0 22px}
.wm-hgroup{min-width:0}
.wm-title{margin:0; font-weight:600; letter-spacing:-0.03em; color:#0A0A0A; font-size:clamp(26px,3.2vw,40px); line-height:1.05}
.wm-sub{margin:10px 0 0; font-weight:500; color:#9CA3AF; font-size:clamp(15px,1.6vw,20px); line-height:1.25}
.wm-cta{flex:0 0 auto; display:inline-flex; align-items:center; gap:10px; text-decoration:none;
  background:#0A0A0A; color:#fff; border-radius:999px; padding:14px 18px;
  font-weight:600; font-size:14px; letter-spacing:-0.01em;
  box-shadow:0 10px 30px rgba(0,0,0,.14); border:1px solid rgba(0,0,0,.08);
  transition:transform .18s ease, box-shadow .18s ease, opacity .18s ease;
}
.wm-cta:hover{transform:translateY(-1px); box-shadow:0 14px 40px rgba(0,0,0,.18)}
.wm-cta:active{transform:translateY(0px) scale(.99); opacity:.92}
.wm-cta svg{width:16px; height:16px}

.wm-rail{
  display:flex; gap:22px; overflow-x:auto; overflow-y:hidden; scroll-snap-type:x mandatory;
  padding-bottom:14px; -webkit-overflow-scrolling:touch;
}
.wm-rail::-webkit-scrollbar{height:10px}
.wm-rail::-webkit-scrollbar-thumb{background:rgba(0,0,0,.12); border-radius:999px}
.wm-rail{scrollbar-color:rgba(0,0,0,.14) transparent}

.wm-card{
  position:relative; flex:0 0 auto;
  width:min(82vw, 360px);
  aspect-ratio:3/4;
  border-radius:26px; overflow:hidden;
  background:#0A0A0A;
  scroll-snap-align:start;
  transform:perspective(900px) rotateX(0deg) rotateY(0deg);
  will-change:transform;
  transition:box-shadow .18s ease, transform .18s ease;
  box-shadow:0 18px 50px rgba(0,0,0,.12);
  cursor:pointer;
}
@media (min-width:1024px){
  .wm-card{width:calc((100% - (22px * 3)) / 4)}
}
.wm-card.is-hovered{box-shadow:0 26px 70px rgba(0,0,0,.18)}
.wm-card:focus{outline:none}
.wm-card:focus-visible{outline:3px solid rgba(1,54,255,.25); outline-offset:4px}

.wm-media{
  position:absolute; inset:0; overflow:hidden; border-radius:26px;
}
.wm-media img, .wm-media video{
  width:100%; height:100%;
  object-fit:cover; display:block;
  transform:scale(1.02);
}
.wm-media video{pointer-events:none} /* no fullscreen, no controls interaction */

.wm-gradient{
  position:absolute; inset:0;
  background:linear-gradient(to top, rgba(0,0,0,.76) 0%, rgba(0,0,0,0) 55%);
  pointer-events:none;
}

.wm-caption{
  position:absolute; left:18px; right:18px; bottom:18px;
  color:#fff; z-index:3;
  display:flex; flex-direction:column; gap:4px;
  text-shadow:0 8px 24px rgba(0,0,0,.45);
}
.wm-name{font-size:18px; font-weight:500; line-height:1.15; letter-spacing:-0.02em}
.wm-date{font-size:15px; font-weight:400; opacity:.88; line-height:1.2}

.wm-play{
  position:absolute; left:50%; top:50%;
  transform:translate(-50%,-50%);
  z-index:4;
  width:84px; height:84px;
  display:flex; align-items:center; justify-content:center;
  pointer-events:none;
  filter:drop-shadow(0 18px 40px rgba(0,0,0,.35));
  opacity:1; transition:opacity .18s ease, transform .18s ease;
}
.wm-card.is-playing .wm-play{opacity:0; transform:translate(-50%,-50%) scale(.96)}
.wm-play svg{width:84px; height:84px}

.wm-mute{
  position:absolute; top:14px; right:14px; z-index:6;
  width:44px; height:44px; border-radius:999px;
  background:rgba(10,10,10,.55);
  border:1px solid rgba(255,255,255,.16);
  backdrop-filter:blur(10px);
  display:flex; align-items:center; justify-content:center;
  color:#fff;
  cursor:pointer;
  transition:transform .16s ease, opacity .16s ease, background .16s ease;
}
.wm-mute:hover{transform:scale(1.03)}
.wm-mute:active{transform:scale(.98); opacity:.9}
.wm-mute svg{width:20px; height:20px}

.wm-moreRow{display:flex; justify-content:center; margin-top:18px}
.wm-moreBtn{
  background:#0A0A0A; color:#fff; border:none;
  border-radius:999px; padding:14px 20px;
  font-weight:600; font-size:14px;
  box-shadow:0 16px 45px rgba(0,0,0,.14);
  cursor:pointer;
  transition:transform .18s ease, box-shadow .18s ease, opacity .18s ease;
}
.wm-moreBtn:hover{transform:translateY(-1px); box-shadow:0 22px 60px rgba(0,0,0,.18)}
.wm-moreBtn:active{transform:translateY(0px) scale(.99); opacity:.92}

@media (max-width:520px){
  .wm-cta{padding:12px 14px; font-size:13px}
  .wm-head{margin-bottom:18px}
}
    `;
    document.head.appendChild(style);
  }

  function iconArrowUpRight() {
    return `
<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="M7 17L17 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M10 7h7v7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
  }

  function iconPlayRounded() {
    // Rounded "play" similar to your reference (white rounded triangle)
    return `
<svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
  <path d="M24 18.8c0-3.4 3.7-5.6 6.7-3.8l22 12.7c3 1.7 3 6 0 7.7l-22 12.7c-3 1.8-6.7-.4-6.7-3.8V18.8Z" fill="#FFFFFF"/>
</svg>`;
  }

  function iconVolumeOn() {
    return `
<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="M11 5L6.8 8.5H4.5A1.5 1.5 0 0 0 3 10v4a1.5 1.5 0 0 0 1.5 1.5h2.3L11 19V5Z" fill="currentColor"/>
  <path d="M14.5 9.2a4 4 0 0 1 0 5.6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M16.8 7a7 7 0 0 1 0 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`;
  }

  function iconVolumeOff() {
    return `
<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="M11 5L6.8 8.5H4.5A1.5 1.5 0 0 0 3 10v4a1.5 1.5 0 0 0 1.5 1.5h2.3L11 19V5Z" fill="currentColor"/>
  <path d="M16 9l5 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M21 9l-5 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`;
  }

  // =========================
  // DATA FETCH
  // =========================
  async function fetchMediaItems({
    projectUrl,
    anonKey,
    company,
    limit,
  }) {
    const url = `${projectUrl}/functions/v1/welo-media-reviews?company=${encodeURIComponent(
      company
    )}&limit=${encodeURIComponent(limit)}`;

    const res = await fetch(url, {
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
      },
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(`Fetch failed (${res.status}): ${txt}`);
    }
    const json = await res.json();
    return Array.isArray(json?.items) ? json.items : [];
  }

  function normalizeItem(raw, { projectUrl, bucket, locale, t }) {
    // media can be:
    // - raw.url / raw.media_url / raw.prove_di_acquisto (path) / raw.media (array)
    const mediaMaybe = pick(raw, [
      "media",
      "media_items",
      "assets",
      "files",
    ]);

    let mediaEntry = null;
    if (Array.isArray(mediaMaybe) && mediaMaybe.length) {
      mediaEntry = mediaMaybe[0];
    }

    const mediaUrlRaw =
      (mediaEntry && (mediaEntry.url || mediaEntry.media_url || mediaEntry.path)) ||
      pick(raw, [
        "url",
        "media_url",
        "mediaUrl",
        "proof_url",
        "prove_di_acquisto",
        "path",
        "file",
      ]);

    if (!mediaUrlRaw) return null;

    const fullUrl =
      String(mediaUrlRaw).startsWith("http")
        ? String(mediaUrlRaw)
        : buildPublicStorageUrl(projectUrl, bucket, String(mediaUrlRaw));

    const mediaTypeRaw =
      (mediaEntry && (mediaEntry.type || mediaEntry.media_type)) ||
      pick(raw, ["type", "media_type", "mime_type", "mime"]);

    const isVideo =
      String(mediaTypeRaw || "").toLowerCase().includes("video") ||
      isVideoByUrl(fullUrl);

    const name =
      pick(raw, ["name", "customer_name", "author", "reviewer_name", "full_name"]) ||
      t("verifiedCustomer");

    const dateRaw = pick(raw, [
      "created_at",
      "submitted_at",
      "date",
      "createdAt",
      "submittedAt",
    ]);

    const dateLabel = dateRaw ? formatRelativeDate(dateRaw, locale) : "";

    return {
      url: fullUrl,
      isVideo,
      name,
      dateLabel,
      _raw: raw,
    };
  }

  // =========================
  // UI BUILD
  // =========================
  function buildWidgetShell({ locale, t, pageUrl }) {
    const wrap = document.createElement("div");
    wrap.className = "wm-wrap";

    const head = document.createElement("div");
    head.className = "wm-head";

    const hgroup = document.createElement("div");
    hgroup.className = "wm-hgroup";
    hgroup.innerHTML = `
      <h2 class="wm-title">${escapeHtml(t("title"))}</h2>
      <p class="wm-sub">${escapeHtml(t("subtitle"))}</p>
    `;

    const cta = document.createElement("a");
    cta.className = "wm-cta";
    cta.href = pageUrl;
    cta.target = "_blank";
    cta.rel = "noopener";
    cta.innerHTML = `${escapeHtml(t("cta"))} ${iconArrowUpRight()}`;

    head.appendChild(hgroup);
    head.appendChild(cta);

    const rail = document.createElement("div");
    rail.className = "wm-rail";
    rail.setAttribute("role", "list");

    const moreRow = document.createElement("div");
    moreRow.className = "wm-moreRow";
    const moreBtn = document.createElement("button");
    moreBtn.className = "wm-moreBtn";
    moreBtn.type = "button";
    moreBtn.textContent = t("showMore");
    moreBtn.style.display = "none";
    moreRow.appendChild(moreBtn);

    wrap.appendChild(head);
    wrap.appendChild(rail);
    wrap.appendChild(moreRow);

    return { wrap, rail, moreBtn };
  }

  function buildCard({
    item,
    locale,
    t,
    allowTilt,
    globalVideoMutedState,
  }) {
    const card = document.createElement("div");
    card.className = "wm-card";
    card.tabIndex = 0;

    // media
    const media = document.createElement("div");
    media.className = "wm-media";

    let videoEl = null;

    if (item.isVideo) {
      videoEl = document.createElement("video");
      videoEl.src = item.url;
      videoEl.preload = "metadata";
      videoEl.playsInline = true;
      videoEl.muted = globalVideoMutedState.value; // default muted
      videoEl.loop = true;
      videoEl.controls = false;
      videoEl.setAttribute("playsinline", "");
      videoEl.setAttribute("webkit-playsinline", "");
      videoEl.setAttribute("disablepictureinpicture", "");
      videoEl.setAttribute("controlslist", "nodownload noplaybackrate noremoteplayback");
      media.appendChild(videoEl);
    } else {
      const img = document.createElement("img");
      img.src = item.url;
      img.loading = "lazy";
      img.alt = "";
      media.appendChild(img);
    }

    const gradient = document.createElement("div");
    gradient.className = "wm-gradient";

    const caption = document.createElement("div");
    caption.className = "wm-caption";
    caption.innerHTML = `
      <div class="wm-name">${escapeHtml(item.name)}</div>
      <div class="wm-date">${escapeHtml(item.dateLabel || "")}</div>
    `;

    // play icon overlay (only for videos)
    const play = document.createElement("div");
    play.className = "wm-play";
    play.innerHTML = iconPlayRounded();
    play.style.display = item.isVideo ? "flex" : "none";

    // mute toggle (only for videos)
    const muteBtn = document.createElement("button");
    muteBtn.type = "button";
    muteBtn.className = "wm-mute";
    muteBtn.style.display = item.isVideo ? "flex" : "none";
    muteBtn.innerHTML = globalVideoMutedState.value ? iconVolumeOff() : iconVolumeOn();
    muteBtn.setAttribute("aria-label", "Toggle sound");

    // compose
    card.appendChild(media);
    card.appendChild(gradient);
    card.appendChild(play);
    card.appendChild(muteBtn);
    card.appendChild(caption);

    // Prevent any default "open" behaviors
    card.addEventListener("click", (e) => {
      // On touch devices: tap toggles play/pause for videos
      if (!item.isVideo || !videoEl) return;
      if (!isTouchLike()) return;

      e.preventDefault();
      e.stopPropagation();

      if (videoEl.paused) {
        safePlay(videoEl, card);
      } else {
        safeStop(videoEl, card);
      }
    });

    // Mute toggle
    muteBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (!videoEl) return;

      globalVideoMutedState.value = !globalVideoMutedState.value;
      videoEl.muted = globalVideoMutedState.value;
      muteBtn.innerHTML = globalVideoMutedState.value ? iconVolumeOff() : iconVolumeOn();

      // If user unmutes, try to keep playback working
      if (!videoEl.paused) {
        try {
          await videoEl.play();
        } catch {
          // If autoplay w/ sound is blocked, fallback to muted
          globalVideoMutedState.value = true;
          videoEl.muted = true;
          muteBtn.innerHTML = iconVolumeOff();
        }
      }
    });

    // Hover play for desktop
    if (item.isVideo && videoEl) {
      const onEnter = () => {
        if (isTouchLike()) return;
        safePlay(videoEl, card);
      };
      const onLeave = () => {
        if (isTouchLike()) return;
        safeStop(videoEl, card);
      };

      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);
      card.addEventListener("focus", onEnter);
      card.addEventListener("blur", onLeave);
    }

    // 3D Tilt
    if (allowTilt) attachTilt(card);

    // Pause videos if they leave viewport
    if (item.isVideo && videoEl) {
      attachViewportPause(card, videoEl);
    }

    return card;
  }

  async function safePlay(videoEl, cardEl) {
    try {
      cardEl.classList.add("is-playing");
      await videoEl.play();
    } catch {
      // If blocked, ensure muted and retry
      try {
        videoEl.muted = true;
        await videoEl.play();
      } catch {
        // ignore
      }
    }
  }

  function safeStop(videoEl, cardEl) {
    try {
      videoEl.pause();
      videoEl.currentTime = 0;
    } catch {
      // ignore
    }
    cardEl.classList.remove("is-playing");
  }

  function attachViewportPause(card, videoEl) {
    if (!("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            if (!videoEl.paused) safeStop(videoEl, card);
          }
        }
      },
      { threshold: 0.15 }
    );

    io.observe(card);
  }

  function attachTilt(card) {
    let raf = 0;
    let rect = null;

    const maxRot = 8; // degrees
    const maxLift = 1.02;

    const onEnter = () => {
      card.classList.add("is-hovered");
      rect = card.getBoundingClientRect();
    };

    const onMove = (e) => {
      if (!rect) rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const rotY = (x - 0.5) * (maxRot * 2);
      const rotX = -(y - 0.5) * (maxRot * 2);

      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.transform = `perspective(900px) rotateX(${rotX.toFixed(
          2
        )}deg) rotateY(${rotY.toFixed(2)}deg) scale(${maxLift})`;
      });
    };

    const onLeave = () => {
      card.classList.remove("is-hovered");
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      rect = null;
      card.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)`;
    };

    // Only on real hover pointers
    card.addEventListener("mouseenter", () => {
      if (isTouchLike()) return;
      onEnter();
    });
    card.addEventListener("mousemove", (e) => {
      if (isTouchLike()) return;
      onMove(e);
    });
    card.addEventListener("mouseleave", () => {
      if (isTouchLike()) return;
      onLeave();
    });
  }

  // =========================
  // INIT
  // =========================
  function initAll() {
    const scriptEl = findScriptSelf();

    const projectUrl = scriptEl?.dataset?.projectUrl || DEFAULT_PROJECT_URL;
    const anonKey = scriptEl?.dataset?.anonKey || DEFAULT_ANON_KEY;

    const locale = getLocaleFromScript(scriptEl);
    const dict = I18N[locale] || I18N.it;
    const t = (k) => dict[k] || I18N.en[k] || "";

    injectInterFontOnce();
    injectStylesOnce();

    const nodes = Array.from(
      document.querySelectorAll(
        ".welo-media-widget[data-welo], .welo-media[data-welo], [data-welo-media][data-welo]"
      )
    );

    if (!nodes.length) return;

    for (const host of nodes) {
      try {
        initSingle(host, { projectUrl, anonKey, locale, t });
      } catch {
        // ignore
      }
    }
  }

  async function initSingle(host, { projectUrl, anonKey, locale, t }) {
    // Avoid double init
    if (host.__weloMediaInited) return;
    host.__weloMediaInited = true;

    host.classList.add("wm-root");

    const company =
      host.dataset.welo || host.dataset.company || host.getAttribute("data-welo-media");
    if (!company) return;

    const limit = parseInt(host.dataset.limit || "40", 10);
    const initial = parseInt(host.dataset.initial || "4", 10);
    const step = parseInt(host.dataset.step || "4", 10);

    const weloPageUrl =
      host.dataset.url || `https://www.welobadge.com/welo-page/${encodeURIComponent(company)}`;

    // Build skeleton
    host.innerHTML = "";
    const { wrap, rail, moreBtn } = buildWidgetShell({
      locale,
      t,
      pageUrl: weloPageUrl,
    });
    host.appendChild(wrap);

    // Fetch & render
    const bucket = host.dataset.bucket || "reviews-proof";

    // Simple cache (5 min)
    const cacheKey = `welo_media_${company}_${limit}_${locale}`;
    const cached = sessionStorage.getItem(cacheKey);
    const cachedTs = sessionStorage.getItem(cacheKey + "_ts");
    const now = Date.now();
    let itemsRaw = null;

    if (cached && cachedTs && now - Number(cachedTs) < 5 * 60 * 1000) {
      try {
        itemsRaw = JSON.parse(cached);
      } catch {
        itemsRaw = null;
      }
    }

    if (!itemsRaw) {
      itemsRaw = await fetchMediaItems({
        projectUrl,
        anonKey,
        company,
        limit,
      });
      sessionStorage.setItem(cacheKey, JSON.stringify(itemsRaw));
      sessionStorage.setItem(cacheKey + "_ts", String(now));
    }

    const items = itemsRaw
      .map((r) => normalizeItem(r, { projectUrl, bucket, locale, t }))
      .filter(Boolean);

    if (!items.length) {
      // If no media, hide the widget block
      host.style.display = "none";
      return;
    }

    const allowTilt = !isTouchLike();
    const globalVideoMutedState = { value: true };

    let visibleCount = Math.min(initial, items.length);

    const render = () => {
      rail.innerHTML = "";
      const slice = items.slice(0, visibleCount);

      for (const item of slice) {
        const card = buildCard({
          item,
          locale,
          t,
          allowTilt,
          globalVideoMutedState,
        });
        rail.appendChild(card);
      }

      if (visibleCount < items.length) {
        moreBtn.style.display = "inline-flex";
      } else {
        moreBtn.style.display = "none";
      }
    };

    moreBtn.addEventListener("click", () => {
      visibleCount = Math.min(visibleCount + step, items.length);
      render();
      // Keep the user on the same horizontal position after expand
      // (no hard jump)
    });

    render();
  }

  // Run when ready
  const run = () => initAll();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }

  // If Webflow loads sections dynamically
  const mo = new MutationObserver(() => {
    // lightweight re-init
    initAll();
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });
})();
