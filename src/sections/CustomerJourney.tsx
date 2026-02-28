import SectionCard from '../components/SectionCard';
import JourneyMap from '../components/JourneyMap';
import { journeyFlows } from '../data/siteAnalysis';

const ICON = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const recommendations = [
  {
    icon: '🎯',
    title: 'Add "Start Service" to primary nav',
    detail: 'Currently buried 2 clicks deep under Contact. New customer acquisition demand exists — the path just isn\'t there.',
  },
  {
    icon: '📄',
    title: 'Dedicated new-customer landing page',
    detail: 'Create /start-service separate from /stop and /transfer. Allows paid traffic to land on a conversion-focused page.',
  },
  {
    icon: '🔄',
    title: 'Reduce external portal friction',
    detail: 'Bill pay redirects to myaccount.summitutilities.com. Add reassurance copy before redirect. Capture a GA4 event on exit.',
  },
  {
    icon: '📊',
    title: 'Instrument journey with events',
    detail: 'Neither flow fires a GA4 conversion event. We can\'t optimize what we can\'t measure.',
  },
];

export default function CustomerJourney() {
  return (
    <SectionCard
      id="journey"
      title="User Journey Review"
      subtitle="Two critical paths audited — homepage to task completion"
      icon={ICON}
    >
      {/* Above-fold insight callout */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start gap-3">
        <span className="text-2xl">⚠️</span>
        <div>
          <p className="text-sm font-semibold text-amber-800">100% of above-fold CTAs target existing customers</p>
          <p className="text-sm text-amber-700 mt-1">
            "Pay My Bill" and "Manage My Account" dominate the homepage hero. New customer acquisition has no primary
            entry point — despite natural gas utilities actively competing for new residential accounts.
          </p>
        </div>
      </div>

      {/* Journey flows */}
      <div className="grid gap-4 md:grid-cols-2 mb-6">
        {journeyFlows.map(flow => (
          <JourneyMap key={flow.name} flow={flow} />
        ))}
      </div>

      {/* Optimization recommendations */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Optimization Recommendations</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {recommendations.map((rec, i) => (
            <div key={i} className="bg-summit-light border border-blue-100 rounded-lg p-3 flex gap-3">
              <span className="text-xl flex-shrink-0">{rec.icon}</span>
              <div>
                <p className="text-sm font-semibold text-gray-800">{rec.title}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{rec.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}
