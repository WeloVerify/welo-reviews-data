(() => {
  const ROOT_ID = "bwp__c7X9";
  const STORAGE_KEY = `bwp_course_state_v5:${location.hostname}${location.pathname}:${ROOT_ID}`;
  const HASH_PREFIX = "bwp-";
  const BRAND_LOGO =
    "https://cdn.prod.website-files.com/66f2e0fef32885327272def5/67d1ad5a62ad06f120c0b82c_Frame%202147223939%201aaaa.png";

  const NAV_SELECTOR_FALLBACKS = [".w-nav", "[data-nav]", ".navbar", "header"];

  const ICONS = {
    check: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    dot: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="5.5" stroke="currentColor" stroke-width="2.2"/></svg>`,
    menu: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`,
    x: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`,
    arrowL: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    arrowR: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  };

  const INTRO_SCREEN = {
    title: "Welcome to the course",
    desc: "Thanks for joining. Start now and go lesson by lesson.",
    video: "https://youtu.be/aD2Yp8svIYM",
    html: `
      <div class="i0__intro">
        <p><strong>Welcome to the Bullwaves course.</strong></p>
        <p>This course is split into 4 modules so you can build strong foundations step by step.</p>
        <p>Each lesson includes a video and a short written recap so you can review the key ideas quickly.</p>
        <p>Once you complete the course, you’ll have a full overview of the concepts covered across all modules.</p>
        <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap;">
          <button class="n1__btn" type="button" data-bwp="startCourse" data-primary="true" style="min-width:160px;">
            Start now ${ICONS.arrowR}
          </button>
        </div>
      </div>
    `
  };

  const COURSE = {
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
                html: `
                  <p>This video introduces <strong>Forex</strong> as the global market where one currency is exchanged for another.</p>
                  <p>The main idea is simple: traders speculate on whether one currency will become stronger or weaker relative to another, which is why currencies are always shown in pairs such as <strong>EUR/USD</strong>.</p>
                  <p>The recap of this lesson is that Forex is not a local market with one single exchange, it is a huge global market active across different financial centres, and understanding this structure is the first step before learning how to trade it properly.</p>
                `
              },
              {
                id: "m1_t2",
                title: "Currency Pairs",
                desc: "Base currency, quote currency, and how to read a Forex quote correctly.",
                video: "https://youtu.be/eMimFwMPC3E",
                html: `
                  <p>This lesson focuses on how <strong>currency pairs</strong> work.</p>
                  <p>You’ll see the difference between the <strong>base currency</strong> and the <strong>quote currency</strong>, and how a price like <strong>EUR/USD = 1.1050</strong> should be interpreted.</p>
                  <p>The key takeaway is that when you look at a Forex pair, you are always measuring the value of the first currency against the second one. Once this becomes clear, reading charts, placing trades, and understanding price movement becomes much easier.</p>
                `
              },
              {
                id: "m1_t3",
                title: "Who Trades Forex",
                desc: "The major participants in the Forex market, from institutions to retail traders.",
                video: "https://youtu.be/Wz5VSaGxzXQ",
                html: `
                  <p>This video explains <strong>who takes part in the Forex market</strong>.</p>
                  <p>It covers major institutions, banks, governments, corporations, brokers, and retail traders, showing that the market is driven by many different types of participants with different goals.</p>
                  <p>The main recap is that retail traders are only one small part of the overall structure. Understanding who sits above, around, and behind the market helps you build a more realistic view of how price moves and where liquidity comes from.</p>
                `
              },
              {
                id: "m1_t4",
                title: "Summary Points",
                desc: "A quick wrap-up of the first module and the ideas you should remember.",
                video: "https://youtu.be/gN3dGDm11hw",
                html: `
                  <p>This recap video brings together the most important ideas from the first module.</p>
                  <p>By this point, you should understand what Forex is, how currency pairs work, and who the main players are inside the market.</p>
                  <p>The goal of this summary is to make sure the core foundations are clear before moving on. If you understand these basics well, the next modules will make a lot more sense and you’ll be able to connect the theory to actual trading decisions.</p>
                `
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
                html: `
                  <p>This introduction sets up the second module by moving from general market understanding into the <strong>practical basics of trading</strong>.</p>
                  <p>Here the focus becomes more direct: trade direction, essential terminology, sizing, and the mechanics that affect risk and execution.</p>
                  <p>The recap is straightforward: before anything advanced, you need to understand the language and structure of a trade itself. That is what this module is designed to build.</p>
                `
              },
              {
                id: "m2_t2",
                title: "Trade Direction: LONG vs SHORT",
                desc: "What it means to buy, what it means to sell, and how traders profit in both directions.",
                video: "https://youtu.be/0G3c8W7C-A8",
                html: `
                  <p>This lesson explains the difference between going <strong>long</strong> and going <strong>short</strong>.</p>
                  <p>Going long means you expect price to rise, while going short means you expect price to fall. In CFDs and Forex, both directions are available, which is one of the main reasons traders are attracted to these markets.</p>
                  <p>The main takeaway is that direction is not just a button on the platform. It is the core decision behind every trade.</p>
                `
              },
              {
                id: "m2_t3",
                title: "Key Terms Every Trader MUST KNOW",
                desc: "Pips, bid, ask, spread, and the language used in everyday trading.",
                video: "https://youtu.be/Ai0d2ukotVc",
                html: `
                  <p>This video covers the essential vocabulary of trading.</p>
                  <p>Terms like <strong>pip</strong>, <strong>bid</strong>, <strong>ask</strong>, and <strong>spread</strong> are not optional. They are part of almost every trade you place and every chart you analyse.</p>
                  <p>The recap here is that understanding these terms helps you read pricing correctly, estimate costs more accurately, and avoid confusion when using trading platforms or evaluating a setup.</p>
                `
              },
              {
                id: "m2_t4",
                title: "Trade Sizing",
                desc: "How lot size changes exposure, risk, and the real impact of each pip.",
                video: "https://youtu.be/QOCh66bnvsU",
                html: `
                  <p>This lesson is about <strong>trade sizing</strong>, one of the most important concepts in risk management.</p>
                  <p>Even when two traders take the same setup, the result can be completely different depending on their size. Lot size affects how much each pip is worth and how much money is at risk on the trade.</p>
                  <p>The most important takeaway is that sizing is what turns an idea into real exposure.</p>
                `
              },
              {
                id: "m2_t5",
                title: "Why These Basics Matter",
                desc: "Why understanding the basics is directly connected to discipline, consistency, and survival.",
                video: "https://youtu.be/rJvCa7yjjqo",
                html: `
                  <p>This video connects all the basics to real-world trading performance.</p>
                  <p>The message is simple: many mistakes do not come from advanced strategy problems, they come from weak foundations, poor understanding of trade mechanics, and confusion around risk.</p>
                  <p>The recap is that strong basics create better discipline. When you understand the core structure of a trade, you make fewer emotional mistakes and you are much more likely to stay consistent over time.</p>
                `
              },
              {
                id: "m2_t6",
                title: "Summary Points Module 2",
                desc: "A final review of the trading basics covered in this module.",
                video: "https://youtu.be/rdYv6DKxpcg",
                html: `
                  <p>This summary reviews the key ideas from the second module.</p>
                  <p>By now you should be comfortable with trade direction, basic trading terms, and the relationship between position size and risk.</p>
                  <p>The final takeaway is that these are not small details, they are the daily building blocks of every trade.</p>
                `
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
                html: `
                  <p>This introduction opens the market structure section by shifting the focus from individual trade mechanics to the <strong>environment trades take place in</strong>.</p>
                  <p>Instead of only asking where price goes, this module asks how the market is built.</p>
                  <p>The recap is that understanding structure helps traders stop looking at price as random movement and start seeing the logic behind how the market operates.</p>
                `
              },
              {
                id: "m3_t2",
                title: "What is Market Structure?",
                desc: "The idea of a decentralised market and the framework behind price delivery.",
                video: "https://youtu.be/ZyTgks4FY7Q",
                html: `
                  <p>This lesson explains what <strong>market structure</strong> actually means in the Forex context.</p>
                  <p>Because Forex is decentralised, there is no single exchange controlling all price activity. Instead, different entities interact through networks of liquidity, pricing, and order flow.</p>
                  <p>The key recap is that structure matters because access, speed, pricing, and execution are not identical for everyone. Traders need to understand the framework, not just the chart in front of them.</p>
                `
              },
              {
                id: "m3_t3",
                title: "The Tiers of Participation",
                desc: "Who sits at the top, who sits in the middle, and where retail traders fit in.",
                video: "https://youtu.be/rm4O_uvI1wY",
                html: `
                  <p>This video breaks down the <strong>tiers of participation</strong> in the market.</p>
                  <p>It shows the hierarchy between interbank institutions, liquidity aggregators, brokers, and retail traders, helping you understand why not all participants experience the market in the same way.</p>
                  <p>The recap is that liquidity flows from the top down. This matters because the closer you are to the source of liquidity, the more direct your access tends to be, while retail traders operate further down the chain through brokers and platforms.</p>
                `
              },
              {
                id: "m3_t4",
                title: "Brokers and Liquidity Providers Explained",
                desc: "How brokers source pricing and where liquidity providers fit into the process.",
                video: "https://youtu.be/IG7nCYp9icc",
                html: `
                  <p>This lesson explains the relationship between <strong>brokers</strong> and <strong>liquidity providers</strong>.</p>
                  <p>Retail traders usually do not access institutional liquidity directly, so brokers act as the bridge. Depending on the broker model, pricing and execution can be handled in different ways.</p>
                  <p>The key takeaway is that your broker is not just a trading app, it is part of the structure that connects you to price and execution. Understanding that relationship helps you understand spreads, fills, and trading conditions much better.</p>
                `
              },
              {
                id: "m3_t5",
                title: "Trading Sessions and Liquidity Timing",
                desc: "Why timing matters and when the market is typically most active.",
                video: "https://youtu.be/F02ObYoDcmY",
                html: `
                  <p>This video explains how <strong>trading sessions</strong> affect activity and liquidity.</p>
                  <p>Different parts of the day bring different conditions, and session overlaps, especially <strong>London–New York</strong>, are often where volume and volatility become more significant.</p>
                  <p>Traders should not only know what they are trading, but also when they are trading it, because liquidity and movement change throughout the day.</p>
                `
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
                desc: "A final recap of the course before you finish.",
                video: "https://youtu.be/NcQI4zSiDZc",
                html: `
                  <p>This final recap pulls together the entire course into one clear review.</p>
                  <p>At this point you’ve covered Forex fundamentals, the basics of trading mechanics, market structure, liquidity, and timing.</p>
                  <p>The main takeaway is that strong trading starts with strong foundations. Reviewing these concepts carefully will help you move forward with more clarity and confidence.</p>
                `
              },
              {
                id: "ready_1",
                title: "Course Completed",
                desc: "You’ve completed the lessons and reviewed the full course.",
                video: "",
                html: `
                  <p>You’ve now completed the course.</p>
                  <p>You’ve gone through the core concepts covered across all modules.</p>
                  <p>You can go back through any lesson whenever you want to review the material again.</p>
                `
              }
            ]
          }
        ]
      }
    ]
  };

  const qs = (root, sel) => root.querySelector(sel);
  const qsa = (root, sel) => Array.from(root.querySelectorAll(sel));

  const safeText = (s) =>
    String(s || "").replace(/[<>&"]/g, (ch) => ({
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      '"': "&quot;"
    }[ch]));

  function toEmbedUrl(url) {
    if (!url) return "";
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtube.com") && u.searchParams.get("v")) {
        return `https://www.youtube.com/embed/${u.searchParams.get("v")}`;
      }
      if (u.hostname === "youtu.be") {
        const id = u.pathname.replace("/", "");
        return id ? `https://www.youtube.com/embed/${id}` : url;
      }
      return url;
    } catch (e) {
      return url;
    }
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return {
          done: {},
          last: null,
          started: false
        };
      }
      const parsed = JSON.parse(raw);
      return {
        done: parsed && typeof parsed === "object" ? (parsed.done || {}) : {},
        last: parsed && typeof parsed === "object" ? (parsed.last || null) : null,
        started: parsed && typeof parsed === "object" ? !!parsed.started : false
      };
    } catch (e) {
      return {
        done: {},
        last: null,
        started: false
      };
    }
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  function getNavOffsetPx(root) {
    try {
      const v = getComputedStyle(root).getPropertyValue("--nav-offset") || "0px";
      const n = parseInt(String(v).trim(), 10);
      return Number.isFinite(n) ? Math.max(0, n) : 0;
    } catch (e) {
      return 0;
    }
  }

  function applyDrawerMaskOffset(root) {
    const mask = qs(root, '[data-bwp="mask"]');
    const drawer = qs(root, '[data-bwp="drawer"]');
    const h = getNavOffsetPx(root);

    const safeTop =
      window.CSS && CSS.supports && CSS.supports("top: env(safe-area-inset-top)")
        ? "env(safe-area-inset-top)"
        : "0px";

    const vhUnit =
      window.CSS && CSS.supports && CSS.supports("height: 100dvh")
        ? "100dvh"
        : "100vh";

    const topExpr = `calc(${h}px + ${safeTop})`;
    const heightExpr = `calc(${vhUnit} - ${h}px - ${safeTop})`;

    if (mask) {
      mask.style.top = topExpr;
      mask.style.height = heightExpr;
    }
    if (drawer) {
      drawer.style.top = topExpr;
      drawer.style.height = heightExpr;
    }
  }

  function setNavOffset(root) {
    const customSel = root.getAttribute("data-nav-selector");
    const selectors = customSel ? [customSel, ...NAV_SELECTOR_FALLBACKS] : NAV_SELECTOR_FALLBACKS;

    let navEl = null;
    for (const sel of selectors) {
      try {
        const el = document.querySelector(sel);
        if (el && el.getBoundingClientRect) {
          navEl = el;
          break;
        }
      } catch (e) {}
    }

    if (!navEl) {
      applyDrawerMaskOffset(root);
      return;
    }

    const h = Math.max(0, Math.round(navEl.getBoundingClientRect().height || 0));
    if (h > 0) root.style.setProperty("--nav-offset", `${h}px`);
    applyDrawerMaskOffset(root);
  }

  function injectStyles() {
    const id = "bwp__course_styles_v5";
    if (document.getElementById(id)) return;

    const st = document.createElement("style");
    st.id = id;
    st.textContent = `
      #${ROOT_ID} .c5__body a{color:rgba(255,255,255,.92);text-decoration:underline;text-underline-offset:3px}
      #${ROOT_ID} .c5__body table{width:100%;border-collapse:collapse;margin:10px 0}
      #${ROOT_ID} .c5__body th,#${ROOT_ID} .c5__body td{border:1px solid rgba(255,255,255,.10);padding:10px;vertical-align:top;font-size:13.5px;color:rgba(255,255,255,.78)}
      #${ROOT_ID} .c5__body th{font-weight:600;color:rgba(255,255,255,.90);background:rgba(255,255,255,.02)}
      #${ROOT_ID} .c5__body hr{border:0;height:1px;background:rgba(255,255,255,.10);margin:14px 0}
      #${ROOT_ID} .v0__box{margin-top:14px}
      #${ROOT_ID} .v0__frame iframe{border-radius:16px}
    `;
    document.head.appendChild(st);
  }

  function readHashTopic() {
    const h = (location.hash || "").replace("#", "");
    if (!h) return null;
    if (h.startsWith(HASH_PREFIX)) return h.slice(HASH_PREFIX.length);
    return null;
  }

  let _hashLock = false;

  function writeHashTopic(id) {
    try {
      _hashLock = true;
      const next = `#${HASH_PREFIX}${id}`;
      if (location.hash !== next) {
        history.replaceState(null, "", `${location.pathname}${location.search}${next}`);
      }
      setTimeout(() => (_hashLock = false), 0);
    } catch (e) {
      _hashLock = false;
    }
  }

  function scrollToRootWithOffset(root) {
    const h = getNavOffsetPx(root);
    const y = root.getBoundingClientRect().top + window.pageYOffset - h - 16;
    try {
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    } catch (e) {
      window.scrollTo(0, Math.max(0, y));
    }
  }

  function buildFlatIndex() {
    const flat = [];
    const blocks = [];

    COURSE.modules.forEach((mod) => {
      mod.lessons.forEach((lesson) => {
        const block = {
          moduleId: mod.id,
          lessonId: lesson.id,
          lessonName: lesson.name,
          items: []
        };

        lesson.topics.forEach((t) => {
          const item = {
            type: "topic",
            moduleId: mod.id,
            lessonId: lesson.id,
            id: t.id,
            title: t.title,
            desc: t.desc,
            html: t.html,
            video: t.video ? toEmbedUrl(t.video) : ""
          };
          flat.push(item);
          block.items.push(item);
        });

        blocks.push(block);
      });
    });

    return { flat, blocks };
  }

  function renderShell(root) {
    root.innerHTML = `
      <div class="k1__wrap">
        <div class="t0__top an__in an__d1">
          <div class="t0__row">
            <div class="b9__brand">
              <img src="${BRAND_LOGO}" alt="Bullwaves">
              <div class="b9__txt">
                <div class="b9__t1">Bullwaves</div>
                <div class="b9__t2">${safeText(COURSE.courseTitle)}</div>
              </div>
            </div>

            <div class="t0__right">
              <button class="g0__btn m0__only" type="button" data-bwp="openDrawer" aria-label="Open menu" style="border-radius:14px;padding:10px 12px;width:auto;height:auto;">
                ${ICONS.menu}<span class="g0__label">Menu</span>
              </button>

              <div class="u1__mini m0__only" aria-label="Progress">
                <span data-bwp="progressText">0% Complete</span>
                <div class="p0__bar" aria-hidden="true">
                  <div class="p0__fill" data-bwp="progressFill"></div>
                </div>
              </div>

              <div class="u1__mini d0__only" aria-label="Progress">
                <span data-bwp="progressText">0% Complete</span>
                <div class="p0__bar" aria-hidden="true">
                  <div class="p0__fill" data-bwp="progressFill"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="dr__mask" data-bwp="mask"></div>
        <div class="dr__panel" data-bwp="drawer" aria-label="Course menu">
          <div class="dr__top">
            <div class="dr__ttl">Course Menu</div>
            <button class="dr__x" type="button" data-bwp="closeDrawer" aria-label="Close menu">
              ${ICONS.x}
            </button>
          </div>
          <div data-bwp="drawerSidebar"></div>
        </div>

        <div class="l0__grid">
          <aside class="s0__side an__in an__d2" aria-label="Course navigation">
            <div class="s0__head">
              <div class="s0__title">${safeText(COURSE.courseTitle)}</div>
              <div class="s0__pill" data-bwp="pill">0 / 0</div>
            </div>
            <div class="s0__list" data-bwp="sidebar"></div>
          </aside>

          <section class="c0__main an__in an__d3" aria-label="Lesson content">
            <div class="c0__pad">
              <div class="c1__crumb" data-bwp="crumb"></div>
              <div class="c2__h1" data-bwp="title"></div>
              <div class="c3__desc" data-bwp="desc"></div>

              <div class="v0__box" data-bwp="videoBox" style="display:none;">
                <div class="v0__frame" data-bwp="videoFrame"></div>
              </div>

              <div class="c4__line"></div>
              <div class="c5__body" data-bwp="body"></div>
            </div>

            <div class="n0__nav">
              <button class="n1__btn" type="button" data-bwp="prev">
                ${ICONS.arrowL} Previous
              </button>

              <div class="n2__center">
                <span data-bwp="midText">—</span>
              </div>

              <button class="n1__btn" type="button" data-bwp="next" data-primary="true">
                Next ${ICONS.arrowR}
              </button>
            </div>
          </section>
        </div>
      </div>

      <div class="to__toast" data-bwp="toast" aria-live="polite">
        <div class="to__dot"></div>
        <div data-bwp="toastTxt">Saved</div>
      </div>
    `;
  }

  function computeProgress(state, requiredIds) {
    let done = 0;
    requiredIds.forEach((id) => {
      if (state.done[id]) done++;
    });
    const total = requiredIds.length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    return { done, total, pct };
  }

  function renderSidebar(sideRoot, blocks, state, activeId) {
    sideRoot.innerHTML = blocks.map((b) => {
      const open = b.items.some((x) => x.id === activeId) ? "true" : "false";

      const items = b.items.map((it) => {
        const done = !!state.done[it.id];
        const active = it.id === activeId;
        return `
          <div class="s2__item" data-topic="${it.id}" data-active="${active ? "true" : "false"}">
            <div class="s2__tx">
              <div class="s2__t1">${safeText(it.title)}</div>
              <div class="s2__t2">${safeText(it.desc || "")}</div>
            </div>
            <div class="s2__ic" data-done="${done ? "true" : "false"}" aria-hidden="true">
              ${done ? ICONS.check : ICONS.dot}
            </div>
          </div>
        `;
      }).join("");

      return `
        <div class="s1__block" data-open="${open}">
          <div class="s1__sum" data-lesson="${safeText(b.lessonId)}">
            <div class="s1__lft">
              <div class="s1__name">${safeText(b.lessonName)}</div>
            </div>
            <div class="s1__meta">${b.items.length} topics</div>
            <div class="s1__chev" aria-hidden="true">${ICONS.arrowR}</div>
          </div>
          <div class="s2__topics">
            ${items}
          </div>
        </div>
      `;
    }).join("");
  }

  function showToast(root, txt) {
    const toast = qs(root, '[data-bwp="toast"]');
    const toastTxt = qs(root, '[data-bwp="toastTxt"]');
    if (!toast || !toastTxt) return;
    toastTxt.textContent = txt;
    toast.setAttribute("data-show", "true");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.setAttribute("data-show", "false"), 1400);
  }

  function markDone(state, id) {
    if (!state.done[id]) {
      state.done[id] = true;
      saveState(state);
      return true;
    }
    return false;
  }

  function getLessonNameByTopic(blocks, topicId) {
    for (const b of blocks) {
      if (b.items.some((x) => x.id === topicId)) return b.lessonName;
    }
    return "Lesson";
  }

  function findPrevNavigable(flat, idx) {
    for (let i = idx - 1; i >= 0; i--) {
      if (flat[i].type === "topic") return flat[i];
    }
    return null;
  }

  function findNextNavigable(flat, idx) {
    for (let i = idx + 1; i < flat.length; i++) {
      if (flat[i].type === "topic") return flat[i];
    }
    return null;
  }

  function renderVideo(root, title, videoUrl) {
    const vBox = qs(root, '[data-bwp="videoBox"]');
    const vFrame = qs(root, '[data-bwp="videoFrame"]');

    const embed = videoUrl ? toEmbedUrl(videoUrl) : "";
    if (!embed) {
      if (vBox) vBox.style.display = "none";
      if (vFrame) vFrame.innerHTML = "";
      return;
    }

    if (vBox) vBox.style.display = "block";
    if (vFrame) {
      vFrame.innerHTML = `
        <div style="position:relative;width:100%;padding-top:56.25%;border-radius:16px;overflow:hidden;background:rgba(255,255,255,.04);">
          <iframe
            src="${embed}"
            title="${safeText(title || "Course video")}"
            frameborder="0"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            allowfullscreen
            style="position:absolute;inset:0;width:100%;height:100%;border:0;"
          ></iframe>
        </div>
      `;
    }
  }

  function renderIntro(root, ctx, startTargetId) {
    const { blocks, state, requiredIds } = ctx;
    const side = qs(root, '[data-bwp="sidebar"]');
    const drawerSide = qs(root, '[data-bwp="drawerSidebar"]');

    renderSidebar(side, blocks, state, startTargetId);
    renderSidebar(drawerSide, blocks, state, startTargetId);

    bindSidebarInteractions(root, ctx);

    qs(root, '[data-bwp="crumb"]').innerHTML = `<span>${safeText(COURSE.courseTitle)}</span>`;
    qs(root, '[data-bwp="title"]').textContent = INTRO_SCREEN.title;
    qs(root, '[data-bwp="desc"]').textContent = INTRO_SCREEN.desc;
    qs(root, '[data-bwp="body"]').innerHTML = INTRO_SCREEN.html;

    renderVideo(root, INTRO_SCREEN.title, INTRO_SCREEN.video);

    const btnPrev = qs(root, '[data-bwp="prev"]');
    const btnNext = qs(root, '[data-bwp="next"]');
    const mid = qs(root, '[data-bwp="midText"]');
    const prog = computeProgress(state, requiredIds);

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
      btnNext.innerHTML = `Start now ${ICONS.arrowR}`;
      btnNext.onclick = () => startCourse(root, ctx, startTargetId);
    }

    if (mid) mid.textContent = `${prog.pct}% complete`;

    const startBtn = qs(root, '[data-bwp="startCourse"]');
    if (startBtn) startBtn.onclick = () => startCourse(root, ctx, startTargetId);

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

  function setActive(root, ctx, nextId, opts = {}) {
    const { flat, blocks, state, requiredIds } = ctx;
    const item = flat.find((x) => x.id === nextId);
    if (!item) return;

    const justMarked = markDone(state, item.id);
    state.last = item.id;
    state.started = true;
    saveState(state);

    writeHashTopic(item.id);

    const side = qs(root, '[data-bwp="sidebar"]');
    const drawerSide = qs(root, '[data-bwp="drawerSidebar"]');
    renderSidebar(side, blocks, state, item.id);
    renderSidebar(drawerSide, blocks, state, item.id);

    bindSidebarInteractions(root, ctx);

    qs(root, '[data-bwp="crumb"]').innerHTML = `
      <span>${safeText(COURSE.courseTitle)}</span>
      <span class="c1__sep">›</span>
      <span>${safeText(getLessonNameByTopic(blocks, item.id))}</span>
    `;

    qs(root, '[data-bwp="title"]').textContent = item.title;
    qs(root, '[data-bwp="desc"]').textContent = item.desc || "";
    qs(root, '[data-bwp="body"]').innerHTML = item.html || "";

    renderVideo(root, item.title, item.video || "");

    const idx = flat.findIndex((x) => x.id === item.id);
    const prev = findPrevNavigable(flat, idx);
    const next = findNextNavigable(flat, idx);

    const btnPrev = qs(root, '[data-bwp="prev"]');
    const btnNext = qs(root, '[data-bwp="next"]');

    btnPrev.disabled = !prev;
    btnPrev.style.opacity = prev ? "1" : ".45";
    btnPrev.style.pointerEvents = prev ? "auto" : "none";
    btnPrev.innerHTML = `${ICONS.arrowL} Previous`;
    btnPrev.onclick = () => prev && setActive(root, ctx, prev.id);

    if (next) {
      btnNext.disabled = false;
      btnNext.style.opacity = "1";
      btnNext.style.pointerEvents = "auto";
      btnNext.innerHTML = `Next ${ICONS.arrowR}`;
      btnNext.onclick = () => setActive(root, ctx, next.id);
    } else {
      btnNext.disabled = true;
      btnNext.style.opacity = ".45";
      btnNext.style.pointerEvents = "none";
      btnNext.innerHTML = `Next ${ICONS.arrowR}`;
      btnNext.onclick = null;
    }

    const prog = computeProgress(state, requiredIds);
    const mid = qs(root, '[data-bwp="midText"]');
    if (mid) mid.textContent = `${prog.pct}% complete`;

    updateProgressUI(root, ctx);

    if (justMarked && !opts.silent) showToast(root, "Marked as complete");

    closeDrawer(root);
    if (!opts.noScroll) scrollToRootWithOffset(root);
  }

  function updateProgressUI(root, ctx) {
    const { state, requiredIds } = ctx;
    const prog = computeProgress(state, requiredIds);
    const pill = qs(root, '[data-bwp="pill"]');

    qsa(root, '[data-bwp="progressText"]').forEach((el) => {
      el.textContent = `${prog.pct}% Complete`;
    });

    qsa(root, '[data-bwp="progressFill"]').forEach((fill) => {
      fill.style.width = `${prog.pct}%`;
    });

    if (pill) pill.textContent = `${prog.done} / ${prog.total}`;
  }

  function bindSidebarInteractions(root, ctx) {
    qsa(root, ".s1__sum").forEach((sum) => {
      sum.onclick = () => {
        const block = sum.closest(".s1__block");
        if (!block) return;
        const isOpen = block.getAttribute("data-open") === "true";
        block.setAttribute("data-open", isOpen ? "false" : "true");
      };
    });

    qsa(root, ".s2__item").forEach((it) => {
      it.onclick = () => {
        const id = it.getAttribute("data-topic");
        if (!id) return;
        setActive(root, ctx, id);
      };
    });
  }

  let _bodyLockCount = 0;
  let _prevBodyOverflow = "";

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
        if (_bodyLockCount === 0) {
          document.body.style.overflow = _prevBodyOverflow;
        }
      }
    } catch (e) {}
  }

  function openDrawer(root) {
    const mask = qs(root, '[data-bwp="mask"]');
    const drawer = qs(root, '[data-bwp="drawer"]');
    if (!mask || !drawer) return;
    mask.setAttribute("data-open", "true");
    drawer.setAttribute("data-open", "true");
    lockBodyScroll(true);
  }

  function closeDrawer(root) {
    const mask = qs(root, '[data-bwp="mask"]');
    const drawer = qs(root, '[data-bwp="drawer"]');
    if (!mask || !drawer) return;
    if (mask.getAttribute("data-open") === "true" || drawer.getAttribute("data-open") === "true") {
      mask.setAttribute("data-open", "false");
      drawer.setAttribute("data-open", "false");
      lockBodyScroll(false);
    }
  }

  function init() {
    const root = document.getElementById(ROOT_ID);
    if (!root) return;

    renderShell(root);
    injectStyles();

    requestAnimationFrame(() => setNavOffset(root));
    setTimeout(() => setNavOffset(root), 60);

    const { flat, blocks } = buildFlatIndex();
    const requiredIds = flat.filter((x) => x.type === "topic").map((x) => x.id);
    const state = loadState();

    const forcedStart = root.getAttribute("data-start-topic");
    const hashTopic = readHashTopic();
    const firstTopic = flat.find((x) => x.type === "topic");
    const firstTopicId = firstTopic ? firstTopic.id : null;

    const startId =
      (forcedStart && flat.some((x) => x.id === forcedStart) && forcedStart) ||
      (hashTopic && flat.some((x) => x.id === hashTopic) && hashTopic) ||
      (state.last && flat.some((x) => x.id === state.last) && state.last) ||
      firstTopicId;

    const ctx = {
      flat,
      blocks,
      state,
      requiredIds
    };

    const openBtn = qs(root, '[data-bwp="openDrawer"]');
    const closeBtn = qs(root, '[data-bwp="closeDrawer"]');
    const mask = qs(root, '[data-bwp="mask"]');

    if (openBtn) openBtn.onclick = () => openDrawer(root);
    if (closeBtn) closeBtn.onclick = () => closeDrawer(root);
    if (mask) mask.onclick = () => closeDrawer(root);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeDrawer(root);
      }
    });

    renderIntro(root, ctx, startId || firstTopicId);

    window.addEventListener("resize", () => setNavOffset(root), { passive: true });

    window.addEventListener("hashchange", () => {
      if (_hashLock) return;
      const id = readHashTopic();
      if (!id) return;
      if (!flat.some((x) => x.id === id)) return;
      setActive(root, ctx, id, { silent: true });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
