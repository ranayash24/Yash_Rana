"use client";
import { useState } from "react";
import {
  Film,
  AudioLines,
  ScanEye,
  Layers3,
  ArrowUpRight,
  Play,
  Braces,
} from "lucide-react";

const stages = [
  {
    label: "Extract",
    icon: Film,
    title: "One video. Two sources of evidence.",
    detail:
      "FFmpeg extracts keyframes and audio. Celery keeps the processing work off the request thread.",
    primary: "Keyframes",
    secondary: "Audio track",
    code: "video → frames + audio",
  },
  {
    label: "Understand",
    icon: ScanEye,
    title: "Connect what is said with what is seen.",
    detail:
      "Whisper transcribes the speech. Gemini captions selected frames. Time-window fusion brings both modalities into the same segment.",
    primary: "Visual captions",
    secondary: "Speech transcript",
    code: "speech + visual → fused segment",
  },
  {
    label: "Retrieve",
    icon: Layers3,
    title: "An answer with somewhere to point.",
    detail:
      "Qdrant finds relevant segments. The answer streams to the interface with timestamp citations that seek the video to the evidence.",
    primary: "Retrieved moments",
    secondary: "Cited answer",
    code: "question → search → cited answer",
  },
];
export function VisionWalkthrough() {
  const [stage, setStage] = useState(0);
  const [moment, setMoment] = useState(0);
  const current = stages[stage];
  return (
    <div className="vision-walkthrough">
      <div className="vision-window-bar">
        <span>
          <i />
          <i />
          <i />
        </span>
        <span>VIDEO SCENE INTELLIGENCE</span>
        <Braces size={14} />
      </div>
      <div
        className="vision-tabs"
        role="group"
        aria-label="Explore the video pipeline"
      >
        {stages.map((s, i) => (
          <button
            key={s.label}
            aria-pressed={stage === i}
            onClick={() => setStage(i)}
          >
            <s.icon size={14} />
            <span>
              0{i + 1} / {s.label}
            </span>
          </button>
        ))}
      </div>
      <div className="vision-canvas">
        <div className="vision-frame" aria-hidden="true">
          <div className="vision-scan" />
          <div className="vision-frame-corners" />
          <div className="vision-scene">
            <span className="scene-person" />
            <div className="scene-chart">
              {[40, 65, 48, 88, 70].map((h, i) => (
                <i key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <span className="vision-frame-label">
            <ScanEye size={12} /> {current.primary}
          </span>
          <span className="vision-time">
            {moment === 0 ? "00:15" : "00:45"}
          </span>
        </div>
        <div className="vision-evidence">
          <p className="eyebrow">
            <AudioLines size={12} />
            {current.secondary}
          </p>
          {stage === 0 ? (
            <div className="audio-wave" aria-hidden="true">
              {Array.from({ length: 37 }, (_, i) => (
                <i key={i} style={{ height: `${15 + ((i * 37) % 75)}%` }} />
              ))}
            </div>
          ) : (
            <>
              <p className="sample-transcript">
                {stage === 1
                  ? "Speech and visual descriptions share a timestamped segment."
                  : "Find the relevant moment. Read the answer. Follow its citation."}
              </p>
              <div className="evidence-chips">
                {["00:15", "00:45"].map((t, i) => (
                  <button
                    key={t}
                    aria-label={`Show illustrative moment ${t}`}
                    aria-pressed={moment === i}
                    onClick={() => setMoment(i)}
                  >
                    <Play size={9} />
                    {t}
                    <ArrowUpRight size={10} />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="vision-timeline" aria-hidden="true">
        {Array.from({ length: 24 }, (_, i) => (
          <i
            key={i}
            className={i > stage * 6 && i < stage * 6 + 7 ? "active" : ""}
          />
        ))}
      </div>
      <div className="vision-explainer" aria-live="polite">
        <h4>{current.title}</h4>
        <p>{current.detail}</p>
      </div>
      <div className="vision-window-bottom">
        <code>{current.code}</code>
        <span>ILLUSTRATIVE WALKTHROUGH</span>
      </div>
    </div>
  );
}
