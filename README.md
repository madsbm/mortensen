# madsbechmortensen.dk

Personal portfolio built with [Astro](https://astro.build). Static output, no client framework.

```sh
npm install
npm run dev      # or: astro dev --background
npm run build    # outputs to dist/
```

## Structure

```text
src/
├── content/projects/   One Markdown file per project; `order` sets its place in the list
├── content.config.ts   Project frontmatter schema
├── components/
│   ├── Header.astro    The pill header and its breadcrumb slugs
│   ├── ProjectCover.astro + covers/   HTML-drawn project covers
│   ├── CanvasFx.astro  Wraps live HTML in a Canvas UI effect
│   ├── BinaryBackdrop.astro   The binary layer behind every page
│   └── ContactForm.astro
├── layouts/Base.astro  Page shell, fonts and view transition scoping
├── lib/canvasui/       Vendored Canvas UI effects (see their LICENSE.md)
├── scripts/            Breadcrumb ticker, effect mounting, contact form
├── styles/global.css   Tokens, base styles and view transition animations
└── site.ts             Name, email, profile links, origin trial token
```

## View transitions

Navigation uses native cross-document view transitions (`@view-transition { navigation: auto }`), so there's no client router. A project's number, title and cover carry the same `view-transition-name` on the home page and its case-study page, so opening a project morphs it into place. The pill header is a transition group of its own: a new slug slides in, and switching projects ticks the slug over.

Transition names are only applied under `prefers-reduced-motion: no-preference`. With reduced motion, pages simply crossfade.

## Canvas effects

Two [Canvas UI](https://canvasui.dev) effects, built for the experimental [HTML-in-Canvas API](https://developer.chrome.com/docs/web-platform/html-in-canvas/2d):

- **Binary backdrop** (Asciify): a hidden layer behind the page resolves into 1s and 0s around the mouse. `src/scripts/backdrop.ts` paints the artwork it reads: per-cell noise decides which digit lands where, and a few soft shapes add density and the accent tint. Asciify ships its own DOM capture fallback, so this works in every browser with a mouse, flag or not.
- **Ripple**: one ripple across the contact form when it opens your mail app. It needs the real API, so it only runs where html-in-canvas is available. To see it now, enable `chrome://flags/#canvas-draw-element`. To turn it on for visitors, register for the Chrome origin trial and paste the token into `originTrialToken` in `src/site.ts`.

Both are skipped for `prefers-reduced-motion`, and the backdrop needs a fine pointer.

## Contact form

The form doesn't send anything; it opens a prefilled email in the visitor's mail app. The address never appears in the HTML or JS: it's XOR-encoded at build time with a random key and only decoded in handlers for real user clicks.
