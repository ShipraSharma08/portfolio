import React, { useState } from 'react';
import {
  ShieldCheck,
  Terminal,
  ArrowRight,
  Mail,
  Phone,
  Github,
  Linkedin,
  MapPin,
  Copy,
  Check,
  Download,
  Lock,
  Binary,
  Cpu,
} from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { AccentColor } from '../../types';
import { soundFX } from '../../utils/audio';

interface HeroSectionProps {
  accentColor: AccentColor;
  onOpenTerminal: () => void;
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  accentColor,
  onOpenTerminal,
  onOpenResume,
}) => {
  const [copiedType, setCopiedType] = useState<'email' | 'phone' | null>(null);

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    soundFX.blip(1040);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const getAccentGradient = () => {
    switch (accentColor) {
      case 'cyan':
        return 'from-cyan-400 via-teal-300 to-blue-500';
      case 'violet':
        return 'from-violet-400 via-purple-300 to-indigo-500';
      case 'emerald':
      default:
        return 'from-emerald-400 via-teal-300 to-cyan-400';
    }
  };

  const getBadgeBorder = () => {
    switch (accentColor) {
      case 'cyan':
        return 'border-cyan-500/30 text-cyan-300 bg-cyan-500/10';
      case 'violet':
        return 'border-violet-500/30 text-violet-300 bg-violet-500/10';
      case 'emerald':
      default:
        return 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10';
    }
  };

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Decorative ambient radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Cyber Status Badge */}
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono font-medium mb-6 ${getBadgeBorder()} backdrop-blur-md shadow-sm`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="tracking-wide">SECURITY PROTOCOL ACTIVE</span>
            <span className="opacity-40">•</span>
            <span className="text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-400" />
              {PERSONAL_INFO.location}
            </span>
          </div>

          {/* Name Header */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4">
            Hello, I&apos;m{' '}
            <span className={`bg-gradient-to-r ${getAccentGradient()} bg-clip-text text-transparent drop-shadow-sm`}>
              {PERSONAL_INFO.name}
            </span>
          </h1>

          {/* Role / Subtitle */}
          <div className="inline-flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-mono text-slate-300 font-medium mb-6">
            <span className="text-emerald-400">&gt;</span>
            <span>{PERSONAL_INFO.title}</span>
            <span className="animate-pulse text-emerald-400">_</span>
          </div>

          {/* Mission Tagline */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed mb-8">
            &ldquo;{PERSONAL_INFO.tagline}&rdquo;
          </p>

          {/* Quick Technical Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-2xl font-mono text-xs">
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 flex items-center gap-1.5">
              <Binary className="w-3.5 h-3.5 text-cyan-400" /> Packet Forensics
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" /> Threat Modeling
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-violet-400" /> AI Anomaly Detection
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> B.Tech IT @ GEC Bilaspur (SPI 8.00)
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <a
              href="#projects"
              onClick={() => soundFX.blip(800)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-mono text-sm font-semibold text-black bg-emerald-400 hover:bg-emerald-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 hover:-translate-y-0.5 transition-all"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => {
                soundFX.blip(950);
                onOpenTerminal();
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-mono text-sm font-medium text-slate-200 bg-cyber-elevated/80 border border-white/10 hover:border-emerald-500/50 hover:bg-cyber-elevated hover:text-white hover:-translate-y-0.5 transition-all backdrop-blur-md"
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Launch Terminal</span>
            </button>

            <button
              onClick={() => {
                soundFX.blip(850);
                onOpenResume();
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-mono text-sm font-medium text-slate-200 bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 hover:text-white hover:-translate-y-0.5 transition-all"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>View Resume</span>
            </button>

            <a
              href="#contact"
              onClick={() => soundFX.blip(750)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-mono text-sm font-medium text-slate-300 hover:text-white bg-transparent border border-white/10 hover:border-white/20 transition-all"
            >
              <Mail className="w-4 h-4 text-slate-400" />
              <span>Get in Touch</span>
            </a>
          </div>

          {/* Direct Social Links & Contact Pill Bar */}
          <div className="w-full max-w-2xl bg-[#0F1017]/80 backdrop-blur-md rounded-2xl border border-white/10 p-4 shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              {/* Email Box */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-cyber-bg/70 border border-white/5 hover:border-emerald-500/30 transition-colors">
                <a
                  href={`mailto:${PERSONAL_INFO.socials.email}`}
                  className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 truncate"
                  title="Send Email"
                >
                  <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="truncate">{PERSONAL_INFO.socials.email}</span>
                </a>
                <button
                  onClick={() => copyToClipboard(PERSONAL_INFO.socials.email, 'email')}
                  className="p-1.5 rounded-md hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copiedType === 'email' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Phone Box */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-cyber-bg/70 border border-white/5 hover:border-cyan-500/30 transition-colors">
                <a
                  href={`tel:${PERSONAL_INFO.socials.phone}`}
                  className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 truncate"
                  title="Call Phone"
                >
                  <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>{PERSONAL_INFO.socials.phone}</span>
                </a>
                <button
                  onClick={() => copyToClipboard(PERSONAL_INFO.socials.phone, 'phone')}
                  className="p-1.5 rounded-md hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  title="Copy phone to clipboard"
                  aria-label="Copy phone"
                >
                  {copiedType === 'phone' ? (
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Quick External Links: GitHub & LinkedIn */}
            <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400 px-1">
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Available for Security & Backend Engineering Roles
              </span>
              <div className="flex items-center space-x-3">
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFX.blip(900)}
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4 text-slate-300" />
                  <span className="hidden sm:inline">GitHub</span>
                </a>
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFX.blip(900)}
                  className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-cyan-400" />
                  <span className="hidden sm:inline">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quantitative Impact Metric Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mt-12">
            {PERSONAL_INFO.stats.map((st, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-cyber-elevated/40 border border-white/5 backdrop-blur-sm text-center hover:border-emerald-500/20 transition-all"
              >
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white mb-0.5">
                  {st.value}
                </div>
                <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-0.5">
                  {st.label}
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  {st.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

