import { useState, useEffect } from 'react';
import { AccentColor } from './types';
import { ThreeCanvas } from './components/background/ThreeCanvas';
import { Navbar } from './components/navbar/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { AboutSection } from './components/about/AboutSection';
import { SkillsSection } from './components/skills/SkillsSection';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { PacketStreamVisualizer } from './components/interactive/PacketStreamVisualizer';
import { CipherPlayground } from './components/interactive/CipherPlayground';
import { HonorsSection } from './components/honors/HonorsSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/footer/Footer';
import { InteractiveTerminal } from './components/terminal/InteractiveTerminal';
import { ResumeModal } from './components/resume/ResumeModal';
import { soundFX } from './utils/audio';

export function App() {
  const [accentColor, setAccentColor] = useState<AccentColor>('emerald');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Global keyboard shortcut to open terminal (~ or `) and Esc to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        const activeTag = document.activeElement?.tagName.toLowerCase();
        if (activeTag !== 'input' && activeTag !== 'textarea') {
          e.preventDefault();
          setIsTerminalOpen((prev) => !prev);
          soundFX.blip(900);
        }
      } else if (e.key === 'Escape') {
        setIsTerminalOpen(false);
        setIsResumeOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#08080C] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200 overflow-x-hidden">
      {/* 3D Interactive Three.js Anti-gravity Background Canvas */}
      <ThreeCanvas accentColor={accentColor} />

      {/* Cyber Grid Background Overlay */}
      <div className="fixed inset-0 pointer-events-none cyber-grid-bg opacity-30 z-[1]" />

      {/* Sticky Top HUD Navigation Bar */}
      <Navbar
        accentColor={accentColor}
        onSelectAccent={setAccentColor}
        onToggleTerminal={() => setIsTerminalOpen((prev) => !prev)}
        isTerminalOpen={isTerminalOpen}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        {/* 1. Hero Section */}
        <HeroSection
          accentColor={accentColor}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* 2. About Me & Academic Foundations */}
        <AboutSection
          accentColor={accentColor}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* 3. Skills Matrix */}
        <SkillsSection accentColor={accentColor} />

        {/* 4. Featured Security Projects */}
        <ProjectsSection accentColor={accentColor} />

        {/* 5. Live Interactive Tools (Packet Analyzer & Cryptography Playground) */}
        <PacketStreamVisualizer />
        <CipherPlayground />

        {/* 6. Honors & Hackathon Achievements */}
        <HonorsSection accentColor={accentColor} />

        {/* 7. Contact Section */}
        <ContactSection accentColor={accentColor} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Hacker Terminal Modal / Dock */}
      <InteractiveTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Interactive Full Resume Viewer Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}

export default App;
