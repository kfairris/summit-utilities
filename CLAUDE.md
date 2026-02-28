# Summit Utilities — Digital Experience Audit Dashboard

## Purpose
Interview project for Kenny Fairris applying for **Digital Marketing Specialist** at Summit Utilities.
Demonstrates SEO, CRO, and analytics capability using only public-facing data.
Deployed as a live GitHub Pages URL to support a 10–12 minute walkthrough.

## Stack
- **Framework**: Vite 5 + React 18 + TypeScript (strict)
- **Styling**: Tailwind CSS 3 (custom Summit color palette in `tailwind.config.js`)
- **Charts**: Recharts
- **Data**: TypeScript constants (Screaming Frog data) + live PageSpeed Insights API
- **Deploy**: `gh-pages` → `https://kfairris.github.io/summit-utilities/`

## Data Sources
- `screaming_frog_reports/crawl_overview.csv` — Feb 27, 2026 crawl of summitutilities.com
- `screaming_frog_reports/issues_overview_report.csv` — issue detail export
- Live site manual audit — CTA locations, journey click counts, tracking stack detection
- Google PageSpeed Insights API — live scores fetched on page load (no API key required for free tier)

## Key Findings Encoded
| Area | Finding |
|------|---------|
| Images | 201/207 missing size attrs (97.1% CLS risk); 77 missing alt text; 40 over 100KB |
| SEO | 0 structured data pages; 52.6% titles under 30 chars; 20 multiple H1s |
| Security | 20 unsafe cross-origin links; 3 pages missing HSTS/CSP/Referrer-Policy |
| Tracking | GA4 ✓, GTM ✓, Meta Pixel ✓, TV Squared ✓, CMP ✓; no conversion events |
| Journey | Pay Bill: 1 click (good); Start Service: 2 clicks, not in primary nav |

## File Structure
```
src/
  data/
    types.ts          — TypeScript interfaces
    crawlData.ts      — Screaming Frog numbers as typed constants
    siteAnalysis.ts   — Manual findings: tracking, journeys, CTAs, proposals
  components/
    Header.tsx        — Sticky nav with scroll-spy
    SectionCard.tsx   — Section wrapper with navy header bar
    ScoreGauge.tsx    — Circular SVG score gauge (PageSpeed)
    MetricRow.tsx     — Color-coded metric rows
    JourneyMap.tsx    — Step-by-step journey flow diagram
  sections/
    Performance.tsx   — PageSpeed + crawl issues + chart
    CustomerJourney.tsx — Journey flows + friction analysis
    Conversion.tsx    — CTA audit + structured data + proposals
    Tracking.tsx      — Signal checklist + event architecture
    NinetyDay.tsx     — 30/60/90 day plan
```

## Development
```bash
npm run dev       # local dev server
npm run build     # production build (TypeScript strict check)
npm run deploy    # build + push to gh-pages branch
```

## Deployment
Base path set to `/summit-utilities/` in `vite.config.ts` for GitHub Pages.
Deploy via: `npm run deploy`
Live URL: `https://kfairris.github.io/summit-utilities/`

## PageSpeed API
- No API key needed for occasional queries (rate-limited to ~5/day per IP)
- Add `VITE_PSI_KEY=your_key` to `.env.local` for higher quota
- Graceful fallback shown when rate-limited
