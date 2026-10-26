(function () {
  'use strict';

  var PD = window.PD;
  var CFG = PD.cfg || {};
  window.__pdReady = true;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  var FEE_MULTIPLIER = 1.5;
  var VAT_RATE = 0.21;
  var RENT_MIN = 500;
  var RENT_MAX = 4000;

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };

  /* ------------------------------------------------------------------ hero */

  var hero = $('.hero');

  // Video: poster first, video starts after the page has loaded. Poster only for reduced motion,
  // Save-Data and very slow connections. media/hero.mp4 can be swapped for another file without code changes.
  function initHeroVideo() {
    var video = $('#hero-video');
    if (!video || !hero) return;
    var conn = navigator.connection || {};
    var lowData = conn.saveData || /(^|-)2g$/.test(conn.effectiveType || '') || window.matchMedia('(prefers-reduced-data: reduce)').matches;
    if (reduced || lowData) {
      // A calm still beats a shaky video: slow Ken Burns on the poster (not for reduced motion).
      if (!reduced) video.parentNode.classList.add('kb');
      return;
    }
    var started = false;

    function start() {
      if (started) return;
      started = true;
      [['assets/media/hero.webm', 'video/webm'], ['assets/media/hero.mp4', 'video/mp4']].forEach(function (s) {
        var src = document.createElement('source');
        src.src = s[0];
        src.type = s[1];
        video.appendChild(src);
      });
      video.addEventListener('playing', function () { video.classList.add('on'); video.parentNode.classList.add('video-on'); }, { once: true });
      video.load();
      var p = video.play();
      if (p && p.catch) p.catch(function () { /* autoplay blocked: the poster stays */ });
    }
    function whenIdle() {
      if (window.requestIdleCallback) window.requestIdleCallback(start, { timeout: 2500 });
      else setTimeout(start, 600);
    }
    if (document.readyState === 'complete') whenIdle();
    else window.addEventListener('load', whenIdle, { once: true });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!started) return;
          if (en.isIntersecting) { var p = video.play(); if (p && p.catch) p.catch(function () {}); }
          else video.pause();
        });
      }).observe(hero);
    }
  }

  // Magnetic primary button and a tiny cursor glow, only for fine pointers
  function initPointerEffects() {
    if (!finePointer || reduced) return;

    var wrap = $('.magnet-wrap');
    var btn = $('#cta-main');
    if (hero && wrap && btn) {
      var reset = function () { btn.style.setProperty('--tx', '0px'); btn.style.setProperty('--ty', '0px'); };
      hero.addEventListener('pointermove', function (e) {
        var r = wrap.getBoundingClientRect();
        var dx = e.clientX - (r.left + r.width / 2);
        var dy = e.clientY - (r.top + r.height / 2);
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          btn.style.setProperty('--tx', clamp(dx * 0.22, -10, 10).toFixed(1) + 'px');
          btn.style.setProperty('--ty', clamp(dy * 0.28, -8, 8).toFixed(1) + 'px');
        } else {
          reset();
        }
      }, { passive: true });
      hero.addEventListener('pointerleave', reset);
    }

    var glow = $('#cursor-glow');
    if (glow) {
      var tx = 0, ty = 0, cx = 0, cy = 0, running = false;
      var loop = function () {
        cx += (tx - cx) * 0.18;
        cy += (ty - cy) * 0.18;
        glow.style.transform = 'translate3d(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px,0)';
        if (Math.abs(tx - cx) > 0.3 || Math.abs(ty - cy) > 0.3) requestAnimationFrame(loop);
        else running = false;
      };
      document.addEventListener('pointermove', function (e) {
        if (e.pointerType && e.pointerType !== 'mouse') return;
        tx = e.clientX; ty = e.clientY;
        if (!glow.classList.contains('on')) { cx = tx; cy = ty; glow.classList.add('on'); }
        if (!running) { running = true; requestAnimationFrame(loop); }
      }, { passive: true });
      document.documentElement.addEventListener('pointerleave', function () { glow.classList.remove('on'); });
    }

    // Subtle tilt on the founders' monograms
    $$('[data-tilt]').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--ry', (((e.clientX - r.left) / r.width - 0.5) * 14).toFixed(1) + 'deg');
        el.style.setProperty('--rx', ((0.5 - (e.clientY - r.top) / r.height) * 14).toFixed(1) + 'deg');
      });
      el.addEventListener('pointerleave', function () { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); });
    });

    // Spotlight inside cards
    document.addEventListener('pointermove', function (e) {
      var t = e.target.closest ? e.target.closest('.spot') : null;
      if (!t) return;
      var r = t.getBoundingClientRect();
      t.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      t.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }, { passive: true });
  }

  // Scroll to an element below the sticky header (smooth unless reduced motion)
  function goTo(el) {
    if (!el) return;
    var top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: top, behavior: reduced ? 'auto' : 'smooth' });
  }

  /* ------------------------------------------------------------------ Amsterdam now + time-of-day tint */

  function initClock() {
    var el = $('#ams-time');
    if (el && window.Intl && Intl.DateTimeFormat) {
      var fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Amsterdam', hour: '2-digit', minute: '2-digit', hour12: false });
      var tickClock = function () { el.textContent = fmt.format(new Date()); };
      tickClock();
      setInterval(tickClock, 15000);
    }
    if (hero) {
      var hr = new Date().getHours();
      var tod = hr >= 5 && hr < 8 ? 'dawn' : hr >= 8 && hr < 17 ? 'day' : hr >= 17 && hr < 21 ? 'dusk' : 'night';
      hero.classList.add('tod', 'tod-' + tod);
    }
  }

  /* ------------------------------------------------------------------ scroll effects */

  var header = $('#site-header');
  var heroMedia = $('.hero-media');
  var dClip = $('#dclip-rect');
  var wordmark = $('#wordmark');
  var statementWords = [];
  var navLinks = $$('nav.menu a');
  var sectionIds = ['how', 'who', 'fee', 'register', 'about', 'faq'];
  var vis = { stmt: false, how: false, who: false };
  var menuOpen = false;
  var stmtArmed = false;

  function splitStatement() {
    var el = $('#stmt');
    if (!el) return;
    var words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    statementWords = words.map(function (word, i) {
      var span = document.createElement('span');
      span.className = 'w';
      span.textContent = word + (i < words.length - 1 ? ' ' : '');
      el.appendChild(span);
      return span;
    });
    updateStatement();
  }

  function updateStatement() {
    var el = $('#stmt');
    if (!el || !statementWords.length || !stmtArmed) return;
    if (reduced) { statementWords.forEach(function (w) { w.style.opacity = 1; }); return; }
    var vh = window.innerHeight;
    var r = el.getBoundingClientRect();
    var p = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.2), 0, 1);
    var n = statementWords.length;
    statementWords.forEach(function (w, i) {
      var o = clamp((p * (n + 4) - i) / 4, 0, 1);
      w.style.opacity = (0.18 + 0.82 * o).toFixed(3);
    });
  }

  function updateHow() {
    var ol = $('#how-steps');
    if (!ol) return;
    var vh = window.innerHeight;
    var r = ol.getBoundingClientRect();
    var trig = vh * 0.56;
    ol.style.setProperty('--p', clamp((trig - r.top) / r.height, 0, 1).toFixed(4));
    var steps = $$('.how-step', ol);
    var active = -1;
    steps.forEach(function (s, i) { if (s.getBoundingClientRect().top < trig) active = i; });
    steps.forEach(function (s, i) {
      s.classList.toggle('is-active', i === active);
      s.classList.toggle('is-past', i < active);
    });
  }

  function updateParallax() {
    if (reduced) return;
    var vh = window.innerHeight;
    $$('[data-par]').forEach(function (fig) {
      var r = fig.getBoundingClientRect();
      if (r.bottom < -50 || r.top > vh + 50) return;
      var p = clamp((r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2), -1, 1);
      fig.style.setProperty('--py', (-p * 12).toFixed(1) + 'px');
    });
  }

  var ticking = false;
  function tick() {
    ticking = false;
    var y = window.scrollY;
    var vh = window.innerHeight;
    var max = document.documentElement.scrollHeight - vh;
    if (!stmtArmed && y > 0) { stmtArmed = true; }
    header.classList.toggle('is-solid', y > 80);
    var prog = max > 0 ? clamp(y / max, 0, 1) : 0;
    if (dClip) {
      var fillH = 120 * prog;
      dClip.setAttribute('y', (120 - fillH).toFixed(1));
      dClip.setAttribute('height', fillH.toFixed(1));
    }
    if (wordmark) wordmark.classList.toggle('lit', prog > 0.985);

    if (hero && !reduced && y < vh * 1.1) {
      var inner = $('#hero-inner');
      var k = clamp(y / (vh * 0.75), 0, 1);
      heroMedia.style.setProperty('--vy', Math.min(y * 0.08, 40).toFixed(1) + 'px');
      inner.style.transform = k > 0 ? 'translate3d(0,' + (y * 0.12).toFixed(1) + 'px,0)' : '';
      inner.style.opacity = k > 0 ? (1 - k * 0.92).toFixed(3) : '';
    }
    if (vis.stmt) updateStatement();
    if (vis.how) updateHow();
    if (vis.who) updateParallax();

    var current = '';
    sectionIds.forEach(function (id) {
      var s = document.getElementById(id);
      if (s && s.getBoundingClientRect().top < vh * 0.4) current = id;
    });
    navLinks.forEach(function (a) {
      var on = a.getAttribute('href') === '#' + current;
      a.classList.toggle('is-current', on);
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });

    var fab = $('#fab');
    var reg = $('#register');
    if (fab && reg) {
      var rr = reg.getBoundingClientRect();
      var inReg = rr.top < vh * 0.7 && rr.bottom > vh * 0.2;
      fab.classList.toggle('show', y > vh * 0.8 && !inReg && !menuOpen);
    }
  }
  function requestTick() {
    if (!ticking) { ticking = true; requestAnimationFrame(tick); }
  }
  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', requestTick);

  if ('IntersectionObserver' in window) {
    var watch = function (sel, key) {
      var el = $(sel);
      if (!el) return;
      new IntersectionObserver(function (entries) {
        vis[key] = entries[0].isIntersecting;
        if (vis[key]) requestTick();
      }, { rootMargin: '120px 0px' }).observe(el);
    };
    watch('#statement', 'stmt');
    watch('#how', 'how');
    watch('#who', 'who');
  } else {
    vis.stmt = vis.how = vis.who = true;
  }

  // Reveal on scroll. Reduced motion and old browsers see everything at once.
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0, rootMargin: '0px 0px -6% 0px' });
    $$('[data-reveal]').forEach(function (n) { io.observe(n); });
  } else {
    $$('[data-reveal]').forEach(function (n) { n.classList.add('in'); });
  }

  /* ------------------------------------------------------------------ menu (full-screen overlay, focus trap) */

  var menuBtn = $('#menu-btn');
  var mobileMenu = $('#mobile-menu');
  var inertTargets = [];

  function menuLabel() {
    menuBtn.setAttribute('aria-label', PD.t(menuOpen ? 'menuClose' : 'menuOpen'));
  }
  function setMenu(open, restoreFocus) {
    if (open === menuOpen) return;
    menuOpen = open;
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuLabel();
    header.classList.toggle('menu-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    inertTargets = $$('main, .site-footer, #fab');
    inertTargets.forEach(function (el) { if (open) el.setAttribute('inert', ''); else el.removeAttribute('inert'); });
    if (open) {
      mobileMenu.hidden = false;
      void mobileMenu.offsetWidth;
      mobileMenu.classList.add('open');
      var first = $('a', mobileMenu);
      if (first) setTimeout(function () { first.focus({ preventScroll: true }); }, 60);
    } else {
      mobileMenu.classList.remove('open');
      setTimeout(function () { if (!menuOpen) mobileMenu.hidden = true; }, reduced ? 0 : 360);
      if (restoreFocus) menuBtn.focus();
    }
  }
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () { setMenu(!menuOpen, false); });
    $$('a', mobileMenu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false, false); }); });
    document.addEventListener('keydown', function (e) {
      if (!menuOpen) return;
      if (e.key === 'Escape') { e.preventDefault(); setMenu(false, true); return; }
      if (e.key !== 'Tab') return;
      var items = $$('a[href], button:not([disabled])', header).concat($$('a[href]', mobileMenu)).filter(function (n) { return n.offsetParent !== null; });
      if (!items.length) return;
      var firstEl = items[0], lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) { e.preventDefault(); lastEl.focus(); }
      else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); firstEl.focus(); }
    });
    window.addEventListener('resize', function () { if (window.innerWidth > 960) setMenu(false, false); });
  }

  /* ------------------------------------------------------------------ fee calculator */

  var rentRange = $('#rent');
  var rentNum = $('#rent-num');
  var oFee = $('#o-fee');
  var oVat = $('#o-vat');
  var oTotal = $('#o-total');
  var bFee = $('#b-fee');
  var bVat = $('#b-vat');
  var liveEl = $('#calc-live');
  var shown = { fee: 0, vat: 0, total: 0 };
  var tweenId = 0;
  var liveTimer = 0;
  var currentRent = 1500;
  if (rentRange && Number(rentRange.value)) currentRent = Number(rentRange.value);

  function calc(rent) {
    var fee = rent * FEE_MULTIPLIER;
    var vat = fee * VAT_RATE;
    return { fee: fee, vat: vat, total: fee + vat };
  }
  function paint(v, rounded) {
    var f = rounded ? Math.round : function (n) { return n; };
    oFee.textContent = PD.eur(f(v.fee));
    oVat.textContent = PD.eur(f(v.vat));
    oTotal.textContent = PD.eur(f(v.total));
  }
  function tweenTo(target) {
    cancelAnimationFrame(tweenId);
    if (reduced) { shown = target; paint(shown, false); return; }
    var from = { fee: shown.fee, vat: shown.vat, total: shown.total };
    var t0 = performance.now();
    var dur = 520;
    (function step(now) {
      var k = clamp((now - t0) / dur, 0, 1);
      var e = 1 - Math.pow(1 - k, 4);
      shown = {
        fee: from.fee + (target.fee - from.fee) * e,
        vat: from.vat + (target.vat - from.vat) * e,
        total: from.total + (target.total - from.total) * e
      };
      paint(k < 1 ? shown : target, k < 1);
      if (k < 1) tweenId = requestAnimationFrame(step);
      else shown = target;
    })(t0);
  }
  function announce() {
    clearTimeout(liveTimer);
    liveTimer = setTimeout(function () {
      var c = calc(currentRent);
      liveEl.textContent = PD.t('calcLive')
        .replace('{rent}', PD.eur(currentRent)).replace('{fee}', PD.eur(c.fee))
        .replace('{vat}', PD.eur(c.vat)).replace('{total}', PD.eur(c.total));
    }, 800);
  }
  function setRent(v, source) {
    v = clamp(Math.round(v), RENT_MIN, RENT_MAX);
    currentRent = v;
    if (source !== 'slider') rentRange.value = v;
    if (source !== 'num') rentNum.value = String(v);
    rentRange.style.setProperty('--fill', ((v - RENT_MIN) / (RENT_MAX - RENT_MIN) * 100).toFixed(1) + '%');
    var target = calc(v);
    var maxTotal = calc(RENT_MAX).total;
    bFee.style.width = (target.fee / maxTotal * 100).toFixed(1) + '%';
    bVat.style.width = (target.vat / maxTotal * 100).toFixed(1) + '%';
    tweenTo(target);
    announce();
  }
  if (rentRange && rentNum) {
    rentRange.addEventListener('input', function () { setRent(Number(rentRange.value), 'slider'); });
    rentNum.addEventListener('input', function () {
      var digits = rentNum.value.replace(/\D/g, '').slice(0, 5);
      if (digits !== rentNum.value) rentNum.value = digits;
      var v = Number(digits);
      if (digits && v >= RENT_MIN && v <= RENT_MAX) setRent(v, 'num');
    });
    rentNum.addEventListener('change', function () {
      var v = Number(rentNum.value.replace(/\D/g, ''));
      setRent(v ? v : currentRent, 'change');
    });
    rentNum.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        var base = Number(rentNum.value.replace(/\D/g, '')) || currentRent;
        setRent(base + (e.key === 'ArrowUp' ? 50 : -50), 'change');
      }
    });
  }

  function renderAmounts() {
    $$('[data-rent]').forEach(function (row) {
      var rent = Number(row.getAttribute('data-rent'));
      var c = calc(rent);
      var cells = row.children;
      cells[0].textContent = PD.eur(rent);
      cells[1].textContent = PD.eur(c.fee);
      cells[2].textContent = PD.eur(c.vat);
      cells[3].textContent = PD.eur(c.total);
    });
    $$('.scale span').forEach(function (n, i) { n.textContent = PD.eur(i ? RENT_MAX : RENT_MIN); });
    if (oFee) { cancelAnimationFrame(tweenId); shown = calc(currentRent); paint(shown, false); announce(); }
  }

  /* ------------------------------------------------------------------ registration form + live profile */

  var TOTAL_STEPS = 3;
  var form = $('#intake');
  var panes = $$('.pane', form);
  var stepCount = $('#step-count');
  var stepName = $('#step-name');
  var barTrack = $('#bar-track');
  var prevBtn = $('#prev');
  var nextBtn = $('#next');
  var sendBtn = $('#send');
  var errEl = $('#err');
  var thanks = $('#thanks');
  var profile = $('#profile');
  var pStatus = $('#p-status');
  var pStatusText = $('#p-status-text');
  var pMeter = $('#p-meter');
  var step = 1;
  var sent = false;
  var sendError = false;
  var msgKeys = {};

  var PANE_FIELDS = { 1: ['type', 'regio', 'duration'], 2: ['budget', 'start', 'people'], 3: ['role', 'naam', 'email', 'akkoord'] };
  var RADIOS = ['type', 'duration', 'budget', 'start', 'people', 'role'];

  function field(id) { return document.getElementById(id); }
  function checked(name) { return form.querySelector('input[name="' + name + '"]:checked'); }

  function readProfile() {
    var out = {};
    RADIOS.forEach(function (k) {
      var c = checked(k);
      out[k] = c ? c.nextElementSibling.textContent : '';
    });
    out.region = field('regio').value.trim();
    return out;
  }

  function syncProfile(flashKey) {
    var data = readProfile();
    var filled = 0;
    $$('.p-row', profile).forEach(function (row) {
      var k = row.getAttribute('data-k');
      var text = data[k] || '';
      var dd = row.querySelector('dd');
      if (text) filled++;
      var next = text || '—';
      var changed = dd.textContent !== next;
      dd.textContent = next;
      row.classList.toggle('is-set', !!text);
      if (changed && text && flashKey === k && !reduced) {
        row.classList.remove('flash');
        void row.offsetWidth;
        row.classList.add('flash');
      }
    });
    pMeter.style.setProperty('--m', (filled / 7).toFixed(3));
    var state = sent ? 'sent' : (filled === 7 ? 'ready' : 'draft');
    pStatus.setAttribute('data-state', state);
    pStatusText.textContent = PD.t(state === 'sent' ? 'cardSent' : state === 'ready' ? 'cardReady' : 'cardDraft');
    pStatusText.removeAttribute('data-i18n');
  }

  /* validation: returns the message key, or '' when the field is fine */
  function problem(name) {
    switch (name) {
      case 'type': return checked('type') ? '' : 'eType';
      case 'regio': return field('regio').value.trim() ? '' : 'eRegion';
      case 'duration': return checked('duration') ? '' : 'eDuration';
      case 'budget': return checked('budget') ? '' : 'eBudget';
      case 'start': return checked('start') ? '' : 'eStart';
      case 'people': return checked('people') ? '' : 'ePeople';
      case 'role': return checked('role') ? '' : 'eRole';
      case 'naam': return field('naam').value.trim() ? '' : 'eName';
      case 'email': return /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(field('email').value.trim()) ? '' : 'eMail';
      case 'akkoord': return field('akkoord').checked ? '' : 'eConsent';
    }
    return '';
  }
  function messageEl(name) { return form.querySelector('[data-msg="' + name + '"]'); }
  function controlFor(name) {
    var map = { regio: 'regio', naam: 'naam', email: 'email', akkoord: 'akkoord' };
    return map[name] ? field(map[name]) : form.querySelector('input[name="' + name + '"]');
  }
  function showMsg(name, key) {
    var el = messageEl(name);
    if (!el) return;
    msgKeys[name] = key;
    el.textContent = key ? PD.t(key) : '';
    if (!el.id) el.id = 'msg-' + name;
    var ctl = controlFor(name);
    if (ctl && ['regio', 'naam', 'email'].indexOf(name) !== -1) {
      if (key) { ctl.setAttribute('aria-invalid', 'true'); ctl.setAttribute('aria-describedby', el.id); }
      else { ctl.removeAttribute('aria-invalid'); ctl.removeAttribute('aria-describedby'); }
    }
  }
  function renderMessages() {
    Object.keys(msgKeys).forEach(function (name) { if (msgKeys[name]) showMsg(name, msgKeys[name]); });
  }

  function renderStatus() {
    stepCount.textContent = PD.t('stepOf').replace('{n}', step).replace('{m}', TOTAL_STEPS);
    stepName.textContent = PD.t('st' + step);
    stepName.removeAttribute('data-i18n');
    form.style.setProperty('--f', (step / TOTAL_STEPS).toFixed(3));
    barTrack.setAttribute('aria-valuenow', step);
    barTrack.setAttribute('aria-valuetext', stepCount.textContent);
  }

  function showStep(n, moveFocus, dir) {
    step = n;
    panes.forEach(function (pane) {
      var on = Number(pane.getAttribute('data-pane')) === n;
      pane.hidden = !on;
      pane.classList.remove('enter-next', 'enter-prev');
      if (on && dir && !reduced) {
        void pane.offsetWidth;
        pane.classList.add(dir === 'back' ? 'enter-prev' : 'enter-next');
      }
    });
    prevBtn.hidden = n === 1;
    nextBtn.hidden = n === TOTAL_STEPS;
    sendBtn.hidden = n !== TOTAL_STEPS;
    renderStatus();
    if (moveFocus) {
      var top = form.getBoundingClientRect().top;
      if (top < 90) window.scrollTo({ top: window.scrollY + top - 110, behavior: reduced ? 'auto' : 'smooth' });
      var first = form.querySelector('.pane[data-pane="' + n + '"] input:not([type=hidden]):not([tabindex="-1"])');
      if (first) first.focus({ preventScroll: true });
    }
  }

  function validatePane(n) {
    var firstBad = null;
    PANE_FIELDS[n].forEach(function (name) {
      var key = problem(name);
      showMsg(name, key);
      if (key && !firstBad) firstBad = controlFor(name);
    });
    if (firstBad) firstBad.focus({ preventScroll: false });
    return !firstBad;
  }

  function collect() {
    return {
      naam: field('naam').value.trim(),
      email: field('email').value.trim(),
      telefoon: field('tel').value.trim(),
      op_zoek_naar: checked('type').value,
      regio: field('regio').value.trim(),
      huurperiode: checked('duration').value,
      budget: checked('budget').value,
      gewenste_ingangsdatum: checked('start').value,
      aantal_personen: checked('people').value,
      profiel: checked('role').value,
      toestemming: 'Ja',
      taal: PD.lang,
      from_name: 'Property Direct website',
      subject: 'Nieuwe zoekopdracht via Property Direct website'
    };
  }

  function post(data) {
    var controller = typeof AbortController === 'function' ? new AbortController() : null;
    var timer = controller ? setTimeout(function () { controller.abort(); }, 15000) : null;
    return fetch(CFG.FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(Object.assign({ access_key: CFG.FORM_ACCESS_KEY }, data)),
      signal: controller ? controller.signal : undefined
    })
      .then(function (res) { return res.json(); })
      .then(function (json) { return !!(json && json.success === true); })
      .catch(function () { return false; })
      .then(function (ok) { if (timer) clearTimeout(timer); return ok; });
  }

  function renderSendError() {
    errEl.textContent = '';
    if (!sendError) return;
    errEl.appendChild(document.createTextNode(PD.t('eSend') + ' '));
    if (!PD.isPlaceholder(CFG.email)) {
      var d = collect();
      var body = [d.naam, d.email, d.telefoon, d.op_zoek_naar, d.regio, d.huurperiode, d.budget, d.gewenste_ingangsdatum, d.aantal_personen, d.profiel].filter(Boolean).join('\n');
      var a = document.createElement('a');
      a.href = 'mailto:' + CFG.email + '?subject=' + encodeURIComponent(PD.t('mailSubject')) + '&body=' + encodeURIComponent(body);
      a.textContent = PD.t('mailLink');
      errEl.appendChild(a);
    }
  }

  function showThanks() {
    sent = true;
    panes.forEach(function (pane) { pane.hidden = true; });
    $('.form-top', form).hidden = true;
    barTrack.hidden = true;
    errEl.hidden = true;
    $('.actions', form).hidden = true;
    thanks.hidden = false;
    profile.classList.add('is-sent');
    syncProfile();
    thanks.focus({ preventScroll: true });
    var top = form.getBoundingClientRect().top;
    if (top < 90 || top > window.innerHeight * 0.5) window.scrollTo({ top: window.scrollY + top - 110, behavior: reduced ? 'auto' : 'smooth' });
  }

  if (form) {
    form.addEventListener('change', function (e) {
      var name = e.target.name;
      if (!name) return;
      if (name === 'akkoord' || RADIOS.indexOf(name) !== -1) showMsg(name, problem(name));
      syncProfile(name === 'regio' ? 'region' : name);
    });
    ['regio', 'naam', 'email'].forEach(function (id) {
      var el = field(id);
      el.addEventListener('blur', function () {
        if (el.value.trim() || msgKeys[id]) showMsg(id, problem(id));
      });
      el.addEventListener('input', function () {
        if (msgKeys[id] && !problem(id)) showMsg(id, '');
        if (id === 'regio') syncProfile();
      });
    });

    nextBtn.addEventListener('click', function () {
      if (!validatePane(step)) return;
      showStep(step + 1, true, 'forward');
    });
    prevBtn.addEventListener('click', function () { showStep(step - 1, true, 'back'); });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!validatePane(TOTAL_STEPS)) return;
      // The hidden checkbox is a honeypot: people never tick it.
      if (field('botcheck').checked) return showThanks();

      var data = collect();
      var idle = sendBtn.firstElementChild.textContent;
      sendBtn.disabled = true;
      sendBtn.firstElementChild.textContent = PD.t('sending');
      sendBtn.firstElementChild.removeAttribute('data-i18n');
      sendError = false;
      renderSendError();
      post(data).then(function (ok) {
        sendBtn.disabled = false;
        sendBtn.firstElementChild.textContent = idle;
        sendBtn.firstElementChild.setAttribute('data-i18n', 'send');
        if (ok) { showThanks(); return; }
        sendError = true;
        renderSendError();
        errEl.setAttribute('role', 'alert');
      });
    });
  }

  /* ------------------------------------------------------------------ The Shield: hotspots on a sample lease */

  function initShield() {
    var rows = $$('.lrow');
    if (!rows.length) return;
    var panels = $$('.chk');
    var current = '';
    function show(k, pin) {
      if (k === current && !pin) return;
      current = k;
      rows.forEach(function (r) {
        var on = r.getAttribute('data-k') === k;
        r.classList.toggle('is-active', on);
        r.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      panels.forEach(function (p) { p.hidden = p.getAttribute('data-k') !== k; });
    }
    rows.forEach(function (r) {
      var k = r.getAttribute('data-k');
      r.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') show(k); });
      r.addEventListener('focus', function () { show(k); });
      r.addEventListener('click', function () { show(k, true); });
    });
    show(rows[0].getAttribute('data-k'));
  }

  /* ------------------------------------------------------------------ Where we search: interactive map */

  var toastEl = null;
  function toast(text) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'region-toast'; toastEl.setAttribute('role', 'status'); document.body.appendChild(toastEl); }
    toastEl.textContent = text;
    toastEl.classList.add('show');
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(function () { toastEl.classList.remove('show'); }, 2600);
  }

  function initMap() {
    var map = $('#nl-map');
    if (!map) return;
    var pins = $$('.pin', map);
    pins.forEach(function (p, i) { p.style.setProperty('--k', i); });
    var cityBtns = $$('.city');
    var nameEl = $('#city-name');
    var vibeEl = $('#city-vibe');
    var current = '';
    function preview(k) {
      current = k;
      pins.forEach(function (p) { p.classList.toggle('is-active', p.getAttribute('data-city') === k); });
      cityBtns.forEach(function (b) { b.classList.toggle('is-active', b.getAttribute('data-city') === k); });
      nameEl.textContent = PD.t('c_' + k);
      vibeEl.textContent = PD.t('v_' + k);
    }
    function pick(k) {
      preview(k);
      var reg = field('regio');
      if (reg) {
        reg.value = PD.t('c_' + k);
        reg.dispatchEvent(new Event('input', { bubbles: true }));
        syncProfile('region');
        if (msgKeys.regio) showMsg('regio', '');
      }
      toast(PD.t('mapSet').replace('{city}', PD.t('c_' + k)));
      goTo($('#register'));
      setTimeout(function () { if (reg) reg.focus({ preventScroll: true }); }, reduced ? 0 : 700);
    }
    pins.concat(cityBtns).forEach(function (el) {
      var k = el.getAttribute('data-city');
      el.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') preview(k); });
      el.addEventListener('focus', function () { preview(k); });
      el.addEventListener('click', function () { pick(k); });
    });
    document.addEventListener('pd:lang', function () { if (current) preview(current); });
  }

  /* ------------------------------------------------------------------ FAQ accordion (single open) */

  var faqItems = $$('.faq-item');
  faqItems.forEach(function (item) {
    var btn = $('.faq-q', item);
    btn.addEventListener('click', function () {
      var willOpen = !item.classList.contains('open');
      faqItems.forEach(function (other) {
        other.classList.remove('open');
        $('.faq-q', other).setAttribute('aria-expanded', 'false');
      });
      if (willOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ------------------------------------------------------------------ founders */

  function renderFounders() {
    $$('.founder').forEach(function (fig) {
      var path = (CFG.portraits || {})[fig.getAttribute('data-key')];
      var avatar = $('.avatar', fig);
      var img = $('img', avatar);
      var alt = PD.t('portraitAlt').replace('{name}', fig.getAttribute('data-name'));
      if (img) { img.alt = alt; return; }
      if (!path) return;
      img = document.createElement('img');
      img.src = path;
      img.alt = alt;
      img.width = 220;
      img.height = 220;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.addEventListener('error', function () { img.remove(); });
      avatar.appendChild(img);
    });
  }

  /* ------------------------------------------------------------------ language changes and init */

  document.addEventListener('pd:lang', function () {
    splitStatement();
    renderAmounts();
    if (form) {
      renderStatus();
      renderMessages();
      renderSendError();
      syncProfile();
    }
    if (menuBtn) menuLabel();
    renderFounders();
  });

  var yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  initHeroVideo();
  initClock();
  initPointerEffects();
  splitStatement();
  renderAmounts();
  if (rentRange) {
    shown = calc(currentRent);
    setRent(currentRent, 'init');
    paint(shown, false);
  }
  if (form) {
    showStep(1, false);
    syncProfile();
  }
  renderFounders();
  initShield();
  initMap();
  tick();
})();
