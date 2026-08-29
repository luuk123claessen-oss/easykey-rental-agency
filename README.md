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

This site is deployed via Cloudflare Pages, connected to this GitHub repository. Pushes to `main` automatically trigger a new deployment.

- Framework preset: None
- Build command: none
- Output directory: `/`

<!-- deploy trigger test 2026-08-29T08:30:34Z -->
<!-- reconnect test 2026-08-29T08:39:25Z -->
