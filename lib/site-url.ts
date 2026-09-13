// Netlify provides URL for the primary production domain. Vercel provides its
// production hostname. NEXT_PUBLIC_SITE_URL can override either at build time.
const configuredUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined);
export const siteUrl = new URL(configuredUrl || "http://localhost:3000").origin;
export const siteIndexable =
  !!configuredUrl &&
  !["localhost", "127.0.0.1"].includes(new URL(siteUrl).hostname) &&
  (!process.env.CONTEXT || process.env.CONTEXT === "production") &&
  (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production");
