# Summit Utilities — Digital Experience Audit Dashboard

## Purpose
Interview project for Kenny Fairris applying for **Digital Marketing Specialist** at Summit Utilities.
Demonstrates SEO, CRO, and analytics capability using only public-facing data.
Deployed as a live GitHub Pages URL to support a 10–12 minute walkthrough.

## Live URL & Repo
- **Live:** https://kfairris.github.io/summit-utilities/
- **Repo:** https://github.com/kfairris/summit-utilities

## Stack
- **Framework**: Vite 5 + React 18 + TypeScript (strict)
- **Styling**: Tailwind CSS 3 (custom Summit color palette in `tailwind.config.js`)
- **Charts**: Recharts
- **Data**: TypeScript constants (Screaming Frog data) + live PageSpeed Insights API
- **Deploy**: `gh-pages` → `https://kfairris.github.io/summit-utilities/`

## Color Palette (Tailwind custom)
- `summit-navy`: #1B2B4B
- `summit-blue`: #0066A4
- `summit-teal`: #0098A6
- `summit-light`: #E8F4FD

## Data Sources
- `screaming_frog_reports/crawl_overview.csv` — Feb 27, 2026 crawl of summitutilities.com
- `screaming_frog_reports/issues_overview_report.csv` — issue detail export
- Screaming Frog free tier: **500 URL cap** — audit reflects a partial crawl (97 HTML pages out of full site)
- Live site manual audit — CTA locations, journey click counts, tracking stack detection
- Google PageSpeed Insights API — live scores fetched on page load (no API key required for free tier)

## Key Findings Encoded
| Area | Finding |
|------|---------|
| Images | 201/207 missing size attrs (97.1% CLS risk); 77 missing alt text; 40 over 100KB |
| SEO | 0 structured data pages; 52.6% titles under 30 chars; 20 multiple H1s |
| Security | 20 unsafe cross-origin links; 3 pages missing HSTS/CSP/Referrer-Policy |
| Tracking | GA4 ✓, GTM ✓, Meta Pixel ✓, TV Squared ✓, CMP ✓; conversion events unconfirmed externally |
| Journey | Pay Bill: 1 click (good); Start Service: 2 clicks, not in primary nav |

## Product Reality (Important for Copy Accuracy)
These facts must be reflected accurately in all dashboard copy:

- **myaccount.summitutilities.com** is a same-brand subdomain (Summit's payment platform), not an "external" trust risk. Do not frame it as an external exit.
- **Start Service** — myaccount.summitutilities.com has a "Start New Service" option, so new customers CAN start service online. The discoverability issue is that this path is not surfaced from the main site nav or homepage hero. The opportunity is to review the new-customer setup flow on myaccount for UX improvements and to make the online path easier to find from summitutilities.com.
- **GA4 conversion events** cannot be confirmed or denied from the public side — frame as a recommendation, not a confirmed gap.
- **Funnel / Goal Tracking** is assumed active — cannot verify without GA4 access.
- **No chat widget** is present on summitutilities.com — do not propose `chat_open` events.
- **"Request a Quote"** is not applicable for a regulated utility — do not include in CTA audit.
- **Screaming Frog free tier** captured 500 URLs max — always disclose this as a partial crawl.

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
- Base path set to `/summit-utilities/` in `vite.config.ts` for GitHub Pages.
- Deploy via: `npm run deploy`
- GitHub CLI (`gh`) used for auth — `gh auth setup-git` needed if git push fails
- `gh-pages` branch is auto-created on first deploy; GitHub Pages auto-enabled on repo creation
- Live URL: `https://kfairris.github.io/summit-utilities/`

## PageSpeed API
- No API key needed for occasional queries (rate-limited to ~5/day per IP)
- Add `VITE_PSI_KEY=your_key` to `.env.local` for higher quota
- Graceful fallback shown when rate-limited
