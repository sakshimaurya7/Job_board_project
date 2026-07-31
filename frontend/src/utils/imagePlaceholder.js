/**
 * Default SVG placeholders for company logo and cover banner
 */

// Default high quality gradient cover banner SVG
export const DEFAULT_COMPANY_BANNER = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="400" viewBox="0 0 1200 400" fill="none">
  <defs>
    <linearGradient id="bannerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3B82F6"/>
      <stop offset="50%" stop-color="#6366F1"/>
      <stop offset="100%" stop-color="#1E1B4B"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="400" fill="url(#bannerGrad)"/>
  <rect width="1200" height="400" fill="url(#grid)"/>
  <circle cx="1000" cy="80" r="180" fill="rgba(255, 255, 255, 0.06)"/>
  <circle cx="200" cy="320" r="220" fill="rgba(255, 255, 255, 0.04)"/>
  <text x="600" y="215" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="700" fill="rgba(255, 255, 255, 0.3)" text-anchor="middle" letter-spacing="2">ORGANIZATION COVER BANNER</text>
</svg>
`)}`;

// Default company logo placeholder SVG
export const DEFAULT_COMPANY_LOGO = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200" fill="none">
  <rect width="200" height="200" rx="32" fill="#F1F5F9"/>
  <rect x="2" y="2" width="196" height="196" rx="30" fill="none" stroke="#E2E8F0" stroke-width="4"/>
  <path d="M60 150V80C60 74.4772 64.4772 70 70 70H130C135.523 70 140 74.4772 140 80V150M50 150H150" stroke="#3B82F6" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M85 95H95M105 95H115M85 115H95M105 115H115" stroke="#3B82F6" stroke-width="8" stroke-linecap="round"/>
</svg>
`)}`;

/**
 * Returns company logo URL or default placeholder
 * @param {string} logoUrl 
 * @returns {string}
 */
export const getCompanyLogo = (logoUrl) => {
  if (logoUrl && typeof logoUrl === 'string' && logoUrl.trim() !== '') {
    return logoUrl;
  }
  return DEFAULT_COMPANY_LOGO;
};

/**
 * Returns company cover banner URL or default placeholder
 * @param {string} bannerUrl 
 * @returns {string}
 */
export const getCompanyBanner = (bannerUrl) => {
  if (bannerUrl && typeof bannerUrl === 'string' && bannerUrl.trim() !== '') {
    return bannerUrl;
  }
  return DEFAULT_COMPANY_BANNER;
};
