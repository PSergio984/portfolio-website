export interface ArchitectureLayer {
  layer: string;
  tech: string;
  role: string;
}

export interface BenchmarkMetric {
  metric: string;
  value: string;
  notes: string;
}

export interface TechnicalDecision {
  decision: string;
  alternative: string;
  rationale: string;
}

export interface ProjectHighlight {
  label: string;
  value: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  tagline: string;
  summary: string;
  tags: string[];
  imageUrl: string;
  links: {
    demo?: string;
    github?: string;
    sidecarGithub?: string;
  };
  highlights: ProjectHighlight[];
  metrics: Array<{ label: string; value: string }>;
  problem: string[];
  contribution: string[];
  solution: string[];
  architecture: {
    summary: string;
    diagram?: string;
    stack: ArchitectureLayer[];
  };
  aiIntegration?: {
    overview: string;
    pipelineSteps?: string[];
    benchmarks?: BenchmarkMetric[];
  };
  decisions: TechnicalDecision[];
  challenges: string[];
  results: string[];
  lessons: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'ceit-library',
    title: 'PLV eLib (CEIT Library)',
    tagline: 'Academic Paper Directory with Hybrid RRF Search, Bounded Agentic RAG, and Real-Time Telemetry',
    summary:
      'A dual-engine academic library management system combining a production Laravel 11 core with an intelligent FastAPI AI sidecar for natural-language thesis discovery, policy Q&A, and citation-grounded answers.',
    tags: ['FastAPI', 'Laravel 11', 'PostgreSQL', 'SQLite FTS5', 'RRF (k=60)', 'Docker', 'Prometheus', 'Livewire 3'],
    imageUrl: '/assets/projects/ceit-lib.webp',
    links: {
      demo: 'https://ceit-library-main-cru0ty.laravel.cloud/',
      github: 'https://github.com/PSergio984/CEIT-Library',
      sidecarGithub: 'https://github.com/PSergio984/ceit-ai-sidecar',
    },
    highlights: [
      { label: 'AI Architecture', value: 'Decoupled RAG Microservice' },
      { label: 'Retrieval Engine', value: 'Hybrid Dense/Sparse RRF (k=60)' },
      { label: 'Grounded Eval', value: '86.4% Top-1 Golden Set' },
    ],
    metrics: [
      { label: 'PHPUnit Tests', value: '600+' },
      { label: 'Pytest Tests', value: '78' },
      { label: 'Top-1 Retrieval', value: '86.4%' },
      { label: 'Negative Pass', value: '100%' },
      { label: 'LLM Judge Relevance', value: '90%' },
    ],
    problem: [
      'The College of Engineering and Information Technology (CEIT) Library at Pamantasan ng Lungsod ng Valenzuela (PLV) relied on manual paper logs for student attendance and research paper circulation.',
      'During peak hours, physical logging caused major congestion. Students struggled to discover relevant past thesis papers across engineering disciplines because traditional keyword queries failed on paraphrased, natural language, or Taglish search terms.',
      'The original Software Requirements Specification (SRS) defined a standard monolithic web portal, but expanding research needs required an intelligent search and citation layer without disrupting the core transactional database.',
    ],
    contribution: [
      'Forward-Deployed Engineer, Technical Lead, and Solutions Architect.',
      'Architected and implemented the core Laravel 11 application, PostgreSQL database schema, role-based access control, and dynamic QR attendance/borrowing state machines.',
      'Designed, built, and deployed the external FastAPI AI Sidecar on FastAPI Cloud, implementing hybrid search, reciprocal rank fusion (RRF), blend reranking, and SSE streaming APIs.',
      'Configured Docker, Prometheus `/metrics` latency histograms, and Grafana telemetry dashboards to monitor live inference and retrieval health.',
      'Led the team using Jira to delegate bug fixes and minor features while managing stakeholder demonstrations with the faculty client.',
    ],
    solution: [
      'Engineered a decoupled dual-engine architecture: Laravel 11 handles student authentication (@plv.edu.ph), QR attendance timekeeping, borrowing workflows, and role permissions.',
      'The standalone FastAPI AI Sidecar consumes exported JSON corpora and maintains an optimized SQLite FTS5 lexical index alongside dense embeddings, providing sub-second semantic discovery with strict citation grounding.',
    ],
    architecture: {
      summary:
        'A decoupled micro-service topology where the transactional monolith and AI retrieval layer operate independently, eliminating database locking and compute contention.',
      diagram: `+-------------------------------------------------------------------------+
|                  PLV CEIT LIBRARY SYSTEM ARCHITECTURE                   |
+-------------------------------------------------------------------------+

  [ Student / Staff / Admin Browser ]
            |                  |
   (HTTPS / Livewire)    (HTTP / SSE Stream)
            |                  |
            v                  v
+-----------------------+  +----------------------------------------------+
| Core Laravel 11 App   |  | FastAPI AI Sidecar (FastAPI Cloud)          |
|-----------------------|  |----------------------------------------------|
| • PHP 8.4 + Livewire  |  | • Python / FastAPI                           |
| • MaryUI + Tailwind   |  | • SQLite FTS5 (BM25 Keyword Search)         |
| • QR Code Subsystems  |  | • all-MiniLM-L6-v2 (Vector Embeddings)      |
| • RBAC & Violations   |  | • Reciprocal Rank Fusion (RRF, k=60)        |
| • Credit Scoring      |  | • Deterministic Blend Re-Ranker              |
| • JSON Corpus Export  |  | • Bounded 3-Step Agentic Search Loop         |
+-----------------------+  +----------------------------------------------+
            |                                  ^
     (SQL Queries)                     (JSON Corpus Ingestion)
            v                                  |
+-----------------------+                      |
| Primary Database      |                      |
| PostgreSQL            | ---------------------+
| (Relational Storage)  | (Decoupled Export / Zero DB Locking)
+-----------------------+`,
      stack: [
        { layer: 'Core Backend', tech: 'Laravel 11 / PHP 8.4', role: 'Authentication, QR attendance, loans, and business rules' },
        { layer: 'AI Sidecar', tech: 'FastAPI / Python 3.12', role: 'Hybrid search, embedding inference, agentic RAG, and SSE streaming' },
        { layer: 'Primary Storage', tech: 'PostgreSQL', role: 'Relational data, user accounts, circulation transaction logs' },
        { layer: 'Search Index', tech: 'SQLite FTS5 + Dense Vectors', role: 'BM25 text indexing + 384d vector storage in memory/disk' },
        { layer: 'Observability', tech: 'Prometheus & Grafana', role: 'Latency histograms, retrieval throughput, and thumbs up/down stream' },
      ],
    },
    aiIntegration: {
      overview:
        'The AI sidecar implements a hybrid retrieval engine combining lexical BM25 and dense semantic embeddings via Reciprocal Rank Fusion (RRF, k=60), topped by a deterministic blend reranker and a bounded 3-step agentic query loop.',
      pipelineSteps: [
        'Query Pre-processing: Alphanumeric tokenization preserving publication years and exact catalog codes (e.g., IT-2024-001).',
        'Hybrid Retrieval: Dual retrieval across SQLite FTS5 (BM25) and all-MiniLM-L6-v2 vector embeddings.',
        'Reciprocal Rank Fusion (RRF): Combines ranked lists using score = 1 / (60 + rank).',
        'Deterministic Blend Re-ranking: Re-scores top candidates, boosting Top-1 retrieval from 81.8% to 86.4%.',
        'Semantic Threshold Gating: Blocks embeddings with cosine similarity < 0.50, ensuring 100% negative query pass rate.',
        'Bounded Agentic Loop: Maximum 3 search iterations with inline numbered citation grounding and deterministic refusal on zero context.',
      ],
      benchmarks: [
        { metric: 'Top-1 Retrieval Rate', value: '86.36%', notes: 'With blend reranking on 27-case golden set' },
        { metric: 'Negative Pass Rate', value: '100.0%', notes: 'Zero hallucinations on out-of-domain queries' },
        { metric: 'Recall@5', value: '72.39%', notes: 'Top-5 relevant catalog document capture' },
        { metric: 'Precision@5', value: '45.45%', notes: 'High precision on mixed department queries' },
        { metric: 'LLM-as-Judge Relevance', value: '90.0%', notes: 'Evaluated with llama-3.3-70b across 40 benchmark questions' },
        { metric: 'LLM Partly-or-Better', value: '100.0%', notes: 'Zero irrelevant or unsupported answers generated' },
      ],
    },
    decisions: [
      {
        decision: 'PostgreSQL Migration over MySQL',
        alternative: 'MySQL (original SRS requirement)',
        rationale:
          'PostgreSQL offered superior JSON aggregation for corpus exports, advanced relational indexing, and modern cloud deployment compatibility on Laravel Cloud.',
      },
      {
        decision: 'Decoupled Sidecar over Monolithic RAG',
        alternative: 'Monolithic PHP/Laravel vector extension',
        rationale:
          'Isolating Python AI workloads and embedding memory prevented blocking PHP web workers and enabled independent zero-cost scaling on FastAPI Cloud.',
      },
      {
        decision: 'Lightweight Embedding Model (all-MiniLM-L6-v2)',
        alternative: 'Large 768d transformer models (e.g., BGE-Large, OpenAI text-3-large)',
        rationale:
          'Strictly chosen to avoid Out-Of-Memory (OOM) termination on cloud free tiers while providing fast 384-dimensional vector inference.',
      },
      {
        decision: 'Atomic Index Rebuilding',
        alternative: 'In-place SQLite index mutation',
        rationale:
          'Indexes are built in isolated versioned directories and swapped atomically via file pointer updates, guaranteeing zero read downtime and eliminating dirty reads.',
      },
    ],
    challenges: [
      'Integrating AI functionality after the SRS was already finalized without coupling the AI service directly to the transactional database.',
      'Managing memory limits in cloud container environments while executing real-time vector embeddings.',
      'Handling colloquial, Taglish, and paraphrased student query variations while maintaining exact matching for catalog codes.',
    ],
    results: [
      '600+ passing PHPUnit tests for Laravel core and 78 passing pytest tests for the FastAPI sidecar.',
      'Verified 86.36% Top-1 retrieval rate and 100% negative query pass rate on the 27-case benchmark golden set.',
      'Production-ready Dockerized monitoring stack with 6-chart Grafana dashboard and active user feedback stream.',
      'Successfully deployed live across Laravel Cloud and FastAPI Cloud.',
    ],
    lessons: [
      'Whole-document embeddings constrained prompt context to 600 characters; hierarchical semantic chunking will be implemented in the next iteration.',
      'Engineering non-functional stress tests for peak student rush hours is essential before campus-wide deployment.',
    ],
  },
  {
    id: 'agos',
    title: 'AGOS (AI-Guided Overflow Surveillance)',
    tagline: 'Multi-Modal Edge IoT Flood Monitoring with YOLOv8 Obstruction Detection and Dual-Cadence Telemetry',
    summary:
      'An end-to-end IoT and computer vision flood surveillance system designed for Barangay Maysan, fusing solar-powered Raspberry Pi edge sensing, ultrasonic water depth, and decoupled server-side YOLOv8 inference.',
    tags: ['YOLOv8', 'Raspberry Pi', 'FastAPI', 'React', 'OpenCV', 'IoT Telemetry', 'PostgreSQL', 'Tailwind CSS'],
    imageUrl: '/assets/projects/agos.webp',
    links: {
      demo: 'https://agos-app.vercel.app/',
      github: 'https://github.com/PSergio984/agos-iot-flood-monitoring',
    },
    highlights: [
      { label: 'Vision AI', value: 'YOLOv8 Blockage Classification' },
      { label: 'Edge Hardware', value: 'Solar RPi Zero 2W + LTE' },
      { label: 'Decision Engine', value: '3-Tier Multi-Modal Hazard Scoring' },
    ],
    metrics: [
      { label: 'Annotated Dataset', value: '5,000 Imgs' },
      { label: 'Vision Stream Cadence', value: '15s' },
      { label: 'AI Inference Cadence', value: '3 min' },
      { label: 'Compute Savings', value: '~92%' },
      { label: 'Sensor Modalities', value: '3 Fused' },
    ],
    problem: [
      'Urban drainage blockages in Barangay Maysan, Valenzuela City frequently cause sudden localized flash flooding during monsoon rains.',
      'Manual waterway inspection is hazardous and delayed. Existing municipal CCTV feeds provide video but lack automated blockage hazard detection, real-time depth measurements, and automated emergency alerting.',
    ],
    contribution: [
      'Technical Lead.',
      'Researched, sourced, wired, assembled, and configured the physical IoT sensor hardware (Raspberry Pi Zero 2W, IR-Cut camera, waterproof ultrasonic sensor, solar panel, LiFePO4 battery, and LTE dongle).',
      'Co-collected and manually annotated 5,000 dataset images on CVAT.ai, configured YOLOv8 training and validation runs, and built OpenCV frame quality filters.',
      'Architected the decoupled dual-cadence telemetry and server-side Fusion & Decision Engine combining vision, depth, and weather data into automated alert tiers.',
    ],
    solution: [
      'Constructed a solar-powered edge IoT monitoring station communicating over 4G LTE.',
      'Implemented a multi-modal Fusion & Decision Engine calculating a dynamic 0–100 hazard score to trigger 3-tier visual LEDs (Safe, Warning, Critical) and instant push/SMS notifications with a 30-minute cooldown.',
    ],
    architecture: {
      summary:
        'Dual-cadence edge-to-cloud architecture: high-frequency 15s visual capture for live monitoring, decoupled from cost-efficient 3-minute server AI inference.',
      diagram: `+-------------------------------------------------------------------------+
|                  AGOS DUAL-CADENCE IOT-AI ARCHITECTURE                  |
+-------------------------------------------------------------------------+

  [ Solar Edge Sensor Unit: Maysan Waterway ]
  • Raspberry Pi Zero 2W + LiFePO4 Battery + LTE
  • IR-Cut Camera V1 (15s frame stream)
  • JSN-SR04T Waterproof Ultrasonic (1 min water depth telemetry)
  • Bi-directional 5V to 3.3V Logic Level Converter
            |
      (4G LTE Telemetry)
            |
            v
+-------------------------------------------------------------------------+
| FastAPI Backend & Fusion Engine                                         |
|-------------------------------------------------------------------------|
| • Live Visual Ingestion: updates web stream every 15 seconds           |
| • OpenCV Frame Quality Filter: checks brightness, contrast, blur        |
| • YOLOv8 AI Inference: runs every 3 minutes (Clear / Partial / Blocked) |
| • Weather Ingestion: hourly OpenMeteo rainfall telemetry API            |
| • Multi-Modal Fusion Engine: calculates composite 0-100 hazard score    |
+-------------------------------------------------------------------------+
            |
            v
  [ Alert & Monitoring Layer ]
  • Safe (0-44) -> Green LED | Warning (45-75) -> Yellow LED
  • Critical (76-100) -> Red LED + Push Notifications + SMS Dispatch`,
      stack: [
        { layer: 'Edge Hardware', tech: 'Raspberry Pi Zero 2W + Solar', role: 'On-site sensor capture, power management, LTE transmission' },
        { layer: 'Sensors', tech: 'RPi IR-Cut Cam + JSN-SR04T', role: 'Visual obstruction capture + ultrasonic water depth measurement' },
        { layer: 'Vision & AI', tech: 'YOLOv8 + OpenCV', role: 'Frame quality validation and drainage blockage classification' },
        { layer: 'Backend Engine', tech: 'FastAPI + PostgreSQL', role: 'Telemetry ingestion, fusion decision scoring, alert dispatch' },
        { layer: 'Web Dashboard', tech: 'React 19 + TypeScript + Tailwind', role: 'Real-time telemetry charts, live camera feeds, and alert logs' },
      ],
    },
    aiIntegration: {
      overview:
        'YOLOv8 deep learning model trained on 5,000 project-specific drainage images to classify obstruction states as Clear, Partial, or Blocked, gated by OpenCV quality validation.',
      pipelineSteps: [
        'Edge Capture: Camera transmits frames every 15s over LTE.',
        'OpenCV Quality Guard: Validates frame illumination and blur before passing to the AI pipeline.',
        'Decoupled Inference: YOLOv8 processes frames every 3 minutes, slashing server CPU usage by ~92%.',
        'Decision Fusion: Fuses Water Level (up to 50 pts), Blockage (up to 30 pts), and Weather (up to 20 pts) into a composite 0-100 score.',
      ],
    },
    decisions: [
      {
        decision: 'Decoupled 15s Video Stream from 3-min AI Inference',
        alternative: 'Running YOLOv8 inference on every transmitted frame (every 15s)',
        rationale:
          'Drainage blockages do not change in seconds. Decoupling inference cut server compute overhead by ~92% while keeping live video fresh for human operators.',
      },
      {
        decision: 'Multi-Modal Decision Fusion over Single Sensor',
        alternative: 'Relying exclusively on camera vision or ultrasonic depth alone',
        rationale:
          'Cameras fail in pitch-black storm conditions; ultrasonic sensors suffer noise from floating trash. Fusing vision, depth, and weather eliminated false alarms.',
      },
      {
        decision: 'Custom 5,000-Image CVAT Dataset',
        alternative: 'Generic open-source water/debris datasets',
        rationale:
          'Urban Philippine drainage infrastructure has specific concrete culvert geometries and debris compositions that generic datasets failed to detect.',
      },
    ],
    challenges: [
      'Low-light nighttime conditions and heavy rainfall camera occlusion (mitigated with OpenCV frame validation).',
      'Ultrasonic measurement reflections from floating debris requiring statistical outlier filtering.',
      'Maintaining power budget on solar LiFePO4 battery during prolonged overcast storm weather.',
    ],
    results: [
      'Constructed and verified complete solar-powered IoT edge prototype.',
      'Curated, cleaned, and labeled 5,000 domain-specific training images on CVAT.ai.',
      'Validated end-to-end telemetry pipeline from sensor node to FastAPI cloud and React web dashboard.',
    ],
    lessons: [
      'Empirical cloud billing measurements are needed to quantify exact dollar savings from the 15s/3min architecture in full production.',
      'Formal ISO/IEC 25010 testing for long-term edge hardware reliability is currently in progress.',
    ],
  },
  {
    id: 'task-buddy',
    title: 'Task-Buddy',
    tagline: 'AI-Powered Task Management System with Conversational RAG Memory, Effort Estimation, and Smart Scheduling',
    summary:
      'A full-stack productivity web application featuring React 19, FastAPI, pgvector vector search, Groq sub-second inference, and real-time WebSocket synchronization.',
    tags: ['React 19', 'FastAPI', 'PostgreSQL', 'pgvector', 'RAG (BM25 + Jina)', 'Groq', 'Supabase Realtime', 'TypeScript'],
    imageUrl: '/assets/projects/taskbuddy.webp',
    links: {
      demo: 'https://task-buddy-frontend.vercel.app/',
      github: 'https://github.com/PSergio984/task-buddy-frontend',
    },
    highlights: [
      { label: 'Knowledge Engine', value: 'Supabase pgvector + Hybrid RAG' },
      { label: 'Inference Layer', value: 'Sub-500ms Groq llama-3.3-70b' },
      { label: 'Sync Architecture', value: 'Real-Time WebSockets + React 19' },
    ],
    metrics: [
      { label: 'Pytest Backend Tests', value: '347' },
      { label: 'Client Bundle Size', value: '338 KB' },
      { label: 'RAG Retrieval', value: 'Hybrid RRF' },
      { label: 'Inference Latency', value: '< 500ms' },
    ],
    problem: [
      'Conventional todo applications are static and reactive—users fail to estimate task effort accurately, lose contextual task notes, and suffer from daily task prioritization paralysis.',
    ],
    contribution: [
      'Technical Lead and Sole Developer.',
      'Architected the entire application: React 19 frontend, FastAPI backend API, PostgreSQL database with pgvector, RAG knowledge layer, and automated testing suite.',
    ],
    solution: [
      'Engineered a modern task management system augmented with an intelligent memory and planning layer (contextual Q&A over tasks with citation grounding, task effort prediction based on past completion history, and LLM-driven priority scheduling).',
    ],
    architecture: {
      summary:
        'Unified full-stack architecture combining React 19 SPA, FastAPI REST endpoints, Supabase PostgreSQL with pgvector, and Groq ultra-low latency inference.',
      stack: [
        { layer: 'Frontend', tech: 'React 19 + TypeScript + Tailwind v4', role: 'Interactive task boards, analytics dashboard, theme switching' },
        { layer: 'Backend API', tech: 'FastAPI / Python 3.12', role: 'Authentication, CRUD endpoints, Alembic migrations, background tasks' },
        { layer: 'Vector Storage', tech: 'Supabase PostgreSQL + pgvector', role: 'Relational task storage and dense vector embeddings' },
        { layer: 'LLM & RAG', tech: 'Groq (llama-3.3-70b) + Jina AI', role: 'Sub-second planning, effort estimation, and hybrid BM25/Vector RRF' },
      ],
    },
    aiIntegration: {
      overview:
        'Hybrid retrieval combining BM25 keyword matching with Jina embeddings via RRF. Groq llama-3.3-70b provides sub-500ms planning responses with OpenAI gpt-4o-mini failover.',
    },
    decisions: [
      {
        decision: 'Unified PostgreSQL with pgvector on Supabase',
        alternative: 'Standalone vector database (Pinecone/Qdrant)',
        rationale: 'Kept relational task state and vector embeddings in one database, eliminating split-brain data synchronization.',
      },
      {
        decision: 'In-Process Background Async Tasks',
        alternative: 'Heavy Celery + RabbitMQ cluster',
        rationale: 'Handled email confirmations and push notification scans efficiently without unnecessary infrastructure overhead.',
      },
    ],
    challenges: [
      'Handling real-time state synchronization conflict resolution across multiple active browser sessions.',
      'Managing embedding dimension migrations with Alembic and pgvector.',
    ],
    results: [
      '347 passing pytest backend tests covering auth, task state machines, and RAG pipelines.',
      'Optimized 338 KB minified frontend bundle with sub-second API response times.',
    ],
    lessons: [
      'Offline-first synchronization with optimistic UI updates requires robust CRDT or timestamp-based conflict resolution.',
    ],
  },
  {
    id: 'survey-system',
    title: 'Compliant Customer Satisfaction Survey System',
    tagline: 'Enterprise Survey Platform with Dynamic Schemas, Real-Time Detractor Alerts, and PII Log Scrubbing',
    summary:
      'A production-ready monolithic Laravel 12 / Inertia.js 2 / React 19 application delivering dynamic survey creation, synchronous detractor notifications (<3 rating), and queued background reporting.',
    tags: ['Laravel 12', 'React 19', 'Inertia.js 2', 'PostgreSQL', 'Filament 4', 'PII Scrubbing', 'PestPHP'],
    imageUrl: '/assets/projects/survey.webp',
    links: {
      demo: 'https://valenzuela-satisfaction-survey-main-plae88.laravel.cloud/',
      github: 'https://github.com/PSergio984/valenzuela-satisfaction-survey',
    },
    highlights: [
      { label: 'Privacy & Security', value: 'Automated PII Log Scrubber (RA 10173)' },
      { label: 'Incident Response', value: 'Real-Time Detractor Alerts (<3 Stars)' },
      { label: 'Modern Monolith', value: 'Laravel 12 + Inertia 2 + Filament 4' },
    ],
    metrics: [
      { label: 'Automated Tests', value: '146' },
      { label: 'Test Assertions', value: '5,856' },
      { label: 'Passing Test Rate', value: '94%' },
      { label: 'Architecture', value: 'Layered MVC' },
    ],
    problem: [
      'Organizations require data-compliant survey collection (RA 10173), immediate intervention on customer dissatisfaction, and automated reporting without leaking PII.',
    ],
    contribution: [
      'Sole Developer. Implemented complete monolithic architecture: Laravel 12 backend, Inertia.js bridge, React 19 frontend, Filament 4 admin panel, detractor alerts, and security controls.',
    ],
    solution: [
      'Engineered an enterprise survey platform with dynamic question schemas, real-time detractor alerts (<3 rating on 5-point scale), automated PII log scrubbing, and queued multi-sheet Excel/PDF export generation.',
    ],
    architecture: {
      summary:
        'Monolithic Layered MVC architecture connecting Laravel 12 to a React 19 SPA via Inertia.js 2 with Filament 4 administrative resources.',
      stack: [
        { layer: 'Backend & Routing', tech: 'Laravel 12 / PHP 8.2+', role: 'Routing, validation, queue management, Eloquent models' },
        { layer: 'Frontend UI', tech: 'React 19.2 + Inertia.js 2', role: 'SPA client rendering without separate REST boilerplate' },
        { layer: 'Admin Panel', tech: 'Filament 4 + Shield', role: 'Role-based survey builder, analytics widgets, manager data isolation' },
        { layer: 'Security Layer', tech: 'PiiScrubberProcessor', role: 'Recursive redaction of PII from logs and secure private file delivery' },
      ],
    },
    decisions: [
      {
        decision: 'Inertia.js Monolith over Separate React/API Backend',
        alternative: 'Decoupled React SPA + REST API',
        rationale: 'Retained Laravel’s powerful server-side validation, routing, and Fortify 2FA while delivering a reactive SPA frontend.',
      },
      {
        decision: 'Custom PII Log Scrubber',
        alternative: 'Standard Monolog output',
        rationale: 'Automatically replaces emails, names, IPs, and 2FA secrets with [REDACTED] to guarantee compliance with RA 10173.',
      },
    ],
    challenges: [
      'Managing dynamic question types with mixed scalar and array answer structures in PostgreSQL.',
      'Enforcing manager-based data isolation across admin routes via global scopes.',
    ],
    results: [
      '146 automated tests with 5,856 assertions (137 passing, 6 known in-memory manager-scoping tests documented with integrity).',
      'Queued multi-sheet Excel and PDF report exports delivered via secure private storage.',
    ],
    lessons: [
      'Testing Eloquent global scopes that depend on HTTP admin route context requires synthetic request binding in Pest/PHPUnit.',
    ],
  },
];
