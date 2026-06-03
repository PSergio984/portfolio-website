import { useFadeIn } from "../hooks/useFadeIn";

// GitHub SVG icon (brand icon not in lucide-react)
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const projects = [
  {
    id: "agos",
    title: "Agos",
    description:
      "An integrated AI-guided overflow surveillance capstone system designed for Barangay Maysan, Valenzuela City. Fuses camera feeds (YOLOv8 blockage detection) and ultrasonic waterway depth sensor telemetry via a Raspberry Pi Zero 2W to automate tiered, real-time SMS emergency dispatches.",
    tags: ["Fastapi", "React", "PostgreSQL", "Raspberry Pi"],
    sourceUrl: "https://github.com/PSergio984/agos-iot-flood-monitoring",
    detailsUrl: "https://agos-app.vercel.app/",
    imageUrl: "/assets/projects/agos.png",
  },
  {
    id: "task-buddy",
    title: "Task-Buddy",
    description:
      "A modern, high-performance task management application featuring a React 19 frontend and a FastAPI backend. It features dynamic task status updating, priority-based sorting, custom category tagging (Work, School, Personal), and real-time dashboard analytics tracking.",
    tags: ["React 19", "FastAPI", "Tailwind CSS", "TypeScript"],
    sourceUrl: "https://github.com/PSergio984/task-buddy-frontend",
    detailsUrl: "https://task-buddy-frontend.vercel.app/",
    imageUrl: "/assets/projects/taskbuddy.png",
  },
  {
    id: "ceit-library",
    title: "PLV CEIT Library",
    description:
      "A production-ready, PWA-optimized Laravel/Livewire library management system for Pamantasan ng Lungsod ng Valenzuela. It delivers secure role-based access, QR code-based asset borrowing, and real-time notifications.",
    tags: ["Laravel", "Livewire", "Tailwind CSS", "Alpine.js"],
    sourceUrl: "https://github.com/PSergio984/CEIT-Library",
    detailsUrl: "https://ceit-library-main-cru0ty.laravel.cloud/",
    imageUrl: "/assets/projects/ceit-lib.png",
  },
  {
    id: "survey-system",
    title: "Survey System",
    description:
      "A production-ready Laravel/Inertia satisfaction survey system for the Pamantasan ng Lungsod ng Valenzuela that delivers dynamic survey building, real-time detractor alerts, and queued background reporting.",
    tags: ["Laravel", "React", "Inertia", "PostgreSQL"],
    sourceUrl: "https://github.com/PSergio984/valenzuela-satisfaction-survey/",
    detailsUrl:
      "https://valenzuela-satisfaction-survey-main-plae88.laravel.cloud/",
    imageUrl: "/assets/projects/survey.png",
  },
  // {
  //   id: "datus",
  //   title: "Datus-Ctf-Writeups",
  //   description:
  //     "Write-ups for  CTF competition breakdowns such as HacktheBox,PicoCTF, and more. These write-ups cover a wide range of topics, including web exploitation, reverse engineering, cryptography, and binary exploitation.",
  //   tags: ["Burp Suite", "Kali Linux", "CTF", "Wireshark"],
  //   sourceUrl: "https://github.com/PSergio984/datus-ctf-writeups",
  //   detailsUrl: "https://datus-ctf-writeups.vercel.app/",
  //   imageUrl: undefined,
  // },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const { ref, fadeClass } = useFadeIn();

  return (
    <article
      ref={ref}
      className={`group flex flex-col md:flex-row gap-8 items-start border-b border-[var(--border)] pb-10 last:border-0 last:pb-0 ${
        index % 2 !== 0 ? "md:flex-row-reverse" : ""
      } ${fadeClass}`}
    >
      {/* Image Container — clickable */}
      <a
        href={project.detailsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${project.title} live`}
        className="w-full md:w-1/2 aspect-[16/9] bg-gradient-to-br from-[var(--border)] to-[var(--bg)] rounded-2xl flex items-center justify-center text-[var(--text)] border border-[var(--border)] relative overflow-hidden group-hover:border-[var(--accent-border)] transition-colors backdrop-blur-sm bg-white/5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
      >
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={`${project.title} screenshot`}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center h-full w-full bg-gradient-to-tr from-[var(--accent-bg)] to-transparent select-none">
            <span className="text-[var(--accent)] font-mono text-xs mb-2 tracking-widest">
              [ SECURITY LAB ]
            </span>
            <span className="text-[var(--text-h)] font-bold text-lg mb-1">
              {project.title}
            </span>
            <span className="opacity-40 font-mono text-[10px]">
              No image preview available
            </span>
          </div>
        )}
        {/* Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity">
          <div className="w-full h-[2px] bg-[var(--accent)] animate-scanline shadow-[0_0_15px_var(--accent)]" />
        </div>
      </a>

      {/* Content */}
      <div className="w-full md:w-1/2 flex flex-col">
        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs text-[var(--text)] font-medium">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-2xl font-bold text-[var(--text-h)] mb-3 group-hover:text-[var(--accent)] transition-colors">
          {project.title}
        </h3>

        <p className="text-sm text-[var(--text)] leading-relaxed mb-6">
          {project.description}
        </p>

        <div className="mt-auto flex items-center gap-6">
          <a
            href={project.detailsUrl}
            className="text-sm font-bold text-[var(--accent)] hover:underline inline-flex items-center gap-1 transition-all"
          >
            Live Demo <span aria-hidden="true">&gt;</span>
          </a>
          <a
            href={project.sourceUrl}
            className="text-sm font-medium text-[var(--text)] hover:text-[var(--text-h)] inline-flex items-center gap-2 transition-colors"
          >
            <GitHubIcon className="w-4 h-4" />
            Source
          </a>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const { ref, fadeClass } = useFadeIn();

  return (
    <section
      id="projects"
      aria-label="Featured Projects"
      className="py-12 overflow-hidden"
    >
      <div ref={ref} className={fadeClass}>
        <h2 className="text-2xl font-bold text-[var(--text-h)] mb-8">
          Featured Projects
        </h2>
      </div>
      <div className="flex flex-col gap-10">
        {projects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx} />
        ))}
      </div>
    </section>
  );
}
