# Property Direct Rental Agency

Static website for Property Direct Rental Agency, a tenant-side rental search agent. English by default, with a Dutch (NL) switch in the header.

Live at https://propertydirect.nl

## Structure

```
.
├── index.html        # Single page: hero, how it works, who it's for, pricing, FAQ, sign-up form
├── css/style.css     # Design system (colours, type, layout)
├── js/main.js        # Translations (EN/NL), pricing table, 4-step sign-up form
├── favicon.svg       # PD logo mark
├── og-image.png      # Share image for link previews (1200x630)
├── apple-touch-icon.png
├── robots.txt
├── sitemap.xml
├── .assetsignore     # Files that are not published to the live site
└── wrangler.toml     # Cloudflare Workers (static assets) config
```

The `images/` folder holds the earlier Groningen photography. The current layout does not use it.

## Running locally

No build step. Serve the folder with any static file server:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Content notes

- All copy lives in the `T` object at the top of `js/main.js` (`en` and `nl`). The HTML carries the English text as the no-JavaScript fallback.
- The fee (1.5 x total monthly rent + 21% VAT) is set by `FEE_MULTIPLIER` and `VAT_RATE` in `js/main.js` and drives the pricing table. The headline figure and the fine print are plain text in `T`.
- Sign-up requests are sent through Web3Forms (`ACCESS_KEYS` in `js/main.js`). Field names and values are Dutch on purpose, so the emails stay the same for the team.

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`, which deploys the site to Cloudflare Workers (static assets) with `wrangler deploy`.

Required GitHub repository secrets:

- `CLOUDFLARE_API_TOKEN`: a Cloudflare API token with Workers edit permission
- `CLOUDFLARE_ACCOUNT_ID`: the Cloudflare account ID
