import Header from './components/Header';
import Performance from './sections/Performance';
import CustomerJourney from './sections/CustomerJourney';
import Conversion from './sections/Conversion';
import Tracking from './sections/Tracking';
import NinetyDay from './sections/NinetyDay';
import { CRAWL_DATE, crawlStats, seoStats, imageStats, calcSEOScore } from './data/crawlData';

function SummaryBadge({ label, value, status }: { label: string; value: string; status: 'good' | 'warning' | 'issue' }) {
  const colors = {
    good:    'bg-green-100 text-green-800 border-green-300',
    warning: 'bg-amber-100 text-amber-800 border-amber-300',
    issue:   'bg-red-100 text-red-800 border-red-300',
  };
  return (
    <div className={`border rounded-lg px-4 py-3 text-center flex-1 min-w-[120px] ${colors[status]}`}>
      <div className="text-lg font-bold leading-tight">{value}</div>
      <div className="text-xs font-medium mt-0.5 leading-tight">{label}</div>
    </div>
  );
}

export default function App() {
  const seoScore = calcSEOScore();

  return (
    <div className="min-h-screen bg-summit-gray font-sans">
      <Header />

      {/* Hero summary */}
      <div className="bg-summit-navy text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold leading-tight">Digital Experience Audit Overview</h1>
            <p className="text-blue-300 text-sm mt-1">
              Independent audit of summitutilities.com · {CRAWL_DATE} · {crawlStats.totalInternal} URLs crawled · {seoStats.totalHtmlPages} HTML pages analyzed
            </p>
          </div>

          {/* Score strip */}
          <div className="flex flex-wrap gap-3 mb-6">
            <SummaryBadge
              label="Site Performance"
              value={`${seoScore}/100`}
              status={seoScore >= 70 ? 'warning' : 'issue'}
            />
            <SummaryBadge
              label="User Experience"
              value="Moderate"
              status="warning"
            />
            <SummaryBadge
              label="Conversion Readiness"
              value="Low"
              status="issue"
            />
            <SummaryBadge
              label="Tracking Setup"
              value="Built"
              status="good"
            />
          </div>

          {/* Top opportunities */}
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              {
                n: '201',
                label: 'images missing size attributes',
                sub: '97.1% of all images — major CLS risk',
                color: 'border-red-400',
              },
              {
                n: '0',
                label: 'pages with structured data',
                sub: '0 of 97 HTML pages — no rich snippet eligibility',
                color: 'border-amber-400',
              },
              {
                n: '2',
                label: 'new-customer CTAs above fold',
                sub: 'All primary CTAs target existing customers only',
                color: 'border-amber-400',
              },
            ].map((item, i) => (
              <div key={i} className={`bg-white/10 border-l-4 ${item.color} rounded-r-lg px-4 py-3`}>
                <span className="text-2xl font-bold text-white">{item.n}</span>
                <span className="text-blue-200 text-sm ml-2">{item.label}</span>
                <p className="text-blue-300 text-xs mt-1">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <Performance />
        <CustomerJourney />
        <Conversion />
        <Tracking />
        <NinetyDay />
      </div>

      {/* Footer */}
      <footer className="bg-summit-navy text-blue-300 text-xs text-center py-4 mt-8">
        <p>
          Independent audit prepared by Kenny Fairris for Summit Utilities Digital Marketing Specialist interview ·{' '}
          Data source: Screaming Frog crawl + live PageSpeed Insights · {CRAWL_DATE}
        </p>
        <p className="mt-1">
          <a href="https://summitutilities.com" className="underline hover:text-white" target="_blank" rel="noopener noreferrer">
            summitutilities.com
          </a>{' '}
          · {crawlStats.htmlPages} HTML pages · {imageStats.total} images · max depth {crawlStats.maxCrawlDepth}
        </p>
      </footer>
    </div>
  );
}
