import type { ImageStats, SEOStats, CrawlStats, SecurityStats, CanonicalStats } from './types';

// Source: Screaming Frog crawl of summitutilities.com — Feb 27, 2026
export const CRAWL_DATE = 'Feb 27, 2026';
export const CRAWL_URL = 'https://summitutilities.com/';

export const imageStats: ImageStats = {
  total: 207,
  over100KB: 40,
  over100KBPct: 19.32,
  missingAlt: 77,
  missingAltPct: 37.2,
  missingAltAttr: 7,
  missingSizeAttrs: 201,
  missingSizeAttrsPct: 97.1,
};

export const seoStats: SEOStats = {
  totalHtmlPages: 97,
  titlesMissing: 0,
  titlesDuplicate: 4,
  titlesBelow30Chars: 51,
  titlesBelow30CharsPct: 52.58,
  titlesOver60Chars: 3,
  titlesSameAsH1: 16,
  metaDescMissing: 7,
  metaDescDuplicate: 7,
  metaDescBelow70Chars: 25,
  metaDescOver155Chars: 9,
  h1Missing: 4,
  h1Duplicate: 15,
  h1DuplicatePct: 15.46,
  h1Multiple: 20,
  h1MultiplePct: 20.62,
  h2Missing: 42,
  h2MissingPct: 43.3,
  structuredDataPages: 0,
  noindex: 5,
  lowContentPages: 15,
};

export const crawlStats: CrawlStats = {
  totalUrlsEncountered: 500,
  totalInternal: 443,
  totalExternal: 57,
  htmlPages: 104,
  images: 207,
  css: 107,
  js: 13,
  pdf: 10,
  success2xx: 485,
  redirect3xx: 13,
  internalRedirects: 9,
  externalClientError4xx: 1,
  maxCrawlDepth: 3,
  depthDistribution: [
    { depth: 0, pages: 1, pct: 1.03 },
    { depth: 1, pages: 40, pct: 41.24 },
    { depth: 2, pages: 55, pct: 56.7 },
    { depth: 3, pages: 1, pct: 1.03 },
  ],
};

export const securityStats: SecurityStats = {
  httpsUrls: 443,
  missingHSTS: 3,
  missingCSP: 3,
  missingReferrerPolicy: 3,
  unsafeCrossOriginLinks: 20,
  unsafeCrossOriginPct: 4.51,
};

export const canonicalStats: CanonicalStats = {
  total: 107,
  selfReferencing: 69,
  canonicalised: 27,
  canonicalisedPct: 25.23,
  missing: 10,
  nonIndexableCanonical: 2,
};

// SEO opportunity score (0-100, lower = more issues)
export function calcSEOScore(): number {
  const weights = [
    { score: imageStats.missingSizeAttrsPct > 50 ? 0 : 100, weight: 0.2 },    // CLS risk
    { score: imageStats.missingAltPct > 30 ? 30 : 80, weight: 0.1 },          // alt text
    { score: seoStats.structuredDataPages === 0 ? 0 : 80, weight: 0.15 },      // structured data
    { score: 100 - seoStats.titlesBelow30CharsPct, weight: 0.15 },             // title quality
    { score: 100 - seoStats.h1MultiplePct, weight: 0.1 },                      // H1 quality
    { score: seoStats.metaDescMissing === 0 ? 90 : 60, weight: 0.1 },          // meta desc
    { score: crawlStats.internalRedirects < 5 ? 90 : 70, weight: 0.1 },        // redirects
    { score: securityStats.unsafeCrossOriginLinks < 5 ? 90 : 65, weight: 0.1 },// security
  ];
  return Math.round(weights.reduce((acc, w) => acc + w.score * w.weight, 0));
}
