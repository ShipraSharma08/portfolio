import React, { useState, useRef, useEffect } from 'react';
import {
  Terminal as TerminalIcon,
  Maximize2,
  Minimize2,
  X,
  Play,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES, HONORS } from '../../data/portfolioData';
import { TerminalEntry } from '../../types';
import { soundFX } from '../../utils/audio';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume?: () => void;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  isOpen,
  onClose,
  onOpenResume,
}) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const initialBanner: TerminalEntry[] = [
    {
      type: 'banner',
      content: `
   _____ __    _                    _____ __                               
  / ___// /_  (_)___  _________ _  / ___// /_  ____ __________ ___  ____ _
  \\__ \\/ __ \\/ / __ \\/ ___/ __ \`/  \\__ \\/ __ \\/ __ \`/ ___/ __ \`__ \\/ __ \`/
 ___/ / / / / / /_/ / /  / /_/ /  ___/ / / / / /_/ / /  / / / / / / /_/ / 
/____/_/ /_/_/ .___/_/   \\__,_/  /____/_/ /_/\\__,_/_/  /_/ /_/ /_/\\__,_/  
            /_/                                                           
>> SECURITY WORKSTATION [v4.2.0-RELEASE] • KERNEL 6.8.0-GENERIC
>> AUTHORIZED USER: shipra@security-box
>> TYPE "help" FOR AVAILABLE DIAGNOSTIC UTILITIES.
`,
    },
    {
      type: 'output',
      content: 'System initialized. Type "whoami" or "help" to begin telemetry query.',
    },
  ];

  const [entries, setEntries] = useState<TerminalEntry[]>(initialBanner);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, entries]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    soundFX.blip(820);

    // Save in history
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const newEntries: TerminalEntry[] = [
      ...entries,
      { type: 'input', content: trimmed, timestamp: new Date().toLocaleTimeString() },
    ];

    const args = trimmed.toLowerCase().split(' ');
    const cmd = args[0];

    switch (cmd) {
      case 'help':
        newEntries.push({
          type: 'output',
          content: `
AVAILABLE COMMANDS:
  whoami          Display identity, degree, SPI, and core focus
  about           Display detailed background and mission statement
  skills          List full security, networking & backend capabilities
  projects        Overview of featured cyber projects (SentinelX, FlowTrace, etc.)
  education       Academic credentials at GEC Bilaspur
  honors          Hackathon standings (Adobe Round 4, IIIT Naya Raipur, etc.)
  contact         Show email, phone, GitHub, and LinkedIn links
  nmap [target]   Run simulated SYN stealth port audit
  inspect packet  Simulate live packet inspection & TCP handshake trace
  resume          Launch the interactive resume viewer
  matrix          Initiate cyber stream sequence
  clear           Wipe the terminal display buffer
  help            Display this command matrix
`,
        });
        break;

      case 'whoami':
        newEntries.push({
          type: 'output',
          content: `
USER PROFILE:
  Name:        ${PERSONAL_INFO.name}
  Title:       ${PERSONAL_INFO.title}
  Affiliation: ${PERSONAL_INFO.education.institution}
  Degree:      ${PERSONAL_INFO.education.degree} (2024-2028)
  SPI Rating:  ${PERSONAL_INFO.education.spi} / 10.00
  Location:    ${PERSONAL_INFO.location}
  Focus:       ${PERSONAL_INFO.passions.join(' | ')}
`,
        });
        break;

      case 'about':
      case 'cat':
        newEntries.push({
          type: 'output',
          content: `
[MISSION STATEMENT]
"${PERSONAL_INFO.tagline}"

[BIO]
${PERSONAL_INFO.summary}

[KEY PASSIONS]
${PERSONAL_INFO.passions.map((p) => `  * ${p}`).join('\n')}
`,
        });
        break;

      case 'skills':
        newEntries.push({
          type: 'output',
          content: SKILL_CATEGORIES.map(
            (c) =>
              `\n[${c.category.toUpperCase()}]\n` +
              c.skills.map((s) => `  - ${s.name.padEnd(26)} [${s.level}%] (${s.tag || 'Standard'})`).join('\n')
          ).join('\n'),
        });
        break;

      case 'projects':
        newEntries.push({
          type: 'output',
          content: PROJECTS.map(
            (p) =>
              `\n* ${p.title} (${p.category})\n  Subtitle: ${p.subtitle}\n  Stack:    ${p.techStack.join(', ')}\n  Key Note: ${p.highlights[0]}`
          ).join('\n'),
        });
        break;

      case 'education':
        newEntries.push({
          type: 'output',
          content: `
INSTITUTION: ${PERSONAL_INFO.education.institution}
DEGREE:      ${PERSONAL_INFO.education.degree}
TENURE:      ${PERSONAL_INFO.education.duration}
ACADEMIC SPI: ${PERSONAL_INFO.education.spi} / 10.00
CORE COURSES:
${PERSONAL_INFO.education.coursework.map((c) => `  - ${c}`).join('\n')}
`,
        });
        break;

      case 'honors':
      case 'hackathons':
        newEntries.push({
          type: 'output',
          content: HONORS.map(
            (h) => `\n🏆 ${h.title} [${h.badge}]\n   Standing: ${h.standing}\n   Detail:   ${h.description}`
          ).join('\n'),
        });
        break;

      case 'contact':
        newEntries.push({
          type: 'output',
          content: `
DIRECT SECURE CHANNELS:
  Email:    ${PERSONAL_INFO.socials.email}
  Phone:    ${PERSONAL_INFO.socials.phone}
  GitHub:   ${PERSONAL_INFO.socials.github}
  LinkedIn: ${PERSONAL_INFO.socials.linkedin}
  Location: ${PERSONAL_INFO.location}
`,
        });
        break;

      case 'nmap':
        const target = args[1] || 'localhost';
        newEntries.push({
          type: 'output',
          content: `
Starting Nmap 7.94 ( https://nmap.org ) at ${new Date().toISOString()}
Nmap scan report for ${target} (127.0.0.1)
Host is up (0.00012s latency).
Not shown: 996 closed tcp ports (reset)
PORT     STATE SERVICE     VERSION
22/tcp   open  ssh         OpenSSH 9.6p1 Debian
80/tcp   open  http        FastAPI / Uvicorn Server
443/tcp  open  ssl/https   TLSv1.3 TLS_AES_256_GCM_SHA384
8000/tcp open  sentinelx   SentinelX AI Security Daemon v2.4

Service detection performed. 0 errors detected.
Integrity: VERIFIED (Risk Level: LOW).
`,
        });
        break;

      case 'inspect':
        newEntries.push({
          type: 'output',
          content: `
[PACKET INGESTION TRACE]
  0.000000 IP 192.168.1.105:54228 > 10.0.0.1:443  TCP 74 [SYN] Seq=0 Win=64240 Len=0 MSS=1460 SACK_PERM=1
  0.000312 IP 10.0.0.1:443 > 192.168.1.105:54228  TCP 74 [SYN, ACK] Seq=0 Ack=1 Win=65535 Len=0
  0.000450 IP 192.168.1.105:54228 > 10.0.0.1:443  TCP 66 [ACK] Seq=1 Ack=1 Win=64240 Len=0
  0.001220 IP 192.168.1.105:54228 > 10.0.0.1:443  TLSv1.3 517 Client Hello (SNI: api.sentinelx.sec)
  0.001840 IP 10.0.0.1:443 > 192.168.1.105:54228  TLSv1.3 1440 Server Hello, Encrypted Extensions, Certificate
>> Flow status: HEALTHY (State: ESTABLISHED | Shannon Entropy: 7.92 / 8.0)
`,
        });
        break;

      case 'resume':
        newEntries.push({
          type: 'system',
          content: 'Dispatching interactive resume viewer modal...',
        });
        if (onOpenResume) onOpenResume();
        break;

      case 'clear':
        setEntries([]);
        setInputVal('');
        return;

      case 'matrix':
        newEntries.push({
          type: 'output',
          content: `
01010011 01001000 01001001 01010000 01010010 01000001
[CIPHER-STREAM INITIALIZED]
0x7F 0x45 0x4C 0x46 (ELF Binary Executable)
All packet filters: ACTIVE
Defense systems: READY
`,
        });
        break;

      case 'sudo':
        soundFX.alert();
        newEntries.push({
          type: 'error',
          content: `Permission denied: User "shipra" does not require sudo to engineer extraordinary systems.`,
        });
        break;

      case 'ping':
        newEntries.push({
          type: 'output',
          content: `
PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
64 bytes from 8.8.8.8: icmp_seq=1 ttl=117 time=11.4 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=117 time=12.1 ms
64 bytes from 8.8.8.8: icmp_seq=3 ttl=117 time=11.8 ms
--- 8.8.8.8 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2003ms
rtt min/avg/max/mdev = 11.4/11.76/12.1/0.28 ms
`,
        });
        break;

      default:
        soundFX.alert();
        newEntries.push({
          type: 'error',
          content: `Command not found: "${cmd}". Type "help" for a list of valid commands.`,
        });
        break;
    }

    setEntries(newEntries);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    soundFX.keyclick();

    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInputVal(history[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (history.length > 0 && historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < history.length) {
          setHistoryIndex(nextIndex);
          setInputVal(history[nextIndex]);
        } else {
          setHistoryIndex(-1);
          setInputVal('');
        }
      }
    }
  };

  const quickChips = ['whoami', 'skills', 'projects', 'nmap', 'inspect packet', 'honors', 'contact', 'clear'];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div
        className={`w-full bg-[#0B0C12] border border-emerald-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 font-mono text-xs sm:text-sm ${
          isMaximized
            ? 'h-[95vh] max-w-[95vw]'
            : 'h-[580px] max-w-4xl'
        }`}
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#12141D] border-b border-white/10 select-none">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1.5 mr-2">
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-red-500 hover:opacity-80 transition-opacity"
                title="Close terminal"
                aria-label="Close"
              />
              <button
                onClick={() => setEntries(initialBanner)}
                className="w-3 h-3 rounded-full bg-yellow-500 hover:opacity-80 transition-opacity"
                title="Reset terminal"
                aria-label="Reset"
              />
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="w-3 h-3 rounded-full bg-emerald-500 hover:opacity-80 transition-opacity"
                title="Maximize terminal"
                aria-label="Maximize"
              />
            </div>
            <TerminalIcon className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300 font-bold text-xs tracking-wider">
              shipra@security-box:~ (zsh)
            </span>
          </div>

          <div className="flex items-center space-x-2 text-slate-400">
            <span className="hidden sm:inline-block text-[11px] text-emerald-400/80 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
              ONLINE • PORT 443
            </span>
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1.5 rounded hover:bg-white/5 text-slate-400 hover:text-white"
              title={isMaximized ? 'Restore' : 'Maximize'}
              aria-label="Toggle Fullscreen"
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded hover:bg-white/5 text-slate-400 hover:text-white"
              title="Close"
              aria-label="Close Terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-[#0D0E17] border-b border-white/5 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px]">
          <span className="text-slate-500 flex items-center gap-1 flex-shrink-0">
            <Sparkles className="w-3 h-3 text-emerald-400" /> Quick:
          </span>
          {quickChips.map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-2 py-0.5 rounded bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-300 text-slate-300 border border-white/5 transition-colors flex-shrink-0"
            >
              {cmd}
            </button>
          ))}
          <button
            onClick={() => setEntries(initialBanner)}
            className="ml-auto px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200 border border-white/5 transition-colors flex items-center gap-1 flex-shrink-0"
            title="Reset log"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>

        {/* Terminal Content Buffer */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="flex-1 p-4 overflow-y-auto space-y-2 bg-[#08080C] text-slate-200 select-text cyber-scanline"
        >
          {entries.map((entry, index) => {
            if (entry.type === 'banner') {
              return (
                <pre
                  key={index}
                  className="font-mono text-[10px] sm:text-xs text-emerald-400 leading-tight select-none overflow-x-auto opacity-90"
                >
                  {entry.content}
                </pre>
              );
            }
            if (entry.type === 'input') {
              return (
                <div key={index} className="flex items-center space-x-2 text-slate-100">
                  <span className="text-emerald-400 font-bold">shipra@security-box:~$</span>
                  <span className="text-emerald-300 font-medium">{entry.content}</span>
                  {entry.timestamp && (
                    <span className="text-[10px] text-slate-600 ml-auto">{entry.timestamp}</span>
                  )}
                </div>
              );
            }
            if (entry.type === 'error') {
              return (
                <div key={index} className="text-red-400 font-mono pl-4 border-l-2 border-red-500/50">
                  {entry.content}
                </div>
              );
            }
            if (entry.type === 'system') {
              return (
                <div key={index} className="text-cyan-400 font-mono pl-4 border-l-2 border-cyan-500/50">
                  {entry.content}
                </div>
              );
            }
            return (
              <pre
                key={index}
                className="font-mono whitespace-pre-wrap text-slate-300 pl-4 border-l-2 border-emerald-500/30 overflow-x-auto"
              >
                {entry.content}
              </pre>
            );
          })}

          {/* Active Input Line */}
          <div className="flex items-center space-x-2 pt-1 text-slate-100">
            <span className="text-emerald-400 font-bold flex-shrink-0">shipra@security-box:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-emerald-300 font-mono font-medium focus:ring-0 p-0"
              placeholder='Type "help" or click suggestion chips...'
              autoFocus
              spellCheck={false}
            />
            <button
              onClick={() => handleCommand(inputVal)}
              disabled={!inputVal.trim()}
              className="p-1 rounded bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 disabled:opacity-30"
              aria-label="Execute"
            >
              <Play className="w-3.5 h-3.5" />
            </button>
          </div>

          <div ref={bottomRef} />
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-1.5 bg-[#12141D] border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>HACKER TERMINAL EMULATOR v4.2</span>
          <span>PRESS ESC TO CLOSE</span>
        </div>
      </div>
    </div>
  );
};

