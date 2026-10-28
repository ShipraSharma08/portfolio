import React, { useState, useEffect } from 'react';
import {
  Terminal as TerminalIcon,
  Shield,
  Volume2,
  VolumeX,
  Menu,
  X,
  FileText,
  Activity,
} from 'lucide-react';
import { AccentColor } from '../../types';
import { soundFX } from '../../utils/audio';

interface NavbarProps {
  accentColor: AccentColor;
  onSelectAccent: (color: AccentColor) => void;
  onToggleTerminal: () => void;
  isTerminalOpen: boolean;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  accentColor,
  onSelectAccent,
  onToggleTerminal,
  isTerminalOpen,
  onOpenResume,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [latency, setLatency] = useState(14);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Subtle simulated network latency fluctuation
    const interval = setInterval(() => {
      setLatency(12 + Math.floor(Math.random() * 8));
    }, 4000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const toggleSound = () => {
    const muted = soundFX.toggleMute();
    setIsMuted(muted);
    if (!muted) soundFX.blip(880);
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Live Packet Analyzer', href: '#packet-visualizer' },
    { name: 'Crypto Tool', href: '#crypto-playground' },
    { name: 'Honors', href: '#honors' },
    { name: 'Contact', href: '#contact' },
  ];

  const accentColorsList: { name: AccentColor; label: string; bgClass: string; ringClass: string }[] = [
    { name: 'emerald', label: 'Emerald', bgClass: 'bg-emerald-500', ringClass: 'ring-emerald-400' },
    { name: 'cyan', label: 'Cyan', bgClass: 'bg-cyan-500', ringClass: 'ring-cyan-400' },
    { name: 'violet', label: 'Violet', bgClass: 'bg-violet-500', ringClass: 'ring-violet-400' },
  ];

  const handleNavClick = () => {
    soundFX.blip(750);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#08080C]/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/40 py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Status HUD */}
          <div className="flex items-center space-x-3">
            <a
              href="#"
              onClick={() => soundFX.blip(600)}
              className="group flex items-center space-x-2.5"
            >
              <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-cyber-elevated border border-white/10 group-hover:border-emerald-500/50 transition-colors">
                <Shield className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-sm font-bold tracking-wider text-slate-100 flex items-center gap-1.5">
                  SHIPRA.SHARMA
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                    SEC_OPS
                  </span>
                </span>
                <span className="text-[10px] font-mono text-slate-400 flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <Activity className="w-2.5 h-2.5 text-emerald-400 inline" />
                    <span>{latency}ms</span>
                  </span>
                  <span>•</span>
                  <span>GEC Bilaspur</span>
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1 font-mono text-xs text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleNavClick}
                className="px-2.5 py-1.5 rounded-md hover:text-white hover:bg-white/5 transition-all text-slate-300 hover:border-b-2 hover:border-emerald-400"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Controls: Accent picker, Audio, Terminal Toggle, Resume */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Color Accent Toggles */}
            <div className="hidden sm:flex items-center space-x-1.5 bg-white/5 p-1 rounded-full border border-white/10">
              {accentColorsList.map((c) => (
                <button
                  key={c.name}
                  onClick={() => {
                    soundFX.blip(900);
                    onSelectAccent(c.name);
                  }}
                  title={`Switch to ${c.label} Cyber Accent`}
                  className={`w-4 h-4 rounded-full ${c.bgClass} transition-transform ${
                    accentColor === c.name ? `scale-125 ring-2 ${c.ringClass} ring-offset-1 ring-offset-black` : 'opacity-60 hover:opacity-100'
                  }`}
                  aria-label={c.label}
                />
              ))}
            </div>

            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              title={isMuted ? 'Unmute Audio FX' : 'Mute Audio FX'}
              className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white transition-all"
              aria-label="Toggle Sound"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>

            {/* Resume Button */}
            <button
              onClick={() => {
                soundFX.blip(850);
                onOpenResume();
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-lg bg-white/5 border border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/10 text-slate-200 hover:text-emerald-300 transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>

            {/* Terminal Toggle Button */}
            <button
              onClick={() => {
                soundFX.blip(isTerminalOpen ? 600 : 920);
                onToggleTerminal();
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-all ${
                isTerminalOpen
                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/25'
                  : 'bg-cyber-elevated border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10'
              }`}
            >
              <TerminalIcon className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Terminal</span>
              <span className="text-[10px] px-1 rounded bg-black/30 font-bold">~</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => {
                soundFX.blip(700);
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="xl:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0F1017]/95 border-b border-white/10 backdrop-blur-xl px-4 pt-3 pb-6 animate-fadeIn">
          <div className="flex flex-col space-y-2 font-mono text-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleNavClick}
                className="px-3 py-2 rounded-lg text-slate-300 hover:text-emerald-400 hover:bg-white/5 transition-all"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => {
                  soundFX.blip(850);
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="inline-flex items-center gap-2 px-3 py-2 text-xs font-mono rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
              >
                <FileText className="w-4 h-4" />
                <span>View Resume</span>
              </button>

              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-400 font-mono">Accent:</span>
                {accentColorsList.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => {
                      soundFX.blip(900);
                      onSelectAccent(c.name);
                    }}
                    className={`w-5 h-5 rounded-full ${c.bgClass} ${
                      accentColor === c.name ? 'ring-2 ring-white' : 'opacity-60'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
