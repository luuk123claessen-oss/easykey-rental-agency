(function () {
  'use strict';

  var PD = window.PD;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Public Web3Forms access key: each key delivers a copy of every registration to one inbox.
  var ACCESS_KEYS = ['fe9f8c84-09c5-4b3f-8d23-d21589cfe188'];
  var ENDPOINT = 'https://api.web3forms.com/submit';
  // Set to true once media/hero.webm and media/hero.mp4 exist (each under 3 MB, silent, 8-12 s loop).
  var HERO_VIDEO = false;

  var FEE_MULTIPLIER = 1.5;
  var VAT_RATE = 0.21;
  var RENT_MIN = 500;
  var RENT_MAX = 4000;

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };

  /* ------------------------------------------------------------------ hero scene */

  function mulberry32(seed) {
    return function () {
      seed = (seed + 0x6D2B79F5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  var scene = { far: null, mid: null, water: null };

  function buildScene() {
    var svg = $('#scene-svg');
    if (!svg) return;
    var NS = 'http://www.w3.org/2000/svg';
    var W = 1600, H = 900, WL = 640;
    var rand = mulberry32(23);

    function el(name, attrs, parent) {
      var n = document.createElementNS(NS, name);
      Object.keys(attrs || {}).forEach(function (k) { n.setAttribute(k, attrs[k]); });
      if (parent) parent.appendChild(n);
      return n;
    }
    function stops(grad, list) {
      list.forEach(function (s) { el('stop', { offset: s[0], 'stop-color': s[1], 'stop-opacity': s[2] }, grad); });
    }

    var defs = el('defs', {}, svg);
    var sky = el('linearGradient', { id: 'sc-sky', x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
    stops(sky, [[0, '#0B1512', 1], [0.6, '#0d1f19', 1], [1, '#12291f', 1]]);
    var emerald = el('radialGradient', { id: 'sc-emerald' }, defs);
    stops(emerald, [[0, '#166E50', 0.6], [1, '#166E50', 0]]);
    var moon = el('radialGradient', { id: 'sc-moon' }, defs);
    stops(moon, [[0, '#B9D1C3', 0.3], [1, '#B9D1C3', 0]]);
    var wglow = el('radialGradient', { id: 'sc-wglow' }, defs);
    stops(wglow, [[0, '#EAF2EC', 0.5], [1, '#EAF2EC', 0]]);
    var fog = el('linearGradient', { id: 'sc-fog', x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
    stops(fog, [[0, '#166E50', 0], [0.7, '#166E50', 0.22], [1, '#166E50', 0]]);
    var wfade = el('linearGradient', { id: 'sc-wfade', x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
    stops(wfade, [[0, '#fff', 0.5], [1, '#fff', 0]]);
    var wover = el('linearGradient', { id: 'sc-wover', x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
    stops(wover, [[0, '#0B1512', 0.35], [1, '#0B1512', 0.96]]);
    var mask = el('mask', { id: 'sc-wmask', maskUnits: 'userSpaceOnUse', x: 0, y: WL, width: W, height: H - WL }, defs);
    el('rect', { x: 0, y: WL, width: W, height: H - WL, fill: 'url(#sc-wfade)' }, mask);

    el('rect', { width: W, height: H, fill: 'url(#sc-sky)' }, svg);
    el('circle', { cx: 1380, cy: 40, r: 900, fill: 'url(#sc-emerald)' }, svg);
    el('circle', { cx: 1240, cy: 130, r: 360, fill: 'url(#sc-moon)' }, svg);

    function gable(type, x, top, w, gh) {
      var d;
      if (type === 'step') {
        var n = 3 + (rand() < 0.4 ? 1 : 0);
        var cw = w * 0.26, sr = (w - cw) / 2 / n, sh = gh / n, left = [];
        for (var i = 1; i <= n; i++) {
          left.push([(i - 1) * sr, i * sh]);
          left.push([i * sr, i * sh]);
        }
        var right = left.slice().reverse().map(function (p) { return [w - p[0], p[1]]; });
        var pts = [[0, 0]].concat(left, right, [[w, 0]]);
        d = pts.map(function (p, i) { return (i ? 'L' : 'M') + (x + p[0]).toFixed(1) + ' ' + (top - p[1]).toFixed(1); }).join('');
      } else if (type === 'bell') {
        d = 'M' + x + ' ' + top +
          ' Q' + (x + w * 0.16) + ' ' + top + ' ' + (x + w * 0.24) + ' ' + (top - gh * 0.5) +
          ' Q' + (x + w * 0.3) + ' ' + (top - gh) + ' ' + (x + w * 0.5) + ' ' + (top - gh) +
          ' Q' + (x + w * 0.7) + ' ' + (top - gh) + ' ' + (x + w * 0.76) + ' ' + (top - gh * 0.5) +
          ' Q' + (x + w * 0.84) + ' ' + top + ' ' + (x + w) + ' ' + top;
      } else if (type === 'neck') {
        d = 'M' + x + ' ' + top + ' L' + (x + w * 0.1) + ' ' + (top - gh * 0.25) + ' L' + (x + w * 0.26) + ' ' + (top - gh * 0.25) +
          ' L' + (x + w * 0.26) + ' ' + (top - gh) + ' L' + (x + w * 0.74) + ' ' + (top - gh) + ' L' + (x + w * 0.74) + ' ' + (top - gh * 0.25) +
          ' L' + (x + w * 0.9) + ' ' + (top - gh * 0.25) + ' L' + (x + w) + ' ' + top;
      } else if (type === 'spout') {
        d = 'M' + x + ' ' + top + ' L' + (x + w * 0.5) + ' ' + (top - gh) + ' L' + (x + w) + ' ' + top;
      } else {
        d = 'M' + x + ' ' + top + ' L' + x + ' ' + (top - gh * 0.18) + ' L' + (x + w) + ' ' + (top - gh * 0.18) + ' L' + (x + w) + ' ' + top;
      }
      return d;
    }

    var shades = ['#0c1b16', '#0f2019', '#112620', '#0d1d18'];
    var types = ['step', 'bell', 'neck', 'spout', 'cornice', 'step', 'neck', 'bell'];
    var windowGroupCount = 0;

    function house(parent, x, w, bodyH, gh, type, shade, opts) {
      var top = WL - bodyH;
      var g = el('g', {}, parent);
      var d = gable(type, x, top + 1, w, gh);
      el('path', { d: d + 'Z', fill: shade }, g);
      el('rect', { x: x, y: top, width: w, height: bodyH, fill: shade }, g);
      el('path', { d: d, fill: 'none', stroke: opts.edge, 'stroke-width': opts.edgeW, 'stroke-opacity': 0.7, 'stroke-linejoin': 'round' }, g);
      if (!opts.windows) return;

      var floors = Math.max(3, Math.min(5, Math.round(bodyH / 64)));
      var fh = (bodyH - 46) / floors;
      var cols = w > 104 ? 3 : 2;
      var ww = 15, wh = Math.min(30, fh * 0.55);
      for (var r = 0; r < floors; r++) {
        for (var c = 0; c < cols; c++) {
          var wx = x + 12 + (w - 24) * (c + 0.5) / cols - ww / 2;
          var wy = top + 26 + r * fh;
          var lit = rand() < 0.27;
          if (lit) {
            var lw = el('g', { class: 'lw', style: 'transition-delay:' + ((wx / W) * 1.8 + rand() * 0.5).toFixed(2) + 's' }, g);
            var tw = el('g', rand() < 0.4 ? { class: 'tw', style: '--d:' + (4 + rand() * 6).toFixed(1) + 's;--dl:-' + (rand() * 8).toFixed(1) + 's' } : {}, lw);
            el('circle', { cx: wx + ww / 2, cy: wy + wh / 2, r: 30, fill: 'url(#sc-wglow)' }, tw);
            el('rect', { x: wx, y: wy, width: ww, height: wh, fill: '#EAF2EC', 'fill-opacity': (0.55 + rand() * 0.4).toFixed(2) }, tw);
            el('rect', { x: wx, y: wy + wh / 2 - 0.5, width: ww, height: 1, fill: '#0B1512', 'fill-opacity': 0.5 }, tw);
            windowGroupCount++;
          } else {
            el('rect', { x: wx, y: wy, width: ww, height: wh, fill: '#08110e', stroke: '#1d3b30', 'stroke-opacity': 0.45, 'stroke-width': 1 }, g);
          }
        }
      }
    }

    // far layer: small, hazy houses
    var gFar = el('g', { opacity: 0.55 }, svg);
    var fx = -40;
    while (fx < W + 40) {
      var fw = 52 + rand() * 40;
      house(gFar, fx, fw, 130 + rand() * 120, 28 + rand() * 40, types[Math.floor(rand() * types.length)], '#0e2119', { edge: '#2a5444', edgeW: 1, windows: false });
      fx += fw + 2;
    }
    var gFarShift = el('g', { transform: 'translate(0 -10)' }, svg);
    gFarShift.appendChild(gFar);

    el('rect', { x: 0, y: 470, width: W, height: 200, fill: 'url(#sc-fog)' }, svg);

    // main row of houses
    var gMid = el('g', {}, svg);
    var row = el('g', { id: 'sc-row' }, gMid);
    var x = -30;
    while (x < W + 40) {
      var w = 74 + rand() * 62;
      var bodyH = 250 + rand() * 190;
      house(row, x, w, bodyH, 54 + rand() * 56, types[Math.floor(rand() * types.length)], shades[Math.floor(rand() * shades.length)], { edge: '#2f5c4a', edgeW: 1.4, windows: true });
      x += w + (rand() < 0.35 ? 0 : 3);
    }
    // quay edge
    el('rect', { x: -60, y: WL - 1, width: W + 120, height: 5, fill: '#16302a' }, gMid);

    // water: reflection of the row, shimmer, darkening
    var gWater = el('g', {}, svg);
    var refl = el('g', { mask: 'url(#sc-wmask)', opacity: 0.8 }, gWater);
    var use = el('use', { transform: 'translate(0 ' + (2 * WL + 5) + ') scale(1 -1)' }, refl);
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#sc-row');
    use.setAttribute('href', '#sc-row');
    el('rect', { x: -60, y: WL + 4, width: W + 120, height: H - WL, fill: 'url(#sc-wover)' }, gWater);
    for (var s = 0; s < 18; s++) {
      var sy = WL + 14 + Math.pow(rand(), 1.4) * (H - WL - 30);
      var sg = el('g', { class: 'shim', style: '--d:' + (10 + rand() * 12).toFixed(1) + 's;--dl:-' + (rand() * 12).toFixed(1) + 's' }, gWater);
      el('rect', { x: rand() * W, y: sy, width: 40 + rand() * 140, height: 1.4, fill: '#B9D1C3', 'fill-opacity': (0.06 + rand() * 0.1).toFixed(2) }, sg);
    }

    scene.far = gFar;
    scene.mid = gMid;
    scene.water = gWater;
    scene.farShift = gFarShift;
    scene.el = $('#scene');
  }

  var par = { tx: 0, ty: 0, cx: 0, cy: 0, running: false };

  function applyParallax() {
    if (!scene.mid) return;
    var sy = Math.min(window.scrollY, window.innerHeight);
    var f = function (g, mx, my, sk) {
      g.setAttribute('transform', 'translate(' + (par.cx * mx).toFixed(2) + ' ' + (par.cy * my - sy * sk).toFixed(2) + ')');
    };
    f(scene.far, 10, 5, 0.1);
    f(scene.mid, 22, 9, 0.22);
    f(scene.water, 22, 9, 0.22);
  }

  function loopParallax() {
    par.cx += (par.tx - par.cx) * 0.07;
    par.cy += (par.ty - par.cy) * 0.07;
    applyParallax();
    if (Math.abs(par.tx - par.cx) > 0.002 || Math.abs(par.ty - par.cy) > 0.002) {
      requestAnimationFrame(loopParallax);
    } else {
      par.running = false;
    }
  }

  function initHeroMotion() {
    var hero = $('.hero');
    if (!hero) return;

    function start() {
      hero.classList.add('is-in');
      if (scene.el) setTimeout(function () { scene.el.classList.add('on'); }, reduced ? 0 : 350);
    }
    var started = false;
    function go() { if (!started) { started = true; start(); } }
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(go);
      setTimeout(go, 700);
    } else {
      go();
    }

    if (!reduced && finePointer) {
      hero.addEventListener('pointermove', function (e) {
        par.tx = e.clientX / window.innerWidth - 0.5;
        par.ty = e.clientY / window.innerHeight - 0.5;
        if (!par.running) { par.running = true; requestAnimationFrame(loopParallax); }
      });
      hero.addEventListener('pointerleave', function () {
        par.tx = 0; par.ty = 0;
        if (!par.running) { par.running = true; requestAnimationFrame(loopParallax); }
      });
    }

    if (HERO_VIDEO) {
      var conn = navigator.connection || {};
      var slow = conn.saveData || /(^|-)2g$/.test(conn.effectiveType || '');
      var video = $('#hero-video');
      if (video && !reduced && !slow) {
        [['media/hero.webm', 'video/webm'], ['media/hero.mp4', 'video/mp4']].forEach(function (s) {
          var src = document.createElement('source');
          src.src = s[0];
          src.type = s[1];
          video.appendChild(src);
        });
        video.addEventListener('canplay', function () {
          var p = video.play();
          if (p && p.then) p.then(function () { video.classList.add('on'); }).catch(function () { /* autoplay blocked */ });
        }, { once: true });
        video.load();
        if ('IntersectionObserver' in window) {
          new IntersectionObserver(function (entries) {
            entries.forEach(function (en) { if (en.isIntersecting) { video.play().catch(function () {}); } else { video.pause(); } });
          }).observe(hero);
        }
      }
    }
  }

  /* ------------------------------------------------------------------ header, menu, scroll effects */

  var header = $('#site-header');
  var statementWords = [];
  var navLinks = $$('nav.menu a');
  var sectionIds = ['how', 'who', 'fee', 'about', 'faq'];

  function splitStatement() {
    var el = $('#stmt');
    if (!el) return;
    var words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    statementWords = words.map(function (word) {
      var span = document.createElement('span');
      span.className = 'w';
      span.textContent = word + ' ';
      el.appendChild(span);
      return span;
    });
    updateStatement();
  }

  function updateStatement() {
    var el = $('#stmt');
    if (!el || !statementWords.length) return;
    if (reduced) { statementWords.forEach(function (w) { w.style.opacity = 1; }); return; }
    var vh = window.innerHeight;
    var r = el.getBoundingClientRect();
    var p = clamp((vh * 0.82 - r.top) / (r.height + vh * 0.12), 0, 1);
    var n = statementWords.length;
    statementWords.forEach(function (w, i) {
      var o = clamp((p * (n + 3) - i) / 3, 0, 1);
      w.style.opacity = (0.16 + 0.84 * o).toFixed(3);
    });
  }

  function updateHow() {
    var ol = $('#how-steps');
    if (!ol) return;
    var vh = window.innerHeight;
    var r = ol.getBoundingClientRect();
    var trig = vh * 0.58;
    ol.style.setProperty('--p', clamp((trig - r.top) / r.height, 0, 1).toFixed(4));
    $$('.how-step', ol).forEach(function (step) {
      step.classList.toggle('is-on', step.getBoundingClientRect().top < trig + 40 || reduced);
    });
  }

  var ticking = false;
  function tick() {
    ticking = false;
    var y = window.scrollY;
    var vh = window.innerHeight;
    var max = document.documentElement.scrollHeight - vh;
    header.classList.toggle('is-solid', y > 40);
    header.style.setProperty('--sp', max > 0 ? (y / max).toFixed(4) : 0);

    var hero = $('.hero');
    if (hero && y < vh * 1.2) {
      applyParallax();
      if (!reduced) {
        var inner = $('.hero-inner');
        var k = clamp(y / (vh * 0.7), 0, 1);
        inner.style.transform = 'translate3d(0,' + (y * 0.1).toFixed(1) + 'px,0)';
        inner.style.opacity = (1 - k * 0.9).toFixed(3);
      }
    }
    updateStatement();
    updateHow();

    var current = '';
    sectionIds.forEach(function (id) {
      var s = document.getElementById(id);
      if (s && s.getBoundingClientRect().top < vh * 0.4) current = id;
    });
    navLinks.forEach(function (a) { a.classList.toggle('is-current', a.getAttribute('href') === '#' + current); });

    var fab = $('#fab');
    var reg = $('#register');
    if (fab && reg) {
      var rr = reg.getBoundingClientRect();
      var inReg = rr.top < vh * 0.7 && rr.bottom > vh * 0.2;
      fab.classList.toggle('show', y > vh * 0.8 && !inReg);
    }
  }
  function requestTick() {
    if (!ticking) { ticking = true; requestAnimationFrame(tick); }
  }
  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', requestTick);

  var menuBtn = $('#menu-btn');
  var mobileMenu = $('#mobile-menu');
  function setMenu(open) {
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', PD.t(open ? 'menuClose' : 'menuOpen'));
    menuBtn.removeAttribute('data-i18n-aria');
    mobileMenu.hidden = !open;
    header.classList.toggle('is-solid', open || window.scrollY > 40);
  }
  if (menuBtn) {
    menuBtn.addEventListener('click', function () { setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'); });
    $$('a', mobileMenu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') { setMenu(false); menuBtn.focus(); }
    });
    window.addEventListener('resize', function () { if (window.innerWidth > 960) setMenu(false); });
  }

  // Reveal on scroll
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    $$('[data-reveal]').forEach(function (n) { io.observe(n); });
  } else {
    $$('[data-reveal]').forEach(function (n) { n.classList.add('in'); });
  }

  // Cursor spotlight
  if (finePointer) {
    document.addEventListener('pointermove', function (e) {
      var t = e.target.closest ? e.target.closest('.spot') : null;
      if (!t) return;
      var r = t.getBoundingClientRect();
      t.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      t.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }, { passive: true });
  }

  /* ------------------------------------------------------------------ fee calculator */

  var rentRange = $('#rent');
  var rentNum = $('#rent-num');
  var oFee = $('#o-fee');
  var oVat = $('#o-vat');
  var oTotal = $('#o-total');
  var bFee = $('#b-fee');
  var bVat = $('#b-vat');
  var shown = { fee: 0, vat: 0, total: 0 };
  var tweenId = 0;
  var currentRent = 1500;

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
    var dur = 560;
    (function step(now) {
      var k = clamp((now - t0) / dur, 0, 1);
      var e = 1 - Math.pow(1 - k, 4);
      shown = {
        fee: from.fee + (target.fee - from.fee) * e,
        vat: from.vat + (target.vat - from.vat) * e,
        total: from.total + (target.total - from.total) * e
      };
      paint(shown, k < 1);
      if (k < 1) tweenId = requestAnimationFrame(step);
    })(t0);
  }
  function setRent(v, source) {
    v = clamp(v, RENT_MIN, RENT_MAX);
    currentRent = v;
    if (source !== 'slider') rentRange.value = v;
    if (source !== 'num') rentNum.value = v;
    rentRange.style.setProperty('--fill', ((v - RENT_MIN) / (RENT_MAX - RENT_MIN) * 100).toFixed(1) + '%');
    var target = calc(v);
    var maxTotal = calc(RENT_MAX).total;
    bFee.style.width = (target.fee / maxTotal * 100).toFixed(1) + '%';
    bVat.style.width = (target.vat / maxTotal * 100).toFixed(1) + '%';
    tweenTo(target);
  }
  if (rentRange && rentNum) {
    rentRange.addEventListener('input', function () { setRent(Number(rentRange.value), 'slider'); });
    rentNum.addEventListener('input', function () {
      var v = Number(rentNum.value);
      if (isFinite(v) && v >= RENT_MIN && v <= RENT_MAX) setRent(v, 'num');
    });
    rentNum.addEventListener('change', function () {
      var v = Number(rentNum.value);
      setRent(isFinite(v) && rentNum.value !== '' ? v : currentRent, 'change');
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
    $$('[data-eur]').forEach(function (n) { n.textContent = PD.eur(Number(n.getAttribute('data-eur'))); });
    if (oFee) paint(shown, false);
  }

  /* ------------------------------------------------------------------ registration form + live profile */

  var TOTAL_STEPS = 3;
  var form = $('#intake');
  var panes = $$('.pane', form);
  var segs = $$('.steps-ind .seg', form);
  var stepCount = $('#step-count');
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
  var errKey = '';
  var sent = false;

  var RADIO_KEYS = { type: 'type', duration: 'duration', budget: 'budget', start: 'start', people: 'people', role: 'role' };

  function checked(name) { return form.querySelector('input[name="' + name + '"]:checked'); }
  function field(id) { return document.getElementById(id); }

  function readProfile() {
    var out = {};
    Object.keys(RADIO_KEYS).forEach(function (k) {
      var c = checked(RADIO_KEYS[k]);
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

  function renderStatus() {
    stepCount.textContent = PD.t('stepOf').replace('{n}', step).replace('{m}', TOTAL_STEPS);
    errEl.textContent = errKey ? PD.t(errKey) : '';
  }

  function showStep(n, moveFocus) {
    step = n;
    errKey = '';
    panes.forEach(function (pane) {
      var on = Number(pane.getAttribute('data-pane')) === n;
      pane.hidden = !on;
    });
    segs.forEach(function (seg, i) { seg.classList.toggle('on', i < n); });
    prevBtn.hidden = n === 1;
    nextBtn.hidden = n === TOTAL_STEPS;
    sendBtn.hidden = n !== TOTAL_STEPS;
    renderStatus();
    if (moveFocus) {
      var top = form.getBoundingClientRect().top;
      if (top < 90) window.scrollTo({ top: window.scrollY + top - 110, behavior: reduced ? 'auto' : 'smooth' });
      var first = form.querySelector('.pane[data-pane="' + n + '"] input:not([type=hidden])');
      if (first) first.focus({ preventScroll: true });
    }
  }

  function validate(n) {
    function radio(name, key) {
      return checked(name) ? null : { key: key, el: form.querySelector('input[name="' + name + '"]') };
    }
    if (n === 1) {
      return radio('type', 'eType') || (field('regio').value.trim() ? null : { key: 'eRegion', el: field('regio') }) || radio('duration', 'eDuration');
    }
    if (n === 2) return radio('budget', 'eBudget') || radio('start', 'eStart') || radio('people', 'ePeople');
    if (n === 3) {
      if (!checked('role')) return { key: 'eRole', el: form.querySelector('input[name="role"]') };
      if (!field('naam').value.trim()) return { key: 'eName', el: field('naam') };
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(field('email').value.trim())) return { key: 'eMail', el: field('email') };
      if (!field('akkoord').checked) return { key: 'eConsent', el: field('akkoord') };
    }
    return null;
  }

  function fail(problem) {
    errKey = problem.key;
    renderStatus();
    if (problem.el) problem.el.focus({ preventScroll: true });
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

  function post(key, data) {
    var controller = typeof AbortController === 'function' ? new AbortController() : null;
    var timer = controller ? setTimeout(function () { controller.abort(); }, 15000) : null;
    return fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(Object.assign({ access_key: key }, data)),
      signal: controller ? controller.signal : undefined
    })
      .then(function (res) { return res.json(); })
      .then(function (json) { return json && json.success === true; })
      .catch(function () { return false; })
      .then(function (ok) { if (timer) clearTimeout(timer); return ok; });
  }

  function showThanks() {
    sent = true;
    panes.forEach(function (pane) { pane.hidden = true; });
    $('.steps-ind', form).hidden = true;
    stepCount.hidden = true;
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
      syncProfile(name === 'regio' ? 'region' : name);
    });
    field('regio').addEventListener('input', function () { syncProfile(); });

    nextBtn.addEventListener('click', function () {
      var problem = validate(step);
      if (problem) return fail(problem);
      showStep(step + 1, true);
    });
    prevBtn.addEventListener('click', function () { showStep(step - 1, true); });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var problem = validate(TOTAL_STEPS);
      if (problem) return fail(problem);
      // The hidden checkbox is a honeypot: people never tick it.
      if (field('botcheck').checked) return showThanks();

      var data = collect();
      var idle = sendBtn.textContent;
      sendBtn.disabled = true;
      sendBtn.textContent = PD.t('sending');
      errKey = '';
      renderStatus();
      Promise.all(ACCESS_KEYS.map(function (key) { return post(key, data); })).then(function (results) {
        sendBtn.disabled = false;
        sendBtn.textContent = idle;
        if (results.some(Boolean)) {
          showThanks();
        } else {
          errKey = 'eSend';
          renderStatus();
        }
      });
    });
  }

  /* ------------------------------------------------------------------ FAQ accordion */

  $$('.faq details').forEach(function (d) {
    var summary = $('summary', d);
    var body = $('.faq-body', d);
    summary.addEventListener('click', function (e) {
      if (reduced || !body.animate) return;
      e.preventDefault();
      if (d.open) {
        var h = body.offsetHeight;
        var a = body.animate([{ height: h + 'px', opacity: 1 }, { height: '0px', opacity: 0 }], { duration: 320, easing: 'cubic-bezier(.2,.7,.2,1)' });
        a.onfinish = function () { d.open = false; };
      } else {
        d.open = true;
        var full = body.offsetHeight;
        body.animate([{ height: '0px', opacity: 0 }, { height: full + 'px', opacity: 1 }], { duration: 380, easing: 'cubic-bezier(.2,.7,.2,1)' });
      }
    });
  });

  /* ------------------------------------------------------------------ init */

  document.addEventListener('pd:lang', function () {
    splitStatement();
    renderAmounts();
    renderStatus();
    syncProfile();
    if (menuBtn) {
      var open = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-label', PD.t(open ? 'menuClose' : 'menuOpen'));
    }
  });

  buildScene();
  initHeroMotion();
  splitStatement();
  renderAmounts();
  if (rentRange) {
    shown = calc(currentRent);
    setRent(currentRent, 'init');
    paint(shown, false);
  }
  showStep(1, false);
  syncProfile();
  tick();
})();
