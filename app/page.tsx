"use client";
import { useState, useEffect, useRef, lazy, Suspense } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HeroSection } from "@/components/hero-section";
import { jobs } from "@/lib/experience";
import { FeaturedWork } from "@/components/featured-work";
import { ProfilePhotoSpotlight } from "@/components/profile-photo-spotlight";
const SpaceShooterGame = lazy(() =>
  import("@/components/space-shooter-game").then((m) => ({
    default: m.SpaceShooterGame,
  })),
);
export default function Home() {
  const [showGame, setShowGame] = useState(false);
  const gameDialogRef = useRef<HTMLDivElement>(null);
  const gameTriggerRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!showGame) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowGame(false);
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = Array.from(
        gameDialogRef.current?.querySelectorAll<HTMLButtonElement>("button") ??
          [],
      );
      const first = nodes[0],
        last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", handleKey);
      gameTriggerRef.current?.focus();
    };
  }, [showGame]);
  return (
    <>
      <HeroSection />
      <div className="capability-strip">
        <span>Machine learning</span>
        <i>✳</i>
        <span>Full-stack engineering</span>
        <i>✳</i>
        <span>Distributed systems</span>
        <i>✳</i>
        <span>Applied research</span>
      </div>
      <FeaturedWork />
      <section className="portfolio-section about-preview" id="about">
        <ProfilePhotoSpotlight alt="Yash Rana" className="portrait" />
        <div>
          <p className="eyebrow">02 / The person behind the code</p>
          <h2>
            Curiosity is the
            <br />
            <span className="serif-emphasis">starting point.</span>
          </h2>
          <p>
            I’m Yash, a software developer and Concordia graduate based in
            Montréal. I work across backend development, machine learning, and
            full-stack applications, with a patient, methodical approach to
            solving problems.
          </p>
          <p>
            From published ML research to real-time software, I’m interested in
            the journey from a promising idea to a system people can use. I
            currently work in network diagnostics at GEXEL while building toward
            my next role in applied ML and generative AI.
          </p>
          <Link href="/about" className="text-link">
            More about me <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <section className="portfolio-section career-preview" id="experience">
        <div className="section-heading">
          <div>
            <p className="eyebrow">03 / Experience</p>
            <h2>Learning by building.</h2>
          </div>
          <Link href="/experience" className="text-link">
            Full experience <ArrowUpRight size={17} />
          </Link>
        </div>
        {jobs.map((job) => (
          <Link
            href="/experience"
            className={`career-row ${job.current ? "current-career" : ""}`}
            key={job.company}
          >
            <span className="eyebrow">
              {job.current ? "2026 — NOW" : job.period}
            </span>
            <div>
              <h3>{job.company}</h3>
              <p>{job.role}</p>
            </div>
            <span className="career-tech">
              {job.tech.slice(0, 3).join(" · ")}
            </span>
            <ArrowUpRight size={20} />
          </Link>
        ))}
      </section>
      <section className="portfolio-section practice-grid">
        <Link href="/about#skills" id="skills">
          <p className="eyebrow">04 / Toolkit</p>
          <h2>
            Tools for
            <br />
            the whole system.
          </h2>
          <p>
            Python, Java, TypeScript, PyTorch, FastAPI, React, cloud platforms,
            and the engineering tools that connect them.
          </p>
          <span className="text-link">
            Explore the stack <ArrowUpRight size={17} />
          </span>
        </Link>
        <Link href="/research" id="publications">
          <p className="eyebrow">05 / Research</p>
          <h2>
            Questions.
            <br />
            Evidence. Progress.
          </h2>
          <p>
            Co-author of peer-reviewed ML research. Explore the published work
            on early diabetes detection and the milestones along the way.
          </p>
          <span className="text-link">
            Research & achievements <ArrowUpRight size={17} />
          </span>
        </Link>
      </section>
      <section className="portfolio-section lab-preview" id="lab">
        <div>
          <p className="eyebrow">06 / After hours</p>
          <h2>A little room for play.</h2>
          <p>
            A custom canvas space shooter. Rotate, navigate, and see how long
            you can last.
          </p>
        </div>
        <button
          ref={gameTriggerRef}
          className="button-secondary hidden md:inline-flex"
          onClick={() => setShowGame(true)}
        >
          Launch space shooter ↗
        </button>
        <p className="md:hidden">
          The space shooter is available on a desktop with a keyboard.
        </p>
      </section>
      {showGame && (
        <div
          ref={gameDialogRef}
          className="game-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Space shooter"
        >
          <button
            autoFocus
            className="game-close button-secondary"
            onClick={() => setShowGame(false)}
          >
            Close experiment ×
          </button>
          <Suspense fallback={<p>Loading experiment…</p>}>
            <SpaceShooterGame />
          </Suspense>
        </div>
      )}
    </>
  );
}
