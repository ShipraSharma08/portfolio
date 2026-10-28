import React from 'react';
import {
  ShieldCheck,
  Github,
  Linkedin,
  Mail,
  ArrowUp,
} from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { soundFX } from '../../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundFX.blip(900);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#060609] border-t border-white/10 pt-12 pb-8 text-xs font-mono text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          {/* Left: Identity & Live Ping */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="font-bold text-white tracking-wider">
                {PERSONAL_INFO.name.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-bold">ALL SYSTEMS OPERATIONAL</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFX.blip(850)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              title="GitHub"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFX.blip(850)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-cyan-400 transition-colors"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.socials.email}`}
              onClick={() => soundFX.blip(850)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-emerald-400 transition-colors"
              title="Email"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors flex items-center gap-1"
              title="Back to Top"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Credits & Telemetry Stamp */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 text-center sm:text-left">
          <div>
            &copy; {new Date().getFullYear()} Shipra Sharma. Government Engineering College, Bilaspur.
          </div>

          <div className="flex items-center gap-3">
            <span>SEC_HASH: a4f9e... verified</span>
            <span>•</span>
            <span>Three.js WebGL &amp; React 18</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
