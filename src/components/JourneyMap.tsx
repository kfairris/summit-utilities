import type { JourneyFlow } from '../data/types';

interface Props {
  flow: JourneyFlow;
}

const assessmentConfig = {
  good:    { border: 'border-green-400',  badge: 'bg-green-100 text-green-700',  label: 'Smooth' },
  warning: { border: 'border-amber-400',  badge: 'bg-amber-100 text-amber-700',  label: 'Friction Found' },
  poor:    { border: 'border-red-400',    badge: 'bg-red-100 text-red-700',      label: 'High Friction' },
};

export default function JourneyMap({ flow }: Props) {
  const cfg = assessmentConfig[flow.assessment];

  return (
    <div className={`border-2 ${cfg.border} rounded-xl p-4`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-800 text-lg">{flow.name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">{flow.clicks} click{flow.clicks !== 1 ? 's' : ''} from home</span>
          <span className={`text-sm font-semibold px-2.5 py-1 rounded-full ${cfg.badge}`}>{cfg.label}</span>
        </div>
      </div>

      {/* Steps */}
      <div className="flex items-start gap-3 mb-4 flex-wrap">
        {flow.steps.map((step, i) => (
          <div key={i} className="flex items-center gap-2">
            {/* Step bubble */}
            <div className={`relative flex flex-col items-center`}>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold text-white flex-shrink-0 ${step.friction ? 'bg-amber-500' : 'bg-summit-blue'}`}>
                {i + 1}
              </div>
            </div>
            <div className="max-w-[180px]">
              <div className={`text-sm font-semibold ${step.friction ? 'text-amber-700' : 'text-gray-800'}`}>{step.label}</div>
              {step.note && <div className="text-sm text-gray-400 leading-snug mt-0.5">{step.note}</div>}
            </div>
            {/* Arrow */}
            {i < flow.steps.length - 1 && (
              <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </div>
        ))}
      </div>

      {/* Friction points */}
      <div>
        <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Key Friction Points</div>
        <ul className="space-y-1.5">
          {flow.frictionPoints.map((fp, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="text-amber-500 mt-0.5 flex-shrink-0">⚠</span>
              {fp}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
