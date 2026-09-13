import type { MetadataRoute } from "next";
import { siteUrl, siteIndexable } from "@/lib/site-url";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: siteIndexable
      ? { userAgent: "*", allow: "/", disallow: "/api/" }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
