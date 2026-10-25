(function () {
  'use strict';

  var LANG_KEY = 'pd-lang';

  var T = {
    en: {
      homeTitle: 'Property Direct Rental Agency | Personal tenant representation in the Netherlands',
      homeDesc: 'Property Direct searches for your rental home on the tenant’s side only. You pay 1.5× the monthly rent plus VAT, and only when your lease is signed.',
      privTitle: 'Privacy Policy | Property Direct Rental Agency',
      privDesc: 'How Property Direct Rental Agency handles the personal data you share when you register.',
      termsTitle: 'Terms and Conditions | Property Direct Rental Agency',
      termsDesc: 'The terms that apply to tenant representation by Property Direct Rental Agency.',

      skip: 'Skip to content',
      navHow: 'How it works', navWho: 'Who we help', navFee: 'Fee', navAbout: 'About', navFaq: 'FAQ', navCta: 'Register',
      menuOpen: 'Open menu', menuClose: 'Close menu', backHome: 'Back to home',

      heroLabel: 'Tenant representation · The Netherlands',
      h1a: 'We search.', h1b: 'You sign.',
      heroSub: 'Personal tenant representation in the Netherlands. You only pay when your lease is signed.',
      cta1: 'Register', cta2: 'See how it works',
      t1: 'Tenant side only', t2: 'No upfront costs', t3: 'No cure, no pay',
      scroll: 'Scroll',

      stmt: 'You describe what you need. We search for it, check the landlord and the lease, and you sign only what you’re happy with.',

      howLabel: 'How it works', howTitle: 'From registration to keys',
      s1h: 'Registration', s1p: 'Tell us what you need: type of home, region, budget and start date. It takes a minute and costs nothing.',
      s2h: 'Mandate', s2p: 'We put the agreement in writing. Only once you have signed the mandate do we start searching.',
      s3h: 'Search', s3p: 'We search for homes that match your profile and only put forward options that fit.',
      s4h: 'Match and signing', s4p: 'We arrange the viewing, check the landlord and review the lease with you. You sign the lease yourself, and only then is the fee due.',

      whoLabel: 'Who we help', whoTitle: 'Short on time, new to the market',
      w1h: 'Expats', w1p: 'New in the Netherlands, or still abroad? We explain how renting works here and help you recognise rental scams.',
      w2h: 'International students', w2p: 'Coming to study in the Netherlands? We do the searching, so you can focus on your arrival.',
      w3h: 'Young professionals', w3p: 'Starting a job and short on time? One fixed contact takes the search off your hands.',

      feeLabel: 'Fee', feeTitle: 'One fee. Only when you sign.',
      feeLead: '1.5× your total monthly rent, including gas, water and electricity, plus 21% VAT. Due only when a lease is signed through us.',
      calcRent: 'Total monthly rent', calcHint: 'Drag the slider or type an amount', calcRentAria: 'Monthly rent in euros',
      calcFee: 'Fee (1.5×)', calcVat: 'VAT 21%', calcTotal: 'Total due at signing',
      calcNote: 'Including VAT, that is 1.815× the monthly rent.',
      exTitle: 'Examples', thRent: 'Monthly rent', thFee: 'Fee', thVat: 'VAT 21%', thTotal: 'Total',
      p1: 'No costs upfront and no registration fee. If you don’t sign a lease through us, you pay nothing.',
      p2: 'Homes you found yourself, or were already offered, are excluded from the fee.',
      p3: 'Only the tenant pays. Landlords never pay us anything.',
      p4: 'You have a 14-day withdrawal period. We only start within that period if you explicitly ask us to.',

      regLabel: 'Register', regTitle: 'Describe what you’re looking for',
      regSub: 'Three short steps. Registering is free and without obligation. It is not yet a mandate. Afterwards we contact you about the written mandate.',
      stepOf: 'Step {n} of {m}', st1: 'The home', st2: 'The details', st3: 'About you',
      fType: 'What are you looking for?', oRoom: 'Room', oStudio: 'Studio', oApt: 'Apartment', oHouse: 'House',
      fRegion: 'City or region', regionPh: 'e.g. Utrecht',
      fDuration: 'How long do you want to rent?', d1: 'Under 6 months', d2: '6 – 12 months', d3: '1 – 2 years', d4: '2+ years',
      fBudget: 'Budget per month, total rent', b1: 'Up to € 800', b2: '€ 800 – 1,200', b3: '€ 1,200 – 1,800', b4: '€ 1,800 – 2,500', b5: '€ 2,500+',
      fStart: 'When do you want to start?', m1: 'As soon as possible', m2: 'Within 1 month', m3: 'Within 3 months', m4: 'Not sure yet',
      fPeople: 'How many people?', pp1: 'Just me', pp2: '2 people', pp3: '3 people', pp4: '4 or more',
      fRole: 'You are', r1: 'Expat', r2: 'International student', r3: 'Young professional',
      fName: 'Name', fEmail: 'Email', fPhone: 'Phone (optional)',
      fConsent: 'I agree that Property Direct Rental Agency uses my details to contact me and to search for a home for me. This is not yet a mandate and there are no costs.',
      prev: 'Back', next: 'Next', send: 'Send registration', sending: 'Sending…',
      eType: 'Choose what you are looking for.', eRegion: 'Enter a city or region.', eDuration: 'Choose how long you want to rent.',
      eBudget: 'Choose a budget.', eStart: 'Choose when you want to start.', ePeople: 'Choose how many people.',
      eRole: 'Choose who you are.', eName: 'Enter your name.', eMail: 'Enter a valid email address.', eConsent: 'Please agree to continue.',
      eSend: 'Sending failed. Please try again in a moment.',
      okLabel: 'Received', okTitle: 'Thank you.', okText: 'We will contact you about the written mandate. Registering costs nothing and you are not committed to anything.',
      cardTitle: 'Search profile', cardDraft: 'Draft', cardReady: 'Ready to send', cardSent: 'We search for you',
      cType: 'Looking for', cRegion: 'Region', cBudget: 'Budget', cStart: 'Start', cPeople: 'People', cDuration: 'Duration', cRole: 'You are',
      cardNote: 'Built live from your answers.',

      aboutLabel: 'Who we are',
      aboutText: 'I work on the tenant’s side only. You have one fixed contact, from your first message until you sign your lease.',
      aboutRole: 'Property Direct Rental Agency',

      faqLabel: 'FAQ', faqTitle: 'What to know before you start',
      q1: 'Who do you work for?', a1: 'Only for the tenant. We do not work for landlords and receive nothing from them.',
      q2: 'Why are there no homes on this site?', a2: 'We do not publish listings. We search per tenant, based on your search profile. That keeps us fully on your side.',
      q3: 'What if you find nothing?', a3: 'Then you pay nothing. The fee is only due when you sign a lease through us.',
      q4: 'What do you do with my data?', a4: 'We only use your details to contact you and to search for a home for you. We share them with a landlord only when you ask us to.',
      q5: 'Can I stop?', a5: 'Yes. You can end the mandate before you sign a lease, and no fee is due then.',

      fAbout: 'Personal tenant representation in the Netherlands.',
      fContact: 'Contact', fCompany: 'Company', fLegal: 'Legal',
      fEmail2: '[email]', fPhone2: '[phone]', fKvk: 'KvK [number]', fVat: 'VAT [number]',
      privacyLink: 'Privacy Policy', termsLink: 'Terms and Conditions',
      fine: 'Fee: 1.5× the total monthly rent (including gas, water and electricity) plus 21% VAT, only due when a lease is signed through Property Direct Rental Agency. No costs upfront.'
    },
    nl: {
      homeTitle: 'Property Direct Rental Agency | Persoonlijke huurdersvertegenwoordiging in Nederland',
      homeDesc: 'Property Direct zoekt je huurwoning alleen aan de kant van de huurder. Je betaalt 1,5× de maandhuur plus btw, en alleen als je huurcontract getekend is.',
      privTitle: 'Privacybeleid | Property Direct Rental Agency',
      privDesc: 'Hoe Property Direct Rental Agency omgaat met de persoonsgegevens die je deelt als je je inschrijft.',
      termsTitle: 'Algemene voorwaarden | Property Direct Rental Agency',
      termsDesc: 'De voorwaarden die gelden voor huurdersvertegenwoordiging door Property Direct Rental Agency.',

      skip: 'Naar de inhoud',
      navHow: 'Werkwijze', navWho: 'Voor wie', navFee: 'Tarief', navAbout: 'Over ons', navFaq: 'Vragen', navCta: 'Schrijf je in',
      menuOpen: 'Menu openen', menuClose: 'Menu sluiten', backHome: 'Terug naar home',

      heroLabel: 'Huurdersvertegenwoordiging · Nederland',
      h1a: 'Wij zoeken.', h1b: 'Jij tekent.',
      heroSub: 'Persoonlijke huurdersvertegenwoordiging in Nederland. Je betaalt pas als je huurcontract getekend is.',
      cta1: 'Schrijf je in', cta2: 'Zo werkt het',
      t1: 'Alleen voor de huurder', t2: 'Geen kosten vooraf', t3: 'No cure, no pay',
      scroll: 'Scroll',

      stmt: 'Jij beschrijft wat je nodig hebt. Wij zoeken ernaar, controleren de verhuurder en het huurcontract, en jij tekent alleen waar je blij mee bent.',

      howLabel: 'Werkwijze', howTitle: 'Van registratie tot sleutel',
      s1h: 'Registratie', s1p: 'Vertel wat je nodig hebt: soort woning, regio, budget en startdatum. Het kost een minuut en niets.',
      s2h: 'Opdracht', s2p: 'We leggen de afspraken schriftelijk vast. Pas als je de opdracht hebt ondertekend, beginnen we met zoeken.',
      s3h: 'Zoeken', s3p: 'We zoeken woningen die bij je profiel passen en leggen je alleen opties voor die kloppen.',
      s4h: 'Match en ondertekening', s4p: 'We plannen de bezichtiging, controleren de verhuurder en bekijken het huurcontract samen met jou. Jij tekent het huurcontract zelf, en pas dan is de fee verschuldigd.',

      whoLabel: 'Voor wie', whoTitle: 'Weinig tijd, nieuw op de markt',
      w1h: 'Expats', w1p: 'Net in Nederland, of nog in het buitenland? Wij leggen uit hoe huren hier werkt en helpen je huurfraude te herkennen.',
      w2h: 'Internationale studenten', w2p: 'Kom je in Nederland studeren? Wij doen het zoeken, zodat jij je op je aankomst kunt richten.',
      w3h: 'Young professionals', w3p: 'Begin je aan een baan en heb je weinig tijd? Eén vast aanspreekpunt neemt het zoeken uit handen.',

      feeLabel: 'Tarief', feeTitle: 'Eén fee. Alleen als je tekent.',
      feeLead: '1,5× je totale maandhuur, inclusief gas, water en licht, plus 21% btw. Alleen verschuldigd als er via ons een huurcontract getekend wordt.',
      calcRent: 'Totale maandhuur', calcHint: 'Sleep de schuif of typ een bedrag', calcRentAria: 'Maandhuur in euro’s',
      calcFee: 'Fee (1,5×)', calcVat: 'Btw 21%', calcTotal: 'Totaal bij ondertekening',
      calcNote: 'Inclusief btw is dat 1,815× de maandhuur.',
      exTitle: 'Voorbeelden', thRent: 'Maandhuur', thFee: 'Fee', thVat: 'Btw 21%', thTotal: 'Totaal',
      p1: 'Geen kosten vooraf en geen inschrijfgeld. Teken je via ons geen huurcontract, dan betaal je niets.',
      p2: 'Woningen die je zelf vond of al aangeboden kreeg, vallen buiten de fee.',
      p3: 'Alleen de huurder betaalt. Verhuurders betalen ons nooit iets.',
      p4: 'Je hebt 14 dagen bedenktijd. We beginnen binnen die periode alleen als jij daar uitdrukkelijk om vraagt.',

      regLabel: 'Inschrijven', regTitle: 'Beschrijf wat je zoekt',
      regSub: 'Drie korte stappen. Inschrijven is gratis en vrijblijvend. Het is nog geen opdracht. Daarna nemen we contact op over de schriftelijke opdracht.',
      stepOf: 'Stap {n} van {m}', st1: 'De woning', st2: 'De details', st3: 'Over jou',
      fType: 'Wat zoek je?', oRoom: 'Kamer', oStudio: 'Studio', oApt: 'Appartement', oHouse: 'Huis',
      fRegion: 'Stad of regio', regionPh: 'bijv. Utrecht',
      fDuration: 'Hoelang wil je huren?', d1: 'Korter dan 6 maanden', d2: '6 – 12 maanden', d3: '1 – 2 jaar', d4: 'Langer dan 2 jaar',
      fBudget: 'Budget per maand, totale huur', b1: 'Tot € 800', b2: '€ 800 – 1.200', b3: '€ 1.200 – 1.800', b4: '€ 1.800 – 2.500', b5: '€ 2.500+',
      fStart: 'Wanneer wil je starten?', m1: 'Zo snel mogelijk', m2: 'Binnen 1 maand', m3: 'Binnen 3 maanden', m4: 'Nog geen idee',
      fPeople: 'Met hoeveel personen?', pp1: 'Alleen ik', pp2: '2 personen', pp3: '3 personen', pp4: '4 of meer',
      fRole: 'Je bent', r1: 'Expat', r2: 'Internationale student', r3: 'Young professional',
      fName: 'Naam', fEmail: 'E-mail', fPhone: 'Telefoon (optioneel)',
      fConsent: 'Ik vind het goed dat Property Direct Rental Agency mijn gegevens gebruikt om contact met mij op te nemen en een woning voor mij te zoeken. Dit is nog geen opdracht en er zijn geen kosten.',
      prev: 'Vorige', next: 'Volgende', send: 'Verstuur inschrijving', sending: 'Versturen…',
      eType: 'Kies wat je zoekt.', eRegion: 'Vul een stad of regio in.', eDuration: 'Kies hoelang je wilt huren.',
      eBudget: 'Kies een budget.', eStart: 'Kies wanneer je wilt starten.', ePeople: 'Kies met hoeveel personen.',
      eRole: 'Kies wie je bent.', eName: 'Vul je naam in.', eMail: 'Vul een geldig e-mailadres in.', eConsent: 'Ga akkoord om door te gaan.',
      eSend: 'Versturen is niet gelukt. Probeer het zo nog eens.',
      okLabel: 'Ontvangen', okTitle: 'Bedankt.', okText: 'We nemen contact met je op over de schriftelijke opdracht. Inschrijven kost niets en je zit nergens aan vast.',
      cardTitle: 'Zoekprofiel', cardDraft: 'Concept', cardReady: 'Klaar om te versturen', cardSent: 'Wij zoeken voor je',
      cType: 'Zoekt', cRegion: 'Regio', cBudget: 'Budget', cStart: 'Start', cPeople: 'Personen', cDuration: 'Duur', cRole: 'Je bent',
      cardNote: 'Live opgebouwd uit je antwoorden.',

      aboutLabel: 'Wie we zijn',
      aboutText: 'Ik werk alleen aan de kant van de huurder. Je hebt één vast aanspreekpunt, vanaf je eerste bericht tot je je huurcontract tekent.',
      aboutRole: 'Property Direct Rental Agency',

      faqLabel: 'Vragen', faqTitle: 'Wat je wilt weten voordat je begint',
      q1: 'Voor wie werken jullie?', a1: 'Alleen voor de huurder. Wij werken niet voor verhuurders en ontvangen niets van hen.',
      q2: 'Waarom zie ik hier geen woningen?', a2: 'Wij plaatsen geen aanbod. We zoeken per huurder, op basis van jouw zoekprofiel. Zo blijven we volledig aan jouw kant.',
      q3: 'Wat als jullie niets vinden?', a3: 'Dan betaal je niets. De fee is pas verschuldigd als je via ons een huurcontract tekent.',
      q4: 'Wat doen jullie met mijn gegevens?', a4: 'We gebruiken je gegevens alleen om contact met je op te nemen en een woning voor je te zoeken. We delen ze alleen met een verhuurder als jij dat vraagt.',
      q5: 'Kan ik stoppen?', a5: 'Ja. Je kunt de opdracht beëindigen voordat je een huurcontract tekent, en dan is er geen fee verschuldigd.',

      fAbout: 'Persoonlijke huurdersvertegenwoordiging in Nederland.',
      fContact: 'Contact', fCompany: 'Bedrijf', fLegal: 'Juridisch',
      fEmail2: '[e-mail]', fPhone2: '[telefoon]', fKvk: 'KvK [nummer]', fVat: 'Btw [nummer]',
      privacyLink: 'Privacybeleid', termsLink: 'Algemene voorwaarden',
      fine: 'Tarief: 1,5× de totale maandhuur (inclusief gas, water en licht) plus 21% btw, alleen verschuldigd bij een getekend huurcontract via Property Direct Rental Agency. Geen kosten vooraf.'
    }
  };

  var PD = { lang: 'en', T: T };

  PD.t = function (key) {
    var d = T[PD.lang];
    if (d && d[key] != null) return d[key];
    return T.en[key] != null ? T.en[key] : '';
  };

  PD.eur = function (n) {
    var whole = Math.abs(n - Math.round(n)) < 0.005;
    var digits = whole ? 0 : 2;
    var text = n.toLocaleString(PD.lang === 'nl' ? 'nl-NL' : 'en-GB', { minimumFractionDigits: digits, maximumFractionDigits: digits });
    return '€ ' + text;
  };

  PD.setLang = function (next) {
    if (!T[next]) return;
    PD.lang = next;
    var root = document.documentElement;
    root.lang = next;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var value = T[next][el.getAttribute('data-i18n')];
      if (value != null) el.textContent = value;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var value = T[next][el.getAttribute('data-i18n-placeholder')];
      if (value != null) el.setAttribute('placeholder', value);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var value = T[next][el.getAttribute('data-i18n-aria')];
      if (value != null) el.setAttribute('aria-label', value);
    });
    document.querySelectorAll('[data-lang-block]').forEach(function (el) {
      el.hidden = el.getAttribute('data-lang-block') !== next;
    });

    var titleKey = root.getAttribute('data-title');
    if (titleKey && T[next][titleKey]) document.title = T[next][titleKey];
    var descKey = root.getAttribute('data-desc');
    var meta = document.querySelector('meta[name="description"]');
    if (descKey && meta && T[next][descKey]) meta.setAttribute('content', T[next][descKey]);

    document.querySelectorAll('.lang button').forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-lang') === next ? 'true' : 'false');
    });

    try { localStorage.setItem(LANG_KEY, next); } catch (e) { /* storage unavailable */ }
    document.dispatchEvent(new CustomEvent('pd:lang', { detail: next }));
  };

  window.PD = PD;

  document.querySelectorAll('.lang button').forEach(function (btn) {
    btn.addEventListener('click', function () { PD.setLang(btn.getAttribute('data-lang')); });
  });

  var saved = null;
  try { saved = localStorage.getItem(LANG_KEY); } catch (e) { /* storage unavailable */ }
  PD.setLang(saved === 'nl' ? 'nl' : 'en');
})();
