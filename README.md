# Massothérapie Elodie Ledermann — site vitrine

Static one-pager (FR), hand-written HTML/CSS/JS, no build step. Served by GitHub Pages from the repo root.
Fonts (Gambetta + Switzer, Fontshare) and GSAP/ScrollTrigger are self-hosted.

## Sources
- Booking page perfactive.ch/massotherapeute/buttes/elodie-ledermann (same as theraciel.com in her bio): services, prices (Massage CHF 100, Drainage CHF 100), RME, Espèces/TWINT, parking, hero photo
- Instagram @elodie.ledermann: bio, intro carousel, posts (2016 start, médecine académique 300 h+, cabinet 1 year in April 2024, RME cert n° 102, drainage attestation Vodder/Földi 10.05.2025 210 h, avant/après ankle case), photos
- Facebook massotherapie.E.L: logo, cover, posts
- Google Business Profile: 4.9 / 18 reviews (16 with text, all on the site), opening hours; place ID `ChIJ02BmEQPBjUcRaA3ACgvkh3U`, CID 8468988360369638760, geo 46.8877395, 6.5516624
- The 3 reels in `assets/video/` were supplied by us (downloaded from her Instagram/Facebook)

## To confirm with the client
- WhatsApp on 079 935 60 05 (assumed)
- Opening hours: Google says Mon 08:30–20:30, Tue/Wed 08:30–11:30, Thu/Fri 08:30–15:00; local.ch (unclaimed, older) has different hours. Site uses Google.
- Prices: only "Massage CHF 100" and "Drainage CHF 100" are published; the site shows CHF 100 for all four soins, no durations
- ASCA: she posted "ASCA / RME" in 2023, but her booking page only lists RME, so the site only says RME
- No e-mail address found anywhere: the form opens WhatsApp prefilled
- A few reviews are quoted with spelling fixed

## Notes
- `noindex` while this is a pitch; remove it in `index.html` when the client signs.
- Map is a static duotone image built from OpenStreetMap tiles (`assets/img/plan*.webp`), pin at 62% / 52%; it links to Google Maps.
- `?noanim` disables all animations (for screenshots/review).
- Bump `?v=` on the CSS/JS links after edits (Pages caches).
