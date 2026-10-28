import React from 'react';
import {
  X,
  Printer,
  Download,
  MapPin,
  FileText,
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES, HONORS } from '../../data/portfolioData';
import { soundFX } from '../../utils/audio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    soundFX.blip(900);
    window.print();
  };

  const handleDownloadJSON = () => {
    soundFX.blip(950);
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(
      JSON.stringify(
        {
          personal: PERSONAL_INFO,
          skills: SKILL_CATEGORIES,
          projects: PROJECTS,
          honors: HONORS,
        },
        null,
        2
      )
    );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'Shipra_Sharma_Resume.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#0E0F18] border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#141624] border-b border-white/10 print:hidden">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <span className="font-mono text-sm font-bold text-white">
              Shipra_Sharma_Resume.pdf (Live Preview)
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-mono transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-400" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={handleDownloadJSON}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-mono transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>JSON Export</span>
            </button>
            <button
              onClick={() => {
                soundFX.blip(600);
                onClose();
              }}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6 text-slate-200 bg-[#0A0B12] print:bg-white print:text-black font-sans text-xs sm:text-sm">
          {/* Header */}
          <div className="border-b border-white/10 pb-5 text-center sm:text-left flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white print:text-black">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-emerald-400 print:text-emerald-700 font-mono font-medium text-sm mt-0.5">
                {PERSONAL_INFO.title}
              </p>
              <p className="text-slate-400 print:text-slate-600 text-xs mt-1 flex items-center justify-center sm:justify-start gap-1">
                <MapPin className="w-3.5 h-3.5" /> {PERSONAL_INFO.location}
              </p>
            </div>

            <div className="font-mono text-xs text-slate-300 print:text-slate-700 space-y-1 text-center sm:text-right w-full sm:w-auto">
              <div>
                <a href={`mailto:${PERSONAL_INFO.socials.email}`} className="hover:underline text-emerald-400">
                  {PERSONAL_INFO.socials.email}
                </a>
              </div>
              <div>{PERSONAL_INFO.socials.phone}</div>
              <div className="text-slate-400">
                github.com/shiprasharma • linkedin.com/in/shipra-sharma-sec
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono font-bold text-emerald-400 print:text-emerald-800 uppercase tracking-wider mb-2 border-b border-white/10 pb-1">
              Education
            </h2>
            <div className="flex justify-between items-baseline">
              <div>
                <div className="font-bold text-white print:text-black">
                  {PERSONAL_INFO.education.institution}
                </div>
                <div className="text-slate-300 print:text-slate-700 text-xs">
                  {PERSONAL_INFO.education.degree} • <span className="font-semibold text-emerald-400">SPI: {PERSONAL_INFO.education.spi} / 10.00</span>
                </div>
              </div>
              <div className="font-mono text-xs text-slate-400 print:text-slate-600">
                {PERSONAL_INFO.education.duration}
              </div>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              <span className="font-medium text-slate-300">Relevant Coursework:</span>{' '}
              {PERSONAL_INFO.education.coursework.join(', ')}
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-mono font-bold text-cyan-400 print:text-cyan-800 uppercase tracking-wider mb-2 border-b border-white/10 pb-1">
              Technical Skills Matrix
            </h2>
            <div className="space-y-1.5 text-xs">
              {SKILL_CATEGORIES.map((c) => (
                <div key={c.category} className="flex flex-col sm:flex-row sm:items-baseline">
                  <span className="font-mono font-semibold text-white print:text-black w-40 flex-shrink-0">
                    {c.category}:
                  </span>
                  <span className="text-slate-300 print:text-slate-700">
                    {c.skills.map((s) => s.name).join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects */}
          <div>
            <h2 className="text-xs font-mono font-bold text-violet-400 print:text-violet-800 uppercase tracking-wider mb-3 border-b border-white/10 pb-1">
              Key Engineering Projects
            </h2>
            <div className="space-y-4">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-white print:text-black text-sm">
                      {proj.title} – <span className="text-xs font-normal text-slate-400">{proj.subtitle}</span>
                    </span>
                    <span className="font-mono text-[11px] text-emerald-400 print:text-emerald-700">
                      [{proj.techStack.slice(0, 4).join(', ')}]
                    </span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-slate-300 print:text-slate-700 space-y-1 pl-1">
                    {proj.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Honors & Awards */}
          <div>
            <h2 className="text-xs font-mono font-bold text-amber-400 print:text-amber-800 uppercase tracking-wider mb-2 border-b border-white/10 pb-1">
              Honors &amp; Hackathon Achievements
            </h2>
            <div className="space-y-2 text-xs">
              {HONORS.map((h) => (
                <div key={h.id} className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-white print:text-black">{h.title}:</span>{' '}
                    <span className="text-slate-300 print:text-slate-700">{h.standing} – {h.description}</span>
                  </div>
                  <span className="font-mono text-slate-400 text-[11px] ml-2 flex-shrink-0">
                    {h.year}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
