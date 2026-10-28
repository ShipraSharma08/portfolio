import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Mail,
  Send,
  Check,
  Copy,
  Lock,
  Phone,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { AccentColor } from '../../types';
import { soundFX } from '../../utils/audio';

interface ContactSectionProps {
  accentColor: AccentColor;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ accentColor }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitPhase, setSubmitPhase] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.socials.email);
    setCopiedEmail(true);
    soundFX.blip(950);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    soundFX.blip(800);
    setIsSubmitting(true);
    setSubmitPhase('Encrypting payload via AES-256-GCM...');

    setTimeout(() => {
      setSubmitPhase('Verifying SHA-256 HMAC digest...');
    }, 600);

    setTimeout(() => {
      setSubmitPhase('Routing packet across secure gateway...');
    }, 1200);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      soundFX.success();

      // Confetti burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10B981', '#06B6D4', '#8B5CF6'],
      });

      // Reset fields
      setName('');
      setEmail('');
      setMessage('');
    }, 1800);
  };

  const getButtonBg = () => {
    switch (accentColor) {
      case 'cyan':
        return 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-cyan-500/20';
      case 'violet':
        return 'bg-violet-500 hover:bg-violet-400 text-white shadow-violet-500/20';
      case 'emerald':
      default:
        return 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/20';
    }
  };

  return (
    <section id="contact" className="relative py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-emerald-400 mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>ESTABLISH SECURE LINK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Get In Touch
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Interested in collaborating on cybersecurity, backend engineering, or packet analysis platforms? Send an encrypted dispatch or connect directly.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto">
          {/* Direct channels sidebar (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-cyber-card/80 border border-white/10 backdrop-blur-md">
              <h3 className="text-base font-bold font-mono text-white mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Direct Channels
              </h3>

              <div className="space-y-4 font-mono text-xs">
                {/* Email Box */}
                <div className="p-3.5 rounded-xl bg-cyber-bg/70 border border-white/5 flex flex-col space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <Mail className="w-3.5 h-3.5 text-emerald-400" /> Email Dispatch
                    </span>
                    <button
                      onClick={handleCopyEmail}
                      className="hover:text-white transition-colors flex items-center gap-1 text-[11px]"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <a
                    href={`mailto:${PERSONAL_INFO.socials.email}`}
                    className="text-white hover:text-emerald-300 font-bold break-all"
                  >
                    {PERSONAL_INFO.socials.email}
                  </a>
                </div>

                {/* Phone Box */}
                <div className="p-3.5 rounded-xl bg-cyber-bg/70 border border-white/5 flex flex-col space-y-2">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Phone className="w-3.5 h-3.5 text-cyan-400" /> Voice &amp; WhatsApp
                  </span>
                  <a
                    href={`tel:${PERSONAL_INFO.socials.phone}`}
                    className="text-white hover:text-cyan-300 font-bold"
                  >
                    {PERSONAL_INFO.socials.phone}
                  </a>
                </div>

                {/* Location */}
                <div className="p-3.5 rounded-xl bg-cyber-bg/70 border border-white/5 flex flex-col space-y-2">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-violet-400" /> Station
                  </span>
                  <span className="text-slate-200">
                    {PERSONAL_INFO.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Security Guarantee */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 font-mono text-[11px] text-slate-400 flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>
                All inquiries are treated with confidentiality. Open to full-time engineering roles, security research, and hackathon collaborations.
              </span>
            </div>
          </div>

          {/* Contact Message Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-cyber-card/80 border border-white/10 backdrop-blur-md shadow-xl">
              <h3 className="text-base font-bold font-mono text-white mb-6 flex items-center justify-between">
                <span>Direct Message Payload</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  TLS_AES_256_GCM
                </span>
              </h3>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-4 animate-fadeIn">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold font-mono text-white">
                    Transmission Dispatched Successfully
                  </h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto font-sans">
                    Thank you! Your message packet has been transmitted to Shipra Sharma. You will receive a response shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 transition-colors"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                  {/* Name field */}
                  <div>
                    <label className="block text-slate-300 mb-1.5 font-medium">
                      Sender Name / Alias *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => {
                        soundFX.keyclick();
                        setName(e.target.value);
                      }}
                      placeholder="e.g. Alex Mercer"
                      className="w-full bg-[#121420] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-sm font-sans"
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label className="block text-slate-300 mb-1.5 font-medium">
                      Return Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        soundFX.keyclick();
                        setEmail(e.target.value);
                      }}
                      placeholder="alex@organization.com"
                      className="w-full bg-[#121420] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-sm font-sans"
                    />
                  </div>

                  {/* Message field */}
                  <div>
                    <label className="block text-slate-300 mb-1.5 font-medium">
                      Message Body / Security Scope *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => {
                        soundFX.keyclick();
                        setMessage(e.target.value);
                      }}
                      placeholder="Detail your inquiry, project scope, or opportunity..."
                      className="w-full bg-[#121420] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-sm font-sans resize-none"
                    />
                  </div>

                  {/* Submitting phase display */}
                  {isSubmitting && (
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                      <div className="w-3 h-3 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                      <span>{submitPhase}</span>
                    </div>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3.5 rounded-xl font-mono text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${getButtonBg()} disabled:opacity-50`}
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Transmitting Packet...' : 'Transmit Encrypted Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
