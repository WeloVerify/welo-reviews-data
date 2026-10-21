(function () {
'use strict';
if (window.__bwlLoaded) return; window.__bwlLoaded = true;
  (function () {
    var d = document.documentElement; d.classList.add('js');
    try {
      var q = new URLSearchParams(location.search);
      var skip = location.hash || q.get('bwp_gate') === '0' || sessionStorage.getItem('bwl_entered') === '1' ||
        (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
      if (!skip) d.classList.add('is-gated');
    } catch (e) {}
  })();
var CSS = ":root{\n--bg:#04060b;--bg2:#070b16;--panel:#0a1020;--line:rgba(160,180,230,.12);--line2:rgba(160,180,230,.2);\n--text:#eef1f8;--soft:#c4cce0;--mut:#8f9ab4;\n--blue:#0136ff;--blue2:#3b6cff;--or:#ff7a1a;--am:#ffb15a;\n--r:16px;--ease:cubic-bezier(.2,.8,.2,1);\n}\n*,*::before,*::after{box-sizing:border-box}\nhtml{-webkit-text-size-adjust:100%;scroll-behavior:smooth;background:var(--bg)}\nbody{margin:0;background:var(--bg);color:var(--text);font-family:Inter,ui-sans-serif,system-ui,-apple-system,\"Segoe UI\",Roboto,Arial,sans-serif;font-size:16px;line-height:1.55;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;overflow-x:hidden}\n@supports (overflow:clip){body{overflow-x:clip}}\nimg,svg{display:block;max-width:100%}\na{color:inherit;text-decoration:none}\nbutton{font:inherit;color:inherit;background:none;border:0;padding:0;cursor:pointer}\nh1,h2,h3,p,ul,ol,figure{margin:0;padding:0}\nul,ol{list-style:none}\n:focus-visible{outline:2px solid var(--am);outline-offset:3px;border-radius:6px}\n.sr{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}\n.skip{position:fixed;left:16px;top:16px;z-index:100;padding:10px 16px;border-radius:10px;background:#fff;color:#000;font-weight:600;transform:translateY(-200%);transition:transform .2s}\n.skip:focus{transform:none}\n.wrap{width:min(1180px,100% - 40px);margin-inline:auto}\n.btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:54px;padding:0 26px;border-radius:13px;font-size:15px;font-weight:600;letter-spacing:.01em;white-space:nowrap;transition:background .25s,box-shadow .35s,transform .2s,color .2s,border-color .2s}\n.btn svg{flex:0 0 auto}\n.btn-primary{color:#fff;background:var(--blue);box-shadow:inset 0 1px 0 rgba(255,255,255,.22),0 12px 34px -12px rgba(1,54,255,.85)}\n.btn-primary:hover{background:#1747ff;box-shadow:inset 0 1px 0 rgba(255,255,255,.25),0 16px 40px -12px rgba(1,54,255,.95),0 0 0 5px rgba(255,140,50,.12)}\n.btn-primary:active{transform:translateY(1px)}\n.btn-ghost{color:var(--soft);border:1px solid var(--line2);background:rgba(255,255,255,.02)}\n.btn-ghost:hover{color:#fff;border-color:rgba(200,215,255,.35);background:rgba(255,255,255,.05)}\n.btn-sm{min-height:42px;padding:0 18px;font-size:14px;border-radius:11px}\n.btn[disabled],.btn[aria-disabled=\"true\"]{opacity:.45;pointer-events:none;box-shadow:none}\n.link{display:inline-flex;align-items:center;gap:8px;min-height:44px;font-size:14px;font-weight:500;color:var(--soft);transition:color .2s}\n.link:hover{color:#fff}\n.eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:12px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--am)}\n.eyebrow i{width:6px;height:6px;border-radius:50%;background:var(--or);box-shadow:0 0 12px 2px rgba(255,122,26,.6)}\n.h2{font-size:clamp(30px,3.6vw,48px);line-height:1.08;font-weight:500;letter-spacing:-.025em}\n.lede{color:var(--soft);font-size:17px}\n.nav{position:absolute;inset:0 0 auto;z-index:20;padding:22px 0}\n.nav .wrap{display:flex;align-items:center;justify-content:space-between;gap:16px}\n.logo{display:flex;align-items:center;min-height:44px}\n.logo img{height:30px;width:auto}\n.logo-fb{font-weight:600;letter-spacing:.02em}\n.nav-r{display:flex;align-items:center;gap:8px}\n.hero{position:relative;min-height:100vh;min-height:100svh;display:flex;align-items:center;padding:110px 0 56px;overflow:hidden;isolation:isolate}\n.hero-bg{position:absolute;inset:0;z-index:-2;background:radial-gradient(55% 45% at 12% 0%,rgba(1,54,255,.26),transparent 62%),radial-gradient(40% 50% at 74% 52%,rgba(40,70,170,.18),transparent 70%),linear-gradient(180deg,#05070e 0%,#04060b 70%,#04060b 100%)}\n.hero-warm{position:absolute;inset:0;z-index:-1;pointer-events:none;background:radial-gradient(38% 46% at 73% 78%,rgba(255,122,26,.30),transparent 70%);opacity:0;transition:opacity 1.8s ease .3s}\n.is-open .hero-warm{opacity:1}\n.fog{position:absolute;left:-15%;right:-15%;bottom:-4%;height:42%;z-index:2;pointer-events:none;background:radial-gradient(40% 55% at 22% 100%,rgba(150,172,230,.13),transparent 70%),radial-gradient(35% 50% at 60% 100%,rgba(150,172,230,.10),transparent 70%),radial-gradient(30% 45% at 90% 100%,rgba(150,172,230,.10),transparent 70%);animation:fog 38s ease-in-out infinite alternate}\n.fog.f2{height:30%;opacity:.8;animation-duration:52s;animation-direction:alternate-reverse}\n@keyframes fog{from{transform:translate3d(-3%,0,0)}to{transform:translate3d(4%,0,0)}}\n.hero.is-off .fog{animation-play-state:paused}\n.hero-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);grid-template-areas:\"copy stage\" \"act stage\";column-gap:48px;align-items:center;position:relative;z-index:3}\n.hero-copy{grid-area:copy;align-self:end;max-width:600px}\n.hero-act{grid-area:act;align-self:start;max-width:600px}\n.chip{display:inline-flex;align-items:center;gap:10px;padding:8px 14px 8px 12px;border-radius:999px;border:1px solid rgba(255,150,70,.28);background:rgba(255,122,26,.06);font-size:13px;font-weight:500;color:#ffd2a6}\n.chip i{width:6px;height:6px;border-radius:50%;background:var(--or);box-shadow:0 0 10px 2px rgba(255,122,26,.7)}\n.hero h1{margin-top:22px;font-size:clamp(36px,4.5vw,62px);line-height:1.05;font-weight:500;letter-spacing:-.03em;color:#fff;text-wrap:balance}\n.hero-sub{margin-top:18px;font-size:clamp(18px,1.6vw,22px);font-weight:500;color:#cfd6ea;letter-spacing:-.01em}\n.hero-sub em{font-style:normal;color:var(--am)}\n.hero-ctas{display:flex;flex-wrap:wrap;align-items:center;gap:10px 18px;margin-top:34px}\n.hero-ctas [data-after]{display:none}\n.is-open .hero-ctas [data-before]{display:none}\n.is-open .hero-ctas [data-after]{display:inline-flex}\n.offer-strip{display:flex;flex-wrap:wrap;gap:10px;margin-top:30px}\n.offer-strip li{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:12px;border:1px solid var(--line);background:rgba(10,16,32,.6);font-size:14px;color:var(--soft)}\n.offer-strip strong{font-weight:600;color:#fff}\n.offer-strip li:first-child strong{color:var(--am)}\n.hero-stage{grid-area:stage;position:relative;height:min(78vh,700px);min-height:460px;container-type:size}\n.scene{position:absolute;left:50%;bottom:0;height:min(100cqh,136.36cqw);aspect-ratio:440/600;transform:translateX(-50%);container-type:inline-size}\n.scene .frame{position:absolute;inset:0;width:100%;height:100%}\n.portal{position:absolute;left:20.4545%;top:20%;width:59.0909%;height:71.3333%;perspective:150cqw}\n.int{position:absolute;inset:0;overflow:hidden;background:radial-gradient(62% 46% at 50% 76%,#ffd38f 0%,#ff8a2b 20%,#a8390c 46%,#2b0e07 76%,#0c0606 100%)}\n.rays{position:absolute;inset:-20%;background:repeating-conic-gradient(from 0deg at 50% 70%,rgba(255,196,130,.22) 0 2.5deg,transparent 2.5deg 8deg);-webkit-mask-image:radial-gradient(closest-side at 50% 70%,#000 30%,transparent);mask-image:radial-gradient(closest-side at 50% 70%,#000 30%,transparent);opacity:0;transition:opacity 1.4s ease .5s}\n.is-open .rays{opacity:.85}\n.int-txt{position:absolute;left:0;right:0;top:40%;text-align:center;color:#fff7ec;opacity:0;transform:translateY(8%) scale(.94);filter:blur(6px);transition:opacity .9s ease .8s,transform 1.1s var(--ease) .8s,filter .9s ease .8s}\n.int-txt b{display:block;font-weight:600;font-size:12cqw;line-height:1;letter-spacing:-.03em;text-shadow:0 0 3cqw rgba(255,170,80,.9),0 0 8cqw rgba(255,120,30,.6)}\n.int-txt span{display:block;margin-top:1.4cqw;font-weight:500;font-size:3.4cqw;letter-spacing:.42em;padding-left:.42em;color:#ffe3c2}\n.int-txt small{display:block;margin-top:3.5cqw;font-size:2.6cqw;font-weight:500;letter-spacing:.06em;color:#ffe8cf}\n.is-open .int-txt{opacity:1;transform:none;filter:none}\n.leaf{position:absolute;top:0;height:100%;width:49.6154%;transform-style:preserve-3d;will-change:transform;transition:transform .7s cubic-bezier(.3,.6,.3,1)}\n.leaf svg{position:absolute;inset:0;width:100%;height:100%}\n.leaf-l{left:0;transform-origin:0 50%}\n.leaf-r{right:0;transform-origin:100% 50%}\n.edge{position:absolute;top:0;height:100%;width:5.5%;background:linear-gradient(180deg,#5a2a10,#2a140a 55%,#100907)}\n.leaf-l .edge{left:100%;transform-origin:0 50%;transform:rotateY(90deg)}\n.leaf-r .edge{right:100%;transform-origin:100% 50%;transform:rotateY(-90deg)}\n.shade{position:absolute;inset:0;background:#000;opacity:0;transition:opacity 1.8s ease}\n.is-tease .leaf-l{transform:rotateY(3.5deg)}\n.is-tease .leaf-r{transform:rotateY(-3.5deg)}\n.is-unlatch .leaf{transition:transform .3s cubic-bezier(.3,.7,.4,1)}\n.is-unlatch .leaf-l{transform:rotateY(8deg)}\n.is-unlatch .leaf-r{transform:rotateY(-8deg)}\n.is-open .leaf{transition:transform 2s cubic-bezier(.45,.02,.15,1)}\n.is-open .leaf-l{transform:rotateY(84deg)}\n.is-open .leaf-r{transform:rotateY(-84deg)}\n.is-open .shade{opacity:.55}\n.is-closing .leaf{transition:transform 1.3s cubic-bezier(.5,0,.3,1)}\n.win{opacity:.5;transition:opacity .6s ease}\n.is-tease .win{opacity:1}\n.rim{position:absolute;left:20.4545%;top:20%;width:59.0909%;height:71.3333%;pointer-events:none;opacity:.6;transition:opacity .6s ease}\n.rim svg{width:100%;height:100%;overflow:visible}\n.is-tease .rim{opacity:1}\n.is-open .rim{opacity:0;transition-duration:1.2s}\n.jw{opacity:.22;transition:opacity 1.6s ease .2s}\n.is-tease .jw{opacity:.4}\n.is-open .jw{opacity:.95}\n.spill{opacity:.18;transition:opacity 1.6s ease .3s}\n.is-open .spill{opacity:1}\n.pkl,.pkg{opacity:0;transition:opacity 1s ease 1s}\n.is-open .pkl{opacity:1}\n.is-open .pkg{opacity:.8}\n.embers{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}\n.doorhit{position:absolute;left:18%;top:18%;width:64%;height:76%;border-radius:40% 40% 0 0}\n.is-open .doorhit{display:none}\n.scroll-cue{position:absolute;left:50%;bottom:22px;z-index:4;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:6px;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--mut)}\n.scroll-cue::after{content:\"\";width:1px;height:28px;background:linear-gradient(var(--mut),transparent)}\n.sec{position:relative;padding:clamp(80px,10vw,140px) 0}\n.sec-head{display:grid;gap:16px;justify-items:start}\n.center{text-align:center}\n.center .sec-head{justify-items:center}\n.reveal-sec{padding-top:clamp(70px,8vw,120px);overflow:hidden}\n.reveal-sec::before{content:\"\";position:absolute;left:50%;top:0;width:min(900px,120%);height:520px;transform:translateX(-50%);background:radial-gradient(50% 50% at 50% 40%,rgba(255,122,26,.14),transparent 70%);pointer-events:none}\n.mega{position:relative;display:flex;justify-content:center;align-items:flex-start;gap:.06em;margin-top:18px;font-size:clamp(108px,19vw,250px);line-height:.9;font-weight:600;letter-spacing:-.055em}\n.mega-n{background:linear-gradient(180deg,#ffffff 30%,#ffd8ae 100%);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 0 40px rgba(255,140,50,.18))}\n.mega-off{margin-top:.12em;font-size:.3em;font-weight:600;letter-spacing:.08em;color:var(--or)}\n.mega-sub{margin-top:18px;font-size:clamp(18px,1.7vw,22px);color:var(--soft)}\n.divider{width:1px;height:72px;margin:56px auto;background:linear-gradient(transparent,var(--line2),transparent)}\n.give-head h3{font-size:clamp(26px,3vw,38px);line-height:1.12;font-weight:500;letter-spacing:-.02em}\n.give-head h3 span{display:block;color:var(--am)}\n.tickets{display:flex;justify-content:center;padding:56px 0 30px;margin-left:34px}\n.ticket{--d:0;position:relative;flex:0 0 auto;width:128px;aspect-ratio:128/206;margin-left:-34px;transform-origin:50% 120%;transform:translateY(calc(var(--d) * var(--d) * 3px)) rotate(calc(var(--d) * 4deg));transition:transform .45s var(--ease),filter .45s;z-index:1}\n.ticket:hover{transform:translateY(calc(var(--d) * var(--d) * 3px - 22px)) rotate(calc(var(--d) * 4deg)) scale(1.05);z-index:20}\n.t-in{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;padding:16px 10px 12px;border-radius:12px;overflow:hidden;background:radial-gradient(120% 70% at 50% 0%,rgba(59,108,255,.22),transparent 60%),linear-gradient(170deg,#101a34 0%,#080d1b 55%,#05070e 100%);border:1px solid rgba(80,120,255,.35);box-shadow:0 18px 40px -16px rgba(0,0,0,.9);-webkit-mask:radial-gradient(circle 7px at 0 72%,transparent 96%,#000) left/51% 100% no-repeat,radial-gradient(circle 7px at 100% 72%,transparent 96%,#000) right/51% 100% no-repeat;mask:radial-gradient(circle 7px at 0 72%,transparent 96%,#000) left/51% 100% no-repeat,radial-gradient(circle 7px at 100% 72%,transparent 96%,#000) right/51% 100% no-repeat}\n.t-in::before{content:\"\";position:absolute;inset:-40% -60%;background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,.10) 50%,transparent 60%);transform:translateX(-60%);transition:transform .9s var(--ease)}\n.ticket:hover .t-in::before{transform:translateX(60%)}\n.t-in::after{content:\"\";position:absolute;left:12px;right:12px;top:72%;border-top:1px dashed rgba(200,215,255,.22)}\n.t-no{font-size:10px;font-weight:600;letter-spacing:.2em;color:var(--or)}\n.t-amt{margin-top:auto;font-size:30px;font-weight:600;letter-spacing:-.03em;color:#fff}\n.t-lbl{margin-top:2px;margin-bottom:auto;font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:#aeb8d2}\n.t-stub{position:relative;margin-top:22px;font-size:8.5px;letter-spacing:.2em;text-transform:uppercase;color:#7d89a6}\n.t-stub::before{content:\"\";display:block;width:56px;height:12px;margin:0 auto 6px;background:repeating-linear-gradient(90deg,#8b97b8 0 1px,transparent 1px 3px,#8b97b8 3px 5px,transparent 5px 6px);opacity:.45}\n.prize-note{max-width:620px;margin:8px auto 0;font-size:14px;color:var(--mut)}\n.prize-note strong{color:var(--soft);font-weight:500}\n.claim-card{position:relative;overflow:hidden;display:grid;grid-template-columns:1.1fr 1fr;gap:48px;align-items:center;padding:clamp(28px,5vw,64px);border-radius:28px;border:1px solid var(--line);background:radial-gradient(60% 90% at 0% 0%,rgba(1,54,255,.20),transparent 60%),radial-gradient(50% 80% at 100% 100%,rgba(255,122,26,.12),transparent 65%),linear-gradient(180deg,#0a1124,#070b16)}\n.claim-card p.lede{margin-top:16px;max-width:460px}\n.code-box{position:relative;padding:22px;border-radius:20px;border:1px solid rgba(255,150,70,.3);background:rgba(4,7,14,.7)}\n.code-lbl{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--mut)}\n.code-row{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:8px;padding:14px 14px 14px 20px;border-radius:14px;background:#0b1224;border:1px dashed rgba(255,170,100,.35)}\n.code{font-size:clamp(22px,2.6vw,30px);font-weight:600;letter-spacing:.14em;color:#fff;font-variant-numeric:tabular-nums;-webkit-user-select:all;user-select:all;overflow-wrap:anywhere}\n.copy{display:inline-flex;align-items:center;gap:8px;min-height:46px;padding:0 18px;border-radius:11px;font-size:14px;font-weight:600;color:#fff;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);transition:background .2s,color .2s,border-color .2s,transform .2s;flex:0 0 auto}\n.copy:hover{background:rgba(255,255,255,.12)}\n.copy .ok{display:none}\n.copy.is-done{color:#1a0d04;background:var(--am);border-color:var(--am)}\n.copy.is-done .ok{display:block}\n.copy.is-done .cp{display:none}\n.copy[disabled]{opacity:.45;cursor:not-allowed}\n.code-box .btn{width:100%;margin-top:14px}\n.code-note{margin-top:12px;font-size:13px;color:var(--mut);text-align:center}\n.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:48px;counter-reset:s}\n.step{position:relative;padding:28px 26px 30px;border-radius:20px;border:1px solid var(--line);background:linear-gradient(180deg,rgba(255,255,255,.035),rgba(255,255,255,.01))}\n.step-top{display:flex;align-items:center;justify-content:space-between}\n.step-n{font-size:13px;font-weight:600;letter-spacing:.12em;color:var(--or)}\n.step-ic{width:44px;height:44px;display:grid;place-items:center;border-radius:12px;color:#cfd9ff;background:rgba(59,108,255,.1);border:1px solid rgba(59,108,255,.25)}\n.step h3{margin-top:34px;font-size:20px;font-weight:500;letter-spacing:-.01em}\n.step p{margin-top:8px;font-size:15px;color:var(--mut)}\n.cd-card{padding:clamp(28px,5vw,56px);border-radius:28px;border:1px solid var(--line);background:radial-gradient(70% 120% at 50% 0%,rgba(255,122,26,.10),transparent 60%),#070b16;text-align:center}\n.cd{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;max-width:720px;margin:34px auto 0}\n.cd-u{padding:22px 8px 18px;border-radius:18px;border:1px solid var(--line);background:rgba(4,7,14,.6)}\n.cd-v{display:block;font-size:clamp(36px,6vw,64px);line-height:1;font-weight:500;letter-spacing:-.03em;font-variant-numeric:tabular-nums;color:#fff}\n.cd-l{display:block;margin-top:10px;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--mut)}\n.cd-deadline{margin-top:22px;font-size:14px;color:var(--mut)}\n.cd-ended{display:none;max-width:520px;margin:20px auto 0;color:var(--soft)}\n.faq-grid{display:grid;grid-template-columns:.8fr 1.2fr;gap:56px;align-items:start}\n.acc{border-top:1px solid var(--line)}\n.acc-item{border-bottom:1px solid var(--line)}\n.acc-btn{display:flex;width:100%;align-items:center;justify-content:space-between;gap:20px;padding:22px 2px;text-align:left;font-size:17px;font-weight:500;color:#fff}\n.acc-btn:hover{color:var(--am)}\n.acc-ic{position:relative;flex:0 0 auto;width:28px;height:28px;border-radius:50%;border:1px solid var(--line2)}\n.acc-ic::before,.acc-ic::after{content:\"\";position:absolute;left:50%;top:50%;width:10px;height:1.5px;background:currentColor;transform:translate(-50%,-50%);transition:transform .3s var(--ease)}\n.acc-ic::after{transform:translate(-50%,-50%) rotate(90deg)}\n.acc-btn[aria-expanded=\"true\"] .acc-ic::after{transform:translate(-50%,-50%) rotate(0)}\n.acc-panel{display:grid;grid-template-rows:0fr;transition:grid-template-rows .35s var(--ease)}\n.acc-panel>div{overflow:hidden}\n.acc-panel p{padding:0 40px 22px 2px;color:var(--soft);font-size:15px}\n.acc-panel code,.faq code{font-family:inherit;font-weight:600;color:#fff;letter-spacing:.06em}\n.acc-item.is-open .acc-panel{grid-template-rows:1fr}\n.terms{margin-top:28px;padding:18px 20px;border-radius:14px;border:1px solid var(--line);font-size:13px;color:var(--mut)}\n.terms a{color:var(--soft);text-decoration:underline;text-underline-offset:3px}\n.terms a:hover{color:#fff}\n.foot{padding:56px 0 calc(110px + env(safe-area-inset-bottom));border-top:1px solid var(--line);font-size:12.5px;color:#6f7a95}\n.foot-top{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:20px;margin-bottom:24px}\n.foot-links{display:flex;flex-wrap:wrap;gap:4px 22px;font-size:14px;color:var(--soft)}\n.foot-links a{min-height:44px;display:inline-flex;align-items:center}\n.foot-links a:hover{color:#fff}\n.foot p+p{margin-top:10px}\n.bar{position:fixed;left:50%;bottom:max(14px,env(safe-area-inset-bottom));z-index:40;display:flex;align-items:center;gap:14px;width:min(720px,calc(100% - 24px));padding:10px 10px 10px 20px;border-radius:18px;border:1px solid var(--line2);background:rgba(8,12,24,.86);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);box-shadow:0 20px 50px -20px rgba(0,0,0,.9);transform:translate(-50%,140%);transition:transform .5s var(--ease);visibility:hidden}\n.bar.is-on{transform:translate(-50%,0);visibility:visible}\n.bar-txt{flex:1 1 auto;font-size:14px;color:var(--soft);min-width:0}\n.bar-txt strong{color:var(--am);font-weight:600}\n.bar-code{display:inline-flex;align-items:center;gap:8px;min-height:42px;padding:0 14px;border-radius:11px;border:1px dashed rgba(255,170,100,.45);font-weight:600;letter-spacing:.1em;font-size:14px;color:#fff;transition:background .2s}\n.bar-code svg{flex:0 0 auto}\n.bar-code:hover{background:rgba(255,255,255,.06)}\n.bar-code.is-done{background:var(--am);color:#1a0d04;border-style:solid}\n.js .rv{opacity:0;transform:translateY(18px);transition:opacity .8s ease,transform .9s var(--ease)}\n.js .rv.in{opacity:1;transform:none}\n.js .tickets.rv .ticket{opacity:0;transition:transform .45s var(--ease),opacity .6s ease}\n.js .tickets.rv.in .ticket{opacity:1;transition-delay:calc((var(--d) + 4.5) * 60ms),calc((var(--d) + 4.5) * 60ms)}\n.js .tickets.rv.in .ticket:hover{transition-delay:0s}\n[data-only=\"ended\"],[data-only=\"upcoming\"]{display:none}\nhtml[data-state=\"ended\"] [data-only=\"ended\"]{display:revert}\nhtml[data-state=\"upcoming\"] [data-only=\"upcoming\"]{display:revert}\nhtml[data-state=\"ended\"] [data-hide=\"ended\"]{display:none!important}\nhtml[data-state=\"ended\"] .cd{display:none}\nhtml[data-state=\"ended\"] .cd-ended{display:block}\n.bloom{position:absolute;left:6%;right:6%;top:16%;bottom:-6%;pointer-events:none;background:radial-gradient(42% 44% at 50% 64%,rgba(255,176,100,.6),rgba(255,122,26,.2) 45%,transparent 72%);opacity:0;transition:opacity 1.6s ease .4s}\n.is-open .bloom{opacity:.75}\n.hero.is-entering .bloom{opacity:1;transition-delay:0s}\n.is-unlatch .rim{opacity:1;filter:brightness(1.8) saturate(1.2);transition:opacity .15s,filter .15s}\n.is-open .rim{opacity:0;filter:none;transition:opacity 1.2s,filter 1.2s}\n.is-unlatch .scene{animation:shake .34s linear}\n@keyframes shake{0%,100%{transform:translateX(-50%)}20%{transform:translate(calc(-50% - 2px),1px)}40%{transform:translate(calc(-50% + 2px),-1px)}60%{transform:translate(calc(-50% - 1px),0)}80%{transform:translate(calc(-50% + 1px),1px)}}\n.scene{transform-origin:50% 64%;transition:transform 2.6s cubic-bezier(.3,.1,.2,1)}\n.is-open .scene{transform:translateX(-50%) scale(1.045)}\n.snd{position:relative;width:42px;height:42px;display:grid;place-items:center;border-radius:50%;border:1px solid var(--line2);background:rgba(255,255,255,.02);color:var(--soft);transition:color .2s,border-color .2s,background .2s}\n.snd:hover{color:#fff;border-color:rgba(200,215,255,.35)}\n.snd .off{display:none}\n.snd[aria-pressed=\"false\"] .on{display:none}\n.snd[aria-pressed=\"false\"] .off{display:block}\n.snd[aria-pressed=\"true\"]::after{content:\"\";position:absolute;inset:-1px;border-radius:50%;border:1px solid rgba(255,150,70,.45);opacity:0;animation:sndping 2.4s ease-out 1s 2}\n@keyframes sndping{0%{opacity:.9;transform:scale(1)}100%{opacity:0;transform:scale(1.45)}}\n.gate-only{display:none!important}\nhtml.is-gated,html.is-gated body{overflow:hidden}\n.is-gated .gate-only{display:inline-flex!important}\n.is-gated .nav{position:fixed;z-index:60;transition:opacity .6s ease}\n.is-gated .hero{position:fixed;inset:0;z-index:50;height:100%;min-height:0;padding:74px 0 18px;align-items:stretch}\n.is-gated .hero-grid{height:100%;grid-template-columns:minmax(0,1fr);grid-template-rows:auto minmax(0,1fr) auto;grid-template-areas:\"copy\" \"stage\" \"act\";row-gap:14px;text-align:center}\n.is-gated .hero-copy,.is-gated .hero-act{max-width:780px;margin-inline:auto;align-self:auto}\n.is-gated .hero h1{margin-top:12px;font-size:clamp(28px,3vw,42px)}\n.is-gated .hero-sub{margin-top:8px}\n.is-gated .hero-stage{height:auto;min-height:0;margin:0;align-self:stretch;transform-origin:var(--ox,50%) var(--oy,60%);will-change:transform}\n.is-gated .int-txt{display:none}\n.hero.is-entering .fog{opacity:0;transition:opacity .6s}\n.is-gated .hero-ctas{justify-content:center;margin-top:2px}\n.is-gated .offer-strip,.is-gated .scroll-cue,.is-gated [data-skip-offer],.is-gated .hero-ctas [data-after]{display:none!important}\n.gate-hint{justify-content:center;align-items:center;gap:8px;width:100%;margin-top:6px;font-size:12px;letter-spacing:.06em;color:var(--mut)}\n.hero-copy,.hero-act{transition:opacity .6s ease}\n.hero.is-entering .hero-copy,.hero.is-entering .hero-act,.nav.is-entering{opacity:0}\n.hero.is-entering .hero-stage{transform:scale(var(--zoom,1.9));transition:transform 1.4s cubic-bezier(.55,0,.35,1)}\n.hero.is-entering .embers{display:none}\n.snap,.snap *{transition:none!important}\n.flash{position:fixed;inset:0;z-index:80;pointer-events:none;overflow:hidden;opacity:0;visibility:hidden;will-change:opacity}\n.is-gated .flash{visibility:visible}\n.flash.is-on{opacity:1;visibility:visible;transition:opacity .4s ease .15s}\n.flash.is-out{opacity:0;visibility:visible;transition:opacity 1.15s cubic-bezier(.25,.6,.3,1)}\n.flash-core{position:absolute;left:var(--fx,50%);top:var(--fy,60%);width:100vmax;height:100vmax;margin:-50vmax 0 0 -50vmax;border-radius:50%;background:radial-gradient(closest-side,#fff7ea 0%,#ffd8a0 14%,#ffa04a 34%,#e2620f 60%,rgba(150,48,10,.92) 80%,rgba(60,18,5,0) 100%);transform:scale(.12);will-change:transform}\n.flash.is-on .flash-core{transform:scale(3.4);transition:transform 1.25s cubic-bezier(.7,0,.3,1) .05s}\n.flash.is-out .flash-core{transform:scale(3.4)}\n.reveal-sec.pre-enter .mega,.reveal-sec.pre-enter .sec-head,.reveal-sec.pre-enter .mega-sub{opacity:0}\n.reveal-sec.just-entered .mega{animation:megaIn 1.6s cubic-bezier(.16,.8,.24,1) both;will-change:transform,opacity}\n.reveal-sec.just-entered .sec-head{animation:fadeUp 1.1s var(--ease) .45s both}\n.reveal-sec.just-entered .mega-sub{animation:fadeUp 1.1s var(--ease) .7s both}\n@keyframes megaIn{from{opacity:0;transform:scale(1.18)}to{opacity:1;transform:none}}\n@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}\n@media (max-width:1080px){\n.hero-grid{column-gap:28px}\n.ticket{width:104px;margin-left:-30px}\n.tickets{margin-left:30px}\n.t-amt{font-size:25px}\n}\n@media (max-width:900px){\n.hero{min-height:0;padding:96px 0 64px}\n.hero-grid{grid-template-columns:minmax(0,1fr);grid-template-areas:\"copy\" \"stage\" \"act\";text-align:center;row-gap:8px}\n.hero-copy,.hero-act{max-width:640px;margin-inline:auto}\n.hero-ctas,.offer-strip{justify-content:center}\n.hero-stage{height:clamp(340px,56vh,500px);min-height:0;margin:8px 0 0}\n.scroll-cue{display:none}\n.is-gated .hero{padding:78px 0 20px}\n.claim-card{grid-template-columns:1fr;gap:28px}\n.steps{grid-template-columns:1fr;gap:12px;margin-top:32px}\n.step h3{margin-top:18px}\n.faq-grid{grid-template-columns:1fr;gap:28px}\n}\n@media (max-width:640px){\n.wrap{width:calc(100% - 32px)}\n.nav{padding:14px 0}\n.logo img{height:24px}\n.nav .btn-sm{padding:0 14px;font-size:13px}\n.hero{padding-top:84px}\n.hero h1{margin-top:16px;font-size:clamp(30px,8.4vw,36px)}\n.hero-sub{margin-top:12px}\n.hero-stage{height:clamp(280px,44vh,400px)}\n.hero-ctas{flex-direction:column;align-items:stretch;gap:4px;margin-top:22px}\n.hero-ctas .btn{width:100%}\n.hero-ctas .link{justify-content:center}\n.offer-strip{margin-top:18px;gap:8px}\n.offer-strip li{width:100%;justify-content:center;font-size:13px;padding:10px 12px}\n.tickets{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;margin:0;padding:36px 0 18px}\n.ticket{width:auto;margin:0;transform:none!important}\n.t-in{padding:10px 4px 8px;border-radius:9px;-webkit-mask:none;mask:none}\n.t-in::after,.t-lbl,.t-stub{display:none}\n.t-no{font-size:8px;letter-spacing:.1em}\n.t-amt{font-size:clamp(14px,4.3vw,18px);margin-bottom:auto}\n.mega{gap:.04em}\n.code-row{flex-direction:column;align-items:stretch;text-align:center;padding:16px}\n.copy{justify-content:center}\n.cd{gap:8px}\n.cd-u{padding:16px 4px 14px;border-radius:14px}\n.cd-l{font-size:9.5px;letter-spacing:.12em}\n.acc-btn{font-size:16px;padding:18px 2px}\n.acc-panel p{padding-right:8px}\n.bar{padding:8px 8px 8px 14px;gap:8px}\n.bar-txt{display:none}\n.bar-code{flex:1 1 auto;justify-content:center}\n.bar .btn{padding:0 14px}\n.nav-r .btn-sm{display:none}\n.is-gated .hero-ctas .btn{width:100%}\n}\n@media (prefers-reduced-motion:reduce){\nhtml{scroll-behavior:auto}\n*,*::before,*::after{animation:none!important;transition-duration:.01ms!important;transition-delay:0s!important}\n.js .rv{opacity:1;transform:none}\n.js .tickets.rv .ticket{opacity:1}\n.int-txt{filter:none}\n}";
var HTML = "<a class=\"skip\" href=\"#main\">Skip to content</a>\n<header class=\"nav\">\n<div class=\"wrap\">\n<a class=\"logo\" href=\"https://www.prime.bullwaves.com/\" aria-label=\"Bullwaves Prime home\">\n<img src=\"https://cdn.prod.website-files.com/66f2e0fef32885327272def5/69849dceac3104a2fd34ffaf_Group%201410103699%2012.png\" alt=\"Bullwaves Prime\" height=\"30\" decoding=\"async\" data-logo>\n</a>\n<div class=\"nav-r\">\n<button class=\"snd\" type=\"button\" data-sound aria-pressed=\"true\" aria-label=\"Sound effects\">\n<svg class=\"on\" viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" aria-hidden=\"true\"><path d=\"M4 9.5h3.5L12 5.5v13l-4.5-4H4z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linejoin=\"round\"/><path d=\"M15.5 9a4.2 4.2 0 0 1 0 6M18 6.5a7.8 7.8 0 0 1 0 11\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\"/></svg>\n<svg class=\"off\" viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" aria-hidden=\"true\"><path d=\"M4 9.5h3.5L12 5.5v13l-4.5-4H4z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linejoin=\"round\"/><path d=\"M16 9.5l5 5M21 9.5l-5 5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\"/></svg>\n</button>\n<a class=\"btn btn-ghost btn-sm\" data-href=\"challengeUrl\" href=\"https://www.prime.bullwaves.com/challenge\">Choose Your Challenge</a>\n</div>\n</div>\n</header>\n<main id=\"main\">\n<section class=\"hero\" id=\"top\" aria-labelledby=\"hero-title\">\n<div class=\"hero-bg\" aria-hidden=\"true\"></div>\n<div class=\"hero-warm\" aria-hidden=\"true\"></div>\n<div class=\"wrap hero-grid\">\n<div class=\"hero-copy\">\n<p class=\"chip\"><i aria-hidden=\"true\"></i><span data-hide=\"ended\">Halloween 2026 <span aria-hidden=\"true\">&middot;</span> <span data-bind=\"dateLabel\">Oct 22 to 31</span></span><span data-only=\"ended\">Halloween 2026 <span aria-hidden=\"true\">&middot;</span> Promotion ended</span></p>\n<h1 id=\"hero-title\">This Halloween, Something Big Is Behind The Door.</h1>\n<p class=\"hero-sub\">No Tricks. <em>Just Funding.</em></p>\n</div>\n<div class=\"hero-stage\">\n<div class=\"scene\" data-scene aria-hidden=\"true\">\n<div data-frame></div>\n<div class=\"portal\" data-portal>\n<div class=\"int\">\n<div class=\"rays\"></div>\n<div class=\"int-txt\">\n<div data-hide=\"ended\"><b>35%</b><span>OFF</span></div>\n<div data-only=\"ended\"><span>THANK YOU</span><small>See you next season</small></div>\n</div>\n</div>\n<div class=\"leaf leaf-l\" data-leaf=\"l\"><i class=\"edge\"></i><i class=\"shade\"></i></div>\n<div class=\"leaf leaf-r\" data-leaf=\"r\"><i class=\"edge\"></i><i class=\"shade\"></i></div>\n</div>\n<div class=\"rim\" data-rim></div>\n<div class=\"bloom\"></div>\n<canvas class=\"embers\" data-embers></canvas>\n<button class=\"doorhit\" type=\"button\" tabindex=\"-1\" aria-hidden=\"true\" data-unlock></button>\n</div>\n</div>\n<div class=\"hero-act\">\n<div class=\"hero-ctas\">\n<button class=\"btn btn-primary\" type=\"button\" data-unlock data-tease data-before aria-controls=\"reveal\">\n<svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" aria-hidden=\"true\"><circle cx=\"8\" cy=\"12\" r=\"4\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\"/><path d=\"M12 12h9M18 12v3M21 12v2\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\"/></svg>\nUnlock Your Treat\n</button>\n<a class=\"link\" href=\"#reveal\" data-before data-skip-offer>Skip to the offer</a>\n<button class=\"link gate-only\" type=\"button\" data-skip-gate>Skip intro</button>\n<a class=\"btn btn-primary\" href=\"#reveal\" data-after>\nReveal Your Treat\n<svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" aria-hidden=\"true\"><path d=\"M12 5v14M6 13l6 6 6-6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>\n</a>\n<button class=\"link\" type=\"button\" data-replay data-after>\n<svg viewBox=\"0 0 24 24\" width=\"16\" height=\"16\" aria-hidden=\"true\"><path d=\"M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>\nClose the door\n</button>\n</div>\n<ul class=\"offer-strip\" aria-label=\"Halloween offer\">\n<li><strong>35% OFF</strong> All Challenge Accounts</li>\n<li><strong>10 &times; $50K</strong> Challenge Accounts Giveaway</li>\n</ul>\n<p class=\"gate-hint gate-only\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" width=\"14\" height=\"14\"><path d=\"M4 9.5h3.5L12 5.5v13l-4.5-4H4z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linejoin=\"round\"/><path d=\"M15.5 9a4.2 4.2 0 0 1 0 6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\"/></svg>Best experienced with sound on</p>\n<p class=\"sr\" role=\"status\" aria-live=\"polite\" data-door-status></p>\n</div>\n</div>\n<div class=\"fog\" aria-hidden=\"true\"></div>\n<div class=\"fog f2\" aria-hidden=\"true\"></div>\n<a class=\"scroll-cue\" href=\"#reveal\" aria-label=\"Scroll to the offer\">Scroll</a>\n</section>\n<section class=\"sec reveal-sec center\" id=\"reveal\" aria-labelledby=\"reveal-title\" tabindex=\"-1\">\n<div class=\"wrap\">\n<div class=\"sec-head rv\">\n<p class=\"eyebrow\"><i aria-hidden=\"true\"></i>The Big Reveal</p>\n<h2 class=\"h2\" id=\"reveal-title\">No Tricks. Just Funding.</h2>\n</div>\n<p class=\"mega rv\" aria-label=\"35% off\"><span class=\"mega-n\" aria-hidden=\"true\">35%</span><span class=\"mega-off\" aria-hidden=\"true\">OFF</span></p>\n<p class=\"mega-sub rv\">All Bullwaves Prime Challenge Accounts.</p>\n<div class=\"divider\" aria-hidden=\"true\"></div>\n<div class=\"give-head rv\">\n<h3>10 Lucky Traders. <span>10 &times; $50K Challenges.</span></h3>\n</div>\n<ul class=\"tickets rv\" aria-label=\"Ten $50K Challenge Account prizes\">\n<li class=\"ticket\" style=\"--d:-4.5\"><div class=\"t-in\"><span class=\"t-no\">NO. 01</span><span class=\"t-amt\">$50K</span><span class=\"t-lbl\">Challenge Account</span><span class=\"t-stub\">Halloween 2026</span></div></li>\n<li class=\"ticket\" style=\"--d:-3.5\"><div class=\"t-in\"><span class=\"t-no\">NO. 02</span><span class=\"t-amt\">$50K</span><span class=\"t-lbl\">Challenge Account</span><span class=\"t-stub\">Halloween 2026</span></div></li>\n<li class=\"ticket\" style=\"--d:-2.5\"><div class=\"t-in\"><span class=\"t-no\">NO. 03</span><span class=\"t-amt\">$50K</span><span class=\"t-lbl\">Challenge Account</span><span class=\"t-stub\">Halloween 2026</span></div></li>\n<li class=\"ticket\" style=\"--d:-1.5\"><div class=\"t-in\"><span class=\"t-no\">NO. 04</span><span class=\"t-amt\">$50K</span><span class=\"t-lbl\">Challenge Account</span><span class=\"t-stub\">Halloween 2026</span></div></li>\n<li class=\"ticket\" style=\"--d:-0.5\"><div class=\"t-in\"><span class=\"t-no\">NO. 05</span><span class=\"t-amt\">$50K</span><span class=\"t-lbl\">Challenge Account</span><span class=\"t-stub\">Halloween 2026</span></div></li>\n<li class=\"ticket\" style=\"--d:0.5\"><div class=\"t-in\"><span class=\"t-no\">NO. 06</span><span class=\"t-amt\">$50K</span><span class=\"t-lbl\">Challenge Account</span><span class=\"t-stub\">Halloween 2026</span></div></li>\n<li class=\"ticket\" style=\"--d:1.5\"><div class=\"t-in\"><span class=\"t-no\">NO. 07</span><span class=\"t-amt\">$50K</span><span class=\"t-lbl\">Challenge Account</span><span class=\"t-stub\">Halloween 2026</span></div></li>\n<li class=\"ticket\" style=\"--d:2.5\"><div class=\"t-in\"><span class=\"t-no\">NO. 08</span><span class=\"t-amt\">$50K</span><span class=\"t-lbl\">Challenge Account</span><span class=\"t-stub\">Halloween 2026</span></div></li>\n<li class=\"ticket\" style=\"--d:3.5\"><div class=\"t-in\"><span class=\"t-no\">NO. 09</span><span class=\"t-amt\">$50K</span><span class=\"t-lbl\">Challenge Account</span><span class=\"t-stub\">Halloween 2026</span></div></li>\n<li class=\"ticket\" style=\"--d:4.5\"><div class=\"t-in\"><span class=\"t-no\">NO. 10</span><span class=\"t-amt\">$50K</span><span class=\"t-lbl\">Challenge Account</span><span class=\"t-stub\">Halloween 2026</span></div></li>\n</ul>\n<p class=\"prize-note rv\"><strong>Each prize is one $50K Bullwaves Prime Challenge Account.</strong> Prizes are Challenge Accounts, not cash, and are not withdrawable capital.</p>\n</div>\n</section>\n<section class=\"sec\" id=\"claim\" aria-labelledby=\"claim-title\" style=\"padding-top:0\">\n<div class=\"wrap\">\n<div class=\"claim-card rv\">\n<div>\n<p class=\"eyebrow\"><i aria-hidden=\"true\"></i>Claim Your Treat</p>\n<h2 class=\"h2\" id=\"claim-title\" style=\"margin-top:16px\">Your Halloween Treat Is Ready.</h2>\n<p class=\"lede\" data-hide=\"ended\">Copy your code, pick any Challenge Account and enter the code at checkout to get 35% off.</p>\n<p class=\"lede\" data-only=\"ended\">The Halloween promotion has ended and this code is no longer valid. Challenge Accounts remain available at standard pricing.</p>\n</div>\n<div class=\"code-box\">\n<p class=\"code-lbl\" id=\"code-lbl\">Halloween promo code</p>\n<div class=\"code-row\">\n<span class=\"code\" data-bind=\"promoCode\" aria-labelledby=\"code-lbl\">NOTRICKS35</span>\n<button class=\"copy\" type=\"button\" data-copy>\n<svg class=\"cp\" viewBox=\"0 0 24 24\" width=\"16\" height=\"16\" aria-hidden=\"true\"><rect x=\"8\" y=\"8\" width=\"12\" height=\"12\" rx=\"2.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\"/><path d=\"M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\"/></svg>\n<svg class=\"ok\" viewBox=\"0 0 24 24\" width=\"16\" height=\"16\" aria-hidden=\"true\"><path d=\"M5 12.5l4.5 4.5L19 7.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>\n<span data-copy-lbl>Copy Code</span>\n</button>\n</div>\n<a class=\"btn btn-primary\" data-href=\"challengeUrl\" href=\"https://www.prime.bullwaves.com/challenge\" data-cta=\"claim\">\n<span data-hide=\"ended\">Choose Your Challenge</span><span data-only=\"ended\">View Challenges</span>\n<svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" aria-hidden=\"true\"><path d=\"M5 12h14M13 6l6 6-6 6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>\n</a>\n<p class=\"code-note\" data-hide=\"ended\">Enter the code at checkout. The discount is not applied automatically.</p>\n<p class=\"code-note\" data-only=\"upcoming\">The code is valid from <span data-bind=\"startText\">October 22, 2026</span>.</p>\n<p class=\"sr\" role=\"status\" aria-live=\"polite\" data-copy-status></p>\n</div>\n</div>\n</div>\n</section>\n<section class=\"sec center\" id=\"giveaway\" aria-labelledby=\"enter-title\" style=\"padding-top:0\">\n<div class=\"wrap\">\n<div class=\"sec-head rv\">\n<p class=\"eyebrow\"><i aria-hidden=\"true\"></i>$50K Giveaway</p>\n<h2 class=\"h2\" id=\"enter-title\">How to Enter the Giveaway</h2>\n</div>\n<ol class=\"steps\" style=\"text-align:left\">\n<li class=\"step rv\">\n<div class=\"step-top\"><span class=\"step-n\">01</span><span class=\"step-ic\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\"><rect x=\"4\" y=\"4\" width=\"7\" height=\"7\" rx=\"1.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\"/><rect x=\"13\" y=\"4\" width=\"7\" height=\"7\" rx=\"1.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\"/><rect x=\"4\" y=\"13\" width=\"7\" height=\"7\" rx=\"1.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\"/><rect x=\"13\" y=\"13\" width=\"7\" height=\"7\" rx=\"1.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\"/></svg></span></div>\n<h3>Choose Your Challenge.</h3>\n<p>Select your preferred Bullwaves Prime Challenge Account.</p>\n</li>\n<li class=\"step rv\">\n<div class=\"step-top\"><span class=\"step-n\">02</span><span class=\"step-ic\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\"><path d=\"M3.5 12.6V5.5a2 2 0 0 1 2-2h7.1a2 2 0 0 1 1.4.6l6.4 6.4a2 2 0 0 1 0 2.8l-7.1 7.1a2 2 0 0 1-2.8 0l-6.4-6.4a2 2 0 0 1-.6-1.4z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\"/><circle cx=\"8.5\" cy=\"8.5\" r=\"1.5\" fill=\"currentColor\"/></svg></span></div>\n<h3>Use the Halloween Code.</h3>\n<p>Apply the eligible promotional code <strong style=\"color:#fff;font-weight:600;letter-spacing:.05em\" data-bind=\"giveawayCode\">NOTRICKS35</strong> during checkout.</p>\n</li>\n<li class=\"step rv\">\n<div class=\"step-top\"><span class=\"step-n\">03</span><span class=\"step-ic\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\"><circle cx=\"12\" cy=\"12\" r=\"8.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\"/><path d=\"M8 12.3l2.7 2.7L16.2 9.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg></span></div>\n<h3>You&rsquo;re In.</h3>\n<p>Eligible purchases automatically enter the giveaway for a chance to win one of ten $50K Challenge Accounts.</p>\n</li>\n</ol>\n</div>\n</section>\n<section class=\"sec\" id=\"countdown\" aria-labelledby=\"cd-title\" style=\"padding-top:0\">\n<div class=\"wrap\">\n<div class=\"cd-card rv\">\n<p class=\"eyebrow\"><i aria-hidden=\"true\"></i><span data-cd-eyebrow>Limited Time</span></p>\n<h2 class=\"h2\" id=\"cd-title\" style=\"margin-top:14px\" data-cd-title>The Doors Close Soon.</h2>\n<div class=\"cd\" role=\"timer\" aria-labelledby=\"cd-title\" aria-describedby=\"cd-deadline\">\n<div class=\"cd-u\"><span class=\"cd-v\" data-cd=\"d\">00</span><span class=\"cd-l\">Days</span></div>\n<div class=\"cd-u\"><span class=\"cd-v\" data-cd=\"h\">00</span><span class=\"cd-l\">Hours</span></div>\n<div class=\"cd-u\"><span class=\"cd-v\" data-cd=\"m\">00</span><span class=\"cd-l\">Minutes</span></div>\n<div class=\"cd-u\"><span class=\"cd-v\" data-cd=\"s\">00</span><span class=\"cd-l\">Seconds</span></div>\n</div>\n<p class=\"cd-deadline\" id=\"cd-deadline\" data-hide=\"ended\" data-cd-deadline>Offer ends October 31, 2026.</p>\n<p class=\"cd-ended\">The Bullwaves Prime Halloween promotion has ended. Thank you to every trader who took part. Giveaway winners will be contacted as set out in the official giveaway rules.</p>\n</div>\n</div>\n</section>\n<section class=\"sec faq\" id=\"faq\" aria-labelledby=\"faq-title\" style=\"padding-top:0\">\n<div class=\"wrap faq-grid\">\n<div class=\"sec-head rv\">\n<p class=\"eyebrow\"><i aria-hidden=\"true\"></i>FAQ</p>\n<h2 class=\"h2\" id=\"faq-title\">Good Questions. Straight Answers.</h2>\n<p class=\"lede\" style=\"max-width:380px\">Everything you need to know about the Halloween offer and the $50K giveaway.</p>\n</div>\n<div class=\"rv\">\n<div class=\"acc\" data-acc>\n<div class=\"acc-item\">\n<h3><button class=\"acc-btn\" type=\"button\" aria-expanded=\"false\" aria-controls=\"faq-1\" id=\"faq-b1\">How do I get 35% off?<span class=\"acc-ic\" aria-hidden=\"true\"></span></button></h3>\n<div class=\"acc-panel\" id=\"faq-1\" role=\"region\" aria-labelledby=\"faq-b1\"><div><p>Choose any Bullwaves Prime Challenge Account and enter <code data-bind=\"promoCode\">NOTRICKS35</code> at checkout during the promotion period, <span data-bind=\"periodText\">October 22 to October 31, 2026</span>. The discount is not applied automatically, so make sure the code is entered before you complete your purchase.</p></div></div>\n</div>\n<div class=\"acc-item\">\n<h3><button class=\"acc-btn\" type=\"button\" aria-expanded=\"false\" aria-controls=\"faq-2\" id=\"faq-b2\">How do I enter the $50K giveaway?<span class=\"acc-ic\" aria-hidden=\"true\"></span></button></h3>\n<div class=\"acc-panel\" id=\"faq-2\" role=\"region\" aria-labelledby=\"faq-b2\"><div><p>Complete an eligible Challenge Account purchase using the code <code data-bind=\"giveawayCode\">NOTRICKS35</code> during the promotion period. Eligible purchases are entered automatically, subject to the official giveaway rules.</p></div></div>\n</div>\n<div class=\"acc-item\">\n<h3><button class=\"acc-btn\" type=\"button\" aria-expanded=\"false\" aria-controls=\"faq-3\" id=\"faq-b3\">How many winners will be selected?<span class=\"acc-ic\" aria-hidden=\"true\"></span></button></h3>\n<div class=\"acc-panel\" id=\"faq-3\" role=\"region\" aria-labelledby=\"faq-b3\"><div><p>Ten winners will be selected. Each winner receives one $50K Bullwaves Prime Challenge Account. Prizes are Challenge Accounts, not cash, and are not withdrawable capital. <span data-bind=\"drawText\">The draw date and how winners are notified are set out in the official giveaway rules.</span></p></div></div>\n</div>\n<div class=\"acc-item\">\n<h3><button class=\"acc-btn\" type=\"button\" aria-expanded=\"false\" aria-controls=\"faq-4\" id=\"faq-b4\">When does the Halloween promotion end?<span class=\"acc-ic\" aria-hidden=\"true\"></span></button></h3>\n<div class=\"acc-panel\" id=\"faq-4\" role=\"region\" aria-labelledby=\"faq-b4\"><div><p>The promotion ends on <span data-bind=\"endText\">October 31, 2026</span>. Only purchases completed within the promotion period qualify for the discount and the giveaway.</p></div></div>\n</div>\n<div class=\"acc-item\">\n<h3><button class=\"acc-btn\" type=\"button\" aria-expanded=\"false\" aria-controls=\"faq-5\" id=\"faq-b5\">Are all Challenge Accounts eligible?<span class=\"acc-ic\" aria-hidden=\"true\"></span></button></h3>\n<div class=\"acc-panel\" id=\"faq-5\" role=\"region\" aria-labelledby=\"faq-b5\"><div><p>Yes. The 35% discount applies to all Bullwaves Prime Challenge Accounts. <span data-bind=\"eligText\">Eligibility requirements and any regional restrictions are set out in the promotional terms.</span></p></div></div>\n</div>\n</div>\n<p class=\"terms\">This promotion is subject to the <a data-href=\"termsUrl\" href=\"https://www.prime.bullwaves.com/legal\" target=\"_blank\" rel=\"noopener\">Promotional Terms</a> and the <a data-href=\"rulesUrl\" href=\"https://www.prime.bullwaves.com/legal\" target=\"_blank\" rel=\"noopener\">Giveaway Rules</a>. Please read them before purchasing.</p>\n</div>\n</div>\n</section>\n</main>\n<footer class=\"foot\">\n<div class=\"wrap\">\n<div class=\"foot-top\">\n<a class=\"logo\" href=\"https://www.prime.bullwaves.com/\" aria-label=\"Bullwaves Prime home\"><img src=\"https://cdn.prod.website-files.com/66f2e0fef32885327272def5/69849dceac3104a2fd34ffaf_Group%201410103699%2012.png\" alt=\"Bullwaves Prime\" height=\"26\" style=\"height:26px\" loading=\"lazy\" decoding=\"async\" data-logo></a>\n<nav class=\"foot-links\" aria-label=\"Footer\">\n<a data-href=\"challengeUrl\" href=\"https://www.prime.bullwaves.com/challenge\">Challenges</a>\n<a href=\"https://www.prime.bullwaves.com/trading-rules\">Trading Rules</a>\n<a href=\"https://www.prime.bullwaves.com/legal\">Legal</a>\n<a href=\"https://www.prime.bullwaves.com/contact-us\">Contact</a>\n</nav>\n</div>\n<p>Bullwaves Prime is owned and operated by Moonance LLC, a company incorporated in Saint Vincent &amp; the Grenadines, with registration no. 2141 LLC 2022. Bullwaves is the trading name of Equitex Capital Limited, which serves as the technology provider for Bullwaves Prime.</p>\n<p>Risk warning: over-the-counter derivatives are complex instruments and carry a high risk of losing capital rapidly due to leverage. Services are not offered in jurisdictions where they would be contrary to local laws or regulations. Read the <a href=\"https://www.prime.bullwaves.com/legal\" style=\"text-decoration:underline\">legal documents</a> before purchasing.</p>\n<p>Copyright &copy; Equitex Capital Limited. All rights reserved.</p>\n</div>\n</footer>\n<div class=\"flash\" data-flash aria-hidden=\"true\"><div class=\"flash-core\"></div></div>\n<div class=\"bar\" data-bar data-hide=\"ended\" aria-label=\"Halloween offer shortcut\" role=\"region\">\n<p class=\"bar-txt\"><strong>35% OFF</strong> all Challenge Accounts</p>\n<button class=\"bar-code\" type=\"button\" data-copy aria-label=\"Copy promo code NOTRICKS35\"><span data-bind=\"promoCode\">NOTRICKS35</span><svg viewBox=\"0 0 24 24\" width=\"15\" height=\"15\" aria-hidden=\"true\"><rect x=\"8\" y=\"8\" width=\"12\" height=\"12\" rx=\"2.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\"/><path d=\"M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\"/></svg></button>\n<a class=\"btn btn-primary btn-sm\" data-href=\"challengeUrl\" href=\"https://www.prime.bullwaves.com/challenge\" data-cta=\"bar\">Choose Your Challenge</a>\n</div>";
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
    start: '2026-10-22T00:00:00',
    end: '2026-10-31T23:59:59',
    timezone: 'UTC',
    timezoneLabel: 'UTC',
    showEndTime: true,
    dateLabel: 'Oct 22 to 31',
    drawDate: null,
    winnerNotice: null,
    eligibilityNote: null,
    challengeUrl: 'https://www.prime.bullwaves.com/challenge',
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
  $$('.bar-code').forEach(function (b) { b.setAttribute('aria-label', 'Copy promo code ' + CONFIG.promoCode); });
  $('[data-cd-deadline]').textContent = 'Offer ends ' + endText + '.';
  $$('[data-logo]').forEach(function (img) {
    img.addEventListener('error', function () { var s = doc.createElement('span'); s.className = 'logo-fb'; s.textContent = 'Bullwaves Prime'; img.replaceWith(s); });
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
      wins += '<path d="' + p + '" fill="#0a0503"/><path class="win" d="' + p + '" fill="url(#' + id + 'g)"/>' +
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
    return '<svg class="frame" viewBox="0 0 440 600" aria-hidden="true" focusable="false"><defs>' +
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
      '<path class="jw" d="' + arch(X0, Y0, 17) + '" fill="url(#bwl-wm)"/>' +
      '<g fill="#1d2539" stroke="#04060b" stroke-width="1"><rect x="26" y="' + n(sy - 5) + '" width="50" height="10"/><rect x="364" y="' + n(sy - 5) + '" width="50" height="10"/><rect x="26" y="526" width="50" height="22"/><rect x="364" y="526" width="50" height="22"/></g>' +
      '<path d="M27 ' + n(sy - 4.4) + 'H75M365 ' + n(sy - 4.4) + 'H413M27 526.6H75M365 526.6H413" stroke="#5878d8" stroke-opacity=".3"/>' +
      '<rect x="66" y="548" width="308" height="8" fill="#151c2e"/><path d="M66 548.5H374" stroke="#8aa0ff" stroke-opacity=".12"/>' +
      '<path class="spill" mask="url(#bwl-m)" d="M90 556H350L432 600H8Z" fill="url(#bwl-sp)"/>' +
      '<g transform="translate(394 560)">' +
      '<ellipse class="pkg" cx="0" cy="26" rx="52" ry="10" fill="url(#bwl-pg)"/>' +
      '<ellipse cx="0" cy="25" rx="30" ry="4.5" fill="#000" opacity=".6"/>' +
      '<g fill="url(#bwl-pk)" stroke="#1a0903" stroke-opacity=".6" stroke-width=".8"><ellipse cx="-15" cy="7" rx="13" ry="17"/><ellipse cx="15" cy="7" rx="13" ry="17"/><ellipse cx="-7" cy="6" rx="13" ry="19"/><ellipse cx="7" cy="6" rx="13" ry="19"/><ellipse cx="0" cy="5.5" rx="11" ry="19.5"/></g>' +
      '<path d="M-2-13C-2-19 1-23 6-25L8-23C4-21 3-17 3-13Z" fill="#2c3a22"/>' +
      '<g fill="#160703">' + face + '</g><g class="pkl" fill="#ffc46a" filter="url(#bwl-gl)">' + face + '</g>' +
      '<ellipse class="pkg" cx="0" cy="4" rx="26" ry="20" fill="url(#bwl-pg)" opacity=".5"/>' +
      '</g></svg>';
  }
  function rimSVG() {
    return '<svg viewBox="0 0 260 428" preserveAspectRatio="none" aria-hidden="true" focusable="false"><defs><filter id="bwl-rb" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3.2"/></filter></defs>' +
      '<g fill="none"><path d="' + arch(0, 0, 0) + '" stroke="#ff7a1a" stroke-width="4" filter="url(#bwl-rb)"/>' +
      '<path d="' + arch(0, 0, 0) + '" stroke="#ffb36b" stroke-opacity=".75" stroke-width=".9"/>' +
      '<path d="M130 6V426" stroke="#ff9a3c" stroke-width="3" filter="url(#bwl-rb)" opacity=".7"/>' +
      '<path d="M6 427H254" stroke="#ffc07a" stroke-width="3" filter="url(#bwl-rb)"/></g></svg>';
  }
  var hero = $('.hero');
  $('[data-frame]').outerHTML = frameSVG();
  $('[data-rim]').innerHTML = rimSVG();
  $('[data-portal]').style.clipPath = poly(0, W);
  $('[data-leaf="l"]').insertAdjacentHTML('afterbegin', doorSVG('l', '0 0 129 ' + H));
  $('[data-leaf="r"]').insertAdjacentHTML('afterbegin', doorSVG('r', '131 0 129 ' + H));
  $('[data-leaf="l"] .shade').style.clipPath = poly(0, 129);
  $('[data-leaf="r"] .shade').style.clipPath = poly(131, 129);
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
    hero.classList.remove('is-tease', 'is-closing');
    var y0 = window.scrollY, gated = html.classList.contains('is-gated');
    Sound.open();
    if (reduce) { hero.classList.add('is-open'); busy = false; }
    else {
      hero.classList.add('is-unlatch');
      setTimeout(function () { hero.classList.add('is-open'); embers(); }, 300);
      setTimeout(function () { busy = false; }, 2300);
    }
    status.textContent = state === 'ended' ? 'The door is open. The Halloween promotion has ended.' : 'The door is open. Your treat: 35% off all Bullwaves Prime Challenge Accounts.';
    if (gated) { $('#reveal').classList.add('pre-enter'); setTimeout(enterDoor, reduce ? 0 : 2050); firstOpen = false; track('halloween_unlock', { mode: 'gate' }); return; }
    setTimeout(function () { var a = $('.hero-ctas a[data-after]'); if (a && doc.activeElement && doc.activeElement.hasAttribute('data-unlock')) a.focus({ preventScroll: true }); }, 30);
    if (CONFIG.autoScrollAfterOpen && firstOpen && !reduce) {
      setTimeout(function () { if (Math.abs(window.scrollY - y0) < 40) $('#reveal').scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 3000);
    }
    firstOpen = false;
    track('halloween_unlock');
  }
  var flash = $('[data-flash]'), stage = $('.hero-stage');
  var gatedEls = $$('main > section:not(.hero), .foot, .bar');
  function setInert(v) { gatedEls.forEach(function (el) { if (v) el.setAttribute('inert', ''); else el.removeAttribute('inert'); }); }
  function enterDoor() {
    var sr = stage.getBoundingClientRect(), pr = $('[data-portal]').getBoundingClientRect();
    var cx = pr.left + pr.width / 2, cy = pr.top + pr.height * .62;
    stage.style.setProperty('--ox', (cx - sr.left).toFixed(1) + 'px');
    stage.style.setProperty('--oy', (cy - sr.top).toFixed(1) + 'px');
    flash.style.setProperty('--fx', cx.toFixed(0) + 'px'); flash.style.setProperty('--fy', cy.toFixed(0) + 'px');
    stopEmbers = true;
    hero.classList.add('is-entering'); $('.nav').classList.add('is-entering'); flash.classList.add('is-on');
    Sound.enter();
    setTimeout(function () { ungate(true); }, 1340);
    track('halloween_enter');
  }
  function ungate(toReveal) {
    if (!html.classList.contains('is-gated')) return;
    stage.classList.add('snap'); hero.classList.add('snap');
    html.classList.remove('is-gated'); hero.classList.remove('is-entering'); $('.nav').classList.remove('is-entering');
    setInert(false);
    try { sessionStorage.setItem('bwl_entered', '1'); } catch (e) {}
    var rv = $('#reveal');
    if (toReveal) {
      html.style.scrollBehavior = 'auto';
      window.scrollTo(0, rv.getBoundingClientRect().top + window.scrollY);
      html.style.scrollBehavior = '';
      $$('.rv', rv).forEach(function (el) { el.classList.add('in'); });
      rv.focus({ preventScroll: true });
    }
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      stage.classList.remove('snap'); hero.classList.remove('snap');
      setTimeout(function () {
        if (toReveal) { rv.classList.remove('pre-enter'); rv.classList.add('just-entered'); }
        flash.classList.add('is-out'); flash.classList.remove('is-on');
        setTimeout(function () { flash.classList.remove('is-out'); }, 1400);
      }, toReveal ? 120 : 0);
    }); });
  }
  if (html.classList.contains('is-gated')) {
    if (!CONFIG.gate) html.classList.remove('is-gated'); else setInert(true);
  }
  $('[data-skip-gate]').addEventListener('click', function () { ungate(false); track('halloween_skip_intro'); var b = $('.hero-ctas [data-unlock]'); b.focus({ preventScroll: true }); });
  function closeDoor() {
    if (!opened || busy) return; busy = true;
    stopEmbers = true;
    hero.classList.add('is-closing');
    hero.classList.remove('is-open', 'is-unlatch');
    status.textContent = 'The door is closed.';
    setTimeout(function () { opened = false; busy = false; hero.classList.remove('is-closing'); var b = $('.hero-ctas [data-unlock]'); if (doc.activeElement === doc.body || (doc.activeElement && doc.activeElement.hasAttribute('data-replay'))) b.focus({ preventScroll: true }); }, reduce ? 0 : 1300);
    track('halloween_replay');
  }
  $$('[data-unlock]').forEach(function (b) { b.addEventListener('click', openDoor); });
  $('[data-replay]').addEventListener('click', closeDoor);
  $$('[data-tease], .doorhit').forEach(function (b) {
    var on = function () { if (!opened) hero.classList.add('is-tease'); }, off = function () { hero.classList.remove('is-tease'); };
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
        btn.classList.add('is-done'); if (lbl) lbl.textContent = 'Copied';
        copyStatus.textContent = 'Code ' + CONFIG.promoCode + ' copied to clipboard.';
        clearTimeout(btn._t);
        btn._t = setTimeout(function () { btn.classList.remove('is-done'); if (lbl) lbl.textContent = 'Copy Code'; copyStatus.textContent = ''; }, 2400);
        track('halloween_copy_code', { location: btn.classList.contains('bar-code') ? 'bar' : 'claim' });
      }, function () {
        copyStatus.textContent = 'Copy failed. Select the code and copy it manually.';
        var r = doc.createRange(); r.selectNodeContents($('.code')); var s = getSelection(); s.removeAllRanges(); s.addRange(r);
      });
    });
  });
  $$('[data-cta]').forEach(function (a) { a.addEventListener('click', function () { track('halloween_cta_challenge', { location: a.getAttribute('data-cta') }); }); });
  $$('.acc-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      var item = b.closest('.acc-item'), open = b.getAttribute('aria-expanded') !== 'true';
      b.setAttribute('aria-expanded', String(open)); item.classList.toggle('is-open', open);
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
    if (ended) { $('[data-bar]').classList.remove('is-on'); }
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
    var ro = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px', threshold: .12 });
    $$('.rv').forEach(function (el) { ro.observe(el); });
    var seen = { hero: true, claim: false, foot: false };
    var bar = $('[data-bar]');
    function updateBar() { bar.classList.toggle('is-on', state !== 'ended' && !seen.hero && !seen.claim && !seen.foot); }
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var k = e.target === hero ? 'hero' : e.target.id === 'claim' ? 'claim' : 'foot';
        seen[k] = e.isIntersecting;
        if (k === 'hero') hero.classList.toggle('is-off', !e.isIntersecting);
      });
      updateBar();
    }, { threshold: 0 });
    [hero, $('#claim'), $('.foot')].forEach(function (el) { so.observe(el); });
  } else {
    $$('.rv').forEach(function (el) { el.classList.add('in'); });
  }
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
