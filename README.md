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
├── js/config.js           # Central config: KvK, BTW, email, phone, form endpoint, reel, proof, FACTS
├── js/i18n.js             # Translations (EN/NL), language switch (with a view transition)
├── js/home.js             # Hero, scroll effects, calculator, form, Shield, map, story, reel, signature, checklist, menu
├── js/key3d.js            # The rotating emerald-glass key (plain WebGL, lazy)
├── js/vendor/             # Lenis smooth scrolling (MIT)
├── fonts/                 # Self-hosted Inter Tight, JetBrains Mono and a handwriting face (woff2)
├── assets/media/          # Hero video, reel, photos (AVIF + WebP), CREDITS.md
├── _headers               # Cache and security headers (Cloudflare)
└── wrangler.toml          # Cloudflare Workers (static assets) config
```

## Chapters on the home page

Hero (kinetic headline, pinned for about 60 vh), statement, Facts & figures, How it works (four cards that stack, with the 3D key), Who we help, marquee, The Shield (interactive sample lease), the horizontal film-strip (four frames, pinned; a swipe strip on mobile and for reduced motion), the bento grid of principles, the montage reel, Fee (calculator), Register (3 steps and live profile), About (a short founders' quote, initials only), After you sign (tickable checklist), FAQ, the signature finale and the footer. A chapter index sits on the left edge on wide screens. There is no city picker: the register form has a free-text "Region / city" field.

## Look and feel

Nacht, Smaragd, Sage and Paper, as in v3. Photos and video keep their real colours: one grade for all of them lives in two CSS custom properties at the top of `css/style.css`:

```css
--media-filter: saturate(.9) contrast(1.05) brightness(.9);
--media-tint: rgba(14, 70, 52, .10);   /* normal blend, never multiply */
```

Dark gradients only sit behind text (left and bottom scrims). Change the two values once to retune the hero video and poster, persona cards, film-strip, finale, about band and reel.

### Facts & figures

`FACTS` in `js/config.js` (value, prefix, suffix, unit, `label_en`, `label_nl`, `show`). The HTML carries the final values (no JavaScript needed); the count-up runs once at 40% in view. The tiles are indicative figures about the team and network, not the company's own trading history: keep the footnote (`factsNote` in `js/i18n.js`), never write "deals completed" or "our clients" next to them, and keep them out of JSON-LD and meta text.

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
| `proof` | Empty on purpose. Add real, provable numbers only, for example `[{ value: '1', label: 'Fixed contact per client' }]`. A proof strip appears only when the list has items. |
| `FACTS` | The four tiles of the Facts & figures band, see above. |

Also: the founders' quote (`aboutQuote` in `js/i18n.js`, marked `FOUNDER-EDIT`; the About section shows initials only, no names), `[KvK]` in the JSON-LD of `index.html`, `[retention period]` in `privacy.html`, and the `[VERIFY]` markers in the guides.

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

- **Hero video**: `hero-3.webm` + `hero-3.mp4` (the montage of sixteen daylight cuts, 1280×720, silent, about 1.2 MB each) and `hero-3-9x16.mp4` (portrait screens), with `hero-3-poster*.avif/.webp` as the poster (the AVIF is preloaded). The video starts after the page has loaded; reduced motion, Save-Data, reduced-data and 2G get the poster only. `reel-9x16.mp4` is the same cut with the words burnt in, for social media.
- **Night band** (`#reel`): `houses.webm` + `houses.mp4` with `houses-poster*.webp`, plays while in view.
- **Photos**: each exists as AVIF and WebP at 800 and 1600 px wide. They keep their real colours; the shared grade (`--media-filter`, `--media-tint`) is applied in CSS.

## Performance notes

Scripts load progressively (after the page has loaded, on first interaction, or at once for Dutch visitors). The hero renders without JavaScript. Below-the-fold sections use `content-visibility` with measured intrinsic sizes. The key, the reel, the map and Lenis only load when needed.

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`, which deploys the site to Cloudflare Workers (static assets) with `wrangler deploy`.

Every push to any other branch runs `.github/workflows/preview.yml`, which deploys to a separate, noindex Worker: `pd-preview` for `redesign-v2`, and `pd-preview-<branch>` for every other branch (for example https://pd-preview-redesign-v3.luuk123-claessen.workers.dev).

Required GitHub repository secrets:

- `CLOUDFLARE_API_TOKEN`: a Cloudflare API token with Workers edit permission
- `CLOUDFLARE_ACCOUNT_ID`: the Cloudflare account ID
