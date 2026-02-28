import SectionCard from '../components/SectionCard';
import { trackingSignals } from '../data/siteAnalysis';

const ICON = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const proposedEvents = [
  { event: 'service_start_initiated', trigger: 'Click "Start Service" CTA from any page', value: 'High' },
  { event: 'bill_pay_initiated', trigger: 'Click "Pay My Bill" → redirect to portal', value: 'High' },
  { event: 'form_submit', trigger: 'Start/Stop/Transfer form submission', value: 'High' },
  { event: 'resource_download', trigger: 'PDF download from any page', value: 'Medium' },
  { event: 'rebate_program_view', trigger: 'View rebates/efficiency page', value: 'Medium' },
  { event: 'emergency_cta_click', trigger: 'Click "Report an Emergency" header CTA', value: 'Medium' },
];

const strategyPoints = [
  {
    icon: '🔬',
    title: 'The stack is healthy — depth is unknown',
    body: 'GA4, GTM, Meta Pixel, TV Squared, and CMP are all firing. That\'s a strong foundation. Without internal access I can\'t verify tag configuration quality, goal setup, or attribution models — but I\'ll prioritize a tag audit in week 1.',
  },
  {
    icon: '📡',
    title: 'TV Squared signals TV/streaming investment',
    body: 'TV Squared is a cross-screen attribution tool. This tells me Summit is running TV or CTV campaigns. My role would connect digital conversion data back to those offline media investments.',
  },
  {
    icon: '🍪',
    title: 'CMP in place — consent-ready for paid expansion',
    body: 'A consent management platform is active, meaning the pixel stack is CCPA/GDPR-aware. This is required for Meta and Google ad targeting to work correctly post-consent.',
  },
  {
    icon: '🎯',
    title: 'Recommend building a GA4 conversion event layer',
    body: 'Key user actions — reaching the Start/Stop/Transfer page, initiating bill pay, submitting forms — are strong candidates for GA4 events via GTM. Implementing this would connect Summit\'s tracking stack to measurable outcomes and feed attribution back to Meta and TV Squared campaigns.',
  },
  {
    icon: '🤖',
    title: 'Structured data prepares Summit for AI-powered search',
    body: 'Search engines like Google, Bing, and AI-driven tools (ChatGPT, Perplexity, AI Overviews) use structured data to understand and surface business information accurately. With zero schema markup on 97 pages, Summit is invisible to this growing discovery channel. Adding LocalBusiness, FAQPage, and ServiceArea schema is a high-ROI, low-cost improvement.',
  },
];

export default function Tracking() {
  return (
    <SectionCard
      id="tracking"
      title="Tracking Signal Overview"
      subtitle="Detected live from summitutilities.com — external network analysis"
      icon={ICON}
    >
      {/* Signal checklist */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-500 uppercase tracking-wide mb-3">Tracking Stack — What's Detected</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {trackingSignals.map((sig, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 p-3 rounded-lg border ${sig.detected ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
            >
              <span className={`text-lg flex-shrink-0 ${sig.detected ? 'text-green-600' : 'text-red-500'}`}>
                {sig.detected ? '✓' : '✗'}
              </span>
              <div>
                <p className={`text-sm font-semibold ${sig.detected ? 'text-green-800' : 'text-red-800'}`}>{sig.name}</p>
                <p className={`text-xs mt-0.5 ${sig.detected ? 'text-green-600' : 'text-red-500'}`}>{sig.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Proposed event architecture */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-500 uppercase tracking-wide mb-3">Proposed GTM Event Architecture</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-2 text-sm text-gray-500 font-semibold uppercase">Event Name</th>
                <th className="text-left py-2 px-2 text-sm text-gray-500 font-semibold uppercase">Trigger</th>
                <th className="text-left py-2 px-2 text-sm text-gray-500 font-semibold uppercase">Business Value</th>
              </tr>
            </thead>
            <tbody>
              {proposedEvents.map((ev, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-2 px-2 font-mono text-sm text-summit-blue font-semibold">{ev.event}</td>
                  <td className="py-2 px-2 text-sm text-gray-600">{ev.trigger}</td>
                  <td className="py-2 px-2">
                    <span className={`text-sm px-2 py-0.5 rounded-full font-medium ${
                      ev.value === 'High' ? 'bg-red-100 text-red-700' :
                      ev.value === 'Medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>{ev.value}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Strategic framing */}
      <div>
        <h3 className="text-base font-semibold text-gray-500 uppercase tracking-wide mb-3">Strategic Context</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {strategyPoints.map((pt, i) => (
            <div key={i} className="bg-summit-light border border-blue-100 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{pt.icon}</span>
                <div>
                  <p className="text-base font-semibold text-gray-800">{pt.title}</p>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">{pt.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}
