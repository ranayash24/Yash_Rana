import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { VisionWalkthrough } from "./vision-walkthrough";
export function VisionFeature() {
  return (
    <article className="vision-feature">
      <div className="vision-feature-copy">
        <p className="eyebrow">
          <span className="status-dot" /> Flagship / Multimodal AI
        </p>
        <h3>
          Video is full
          <br />
          of answers.
          <br />
          <span className="serif-emphasis">Make them findable.</span>
        </h3>
        <p className="vision-project-name">Video Scene Intelligence</p>
        <p>
          Ask a question. Find the moment. A multimodal RAG system that brings
          speech, visual understanding, and semantic retrieval together—with
          citations you can follow.
        </p>
        <div className="tech-row">
          {["Whisper", "Gemini Vision", "Qdrant", "FastAPI"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="hero-actions">
          <Link
            href="/projects/video-scene-intelligence"
            className="button-primary"
          >
            Explore the case study <ArrowUpRight size={16} />
          </Link>
          <a
            href="https://github.com/ranayash24/transcript"
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            Source code ↗
          </a>
        </div>
      </div>
      <VisionWalkthrough />
    </article>
  );
}
