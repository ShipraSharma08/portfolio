import React, { useState } from 'react';
import {
  ShieldAlert,
  ArrowUpRight,
  Github,
  Activity,
  ChevronRight,
} from 'lucide-react';
import { PROJECTS } from '../../data/portfolioData';
import { Project, AccentColor } from '../../types';
import { ProjectModal } from './ProjectModal';
import { soundFX } from '../../utils/audio';

interface ProjectsSectionProps {
  accentColor: AccentColor;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ accentColor }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const filterCategories = ['All', 'AI/ML', 'Network', 'Security', 'Forensics'];

  const filteredProjects =
    selectedFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedFilter);

  const getBorderGlow = () => {
    switch (accentColor) {
      case 'cyan':
        return 'hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]';
      case 'violet':
        return 'hover:border-violet-500/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]';
      case 'emerald':
      default:
        return 'hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]';
    }
  };

  return (
    <section id="projects" className="relative py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-emerald-400 mb-3">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>DEFENSIVE &amp; OFFENSIVE SYSTEMS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Featured Security Projects
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Production-ready security architectures, deep packet inspection daemons, and host integrity monitors.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundFX.blip(850);
                  setSelectedFilter(cat);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  selectedFilter === cat
                    ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                    : 'bg-cyber-elevated text-slate-300 border border-white/10 hover:border-white/25 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`group relative rounded-2xl bg-[#0F1017]/80 border border-white/10 p-6 backdrop-blur-md transition-all duration-300 flex flex-col justify-between ${getBorderGlow()} hover:-translate-y-1`}
            >
              <div>
                {/* Top badges */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400">
                    {project.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    ID: {project.id.toUpperCase()}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl font-bold font-mono text-white group-hover:text-emerald-300 transition-colors mb-1.5">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-slate-400 mb-4">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed mb-5 font-sans">
                  {project.description}
                </p>

                {/* Highlight Badges / Key Feature */}
                <div className="p-3 rounded-xl bg-cyber-bg/60 border border-white/5 mb-5 space-y-1.5">
                  <div className="text-[10px] font-mono font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                    <Activity className="w-3 h-3" /> Core Innovation
                  </div>
                  <div className="text-xs text-slate-300 leading-snug">
                    {project.highlights[0]}
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <button
                  onClick={() => {
                    soundFX.blip(900);
                    setActiveProjectModal(project);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-400 hover:text-emerald-300 group/btn transition-colors"
                >
                  <span>Architecture Deep Dive</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center space-x-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => soundFX.blip(850)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                      title="View GitHub Repository"
                      aria-label="GitHub Repo"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={() => {
                      soundFX.blip(900);
                      setActiveProjectModal(project);
                    }}
                    className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 transition-colors"
                    title="Modal View"
                    aria-label="View Details"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deep Dive Project Modal */}
      <ProjectModal
        project={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
      />
    </section>
  );
};
