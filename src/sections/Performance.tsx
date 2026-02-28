import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import SectionCard from '../components/SectionCard';
import ScoreGauge from '../components/ScoreGauge';
import MetricRow from '../components/MetricRow';
import type { PageSpeedResult } from '../data/types';
import { imageStats, seoStats, securityStats } from '../data/crawlData';

const API_KEY = import.meta.env.VITE_PSI_KEY ?? '';
const PSI_TARGETS = [
  { url: 'https://summitutilities.com/', label: 'Homepage', strategies: ['mobile', 'desktop'] as const },
  { url: 'https://summitutilities.com/contact/start-stop-transfer-service', label: 'Start Service', strategies: ['mobile'] as const },
];

async function fetchPSI(url: string, strategy: 'mobile' | 'desktop'): Promise<Partial<PageSpeedResult>> {
  const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}${API_KEY ? `&key=${API_KEY}` : ''}`;
  const res = await fetch(endpoint);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  const cats = data.lighthouseResult?.categories?.performance;
  const metrics = data.lighthouseResult?.audits;
  return {
    score: cats ? Math.round(cats.score * 100) : null,
    lcp: metrics?.['largest-contentful-paint']?.numericValue ? Math.round(metrics['largest-contentful-paint'].numericValue) / 1000 : null,
    cls: metrics?.['cumulative-layout-shift']?.numericValue ? Math.round(metrics['cumulative-layout-shift'].numericValue * 1000) / 1000 : null,
    fcp: metrics?.['first-contentful-paint']?.numericValue ? Math.round(metrics['first-contentful-paint'].numericValue) / 1000 : null,
    ttfb: metrics?.['server-response-time']?.numericValue ? Math.round(metrics['server-response-time'].numericValue) : null,
  };
}

const ICON = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

function vitalsLabel(key: string, value: number | null): string {
  if (value === null) return '—';
  if (key === 'cls') return value.toFixed(3);
  if (key === 'ttfb') return `${value}ms`;
  return `${value.toFixed(1)}s`;
}

function vitalsStatus(key: string, value: number | null): 'good' | 'warning' | 'issue' | 'neutral' {
  if (value === null) return 'neutral';
  const thresholds: Record<string, [number, number]> = {
    lcp: [2.5, 4.0],
    cls: [0.1, 0.25],
    fcp: [1.8, 3.0],
    ttfb: [800, 1800],
  };
  const t = thresholds[key];
  if (!t) return 'neutral';
  if (value <= t[0]) return 'good';
  if (value <= t[1]) return 'warning';
  return 'issue';
}

export default function Performance() {
  const [results, setResults] = useState<Record<string, PageSpeedResult>>({});
  const [fetchState, setFetchState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  useEffect(() => {
    setFetchState('loading');
    const init: Record<string, PageSpeedResult> = {};
    PSI_TARGETS.forEach(t => {
      t.strategies.forEach(s => {
        const key = `${t.label}-${s}`;
        init[key] = { url: t.url, strategy: s, score: null, lcp: null, cls: null, fcp: null, ttfb: null, loading: true, error: null };
      });
    });
    setResults(init);

    const promises = PSI_TARGETS.flatMap(t =>
      t.strategies.map(async s => {
        const key = `${t.label}-${s}`;
        try {
          const data = await fetchPSI(t.url, s);
          setResults(prev => ({ ...prev, [key]: { ...prev[key], ...data, loading: false } }));
        } catch (e) {
          setResults(prev => ({ ...prev, [key]: { ...prev[key], loading: false, error: String(e) } }));
        }
      })
    );
    Promise.all(promises).then(() => setFetchState('done')).catch(() => setFetchState('error'));
  }, []);

  const homeMobile = results['Homepage-mobile'];
  const homeDesktop = results['Homepage-desktop'];
  const startMobile = results['Start Service-mobile'];

  const clsBarData = [
    { name: 'Missing size attrs', value: imageStats.missingSizeAttrsPct, fill: '#ef4444' },
    { name: 'Missing alt text', value: imageStats.missingAltPct, fill: '#f59e0b' },
    { name: 'Oversized images', value: imageStats.over100KBPct, fill: '#f97316' },
    { name: 'Titles < 30 chars', value: seoStats.titlesBelow30CharsPct, fill: '#6366f1' },
    { name: 'Multiple H1s', value: seoStats.h1MultiplePct, fill: '#8b5cf6' },
  ];

  return (
    <SectionCard
      id="performance"
      title="Site Performance Analysis"
      subtitle="PageSpeed Insights (live) + Screaming Frog crawl data"
      icon={ICON}
    >
      {/* Score gauges */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Page Speed Scores</h3>
        <div className="flex flex-wrap gap-6 items-start justify-center sm:justify-start">
          <ScoreGauge score={homeMobile?.score ?? null} label="Homepage Mobile" loading={homeMobile?.loading} />
          <ScoreGauge score={homeDesktop?.score ?? null} label="Homepage Desktop" loading={homeDesktop?.loading} />
          <ScoreGauge score={startMobile?.score ?? null} label="Start Service Mobile" loading={startMobile?.loading} />
        </div>
        {fetchState === 'loading' && (
          <p className="text-xs text-gray-400 mt-2">Fetching live PageSpeed scores…</p>
        )}
        {(homeMobile?.error || homeDesktop?.error) && (
          <p className="text-xs text-amber-600 mt-2">⚠ PageSpeed API rate-limited — scores unavailable. Crawl data below is unaffected.</p>
        )}
      </div>

      {/* Core Web Vitals */}
      {homeMobile && !homeMobile.loading && !homeMobile.error && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Core Web Vitals — Homepage Mobile</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(['lcp', 'cls', 'fcp', 'ttfb'] as const).map(key => {
              const labels: Record<string, string> = { lcp: 'LCP', cls: 'CLS', fcp: 'FCP', ttfb: 'TTFB' };
              const val = homeMobile[key];
              const status = vitalsStatus(key, val);
              const bgMap = { good: 'bg-green-50 border-green-200', warning: 'bg-amber-50 border-amber-200', issue: 'bg-red-50 border-red-200', neutral: 'bg-gray-50 border-gray-200' };
              const textMap = { good: 'text-green-700', warning: 'text-amber-700', issue: 'text-red-700', neutral: 'text-gray-500' };
              return (
                <div key={key} className={`rounded-lg border p-3 text-center ${bgMap[status]}`}>
                  <div className="text-xs font-semibold text-gray-500 uppercase">{labels[key]}</div>
                  <div className={`text-xl font-bold mt-1 ${textMap[status]}`}>{vitalsLabel(key, val)}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Improvement opportunities bar chart */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Crawl Issues — % of Pages/Images Affected</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={clsBarData} layout="vertical" margin={{ left: 8, right: 24, top: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tickFormatter={v => `${v}%`} tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="name" width={140} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => `${v.toFixed(1)}%`} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {clsBarData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
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
          note="97.1% — major CLS contributor"
        />
        <MetricRow
          label="Images over 100 KB"
          value={`${imageStats.over100KB} images`}
          status="warning"
          note="19.3% — LCP and load time impact"
        />
        <MetricRow
          label="Missing alt text"
          value={`${imageStats.missingAlt} images`}
          status="warning"
          note="37.2% — SEO + accessibility gap"
        />
        <MetricRow
          label="Multi-vendor tracking stack"
          value="GA4 + GTM + Meta + TV²"
          status="warning"
          note="Script load weight on every page"
        />
        <MetricRow
          label="All pages HTTPS"
          value="100%"
          status="good"
          note="No mixed content detected"
        />
        <MetricRow
          label="Max crawl depth"
          value="3 clicks"
          status="good"
          note="Flat, efficient architecture"
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
