"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";

export function HeroSection({ gameActive = false }: { gameActive?: boolean }) {
  const reduced = useReducedMotion();
  return (
    <section
      id="hero"
      className="hero-section"
      style={{ opacity: gameActive ? 0.2 : 1 }}
    >
      <div className="hero-topline">
        <span className="eyebrow">
          <i className="status-dot" /> Applied ML · Generative AI · Software
        </span>
        <span className="eyebrow hero-location">
          Montréal, Canada / 45.50° N
        </span>
      </div>
      <div className="hero-grid">
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="hero-copy"
        >
          <p className="hero-intro">
            Yash Rana <span>— Portfolio</span>
          </p>
          <h1>
            Intelligence
            <br />
            in <span className="serif-emphasis">motion.</span>
            <span className="accent-period">*</span>
          </h1>
          <p className="hero-description">
            I turn complex data into useful software.
            <br className="hidden sm:block" /> Building grounded AI, multimodal
            retrieval, and useful software.
          </p>
          <div className="hero-actions">
            <Link className="button-primary" href="#projects">
              Explore my work <ArrowUpRight size={18} />
            </Link>
            <a
              className="button-secondary"
              href="/resume.pdf"
              download="Yash_Rana_Resume.pdf"
            >
              Résumé <Download size={16} />
            </a>
          </div>
          <Link href="/experience" className="current-role-link">
            <span className="status-dot" /> Currently at GEXEL · Network &
            Connectivity <ArrowUpRight size={12} />
          </Link>
          <div className="hero-footnote">
            <span className="tiny-cross">+</span>
            <span>
              Master of Applied Computer Science
              <br />
              <strong>Concordia University · Class of 2026</strong>
            </span>
          </div>
        </motion.div>
        <div className="intelligence-art" aria-hidden="true">
          <div className="art-coordinates">
            <span>FIG. 01</span>
            <span>INTELLIGENCE IN MOTION</span>
          </div>
          <svg viewBox="0 0 600 600" fill="none" className="orbital-art">
            <defs>
              <radialGradient id="orb-glow">
                <stop stopColor="#e88a45" stopOpacity=".2" />
                <stop offset="1" stopColor="#e88a45" stopOpacity="0" />
              </radialGradient>
              <linearGradient
                id="orbit-stroke"
                x1="100"
                y1="100"
                x2="500"
                y2="500"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#f5c6a4" />
                <stop offset=".5" stopColor="#e78343" />
                <stop offset="1" stopColor="#553422" />
              </linearGradient>
            </defs>
            <circle cx="300" cy="300" r="270" fill="url(#orb-glow)" />
            <path
              d="M30 300H570M300 30V570"
              stroke="#b6a591"
              strokeOpacity=".13"
              strokeDasharray="3 6"
            />
            <circle
              cx="300"
              cy="300"
              r="232"
              stroke="#b6a591"
              strokeOpacity=".2"
              strokeDasharray="2 7"
            />
            <g className="orbit-spin">
              {Array.from({ length: 16 }, (_, i) => (
                <ellipse
                  key={i}
                  cx="300"
                  cy="300"
                  rx={80 + i * 8}
                  ry="211"
                  transform={`rotate(${i * 11.25} 300 300)`}
                  stroke="url(#orbit-stroke)"
                  strokeWidth=".8"
                  opacity={0.35 + i * 0.025}
                />
              ))}
              <circle cx="300" cy="89" r="5" fill="#f8d4b7" />
            </g>
            <circle
              cx="300"
              cy="300"
              r="35"
              fill="#161713"
              stroke="#e78343"
              strokeOpacity=".7"
            />
            <path
              d="M286 300H314M300 286V314M290 290L310 310M290 310L310 290"
              stroke="#efb084"
              strokeWidth="1.5"
            />
            <path
              d="M468 160H551M119 447H41"
              stroke="#c5bbaa"
              strokeOpacity=".4"
            />
            <text x="480" y="151">
              INFERENCE
            </text>
            <text x="41" y="469">
              EXPERIMENT
            </text>
          </svg>
          <div className="art-caption">
            <span>
              <i className="status-dot" /> INPUT → MODEL → IMPACT
            </span>
            <span>01 — ∞</span>
          </div>
        </div>
      </div>
      <div className="hero-bottom">
        <a href="#projects" className="eyebrow">
          Scroll to discover <ArrowDown size={14} />
        </a>
        <span>Research-minded. Engineering-driven.</span>
        <Link href="/contact" className="text-link">
          Let’s connect <ArrowUpRight size={15} />
        </Link>
      </div>
    </section>
  );
}
