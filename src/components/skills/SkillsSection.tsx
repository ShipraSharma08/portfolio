import React, { useState } from 'react';
import {
  Code2,
  ShieldAlert,
  Network,
  Server,
  Cpu,
  Layers,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';
import { AccentColor } from '../../types';
import { soundFX } from '../../utils/audio';

interface SkillsSectionProps {
  accentColor: AccentColor;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ accentColor }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSkillHover, setActiveSkillHover] = useState<string | null>(null);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Languages':
        return <Code2 className="w-5 h-5 text-emerald-400" />;
      case 'Cybersecurity':
        return <ShieldAlert className="w-5 h-5 text-red-400" />;
      case 'Networking':
        return <Network className="w-5 h-5 text-cyan-400" />;
      case 'Backend & DevOps':
        return <Server className="w-5 h-5 text-violet-400" />;
      case 'Cloud & Tools':
        return <Cpu className="w-5 h-5 text-amber-400" />;
      default:
        return <Layers className="w-5 h-5 text-emerald-400" />;
    }
  };

  const getAccentGlow = () => {
    switch (accentColor) {
      case 'cyan':
        return 'group-hover:border-cyan-500/50 group-hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]';
      case 'violet':
        return 'group-hover:border-violet-500/50 group-hover:shadow-[0_0_25px_rgba(139,92,246,0.15)]';
      case 'emerald':
      default:
        return 'group-hover:border-emerald-500/50 group-hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]';
    }
  };

  const getProgressBarColor = (cat: string) => {
    switch (cat) {
      case 'Languages':
        return 'bg-gradient-to-r from-emerald-500 to-teal-400';
      case 'Cybersecurity':
        return 'bg-gradient-to-r from-red-500 via-rose-400 to-orange-400';
      case 'Networking':
        return 'bg-gradient-to-r from-cyan-500 to-blue-400';
      case 'Backend & DevOps':
        return 'bg-gradient-to-r from-violet-500 to-purple-400';
      case 'Cloud & Tools':
        return 'bg-gradient-to-r from-amber-500 to-yellow-400';
      default:
        return 'bg-gradient-to-r from-emerald-500 to-cyan-400';
    }
  };

  const categoriesList = ['All', ...SKILL_CATEGORIES.map((c) => c.category)];

  const filteredCategories =
    selectedCategory === 'All'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.category === selectedCategory);

  return (
    <section id="skills" className="relative py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-emerald-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Skills &amp; Architecture Matrix
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Engineered through rigorous hands-on penetration testing, low-latency socket programming, and high-concurrency microservice design.
          </p>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundFX.blip(850);
                  setSelectedCategory(cat);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 scale-105'
                    : 'bg-cyber-elevated/70 text-slate-300 border border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.category}
              className={`group rounded-2xl bg-cyber-card/70 border border-white/10 p-6 backdrop-blur-md transition-all duration-300 ${getAccentGlow()} flex flex-col justify-between`}
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                      {getCategoryIcon(category.category)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white font-mono">
                        {category.category}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {category.skills.length} core technologies
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                  {category.description}
                </p>

                {/* Skills List with Proficiency Meters */}
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      onMouseEnter={() => {
                        soundFX.keyclick();
                        setActiveSkillHover(skill.name);
                      }}
                      onMouseLeave={() => setActiveSkillHover(null)}
                      className="group/skill"
                    >
                      <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                        <span className="text-slate-200 font-medium group-hover/skill:text-emerald-300 transition-colors flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 opacity-60 group-hover/skill:opacity-100" />
                          {skill.name}
                        </span>
                        <div className="flex items-center space-x-2">
                          {skill.tag && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/5 text-slate-400 border border-white/10">
                              {skill.tag}
                            </span>
                          )}
                          <span className="text-slate-400 font-bold">{skill.level}%</span>
                        </div>
                      </div>

                      {/* Progress Track */}
                      <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${getProgressBarColor(
                            category.category
                          )}`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>

                      {/* Detail hint */}
                      {skill.details && (
                        <p
                          className={`text-[11px] text-slate-400 mt-1 transition-all font-mono ${
                            activeSkillHover === skill.name ? 'opacity-100 text-slate-300' : 'opacity-70'
                          }`}
                        >
                          {skill.details}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Pill */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>AUDIT STATUS: VERIFIED</span>
                <span className="text-emerald-400 font-semibold">100% SECURE</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

