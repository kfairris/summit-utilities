import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, RadarChart, PolarGrid,
  PolarAngleAxis, Radar, Legend,
} from 'recharts';
import SectionCard from '../components/SectionCard';
import ScoreGauge from '../components/ScoreGauge';
import MetricRow from '../components/MetricRow';
import { imageStats, seoStats, securityStats } from '../data/crawlData';

// ---------------------------------------------------------------------------
// Hardcoded Lighthouse CLI data — run Feb 27 2026
// CLI flags: --emulated-form-factor mobile / --preset desktop
// Source: Lighthouse 13.0.3 against live summitutilities.com
// ---------------------------------------------------------------------------
const PAGES = {
  homeMobile: {
    label: 'Homepage — Mobile',
    score: 69, lcp: 9.47, cls: 0.061, fcp: 1.93, ttfb: 561, tbt: 187, si: 3.55,
  },
  homeDesktop: {
    label: 'Homepage — Desktop',
    score: 94, lcp: 1.57, cls: 0.052, fcp: 0.57, ttfb: 347, tbt: 0, si: 0.96,
  },
  rfwMobile: {
    label: '/ready-for-winter — Mobile',
    score: 49, lcp: 22.74, cls: 0.061, fcp: 8.33, ttfb: 140, tbt: 336, si: 8.33,
  },
  rfwDesktop: {
    label: '/ready-for-winter — Desktop',
    score: 75, lcp: 5.03, cls: 0.012, fcp: 0.52, ttfb: 76, tbt: 0, si: 1.59,
  },
} as const;

type MetricKey = 'lcp' | 'cls' | 'fcp' | 'ttfb';

const VITALS_META: { key: MetricKey; label: string; unit: string; thresholds: [number, number] }[] = [
  { key: 'lcp',  label: 'LCP',  unit: 's',  thresholds: [2.5, 4.0] },
  { key: 'fcp',  label: 'FCP',  unit: 's',  thresholds: [1.8, 3.0] },
  { key: 'cls',  label: 'CLS',  unit: '',   thresholds: [0.1, 0.25] },
  { key: 'ttfb', label: 'TTFB', unit: 'ms', thresholds: [800, 1800] },
];

function vitalsStatus(key: MetricKey, value: number): 'good' | 'warning' | 'issue' {
  const thresholds: Record<MetricKey, [number, number]> = {
    lcp: [2.5, 4.0], cls: [0.1, 0.25], fcp: [1.8, 3.0], ttfb: [800, 1800],
  };
  const [good, poor] = thresholds[key];
  if (value <= good) return 'good';
  if (value <= poor) return 'warning';
  return 'issue';
}

function fmt(key: MetricKey, value: number): string {
  if (key === 'ttfb') return `${value}ms`;
  if (key === 'cls')  return value.toFixed(3);
  return `${value.toFixed(2)}s`;
}

const statusStyle = {
  good:    { bg: 'bg-green-50 border-green-200', text: 'text-green-700' },
  warning: { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-700' },
  issue:   { bg: 'bg-red-50   border-red-200',   text: 'text-red-700'   },
};

const ICON = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

// Radar chart data — normalise each metric 0→100 (100 = best)
function normalise(key: MetricKey, value: number): number {
  const maxBad: Record<MetricKey, number> = { lcp: 25, fcp: 10, cls: 0.5, ttfb: 3000 };
  return Math.max(0, Math.round(100 - (value / maxBad[key]) * 100));
}

const radarData: { metric: string; HomeMobile: number; HomeDesktop: number; RfWMobile: number; RfWDesktop: number }[] = [
  { metric: 'LCP',  HomeMobile: normalise('lcp', PAGES.homeMobile.lcp), HomeDesktop: normalise('lcp', PAGES.homeDesktop.lcp), RfWMobile: normalise('lcp', PAGES.rfwMobile.lcp), RfWDesktop: normalise('lcp', PAGES.rfwDesktop.lcp) },
  { metric: 'FCP',  HomeMobile: normalise('fcp', PAGES.homeMobile.fcp), HomeDesktop: normalise('fcp', PAGES.homeDesktop.fcp), RfWMobile: normalise('fcp', PAGES.rfwMobile.fcp), RfWDesktop: normalise('fcp', PAGES.rfwDesktop.fcp) },
  { metric: 'CLS',  HomeMobile: normalise('cls', PAGES.homeMobile.cls), HomeDesktop: normalise('cls', PAGES.homeDesktop.cls), RfWMobile: normalise('cls', PAGES.rfwMobile.cls), RfWDesktop: normalise('cls', PAGES.rfwDesktop.cls) },
  { metric: 'TTFB', HomeMobile: normalise('ttfb', PAGES.homeMobile.ttfb), HomeDesktop: normalise('ttfb', PAGES.homeDesktop.ttfb), RfWMobile: normalise('ttfb', PAGES.rfwMobile.ttfb), RfWDesktop: normalise('ttfb', PAGES.rfwDesktop.ttfb) },
];

const crawlIssueData = [
  { name: 'Missing size attrs', value: imageStats.missingSizeAttrsPct, fill: '#ef4444' },
  { name: 'Missing alt text',   value: imageStats.missingAltPct,       fill: '#f59e0b' },
  { name: 'Oversized images',   value: imageStats.over100KBPct,        fill: '#f97316' },
  { name: 'Titles < 30 chars',  value: seoStats.titlesBelow30CharsPct, fill: '#6366f1' },
  { name: 'Multiple H1s',       value: seoStats.h1MultiplePct,         fill: '#8b5cf6' },
];

export default function Performance() {
  return (
    <SectionCard
      id="performance"
      title="Site Performance Analysis"
      subtitle="Lighthouse 13.0.3 · Feb 27, 2026 · summitutilities.com homepage + /ready-for-winter"
      icon={ICON}
    >
      {/* Score gauges — 2×2 grid */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Page Speed Scores</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-items-center">
          {Object.values(PAGES).map(pg => (
            <ScoreGauge key={pg.label} score={pg.score} label={pg.label} />
          ))}
        </div>

        {/* Key callout */}
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3 flex items-start gap-3">
          <span className="text-red-500 text-lg flex-shrink-0">🔴</span>
          <p className="text-sm text-red-800">
            <strong>/ready-for-winter mobile scores 49</strong> — LCP of 22.7 s is nearly 10× the 2.5 s "Good" threshold.
            Any paid or organic traffic landing on this page faces an extremely slow mobile experience.
          </p>
        </div>
      </div>

      {/* Core Web Vitals comparison table */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Core Web Vitals — All Pages</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 text-xs text-gray-500 font-semibold uppercase">Metric</th>
                {Object.values(PAGES).map(pg => (
                  <th key={pg.label} className="text-center py-2 px-2 text-xs text-gray-500 font-semibold uppercase leading-tight">{pg.label}</th>
                ))}
                <th className="text-center py-2 px-2 text-xs text-gray-500 font-semibold uppercase">Good ≤</th>
              </tr>
            </thead>
            <tbody>
              {VITALS_META.map(({ key, label, unit, thresholds }) => (
                <tr key={key} className="border-b border-gray-50">
                  <td className="py-2 px-3 font-semibold text-gray-700">{label}</td>
                  {Object.values(PAGES).map(pg => {
                    const val = key === 'ttfb' ? pg[key] : pg[key as keyof typeof pg] as number;
                    const status = vitalsStatus(key, val);
                    const { bg, text } = statusStyle[status];
                    return (
                      <td key={pg.label} className={`py-2 px-2 text-center`}>
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${bg} ${text} border`}>
                          {fmt(key, val)}
                        </span>
                      </td>
                    );
                  })}
                  <td className="py-2 px-2 text-center text-xs text-gray-400 font-mono">
                    {key === 'ttfb' ? `${thresholds[0] * 1}ms` : key === 'cls' ? thresholds[0] : `${thresholds[0]}${unit}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-2">🟢 Good &nbsp;🟡 Needs Improvement &nbsp;🔴 Poor — per Google Core Web Vitals thresholds</p>
      </div>

      {/* Radar chart */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Performance Profile — Normalised (100 = best)</h3>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} cx="50%" cy="50%">
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12, fontWeight: 600 }} />
              <Radar name="Home Mobile"   dataKey="HomeMobile"  stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} strokeWidth={2} />
              <Radar name="Home Desktop"  dataKey="HomeDesktop" stroke="#16a34a" fill="#16a34a" fillOpacity={0.1} strokeWidth={2} />
              <Radar name="RfW Mobile"    dataKey="RfWMobile"   stroke="#f97316" fill="#f97316" fillOpacity={0.1} strokeWidth={2} strokeDasharray="5 3" />
              <Radar name="RfW Desktop"   dataKey="RfWDesktop"  stroke="#6366f1" fill="#6366f1" fillOpacity={0.1} strokeWidth={2} strokeDasharray="5 3" />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => `${v}/100`} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Crawl issues bar chart */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Screaming Frog — % of Pages / Images Affected</h3>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={crawlIssueData} layout="vertical" margin={{ left: 8, right: 28, top: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tickFormatter={v => `${v}%`} tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="name" width={145} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => `${v.toFixed(1)}%`} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {crawlIssueData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key findings */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Top Improvement Opportunities</h3>
        <MetricRow
          label="Missing image size attributes"
          value={`${imageStats.missingSizeAttrs} / ${imageStats.total} images`}
          status="issue"
          note="97.1% — primary CLS driver (both pages CLS > 0)"
        />
        <MetricRow
          label="Homepage mobile LCP"
          value="9.47 s"
          status="issue"
          note="3.8× over Good threshold — likely hero image unoptimised"
        />
        <MetricRow
          label="/ready-for-winter mobile LCP"
          value="22.74 s"
          status="issue"
          note="9.1× over threshold — critical for any campaign landing page"
        />
        <MetricRow
          label="Images over 100 KB"
          value={`${imageStats.over100KB} images`}
          status="warning"
          note="19.3% — compressing these directly cuts LCP"
        />
        <MetricRow
          label="Multi-vendor tracking stack"
          value="GA4 + GTM + Meta + TV²"
          status="warning"
          note="Script weight on every page — TBT 187 ms mobile"
        />
        <MetricRow
          label="Homepage desktop score"
          value="94"
          status="good"
          note="Desktop experience is strong"
        />
        <MetricRow
          label="Missing HSTS / CSP / Referrer-Policy"
          value={`${securityStats.missingHSTS} pages each`}
          status="warning"
          note="Security header gaps"
        />
      </div>
    </SectionCard>
  );
}
