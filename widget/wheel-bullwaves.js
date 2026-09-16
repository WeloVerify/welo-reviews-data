
/*
 * Bullwaves Fight Night 2026
 * Premium Prize Wheel
 *
 * Vanilla JavaScript
 * Native Webflow Form Integration
 *
 * No backend required.
 *
 * Browser storage is best effort only.
 * Claim IDs must be verified by support
 * against the original Webflow submission.
 */

(function () {
  'use strict';

  /*
   * CONFIGURATION
   */

  const CONFIG = {

    storageKey: 'bw-fight-night-2026-v2',

    duration: 5900,

    /*
     * FIRST WHEEL PROBABILITIES
     *
     * All prizes are always displayed.
     *
     * These weights determine which prize
     * can actually be selected.
     */

    categoryWeights: {

      Trader: {
        ticket: 0,
        bonus: 70,
        challenge: 30
      },

      Affiliate: {
        ticket: 80,
        bonus: 0,
        challenge: 20
      },

      'Software / Tech Company': {
        ticket: 0,
        bonus: 0,
        challenge: 100
      },

      'PSP Company': {
        ticket: 0,
        bonus: 0,
        challenge: 100
      },

      Other: {
        ticket: 0,
        bonus: 0,
        challenge: 100
      }

    },

    /*
     * SECOND WHEEL PROBABILITIES
     *
     * All five challenge sizes are displayed.
     */

    challengeWeights: {

      Trader: {
        '5000': 0,
        '10000': 60,
        '25000': 30,
        '50000': 10,
        '100000': 0
      },

      Affiliate: {
        '5000': 0,
        '10000': 0,
        '25000': 0,
        '50000': 80,
        '100000': 20
      },

      'Software / Tech Company': {
        '5000': 80,
        '10000': 20,
        '25000': 0,
        '50000': 0,
        '100000': 0
      },

      'PSP Company': {
        '5000': 80,
        '10000': 20,
        '25000': 0,
        '50000': 0,
        '100000': 0
      },

      Other: {
        '5000': 80,
        '10000': 20,
        '25000': 0,
        '50000': 0,
        '100000': 0
      }

    },

    /*
     * CHALLENGE RETAIL PRICES
     */

    challengePrices: {
      '5000': 59,
      '10000': 99,
      '25000': 199,
      '50000': 299,
      '100000': 549
    },

    /*
     * SUPPORT LINKS
     */

    support: {
      broker: 'https://www.bullwaves.com/contact-us',
      prime: 'https://www.prime.bullwaves.com/contact-us'
    }

  };

  /*
   * PRIZE ORDER
   *
   * Do not filter these arrays by probability.
   */

  const CATEGORY_ORDER = [
    'ticket',
    'bonus',
    'challenge'
  ];

  const CHALLENGE_ORDER = [
    '5000',
    '10000',
    '25000',
    '50000',
    '100000'
  ];

  const money = value =>
    '$' + Number(value).toLocaleString('en-US');

  /*
   * PRIZE INFORMATION
   */

  const PRIZES = {

    ticket: {

      short: [
        '1 VIP',
        'TICKET'
      ],

      name: '1 VIP Ticket',

      value: '$1,100 VALUE',

      details:
        'Experience A1 Combat × Bullwaves live in Dubai.'

    },

    bonus: {

      short: [
        '$800',
        'BONUS'
      ],

      name: '$800 Trading Bonus',

      value: '$800 TRADING CREDIT',

      details:
        'Tradable bonus for your Bullwaves account.'

    },

    challenge: {

      short: [
        'PRIME',
        'CHALLENGE'
      ],

      name: 'Bullwaves Prime Challenge',

      value: 'UP TO $550 VALUE',

      details:
        'Win a challenge account of up to $100,000.'

    }

  };

  /*
   * RANDOM GENERATION
   */

  function random() {

    if (!window.crypto || !crypto.getRandomValues) {
      throw new Error(
        'Secure random generation is unavailable.'
      );
    }

    return (
      crypto.getRandomValues(
        new Uint32Array(1)
      )[0] / 4294967296
    );

  }

  function choose(weights) {

    const pool = Object.entries(weights).filter(
      ([, weight]) =>
        Number.isFinite(weight) && weight > 0
    );

    if (!pool.length) {
      throw new Error(
        'No valid prize probabilities configured.'
      );
    }

    let point = random() * pool.reduce(
      (total, [, weight]) => total + weight,
      0
    );

    for (const [key, weight] of pool) {

      point -= weight;

      if (point < 0) {
        return key;
      }

    }

    return pool[pool.length - 1][0];

  }

  /*
   * CLAIM ID
   */

  function makeID() {

    const bytes = crypto.getRandomValues(
      new Uint8Array(8)
    );

    const hex = Array.from(
      bytes,
      byte => byte.toString(16).padStart(2, '0')
    ).join('').toUpperCase();

    return (
      'BW26-' +
      hex.slice(0, 8) +
      '-' +
      hex.slice(8)
    );

  }

  /*
   * BROWSER STORAGE
   */

  function isValid(entry) {

    return (

      entry &&

      entry.version === 2 &&

      /^BW26-[0-9A-F]{8}-[0-9A-F]{8}$/.test(
        entry.id
      ) &&

      CONFIG.categoryWeights[entry.type] &&

      CONFIG.categoryWeights[entry.type][
        entry.category
      ] > 0 &&

      (
        entry.category !== 'challenge' ||

        CONFIG.challengeWeights[entry.type][
          entry.challenge
        ] > 0
      ) &&

      [
        'challenge',
        'ready',
        'submitted'
      ].includes(entry.stage) &&

      [
        'first',
        'last',
        'email',
        'date'
      ].every(
        key => typeof entry[key] === 'string'
      )

    );

  }

  function readEntry() {

    let local = null;

    let cookie = null;

    try {

      local = JSON.parse(
        localStorage.getItem(
          CONFIG.storageKey
        )
      );

    } catch (_) {}

    try {

      const item = document.cookie
        .split('; ')
        .find(
          part =>
            part.startsWith(
              CONFIG.storageKey + '='
            )
        );

      if (item) {

        cookie = JSON.parse(
          decodeURIComponent(
            item.slice(
              CONFIG.storageKey.length + 1
            )
          )
        );

      }

    } catch (_) {}

    return [local, cookie]
      .filter(isValid)
      .sort(
        (a, b) =>
          (b.updated || 0) -
          (a.updated || 0)
      )[0] || null;

  }

  function saveEntry(entry) {

    entry.updated = Date.now();

    const data = JSON.stringify(entry);

    let saved = false;

    try {

      localStorage.setItem(
        CONFIG.storageKey,
        data
      );

      saved =
        localStorage.getItem(
          CONFIG.storageKey
        ) === data;

    } catch (_) {}

    try {

      const encoded = encodeURIComponent(
        data
      );

      document.cookie =
        CONFIG.storageKey +
        '=' +
        encoded +
        '; Max-Age=31536000; Path=/; SameSite=Lax' +
        (
          location.protocol === 'https:'
            ? '; Secure'
            : ''
        );

      saved =
        saved ||
        document.cookie
          .split('; ')
          .includes(
            CONFIG.storageKey + '=' + encoded
          );

    } catch (_) {}

    return saved;

  }

  /*
   * PREMIUM STYLES
   *
   * Responsive desktop, tablet and mobile.
   */

  function addStyles() {

    if (
      document.getElementById(
        'bw-wheel-premium-styles'
      )
    ) {
      return;
    }

    const style = document.createElement(
      'style'
    );

    style.id = 'bw-wheel-premium-styles';

    style.textContent = `

      /*
       * GLOBAL
       */

      .bw-wheel-modal,
      .bw-wheel-modal * {
        box-sizing: border-box;
      }

      .bw-wheel-modal {
        position: fixed;
        inset: 0;

        width: min(780px, calc(100vw - 24px));
        max-width: 780px;
        max-height: 94dvh;

        margin: auto;
        padding: 0;

        overflow-x: hidden;
        overflow-y: auto;

        border: 1px solid #26365b;
        border-radius: 26px;

        background: #070b16;
        color: #fff;

        font-family: Inter, Arial, sans-serif;

        box-shadow:
          0 35px 130px rgba(0, 0, 0, .75);

        overscroll-behavior: contain;
        -webkit-overflow-scrolling: touch;
      }

      .bw-wheel-modal::backdrop {
        background: rgba(0, 0, 0, .85);
        backdrop-filter: blur(12px);
      }

      .bw-wheel-panel {
        position: relative;
        width: 100%;

        padding:
          38px
          clamp(18px, 4vw, 42px)
          28px;

        text-align: center;

        background:
          radial-gradient(
            ellipse at 50% 0%,
            rgba(24, 52, 123, .4),
            transparent 55%
          );
      }

      /*
       * CLOSE BUTTON
       */

      .bw-wheel-close {
        position: absolute;
        top: 14px;
        right: 15px;
        z-index: 10;

        width: 38px;
        height: 38px;

        display: grid;
        place-items: center;

        border: 1px solid rgba(255,255,255,.15);
        border-radius: 50%;

        background: rgba(255,255,255,.06);
        color: #fff;

        font-size: 26px;
        line-height: 1;

        cursor: pointer;
      }

      .bw-wheel-close:hover {
        background: rgba(255,255,255,.13);
      }

      .bw-wheel-close:disabled {
        opacity: .3;
        cursor: wait;
      }

      /*
       * HEADER
       */

      .bw-wheel-kicker {
        color: #8ea9ff;

        font-size: 10px;
        font-weight: 800;

        letter-spacing: .23em;
        line-height: 1.5;
      }

      .bw-wheel-modal h2 {
        max-width: 650px;

        margin: 12px auto 10px;

        color: #fff;

        font-size: clamp(30px, 5vw, 49px);
        line-height: 1.08;

        letter-spacing: -.055em;
        font-weight: 800;

        overflow-wrap: break-word;
      }

      .bw-wheel-intro {
        max-width: 550px;

        margin: 0 auto 23px;

        color: #b3bfd7;

        font-size: 13px;
        line-height: 1.65;
      }

      .bw-wheel-content {
        width: 100%;
        min-width: 0;
      }

      /*
       * PRIZE CARDS
       *
       * IMPORTANT
       *
       * No disabled appearance.
       * No eligibility message.
       * All prizes look identical.
       */

      .bw-wheel-prizes {
        display: grid;

        grid-template-columns:
          repeat(3, minmax(0, 1fr));

        gap: 9px;

        width: 100%;
        margin: 18px 0 24px;
      }

      .bw-wheel-prizes.five {
        grid-template-columns:
          repeat(5, minmax(0, 1fr));
      }

      .bw-wheel-prize {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        min-width: 0;
        min-height: 112px;

        padding: 16px 9px;

        border: 1px solid rgba(105,141,255,.28);
        border-radius: 15px;

        background:
          linear-gradient(
            160deg,
            #172751,
            #101624 85%
          );

        text-align: center;

        transition:
          border-color .2s ease,
          transform .2s ease;
      }

      .bw-wheel-prize:hover {
        border-color: rgba(105,141,255,.65);
        transform: translateY(-2px);
      }

      .bw-wheel-prize-name {
        color: #fff;

        font-size: clamp(11px, 1.8vw, 13px);
        line-height: 1.35;

        font-weight: 750;

        overflow-wrap: break-word;
      }

      .bw-wheel-prize-value {
        margin-top: 8px;

        color: #a5bfff;

        font-size: 10px;
        line-height: 1.35;

        font-weight: 800;
        letter-spacing: .035em;
      }

      .bw-wheel-prize-note {
        margin-top: 7px;

        color: #a6aec4;

        font-size: 10px;
        line-height: 1.4;
      }

      /*
       * WHEEL
       */

      .bw-wheel-stage {
        position: relative;

        width: min(100%, 425px);
        aspect-ratio: 1;

        margin: 0 auto 20px;
        padding: 9px;

        border: 1px solid rgba(110,149,255,.4);
        border-radius: 50%;

        background:
          radial-gradient(
            circle,
            #26385a 0%,
            #101a31 60%,
            #4270ff 100%
          );

        box-shadow:
          0 0 0 6px rgba(255,255,255,.03),
          0 0 65px rgba(0,54,255,.27);
      }

      .bw-wheel-disc {
        display: block;

        width: 100%;
        height: 100%;

        border-radius: 50%;

        will-change: transform;
      }

      .bw-wheel-pointer {
        position: absolute;

        z-index: 2;

        top: -11px;
        left: 50%;

        transform: translateX(-50%);

        width: 0;
        height: 0;

        border-left:
          17px solid transparent;

        border-right:
          17px solid transparent;

        border-top:
          33px solid #fff;

        filter:
          drop-shadow(0 2px 8px #000);
      }

      /*
       * WHEEL DESCRIPTION
       */

      .bw-wheel-eligibility {
        max-width: 470px;

        margin: 8px auto 17px;

        color: #97a6c4;

        font-size: 11px;
        line-height: 1.6;
      }

      /*
       * BUTTONS
       */

      .bw-wheel-actions {
        display: flex;
        flex-wrap: wrap;

        justify-content: center;

        gap: 10px;

        width: 100%;
      }

      .bw-wheel-button {
        display: inline-flex;

        align-items: center;
        justify-content: center;

        min-height: 51px;

        padding: 13px 24px;

        border: 1px solid #235aff;
        border-radius: 100px;

        background: #0036ff;
        color: #fff;

        font:
          700 13px Inter, Arial, sans-serif;

        text-align: center;
        text-decoration: none;

        cursor: pointer;

        box-shadow:
          0 8px 35px rgba(0,54,255,.27);

        transition:
          background .2s ease,
          transform .2s ease;
      }

      .bw-wheel-button:hover {
        background: #2254ff;
        transform: translateY(-1px);
      }

      .bw-wheel-button:disabled {
        opacity: .6;
        cursor: wait;
        transform: none;
      }

      .bw-wheel-button.bw-wheel-secondary {
        background: rgba(255,255,255,.05);

        border-color:
          rgba(255,255,255,.2);

        box-shadow: none;
      }

      .bw-wheel-button.bw-wheel-secondary:hover {
        background: rgba(255,255,255,.1);
      }

      /*
       * STATUS
       */

      .bw-wheel-status {
        color: #a6bbef;

        min-height: 17px;

        font-size: 12px;
        line-height: 1.55;

        margin: 8px 0 14px;
      }

      .bw-wheel-footnote {
        color: #78859d;

        font-size: 11px;
        line-height: 1.5;

        margin: 22px 0 0;
      }

      /*
       * WINNING SCREEN
       */

      .bw-wheel-win {
        width: 100%;

        margin: 22px auto;
        padding: 28px 18px;

        border: 1px solid rgba(120,154,255,.4);
        border-radius: 19px;

        background:
          radial-gradient(
            circle at 50% 0%,
            rgba(23,76,169,.27),
            #0b1324 68%
          );
      }

      .bw-wheel-win-label {
        display: block;

        color: #a3baff;

        font-size: 11px;
        font-weight: 800;

        letter-spacing: .14em;
      }

      .bw-wheel-win-title {
        margin: 12px 0;

        color: #fff;

        font-size: clamp(27px, 5vw, 42px);
        font-weight: 800;

        line-height: 1.08;
        letter-spacing: -.05em;

        overflow-wrap: break-word;
      }

      .bw-wheel-win-value {
        color: #83a6ff;

        font-size: 14px;
        font-weight: 800;
      }

      .bw-wheel-win-details {
        color: #b0bad2;

        font-size: 12px;
        line-height: 1.6;

        margin: 9px 0 0;
      }

      /*
       * CLAIM ID
       */

      .bw-wheel-claim-id {
        padding: 12px;

        border: 1px dashed #6179bb;
        border-radius: 10px;

        background: #0d1730;
        color: #e8eeff;

        font-size: 14px;
        font-weight: 700;

        overflow-wrap: anywhere;
        user-select: all;
      }

      .bw-wheel-help {
        color: #aeb9d0;

        font-size: 12px;
        line-height: 1.65;
      }

      /*
       * CLAIM MESSAGE
       */

      .bw-wheel-message {
        display: block;

        width: 100%;
        min-height: 112px;

        resize: vertical;

        padding: 13px;
        margin: 15px 0;

        border: 1px solid rgba(255,255,255,.15);
        border-radius: 12px;

        background: #0e1524;
        color: #dfe7ff;

        font:
          12px/1.5 Inter, Arial, sans-serif;
      }

      .bw-wheel-inline-status {
        color: #a7b2c9;

        font:
          12px/1.5 Inter, Arial, sans-serif;
      }

      /*
       * TABLET
       */

      @media screen and (max-width: 767px) {

        .bw-wheel-modal {
          width: calc(100vw - 24px);

          max-height: 94dvh;

          border-radius: 20px;
        }

        .bw-wheel-panel {
          padding: 34px 20px 24px;
        }

        .bw-wheel-modal h2 {
          font-size: clamp(30px, 6vw, 43px);
        }

        .bw-wheel-prizes.five {
          grid-template-columns:
            repeat(3, minmax(0, 1fr));
        }

        .bw-wheel-stage {
          width: min(100%, 370px);
        }

      }

      /*
       * MOBILE
       */

      @media screen and (max-width: 580px) {

        .bw-wheel-modal {
          width: calc(100vw - 16px);

          max-height: 94dvh;

          border-radius: 18px;
        }

        .bw-wheel-panel {
          padding: 32px 15px 22px;
        }

        .bw-wheel-close {
          top: 10px;
          right: 10px;

          width: 34px;
          height: 34px;

          font-size: 23px;
        }

        .bw-wheel-kicker {
          padding: 0 30px;

          font-size: 9px;
          letter-spacing: .17em;
        }

        .bw-wheel-modal h2 {
          margin-top: 16px;

          font-size: clamp(28px, 8vw, 38px);

          line-height: 1.08;
        }

        .bw-wheel-intro {
          margin-bottom: 18px;

          font-size: 12px;
          line-height: 1.6;
        }

        /*
         * First wheel prizes.
         *
         * One column for readability.
         */

        .bw-wheel-prizes {
          grid-template-columns: 1fr;

          gap: 7px;

          margin: 14px 0 22px;
        }

        .bw-wheel-prizes:not(.five)
        .bw-wheel-prize {
          display: grid;

          grid-template-columns:
            minmax(0, 1fr) auto;

          align-items: center;

          min-height: 0;

          padding: 11px 13px;

          text-align: left;
        }

        .bw-wheel-prizes:not(.five)
        .bw-wheel-prize-name {
          font-size: 12px;
        }

        .bw-wheel-prizes:not(.five)
        .bw-wheel-prize-value {
          margin: 0 0 0 10px;

          font-size: 10px;

          text-align: right;
        }

        .bw-wheel-prizes:not(.five)
        .bw-wheel-prize-note {
          grid-column: 1 / -1;

          margin-top: 5px;

          font-size: 10px;
        }

        /*
         * Challenge prizes.
         *
         * Two columns.
         */

        .bw-wheel-prizes.five {
          grid-template-columns:
            repeat(2, minmax(0, 1fr));

          gap: 7px;
        }

        .bw-wheel-prizes.five
        .bw-wheel-prize {
          min-height: 68px;

          padding: 10px 8px;
        }

        .bw-wheel-prizes.five
        .bw-wheel-prize:last-child {
          grid-column: 1 / -1;
        }

        .bw-wheel-prizes.five
        .bw-wheel-prize-name {
          font-size: 11px;
        }

        .bw-wheel-prizes.five
        .bw-wheel-prize-value {
          margin-top: 5px;

          font-size: 10px;
        }

        /*
         * Smaller wheel.
         */

        .bw-wheel-stage {
          width: min(100%, 300px);

          padding: 7px;

          margin-bottom: 16px;
        }

        .bw-wheel-pointer {
          top: -8px;

          border-left-width: 13px;
          border-right-width: 13px;
          border-top-width: 25px;
        }

        /*
         * Mobile buttons.
         */

        .bw-wheel-actions {
          flex-direction: column;

          gap: 9px;
        }

        .bw-wheel-button {
          width: 100%;
          min-height: 49px;

          padding: 13px 16px;

          font-size: 13px;
        }

        .bw-wheel-win {
          padding: 24px 14px;
        }

        .bw-wheel-win-title {
          font-size: clamp(27px, 7vw, 36px);
        }

        .bw-wheel-claim-id {
          font-size: 12px;
        }

        .bw-wheel-message {
          font-size: 12px;
        }

      }

      /*
       * SMALL PHONES
       */

      @media screen and (max-width: 380px) {

        .bw-wheel-panel {
          padding-left: 12px;
          padding-right: 12px;
        }

        .bw-wheel-modal h2 {
          font-size: 27px;
        }

        .bw-wheel-stage {
          width: min(100%, 255px);
        }

        .bw-wheel-prize-name {
          font-size: 11px;
        }

        .bw-wheel-prize-value {
          font-size: 9px;
        }

      }

      /*
       * REDUCED MOTION
       */

      @media (prefers-reduced-motion: reduce) {

        .bw-wheel-button,
        .bw-wheel-prize {
          transition: none;
        }

      }

    `;

    document.head.append(style);

  }

  /*
   * INITIALIZATION
   */

  function init() {

    const section = document.getElementById(
      'bw-dubai-section'
    );

    if (
      !section ||
      section.dataset.bwWheelReady
    ) {
      return;
    }

    const form = section.closest('form');

    const block = section.closest('.w-form');

    const first = section.querySelector(
      '#bw-first-name'
    );

    const last = section.querySelector(
      '#bw-last-name'
    );

    const email = section.querySelector(
      '#bw-email'
    );

    const nativeSubmit = section.querySelector(
      '[type="submit"]'
    );

    const success = block &&
      block.querySelector('.w-form-done');

    const failure = block &&
      block.querySelector('.w-form-fail');

    if (
      !form ||
      !block ||
      !first ||
      !last ||
      !email ||
      !nativeSubmit ||
      !success ||
      !failure
    ) {

      console.error(
        'Bullwaves wheel: place the original embed inside a native Webflow Form Block.'
      );

      return;

    }

    if (
      form.getAttribute('action') ||
      form.getAttribute('data-redirect')
    ) {

      console.error(
        'Bullwaves wheel: remove custom form action and success redirect.'
      );

      return;

    }

    section.dataset.bwWheelReady = 'true';

    addStyles();

    /*
     * PARTICIPANT TYPE
     */

    const profileField =
      document.createElement('div');

    profileField.className = 'bw-field';

    profileField.innerHTML = `

      <label
        class="bw-label"
        for="bw-participant-type">

        Which best describes you?

      </label>

      <select
        id="bw-participant-type"
        name="Participant Type"
        data-name="Participant Type"
        class="bw-input w-select"
        required>

        <option value="">
          Select your profile
        </option>

      </select>

    `;

    const profile =
      profileField.querySelector('select');

    Object.keys(CONFIG.categoryWeights).forEach(
      type => {

        profile.add(
          new Option(type, type)
        );

      }
    );

    nativeSubmit.before(profileField);

    /*
     * PRESERVE NATIVE WEBFLOW SUBMIT
     */

    nativeSubmit.hidden = true;

    nativeSubmit.style.display = 'none';

    nativeSubmit.tabIndex = -1;

    const launch =
      document.createElement('button');

    launch.type = 'button';

    launch.className = 'bw-submit';

    launch.textContent = 'Spin to Win';

    nativeSubmit.before(launch);

    const inlineStatus =
      document.createElement('p');

    inlineStatus.className =
      'bw-wheel-inline-status';

    inlineStatus.setAttribute(
      'role',
      'status'
    );

    launch.after(inlineStatus);

    /*
     * SUCCESS REOPEN BUTTON
     */

    const reopen =
      document.createElement('button');

    reopen.type = 'button';

    reopen.className = 'bw-submit';

    reopen.textContent = 'View My Prize';

    success.append(reopen);

    /*
     * CREATE MODAL
     */

    const modal =
      document.createElement('dialog');

    modal.className = 'bw-wheel-modal';

    modal.setAttribute(
      'aria-labelledby',
      'bw-wheel-heading'
    );

    modal.innerHTML = `

      <div class="bw-wheel-panel">

        <button
          class="bw-wheel-close"
          type="button"
          aria-label="Close prize window">

          ×

        </button>

        <div class="bw-wheel-kicker">

          A1 COMBAT × BULLWAVES

        </div>

        <h2 id="bw-wheel-heading"></h2>

        <p class="bw-wheel-intro"></p>

        <div class="bw-wheel-content"></div>

        <p
          class="bw-wheel-status"
          role="status"
          aria-live="polite">
        </p>

        <div class="bw-wheel-actions"></div>

        <p class="bw-wheel-footnote">

          DUBAI · 28 NOVEMBER 2026

        </p>

      </div>

    `;

    document.body.append(modal);

    const $ = selector =>
      modal.querySelector(selector);

    const heading =
      $('#bw-wheel-heading');

    const intro =
      $('.bw-wheel-intro');

    const content =
      $('.bw-wheel-content');

    const actions =
      $('.bw-wheel-actions');

    const status =
      $('.bw-wheel-status');

    const close =
      $('.bw-wheel-close');

    let entry = readEntry();

    let spinning = false;

    let submitting = false;

    let allowNativeSubmit = false;

    let timeoutID = null;

    let previousOverflow = '';

    let focusBeforeModal = null;

    /*
     * UI HELPERS
     */

    function reset(title, description) {

      heading.textContent = title;

      intro.textContent = description;

      content.replaceChildren();

      actions.replaceChildren();

      status.textContent = '';

    }

    function addButton(
      label,
      callback,
      secondary
    ) {

      const element =
        document.createElement('button');

      element.type = 'button';

      element.className =
        'bw-wheel-button' +
        (
          secondary
            ? ' bw-wheel-secondary'
            : ''
        );

      element.textContent = label;

      element.addEventListener(
        'click',
        callback
      );

      actions.append(element);

      return element;

    }

    function setSpinning(value) {

      spinning = value;

      close.disabled = value;

    }

    function open() {

      if (modal.open) {
        return;
      }

      focusBeforeModal =
        document.activeElement;

      previousOverflow =
        document.body.style.overflow;

      document.body.style.overflow =
        'hidden';

      modal.showModal();

      close.focus();

    }

    function dismiss() {

      if (!spinning) {
        modal.close();
      }

    }

    close.addEventListener(
      'click',
      dismiss
    );

    modal.addEventListener(
      'cancel',
      event => {

        if (spinning) {
          event.preventDefault();
        }

      }
    );

    modal.addEventListener(
      'close',
      () => {

        document.body.style.overflow =
          previousOverflow;

        if (
          focusBeforeModal &&
          focusBeforeModal.isConnected
        ) {

          focusBeforeModal.focus();

        }

      }
    );

    /*
     * PRIZE INFORMATION
     */

    function prizeName() {

      return entry.category === 'challenge'

        ? money(entry.challenge) +
          ' Bullwaves Prime Challenge'

        : PRIZES[entry.category].name;

    }

    function prizeValue() {

      if (entry.category === 'challenge') {

        return (
          'Retail value ' +
          money(
            CONFIG.challengePrices[
              entry.challenge
            ]
          ) +
          ', not cash'
        );

      }

      if (entry.category === 'bonus') {

        return (
          '$800 tradable account bonus, not cash'
        );

      }

      return (
        'VIP Ticket value $1,100. One ticket included'
      );

    }

    /*
     * WEBFLOW FORM FIELDS
     */

    function restoreForm() {

      first.value = entry.first;

      last.value = entry.last;

      email.value = entry.email;

      profile.value = entry.type;

    }

    function hiddenField(name, value) {

      let input = Array.from(
        form.elements
      ).find(
        item => item.name === name
      );

      if (!input) {

        input =
          document.createElement('input');

        input.type = 'hidden';

        input.name = name;

        input.dataset.name = name;

        form.append(input);

      }

      input.value = value;

    }

    function prepareSubmission() {

      restoreForm();

      hiddenField(
        'Prize Category',

        entry.category === 'challenge'
          ? 'Bullwaves Prime Challenge'
          : PRIZES[entry.category].name
      );

      hiddenField(
        'Prize Details',
        prizeName()
      );

      hiddenField(
        'Prize Value',
        prizeValue()
      );

      hiddenField(
        'Claim ID',
        entry.id
      );

      hiddenField(
        'Participation Date',
        entry.date
      );

    }

    function paragraph(
      className,
      text
    ) {

      const element =
        document.createElement('p');

      element.className = className;

      element.textContent = text;

      content.append(element);

      return element;

    }

    /*
     * PRIZE CARDS
     *
     * ALWAYS SHOW ALL PRIZES.
     *
     * No unavailable messages.
     * No disabled appearance.
     * No probability-based visual changes.
     */

    function showTiles(
      keys,
      challenge
    ) {

      const grid =
        document.createElement('div');

      grid.className =
        'bw-wheel-prizes' +
        (
          challenge
            ? ' five'
            : ''
        );

      keys.forEach(key => {

        const tile =
          document.createElement('div');

        /*
         * Every prize uses exactly
         * the same visual style.
         */

        tile.className =
          'bw-wheel-prize';

        const name =
          document.createElement('div');

        name.className =
          'bw-wheel-prize-name';

        name.textContent = challenge

          ? money(key) + ' Challenge'

          : PRIZES[key].name;

        const value =
          document.createElement('div');

        value.className =
          'bw-wheel-prize-value';

        value.textContent = challenge

          ? money(
              CONFIG.challengePrices[key]
            ) + ' RETAIL VALUE'

          : PRIZES[key].value;

        const note =
          document.createElement('div');

        note.className =
          'bw-wheel-prize-note';

        /*
         * Only show prize descriptions.
         *
         * Never show eligibility
         * or internal probabilities.
         */

        note.textContent = challenge

          ? 'Challenge account, not cash'

          : PRIZES[key].details;

        tile.append(
          name,
          value,
          note
        );

        grid.append(tile);

      });

      content.append(grid);

    }

    /*
     * CANVAS WHEEL
     */

    function drawWheel(
      keys,
      challenge
    ) {

      const stage =
        document.createElement('div');

      stage.className =
        'bw-wheel-stage';

      const pointer =
        document.createElement('div');

      pointer.className =
        'bw-wheel-pointer';

      pointer.setAttribute(
        'aria-hidden',
        'true'
      );

      const canvas =
        document.createElement('canvas');

      canvas.className =
        'bw-wheel-disc';

      canvas.width = 900;

      canvas.height = 900;

      canvas.setAttribute(
        'role',
        'img'
      );

      canvas.setAttribute(
        'aria-label',

        'Prize wheel showing ' +

        keys.map(
          key => challenge

            ? money(key) + ' Challenge'

            : PRIZES[key].name

        ).join(', ')
      );

      const ctx =
        canvas.getContext('2d');

      if (!ctx) {

        throw new Error(
          'Canvas is not available in this browser.'
        );

      }

      const step =
        2 * Math.PI / keys.length;

      const colors = [
        '#104cff',
        '#142a68',
        '#2046a1',
        '#101f4f',
        '#264dc0'
      ];

      keys.forEach(
        (key, index) => {

          const start =
            -Math.PI / 2 +
            index * step;

          /*
           * SECTOR
           */

          ctx.beginPath();

          ctx.moveTo(
            450,
            450
          );

          ctx.arc(
            450,
            450,
            430,
            start,
            start + step
          );

          ctx.closePath();

          ctx.fillStyle =
            colors[index];

          ctx.fill();

          ctx.strokeStyle =
            '#8baaff';

          ctx.lineWidth = 3;

          ctx.stroke();

          /*
           * SECTOR TEXT
           */

          ctx.save();

          ctx.translate(
            450,
            450
          );

          ctx.rotate(
            start + step / 2
          );

          ctx.translate(
            283,
            0
          );

          ctx.rotate(
            Math.PI / 2
          );

          ctx.textAlign = 'center';

          ctx.fillStyle = '#fff';

          /*
           * Bigger labels for mobile.
           */

          let words;

          if (challenge) {

            words = [
              money(key),
              'CHALLENGE'
            ];

          } else {

            words =
              PRIZES[key].short;

          }

          words.forEach(
            (text, line) => {

              ctx.font =
                line === 0

                  ? '800 46px Inter, Arial, sans-serif'

                  : '700 37px Inter, Arial, sans-serif';

              ctx.fillText(
                text,
                0,
                (
                  line -
                  (words.length - 1) / 2
                ) * 52,
                245
              );

            }
          );

          ctx.restore();

        }
      );

      /*
       * CENTER CIRCLE
       */

      ctx.beginPath();

      ctx.arc(
        450,
        450,
        88,
        0,
        2 * Math.PI
      );

      ctx.fillStyle =
        '#070d20';

      ctx.fill();

      ctx.strokeStyle =
        '#a1b8ff';

      ctx.lineWidth = 4;

      ctx.stroke();

      /*
       * CENTER TEXT
       */

      ctx.fillStyle = '#fff';

      ctx.textAlign = 'center';

      ctx.font =
        '800 28px Inter, Arial, sans-serif';

      ctx.fillText(
        'BULL',
        450,
        440
      );

      ctx.fillText(
        'WAVES',
        450,
        475
      );

      stage.append(
        pointer,
        canvas
      );

      content.append(stage);

      /*
       * No eligibility information.
       * No unavailable prize labels.
       */

      paragraph(
        'bw-wheel-eligibility',

        challenge

          ? 'Five challenge sizes. One winning account.'

          : 'Three incredible prizes. One winning spin.'
      );

      return canvas;

    }

    /*
     * WHEEL ANIMATION
     */

    async function spin(
      canvas,
      keys,
      winner
    ) {

      setSpinning(true);

      actions.querySelectorAll(
        'button'
      ).forEach(
        button => {
          button.disabled = true;
        }
      );

      status.textContent =
        'Revealing your prize…';

      const angle =
        360 * 7 -

        (
          keys.indexOf(winner) + .5
        ) *

        (
          360 / keys.length
        );

      const reduced =
        window.matchMedia &&

        matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches;

      if (
        !reduced &&
        canvas.animate
      ) {

        const animation =
          canvas.animate(

            [
              {
                transform:
                  'rotate(0deg)'
              },

              {
                transform:
                  'rotate(' +
                  angle +
                  'deg)'
              }
            ],

            {
              duration:
                CONFIG.duration,

              easing:
                'cubic-bezier(.16,.02,.10,1)',

              fill:
                'forwards'
            }

          );

        try {

          await animation.finished;

        } catch (_) {}

        canvas.style.transform =
          'rotate(' +
          angle +
          'deg)';

        animation.cancel();

      } else {

        canvas.style.transform =
          'rotate(' +
          angle +
          'deg)';

      }

      setSpinning(false);

    }

    /*
     * FIRST WHEEL
     */

    function firstWheel() {

      reset(
        'Your next big win starts here.',

        'Three extraordinary prizes. One spin. Find out what is waiting for you.'
      );

      const type =
        profile.value;

      const weights =
        CONFIG.categoryWeights[type];

      /*
       * ALL THREE PRIZES.
       *
       * Never filter by probability.
       */

      const keys =
        CATEGORY_ORDER;

      showTiles(
        keys,
        false
      );

      const canvas =
        drawWheel(
          keys,
          false
        );

      addButton(
        'Spin to Win',

        async () => {

          const existing =
            readEntry();

          if (existing) {

            entry = existing;

            restoreForm();

            resume();

            return;

          }

          let category;

          let challenge;

          try {

            category =
              choose(weights);

            challenge =
              category === 'challenge'

                ? choose(
                    CONFIG.challengeWeights[type]
                  )

                : null;

          } catch (_) {

            status.textContent =
              'The draw is temporarily unavailable. Please contact support.';

            return;

          }

          /*
           * Save both results before
           * starting the animation.
           */

          entry = {

            version: 2,

            id: makeID(),

            first:
              first.value.trim(),

            last:
              last.value.trim(),

            email:
              email.value
                .trim()
                .toLowerCase(),

            type,

            category,

            challenge,

            stage:
              category === 'challenge'

                ? 'challenge'

                : 'ready',

            date:
              new Date().toISOString()

          };

          if (!saveEntry(entry)) {

            entry = null;

            status.textContent =
              'Please enable browser storage so your prize can be saved before spinning.';

            return;

          }

          launch.textContent =
            'View My Prize';

          await spin(
            canvas,
            keys,
            category
          );

          if (
            entry.stage === 'challenge'
          ) {

            secondWheel();

          } else {

            submitEntry();

          }

        }
      );

    }

    /*
     * SECOND WHEEL
     */

    function secondWheel() {

      reset(
        'You won a Prime Challenge!',

        'One more spin to reveal your challenge account size.'
      );

      /*
       * ALL FIVE CHALLENGE SIZES.
       *
       * Never filter by probability.
       */

      const keys =
        CHALLENGE_ORDER;

      showTiles(
        keys,
        true
      );

      const canvas =
        drawWheel(
          keys,
          true
        );

      addButton(
        'Reveal My Challenge',

        async () => {

          entry.stage = 'ready';

          if (!saveEntry(entry)) {

            entry.stage = 'challenge';

            status.textContent =
              'Your browser could not save your progress. Please enable storage and retry.';

            return;

          }

          await spin(
            canvas,
            keys,
            entry.challenge
          );

          submitEntry();

        }
      );

    }

    /*
     * WINNING PRIZE PANEL
     */

    function prizePanel() {

      const panel =
        document.createElement('div');

      panel.className =
        'bw-wheel-win';

      const label =
        document.createElement('span');

      label.className =
        'bw-wheel-win-label';

      label.textContent =
        'YOUR WINNING PRIZE';

      const name =
        document.createElement('div');

      name.className =
        'bw-wheel-win-title';

      name.textContent =
        prizeName();

      const value =
        document.createElement('div');

      value.className =
        'bw-wheel-win-value';

      value.textContent =
        entry.category === 'challenge'

          ? money(
              CONFIG.challengePrices[
                entry.challenge
              ]
            ) + ' RETAIL VALUE'

          : PRIZES[
              entry.category
            ].value;

      const details =
        document.createElement('p');

      details.className =
        'bw-wheel-win-details';

      details.textContent =
        prizeValue();

      panel.append(
        label,
        name,
        value,
        details
      );

      content.append(panel);

    }

    /*
     * REGISTRATION STATUS
     */

    function pending(
      message,
      retry
    ) {

      reset(
        'Your prize is saved.',

        'Your reward and Claim ID will not change if you retry.'
      );

      prizePanel();

      paragraph(
        'bw-wheel-claim-id',
        entry.id
      );

      status.textContent =
        message;

      if (retry) {

        addButton(
          'Retry Registration',
          submitEntry
        );

      }

    }

    function submissionFailed(message) {

      clearTimeout(timeoutID);

      submitting = false;

      setSpinning(false);

      pending(
        message,
        true
      );

    }

    /*
     * NATIVE WEBFLOW SUBMISSION
     */

    function submitEntry() {

      if (submitting) {
        return;
      }

      prepareSubmission();

      if (!form.checkValidity()) {

        pending(
          'Please complete all required fields in the form and try again.',
          true
        );

        return;

      }

      if (

        !window.Webflow ||

        typeof window.Webflow.require !==
          'function' ||

        !window.Webflow.require('forms')

      ) {

        pending(
          'Registration is available only on the published Webflow site. Your prize remains saved.',
          true
        );

        return;

      }

      pending(
        'Submitting your registration to Webflow…',
        false
      );

      submitting = true;

      setSpinning(true);

      success.style.display =
        'none';

      failure.style.display =
        'none';

      allowNativeSubmit = true;

      try {

        form.requestSubmit(
          nativeSubmit
        );

      } catch (_) {

        submissionFailed(
          'We could not submit your form. Your prize is saved, please try again.'
        );

      } finally {

        allowNativeSubmit =
          false;

      }

      if (submitting) {

        timeoutID =
          setTimeout(
            () => {

              setSpinning(false);

              status.textContent =
                'Confirmation is taking longer than expected. Your prize is saved. Contact support before trying to register again to avoid duplicates.';

              addButton(
                'Contact Support',

                () => {

                  const url =
                    entry.category === 'challenge'

                      ? CONFIG.support.prime

                      : CONFIG.support.broker;

                  window.open(
                    url,
                    '_blank',
                    'noopener,noreferrer'
                  );

                },

                true
              );

            },

            45000
          );

      }

    }

    /*
     * WEBFLOW SUCCESS AND ERROR OBSERVER
     */

    const visible = element =>

      !element.hidden &&

      getComputedStyle(
        element
      ).display !== 'none';

    new MutationObserver(
      () => {

        if (!submitting) {
          return;
        }

        if (visible(success)) {

          clearTimeout(
            timeoutID
          );

          submitting = false;

          setSpinning(false);

          entry.stage =
            'submitted';

          saveEntry(entry);

          finalScreen();

        } else if (visible(failure)) {

          submissionFailed(
            'Webflow could not save your entry. Please retry, your prize and Claim ID will remain the same.'
          );

        }

      }
    ).observe(

      block,

      {

        attributes: true,

        attributeFilter: [
          'style',
          'class',
          'hidden'
        ],

        childList: true,

        subtree: true

      }

    );

    /*
     * FINAL PRIZE SCREEN
     */

    function finalScreen() {

      reset(
        'Congratulations!',

        'Your entry has been received. Here is your reward.'
      );

      prizePanel();

      paragraph(
        'bw-wheel-claim-id',
        entry.id
      );

      paragraph(
        'bw-wheel-help',

        'Copy the message, open the support chat and paste it there. Our team will check your registration before awarding the prize.'
      );

      /*
       * SUPPORT CLAIM MESSAGE
       */

      const message = [

        'Hello ' +

          (
            entry.category === 'challenge'

              ? 'Bullwaves Prime'

              : 'Bullwaves'
          ) +

          ' Support,',

        '',

        'I participated in the A1 Combat × Bullwaves Dubai giveaway and won ' +

          prizeName() +

          '.',

        '',

        'Name: ' +
          entry.first +
          ' ' +
          entry.last,

        'Email: ' +
          entry.email,

        'Prize: ' +
          prizeName(),

        'Prize value: ' +
          prizeValue(),

        'Claim ID: ' +
          entry.id,

        '',

        'I would like to claim my prize. Could you please help me with the next steps?',

        '',

        'Thank you!'

      ].join('\n');

      const textarea =
        document.createElement('textarea');

      textarea.className =
        'bw-wheel-message';

      textarea.readOnly = true;

      textarea.setAttribute(
        'aria-label',
        'Copy your support claim message'
      );

      textarea.value =
        message;

      content.append(
        textarea
      );

      /*
       * COPY MESSAGE
       */

      addButton(
        'Copy Claim Message',

        async () => {

          try {

            await navigator.clipboard.writeText(
              message
            );

            status.textContent =
              'Message copied!';

          } catch (_) {

            textarea.focus();

            textarea.select();

            let copied = false;

            try {

              copied =
                document.execCommand(
                  'copy'
                );

            } catch (_) {}

            status.textContent =
              copied

                ? 'Message copied!'

                : 'Select and copy the message above, then paste it into the support chat.';

          }

        }
      );

      /*
       * SUPPORT LINK
       */

      const support =
        document.createElement('a');

      support.className =
        'bw-wheel-button bw-wheel-secondary';

      support.textContent =
        'Contact Support';

      support.href =
        entry.category === 'challenge'

          ? CONFIG.support.prime

          : CONFIG.support.broker;

      support.target =
        '_blank';

      support.rel =
        'noopener noreferrer';

      actions.append(
        support
      );

      launch.textContent =
        'View My Prize';

    }

    /*
     * RESTORE EXISTING PARTICIPATION
     */

    function resume() {

      if (submitting) {
        return;
      }

      if (
        entry.stage === 'submitted'
      ) {

        finalScreen();

      } else if (
        entry.stage === 'challenge'
      ) {

        secondWheel();

      } else {

        pending(
          'Your prize is saved. Complete registration to claim it.',
          true
        );

      }

    }

    /*
     * START EXPERIENCE
     */

    function start() {

      if (
        spinning ||
        submitting
      ) {
        return;
      }

      entry =
        readEntry() || entry;

      if (entry) {

        restoreForm();

        open();

        resume();

        return;

      }

      first.value =
        first.value.trim();

      last.value =
        last.value.trim();

      email.value =
        email.value.trim();

      if (!form.reportValidity()) {
        return;
      }

      inlineStatus.textContent =
        '';

      open();

      firstWheel();

    }

    /*
     * EVENT LISTENERS
     */

    launch.addEventListener(
      'click',
      start
    );

    reopen.addEventListener(
      'click',
      start
    );

    /*
     * Intercept unsolicited submissions.
     *
     * The authorized native submission
     * is still handled by Webflow.
     */

    form.addEventListener(

      'submit',

      event => {

        if (allowNativeSubmit) {
          return;
        }

        event.preventDefault();

        event.stopImmediatePropagation();

        start();

      },

      true

    );

    /*
     * ENTER KEY SUPPORT
     */

    form.addEventListener(

      'keydown',

      event => {

        if (

          event.key === 'Enter' &&

          event.target.matches(
            'input:not([type="submit"])'
          )

        ) {

          event.preventDefault();

          start();

        }

      }

    );

    /*
     * RESTORE SAVED PRIZE
     */

    if (entry) {

      restoreForm();

      launch.textContent =
        'View My Prize';

      inlineStatus.textContent =
        'Your existing prize is saved in this browser.';

    }

  }

  /*
   * INITIALIZE AFTER DOM IS READY
   */

  if (
    document.readyState === 'loading'
  ) {

    document.addEventListener(
      'DOMContentLoaded',
      init,
      { once: true }
    );

  } else {

    init();

  }

})();
