(function () {
  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function parseBool(v) {
    const s = String(v || "").toLowerCase().trim();
    return s === "1" || s === "true" || s === "yes";
  }

  function relTime(dateStr, locale) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d)) return "";
    const diff = Date.now() - d.getTime();
    if (diff < 0) return locale === "it" ? "Ora" : "Just now";

    const day = 86400000;
    const days = Math.floor(diff / day);

    if (days === 0) return locale === "it" ? "Oggi" : "Today";
    if (days === 1) return locale === "it" ? "1 giorno fa" : "1 day ago";
    if (days < 7) return locale === "it" ? days + " giorni fa" : days + " days ago";

    const weeks = Math.floor(days / 7);
    if (weeks < 5) return locale === "it"
      ? (weeks === 1 ? "1 settimana fa" : weeks + " settimane fa")
      : (weeks === 1 ? "1 week ago" : weeks + " weeks ago");

    const months = Math.floor(days / 30);
    if (months < 12) return locale === "it"
      ? (months === 1 ? "1 mese fa" : months + " mesi fa")
      : (months === 1 ? "1 month ago" : months + " months ago");

    const years = Math.floor(days / 365);
    return locale === "it"
      ? (years === 1 ? "1 anno fa" : years + " anni fa")
      : (years === 1 ? "1 year ago" : years + " years ago");
  }

  function starsText(n) {
    n = Math.max(0, Math.min(5, Number(n) || 0));
    return "★".repeat(n) + "☆".repeat(5 - n);
  }

  function mountUI(root, cfg) {
    root.innerHTML = `
      <style>
        .wmw{font-family:Inter,system-ui,-apple-system,"Segoe UI",Arial,sans-serif;color:#111}
        .wmw *{box-sizing:border-box}
        .wmw-head{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;margin-bottom:12px}
        .wmw-title{font-size:15px;font-weight:600;letter-spacing:-.01em}
        .wmw-sub{font-size:13px;color:#6b7280;margin-top:2px}
        .wmw-row{display:flex;gap:12px;overflow:auto;scroll-snap-type:x mandatory;padding-bottom:6px;-webkit-overflow-scrolling:touch;scrollbar-width:none}
        .wmw-row::-webkit-scrollbar{display:none}
        .wmw-card{scroll-snap-align:start;flex:0 0 min(260px,78vw);border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;background:#fff}
        .wmw-thumb{position:relative;width:100%;aspect-ratio:16/9;background:#0b0b0b;cursor:pointer}
        .wmw-thumb video,.wmw-thumb img{width:100%;height:100%;object-fit:cover;display:block}
        .wmw-play{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none}
        .wmw-play span{width:44px;height:44px;border-radius:999px;background:rgba(255,255,255,.92);display:flex;align-items:center;justify-content:center;box-shadow:0 10px 25px rgba(0,0,0,.25)}
        .wmw-play i{display:block;width:0;height:0;border-style:solid;border-width:8px 0 8px 13px;border-color:transparent transparent transparent #111;margin-left:2px}
        .wmw-body{padding:12px}
        .wmw-stars{font-size:14px;letter-spacing:1px;margin-bottom:6px}
        .wmw-text{font-size:13px;color:#374151;line-height:1.45;margin-bottom:10px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
        .wmw-meta{font-size:12px;color:#6b7280}
        .wmw-meta b{color:#111;font-weight:600}
        .wmw-box{border:1px solid #e5e7eb;border-radius:14px;padding:16px;background:#fff;color:#111}
        .wmw-empty{border:1px dashed #e5e7eb;border-radius:14px;padding:16px;background:#fff;color:#111}
        .wmw-error{border:1px solid #fecaca;border-radius:14px;padding:16px;background:#fff;color:#b91c1c}
        .wmw-link{color:#111;text-decoration:underline;font-weight:600}

        /* Modal */
        .wmw-modal{position:fixed;inset:0;z-index:999999;background:rgba(10,12,16,.86);display:none;align-items:center;justify-content:center;padding:18px}
        .wmw-modal.open{display:flex}
        .wmw-modal-inner{width:min(920px,96vw);background:#0b0b0b;border-radius:18px;overflow:hidden;position:relative;border:1px solid rgba(255,255,255,.12)}
        .wmw-modal-media{background:#000;aspect-ratio:16/9}
        .wmw-modal-media video,.wmw-modal-media img{width:100%;height:100%;object-fit:contain;display:block}
        .wmw-modal-info{padding:14px 14px 16px;color:#fff}
        .wmw-modal-title{font-size:14px;font-weight:600;margin-bottom:6px}
        .wmw-modal-text{font-size:13px;color:rgba(255,255,255,.78);line-height:1.5}
        .wmw-close{position:absolute;top:10px;right:10px;width:38px;height:38px;border-radius:999px;border:none;cursor:pointer;background:rgba(0,0,0,.55);color:#fff}
        .wmw-nav{position:absolute;top:50%;transform:translateY(-50%);width:42px;height:42px;border-radius:999px;border:none;cursor:pointer;background:rgba(0,0,0,.55);color:#fff;font-size:20px}
        .wmw-prev{left:10px}
        .wmw-next{right:10px}
        .wmw-nav[disabled]{opacity:.35;cursor:default}
      </style>

      <div class="wmw">
        <div class="wmw-head">
          <div>
            <div class="wmw-title">${esc(cfg.title)}</div>
            <div class="wmw-sub">${esc(cfg.subtitle)}</div>
          </div>
        </div>

        <div class="wmw-box wmw-loading">${esc(cfg.loading)}</div>

        <div class="wmw-modal" aria-hidden="true">
          <div class="wmw-modal-inner" role="dialog" aria-modal="true">
            <button class="wmw-close" type="button" aria-label="Close">✕</button>
            <button class="wmw-nav wmw-prev" type="button" aria-label="Previous">‹</button>
            <button class="wmw-nav wmw-next" type="button" aria-label="Next">›</button>
            <div class="wmw-modal-media"></div>
            <div class="wmw-modal-info">
              <div class="wmw-modal-title"></div>
              <div class="wmw-modal-text"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function lazyLoadThumbs(container) {
    const nodes = container.querySelectorAll("[data-src]");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((n) => {
        n.src = n.getAttribute("data-src");
        n.removeAttribute("data-src");
      });
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const el = en.target;
          el.src = el.getAttribute("data-src");
          el.removeAttribute("data-src");
          io.unobserve(el);

          // preview first frame per video
          if (el.tagName === "VIDEO") {
            el.addEventListener(
              "loadedmetadata",
              function () {
                try {
                  el.currentTime = 0.1;
                  el.pause();
                } catch {}
              },
              { once: true }
            );
          }
        });
      },
      { threshold: 0.2 }
    );
    nodes.forEach((n) => io.observe(n));
  }

  ready(function () {
    const hosts = document.querySelectorAll(".welo-media-widget[data-welo]");
    if (!hosts.length) return;

    const API_DEFAULT =
      "https://ufqvcojyfsnscuddadnw.supabase.co/functions/v1/welo-media-reviews";

    hosts.forEach(async function (host) {
      const slug = (host.getAttribute("data-welo") || "").trim();
      if (!slug) return;

      const locale =
        (host.getAttribute("data-locale") || "").trim() ||
        (window.location.pathname.startsWith("/en") ? "en" : "it");

      const limit = Math.min(
        Math.max(parseInt(host.getAttribute("data-limit") || "9", 10) || 9, 1),
        50
      );

      // "video" (default) o "media"
      const only = (host.getAttribute("data-only") || "video").trim().toLowerCase();
      const showText = parseBool(host.getAttribute("data-show-text") || "true");

      const api = (host.getAttribute("data-api") || "").trim() || API_DEFAULT;

      const weloPage =
        (host.getAttribute("data-url") || "").trim() ||
        ("https://www.welobadge.com/welo-page/" + slug);

      const cfg = {
        title: host.getAttribute("data-title") || (locale === "it" ? "Media recensioni" : "Review media"),
        subtitle:
          host.getAttribute("data-subtitle") ||
          (locale === "it" ? (only === "media" ? "Video e immagini dalla tua Welo Page" : "Video dalla tua Welo Page") : (only === "media" ? "Videos & photos from your Welo Page" : "Videos from your Welo Page")),
        loading: locale === "it" ? "Caricamento…" : "Loading…",
      };

      const root = host.attachShadow ? host.attachShadow({ mode: "open" }) : host;
      mountUI(root, cfg);

      const loadingEl = root.querySelector(".wmw-loading");
      const modal = root.querySelector(".wmw-modal");
      const modalMedia = root.querySelector(".wmw-modal-media");
      const modalTitle = root.querySelector(".wmw-modal-title");
      const modalText = root.querySelector(".wmw-modal-text");
      const btnClose = root.querySelector(".wmw-close");
      const btnPrev = root.querySelector(".wmw-prev");
      const btnNext = root.querySelector(".wmw-next");

      let items = [];
      let currentIndex = 0;

      function closeModal() {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        modalMedia.innerHTML = "";
      }

      function openModal(i) {
        currentIndex = i;
        const it = items[currentIndex];
        if (!it) return;

        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        modalMedia.innerHTML = "";

        if (it.type === "video") {
          const v = document.createElement("video");
          v.src = it.url;
          v.controls = true;
          v.playsInline = true;
          v.autoplay = true;
          modalMedia.appendChild(v);
        } else {
          const img = document.createElement("img");
          img.src = it.url;
          img.alt = "";
          modalMedia.appendChild(img);
        }

        const header =
          `${starsText(it.stars)}${it.author ? " • " + it.author : ""}${it.created_at ? " • " + relTime(it.created_at, locale) : ""}`;
        modalTitle.textContent = header.trim();
        modalText.textContent = (it.title ? it.title + " — " : "") + (it.text || "");

        btnPrev.disabled = currentIndex <= 0;
        btnNext.disabled = currentIndex >= items.length - 1;
      }

      btnClose.addEventListener("click", closeModal);
      modal.addEventListener("click", function (e) {
        if (e.target === modal) closeModal();
      });
      btnPrev.addEventListener("click", function () {
        if (currentIndex > 0) openModal(currentIndex - 1);
      });
      btnNext.addEventListener("click", function () {
        if (currentIndex < items.length - 1) openModal(currentIndex + 1);
      });

      document.addEventListener("keydown", function (e) {
        if (!modal.classList.contains("open")) return;
        if (e.key === "Escape") closeModal();
        if (e.key === "ArrowLeft" && currentIndex > 0) openModal(currentIndex - 1);
        if (e.key === "ArrowRight" && currentIndex < items.length - 1) openModal(currentIndex + 1);
      });

      try {
        const qs = new URLSearchParams({ company: slug, limit: String(limit) });
        const res = await fetch(api + "?" + qs.toString());
        const data = await res.json();

        const raw = Array.isArray(data.items) ? data.items : [];

        // filtro client-side: solo video oppure media
        items = only === "media" ? raw : raw.filter((x) => x && x.type === "video");

        if (!items.length) {
          loadingEl.className = "wmw-empty";
          loadingEl.innerHTML =
            (locale === "it" ? "Nessun contenuto disponibile." : "No content available.") +
            ` <a class="wmw-link" href="${esc(weloPage)}" target="_blank" rel="noopener">` +
            (locale === "it" ? "Apri Welo Page" : "Open Welo Page") +
            `</a>`;
          return;
        }

        const row = document.createElement("div");
        row.className = "wmw-row";

        row.innerHTML = items
          .map((it, idx) => {
            const txt = (it.title ? it.title + " — " : "") + (it.text || "");
            const meta =
              `${starsText(it.stars)}${it.author ? " • " + esc(it.author) : ""}${it.created_at ? " • " + esc(relTime(it.created_at, locale)) : ""}`;

            const mediaTag =
              it.type === "video"
                ? `<video muted playsinline preload="metadata" data-src="${esc(it.url)}"></video>
                   <div class="wmw-play"><span><i></i></span></div>`
                : `<img loading="lazy" data-src="${esc(it.url)}" alt="" />`;

            return `
              <div class="wmw-card">
                <div class="wmw-thumb" data-idx="${idx}">
                  ${mediaTag}
                </div>
                <div class="wmw-body">
                  <div class="wmw-stars">${esc(starsText(it.stars))}</div>
                  ${showText ? `<div class="wmw-text">${esc(txt)}</div>` : ""}
                  <div class="wmw-meta"><b>${meta}</b></div>
                </div>
              </div>
            `;
          })
          .join("");

        loadingEl.replaceWith(row);
        lazyLoadThumbs(row);

        row.addEventListener("click", function (e) {
          const tile = e.target.closest(".wmw-thumb");
          if (!tile) return;
          const idx = Number(tile.getAttribute("data-idx") || "0") || 0;
          openModal(idx);
        });
      } catch (err) {
        loadingEl.className = "wmw-error";
        loadingEl.textContent =
          (locale === "it" ? "Errore nel caricamento." : "Failed to load.") +
          " (" +
          (err && err.message ? err.message : "unknown") +
          ")";
      }
    });
  });
})();
