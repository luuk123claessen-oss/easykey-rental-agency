# EasyKey Rental Agency

A static website for EasyKey Rental Agency, a room and apartment rental agency based in Groningen, Netherlands.

## Project structure

```
.
├── index.html      # Main page: hero, listings, how-it-works, about, contact
├── css/
│   └── style.css   # Site styling
├── js/
│   └── main.js     # Mobile nav toggle, footer year, contact form handling
└── README.md
```

## Running locally

This is a static site with no build step. Open `index.html` directly in a browser, or serve the folder with any static file server, e.g.:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deployment

This site is deployed to Cloudflare Workers (static assets) via GitHub Actions (`.github/workflows/deploy.yml`). Every push to `main` runs `wrangler deploy` automatically.

Required GitHub repository secrets:

- `CLOUDFLARE_API_TOKEN` — a Cloudflare API token with Workers edit permission
- `CLOUDFLARE_ACCOUNT_ID` — the Cloudflare account ID

Live at: https://easykey-rental-agency.luuk123-claessen.workers.dev
