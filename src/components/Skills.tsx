import {
  Code2,
  ShieldCheck,
  LayoutTemplate,
  Database,
  Cloud,
  Wrench,
} from "lucide-react";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiPhp,
  SiFastapi,
  SiLaravel,
  SiDotnet,
  SiJsonwebtokens,
  SiBurpsuite,
  SiWireshark,
  SiKalilinux,
  SiReact,
  SiTailwindcss,
  SiLivewire,
  SiAlpinedotjs,
  SiFigma,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiDocker,
  SiVercel,
  SiRailway,
  SiCloudflare,
  SiRender,
  SiGit,
  SiPostman,
  SiSwagger,
  SiSentry,
  SiVite,
  SiGithub,
  SiTrello,
  SiJira,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { useFadeIn } from "../hooks/useFadeIn";
import shadcnLogo from "../assets/shadcn.svg";

const skillCategories = [
  {
    label: "Languages",
    icon: <Code2 className="w-5 h-5 text-blue-500" />,
    skills: [
      { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
      { name: "TypeScript", icon: SiTypescript, color: "text-blue-500" },
      { name: "Python", icon: SiPython, color: "text-blue-400" },
      { name: "Java", icon: FaJava, color: "text-orange-500" },
      { name: "C#", icon: null, color: "text-blue-700" },
      { name: "PHP", icon: SiPhp, color: "text-indigo-400" },
    ],
  },
  {
    label: "Backend",
    icon: <Database className="w-5 h-5 text-emerald-500" />,
    skills: [
      { name: "FastAPI", icon: SiFastapi, color: "text-teal-500" },
      { name: "Laravel", icon: SiLaravel, color: "text-red-500" },
      { name: ".NET", icon: SiDotnet, color: "text-purple-600" },
      { name: "JWT", icon: SiJsonwebtokens, color: "text-yellow-500" },
    ],
  },
  {
    label: "Cybersecurity",
    icon: <ShieldCheck className="w-5 h-5 text-red-500" />,
    skills: [
      { name: "Burp Suite", icon: SiBurpsuite, color: "text-orange-600" },
      { name: "Wireshark", icon: SiWireshark, color: "text-blue-600" },
      { name: "Kali Linux", icon: SiKalilinux, color: "text-blue-400" },
    ],
  },
  {
    label: "Frontend & UI/UX",
    icon: <LayoutTemplate className="w-5 h-5 text-purple-500" />,
    skills: [
      { name: "React", icon: SiReact, color: "text-sky-500" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-sky-500" },
      {
        name: "shadcn/ui",
        icon: (props: any) => (
          <img {...props} src={shadcnLogo} alt="shadcn/ui" />
        ),
        color: "",
      },
      { name: "Livewire", icon: SiLivewire, color: "text-pink-400" },
      { name: "Alpine.js", icon: SiAlpinedotjs, color: "text-sky-500" },
      { name: "Figma", icon: SiFigma, color: "text-pink-500" },
    ],
  },
  {
    label: "Database",
    icon: <Database className="w-5 h-5 text-emerald-500" />,
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "text-indigo-600" },
      { name: "MySQL", icon: SiMysql, color: "text-orange-500" },
      { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
      { name: "SQL Server", icon: Database, color: "text-blue-600" },
    ],
  },
  {
    label: "DevOps & Cloud",
    icon: <Cloud className="w-5 h-5 text-cyan-500" />,
    skills: [
      { name: "Docker", icon: SiDocker, color: "text-blue-500" },
      { name: "Vercel", icon: SiVercel, color: "text-white" },
      { name: "Railway", icon: SiRailway, color: "text-purple-400" },
      { name: "Cloudflare", icon: SiCloudflare, color: "text-orange-400" },
      { name: "Render", icon: SiRender, color: "text-teal-400" },
      { name: "Laravel Cloud", icon: SiLaravel, color: "text-red-500" },
    ],
  },
  {
    label: "Tools",
    icon: <Wrench className="w-5 h-5 text-amber-500" />,
    skills: [
      { name: "Git", icon: SiGit, color: "text-orange-600" },
      { name: "GitHub", icon: SiGithub, color: "text-gray-800" },
      { name: "Postman", icon: SiPostman, color: "text-orange-500" },
      { name: "Swagger", icon: SiSwagger, color: "text-green-500" },
      { name: "Sentry", icon: SiSentry, color: "text-gray-800" },
      { name: "Vite", icon: SiVite, color: "text-purple-500" },
      { name: "Jira", icon: SiJira, color: "text-blue-500" },
      { name: "Trello", icon: SiTrello, color: "text-blue-500" },
    ],
  },
];

export function Skills() {
  const { ref, fadeClass } = useFadeIn();

  return (
    <section
      id="skills"
      aria-label="Skills & Technologies"
      className="py-8 overflow-hidden"
    >
      <div ref={ref} className={fadeClass}>
        <h2 className="text-2xl font-bold text-[var(--text-h)] mb-8">
          Skills & Technologies
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {skillCategories.map(({ label, icon, skills }) => (
            <div
              key={label}
              className="p-4 rounded-2xl bg-white dark:bg-[var(--bg)] border border-gray-300 dark:border-[var(--border)] shadow hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 rounded-lg bg-[var(--code-bg)]">
                  {icon}
                </span>
                <h3 className="text-lg font-semibold text-[var(--text-h)]">
                  {label}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-[var(--code-bg)] text-[var(--text-h)] border border-gray-500 dark:border-gray-400 hover:border-gray-700 dark:hover:border-gray-300 transition-colors cursor-default"
                  >
                    {skill.icon && (
                      <skill.icon className={`w-3.5 h-3.5 ${skill.color}`} />
                    )}
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
