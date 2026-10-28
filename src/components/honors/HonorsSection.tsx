import React from 'react';
import {
  Trophy,
  Award,
  Medal,
  GraduationCap,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import { HONORS } from '../../data/portfolioData';
import { AccentColor } from '../../types';
import { soundFX } from '../../utils/audio';

interface HonorsSectionProps {
  accentColor: AccentColor;
}

export const HonorsSection: React.FC<HonorsSectionProps> = ({ accentColor }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'adobe-hackathon':
        return <Trophy className="w-6 h-6 text-amber-400" />;
      case 'iiit-esummit':
        return <Medal className="w-6 h-6 text-cyan-400" />;
      case 'business-ghar':
        return <Award className="w-6 h-6 text-emerald-400" />;
      case 'academic-excellence':
      default:
        return <GraduationCap className="w-6 h-6 text-violet-400" />;
    }
  };

  const getBorderHover = () => {
    switch (accentColor) {
      case 'cyan':
        return 'hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]';
      case 'violet':
        return 'hover:border-violet-500/50 hover:shadow-[0_0_25px_rgba(139,92,246,0.15)]';
      case 'emerald':
      default:
        return 'hover:border-emerald-500/50 hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]';
    }
  };

  return (
    <section id="honors" className="relative py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-amber-400 mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>COMPETITIVE ACCOMPLISHMENTS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Honors &amp; Hackathon Recognition
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Validated in intense competitive arenas against tens of thousands of engineering peers nationwide.
          </p>
        </div>

        {/* Honors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {HONORS.map((honor) => (
            <div
              key={honor.id}
              onMouseEnter={() => soundFX.keyclick()}
              className={`group relative rounded-2xl bg-cyber-card/75 border border-white/10 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 flex flex-col justify-between ${getBorderHover()} hover:-translate-y-1`}
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                    {getIcon(honor.id)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold">
                      {honor.highlightStats}
                    </span>
                    <span className="text-xs font-mono text-slate-500">{honor.year}</span>
                  </div>
                </div>

                {/* Title & Organization */}
                <h3 className="text-lg sm:text-xl font-bold font-mono text-white group-hover:text-emerald-300 transition-colors mb-1">
                  {honor.title}
                </h3>
                <div className="text-xs font-mono text-cyan-400 font-medium mb-3">
                  {honor.organization} • <span className="text-slate-300 font-semibold">{honor.badge}</span>
                </div>

                {/* Standing highlight */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-xs font-mono text-amber-300 font-medium mb-4">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Standing: {honor.standing}</span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  {honor.description}
                </p>
              </div>

              {/* Verified seal */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span className="flex items-center gap-1 text-emerald-400/80">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Official Hackathon Finalist
                </span>
                <span>AUTHENTICATED</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
