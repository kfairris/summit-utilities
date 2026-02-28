import SectionCard from '../components/SectionCard';
import MetricRow from '../components/MetricRow';
import { ctaAudit, conversionProposals } from '../data/siteAnalysis';
import { seoStats } from '../data/crawlData';

const ICON = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const audienceColors = {
  existing: 'bg-blue-100 text-blue-700',
  new:      'bg-green-100 text-green-700',
  both:     'bg-purple-100 text-purple-700',
};
const prominenceColors = {
  primary:   'bg-summit-blue text-white',
  secondary: 'bg-gray-200 text-gray-600',
  missing:   'bg-red-100 text-red-600',
};
const impactColors = {
  High:   'bg-red-100 text-red-700',
  Medium: 'bg-amber-100 text-amber-700',
  Low:    'bg-green-100 text-green-700',
};
const effortColors = {
  Low:    'bg-green-100 text-green-700',
  Medium: 'bg-amber-100 text-amber-700',
  High:   'bg-red-100 text-red-700',
};

export default function Conversion() {
  return (
    <SectionCard
      id="conversion"
      title="Conversion & Tracking Insights"
      subtitle="CTA audit, structured data gaps, and quick-win proposals"
      icon={ICON}
    >
      {/* CTA Audit table */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-500 uppercase tracking-wide mb-3">Call-to-Action Audit</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-2 text-sm text-gray-500 font-semibold uppercase">CTA</th>
                <th className="text-left py-2 px-2 text-sm text-gray-500 font-semibold uppercase">Placement</th>
                <th className="text-left py-2 px-2 text-sm text-gray-500 font-semibold uppercase">Audience</th>
                <th className="text-left py-2 px-2 text-sm text-gray-500 font-semibold uppercase">Prominence</th>
                <th className="text-left py-2 px-2 text-sm text-gray-500 font-semibold uppercase">Tracked</th>
              </tr>
            </thead>
            <tbody>
              {ctaAudit.map((cta, i) => (
                <tr key={i} className={`border-b border-gray-50 ${cta.prominence === 'missing' ? 'bg-red-50' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <td className="py-2 px-2 font-medium text-gray-800">{cta.label}</td>
                  <td className="py-2 px-2 text-gray-500 text-sm">{cta.placement}</td>
                  <td className="py-2 px-2">
                    <span className={`text-sm px-2 py-0.5 rounded-full font-medium ${audienceColors[cta.audience]}`}>
                      {cta.audience}
                    </span>
                  </td>
                  <td className="py-2 px-2">
                    <span className={`text-sm px-2 py-0.5 rounded-full font-medium ${prominenceColors[cta.prominence]}`}>
                      {cta.prominence}
                    </span>
                  </td>
                  <td className="py-2 px-2">
                    {cta.tracked
                      ? <span className="text-green-600 font-bold">✓</span>
                      : <span className="text-red-400 font-bold">✗</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Structured data gap */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-500 uppercase tracking-wide mb-3">SEO / Rich Snippet Readiness</h3>
        <MetricRow
          label="Pages with structured data"
          value={`${seoStats.structuredDataPages} / ${seoStats.totalHtmlPages}`}
          status="issue"
          note="No schema markup = invisible to AI search tools (ChatGPT, Perplexity, Google AI Overviews) and ineligible for rich snippets"
        />
        <MetricRow
          label="Pages with title below 30 chars"
          value={`${seoStats.titlesBelow30Chars} pages (${seoStats.titlesBelow30CharsPct}%)`}
          status="warning"
          note="Keyword expansion opportunity"
        />
        <MetricRow
          label="Missing meta descriptions"
          value={`${seoStats.metaDescMissing} pages`}
          status="warning"
          note="Lost SERP click-through opportunity"
        />
        <MetricRow
          label="Duplicate H1s"
          value={`${seoStats.h1Duplicate} pages`}
          status="warning"
          note="Signals thin page differentiation"
        />
        <MetricRow
          label="No internal redirect chains"
          value="0 chains"
          status="good"
          note="Clean redirect structure"
        />
      </div>

      {/* Proposals */}
      <div>
        <h3 className="text-base font-semibold text-gray-500 uppercase tracking-wide mb-3">Conversion Proposals</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {conversionProposals.map((p, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <h4 className="font-semibold text-gray-800 text-base mb-1">{p.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed mb-3">{p.description}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-sm px-2.5 py-0.5 rounded-full font-medium ${impactColors[p.impact as keyof typeof impactColors]}`}>
                  {p.impact} Impact
                </span>
                <span className={`text-sm px-2.5 py-0.5 rounded-full font-medium ${effortColors[p.effort as keyof typeof effortColors]}`}>
                  {p.effort} Effort
                </span>
                <span className="text-sm text-gray-400 ml-auto">Metric: {p.metric}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}
