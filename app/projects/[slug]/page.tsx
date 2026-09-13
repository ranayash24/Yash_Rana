import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { projects, projectId } from "@/lib/projects";
import { projectDetails } from "@/lib/project-details";
import { VisionWalkthrough } from "@/components/vision-walkthrough";
import { ProjectLink } from "@/components/project-link";
import { ProjectVisual } from "@/components/project-visual";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: projectId(p) }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((p) => projectId(p) === slug);
  return p
    ? {
        title: p.title,
        description: p.desc,
        alternates: { canonical: `/projects/${slug}` },
      }
    : {};
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => projectId(p) === slug);
  if (!p) notFound();
  const detail = projectDetails[p.num];
  return (
    <article className="portfolio-section project-detail">
      <Link href="/projects" className="text-link">
        ← All projects
      </Link>
      <p className="eyebrow mt-12">
        Project {p.num} / {p.tags.join(" · ")}
      </p>
      <h1>{p.title}</h1>
      <p className="detail-intro">{p.desc}</p>
      <div className="tech-row">
        {p.tech.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      {p.num === "15" ? (
        <div className="vision-detail-demo">
          <VisionWalkthrough />
        </div>
      ) : (
        <ProjectVisual project={p} />
      )}
      {detail && (
        <section className="case-study-section">
          <p className="eyebrow">The engineering behind the interface</p>
          <div className="case-study-intro">
            <div>
              <h2>The problem</h2>
              <p>{detail.challenge}</p>
            </div>
            <div>
              <h2>The approach</h2>
              <p>{detail.approach}</p>
            </div>
          </div>
          <div className="case-study-grid">
            {detail.highlights.map((h) => (
              <div key={h.title}>
                <h3>{h.title}</h3>
                <p>{h.text}</p>
              </div>
            ))}
          </div>
          {detail.note && <p className="case-study-note">{detail.note}</p>}
        </section>
      )}
      {p.num === "15" && (
        <figure className="architecture-figure">
          <img
            src="/projects/video-scene-intelligence-architecture.svg"
            width="680"
            height="540"
            alt="Video Scene Intelligence architecture: ingestion, multimodal processing, and retrieval layers"
            loading="lazy"
          />
          <figcaption>
            Original project architecture ·{" "}
            <a
              href="/projects/video-scene-intelligence-architecture.svg"
              download
            >
              Download diagram ↗
            </a>
          </figcaption>
        </figure>
      )}
      <div className="detail-columns">
        <section>
          <h2>{detail ? "Implementation stack" : "Technology & approach"}</h2>
          {!detail && <p>{p.desc}</p>}
          <p className="mt-5">Built with {p.tech.join(", ")}.</p>
        </section>
        <section>
          <h2>Explore the work</h2>
          {p.links.map((l) => (
            <ProjectLink key={l.label} link={l} className="button-secondary" />
          ))}
          <p className="mt-4">
            Interested in the implementation or a collaboration?
          </p>
          <Link href="/contact" className="text-link mt-4">
            Get in touch ↗
          </Link>
        </section>
      </div>
    </article>
  );
}
