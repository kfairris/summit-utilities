import type { TrackingSignal, JourneyFlow, CTAItem, NinetyDayItem } from './types';

export const trackingSignals: TrackingSignal[] = [
  { name: 'Google Analytics 4', detected: true, note: 'Confirmed via network request' },
  { name: 'Google Tag Manager', detected: true, note: 'Container firing on all pages' },
  { name: 'Meta (Facebook) Pixel', detected: true, note: 'PageView event firing' },
  { name: 'TV Squared', detected: true, note: 'TV attribution pixel detected' },
  { name: 'Cookie CMP', detected: true, note: 'Consent management platform active' },
  { name: 'Structured Data / Schema', detected: false, note: 'Zero pages — rich snippet gap' },
  { name: 'Conversion Event Tracking', detected: false, note: 'No GTM events for service start / bill pay' },
  { name: 'Funnel / Goal Tracking', detected: false, note: 'Cannot confirm without GA4 access' },
];

export const journeyFlows: JourneyFlow[] = [
  {
    name: 'Pay My Bill',
    clicks: 1,
    assessment: 'good',
    steps: [
      { label: 'Homepage', url: 'summitutilities.com', note: '"Pay My Bill" button above fold' },
      { label: 'myaccount.summitutilities.com', url: 'myaccount.summitutilities.com', note: 'Redirects to external portal', friction: true },
    ],
    frictionPoints: [
      'Exits to external subdomain — trust drop for first-time users',
      'No return path back to main site after payment',
      'No confirmation / thank-you event to fire GA4 conversion',
    ],
  },
  {
    name: 'Start Service',
    clicks: 2,
    assessment: 'warning',
    steps: [
      { label: 'Homepage', url: 'summitutilities.com', note: 'No direct CTA in primary nav' },
      { label: 'Contact Menu', url: 'summitutilities.com/contact', note: 'Must find "Contact" → sub-item', friction: true },
      { label: 'Start/Stop/Transfer', url: 'summitutilities.com/contact/start-stop-transfer-service', note: 'Buried 2 clicks deep; no dedicated landing page', friction: true },
    ],
    frictionPoints: [
      '"Start Service" not in primary navigation',
      'Shared page with "Stop" and "Transfer" — dilutes new customer intent',
      'No dedicated acquisition landing page for paid/organic traffic',
      'No GA4 conversion event on form submission',
    ],
  },
];

export const ctaAudit: CTAItem[] = [
  { label: 'Pay My Bill', placement: 'Above fold — hero', audience: 'existing', tracked: false, prominence: 'primary' },
  { label: 'Manage My Account', placement: 'Above fold — hero', audience: 'existing', tracked: false, prominence: 'primary' },
  { label: 'Report an Emergency', placement: 'Above fold — header', audience: 'both', tracked: false, prominence: 'secondary' },
  { label: 'Start Service', placement: 'Contact sub-menu (2 clicks)', audience: 'new', tracked: false, prominence: 'secondary' },
  { label: 'New Customer CTA', placement: '—', audience: 'new', tracked: false, prominence: 'missing' },
  { label: 'Request a Quote', placement: '—', audience: 'new', tracked: false, prominence: 'missing' },
];

export const ninetyDayPlan: NinetyDayItem[] = [
  {
    phase: '30',
    focus: 'Audit & Quick Wins',
    actions: [
      'Gain access to GA4, GTM, and Search Console',
      'Audit existing GTM tags — identify conversion gaps',
      'Map full customer journey (new vs. existing)',
      'Compress 40 oversized images; add size attributes to top 50 pages',
      'Fix 77 missing alt texts for SEO + accessibility',
    ],
    outcome: 'Baseline measurement + low-effort SEO wins deployed',
  },
  {
    phase: '60',
    focus: 'Conversion Architecture',
    actions: [
      'Promote "Start Service" to primary nav & homepage hero',
      'Build dedicated new-customer landing page (A/B test vs. current)',
      'Implement GTM event tracking: service start, bill pay, form submit',
      'Add structured data (LocalBusiness, FAQPage) to 10 key pages',
      'Expand page titles on 51 undersized pages with keyword opportunity',
    ],
    outcome: 'Conversion funnel tracked; acquisition path improved',
  },
  {
    phase: '90',
    focus: 'Growth & Optimization',
    actions: [
      'Launch paid campaign with proper UTM / pixel attribution',
      'Run A/B test on hero CTA hierarchy (new vs. existing customer)',
      'Build SEO content calendar targeting high-intent gas utility queries',
      'Report on LCP / CLS improvements from image optimizations',
      'Establish monthly performance dashboard cadence',
    ],
    outcome: 'Data-driven optimization loop; measurable acquisition lift',
  },
];

export const conversionProposals = [
  {
    title: 'Elevate New Customer CTA',
    description: 'A/B test "Start Service" as a co-primary CTA alongside "Pay My Bill" in the homepage hero. Hypothesis: new customer intent is suppressed, not absent.',
    impact: 'High',
    effort: 'Low',
    metric: 'Start Service page visits',
  },
  {
    title: 'Dedicated Acquisition Landing Page',
    description: 'Create /start-service as a standalone page focused on new customer acquisition — remove Stop/Transfer content. Use for paid traffic destinations.',
    impact: 'High',
    effort: 'Medium',
    metric: 'Form submission CVR',
  },
  {
    title: 'GTM Conversion Event Architecture',
    description: 'Instrument key user actions: service start form submit, bill pay initiation, document download, chat open. Feed into GA4 goals and Meta Pixel custom events.',
    impact: 'High',
    effort: 'Low',
    metric: 'Tracked conversions',
  },
  {
    title: 'Structured Data Rollout',
    description: 'Add LocalBusiness, FAQPage, and BreadcrumbList schema to top 20 pages. Zero structured data currently = zero rich snippet eligibility.',
    impact: 'Medium',
    effort: 'Medium',
    metric: 'Rich snippet impressions in GSC',
  },
];
