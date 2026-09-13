import type { Project } from "@/lib/projects";

/** Concept illustrations, not screenshots or measured/live data. */
export function ProjectVisual({ project }: { project: Project }) {
  const kind =
    project.num === "15"
      ? "vision"
      : project.num === "16"
        ? "wealth"
        : project.num === "03"
          ? "chess"
          : project.num === "02"
            ? "telemetry"
            : project.num === "12"
              ? "language"
              : ["05", "17"].includes(project.num)
                ? "research"
                : "systems";
  return (
    <div className={`project-visual visual-${kind}`} aria-hidden="true">
      <div className="visual-topline">
        <span>
          {kind === "vision"
            ? "MULTIMODAL RETRIEVAL"
            : kind === "wealth"
              ? "FINANCIAL VISIBILITY"
              : kind === "chess"
                ? "SEARCH → DECISION"
                : kind === "telemetry"
                  ? "RACE INTELLIGENCE"
                  : kind === "language"
                    ? "LANGUAGE → MEANING"
                    : kind === "research"
                      ? "PATTERNS → PREDICTION"
                      : "CONNECTED SYSTEMS"}
        </span>
        <span>YR / {project.num}</span>
      </div>
      {kind === "vision" ? (
        <svg viewBox="0 0 600 260" fill="none">
          <rect
            x="65"
            y="40"
            width="150"
            height="100"
            rx="5"
            fill="#293723"
            stroke="#8fba7255"
          />
          <path d="M85 60H195V120H85Z" stroke="#c7dbaf55" />
          <circle cx="120" cy="86" r="14" fill="#8eaa72" />
          <path d="M96 120Q120 76 147 120" fill="#697f53" />
          <path d="M165 114V92M180 114V75" stroke="#c4d4a0" strokeWidth="7" />
          <text x="80" y="164">
            FRAMES + SPEECH
          </text>
          <path
            d="M220 90H275M365 90H414"
            stroke="#9aaf7c"
            strokeDasharray="5 5"
          />
          <rect
            x="275"
            y="50"
            width="90"
            height="80"
            rx="8"
            fill="#304126"
            stroke="#8fba7277"
          />
          <text x="293" y="96">
            QDRANT
          </text>
          <rect
            x="415"
            y="40"
            width="130"
            height="130"
            rx="5"
            fill="#242e1e"
            stroke="#8fba7255"
          />
          <path
            d="M435 65H525M435 80H509M435 95H519"
            stroke="#a7bc8d"
            strokeWidth="3"
          />
          <rect
            x="433"
            y="119"
            width="50"
            height="20"
            rx="3"
            fill="#9abf7233"
          />
          <text x="440" y="133">
            00:15 ↗
          </text>
          <text x="417" y="193">
            CITED ANSWER
          </text>
          <path d="M70 221H530" stroke="#6f815055" />
          {Array.from({ length: 24 }, (_, i) => (
            <rect
              key={i}
              x={70 + i * 19}
              y="213"
              width="13"
              height="15"
              fill={i > 12 && i < 18 ? "#b5d194" : "#536345"}
            />
          ))}
        </svg>
      ) : kind === "wealth" ? (
        <svg viewBox="0 0 600 260" fill="none">
          <circle cx="165" cy="125" r="77" stroke="#36402d" strokeWidth="24" />
          <circle
            cx="165"
            cy="125"
            r="77"
            stroke="#c9b18c"
            strokeWidth="24"
            strokeDasharray="270 485"
            transform="rotate(-90 165 125)"
          />
          <circle
            cx="165"
            cy="125"
            r="77"
            stroke="#9eae7f"
            strokeWidth="24"
            strokeDasharray="110 485"
            strokeDashoffset="-280"
            transform="rotate(-90 165 125)"
          />
          <text x="128" y="130">
            ALLOCATION
          </text>
          <path d="M295 210H540M295 35V210" stroke="#6e756055" />
          <path
            d="M305 190L335 175L365 185L395 140L425 151L455 90L485 110L530 50"
            stroke="#b9c990"
            strokeWidth="3"
          />
          <text x="350" y="238">
            NET WORTH HISTORY
          </text>
        </svg>
      ) : kind === "chess" ? (
        <svg viewBox="0 0 600 260" fill="none">
          {Array.from({ length: 64 }, (_, i) => (
            <rect
              key={i}
              x={185 + (i % 8) * 27}
              y={20 + Math.floor(i / 8) * 27}
              width="27"
              height="27"
              fill={(Math.floor(i / 8) + i) % 2 ? "#555a40" : "#b3ad90"}
            />
          ))}
          <text x="246" y="180" style={{ fontSize: 33, fill: "#171b13" }}>
            ♞
          </text>
          <text x="299" y="101" style={{ fontSize: 33, fill: "#f0e9d8" }}>
            ♔
          </text>
          <path
            d="M260 167V114H314"
            stroke="#ed9c65"
            strokeWidth="2"
            strokeDasharray="5 3"
          />
          <circle cx="314" cy="114" r="5" fill="#ed9c65" />
        </svg>
      ) : kind === "telemetry" ? (
        <svg viewBox="0 0 600 260" fill="none">
          <path
            className="track-shadow"
            d="M110 185C50 160 65 85 130 80L290 80Q320 80 330 48Q340 20 380 36L520 98Q550 118 520 148L450 205Q426 224 406 190L380 148Q366 128 346 142L230 210Q185 238 110 185Z"
          />
          <path
            className="track-line"
            d="M110 185C50 160 65 85 130 80L290 80Q320 80 330 48Q340 20 380 36L520 98Q550 118 520 148L450 205Q426 224 406 190L380 148Q366 128 346 142L230 210Q185 238 110 185Z"
          />
          <circle cx="131" cy="80" r="7" fill="var(--accent)" />
          <circle cx="450" cy="205" r="5" fill="#e8e2d8" />
          <path
            d="M131 80V30H200M450 205V245H385"
            stroke="#77736c"
            strokeDasharray="3 4"
          />
          <text x="142" y="23">
            TELEMETRY IN
          </text>
          <text x="291" y="250">
            STRATEGY OUT
          </text>
        </svg>
      ) : kind === "language" ? (
        <div className="language-visual">
          <div className="document-lines">
            {[85, 100, 65, 92, 100, 75, 90, 55].map((width, i) => (
              <i key={i} style={{ width: `${width}%` }} />
            ))}
          </div>
          <span className="transform-node">✳</span>
          <div className="document-lines summary-lines">
            {[100, 80, 60].map((width, i) => (
              <i key={i} style={{ width: `${width}%` }} />
            ))}
          </div>
        </div>
      ) : kind === "research" ? (
        <svg viewBox="0 0 600 260" fill="none">
          <path
            d="M75 30V225H535M105 210L490 40"
            stroke="#5d5c55"
            strokeDasharray="4 5"
          />
          {Array.from({ length: 36 }, (_, i) => (
            <circle
              key={i}
              cx={110 + ((i * 73) % 380)}
              cy={45 + ((i * 47) % 155)}
              r={i % 4 === 0 ? 5 : 3}
              fill={i % 3 === 0 ? "#ede6da" : "var(--accent)"}
              opacity={0.35 + (i % 4) * 0.18}
            />
          ))}
          <path
            d="M95 225L405 30M215 225L525 30"
            stroke="var(--accent)"
            opacity=".25"
          />
          <text x="430" y="248">
            FEATURE SPACE
          </text>
        </svg>
      ) : (
        <div className="system-visual">
          <span>CLIENT</span>
          <i />
          <span className="system-core">
            {project.num === "01" ? "REDLINE" : "ENGINE"}
          </span>
          <i />
          <span>DATA</span>
        </div>
      )}
      <div className="visual-bottomline">
        <span>{project.tech.slice(0, 3).join(" / ")}</span>
        <span>CONCEPT DIAGRAM</span>
      </div>
    </div>
  );
}
