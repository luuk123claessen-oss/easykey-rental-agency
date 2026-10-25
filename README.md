# Property Direct Rental Agency

Static website for Property Direct Rental Agency, a tenant-side rental search agent. English by default, with a Dutch (NL) switch in the header.

Live at https://propertydirect.nl

## Structure

```
.
├── index.html        # Single page: hero, how it works, who we help, fee calculator, register, about, FAQ
├── privacy.html      # Privacy Policy (EN + NL)
├── terms.html        # Terms and Conditions (EN + NL)
├── css/style.css     # Design system (colours, type, layout, motion)
├── js/i18n.js        # Translations (EN/NL) and language switch
├── js/home.js        # Hero scene, scroll effects, fee calculator, registration form
├── fonts/            # Self-hosted Inter Tight and JetBrains Mono (latin, woff2)
├── favicon.svg       # PD logo mark
├── og-image.png      # Share image for link previews (1200x630)
├── apple-touch-icon.png
├── robots.txt
├── sitemap.xml
├── .assetsignore     # Files that are not published to the live site
└── wrangler.toml     # Cloudflare Workers (static assets) config
```

## Running locally

No build step. Serve the folder with any static file server:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Content notes

- All copy lives in the `T` object in `js/i18n.js` (`en` and `nl`). The HTML carries the English text as the no-JavaScript fallback. The legal pages hold their EN and NL text in the HTML itself.
- The fee (1.5 x total monthly rent + 21% VAT) is set by `FEE_MULTIPLIER` and `VAT_RATE` in `js/home.js` and drives the calculator and the examples table.
- Registrations are sent through Web3Forms (`ACCESS_KEYS` in `js/home.js`). Field names and values are Dutch on purpose, so the emails stay the same for the team.
- Placeholders to fill in before launch: `[email]`, `[phone]`, KvK and VAT numbers (footer and legal pages), the retention period in the privacy policy, the About photo and name.

## Hero video

The hero currently shows an animated SVG scene. To add a video loop, put a silent, 8 to 12 second clip in `media/hero.webm` and `media/hero.mp4` (each under 3 MB) and set `HERO_VIDEO = true` in `js/home.js`. It is skipped on slow connections, when data saver is on, and for visitors who prefer reduced motion.

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`, which deploys the site to Cloudflare Workers (static assets) with `wrangler deploy`.

Every push to any other branch runs `.github/workflows/preview.yml`, which deploys to a separate Worker, `pd-preview` (https://pd-preview.luuk123-claessen.workers.dev), marked noindex. Use it to review changes before merging to `main`.

Required GitHub repository secrets:

- `CLOUDFLARE_API_TOKEN`: a Cloudflare API token with Workers edit permission
- `CLOUDFLARE_ACCOUNT_ID`: the Cloudflare account ID
