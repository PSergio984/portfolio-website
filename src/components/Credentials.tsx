import { Award, Medal, ShieldCheck, Palette } from 'lucide-react'
import { useFadeIn } from '../hooks/useFadeIn'

const awardsData = [
  {
    id: 'itlympics-2024',
    title: 'ITlympics 2024',
    institution: 'Pamantasan ng Lungsod ng Valenzuela',
    date: 'April 2024',
    timestamp: '[APR 2024]',
    award: 'GOLD MEDAL',
    iconType: 'gold',
  },
  {
    id: 'itlympics-2025',
    title: 'ITlympics 2025',
    institution: 'Pamantasan ng Lungsod ng Valenzuela',
    date: 'April 2025',
    timestamp: '[APR 2025]',
    award: 'GOLD MEDAL',
    iconType: 'gold',
  },
  {
    id: '14th-it-skills',
    title: '14th IT Skills Olympics',
    institution: 'University of Makati',
    date: 'November 2025',
    timestamp: '[NOV 2025]',
    award: 'BRONZE MEDAL',
    iconType: 'bronze',
  },
  {
    id: '13th-it-skills-2',
    title: '13th IT Skills Olympics',
    institution: 'University of Makati',
    date: 'November 2024',
    timestamp: '[NOV 2024]',
    award: 'REPRESENTATIVE',
    iconType: 'rep',
  },
  {
    id: '13th-it-skills-1',
    title: '13th IT Skills Olympics',
    institution: 'Pamantasan ng Lungsod ng Valenzuela',
    date: 'November 2024',
    timestamp: '[NOV 2024]',
    award: 'REPRESENTATIVE',
    iconType: 'rep',
  },
]

const certificationsData = [
  {
    id: 'google-cybersecurity',
    title: 'Google Cybersecurity Professional',
    institution: 'Google (via Coursera)',
    date: '2026',
    timestamp: '[JAN 2026]',
    award: 'PROFESSIONAL CERTIFICATE',
    iconType: 'security',
  },
  {
    id: 'tesda-nc3',
    title: 'Visual Graphics Design NC III',
    institution: 'TESDA',
    date: '2022',
    timestamp: '[JAN 2022]',
    award: 'NATIONAL CERTIFICATE',
    iconType: 'design',
  },
]

export function Credentials() {
  const { ref, fadeClass } = useFadeIn()

  const renderCard = (cred: any) => (
    <article
      key={cred.id}
      className="group flex flex-col p-6 rounded-2xl bg-[var(--bg)] border border-[var(--border)] shadow-sm hover:shadow-md transition-all hover:border-[var(--accent-border)] relative overflow-hidden"
    >
      {/* Top right subtle medal icon background */}
      <div className="absolute -top-4 -right-4 opacity-10">
        <Award className="w-24 h-24 text-[var(--text)]" />
      </div>

      <div className="mb-4">
        <span className="inline-flex p-2 rounded-lg bg-[var(--code-bg)] mb-4">
          {cred.iconType === 'security' && <ShieldCheck className="w-5 h-5 text-green-500" />}
          {cred.iconType === 'design' && <Palette className="w-5 h-5 text-pink-500" />}
          {cred.iconType === 'gold' && <Medal className="w-5 h-5 text-yellow-500" />}
          {cred.iconType === 'bronze' && <Medal className="w-5 h-5 text-amber-600" />}
          {cred.iconType === 'rep' && <Award className="w-5 h-5 text-blue-500" />}
        </span>
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-semibold text-[var(--text-h)] leading-tight">
            {cred.title}
          </h3>
          <span className="font-mono text-[10px] text-[var(--accent)] opacity-70">
            {cred.timestamp}
          </span>
        </div>
        <p className="text-xs text-[var(--text)] mb-1">{cred.institution}</p>
        <p className="text-xs text-[var(--text)] opacity-70">{cred.date}</p>
      </div>

      <div className="mt-auto pt-4 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              cred.iconType === 'security'
                ? 'bg-green-500'
                : cred.iconType === 'design'
                  ? 'bg-pink-500'
                  : cred.iconType === 'gold'
                    ? 'bg-yellow-500'
                    : cred.iconType === 'bronze'
                      ? 'bg-amber-600'
                      : 'bg-blue-500'
            }`}
          />
          <span className="text-[10px] font-bold tracking-wider uppercase text-[var(--text-h)]">
            {cred.award}
          </span>
        </div>
        <button className="text-left text-xs font-bold text-[var(--accent)] tracking-wider uppercase hover:underline inline-flex items-center gap-1 group-hover:gap-2 transition-all">
          VIEW VERIFICATION <span aria-hidden="true">&gt;</span>
        </button>
      </div>
    </article>
  )

  return (
    <section id="credentials" className="py-12 space-y-16 overflow-hidden">
      <div ref={ref} className={fadeClass}>
        {/* Awards Section */}
        <div className="mb-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--text-h)] mb-2">Awards & Honors</h2>
            <p className="text-sm text-[var(--text)]">
              A record of competitive achievements and academic excellence.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {awardsData.map(renderCard)}
          </div>
        </div>

        {/* Certifications Section */}
        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--text-h)] mb-2">Professional Certifications</h2>
            <p className="text-sm text-[var(--text)]">
              Formal verification of specialized technical skills.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certificationsData.map(renderCard)}
          </div>
        </div>
      </div>
    </section>
  )
}
