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
├── content/
│   ├── projects/<id>.yaml         Order, status, cover and links for each project
│   └── writeups/<lang>/<id>.md    The write-up for a project in one language
├── content.config.ts   Schemas for both collections
├── i18n/
│   ├── config.ts       Languages, localised slugs and path helpers
│   └── ui.ts           Every interface string per language, including skills and the about timeline
├── components/
│   ├── pages/          HomePage and ProjectPage, rendered once per language
│   ├── Header.astro    The pill header, breadcrumb slugs and language switch
│   ├── ProjectCover.astro + covers/   HTML-drawn project covers
│   ├── CanvasFx.astro  Wraps live HTML in a Canvas UI effect
│   ├── BinaryBackdrop.astro   The binary layer behind every page
│   ├── ProfileRail.astro      GitHub and LinkedIn pinned to the left edge
│   ├── BrandIcon.astro        GitHub and LinkedIn logos
│   └── ContactForm.astro
├── pages/              Thin routes: / and /work/<id>, /da/ and /da/arbejde/<id>
├── layouts/Base.astro  Page shell, fonts, language redirect, view transition scoping
├── lib/canvasui/       Vendored Canvas UI effects (see their LICENSE.md)
├── scripts/            Breadcrumb ticker, effect mounting, contact form, language switch, project list, timeline
├── styles/global.css   Tokens (plus an `.inverted` dark scope), base styles, view transitions
└── site.ts             Name, email, profile links, origin trial token
```

To add a project, create `content/projects/<id>.yaml` and a write-up in each language under `content/writeups/`. A missing translation falls back to English.

## Languages

English lives at `/`, Danish at `/da/`, with localised slugs (`/da/arbejde/tos`, `#om`, `#kontakt`). Every page links its counterparts with `hreflang`.

An inline script in `<head>` picks the language before anything renders:

1. A language picked with the switch is remembered and always wins.
2. Otherwise, a visitor arriving at an English address whose browser prefers Danish is sent to the Danish page.

Danish addresses never redirect on browser preference alone, so shared `/da/` links stay Danish and crawlers can index both languages. The 404 page shows the language of the address that was requested.

## View transitions

Navigation uses native cross-document view transitions (`@view-transition { navigation: auto }`), so there's no client router. A project's number, title and cover carry the same `view-transition-name` on the home page and its case-study page, so opening a project morphs it into place. The pill header is a transition group of its own: a new slug slides in, and switching projects ticks the slug over.

Transition names are only applied under `prefers-reduced-motion: no-preference`. With reduced motion, pages simply crossfade.

## Canvas effects

Two [Canvas UI](https://canvasui.dev) effects, built for the experimental [HTML-in-Canvas API](https://developer.chrome.com/docs/web-platform/html-in-canvas/2d):

- **Binary backdrop** (Asciify): a hidden layer behind the page resolves into 1s and 0s around the mouse. `src/scripts/backdrop.ts` paints the artwork it reads: per-cell noise decides which digit lands where, and accent shapes in the margins tint the digits red. The same shapes mask the effect's output: digits only stand out inside a shape, outside the text column and clear of the profile rail. They also come through in the empty space at the top of the home page, above the skill grid (marked with `data-backdrop-zone`); a script moves that edge as the page scrolls. Elsewhere across the text column they stay at the faintest level. Asciify ships its own DOM capture fallback, so this works in every browser with a mouse, flag or not.
- **Ripple**: one ripple across the contact form when it opens your mail app. It needs the real API, so it only runs where html-in-canvas is available. To see it now, enable `chrome://flags/#canvas-draw-element`. To turn it on for visitors, register for the Chrome origin trial and paste the token into `originTrialToken` in `src/site.ts`.

Both are skipped for `prefers-reduced-motion`, and the backdrop needs a fine pointer.

## Contact sheet

The contact section is a dark sheet (`.inverted` swaps the colour tokens, so the form and buttons invert without their own dark styles). The page above it ends in rounded corners, and scrolling lifts the page off the sheet: the contact section and the footer (which sits on the sheet) hold still exactly where they end up at the bottom of the page, while the page's edge slides up past them. The sheet's spacing scales with the screen's height so it fits on laptop screens; where it can't fit (phones), it holds still until the page is gone, then scrolls normally. It's plain `position: sticky` (the content sticks to both edges of the screen inside a clipped window that reaches up under the page), so it moves in step with scrolling in every browser. With reduced motion the sheet simply scrolls in.

## Contact form

The form doesn't send anything; it opens a prefilled email in the visitor's mail app. The address never appears in the HTML or JS: it's XOR-encoded at build time with a random key and only decoded in handlers for real user clicks.
