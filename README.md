# Spray Liquid Green — Premium Spray Foam Insulation

Static website for Spray Liquid Green. Pure HTML/CSS/JS, no build step.

## Pages

- `index.html` — home
- `about.html`
- `products.html`
- `industries.html`
- `why-spray-liquid-green.html`
- `franchising.html`
- `testimonials.html`
- `contact.html`
- `branding-guidelines/index.html` — brand guidelines microsite

## Structure

```
.
├── index.html
├── *.html
├── assets/
│   ├── css/      stylesheets
│   ├── js/       main.js
│   ├── img/      images + hero video (slg-hero-video.mp4)
│   ├── icons/    SVG icon set
│   └── docs/     downloadable PDFs
└── branding-guidelines/
    ├── index.html
    └── pdf/      SLG-Brand-Guidelines-v1.pdf
```

## Deploy

Source of truth for Hostinger. To refresh the live site, upload the contents of
this repo (preserving the `assets/` folder) to Hostinger's `public_html/` via
the hPanel File Manager or FTP. No build step required.

## Notes

- The 37 MB hero video lives in `assets/img/slg-hero-video.mp4`.
- `SLG-Brand-Guidelines-v1.pdf` is duplicated at the repo root and inside
  `branding-guidelines/pdf/` — kept for backward compatibility with existing
  inbound links.
