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

      doorCap1: 'Your next home starts with one key.', doorCap2: 'You sign. We hand over the rest.', doorPlate: 'Property Direct', doorSoundOff: 'Sound off', doorSoundOn: 'Sound on',
      bandTrees: 'Amsterdam · early morning', bandBikes: 'Amsterdam · sunrise', bandCanal: 'Amsterdam · a calm morning',
      stmt: 'You describe what you need. We search for it, {{check the landlord}} and the lease, and you sign only what you’re happy with.',

      howLabel: 'How it works', howTitle: 'From registration to {{keys}}',
      s1h: 'Registration', s1p: 'Tell us what you need: type of home, region, budget and start date. It takes a minute and costs nothing.',
      s2h: 'Mandate', s2p: 'We put the agreement in writing. Only once you have signed the mandate do we start searching.',
      s3h: 'Search', s3p: 'We search for homes that match your profile and put forward only options that fit. Viewings are between you and the landlord.',
      s4h: 'Introduction and signing', s4p: 'We find the landlord and check the landlord and the lease with you. You sign yourself, and only then is the fee due.',

      whoLabel: 'Who we help', whoTitle: '{{Short on time}}, new to the market',
      w1h: 'Expats', w1p: 'New in the Netherlands, or still abroad? We explain how renting works here and help you recognise rental scams.', w1alt: 'Canal houses in Amsterdam under a blue sky',
      w2h: 'International students', w2p: 'Coming to study in the Netherlands? We do the searching, so you can focus on your arrival.', w2alt: 'A bicycle by a canal railing in the sun',
      w3h: 'Young professionals', w3p: 'Starting a job and short on time? One fixed contact takes the search off your hands.', w3alt: 'A bright apartment with large windows',

      feeLabel: 'Fee', feeTitle: 'One fee. {{Only when you sign.}}',
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

      regLabel: 'Register', regTitle: 'Describe what you’re {{looking for}}',
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
      portraitAlt: 'Portrait of {name}',

      faqLabel: 'FAQ', faqTitle: 'What to know {{before you start}}',
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
      // FOUNDER-EDIT: the founders' quote below is a placeholder draft. Edit the wording here (EN and NL).
      aboutQuote: 'The Dutch rental market is hard on people who simply need a place to live. We stand on the {{tenant’s side only}} — and we want to make finding a home feel a lot less hard.',
      aboutCite: 'Founders',
      believeLabel: 'What we believe',
      bel1k: 'Fair',
      bel1: 'You pay only when your lease is signed.',
      bel2k: 'Transparent',
      bel2: 'One fee, shown in full before you register.',
      bel3k: 'Human',
      bel3: 'One fixed contact, from first message to signature.',
      navShield: 'Shield',
      navWhere: 'Where',
      marq1: 'Tenant side only',
      marq2: 'No cure, no pay',
      marq3: 'No listings',
      marq4: 'One fixed contact',
      prin1: 'Tenant side only — never paid by landlords.',
      prin2: 'We verify landlord and payment details before any money moves.',
      prin3: 'Fully digital and paperless: mandate, documents and invoice.',
      prin4: 'One fixed contact from first message to signature.',
      shLabel: 'The Shield',
      shTitle: 'We check the landlord and {{the lease}}',
      shLead: 'Rental scams are real. Before you sign or pay anything, we look at who is renting out the home and what the lease says. Point at a line to see what we check.',
      shDoc: 'Rental agreement · sample',
      shDocNote: 'Sample only. No real person or property.',
      rowOwner: 'Landlord',
      rowPay: 'Payment details',
      rowRent: 'Basic rent per month',
      rowDeposit: 'Deposit',
      rowClauses: 'Terms and conditions',
      rowKeys: 'Payment and keys',
      shNote: 'What we check. General information, not legal advice.',
      sh1t: 'Landlord and owner',
      sh1p: 'We check that the person offering the home is the owner, or is authorised by the owner. Ownership is recorded in the public land registry (Kadaster).',
      sh2t: 'Payment details',
      sh2p: 'The name on the bank account should match the landlord, or someone authorised to collect the rent. Anything else is raised with you before any money moves.',
      sh3t: 'Deposit',
      sh3p: 'For leases signed from 1 July 2023 the deposit may be at most 2 months’ basic rent. It must be returned within 14 days after the lease ends, or within 30 days if costs are deducted.',
      sh4t: 'Rent against the legal limit',
      sh4p: 'We compare the basic rent with the rules for its segment. Limits from 1 January 2026: social rent up to € 932.93; middle rent between € 932.93 and € 1,228.07 (or 144–186 points); above that is the free sector (187+ points). In the free sector the Huurcommissie can check the starting rent, within the first 6 months.',
      sh5t: 'Unusual or one-sided clauses',
      sh5p: 'We read the contract for clauses that look unusual or one-sided and explain them in plain language. Agreements and the deposit must be confirmed in writing (Wet goed verhuurderschap, since 1 July 2023).',
      sh6t: 'No money before keys and contract',
      sh6p: 'No payment before there is a signed contract. Key money is not allowed, and neither are costs for drawing up the lease. Be wary of anyone who asks for money just to view a home.',
      shSources: 'Sources',
      shChecked: 'Last checked 26 October 2026',
      srcDeposit: 'Rijksoverheid: deposit',
      srcCosts: 'Rijksoverheid: extra costs',
      srcSegments: 'Rijksoverheid: rent segments',
      srcSteps: 'Rijksoverheid: renting step by step',
      srcWgv: 'Volkshuisvesting Nederland: Wet goed verhuurderschap',
      srcKadaster: 'Kadaster',
      srcFraud: 'Fraudehelpdesk: rental scams',
      mapLabel: 'Where we search',
      mapTitle: 'Across the {{Netherlands}}',
      mapLead: 'We search nationwide. Pick a city to start your search there. These are search areas, never listings.',
      mapAlt: 'Map of the Netherlands with the cities we search in',
      mapHint: 'Choose a city to set it as your region',
      mapGo: 'Search here',
      mapSet: 'Region set to {city}',
      c_amsterdam: 'Amsterdam',
      v_amsterdam: 'Canal belt, the Jordaan and De Pijp.',
      c_rotterdam: 'Rotterdam',
      v_rotterdam: 'Kop van Zuid, the harbour skyline and Witte de Withstraat.',
      c_thehague: 'The Hague',
      v_thehague: 'Statenkwartier, Scheveningen and the sea.',
      c_utrecht: 'Utrecht',
      v_utrecht: 'A compact old centre around the Oudegracht.',
      c_eindhoven: 'Eindhoven',
      v_eindhoven: 'Strijp-S, design and technology.',
      c_groningen: 'Groningen',
      v_groningen: 'A student city around the Noorderplantsoen.',
      c_leiden: 'Leiden',
      v_leiden: 'A university town of canals and gabled houses.',
      c_nijmegen: 'Nijmegen',
      v_nijmegen: 'A hilly old town on the Waal.',
      c_maastricht: 'Maastricht',
      v_maastricht: 'Cobbled streets and the Maas, in the far south.',
      c_enschede: 'Enschede',
      v_enschede: 'A university town near the German border.',
      storyTitle: 'From first message to signature',
      story1: 'You tell us what you need',
      story1s: 'Type of home, region and budget. It takes a minute.',
      story2: 'We search and check',
      story2s: 'We look for homes that fit, and we check the landlord and the lease.',
      story3: 'You sign. We’re done.',
      story3s: 'Only then is the fee due.',
      signLabel: 'The last step',
      signTitle: 'You sign.',
      signLead: 'Type your name and start your search. Nothing is due until your lease is signed.',
      signDoc: 'Rental agreement · signature page',
      signTenant: 'Tenant',
      signNameLabel: 'Your name',
      signPh: 'Type your name',
      signFee: '€ 0 until here',
      signCta: 'Start my search',
      signErr: 'Please type your name first.',
      signHint: 'You only pay after the lease is signed.',
      navSign: 'Start',
      rw1: 'Search',
      rw2: 'Check',
      rw3: 'Sign',
      rw4: 'Move in',
      reelAlt: 'Short film in four beats: search, check, sign, move in.',
      guidesLabel: 'Move-in guides',
      guidesTitle: 'Guides for your move',
      guidesLead: 'Plain-language guides, checked against official Dutch sources. General information, not legal advice.',
      guidesLink: 'Move-in guides',
      guideRead: 'Read the guide',
      guideSources: 'Sources and a last-checked date on every page.',
      gHubTitle: 'Move-in guides – Property Direct',
      gHubDesc: 'Plain-language guides for moving to the Netherlands: your first week, reading a rental contract and spotting rental scams.',
      g1Title: 'Your first week after signing – Property Direct',
      g1Desc: 'What to arrange in your first week after signing a lease in the Netherlands: registration, BSN, DigiD, health insurance and energy.',
      g1t: 'Your first week after signing',
      g1l: 'You have signed. These are the things people usually need to sort out in the first days and weeks, in a sensible order.',
      g2Title: 'How to read a Dutch rental contract – Property Direct',
      g2Desc: 'What a Dutch rental contract must contain, which costs are allowed, deposit rules, rent segments for 2026 and how to have the rent checked.',
      g2t: 'How to read a Dutch rental contract',
      g2l: 'A short checklist of what to look for before you sign, based on official Dutch government information.',
      g3Title: 'How to spot a rental scam – Property Direct',
      g3Desc: 'Checks that help you spot a rental scam in the Netherlands, and what rental rules protect you.',
      g3t: 'How to spot a rental scam',
      g3l: 'Rental scams target people who are in a hurry, often newcomers. A few calm checks before you pay anything go a long way.',
      afLabel: 'After you sign',
      afTitle: 'Your {{first week}}',
      afLead: 'Tick things off as you go. Your progress stays in this browser, and you can share it with a link.',
      afCount: '{n} of {m} done',
      afCopy: 'Copy link to my list',
      afReset: 'Start over',
      afGuide: 'Read the full guide',
      afCopied: 'Link copied',
      ck1t: 'Book your registration appointment',
      ck1d: 'Within 5 days of arrival if you stay longer than 4 months.',
      ck2t: 'Get your BSN',
      ck2d: 'Registering gives you your citizen service number.',
      ck3t: 'Apply for a DigiD',
      ck3d: 'Your digital ID for Dutch government services.',
      ck4t: 'Take out health insurance',
      ck4d: 'As soon as possible, and within 4 months of arriving.',
      ck5t: 'Report your meter readings',
      ck5d: 'Within 5 working days of moving in. Take a dated photo.',
      ck6t: 'Choose your energy supplier',
      ck6d: 'You can choose one for your new address.',
      ck7t: 'Open a Dutch bank account',
      ck7d: 'Requirements differ per bank, so ask what yours needs.',
      ck8t: 'Keep your lease and deposit confirmation',
      ck8d: 'Both must be given to you in writing.',
      chSearch: 'Search',
      chHow: 'How',
      chWho: 'Who',
      chShield: 'Shield',
      chWhere: 'Where',
      chFee: 'Fee',
      chAbout: 'About',
      chFaq: 'FAQ',
      chNav: 'Chapters',
      mobileBar: 'Register',
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

      doorCap1: 'Je volgende thuis begint met één sleutel.', doorCap2: 'Jij tekent. Wij regelen de rest.', doorPlate: 'Property Direct', doorSoundOff: 'Geluid uit', doorSoundOn: 'Geluid aan',
      bandTrees: 'Amsterdam · vroege ochtend', bandBikes: 'Amsterdam · zonsopgang', bandCanal: 'Amsterdam · een rustige ochtend',
      stmt: 'Jij beschrijft wat je nodig hebt. Wij zoeken ernaar, {{controleren de verhuurder}} en het huurcontract, en jij tekent alleen waar je blij mee bent.',

      howLabel: 'Werkwijze', howTitle: 'Van registratie tot {{sleutel}}',
      s1h: 'Registratie', s1p: 'Vertel wat je nodig hebt: soort woning, regio, budget en startdatum. Het kost een minuut en niets.',
      s2h: 'Opdracht', s2p: 'We leggen de afspraken schriftelijk vast. Pas als je de opdracht hebt ondertekend, beginnen we met zoeken.',
      s3h: 'Zoeken', s3p: 'We zoeken woningen die bij je profiel passen en leggen je alleen opties voor die kloppen. Bezichtigingen regel je zelf met de verhuurder.',
      s4h: 'Kennismaking en ondertekening', s4p: 'Wij vinden de verhuurder en controleren samen met jou de verhuurder en het huurcontract. Jij tekent zelf, en pas dan is de fee verschuldigd.',

      whoLabel: 'Voor wie', whoTitle: '{{Weinig tijd}}, nieuw op de markt',
      w1h: 'Expats', w1p: 'Net in Nederland, of nog in het buitenland? Wij leggen uit hoe huren hier werkt en helpen je huurfraude te herkennen.', w1alt: 'Grachtenpanden in Amsterdam onder een blauwe lucht',
      w2h: 'Internationale studenten', w2p: 'Kom je in Nederland studeren? Wij doen het zoeken, zodat jij je op je aankomst kunt richten.', w2alt: 'Een fiets bij een grachtrailing in de zon',
      w3h: 'Young professionals', w3p: 'Begin je aan een baan en heb je weinig tijd? Eén vast aanspreekpunt neemt het zoeken uit handen.', w3alt: 'Een lichte woning met grote ramen',

      feeLabel: 'Tarief', feeTitle: 'Eén fee. {{Alleen als je tekent.}}',
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

      regLabel: 'Inschrijven', regTitle: 'Beschrijf {{wat je zoekt}}',
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
      portraitAlt: 'Portret van {name}',

      faqLabel: 'Vragen', faqTitle: 'Wat je wilt weten {{voordat je begint}}',
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
      // FOUNDER-EDIT: the founders' quote below is a placeholder draft. Edit the wording here (EN and NL).
      aboutQuote: 'De Nederlandse huurmarkt is zwaar voor mensen die gewoon een plek nodig hebben om te wonen. Wij staan alleen aan de {{kant van de huurder}} — en willen het vinden van een woning veel lichter laten voelen.',
      aboutCite: 'Oprichters',
      believeLabel: 'Waar we in geloven',
      bel1k: 'Eerlijk',
      bel1: 'Je betaalt pas als je huurcontract getekend is.',
      bel2k: 'Transparant',
      bel2: 'Eén tarief, vooraf volledig zichtbaar.',
      bel3k: 'Menselijk',
      bel3: 'Eén vast aanspreekpunt, van eerste bericht tot handtekening.',
      navShield: 'Shield',
      navWhere: 'Waar',
      marq1: 'Alleen voor de huurder',
      marq2: 'No cure, no pay',
      marq3: 'Geen aanbod',
      marq4: 'Eén vast aanspreekpunt',
      prin1: 'Alleen voor de huurder — nooit betaald door verhuurders.',
      prin2: 'We controleren verhuurder en betaalgegevens voordat er geld verhuist.',
      prin3: 'Volledig digitaal en papierloos: opdracht, documenten en factuur.',
      prin4: 'Eén vast aanspreekpunt van eerste bericht tot handtekening.',
      shLabel: 'De Shield',
      shTitle: 'Wij controleren de verhuurder en {{het huurcontract}}',
      shLead: 'Huurfraude bestaat echt. Voordat je tekent of iets betaalt, kijken wij wie de woning verhuurt en wat het huurcontract zegt. Wijs een regel aan om te zien wat we controleren.',
      shDoc: 'Huurovereenkomst · voorbeeld',
      shDocNote: 'Alleen een voorbeeld. Geen echte persoon of woning.',
      rowOwner: 'Verhuurder',
      rowPay: 'Betaalgegevens',
      rowRent: 'Kale huur per maand',
      rowDeposit: 'Borg',
      rowClauses: 'Voorwaarden',
      rowKeys: 'Betaling en sleutels',
      shNote: 'Wat wij controleren. Algemene informatie, geen juridisch advies.',
      sh1t: 'Verhuurder en eigenaar',
      sh1p: 'We controleren of degene die de woning aanbiedt de eigenaar is, of namens de eigenaar mag verhuren. Eigendom staat in het openbare kadaster.',
      sh2t: 'Betaalgegevens',
      sh2p: 'De naam bij het rekeningnummer hoort die van de verhuurder te zijn, of van iemand die namens hem de huur mag ontvangen. Wijkt het af, dan bespreken we dat met je voordat er geld verhuist.',
      sh3t: 'Borg',
      sh3p: 'Bij huurcontracten vanaf 1 juli 2023 mag de borg maximaal 2 maanden kale huur zijn. De verhuurder moet de borg binnen 14 dagen na het einde van de huur terugbetalen, of binnen 30 dagen als er kosten worden verrekend.',
      sh4t: 'Huur tegenover de wettelijke grens',
      sh4p: 'We leggen de kale huur naast de regels voor het segment. Grenzen vanaf 1 januari 2026: sociale huur tot € 932,93; middenhuur tussen € 932,93 en € 1.228,07 (of 144–186 punten); daarboven vrije sector (187+ punten). In de vrije sector kan de Huurcommissie de beginhuur toetsen, binnen de eerste 6 maanden.',
      sh5t: 'Ongebruikelijke of eenzijdige bedingen',
      sh5p: 'We lezen het huurcontract op bedingen die ongebruikelijk of eenzijdig lijken en leggen ze in gewone taal uit. Afspraken en de borg moeten schriftelijk bevestigd worden (Wet goed verhuurderschap, sinds 1 juli 2023).',
      sh6t: 'Geen geld vóór sleutels en contract',
      sh6p: 'Geen betaling zolang er geen getekend huurcontract is. Sleutelgeld mag niet, en kosten voor het opstellen van het huurcontract ook niet. Wees op je hoede voor iedereen die geld vraagt om een woning te mogen bekijken.',
      shSources: 'Bronnen',
      shChecked: 'Laatst gecontroleerd op 26 oktober 2026',
      srcDeposit: 'Rijksoverheid: waarborgsom',
      srcCosts: 'Rijksoverheid: extra kosten',
      srcSegments: 'Rijksoverheid: huursegmenten',
      srcSteps: 'Rijksoverheid: stappenplan woning huren',
      srcWgv: 'Volkshuisvesting Nederland: Wet goed verhuurderschap',
      srcKadaster: 'Kadaster',
      srcFraud: 'Fraudehelpdesk: huurfraude',
      mapLabel: 'Waar we zoeken',
      mapTitle: 'Door heel {{Nederland}}',
      mapLead: 'We zoeken in heel Nederland. Kies een stad om daar je zoektocht te starten. Dit zijn zoekgebieden, nooit aanbod.',
      mapAlt: 'Kaart van Nederland met de steden waar we zoeken',
      mapHint: 'Kies een stad om die als je regio in te vullen',
      mapGo: 'Zoek hier',
      mapSet: 'Regio ingesteld op {city}',
      c_amsterdam: 'Amsterdam',
      v_amsterdam: 'De grachtengordel, de Jordaan en De Pijp.',
      c_rotterdam: 'Rotterdam',
      v_rotterdam: 'Kop van Zuid, de havenskyline en de Witte de Withstraat.',
      c_thehague: 'Den Haag',
      v_thehague: 'Statenkwartier, Scheveningen en de zee.',
      c_utrecht: 'Utrecht',
      v_utrecht: 'Een compact oud centrum rond de Oudegracht.',
      c_eindhoven: 'Eindhoven',
      v_eindhoven: 'Strijp-S, design en techniek.',
      c_groningen: 'Groningen',
      v_groningen: 'Een studentenstad rond het Noorderplantsoen.',
      c_leiden: 'Leiden',
      v_leiden: 'Een universiteitsstad vol grachten en trapgevels.',
      c_nijmegen: 'Nijmegen',
      v_nijmegen: 'Een heuvelachtige oude stad aan de Waal.',
      c_maastricht: 'Maastricht',
      v_maastricht: 'Kasseien en de Maas, in het uiterste zuiden.',
      c_enschede: 'Enschede',
      v_enschede: 'Een universiteitsstad vlak bij de Duitse grens.',
      storyTitle: 'Van eerste bericht tot handtekening',
      story1: 'Jij vertelt wat je nodig hebt',
      story1s: 'Soort woning, regio en budget. Het kost een minuut.',
      story2: 'Wij zoeken en controleren',
      story2s: 'We zoeken woningen die passen en controleren de verhuurder en het huurcontract.',
      story3: 'Jij tekent. Wij zijn klaar.',
      story3s: 'Pas dan is de fee verschuldigd.',
      signLabel: 'De laatste stap',
      signTitle: 'Jij tekent.',
      signLead: 'Typ je naam en start je zoektocht. Er is niets verschuldigd tot je huurcontract getekend is.',
      signDoc: 'Huurovereenkomst · handtekeningpagina',
      signTenant: 'Huurder',
      signNameLabel: 'Je naam',
      signPh: 'Typ je naam',
      signFee: '€ 0 tot hier',
      signCta: 'Start mijn zoektocht',
      signErr: 'Typ eerst je naam.',
      signHint: 'Je betaalt pas nadat het huurcontract getekend is.',
      navSign: 'Start',
      rw1: 'Zoek',
      rw2: 'Controleer',
      rw3: 'Teken',
      rw4: 'Intrekken',
      reelAlt: 'Korte film in vier stappen: zoeken, controleren, tekenen, intrekken.',
      guidesLabel: 'Verhuisgidsen',
      guidesTitle: 'Gidsen voor je verhuizing',
      guidesLead: 'Begrijpelijke gidsen, getoetst aan officiële Nederlandse bronnen. Algemene informatie, geen juridisch advies.',
      guidesLink: 'Verhuisgidsen',
      guideRead: 'Lees de gids',
      guideSources: 'Op elke pagina bronnen en een datum van laatste controle.',
      gHubTitle: 'Verhuisgidsen – Property Direct',
      gHubDesc: 'Begrijpelijke gidsen voor je verhuizing naar Nederland: je eerste week, een huurcontract lezen en huurfraude herkennen.',
      g1Title: 'Je eerste week na het tekenen – Property Direct',
      g1Desc: 'Wat je regelt in je eerste week na het tekenen van een huurcontract in Nederland: inschrijven, BSN, DigiD, zorgverzekering en energie.',
      g1t: 'Je eerste week na het tekenen',
      g1l: 'Je hebt getekend. Dit zijn de dingen die je meestal in de eerste dagen en weken moet regelen, in een handige volgorde.',
      g2Title: 'Zo lees je een Nederlands huurcontract – Property Direct',
      g2Desc: 'Wat er in een Nederlands huurcontract hoort, welke kosten mogen, de regels voor de borg, huursegmenten in 2026 en hoe je de huur laat toetsen.',
      g2t: 'Zo lees je een Nederlands huurcontract',
      g2l: 'Een korte checklist van waar je op let voordat je tekent, gebaseerd op officiële informatie van de Nederlandse overheid.',
      g3Title: 'Zo herken je huurfraude – Property Direct',
      g3Desc: 'Controles waarmee je huurfraude in Nederland herkent, en welke huurregels jou beschermen.',
      g3t: 'Zo herken je huurfraude',
      g3l: 'Huurfraude richt zich op mensen die haast hebben, vaak nieuwkomers. Een paar rustige controles voordat je iets betaalt helpen een heel eind.',
      afLabel: 'Na het tekenen',
      afTitle: 'Je {{eerste week}}',
      afLead: 'Vink af wat je gedaan hebt. Je voortgang blijft in deze browser bewaard en je kunt hem delen met een link.',
      afCount: '{n} van {m} gedaan',
      afCopy: 'Kopieer link naar mijn lijst',
      afReset: 'Opnieuw beginnen',
      afGuide: 'Lees de hele gids',
      afCopied: 'Link gekopieerd',
      ck1t: 'Plan je inschrijfafspraak',
      ck1d: 'Binnen 5 dagen na aankomst als je langer dan 4 maanden blijft.',
      ck2t: 'Ontvang je BSN',
      ck2d: 'Door je in te schrijven krijg je je burgerservicenummer.',
      ck3t: 'Vraag een DigiD aan',
      ck3d: 'Je digitale identiteit voor Nederlandse overheidsdiensten.',
      ck4t: 'Sluit een zorgverzekering af',
      ck4d: 'Zo snel mogelijk, en binnen 4 maanden na aankomst.',
      ck5t: 'Geef je meterstanden door',
      ck5d: 'Binnen 5 werkdagen na je verhuizing. Maak een foto met datum.',
      ck6t: 'Kies je energieleverancier',
      ck6d: 'Je kunt er een kiezen voor je nieuwe adres.',
      ck7t: 'Open een Nederlandse bankrekening',
      ck7d: 'De eisen verschillen per bank, vraag dus wat de jouwe nodig heeft.',
      ck8t: 'Bewaar je huurcontract en borgbevestiging',
      ck8d: 'Beide moet je schriftelijk krijgen.',
      chSearch: 'Zoek',
      chHow: 'Werkwijze',
      chWho: 'Voor wie',
      chShield: 'Shield',
      chWhere: 'Waar',
      chFee: 'Tarief',
      chAbout: 'Over ons',
      chFaq: 'Vragen',
      chNav: 'Hoofdstukken',
      mobileBar: 'Schrijf je in',
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
      if (value && el.textContent !== value) el.textContent = value;
    });
    document.querySelectorAll('[data-cfg-href]').forEach(function (a) {
      var key = a.getAttribute('data-cfg-href');
      var value = cfg[key];
      if (PD.isPlaceholder(value)) { a.removeAttribute('href'); return; }
      a.setAttribute('href', (key === 'email' ? 'mailto:' : 'tel:') + value.replace(/\s+/g, ''));
    });
  }

  // {{words}} in a string become a Mint highlighter mark (built with DOM nodes, never innerHTML)
  function setText(el, value) {
    var plain = value.indexOf('{{') === -1 ? value : value.replace(/\{\{|\}\}/g, '');
    if (el.textContent === plain) return;
    if (plain === value) { el.textContent = value; return; }
    el.textContent = '';
    value.split(/(\{\{.*?\}\})/).forEach(function (part) {
      if (!part) return;
      if (part.slice(0, 2) === '{{') {
        var m = document.createElement('mark');
        m.className = 'hl on';
        m.textContent = part.slice(2, -2);
        el.appendChild(m);
      } else el.appendChild(document.createTextNode(part));
    });
  }

  PD.setLang = function (next, persist) {
    if (!T[next]) return;
    PD.lang = next;
    var root = document.documentElement;
    root.lang = next;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var value = T[next][el.getAttribute('data-i18n')];
      if (value != null) setText(el, value);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var value = T[next][el.getAttribute('data-i18n-placeholder')];
      if (value != null && el.getAttribute('placeholder') !== value) el.setAttribute('placeholder', value);
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
    btn.addEventListener('click', function () {
      var l = btn.getAttribute('data-lang');
      var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (document.startViewTransition && !calm && l !== PD.lang) document.startViewTransition(function () { PD.setLang(l); });
      else PD.setLang(l);
    });
  });

  // Language: ?lang=nl wins (used by the hreflang link), then the saved choice, then English.
  var wanted = null;
  try { wanted = new URLSearchParams(window.location.search).get('lang'); } catch (e) { /* ignore */ }
  var saved = null;
  try { saved = localStorage.getItem(LANG_KEY); } catch (e) { /* storage unavailable */ }
  var start = (wanted === 'nl' || wanted === 'en') ? wanted : (saved === 'nl' ? 'nl' : 'en');
  PD.setLang(start, wanted ? false : (saved ? undefined : false));
})();
