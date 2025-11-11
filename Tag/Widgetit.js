// ✅ crea un iframe sandboxato — isolamento totale
const iframe = document.createElement("iframe");
Object.assign(iframe.style, {
  all: "unset",
  width: "100%",
  border: "none",
  overflow: "hidden",
  display: "block"
});
iframe.setAttribute("scrolling", "no");
iframe.setAttribute("title", "Welo Tag");
container.appendChild(iframe);

// ✅ contenuto HTML interno dell’iframe
const doc = iframe.contentDocument || iframe.contentWindow.document;
doc.open();
doc.write(`
  <!DOCTYPE html>
  <html lang="it">
  <head>
    <meta charset="UTF-8">
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap');
      html, body {
        margin: 0;
        padding: 0;
        background: transparent;
      }
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
        box-shadow: 0 0 0 rgba(165,185,0,0.4);
        animation: tagwelo-pulse 1.6s infinite ease-out;
      }
      @keyframes tagwelo-pulse {
        0% { box-shadow: 0 0 0 0 rgba(165,185,0,.4); }
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
    </style>
  </head>
  <body>
    <a href="${targetURL}" target="_blank" rel="noopener" class="tagwelo-widget">
      <div class="tagwelo-dot"></div>
      <span>Risultati verificati da</span>
      <img 
        src="https://cdn.prod.website-files.com/672c7e4b5413fe846587b57a/682461741cc0cd01187ea413_Rectangle%207089%201.png" 
        alt="Welo Badge"
        class="tagwelo-logo"
      />
      <span>Welo</span>
    </a>

    <script>
      // Auto resize dell'altezza del widget
      const observer = new ResizeObserver(() => {
        const h = document.body.scrollHeight;
        window.parent.postMessage({ type: "tagwelo-resize", height: h }, "*");
      });
      observer.observe(document.body);
    </script>
  </body>
  </html>
`);
doc.close();

// ✅ riceve l'altezza e la applica all’iframe
window.addEventListener("message", (e) => {
  if (e.data.type === "tagwelo-resize" && e.data.height) {
    iframe.style.height = e.data.height + "px";
  }
});
