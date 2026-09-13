export type CaseStudy = {
  challenge: string;
  approach: string;
  highlights: { title: string; text: string }[];
  note?: string;
};
export const projectDetails: Record<string, CaseStudy> = {
  "15": {
    challenge:
      "Video contains useful information in two different forms: what people say and what appears on screen. Finding a specific answer should not require watching the entire recording.",
    approach:
      "An asynchronous processing pipeline extracts both modalities, aligns them into timestamped segments, and indexes the fused text in Qdrant. A natural-language question retrieves relevant evidence, then Gemini streams an answer back to the Next.js interface with clickable citations.",
    highlights: [
      {
        title: "01 / Ingest & extract",
        text: "MP4 uploads land in MinIO; PostgreSQL records the video and job metadata. A Celery worker uses FFmpeg to extract keyframes and audio while the interface reports processing progress.",
      },
      {
        title: "02 / Transcribe & caption",
        text: "Local faster-whisper transcribes the speech. Gemini Vision captions selected keyframes. If captioning fails, the pipeline can continue with transcript-only evidence.",
      },
      {
        title: "03 / Fuse & index",
        text: "Fixed time windows align transcript text with nearby visual captions. Gemini embeddings represent the fused segments in Qdrant, with video IDs and timestamp metadata retained for retrieval.",
      },
      {
        title: "04 / Retrieve & cite",
        text: "The backend embeds the question and retrieves the top matching segments. Server-sent events deliver answer text and citation metadata; selecting a timestamp seeks the video player to that moment.",
      },
    ],
    note: "The interactive walkthrough illustrates the implemented workflow. It does not upload media or run model inference. Source code and the original architecture diagram are available below.",
  },
  "12": {
    challenge:
      "Long, unstructured documents make it difficult to extract the core ideas quickly. A useful summarization system also needs a repeatable path from raw documents to model output and evaluation.",
    approach:
      "The updated résumé describes a modular transformer-based system separating ingestion, preprocessing, inference, and evaluation. The public repository includes configuration and entity layers, ingestion and validation stages, and notebook-based model experimentation.",
    highlights: [
      {
        title: "Reproducible data flow",
        text: "Configuration-driven ingestion and validation make the input stages easier to rerun and inspect.",
      },
      {
        title: "Modular NLP workflow",
        text: "Separate pipeline responsibilities keep document preparation, model experimentation, and evaluation from becoming a single opaque script.",
      },
    ],
  },
  "03": {
    challenge:
      "A chess interface must keep interaction responsive while the engine searches a large tree of legal positions.",
    approach:
      "The current public implementation pairs C++17 and SDL2 with a threaded search engine. Iterative deepening, alpha-beta pruning, quiescence search, move ordering, and transposition caching shape the decision layer.",
    highlights: [
      {
        title: "Playable chess",
        text: "Legal move generation, castling, en passant, promotion, checkmate and stalemate detection support both human-vs-computer and two-player modes.",
      },
      {
        title: "Visible decisions",
        text: "An evaluation bar, move highlights, and legal-move indicators connect the engine state to the graphical board.",
      },
    ],
    note: "This work grew from an earlier Python chess application and engine using Minimax, alpha-beta pruning, iterative deepening, and a custom evaluation function. The linked public version is the C++17 / SDL2 implementation.",
  },
  "16": {
    challenge:
      "Assets spread across accounts and categories make it hard to understand overall allocation and concentration.",
    approach:
      "A Next.js dashboard brings asset CRUD, CSV imports, net-worth history, and allocation charts together. NextAuth.js provides sign-in, with MongoDB/Prisma storage and encryption for sensitive asset fields.",
    highlights: [
      {
        title: "From records to insight",
        text: "Recharts visualizations show allocation, net-worth history, risk concentration, and top movers across asset categories.",
      },
      {
        title: "Practical data entry",
        text: "CSV import includes a preview step alongside manual asset management. The public demo is linked separately from the source.",
      },
    ],
    note: "The repository lists automated market-data synchronization and a Python analytics service as future work; they are not presented here as completed features.",
  },
  "17": {
    challenge:
      "Fraud is rare in the source transaction dataset, so an apparently high overall accuracy can conceal missed fraudulent cases.",
    approach:
      "The notebook explores cleaning, feature engineering, multicollinearity analysis, and tree-based classifiers, reporting precision, recall, and F1 in addition to accuracy.",
    highlights: [
      {
        title: "Data quality first",
        text: "Exploratory plots, encoding, and variance-inflation-factor analysis guide preprocessing.",
      },
      {
        title: "Evaluation that fits the problem",
        text: "Decision Tree and Random Forest models are assessed with class-sensitive metrics. No unverified benchmark score is claimed.",
      },
    ],
  },
};
