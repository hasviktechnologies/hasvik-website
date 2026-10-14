# HASVIK Website: Project Context & Decisions

The working memory of this rebuild: why things are the way they are, and what is
still open. Update it whenever a decision changes.

- **Source brief:** `hasvik-nextjs-rebuild-prompt.md` (rebuild of hasviktech.com).
- **Started:** 14 Oct 2026.

## 1. Stack actually used

| Brief asked for | Used | Why |
|---|---|---|
| Next.js 15+ App Router | **Next.js 16.4** (Turbopack, React 19.3) | Latest stable from `create-next-app`. Ships with **Cache Components** + Partial Prefetching on. |
| Tailwind v4 | Tailwind v4 (`@theme` tokens in `src/app/globals.css`) | |
| shadcn/ui (Radix) | Radix primitives via the unified `radix-ui` package, hand-written shadcn-style wrappers in `src/components/ui` | The shadcn CLI is interactive; same result, fewer files. |
| Framer Motion | `motion` (`motion/react`) with `LazyMotion` + `m` + `MotionConfig reducedMotion="user"` | Smaller bundle; honours reduced-motion globally. |
| lucide-react + local tech SVGs | lucide-react; tech/social logos generated from CC0 `simple-icons` into `src/content/tech-icons.generated.ts` | No hot-linking. Java uses the OpenJDK mark (Oracle's Java logo isn't distributed). LinkedIn glyph is hand-drawn. |
| next-intl (or dictionary) | **Dictionary** (`src/i18n/dictionaries/{en,hi}.ts`) + `next/root-params` | Native to Next 16; zero client JS for translations. |
| next-themes | **Not used**: 1-line inline head script + CSS-only toggle | next-themes renders a `<script>` inside a client component, which React 19.2+ warns about in the console (the brief requires zero console errors). |
| next-sitemap | App Router `sitemap.ts` / `robots.ts` | Built-in. |
| Resend | Resend in a Server Action | |
| Toasts | `sonner` | What shadcn uses now. |

## 2. Routing & i18n

- `src/app/[lang]/…` holds every page. Locales: `en` (default), `hi`.
- `src/proxy.ts` (Next 16's new name for middleware):
  - `/about` is **rewritten** to `/en/about`, so English URLs stay clean and unprefixed.
  - `/hi/about` is served as is.
  - `/en/about` gets a **308 redirect** to `/about`, so there are no duplicate URLs.
- `hreflang` alternates (`en-IN`, `hi-IN`, `x-default`) come from `pageMetadata()` in `src/lib/seo.ts`.
- Content strings use `Localized = string | { en, hi }` and `tr(value, locale)`.
  Client quotes (testimonials) are intentionally **not** translated.
- Unknown URLs: `app/[lang]/[...rest]/page.tsx` calls `notFound()`, which renders the branded `not-found.tsx`.

## 3. Next 16 / Cache Components rules we follow

- Every dynamic segment exports `generateStaticParams`, so pages prerender statically.
- `new Date()` (footer year) lives inside a `'use cache'` function with `cacheLife("days")`.
- `params` are Promises. Use the `PageProps<'/[lang]/…'>` helpers.
- `next/root-params` (`lang()`) is called only from Server Components (`getDictionary()`).
  Metadata, OG images and actions use `dictionaryFor(locale)` instead.

## 4. Design decisions

- Brand tokens are preserved (navy `#002F6C`/`#004C9A`, leaf green `#71C554`, Poppins).
- **Contrast fixes (WCAG AA):**
  - Small green text uses `--accent-ink: #367C25` (5.3:1 on white). The brief's `#3E8E2A` measures **4.1:1** and fails AA for small text.
  - Green **heading highlights** on light backgrounds use the gradient `#3E8E2A → #2F8F57` (≥3:1 for large text). `#71C554` on white is only 2.1:1, so it fails even for large text. On navy/dark backgrounds the original bright green is used.
  - Green buttons use **navy text** (`#0B1C3E` on `#71C554` = 7.9:1); white text would be 2.1:1.
- Dark mode is opt-in (light stays the default, per the brief), toggled from the navbar and stored in `localStorage.theme`.
- The old office photo is **not used anywhere**. The About visual is a composed device mockup (`brand-visual.tsx`) built from real project screenshots.
- The design-system pass came from the `ui-ux-pro-max` skill: Swiss-minimal structure, 200–250 ms hovers, 40–60 ms staggers, ≥44 px targets, pausable carousels, reduced-motion support.

## 5. Content decisions & owner TODOs

Search the code for `TODO(owner)` to find all of these.

| Item | Where | Status |
|---|---|---|
| Non-tech services (back-office, digitization, typing, social media, design/printing) | `src/content/services.ts` | Drafted as `published: false`. Hidden until you write copy and publish. Only Data Entry is live. |
| LinkedIn company URL | `src/content/site.ts` → `socials.linkedin` | Empty, so the icon is hidden. |
| Google Business Profile link + review count | `site.ts` → `mapsListingUrl`, `rating.count` | Search-URL placeholder; count set to 3. |
| Exact office geo-coordinates | `site.ts` → `address.geo` | Approximate (Maniar). |
| FAQ answers on pricing / non-tech / domain / payment terms | `src/content/faqs.ts` (`needsReview: true`) | Drafted, need owner review. |
| Case-study text | `src/content/projects.ts` | Drafted from the old site's one-liners. Review them. |
| RM Suncity sub-page links (`/about`, `/academics`, `/gallery`) | `projects.ts` gallery `href` | Assumed paths. Verify. |
| Stats (7 completed / 4 in progress / 7 clients / 1+ yr) | `site.ts` → `stats` | Kept as business totals. The portfolio shows only 6 projects, so these numbers intentionally differ. |
| Mentor names | `src/content/team.ts` | Anonymous, as on the old site. |
| SVG logo | `public/images/logo.webp` | A PNG→WebP of the old logo is used. Replace it when you have an SVG. |
| Project screenshots | `public/images/*.webp` | Real screenshots from the old site, converted to WebP. Replace them as you add projects. |

## 6. Deliberate deviations from the brief

- **No `SearchAction` in the WebSite JSON-LD.** The site has no search page, and Google retired the sitelinks search box in Nov 2024, so the markup would be invalid.
- **Email is optional** in the quote form. Phone/WhatsApp is required, because most target clients prefer phone.
- **Rate limiting is in-memory** (per server instance). That's fine against casual spam. Swap in Upstash/Vercel KV for strict global limits.
- **The CSP uses `'unsafe-inline'` for scripts.** A nonce-based CSP would force every page to render dynamically and lose static prerendering. The rest of the header set (HSTS, XFO, nosniff, Referrer-Policy, Permissions-Policy) is strict.
