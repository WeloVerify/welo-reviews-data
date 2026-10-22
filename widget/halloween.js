(function () {
'use strict';
if (window.__bwlLoaded) return; window.__bwlLoaded = true;
  (function () {
    var d = document.documentElement; d.classList.add('bw-js');
    try {
      var q = new URLSearchParams(location.search);
      var skip = location.hash || q.get('bwp_gate') === '0' || sessionStorage.getItem('bwl_entered') === '1' ||
        (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
      if (!skip) d.classList.add('bw-is-gated');
    } catch (e) {}
  })();
var CSS = "#bwl{position:relative;font-family:Inter,ui-sans-serif,system-ui,-apple-system,\"Segoe UI\",Roboto,Arial,sans-serif;font-size:16px;line-height:1.55;font-weight:400;font-style:normal;color:#eef1f8;text-align:left;letter-spacing:normal;text-transform:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}\n#bwl :where(div,section,header,main,footer,nav,article,aside,h1,h2,h3,h4,h5,h6,p,ul,ol,li,figure,blockquote,span,strong,b,em,i,small,code,a,button,label){margin:0;padding:0;border:0;max-width:none;min-height:0;font-size:inherit;font-weight:inherit;font-family:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;text-align:inherit;text-transform:inherit;text-decoration:none;text-shadow:none;background:none;-webkit-text-fill-color:currentColor;-webkit-background-clip:border-box;background-clip:border-box;box-shadow:none;float:none;opacity:1;transform:none;filter:none}\n#bwl :where(ul,ol,li){list-style:none}\n#bwl :where(strong,b){font-weight:600}\n#bwl :where(em,i){font-style:normal}\n#bwl :where(button){-webkit-appearance:none;appearance:none;cursor:pointer;border-radius:0}\n#bwl :where(img){display:block;max-width:100%;height:auto;border:0}\n#bwl{\n--bg:#04060b;--bg2:#070b16;--panel:#0a1020;--line:rgba(160,180,230,.12);--line2:rgba(160,180,230,.2);\n--text:#eef1f8;--soft:#c4cce0;--mut:#8f9ab4;\n--blue:#0136ff;--blue2:#3b6cff;--or:#ff7a1a;--am:#ffb15a;\n--r:16px;--ease:cubic-bezier(.2,.8,.2,1);\n}\n#bwl *,#bwl *::before,#bwl *::after{box-sizing:border-box}\nhtml{-webkit-text-size-adjust:100%;scroll-behavior:smooth;background:#04060b}\nbody{margin:0;background:#04060b!important;overflow-x:hidden}\n@supports (overflow:clip){body{overflow-x:clip}}\n#bwl img,#bwl svg{display:block;max-width:100%}\n#bwl a{color:inherit;text-decoration:none}\n#bwl button{font:inherit;color:inherit;background:none;border:0;padding:0;cursor:pointer}\n#bwl h1,#bwl h2,#bwl h3,#bwl p,#bwl ul,#bwl ol,#bwl figure{margin:0;padding:0}\n#bwl ul,#bwl ol{list-style:none}\n#bwl :focus-visible{outline:2px solid var(--am);outline-offset:3px;border-radius:6px}\n#bwl .bw-sr{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}\n#bwl .bw-skip{position:fixed;left:16px;top:16px;z-index:100;padding:10px 16px;border-radius:10px;background:#fff;color:#000;font-weight:600;transform:translateY(-200%);transition:transform .2s}\n#bwl .bw-skip:focus{transform:none}\n#bwl .bw-wrap{width:min(1180px,100% - 40px);margin-inline:auto}\n#bwl .bw-btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:54px;padding:0 26px;border-radius:13px;font-size:15px;font-weight:600;letter-spacing:.01em;white-space:nowrap;transition:background .25s,box-shadow .35s,transform .2s,color .2s,border-color .2s}\n#bwl .bw-btn svg{flex:0 0 auto}\n#bwl .bw-btn-primary{color:#fff;background:var(--blue);box-shadow:inset 0 1px 0 rgba(255,255,255,.22),0 12px 34px -12px rgba(1,54,255,.85)}\n#bwl .bw-btn-primary:hover{background:#1747ff;box-shadow:inset 0 1px 0 rgba(255,255,255,.25),0 16px 40px -12px rgba(1,54,255,.95),0 0 0 5px rgba(255,140,50,.12)}\n#bwl .bw-btn-primary:active{transform:translateY(1px)}\n#bwl .bw-btn-ghost{color:var(--soft);border:1px solid var(--line2);background:rgba(255,255,255,.02)}\n#bwl .bw-btn-ghost:hover{color:#fff;border-color:rgba(200,215,255,.35);background:rgba(255,255,255,.05)}\n#bwl .bw-btn-sm{min-height:42px;padding:0 18px;font-size:14px;border-radius:11px}\n#bwl .bw-btn[disabled],#bwl .bw-btn[aria-disabled=\"true\"]{opacity:.45;pointer-events:none;box-shadow:none}\n#bwl .bw-link{display:inline-flex;align-items:center;gap:8px;min-height:44px;font-size:14px;font-weight:500;color:var(--soft);transition:color .2s}\n#bwl .bw-link:hover{color:#fff}\n#bwl .bw-eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:12px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--am)}\n#bwl .bw-eyebrow i{width:6px;height:6px;border-radius:50%;background:var(--or);box-shadow:0 0 12px 2px rgba(255,122,26,.6)}\n#bwl .bw-h2{font-size:clamp(30px,3.6vw,48px);line-height:1.08;font-weight:500;letter-spacing:-.025em}\n#bwl .bw-lede{color:var(--soft);font-size:17px}\n#bwl .bw-nav{position:absolute;inset:0 0 auto;z-index:20;padding:22px 0}\n#bwl .bw-nav .bw-wrap{display:flex;align-items:center;justify-content:space-between;gap:16px}\n#bwl .bw-logo{display:flex;align-items:center;min-height:44px}\n#bwl .bw-logo img{height:30px;width:auto}\n#bwl .bw-logo-fb{font-weight:600;letter-spacing:.02em}\n#bwl .bw-nav-r{display:flex;align-items:center;gap:8px}\n#bwl .bw-hero{position:relative;min-height:100vh;min-height:100svh;display:flex;align-items:center;padding:136px 0 96px;overflow:hidden;isolation:isolate}\n#bwl .bw-hero-bg{position:absolute;inset:0;z-index:-2;background:radial-gradient(55% 45% at 12% 0%,rgba(1,54,255,.26),transparent 62%),radial-gradient(40% 50% at 74% 52%,rgba(40,70,170,.18),transparent 70%),linear-gradient(180deg,#05070e 0%,#04060b 70%,#04060b 100%)}\n#bwl .bw-hero-warm{position:absolute;inset:0;z-index:-1;pointer-events:none;background:radial-gradient(38% 46% at 73% 78%,rgba(255,122,26,.30),transparent 70%);opacity:0;transition:opacity 1.8s ease .3s}\n#bwl .bw-is-open .bw-hero-warm{opacity:1}\n#bwl .bw-fog{position:absolute;left:-15%;right:-15%;bottom:-4%;height:42%;z-index:2;pointer-events:none;background:radial-gradient(40% 55% at 22% 100%,rgba(150,172,230,.13),transparent 70%),radial-gradient(35% 50% at 60% 100%,rgba(150,172,230,.10),transparent 70%),radial-gradient(30% 45% at 90% 100%,rgba(150,172,230,.10),transparent 70%);animation:fog 38s ease-in-out infinite alternate}\n#bwl .bw-fog.bw-f2{height:30%;opacity:.8;animation-duration:52s;animation-direction:alternate-reverse}\n@keyframes fog{from{transform:translate3d(-3%,0,0)}to{transform:translate3d(4%,0,0)}}\n#bwl .bw-hero.bw-is-off .bw-fog{animation-play-state:paused}\n#bwl .bw-hero-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);grid-template-rows:auto auto;grid-template-areas:\"copy stage\" \"act stage\";column-gap:56px;position:relative;z-index:3}\n#bwl .bw-hero-copy{grid-area:copy;align-self:end;max-width:600px}\n#bwl .bw-hero-act{grid-area:act;align-self:start;max-width:600px;padding-top:36px}\n#bwl .bw-chip{display:inline-flex;align-items:center;gap:10px;padding:8px 14px 8px 12px;border-radius:999px;border:1px solid rgba(255,150,70,.28);background:rgba(255,122,26,.06);font-size:13px;font-weight:500;color:#ffd2a6}\n#bwl .bw-chip i{width:6px;height:6px;border-radius:50%;background:var(--or);box-shadow:0 0 10px 2px rgba(255,122,26,.7)}\n#bwl .bw-hero h1{margin-top:22px;font-size:clamp(36px,4.5vw,62px);line-height:1.05;font-weight:500;letter-spacing:-.03em;color:#fff;text-wrap:balance}\n#bwl .bw-hero-sub{margin-top:18px;font-size:clamp(18px,1.6vw,22px);font-weight:500;color:#cfd6ea;letter-spacing:-.01em}\n#bwl .bw-hero-sub em{font-style:normal;color:var(--am)}\n#bwl .bw-hero-ctas{display:flex;flex-wrap:wrap;align-items:center;gap:10px 18px}\n#bwl .bw-hero-ctas [data-after]{display:none}\n#bwl .bw-is-open .bw-hero-ctas [data-before]{display:none}\n#bwl .bw-is-open .bw-hero-ctas [data-after]{display:inline-flex}\n#bwl .bw-offer-strip{display:flex;flex-wrap:wrap;gap:10px;margin-top:28px}\n#bwl .bw-offer-strip li{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:12px;border:1px solid var(--line);background:rgba(10,16,32,.6);font-size:14px;color:var(--soft)}\n#bwl .bw-offer-strip strong{font-weight:600;color:#fff}\n#bwl .bw-offer-strip li:first-child strong{color:var(--am)}\n#bwl .bw-hero-stage{grid-area:stage;align-self:center;position:relative;height:min(72vh,660px);min-height:440px;container-type:size}\n#bwl .bw-scene{position:absolute;left:50%;bottom:0;height:min(100cqh,136.36cqw);aspect-ratio:440/600;transform:translateX(-50%);container-type:inline-size}\n#bwl .bw-scene .bw-frame{position:absolute;inset:0;width:100%;height:100%}\n#bwl .bw-portal{position:absolute;left:20.4545%;top:20%;width:59.0909%;height:71.3333%;perspective:150cqw}\n#bwl .bw-int{position:absolute;inset:0;overflow:hidden;background:radial-gradient(62% 46% at 50% 76%,#ffd38f 0%,#ff8a2b 20%,#a8390c 46%,#2b0e07 76%,#0c0606 100%)}\n#bwl .bw-rays{position:absolute;inset:-20%;background:repeating-conic-gradient(from 0deg at 50% 70%,rgba(255,196,130,.22) 0 2.5deg,transparent 2.5deg 8deg);-webkit-mask-image:radial-gradient(closest-side at 50% 70%,#000 30%,transparent);mask-image:radial-gradient(closest-side at 50% 70%,#000 30%,transparent);opacity:0;transition:opacity 1.4s ease .5s}\n#bwl .bw-is-open .bw-rays{opacity:.85}\n#bwl .bw-int-txt{position:absolute;left:0;right:0;top:40%;text-align:center;color:#fff7ec;opacity:0;transform:translateY(8%) scale(.94);filter:blur(6px);transition:opacity .9s ease .8s,transform 1.1s var(--ease) .8s,filter .9s ease .8s}\n#bwl .bw-int-txt b{display:block;font-weight:600;font-size:12cqw;line-height:1;letter-spacing:-.03em;text-shadow:0 0 3cqw rgba(255,170,80,.9),0 0 8cqw rgba(255,120,30,.6)}\n#bwl .bw-int-txt span{display:block;margin-top:1.4cqw;font-weight:500;font-size:3.4cqw;letter-spacing:.42em;padding-left:.42em;color:#ffe3c2}\n#bwl .bw-int-txt small{display:block;margin-top:3.5cqw;font-size:2.6cqw;font-weight:500;letter-spacing:.06em;color:#ffe8cf}\n#bwl .bw-is-open .bw-int-txt{opacity:1;transform:none;filter:none}\n#bwl .bw-leaf{position:absolute;top:0;height:100%;width:49.6154%;transform-style:preserve-3d;will-change:transform;transition:transform .7s cubic-bezier(.3,.6,.3,1)}\n#bwl .bw-leaf svg{position:absolute;inset:0;width:100%;height:100%}\n#bwl .bw-leaf-l{left:0;transform-origin:0 50%}\n#bwl .bw-leaf-r{right:0;transform-origin:100% 50%}\n#bwl .bw-edge{position:absolute;top:0;height:100%;width:5.5%;background:linear-gradient(180deg,#5a2a10,#2a140a 55%,#100907)}\n#bwl .bw-leaf-l .bw-edge{left:100%;transform-origin:0 50%;transform:rotateY(90deg)}\n#bwl .bw-leaf-r .bw-edge{right:100%;transform-origin:100% 50%;transform:rotateY(-90deg)}\n#bwl .bw-shade{position:absolute;inset:0;background:#000;opacity:0;transition:opacity 1.8s ease}\n#bwl .bw-is-tease .bw-leaf-l{transform:rotateY(3.5deg)}\n#bwl .bw-is-tease .bw-leaf-r{transform:rotateY(-3.5deg)}\n#bwl .bw-is-unlatch .bw-leaf{transition:transform .3s cubic-bezier(.3,.7,.4,1)}\n#bwl .bw-is-unlatch .bw-leaf-l{transform:rotateY(8deg)}\n#bwl .bw-is-unlatch .bw-leaf-r{transform:rotateY(-8deg)}\n#bwl .bw-is-open .bw-leaf{transition:transform 2s cubic-bezier(.45,.02,.15,1)}\n#bwl .bw-is-open .bw-leaf-l{transform:rotateY(84deg)}\n#bwl .bw-is-open .bw-leaf-r{transform:rotateY(-84deg)}\n#bwl .bw-is-open .bw-shade{opacity:.55}\n#bwl .bw-is-closing .bw-leaf{transition:transform 1.3s cubic-bezier(.5,0,.3,1)}\n#bwl .bw-win{opacity:.5;transition:opacity .6s ease}\n#bwl .bw-is-tease .bw-win{opacity:1}\n#bwl .bw-rim{position:absolute;left:20.4545%;top:20%;width:59.0909%;height:71.3333%;pointer-events:none;opacity:.6;transition:opacity .6s ease}\n#bwl .bw-rim svg{width:100%;height:100%;overflow:visible}\n#bwl .bw-is-tease .bw-rim{opacity:1}\n#bwl .bw-is-open .bw-rim{opacity:0;transition-duration:1.2s}\n#bwl .bw-jw{opacity:.22;transition:opacity 1.6s ease .2s}\n#bwl .bw-is-tease .bw-jw{opacity:.4}\n#bwl .bw-is-open .bw-jw{opacity:.95}\n#bwl .bw-spill{opacity:.18;transition:opacity 1.6s ease .3s}\n#bwl .bw-is-open .bw-spill{opacity:1}\n#bwl .bw-pkl,#bwl .bw-pkg{opacity:0;transition:opacity 1s ease 1s}\n#bwl .bw-is-open .bw-pkl{opacity:1}\n#bwl .bw-is-open .bw-pkg{opacity:.8}\n#bwl .bw-embers{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}\n#bwl .bw-doorhit{position:absolute;left:18%;top:18%;width:64%;height:76%;border-radius:40% 40% 0 0}\n#bwl .bw-is-open .bw-doorhit{display:none}\n#bwl .bw-scroll-cue{position:absolute;left:50%;bottom:22px;z-index:4;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:6px;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--mut)}\n#bwl .bw-scroll-cue::after{content:\"\";width:1px;height:28px;background:linear-gradient(var(--mut),transparent)}\n#bwl .bw-sec{position:relative;padding:clamp(80px,10vw,140px) 0}\n#bwl .bw-sec-head{display:grid;gap:16px;justify-items:start}\n#bwl .bw-center{text-align:center}\n#bwl .bw-center .bw-sec-head{justify-items:center}\n#bwl .bw-reveal-sec{padding-top:clamp(70px,8vw,120px);overflow:hidden}\n#bwl .bw-reveal-sec::before{content:\"\";position:absolute;left:50%;top:0;width:min(900px,120%);height:520px;transform:translateX(-50%);background:radial-gradient(50% 50% at 50% 40%,rgba(255,122,26,.14),transparent 70%);pointer-events:none}\n#bwl .bw-mega{position:relative;display:flex;justify-content:center;align-items:flex-start;gap:.06em;margin-top:18px;font-size:clamp(108px,19vw,250px);line-height:.9;font-weight:600;letter-spacing:-.055em}\n#bwl .bw-mega-n{background:linear-gradient(180deg,#ffffff 30%,#ffd8ae 100%);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 0 40px rgba(255,140,50,.18))}\n#bwl .bw-mega-off{margin-top:.12em;font-size:.3em;font-weight:600;letter-spacing:.08em;color:var(--or)}\n#bwl .bw-mega-sub{margin-top:18px;font-size:clamp(18px,1.7vw,22px);color:var(--soft)}\n#bwl .bw-divider{width:1px;height:72px;margin:56px auto;background:linear-gradient(transparent,var(--line2),transparent)}\n#bwl .bw-give-head h3{font-size:clamp(26px,3vw,38px);line-height:1.12;font-weight:500;letter-spacing:-.02em}\n#bwl .bw-give-head h3 span{display:block;color:var(--am)}\n#bwl .bw-tickets{display:flex;justify-content:center;padding:56px 0 64px;margin-left:34px}\n#bwl .bw-ticket{--d:0;position:relative;flex:0 0 auto;width:128px;aspect-ratio:128/206;margin-left:-34px;transform-origin:50% 120%;transform:translateY(calc(var(--d) * var(--d) * 3px)) rotate(calc(var(--d) * 4deg));transition:transform .45s var(--ease),filter .45s;z-index:1}\n#bwl .bw-ticket:hover{transform:translateY(calc(var(--d) * var(--d) * 3px - 22px)) rotate(calc(var(--d) * 4deg)) scale(1.05);z-index:20}\n#bwl .bw-t-in{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;padding:16px 10px 12px;border-radius:12px;overflow:hidden;background:radial-gradient(120% 70% at 50% 0%,rgba(59,108,255,.22),transparent 60%),linear-gradient(170deg,#101a34 0%,#080d1b 55%,#05070e 100%);border:1px solid rgba(80,120,255,.35);box-shadow:0 18px 40px -16px rgba(0,0,0,.9);-webkit-mask:radial-gradient(circle 7px at 0 72%,transparent 96%,#000) left/51% 100% no-repeat,radial-gradient(circle 7px at 100% 72%,transparent 96%,#000) right/51% 100% no-repeat;mask:radial-gradient(circle 7px at 0 72%,transparent 96%,#000) left/51% 100% no-repeat,radial-gradient(circle 7px at 100% 72%,transparent 96%,#000) right/51% 100% no-repeat}\n#bwl .bw-t-in::before{content:\"\";position:absolute;inset:-40% -60%;background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,.10) 50%,transparent 60%);transform:translateX(-60%);transition:transform .9s var(--ease)}\n#bwl .bw-ticket:hover .bw-t-in::before{transform:translateX(60%)}\n#bwl .bw-t-in::after{content:\"\";position:absolute;left:12px;right:12px;top:72%;border-top:1px dashed rgba(200,215,255,.22)}\n#bwl .bw-t-no{font-size:10px;font-weight:600;letter-spacing:.2em;color:var(--or)}\n#bwl .bw-t-amt{margin-top:auto;font-size:30px;font-weight:600;letter-spacing:-.03em;color:#fff}\n#bwl .bw-t-lbl{margin-top:2px;margin-bottom:auto;font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:#aeb8d2}\n#bwl .bw-t-stub{position:relative;margin-top:22px;font-size:8.5px;letter-spacing:.2em;text-transform:uppercase;color:#7d89a6}\n#bwl .bw-t-stub::before{content:\"\";display:block;width:56px;height:12px;margin:0 auto 6px;background:repeating-linear-gradient(90deg,#8b97b8 0 1px,transparent 1px 3px,#8b97b8 3px 5px,transparent 5px 6px);opacity:.45}\n#bwl .bw-prize-note{max-width:620px;margin:8px auto 0;font-size:14px;color:var(--mut)}\n#bwl .bw-prize-note strong{color:var(--soft);font-weight:500}\n#bwl .bw-claim{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,470px);gap:clamp(32px,6vw,84px);align-items:center;padding:clamp(28px,5vw,64px);border-radius:28px;border:1px solid var(--line);background:radial-gradient(60% 90% at 0% 0%,rgba(1,54,255,.22),transparent 60%),radial-gradient(50% 80% at 100% 100%,rgba(255,122,26,.14),transparent 65%),linear-gradient(180deg,#0a1124,#070b16);overflow:hidden;text-align:left}\n#bwl .bw-claim-copy .bw-h2{margin-top:16px;max-width:520px}\n#bwl .bw-claim-copy .bw-lede{margin-top:16px;max-width:460px}\n#bwl .bw-claim-list{display:grid;gap:14px;margin-top:30px}\n#bwl .bw-claim-list li{display:flex;align-items:center;gap:12px;font-size:15px;color:var(--soft)}\n#bwl .bw-claim-list strong{color:#fff;font-weight:600;letter-spacing:.04em}\n#bwl .bw-claim-list svg{flex:0 0 auto;width:24px;height:24px;padding:5px;border-radius:50%;color:var(--am);background:rgba(255,122,26,.12);border:1px solid rgba(255,150,70,.3)}\n#bwl .bw-coupon{position:relative;overflow:hidden;border-radius:22px;background:radial-gradient(90% 60% at 50% 0%,rgba(255,122,26,.16),transparent 62%),#060a15;border:1px solid rgba(255,150,70,.35);box-shadow:0 30px 70px -30px rgba(0,0,0,.9),0 0 60px -24px rgba(255,122,26,.5)}\n#bwl .bw-coupon-main{padding:24px 24px 20px}\n#bwl .bw-coupon-top{display:flex;align-items:center;justify-content:space-between;gap:12px}\n#bwl .bw-coupon-lbl{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--mut)}\n#bwl .bw-coupon-stamp{flex:0 0 auto;padding:5px 11px;border-radius:999px;font-size:12px;font-weight:600;letter-spacing:.04em;color:#1a0d04;background:var(--am)}\n#bwl .bw-code-row{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:16px;padding:14px 14px 14px 20px;border-radius:14px;background:#0b1224;border:1px dashed rgba(255,170,100,.4)}\n#bwl .bw-code{font-size:clamp(22px,2.4vw,28px);font-weight:600;letter-spacing:.14em;color:#fff;font-variant-numeric:tabular-nums;-webkit-user-select:all;user-select:all;overflow-wrap:anywhere}\n#bwl .bw-copy{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:46px;padding:0 18px;border-radius:11px;font-size:14px;font-weight:600;color:#fff;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);transition:background .2s,color .2s,border-color .2s,transform .2s;flex:0 0 auto}\n#bwl .bw-copy:hover{background:rgba(255,255,255,.12)}\n#bwl .bw-copy .bw-ok{display:none}\n#bwl .bw-copy.bw-is-done{color:#1a0d04;background:var(--am);border-color:var(--am)}\n#bwl .bw-copy.bw-is-done .bw-ok{display:block}\n#bwl .bw-copy.bw-is-done .bw-cp{display:none}\n#bwl .bw-copy[disabled]{opacity:.45;cursor:not-allowed}\n#bwl .bw-coupon-tear{position:relative;height:24px}\n#bwl .bw-coupon-tear::before{content:\"\";position:absolute;left:26px;right:26px;top:11px;border-top:2px dashed rgba(255,170,100,.25)}\n#bwl .bw-coupon-tear i{position:absolute;top:0;width:24px;height:24px;border-radius:50%;background:#090e1e;box-shadow:inset 0 0 0 1px rgba(255,150,70,.35)}\n#bwl .bw-coupon-tear i:first-child{left:-12px}\n#bwl .bw-coupon-tear i:last-child{right:-12px}\n#bwl .bw-coupon-foot{padding:18px 24px 22px}\n#bwl .bw-coupon-foot .bw-btn{width:100%}\n#bwl .bw-code-note{margin-top:12px;font-size:13px;line-height:1.5;color:var(--mut);text-align:center}\n#bwl .bw-steps{position:relative;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:32px;margin-top:64px;text-align:center}\n#bwl .bw-steps::before{content:\"\";position:absolute;top:40px;left:calc(100% / 6);right:calc(100% / 6);height:1px;background:linear-gradient(90deg,rgba(255,150,70,0),rgba(255,150,70,.6) 12%,rgba(59,108,255,.6) 50%,rgba(255,150,70,.6) 88%,rgba(255,150,70,0))}\n#bwl .bw-step{position:relative;display:flex;flex-direction:column;align-items:center}\n#bwl .bw-step-node{position:relative;width:80px;height:80px;display:grid;place-items:center;border-radius:50%;color:var(--am);background:radial-gradient(circle at 50% 30%,#151d36,#060914 72%);border:1px solid rgba(255,150,70,.4);box-shadow:0 0 0 10px #04060b,0 0 44px -6px rgba(255,122,26,.5);transition:transform .45s var(--ease),box-shadow .45s}\n#bwl .bw-step:hover .bw-step-node{transform:translateY(-4px);box-shadow:0 0 0 10px #04060b,0 0 56px -4px rgba(255,122,26,.75)}\n#bwl .bw-step-node svg{width:28px;height:28px}\n#bwl .bw-step-n{position:absolute;top:-4px;right:-12px;padding:3px 8px;border-radius:999px;font-size:11px;font-weight:600;letter-spacing:.06em;line-height:1.3;color:#fff;background:var(--blue);box-shadow:0 6px 14px -4px rgba(1,54,255,.85)}\n#bwl .bw-step h3{margin-top:28px;font-size:21px;line-height:1.25;font-weight:500;letter-spacing:-.01em;color:#fff}\n#bwl .bw-step p{margin-top:10px;max-width:300px;font-size:15px;line-height:1.55;color:var(--mut)}\n#bwl .bw-step p strong{color:#fff;font-weight:600;letter-spacing:.05em}\n#bwl .bw-cd-card{padding:clamp(28px,5vw,56px);border-radius:28px;border:1px solid var(--line);background:radial-gradient(70% 120% at 50% 0%,rgba(255,122,26,.10),transparent 60%),#070b16;text-align:center}\n#bwl .bw-cd{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;max-width:720px;margin:34px auto 0}\n#bwl .bw-cd-u{padding:22px 8px 18px;border-radius:18px;border:1px solid var(--line);background:rgba(4,7,14,.6)}\n#bwl .bw-cd-v{display:block;font-size:clamp(36px,6vw,64px);line-height:1;font-weight:500;letter-spacing:-.03em;font-variant-numeric:tabular-nums;color:#fff}\n#bwl .bw-cd-l{display:block;margin-top:10px;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--mut)}\n#bwl .bw-cd-deadline{margin-top:22px;font-size:14px;color:var(--mut)}\n#bwl .bw-cd-ended{display:none;max-width:520px;margin:20px auto 0;color:var(--soft)}\n#bwl .bw-faq-grid{display:grid;grid-template-columns:.8fr 1.2fr;gap:56px;align-items:start}\n#bwl .bw-acc{border-top:1px solid var(--line)}\n#bwl .bw-acc-item{border-bottom:1px solid var(--line)}\n#bwl .bw-acc-btn{display:flex;width:100%;align-items:center;justify-content:space-between;gap:20px;padding:22px 2px;text-align:left;font-size:17px;font-weight:500;color:#fff}\n#bwl .bw-acc-btn:hover{color:var(--am)}\n#bwl .bw-acc-ic{position:relative;flex:0 0 auto;width:28px;height:28px;border-radius:50%;border:1px solid var(--line2)}\n#bwl .bw-acc-ic::before,#bwl .bw-acc-ic::after{content:\"\";position:absolute;left:50%;top:50%;width:10px;height:1.5px;background:currentColor;transform:translate(-50%,-50%);transition:transform .3s var(--ease)}\n#bwl .bw-acc-ic::after{transform:translate(-50%,-50%) rotate(90deg)}\n#bwl .bw-acc-btn[aria-expanded=\"true\"] .bw-acc-ic::after{transform:translate(-50%,-50%) rotate(0)}\n#bwl .bw-acc-panel{display:grid;grid-template-rows:0fr;transition:grid-template-rows .35s var(--ease)}\n#bwl .bw-acc-panel>div{overflow:hidden}\n#bwl .bw-acc-panel p{padding:0 40px 22px 2px;color:var(--soft);font-size:15px}\n#bwl .bw-acc-panel code,#bwl .bw-faq code{font-family:inherit;font-weight:600;color:#fff;letter-spacing:.06em}\n#bwl .bw-acc-item.bw-is-open .bw-acc-panel{grid-template-rows:1fr}\n#bwl .bw-terms{margin-top:28px;padding:18px 20px;border-radius:14px;border:1px solid var(--line);font-size:13px;color:var(--mut)}\n#bwl .bw-terms a{color:var(--soft);text-decoration:underline;text-underline-offset:3px}\n#bwl .bw-terms a:hover{color:#fff}\n#bwl .bw-bar{position:fixed;left:50%;bottom:max(14px,env(safe-area-inset-bottom));z-index:40;display:flex;align-items:center;gap:14px;width:min(720px,calc(100% - 24px));padding:10px 10px 10px 20px;border-radius:18px;border:1px solid var(--line2);background:rgba(8,12,24,.86);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);box-shadow:0 20px 50px -20px rgba(0,0,0,.9);transform:translate(-50%,140%);transition:transform .5s var(--ease);visibility:hidden}\n#bwl .bw-bar.bw-is-on{transform:translate(-50%,0);visibility:visible}\n#bwl .bw-bar-txt{flex:1 1 auto;font-size:14px;color:var(--soft);min-width:0}\n#bwl .bw-bar-txt strong{color:var(--am);font-weight:600}\n#bwl .bw-bar-code{display:inline-flex;align-items:center;gap:8px;min-height:42px;padding:0 14px;border-radius:11px;border:1px dashed rgba(255,170,100,.45);font-weight:600;letter-spacing:.1em;font-size:14px;color:#fff;transition:background .2s}\n#bwl .bw-bar-code svg{flex:0 0 auto}\n#bwl .bw-bar-code:hover{background:rgba(255,255,255,.06)}\n#bwl .bw-bar-code.bw-is-done{background:var(--am);color:#1a0d04;border-style:solid}\nhtml.bw-js #bwl .bw-rv{opacity:0;transform:translateY(18px);transition:opacity .8s ease,transform .9s var(--ease)}\nhtml.bw-js #bwl .bw-rv.bw-in{opacity:1;transform:none}\nhtml.bw-js #bwl .bw-tickets.bw-rv .bw-ticket{opacity:0;transition:transform .45s var(--ease),opacity .6s ease}\nhtml.bw-js #bwl .bw-tickets.bw-rv.bw-in .bw-ticket{opacity:1;transition-delay:calc((var(--d) + 4.5) * 60ms),calc((var(--d) + 4.5) * 60ms)}\nhtml.bw-js #bwl .bw-tickets.bw-rv.bw-in .bw-ticket:hover{transition-delay:0s}\n#bwl [data-only=\"ended\"],#bwl [data-only=\"upcoming\"]{display:none}\nhtml[data-state=\"ended\"] #bwl [data-only=\"ended\"]{display:revert}\nhtml[data-state=\"upcoming\"] #bwl [data-only=\"upcoming\"]{display:revert}\nhtml[data-state=\"ended\"] #bwl [data-hide=\"ended\"]{display:none!important}\nhtml[data-state=\"ended\"] #bwl .bw-cd{display:none}\nhtml[data-state=\"ended\"] #bwl .bw-cd-ended{display:block}\n#bwl .bw-bloom{position:absolute;left:6%;right:6%;top:16%;bottom:-6%;pointer-events:none;background:radial-gradient(42% 44% at 50% 64%,rgba(255,176,100,.6),rgba(255,122,26,.2) 45%,transparent 72%);opacity:0;transition:opacity 1.6s ease .4s}\n#bwl .bw-is-open .bw-bloom{opacity:.75}\n#bwl .bw-hero.bw-is-entering .bw-bloom{opacity:1;transition-delay:0s}\n#bwl .bw-is-unlatch .bw-rim{opacity:1;filter:brightness(1.8) saturate(1.2);transition:opacity .15s,filter .15s}\n#bwl .bw-is-open .bw-rim{opacity:0;filter:none;transition:opacity 1.2s,filter 1.2s}\n#bwl .bw-is-unlatch .bw-scene{animation:shake .34s linear}\n@keyframes shake{0%,100%{transform:translateX(-50%)}20%{transform:translate(calc(-50% - 2px),1px)}40%{transform:translate(calc(-50% + 2px),-1px)}60%{transform:translate(calc(-50% - 1px),0)}80%{transform:translate(calc(-50% + 1px),1px)}}\n#bwl .bw-scene{transform-origin:50% 64%;transition:transform 2.6s cubic-bezier(.3,.1,.2,1)}\n#bwl .bw-is-open .bw-scene{transform:translateX(-50%) scale(1.045)}\n#bwl .bw-snd{position:relative;width:42px;height:42px;display:grid;place-items:center;border-radius:50%;border:1px solid var(--line2);background:rgba(255,255,255,.02);color:var(--soft);transition:color .2s,border-color .2s,background .2s}\n#bwl .bw-snd:hover{color:#fff;border-color:rgba(200,215,255,.35)}\n#bwl .bw-snd .bw-off{display:none}\n#bwl .bw-snd[aria-pressed=\"false\"] .bw-on{display:none}\n#bwl .bw-snd[aria-pressed=\"false\"] .bw-off{display:block}\n#bwl .bw-snd[aria-pressed=\"true\"]::after{content:\"\";position:absolute;inset:-1px;border-radius:50%;border:1px solid rgba(255,150,70,.45);opacity:0;animation:sndping 2.4s ease-out 1s 2}\n@keyframes sndping{0%{opacity:.9;transform:scale(1)}100%{opacity:0;transform:scale(1.45)}}\n#bwl .bw-gate-only{display:none!important}\nhtml.bw-is-gated,html.bw-is-gated body{overflow:hidden}\nhtml.bw-is-gated #bwl .bw-gate-only{display:inline-flex!important}\nhtml.bw-is-gated #bwl .bw-nav{position:fixed;z-index:60;transition:opacity .6s ease}\nhtml.bw-is-gated #bwl .bw-hero{position:fixed;inset:0;z-index:50;height:100%;min-height:0;padding:74px 0 18px;align-items:stretch}\nhtml.bw-is-gated #bwl .bw-hero-grid{height:100%;grid-template-columns:minmax(0,1fr);grid-template-rows:auto minmax(0,1fr) auto;grid-template-areas:\"copy\" \"stage\" \"act\";row-gap:14px;text-align:center}\nhtml.bw-is-gated #bwl .bw-hero-copy,html.bw-is-gated #bwl .bw-hero-act{max-width:780px;margin-inline:auto;align-self:auto}\nhtml.bw-is-gated #bwl .bw-hero-act{padding-top:0}\nhtml.bw-is-gated #bwl .bw-hero h1{margin-top:12px;font-size:clamp(28px,3vw,42px)}\nhtml.bw-is-gated #bwl .bw-hero-sub{margin-top:8px}\nhtml.bw-is-gated #bwl .bw-hero-stage{height:auto;min-height:0;margin:0;align-self:stretch;transform-origin:var(--ox,50%) var(--oy,60%);will-change:transform}\nhtml.bw-is-gated #bwl .bw-int-txt{display:none}\n#bwl .bw-hero.bw-is-entering .bw-fog{opacity:0;transition:opacity .6s}\nhtml.bw-is-gated #bwl .bw-hero-ctas{justify-content:center;margin-top:2px}\nhtml.bw-is-gated #bwl .bw-offer-strip,html.bw-is-gated #bwl .bw-scroll-cue,html.bw-is-gated #bwl [data-skip-offer],html.bw-is-gated #bwl .bw-hero-ctas [data-after]{display:none!important}\n#bwl .bw-gate-hint{justify-content:center;align-items:center;gap:8px;width:100%;margin-top:6px;font-size:12px;letter-spacing:.06em;color:var(--mut)}\n#bwl .bw-hero-copy,#bwl .bw-hero-act{transition:opacity .6s ease}\n#bwl .bw-hero.bw-is-entering .bw-hero-copy,#bwl .bw-hero.bw-is-entering .bw-hero-act,#bwl .bw-nav.bw-is-entering{opacity:0}\n#bwl .bw-hero.bw-is-entering .bw-hero-stage{transform:scale(var(--zoom,1.9));transition:transform 1.4s cubic-bezier(.55,0,.35,1)}\n#bwl .bw-hero.bw-is-entering .bw-embers{display:none}\n#bwl .bw-snap,#bwl .bw-snap *{transition:none!important}\n#bwl .bw-flash{position:fixed;inset:0;z-index:80;pointer-events:none;overflow:hidden;opacity:0;visibility:hidden;will-change:opacity}\nhtml.bw-is-gated #bwl .bw-flash{visibility:visible}\n#bwl .bw-flash.bw-is-on{opacity:1;visibility:visible;transition:opacity .4s ease .15s}\n#bwl .bw-flash.bw-is-out{opacity:0;visibility:visible;transition:opacity 1.15s cubic-bezier(.25,.6,.3,1)}\n#bwl .bw-flash-core{position:absolute;left:var(--fx,50%);top:var(--fy,60%);width:100vmax;height:100vmax;margin:-50vmax 0 0 -50vmax;border-radius:50%;background:radial-gradient(closest-side,#fff7ea 0%,#ffd8a0 14%,#ffa04a 34%,#e2620f 60%,rgba(150,48,10,.92) 80%,rgba(60,18,5,0) 100%);transform:scale(.12);will-change:transform}\n#bwl .bw-flash.bw-is-on .bw-flash-core{transform:scale(3.4);transition:transform 1.25s cubic-bezier(.7,0,.3,1) .05s}\n#bwl .bw-flash.bw-is-out .bw-flash-core{transform:scale(3.4)}\n#bwl .bw-reveal-sec.bw-pre-enter .bw-mega,#bwl .bw-reveal-sec.bw-pre-enter .bw-sec-head,#bwl .bw-reveal-sec.bw-pre-enter .bw-mega-sub{opacity:0}\n#bwl .bw-reveal-sec.bw-just-entered .bw-mega{animation:megaIn 1.6s cubic-bezier(.16,.8,.24,1) both;will-change:transform,opacity}\n#bwl .bw-reveal-sec.bw-just-entered .bw-sec-head{animation:fadeUp 1.1s var(--ease) .45s both}\n#bwl .bw-reveal-sec.bw-just-entered .bw-mega-sub{animation:fadeUp 1.1s var(--ease) .7s both}\n@keyframes megaIn{from{opacity:0;transform:scale(1.18)}to{opacity:1;transform:none}}\n@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}\n@media (max-width:1080px){\n#bwl .bw-hero-grid{column-gap:28px}\n#bwl .bw-ticket{width:104px;margin-left:-30px}\n#bwl .bw-tickets{margin-left:30px}\n#bwl .bw-t-amt{font-size:25px}\n}\n@media (max-width:900px){\n#bwl .bw-hero{min-height:0;padding:112px 0 72px}\n#bwl .bw-hero-grid{grid-template-columns:minmax(0,1fr);grid-template-rows:none;grid-template-areas:\"copy\" \"stage\" \"act\";text-align:center;row-gap:8px}\n#bwl .bw-hero-act{padding-top:8px}\n#bwl .bw-hero-copy,#bwl .bw-hero-act{max-width:640px;margin-inline:auto}\n#bwl .bw-hero-ctas,#bwl .bw-offer-strip{justify-content:center}\n#bwl .bw-hero-stage{height:clamp(340px,56vh,500px);min-height:0;margin:8px 0 0}\n#bwl .bw-scroll-cue{display:none}\nhtml.bw-is-gated #bwl .bw-hero{padding:78px 0 20px}\n#bwl .bw-claim{grid-template-columns:minmax(0,1fr);gap:32px}\n#bwl .bw-coupon{max-width:520px;width:100%;justify-self:center}\n#bwl .bw-steps{grid-template-columns:minmax(0,1fr);gap:30px;margin-top:44px;text-align:left;max-width:560px;margin-inline:auto}\n#bwl .bw-steps::before{top:40px;bottom:40px;left:40px;right:auto;width:1px;height:auto;background:linear-gradient(180deg,rgba(255,150,70,.6),rgba(59,108,255,.6),rgba(255,150,70,.6))}\n#bwl .bw-step{display:grid;grid-template-columns:80px minmax(0,1fr);column-gap:22px;align-items:center}\n#bwl .bw-step-node{grid-row:span 2}\n#bwl .bw-step h3{margin-top:0;align-self:end}\n#bwl .bw-step p{margin-top:6px;align-self:start;max-width:none}\n#bwl .bw-faq-grid{grid-template-columns:1fr;gap:28px}\n}\n@media (max-width:640px){\n#bwl .bw-wrap{width:calc(100% - 32px)}\n#bwl .bw-nav{padding:14px 0}\n#bwl .bw-logo img{height:24px}\n#bwl .bw-nav .bw-btn-sm{padding:0 14px;font-size:13px}\n#bwl .bw-hero{padding-top:96px}\n#bwl .bw-hero h1{margin-top:16px;font-size:clamp(30px,8.4vw,36px)}\n#bwl .bw-hero-sub{margin-top:12px}\n#bwl .bw-hero-stage{height:clamp(280px,44vh,400px)}\n#bwl .bw-hero-ctas{flex-direction:column;align-items:stretch;gap:4px;margin-top:22px}\n#bwl .bw-hero-ctas .bw-btn{width:100%}\n#bwl .bw-hero-ctas .bw-link{justify-content:center}\n#bwl .bw-offer-strip{margin-top:18px;gap:8px}\n#bwl .bw-offer-strip li{width:100%;justify-content:center;font-size:13px;padding:10px 12px}\n#bwl .bw-tickets{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;margin:0;padding:36px 0 18px}\n#bwl .bw-ticket{width:auto;margin:0;transform:none!important}\n#bwl .bw-t-in{padding:10px 4px 8px;border-radius:9px;-webkit-mask:none;mask:none}\n#bwl .bw-t-in::after,#bwl .bw-t-lbl,#bwl .bw-t-stub{display:none}\n#bwl .bw-t-no{font-size:8px;letter-spacing:.1em}\n#bwl .bw-t-amt{font-size:clamp(14px,4.3vw,18px);margin-bottom:auto}\n#bwl .bw-mega{gap:.04em}\n#bwl .bw-code-row{flex-direction:column;align-items:stretch;text-align:center;padding:16px}\n#bwl .bw-coupon-main{padding:20px 18px 16px}\n#bwl .bw-coupon-foot{padding:16px 18px 20px}\n#bwl .bw-claim-list li{font-size:14px}\n#bwl .bw-steps::before{left:32px;top:32px;bottom:32px}\n#bwl .bw-step{grid-template-columns:64px minmax(0,1fr);column-gap:18px}\n#bwl .bw-step-node{width:64px;height:64px;box-shadow:0 0 0 8px #04060b,0 0 36px -6px rgba(255,122,26,.5)}\n#bwl .bw-step-node svg{width:24px;height:24px}\n#bwl .bw-step-n{right:-10px;font-size:10px}\n#bwl .bw-step h3{font-size:19px}\n#bwl .bw-cd{gap:8px}\n#bwl .bw-cd-u{padding:16px 4px 14px;border-radius:14px}\n#bwl .bw-cd-l{font-size:9.5px;letter-spacing:.12em}\n#bwl .bw-acc-btn{font-size:16px;padding:18px 2px}\n#bwl .bw-acc-panel p{padding-right:8px}\n#bwl .bw-bar{padding:8px 8px 8px 14px;gap:8px}\n#bwl .bw-bar-txt{display:none}\n#bwl .bw-bar-code{flex:1 1 auto;justify-content:center}\n#bwl .bw-bar .bw-btn{padding:0 14px}\n#bwl .bw-nav-r .bw-btn-sm{display:none}\nhtml.bw-is-gated #bwl .bw-hero-ctas .bw-btn{width:100%}\n}\n@media (prefers-reduced-motion:reduce){\nhtml{scroll-behavior:auto}\n#bwl *,#bwl *::before,#bwl *::after{animation:none!important;transition-duration:.01ms!important;transition-delay:0s!important}\nhtml.bw-js #bwl .bw-rv{opacity:1;transform:none}\nhtml.bw-js #bwl .bw-tickets.bw-rv .bw-ticket{opacity:1}\n#bwl .bw-int-txt{filter:none}\n}";
var HTML = "<div id=\"bwl\">\n<a class=\"bw-skip\" href=\"#main\">Skip to content</a>\n<header class=\"bw-nav\">\n<div class=\"bw-wrap\">\n<a class=\"bw-logo\" href=\"https://www.prime.bullwaves.com/\" aria-label=\"Bullwaves Prime home\">\n<img src=\"https://cdn.prod.website-files.com/66f2e0fef32885327272def5/69849dceac3104a2fd34ffaf_Group%201410103699%2012.png\" alt=\"Bullwaves Prime\" height=\"30\" decoding=\"async\" data-logo>\n</a>\n<div class=\"bw-nav-r\">\n<button class=\"bw-snd\" type=\"button\" data-sound aria-pressed=\"true\" aria-label=\"Sound effects\">\n<svg class=\"bw-on\" viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" aria-hidden=\"true\"><path d=\"M4 9.5h3.5L12 5.5v13l-4.5-4H4z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linejoin=\"round\"/><path d=\"M15.5 9a4.2 4.2 0 0 1 0 6M18 6.5a7.8 7.8 0 0 1 0 11\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\"/></svg>\n<svg class=\"bw-off\" viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" aria-hidden=\"true\"><path d=\"M4 9.5h3.5L12 5.5v13l-4.5-4H4z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linejoin=\"round\"/><path d=\"M16 9.5l5 5M21 9.5l-5 5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\"/></svg>\n</button>\n<a class=\"bw-btn bw-btn-ghost bw-btn-sm\" data-href=\"challengeUrl\" href=\"https://checkout.bullwaves.com/checkout/\">Choose Your Challenge</a>\n</div>\n</div>\n</header>\n<main id=\"main\">\n<section class=\"bw-hero\" id=\"top\" aria-labelledby=\"hero-title\">\n<div class=\"bw-hero-bg\" aria-hidden=\"true\"></div>\n<div class=\"bw-hero-warm\" aria-hidden=\"true\"></div>\n<div class=\"bw-wrap bw-hero-grid\">\n<div class=\"bw-hero-copy\">\n<p class=\"bw-chip\"><i aria-hidden=\"true\"></i><span data-hide=\"ended\">Halloween 2026 <span aria-hidden=\"true\">&middot;</span> <span data-bind=\"dateLabel\">Oct 23 to 31</span></span><span data-only=\"ended\">Halloween 2026 <span aria-hidden=\"true\">&middot;</span> Promotion ended</span></p>\n<h1 id=\"hero-title\">This Halloween, Something Big Is Behind The Door.</h1>\n<p class=\"bw-hero-sub\">No Tricks. <em>Just Funding.</em></p>\n</div>\n<div class=\"bw-hero-stage\">\n<div class=\"bw-scene\" data-scene aria-hidden=\"true\">\n<div data-frame></div>\n<div class=\"bw-portal\" data-portal>\n<div class=\"bw-int\">\n<div class=\"bw-rays\"></div>\n<div class=\"bw-int-txt\">\n<div data-hide=\"ended\"><b>35%</b><span>OFF</span></div>\n<div data-only=\"ended\"><span>THANK YOU</span><small>See you next season</small></div>\n</div>\n</div>\n<div class=\"bw-leaf bw-leaf-l\" data-leaf=\"l\"><i class=\"bw-edge\"></i><i class=\"bw-shade\"></i></div>\n<div class=\"bw-leaf bw-leaf-r\" data-leaf=\"r\"><i class=\"bw-edge\"></i><i class=\"bw-shade\"></i></div>\n</div>\n<div class=\"bw-rim\" data-rim></div>\n<div class=\"bw-bloom\"></div>\n<canvas class=\"bw-embers\" data-embers></canvas>\n<button class=\"bw-doorhit\" type=\"button\" tabindex=\"-1\" aria-hidden=\"true\" data-unlock></button>\n</div>\n</div>\n<div class=\"bw-hero-act\">\n<div class=\"bw-hero-ctas\">\n<button class=\"bw-btn bw-btn-primary\" type=\"button\" data-unlock data-tease data-before aria-controls=\"reveal\">\n<svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" aria-hidden=\"true\"><circle cx=\"8\" cy=\"12\" r=\"4\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\"/><path d=\"M12 12h9M18 12v3M21 12v2\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\"/></svg>\nUnlock Your Treat\n</button>\n<a class=\"bw-link\" href=\"#reveal\" data-before data-skip-offer>Skip to the offer</a>\n<button class=\"bw-link bw-gate-only\" type=\"button\" data-skip-gate>Skip intro</button>\n<a class=\"bw-btn bw-btn-primary\" href=\"#reveal\" data-after>\nReveal Your Treat\n<svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" aria-hidden=\"true\"><path d=\"M12 5v14M6 13l6 6 6-6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>\n</a>\n<button class=\"bw-link\" type=\"button\" data-replay data-after>\n<svg viewBox=\"0 0 24 24\" width=\"16\" height=\"16\" aria-hidden=\"true\"><path d=\"M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>\nClose the door\n</button>\n</div>\n<ul class=\"bw-offer-strip\" aria-label=\"Halloween offer\">\n<li><strong>35% OFF</strong> All Challenges, unlimited purchases</li>\n<li><strong>Auto entry</strong> 10 &times; $50K Accounts Giveaway</li>\n</ul>\n<p class=\"bw-gate-hint bw-gate-only\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" width=\"14\" height=\"14\"><path d=\"M4 9.5h3.5L12 5.5v13l-4.5-4H4z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linejoin=\"round\"/><path d=\"M15.5 9a4.2 4.2 0 0 1 0 6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\"/></svg>Best experienced with sound on</p>\n<p class=\"bw-sr\" role=\"status\" aria-live=\"polite\" data-door-status></p>\n</div>\n</div>\n<div class=\"bw-fog\" aria-hidden=\"true\"></div>\n<div class=\"bw-fog bw-f2\" aria-hidden=\"true\"></div>\n<a class=\"bw-scroll-cue\" href=\"#reveal\" aria-label=\"Scroll to the offer\">Scroll</a>\n</section>\n<section class=\"bw-sec bw-reveal-sec bw-center\" id=\"reveal\" aria-labelledby=\"reveal-title\" tabindex=\"-1\">\n<div class=\"bw-wrap\">\n<div class=\"bw-sec-head bw-rv\">\n<p class=\"bw-eyebrow\"><i aria-hidden=\"true\"></i>The Big Reveal</p>\n<h2 class=\"bw-h2\" id=\"reveal-title\">No Tricks. Just Funding.</h2>\n</div>\n<p class=\"bw-mega bw-rv\" aria-label=\"35% off\"><span class=\"bw-mega-n\" aria-hidden=\"true\">35%</span><span class=\"bw-mega-off\" aria-hidden=\"true\">OFF</span></p>\n<p class=\"bw-mega-sub bw-rv\">All Bullwaves Prime Challenge Accounts. Unlimited purchases.</p>\n<div class=\"bw-divider\" aria-hidden=\"true\"></div>\n<div class=\"bw-give-head bw-rv\">\n<h3>10 Lucky Traders. <span>10 &times; $50K Challenges.</span></h3>\n</div>\n<ul class=\"bw-tickets bw-rv\" aria-label=\"Ten $50K Challenge Account prizes\">\n<li class=\"bw-ticket\" style=\"--d:-4.5\"><div class=\"bw-t-in\"><span class=\"bw-t-no\">NO. 01</span><span class=\"bw-t-amt\">$50K</span><span class=\"bw-t-lbl\">Challenge Account</span><span class=\"bw-t-stub\">Halloween 2026</span></div></li>\n<li class=\"bw-ticket\" style=\"--d:-3.5\"><div class=\"bw-t-in\"><span class=\"bw-t-no\">NO. 02</span><span class=\"bw-t-amt\">$50K</span><span class=\"bw-t-lbl\">Challenge Account</span><span class=\"bw-t-stub\">Halloween 2026</span></div></li>\n<li class=\"bw-ticket\" style=\"--d:-2.5\"><div class=\"bw-t-in\"><span class=\"bw-t-no\">NO. 03</span><span class=\"bw-t-amt\">$50K</span><span class=\"bw-t-lbl\">Challenge Account</span><span class=\"bw-t-stub\">Halloween 2026</span></div></li>\n<li class=\"bw-ticket\" style=\"--d:-1.5\"><div class=\"bw-t-in\"><span class=\"bw-t-no\">NO. 04</span><span class=\"bw-t-amt\">$50K</span><span class=\"bw-t-lbl\">Challenge Account</span><span class=\"bw-t-stub\">Halloween 2026</span></div></li>\n<li class=\"bw-ticket\" style=\"--d:-0.5\"><div class=\"bw-t-in\"><span class=\"bw-t-no\">NO. 05</span><span class=\"bw-t-amt\">$50K</span><span class=\"bw-t-lbl\">Challenge Account</span><span class=\"bw-t-stub\">Halloween 2026</span></div></li>\n<li class=\"bw-ticket\" style=\"--d:0.5\"><div class=\"bw-t-in\"><span class=\"bw-t-no\">NO. 06</span><span class=\"bw-t-amt\">$50K</span><span class=\"bw-t-lbl\">Challenge Account</span><span class=\"bw-t-stub\">Halloween 2026</span></div></li>\n<li class=\"bw-ticket\" style=\"--d:1.5\"><div class=\"bw-t-in\"><span class=\"bw-t-no\">NO. 07</span><span class=\"bw-t-amt\">$50K</span><span class=\"bw-t-lbl\">Challenge Account</span><span class=\"bw-t-stub\">Halloween 2026</span></div></li>\n<li class=\"bw-ticket\" style=\"--d:2.5\"><div class=\"bw-t-in\"><span class=\"bw-t-no\">NO. 08</span><span class=\"bw-t-amt\">$50K</span><span class=\"bw-t-lbl\">Challenge Account</span><span class=\"bw-t-stub\">Halloween 2026</span></div></li>\n<li class=\"bw-ticket\" style=\"--d:3.5\"><div class=\"bw-t-in\"><span class=\"bw-t-no\">NO. 09</span><span class=\"bw-t-amt\">$50K</span><span class=\"bw-t-lbl\">Challenge Account</span><span class=\"bw-t-stub\">Halloween 2026</span></div></li>\n<li class=\"bw-ticket\" style=\"--d:4.5\"><div class=\"bw-t-in\"><span class=\"bw-t-no\">NO. 10</span><span class=\"bw-t-amt\">$50K</span><span class=\"bw-t-lbl\">Challenge Account</span><span class=\"bw-t-stub\">Halloween 2026</span></div></li>\n</ul>\n<p class=\"bw-prize-note bw-rv\"><strong>Each prize is one $50K Bullwaves Prime Challenge Account.</strong> Prizes are Challenge Accounts, not cash, and are not withdrawable capital.</p>\n</div>\n</section>\n<section class=\"bw-sec\" id=\"claim\" aria-labelledby=\"claim-title\" style=\"padding-top:0\">\n<div class=\"bw-wrap\">\n<div class=\"bw-claim bw-rv\">\n<div class=\"bw-claim-copy\">\n<p class=\"bw-eyebrow\"><i aria-hidden=\"true\"></i>Claim Your Treat</p>\n<h2 class=\"bw-h2\" id=\"claim-title\">Your Halloween Treat Is Ready.</h2>\n<p class=\"bw-lede\" data-hide=\"ended\">Copy your code, pick any Challenge Account and enter the code at checkout to get 35% off. There is no limit: use it on as many Challenges as you like.</p>\n<p class=\"bw-lede\" data-only=\"ended\">The Halloween promotion has ended and this code is no longer valid. Challenge Accounts remain available at standard pricing.</p>\n<ul class=\"bw-claim-list\" data-hide=\"ended\">\n<li><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 12.5l4.5 4.5L19 7.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg><span>35% off every Challenge, unlimited purchases</span></li>\n<li><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 12.5l4.5 4.5L19 7.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg><span>Every purchase with <strong data-bind=\"giveawayCode\">NOTRICKS35</strong> automatically enters the 10 &times; $50K giveaway</span></li>\n<li><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 12.5l4.5 4.5L19 7.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg><span>Valid <span data-bind=\"dateLabel\">Oct 23 to 31</span> only</span></li>\n</ul>\n</div>\n<div class=\"bw-coupon\">\n<div class=\"bw-coupon-main\">\n<div class=\"bw-coupon-top\"><p class=\"bw-coupon-lbl\" id=\"code-lbl\">Halloween promo code</p><span class=\"bw-coupon-stamp\">35% OFF</span></div>\n<div class=\"bw-code-row\">\n<span class=\"bw-code\" data-bind=\"promoCode\" aria-labelledby=\"code-lbl\">NOTRICKS35</span>\n<button class=\"bw-copy\" type=\"button\" data-copy>\n<svg class=\"bw-cp\" viewBox=\"0 0 24 24\" width=\"16\" height=\"16\" aria-hidden=\"true\"><rect x=\"8\" y=\"8\" width=\"12\" height=\"12\" rx=\"2.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\"/><path d=\"M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\"/></svg>\n<svg class=\"bw-ok\" viewBox=\"0 0 24 24\" width=\"16\" height=\"16\" aria-hidden=\"true\"><path d=\"M5 12.5l4.5 4.5L19 7.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>\n<span data-copy-lbl>Copy Code</span>\n</button>\n</div>\n</div>\n<div class=\"bw-coupon-tear\" aria-hidden=\"true\"><i></i><i></i></div>\n<div class=\"bw-coupon-foot\">\n<a class=\"bw-btn bw-btn-primary\" data-href=\"challengeUrl\" href=\"https://checkout.bullwaves.com/checkout/\" data-cta=\"claim\">\n<span data-hide=\"ended\">Choose Your Challenge</span><span data-only=\"ended\">View Challenges</span>\n<svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" aria-hidden=\"true\"><path d=\"M5 12h14M13 6l6 6-6 6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>\n</a>\n<p class=\"bw-code-note\" data-hide=\"ended\">Enter the code at checkout. The discount is not applied automatically.</p>\n<p class=\"bw-code-note\" data-only=\"upcoming\">The code is valid from <span data-bind=\"startText\">October 23, 2026</span>.</p>\n<p class=\"bw-sr\" role=\"status\" aria-live=\"polite\" data-copy-status></p>\n</div>\n</div>\n</div>\n</div>\n</section>\n<section class=\"bw-sec bw-center\" id=\"giveaway\" aria-labelledby=\"enter-title\" style=\"padding-top:0\">\n<div class=\"bw-wrap\">\n<div class=\"bw-sec-head bw-rv\">\n<p class=\"bw-eyebrow\"><i aria-hidden=\"true\"></i>$50K Giveaway</p>\n<h2 class=\"bw-h2\" id=\"enter-title\">How to Enter the Giveaway</h2>\n</div>\n<ol class=\"bw-steps\">\n<li class=\"bw-step bw-rv\">\n<div class=\"bw-step-node\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\"><rect x=\"4\" y=\"4\" width=\"7\" height=\"7\" rx=\"1.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\"/><rect x=\"13\" y=\"4\" width=\"7\" height=\"7\" rx=\"1.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\"/><rect x=\"4\" y=\"13\" width=\"7\" height=\"7\" rx=\"1.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\"/><rect x=\"13\" y=\"13\" width=\"7\" height=\"7\" rx=\"1.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\"/></svg><span class=\"bw-step-n\">01</span></div>\n<h3>Choose Your Challenge.</h3>\n<p>Select your preferred Bullwaves Prime Challenge Account.</p>\n</li>\n<li class=\"bw-step bw-rv\">\n<div class=\"bw-step-node\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\"><path d=\"M3.5 12.6V5.5a2 2 0 0 1 2-2h7.1a2 2 0 0 1 1.4.6l6.4 6.4a2 2 0 0 1 0 2.8l-7.1 7.1a2 2 0 0 1-2.8 0l-6.4-6.4a2 2 0 0 1-.6-1.4z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\"/><circle cx=\"8.5\" cy=\"8.5\" r=\"1.5\" fill=\"currentColor\"/></svg><span class=\"bw-step-n\">02</span></div>\n<h3>Use the Halloween Code.</h3>\n<p>Apply the eligible promotional code <strong data-bind=\"giveawayCode\">NOTRICKS35</strong> during checkout.</p>\n</li>\n<li class=\"bw-step bw-rv\">\n<div class=\"bw-step-node\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"8.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\"/><path d=\"M8 12.3l2.7 2.7L16.2 9.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg><span class=\"bw-step-n\">03</span></div>\n<h3>You&rsquo;re In.</h3>\n<p>Every purchase made with the code automatically enters the draw for one of ten $50K Challenge Accounts. Unlimited purchases allowed.</p>\n</li>\n</ol>\n</div>\n</section>\n<section class=\"bw-sec\" id=\"countdown\" aria-labelledby=\"cd-title\" style=\"padding-top:0\">\n<div class=\"bw-wrap\">\n<div class=\"bw-cd-card bw-rv\">\n<p class=\"bw-eyebrow\"><i aria-hidden=\"true\"></i><span data-cd-eyebrow>Limited Time</span></p>\n<h2 class=\"bw-h2\" id=\"cd-title\" style=\"margin-top:14px\" data-cd-title>The Doors Close Soon.</h2>\n<div class=\"bw-cd\" role=\"timer\" aria-labelledby=\"cd-title\" aria-describedby=\"cd-deadline\">\n<div class=\"bw-cd-u\"><span class=\"bw-cd-v\" data-cd=\"d\">00</span><span class=\"bw-cd-l\">Days</span></div>\n<div class=\"bw-cd-u\"><span class=\"bw-cd-v\" data-cd=\"h\">00</span><span class=\"bw-cd-l\">Hours</span></div>\n<div class=\"bw-cd-u\"><span class=\"bw-cd-v\" data-cd=\"m\">00</span><span class=\"bw-cd-l\">Minutes</span></div>\n<div class=\"bw-cd-u\"><span class=\"bw-cd-v\" data-cd=\"s\">00</span><span class=\"bw-cd-l\">Seconds</span></div>\n</div>\n<p class=\"bw-cd-deadline\" id=\"cd-deadline\" data-hide=\"ended\" data-cd-deadline>Offer ends October 31, 2026.</p>\n<p class=\"bw-cd-ended\">The Bullwaves Prime Halloween promotion has ended. Thank you to every trader who took part. Giveaway winners will be contacted as set out in the official giveaway rules.</p>\n</div>\n</div>\n</section>\n<section class=\"bw-sec bw-faq\" id=\"faq\" aria-labelledby=\"faq-title\" style=\"padding-top:0\">\n<div class=\"bw-wrap bw-faq-grid\">\n<div class=\"bw-sec-head bw-rv\">\n<p class=\"bw-eyebrow\"><i aria-hidden=\"true\"></i>FAQ</p>\n<h2 class=\"bw-h2\" id=\"faq-title\">Good Questions. Straight Answers.</h2>\n<p class=\"bw-lede\" style=\"max-width:380px\">Everything you need to know about the Halloween offer and the $50K giveaway.</p>\n</div>\n<div class=\"bw-rv\">\n<div class=\"bw-acc\" data-acc>\n<div class=\"bw-acc-item\">\n<h3><button class=\"bw-acc-btn\" type=\"button\" aria-expanded=\"false\" aria-controls=\"faq-1\" id=\"faq-b1\">How do I get 35% off?<span class=\"bw-acc-ic\" aria-hidden=\"true\"></span></button></h3>\n<div class=\"bw-acc-panel\" id=\"faq-1\" role=\"region\" aria-labelledby=\"faq-b1\"><div><p>Choose any Bullwaves Prime Challenge Account and enter <code data-bind=\"promoCode\">NOTRICKS35</code> at checkout during the promotion period, <span data-bind=\"periodText\">October 23 to October 31, 2026</span>. The discount is not applied automatically, so make sure the code is entered before you complete your purchase. There is no limit on purchases: the code works on every Challenge you buy during the promotion.</p></div></div>\n</div>\n<div class=\"bw-acc-item\">\n<h3><button class=\"bw-acc-btn\" type=\"button\" aria-expanded=\"false\" aria-controls=\"faq-6\" id=\"faq-b6\">Is there a limit on how many Challenges I can buy?<span class=\"bw-acc-ic\" aria-hidden=\"true\"></span></button></h3>\n<div class=\"bw-acc-panel\" id=\"faq-6\" role=\"region\" aria-labelledby=\"faq-b6\"><div><p>No. Purchases are unlimited during the promotion. Every Challenge you buy with <code data-bind=\"promoCode\">NOTRICKS35</code> gets 35% off and is automatically entered into the $50K giveaway.</p></div></div>\n</div>\n<div class=\"bw-acc-item\">\n<h3><button class=\"bw-acc-btn\" type=\"button\" aria-expanded=\"false\" aria-controls=\"faq-2\" id=\"faq-b2\">How do I enter the $50K giveaway?<span class=\"bw-acc-ic\" aria-hidden=\"true\"></span></button></h3>\n<div class=\"bw-acc-panel\" id=\"faq-2\" role=\"region\" aria-labelledby=\"faq-b2\"><div><p>Just use the code <code data-bind=\"giveawayCode\">NOTRICKS35</code> at checkout during the promotion period. Every purchase made with the code is automatically entered into the draw, with no extra steps, subject to the official giveaway rules.</p></div></div>\n</div>\n<div class=\"bw-acc-item\">\n<h3><button class=\"bw-acc-btn\" type=\"button\" aria-expanded=\"false\" aria-controls=\"faq-3\" id=\"faq-b3\">How many winners will be selected?<span class=\"bw-acc-ic\" aria-hidden=\"true\"></span></button></h3>\n<div class=\"bw-acc-panel\" id=\"faq-3\" role=\"region\" aria-labelledby=\"faq-b3\"><div><p>Ten winners will be selected. Each winner receives one $50K Bullwaves Prime Challenge Account. Prizes are Challenge Accounts, not cash, and are not withdrawable capital. <span data-bind=\"drawText\">The draw date and how winners are notified are set out in the official giveaway rules.</span></p></div></div>\n</div>\n<div class=\"bw-acc-item\">\n<h3><button class=\"bw-acc-btn\" type=\"button\" aria-expanded=\"false\" aria-controls=\"faq-4\" id=\"faq-b4\">When does the Halloween promotion end?<span class=\"bw-acc-ic\" aria-hidden=\"true\"></span></button></h3>\n<div class=\"bw-acc-panel\" id=\"faq-4\" role=\"region\" aria-labelledby=\"faq-b4\"><div><p>The promotion ends on <span data-bind=\"endText\">October 31, 2026</span>. Only purchases completed within the promotion period qualify for the discount and the giveaway.</p></div></div>\n</div>\n<div class=\"bw-acc-item\">\n<h3><button class=\"bw-acc-btn\" type=\"button\" aria-expanded=\"false\" aria-controls=\"faq-5\" id=\"faq-b5\">Are all Challenge Accounts eligible?<span class=\"bw-acc-ic\" aria-hidden=\"true\"></span></button></h3>\n<div class=\"bw-acc-panel\" id=\"faq-5\" role=\"region\" aria-labelledby=\"faq-b5\"><div><p>Yes. The 35% discount applies to all Bullwaves Prime Challenge Accounts. <span data-bind=\"eligText\">Eligibility requirements and any regional restrictions are set out in the promotional terms.</span></p></div></div>\n</div>\n</div>\n<p class=\"bw-terms\">This promotion is subject to the <a data-href=\"termsUrl\" href=\"https://www.prime.bullwaves.com/legal\" target=\"_blank\" rel=\"noopener\">Promotional Terms</a> and the <a data-href=\"rulesUrl\" href=\"https://www.prime.bullwaves.com/legal\" target=\"_blank\" rel=\"noopener\">Giveaway Rules</a>. Please read them before purchasing.</p>\n</div>\n</div>\n</section>\n</main>\n<div class=\"bw-flash\" data-flash aria-hidden=\"true\"><div class=\"bw-flash-core\"></div></div>\n<div class=\"bw-bar\" data-bar data-hide=\"ended\" aria-label=\"Halloween offer shortcut\" role=\"region\">\n<p class=\"bw-bar-txt\"><strong>35% OFF</strong> all Challenges, unlimited purchases</p>\n<button class=\"bw-bar-code\" type=\"button\" data-copy aria-label=\"Copy promo code NOTRICKS35\"><span data-bind=\"promoCode\">NOTRICKS35</span><svg viewBox=\"0 0 24 24\" width=\"15\" height=\"15\" aria-hidden=\"true\"><rect x=\"8\" y=\"8\" width=\"12\" height=\"12\" rx=\"2.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\"/><path d=\"M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\"/></svg></button>\n<a class=\"bw-btn bw-btn-primary bw-btn-sm\" data-href=\"challengeUrl\" href=\"https://checkout.bullwaves.com/checkout/\" data-cta=\"bar\">Choose Your Challenge</a>\n</div>\n</div>";
if (!document.querySelector('link[href*="family=Inter"]')) {
var pc = document.createElement('link'); pc.rel = 'preconnect'; pc.href = 'https://fonts.gstatic.com'; pc.crossOrigin = ''; document.head.appendChild(pc);
var fl = document.createElement('link'); fl.rel = 'stylesheet'; fl.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap'; document.head.appendChild(fl);
}
var st = document.createElement('style'); st.id = 'bwl-style'; st.textContent = CSS; (document.head || document.documentElement).appendChild(st);
function boot() {
if (document.getElementById('main')) return;
var w = document.createElement('div'); w.innerHTML = HTML;
var frag = document.createDocumentFragment(); while (w.firstChild) frag.appendChild(w.firstChild);
document.body.insertBefore(frag, document.body.firstChild);
run();
}
function run() {
  var CONFIG = {
    promoCode: 'NOTRICKS35',
    giveawayCode: 'NOTRICKS35',
    start: '2026-10-23T00:00:00',
    end: '2026-10-31T23:59:59',
    timezone: 'UTC',
    timezoneLabel: 'UTC',
    showEndTime: true,
    dateLabel: 'Oct 23 to 31',
    drawDate: null,
    winnerNotice: null,
    eligibilityNote: null,
    challengeUrl: 'https://checkout.bullwaves.com/checkout/',
    termsUrl: 'https://www.prime.bullwaves.com/legal',
    rulesUrl: 'https://www.prime.bullwaves.com/legal',
    autoScrollAfterOpen: true,
    gate: true,
    sound: true,
    previewParam: 'bwp_preview'
  };
  var doc = document, html = doc.documentElement;
  var $ = function (s, r) { return (r || doc).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); };
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var track = function (ev, extra) { try { var o = { event: ev, campaign: 'halloween_2026' }; for (var k in extra) o[k] = extra[k]; (window.dataLayer = window.dataLayer || []).push(o); } catch (e) {} };
  function tzOffset(ts, tz) {
    var p = {};
    new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
      .formatToParts(ts).forEach(function (x) { p[x.type] = x.value; });
    return Math.round((Date.UTC(+p.year, p.month - 1, +p.day, +p.hour % 24, +p.minute, +p.second) - ts) / 60000) * 60000;
  }
  function parts(iso) { var m = String(iso).match(/(\d+)-(\d+)-(\d+)T?(\d+)?:?(\d+)?:?(\d+)?/); return m.slice(1).map(function (v) { return +(v || 0); }); }
  function zoned(iso, tz) {
    var p = parts(iso), base = Date.UTC(p[0], p[1] - 1, p[2], p[3], p[4], p[5]), t = base;
    try { for (var i = 0; i < 2; i++) t = base - tzOffset(t, tz); } catch (e) { console.warn('[Halloween] Invalid timezone, using UTC:', tz); t = base; }
    return t;
  }
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  function dayText(iso) { var p = parts(iso); return MONTHS[p[1] - 1] + ' ' + p[2] + ', ' + p[0]; }
  function timeText(iso) { var p = parts(iso); return ('0' + p[3]).slice(-2) + ':' + ('0' + p[4]).slice(-2); }
  var START = zoned(CONFIG.start, CONFIG.timezone), END = zoned(CONFIG.end, CONFIG.timezone);
  var preview = ''; try { preview = new URLSearchParams(location.search).get(CONFIG.previewParam) || ''; } catch (e) {}
  function stateAt(now) { return now < START ? 'upcoming' : now < END ? 'active' : 'ended'; }
  var state = /^(upcoming|active|ended)$/.test(preview) ? preview : stateAt(Date.now());
  function setState(s) { state = s; html.setAttribute('data-state', s); applyState(); }
  var sp = parts(CONFIG.start), ep = parts(CONFIG.end);
  var endText = dayText(CONFIG.end) + (CONFIG.showEndTime ? ' at ' + timeText(CONFIG.end) + ' ' + CONFIG.timezoneLabel : '');
  var periodText = sp[0] === ep[0] ? MONTHS[sp[1] - 1] + ' ' + sp[2] + ' to ' + MONTHS[ep[1] - 1] + ' ' + ep[2] + ', ' + ep[0] : dayText(CONFIG.start) + ' to ' + dayText(CONFIG.end);
  var binds = {
    promoCode: CONFIG.promoCode,
    giveawayCode: CONFIG.giveawayCode,
    dateLabel: CONFIG.dateLabel,
    startText: dayText(CONFIG.start),
    endText: endText,
    periodText: periodText,
    drawText: CONFIG.drawDate ? 'Winners will be drawn on ' + CONFIG.drawDate + '. ' + (CONFIG.winnerNotice || 'Full details are set out in the official giveaway rules.') : (CONFIG.winnerNotice ? CONFIG.winnerNotice + ' ' : '') + 'The draw date and how winners are notified are set out in the official giveaway rules.',
    eligText: CONFIG.eligibilityNote || 'Eligibility requirements and any regional restrictions are set out in the promotional terms.'
  };
  $$('[data-bind]').forEach(function (el) { var k = el.getAttribute('data-bind'); if (binds[k] != null) el.textContent = binds[k]; });
  $$('[data-href]').forEach(function (el) { var k = el.getAttribute('data-href'); if (CONFIG[k]) el.href = CONFIG[k]; });
  $$('.bw-bar-code').forEach(function (b) { b.setAttribute('aria-label', 'Copy promo code ' + CONFIG.promoCode); });
  $('[data-cd-deadline]').textContent = 'Offer ends ' + endText + '.';
  $$('[data-logo]').forEach(function (img) {
    img.addEventListener('error', function () { var s = doc.createElement('span'); s.className = 'bw-logo-fb'; s.textContent = 'Bullwaves Prime'; img.replaceWith(s); });
  });
  var Sound = (function () {
    var ctx = null, master, verb, nb, on = !!CONFIG.sound;
    try { if (localStorage.getItem('bwl_sound') === 'off') on = false; } catch (e) {}
    function init() {
      if (ctx || !on) return ctx;
      var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
      ctx = new AC();
      var comp = ctx.createDynamicsCompressor(); comp.threshold.value = -16; comp.ratio.value = 4;
      master = ctx.createGain(); master.gain.value = .85; master.connect(comp); comp.connect(ctx.destination);
      verb = ctx.createConvolver(); verb.buffer = impulse();
      var vg = ctx.createGain(); vg.gain.value = .4; verb.connect(vg); vg.connect(master);
      return ctx;
    }
    var SR = 44100, pre = null;
    function prepare() {
      if (pre) return pre;
      var il = SR * 2.8 | 0, nl = SR * 2, L = new Float32Array(il), Rr = new Float32Array(il), N = new Float32Array(nl), i, k;
      for (i = 0; i < il; i++) { k = Math.pow(1 - i / il, 2.4); L[i] = (Math.random() * 2 - 1) * k; Rr[i] = (Math.random() * 2 - 1) * k; }
      for (i = 0; i < nl; i++) N[i] = Math.random() * 2 - 1;
      return (pre = { L: L, R: Rr, N: N });
    }
    function impulse() {
      var d = prepare(), b = ctx.createBuffer(2, d.L.length, SR);
      b.copyToChannel(d.L, 0); b.copyToChannel(d.R, 1); return b;
    }
    function noiseBuf() {
      if (nb) return nb;
      var d = prepare(); nb = ctx.createBuffer(1, d.N.length, SR); nb.copyToChannel(d.N, 0);
      return nb;
    }
    if (on) (window.requestIdleCallback || function (f) { setTimeout(f, 1200); })(function () { prepare(); });
    function out(node, wet) { node.connect(master); if (wet) { var g = ctx.createGain(); g.gain.value = wet; node.connect(g); g.connect(verb); } }
    function env(g, t, peak, att, dur) { g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + att); g.gain.exponentialRampToValueAtTime(.0001, t + dur); }
    function noise(t, dur, type, f0, f1, q, peak, wet, att) {
      var s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
      s.buffer = noiseBuf(); s.loop = true; f.type = type; f.Q.value = q;
      f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(f1, t + dur);
      env(g, t, peak, att || dur * .4, dur); s.connect(f); f.connect(g); out(g, wet); s.start(t); s.stop(t + dur + .05);
    }
    function tone(t, type, f0, f1, dur, peak, wet, att) {
      var o = ctx.createOscillator(), g = ctx.createGain(); o.type = type;
      o.frequency.setValueAtTime(f0, t); if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t + dur);
      env(g, t, peak, att || .005, dur); o.connect(g); out(g, wet); o.start(t); o.stop(t + dur + .05);
    }
    function creak(t, dur, pitch) {
      var o = ctx.createOscillator(), f1 = ctx.createBiquadFilter(), f2 = ctx.createBiquadFilter(), g = ctx.createGain(), g2 = ctx.createGain();
      var N = 96, rate = new Float32Array(N), amp = new Float32Array(N), i, x;
      for (i = 0; i < N; i++) { x = i / (N - 1); rate[i] = (18 + 46 * Math.sin(Math.PI * x) + (Math.random() * 16 - 8)) * pitch; amp[i] = Math.pow(Math.sin(Math.PI * Math.min(1, x * 1.15)), .7) * (.55 + .45 * Math.abs(Math.sin(x * 23 + Math.random()))) * .38 + .0001; }
      amp[N - 1] = .0001;
      o.type = 'sawtooth'; o.frequency.setValueCurveAtTime(rate, t, dur);
      f1.type = 'bandpass'; f1.Q.value = 13; f1.frequency.setValueAtTime(620 * pitch, t); f1.frequency.linearRampToValueAtTime(1150 * pitch, t + dur * .55); f1.frequency.linearRampToValueAtTime(780 * pitch, t + dur);
      f2.type = 'bandpass'; f2.Q.value = 9; f2.frequency.setValueAtTime(1650 * pitch, t); f2.frequency.linearRampToValueAtTime(2350 * pitch, t + dur);
      g2.gain.value = .45; g.gain.setValueAtTime(.0001, t); g.gain.setValueCurveAtTime(amp, t, dur);
      o.connect(f1); o.connect(f2); f1.connect(g); f2.connect(g2); g2.connect(g); out(g, .45); o.start(t); o.stop(t + dur + .05);
    }
    function go(fn) {
      if (!on) return;
      try { if (!init()) return; if (ctx.state === 'suspended') ctx.resume(); fn(ctx.currentTime + .03); } catch (e) {}
    }
    return {
      open: function () {
        go(function (t) {
          noise(t, .09, 'bandpass', 2600, 1100, 3, .5, .35, .003);
          tone(t, 'triangle', 1850, 1720, .28, .12, .45); tone(t + .012, 'triangle', 2760, 2610, .2, .07, .45);
          tone(t, 'sine', 125, 52, .35, .65, .2);
          creak(t + .28, 1.9, 1); creak(t + .42, 1.7, 1.18);
          noise(t + .3, 2.4, 'lowpass', 220, 1900, .7, .22, .55, 1.3);
          tone(t + .35, 'sine', 55, 55, 4.2, .2, .35, 1.6); tone(t + .35, 'sine', 82.4, 82.4, 4.2, .1, .35, 1.6);
          [293.7, 370, 440, 587.3].forEach(function (f) { tone(t + .9, 'triangle', f, f, 3.8, .035, .85, 1.3); });
          var pent = [1174.7, 1318.5, 1480, 1760, 1975.5, 2349.3];
          for (var i = 0; i < 14; i++) tone(t + .95 + Math.random() * 2, 'sine', pent[i % 6], pent[i % 6], .7, .045, .9);
        });
      },
      enter: function () {
        go(function (t) {
          noise(t, 1.3, 'bandpass', 260, 3600, 1.1, .32, .6, 1.15);
          tone(t, 'sine', 110, 440, 1.5, .07, .5, 1.2);
          tone(t + 1.2, 'sine', 72, 28, 2, .85, .3);
          noise(t + 1.2, .9, 'lowpass', 500, 90, .7, .4, .4, .01);
          [587.3, 740, 880, 1174.7, 1480].forEach(function (f) { tone(t + 1.35, 'triangle', f, f, 3.4, .03, .9, .4); });
        });
      },
      isOn: function () { return on; },
      set: function (v) {
        on = v; try { localStorage.setItem('bwl_sound', v ? 'on' : 'off'); } catch (e) {}
        if (ctx) { if (v) { ctx.resume(); master.gain.setTargetAtTime(.85, ctx.currentTime, .05); } else master.gain.setTargetAtTime(0, ctx.currentTime, .05); }
      }
    };
  })();
  var sndBtn = $('[data-sound]');
  function paintSound() { var v = Sound.isOn(); sndBtn.setAttribute('aria-pressed', String(v)); sndBtn.setAttribute('aria-label', v ? 'Sound effects on. Click to mute' : 'Sound effects off. Click to unmute'); }
  if (!CONFIG.sound) sndBtn.hidden = true;
  sndBtn.addEventListener('click', function () { Sound.set(!Sound.isOn()); paintSound(); track('halloween_sound_' + (Sound.isOn() ? 'on' : 'off')); });
  paintSound();
  var W = 260, H = 428, R = 176.8, X0 = 90, Y0 = 120;
  var K = R - W / 2, RISE = Math.sqrt(R * R - K * K);
  function n(v) { return Math.round(v * 10) / 10; }
  function arch(x0, y0, d, w, h, r) {
    w = w || W; h = h || H; r = r || R;
    var k = r - w / 2, sy = y0 + Math.sqrt(r * r - k * k), rr = r + d, ay = sy - Math.sqrt(rr * rr - k * k), b = y0 + h;
    return 'M' + n(x0 - d) + ',' + n(b) + 'V' + n(sy) + 'A' + n(rr) + ',' + n(rr) + ' 0 0 1 ' + n(x0 + w / 2) + ',' + n(ay) + 'A' + n(rr) + ',' + n(rr) + ' 0 0 1 ' + n(x0 + w + d) + ',' + n(sy) + 'V' + n(b) + 'Z';
  }
  function poly(x0, w) {
    var L = [], i, t, ta = Math.atan2(-RISE, -K);
    for (i = 0; i <= 16; i++) { t = -Math.PI + (ta + Math.PI) * i / 16; L.push([R + R * Math.cos(t), RISE + R * Math.sin(t)]); }
    var pts = L.concat(L.slice(0, -1).reverse().map(function (p) { return [W - p[0], p[1]]; }), [[W, H], [0, H]]);
    return 'polygon(' + pts.map(function (p) { return n(Math.min(100, Math.max(0, (p[0] - x0) / w * 100))) + '% ' + n(p[1] / H * 100) + '%'; }).join(',') + ')';
  }
  function doorSVG(s, vb) {
    var id = 'bwl-' + s, g = '', i;
    var shades = ['#111726', '#151c2c', '#0f1523', '#131a29'];
    for (i = 0; i < 8; i++) g += '<rect x="' + i * 32.5 + '" width="32.5" height="' + H + '" fill="' + shades[i % 4] + '"/>';
    for (i = 1; i < 8; i++) if (i !== 4) g += '<path d="M' + i * 32.5 + ' 0V' + H + '" stroke="#05070c" stroke-width="1.3"/>';
    var straps = '', rivets = '', wins = '';
    [232, 352].forEach(function (sy) {
      straps += '<path d="M2 ' + (sy - 6) + 'H100L121 ' + sy + 'L100 ' + (sy + 6) + 'H2Z"/><path d="M258 ' + (sy - 6) + 'H160L139 ' + sy + 'L160 ' + (sy + 6) + 'H258Z"/>';
      [14, 40, 66, 90].forEach(function (rx) { rivets += '<circle cx="' + rx + '" cy="' + sy + '" r="2.3"/><circle cx="' + (260 - rx) + '" cy="' + sy + '" r="2.3"/>'; });
    });
    [24, 64, 104, 156, 196, 236].forEach(function (rx) { rivets += '<circle cx="' + rx + '" cy="409" r="2"/>'; });
    [65, 195].forEach(function (cx) {
      var p = arch(cx - 25, 86, 0, 50, 104, 40);
      wins += '<path d="' + p + '" fill="#0a0503"/><path class="bw-win" d="' + p + '" fill="url(#' + id + 'g)"/>' +
        '<path d="M' + cx + ' 88V190M' + (cx - 25) + ' 146H' + (cx + 25) + '" stroke="#07090f" stroke-width="3.2"/>' +
        '<path d="' + p + '" fill="none" stroke="#0a0d15" stroke-width="5"/><path d="' + arch(cx - 28, 83, 0, 56, 110, 44.8) + '" fill="none" stroke="#8fa6ff" stroke-opacity=".14" stroke-width="1"/>';
    });
    return '<svg viewBox="' + vb + '" preserveAspectRatio="none" aria-hidden="true" focusable="false"><defs>' +
      '<clipPath id="' + id + 'c"><path d="' + arch(0, 0, 0) + '"/></clipPath>' +
      '<filter id="' + id + 'n" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".55 .009" numOctaves="2" seed="' + (s === 'l' ? 4 : 9) + '"/><feColorMatrix values="0 0 0 0 .62 0 0 0 0 .68 0 0 0 0 .85 0 0 0 1.1 -.35"/></filter>' +
      '<linearGradient id="' + id + 's" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6d8cff" stop-opacity=".16"/><stop offset=".45" stop-color="#6d8cff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></linearGradient>' +
      '<radialGradient id="' + id + 'g" cx=".5" cy=".8" r=".75"><stop offset="0" stop-color="#ffcf87"/><stop offset=".35" stop-color="#ff8a2b"/><stop offset=".8" stop-color="#7a2408"/><stop offset="1" stop-color="#2a0c05"/></radialGradient>' +
      '<linearGradient id="' + id + 'i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a3246"/><stop offset=".5" stop-color="#121722"/><stop offset="1" stop-color="#07090e"/></linearGradient>' +
      '</defs><g clip-path="url(#' + id + 'c)">' + g +
      '<rect width="260" height="' + H + '" filter="url(#' + id + 'n)" opacity=".16"/>' +
      '<rect width="260" height="' + H + '" fill="url(#' + id + 's)"/></g>' +
      '<path d="' + arch(0, 0, -9) + '" fill="none" stroke="#080a11" stroke-width="7"/>' +
      '<path d="' + arch(0, 0, -13) + '" fill="none" stroke="#9fb3ff" stroke-opacity=".07" stroke-width="1"/>' + wins +
      '<g fill="url(#' + id + 'i)" stroke="#05070b" stroke-width=".8">' + straps + '<rect x="9" y="401" width="242" height="16" rx="1.5"/><rect x="107" y="270" width="12" height="26" rx="2"/><rect x="141" y="270" width="12" height="26" rx="2"/></g>' +
      '<g fill="#3a4560" stroke="#06080d" stroke-width=".6">' + rivets + '</g>' +
      '<g fill="none" stroke="#3a4560" stroke-width="2.6"><path d="M113 290a9 11 0 1 0 .01 0"/><path d="M147 290a9 11 0 1 0 .01 0"/></g>' +
      '<path d="M128.4 0V' + H + 'M131.6 0V' + H + '" stroke="#020305" stroke-width="1.6"/></svg>';
  }
  function frameSVG() {
    var sy = Y0 + RISE, bands = '';
    [[60, 'st2'], [46, 'st'], [32, 'st2'], [17, 'rv']].forEach(function (b) {
      bands += '<path d="' + arch(X0, Y0, b[0]) + '" fill="url(#bwl-' + b[1] + ')" stroke="#04060b" stroke-width="1.4"/>';
      if (b[1] === 'st2') bands += '<path d="' + arch(X0, Y0, b[0] - 1.2) + '" fill="none" stroke="url(#bwl-rimg)" stroke-width="1.1"/>';
    });
    var face = '<path d="M-13 0H-5L-9-7ZM5 0H13L9-7Z"/><path d="M-12 7Q0 17 12 7Q7 10 4 9.5L3 12.5 0 10.5-3 12.5-4 9.5Q-7 10-12 7Z"/>';
    return '<svg class="bw-frame" viewBox="0 0 440 600" aria-hidden="true" focusable="false"><defs>' +
      '<linearGradient id="bwl-st" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a2133"/><stop offset="1" stop-color="#0a0e18"/></linearGradient>' +
      '<linearGradient id="bwl-st2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#253050"/><stop offset=".5" stop-color="#121828"/><stop offset="1" stop-color="#080b13"/></linearGradient>' +
      '<linearGradient id="bwl-rv" x1="0" x2="1"><stop offset="0" stop-color="#0e1424"/><stop offset=".5" stop-color="#04060b"/><stop offset="1" stop-color="#0b0f1b"/></linearGradient>' +
      '<linearGradient id="bwl-rimg" x1="0" x2="1" y1="0" y2=".4"><stop offset="0" stop-color="#4a78ff" stop-opacity=".7"/><stop offset=".55" stop-color="#4a78ff" stop-opacity=".06"/><stop offset="1" stop-color="#4a78ff" stop-opacity=".2"/></linearGradient>' +
      '<radialGradient id="bwl-wm" cx=".5" cy=".92" r=".75"><stop offset="0" stop-color="#ffa04a"/><stop offset=".4" stop-color="#ff6a12" stop-opacity=".45"/><stop offset="1" stop-color="#ff6a12" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="bwl-sp" cx=".5" cy="0" r="1"><stop offset="0" stop-color="#ffb065" stop-opacity=".75"/><stop offset=".5" stop-color="#ff7a1a" stop-opacity=".2"/><stop offset="1" stop-color="#ff7a1a" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="bwl-fl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#10162a"/><stop offset="1" stop-color="#04060b"/></linearGradient>' +
      '<pattern id="bwl-bk" width="64" height="32" patternUnits="userSpaceOnUse"><path d="M0 .5H64M.5 0V16M32.5 16V32M0 16.5H64" stroke="#c8d4ff" stroke-opacity=".05" fill="none"/></pattern>' +
      '<radialGradient id="bwl-vg" cx=".5" cy=".6" r=".58"><stop offset=".3" stop-color="#fff"/><stop offset="1" stop-color="#000"/></radialGradient>' +
      '<mask id="bwl-m" maskUnits="userSpaceOnUse" x="0" y="0" width="440" height="600"><rect width="440" height="600" fill="url(#bwl-vg)"/></mask>' +
      '<radialGradient id="bwl-pk" cx=".38" cy=".3" r=".75"><stop offset="0" stop-color="#b8541b"/><stop offset=".55" stop-color="#6b2a0b"/><stop offset="1" stop-color="#220c04"/></radialGradient>' +
      '<radialGradient id="bwl-pg" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffb35c" stop-opacity=".85"/><stop offset="1" stop-color="#ff7a1a" stop-opacity="0"/></radialGradient>' +
      '<filter id="bwl-gl" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
      '</defs>' +
      '<g mask="url(#bwl-m)"><rect width="440" height="548" fill="#0a0e1a" opacity=".55"/><rect width="440" height="548" fill="url(#bwl-bk)"/><rect y="548" width="440" height="52" fill="url(#bwl-fl)"/></g>' +
      bands +
      '<path class="bw-jw" d="' + arch(X0, Y0, 17) + '" fill="url(#bwl-wm)"/>' +
      '<g fill="#1d2539" stroke="#04060b" stroke-width="1"><rect x="26" y="' + n(sy - 5) + '" width="50" height="10"/><rect x="364" y="' + n(sy - 5) + '" width="50" height="10"/><rect x="26" y="526" width="50" height="22"/><rect x="364" y="526" width="50" height="22"/></g>' +
      '<path d="M27 ' + n(sy - 4.4) + 'H75M365 ' + n(sy - 4.4) + 'H413M27 526.6H75M365 526.6H413" stroke="#5878d8" stroke-opacity=".3"/>' +
      '<rect x="66" y="548" width="308" height="8" fill="#151c2e"/><path d="M66 548.5H374" stroke="#8aa0ff" stroke-opacity=".12"/>' +
      '<path class="bw-spill" mask="url(#bwl-m)" d="M90 556H350L432 600H8Z" fill="url(#bwl-sp)"/>' +
      '<g transform="translate(394 560)">' +
      '<ellipse class="bw-pkg" cx="0" cy="26" rx="52" ry="10" fill="url(#bwl-pg)"/>' +
      '<ellipse cx="0" cy="25" rx="30" ry="4.5" fill="#000" opacity=".6"/>' +
      '<g fill="url(#bwl-pk)" stroke="#1a0903" stroke-opacity=".6" stroke-width=".8"><ellipse cx="-15" cy="7" rx="13" ry="17"/><ellipse cx="15" cy="7" rx="13" ry="17"/><ellipse cx="-7" cy="6" rx="13" ry="19"/><ellipse cx="7" cy="6" rx="13" ry="19"/><ellipse cx="0" cy="5.5" rx="11" ry="19.5"/></g>' +
      '<path d="M-2-13C-2-19 1-23 6-25L8-23C4-21 3-17 3-13Z" fill="#2c3a22"/>' +
      '<g fill="#160703">' + face + '</g><g class="bw-pkl" fill="#ffc46a" filter="url(#bwl-gl)">' + face + '</g>' +
      '<ellipse class="bw-pkg" cx="0" cy="4" rx="26" ry="20" fill="url(#bwl-pg)" opacity=".5"/>' +
      '</g></svg>';
  }
  function rimSVG() {
    return '<svg viewBox="0 0 260 428" preserveAspectRatio="none" aria-hidden="true" focusable="false"><defs><filter id="bwl-rb" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3.2"/></filter></defs>' +
      '<g fill="none"><path d="' + arch(0, 0, 0) + '" stroke="#ff7a1a" stroke-width="4" filter="url(#bwl-rb)"/>' +
      '<path d="' + arch(0, 0, 0) + '" stroke="#ffb36b" stroke-opacity=".75" stroke-width=".9"/>' +
      '<path d="M130 6V426" stroke="#ff9a3c" stroke-width="3" filter="url(#bwl-rb)" opacity=".7"/>' +
      '<path d="M6 427H254" stroke="#ffc07a" stroke-width="3" filter="url(#bwl-rb)"/></g></svg>';
  }
  var hero = $('.bw-hero');
  $('[data-frame]').outerHTML = frameSVG();
  $('[data-rim]').innerHTML = rimSVG();
  $('[data-portal]').style.clipPath = poly(0, W);
  $('[data-leaf="l"]').insertAdjacentHTML('afterbegin', doorSVG('l', '0 0 129 ' + H));
  $('[data-leaf="r"]').insertAdjacentHTML('afterbegin', doorSVG('r', '131 0 129 ' + H));
  $('[data-leaf="l"] .bw-shade').style.clipPath = poly(0, 129);
  $('[data-leaf="r"] .bw-shade').style.clipPath = poly(131, 129);
  var stopEmbers = false;
  function embers() {
    var cv = $('[data-embers]'), ctx = cv.getContext && cv.getContext('2d');
    if (!ctx || reduce) return;
    var small = innerWidth < 640, dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2), w = cv.clientWidth, h = cv.clientHeight;
    cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    stopEmbers = false;
    var ps = [], t0 = performance.now(), s = w / 440, rate = small ? 2 : 3;
    var spr = doc.createElement('canvas'), sz = 32; spr.width = spr.height = sz;
    var sc = spr.getContext('2d'), gr = sc.createRadialGradient(sz / 2, sz / 2, 0, sz / 2, sz / 2, sz / 2);
    gr.addColorStop(0, 'rgba(255,236,190,1)'); gr.addColorStop(.25, 'rgba(255,170,80,.9)'); gr.addColorStop(1, 'rgba(255,110,20,0)');
    sc.fillStyle = gr; sc.fillRect(0, 0, sz, sz);
    function spawn() {
      ps.push({ x: (X0 + 40 + Math.random() * (W - 80)) * s, y: (Y0 + H - 20 - Math.random() * 140) * s, vx: (Math.random() - .5) * .35 * s, vy: -(.35 + Math.random() * 1.1) * s, r: (.6 + Math.random() * 1.7) * s, life: 0, max: 100 + Math.random() * 120, ph: Math.random() * 6.28 });
    }
    (function frame(now) {
      var el = now - t0;
      if (el < 1900) for (var k = 0; k < rate; k++) spawn();
      ctx.clearRect(0, 0, w, h); ctx.globalCompositeOperation = 'lighter';
      for (var i = ps.length - 1; i >= 0; i--) {
        var p = ps[i]; p.life++;
        if (p.life >= p.max) { ps.splice(i, 1); continue; }
        p.x += p.vx + Math.sin(p.ph + p.life * .05) * .25 * s; p.y += p.vy;
        var a = Math.sin(Math.PI * p.life / p.max);
        var d = p.r * 5; ctx.globalAlpha = a * .95; ctx.drawImage(spr, p.x - d / 2, p.y - d / 2, d, d);
      }
      ctx.globalAlpha = 1;
      if (stopEmbers) { ctx.clearRect(0, 0, w, h); return; }
      if (ps.length || el < 1900) requestAnimationFrame(frame); else ctx.clearRect(0, 0, w, h);
    })(t0);
  }
  var opened = false, firstOpen = true, busy = false, status = $('[data-door-status]');
  function openDoor() {
    if (opened || busy) return; opened = true; busy = true;
    hero.classList.remove('bw-is-tease', 'bw-is-closing');
    var y0 = window.scrollY, gated = html.classList.contains('bw-is-gated');
    Sound.open();
    if (reduce) { hero.classList.add('bw-is-open'); busy = false; }
    else {
      hero.classList.add('bw-is-unlatch');
      setTimeout(function () { hero.classList.add('bw-is-open'); embers(); }, 300);
      setTimeout(function () { busy = false; }, 2300);
    }
    status.textContent = state === 'ended' ? 'The door is open. The Halloween promotion has ended.' : 'The door is open. Your treat: 35% off all Bullwaves Prime Challenge Accounts.';
    if (gated) { $('#reveal').classList.add('bw-pre-enter'); setTimeout(enterDoor, reduce ? 0 : 2050); firstOpen = false; track('halloween_unlock', { mode: 'gate' }); return; }
    setTimeout(function () { var a = $('.bw-hero-ctas a[data-after]'); if (a && doc.activeElement && doc.activeElement.hasAttribute('data-unlock')) a.focus({ preventScroll: true }); }, 30);
    if (CONFIG.autoScrollAfterOpen && firstOpen && !reduce) {
      setTimeout(function () { if (Math.abs(window.scrollY - y0) < 40) $('#reveal').scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 3000);
    }
    firstOpen = false;
    track('halloween_unlock');
  }
  var flash = $('[data-flash]'), stage = $('.bw-hero-stage');
  var root = doc.getElementById('bwl'), after = [];
  for (var nx = root && root.nextElementSibling; nx; nx = nx.nextElementSibling) if (!/^(SCRIPT|NOSCRIPT|STYLE|LINK|TEMPLATE)$/.test(nx.tagName)) after.push(nx);
  var gatedEls = $$('main > section:not(.bw-hero), .bw-bar').concat(after);
  var extFoot = after.filter(function (el) { return el.matches('footer, [class*="footer"]') || el.querySelector('footer'); })[0] || null;
  function setInert(v) { gatedEls.forEach(function (el) { if (v) el.setAttribute('inert', ''); else el.removeAttribute('inert'); }); }
  function enterDoor() {
    var sr = stage.getBoundingClientRect(), pr = $('[data-portal]').getBoundingClientRect();
    var cx = pr.left + pr.width / 2, cy = pr.top + pr.height * .62;
    stage.style.setProperty('--ox', (cx - sr.left).toFixed(1) + 'px');
    stage.style.setProperty('--oy', (cy - sr.top).toFixed(1) + 'px');
    flash.style.setProperty('--fx', cx.toFixed(0) + 'px'); flash.style.setProperty('--fy', cy.toFixed(0) + 'px');
    stopEmbers = true;
    hero.classList.add('bw-is-entering'); $('.bw-nav').classList.add('bw-is-entering'); flash.classList.add('bw-is-on');
    Sound.enter();
    setTimeout(function () { ungate(true); }, 1340);
    track('halloween_enter');
  }
  function ungate(toReveal) {
    if (!html.classList.contains('bw-is-gated')) return;
    stage.classList.add('bw-snap'); hero.classList.add('bw-snap');
    html.classList.remove('bw-is-gated'); hero.classList.remove('bw-is-entering'); $('.bw-nav').classList.remove('bw-is-entering');
    setInert(false);
    try { sessionStorage.setItem('bwl_entered', '1'); } catch (e) {}
    var rv = $('#reveal');
    if (toReveal) {
      html.style.scrollBehavior = 'auto';
      window.scrollTo(0, rv.getBoundingClientRect().top + window.scrollY);
      html.style.scrollBehavior = '';
      $$('.bw-rv', rv).forEach(function (el) { el.classList.add('bw-in'); });
      rv.focus({ preventScroll: true });
    }
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      stage.classList.remove('bw-snap'); hero.classList.remove('bw-snap');
      setTimeout(function () {
        if (toReveal) { rv.classList.remove('bw-pre-enter'); rv.classList.add('bw-just-entered'); }
        flash.classList.add('bw-is-out'); flash.classList.remove('bw-is-on');
        setTimeout(function () { flash.classList.remove('bw-is-out'); }, 1400);
      }, toReveal ? 120 : 0);
    }); });
  }
  if (html.classList.contains('bw-is-gated')) {
    if (!CONFIG.gate) html.classList.remove('bw-is-gated'); else setInert(true);
  }
  $('[data-skip-gate]').addEventListener('click', function () { ungate(false); track('halloween_skip_intro'); var b = $('.bw-hero-ctas [data-unlock]'); b.focus({ preventScroll: true }); });
  function closeDoor() {
    if (!opened || busy) return; busy = true;
    stopEmbers = true;
    hero.classList.add('bw-is-closing');
    hero.classList.remove('bw-is-open', 'bw-is-unlatch');
    status.textContent = 'The door is closed.';
    setTimeout(function () { opened = false; busy = false; hero.classList.remove('bw-is-closing'); var b = $('.bw-hero-ctas [data-unlock]'); if (doc.activeElement === doc.body || (doc.activeElement && doc.activeElement.hasAttribute('data-replay'))) b.focus({ preventScroll: true }); }, reduce ? 0 : 1300);
    track('halloween_replay');
  }
  $$('[data-unlock]').forEach(function (b) { b.addEventListener('click', openDoor); });
  $('[data-replay]').addEventListener('click', closeDoor);
  $$('[data-tease], .bw-doorhit').forEach(function (b) {
    var on = function () { if (!opened) hero.classList.add('bw-is-tease'); }, off = function () { hero.classList.remove('bw-is-tease'); };
    b.addEventListener('mouseenter', on); b.addEventListener('mouseleave', off);
    b.addEventListener('focus', on); b.addEventListener('blur', off);
  });
  var copyStatus = $('[data-copy-status]');
  function copyText(text, done, fail) {
    if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(text).then(done, legacy); } else legacy();
    function legacy() {
      var ta = doc.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
      doc.body.appendChild(ta); ta.select(); var ok = false;
      try { ok = doc.execCommand('copy'); } catch (e) {}
      doc.body.removeChild(ta); ok ? done() : fail();
    }
  }
  $$('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (btn.disabled || state === 'ended') return;
      var lbl = $('[data-copy-lbl]', btn);
      copyText(CONFIG.promoCode, function () {
        btn.classList.add('bw-is-done'); if (lbl) lbl.textContent = 'Copied';
        copyStatus.textContent = 'Code ' + CONFIG.promoCode + ' copied to clipboard.';
        clearTimeout(btn._t);
        btn._t = setTimeout(function () { btn.classList.remove('bw-is-done'); if (lbl) lbl.textContent = 'Copy Code'; copyStatus.textContent = ''; }, 2400);
        track('halloween_copy_code', { location: btn.classList.contains('bw-bar-code') ? 'bar' : 'claim' });
      }, function () {
        copyStatus.textContent = 'Copy failed. Select the code and copy it manually.';
        var r = doc.createRange(); r.selectNodeContents($('.bw-code')); var s = getSelection(); s.removeAllRanges(); s.addRange(r);
      });
    });
  });
  $$('[data-cta]').forEach(function (a) { a.addEventListener('click', function () { track('halloween_cta_challenge', { location: a.getAttribute('data-cta') }); }); });
  $$('.bw-acc-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      var item = b.closest('.bw-acc-item'), open = b.getAttribute('aria-expanded') !== 'true';
      b.setAttribute('aria-expanded', String(open)); item.classList.toggle('bw-is-open', open);
    });
  });
  var cdEls = { d: $('[data-cd="d"]'), h: $('[data-cd="h"]'), m: $('[data-cd="m"]'), s: $('[data-cd="s"]') };
  var cdTimer = null;
  function pad(v) { return v < 10 ? '0' + v : String(v); }
  function applyState() {
    var ended = state === 'ended';
    $$('[data-copy]').forEach(function (b) { b.disabled = ended; if (ended) { b.setAttribute('aria-disabled', 'true'); var l = $('[data-copy-lbl]', b); if (l) l.textContent = 'Promotion ended'; } });
    $('[data-cd-eyebrow]').textContent = state === 'upcoming' ? 'Coming Soon' : ended ? 'Promotion Ended' : 'Limited Time';
    $('[data-cd-title]').textContent = state === 'upcoming' ? 'The Doors Open In' : ended ? 'The Doors Are Closed.' : 'The Doors Close In';
    if (state === 'upcoming') $('[data-cd-deadline]').textContent = 'Starts ' + dayText(CONFIG.start) + (CONFIG.showEndTime ? ' at ' + timeText(CONFIG.start) + ' ' + CONFIG.timezoneLabel : '') + '. Offer ends ' + endText + '.';
    else $('[data-cd-deadline]').textContent = 'Offer ends ' + endText + '.';
    if (ended) { $('[data-bar]').classList.remove('bw-is-on'); }
  }
  function tick() {
    var now = Date.now(), target = state === 'upcoming' ? START : END, diff = target - now;
    if (!preview) {
      var real = stateAt(now);
      if (real !== state) { setState(real); }
    }
    if (state === 'ended') { clearTimeout(cdTimer); return; }
    if (preview && diff <= 0) diff = 0;
    var t = Math.max(0, Math.floor(diff / 1000));
    cdEls.d.textContent = pad(Math.floor(t / 86400)); cdEls.h.textContent = pad(Math.floor(t % 86400 / 3600));
    cdEls.m.textContent = pad(Math.floor(t % 3600 / 60)); cdEls.s.textContent = pad(t % 60);
    cdTimer = setTimeout(tick, 1000 - (Date.now() % 1000) + 10);
  }
  setState(state);
  tick();
  if ('IntersectionObserver' in window) {
    var ro = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('bw-in'); ro.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px', threshold: .12 });
    $$('.bw-rv').forEach(function (el) { ro.observe(el); });
    var seen = { hero: true, claim: false, foot: false };
    var bar = $('[data-bar]');
    function updateBar() { bar.classList.toggle('bw-is-on', state !== 'ended' && !seen.hero && !seen.claim && !seen.foot); }
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var k = e.target === hero ? 'hero' : e.target.id === 'claim' ? 'claim' : 'foot';
        seen[k] = e.isIntersecting;
        if (k === 'hero') hero.classList.toggle('bw-is-off', !e.isIntersecting);
      });
      updateBar();
    }, { threshold: 0 });
    [hero, $('#claim'), extFoot].forEach(function (el) { if (el) so.observe(el); });
  } else {
    $$('.bw-rv').forEach(function (el) { el.classList.add('bw-in'); });
  }
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
