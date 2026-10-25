# Property Direct

Static website for Property Direct, a tenant-side rental search agency in the Netherlands (a trade name of a general partnership, vof). English by default, with a Dutch (NL) switch.

Live at https://propertydirect.nl

## Structure

```
.
├── index.html            # Single page: hero, statement, how it works, who we help, fee, register, about, FAQ
├── privacy.html          # Privacy Policy (EN + NL)
├── terms.html            # Terms and Conditions (EN + NL)
├── mandate.html          # Mandate and cancellation (EN + NL)
├── css/style.css         # Design system (tokens, type, layout, motion)
├── js/config.js          # Central config: KvK, BTW, email, phone, form endpoint, portraits
├── js/i18n.js            # Translations (EN/NL), language switch, applies config values
├── js/home.js            # Hero video, scroll effects, fee calculator, registration form, FAQ, menu
├── fonts/                # Self-hosted Inter Tight and JetBrains Mono (latin, woff2)
├── assets/media/         # Hero video + poster, persona and band photos (AVIF + WebP), CREDITS.md
├── assets/team/          # Founder portraits go here (see below)
├── favicon.svg, favicon-32.png, apple-touch-icon.png, icon-192.png, icon-512.png, site.webmanifest
├── og-image.png          # Share image, 1200×630
├── robots.txt, sitemap.xml
├── .assetsignore         # Files that are not published to the live site
└── wrangler.toml         # Cloudflare Workers (static assets) config
```

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
| `kvk` | KvK number (shown in the footer and legal pages). Currently `[KvK]`. |
| `btw` | VAT number. Currently `[BTW]`. |
| `email` | Contact email. Currently `[email]`. While it is a placeholder, the "or email us instead" link in the form error is left out. |
| `phone` | Contact phone. Currently `[phone]`. |
| `FORM_ENDPOINT` | The one URL the registration form POSTs JSON to. Currently Web3Forms. |
| `FORM_ACCESS_KEY` | Web3Forms access key (public by design; it only delivers to its own inbox). |
| `portraits.luuk`, `portraits.jalal` | Paths of the founder photos, for example `assets/team/luuk.jpg`. While empty, an elegant monogram (L / J) is shown and no file is requested. |

The JSON-LD in `index.html` also carries a `[KvK]` placeholder in `identifier`. Replace it when you have the number. The retention period in `privacy.html` (`[retention period]`) is a placeholder as well.

The legal pages are plain-language summaries and say so at the top. They have not been reviewed by a legal professional.

## Content and tone

- All copy lives in the `T` object in `js/i18n.js` (`en` and `nl`). The HTML carries the English text, which is what shows without JavaScript. The legal pages keep their EN and NL text in the HTML itself.
- **Dutch uses "je" throughout** (warm and direct, matching the English tone), never "u". Keep that when you edit copy.
- The fee (1.5 × total monthly rent + 21% VAT) is set by `FEE_MULTIPLIER` and `VAT_RATE` in `js/home.js` and drives the calculator and the examples table. The FAQ answer and the fine print are plain text in `T`.
- `?lang=nl` opens the site in Dutch (this is what the `hreflang="nl"` link points to). Otherwise the saved choice (localStorage) or English is used.
- Registrations are sent as JSON. Field names and values are Dutch on purpose, so the emails stay the same for the team. No income or other sensitive data is collected.

## Media

See `assets/media/CREDITS.md` for the source, creator and licence of every file.

- **Hero video**: `assets/media/hero.webm` + `hero.mp4` (silent, 1280×720, each under 2.5 MB), with `hero-poster.webp` as the fallback. The video starts after the page has loaded, and not at all for reduced motion, Save-Data or 2G connections. To use another clip (for example a Canva export), replace `hero.mp4` and delete `hero.webm` (the browser then falls through to the MP4). No code changes needed.
- **Photos**: each photo exists as AVIF and WebP at 800 and 1600 px wide. The "who we help" cards are duotoned with CSS (emerald and sage), so any photo that fits the mood works.

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`, which deploys the site to Cloudflare Workers (static assets) with `wrangler deploy`.

Every push to any other branch runs `.github/workflows/preview.yml`, which deploys to a separate Worker, `pd-preview` (https://pd-preview.luuk123-claessen.workers.dev), marked noindex. Use it to review changes before merging to `main`.

Required GitHub repository secrets:

- `CLOUDFLARE_API_TOKEN`: a Cloudflare API token with Workers edit permission
- `CLOUDFLARE_ACCOUNT_ID`: the Cloudflare account ID
