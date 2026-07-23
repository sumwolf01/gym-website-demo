# PowerFit Gym — Website Demo

A premium, single-page fitness club website built with plain HTML5, CSS3, and vanilla JavaScript (no frameworks, no build step).

## Structure
```
powerfit-gym/
├── index.html      All content/sections
├── css/style.css    Design system + layout
├── js/script.js      All interactivity
├── images/           (empty — see "Images" below)
├── assets/           (empty — for extra brand assets)
└── README.md
```

## Design system
- **Palette:** black `#0B0B0B`, charcoal `#1A1A1A`, red `#FF3B30`, off-white `#F5F5F0`
- **Type:** Anton (headlines), Inter (body), JetBrains Mono (numbers/stats/prices)
- **Signature motif:** an animated heartbeat/pulse line used as the section divider throughout, tying the visual identity to fitness

## Features included
Loading screen, scroll progress bar, sticky navbar with scroll state, mobile menu, active-section nav highlight, dark/light mode toggle, on-site search overlay, scroll-reveal animations, animated stat counters, lazy-loaded images, class filter tabs, gallery filter + lightbox, testimonial slider, FAQ accordion, BMI calculator (metric/imperial), contact form with validation + success state, newsletter form, WhatsApp floating button, back-to-top button, SEO meta tags, Open Graph tags, and structured data (JSON-LD).

## Customizing for a client
1. **Branding:** update the palette variables at the top of `css/style.css` (`:root`), and the logo text in the navbar/footer of `index.html`.
2. **Images:** all photos currently point to royalty-free Unsplash URLs as placeholders. Replace the `src`/`data-src` attributes with the client's own photos (drop files into `/images` and update paths).
3. **Copy:** all headings, stats, pricing, trainer bios, and blog posts are plain text in `index.html` — search-and-replace with the client's real numbers and staff.
4. **Contact details:** update the address, phone, email, WhatsApp link (`wa.me/<number>`), and map embed in the Contact section.
5. **Forms:** the contact and newsletter forms currently show a client-side success state only. Connect `js/script.js`'s submit handlers to a real backend or form service (e.g. Formspree, a serverless function) to actually receive submissions.

## Browser support
Modern evergreen browsers (Chrome, Edge, Firefox, Safari). Responsive from ~360px mobile up through desktop. Respects `prefers-reduced-motion`.
