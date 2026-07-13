# SEO / AEO / GEO Audit — Spray Liquid Green

**Scope:** All 8 public HTML pages + repo root.
**Date:** 2026-07-13
**Verdict:** Solid foundation (good hierarchy, alt text, semantic structure, accessibility on FAQ). Missing the entire modern SEO/AEO/GEO metadata layer that Google, Bing, and AI search engines (Perplexity, ChatGPT, Gemini) reward.

---

## What you're already doing right ✅

- HTML5 doctype, `lang="en"` on every page
- Unique `<title>` and `<meta description>` per page
- Single `<h1>` per page, clean h2/h3 hierarchy
- All `<img>` have `alt` text; decorative icons marked `aria-hidden="true"`
- `<details>/<summary>` FAQ (great for a11y, screen readers, and AI extraction)
- `loading="lazy"` on gallery images
- Phone (`tel:`), full address, email, hours, service area visible
- Favicon set + Apple touch icons
- Mobile viewport meta correct
- 8 unique page titles, no duplication

---

## What's missing (the real issues)

### 🔴 Critical — SEO foundations absent on **every page**

| Item | Impact | Pages affected |
|---|---|---|
| **No JSON-LD structured data** | Google can't build Knowledge Panel, FAQ rich results, Local Pack entries, or Service rich results. AI search engines can't extract facts. | all 8 |
| **No `<link rel="canonical">`** | Duplicate-content risk; dilutes PageRank if site is ever scraped/mirrored. | all 8 |
| **No Open Graph tags** (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`) | Broken social previews on Facebook, LinkedIn, Slack, Discord, iMessage. | all 8 |
| **No Twitter Card tags** | Broken previews on X/Twitter. | all 8 |
| **No `robots` meta** | Default is fine but should be explicit. | all 8 |
| **No `theme-color` meta** | Chrome address bar doesn't match brand on mobile. | all 8 |

### 🔴 Critical — Schemas that **must** exist (current: 0)

For a local service business, Google expects:

- `Organization` — entity identity (powers Knowledge Graph)
- `LocalBusiness` — NAP + hours + service area (powers "near me" + Local Pack)
- `FAQPage` — converts your existing FAQ accordion into rich results + AEO source
- `Service` — per service (Open Cell, Closed Cell, Attic, Basement, etc.)
- `BreadcrumbList` — every inner page
- `WebSite` — site-level entity
- `VideoObject` — your 37 MB hero video (it's a discoverable asset!)
- `ContactPage` — on `contact.html`

### 🟠 AEO (Answer Engine Optimization)

Your home page FAQ is perfect AEO raw material, but it's not marked up as `FAQPage` schema. That means:

- Google **won't show** the expandable FAQ rich result in SERPs
- Voice assistants (Google Assistant, Siri, Alexa) **can't pull** the answers cleanly
- Perplexity / ChatGPT / Gemini **can read the HTML** but will struggle to attribute answers to a specific Q&A pair

**Missing AEO patterns:**
- No FAQ schema on any page
- No per-page Q&A on inner pages (e.g., "What's the difference between open and closed cell?" on `products.html` would capture long-tail AEO queries)
- No "speaking-to-the-question" phrasing in the FAQ answers (current answers are great for humans but lack the crisp, citation-ready phrasing AEO loves)
- No `dateModified` / freshness signals

### 🟠 GEO (Generative Engine Optimization)

AI search engines (ChatGPT, Perplexity, Gemini, Copilot) cross-reference entities across the web. Right now Liquid Green is **not a claimable entity** because:

- No `Organization` schema with `sameAs` (social profile links)
- No author/creator markup for AIG
- No Wikidata/Wikipedia/BBB claims (out of scope here, but flagging)
- No `lastReviewed` / `datePublished` signals

**Quick win:** add `sameAs` to Organization schema pointing at Facebook + Instagram. This is the single highest-leverage GEO fix you can make today.

### 🟡 Hierarchy / structure improvements

- No `<main>` landmark on most pages (some have it, some don't — needs to be consistent for a11y + screen readers + Google page-understanding)
- Skip link exists but target needs verification on all pages
- `href="#"` placeholders in some pages (a11y + SEO negative)
- No visual or schema breadcrumbs on inner pages (helps both users and Google)
- Footer `<h3>` blocks ("Liquid Green", "Explore", "Company", "Contact") — currently headings; should be `<h2>` or marked as `aria-label` regions since they're sibling nav groups, not section headings

### 🟡 Performance / Hostinger specifics

- External script (`ninja-daytona-script.js`) is **synchronous in `<head>`** — blocks render. Should be `async` or moved to end of `<body>`.
- Hero video (37 MB MP4) on home + franchising has no `preload` hint — currently `autoplay muted loop playsinline poster="..."` is fine, but adding `preload="metadata"` improves initial paint on slow connections.
- No `preconnect` to font CDN — *but* the site uses Poppins, and I should verify whether it's loaded from Google Fonts (if so, add preconnect).
- No `robots.txt` at root
- No `sitemap.xml` at root — Hostinger's hPanel can auto-generate these, but having them committed makes them part of the deploy
- No web manifest (PWA) — optional, not critical

---

## The fix plan

I'll execute in this order, one commit per concern so you can review the diff:

1. **`AUDIT.md`** (this file) — committed for reference
2. **`robots.txt`** + **`sitemap.xml`** at root
3. **`<head>` overhaul** on every page: canonical, OG, Twitter, theme-color, robots meta
4. **JSON-LD on `index.html`**: Organization + LocalBusiness + WebSite + FAQPage + VideoObject
5. **JSON-LD on `contact.html`**: ContactPage + LocalBusiness hours
6. **JSON-LD on `products.html`**: Service schema per product + new FAQ section + FAQPage
7. **JSON-LD on `franchising.html`**: Service schema + new FAQ section + FAQPage + VideoObject
8. **JSON-LD on inner pages** (`about`, `industries`, `why-spray-liquid-green`, `testimonials`): BreadcrumbList + page-specific Service
9. **Move the external script to end of `<body>` with `async`** (or `defer` in head) on pages that have it
10. **`<main>` landmark consistency** + skip link verification
11. **Replace `href="#"`** with real anchors where obvious, otherwise convert to `<button>`
12. **Footer semantic cleanup**: change the four `<h3>` to `<h2>` inside `<nav>` with `aria-label`, or keep as h3 and accept (minor)

I'll **not** touch body content, copy, or visual styling. The existing site is good. This is purely a discoverability + structure layer.

---

## Assumptions I'm making (flag if wrong)

- **Canonical domain:** `https://sprayliquidgreen.com/` (inferred from `info@sprayliquidgreen.com`). If your actual domain is different, I'll swap it in all 8 pages + `sitemap.xml`.
- **Business name:** "Spray Liquid Green" (with "Liquid Green Spray Foam Insulation" as alternate). Confirmed from your meta description.
- **Address zip:** 10509 (Brewster, NY 10509 — US Postal Service standard). Will use as default.
- **Geo coordinates:** 41.3973, -73.6168 (Brewster town center). Approximate; Google will accept a small radius.
- **Hero video duration / upload date:** I don't know the real values. I'll use placeholders (`PT0M30S`, `2026-01-01`) and flag them so you can fix in one place later.

---

## What I will NOT do (without your sign-off)

- Change body copy, hero text, CTAs, testimonials
- Add new content that isn't already implied by the existing site
- Touch CSS, images, or layout
- Submit to Google Search Console (you'd need to verify domain ownership in hPanel)
- Set up redirects / `www` → apex (depends on your actual Hostinger config)

---

## Expected outcomes after fixes ship

- **Google:** Knowledge Panel candidate, FAQ rich results on home, Local Pack eligible, proper social previews
- **Bing:** Same as Google + Copilot will use your LocalBusiness data
- **AEO:** Voice assistants can answer "is spray foam insulation green?" with your answer + cite your site
- **GEO:** ChatGPT / Perplexity / Gemini can extract business facts, hours, services, and answer franchise-investment questions with citations
- **Social:** Every share on FB/IG/LinkedIn/X shows a proper preview card with logo, title, description

---

*Audit by Mavis. Next file in this commit is the actual fix.*
