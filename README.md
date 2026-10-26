# Property Direct

Static website for Property Direct, a tenant-side rental search agency in the Netherlands (a trade name of a general partnership, vof). English by default, with a Dutch (NL) switch.

Live at https://propertydirect.nl

## Structure

```
.
├── index.html             # The one-pager (see "Chapters" below)
├── privacy.html, terms.html, mandate.html     # Supporting pages (EN + NL), marked as drafts
├── guides/                # Move-in guides: index, first week, rental contract, rental scams (EN + NL)
├── css/style.css          # Design system (tokens, type, layout, motion)
├── js/config.js           # Central config: KvK, BTW, email, phone, form endpoint, reel, proof, portraits
├── js/i18n.js             # Translations (EN/NL), language switch (with a view transition)
├── js/home.js             # Hero, scroll effects, calculator, form, Shield, map, story, reel, signature, checklist, menu
├── js/key3d.js            # The rotating emerald-glass key (plain WebGL, lazy)
├── js/vendor/             # Lenis smooth scrolling (MIT)
├── fonts/                 # Self-hosted Inter Tight, JetBrains Mono and a handwriting face (woff2)
├── assets/media/          # Hero video, reel, photos (AVIF + WebP), CREDITS.md
├── assets/team/           # Founder portraits go here (see below)
├── _headers               # Cache and security headers (Cloudflare)
└── wrangler.toml          # Cloudflare Workers (static assets) config
```

## Chapters on the home page

Hero, statement, How it works (with the 3D key), Who we help, marquee, The Shield (interactive sample lease), the scrubbed day-to-night story, principles strip, Where we search (interactive map), the montage reel, Fee (calculator), Register (3 steps and live profile), About (the founders), After you sign (tickable checklist), FAQ, the signature finale and the footer. A chapter index sits on the left edge on wide screens.

## Running locally

No build step. Serve the folder with any static file server:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Things to fill in before launch

Everything lives in one object, `js/config.js` (`window.PD_CONFIG`):

| Key | What it is |
| --- | --- |
| `kvk`, `btw`, `email`, `phone` | Shown in the footer and on the legal pages. Currently `[KvK]`, `[BTW]`, `[email]`, `[phone]`. While `email` is a placeholder, the "or email us instead" link in the form error is left out. |
| `FORM_ENDPOINT`, `FORM_ACCESS_KEY` | The one URL the registration form POSTs JSON to (Web3Forms, key is public by design). |
| `reelOverlay` | `true` shows the four words (search, check, sign, move in) over the reel. Set it to `false` if you replace the reel with one that has its own type. |
| `proof` | Empty on purpose. Add real, provable numbers only, for example `[{ value: '1', label: 'Fixed contact per client' }]`. A proof strip appears only when the list has items. |
| `portraits.luuk`, `portraits.jalal` | Paths of the founder photos, for example `assets/team/luuk.jpg`. While empty, a monogram (L / J) is shown and no file is requested. |

Also: the founders' quote (`aboutQuote` in `js/i18n.js`, marked `FOUNDER-EDIT`), `[KvK]` in the JSON-LD of `index.html`, `[retention period]` in `privacy.html`, and the `[VERIFY]` markers in the guides.

The legal pages and the guides are plain-language drafts. They say so, and they have not been reviewed by a legal professional.

## Content and tone

- All copy lives in the `T` object in `js/i18n.js` (`en` and `nl`). The HTML carries the English text, which is what shows without JavaScript. The legal pages and guides keep their EN and NL text in the HTML itself.
- **Dutch uses "je" throughout** (warm and direct, matching the English tone), never "u". Keep that when you edit copy.
- The fee (1.5 × total monthly rent + 21% VAT) is set by `FEE_MULTIPLIER` and `VAT_RATE` in `js/home.js`.
- `?lang=nl` opens the site in Dutch (this is what `hreflang="nl"` points to). Otherwise the saved choice (localStorage) or English is used.
- Registrations are sent as JSON. Field names and values are Dutch on purpose, so the emails stay the same for the team. No income or other sensitive data is collected.
- Legal statements in the Shield and the guides were checked against rijksoverheid.nl, Volkshuisvesting Nederland, ACM ConsuWijzer and the Fraudehelpdesk on 26 October 2026, with the sources linked on the page. Rent limits change every January: update the 2026 figures then.

## Media

See `assets/media/CREDITS.md` for the source, creator and licence of every file.

- **Hero video**: `hero.webm` + `hero.mp4` (silent, 1280×720, under 2.5 MB each, stabilised and slowed, looped with a crossfade), with `hero-poster*.webp` as fallback. The video starts after the page has loaded; reduced motion, Save-Data, reduced-data and 2G get the poster only (with a slow Ken Burns when motion is allowed). To use another clip, replace `hero.mp4` and delete `hero.webm`.
- **Reel**: `reel.webm` + `reel.mp4` (16 cuts, under 1.2 MB each) and `reel-9x16.mp4` (the same cut for Instagram, LinkedIn and WhatsApp, with the words burnt in). Drop in your own `reel.mp4` (and delete `reel.webm`) and the same player picks it up.
- **Photos**: each exists as AVIF and WebP at 800 and 1600 px wide. The cards are duotoned with CSS (emerald and sage), so any photo that fits the mood works.

## Performance notes

Scripts load progressively (after the page has loaded, on first interaction, or at once for Dutch visitors). The hero renders without JavaScript. Below-the-fold sections use `content-visibility` with measured intrinsic sizes. The key, the reel, the map and Lenis only load when needed.

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`, which deploys the site to Cloudflare Workers (static assets) with `wrangler deploy`.

Every push to any other branch runs `.github/workflows/preview.yml`, which deploys to a separate, noindex Worker: `pd-preview` for `redesign-v2`, and `pd-preview-<branch>` for every other branch (for example https://pd-preview-redesign-v3.luuk123-claessen.workers.dev).

Required GitHub repository secrets:

- `CLOUDFLARE_API_TOKEN`: a Cloudflare API token with Workers edit permission
- `CLOUDFLARE_ACCOUNT_ID`: the Cloudflare account ID
