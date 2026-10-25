(function () {
  'use strict';

  var LANG_KEY = 'pd-lang';

  var T = {
    en: {
      homeTitle: 'Property Direct – Tenant representation in the Netherlands',
      homeDesc: 'Personal tenant representation in the Netherlands. We search for your rental home, on your side only. You pay only when your lease is signed.',
      privTitle: 'Privacy Policy – Property Direct',
      privDesc: 'How Property Direct handles the personal data you share when you register.',
      termsTitle: 'Terms and Conditions – Property Direct',
      termsDesc: 'The terms that apply to tenant representation by Property Direct.',
      mandateTitle: 'Mandate and cancellation – Property Direct',
      mandateDesc: 'What the mandate is, when we start searching, when the fee is due and how you can cancel or withdraw.',

      skip: 'Skip to content',
      navHow: 'How it works', navWho: 'Who we help', navFee: 'Fee', navAbout: 'About', navFaq: 'FAQ', navCta: 'Register',
      menuOpen: 'Open menu', menuClose: 'Close menu', backHome: 'Back to home', mainNav: 'Main', mobileNav: 'Mobile',

      heroLabel: 'Tenant representation · The Netherlands',
      h1a: 'We search.', h1b: 'You sign.',
      heroSub: 'Personal tenant representation in the Netherlands. You only pay when your lease is signed.',
      cta1: 'Register', cta2: 'See how it works',
      t1: 'Tenant side only', t2: 'No upfront costs', t3: 'No cure, no pay',

      stmt: 'You describe what you need. We search for it, check the landlord and the lease, and you sign only what you’re happy with.',

      howLabel: 'How it works', howTitle: 'From registration to keys',
      s1h: 'Registration', s1p: 'Tell us what you need: type of home, region, budget and start date. It takes a minute and costs nothing.',
      s2h: 'Mandate', s2p: 'We put the agreement in writing. Only once you have signed the mandate do we start searching.',
      s3h: 'Search', s3p: 'We search for homes that match your profile and put forward only options that fit. Viewings are between you and the landlord.',
      s4h: 'Introduction and signing', s4p: 'We find the landlord and check the landlord and the lease with you. You sign yourself, and only then is the fee due.',

      whoLabel: 'Who we help', whoTitle: 'Short on time, new to the market',
      w1h: 'Expats', w1p: 'New in the Netherlands, or still abroad? We explain how renting works here and help you recognise rental scams.', w1alt: 'A brass key in an old door lock',
      w2h: 'International students', w2p: 'Coming to study in the Netherlands? We do the searching, so you can focus on your arrival.', w2alt: 'A bicycle by a canal railing at night',
      w3h: 'Young professionals', w3p: 'Starting a job and short on time? One fixed contact takes the search off your hands.', w3alt: 'A lit window in a building at dusk',

      feeLabel: 'Fee', feeTitle: 'One fee. Only when you sign.',
      feeLead: '1.5× your total monthly rent, including gas, water and electricity, plus 21% VAT. Due only when a lease is signed through us.',
      p1: 'No costs upfront and no registration fee. If you don’t sign a lease through us, you pay nothing.',
      p2: 'Homes you found yourself are never part of the fee.',
      p3: 'Only the tenant pays. Landlords never pay us anything.',
      p4: 'You have a 14-day withdrawal period. We only start within that period if you explicitly ask us to.',
      calcRent: 'Total monthly rent', calcHint: 'Drag the slider (steps of € 50) or type an amount', calcRentAria: 'Monthly rent in euros', calcSliderAria: 'Monthly rent, slider in steps of 50 euros',
      calcFee: 'Fee excl. VAT (1.5×)', calcVat: 'VAT 21%', calcTotal: 'Total incl. VAT',
      calcDue: 'Due only after you have signed. € 0 if we do not find your home.',
      calcNote: 'Including VAT, that is 1.815× the monthly rent.',
      calcLive: 'At a monthly rent of {rent}: fee {fee} excluding VAT, VAT {vat}, total {total}.',
      exTitle: 'Examples', thRent: 'Monthly rent', thFee: 'Fee', thVat: 'VAT 21%', thTotal: 'Total',
      cmpTitle: 'Who pays matters',
      cmpAName: 'Typical landlord-side agency', cmpAText: 'Paid by the landlord. Serves the landlord.',
      cmpBName: 'Property Direct', cmpBText: 'Paid only by you. Serves you.',

      regLabel: 'Register', regTitle: 'Describe what you’re looking for',
      regSub: 'Three short steps. Registering is free and without obligation. It is not yet a mandate. Afterwards we contact you about the written mandate.',
      stepOf: 'Step {n} of {m}', st1: 'The home', st2: 'The details', st3: 'About you',
      fType: 'What are you looking for?', oRoom: 'Room', oStudio: 'Studio', oApt: 'Apartment', oHouse: 'House',
      fRegion: 'City or region', regionPh: 'e.g. Utrecht',
      fDuration: 'How long do you want to rent?', d1: 'Under 6 months', d2: '6 – 12 months', d3: '1 – 2 years', d4: '2+ years',
      fBudget: 'Budget per month, total rent', b1: 'Up to € 800', b2: '€ 800 – 1,200', b3: '€ 1,200 – 1,800', b4: '€ 1,800 – 2,500', b5: '€ 2,500+',
      fStart: 'When do you want to start?', m1: 'As soon as possible', m2: 'Within 1 month', m3: 'Within 3 months', m4: 'Not sure yet',
      fPeople: 'How many people?', pp1: 'Just me', pp2: '2 people', pp3: '3 people', pp4: '4 or more',
      fRole: 'You are', r1: 'Expat', r2: 'International student', r3: 'Young professional',
      fName: 'Name', fEmail: 'Email', fPhone: 'Phone (optional)',
      fConsent: 'I agree that Property Direct uses my details to contact me and to search for a home for me. This is not yet a mandate and there are no costs.',
      prev: 'Back', next: 'Next', send: 'Send registration', sending: 'Sending…',
      eType: 'Please choose a type of home.', eRegion: 'Which city or region should we search in?', eDuration: 'Please choose a rental period.',
      eBudget: 'Please pick a budget range.', eStart: 'Please choose a start date.', ePeople: 'Please say how many people.',
      eRole: 'Please tell us who you are.', eName: 'Please add your name.', eMail: 'That email address doesn’t look complete yet.',
      eConsent: 'Please tick the box so we may contact you.',
      eSend: 'We couldn’t send your registration just now. Please try again in a moment,', mailLink: 'or email us instead.',
      mailSubject: 'Registration Property Direct',
      okLabel: 'Received', okTitle: 'Thank you.', okText: 'We’ll contact you within one working day. Registering costs nothing and you’re not committed to anything.',
      cardTitle: 'Search profile', cardDraft: 'Draft', cardReady: 'Ready to send', cardSent: 'Received',
      cType: 'Looking for', cRegion: 'Region', cBudget: 'Budget', cStart: 'Start', cPeople: 'People', cDuration: 'Duration', cRole: 'You are',
      cardNote: 'Built from your own answers. It is not a list of homes.',

      aboutLabel: 'Who we are',
      aboutQuote: 'We work on the tenant’s side only. One fixed contact, from your first message until you sign your lease.',
      aboutCite: 'Luuk Claessen and Jalal Selmani, founders. Our principle.',
      founderLuuk: 'Closing, platform & technology', founderJalal: 'First contact & client qualification',
      portraitAlt: 'Portrait of {name}',

      faqLabel: 'FAQ', faqTitle: 'What to know before you start',
      q1: 'What does it cost?', a1: '1.5× your total monthly rent, including gas, water and electricity, plus 21% VAT. For a total rent of € 1,500 that is € 2,250 plus € 472.50 VAT, € 2,722.50 in total. Nothing is due upfront.',
      q2: 'When do I pay?', a2: 'Only after you have signed a lease for a home we found for you. Not when you register, not when you sign the mandate and not while we search.',
      q3: 'What if you don’t find a home?', a3: 'Then you pay nothing. No cure, no pay.',
      q4: 'Do you list homes?', a4: 'No. We do not publish or sell listings and we never show “available homes”. We search per tenant, based on your search profile.',
      q5: 'Do you work for landlords?', a5: 'No. We work for tenants only and never take money from landlords. Landlords do not pay us anything.',
      q6: 'What is the mandate?', a6: 'The mandate is the written agreement in which you instruct us to search for you. We only start searching once you have signed it. Registering on this site is not a mandate.',
      q7: 'Can I cancel?', a7: 'Yes, at any time before you sign a lease, and no fee is due then. As a consumer you also have a 14-day right of withdrawal. We only start within that period if you explicitly ask us to.',
      q8: 'How do you handle my data?', a8: 'We only use your details to contact you and to search for a home for you. We share them with a landlord only when you ask us to. We use no tracking or advertising cookies.',
      q9: 'Which areas and home types?', a9: 'We search throughout the Netherlands. In the registration you tell us the city or region and whether you want a room, studio, apartment or house.',
      q10: 'How long does it take?', a10: 'That depends on the market, your budget and how flexible you are, so we do not promise a timeline. Registering takes about a minute.',
      moreInfo: 'More on the mandate and cancellation',

      fAbout: 'Personal tenant representation in the Netherlands.',
      fVof: 'Property Direct is a trade name of a general partnership (vof).',
      fContact: 'Contact', fCompany: 'Company', fLegal: 'Legal', fLang: 'Language',
      fEmail2: 'Email', fPhone2: 'Phone', fKvk: 'KvK', fVat: 'VAT',
      privacyLink: 'Privacy Policy', termsLink: 'Terms and Conditions', mandateLink: 'Mandate and cancellation', creditsLink: 'Photography credits',
      toTop: 'Back to top',
      fine: 'Fee: 1.5× the total monthly rent (including gas, water and electricity) plus 21% VAT, only due when a lease is signed through Property Direct. No costs upfront. No fee for homes you find yourself.'
    },
    nl: {
      homeTitle: 'Property Direct – Huurdersvertegenwoordiging in Nederland',
      homeDesc: 'Persoonlijke huurdersvertegenwoordiging in Nederland. Wij zoeken je huurwoning, alleen aan jouw kant. Je betaalt pas als je huurcontract getekend is.',
      privTitle: 'Privacybeleid – Property Direct',
      privDesc: 'Hoe Property Direct omgaat met de persoonsgegevens die je deelt als je je inschrijft.',
      termsTitle: 'Algemene voorwaarden – Property Direct',
      termsDesc: 'De voorwaarden die gelden voor huurdersvertegenwoordiging door Property Direct.',
      mandateTitle: 'Opdracht en annuleren – Property Direct',
      mandateDesc: 'Wat de opdracht is, wanneer we gaan zoeken, wanneer de fee verschuldigd is en hoe je kunt annuleren of herroepen.',

      skip: 'Naar de inhoud',
      navHow: 'Werkwijze', navWho: 'Voor wie', navFee: 'Tarief', navAbout: 'Over ons', navFaq: 'Vragen', navCta: 'Schrijf je in',
      menuOpen: 'Menu openen', menuClose: 'Menu sluiten', backHome: 'Terug naar home', mainNav: 'Hoofdmenu', mobileNav: 'Mobiel menu',

      heroLabel: 'Huurdersvertegenwoordiging · Nederland',
      h1a: 'Wij zoeken.', h1b: 'Jij tekent.',
      heroSub: 'Persoonlijke huurdersvertegenwoordiging in Nederland. Je betaalt pas als je huurcontract getekend is.',
      cta1: 'Schrijf je in', cta2: 'Zo werkt het',
      t1: 'Alleen voor de huurder', t2: 'Geen kosten vooraf', t3: 'No cure, no pay',

      stmt: 'Jij beschrijft wat je nodig hebt. Wij zoeken ernaar, controleren de verhuurder en het huurcontract, en jij tekent alleen waar je blij mee bent.',

      howLabel: 'Werkwijze', howTitle: 'Van registratie tot sleutel',
      s1h: 'Registratie', s1p: 'Vertel wat je nodig hebt: soort woning, regio, budget en startdatum. Het kost een minuut en niets.',
      s2h: 'Opdracht', s2p: 'We leggen de afspraken schriftelijk vast. Pas als je de opdracht hebt ondertekend, beginnen we met zoeken.',
      s3h: 'Zoeken', s3p: 'We zoeken woningen die bij je profiel passen en leggen je alleen opties voor die kloppen. Bezichtigingen regel je zelf met de verhuurder.',
      s4h: 'Kennismaking en ondertekening', s4p: 'Wij vinden de verhuurder en controleren samen met jou de verhuurder en het huurcontract. Jij tekent zelf, en pas dan is de fee verschuldigd.',

      whoLabel: 'Voor wie', whoTitle: 'Weinig tijd, nieuw op de markt',
      w1h: 'Expats', w1p: 'Net in Nederland, of nog in het buitenland? Wij leggen uit hoe huren hier werkt en helpen je huurfraude te herkennen.', w1alt: 'Een koperen sleutel in een oud deurslot',
      w2h: 'Internationale studenten', w2p: 'Kom je in Nederland studeren? Wij doen het zoeken, zodat jij je op je aankomst kunt richten.', w2alt: 'Een fiets bij een grachtrailing in de avond',
      w3h: 'Young professionals', w3p: 'Begin je aan een baan en heb je weinig tijd? Eén vast aanspreekpunt neemt het zoeken uit handen.', w3alt: 'Een verlicht raam in een gebouw bij schemering',

      feeLabel: 'Tarief', feeTitle: 'Eén fee. Alleen als je tekent.',
      feeLead: '1,5× je totale maandhuur, inclusief gas, water en licht, plus 21% btw. Alleen verschuldigd als er via ons een huurcontract getekend wordt.',
      p1: 'Geen kosten vooraf en geen inschrijfgeld. Teken je via ons geen huurcontract, dan betaal je niets.',
      p2: 'Woningen die je zelf vond, vallen nooit onder de fee.',
      p3: 'Alleen de huurder betaalt. Verhuurders betalen ons nooit iets.',
      p4: 'Je hebt 14 dagen bedenktijd. We beginnen binnen die periode alleen als jij daar uitdrukkelijk om vraagt.',
      calcRent: 'Totale maandhuur', calcHint: 'Sleep de schuif (stappen van € 50) of typ een bedrag', calcRentAria: 'Maandhuur in euro’s', calcSliderAria: 'Maandhuur, schuif in stappen van 50 euro',
      calcFee: 'Fee excl. btw (1,5×)', calcVat: 'Btw 21%', calcTotal: 'Totaal incl. btw',
      calcDue: 'Pas verschuldigd nadat je hebt getekend. € 0 als wij je woning niet vinden.',
      calcNote: 'Inclusief btw is dat 1,815× de maandhuur.',
      calcLive: 'Bij een maandhuur van {rent}: fee {fee} excl. btw, btw {vat}, totaal {total}.',
      exTitle: 'Voorbeelden', thRent: 'Maandhuur', thFee: 'Fee', thVat: 'Btw 21%', thTotal: 'Totaal',
      cmpTitle: 'Wie betaalt, maakt uit',
      cmpAName: 'Gebruikelijk verhuurdersbureau', cmpAText: 'Betaald door de verhuurder. Werkt voor de verhuurder.',
      cmpBName: 'Property Direct', cmpBText: 'Alleen door jou betaald. Werkt voor jou.',

      regLabel: 'Inschrijven', regTitle: 'Beschrijf wat je zoekt',
      regSub: 'Drie korte stappen. Inschrijven is gratis en vrijblijvend. Het is nog geen opdracht. Daarna nemen we contact op over de schriftelijke opdracht.',
      stepOf: 'Stap {n} van {m}', st1: 'De woning', st2: 'De details', st3: 'Over jou',
      fType: 'Wat zoek je?', oRoom: 'Kamer', oStudio: 'Studio', oApt: 'Appartement', oHouse: 'Huis',
      fRegion: 'Stad of regio', regionPh: 'bijv. Utrecht',
      fDuration: 'Hoelang wil je huren?', d1: 'Korter dan 6 maanden', d2: '6 – 12 maanden', d3: '1 – 2 jaar', d4: 'Langer dan 2 jaar',
      fBudget: 'Budget per maand, totale huur', b1: 'Tot € 800', b2: '€ 800 – 1.200', b3: '€ 1.200 – 1.800', b4: '€ 1.800 – 2.500', b5: '€ 2.500+',
      fStart: 'Wanneer wil je starten?', m1: 'Zo snel mogelijk', m2: 'Binnen 1 maand', m3: 'Binnen 3 maanden', m4: 'Nog geen idee',
      fPeople: 'Met hoeveel personen?', pp1: 'Alleen ik', pp2: '2 personen', pp3: '3 personen', pp4: '4 of meer',
      fRole: 'Je bent', r1: 'Expat', r2: 'Internationale student', r3: 'Young professional',
      fName: 'Naam', fEmail: 'E-mail', fPhone: 'Telefoon (optioneel)',
      fConsent: 'Ik vind het goed dat Property Direct mijn gegevens gebruikt om contact met mij op te nemen en een woning voor mij te zoeken. Dit is nog geen opdracht en er zijn geen kosten.',
      prev: 'Vorige', next: 'Volgende', send: 'Verstuur inschrijving', sending: 'Versturen…',
      eType: 'Kies een soort woning.', eRegion: 'In welke stad of regio moeten we zoeken?', eDuration: 'Kies een huurperiode.',
      eBudget: 'Kies een budget.', eStart: 'Kies een startdatum.', ePeople: 'Geef aan met hoeveel personen.',
      eRole: 'Laat even weten wie je bent.', eName: 'Vul je naam in.', eMail: 'Dat e-mailadres lijkt nog niet compleet.',
      eConsent: 'Vink het vakje aan zodat we contact met je mogen opnemen.',
      eSend: 'We konden je inschrijving nu niet versturen. Probeer het zo nog eens,', mailLink: 'of mail ons direct.',
      mailSubject: 'Inschrijving Property Direct',
      okLabel: 'Ontvangen', okTitle: 'Bedankt.', okText: 'We nemen binnen één werkdag contact met je op. Inschrijven kost niets en je zit nergens aan vast.',
      cardTitle: 'Zoekprofiel', cardDraft: 'Concept', cardReady: 'Klaar om te versturen', cardSent: 'Ontvangen',
      cType: 'Zoekt', cRegion: 'Regio', cBudget: 'Budget', cStart: 'Start', cPeople: 'Personen', cDuration: 'Duur', cRole: 'Je bent',
      cardNote: 'Opgebouwd uit je eigen antwoorden. Dit is geen lijst met woningen.',

      aboutLabel: 'Wie we zijn',
      aboutQuote: 'Wij werken alleen aan de kant van de huurder. Eén vast aanspreekpunt, vanaf je eerste bericht tot je je huurcontract tekent.',
      aboutCite: 'Luuk Claessen en Jalal Selmani, oprichters. Ons uitgangspunt.',
      founderLuuk: 'Afronding, platform & techniek', founderJalal: 'Eerste contact & intake',
      portraitAlt: 'Portret van {name}',

      faqLabel: 'Vragen', faqTitle: 'Wat je wilt weten voordat je begint',
      q1: 'Wat kost het?', a1: '1,5× je totale maandhuur, inclusief gas, water en licht, plus 21% btw. Bij een totale huur van € 1.500 is dat € 2.250 plus € 472,50 btw, samen € 2.722,50. Vooraf is niets verschuldigd.',
      q2: 'Wanneer betaal ik?', a2: 'Alleen nadat je een huurcontract hebt getekend voor een woning die wij voor je hebben gevonden. Niet bij je inschrijving, niet bij de opdracht en niet tijdens het zoeken.',
      q3: 'Wat als jullie geen woning vinden?', a3: 'Dan betaal je niets. No cure, no pay.',
      q4: 'Plaatsen jullie woningen?', a4: 'Nee. Wij publiceren of verkopen geen aanbod en tonen nooit “beschikbare woningen”. We zoeken per huurder, op basis van jouw zoekprofiel.',
      q5: 'Werken jullie voor verhuurders?', a5: 'Nee. Wij werken alleen voor huurders en nemen nooit geld aan van verhuurders. Verhuurders betalen ons niets.',
      q6: 'Wat is de opdracht?', a6: 'De opdracht is de schriftelijke overeenkomst waarin je ons vraagt voor je te zoeken. We beginnen pas met zoeken als je die hebt getekend. Inschrijven op deze site is geen opdracht.',
      q7: 'Kan ik annuleren?', a7: 'Ja, op elk moment voordat je een huurcontract tekent, en dan is er geen fee verschuldigd. Als consument heb je ook 14 dagen bedenktijd. We beginnen binnen die periode alleen als jij daar uitdrukkelijk om vraagt.',
      q8: 'Hoe gaan jullie met mijn gegevens om?', a8: 'We gebruiken je gegevens alleen om contact met je op te nemen en een woning voor je te zoeken. We delen ze alleen met een verhuurder als jij dat vraagt. We gebruiken geen tracking- of advertentiecookies.',
      q9: 'Welke regio’s en soorten woningen?', a9: 'We zoeken in heel Nederland. Bij je inschrijving geef je de stad of regio aan en of je een kamer, studio, appartement of huis wilt.',
      q10: 'Hoelang duurt het?', a10: 'Dat hangt af van de markt, je budget en hoe flexibel je bent, dus we beloven geen termijn. Inschrijven kost ongeveer een minuut.',
      moreInfo: 'Meer over de opdracht en annuleren',

      fAbout: 'Persoonlijke huurdersvertegenwoordiging in Nederland.',
      fVof: 'Property Direct is een handelsnaam van een vennootschap onder firma (vof).',
      fContact: 'Contact', fCompany: 'Bedrijf', fLegal: 'Juridisch', fLang: 'Taal',
      fEmail2: 'E-mail', fPhone2: 'Telefoon', fKvk: 'KvK', fVat: 'Btw',
      privacyLink: 'Privacybeleid', termsLink: 'Algemene voorwaarden', mandateLink: 'Opdracht en annuleren', creditsLink: 'Fotocredits',
      toTop: 'Terug naar boven',
      fine: 'Tarief: 1,5× de totale maandhuur (inclusief gas, water en licht) plus 21% btw, alleen verschuldigd bij een getekend huurcontract via Property Direct. Geen kosten vooraf. Geen fee voor woningen die je zelf vindt.'
    }
  };

  var PD = { lang: 'en', T: T, cfg: window.PD_CONFIG || {} };

  PD.t = function (key) {
    var d = T[PD.lang];
    if (d && d[key] != null) return d[key];
    return T.en[key] != null ? T.en[key] : '';
  };

  PD.eur = function (n) {
    var whole = Math.abs(n - Math.round(n)) < 0.005;
    var digits = whole ? 0 : 2;
    var text = n.toLocaleString(PD.lang === 'nl' ? 'nl-NL' : 'en-GB', { minimumFractionDigits: digits, maximumFractionDigits: digits });
    return '€ ' + text;
  };

  PD.isPlaceholder = function (value) { return !value || /^\[.*\]$/.test(value); };

  function applyConfig() {
    var cfg = PD.cfg;
    document.querySelectorAll('[data-cfg]').forEach(function (el) {
      var value = cfg[el.getAttribute('data-cfg')];
      if (value) el.textContent = value;
    });
    document.querySelectorAll('[data-cfg-href]').forEach(function (a) {
      var key = a.getAttribute('data-cfg-href');
      var value = cfg[key];
      if (PD.isPlaceholder(value)) { a.removeAttribute('href'); return; }
      a.setAttribute('href', (key === 'email' ? 'mailto:' : 'tel:') + value.replace(/\s+/g, ''));
    });
  }

  PD.setLang = function (next, persist) {
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
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      var value = T[next][el.getAttribute('data-i18n-alt')];
      if (value != null) el.setAttribute('alt', value);
    });
    document.querySelectorAll('[data-lang-block]').forEach(function (el) {
      el.hidden = el.getAttribute('data-lang-block') !== next;
    });

    var titleKey = root.getAttribute('data-title');
    if (titleKey && T[next][titleKey]) {
      document.title = T[next][titleKey];
      var ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', T[next][titleKey]);
    }
    var descKey = root.getAttribute('data-desc');
    if (descKey && T[next][descKey]) {
      ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]'].forEach(function (sel) {
        var m = document.querySelector(sel);
        if (m) m.setAttribute('content', T[next][descKey]);
      });
    }

    document.querySelectorAll('.lang button').forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-lang') === next ? 'true' : 'false');
    });

    applyConfig();
    if (persist !== false) {
      try { localStorage.setItem(LANG_KEY, next); } catch (e) { /* storage unavailable */ }
    }
    document.dispatchEvent(new CustomEvent('pd:lang', { detail: next }));
  };

  window.PD = PD;

  document.querySelectorAll('.lang button').forEach(function (btn) {
    btn.addEventListener('click', function () { PD.setLang(btn.getAttribute('data-lang')); });
  });

  // Language: ?lang=nl wins (used by the hreflang link), then the saved choice, then English.
  var wanted = null;
  try { wanted = new URLSearchParams(window.location.search).get('lang'); } catch (e) { /* ignore */ }
  var saved = null;
  try { saved = localStorage.getItem(LANG_KEY); } catch (e) { /* storage unavailable */ }
  var start = (wanted === 'nl' || wanted === 'en') ? wanted : (saved === 'nl' ? 'nl' : 'en');
  PD.setLang(start, wanted ? false : (saved ? undefined : false));
})();
