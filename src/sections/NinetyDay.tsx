import SectionCard from '../components/SectionCard';
import { ninetyDayPlan } from '../data/siteAnalysis';

const ICON = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const phaseConfig = {
  '30': { label: 'First 30 Days', color: 'bg-summit-teal', border: 'border-teal-300', light: 'bg-teal-50', text: 'text-teal-700', dot: 'bg-teal-500' },
  '60': { label: '30–60 Days',    color: 'bg-summit-blue', border: 'border-blue-300', light: 'bg-blue-50',  text: 'text-blue-700',  dot: 'bg-blue-500' },
  '90': { label: '60–90 Days',    color: 'bg-summit-navy', border: 'border-indigo-300', light: 'bg-indigo-50', text: 'text-indigo-700', dot: 'bg-indigo-500' },
};

export default function NinetyDay() {
  return (
    <SectionCard
      id="ninety-day"
      title="90-Day Focus Plan"
      subtitle="Prioritized action roadmap for the Digital Marketing Specialist role"
      icon={ICON}
    >
      {/* Intro */}
      <div className="bg-summit-light border border-blue-100 rounded-lg p-4 mb-6">
        <p className="text-sm text-gray-700 leading-relaxed">
          This plan reflects the highest-leverage actions I would take in the first 90 days as Digital Marketing Specialist.
          It sequences foundational measurement work first, then conversion architecture, then growth — building each phase on
          the verified data of the last.
        </p>
      </div>

      {/* Phase cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {ninetyDayPlan.map(phase => {
          const cfg = phaseConfig[phase.phase];
          return (
            <div key={phase.phase} className={`border-2 ${cfg.border} rounded-xl overflow-hidden`}>
              {/* Phase header */}
              <div className={`${cfg.color} px-4 py-3`}>
                <div className="text-white text-xs font-semibold uppercase tracking-wide">Phase {phase.phase}</div>
                <div className="text-white font-bold text-base leading-tight">{cfg.label}</div>
                <div className="text-white/80 text-xs mt-0.5">{phase.focus}</div>
              </div>
              {/* Actions */}
              <div className={`${cfg.light} p-4`}>
                <ul className="space-y-2 mb-4">
                  {phase.actions.map((action, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot} mt-1.5 flex-shrink-0`} />
                      <span className="text-xs text-gray-700 leading-relaxed">{action}</span>
                    </li>
                  ))}
                </ul>
                {/* Outcome */}
                <div className={`rounded-lg border ${cfg.border} bg-white p-2`}>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Expected Outcome</div>
                  <p className={`text-xs font-medium ${cfg.text} leading-relaxed`}>{phase.outcome}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-xs text-gray-500 leading-relaxed">
          <strong className="text-gray-700">Note:</strong> This roadmap is built entirely from public-facing data —
          Screaming Frog crawl, live network analysis, and PageSpeed Insights. Week-1 priorities include gaining access
          to GA4, GTM, and Search Console to validate and refine these findings with actual traffic data.
        </p>
      </div>
    </SectionCard>
  );
}
