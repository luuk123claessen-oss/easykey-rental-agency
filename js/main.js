(function () {
  'use strict';

  // Public Web3Forms access key: each key delivers a copy of every request to one inbox.
  var ACCESS_KEYS = ['fe9f8c84-09c5-4b3f-8d23-d21589cfe188'];
  var ENDPOINT = 'https://api.web3forms.com/submit';
  var LANG_KEY = 'pd-lang';
  var TOTAL_STEPS = 4;
  var FEE_MULTIPLIER = 1.5;
  var VAT_RATE = 0.21;

  var T = {
    en: {
      metaTitle: 'Property Direct Rental Agency | Personal rental search for tenants',
      metaDesc: 'Property Direct is a rental search agent that works on the tenant’s side only. We search for your room or apartment in our own network. You pay once your lease is signed.',
      skip: 'Skip to content',
      nav1: 'How it works', nav2: 'Who it’s for', nav3: 'Pricing', nav4: 'FAQ', navcta: 'Sign up',
      heroLabel: 'Rental search agent · All of the Netherlands',
      h1a: 'We search.', h1b: 'You sign.',
      lead: 'Personal rental search, on the tenant’s side only. You pay once your lease is signed.',
      cta1: 'Sign up', cta2: 'How it works',
      cardLabel: 'Example search profile',
      c1: 'Looking for', c1v: '2-room apartment', c2: 'Area', c3: 'Budget', c4: 'Status', c4v: 'We search for you',
      t1: 'Tenant side only', t2: 'No upfront costs', t3: 'No cure, no pay',
      wLabel: 'How it works', wH: 'From sign⁠-⁠up to keys',
      s1h: 'Sign-up', s1p: 'You tell us what you need: type of home, area, budget and start date.',
      s2h: 'Mandate', s2p: 'We put the agreement in writing. Only then do we start searching.',
      s3h: 'Search', s3p: 'We search for you in our own network of private landlords and investors.',
      s4h: 'Match', s4p: 'Viewing, landlord check and lease review. You sign it yourself.',
      linkCta: 'Sign up →',
      vLabel: 'Who it’s for', vH: 'Short on time, new to the market',
      v1: 'New in the Netherlands or still abroad. We know the rules and the scam signals.',
      v2h: 'Students', v2: 'Find a room or apartment without scrolling through listings for hours.',
      v3: 'One fixed contact who takes the search off your hands.',
      tLabel: 'Pricing', big: '1.5×', bigAria: '1.5 times',
      tDesc: 'of the total monthly rent, including gas, water and electricity, plus 21% VAT. Only when a lease is signed.',
      th1: 'Monthly rent', th2: 'Fee', th3: 'VAT 21%', th4: 'Total',
      p1: 'No upfront costs and no registration fee. If you don’t find a home through us, you pay nothing.',
      p2: 'A home you found yourself or were already offered is excluded from the fee.',
      p3: 'You only pay us. Landlords never pay us anything.',
      p4: 'You have 14 days to change your mind. We only start when you explicitly ask us to.',
      note: 'Amounts are examples. The fee is always 1.5 times the total monthly rent in the lease.',
      fLabel: 'FAQ', fH: 'What to know before you start',
      q1: 'Who do you work for?', a1: 'Only for the tenant. We do not work for landlords and receive nothing from them. That is why you are allowed to pay us for the search.',
      q2: 'Why are there no homes on this site?', a2: 'We do not publish listings. We search per tenant in our network, based on your search profile. That keeps us fully on your side.',
      q3: 'What if you find nothing?', a3: 'Then you pay nothing. The fee is only due when you sign a lease through us.',
      q4: 'What happens with my data?', a4: 'We only share your details with a landlord when you want us to.',
      q5: 'Can I stop the assignment?', a5: 'Yes. You can cancel before you sign a lease. No fee is due then.',
      rLabel: 'Sign up', rH: 'Tell us what you’re looking for',
      rP: 'Four short steps. Then we contact you about the written mandate. We only start searching after that.',
      f1: 'What are you looking for?', oRoom: 'Room', oStudio: 'Studio', oApt: 'Apartment',
      f2: 'City or area', regioPh: 'e.g. Groningen',
      f3: 'Budget per month, total rent',
      b1: 'Up to € 800', b2: '€ 800 – 1,200', b3: '€ 1,200 – 1,800', b4: '€ 1,800 – 2,500', b5: '€ 2,500+',
      f4: 'Start date', w1: 'As soon as possible', w2: 'Within 1 month', w3: 'Within 3 months', w4: 'No idea yet',
      f5: 'Number of people',
      f6: 'How long do you want to rent?', d1: 'Under 6 months', d2: '6 – 12 months', d3: '1 – 2 years', d4: '2+ years',
      f7: 'Monthly income', i1: 'Student finance / none', i2: 'Up to € 2,000', i3: '€ 2,000 – 3,000', i4: '€ 3,000+',
      f8: 'You are', oStudent: 'Student',
      f9: 'Name', f10: 'Email', f11: 'Phone (optional)',
      f12: 'I agree that Property Direct Rental Agency uses my details to search for me. This is not yet a mandate and there are no costs.',
      prev: 'Back', next: 'Next', send: 'Send request', sending: 'Sending…', stepOf: 'Step {n} of {m}',
      okL: 'Received', okH: 'Thank you.', okP: 'We will contact you about the next step. Signing up costs nothing.',
      eType: 'Choose what you are looking for.', eReg: 'Enter a city or area.', eBud: 'Choose a budget.',
      eDur: 'Choose how long you want to rent.', eInc: 'Choose your monthly income.', eWho: 'Choose who you are.',
      eName: 'Enter your name.', eMail: 'Enter a valid email address.', eOk: 'Please agree to continue.',
      eSend: 'Sending failed. Please try again in a moment.',
      fAbout: 'Personal rental search for tenants across the Netherlands.',
      fc1: 'Navigate', fc2: 'Company', fLoc: 'Groningen, the Netherlands',
      fine: 'Fee: 1.5 times the total monthly rent (including gas, water and electricity) plus 21% VAT, only due when a lease is signed through Property Direct Rental Agency. No upfront costs.'
    },
    nl: {
      metaTitle: 'Property Direct Rental Agency | Persoonlijke huurbemiddeling voor huurders',
      metaDesc: 'Property Direct is een huurdersmakelaar die alleen aan de kant van de huurder werkt. Wij zoeken je kamer of appartement in ons eigen netwerk. Je betaalt pas als je huurcontract getekend is.',
      skip: 'Naar de inhoud',
      nav1: 'Werkwijze', nav2: 'Voor wie', nav3: 'Tarief', nav4: 'Vragen', navcta: 'Schrijf je in',
      heroLabel: 'Huurdersmakelaar · Heel Nederland',
      h1a: 'Wij zoeken.', h1b: 'Jij tekent.',
      lead: 'Persoonlijke huurbemiddeling, alleen aan de kant van de huurder. Je betaalt pas als jouw huurcontract getekend is.',
      cta1: 'Schrijf je in', cta2: 'Zo werkt het',
      cardLabel: 'Voorbeeld zoekprofiel',
      c1: 'Zoekt', c1v: '2-kamerappartement', c2: 'Regio', c3: 'Budget', c4: 'Status', c4v: 'Wij zoeken voor je',
      t1: 'Alleen voor de huurder', t2: 'Geen kosten vooraf', t3: 'No cure, no pay',
      wLabel: 'Werkwijze', wH: 'Van inschrijving tot sleutel',
      s1h: 'Inschrijving', s1p: 'Je vertelt wat je zoekt: soort woning, regio, budget en vanaf wanneer.',
      s2h: 'Opdracht', s2p: 'We leggen de afspraken schriftelijk vast. Pas daarna begint het zoeken.',
      s3h: 'Zoeken', s3p: 'We zoeken voor jou in ons eigen netwerk van particuliere verhuurders en beleggers.',
      s4h: 'Match', s4p: 'Bezichtiging, controle van de verhuurder en het huurcontract. Jij tekent zelf.',
      linkCta: 'Schrijf je in →',
      vLabel: 'Voor wie', vH: 'Weinig tijd, weinig kennis van de markt',
      v1: 'Net in Nederland of nog in het buitenland. Wij kennen de regels en de fraudesignalen.',
      v2h: 'Studenten', v2: 'Een kamer of appartement vinden zonder dat je zelf uren door advertenties scrolt.',
      v3: 'Eén vast aanspreekpunt dat het zoeken uit handen neemt.',
      tLabel: 'Tarief', big: '1,5×', bigAria: '1,5 keer',
      tDesc: 'de totale maandhuur, inclusief gas, water en licht, plus 21% btw. Alleen bij een getekend huurcontract.',
      th1: 'Maandhuur', th2: 'Fee', th3: 'Btw 21%', th4: 'Totaal',
      p1: 'Geen kosten vooraf en geen inschrijfgeld. Vind je geen woning via ons, dan betaal je niets.',
      p2: 'Een woning die je zelf vond of eerder al aangeboden kreeg, valt buiten de fee.',
      p3: 'Je betaalt alleen aan ons. Verhuurders betalen ons nooit iets.',
      p4: 'Je hebt 14 dagen bedenktijd. Wij beginnen pas als jij dat uitdrukkelijk vraagt.',
      note: 'Bedragen zijn voorbeelden. De fee is altijd 1,5 maal de totale maandhuur uit het huurcontract.',
      fLabel: 'Vragen', fH: 'Wat je wilt weten voordat je begint',
      q1: 'Voor wie werken jullie?', a1: 'Alleen voor de huurder. Wij werken niet voor verhuurders en ontvangen niets van hen. Daarom mag jij ons wel betalen voor het zoeken.',
      q2: 'Waarom zie ik hier geen woningen?', a2: 'Wij plaatsen geen aanbod. We zoeken per huurder in ons netwerk, op basis van jouw zoekprofiel. Zo blijven we volledig aan jouw kant.',
      q3: 'Wat als jullie niets vinden?', a3: 'Dan betaal je niets. De fee is pas verschuldigd als je via ons een huurcontract tekent.',
      q4: 'Wat gebeurt er met mijn gegevens?', a4: 'We delen je gegevens alleen met een verhuurder als jij dat wilt.',
      q5: 'Kan ik de opdracht stoppen?', a5: 'Ja, voordat je een huurcontract tekent kun je de opdracht opzeggen. Dan is er geen fee verschuldigd.',
      rLabel: 'Inschrijven', rH: 'Vertel ons wat je zoekt',
      rP: 'Vier korte stappen. Daarna nemen we contact op over de schriftelijke opdracht. Pas daarna beginnen we met zoeken.',
      f1: 'Wat zoek je?', oRoom: 'Kamer', oStudio: 'Studio', oApt: 'Appartement',
      f2: 'Stad of regio', regioPh: 'bijv. Groningen',
      f3: 'Budget per maand, totale huur',
      b1: 'Tot € 800', b2: '€ 800 – 1.200', b3: '€ 1.200 – 1.800', b4: '€ 1.800 – 2.500', b5: '€ 2.500+',
      f4: 'Vanaf wanneer', w1: 'Zo snel mogelijk', w2: 'Binnen 1 maand', w3: 'Binnen 3 maanden', w4: 'Nog geen idee',
      f5: 'Aantal personen',
      f6: 'Hoelang wil je huren?', d1: 'Korter dan 6 maanden', d2: '6 – 12 maanden', d3: '1 – 2 jaar', d4: 'Langer dan 2 jaar',
      f7: 'Maandinkomen', i1: 'Studiefinanciering / geen', i2: 'Tot € 2.000', i3: '€ 2.000 – 3.000', i4: '€ 3.000+',
      f8: 'Je bent', oStudent: 'Student',
      f9: 'Naam', f10: 'E-mail', f11: 'Telefoon (optioneel)',
      f12: 'Ik vind het goed dat Property Direct Rental Agency mijn gegevens gebruikt om voor mij te zoeken. Dit is nog geen opdracht en er zijn geen kosten.',
      prev: 'Vorige', next: 'Volgende', send: 'Verstuur aanvraag', sending: 'Versturen…', stepOf: 'Stap {n} van {m}',
      okL: 'Ontvangen', okH: 'Bedankt.', okP: 'We nemen contact met je op over de volgende stap. Er zijn geen kosten verbonden aan je inschrijving.',
      eType: 'Kies wat je zoekt.', eReg: 'Vul een stad of regio in.', eBud: 'Kies een budget.',
      eDur: 'Kies hoelang je wilt huren.', eInc: 'Kies je maandinkomen.', eWho: 'Kies wie je bent.',
      eName: 'Vul je naam in.', eMail: 'Vul een geldig e-mailadres in.', eOk: 'Ga akkoord om door te gaan.',
      eSend: 'Versturen is niet gelukt. Probeer het zo nog eens.',
      fAbout: 'Persoonlijke huurbemiddeling voor huurders in heel Nederland.',
      fc1: 'Navigatie', fc2: 'Bedrijf', fLoc: 'Groningen, Nederland',
      fine: 'Tarief: 1,5 maal de totale maandhuur (inclusief gas, water en licht) plus 21% btw, alleen verschuldigd bij een getekend huurcontract via Property Direct Rental Agency. Geen kosten vooraf.'
    }
  };

  var lang = 'en';
  var errKey = '';
  var step = 1;

  var form = document.getElementById('intake');
  var panes = form.querySelectorAll('.pane');
  var bars = form.querySelectorAll('.progress i');
  var stepCount = document.getElementById('step-count');
  var prevBtn = document.getElementById('prev');
  var nextBtn = document.getElementById('next');
  var sendBtn = document.getElementById('send');
  var errEl = document.getElementById('err');
  var thanks = document.getElementById('thanks');

  function t(key) {
    var d = T[lang];
    if (d && d[key] != null) return d[key];
    return T.en[key] != null ? T.en[key] : '';
  }

  function eur(n) {
    var whole = Math.abs(n - Math.round(n)) < 0.005;
    var digits = whole ? 0 : 2;
    var text = n.toLocaleString(lang === 'nl' ? 'nl-NL' : 'en-GB', { minimumFractionDigits: digits, maximumFractionDigits: digits });
    return '€ ' + text;
  }

  function renderAmounts() {
    document.querySelectorAll('[data-rent]').forEach(function (row) {
      var rent = Number(row.getAttribute('data-rent'));
      var fee = rent * FEE_MULTIPLIER;
      var vat = fee * VAT_RATE;
      var cells = row.children;
      cells[0].textContent = eur(rent);
      cells[1].textContent = eur(fee);
      cells[2].textContent = eur(vat);
      cells[3].textContent = eur(fee + vat);
    });
    document.querySelectorAll('[data-eur]').forEach(function (el) {
      el.textContent = eur(Number(el.getAttribute('data-eur')));
    });
  }

  function renderStatus() {
    stepCount.textContent = t('stepOf').replace('{n}', step).replace('{m}', TOTAL_STEPS);
    errEl.textContent = errKey ? t(errKey) : '';
  }

  function applyLanguage(next) {
    if (!T[next]) return;
    lang = next;
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var value = T[lang][el.getAttribute('data-i18n')];
      if (value != null) el.textContent = value;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var value = T[lang][el.getAttribute('data-i18n-placeholder')];
      if (value != null) el.setAttribute('placeholder', value);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var value = T[lang][el.getAttribute('data-i18n-aria')];
      if (value != null) el.setAttribute('aria-label', value);
    });

    document.title = t('metaTitle');
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', t('metaDesc'));

    document.querySelectorAll('.lang button').forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-lang') === lang ? 'true' : 'false');
    });

    renderAmounts();
    renderStatus();
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* storage unavailable */ }
  }

  function showStep(n, moveFocus) {
    step = n;
    errKey = '';
    panes.forEach(function (pane) {
      pane.hidden = Number(pane.getAttribute('data-pane')) !== n;
    });
    bars.forEach(function (bar, i) { bar.classList.toggle('on', i < n); });
    prevBtn.hidden = n === 1;
    nextBtn.hidden = n === TOTAL_STEPS;
    sendBtn.hidden = n !== TOTAL_STEPS;
    renderStatus();
    if (moveFocus) {
      var first = form.querySelector('.pane[data-pane="' + n + '"] input, .pane[data-pane="' + n + '"] select');
      if (first) first.focus({ preventScroll: true });
    }
  }

  function checked(name) {
    return form.querySelector('input[name="' + name + '"]:checked');
  }

  function field(id) {
    return document.getElementById(id);
  }

  // Returns { key, el } for the first problem on a step, or null when the step is valid.
  function validate(n) {
    var radio = function (name, key) {
      return checked(name) ? null : { key: key, el: form.querySelector('input[name="' + name + '"]') };
    };
    if (n === 1) {
      return radio('type', 'eType') || (field('regio').value.trim() ? null : { key: 'eReg', el: field('regio') });
    }
    if (n === 2) return radio('budget', 'eBud');
    if (n === 3) return radio('duration', 'eDur') || radio('income', 'eInc');
    if (n === 4) {
      if (!checked('who')) return { key: 'eWho', el: form.querySelector('input[name="who"]') };
      if (!field('naam').value.trim()) return { key: 'eName', el: field('naam') };
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(field('email').value.trim())) return { key: 'eMail', el: field('email') };
      if (!field('akkoord').checked) return { key: 'eOk', el: field('akkoord') };
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
      budget: checked('budget').value,
      gewenste_ingangsdatum: field('wanneer').value,
      aantal_personen: field('personen').value,
      huurperiode: checked('duration').value,
      maandinkomen: checked('income').value,
      profiel: checked('who').value,
      taal: lang,
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
      .then(function (ok) {
        if (timer) clearTimeout(timer);
        return ok;
      });
  }

  function showThanks() {
    panes.forEach(function (pane) { pane.hidden = true; });
    form.querySelector('.progress').hidden = true;
    stepCount.hidden = true;
    errEl.hidden = true;
    form.querySelector('.actions').hidden = true;
    thanks.hidden = false;
    thanks.focus({ preventScroll: true });
  }

  nextBtn.addEventListener('click', function () {
    var problem = validate(step);
    if (problem) return fail(problem);
    showStep(step + 1, true);
  });

  prevBtn.addEventListener('click', function () {
    showStep(step - 1, false);
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var problem = validate(TOTAL_STEPS);
    if (problem) return fail(problem);

    // The hidden checkbox is a honeypot: people never tick it.
    if (field('botcheck').checked) return showThanks();

    var data = collect();
    var idleLabel = sendBtn.textContent;
    sendBtn.disabled = true;
    sendBtn.textContent = t('sending');
    errKey = '';
    renderStatus();

    Promise.all(ACCESS_KEYS.map(function (key) { return post(key, data); })).then(function (results) {
      sendBtn.disabled = false;
      sendBtn.textContent = idleLabel;
      if (results.some(Boolean)) {
        showThanks();
      } else {
        errKey = 'eSend';
        renderStatus();
      }
    });
  });

  document.querySelectorAll('.lang button').forEach(function (btn) {
    btn.addEventListener('click', function () { applyLanguage(btn.getAttribute('data-lang')); });
  });

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var saved = null;
  try { saved = localStorage.getItem(LANG_KEY); } catch (e) { /* storage unavailable */ }
  applyLanguage(saved === 'nl' ? 'nl' : 'en');
  showStep(1, false);
})();
