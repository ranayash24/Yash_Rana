import { siteUrl } from "@/lib/site-url";
import type { MetadataRoute } from "next";
import { projects, projectId } from "@/lib/projects";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/about",
    "/experience",
    "/projects",
    "/research",
    "/contact",
    ...projects.map((p) => `/projects/${projectId(p)}`),
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
