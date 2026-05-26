import './index.css'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Awards, Certifications, Seminars } from './components/Credentials'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { CustomCursor } from './components/CustomCursor'

function App() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col transition-colors duration-300">
      <CustomCursor />
      <Header />

      <main className="flex-grow max-w-6xl w-full mx-auto px-6">
        <Hero />
        <div className="h-px bg-[var(--border)] w-full my-4" />
        <Projects />
        <div className="h-px bg-[var(--border)] w-full my-4" />
        <Skills />
        <div className="h-px bg-[var(--border)] w-full my-4" />
        <Awards />
        <div className="h-px bg-[var(--border)] w-full my-4" />
        <Certifications />
        <div className="h-px bg-[var(--border)] w-full my-4" />
        <Seminars />
        <div className="h-px bg-[var(--border)] w-full my-4" />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
