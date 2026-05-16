/*
 * Welo Review Popup Form SDK
 * ------------------------------------------------------------------
 * Uso:
 *   <script
 *     src="https://weloverify.github.io/welo-reviews-data/widget/welo-popup-form.js?v=5"
 *     data-company="Welo Badge"
 *     defer>
 *   </script>
 *
 * - Immagini: Supabase Storage (bucket `reviews-proof`)
 * - Video:    Mux Direct Upload via Edge Function `create-mux-upload`
 * - Submit:   Supabase Edge Function `submit-review-secure`
 * - Nessuna API key Mux esposta lato client.
 * ------------------------------------------------------------------
 */

(function () {
  "use strict";

  // ------------------------------------------------------------------
  // 0. Guard anti-doppio-caricamento
  // ------------------------------------------------------------------
  if (window.__WELO_REVIEW_POPUP_LOADED__) return;
  window.__WELO_REVIEW_POPUP_LOADED__ = true;

  // ------------------------------------------------------------------
  // 1. Leggi data-company dallo script tag
  // ------------------------------------------------------------------
  function findScriptEl() {
    if (document.currentScript) return document.currentScript;
    var scripts = document.querySelectorAll('script[src*="welo-popup-form"]');
    return scripts[scripts.length - 1] || null;
  }

  var SCRIPT_EL = findScriptEl();
  var DATA_COMPANY = SCRIPT_EL
    ? (SCRIPT_EL.getAttribute("data-company") || "").trim()
    : "";

  // ------------------------------------------------------------------
  // 2. Costanti
  // ------------------------------------------------------------------
  var SUPABASE_URL_POPUP = "https://ufqvcojyfsnscuddadnw.supabase.co";
  var SUPABASE_ANON_KEY_POPUP =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJIUzI1NiIsInJlZiI6InVmcXZjb2p5ZnNuc2N1ZGRhZG53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MTg2NjksImV4cCI6MjA2MzM5NDY2OX0.iYJVmg9PXxOu0R3z62iRzr4am0q8ZSc8THlB2rE2oQM";

  /*
   * IMPORTANTE:
   * Se copi questa key da un vecchio file e non funziona, usa la anon key corretta del progetto.
   * La URL della function è questa:
   * https://ufqvcojyfsnscuddadnw.supabase.co/functions/v1/submit-review-secure
   */

  var CREATE_MUX_UPLOAD_URL =
    SUPABASE_URL_POPUP + "/functions/v1/create-mux-upload";

  var SUBMIT_REVIEW_SECURE_URL =
    SUPABASE_URL_POPUP + "/functions/v1/submit-review-secure";

  var SUPABASE_LIB_URL =
    "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.48.0/dist/umd/supabase.js";

  var STYLE_EL_ID = "welo-popup-form-styles";
  var OVERLAY_EL_ID = "welo-review-overlay";

  // ------------------------------------------------------------------
  // 3. CSS
  // ------------------------------------------------------------------
  var CSS_CONTENT = `
  #welo-review-overlay,
  #welo-review-overlay * {
    box-sizing: border-box;
  }

  .welo-rv-overlay {
    position: fixed;
    inset: 0;
    background: rgba(10, 12, 16, 0.55);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 99999;
    padding: 20px;
  }

  .welo-rv-overlay.is-visible {
    display: flex;
  }

  .welo-rv-modal {
    width: 100%;
    max-width: 520px;
    background: #ffffff;
    border-radius: 28px;
    padding: 32px 28px 22px;
    box-shadow: 0 40px 80px rgba(10, 12, 16, 0.22);
    position: relative;
    font-family: Inter, sans-serif;
    animation: weloModalIn 0.22s ease-out;
    max-height: 90vh;
    overflow-y: auto;
  }

  @keyframes weloModalIn {
    from {
      opacity: 0;
      transform: translateY(8px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .welo-rv-close {
    position: absolute;
    top: 14px;
    right: 14px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    background: rgba(240, 240, 240, 0.85);
    backdrop-filter: blur(4px);
    color: #0a0a0a;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.18s ease;
  }

  .welo-rv-close:hover {
    background: #e5e5e5;
    transform: scale(1.07);
  }

  .welo-rv-title {
    font-size: 22px;
    font-weight: 600;
    color: #0a0a0a;
    margin-bottom: 4px;
  }

  .welo-rv-subtitle {
    font-size: 14px;
    color: #525252;
    margin-bottom: 20px;
  }

  .welo-rv-step {
    display: none;
  }

  .welo-rv-step.is-active {
    display: block;
  }

  .welo-rv-stars-picker {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    gap: 6px;
    margin: 12px 0 8px;
  }

  .welo-rv-stars-picker button {
    appearance: none;
    -webkit-appearance: none;
    border: none;
    background: transparent;
    padding: 2px;
    margin: 0;
    cursor: pointer;
    line-height: 0;
    border-radius: 8px;
    transition: transform 0.16s ease, opacity 0.16s ease;
  }

  .welo-rv-stars-picker button:hover {
    transform: scale(1.06);
  }

  .welo-rv-stars-picker button:focus-visible {
    outline: 2px solid #111;
    outline-offset: 4px;
  }

  .welo-rv-star-icon {
    width: 35px;
    height: 35px;
    display: block;
    flex-shrink: 0;
  }

  .welo-rv-star-bg {
    transition: stroke 0.16s ease, fill 0.16s ease;
  }

  .welo-rv-star-fill {
    opacity: 0;
    transition: opacity 0.16s ease;
  }

  .welo-rv-stars-picker button:hover .welo-rv-star-fill,
  .welo-rv-stars-picker button.is-active .welo-rv-star-fill {
    opacity: 1;
  }

  .welo-rv-stars-picker button:hover .welo-rv-star-bg,
  .welo-rv-stars-picker button.is-active .welo-rv-star-bg {
    stroke: #171717;
  }

  .welo-rv-hint {
    font-size: 13px;
    color: #3f3f46;
  }

  .welo-rv-group {
    margin-bottom: 16px;
  }

  .welo-rv-label {
    font-size: 13px;
    color: #4b5563;
    margin-bottom: 6px;
    display: block;
  }

  .welo-rv-input,
  .welo-rv-textarea {
    width: 100%;
    border-radius: 14px;
    border: 1px solid #e5e7eb;
    padding: 12px 14px;
    font-size: 16px;
    background: #fafafa;
    color: #0a0a0a;
    transition: all 0.16s ease;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-tap-highlight-color: transparent;
    font-size: 16px !important;
    line-height: 1.5;
    height: auto;
  }

  .welo-rv-input:focus,
  .welo-rv-textarea:focus {
    border-color: #0a0a0a;
    background: #ffffff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(10, 10, 10, 0.1);
  }

  .welo-rv-textarea {
    min-height: 120px;
    resize: vertical;
    line-height: 1.5;
  }

  .welo-rv-upload {
    border-radius: 18px;
    border: 1px dashed #d4d4d8;
    padding: 16px 14px;
    background: #fafafa;
    margin-top: 10px;
  }

  .welo-rv-upload-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .welo-rv-upload-title {
    font-size: 14px;
    font-weight: 500;
    color: #111;
  }

  .welo-rv-upload-badge {
    padding: 3px 10px;
    font-size: 11px;
    border-radius: 999px;
    background: #f3f4f6;
    border: 1px solid #e5e7eb;
    color: #6b7280;
    letter-spacing: 0.6px;
  }

  .welo-rv-upload-hint {
    font-size: 12px;
    color: #777;
    margin: 8px 0 12px;
  }

  .welo-rv-dropzone {
    border: 2px dashed #d4d4d8;
    border-radius: 12px;
    padding: 24px;
    text-align: center;
    background: #ffffff;
    transition: all 0.2s ease;
    cursor: pointer;
    margin-bottom: 12px;
  }

  .welo-rv-dropzone:hover,
  .welo-rv-dropzone.is-dragover {
    border-color: #0a0a0a;
    background: #f8f8f8;
  }

  .welo-rv-dropzone-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    color: #666;
  }

  .welo-rv-dropzone svg {
    color: #a1a1aa;
    margin-bottom: 4px;
  }

  .welo-rv-dropzone-browse {
    color: #0a0a0a;
    font-weight: 500;
    text-decoration: underline;
  }

  .welo-rv-preview {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 12px;
  }

  .welo-rv-preview-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    background: #ffffff;
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    font-size: 13px;
  }

  .welo-rv-preview-thumb {
    width: 36px;
    height: 36px;
    border-radius: 6px;
    object-fit: cover;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
  }

  .welo-rv-preview-thumb img,
  .welo-rv-preview-thumb video {
    width: 100%;
    height: 100%;
    border-radius: 6px;
    object-fit: cover;
  }

  .welo-rv-preview-info {
    flex: 1;
    min-width: 0;
  }

  .welo-rv-preview-name {
    font-weight: 500;
    color: #111;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .welo-rv-preview-size {
    font-size: 11px;
    color: #666;
    margin-top: 2px;
  }

  .welo-rv-preview-remove {
    background: none;
    border: none;
    color: #dc2626;
    font-size: 12px;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    transition: background 0.2s ease;
  }

  .welo-rv-preview-remove:hover {
    background: #fef2f2;
  }

  .welo-rv-checkbox {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 13px;
    color: #111;
    margin-top: 12px;
  }

  .welo-rv-checkbox input[type="checkbox"] {
    width: 16px;
    height: 16px;
    margin-top: 3px;
    flex: 0 0 auto;
  }

  .welo-rv-checkbox a {
    text-decoration: underline;
    color: #111;
  }

  .welo-rv-hp-wrap {
    position: absolute !important;
    left: -99999px !important;
    top: auto !important;
    width: 1px !important;
    height: 1px !important;
    opacity: 0 !important;
    pointer-events: none !important;
    overflow: hidden !important;
  }

  .welo-rv-footer {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-top: 22px;
    align-items: center;
  }

  .welo-rv-btn-secondary,
  .welo-rv-btn-primary {
    min-height: 42px;
    padding: 8px 18px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    transition: all 0.16s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }

  .welo-rv-btn-secondary {
    background: #f3f4f6;
    color: #111;
    max-width: 120px;
  }

  .welo-rv-btn-primary {
    background: #000;
    color: #fff;
    flex: 2;
  }

  .welo-rv-btn-primary:disabled,
  .welo-rv-btn-secondary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .welo-rv-error {
    font-size: 13px;
    color: #b91c1c;
    margin-top: 6px;
    min-height: 20px;
  }

  .welo-rv-loading {
    display: none;
    font-size: 13px;
    color: #4b5563;
    margin-top: 6px;
    align-items: center;
    gap: 8px;
  }

  .welo-rv-spinner {
    width: 14px;
    height: 14px;
    border: 2px solid #d1d5db;
    border-top-color: #000;
    border-radius: 999px;
    animation: weloSpin 0.7s linear infinite;
  }

  @keyframes weloSpin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 480px) {
    .welo-rv-overlay {
      padding: 20px;
      align-items: center;
    }

    .welo-rv-modal {
      padding: 24px 20px 20px;
      border-radius: 22px;
      margin: 0;
      width: 100%;
      max-width: none;
      animation: weloModalInMobile 0.25s ease-out;
      max-height: 85vh;
    }

    @keyframes weloModalInMobile {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .welo-rv-title {
      font-size: 20px;
    }

    .welo-rv-star-icon {
      width: 35px;
      height: 35px;
    }

    .welo-rv-dropzone {
      padding: 16px;
    }

    .welo-rv-input,
    .welo-rv-textarea {
      padding: 14px 16px;
      min-height: 48px;
      border-radius: 12px;
      line-height: 1.4;
      font-size: 16px !important;
      height: auto;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .welo-rv-input {
      height: 48px;
      padding-top: 13px;
      padding-bottom: 13px;
    }

    .welo-rv-textarea {
      min-height: 120px;
      line-height: 1.4;
      padding-top: 14px;
      padding-bottom: 14px;
    }

    .welo-rv-footer {
      margin-top: 20px;
      gap: 12px;
    }

    .welo-rv-btn-secondary,
    .welo-rv-btn-primary {
      min-height: 48px;
      font-size: 15px;
    }

    .welo-rv-btn-secondary {
      max-width: 100px;
      flex: 0 0 auto;
    }

    .welo-rv-btn-primary {
      flex: 1;
    }

    .welo-rv-upload-desktop {
      display: none;
    }
  }

  @media (min-width: 481px) {
    .welo-rv-step[data-step="3"] {
      display: none !important;
    }

    .welo-rv-btn-secondary {
      flex: 0 0 auto;
      min-width: 100px;
    }

    .welo-rv-btn-primary {
      flex: 0 0 auto;
      min-width: 120px;
    }
  }
  `;

  // ------------------------------------------------------------------
  // 4. HTML
  // ------------------------------------------------------------------
  var STAR_SVG =
    '<svg class="welo-rv-star-icon" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">' +
      '<path class="welo-rv-star-bg" d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" fill="#ffffff" stroke="#cfcfcf" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path>' +
      '<path class="welo-rv-star-fill" d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" fill="#171717" stroke="#171717" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path>' +
    '</svg>';

  var UPLOAD_ICON_SVG =
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
      '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>' +
      '<polyline points="14,2 14,8 20,8"></polyline>' +
      '<line x1="16" y1="13" x2="8" y2="13"></line>' +
      '<line x1="16" y1="17" x2="8" y2="17"></line>' +
      '<polyline points="10,9 9,9 8,9"></polyline>' +
    '</svg>';

  function buildStarButton(value, label) {
    return (
      '<button type="button" data-value="' + value + '" aria-label="' + label + '">' +
        STAR_SVG +
      '</button>'
    );
  }

  var HTML_CONTENT =
    '<div id="welo-review-overlay" class="welo-rv-overlay" aria-hidden="true">' +
      '<div class="welo-rv-modal" role="dialog" aria-modal="true" aria-labelledby="welo-rv-step1-title">' +
        '<button class="welo-rv-close" type="button" aria-label="Close">&times;</button>' +

        '<div class="welo-rv-step is-active" data-step="1">' +
          '<h2 class="welo-rv-title" id="welo-rv-step1-title"></h2>' +
          '<p class="welo-rv-subtitle" id="welo-rv-step1-sub"></p>' +
          '<div class="welo-rv-stars-picker" id="welo-rv-stars-picker" aria-label="Rating selector">' +
            buildStarButton(1, "1 star") +
            buildStarButton(2, "2 stars") +
            buildStarButton(3, "3 stars") +
            buildStarButton(4, "4 stars") +
            buildStarButton(5, "5 stars") +
          '</div>' +
          '<p class="welo-rv-hint" id="welo-rv-rating-hint"></p>' +
        '</div>' +

        '<div class="welo-rv-step" data-step="2">' +
          '<h2 class="welo-rv-title" id="welo-rv-step2-title"></h2>' +
          '<div class="welo-rv-group">' +
            '<label class="welo-rv-label" for="welo-rv-title-input" id="welo-rv-title-label"></label>' +
            '<input id="welo-rv-title-input" type="text" maxlength="200" class="welo-rv-input" />' +
          '</div>' +
          '<div class="welo-rv-group">' +
            '<label class="welo-rv-label" for="welo-rv-text-input" id="welo-rv-text-label"></label>' +
            '<textarea id="welo-rv-text-input" maxlength="2000" class="welo-rv-textarea"></textarea>' +
          '</div>' +
          '<div class="welo-rv-upload welo-rv-upload-desktop">' +
            '<div class="welo-rv-upload-header">' +
              '<span class="welo-rv-upload-title" id="welo-rv-upload-title"></span>' +
              '<span class="welo-rv-upload-badge">Optional</span>' +
            '</div>' +
            '<p class="welo-rv-upload-hint" id="welo-rv-upload-hint"></p>' +
            '<div class="welo-rv-dropzone" id="welo-rv-dropzone-desktop">' +
              '<div class="welo-rv-dropzone-content">' +
                UPLOAD_ICON_SVG +
                '<span id="welo-rv-dropzone-text-desktop"></span>' +
                '<span class="welo-rv-dropzone-browse" id="welo-rv-upload-btn-label-desktop"></span>' +
              '</div>' +
              '<input id="welo-rv-file-input-desktop" type="file" accept="image/*,video/*" multiple style="display:none;" />' +
            '</div>' +
            '<div id="welo-rv-preview-desktop" class="welo-rv-preview"></div>' +
          '</div>' +
        '</div>' +

        '<div class="welo-rv-step" data-step="3">' +
          '<h2 class="welo-rv-title" id="welo-rv-step3-title"></h2>' +
          '<div class="welo-rv-upload">' +
            '<div class="welo-rv-upload-header">' +
              '<span class="welo-rv-upload-title" id="welo-rv-upload-title-mobile"></span>' +
              '<span class="welo-rv-upload-badge">Optional</span>' +
            '</div>' +
            '<p class="welo-rv-upload-hint" id="welo-rv-upload-hint-mobile"></p>' +
            '<div class="welo-rv-dropzone" id="welo-rv-dropzone-mobile">' +
              '<div class="welo-rv-dropzone-content">' +
                UPLOAD_ICON_SVG +
                '<span id="welo-rv-dropzone-text-mobile"></span>' +
                '<span class="welo-rv-dropzone-browse" id="welo-rv-upload-btn-label-mobile"></span>' +
              '</div>' +
              '<input id="welo-rv-file-input-mobile" type="file" accept="image/*,video/*" multiple style="display:none;" />' +
            '</div>' +
            '<div id="welo-rv-preview-mobile" class="welo-rv-preview"></div>' +
          '</div>' +
        '</div>' +

        '<div class="welo-rv-step" data-step="4">' +
          '<h2 class="welo-rv-title" id="welo-rv-step4-title"></h2>' +
          '<div class="welo-rv-group">' +
            '<label class="welo-rv-label" for="welo-rv-email-input" id="welo-rv-email-label"></label>' +
            '<input id="welo-rv-email-input" type="email" maxlength="255" class="welo-rv-input" />' +
          '</div>' +
          '<div class="welo-rv-group">' +
            '<label class="welo-rv-label" for="welo-rv-name-input" id="welo-rv-name-label"></label>' +
            '<input id="welo-rv-name-input" type="text" maxlength="255" class="welo-rv-input" />' +
          '</div>' +
          '<div class="welo-rv-group">' +
            '<label class="welo-rv-label" for="welo-rv-phone-input" id="welo-rv-phone-label"></label>' +
            '<input id="welo-rv-phone-input" type="tel" maxlength="40" class="welo-rv-input" />' +
          '</div>' +
          '<div class="welo-rv-group welo-rv-hp-wrap" aria-hidden="true">' +
            '<label for="welo-rv-website-input">Website</label>' +
            '<input id="welo-rv-website-input" type="text" name="website" autocomplete="off" tabindex="-1" />' +
          '</div>' +
          '<div class="welo-rv-checkbox">' +
            '<input type="checkbox" id="welo-rv-accept" />' +
            '<label for="welo-rv-accept" id="welo-rv-accept-label"></label>' +
          '</div>' +
        '</div>' +

        '<div class="welo-rv-step" data-step="5">' +
          '<h2 class="welo-rv-title" id="welo-rv-thankyou-title"></h2>' +
          '<p class="welo-rv-subtitle" id="welo-rv-thankyou-text"></p>' +
        '</div>' +

        '<div id="welo-rv-error" class="welo-rv-error"></div>' +

        '<div id="welo-rv-loading" class="welo-rv-loading" aria-hidden="true">' +
          '<span class="welo-rv-spinner"></span>' +
          '<span id="welo-rv-loading-text"></span>' +
        '</div>' +

        '<div class="welo-rv-footer">' +
          '<button type="button" id="welo-rv-back-btn" class="welo-rv-btn-secondary"></button>' +
          '<button type="button" id="welo-rv-next-btn" class="welo-rv-btn-primary"></button>' +
        '</div>' +
      '</div>' +
    '</div>';

  // ------------------------------------------------------------------
  // 5. Injection helpers
  // ------------------------------------------------------------------
  function injectStyles() {
    if (document.getElementById(STYLE_EL_ID)) return;
    var styleEl = document.createElement("style");
    styleEl.id = STYLE_EL_ID;
    styleEl.textContent = CSS_CONTENT;
    document.head.appendChild(styleEl);
  }

  function injectMarkup() {
    if (document.getElementById(OVERLAY_EL_ID)) return;
    document.body.insertAdjacentHTML("beforeend", HTML_CONTENT);
  }

  // ------------------------------------------------------------------
  // 6. Supabase lib loader
  // ------------------------------------------------------------------
  function loadSupabase() {
    return new Promise(function (resolve, reject) {
      if (window.supabase && typeof window.supabase.createClient === "function") {
        resolve();
        return;
      }

      var existing = document.querySelector(
        'script[data-welo-supabase], script[src*="@supabase/supabase-js"]'
      );

      if (existing) {
        if (window.supabase && typeof window.supabase.createClient === "function") {
          resolve();
          return;
        }

        existing.addEventListener("load", function () {
          resolve();
        });
        existing.addEventListener("error", reject);
        return;
      }

      var s = document.createElement("script");
      s.src = SUPABASE_LIB_URL;
      s.setAttribute("data-welo-supabase", "1");
      s.onload = function () {
        resolve();
      };
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  // ------------------------------------------------------------------
  // 7. Bootstrap
  // ------------------------------------------------------------------
  function bootstrap() {
    try {
      injectStyles();
      injectMarkup();
    } catch (e) {
      console.error("[Welo Review] Markup/CSS injection failed", e);
      return;
    }

    loadSupabase()
      .then(function () {
        setupPopup();
      })
      .catch(function (err) {
        console.error("[Welo Review] Failed to load Supabase", err);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap);
  } else {
    bootstrap();
  }

  // ==================================================================
  // 8. LOGICA POPUP
  // ==================================================================
  function setupPopup() {
    var createClient = window.supabase && window.supabase.createClient;

    if (typeof createClient !== "function") {
      console.error("[Welo Review] Supabase client not available");
      return;
    }

    var supabasePopup = createClient(SUPABASE_URL_POPUP, SUPABASE_ANON_KEY_POPUP);

    var COMPANY_SLUG_POPUP = DATA_COMPANY || "";
    var LOCALE_POPUP = window.location.pathname.startsWith("/en") ? "en" : "it";

    var STRINGS_BY_LOCALE = {
      it: {
        step1Title: "Lascia una recensione",
        step1Sub: "Da 1 a 5 stelle, come valuti questa azienda?",
        ratingHint: "Puoi modificare la tua scelta in qualsiasi momento.",
        step2Title: "Scrivi la tua recensione",
        step3Title: "Allega una foto o un video",
        titleLabel: "Titolo della recensione",
        textLabel: "Testo della recensione",
        uploadTitle: "Allega una foto o un video",
        uploadHint: "Puoi caricare fino a 5 file, max 1 video e 4 immagini. Immagini max 20MB, video supportati anche in alta qualità.",
        uploadBtn: "Scegli i file",
        dropzoneText: "Trascina i file qui o",
        step4Title: "I tuoi dati",
        emailLabel: "Email (non verrà mostrata pubblicamente)",
        nameLabel: "Nome e cognome",
        phoneLabel: "Numero di telefono (non verrà mostrato pubblicamente)",
        thankyouTitle: "Grazie per la tua recensione",
        thankyouText:
          "Il nostro team la analizzerà per verificarne l'autenticità. Potremmo ricontattarti se servono dettagli aggiuntivi.",
        back: "Indietro",
        next: "Avanti",
        send: "Invia recensione",
        close: "Chiudi",
        required: "Per favore compila tutti i campi obbligatori.",
        genericError: "Qualcosa è andato storto, riprova tra qualche minuto.",
        acceptText:
          'Accetto i <a href="https://www.welobadge.com/legal/pagine-legali" target="_blank" rel="noopener noreferrer">Termini &amp; Condizioni</a> e la <a href="https://www.welobadge.com/legal/pagine-legali" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.',
        acceptRequired: "Per continuare devi accettare Termini & Condizioni e Privacy Policy.",
        uploading: "Caricamento in corso...",
        savingReview: "Salvataggio recensione...",
        remove: "Elimina",
        invalidEmail: "Inserisci un indirizzo email valido.",
        imageTooLarge: "Alcune immagini superano il limite di 20MB e non sono state aggiunte.",
        videoTooLarge: "Il video supera il limite massimo di 500MB e non è stato aggiunto.",
        onlyOneVideo: "Puoi caricare massimo 1 video per recensione.",
        preparingVideo: "Preparazione upload video...",
        uploadingVideo: "Caricamento video...",
        videoUploadFailed: "Caricamento video fallito. Riprova.",
        uploadingFile: function (index, total) {
          return "Caricamento file " + index + " di " + total + "...";
        },
        sending: "Invio..."
      },
      en: {
        step1Title: "Leave a review",
        step1Sub: "From 1 to 5 stars, how would you rate this company?",
        ratingHint: "You can change your rating at any time before sending.",
        step2Title: "Write your review",
        step3Title: "Attach a photo or video",
        titleLabel: "Review title",
        textLabel: "Review text",
        uploadTitle: "Attach a photo or video",
        uploadHint: "You can upload up to 5 files, max 1 video and 4 images. Images max 20MB, high-quality videos supported.",
        uploadBtn: "Choose files",
        dropzoneText: "Drag files here or",
        step4Title: "Your information",
        emailLabel: "Email (will not be shown publicly)",
        nameLabel: "Full name",
        phoneLabel: "Phone number (will not be shown publicly)",
        thankyouTitle: "Thank you for your review",
        thankyouText:
          "Our team will review it to verify authenticity. We may contact you if we need more details.",
        back: "Back",
        next: "Next",
        send: "Submit review",
        close: "Close",
        required: "Please fill in all required fields.",
        genericError: "Something went wrong, please try again in a few minutes.",
        acceptText:
          'I accept the <a href="https://www.welobadge.com/en/legal/legal-pages" target="_blank" rel="noopener noreferrer">Terms &amp; Conditions</a> and the <a href="https://www.welobadge.com/en/legal/legal-pages" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.',
        acceptRequired: "To continue you must accept the Terms & Conditions and Privacy Policy.",
        uploading: "Uploading...",
        savingReview: "Saving your review...",
        remove: "Remove",
        invalidEmail: "Please enter a valid email address.",
        imageTooLarge: "Some images exceed the 20MB limit and were not added.",
        videoTooLarge: "The video exceeds the 500MB limit and was not added.",
        onlyOneVideo: "You can only upload 1 video per review.",
        preparingVideo: "Preparing video upload...",
        uploadingVideo: "Uploading video...",
        videoUploadFailed: "Video upload failed. Please try again.",
        uploadingFile: function (index, total) {
          return "Uploading file " + index + " of " + total + "...";
        },
        sending: "Sending..."
      }
    };

    var STR = STRINGS_BY_LOCALE[LOCALE_POPUP] || STRINGS_BY_LOCALE.it;

    var overlay = document.getElementById(OVERLAY_EL_ID);
    if (!overlay) {
      console.error("[Welo Review] overlay not found");
      return;
    }

    function $id(id) {
      return document.getElementById(id);
    }

    var steps = overlay.querySelectorAll(".welo-rv-step");
    var closeBtn = overlay.querySelector(".welo-rv-close");
    var backBtn = $id("welo-rv-back-btn");
    var nextBtn = $id("welo-rv-next-btn");
    var errorBox = $id("welo-rv-error");
    var loadingBox = $id("welo-rv-loading");
    var loadingText = $id("welo-rv-loading-text");

    var starsBtns = overlay.querySelectorAll("#welo-rv-stars-picker button");
    var titleInput = $id("welo-rv-title-input");
    var textInput = $id("welo-rv-text-input");
    var emailInput = $id("welo-rv-email-input");
    var nameInput = $id("welo-rv-name-input");
    var phoneInput = $id("welo-rv-phone-input");
    var honeypotInput = $id("welo-rv-website-input");

    var fileInputDesktop = $id("welo-rv-file-input-desktop");
    var fileInputMobile = $id("welo-rv-file-input-mobile");
    var dropzoneDesktop = $id("welo-rv-dropzone-desktop");
    var dropzoneMobile = $id("welo-rv-dropzone-mobile");
    var dropzoneTextDesktop = $id("welo-rv-dropzone-text-desktop");
    var dropzoneTextMobile = $id("welo-rv-dropzone-text-mobile");
    var previewContainerDesktop = $id("welo-rv-preview-desktop");
    var previewContainerMobile = $id("welo-rv-preview-mobile");

    var acceptCheckbox = $id("welo-rv-accept");
    var acceptLabel = $id("welo-rv-accept-label");

    var currentStep = 1;

    var STATE = {
      rating: null,
      title: "",
      text: "",
      email: "",
      name: "",
      phone: "",
      files: [],
      country: null,
      formStartedAt: null,
      formSubmittedAt: null,
      source: "organic",
      inviteToken: null
    };

    function setText(id, value) {
      var el = $id(id);
      if (el) el.textContent = value;
    }

    function detectCountry() {
      try {
        fetch("https://ipapi.co/json/")
          .then(function (res) {
            return res.ok ? res.json() : null;
          })
          .then(function (data) {
            if (data && data.country_name) {
              STATE.country = data.country_name;
            }
          })
          .catch(function () {});
      } catch (e) {}
    }

    function detectReviewSource() {
      try {
        var params = new URLSearchParams(window.location.search);

        var inviteToken =
          params.get("review_invite") ||
          params.get("invite") ||
          params.get("token") ||
          null;

        var source =
          params.get("source") ||
          params.get("utm_source") ||
          null;

        if (inviteToken) {
          STATE.source = "email_invite";
          STATE.inviteToken = inviteToken;
        } else if (source) {
          STATE.source = String(source).trim() || "unknown";
        } else if (document.referrer) {
          STATE.source = "referral";
        } else {
          STATE.source = "organic";
        }
      } catch (e) {
        STATE.source = "unknown";
      }
    }

    detectCountry();
    detectReviewSource();

    setText("welo-rv-step1-title", STR.step1Title);
    setText("welo-rv-step1-sub", STR.step1Sub);
    setText("welo-rv-rating-hint", STR.ratingHint);
    setText("welo-rv-step2-title", STR.step2Title);
    setText("welo-rv-step3-title", STR.step3Title);
    setText("welo-rv-step4-title", STR.step4Title);
    setText("welo-rv-title-label", STR.titleLabel);
    setText("welo-rv-text-label", STR.textLabel);
    setText("welo-rv-upload-title", STR.uploadTitle);
    setText("welo-rv-upload-title-mobile", STR.uploadTitle);
    setText("welo-rv-upload-hint", STR.uploadHint);
    setText("welo-rv-upload-hint-mobile", STR.uploadHint);
    setText("welo-rv-upload-btn-label-desktop", STR.uploadBtn);
    setText("welo-rv-upload-btn-label-mobile", STR.uploadBtn);
    setText("welo-rv-email-label", STR.emailLabel);
    setText("welo-rv-name-label", STR.nameLabel);
    setText("welo-rv-phone-label", STR.phoneLabel);
    setText("welo-rv-thankyou-title", STR.thankyouTitle);
    setText("welo-rv-thankyou-text", STR.thankyouText);

    if (dropzoneTextDesktop) dropzoneTextDesktop.textContent = STR.dropzoneText;
    if (dropzoneTextMobile) dropzoneTextMobile.textContent = STR.dropzoneText;

    if (backBtn) backBtn.textContent = STR.back;
    if (nextBtn) nextBtn.textContent = STR.next;
    if (closeBtn) closeBtn.setAttribute("aria-label", STR.close);
    if (acceptLabel) acceptLabel.innerHTML = STR.acceptText;

    function generateSubmissionId() {
      if (window.crypto && window.crypto.randomUUID) {
        return window.crypto.randomUUID();
      }
      return "sub-" + Date.now() + "-" + Math.random().toString(16).slice(2);
    }

    function formatFileSize(bytes) {
      if (!bytes) return "0 Bytes";
      var k = 1024;
      var sizes = ["Bytes", "KB", "MB", "GB"];
      var i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    }

    function isValidEmail(email) {
      var v = String(email || "").trim();
      if (!v) return false;
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    }

    function isVideoFile(file) {
      return file && typeof file.type === "string" && file.type.indexOf("video/") === 0;
    }

    function isImageFile(file) {
      return file && typeof file.type === "string" && file.type.indexOf("image/") === 0;
    }

    function isMobileUploadStepEnabled() {
      return window.innerWidth <= 480;
    }

    function getPreviousStep(step) {
      /*
       * Desktop:
       * step 3 è nascosto perché l'upload è già dentro lo step 2.
       * Quindi da step 4 bisogna tornare direttamente a step 2.
       *
       * Mobile:
       * step 3 è visibile, quindi da step 4 si torna a step 3.
       */
      if (step === 4 && !isMobileUploadStepEnabled()) {
        return 2;
      }

      if (step > 1) {
        return step - 1;
      }

      return 1;
    }

    function canvasToBlob(canvas, type, quality) {
      return new Promise(function (resolve) {
        if (!canvas.toBlob) {
          resolve(null);
          return;
        }
        canvas.toBlob(
          function (blob) {
            resolve(blob || null);
          },
          type,
          typeof quality === "number" ? quality : undefined
        );
      });
    }

    async function decodeImageToCanvas(file) {
      var url = URL.createObjectURL(file);

      try {
        if ("createImageBitmap" in window) {
          var bmp = await createImageBitmap(file);
          var canvas = document.createElement("canvas");
          canvas.width = bmp.width;
          canvas.height = bmp.height;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(bmp, 0, 0);
          if (bmp && bmp.close) bmp.close();
          return canvas;
        }

        var img = await new Promise(function (resolve, reject) {
          var im = new Image();
          im.onload = function () {
            resolve(im);
          };
          im.onerror = reject;
          im.src = url;
        });

        var canvas2 = document.createElement("canvas");
        canvas2.width = img.naturalWidth || img.width;
        canvas2.height = img.naturalHeight || img.height;
        var ctx2 = canvas2.getContext("2d");
        ctx2.drawImage(img, 0, 0);
        return canvas2;
      } finally {
        URL.revokeObjectURL(url);
      }
    }

    function resizeCanvas(sourceCanvas, maxLongSide) {
      var sw = sourceCanvas.width;
      var sh = sourceCanvas.height;
      var longSide = Math.max(sw, sh);

      if (!maxLongSide || longSide <= maxLongSide) return sourceCanvas;

      var scale = maxLongSide / longSide;
      var tw = Math.max(1, Math.round(sw * scale));
      var th = Math.max(1, Math.round(sh * scale));

      var canvas = document.createElement("canvas");
      canvas.width = tw;
      canvas.height = th;

      var ctx = canvas.getContext("2d");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(sourceCanvas, 0, 0, tw, th);

      return canvas;
    }

    async function compressImageToTarget(file, targetBytes) {
      try {
        var maxBytes = Math.max(1, Number(targetBytes) || 153600);
        if (file.size <= maxBytes) return file;

        var originalType = String(file.type || "").toLowerCase();
        var outType = "image/jpeg";

        if (
          originalType === "image/png" ||
          originalType === "image/webp" ||
          originalType === "image/avif" ||
          originalType === "image/heic" ||
          originalType === "image/heif"
        ) {
          outType = "image/webp";
        } else if (originalType === "image/jpeg" || originalType === "image/jpg") {
          outType = "image/jpeg";
        } else {
          outType = "image/webp";
        }

        var canvas = await decodeImageToCanvas(file);
        canvas = resizeCanvas(canvas, 1600);

        var quality = outType === "image/jpeg" ? 0.82 : 0.8;
        var blob = await canvasToBlob(canvas, outType, quality);

        if (!blob) {
          outType = "image/jpeg";
          quality = 0.82;
          blob = await canvasToBlob(canvas, outType, quality);
        }

        if (!blob) return file;

        var minQ = 0.45;

        for (var i = 0; i < 10 && blob.size > maxBytes; i++) {
          if (quality > minQ) {
            quality = Math.max(minQ, quality - 0.07);
            var nextBlob = await canvasToBlob(canvas, outType, quality);
            if (nextBlob) blob = nextBlob;
            continue;
          }

          var newMaxLong = Math.max(
            720,
            Math.round(Math.max(canvas.width, canvas.height) * 0.88)
          );

          var resized = resizeCanvas(canvas, newMaxLong);
          if (resized === canvas) break;

          canvas = resized;
          quality = outType === "image/jpeg" ? 0.78 : 0.76;

          var nextBlob2 = await canvasToBlob(canvas, outType, quality);
          if (nextBlob2) blob = nextBlob2;
        }

        if (!blob) return file;

        return new File([blob], file.name, {
          type: blob.type || outType,
          lastModified: Date.now()
        });
      } catch (e) {
        return file;
      }
    }

    function syncFileInputs() {
      try {
        var dataTransfer = new DataTransfer();

        STATE.files.forEach(function (file) {
          dataTransfer.items.add(file);
        });

        if (fileInputDesktop) fileInputDesktop.files = dataTransfer.files;
        if (fileInputMobile) fileInputMobile.files = dataTransfer.files;
      } catch (e) {}
    }

    function createPreviewItem(file, index) {
      var item = document.createElement("div");
      item.className = "welo-rv-preview-item";
      item.dataset.index = String(index);

      var thumb = document.createElement("div");
      thumb.className = "welo-rv-preview-thumb";

      if (isImageFile(file)) {
        var img = document.createElement("img");
        var objectUrl = URL.createObjectURL(file);
        img.src = objectUrl;
        img.alt = "";
        img.onload = function () {
          URL.revokeObjectURL(objectUrl);
        };
        thumb.appendChild(img);
      } else if (isVideoFile(file)) {
        var videoIcon = document.createElement("div");
        videoIcon.textContent = "🎬";
        videoIcon.style.fontSize = "16px";
        thumb.appendChild(videoIcon);
      } else {
        var fileIcon = document.createElement("div");
        fileIcon.textContent = "📄";
        fileIcon.style.fontSize = "16px";
        thumb.appendChild(fileIcon);
      }

      var info = document.createElement("div");
      info.className = "welo-rv-preview-info";

      var name = document.createElement("div");
      name.className = "welo-rv-preview-name";
      name.textContent = file.name;

      var size = document.createElement("div");
      size.className = "welo-rv-preview-size";
      size.textContent = formatFileSize(file.size);

      info.appendChild(name);
      info.appendChild(size);

      var removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "welo-rv-preview-remove";
      removeBtn.textContent = STR.remove;
      removeBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        removeFile(index);
      });

      item.appendChild(thumb);
      item.appendChild(info);
      item.appendChild(removeBtn);

      return item;
    }

    function renderPreviews() {
      if (previewContainerDesktop) previewContainerDesktop.innerHTML = "";
      if (previewContainerMobile) previewContainerMobile.innerHTML = "";

      STATE.files.forEach(function (file, index) {
        var itemDesktop = createPreviewItem(file, index);
        var itemMobile = createPreviewItem(file, index);

        if (previewContainerDesktop) previewContainerDesktop.appendChild(itemDesktop);
        if (previewContainerMobile) previewContainerMobile.appendChild(itemMobile);
      });
    }

    function removeFile(index) {
      STATE.files.splice(index, 1);
      renderPreviews();
      syncFileInputs();
    }

    async function addFiles(fileList) {
      errorBox.textContent = "";

      var remainingSlots = 5 - STATE.files.length;
      if (remainingSlots <= 0) return;

      var incoming = Array.prototype.slice.call(fileList || [], 0, remainingSlots);
      var MAX_IMAGE_SIZE = 20 * 1024 * 1024;
      var MAX_VIDEO_SIZE = 500 * 1024 * 1024;

      var alreadyHasVideo = STATE.files.some(isVideoFile);
      var imageTooLargeFound = false;
      var videoTooLargeFound = false;
      var extraVideoFound = false;

      var filtered = [];

      for (var f = 0; f < incoming.length; f++) {
        var file = incoming[f];

        if (isVideoFile(file)) {
          if (alreadyHasVideo) {
            extraVideoFound = true;
            continue;
          }

          if (file.size > MAX_VIDEO_SIZE) {
            videoTooLargeFound = true;
            continue;
          }

          alreadyHasVideo = true;
          filtered.push(file);
        } else {
          if (file.size > MAX_IMAGE_SIZE) {
            imageTooLargeFound = true;
            continue;
          }

          filtered.push(file);
        }
      }

      if (extraVideoFound) {
        errorBox.textContent = STR.onlyOneVideo;
      } else if (videoTooLargeFound) {
        errorBox.textContent = STR.videoTooLarge;
      } else if (imageTooLargeFound) {
        errorBox.textContent = STR.imageTooLarge;
      }

      var targetBytes = 150 * 1024;
      var processed = [];

      for (var i = 0; i < filtered.length; i++) {
        var item = filtered[i];

        if (isImageFile(item)) {
          processed.push(await compressImageToTarget(item, targetBytes));
        } else {
          processed.push(item);
        }
      }

      STATE.files.push.apply(STATE.files, processed);
      renderPreviews();
      syncFileInputs();
    }

    function bindUploader(dropzone, input) {
      if (!dropzone || !input) return;

      dropzone.addEventListener("click", function () {
        input.click();
      });

      dropzone.addEventListener("dragover", function (e) {
        e.preventDefault();
        dropzone.classList.add("is-dragover");
      });

      dropzone.addEventListener("dragleave", function (e) {
        e.preventDefault();

        if (!dropzone.contains(e.relatedTarget)) {
          dropzone.classList.remove("is-dragover");
        }
      });

      dropzone.addEventListener("drop", async function (e) {
        e.preventDefault();
        dropzone.classList.remove("is-dragover");

        var files = e.dataTransfer && e.dataTransfer.files;

        if (files && files.length > 0) {
          await addFiles(files);
        }
      });

      input.addEventListener("change", async function () {
        if (input.files && input.files.length > 0) {
          await addFiles(input.files);
        }
      });
    }

    function updateStarsDisplay(activeValue) {
      starsBtns.forEach(function (button) {
        var value = Number(button.dataset.value);
        button.classList.toggle("is-active", value <= activeValue && activeValue > 0);
      });
    }

    function setLoading(isVisible, text) {
      if (!loadingBox) return;

      loadingBox.style.display = isVisible ? "flex" : "none";

      if (typeof text === "string" && loadingText) {
        loadingText.textContent = text;
      }
    }

    function setStep(step) {
      /*
       * Protezione extra:
       * su desktop lo step 3 non deve mai diventare lo step attivo,
       * perché è nascosto via CSS. In quel caso torniamo allo step 2.
       */
      if (step === 3 && !isMobileUploadStepEnabled()) {
        step = 2;
      }

      currentStep = step;

      steps.forEach(function (s) {
        s.classList.toggle("is-active", Number(s.dataset.step) === step);
      });

      errorBox.textContent = "";

      backBtn.style.display = "";
      backBtn.style.visibility = "visible";
      backBtn.disabled = false;
      nextBtn.disabled = false;

      if (step === 1) {
        backBtn.style.visibility = "hidden";
        backBtn.disabled = true;
        nextBtn.textContent = STR.next;
      } else if (step === 4) {
        nextBtn.textContent = STR.send;
      } else if (step === 5) {
        backBtn.style.display = "none";
        nextBtn.textContent = STR.close;
      } else {
        nextBtn.textContent = STR.next;
      }

      window.setTimeout(function () {
        if (step === 2 && titleInput) titleInput.focus();
      }, 120);
    }

    function resetState() {
      STATE.rating = null;
      STATE.title = "";
      STATE.text = "";
      STATE.email = "";
      STATE.name = "";
      STATE.phone = "";
      STATE.files = [];
      STATE.formStartedAt = null;
      STATE.formSubmittedAt = null;

      updateStarsDisplay(0);

      if (titleInput) titleInput.value = "";
      if (textInput) textInput.value = "";
      if (emailInput) emailInput.value = "";
      if (nameInput) nameInput.value = "";
      if (phoneInput) phoneInput.value = "";
      if (honeypotInput) honeypotInput.value = "";
      if (fileInputDesktop) fileInputDesktop.value = "";
      if (fileInputMobile) fileInputMobile.value = "";
      if (acceptCheckbox) acceptCheckbox.checked = false;

      renderPreviews();
      setLoading(false, "");
      errorBox.textContent = "";
    }

    function openPopup() {
      resetState();
      STATE.formStartedAt = new Date().toISOString();

      setStep(1);

      overlay.classList.add("is-visible");
      overlay.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function closePopup() {
      overlay.classList.remove("is-visible");
      overlay.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    function autoOpenReviewFromUrl() {
      var hash = (window.location.hash || "").toLowerCase();
      var params = new URLSearchParams(window.location.search);

      if (hash === "#recensione" || hash === "#review" || params.get("review") === "1") {
        setTimeout(openPopup, 150);
      }
    }

    function normalizeCompanySlug() {
      if (!COMPANY_SLUG_POPUP) {
        var parts = window.location.pathname.split("/").filter(Boolean);
        COMPANY_SLUG_POPUP = decodeURIComponent(parts[parts.length - 1] || "").trim();
      }
    }

    normalizeCompanySlug();
    autoOpenReviewFromUrl();

    window.openWeloReviewPopup = openPopup;
    window.openReviewModal = openPopup;

    if (closeBtn) closeBtn.addEventListener("click", closePopup);

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closePopup();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && overlay.classList.contains("is-visible")) {
        closePopup();
      }
    });

    document
      .querySelectorAll(
        'a[href="#recensione"], [href="#recensione"], a[href="#review"], [href="#review"]'
      )
      .forEach(function (el) {
        el.addEventListener("click", function (e) {
          e.preventDefault();
          openPopup();
        });
      });

    starsBtns.forEach(function (btn) {
      var val = Number(btn.dataset.value);

      btn.addEventListener("click", function () {
        STATE.rating = val;
        updateStarsDisplay(val);
      });

      btn.addEventListener("mouseenter", function () {
        updateStarsDisplay(val);
      });

      btn.addEventListener("mouseleave", function () {
        updateStarsDisplay(STATE.rating || 0);
      });
    });

    bindUploader(dropzoneDesktop, fileInputDesktop);
    bindUploader(dropzoneMobile, fileInputMobile);

    backBtn.addEventListener("click", function () {
      if (currentStep > 1 && currentStep <= 5) {
        setStep(getPreviousStep(currentStep));
      }
    });

    nextBtn.addEventListener("click", async function () {
      if (currentStep === 1) {
        if (!STATE.rating) {
          errorBox.textContent = STR.required;
          return;
        }

        setStep(2);
        return;
      }

      if (currentStep === 2) {
        STATE.title = String(titleInput.value || "").trim();
        STATE.text = String(textInput.value || "").trim();

        if (!STATE.title || !STATE.text) {
          errorBox.textContent = STR.required;
          return;
        }

        var isMobile = isMobileUploadStepEnabled();
        setStep(isMobile ? 3 : 4);
        return;
      }

      if (currentStep === 3) {
        setStep(4);
        return;
      }

      if (currentStep === 4) {
        STATE.email = String(emailInput.value || "").trim();
        STATE.name = String(nameInput.value || "").trim();
        STATE.phone = phoneInput ? String(phoneInput.value || "").trim() : "";

        if (!STATE.email || !STATE.name) {
          errorBox.textContent = STR.required;
          return;
        }

        if (!isValidEmail(STATE.email)) {
          errorBox.textContent = STR.invalidEmail;
          return;
        }

        if (!acceptCheckbox.checked) {
          errorBox.textContent = STR.acceptRequired;
          return;
        }

        await submitReview();
        return;
      }

      if (currentStep === 5) {
        closePopup();
      }
    });

    // --------------------------------------------------------------
    // MUX: Direct Upload via Edge Function create-mux-upload
    // --------------------------------------------------------------
    async function createMuxDirectUpload(submissionId, company) {
      var res = await fetch(CREATE_MUX_UPLOAD_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + SUPABASE_ANON_KEY_POPUP,
          apikey: SUPABASE_ANON_KEY_POPUP
        },
        body: JSON.stringify({
          submission_id: submissionId,
          company: company,
          cors_origin: window.location.origin
        })
      });

      var data = await res.json().catch(function () {
        return {};
      });

      if (!res.ok || !data.upload_url || !data.upload_id) {
        console.error("[Welo Review] create-mux-upload failed", data);
        throw new Error((data && data.error) || "Mux upload creation failed");
      }

      return {
        upload_id: data.upload_id,
        upload_url: data.upload_url
      };
    }

    async function putFileToMux(uploadUrl, file) {
      var res = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type || "application/octet-stream"
        }
      });

      if (!res.ok) {
        throw new Error("Mux PUT failed with status " + res.status);
      }
    }

    async function markReviewMuxErrored(submissionId) {
      try {
        await supabasePopup
          .from("lascia_una_recensione")
          .update({ mux_status: "errored" })
          .eq("Submission ID", submissionId);
      } catch (e) {
        console.warn("[Welo Review] Failed to mark review as errored", e);
      }
    }

    async function submitReviewSecure(payload) {
      var res = await fetch(SUBMIT_REVIEW_SECURE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + SUPABASE_ANON_KEY_POPUP,
          apikey: SUPABASE_ANON_KEY_POPUP
        },
        body: JSON.stringify(payload)
      });

      var data = await res.json().catch(function () {
        return {};
      });

      if (!res.ok || !data.success) {
        console.error("[Welo Review] Secure submit failed", data);
        throw new Error((data && data.error) || STR.genericError);
      }

      return data;
    }

    function getCompletionTimeSeconds(submittedAtIso) {
      try {
        if (!STATE.formStartedAt || !submittedAtIso) return null;

        var started = new Date(STATE.formStartedAt).getTime();
        var submitted = new Date(submittedAtIso).getTime();

        if (!started || !submitted || submitted < started) return null;

        return Math.round((submitted - started) / 1000);
      } catch (e) {
        return null;
      }
    }

    async function submitReview() {
      errorBox.textContent = "";
      nextBtn.disabled = true;
      backBtn.disabled = true;
      nextBtn.textContent = STR.sending;

      setLoading(true, STR.uploading);

      var submissionId = generateSubmissionId();

      var imageFiles = STATE.files.filter(isImageFile);
      var videoFile = null;

      for (var vf = 0; vf < STATE.files.length; vf++) {
        if (isVideoFile(STATE.files[vf])) {
          videoFile = STATE.files[vf];
          break;
        }
      }

      var storagePaths = [];
      var originalFileNames = [];

      try {
        // 1. Upload immagini su Supabase Storage
        if (imageFiles.length > 0) {
          var total = imageFiles.length;

          for (var i = 0; i < total; i++) {
            var file = imageFiles[i];
            originalFileNames.push(file.name);

            setLoading(true, STR.uploadingFile(i + 1, total));

            var safeName = file.name.replace(/[^a-z0-9.\-]/gi, "_").toLowerCase();
            var path =
              COMPANY_SLUG_POPUP +
              "/" +
              Date.now() +
              "-" +
              (i + 1) +
              "-" +
              safeName;

            var uploadRes = await supabasePopup.storage
              .from("reviews-proof")
              .upload(path, file, {
                cacheControl: "3600",
                upsert: false
              });

            if (uploadRes.error) {
              console.error("[Welo Review] Upload error", uploadRes.error);
              throw uploadRes.error;
            }

            storagePaths.push((uploadRes.data && uploadRes.data.path) || path);
          }
        }

        // 2. Mux Direct Upload per il video, se presente
        var muxUploadId = null;
        var muxUploadUrl = null;

        if (videoFile) {
          setLoading(true, STR.preparingVideo);

          var mux = await createMuxDirectUpload(submissionId, COMPANY_SLUG_POPUP);

          muxUploadId = mux.upload_id;
          muxUploadUrl = mux.upload_url;

          originalFileNames.push(videoFile.name);
        }

        // 3. Invio recensione alla Edge Function sicura
        setLoading(true, STR.savingReview);

        var nowIso = new Date().toISOString();
        STATE.formSubmittedAt = nowIso;

        var completionTimeSeconds = getCompletionTimeSeconds(nowIso);

        var honeypotValue = "";
        if (honeypotInput) {
          honeypotValue = String(honeypotInput.value || "").trim();
        }

        var payload = {
          azienda: COMPANY_SLUG_POPUP,

          Titolo: STATE.title,
          Testo: STATE.text,

          "Inserisci la tua email": STATE.email,
          "Nome e cognome": STATE.name,
          "Numero di telefono": STATE.phone,

          email: STATE.email,
          full_name: STATE.name,
          phone: STATE.phone,

          "Da 1 a 5 stelle come lo valuti?": STATE.rating,

          /*
           * Lo status finale NON viene deciso dal frontend.
           * La Edge Function decide published / pending / rejected.
           */
          status: null,

          "Submitted at": nowIso,
          "Submission ID": submissionId,
          "Respondent's country": STATE.country || null,

          "Prove di acquisto": originalFileNames.length
            ? originalFileNames.join(", ")
            : null,

          prove_di_acquisto: storagePaths.length
            ? storagePaths.join(",")
            : null,

          video_provider: videoFile ? "mux" : null,
          mux_upload_id: muxUploadId,
          mux_status: videoFile ? "processing" : null,

          source: STATE.source || "organic",
          review_invite_token: STATE.inviteToken || null,

          form_started_at: STATE.formStartedAt,
          form_submitted_at: STATE.formSubmittedAt,
          completion_time_seconds: completionTimeSeconds,
          honeypot_value: honeypotValue,

          page_url: window.location.href,
          referrer: document.referrer || null,
          user_agent_client: navigator.userAgent || null,
          locale: LOCALE_POPUP
        };

        await submitReviewSecure(payload);

        // 4. PUT video su Mux. Il webhook Mux completa asset_id/playback_id/status.
        if (videoFile && muxUploadUrl) {
          setLoading(true, STR.uploadingVideo);

          try {
            await putFileToMux(muxUploadUrl, videoFile);
          } catch (muxErr) {
            console.error("[Welo Review] Mux PUT error", muxErr);
            await markReviewMuxErrored(submissionId);

            errorBox.textContent = STR.videoUploadFailed;
            nextBtn.disabled = false;
            backBtn.disabled = false;
            nextBtn.textContent = STR.send;
            setLoading(false, "");
            return;
          }
        }

        setLoading(false, "");
        setStep(5);

        nextBtn.disabled = false;
        backBtn.disabled = false;
      } catch (err) {
        console.error("[Welo Review] Submit exception", err);

        errorBox.textContent =
          (err && err.message) || STR.genericError;

        nextBtn.disabled = false;
        backBtn.disabled = false;
        nextBtn.textContent = STR.send;
        setLoading(false, "");
      }
    }
  }
})();
