import './index.css';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Credentials } from './components/Credentials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { DigitalEricChat } from './components/DigitalEricChat';

function App() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col transition-colors duration-300">
      <CustomCursor />
      <Header />

      <main className="flex-grow max-w-6xl w-full mx-auto px-4 sm:px-6">
        <Hero />
        <div className="h-px bg-[var(--border)] w-full my-2" />
        <Projects />
        <div className="h-px bg-[var(--border)] w-full my-2" />
        <Experience />
        <div className="h-px bg-[var(--border)] w-full my-2" />
        <Skills />
        <div className="h-px bg-[var(--border)] w-full my-2" />
        <Credentials />
        <div className="h-px bg-[var(--border)] w-full my-2" />
        <Contact />
      </main>

      <Footer />
      <DigitalEricChat />
    </div>
  );
}

export default App;
