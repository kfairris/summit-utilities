export interface ImageStats {
  total: number;
  over100KB: number;
  over100KBPct: number;
  missingAlt: number;
  missingAltPct: number;
  missingAltAttr: number;
  missingSizeAttrs: number;
  missingSizeAttrsPct: number;
}

export interface SEOStats {
  totalHtmlPages: number;
  titlesMissing: number;
  titlesDuplicate: number;
  titlesBelow30Chars: number;
  titlesBelow30CharsPct: number;
  titlesOver60Chars: number;
  titlesSameAsH1: number;
  metaDescMissing: number;
  metaDescDuplicate: number;
  metaDescBelow70Chars: number;
  metaDescOver155Chars: number;
  h1Missing: number;
  h1Duplicate: number;
  h1DuplicatePct: number;
  h1Multiple: number;
  h1MultiplePct: number;
  h2Missing: number;
  h2MissingPct: number;
  structuredDataPages: number;
  noindex: number;
  lowContentPages: number;
}

export interface CrawlStats {
  totalUrlsEncountered: number;
  totalInternal: number;
  totalExternal: number;
  htmlPages: number;
  images: number;
  css: number;
  js: number;
  pdf: number;
  success2xx: number;
  redirect3xx: number;
  internalRedirects: number;
  externalClientError4xx: number;
  maxCrawlDepth: number;
  depthDistribution: { depth: number; pages: number; pct: number }[];
}

export interface SecurityStats {
  httpsUrls: number;
  missingHSTS: number;
  missingCSP: number;
  missingReferrerPolicy: number;
  unsafeCrossOriginLinks: number;
  unsafeCrossOriginPct: number;
}

export interface CanonicalStats {
  total: number;
  selfReferencing: number;
  canonicalised: number;
  canonicalisedPct: number;
  missing: number;
  nonIndexableCanonical: number;
}

export interface TrackingSignal {
  name: string;
  detected: boolean;
  note: string;
}

export interface JourneyStep {
  label: string;
  url?: string;
  note?: string;
  friction?: boolean;
}

export interface JourneyFlow {
  name: string;
  clicks: number;
  steps: JourneyStep[];
  assessment: 'good' | 'warning' | 'poor';
  frictionPoints: string[];
}

export interface CTAItem {
  label: string;
  placement: string;
  audience: 'existing' | 'new' | 'both';
  tracked: boolean;
  prominence: 'primary' | 'secondary' | 'missing';
}

export interface PageSpeedResult {
  url: string;
  strategy: 'mobile' | 'desktop';
  score: number | null;
  lcp: number | null;
  cls: number | null;
  fcp: number | null;
  ttfb: number | null;
  loading: boolean;
  error: string | null;
}

export interface NinetyDayItem {
  phase: '30' | '60' | '90';
  focus: string;
  actions: string[];
  outcome: string;
}
