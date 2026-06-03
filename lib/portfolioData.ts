// Yash Rana's portfolio knowledge base for the RAG chatbot

export const PORTFOLIO_DOCUMENTS = [
  {
    text: `Yash Rana is a motivated and detail-oriented Software Developer and Data Scientist based in Montréal, QC, Canada.
He has been working in computer science since 2020 and is known for delivering in deadline-driven environments with a patient, methodical approach to problem-solving.
He is able to quickly pick up new tools and platforms, work independently or in cross-functional teams, and contribute to both research work and production-grade systems.
Yash is currently open to work — he is available for full-time roles, internships, research collaborations, and consulting in Software Development, Data Science, Machine Learning, and related fields.
He identifies as a Full Stack Developer, Data Scientist, and ML Engineer.
His GitHub handle is ranayash24 and he has 39 public repositories.
He was a SSIP Hackathon 2022 Finalist — a state-level innovation competition in India.
He is a published researcher with a paper in Atlantis Press ICAAAI 2025 Proceedings.`,
    metadata: { section: 'about', topic: 'identity background availability' },
  },
  {
    text: `Yash Rana's Education:

1. Master of Applied Computer Science (MApCompSc) — Concordia University, Montréal, QC, Canada.
   Period: September 2024 to May 2026. Currently enrolled. This is his current degree.

2. Bachelor of Engineering in Computer Engineering — Gujarat Technological University, Gujarat, India.
   Period: September 2020 to April 2024. Completed.

Yash started his computer science journey in 2020 and is now pursuing advanced graduate studies at Concordia University in Canada.`,
    metadata: { section: 'education', topic: 'university degree studies' },
  },
  {
    text: `Yash Rana's Work Experience — Data Science Intern at Blue Data Consulting (Remote):
Period: December 2023 to June 2024.
Role: Data Science Intern.

Key achievements and responsibilities:
- Built an end-to-end AI content generation system converting client descriptions into text, audio, and video using LLMs, LangChain, and Azure Cognitive Services.
- Engineered a production TTS (Text-to-Speech) + video generation workflow with Azure Speech + Video Indexer APIs — cutting generation time from 25 minutes to 8 minutes (a 68% reduction) at 92% tone accuracy.
- Integrated feedback-driven prompt refinement and automated quality scoring, improving generative consistency by 30%.

Technologies used: Python, LangChain, Azure Cognitive Services, Azure Speech API, Azure Video Indexer, LLMs.
Key impact metrics: −68% generation time, 92% tone accuracy, +30% consistency improvement.

This was a remote position where Yash worked on AI/ML content generation pipelines.`,
    metadata: { section: 'experience', topic: 'work job internship blue data consulting data science AI' },
  },
  {
    text: `Yash Rana's Work Experience — Full Stack Developer Intern at ShapeAI (Remote):
Period: June 2023 to November 2023.
Role: Full Stack Developer Intern.

Key achievements and responsibilities:
- Delivered a MERN-stack portal for an ed-tech client — active users grew from 120 to 220 (+83%) after introducing interactive dashboards.
- Built secure React.js + Node.js/Express APIs with JWT authentication and validation middleware, reducing backend errors by 45%.
- Optimized front-end with modular React hooks, lazy loading, and caching — improving load speed by 40%.

Technologies used: React.js, Node.js, Express.js, MongoDB, JWT, REST APIs.
Key impact metrics: +83% active users, −45% backend errors, +40% load speed improvement.

This was a remote full-stack development internship focused on ed-tech platforms.`,
    metadata: { section: 'experience', topic: 'work job internship shapeai full stack developer MERN' },
  },
  {
    text: `Yash Rana's Technical Skills:

Programming Languages: Python, Java, JavaScript, TypeScript, SQL, C, HTML5, CSS

Frameworks & Libraries: FastAPI, Spring Boot, React, Next.js, Node.js, Flask, Express, React Native

Machine Learning & AI Tools: Scikit-learn, TensorFlow, PyTorch, XGBoost, LSTM, LangChain, Pandas, NumPy, BERT, Hugging Face, Matplotlib, Seaborn

Cloud / DevOps / Tools: AWS, Azure, Google Cloud, Docker, Git, Jira, Postman, Power BI, Vercel, Streamlit

Databases: MySQL, PostgreSQL, MongoDB, Firebase, Supabase, Prisma

Expertise Areas: Distributed Systems, API Design, Data Visualization, Time-Series Forecasting, LLM Integration, NLP (Natural Language Processing), Neural Style Transfer`,
    metadata: { section: 'skills', topic: 'technologies programming languages frameworks tools databases' },
  },
  {
    text: `Yash Rana's ML/AI Projects:

1. F1 Prediction Market: Real-time Formula 1 prediction market with live data feeds, ML-driven odds, and user predictions on race outcomes and championship standings.
   Technologies: Python, FastAPI, Next.js, PostgreSQL, WebSocket, ML.
   GitHub: github.com/ranayash24/f1_prediction_market

2. Sales GPT: AI sales assistant automating lead qualification, personalized outreach, and real-time conversation coaching via Large Language Models (LLMs).
   Technologies: Python, LangChain, OpenAI, FastAPI, React.

3. F1 Vision: F1 intelligence platform with live telemetry, Gradient Boosting race predictions, driver analytics, and LLM strategy insights.
   Technologies: FastAPI, Python, Next.js, ML, LLMs.

4. Early Diabetes Detection via ML (Published Research): SVM-based diagnostic model achieving 95% accuracy for early-stage diabetes prediction. Published at ICAAAI 2025.
   Technologies: Python, SVM, Scikit-learn, Pandas, Matplotlib.
   Paper link: atlantis-press.com/proceedings/icaaai-25

5. BERT Sentiment Analysis: Fine-tuned BERT model for sentiment classification, served via Flask REST API with full training pipeline.
   Technologies: Python, BERT, Hugging Face, Flask, PyTorch.
   GitHub: github.com/ranayash24/bert_sentiment

6. Book Recommendation System: Collaborative filtering + content-based recommendation engine built on reading history and preferences.
   Technologies: Python, Pandas, Scikit-learn, Jupyter.
   GitHub: github.com/ranayash24/book_recommended_system

7. Style Fusion: Neural style transfer blending artistic styles with content images via VGG feature extraction.
   Technologies: Python, PyTorch, Deep Learning, Jupyter.
   GitHub: github.com/ranayash24/style_fusion

8. Text Summarizer: Transformer-based and extractive text summarization generating concise summaries from long-form content.
   Technologies: Python, NLP, Transformers, Jupyter.
   GitHub: github.com/ranayash24/Text_summarizer_project`,
    metadata: { section: 'projects', topic: 'machine learning AI projects NLP deep learning prediction' },
  },
  {
    text: `Yash Rana's Full Stack & Other Projects:

1. Task Tracker CLI: Terminal-based task manager with project grouping, priority levels, due dates, and rich progress visualization.
   Technologies: Python, Click, SQLite, Rich.

2. Unit Converter: 100+ unit conversion with real-time results, history tracking, and currency support.
   Technologies: React, TypeScript, Node.js.

3. Distributed Share Market: Fault-tolerant replicated trading system with active replication, consensus protocols, and Byzantine failure recovery.
   Technologies: Java, UDP, Distributed Systems, Consensus.

4. Online Movie Ticket Booking (Book My Show): Full-stack booking platform with authentication, real-time seat selection, simulated payments, and Spring Boot REST API.
   Technologies: React, Spring Boot, MySQL, Vercel.
   Live demo: book-my-show-chi.vercel.app
   GitHub: github.com/ranayash24/book-my-show

Yash has built a total of 12 notable projects across full stack development, machine learning, AI/LLM integration, and distributed systems.`,
    metadata: { section: 'projects', topic: 'full stack web development distributed systems CLI projects' },
  },
  {
    text: `Yash Rana's Research and Achievements:

Published Paper: "Early Detection of Diabetes using Machine Learning"
- Published in: Atlantis Press — ICAAAI 2025 Proceedings (International Conference on Artificial Intelligence and Applications)
- Description: Presents an SVM-based diagnostic model achieving 95% accuracy for early-stage diabetes prediction. Validates against Random Forest, KNN, and Logistic Regression baselines with clinical feature engineering.
- Key metrics: 95% model accuracy, SVM as primary algorithm, presented at ICAAAI 2025.
- Link: atlantis-press.com/proceedings/icaaai-25

Other Achievements:
- SSIP Hackathon 2022 Finalist: State-level innovation competition in India.
- GitHub Pull Shark: 39 public repositories on GitHub (username: ranayash24).
- Currently enrolled in Master of Applied Computer Science at Concordia University (2024–2026).`,
    metadata: { section: 'research', topic: 'published research paper diabetes machine learning achievements hackathon' },
  },
  {
    text: `Yash Rana's Contact Information and Availability:

Yash is currently open to work and actively looking for opportunities.

Contact details:
- Email: yashrana2402@gmail.com
- GitHub: github.com/ranayash24 (39 public repositories)
- LinkedIn: linkedin.com/in/yash-vinaychandra-rana
- Location: Montréal, QC, Canada

He is open to:
- Full-time Software Developer, Data Scientist, or ML Engineer roles
- Research collaborations (especially in AI/ML)
- Internships and co-op positions
- Freelance and consulting projects
- Remote or in-person positions in Canada

To get in touch, the best way is to email him at yashrana2402@gmail.com or connect on LinkedIn at linkedin.com/in/yash-vinaychandra-rana.`,
    metadata: { section: 'contact', topic: 'contact email linkedin github location availability hiring' },
  },
]
