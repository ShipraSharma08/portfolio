import React from 'react';
import {
  GraduationCap,
  Shield,
  Binary,
  Cpu,
  Terminal,
  Activity,
  Layers,
  FileText,
} from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { AccentColor } from '../../types';
import { soundFX } from '../../utils/audio';

interface AboutSectionProps {
  accentColor: AccentColor;
  onOpenTerminal: () => void;
  onOpenResume: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  accentColor,
  onOpenTerminal,
  onOpenResume,
}) => {
  const passions = [
    {
      title: 'Network Forensics & Packet Dissection',
      desc: 'Decoding pcap captures, reconstructing TCP sessions, and identifying anomalous microsecond traffic bursts.',
      icon: <Binary className="w-5 h-5 text-cyan-400" />,
      tag: 'Scapy & Wireshark',
    },
    {
      title: 'Threat Modeling & MITRE ATT&CK',
      desc: 'Systematically cataloging adversary tactics, reconnaissance behaviors, and perimeter attack surfaces.',
      icon: <Shield className="w-5 h-5 text-emerald-400" />,
      tag: 'Adversary Mapping',
    },
    {
      title: 'AI Anomaly Detection Pipelines',
      desc: 'Employing unsupervised machine learning and Isolation Forests to isolate zero-day behavioral outliers.',
      icon: <Cpu className="w-5 h-5 text-violet-400" />,
      tag: 'Python ML / Heuristics',
    },
    {
      title: 'Resilient Backend Microservices',
      desc: 'Developing asynchronous REST APIs using FastAPI, PostgreSQL, and strict JWT role-based access controls.',
      icon: <Layers className="w-5 h-5 text-amber-400" />,
      tag: 'FastAPI / Async I/O',
    },
  ];

  return (
    <section id="about" className="relative py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-emerald-400 mb-3">
            <Activity className="w-3.5 h-3.5" />
            <span>SECURITY RESEARCH &amp; BACKGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            About Shipra Sharma
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Synthesizing low-level networking knowledge with modern backend systems to forge resilient cybersecurity architectures.
          </p>
        </div>

        {/* 2-Column Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Academic Credentials & Bio (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            {/* Bio Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-cyber-card/80 border border-white/10 backdrop-blur-md">
              <h3 className="text-lg font-bold font-mono text-white mb-4 flex items-center gap-2">
                <span className="text-emerald-400 font-mono">&gt;</span> Mission &amp; Engineering Focus
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-sans mb-4">
                {PERSONAL_INFO.summary}
              </p>
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-emerald-300/90 leading-relaxed">
                &ldquo;{PERSONAL_INFO.tagline}&rdquo;
              </div>
            </div>

            {/* Academic Credentials Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-cyber-card/80 border border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <GraduationCap className="w-6 h-6 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-mono text-white">
                      {PERSONAL_INFO.education.institution}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {PERSONAL_INFO.education.degree} ({PERSONAL_INFO.education.duration})
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold font-mono text-emerald-400">
                    SPI: {PERSONAL_INFO.education.spi}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase">
                    10.00 Scale
                  </div>
                </div>
              </div>

              {/* Coursework Tags */}
              <div className="mt-4 pt-4 border-t border-white/5">
                <span className="text-xs font-mono text-slate-400 block mb-2 font-medium">
                  Core Rigorous Coursework:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {PERSONAL_INFO.education.coursework.map((course) => (
                    <span
                      key={course}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-slate-300"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Hacker Terminal Teaser & Passions (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* Terminal Teaser Card */}
            <div className="p-6 rounded-2xl bg-[#090A11] border border-emerald-500/30 backdrop-blur-md shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-xs font-mono text-slate-400 font-bold ml-2">
                      whoami.sh
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    INTERACTIVE
                  </span>
                </div>

                <div className="font-mono text-xs space-y-2 text-slate-300">
                  <div className="text-slate-400">
                    <span className="text-emerald-400 font-bold">$</span> whoami
                  </div>
                  <div className="text-emerald-300 pl-3 border-l border-emerald-500/30">
                    Shipra Sharma &lt;shiprasharma34724@gmail.com&gt;
                  </div>

                  <div className="text-slate-400 pt-1">
                    <span className="text-emerald-400 font-bold">$</span> cat focus.conf
                  </div>
                  <div className="text-cyan-300 pl-3 border-l border-cyan-500/30 text-[11px]">
                    NET_INSPECTION=ENABLED
                    <br />
                    ML_ANOMALY_ENGINE=ACTIVE
                    <br />
                    SYSTEM_SPI=8.00
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center gap-2">
                <button
                  onClick={() => {
                    soundFX.blip(950);
                    onOpenTerminal();
                  }}
                  className="w-full py-2.5 rounded-xl font-mono text-xs font-bold text-black bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center justify-center gap-2"
                >
                  <Terminal className="w-4 h-4" />
                  <span>Launch Terminal</span>
                </button>
                <button
                  onClick={() => {
                    soundFX.blip(850);
                    onOpenResume();
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl font-mono text-xs font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-center gap-1.5 flex-shrink-0"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Resume</span>
                </button>
              </div>
            </div>

            {/* Core Passions Grid */}
            <div className="space-y-3">
              {passions.slice(0, 3).map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-cyber-card/60 border border-white/5 hover:border-white/15 transition-colors flex items-start space-x-3"
                >
                  <div className="p-2 rounded-lg bg-white/5 border border-white/5 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold font-mono text-white">
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-400">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
