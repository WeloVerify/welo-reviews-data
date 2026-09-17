(function () {
  'use strict';

  const CONFIG = {
    storageKey: 'bw-fight-night-2026-v2',

    spinDuration: 5600,

    logo:
      'https://cdn.prod.website-files.com/67176a06e72aae95337ce8a0/67176a06e72aae95337ce8e2_footer-logo.webp',

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

    challengePrices: {
      '5000': 59,
      '10000': 99,
      '25000': 199,
      '50000': 299,
      '100000': 549
    },

    support: {
      broker:
        'https://www.bullwaves.com/contact-us',

      prime:
        'https://www.prime.bullwaves.com/contact-us'
    }
  };

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

  const PRIZES = {
    ticket: {
      name: '1 VIP Ticket',
      lines: ['1 VIP', 'TICKET'],
      value: '$1,100',
      detail:
        'Experience A1 Combat live in Dubai.'
    },

    bonus: {
      name: '$800 Trading Bonus',
      lines: ['$800', 'BONUS'],
      value: '$800',
      detail:
        'Tradable Bullwaves account credit, not cash.'
    },

    challenge: {
      name: 'Bullwaves Prime Challenge',
      lines: ['PRIME', 'CHALLENGE'],
      value: 'UP TO $550',
      detail:
        'A challenge account of up to $100,000.'
    }
  };

  const money = value =>
    '$' + Number(value).toLocaleString('en-US');

  function random() {
    if (
      !window.crypto ||
      !crypto.getRandomValues
    ) {
      throw new Error(
        'Secure randomness is unavailable.'
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
        Number.isFinite(weight) &&
        weight > 0
    );

    if (!pool.length) {
      throw new Error(
        'No winning probabilities are configured.'
      );
    }

    let point =
      random() *
      pool.reduce(
        (sum, [, weight]) =>
          sum + weight,
        0
      );

    for (
      const [key, weight]
      of pool
    ) {
      point -= weight;

      if (point < 0) {
        return key;
      }
    }

    return pool[
      pool.length - 1
    ][0];
  }

  function makeID() {
    const hex = Array.from(
      crypto.getRandomValues(
        new Uint8Array(8)
      ),

      byte =>
        byte
          .toString(16)
          .padStart(2, '0')
    )
      .join('')
      .toUpperCase();

    return (
      'BW26-' +
      hex.slice(0, 8) +
      '-' +
      hex.slice(8)
    );
  }

  function validEntry(entry) {
    return (
      entry &&

      entry.version === 2 &&

      /^BW26-[0-9A-F]{8}-[0-9A-F]{8}$/
        .test(entry.id) &&

      CONFIG.categoryWeights[
        entry.type
      ] &&

      CONFIG.categoryWeights[
        entry.type
      ][entry.category] > 0 &&

      (
        entry.category !==
          'challenge' ||

        CONFIG.challengeWeights[
          entry.type
        ][entry.challenge] > 0
      ) &&

      [
        'challenge',
        'ready',
        'sending',
        'submitted'
      ].includes(entry.stage) &&

      [
        'first',
        'last',
        'email',
        'date'
      ].every(
        key =>
          typeof entry[key] ===
          'string'
      )
    );
  }

  function readEntry() {
    let local;
    let cookie;

    try {
      local = JSON.parse(
        localStorage.getItem(
          CONFIG.storageKey
        )
      );
    } catch (_) {}

    try {
      const part =
        document.cookie
          .split('; ')
          .find(
            value =>
              value.startsWith(
                CONFIG.storageKey +
                '='
              )
          );

      if (part) {
        cookie = JSON.parse(
          decodeURIComponent(
            part.slice(
              CONFIG.storageKey
                .length + 1
            )
          )
        );
      }
    } catch (_) {}

    return [
      local,
      cookie
    ]
      .filter(validEntry)
      .sort(
        (a, b) =>
          (b.updated || 0) -
          (a.updated || 0)
      )[0] || null;
  }

  function saveEntry(entry) {
    entry.updated =
      Date.now();

    const json =
      JSON.stringify(entry);

    let saved = false;

    try {
      localStorage.setItem(
        CONFIG.storageKey,
        json
      );

      saved =
        localStorage.getItem(
          CONFIG.storageKey
        ) === json;

    } catch (_) {}

    try {
      const encoded =
        encodeURIComponent(json);

      document.cookie =
        CONFIG.storageKey +
        '=' +
        encoded +
        '; Max-Age=31536000; Path=/; SameSite=Lax' +
        (
          location.protocol ===
          'https:'
            ? '; Secure'
            : ''
        );

      saved =
        saved ||
        document.cookie
          .split('; ')
          .includes(
            CONFIG.storageKey +
            '=' +
            encoded
          );

    } catch (_) {}

    return saved;
  }

  function addStyles() {
    if (
      document.getElementById(
        'bwf-wheel-styles'
      )
    ) {
      return;
    }

    const style =
      document.createElement(
        'style'
      );

    style.id =
      'bwf-wheel-styles';

    style.textContent = `

      .bwf-dialog,
      .bwf-dialog * {
        box-sizing: border-box;
      }

      .bwf-dialog {
        position: fixed;
        inset: 0;

        width:
          min(
            790px,
            calc(100vw - 24px)
          );

        height:
          min(
            94dvh,
            900px
          );

        max-height: 94dvh;
        max-width: none;

        margin: auto;
        padding: 0;

        overflow: hidden;

        border:
          1px solid #2d3f69;

        border-radius: 24px;

        background: #090e1b;
        color: #fff;

        font-family:
          Inter,
          Arial,
          sans-serif;

        box-shadow:
          0 28px 110px #000d;
      }

      .bwf-dialog:not([open]) {
        display: none;
      }

      .bwf-dialog[open] {
        display: flex;
        flex-direction: column;
      }

      .bwf-dialog::backdrop {
        background: #000d;

        backdrop-filter:
          blur(10px);

        -webkit-backdrop-filter:
          blur(10px);
      }

      .bwf-scroll {
        flex: 1 1 auto;
        min-height: 0;

        overflow-y: auto;
        overflow-x: hidden;

        overscroll-behavior:
          contain;

        -webkit-overflow-scrolling:
          touch;

        scrollbar-width:
          thin;

        scrollbar-color:
          #4762a7 #0b1021;

        background:
          radial-gradient(
            ellipse at top,
            #1b326580,
            transparent 62%
          );
      }

      .bwf-inner {
        width: 100%;

        padding:
          38px 34px 24px;

        text-align: center;
      }

      .bwf-close {
        position: absolute;

        z-index: 25;

        top: 13px;
        right: 13px;

        display: grid;
        place-items: center;

        width: 38px;
        height: 38px;

        padding: 0;

        border:
          1px solid #ffffff35;

        border-radius: 50%;

        background: #1a2130;
        color: #fff;

        font:
          28px/1
          Inter,
          Arial,
          sans-serif;

        cursor: pointer;
      }

      .bwf-close:disabled {
        opacity: .35;

        cursor: wait;
      }

      .bwf-kicker {
        color: #a9beff;

        font-size: 11px;
        font-weight: 800;

        letter-spacing: .22em;
      }

      .bwf-heading {
        max-width: 670px;

        margin:
          15px auto 10px;

        font-size:
          clamp(
            32px,
            5.4vw,
            51px
          );

        line-height: 1.08;

        letter-spacing:
          -.055em;

        font-weight: 800;

        overflow-wrap:
          anywhere;
      }

      .bwf-intro {
        max-width: 540px;

        margin:
          0 auto 21px;

        color: #bac5da;

        font-size: 13px;
        line-height: 1.6;
      }

      /* PRIZE CARDS */

      .bwf-cards {
        display: grid;

        grid-template-columns:
          repeat(
            3,
            minmax(0,1fr)
          );

        gap: 10px;

        margin:
          16px 0 24px;
      }

      .bwf-cards.five {
        grid-template-columns:
          repeat(
            5,
            minmax(0,1fr)
          );
      }

      .bwf-card {
        min-width: 0;
        min-height: 122px;

        display: flex;

        flex-direction:
          column;

        align-items:
          center;

        justify-content:
          center;

        padding:
          14px 9px;

        border:
          1px solid
          #688bff59;

        border-radius: 16px;

        background:
          linear-gradient(
            155deg,
            #1d305d,
            #111a2d 77%
          );

        box-shadow:
          inset
          0 1px
          #ffffff13;
      }

      .bwf-card-title {
        color: #f4f7ff;

        font-size:
          clamp(
            11px,
            1.6vw,
            13px
          );

        font-weight: 700;

        line-height: 1.3;
      }

      .bwf-card-value {
        margin:
          8px 0 5px;

        color: #fff;

        font-size:
          clamp(
            21px,
            3.1vw,
            29px
          );

        line-height: 1;

        font-weight: 800;

        letter-spacing:
          -.055em;

        text-shadow:
          0 0 22px
          #4074ff7c;
      }

      .bwf-card-caption {
        color: #afbfdf;

        font-size: 10px;

        line-height: 1.45;
      }

      .bwf-cards.five
      .bwf-card {
        min-height: 104px;

        padding:
          12px 5px;
      }

      .bwf-cards.five
      .bwf-card-value {
        font-size:
          clamp(
            16px,
            2.3vw,
            23px
          );
      }

      /*
       * WHEEL
       *
       * The stage and canvas are
       * explicitly forced to 1:1.
       *
       * This prevents the oval
       * effect on mobile browsers.
       */

      .bwf-stage {
        position: relative;

        display: grid;
        place-items: center;

        width:
          min(
            420px,
            calc(100% - 8px)
          );

        max-width: 420px;

        height: auto !important;

        aspect-ratio:
          1 / 1 !important;

        flex:
          0 0 auto;

        margin:
          0 auto 14px;

        padding: 8px;

        overflow: visible;

        border:
          1px solid
          #7e9fff85;

        border-radius:
          50%;

        background:
          radial-gradient(
            circle,
            #142b66,
            #070f25 73%,
            #3765f8
          );

        box-shadow:
          0 0 0 5px
          #ffffff08,
          0 0 60px
          #164dff50;

        scroll-margin:
          18px;

        contain:
          layout paint;
      }

      .bwf-disc {
        position: relative;

        z-index: 1;

        display: block;

        width: 100% !important;

        max-width: 100% !important;

        height: auto !important;

        aspect-ratio:
          1 / 1 !important;

        object-fit: contain;

        border-radius:
          50%;

        will-change:
          transform;

        transform-origin:
          50% 50%;
      }

      /*
       * POINTER
       */

      .bwf-pointer {
        position: absolute;

        z-index: 7;

        top: -11px;
        left: 50%;

        transform:
          translateX(-50%);

        width: 0;
        height: 0;

        border-left:
          16px solid transparent;

        border-right:
          16px solid transparent;

        border-top:
          31px solid #fff;

        filter:
          drop-shadow(
            0 2px 5px #000
          );

        pointer-events: none;
      }

      /*
       * CENTER LOGO
       */

      .bwf-center-logo {
        position: absolute;

        z-index: 6;

        top: 50%;
        left: 50%;

        transform:
          translate(
            -50%,
            -50%
          );

        display: flex;

        align-items:
          center;

        justify-content:
          center;

        width:
          clamp(
            76px,
            26%,
            112px
          );

        aspect-ratio:
          1 / 1;

        padding:
          clamp(
            14px,
            4%,
            22px
          );

        border:
          1px solid
          rgba(
            171,
            193,
            255,
            .72
          );

        border-radius: 50%;

        background:
          radial-gradient(
            circle at
            50% 35%,
            #121d39,
            #070d1d 72%
          );

        box-shadow:
          0 8px 30px
          rgba(
            0,
            0,
            0,
            .45
          ),
          0 0 25px
          rgba(
            47,
            94,
            255,
            .22
          );

        pointer-events: none;
      }

      .bwf-center-logo img {
        display: block;

        width: 100%;
        max-width: 100%;

        height: auto;

        object-fit: contain;
      }

      .bwf-wheel-note,
      .bwf-footnote {
        color: #99a8c7;

        font-size: 11px;

        line-height: 1.5;
      }

      .bwf-wheel-note {
        margin:
          0 0 12px;
      }

      .bwf-footnote {
        margin:
          18px 0 2px;
      }

      /*
       * FIXED ACTION AREA
       */

      .bwf-dock {
        position: relative;

        z-index: 22;

        flex: 0 0 auto;

        padding:
          13px 24px
          max(
            13px,
            env(
              safe-area-inset-bottom
            )
          );

        background:
          linear-gradient(
            180deg,
            #111c35,
            #0a1122
          );

        border-top:
          1px solid
          #8eaaff32;

        box-shadow:
          0 -18px 32px
          #070b187d;
      }

      .bwf-actions {
        display: flex;

        align-items: center;
        justify-content: center;

        gap: 10px;

        flex-wrap: wrap;
      }

      .bwf-button {
        display:
          inline-flex;

        align-items:
          center;

        justify-content:
          center;

        min-height: 51px;

        padding:
          13px 28px;

        border:
          1px solid
          #416cff;

        border-radius: 100px;

        background: #0036ff;

        color: #fff;

        font:
          700 14px/1.3
          Inter,
          Arial,
          sans-serif;

        text-align: center;
        text-decoration: none;

        cursor: pointer;

        box-shadow:
          0 6px 24px
          #0036ff55;

        transition:
          background .2s,
          transform .2s;
      }

      .bwf-button:hover {
        background:
          #2558ff;

        transform:
          translateY(-1px);
      }

      .bwf-button:disabled {
        opacity: .55;

        cursor: wait;

        transform: none;
      }

      .bwf-button.secondary {
        background:
          #ffffff10;

        border-color:
          #ffffff37;

        box-shadow: none;
      }

      .bwf-button.secondary:hover {
        background:
          #ffffff1d;
      }

      .bwf-status {
        min-height: 0;

        margin:
          8px 0 0;

        color: #b7c9ff;

        font-size: 11px;

        line-height: 1.45;

        text-align: center;
      }

      /*
       * WIN SCREEN
       */

      .bwf-win {
        margin:
          22px 0;

        padding:
          25px 16px;

        border:
          1px solid
          #7197ff81;

        border-radius: 18px;

        background:
          radial-gradient(
            circle at top,
            #1b4ca552,
            #0e192b 78%
          );
      }

      .bwf-win-kicker {
        color: #a8bfff;

        font-size: 10px;

        font-weight: 800;

        letter-spacing: .14em;
      }

      .bwf-win-title {
        margin:
          10px 0;

        font-size:
          clamp(
            27px,
            5vw,
            41px
          );

        line-height: 1.08;

        letter-spacing:
          -.04em;

        font-weight: 800;

        overflow-wrap:
          anywhere;
      }

      .bwf-win-value {
        color: #c1d0ff;

        font-size: 24px;

        font-weight: 800;
      }

      .bwf-win-detail,
      .bwf-help {
        color: #b0bdd5;

        font-size: 12px;

        line-height: 1.6;
      }

      .bwf-id {
        padding: 12px;

        border:
          1px dashed
          #6c89cc;

        border-radius: 10px;

        background:
          #0e1a33;

        color: #e3edff;

        font-size: 13px;

        font-weight: 700;

        overflow-wrap:
          anywhere;

        user-select: all;
      }

      .bwf-message {
        display: block;

        width: 100%;

        min-height: 125px;

        margin:
          14px 0;

        resize: vertical;

        padding: 12px;

        border:
          1px solid
          #ffffff35;

        border-radius: 12px;

        background:
          #0c1629;

        color: #e3ebff;

        font:
          12px/1.5
          Inter,
          Arial,
          sans-serif;
      }

      /*
       * CONFETTI
       */

      .bwf-confetti {
        position: absolute;

        inset: 0;

        z-index: 23;

        width: 100%;

        height: 100%;

        pointer-events: none;
      }

      .bwf-inline {
        color: #a9b9da;

        font:
          12px/1.5
          Inter,
          Arial,
          sans-serif;
      }

      /*
       * TABLET
       */

      @media
      (max-width: 767px) {

        .bwf-inner {
          padding:
            36px 19px 18px;
        }

        .bwf-cards.five {
          grid-template-columns:
            repeat(
              3,
              minmax(0,1fr)
            );
        }

        .bwf-stage {
          width:
            min(
              350px,
              calc(100% - 8px)
            );

          max-width: 350px;

          height: auto !important;

          aspect-ratio:
            1 / 1 !important;
        }

      }

      /*
       * MOBILE
       */

      @media
      (max-width: 580px) {

        .bwf-dialog {
          width:
            calc(100vw - 12px);

          height:
            calc(100dvh - 18px);

          max-height:
            calc(100dvh - 18px);

          border-radius: 18px;
        }

        .bwf-inner {
          padding:
            34px 13px 17px;
        }

        .bwf-close {
          top: 9px;
          right: 9px;

          width: 33px;
          height: 33px;

          font-size: 24px;
        }

        .bwf-kicker {
          padding:
            0 28px;

          font-size: 9px;

          letter-spacing:
            .15em;
        }

        .bwf-heading {
          margin:
            12px 0 8px;

          font-size:
            clamp(
              27px,
              7.4vw,
              38px
            );
        }

        .bwf-intro {
          margin-bottom:
            14px;

          font-size: 12px;
        }

        /*
         * PRIZE CARDS
         */

        .bwf-cards {
          grid-template-columns:
            1fr;

          gap: 7px;

          margin:
            12px 0 18px;
        }

        .bwf-cards:not(.five)
        .bwf-card {
          display: grid;

          grid-template-columns:
            minmax(0,1fr)
            auto;

          align-items:
            center;

          column-gap: 10px;

          min-height: 62px;

          padding:
            10px 12px;

          text-align: left;
        }

        .bwf-cards:not(.five)
        .bwf-card-title {
          font-size: 12px;
        }

        .bwf-cards:not(.five)
        .bwf-card-value {
          margin: 0;

          font-size: 25px;

          text-align: right;
        }

        .bwf-cards:not(.five)
        .bwf-card-caption {
          grid-column:
            1 / -1;

          margin-top: 3px;

          font-size: 10px;
        }

        .bwf-cards.five {
          grid-template-columns:
            repeat(
              2,
              minmax(0,1fr)
            );
        }

        .bwf-cards.five
        .bwf-card {
          min-height: 75px;

          padding:
            9px 7px;
        }

        .bwf-cards.five
        .bwf-card:last-child {
          grid-column:
            1 / -1;
        }

        .bwf-cards.five
        .bwf-card-value {
          margin:
            6px 0 3px;

          font-size: 21px;
        }

        /*
         * PERFECTLY ROUND
         * MOBILE WHEEL
         */

        .bwf-stage {
          width:
            min(
              292px,
              calc(100vw - 58px)
            ) !important;

          max-width:
            calc(100vw - 58px)
            !important;

          height: auto !important;

          aspect-ratio:
            1 / 1 !important;

          padding: 6px;

          border-radius:
            50% !important;
        }

        .bwf-disc {
          display: block;

          width:
            100% !important;

          max-width:
            100% !important;

          height:
            auto !important;

          aspect-ratio:
            1 / 1 !important;

          border-radius:
            50% !important;
        }

        .bwf-center-logo {
          width:
            clamp(
              70px,
              26%,
              82px
            );

          padding:
            15px;
        }

        .bwf-pointer {
          top: -8px;

          border-left-width:
            13px;

          border-right-width:
            13px;

          border-top-width:
            25px;
        }

        /*
         * MOBILE DOCK
         */

        .bwf-dock {
          padding:
            10px 12px
            max(
              11px,
              env(
                safe-area-inset-bottom
              )
            );
        }

        .bwf-actions {
          flex-direction:
            column;

          gap: 8px;
        }

        .bwf-button {
          width: 100%;

          min-height: 48px;
        }

        .bwf-win-title {
          font-size: 29px;
        }

      }

      /*
       * SMALL PHONES
       */

      @media
      (max-width: 370px) {

        .bwf-stage {
          width:
            min(
              250px,
              calc(100vw - 54px)
            ) !important;

          max-width:
            calc(100vw - 54px)
            !important;

          height:
            auto !important;

          aspect-ratio:
            1 / 1 !important;
        }

        .bwf-disc {
          width:
            100% !important;

          height:
            auto !important;

          aspect-ratio:
            1 / 1 !important;
        }

        .bwf-center-logo {
          width: 66px;

          padding: 13px;
        }

        .bwf-card-value {
          font-size:
            22px !important;
        }

        .bwf-heading {
          font-size: 27px;
        }

      }

      @media
      (prefers-reduced-motion:
      reduce) {

        .bwf-button {
          transition: none;
        }

      }

    `;

    document.head.append(style);
  }

  function init() {
    const section =
      document.getElementById(
        'bw-dubai-section'
      );

    if (
      !section ||
      section.dataset.bwfReady
    ) {
      return;
    }

    const form =
      section.closest('form');

    const block =
      section.closest('.w-form');

    const first =
      section.querySelector(
        '#bw-first-name'
      );

    const last =
      section.querySelector(
        '#bw-last-name'
      );

    const email =
      section.querySelector(
        '#bw-email'
      );

    const nativeSubmit =
      section.querySelector(
        '[type="submit"]'
      );

    const success =
      block &&
      block.querySelector(
        '.w-form-done'
      );

    const failure =
      block &&
      block.querySelector(
        '.w-form-fail'
      );

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
        'Bullwaves: keep the original embed inside a native Webflow Form Block.'
      );

      return;
    }

    if (
      form.getAttribute(
        'action'
      ) ||

      form.getAttribute(
        'data-redirect'
      )
    ) {
      console.error(
        'Bullwaves: remove the custom form action and redirect.'
      );

      return;
    }

    section.dataset.bwfReady =
      'true';

    addStyles();

    /*
     * PROFILE FIELD
     */

    let profile =
      section.querySelector(
        '#bw-participant-type'
      );

    if (!profile) {
      const field =
        document.createElement(
          'div'
        );

      field.className =
        'bw-field';

      field.innerHTML = `
        <label
          class="bw-label"
          for="bw-participant-type"
        >
          Which best describes you?
        </label>

        <select
          id="bw-participant-type"
          name="Participant Type"
          data-name="Participant Type"
          class="bw-input w-select"
          required
        >
          <option value="">
            Select your profile
          </option>
        </select>
      `;

      nativeSubmit.before(
        field
      );

      profile =
        field.querySelector(
          'select'
        );

      Object.keys(
        CONFIG.categoryWeights
      ).forEach(type => {
        profile.add(
          new Option(
            type,
            type
          )
        );
      });
    }

    /*
     * NATIVE SUBMIT
     */

    nativeSubmit.hidden = true;

    nativeSubmit.style.display =
      'none';

    nativeSubmit.tabIndex = -1;

    /*
     * LAUNCH BUTTON
     */

    const launch =
      document.createElement(
        'button'
      );

    launch.type = 'button';

    launch.className =
      'bw-submit';

    launch.textContent =
      'Spin to Win';

    nativeSubmit.before(
      launch
    );

    const inline =
      document.createElement(
        'p'
      );

    inline.className =
      'bwf-inline';

    inline.setAttribute(
      'role',
      'status'
    );

    launch.after(inline);

    /*
     * SUCCESS REOPEN BUTTON
     */

    const reopen =
      document.createElement(
        'button'
      );

    reopen.type = 'button';

    reopen.className =
      'bw-submit';

    reopen.textContent =
      'View My Prize';

    success.append(reopen);

    /*
     * DIALOG
     */

    const dialog =
      document.createElement(
        'dialog'
      );

    dialog.className =
      'bwf-dialog';

    dialog.setAttribute(
      'aria-labelledby',
      'bwf-heading'
    );

    dialog.innerHTML = `

      <button
        class="bwf-close"
        type="button"
        aria-label="Close prize window"
      >
        ×
      </button>

      <div class="bwf-scroll">

        <div class="bwf-inner">

          <div class="bwf-kicker">
            A1 COMBAT × BULLWAVES
          </div>

          <h2
            class="bwf-heading"
            id="bwf-heading"
          ></h2>

          <p
            class="bwf-intro"
          ></p>

          <div
            class="bwf-content"
          ></div>

          <p
            class="bwf-footnote"
          >
            DUBAI · 28 NOVEMBER 2026
          </p>

        </div>

      </div>

      <div class="bwf-dock">

        <div
          class="bwf-actions"
        ></div>

        <p
          class="bwf-status"
          role="status"
          aria-live="polite"
        ></p>

      </div>

      <canvas
        class="bwf-confetti"
        aria-hidden="true"
      ></canvas>

    `;

    document.body.append(
      dialog
    );

    const scroll =
      dialog.querySelector(
        '.bwf-scroll'
      );

    const heading =
      dialog.querySelector(
        '.bwf-heading'
      );

    const intro =
      dialog.querySelector(
        '.bwf-intro'
      );

    const content =
      dialog.querySelector(
        '.bwf-content'
      );

    const actions =
      dialog.querySelector(
        '.bwf-actions'
      );

    const status =
      dialog.querySelector(
        '.bwf-status'
      );

    const close =
      dialog.querySelector(
        '.bwf-close'
      );

    const confettiCanvas =
      dialog.querySelector(
        '.bwf-confetti'
      );

    let entry =
      readEntry();

    let busy = false;

    let submitting = false;

    let nativeAllowed = false;

    let timeoutID = null;

    let previousOverflow = '';

    let previousFocus = null;

    let confettiFrame = 0;

    /*
     * CONFETTI RESET
     */

    function clearConfetti() {
      if (confettiFrame) {
        cancelAnimationFrame(
          confettiFrame
        );
      }

      confettiFrame = 0;

      const ctx =
        confettiCanvas
          .getContext('2d');

      if (ctx) {
        ctx.clearRect(
          0,
          0,
          confettiCanvas.width,
          confettiCanvas.height
        );
      }
    }

    /*
     * UI RESET
     */

    function reset(
      title,
      description
    ) {
      clearConfetti();

      heading.textContent =
        title;

      intro.textContent =
        description;

      content.replaceChildren();

      actions.replaceChildren();

      status.textContent = '';

      scroll.scrollTop = 0;
    }

    function button(
      label,
      callback,
      secondary
    ) {
      const element =
        document.createElement(
          'button'
        );

      element.type =
        'button';

      element.className =
        'bwf-button' +
        (
          secondary
            ? ' secondary'
            : ''
        );

      element.textContent =
        label;

      element.addEventListener(
        'click',
        callback
      );

      actions.append(
        element
      );

      return element;
    }

    function setBusy(value) {
      busy = value;

      close.disabled =
        value;

      actions
        .querySelectorAll(
          'button'
        )
        .forEach(element => {
          element.disabled =
            value;
        });
    }

    /*
     * OPEN
     */

    function open() {
      if (dialog.open) {
        return;
      }

      previousFocus =
        document.activeElement;

      previousOverflow =
        document.body.style
          .overflow;

      document.body.style
        .overflow =
        'hidden';

      dialog.showModal();

      close.focus();
    }

    /*
     * CLOSE
     */

    close.addEventListener(
      'click',
      () => {
        if (!busy) {
          dialog.close();
        }
      }
    );

    dialog.addEventListener(
      'cancel',
      event => {
        if (busy) {
          event.preventDefault();
        }
      }
    );

    dialog.addEventListener(
      'close',
      () => {
        clearConfetti();

        document.body.style
          .overflow =
          previousOverflow;

        if (
          previousFocus &&
          previousFocus.isConnected
        ) {
          previousFocus.focus();
        }
      }
    );

    /*
     * PRIZE DATA
     */

    function prizeName() {
      return (
        entry.category ===
        'challenge'
      )
        ? (
            money(
              entry.challenge
            ) +
            ' Bullwaves Prime Challenge'
          )
        : PRIZES[
            entry.category
          ].name;
    }

    function prizeValue() {
      if (
        entry.category ===
        'challenge'
      ) {
        return (
          money(
            CONFIG
              .challengePrices[
                entry.challenge
              ]
          ) +
          ' retail value, not cash'
        );
      }

      if (
        entry.category ===
        'bonus'
      ) {
        return (
          '$800 tradable account bonus, not cash'
        );
      }

      return (
        'One VIP Ticket, stated value $1,100'
      );
    }

    /*
     * FORM RESTORE
     */

    function restoreForm() {
      first.value =
        entry.first;

      last.value =
        entry.last;

      email.value =
        entry.email;

      profile.value =
        entry.type;
    }

    /*
     * HIDDEN FIELD
     */

    function hidden(
      name,
      value
    ) {
      let element =
        Array.from(
          form.elements
        ).find(
          item =>
            item.name ===
            name
        );

      if (!element) {
        element =
          document.createElement(
            'input'
          );

        element.type =
          'hidden';

        element.name =
          name;

        element.dataset.name =
          name;

        form.append(element);
      }

      element.value =
        value;
    }

    function prepareSubmission() {
      restoreForm();

      hidden(
        'Prize Category',

        entry.category ===
        'challenge'
          ? 'Bullwaves Prime Challenge'
          : PRIZES[
              entry.category
            ].name
      );

      hidden(
        'Prize Details',
        prizeName()
      );

      hidden(
        'Prize Value',
        prizeValue()
      );

      hidden(
        'Claim ID',
        entry.id
      );

      hidden(
        'Participation Date',
        entry.date
      );
    }

    function text(
      className,
      value
    ) {
      const element =
        document.createElement(
          'p'
        );

      element.className =
        className;

      element.textContent =
        value;

      content.append(
        element
      );

      return element;
    }

    /*
     * CARDS
     */

    function showCards(
      keys,
      challenge
    ) {
      const grid =
        document.createElement(
          'div'
        );

      grid.className =
        'bwf-cards' +
        (
          challenge
            ? ' five'
            : ''
        );

      keys.forEach(key => {
        const card =
          document.createElement(
            'div'
          );

        card.className =
          'bwf-card';

        const title =
          document.createElement(
            'div'
          );

        title.className =
          'bwf-card-title';

        title.textContent =
          challenge
            ? (
                money(key) +
                ' Challenge'
              )
            : PRIZES[
                key
              ].name;

        const value =
          document.createElement(
            'div'
          );

        value.className =
          'bwf-card-value';

        value.textContent =
          challenge
            ? money(
                CONFIG
                  .challengePrices[
                    key
                  ]
              )
            : PRIZES[
                key
              ].value;

        const caption =
          document.createElement(
            'div'
          );

        caption.className =
          'bwf-card-caption';

        caption.textContent =
          challenge
            ? (
                'Retail value, not cash'
              )
            : PRIZES[
                key
              ].detail;

        card.append(
          title,
          value,
          caption
        );

        grid.append(card);
      });

      content.append(grid);
    }

    /*
     * WHEEL
     */

    function wheel(
      keys,
      challenge
    ) {
      const stage =
        document.createElement(
          'div'
        );

      stage.className =
        'bwf-stage';

      const pointer =
        document.createElement(
          'div'
        );

      pointer.className =
        'bwf-pointer';

      pointer.setAttribute(
        'aria-hidden',
        'true'
      );

      const canvas =
        document.createElement(
          'canvas'
        );

      canvas.className =
        'bwf-disc';

      canvas.width = 960;

      canvas.height = 960;

      canvas.setAttribute(
        'role',
        'img'
      );

      canvas.setAttribute(
        'aria-label',

        'Prize wheel: ' +

        keys.map(key =>
          challenge
            ? (
                money(key) +
                ' Challenge'
              )
            : PRIZES[
                key
              ].name
        ).join(', ')
      );

      const ctx =
        canvas.getContext(
          '2d'
        );

      if (!ctx) {
        throw new Error(
          'Canvas is unavailable.'
        );
      }

      const step =
        Math.PI *
        2 /
        keys.length;

      const colors = [
        '#1453ff',
        '#203677',
        '#1740bd',
        '#112759',
        '#2454c9'
      ];

      keys.forEach(
        (key, index) => {
          const start =
            -Math.PI / 2 +
            index * step;

          /*
           * SEGMENT
           */

          ctx.beginPath();

          ctx.moveTo(
            480,
            480
          );

          ctx.arc(
            480,
            480,
            451,
            start,
            start + step
          );

          ctx.closePath();

          ctx.fillStyle =
            colors[
              index %
              colors.length
            ];

          ctx.fill();

          ctx.strokeStyle =
            '#7295ff';

          ctx.lineWidth = 3;

          ctx.stroke();

          /*
           * LABEL
           */

          ctx.save();

          ctx.translate(
            480,
            480
          );

          ctx.rotate(
            start +
            step / 2
          );

          ctx.translate(
            300,
            0
          );

          ctx.rotate(
            Math.PI / 2
          );

          ctx.textAlign =
            'center';

          ctx.fillStyle =
            '#fff';

          const lines =
            challenge
              ? [
                  money(key),
                  'CHALLENGE'
                ]
              : PRIZES[
                  key
                ].lines;

          lines.forEach(
            (line, lineIndex) => {
              ctx.font =
                lineIndex === 0
                  ? (
                      '800 44px Inter, Arial, sans-serif'
                    )
                  : (
                      '700 37px Inter, Arial, sans-serif'
                    );

              ctx.fillText(
                line,
                0,
                (
                  lineIndex -
                  (
                    lines.length -
                    1
                  ) / 2
                ) * 53,
                260
              );
            }
          );

          ctx.restore();
        }
      );

      /*
       * CENTER BACKGROUND
       *
       * Logo itself is HTML so it
       * stays sharp and upright.
       */

      ctx.beginPath();

      ctx.arc(
        480,
        480,
        108,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        '#091126';

      ctx.fill();

      ctx.strokeStyle =
        '#abc1ff';

      ctx.lineWidth = 4;

      ctx.stroke();

      /*
       * LOGO OVERLAY
       */

      const logo =
        document.createElement(
          'div'
        );

      logo.className =
        'bwf-center-logo';

      const logoImage =
        document.createElement(
          'img'
        );

      logoImage.src =
        CONFIG.logo;

      logoImage.alt =
        'Bullwaves';

      logoImage.decoding =
        'async';

      logoImage.draggable =
        false;

      logo.append(
        logoImage
      );

      stage.append(
        pointer,
        canvas,
        logo
      );

      content.append(
        stage
      );

      text(
        'bwf-wheel-note',

        challenge
          ? (
              'Five challenge sizes, one winning account.'
            )
          : (
              'Prize availability and odds vary by participant type.'
            )
      );

      return {
        canvas,
        stage,
        challenge
      };
    }

    /*
     * CENTER WHEEL
     */

    async function centerWheel(
      stage
    ) {
      await new Promise(
        resolve =>
          requestAnimationFrame(
            () =>
              requestAnimationFrame(
                resolve
              )
          )
      );

      const rect =
        stage.getBoundingClientRect();

      const viewport =
        scroll.getBoundingClientRect();

      const offset =
        rect.top -
        viewport.top;

      const target =
        scroll.scrollTop +
        offset -
        (
          scroll.clientHeight -
          rect.height
        ) / 2;

      const reduced =
        window.matchMedia &&
        matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches;

      scroll.scrollTo({
        top:
          Math.max(
            0,
            target
          ),

        behavior:
          reduced
            ? 'auto'
            : 'smooth'
      });

      if (!reduced) {
        await new Promise(
          resolve =>
            setTimeout(
              resolve,
              480
            )
        );
      }
    }

    /*
     * CONFETTI
     */

    function confetti(
      stage
    ) {
      return new Promise(
        resolve => {
          const ctx =
            confettiCanvas
              .getContext(
                '2d'
              );

          if (!ctx) {
            resolve();

            return;
          }

          const dialogRect =
            dialog
              .getBoundingClientRect();

          const wheelRect =
            stage
              .getBoundingClientRect();

          const width =
            dialog.clientWidth;

          const height =
            dialog.clientHeight;

          const dpr =
            Math.min(
              window.devicePixelRatio ||
              1,
              2
            );

          confettiCanvas.width =
            Math.round(
              width * dpr
            );

          confettiCanvas.height =
            Math.round(
              height * dpr
            );

          ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
          );

          const x0 =
            wheelRect.left -
            dialogRect.left +
            wheelRect.width / 2;

          const y0 =
            wheelRect.top -
            dialogRect.top +
            wheelRect.height *
            .34;

          const palette = [
            '#ffffff',
            '#8eb1ff',
            '#386aff',
            '#c2d5ff',
            '#cbbdff'
          ];

          const pieces =
            Array.from(
              {
                length: 42
              },

              () => ({
                vx:
                  (
                    Math.random() -
                    .5
                  ) * 330,

                vy:
                  -60 -
                  Math.random() *
                  200,

                drift:
                  (
                    Math.random() -
                    .5
                  ) * 28,

                angle:
                  Math.random() *
                  Math.PI *
                  2,

                spin:
                  (
                    Math.random() -
                    .5
                  ) * 9,

                w:
                  3 +
                  Math.random() *
                  4,

                h:
                  5 +
                  Math.random() *
                  6,

                color:
                  palette[
                    Math.floor(
                      Math.random() *
                      palette.length
                    )
                  ]
              })
            );

          const start =
            performance.now();

          function frame(now) {
            const elapsed =
              now - start;

            const time =
              elapsed / 1000;

            ctx.clearRect(
              0,
              0,
              width,
              height
            );

            pieces.forEach(
              piece => {
                const x =
                  x0 +
                  piece.vx *
                  time +
                  Math.sin(
                    time * 3 +
                    piece.angle
                  ) *
                  piece.drift;

                const y =
                  y0 +
                  piece.vy *
                  time +
                  230 *
                  time *
                  time;

                if (
                  y >
                  height + 20
                ) {
                  return;
                }

                ctx.save();

                ctx.globalAlpha =
                  Math.max(
                    0,
                    Math.min(
                      1,
                      (
                        1750 -
                        elapsed
                      ) / 450
                    )
                  );

                ctx.translate(
                  x,
                  y
                );

                ctx.rotate(
                  piece.angle +
                  piece.spin *
                  time
                );

                ctx.fillStyle =
                  piece.color;

                ctx.fillRect(
                  -piece.w / 2,
                  -piece.h / 2,
                  piece.w,
                  piece.h
                );

                ctx.restore();
              }
            );

            if (
              elapsed < 1750 &&
              dialog.open
            ) {
              confettiFrame =
                requestAnimationFrame(
                  frame
                );

            } else {
              clearConfetti();

              resolve();
            }
          }

          confettiFrame =
            requestAnimationFrame(
              frame
            );
        }
      );
    }

    /*
     * SPIN
     */

    async function animate(
      selection,
      keys,
      winner
    ) {
      setBusy(true);

      status.textContent =
        'Your prize is being revealed…';

      await centerWheel(
        selection.stage
      );

      const rotation =
        360 * 7 -
        (
          keys.indexOf(
            winner
          ) +
          .5
        ) *
        (
          360 /
          keys.length
        );

      const reduced =
        window.matchMedia &&
        matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches;

      if (
        !reduced &&
        selection.canvas.animate
      ) {
        const animation =
          selection.canvas.animate(
            [
              {
                transform:
                  'rotate(0deg)'
              },

              {
                transform:
                  'rotate(' +
                  rotation +
                  'deg)'
              }
            ],

            {
              duration:
                CONFIG
                  .spinDuration,

              easing:
                'cubic-bezier(.16,.02,.10,1)',

              fill:
                'forwards'
            }
          );

        try {
          await animation.finished;
        } catch (_) {}

        selection.canvas
          .style.transform =
          'rotate(' +
          rotation +
          'deg)';

        animation.cancel();

      } else {
        selection.canvas
          .style.transform =
          'rotate(' +
          rotation +
          'deg)';
      }

      status.textContent =
        'You won ' +
        (
          selection.challenge
            ? (
                money(
                  winner
                ) +
                ' Challenge'
              )
            : PRIZES[
                winner
              ].name
        ) +
        '!';

      if (!reduced) {
        await confetti(
          selection.stage
        );
      }

      setBusy(false);
    }

    /*
     * FIRST WHEEL
     */

    function firstWheel() {
      reset(
        'Your next big win starts here.',

        'Three extraordinary prizes. One spin. Discover your reward.'
      );

      const type =
        profile.value;

      showCards(
        CATEGORY_ORDER,
        false
      );

      const selection =
        wheel(
          CATEGORY_ORDER,
          false
        );

      button(
        'Spin to Win',

        async () => {
          if (busy) {
            return;
          }

          const previous =
            readEntry();

          if (previous) {
            entry =
              previous;

            restoreForm();

            resume();

            return;
          }

          try {
            const category =
              choose(
                CONFIG
                  .categoryWeights[
                    type
                  ]
              );

            const challenge =
              category ===
              'challenge'
                ? choose(
                    CONFIG
                      .challengeWeights[
                        type
                      ]
                  )
                : null;

            entry = {
              version: 2,

              id:
                makeID(),

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
                category ===
                'challenge'
                  ? 'challenge'
                  : 'ready',

              date:
                new Date()
                  .toISOString()
            };

          } catch (_) {
            status.textContent =
              'The draw is temporarily unavailable. Please contact support.';

            return;
          }

          if (
            !saveEntry(entry)
          ) {
            entry = null;

            status.textContent =
              'Please enable browser storage so we can save your prize.';

            return;
          }

          launch.textContent =
            'View My Prize';

          await animate(
            selection,
            CATEGORY_ORDER,
            entry.category
          );

          if (
            entry.category ===
            'challenge'
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

        'Spin again to reveal your challenge account size.'
      );

      showCards(
        CHALLENGE_ORDER,
        true
      );

      const selection =
        wheel(
          CHALLENGE_ORDER,
          true
        );

      button(
        'Reveal My Challenge',

        async () => {
          if (busy) {
            return;
          }

          entry.stage =
            'ready';

          if (
            !saveEntry(entry)
          ) {
            entry.stage =
              'challenge';

            status.textContent =
              'Please enable storage and try again.';

            return;
          }

          await animate(
            selection,
            CHALLENGE_ORDER,
            entry.challenge
          );

          submitEntry();
        }
      );
    }

    /*
     * PRIZE PANEL
     */

    function prizePanel() {
      const panel =
        document.createElement(
          'div'
        );

      panel.className =
        'bwf-win';

      const kicker =
        document.createElement(
          'div'
        );

      kicker.className =
        'bwf-win-kicker';

      kicker.textContent =
        'YOUR WINNING PRIZE';

      const title =
        document.createElement(
          'div'
        );

      title.className =
        'bwf-win-title';

      title.textContent =
        prizeName();

      const value =
        document.createElement(
          'div'
        );

      value.className =
        'bwf-win-value';

      value.textContent =
        entry.category ===
        'challenge'
          ? (
              money(
                CONFIG
                  .challengePrices[
                    entry.challenge
                  ]
              ) +
              ' VALUE'
            )
          : (
              PRIZES[
                entry.category
              ].value +
              ' VALUE'
            );

      const detail =
        document.createElement(
          'p'
        );

      detail.className =
        'bwf-win-detail';

      detail.textContent =
        prizeValue();

      panel.append(
        kicker,
        title,
        value,
        detail
      );

      content.append(
        panel
      );
    }

    /*
     * PENDING
     */

    function pending(
      message,
      retry
    ) {
      reset(
        'Your prize is saved.',

        'Your reward and Claim ID will remain the same.'
      );

      prizePanel();

      text(
        'bwf-id',
        entry.id
      );

      status.textContent =
        message;

      if (retry) {
        button(
          'Retry Registration',
          submitEntry
        );

      } else {
        button(
          'Contact Support',

          () =>
            window.open(
              entry.category ===
              'challenge'
                ? CONFIG
                    .support
                    .prime
                : CONFIG
                    .support
                    .broker,

              '_blank',

              'noopener,noreferrer'
            ),

          true
        );
      }
    }

    function submissionFailed(
      message
    ) {
      clearTimeout(
        timeoutID
      );

      submitting = false;

      setBusy(false);

      entry.stage =
        'ready';

      saveEntry(entry);

      pending(
        message,
        true
      );
    }

    /*
     * WEBFLOW SUBMIT
     */

    function submitEntry() {
      if (
        submitting ||
        busy
      ) {
        return;
      }

      prepareSubmission();

      if (
        !form.checkValidity()
      ) {
        pending(
          'Please complete the required fields before retrying.',
          true
        );

        return;
      }

      if (
        !window.Webflow ||

        typeof
        window.Webflow.require !==
        'function' ||

        !window.Webflow
          .require('forms')
      ) {
        pending(
          'Registration is available on the published Webflow site. Your prize is saved.',
          true
        );

        return;
      }

      entry.stage =
        'sending';

      saveEntry(entry);

      pending(
        'Sending your registration to Webflow…',
        false
      );

      submitting = true;

      setBusy(true);

      success.style.display =
        'none';

      failure.style.display =
        'none';

      nativeAllowed = true;

      try {
        form.requestSubmit(
          nativeSubmit
        );

      } catch (_) {
        submissionFailed(
          'Your form could not be sent. Please try again.'
        );

      } finally {
        nativeAllowed =
          false;
      }

      if (submitting) {
        timeoutID =
          setTimeout(
            () => {
              setBusy(false);

              status.textContent =
                'Confirmation is taking longer than expected. Your prize is saved. Please contact support before trying again to avoid duplicate entries.';
            },

            45000
          );
      }
    }

    const visible =
      element =>
        element &&
        !element.hidden &&
        getComputedStyle(
          element
        ).display !==
          'none';

    new MutationObserver(
      () => {
        if (!submitting) {
          return;
        }

        if (
          visible(success)
        ) {
          clearTimeout(
            timeoutID
          );

          submitting = false;

          setBusy(false);

          entry.stage =
            'submitted';

          saveEntry(entry);

          finalScreen();

        } else if (
          visible(failure)
        ) {
          submissionFailed(
            'Webflow could not save your entry. Your prize and Claim ID are unchanged.'
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
     * FINAL SCREEN
     */

    function finalScreen() {
      reset(
        'Congratulations!',

        'Your registration has been received. Claim your prize with our team.'
      );

      prizePanel();

      text(
        'bwf-id',
        entry.id
      );

      text(
        'bwf-help',

        'Copy this message and paste it into our support chat. The team will verify your registration before awarding the prize.'
      );

      const message = [
        'Hello ' +
        (
          entry.category ===
          'challenge'
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
        document.createElement(
          'textarea'
        );

      textarea.className =
        'bwf-message';

      textarea.readOnly =
        true;

      textarea.setAttribute(
        'aria-label',
        'Your claim message'
      );

      textarea.value =
        message;

      content.append(
        textarea
      );

      button(
        'Copy Claim Message',

        async () => {
          try {
            await navigator
              .clipboard
              .writeText(
                message
              );

            status.textContent =
              'Message copied!';

          } catch (_) {
            textarea.focus();

            textarea.select();

            let copied =
              false;

            try {
              copied =
                document.execCommand(
                  'copy'
                );

            } catch (_) {}

            status.textContent =
              copied
                ? 'Message copied!'
                : 'Copy the message above and paste it into support chat.';
          }
        }
      );

      const support =
        document.createElement(
          'a'
        );

      support.className =
        'bwf-button secondary';

      support.textContent =
        'Contact Support';

      support.href =
        entry.category ===
        'challenge'
          ? CONFIG
              .support
              .prime
          : CONFIG
              .support
              .broker;

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
     * RESUME
     */

    function resume() {
      if (submitting) {
        return;
      }

      if (
        entry.stage ===
        'submitted'
      ) {
        finalScreen();

      } else if (
        entry.stage ===
        'challenge'
      ) {
        secondWheel();

      } else if (
        entry.stage ===
        'sending'
      ) {
        pending(
          'Your submission may still be processing. Contact support with your Claim ID before trying again.',
          false
        );

      } else {
        pending(
          'Your prize is saved. Complete registration to claim it.',
          true
        );
      }
    }

    /*
     * START
     */

    function start() {
      if (busy) {
        return;
      }

      if (submitting) {
        open();

        return;
      }

      entry =
        readEntry() ||
        entry;

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

      if (
        !form.reportValidity()
      ) {
        return;
      }

      inline.textContent =
        '';

      open();

      firstWheel();
    }

    launch.addEventListener(
      'click',
      start
    );

    reopen.addEventListener(
      'click',
      start
    );

    form.addEventListener(
      'submit',

      event => {
        if (nativeAllowed) {
          return;
        }

        event.preventDefault();

        event.stopImmediatePropagation();

        start();
      },

      true
    );

    form.addEventListener(
      'keydown',

      event => {
        if (
          event.key ===
          'Enter' &&

          event.target.matches(
            'input:not([type="submit"])'
          )
        ) {
          event.preventDefault();

          start();
        }
      }
    );

    if (entry) {
      restoreForm();

      launch.textContent =
        'View My Prize';

      inline.textContent =
        'Your existing prize is saved in this browser.';
    }
  }

  if (
    document.readyState ===
    'loading'
  ) {
    document.addEventListener(
      'DOMContentLoaded',
      init,
      {
        once: true
      }
    );

  } else {
    init();
  }

})();
