document.addEventListener('DOMContentLoaded', function () {
  var navToggle = document.getElementById('nav-toggle');
  var mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  initWizard();
  initLanguage();
});

// Each key routes a copy of the submission to one inbox.
var WEB3FORMS_ACCESS_KEYS = ['fe9f8c84-09c5-4b3f-8d23-d21589cfe188'];

var TRANSLATIONS = {
  nl: {
    meta: {
      title: 'Property Direct Rental Agency | Exclusieve bemiddeling in Groningen',
      description: 'Property Direct Rental Agency bemiddelt exclusief binnen ons eigen netwerk van kamers en appartementen voor studenten en young professionals in Groningen.'
    },
    nav: {
      werkwijze: 'Werkwijze',
      doelgroep: 'Voor wie',
      tarief: 'Tarief',
      voorbeelden: 'Voorbeelden',
      cta: 'Schrijf je in',
      menuLabel: 'Menu openen'
    },
    hero: {
      eyebrow: 'Exclusieve bemiddeling · Groningen',
      h1: 'Jouw sleutel tot wonen in Groningen',
      p: 'We zoeken binnen ons eigen, uitgebreide netwerk naar de perfecte kamer of appartement voor jou — student of young professional die start in en rond Groningen. Persoonlijk, exclusief en zonder gedoe.',
      ctaPrimary: 'Schrijf je nu in',
      ctaSecondary: 'Onze werkwijze'
    },
    contact: {
      label: 'Inschrijven',
      h2: 'Schrijf je nu in',
      intro: 'Beantwoord een paar korte vragen — je bent er zo doorheen. Wij gaan direct voor je aan de slag.'
    },
    wizard: {
      back: '← Vorige',
      step1: { question: 'Wat zoek je?', opt1: 'Kamer', opt2: 'Studio', opt3: 'Appartement' },
      step2: { question: 'Wat is je budget per maand?', opt1: 'Tot €600', opt2: '€600 – €800', opt3: '€800 – €1.000', opt4: '€1.000+' },
      step3: { question: 'Hoelang wil je huren?', opt1: 'Korter dan 6 maanden', opt2: '6 - 12 maanden', opt3: '1 - 2 jaar', opt4: 'Langer dan 2 jaar' },
      step4: { question: 'Met hoeveel personen?', opt1: 'Alleen', opt2: "Met z'n 2", opt3: "Met z'n 3", opt4: '4 of meer' },
      step5: { question: 'Wanneer wil je erin?', opt1: 'Zo snel mogelijk', opt2: 'Binnen 1 maand', opt3: 'Binnen 3 maanden', opt4: 'Nog geen idee' },
      step6: { question: 'Wat is je maandinkomen?', opt1: 'Studiefinanciering', opt2: 'Tot €2.000', opt3: '€2.000 – €3.000', opt4: '€3.000+' },
      step7: { question: 'Je bent…', opt1: 'Student', opt2: 'Young professional' },
      step8: {
        question: 'Waar mogen we je match naartoe sturen?',
        labelName: 'Naam',
        labelEmail: 'E-mailadres',
        submit: 'Verstuur aanvraag'
      },
      done: {
        title: 'Bedankt!',
        text: 'We gaan direct voor je aan de slag binnen ons exclusieve netwerk. Je hoort snel van ons.'
      }
    },
    werkwijze: {
      imageAlt: 'A-kerk en gracht in Groningen',
      label: 'Werkwijze',
      h2: 'Van zoekopdracht tot sleuteloverdracht',
      step1: { title: 'Zoekopdracht', text: 'Je geeft je wensen door: locatie, budget, type woonruimte en gewenste ingangsdatum.' },
      step2: { title: 'Exclusieve zoektocht', text: 'Wij zoeken binnen ons eigen netwerk naar een passende kamer of appartement — vaak nog vóór deze breed bekend is.' },
      step3: { title: 'Bezichtiging', text: 'Zodra we een geschikte match zien, plannen we direct een bezichtiging voor je in.' },
      step4: { title: 'Match & sleutel', text: 'Bevalt het? Dan ronden we de overeenkomst af en ontvang je de sleutel van je nieuwe woonruimte.' },
      cta: 'Schrijf je nu in →'
    },
    doelgroep: {
      imageAlt: 'Luchtfoto van Groningen met de Martinitoren',
      label: 'Voor wie',
      h2: 'Voor studenten & young professionals',
      p: 'Property Direct richt zich specifiek op studenten en young professionals die een nieuwe start maken in Groningen — voor je studie, je eerste baan, of de volgende stap in je carrière. Wij kennen de Groningse woningmarkt van binnenuit en weten precies waar te zoeken.',
      cta: 'Schrijf je nu in →',
      card1: { title: 'Exclusief netwerk', text: 'Toegang tot verhuurders en eigenaren buiten de gangbare kanalen om.' },
      card2: { title: 'Persoonlijke begeleiding', text: 'Eén aanspreekpunt van eerste kennismaking tot sleuteloverdracht.' },
      card3: { title: 'Lokale expertise', text: 'Jarenlange kennis van wijken, prijzen en de Groningse verhuurmarkt.' }
    },
    tarief: {
      label: 'Tarief',
      h2: 'Transparant & zonder verrassingen',
      amount1: '1 maand huur',
      amount2: '21% btw',
      desc: 'Bemiddelingskosten zijn alleen verschuldigd zodra we voor jou een match vinden. Geen match, geen kosten.',
      cta: 'Schrijf je nu in'
    },
    voorbeelden: {
      label: 'Recent bemiddeld',
      h2: 'Voorbeelden uit ons netwerk',
      card1: { alt: 'Grachtenpand in de Binnenstad van Groningen', title: 'Studio — Binnenstad', meta: '28 m² · Gemeubileerd · 5 min. van centrum' },
      card2: { alt: 'Fietsen bij een gracht nabij Paddepoel', title: 'Kamer — Paddepoel', meta: '16 m² · Gedeelde keuken · Nabij RUG-campus' },
      card3: { alt: 'Appartementengebouw met balkons en bloemen in Helpman', title: '2-kamerappartement — Helpman', meta: '65 m² · Balkon · Rustige buurt' },
      card4: { alt: 'Modern gerenoveerd appartementencomplex in Oosterpoort', title: 'Loft — Oosterpoort', meta: '40 m² · Recent gerenoveerd · Fietsenstalling' },
      ctaText: 'Zie je iets dat je aanspreekt? Schrijf je in en wij gaan voor je op zoek.',
      cta: 'Schrijf je nu in'
    },
    gallery: {
      alt1: 'Station Groningen',
      alt2: 'Haven van Groningen in de avond',
      alt3: 'Karakteristieke panden in Groningen',
      alt4: 'Modern appartementencomplex met balkons'
    },
    about: {
      imageAlt: 'Voormalige Verkade-fabriek weerspiegeld in het water, Groningen',
      label: 'Over Property Direct',
      h2: 'Bemiddeling met een persoonlijke aanpak',
      p: 'Property Direct Rental Agency is gespecialiseerd in de bemiddeling van kamers en appartementen in Groningen. Via ons uitgebreide, exclusieve netwerk van verhuurders en particuliere eigenaren vinden wij woonruimte die niet altijd via reguliere kanalen te vinden is. Van eerste kennismaking tot sleuteloverdracht begeleiden wij het volledige proces persoonlijk en professioneel.'
    },
    finalCta: {
      h2: 'Klaar om te beginnen?',
      p: 'Schrijf je in en wij gaan direct voor je op zoek binnen ons exclusieve netwerk.',
      cta: 'Schrijf je nu in'
    },
    footer: {
      fine: 'Bemiddelingskosten: 1 maand huur + 21% btw, uitsluitend verschuldigd bij een succesvolle match.'
    },
    form: {
      sending: 'Even geduld...'
    }
  },
  en: {
    meta: {
      title: 'Property Direct Rental Agency | Exclusive Rental Placement in Groningen',
      description: 'Property Direct Rental Agency exclusively places rooms and apartments from our own network for students and young professionals in Groningen.'
    },
    nav: {
      werkwijze: 'How it works',
      doelgroep: 'Who it’s for',
      tarief: 'Fee',
      voorbeelden: 'Examples',
      cta: 'Sign up',
      menuLabel: 'Open menu'
    },
    hero: {
      eyebrow: 'Exclusive placement · Groningen',
      h1: 'Your key to living in Groningen',
      p: 'We search within our own extensive network for the perfect room or apartment for you — student or young professional starting out in and around Groningen. Personal, exclusive, and hassle-free.',
      ctaPrimary: 'Sign up now',
      ctaSecondary: 'How it works'
    },
    contact: {
      label: 'Sign up',
      h2: 'Sign up now',
      intro: 'Answer a few short questions — you’ll be done in no time. We’ll get straight to work for you.'
    },
    wizard: {
      back: '← Back',
      step1: { question: 'What are you looking for?', opt1: 'Room', opt2: 'Studio', opt3: 'Apartment' },
      step2: { question: 'What’s your monthly budget?', opt1: 'Up to €600', opt2: '€600 – €800', opt3: '€800 – €1,000', opt4: '€1,000+' },
      step3: { question: 'How long do you want to rent?', opt1: 'Less than 6 months', opt2: '6 - 12 months', opt3: '1 - 2 years', opt4: 'More than 2 years' },
      step4: { question: 'With how many people?', opt1: 'Just me', opt2: '2 people', opt3: '3 people', opt4: '4 or more' },
      step5: { question: 'When would you like to move in?', opt1: 'As soon as possible', opt2: 'Within 1 month', opt3: 'Within 3 months', opt4: 'Not sure yet' },
      step6: { question: 'What’s your monthly income?', opt1: 'Student finance', opt2: 'Up to €2,000', opt3: '€2,000 – €3,000', opt4: '€3,000+' },
      step7: { question: 'You are…', opt1: 'Student', opt2: 'Young professional' },
      step8: {
        question: 'Where should we send your match?',
        labelName: 'Name',
        labelEmail: 'Email address',
        submit: 'Submit request'
      },
      done: {
        title: 'Thank you!',
        text: 'We’ll get straight to work for you within our exclusive network. You’ll hear from us soon.'
      }
    },
    werkwijze: {
      imageAlt: 'A-Church and canal in Groningen',
      label: 'How it works',
      h2: 'From search request to key handover',
      step1: { title: 'Search request', text: 'You share your requirements: location, budget, type of housing, and desired move-in date.' },
      step2: { title: 'Exclusive search', text: 'We search within our own network for a suitable room or apartment — often before it’s widely known.' },
      step3: { title: 'Viewing', text: 'As soon as we spot a suitable match, we schedule a viewing for you right away.' },
      step4: { title: 'Match & keys', text: 'Like what you see? We finalize the agreement and you receive the keys to your new home.' },
      cta: 'Sign up now →'
    },
    doelgroep: {
      imageAlt: 'Aerial view of Groningen with the Martini Tower',
      label: 'Who it’s for',
      h2: 'For students & young professionals',
      p: 'Property Direct focuses specifically on students and young professionals making a fresh start in Groningen — for studies, a first job, or the next step in their career. We know the Groningen housing market inside out and know exactly where to look.',
      cta: 'Sign up now →',
      card1: { title: 'Exclusive network', text: 'Access to landlords and owners outside the usual channels.' },
      card2: { title: 'Personal guidance', text: 'One point of contact from first introduction to key handover.' },
      card3: { title: 'Local expertise', text: 'Years of knowledge of neighbourhoods, prices, and the Groningen rental market.' }
    },
    tarief: {
      label: 'Fee',
      h2: 'Transparent & no surprises',
      amount1: '1 month’s rent',
      amount2: '21% VAT',
      desc: 'Placement fees are only due once we find you a match. No match, no cost.',
      cta: 'Sign up now'
    },
    voorbeelden: {
      label: 'Recently placed',
      h2: 'Examples from our network',
      card1: { alt: 'Canal house in the city centre of Groningen', title: 'Studio — City Centre', meta: '28 m² · Furnished · 5 min. from the centre' },
      card2: { alt: 'Bicycles by a canal near Paddepoel', title: 'Room — Paddepoel', meta: '16 m² · Shared kitchen · Near RUG campus' },
      card3: { alt: 'Apartment building with balconies and flowers in Helpman', title: '2-Room Apartment — Helpman', meta: '65 m² · Balcony · Quiet neighbourhood' },
      card4: { alt: 'Modern renovated apartment complex in Oosterpoort', title: 'Loft — Oosterpoort', meta: '40 m² · Recently renovated · Bike storage' },
      ctaText: 'See something you like? Sign up and we’ll start searching for you.',
      cta: 'Sign up now'
    },
    gallery: {
      alt1: 'Groningen railway station',
      alt2: 'Groningen harbour in the evening',
      alt3: 'Characteristic buildings in Groningen',
      alt4: 'Modern apartment complex with balconies'
    },
    about: {
      imageAlt: 'Former Verkade factory reflected in the water, Groningen',
      label: 'About Property Direct',
      h2: 'Placement with a personal approach',
      p: 'Property Direct Rental Agency specializes in placing tenants in rooms and apartments in Groningen. Through our extensive, exclusive network of landlords and private owners, we find housing that isn’t always available through regular channels. From first introduction to key handover, we guide the entire process personally and professionally.'
    },
    finalCta: {
      h2: 'Ready to get started?',
      p: 'Sign up and we’ll start searching for you right away within our exclusive network.',
      cta: 'Sign up now'
    },
    footer: {
      fine: 'Placement fee: 1 month’s rent + 21% VAT, due only upon a successful match.'
    },
    form: {
      sending: 'One moment...'
    }
  }
};

var currentLang = 'nl';

function getTranslation(lang, key) {
  var parts = key.split('.');
  var node = TRANSLATIONS[lang];
  for (var i = 0; i < parts.length; i++) {
    if (!node) return null;
    node = node[parts[i]];
  }
  return typeof node === 'string' ? node : null;
}

function applyLanguage(lang) {
  if (!TRANSLATIONS[lang]) return;
  currentLang = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var value = getTranslation(lang, el.getAttribute('data-i18n'));
    if (value != null) el.textContent = value;
  });

  document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
    var value = getTranslation(lang, el.getAttribute('data-i18n-alt'));
    if (value != null) el.setAttribute('alt', value);
  });

  document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
    var value = getTranslation(lang, el.getAttribute('data-i18n-aria'));
    if (value != null) el.setAttribute('aria-label', value);
  });

  var metaTitle = getTranslation(lang, 'meta.title');
  if (metaTitle) document.title = metaTitle;

  var metaDesc = getTranslation(lang, 'meta.description');
  var metaEl = document.querySelector('meta[name="description"]');
  if (metaDesc && metaEl) metaEl.setAttribute('content', metaDesc);

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.classList.toggle('is-active', btn.dataset.lang === lang);
  });

  try { localStorage.setItem('easykey-lang', lang); } catch (e) {}
}

function initLanguage() {
  var saved = null;
  try { saved = localStorage.getItem('easykey-lang'); } catch (e) {}
  applyLanguage(saved === 'en' ? 'en' : 'nl');

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLanguage(btn.dataset.lang);
    });
  });
}

function initWizard() {
  var wizard = document.getElementById('wizard');
  if (!wizard) return;

  var steps = Array.prototype.slice.call(wizard.querySelectorAll('.wizard-step'));
  var dots = Array.prototype.slice.call(wizard.querySelectorAll('.wizard-dot'));
  var backBtn = document.getElementById('wizard-back');
  var totalSteps = steps.filter(function (s) { return s.dataset.step !== 'done'; }).length;
  var current = 1;
  var answers = {};

  function showStep(step) {
    current = step;
    steps.forEach(function (s) {
      s.classList.toggle('is-active', s.dataset.step === String(step));
    });
    dots.forEach(function (dot) {
      var n = Number(dot.dataset.dot);
      dot.classList.toggle('is-active', n === step);
      dot.classList.toggle('is-done', n < step);
    });
    backBtn.classList.toggle('is-visible', step > 1 && step <= totalSteps);
  }

  backBtn.addEventListener('click', function () {
    if (current > 1) showStep(current - 1);
  });

  wizard.querySelectorAll('.wizard-option').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var group = btn.closest('.wizard-options');
      group.querySelectorAll('.wizard-option').forEach(function (b) {
        b.classList.remove('is-selected');
      });
      btn.classList.add('is-selected');
      answers[btn.dataset.field] = btn.dataset.value;

      setTimeout(function () {
        if (current < totalSteps) showStep(current + 1);
      }, 220);
    });
  });

  var wizardForm = document.getElementById('wizard-form');
  var status = document.getElementById('form-status');

  wizardForm.addEventListener('submit', function (e) {
    e.preventDefault();
    answers.name = document.getElementById('wizard-name').value;
    answers.email = document.getElementById('wizard-email').value;

    var submitBtn = wizardForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    if (status) status.textContent = getTranslation(currentLang, 'form.sending') || '';

    var payload = {
      naam: answers.name,
      email: answers.email,
      op_zoek_naar: answers.type,
      budget: answers.budget,
      huurperiode: answers.duration,
      aantal_personen: answers.people,
      gewenste_ingangsdatum: answers.timing,
      maandinkomen: answers.income,
      profiel: answers.profile,
      subject: 'Nieuwe zoekopdracht via Property Direct website'
    };

    var requests = WEB3FORMS_ACCESS_KEYS.map(function (key) {
      return fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.assign({ access_key: key }, payload))
      }).catch(function (err) { console.error('Web3Forms submit failed', err); });
    });

    Promise.allSettled(requests).finally(function () {
      submitBtn.disabled = false;
      if (status) status.textContent = '';
      showStep('done');
    });
  });
}
