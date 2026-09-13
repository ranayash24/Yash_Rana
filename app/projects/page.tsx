"use client";
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { projects, projectId, featuredIds, type Project } from "@/lib/projects";
import { ProjectLink } from "@/components/project-link";
import { ProjectVisual } from "@/components/project-visual";

const filters = [
  "All work",
  "AI / ML",
  "Full Stack",
  "Systems",
  "Research",
  "Lab",
];
function ProjectCard({ p }: { p: Project }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  return (
    <motion.article
      ref={ref}
      className="project-card"
      animate={tilt}
      onMouseMove={(e) => {
        if (reduced || !window.matchMedia("(pointer:fine)").matches) return;
        const r = ref.current!.getBoundingClientRect();
        setTilt({
          rotateX: -(e.clientY - r.top - r.height / 2) / 90,
          rotateY: (e.clientX - r.left - r.width / 2) / 90,
        });
      }}
      onMouseLeave={() => setTilt({ rotateX: 0, rotateY: 0 })}
    >
      <div className="eyebrow">
        {p.num} / {p.tags.join(" · ")}
      </div>
      <h2>
        <Link href={`/projects/${projectId(p)}`}>{p.title}</Link>
      </h2>
      <p>{p.desc}</p>
      <div className="tech-row">
        {p.tech.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <div className="card-links">
        <Link href={`/projects/${projectId(p)}`}>Project details ↗</Link>
        {p.links.map((l) => (
          <ProjectLink key={l.label} link={l} />
        ))}
      </div>
    </motion.article>
  );
}
export default function ProjectsPage() {
  const [filter, setFilter] = useState("All work");
  const [query, setQuery] = useState("");
  const visible = projects.filter((p) => {
    const category =
      filter === "All work" ||
      (filter === "AI / ML" &&
        p.tags.some((t) => ["ML / AI", "AI", "LLM", "NLP"].includes(t))) ||
      (filter === "Full Stack" && p.tags.includes("Full Stack")) ||
      (filter === "Systems" && p.tags.some((t) => t.includes("Systems"))) ||
      (filter === "Research" && p.tags.includes("Published Research")) ||
      (filter === "Lab" &&
        ["10", "11", "13", "14", "18", "19"].includes(p.num));
    return (
      category &&
      [p.title, p.desc, ...p.tech, ...p.tags]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  });
  const spotlight = filter === "All work" && !query;
  return (
    <div className="interior-page min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <p className="eyebrow mb-5">03 / The project collection</p>
        <h1 className="text-5xl md:text-7xl mb-7">
          From exploration
          <br />
          <span>to execution.</span>
        </h1>
        <p className="text-muted text-sm max-w-xl leading-relaxed mb-10">
          AI experiments, real-time applications, and systems engineering. A
          collection of {projects.length} projects, with the details and
          technologies behind each one.
        </p>
        <div className="project-toolbar">
          <div
            className="project-filters"
            role="group"
            aria-label="Filter projects"
          >
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
              >
                {f}
              </button>
            ))}
          </div>
          <input
            className="project-search"
            type="search"
            aria-label="Search projects and technologies"
            placeholder="Search projects or technologies…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <p className="eyebrow" role="status">
          {visible.length} {visible.length === 1 ? "project" : "projects"}{" "}
          {filter !== "All work" ? `/ ${filter}` : ""}
        </p>
        {spotlight && (
          <>
            <div className="collection-label">
              <h2 className="eyebrow">Selected AI, research & engineering</h2>
              <span className="eyebrow">01 — 05</span>
            </div>
            <div className="featured-grid">
              {featuredIds.map((num) => {
                const p = projects.find((p) => p.num === num)!;
                return (
                  <div
                    key={num}
                    className={num === "15" ? "collection-flagship" : undefined}
                  >
                    <Link
                      href={`/projects/${projectId(p)}`}
                      aria-label={`Explore ${p.title}`}
                    >
                      <ProjectVisual project={p} />
                    </Link>
                    <ProjectCard p={p} />
                  </div>
                );
              })}
            </div>
            <div className="collection-label">
              <h2 className="eyebrow">
                More engineering, experiments & other work
              </h2>
              <span className="eyebrow">
                {projects.length - featuredIds.length} projects
              </span>
            </div>
          </>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {visible
            .filter((p) => !spotlight || !featuredIds.includes(p.num))
            .map((p) => (
              <ProjectCard key={p.num} p={p} />
            ))}
        </div>
        {!visible.length && (
          <div className="py-16 text-center">
            <p className="text-muted mb-5">No projects match this search.</p>
            <button
              className="button-secondary"
              onClick={() => {
                setFilter("All work");
                setQuery("");
              }}
            >
              Show all projects
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
