import React from 'react';
import {
  X,
  Github,
  CheckCircle,
  Terminal,
  Activity,
  Layers,
  Cpu,
  ShieldAlert,
} from 'lucide-react';
import { Project } from '../../types';
import { soundFX } from '../../utils/audio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#0E0F17] border border-emerald-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#141622] border-b border-white/10">
          <div className="flex items-center space-x-3">
            <span className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <ShieldAlert className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-mono text-white">{project.title}</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                  {project.category}
                </span>
              </div>
              <p className="text-xs text-slate-400">{project.subtitle}</p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFX.blip(600);
              onClose();
            }}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Executive Overview */}
          <div>
            <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" /> Project Synopsis &amp; Threat Objective
            </h4>
            <p className="text-slate-300 leading-relaxed font-sans">{project.description}</p>
          </div>

          {/* Key Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {project.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-cyber-card border border-white/5 text-center font-mono"
                >
                  <div className="text-lg font-bold text-white">{m.value}</div>
                  <div className="text-[10px] text-emerald-400 uppercase tracking-wider">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Architectural Innovations */}
          <div>
            <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> Architectural Engineering &amp; Data Pipeline
            </h4>
            <ul className="space-y-2">
              {project.architectureDetails.map((detail, idx) => (
                <li
                  key={idx}
                  className="flex items-start space-x-2.5 p-2.5 rounded-lg bg-cyber-bg/60 border border-white/5 text-slate-300 text-xs font-sans leading-relaxed"
                >
                  <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Execution / Terminal Simulation Preview */}
          <div>
            <h4 className="text-xs font-mono font-bold text-violet-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" /> CLI Invocation Spec
            </h4>
            <div className="p-3 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-emerald-400 flex items-center justify-between">
              <code>$ {project.terminalCommand}</code>
              <span className="text-[10px] text-slate-500 font-mono">POSIX / Py3</span>
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div>
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" /> Technologies &amp; Protocols
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="px-6 py-4 bg-[#141622] border-t border-white/10 flex items-center justify-between">
          <div className="text-xs font-mono text-slate-500">
            SHA256: 3f8a4... verified
          </div>
          <div className="flex items-center space-x-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundFX.blip(850)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-mono transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}
            <button
              onClick={() => {
                soundFX.blip(750);
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-emerald-500 text-black font-semibold text-xs font-mono hover:bg-emerald-400 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
