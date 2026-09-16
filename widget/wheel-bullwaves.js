/* Bullwaves Fight Night 2026. Vanilla JS, native Webflow submissions.
 * Browser-only persistence is best effort, not fraud prevention. Claim IDs are
 * references only. Support must verify the original Webflow submission.
 * Load after the existing #bw-dubai-section embed, inside a native Form Block.
 */
(function () {
  'use strict';
  const scriptURL = document.currentScript && document.currentScript.src;
  const CONFIG = {
    storageKey: 'bw-fight-night-2026-v1',
    duration: 5600,
    categoryWeights: {
      Trader: { bonus: 70, challenge: 30 },
      Affiliate: { ticket: 80, challenge: 20 },
      'Software / Tech Company': { challenge: 100 },
      'PSP Company': { challenge: 100 },
      Other: { challenge: 100 }
    },
    challengeWeights: {
      Trader: { '10000': 60, '25000': 30, '50000': 10 },
      Affiliate: { '50000': 80, '100000': 20 },
      'Software / Tech Company': { '5000': 80, '10000': 20 },
      'PSP Company': { '5000': 80, '10000': 20 },
      Other: { '5000': 80, '10000': 20 }
    },
    challenges: { '5000': 59, '10000': 99, '25000': 199, '50000': 299, '100000': 549 },
    labels: { ticket: '1 VIP Ticket', bonus: '$800 Trading Bonus', challenge: 'Prime Challenge' },
    support: { broker: 'https://www.bullwaves.com/contact-us', prime: 'https://www.prime.bullwaves.com/contact-us' }
  };
  const money = value => '$' + Number(value).toLocaleString('en-US');
  function random() { return crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296; }
  function pick(weights) {
    const entries = Object.entries(weights).filter(([, weight]) => weight > 0);
    let point = random() * entries.reduce((sum, [, weight]) => sum + weight, 0);
    for (const [key, weight] of entries) { point -= weight; if (point < 0) return key; }
    return entries[entries.length - 1][0];
  }
  function claimID() {
    return 'BW26-' + Array.from(crypto.getRandomValues(new Uint8Array(6)), x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
  }
  function read() {
    let local, cookie;
    try { local = JSON.parse(localStorage.getItem(CONFIG.storageKey)); } catch (_) {}
    try {
      const part = document.cookie.split('; ').find(x => x.startsWith(CONFIG.storageKey + '='));
      if (part) cookie = JSON.parse(decodeURIComponent(part.slice(CONFIG.storageKey.length + 1)));
    } catch (_) {}
    return [local, cookie].filter(x => x && x.version === 1 && /^BW26-[0-9A-F]{12}$/.test(x.id) &&
      CONFIG.categoryWeights[x.type] && CONFIG.categoryWeights[x.type][x.category] > 0 &&
      (x.category !== 'challenge' || CONFIG.challengeWeights[x.type][x.challenge] > 0) &&
      ['challenge', 'ready', 'submitted'].includes(x.stage) &&
      typeof x.email === 'string' && typeof x.first === 'string' && typeof x.last === 'string')
      .sort((a, b) => b.updated - a.updated)[0] || null;
  }
  function save(record) {
    record.updated = Date.now();
    const json = JSON.stringify(record);
    let saved = false;
    try { localStorage.setItem(CONFIG.storageKey, json); saved = localStorage.getItem(CONFIG.storageKey) === json; } catch (_) {}
    try {
      document.cookie = CONFIG.storageKey + '=' + encodeURIComponent(json) + '; Max-Age=31536000; Path=/; SameSite=Lax' + (location.protocol === 'https:' ? '; Secure' : '');
      saved = saved || document.cookie.split('; ').some(x => x === CONFIG.storageKey + '=' + encodeURIComponent(json));
    } catch (_) {}
    return saved;
  }
  function init() {
    const section = document.getElementById('bw-dubai-section');
    if (!section || section.dataset.bwWheelReady) return;
    const form = section.closest('form'), block = section.closest('.w-form');
    const first = section.querySelector('#bw-first-name'), last = section.querySelector('#bw-last-name'), email = section.querySelector('#bw-email');
    const originalButton = section.querySelector('[type="submit"]');
    const success = block && block.querySelector('.w-form-done'), failure = block && block.querySelector('.w-form-fail');
    if (!form || !block || !first || !last || !email || !originalButton || !success || !failure) {
      console.error('Bullwaves wheel: keep the original fields inside a native Webflow Form Block, including its Success and Error messages.');
      return;
    }
    if (form.getAttribute('action') || form.getAttribute('data-redirect')) {
      console.error('Bullwaves wheel: remove the custom form action and success redirect in Webflow before enabling the wheel.');
      return;
    }
    section.dataset.bwWheelReady = 'true';
    if (scriptURL && !document.querySelector('link[data-bw-wheel-css]')) {
      const link = document.createElement('link'); link.rel = 'stylesheet';
      link.href = new URL('wheel-bullwaves.css', scriptURL).href; link.dataset.bwWheelCss = 'true'; document.head.append(link);
    }
    const field = document.createElement('div'); field.className = 'bw-field';
    field.innerHTML = '<label class="bw-label" for="bw-participant-type">Which best describes you?</label><select id="bw-participant-type" class="bw-input w-select" name="Participant Type" data-name="Participant Type" required><option value="">Select your profile</option></select>';
    const profile = field.querySelector('select');
    Object.keys(CONFIG.categoryWeights).forEach(type => profile.add(new Option(type, type)));
    originalButton.before(field);
    // Preserve Webflow's real submit control; only the added button opens the wheel.
    originalButton.hidden = true; originalButton.style.display = 'none'; originalButton.tabIndex = -1;
    const launch = document.createElement('button'); launch.type = 'button'; launch.className = 'bw-submit'; launch.textContent = 'Spin to Win';
    originalButton.before(launch);
    const reopen = launch.cloneNode(true); reopen.textContent = 'View My Prize'; success.append(reopen);
    const inlineStatus = document.createElement('p'); inlineStatus.className = 'bw-wheel-inline-status'; inlineStatus.setAttribute('role', 'status'); launch.after(inlineStatus);
    const dialog = document.createElement('dialog'); dialog.className = 'bw-wheel-modal'; dialog.setAttribute('aria-labelledby', 'bw-wheel-heading');
    dialog.innerHTML = '<div class="bw-wheel-panel"><button class="bw-wheel-close" type="button" aria-label="Close prize window">×</button><div class="bw-wheel-kicker">A1 COMBAT × BULLWAVES</div><h2 id="bw-wheel-heading"></h2><p class="bw-wheel-intro"></p><div class="bw-wheel-content"></div><p class="bw-wheel-status" role="status" aria-live="polite"></p><div class="bw-wheel-actions"></div><p class="bw-wheel-footnote">Dubai, 28 November 2026</p></div>';
    document.body.append(dialog);
    const $ = selector => dialog.querySelector(selector);
    const heading = $('#bw-wheel-heading'), intro = $('.bw-wheel-intro'), content = $('.bw-wheel-content'), actions = $('.bw-wheel-actions'), status = $('.bw-wheel-status'), close = $('.bw-wheel-close');
    let record = read(), busy = false, submitting = false, nativeAllowed = false, timer, returnFocus, previousOverflow;
    function button(label, handler, secondary) {
      const el = document.createElement('button'); el.type = 'button'; el.className = 'bw-wheel-button' + (secondary ? ' bw-wheel-secondary' : ''); el.textContent = label; el.addEventListener('click', handler); actions.append(el); return el;
    }
    function reset(title, description) { heading.textContent = title; intro.textContent = description; content.replaceChildren(); actions.replaceChildren(); status.textContent = ''; }
    function setBusy(value) { busy = value; close.disabled = value; }
    function open() { if (!dialog.open) { returnFocus = document.activeElement; previousOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden'; dialog.showModal(); close.focus(); } }
    function dismiss() { if (!busy) dialog.close(); }
    close.addEventListener('click', dismiss);
    dialog.addEventListener('cancel', event => { if (busy) event.preventDefault(); });
    dialog.addEventListener('close', () => { document.body.style.overflow = previousOverflow || ''; if (returnFocus && returnFocus.isConnected) returnFocus.focus(); });
    function describe() { return record.category === 'challenge' ? money(record.challenge) + ' Bullwaves Prime Challenge' : CONFIG.labels[record.category]; }
    function restoreFields() {
      first.value = record.first; last.value = record.last; email.value = record.email; profile.value = record.type;
    }
    function hidden(name, value) {
      let input = Array.from(form.elements).find(el => el.name === name);
      if (!input) { input = document.createElement('input'); input.type = 'hidden'; input.name = name; input.dataset.name = name; form.append(input); }
      input.value = value;
    }
    function prepareSubmission() {
      restoreFields();
      hidden('Prize Category', record.category === 'challenge' ? 'Bullwaves Prime Challenge' : CONFIG.labels[record.category]);
      hidden('Prize Details', describe());
      hidden('Prize Value', record.category === 'challenge' ? money(CONFIG.challenges[record.challenge]) + ' retail value, not cash' : record.category === 'bonus' ? '$800 tradable bonus, not cash' : '1 VIP Ticket, no additional ticket');
      hidden('Claim ID', record.id); hidden('Participation Date', record.date);
    }
    function draw(keys, challenge) {
      const wrap = document.createElement('div'); wrap.className = 'bw-wheel-stage';
      const pointer = document.createElement('div'); pointer.className = 'bw-wheel-pointer'; pointer.setAttribute('aria-hidden', 'true');
      const canvas = document.createElement('canvas'); canvas.width = 900; canvas.height = 900; canvas.className = 'bw-wheel-disc'; canvas.setAttribute('role', 'img');
      canvas.setAttribute('aria-label', 'Available prizes: ' + keys.map(key => challenge ? money(key) + ' challenge' : CONFIG.labels[key]).join(', '));
      const ctx = canvas.getContext('2d'), arc = Math.PI * 2 / keys.length;
      keys.forEach((key, i) => {
        const start = i * arc - Math.PI / 2;
        ctx.beginPath(); ctx.moveTo(450, 450); ctx.arc(450, 450, 426, start, start + arc); ctx.closePath();
        ctx.fillStyle = ['#0036ff', '#15285a', '#253451'][i % 3]; ctx.fill(); ctx.strokeStyle = '#6387ff'; ctx.lineWidth = 2; ctx.stroke();
        ctx.save(); ctx.translate(450, 450); ctx.rotate(start + arc / 2); ctx.translate(277, 0); ctx.rotate(Math.PI / 2);
        ctx.textAlign = 'center'; ctx.fillStyle = '#fff'; ctx.font = '600 34px Inter, Arial, sans-serif';
        const lines = challenge ? [money(key), 'Challenge'] : key === 'ticket' ? ['1 VIP', 'Ticket'] : key === 'bonus' ? ['$800', 'Trading Bonus'] : ['Prime', 'Challenge'];
        lines.forEach((line, lineIndex) => ctx.fillText(line, 0, (lineIndex - .5) * 44, 250)); ctx.restore();
      });
      ctx.beginPath(); ctx.arc(450, 450, 94, 0, Math.PI * 2); ctx.fillStyle = '#090d19'; ctx.fill(); ctx.strokeStyle = '#6482f0'; ctx.lineWidth = 3; ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.font = '700 26px Inter, Arial, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('BULL', 450, 443); ctx.fillText('WAVES', 450, 477);
      wrap.append(pointer, canvas); content.append(wrap);
      const legend = document.createElement('p'); legend.className = 'bw-wheel-legend';
      legend.textContent = keys.map(key => challenge ? money(key) + ' challenge, retail value ' + money(CONFIG.challenges[key]) : CONFIG.labels[key]).join(' • '); content.append(legend);
      return canvas;
    }
    async function animate(canvas, keys, selected) {
      setBusy(true); actions.querySelectorAll('button').forEach(el => el.disabled = true); status.textContent = 'Your prize is being revealed…';
      const step = 360 / keys.length, index = keys.indexOf(selected);
      const target = 360 * 6 + 360 - (index + .5) * step;
      const duration = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : CONFIG.duration;
      if (duration && canvas.animate) {
        const animation = canvas.animate([{ transform: 'rotate(0deg)' }, { transform: 'rotate(' + target + 'deg)' }], { duration, easing: 'cubic-bezier(.18,.04,.12,1)', fill: 'forwards' });
        try { await animation.finished; } catch (_) {} canvas.style.transform = 'rotate(' + target + 'deg)'; animation.cancel();
      } else canvas.style.transform = 'rotate(' + target + 'deg)';
      setBusy(false);
    }
    function keysFor(weights) { return Object.keys(weights).filter(key => weights[key] > 0); }
    function firstWheel() {
      reset('Your moment to win.', 'Spin to reveal your Fight Night reward. Every spin wins.');
      const type = profile.value, keys = keysFor(CONFIG.categoryWeights[type]), canvas = draw(keys, false);
      button('Spin to Win', async () => {
        // Recheck storage after opening, so another tab cannot normally start a second draw.
        const existing = read(); if (existing) { record = existing; restoreFields(); resume(); return; }
        const category = pick(CONFIG.categoryWeights[type]);
        record = { version: 1, id: claimID(), first: first.value.trim(), last: last.value.trim(), email: email.value.trim().toLowerCase(), type, category,
          challenge: category === 'challenge' ? pick(CONFIG.challengeWeights[type]) : null,
          stage: category === 'challenge' ? 'challenge' : 'ready', date: new Date().toISOString() };
        // Both results are committed before animation. Refreshing never rerolls either wheel.
        if (!save(record)) { record = null; status.textContent = 'Please allow browser storage before spinning so we can keep your prize.'; return; }
        launch.textContent = 'View My Prize'; await animate(canvas, keys, category);
        if (record.stage === 'challenge') secondWheel(); else submit();
      });
    }
    function secondWheel() {
      reset('A Prime Challenge is yours.', 'Spin once more to reveal your challenge account size. Challenge values are retail prices, not cash prizes.');
      const keys = keysFor(CONFIG.challengeWeights[record.type]), canvas = draw(keys, true);
      button('Reveal My Challenge', async () => {
        record.stage = 'ready';
        if (!save(record)) { record.stage = 'challenge'; status.textContent = 'Your browser could not save your progress. Please enable storage and try again.'; return; }
        await animate(canvas, keys, record.challenge); submit();
      });
    }
    function pending(message, retry) {
      reset('Your prize is reserved.', describe());
      const id = document.createElement('p'); id.className = 'bw-wheel-claim-id'; id.textContent = record.id; content.append(id);
      status.textContent = message;
      if (retry) button('Retry Registration', submit);
    }
    function submit() {
      if (submitting) return;
      prepareSubmission();
      if (!form.checkValidity()) { pending('Please close this window and complete the required form fields, then try again.', true); return; }
      if (!window.Webflow || typeof window.Webflow.require !== 'function' || !window.Webflow.require('forms')) {
        pending('Registration is available on the published website. Your prize is saved, please try again there.', true); return;
      }
      pending('Saving your entry securely with Webflow…', false);
      submitting = true; setBusy(true);
      // Hide old feedback before observing the NEW native response.
      success.style.display = 'none'; failure.style.display = 'none';
      nativeAllowed = true;
      try { form.requestSubmit(originalButton); }
      catch (_) { submissionFailed('We could not send your entry. Your prize is saved, please retry.'); }
      finally { nativeAllowed = false; }
      if (submitting) timer = setTimeout(() => {
        // An ambiguous timeout is not a confirmed failure. Do not invite a duplicate submission.
        setBusy(false); status.textContent = 'Confirmation is taking longer than expected. Your prize is saved. Please wait or contact support before sending another entry.';
        button('Contact Support', () => window.open(record.category === 'challenge' ? CONFIG.support.prime : CONFIG.support.broker, '_blank', 'noopener,noreferrer'));
      }, 45000);
    }
    function submissionFailed(message) { clearTimeout(timer); submitting = false; setBusy(false); pending(message, true); }
    const visible = el => getComputedStyle(el).display !== 'none' && !el.hidden;
    new MutationObserver(() => {
      if (!submitting) return;
      if (visible(success)) {
        clearTimeout(timer); submitting = false; setBusy(false); record.stage = 'submitted'; save(record); finalScreen();
      } else if (visible(failure)) submissionFailed('Webflow could not save your entry. Retry below, your prize and Claim ID will stay the same.');
    }).observe(block, { attributes: true, attributeFilter: ['style', 'class', 'hidden'], childList: true, subtree: true });
    function finalScreen() {
      reset('Congratulations!', "You've won " + describe() + '.');
      if (record.category === 'challenge') {
        const value = document.createElement('p'); value.className = 'bw-wheel-value'; value.textContent = 'Challenge retail value ' + money(CONFIG.challenges[record.challenge]) + ', not a cash prize.'; content.append(value);
      }
      const id = document.createElement('p'); id.className = 'bw-wheel-claim-id'; id.textContent = record.id; content.append(id);
      const note = document.createElement('p'); note.className = 'bw-wheel-help'; note.textContent = 'Copy your message and paste it into the support chat. Our team will verify your email, prize and Claim ID against your registration.'; content.append(note);
      const message = 'Hello ' + (record.category === 'challenge' ? 'Bullwaves Prime' : 'Bullwaves') + ' Support,\n\nI participated in the A1 Combat × Bullwaves Dubai giveaway and won ' + describe() + '.\n\nName: ' + record.first + ' ' + record.last + '\nEmail: ' + record.email + '\nPrize: ' + describe() + (record.category === 'challenge' ? '\nChallenge retail value: ' + money(CONFIG.challenges[record.challenge]) : '') + '\nClaim ID: ' + record.id + '\n\nI would like to claim my prize. Could you please help me with the next steps?\n\nThank you!';
      const textarea = document.createElement('textarea'); textarea.className = 'bw-wheel-message'; textarea.readOnly = true; textarea.setAttribute('aria-label', 'Your claim message'); textarea.value = message; content.append(textarea);
      button('Copy Claim Message', async () => {
        try { await navigator.clipboard.writeText(message); status.textContent = 'Message copied!'; }
        catch (_) { textarea.focus(); textarea.select(); let copied = false; try { copied = document.execCommand('copy'); } catch (_) {} status.textContent = copied ? 'Message copied!' : 'Select and copy the message above, then paste it into support chat.'; }
      });
      const support = document.createElement('a'); support.className = 'bw-wheel-button bw-wheel-secondary'; support.textContent = 'Contact Support'; support.href = record.category === 'challenge' ? CONFIG.support.prime : CONFIG.support.broker; support.target = '_blank'; support.rel = 'noopener noreferrer'; actions.append(support);
      launch.textContent = 'View My Prize';
    }
    function resume() {
      if (submitting) return;
      if (record.stage === 'submitted') finalScreen();
      else if (record.stage === 'challenge') secondWheel();
      else pending('Your prize is saved. Complete registration to contact support and claim it.', true);
    }
    function start() {
      if (busy) return;
      record = read() || record;
      if (record) { restoreFields(); open(); resume(); return; }
      first.value = first.value.trim(); last.value = last.value.trim(); email.value = email.value.trim();
      if (!form.reportValidity()) return;
      inlineStatus.textContent = '';
      open(); firstWheel();
    }
    launch.addEventListener('click', start); reopen.addEventListener('click', start);
    // Intercept only an unsolicited submission, never the authorized native send.
    form.addEventListener('submit', event => {
      if (nativeAllowed) return;
      event.preventDefault(); event.stopImmediatePropagation(); start();
    }, true);
    form.addEventListener('keydown', event => {
      if (event.key === 'Enter' && event.target.matches('input:not([type="submit"])')) { event.preventDefault(); start(); }
    });
    if (record) { restoreFields(); launch.textContent = 'View My Prize'; inlineStatus.textContent = 'Your existing prize is saved in this browser.'; }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true }); else init();
})();
