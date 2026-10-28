import React, { useState } from 'react';
import {
  KeyRound,
  Lock,
  Unlock,
  Copy,
  Check,
  Hash,
} from 'lucide-react';
import { soundFX } from '../../utils/audio';

export const CipherPlayground: React.FC = () => {
  const [plaintext, setPlaintext] = useState('DEFEND_THE_PERIMETER_2026');
  const [cipherType, setCipherType] = useState<'caesar' | 'xor'>('caesar');
  const [caesarShift, setCaesarShift] = useState(3);
  const [xorKey, setXorKey] = useState('0x5A');
  const [copied, setCopied] = useState(false);

  // Compute Caesar
  const encryptCaesar = (text: string, shift: number): string => {
    return text
      .split('')
      .map((char) => {
        const code = char.charCodeAt(0);
        // Uppercase
        if (code >= 65 && code <= 90) {
          return String.fromCharCode(((code - 65 + shift) % 26) + 65);
        }
        // Lowercase
        if (code >= 97 && code <= 122) {
          return String.fromCharCode(((code - 97 + shift) % 26) + 97);
        }
        return char;
      })
      .join('');
  };

  // Compute XOR
  const encryptXor = (text: string, keyHex: string): { ciphertext: string; hex: string } => {
    const keyVal = parseInt(keyHex, 16) || 0x5a;
    const hexArr: string[] = [];
    const charArr = text.split('').map((char) => {
      const xored = char.charCodeAt(0) ^ keyVal;
      hexArr.push(xored.toString(16).padStart(2, '0').toUpperCase());
      return String.fromCharCode(xored);
    });

    return {
      ciphertext: charArr.join(''),
      hex: hexArr.join(' '),
    };
  };

  const getCipherResult = () => {
    if (cipherType === 'caesar') {
      const res = encryptCaesar(plaintext, caesarShift);
      return { output: res, hex: res.split('').map((c) => c.charCodeAt(0).toString(16).toUpperCase()).join(' ') };
    } else {
      const res = encryptXor(plaintext, xorKey);
      return { output: res.ciphertext, hex: res.hex };
    }
  };

  const cipherResult = getCipherResult();

  const handleCopy = () => {
    navigator.clipboard.writeText(cipherResult.output);
    setCopied(true);
    soundFX.blip(1000);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="crypto-playground" className="relative py-20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-violet-400 mb-3">
            <KeyRound className="w-3.5 h-3.5" />
            <span>CRYPTOGRAPHY DASHBOARD SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Interactive Cipher &amp; Entropy Engine
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Test classical substitution mechanics and bitwise XOR stream transformations directly in the browser.
          </p>
        </div>

        {/* Card Box */}
        <div className="bg-[#0D0E16] border border-violet-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl max-w-4xl mx-auto">
          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
            {/* Cipher Mode Switcher */}
            <div className="flex items-center space-x-2 font-mono text-xs">
              <span className="text-slate-400">Cipher Algorithm:</span>
              <button
                onClick={() => {
                  soundFX.blip(850);
                  setCipherType('caesar');
                }}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  cipherType === 'caesar'
                    ? 'bg-violet-500 text-white font-bold shadow-md shadow-violet-500/30'
                    : 'bg-white/5 text-slate-300 hover:text-white'
                }`}
              >
                Caesar Shift (+{caesarShift})
              </button>
              <button
                onClick={() => {
                  soundFX.blip(850);
                  setCipherType('xor');
                }}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  cipherType === 'xor'
                    ? 'bg-violet-500 text-white font-bold shadow-md shadow-violet-500/30'
                    : 'bg-white/5 text-slate-300 hover:text-white'
                }`}
              >
                XOR Bitwise ({xorKey})
              </button>
            </div>

            {/* Parameter adjusters */}
            <div className="flex items-center space-x-3 font-mono text-xs">
              {cipherType === 'caesar' ? (
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400">Rotational Shift:</span>
                  <input
                    type="range"
                    min="1"
                    max="25"
                    value={caesarShift}
                    onChange={(e) => {
                      soundFX.keyclick();
                      setCaesarShift(Number(e.target.value));
                    }}
                    className="w-24 accent-violet-500 cursor-pointer"
                  />
                  <span className="font-bold text-violet-300 w-6">+{caesarShift}</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400">Hex Mask Key:</span>
                  <select
                    value={xorKey}
                    onChange={(e) => {
                      soundFX.blip(900);
                      setXorKey(e.target.value);
                    }}
                    className="bg-[#161824] border border-white/10 rounded px-2 py-1 text-violet-300 outline-none"
                  >
                    <option value="0x5A">0x5A (0101 1010)</option>
                    <option value="0x3C">0x3C (0011 1100)</option>
                    <option value="0xFF">0xFF (1111 1111 - NOT)</option>
                    <option value="0xAA">0xAA (1010 1010)</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Plaintext Input */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-medium text-slate-300 mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Unlock className="w-3.5 h-3.5 text-emerald-400" /> Input Payload / Message (Plaintext)
                </span>
                <span className="text-slate-500">{plaintext.length} characters</span>
              </label>
              <input
                type="text"
                value={plaintext}
                onChange={(e) => {
                  soundFX.keyclick();
                  setPlaintext(e.target.value);
                }}
                className="w-full bg-[#121420] border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-sm focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none"
                placeholder="Enter text to encrypt..."
              />
            </div>

            {/* Ciphertext Output */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono font-medium text-slate-300 mb-2">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-violet-400" /> Transformed Cipher Output
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-slate-400 hover:text-white hover:underline transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Ciphertext</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#090A10] border border-violet-500/30 font-mono text-sm text-violet-300 flex items-center justify-between">
                <span className="truncate pr-4">{cipherResult.output || '<empty>'}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30 flex-shrink-0">
                  {cipherType.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Hex Dump Breakdown */}
            <div>
              <div className="text-[11px] font-mono text-slate-400 mb-1.5 flex items-center gap-1">
                <Hash className="w-3 h-3 text-cyan-400" /> Hexadecimal Memory Representation
              </div>
              <div className="p-3 rounded-lg bg-black/60 border border-white/5 font-mono text-xs text-slate-400 overflow-x-auto tracking-wider">
                {cipherResult.hex || '00'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
