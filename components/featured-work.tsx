import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects, featuredIds, projectId } from "@/lib/projects";
import { VisionFeature } from "./vision-feature";
import { ProjectVisual } from "./project-visual";

export function FeaturedWork() {
  return (
    <section id="projects" className="portfolio-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">01 / Selected work</p>
          <h2>Ideas, engineered.</h2>
        </div>
        <Link className="text-link" href="/projects">
          Explore all {projects.length} projects <ArrowUpRight size={17} />
        </Link>
      </div>
      <VisionFeature />
      <div className="featured-grid">
        {featuredIds
          .filter((num) => num !== "15")
          .map((num, i) => {
            const p = projects.find((p) => p.num === num)!;
            return (
              <Link
                key={num}
                href={`/projects/${projectId(p)}`}
                className="featured-card"
              >
                <ProjectVisual project={p} />
                <div className="featured-copy">
                  <div className="eyebrow">
                    0{i + 1} / {p.tags.join(" · ")}
                  </div>
                  <div className="project-title-row">
                    <h3>{p.title}</h3>
                    <ArrowUpRight size={24} />
                  </div>
                  <p>{p.desc}</p>
                  <div className="tech-row">
                    {p.tech.slice(0, 4).map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </section>
  );
}
