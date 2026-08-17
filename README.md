# WebHaste Starter — Bootstrap 5 (Business Frontpage)

A single-page business/agency landing site for the
[WebHaste browser extension](https://chromewebstore.google.com/detail/webhaste/ofblooflocfdegjjpgjfbefnjmjmbapa)
— also available on [GitHub](https://github.com/desttools/webhaste) — built
on Bootstrap 5.x. Clone this repo, open the folder in the extension, and
start editing — or fork it as the base for your own reusable template.

The design is adapted from [Start Bootstrap's "Business Frontpage"](https://startbootstrap.com/template/business-frontpage)
template (MIT licensed — see [THIRD-PARTY-LICENSES.md](THIRD-PARTY-LICENSES.md)),
converted into WebHaste's page/template split (see below).

This repo is content + config, not a buildable app. There's no bundler, no
`npm install`, no framework of its own. The only tooling is a small Node
script (`.webhaste/compose.js`) that lets you preview pages headlessly,
matching exactly what the extension's Publish / Render to Local Folder
produces.

> **Read [CLAUDE.md](CLAUDE.md) first if you're using an AI coding
> assistant on this repo.** It documents the conventions below in more
> detail and is written specifically to brief an agent that hasn't seen a
> WebHaste project before.

## Quick start

1. Clone the repo and open the folder in the WebHaste extension.
2. Click "Site Settings" in the extension to set your URL and deployment
   settings. You also can edit `.webhaste/site.config.json` manually —
   set `siteName`, `domain`, and confirm `cssFramework` (this starter
   ships configured for `bootstrap5`).
3. Set your recipient address and subject line in `scripts/scripts.js` (see
   "Contact form" below) — or swap the form for your own backend.
4. In the WebHaste extension, begin editing `index.html` to your own
   content — headline, feature copy, pricing tiers, testimonials.
5. Once you have several pages built, click "Edit Menus" to set up your own
   menu structure. You also can update `.webhaste/nav.json` manually — it
   currently points at same-page anchors (`#features`, `#pricing`,
   `#contact`) since this starter ships as a single landing page.
6. Preview the site in WebHaste, or deploy locally (see below) to preview
   directly in your browser. When ready, use the extension to Publish or
   Render to Local Folder when you're ready to ship.

## Contact form

The contact form doesn't call out to any hosted service — submitting it
opens the visitor's own email client via a `mailto:` link, built in
`scripts/scripts.js`. Edit the `recipient` and `subject` constants there to
point at your own address. This is a client-side convenience, not a real
form backend: it depends on the visitor having a configured mail client, and
the fields aren't validated server-side. Swap it out for a hosted form
service or your own backend/action if you need something more robust — the
`<form>` in `index.html` is ordinary page content, not something WebHaste
generates.

## Previewing locally

Page files in this repo are HTML **fragments**, not full documents (more on
this below), so opening `index.html` directly in a browser won't look
right. Use the compose script instead — it applies the same
template/nav/CSS-framework substitution the extension itself does:

```
node .webhaste/compose.js --out .agent-preview
```

This writes fully-composed pages plus copies of `scripts/` and `elements/`
into `.agent-preview/`. Serve that folder with any static file server and
open it in a browser. Use a scratch output folder like this rather than
`dist/` (the real deploy output) so you don't clobber a real build. Run
`node .webhaste/compose.js --help` for all options.

## How a WebHaste project is put together

```
├── index.html ...              ← page content (fragments — see below)
├── 404.html (don't edit)       ← default 404 page needed for Cloudflare and Netlify
├── elements/                   ← favicon
├── scripts/
│   ├── styles.css              ← site-wide custom CSS (layered on top
│   │                              of Bootstrap, loaded via CDN by default)
│   └── scripts.js              ← site-wide custom JS
├── dist/                       ← build output — generated, don't hand-edit
└── .webhaste/
    ├── site.config.json        ← framework, paragraph mode, deploy target
    ├── nav.json                ← header menu structure
    ├── pages.json              ← optional per-page <title>/meta overrides
    ├── block-library.md        ← generated list of available blocks
    ├── templates/              ← page layout(s); active one set in config
    ├── compose.js               ← generated — headless preview renderer
    └── compose-core.js          ← generated — shared substitution logic
```

Page files (`index.html`, and any pages you add) are **fragments** — just
the body content, not `<html>`/`<head>`/`<body>`. The active template in
`.webhaste/templates/` supplies the rest at publish/preview time. See
[CLAUDE.md](CLAUDE.md) for the full breakdown.
