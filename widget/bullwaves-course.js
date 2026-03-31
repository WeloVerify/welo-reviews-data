(function () {
  var ROOT_ID = "bwp__c7X9";
  var STORAGE_KEY = "bwp_course_state_v6:" + location.hostname + location.pathname + ":" + ROOT_ID;
  var HASH_PREFIX = "bwp-";
  var BRAND_LOGO = "https://cdn.prod.website-files.com/66f2e0fef32885327272def5/67d1ad5a62ad06f120c0b82c_Frame%202147223939%201aaaa.png";
  var NAV_SELECTOR_FALLBACKS = [".w-nav", "[data-nav]", ".navbar", "header"];

  var ICONS = {
    check: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    dot: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="5.5" stroke="currentColor" stroke-width="2.2"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
    arrowL: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    arrowR: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  var INTRO_SCREEN = {
    title: "Welcome to the course",
    desc: "Thanks for joining. Start now and go lesson by lesson.",
    video: "https://youtu.be/aD2Yp8svIYM",
    html: [
      '<div class="i0__intro">',
      '<p><strong>Welcome to the Bullwaves course.</strong></p>',
      '<p>This course is split into 4 modules so you can build strong foundations step by step.</p>',
      '<p>Each lesson includes a video and a short written recap so you can review the key ideas quickly.</p>',
      '<p>Once you complete the course, you’ll have a clear overview of the core concepts covered across all modules.</p>',
      '<div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap;">',
      '<button class="n1__btn" type="button" data-bwp="startCourse" data-primary="true" style="min-width:160px;">',
      'Start now ' + ICONS.arrowR,
      '</button>',
      '</div>',
      '</div>'
    ].join("")
  };

  var COURSE = {
    courseTitle: "Understanding Forex & CFDs",
    modules: [
      {
        id: "m1",
        name: "Module 1",
        lessons: [
          {
            id: "m1_l1",
            name: "Module 1: Forex Foundations",
            topics: [
              {
                id: "m1_t1",
                title: "What is Forex",
                desc: "A simple introduction to the Forex market and why currencies are always traded in pairs.",
                video: "https://youtu.be/XbgPZY7nhjc",
                html: [
                  "<p>This video introduces <strong>Forex</strong> as the global market where one currency is exchanged for another.</p>",
                  "<p>The main idea is simple: traders speculate on whether one currency will become stronger or weaker relative to another, which is why currencies are always shown in pairs such as <strong>EUR/USD</strong>.</p>",
                  "<p>The recap of this lesson is that Forex is not a local market with one single exchange, it is a huge global market active across different financial centres, and understanding this structure is the first step before learning how to trade it properly.</p>"
                ].join("")
              },
              {
                id: "m1_t2",
                title: "Currency Pairs",
                desc: "Base currency, quote currency, and how to read a Forex quote correctly.",
                video: "https://youtu.be/eMimFwMPC3E",
                html: [
                  "<p>This lesson focuses on how <strong>currency pairs</strong> work.</p>",
                  "<p>You’ll see the difference between the <strong>base currency</strong> and the <strong>quote currency</strong>, and how a price like <strong>EUR/USD = 1.1050</strong> should be interpreted.</p>",
                  "<p>The key takeaway is that when you look at a Forex pair, you are always measuring the value of the first currency against the second one. Once this becomes clear, reading charts, placing trades, and understanding price movement becomes much easier.</p>"
                ].join("")
              },
              {
                id: "m1_t3",
                title: "Who Trades Forex",
                desc: "The major participants in the Forex market, from institutions to retail traders.",
                video: "https://youtu.be/Wz5VSaGxzXQ",
                html: [
                  "<p>This video explains <strong>who takes part in the Forex market</strong>.</p>",
                  "<p>It covers major institutions, banks, governments, corporations, brokers, and retail traders, showing that the market is driven by many different types of participants with different goals.</p>",
                  "<p>The main recap is that retail traders are only one small part of the overall structure. Understanding who sits above, around, and behind the market helps you build a more realistic view of how price moves and where liquidity comes from.</p>"
                ].join("")
              },
              {
                id: "m1_t4",
                title: "Summary Points",
                desc: "A quick wrap-up of the first module and the ideas you should remember.",
                video: "https://youtu.be/gN3dGDm11hw",
                html: [
                  "<p>This recap video brings together the most important ideas from the first module.</p>",
                  "<p>By this point, you should understand what Forex is, how currency pairs work, and who the main players are inside the market.</p>",
                  "<p>The goal of this summary is to make sure the core foundations are clear before moving on. If you understand these basics well, the next modules will make a lot more sense and you’ll be able to connect the theory to actual trading decisions.</p>"
                ].join("")
              }
            ]
          }
        ]
      },
      {
        id: "m2",
        name: "Module 2",
        lessons: [
          {
            id: "m2_l1",
            name: "Module 2: Core Trading Basics",
            topics: [
              {
                id: "m2_t1",
                title: "Intro to Module 2",
                desc: "An introduction to the essential mechanics every trader should know.",
                video: "https://youtu.be/XhDnyl8oKLk",
                html: [
                  "<p>This introduction sets up the second module by moving from general market understanding into the <strong>practical basics of trading</strong>.</p>",
                  "<p>Here the focus becomes more direct: trade direction, essential terminology, sizing, and the mechanics that affect risk and execution.</p>",
                  "<p>The recap is straightforward: before anything advanced, you need to understand the language and structure of a trade itself. That is what this module is designed to build.</p>"
                ].join("")
              },
              {
                id: "m2_t2",
                title: "Trade Direction: LONG vs SHORT",
                desc: "What it means to buy, what it means to sell, and how traders profit in both directions.",
                video: "https://youtu.be/0G3c8W7C-A8",
                html: [
                  "<p>This lesson explains the difference between going <strong>long</strong> and going <strong>short</strong>.</p>",
                  "<p>Going long means you expect price to rise, while going short means you expect price to fall. In CFDs and Forex, both directions are available, which is one of the main reasons traders are attracted to these markets.</p>",
                  "<p>The main takeaway is that direction is not just a button on the platform. It is the core decision behind every trade.</p>"
                ].join("")
              },
              {
                id: "m2_t3",
                title: "Key Terms Every Trader MUST KNOW",
                desc: "Pips, bid, ask, spread, and the language used in everyday trading.",
                video: "https://youtu.be/Ai0d2ukotVc",
                html: [
                  "<p>This video covers the essential vocabulary of trading.</p>",
                  "<p>Terms like <strong>pip</strong>, <strong>bid</strong>, <strong>ask</strong>, and <strong>spread</strong> are not optional. They are part of almost every trade you place and every chart you analyse.</p>",
                  "<p>The recap here is that understanding these terms helps you read pricing correctly, estimate costs more accurately, and avoid confusion when using trading platforms or evaluating a setup.</p>"
                ].join("")
              },
              {
                id: "m2_t4",
                title: "Trade Sizing",
                desc: "How lot size changes exposure, risk, and the real impact of each pip.",
                video: "https://youtu.be/QOCh66bnvsU",
                html: [
                  "<p>This lesson is about <strong>trade sizing</strong>, one of the most important concepts in risk management.</p>",
                  "<p>Even when two traders take the same setup, the result can be completely different depending on their size. Lot size affects how much each pip is worth and how much money is at risk on the trade.</p>",
                  "<p>The most important takeaway is that sizing is what turns an idea into real exposure.</p>"
                ].join("")
              },
              {
                id: "m2_t5",
                title: "Why These Basics Matter",
                desc: "Why understanding the basics is directly connected to discipline, consistency, and survival.",
                video: "https://youtu.be/rJvCa7yjjqo",
                html: [
                  "<p>This video connects all the basics to real-world trading performance.</p>",
                  "<p>The message is simple: many mistakes do not come from advanced strategy problems, they come from weak foundations, poor understanding of trade mechanics, and confusion around risk.</p>",
                  "<p>The recap is that strong basics create better discipline. When you understand the core structure of a trade, you make fewer emotional mistakes and you are much more likely to stay consistent over time.</p>"
                ].join("")
              },
              {
                id: "m2_t6",
                title: "Summary Points Module 2",
                desc: "A final review of the trading basics covered in this module.",
                video: "https://youtu.be/rdYv6DKxpcg",
                html: [
                  "<p>This summary reviews the key ideas from the second module.</p>",
                  "<p>By now you should be comfortable with trade direction, basic trading terms, and the relationship between position size and risk.</p>",
                  "<p>The final takeaway is that these are not small details, they are the daily building blocks of every trade.</p>"
                ].join("")
              }
            ]
          }
        ]
      },
      {
        id: "m3",
        name: "Module 3",
        lessons: [
          {
            id: "m3_l1",
            name: "Module 3: Market Structure",
            topics: [
              {
                id: "m3_t1",
                title: "Intro Market Structure",
                desc: "An introduction to how the market is organised behind the charts.",
                video: "https://youtu.be/qQo9uSWZtvE",
                html: [
                  "<p>This introduction opens the market structure section by shifting the focus from individual trade mechanics to the <strong>environment trades take place in</strong>.</p>",
                  "<p>Instead of only asking where price goes, this module asks how the market is built.</p>",
                  "<p>The recap is that understanding structure helps traders stop looking at price as random movement and start seeing the logic behind how the market operates.</p>"
                ].join("")
              },
              {
                id: "m3_t2",
                title: "What is Market Structure?",
                desc: "The idea of a decentralised market and the framework behind price delivery.",
                video: "https://youtu.be/ZyTgks4FY7Q",
                html: [
                  "<p>This lesson explains what <strong>market structure</strong> actually means in the Forex context.</p>",
                  "<p>Because Forex is decentralised, there is no single exchange controlling all price activity. Instead, different entities interact through networks of liquidity, pricing, and order flow.</p>",
                  "<p>The key recap is that structure matters because access, speed, pricing, and execution are not identical for everyone. Traders need to understand the framework, not just the chart in front of them.</p>"
                ].join("")
              },
              {
                id: "m3_t3",
                title: "The Tiers of Participation",
                desc: "Who sits at the top, who sits in the middle, and where retail traders fit in.",
                video: "https://youtu.be/rm4O_uvI1wY",
                html: [
                  "<p>This video breaks down the <strong>tiers of participation</strong> in the market.</p>",
                  "<p>It shows the hierarchy between interbank institutions, liquidity aggregators, brokers, and retail traders, helping you understand why not all participants experience the market in the same way.</p>",
                  "<p>The recap is that liquidity flows from the top down. This matters because the closer you are to the source of liquidity, the more direct your access tends to be, while retail traders operate further down the chain through brokers and platforms.</p>"
                ].join("")
              },
              {
                id: "m3_t4",
                title: "Brokers and Liquidity Providers Explained",
                desc: "How brokers source pricing and where liquidity providers fit into the process.",
                video: "https://youtu.be/IG7nCYp9icc",
                html: [
                  "<p>This lesson explains the relationship between <strong>brokers</strong> and <strong>liquidity providers</strong>.</p>",
                  "<p>Retail traders usually do not access institutional liquidity directly, so brokers act as the bridge. Depending on the broker model, pricing and execution can be handled in different ways.</p>",
                  "<p>The key takeaway is that your broker is not just a trading app, it is part of the structure that connects you to price and execution. Understanding that relationship helps you understand spreads, fills, and trading conditions much better.</p>"
                ].join("")
              },
              {
                id: "m3_t5",
                title: "Trading Sessions and Liquidity Timing",
                desc: "Why timing matters and when the market is typically most active.",
                video: "https://youtu.be/F02ObYoDcmY",
                html: [
                  "<p>This video explains how <strong>trading sessions</strong> affect activity and liquidity.</p>",
                  "<p>Different parts of the day bring different conditions, and session overlaps, especially <strong>London–New York</strong>, are often where volume and volatility become more significant.</p>",
                  "<p>Traders should not only know what they are trading, but also when they are trading it, because liquidity and movement change throughout the day.</p>"
                ].join("")
              }
            ]
          }
        ]
      },
      {
        id: "m4",
        name: "Module 4",
        lessons: [
          {
            id: "m4_l1",
            name: "Module 4: Final Review",
            topics: [
              {
                id: "m4_t1",
                title: "Final Takeaways",
                desc: "A final recap of the course before you move forward.",
                video: "https://youtu.be/NcQI4zSiDZc",
                html: [
                  "<p>This final recap pulls together the entire course into one clear review.</p>",
                  "<p>At this point you’ve covered Forex fundamentals, the basics of trading mechanics, market structure, liquidity, and timing.</p>",
                  "<p>The main takeaway is that strong trading starts with strong foundations. Reviewing these concepts carefully will help you move forward with more clarity and confidence.</p>"
                ].join("")
              },
              {
                id: "ready_1",
                title: "Course Completed",
                desc: "You’ve completed the lessons and reviewed the main concepts covered in the course.",
                video: "",
                html: [
                  "<p>You’ve now completed the course.</p>",
                  "<p>You’ve gone through the key concepts covered across all modules, from Forex basics to trading mechanics, market structure, liquidity, and timing.</p>",
                  "<p>You can go back through any lesson whenever you want to review the material again.</p>"
                ].join("")
              }
            ]
          }
        ]
      }
    ]
  };

  function qs(root, sel) { return root.querySelector(sel); }
  function qsa(root, sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); }

  function safeText(s) {
    return String(s || "").replace(/[<>&"]/g, function (ch) {
      return { "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[ch];
    });
  }

  function toEmbedUrl(url) {
    if (!url) return "";
    try {
      var u = new URL(url);
      if (u.hostname.indexOf("youtube.com") > -1 && u.searchParams.get("v")) {
        return "https://www.youtube.com/embed/" + u.searchParams.get("v");
      }
      if (u.hostname === "youtu.be") {
        var id = u.pathname.replace("/", "");
        return id ? "https://www.youtube.com/embed/" + id : url;
      }
      return url;
    } catch (e) {
      return url;
    }
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { done: {}, last: null, started: false };
      var parsed = JSON.parse(raw);
      return {
        done: parsed && typeof parsed === "object" ? (parsed.done || {}) : {},
        last: parsed && typeof parsed === "object" ? (parsed.last || null) : null,
        started: parsed && typeof parsed === "object" ? !!parsed.started : false
      };
    } catch (e) {
      return { done: {}, last: null, started: false };
    }
  }

  function saveState(state) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  function injectStyles() {
    var id = "bwp__course_embed_styles_v6";
    if (document.getElementById(id)) return;

    var st = document.createElement("style");
    st.id = id;
    st.textContent = [
      "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');",
      "#" + ROOT_ID + "{--bg:#070b12;--bg-2:#0b1220;--card:#0e1625;--card-2:#121c2d;--line:rgba(255,255,255,.08);--line-2:rgba(255,255,255,.12);--text:#ffffff;--muted:rgba(255,255,255,.68);--soft:rgba(255,255,255,.48);--shadow:0 24px 70px rgba(0,0,0,.35);--nav-offset:0px;width:100%;color:var(--text);font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;}",
      "#" + ROOT_ID + " *,#" + ROOT_ID + " *:before,#" + ROOT_ID + " *:after{box-sizing:border-box;}",
      "#" + ROOT_ID + " button,#" + ROOT_ID + " input,#" + ROOT_ID + " textarea,#" + ROOT_ID + " select{font:inherit;}",
      "#" + ROOT_ID + " img{max-width:100%;display:block;}",
      "#" + ROOT_ID + " svg{display:block;}",
      "#" + ROOT_ID + " a{text-decoration:none;color:inherit;}",
      "#" + ROOT_ID + " .k1__wrap{width:100%;position:relative;}",
      "#" + ROOT_ID + " .t0__top{margin-bottom:18px;}",
      "#" + ROOT_ID + " .t0__row{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;}",
      "#" + ROOT_ID + " .b9__brand{display:flex;align-items:center;gap:12px;min-width:0;}",
      "#" + ROOT_ID + " .b9__brand img{width:42px;height:42px;border-radius:12px;object-fit:cover;flex:0 0 42px;}",
      "#" + ROOT_ID + " .b9__txt{min-width:0;}",
      "#" + ROOT_ID + " .b9__t1{font-size:15px;font-weight:700;line-height:1.1;color:#fff;}",
      "#" + ROOT_ID + " .b9__t2{margin-top:4px;font-size:12.5px;line-height:1.3;color:var(--soft);}",
      "#" + ROOT_ID + " .t0__right{display:flex;align-items:center;gap:12px;}",
      "#" + ROOT_ID + " .u1__mini{display:flex;align-items:center;gap:12px;padding:10px 12px;border:1px solid var(--line);background:rgba(255,255,255,.03);border-radius:14px;min-width:180px;}",
      "#" + ROOT_ID + " .u1__mini span{font-size:12px;font-weight:600;color:rgba(255,255,255,.8);white-space:nowrap;}",
      "#" + ROOT_ID + " .p0__bar{position:relative;height:8px;flex:1;border-radius:999px;background:rgba(255,255,255,.08);overflow:hidden;}",
      "#" + ROOT_ID + " .p0__fill{height:100%;width:0%;border-radius:999px;background:#fff;transition:width .28s ease;}",
      "#" + ROOT_ID + " .l0__grid{display:grid;grid-template-columns:320px minmax(0,1fr);gap:18px;align-items:start;}",
      "#" + ROOT_ID + " .s0__side{position:sticky;top:calc(var(--nav-offset) + 16px);background:linear-gradient(180deg,var(--card),var(--card-2));border:1px solid var(--line);border-radius:24px;padding:18px;box-shadow:var(--shadow);overflow:hidden;}",
      "#" + ROOT_ID + " .s0__head{display:flex;align-items:center;justify-content:space-between;gap:12px;padding-bottom:14px;border-bottom:1px solid var(--line);margin-bottom:14px;}",
      "#" + ROOT_ID + " .s0__title{font-size:14px;line-height:1.35;font-weight:700;color:#fff;}",
      "#" + ROOT_ID + " .s0__pill{display:inline-flex;align-items:center;justify-content:center;min-width:56px;height:30px;padding:0 10px;border-radius:999px;background:rgba(255,255,255,.06);border:1px solid var(--line);font-size:12px;font-weight:700;color:#fff;}",
      "#" + ROOT_ID + " .s0__list{display:grid;gap:12px;}",
      "#" + ROOT_ID + " .s1__block{border:1px solid var(--line);border-radius:18px;background:rgba(255,255,255,.02);overflow:hidden;}",
      "#" + ROOT_ID + " .s1__sum{display:flex;align-items:center;gap:10px;padding:14px 14px;cursor:pointer;user-select:none;}",
      "#" + ROOT_ID + " .s1__lft{min-width:0;flex:1;}",
      "#" + ROOT_ID + " .s1__name{font-size:13px;font-weight:700;line-height:1.35;color:#fff;}",
      "#" + ROOT_ID + " .s1__meta{font-size:11.5px;color:var(--soft);white-space:nowrap;}",
      "#" + ROOT_ID + " .s1__chev{width:18px;height:18px;color:rgba(255,255,255,.72);flex:0 0 18px;transition:transform .22s ease;}",
      "#" + ROOT_ID + " .s1__block[data-open='true'] .s1__chev{transform:rotate(90deg);}",
      "#" + ROOT_ID + " .s2__topics{display:grid;gap:8px;padding:0 10px 10px 10px;max-height:0;overflow:hidden;transition:max-height .28s ease;}",
      "#" + ROOT_ID + " .s1__block[data-open='true'] .s2__topics{max-height:1200px;}",
      "#" + ROOT_ID + " .s2__item{display:flex;align-items:flex-start;gap:10px;padding:12px;border-radius:14px;border:1px solid transparent;background:transparent;cursor:pointer;transition:background .18s ease,border-color .18s ease,transform .18s ease;}",
      "#" + ROOT_ID + " .s2__item:hover{background:rgba(255,255,255,.03);border-color:var(--line);transform:translateY(-1px);}",
      "#" + ROOT_ID + " .s2__item[data-active='true']{background:rgba(255,255,255,.06);border-color:var(--line-2);}",
      "#" + ROOT_ID + " .s2__tx{min-width:0;flex:1;}",
      "#" + ROOT_ID + " .s2__t1{font-size:13px;font-weight:600;line-height:1.35;color:#fff;}",
      "#" + ROOT_ID + " .s2__t2{margin-top:4px;font-size:12px;line-height:1.45;color:var(--muted);}",
      "#" + ROOT_ID + " .s2__ic{width:18px;height:18px;flex:0 0 18px;margin-top:1px;color:rgba(255,255,255,.5);}",
      "#" + ROOT_ID + " .s2__ic[data-done='true']{color:#fff;}",
      "#" + ROOT_ID + " .c0__main{background:linear-gradient(180deg,var(--card),var(--card-2));border:1px solid var(--line);border-radius:24px;box-shadow:var(--shadow);min-width:0;overflow:hidden;}",
      "#" + ROOT_ID + " .c0__pad{padding:28px;}",
      "#" + ROOT_ID + " .c1__crumb{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:12px;font-weight:600;color:var(--soft);margin-bottom:16px;}",
      "#" + ROOT_ID + " .c1__sep{opacity:.55;}",
      "#" + ROOT_ID + " .c2__h1{font-size:34px;line-height:1.06;font-weight:800;letter-spacing:-.03em;color:#fff;}",
      "#" + ROOT_ID + " .c3__desc{margin-top:12px;font-size:16px;line-height:1.6;color:var(--muted);max-width:900px;}",
      "#" + ROOT_ID + " .c4__line{height:1px;background:var(--line);margin:22px 0;}",
      "#" + ROOT_ID + " .c5__body{color:rgba(255,255,255,.84);font-size:15.5px;line-height:1.8;}",
      "#" + ROOT_ID + " .c5__body p{margin:0 0 14px 0;}",
      "#" + ROOT_ID + " .c5__body p:last-child{margin-bottom:0;}",
      "#" + ROOT_ID + " .c5__body strong{color:#fff;font-weight:700;}",
      "#" + ROOT_ID + " .v0__box{margin-top:22px;}",
      "#" + ROOT_ID + " .n0__nav{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:20px 28px;border-top:1px solid var(--line);background:rgba(255,255,255,.02);}",
      "#" + ROOT_ID + " .n2__center{min-width:0;flex:1;display:flex;justify-content:center;}",
      "#" + ROOT_ID + " .n2__center span{font-size:13px;font-weight:600;color:var(--soft);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}",
      "#" + ROOT_ID + " .n1__btn,#" + ROOT_ID + " .g0__btn{appearance:none;border:1px solid var(--line);background:rgba(255,255,255,.03);color:#fff;display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:46px;padding:12px 16px;border-radius:16px;cursor:pointer;font-size:14px;font-weight:700;line-height:1;transition:transform .18s ease,background .18s ease,border-color .18s ease,opacity .18s ease;}",
      "#" + ROOT_ID + " .n1__btn:hover,#" + ROOT_ID + " .g0__btn:hover{transform:translateY(-1px);border-color:var(--line-2);background:rgba(255,255,255,.05);}",
      "#" + ROOT_ID + " .n1__btn[data-primary='true']{background:#fff;color:#0b1018;border-color:#fff;}",
      "#" + ROOT_ID + " .n1__btn svg,#" + ROOT_ID + " .g0__btn svg{width:18px;height:18px;}",
      "#" + ROOT_ID + " .g0__label{font-size:13px;font-weight:700;}",
      "#" + ROOT_ID + " .dr__mask{position:fixed;left:0;right:0;top:0;height:100vh;background:rgba(3,7,12,.55);backdrop-filter:blur(6px);opacity:0;pointer-events:none;transition:opacity .22s ease;z-index:9997;}",
      "#" + ROOT_ID + " .dr__panel{position:fixed;top:0;right:0;height:100vh;width:min(390px,92vw);background:linear-gradient(180deg,var(--card),var(--card-2));border-left:1px solid var(--line);box-shadow:var(--shadow);transform:translateX(100%);transition:transform .25s ease;z-index:9998;display:flex;flex-direction:column;}",
      "#" + ROOT_ID + " .dr__mask[data-open='true']{opacity:1;pointer-events:auto;}",
      "#" + ROOT_ID + " .dr__panel[data-open='true']{transform:translateX(0);}",
      "#" + ROOT_ID + " .dr__top{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:18px;border-bottom:1px solid var(--line);}",
      "#" + ROOT_ID + " .dr__ttl{font-size:16px;font-weight:800;color:#fff;}",
      "#" + ROOT_ID + " .dr__x{appearance:none;border:1px solid var(--line);background:rgba(255,255,255,.04);color:#fff;width:42px;height:42px;border-radius:14px;cursor:pointer;display:grid;place-items:center;}",
      "#" + ROOT_ID + " [data-bwp='drawerSidebar']{padding:18px;overflow:auto;}",
      "#" + ROOT_ID + " .to__toast{position:fixed;right:16px;bottom:16px;z-index:10020;display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:14px;background:#fff;color:#0b1018;box-shadow:0 20px 40px rgba(0,0,0,.25);opacity:0;transform:translateY(10px);pointer-events:none;transition:opacity .2s ease,transform .2s ease;}",
      "#" + ROOT_ID + " .to__toast[data-show='true']{opacity:1;transform:translateY(0);}",
      "#" + ROOT_ID + " .to__dot{width:8px;height:8px;border-radius:999px;background:#0b1018;}",
      "#" + ROOT_ID + " .an__in{opacity:0;transform:translateY(10px);animation:bwpIn .45s ease forwards;}",
      "#" + ROOT_ID + " .an__d1{animation-delay:.02s;}#" + ROOT_ID + " .an__d2{animation-delay:.08s;}#" + ROOT_ID + " .an__d3{animation-delay:.14s;}",
      "@keyframes bwpIn{to{opacity:1;transform:translateY(0);}}",
      "#" + ROOT_ID + " .m0__only{display:none;}#" + ROOT_ID + " .d0__only{display:flex;}",
      "@media (max-width:991px){#" + ROOT_ID + " .l0__grid{grid-template-columns:1fr;}#" + ROOT_ID + " .s0__side{display:none;}#" + ROOT_ID + " .m0__only{display:flex;}#" + ROOT_ID + " .d0__only{display:none;}}",
      "@media (max-width:767px){#" + ROOT_ID + " .t0__row{align-items:flex-start;}#" + ROOT_ID + " .t0__right{width:100%;justify-content:space-between;}#" + ROOT_ID + " .u1__mini{min-width:0;flex:1;}#" + ROOT_ID + " .c0__pad{padding:18px;}#" + ROOT_ID + " .c2__h1{font-size:28px;}#" + ROOT_ID + " .c3__desc{font-size:15px;}#" + ROOT_ID + " .n0__nav{padding:16px 18px;flex-wrap:wrap;}#" + ROOT_ID + " .n1__btn{flex:1;min-width:0;}#" + ROOT_ID + " .n2__center{order:3;width:100%;justify-content:center;}#" + ROOT_ID + " .dr__panel{width:100%;max-width:100%;}}"
    ].join("");
    document.head.appendChild(st);
  }

  function getNavOffsetPx(root) {
    try {
      var v = getComputedStyle(root).getPropertyValue("--nav-offset") || "0px";
      var n = parseInt(String(v).trim(), 10);
      return isFinite(n) ? Math.max(0, n) : 0;
    } catch (e) { return 0; }
  }

  function applyDrawerMaskOffset(root) {
    var mask = qs(root, '[data-bwp="mask"]');
    var drawer = qs(root, '[data-bwp="drawer"]');
    var h = getNavOffsetPx(root);
    var safeTop = (window.CSS && CSS.supports && CSS.supports("top: env(safe-area-inset-top)")) ? "env(safe-area-inset-top)" : "0px";
    var vhUnit = (window.CSS && CSS.supports && CSS.supports("height: 100dvh")) ? "100dvh" : "100vh";
    var topExpr = "calc(" + h + "px + " + safeTop + ")";
    var heightExpr = "calc(" + vhUnit + " - " + h + "px - " + safeTop + ")";
    if (mask) { mask.style.top = topExpr; mask.style.height = heightExpr; }
    if (drawer) { drawer.style.top = topExpr; drawer.style.height = heightExpr; }
  }

  function setNavOffset(root) {
    var customSel = root.getAttribute("data-nav-selector");
    var selectors = customSel ? [customSel].concat(NAV_SELECTOR_FALLBACKS) : NAV_SELECTOR_FALLBACKS.slice();
    var navEl = null;
    for (var i = 0; i < selectors.length; i++) {
      try {
        var el = document.querySelector(selectors[i]);
        if (el && el.getBoundingClientRect) { navEl = el; break; }
      } catch (e) {}
    }
    if (!navEl) { applyDrawerMaskOffset(root); return; }
    var h = Math.max(0, Math.round(navEl.getBoundingClientRect().height || 0));
    if (h > 0) root.style.setProperty("--nav-offset", h + "px");
    applyDrawerMaskOffset(root);
  }

  function readHashTopic() {
    var h = (location.hash || "").replace("#", "");
    if (!h) return null;
    if (h.indexOf(HASH_PREFIX) === 0) return h.slice(HASH_PREFIX.length);
    return null;
  }

  var _hashLock = false;

  function writeHashTopic(id) {
    try {
      _hashLock = true;
      var next = "#" + HASH_PREFIX + id;
      if (location.hash !== next) history.replaceState(null, "", location.pathname + location.search + next);
      setTimeout(function () { _hashLock = false; }, 0);
    } catch (e) { _hashLock = false; }
  }

  function scrollToRootWithOffset(root) {
    var h = getNavOffsetPx(root);
    var y = root.getBoundingClientRect().top + window.pageYOffset - h - 16;
    try { window.scrollTo({ top: Math.max(0, y), behavior: "smooth" }); }
    catch (e) { window.scrollTo(0, Math.max(0, y)); }
  }

  function buildFlatIndex() {
    var flat = [];
    var blocks = [];
    COURSE.modules.forEach(function (mod) {
      mod.lessons.forEach(function (lesson) {
        var block = { moduleId: mod.id, lessonId: lesson.id, lessonName: lesson.name, items: [] };
        lesson.topics.forEach(function (t) {
          var item = { type: "topic", moduleId: mod.id, lessonId: lesson.id, id: t.id, title: t.title, desc: t.desc, html: t.html, video: t.video ? toEmbedUrl(t.video) : "" };
          flat.push(item);
          block.items.push(item);
        });
        blocks.push(block);
      });
    });
    return { flat: flat, blocks: blocks };
  }

  function renderShell(root) {
    root.innerHTML = [
      '<div class="k1__wrap">',
      '<div class="t0__top an__in an__d1"><div class="t0__row">',
      '<div class="b9__brand"><img src="' + BRAND_LOGO + '" alt="Bullwaves"><div class="b9__txt"><div class="b9__t1">Bullwaves</div><div class="b9__t2">' + safeText(COURSE.courseTitle) + '</div></div></div>',
      '<div class="t0__right">',
      '<button class="g0__btn m0__only" type="button" data-bwp="openDrawer" aria-label="Open menu">' + ICONS.menu + '<span class="g0__label">Menu</span></button>',
      '<div class="u1__mini m0__only" aria-label="Progress"><span data-bwp="progressText">0% Complete</span><div class="p0__bar"><div class="p0__fill" data-bwp="progressFill"></div></div></div>',
      '<div class="u1__mini d0__only" aria-label="Progress"><span data-bwp="progressText">0% Complete</span><div class="p0__bar"><div class="p0__fill" data-bwp="progressFill"></div></div></div>',
      '</div></div></div>',
      '<div class="dr__mask" data-bwp="mask"></div>',
      '<div class="dr__panel" data-bwp="drawer"><div class="dr__top"><div class="dr__ttl">Course Menu</div><button class="dr__x" type="button" data-bwp="closeDrawer" aria-label="Close menu">' + ICONS.x + '</button></div><div data-bwp="drawerSidebar"></div></div>',
      '<div class="l0__grid">',
      '<aside class="s0__side an__in an__d2"><div class="s0__head"><div class="s0__title">' + safeText(COURSE.courseTitle) + '</div><div class="s0__pill" data-bwp="pill">0 / 0</div></div><div class="s0__list" data-bwp="sidebar"></div></aside>',
      '<section class="c0__main an__in an__d3"><div class="c0__pad"><div class="c1__crumb" data-bwp="crumb"></div><div class="c2__h1" data-bwp="title"></div><div class="c3__desc" data-bwp="desc"></div><div class="v0__box" data-bwp="videoBox" style="display:none;"><div class="v0__frame" data-bwp="videoFrame"></div></div><div class="c4__line"></div><div class="c5__body" data-bwp="body"></div></div><div class="n0__nav"><button class="n1__btn" type="button" data-bwp="prev">' + ICONS.arrowL + ' Previous</button><div class="n2__center"><span data-bwp="midText">—</span></div><button class="n1__btn" type="button" data-bwp="next" data-primary="true">Next ' + ICONS.arrowR + '</button></div></section>',
      '</div></div>',
      '<div class="to__toast" data-bwp="toast" aria-live="polite"><div class="to__dot"></div><div data-bwp="toastTxt">Saved</div></div>'
    ].join("");
  }

  function computeProgress(state, requiredIds) {
    var done = 0;
    requiredIds.forEach(function (id) { if (state.done[id]) done++; });
    var total = requiredIds.length;
    var pct = total > 0 ? Math.round((done / total) * 100) : 0;
    return { done: done, total: total, pct: pct };
  }

  function renderSidebar(sideRoot, blocks, state, activeId) {
    sideRoot.innerHTML = blocks.map(function (b) {
      var open = b.items.some(function (x) { return x.id === activeId; }) ? "true" : "false";
      var items = b.items.map(function (it) {
        var done = !!state.done[it.id];
        var active = it.id === activeId;
        return '<div class="s2__item" data-topic="' + it.id + '" data-active="' + (active ? "true" : "false") + '"><div class="s2__tx"><div class="s2__t1">' + safeText(it.title) + '</div><div class="s2__t2">' + safeText(it.desc || "") + '</div></div><div class="s2__ic" data-done="' + (done ? "true" : "false") + '">' + (done ? ICONS.check : ICONS.dot) + '</div></div>';
      }).join("");
      return '<div class="s1__block" data-open="' + open + '"><div class="s1__sum" data-lesson="' + safeText(b.lessonId) + '"><div class="s1__lft"><div class="s1__name">' + safeText(b.lessonName) + '</div></div><div class="s1__meta">' + b.items.length + ' topics</div><div class="s1__chev">' + ICONS.arrowR + '</div></div><div class="s2__topics">' + items + '</div></div>';
    }).join("");
  }

  function showToast(root, txt) {
    var toast = qs(root, '[data-bwp="toast"]');
    var toastTxt = qs(root, '[data-bwp="toastTxt"]');
    if (!toast || !toastTxt) return;
    toastTxt.textContent = txt;
    toast.setAttribute("data-show", "true");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () { toast.setAttribute("data-show", "false"); }, 1400);
  }

  function markDone(state, id) {
    if (!state.done[id]) { state.done[id] = true; saveState(state); return true; }
    return false;
  }

  function getLessonNameByTopic(blocks, topicId) {
    for (var i = 0; i < blocks.length; i++) if (blocks[i].items.some(function (x) { return x.id === topicId; })) return blocks[i].lessonName;
    return "Lesson";
  }

  function findPrevNavigable(flat, idx) {
    for (var i = idx - 1; i >= 0; i--) if (flat[i].type === "topic") return flat[i];
    return null;
  }

  function findNextNavigable(flat, idx) {
    for (var i = idx + 1; i < flat.length; i++) if (flat[i].type === "topic") return flat[i];
    return null;
  }

  function renderVideo(root, title, videoUrl) {
    var vBox = qs(root, '[data-bwp="videoBox"]');
    var vFrame = qs(root, '[data-bwp="videoFrame"]');
    var embed = videoUrl ? toEmbedUrl(videoUrl) : "";
    if (!embed) { if (vBox) vBox.style.display = "none"; if (vFrame) vFrame.innerHTML = ""; return; }
    if (vBox) vBox.style.display = "block";
    if (vFrame) {
      vFrame.innerHTML = '<div style="position:relative;width:100%;padding-top:56.25%;border-radius:18px;overflow:hidden;background:rgba(255,255,255,.04);"><iframe src="' + embed + '" title="' + safeText(title || "Course video") + '" frameborder="0" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;border:0;"></iframe></div>';
    }
  }

  function renderIntro(root, ctx, startTargetId) {
    renderSidebar(qs(root, '[data-bwp="sidebar"]'), ctx.blocks, ctx.state, startTargetId);
    renderSidebar(qs(root, '[data-bwp="drawerSidebar"]'), ctx.blocks, ctx.state, startTargetId);
    bindSidebarInteractions(root, ctx);

    qs(root, '[data-bwp="crumb"]').innerHTML = "<span>" + safeText(COURSE.courseTitle) + "</span>";
    qs(root, '[data-bwp="title"]').textContent = INTRO_SCREEN.title;
    qs(root, '[data-bwp="desc"]').textContent = INTRO_SCREEN.desc;
    qs(root, '[data-bwp="body"]').innerHTML = INTRO_SCREEN.html;
    renderVideo(root, INTRO_SCREEN.title, INTRO_SCREEN.video);

    var btnPrev = qs(root, '[data-bwp="prev"]');
    var btnNext = qs(root, '[data-bwp="next"]');
    var mid = qs(root, '[data-bwp="midText"]');
    var prog = computeProgress(ctx.state, ctx.requiredIds);

    if (btnPrev) {
      btnPrev.disabled = true;
      btnPrev.style.opacity = ".45";
      btnPrev.style.pointerEvents = "none";
      btnPrev.onclick = null;
    }

    if (btnNext) {
      btnNext.disabled = false;
      btnNext.style.opacity = "1";
      btnNext.style.pointerEvents = "auto";
      btnNext.innerHTML = "Start now " + ICONS.arrowR;
      btnNext.onclick = function () { startCourse(root, ctx, startTargetId); };
    }

    if (mid) mid.textContent = prog.pct + "% complete";

    var startBtn = qs(root, '[data-bwp="startCourse"]');
    if (startBtn) startBtn.onclick = function () { startCourse(root, ctx, startTargetId); };

    closeDrawer(root);
    updateProgressUI(root, ctx);
    scrollToRootWithOffset(root);
  }

  function startCourse(root, ctx, targetId) {
    if (!targetId) return;
    ctx.state.started = true;
    saveState(ctx.state);
    setActive(root, ctx, targetId, { silent: true });
  }

  function setActive(root, ctx, nextId, opts) {
    opts = opts || {};
    var item = ctx.flat.find(function (x) { return x.id === nextId; });
    if (!item) return;

    var justMarked = markDone(ctx.state, item.id);
    ctx.state.last = item.id;
    ctx.state.started = true;
    saveState(ctx.state);
    writeHashTopic(item.id);

    renderSidebar(qs(root, '[data-bwp="sidebar"]'), ctx.blocks, ctx.state, item.id);
    renderSidebar(qs(root, '[data-bwp="drawerSidebar"]'), ctx.blocks, ctx.state, item.id);
    bindSidebarInteractions(root, ctx);

    qs(root, '[data-bwp="crumb"]').innerHTML = '<span>' + safeText(COURSE.courseTitle) + '</span><span class="c1__sep">›</span><span>' + safeText(getLessonNameByTopic(ctx.blocks, item.id)) + '</span>';
    qs(root, '[data-bwp="title"]').textContent = item.title;
    qs(root, '[data-bwp="desc"]').textContent = item.desc || "";
    qs(root, '[data-bwp="body"]').innerHTML = item.html || "";
    renderVideo(root, item.title, item.video || "");

    var idx = ctx.flat.findIndex(function (x) { return x.id === item.id; });
    var prev = findPrevNavigable(ctx.flat, idx);
    var next = findNextNavigable(ctx.flat, idx);

    var btnPrev = qs(root, '[data-bwp="prev"]');
    var btnNext = qs(root, '[data-bwp="next"]');

    btnPrev.disabled = !prev;
    btnPrev.style.opacity = prev ? "1" : ".45";
    btnPrev.style.pointerEvents = prev ? "auto" : "none";
    btnPrev.innerHTML = ICONS.arrowL + " Previous";
    btnPrev.onclick = function () { if (prev) setActive(root, ctx, prev.id); };

    if (next) {
      btnNext.disabled = false;
      btnNext.style.opacity = "1";
      btnNext.style.pointerEvents = "auto";
      btnNext.innerHTML = "Next " + ICONS.arrowR;
      btnNext.onclick = function () { setActive(root, ctx, next.id); };
    } else {
      btnNext.disabled = true;
      btnNext.style.opacity = ".45";
      btnNext.style.pointerEvents = "none";
      btnNext.innerHTML = "Next " + ICONS.arrowR;
      btnNext.onclick = null;
    }

    var prog = computeProgress(ctx.state, ctx.requiredIds);
    var mid = qs(root, '[data-bwp="midText"]');
    if (mid) mid.textContent = prog.pct + "% complete";

    updateProgressUI(root, ctx);
    if (justMarked && !opts.silent) showToast(root, "Marked as complete");
    closeDrawer(root);
    if (!opts.noScroll) scrollToRootWithOffset(root);
  }

  function updateProgressUI(root, ctx) {
    var prog = computeProgress(ctx.state, ctx.requiredIds);
    var pill = qs(root, '[data-bwp="pill"]');
    qsa(root, '[data-bwp="progressText"]').forEach(function (el) { el.textContent = prog.pct + "% Complete"; });
    qsa(root, '[data-bwp="progressFill"]').forEach(function (fill) { fill.style.width = prog.pct + "%"; });
    if (pill) pill.textContent = prog.done + " / " + prog.total;
  }

  function bindSidebarInteractions(root, ctx) {
    qsa(root, ".s1__sum").forEach(function (sum) {
      sum.onclick = function () {
        var block = sum.closest(".s1__block");
        if (!block) return;
        var isOpen = block.getAttribute("data-open") === "true";
        block.setAttribute("data-open", isOpen ? "false" : "true");
      };
    });

    qsa(root, ".s2__item").forEach(function (it) {
      it.onclick = function () {
        var id = it.getAttribute("data-topic");
        if (!id) return;
        setActive(root, ctx, id);
      };
    });
  }

  var _bodyLockCount = 0;
  var _prevBodyOverflow = "";

  function lockBodyScroll(lock) {
    try {
      if (lock) {
        if (_bodyLockCount === 0) {
          _prevBodyOverflow = document.body.style.overflow || "";
          document.body.style.overflow = "hidden";
        }
        _bodyLockCount += 1;
      } else {
        _bodyLockCount = Math.max(0, _bodyLockCount - 1);
        if (_bodyLockCount === 0) document.body.style.overflow = _prevBodyOverflow;
      }
    } catch (e) {}
  }

  function openDrawer(root) {
    var mask = qs(root, '[data-bwp="mask"]');
    var drawer = qs(root, '[data-bwp="drawer"]');
    if (!mask || !drawer) return;
    mask.setAttribute("data-open", "true");
    drawer.setAttribute("data-open", "true");
    lockBodyScroll(true);
  }

  function closeDrawer(root) {
    var mask = qs(root, '[data-bwp="mask"]');
    var drawer = qs(root, '[data-bwp="drawer"]');
    if (!mask || !drawer) return;
    if (mask.getAttribute("data-open") === "true" || drawer.getAttribute("data-open") === "true") {
      mask.setAttribute("data-open", "false");
      drawer.setAttribute("data-open", "false");
      lockBodyScroll(false);
    }
  }

  function initBullwavesCourse() {
    var root = document.getElementById(ROOT_ID);
    if (!root) return;

    injectStyles();
    renderShell(root);
    requestAnimationFrame(function () { setNavOffset(root); });
    setTimeout(function () { setNavOffset(root); }, 60);

    var built = buildFlatIndex();
    var flat = built.flat;
    var blocks = built.blocks;
    var requiredIds = flat.filter(function (x) { return x.type === "topic"; }).map(function (x) { return x.id; });
    var state = loadState();

    var forcedStart = root.getAttribute("data-start-topic");
    var hashTopic = readHashTopic();
    var firstTopic = flat.find(function (x) { return x.type === "topic"; });
    var firstTopicId = firstTopic ? firstTopic.id : null;

    var startId =
      (forcedStart && flat.some(function (x) { return x.id === forcedStart; }) && forcedStart) ||
      (hashTopic && flat.some(function (x) { return x.id === hashTopic; }) && hashTopic) ||
      (state.last && flat.some(function (x) { return x.id === state.last; }) && state.last) ||
      firstTopicId;

    var ctx = { flat: flat, blocks: blocks, state: state, requiredIds: requiredIds };

    var openBtn = qs(root, '[data-bwp="openDrawer"]');
    var closeBtn = qs(root, '[data-bwp="closeDrawer"]');
    var mask = qs(root, '[data-bwp="mask"]');

    if (openBtn) openBtn.onclick = function () { openDrawer(root); };
    if (closeBtn) closeBtn.onclick = function () { closeDrawer(root); };
    if (mask) mask.onclick = function () { closeDrawer(root); };

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeDrawer(root);
    });

    renderIntro(root, ctx, startId || firstTopicId);

    window.addEventListener("resize", function () { setNavOffset(root); }, { passive: true });

    window.addEventListener("hashchange", function () {
      if (_hashLock) return;
      var id = readHashTopic();
      if (!id) return;
      if (!flat.some(function (x) { return x.id === id; })) return;
      setActive(root, ctx, id, { silent: true });
    });
  }

  window.initBullwavesCourse = initBullwavesCourse;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBullwavesCourse);
  } else {
    initBullwavesCourse();
  }
})();
