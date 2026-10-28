import React, { useState, useEffect } from 'react';
import {
  Activity,
  Play,
  Pause,
  Filter,
  ShieldAlert,
  AlertTriangle,
  Search,
  Binary,
} from 'lucide-react';
import { soundFX } from '../../utils/audio';

interface Packet {
  id: string;
  timestamp: string;
  source: string;
  destination: string;
  protocol: 'TCP' | 'TLS' | 'DNS' | 'HTTP' | 'SYN-SCAN';
  flags: string;
  size: number;
  anomalyScore: number; // 0-100
  status: 'CLEAN' | 'SUSPICIOUS' | 'CRITICAL';
  payloadSummary: string;
}

export const PacketStreamVisualizer: React.FC = () => {
  const [isCapturing, setIsCapturing] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>('ALL');
  const [selectedPacket, setSelectedPacket] = useState<Packet | null>(null);
  const [packets, setPackets] = useState<Packet[]>([]);
  const [packetsCapturedCount, setPacketsCapturedCount] = useState<number>(1420);
  const [anomaliesDetected, setAnomaliesDetected] = useState<number>(3);

  const sampleIps = [
    '192.168.1.105',
    '10.0.0.12',
    '172.16.4.88',
    '198.51.100.4',
    '203.0.113.19',
    '142.250.190.46',
  ];

  const generatePacket = (): Packet => {
    const isAnomaly = Math.random() < 0.12;
    const protocols: ('TCP' | 'TLS' | 'DNS' | 'HTTP')[] = ['TCP', 'TLS', 'DNS', 'HTTP'];
    const proto = isAnomaly ? 'SYN-SCAN' : protocols[Math.floor(Math.random() * protocols.length)];

    const src = sampleIps[Math.floor(Math.random() * sampleIps.length)] + ':' + (1024 + Math.floor(Math.random() * 60000));
    const dst = '10.0.0.1:' + (proto === 'TLS' ? '443' : proto === 'HTTP' ? '80' : proto === 'DNS' ? '53' : '8000');

    let flags = 'ACK';
    let anomalyScore = Math.floor(Math.random() * 12);
    let status: 'CLEAN' | 'SUSPICIOUS' | 'CRITICAL' = 'CLEAN';

    if (proto === 'SYN-SCAN') {
      flags = 'SYN';
      anomalyScore = 75 + Math.floor(Math.random() * 24);
      status = anomalyScore > 85 ? 'CRITICAL' : 'SUSPICIOUS';
    } else if (proto === 'TCP') {
      flags = ['SYN', 'SYN, ACK', 'ACK', 'PSH, ACK'][Math.floor(Math.random() * 4)];
    }

    return {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toLocaleTimeString() + '.' + Math.floor(Math.random() * 900 + 100),
      source: src,
      destination: dst,
      protocol: proto,
      flags,
      size: Math.floor(Math.random() * 1420 + 54),
      anomalyScore,
      status,
      payloadSummary:
        proto === 'SYN-SCAN'
          ? 'Port sweep probe pattern detected across sequential destination ports.'
          : proto === 'TLS'
          ? 'TLSv1.3 Encrypted Handshake [Cipher: AES_256_GCM_SHA384]'
          : 'Standard TCP payload stream with verified checksum.',
    };
  };

  // Initial seed
  useEffect(() => {
    const initial: Packet[] = [];
    for (let i = 0; i < 7; i++) {
      initial.push(generatePacket());
    }
    setPackets(initial);
    setSelectedPacket(initial[0]);
  }, []);

  // Stream generator
  useEffect(() => {
    if (!isCapturing) return;

    const interval = setInterval(() => {
      const newPkt = generatePacket();
      setPackets((prev) => [newPkt, ...prev.slice(0, 19)]);
      setPacketsCapturedCount((c) => c + 1);

      if (newPkt.status !== 'CLEAN') {
        setAnomaliesDetected((a) => a + 1);
      }
    }, 1800);

    return () => clearInterval(interval);
  }, [isCapturing]);

  const triggerSimulatedAttack = () => {
    soundFX.alert();
    const attackPacket: Packet = {
      id: 'mitre-' + Math.floor(Math.random() * 999),
      timestamp: new Date().toLocaleTimeString() + '.999',
      source: '185.220.101.5:44321',
      destination: '10.0.0.1:8000',
      protocol: 'SYN-SCAN',
      flags: 'SYN, FIN (MALFORMED)',
      size: 40,
      anomalyScore: 96,
      status: 'CRITICAL',
      payloadSummary: 'T1046 Network Service Scanning • Rapid half-open handshake pattern flagged by SentinelX Isolation Forest.',
    };

    setPackets((prev) => [attackPacket, ...prev.slice(0, 19)]);
    setSelectedPacket(attackPacket);
    setAnomaliesDetected((a) => a + 1);
  };

  const filteredPackets =
    filter === 'ALL'
      ? packets
      : filter === 'ANOMALY'
      ? packets.filter((p) => p.status !== 'CLEAN')
      : packets.filter((p) => p.protocol === filter);

  return (
    <section id="packet-visualizer" className="relative py-20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan-400 mb-3">
            <Activity className="w-3.5 h-3.5" />
            <span>FLOW TRACE &amp; SENTINELX INTERACTIVE TELEMETRY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Live Packet Analyzer Simulation
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Experience the real-time packet inspection and ML anomaly detection engine designed for <span className="text-emerald-400 font-mono">Flow Trace</span> and <span className="text-cyan-400 font-mono">SentinelX</span>.
          </p>
        </div>

        {/* Console Container */}
        <div className="bg-[#0D0E16] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
          {/* Top HUD bar */}
          <div className="px-4 py-3 bg-[#131522] border-b border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            {/* Status indicators */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  {isCapturing && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  )}
                  <span
                    className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                      isCapturing ? 'bg-cyan-400' : 'bg-amber-400'
                    }`}
                  ></span>
                </span>
                <span className="text-white font-bold">
                  {isCapturing ? 'SNIFFING: ETH0 (PROMISCUOUS)' : 'CAPTURE PAUSED'}
                </span>
              </div>
              <span className="text-slate-500 hidden sm:inline">|</span>
              <span className="text-slate-400 hidden sm:inline">
                Captured: <span className="text-emerald-400 font-bold">{packetsCapturedCount}</span>
              </span>
              <span className="text-slate-400 hidden sm:inline">
                Anomalies: <span className="text-red-400 font-bold">{anomaliesDetected}</span>
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  soundFX.blip(850);
                  setIsCapturing(!isCapturing);
                }}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 flex items-center gap-1.5 transition-colors"
              >
                {isCapturing ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                <span>{isCapturing ? 'Pause' : 'Resume'}</span>
              </button>

              <button
                onClick={triggerSimulatedAttack}
                className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1.5 transition-colors"
                title="Inject anomalous stealth probe"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Inject Port Scan Probe</span>
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="px-4 py-2 bg-[#090A10] border-b border-white/5 flex items-center gap-2 overflow-x-auto text-xs font-mono">
            <span className="text-slate-500 flex items-center gap-1 flex-shrink-0">
              <Filter className="w-3 h-3 text-cyan-400" /> Filter Protocol:
            </span>
            {['ALL', 'TCP', 'TLS', 'DNS', 'ANOMALY'].map((f) => (
              <button
                key={f}
                onClick={() => {
                  soundFX.blip(900);
                  setFilter(f);
                }}
                className={`px-2.5 py-1 rounded transition-colors ${
                  filter === f
                    ? 'bg-cyan-500 text-black font-bold'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Main Visualizer Body: Table + Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10 min-h-[380px]">
            {/* Packet Table (7 Cols) */}
            <div className="lg:col-span-7 overflow-x-auto max-h-[440px] overflow-y-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-[#121420] text-slate-400 sticky top-0 z-10 text-[11px] border-b border-white/5">
                  <tr>
                    <th className="py-2.5 px-3">Time</th>
                    <th className="py-2.5 px-3">Source &gt; Dest</th>
                    <th className="py-2.5 px-2">Proto</th>
                    <th className="py-2.5 px-2">Flags</th>
                    <th className="py-2.5 px-2">Risk</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {filteredPackets.map((pkt) => {
                    const isSelected = selectedPacket?.id === pkt.id;
                    const isAlert = pkt.status !== 'CLEAN';

                    return (
                      <tr
                        key={pkt.id}
                        onClick={() => {
                          soundFX.keyclick();
                          setSelectedPacket(pkt);
                        }}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-cyan-500/15 text-white'
                            : isAlert
                            ? 'bg-red-500/10 hover:bg-red-500/20'
                            : 'hover:bg-white/5'
                        }`}
                      >
                        <td className="py-2 px-3 text-slate-400 text-[11px] whitespace-nowrap">
                          {pkt.timestamp}
                        </td>
                        <td className="py-2 px-3 whitespace-nowrap">
                          <span className="text-slate-200">{pkt.source}</span>
                          <span className="text-slate-500 mx-1">→</span>
                          <span className="text-slate-300">{pkt.destination}</span>
                        </td>
                        <td className="py-2 px-2">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              pkt.protocol === 'SYN-SCAN'
                                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                : pkt.protocol === 'TLS'
                                ? 'bg-violet-500/20 text-violet-300'
                                : 'bg-emerald-500/20 text-emerald-300'
                            }`}
                          >
                            {pkt.protocol}
                          </span>
                        </td>
                        <td className="py-2 px-2 text-[11px] text-slate-400 whitespace-nowrap">
                          {pkt.flags}
                        </td>
                        <td className="py-2 px-2">
                          <span
                            className={`inline-block font-bold text-[11px] ${
                              pkt.anomalyScore > 70
                                ? 'text-red-400'
                                : pkt.anomalyScore > 30
                                ? 'text-yellow-400'
                                : 'text-emerald-400'
                            }`}
                          >
                            {pkt.anomalyScore}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Deep Packet Inspector Side Panel (5 Cols) */}
            <div className="lg:col-span-5 p-5 bg-[#090A10] flex flex-col justify-between font-mono text-xs">
              {selectedPacket ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <Binary className="w-4 h-4 text-cyan-400" />
                      <span className="font-bold text-white uppercase">
                        Dissected Packet #{selectedPacket.id}
                      </span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        selectedPacket.status === 'CRITICAL'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {selectedPacket.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-slate-300">
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-slate-500">Source IP &amp; Port:</span>
                      <span className="text-emerald-400">{selectedPacket.source}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-slate-500">Destination IP &amp; Port:</span>
                      <span className="text-cyan-400">{selectedPacket.destination}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-slate-500">Protocol &amp; Flags:</span>
                      <span className="text-white">
                        {selectedPacket.protocol} [{selectedPacket.flags}]
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-slate-500">Frame Length:</span>
                      <span className="text-slate-200">{selectedPacket.size} Bytes</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-slate-500">ML Anomaly Confidence:</span>
                      <span className="font-bold text-red-400">
                        {selectedPacket.anomalyScore}% Risk
                      </span>
                    </div>
                  </div>

                  {/* Deep Payload Analysis */}
                  <div className="mt-4 p-3 rounded-xl bg-black/60 border border-white/10">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <ShieldAlert className="w-3 h-3 text-cyan-400" /> SentinelX Intelligence Audit
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {selectedPacket.payloadSummary}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-slate-500 text-center">
                  <Search className="w-8 h-8 mb-2 opacity-40" />
                  <span>Select any packet row from the live stream to dissect OSI headers.</span>
                </div>
              )}

              <div className="pt-4 border-t border-white/5 text-[10px] text-slate-500 flex justify-between">
                <span>SCAPY SOCKET: INET_RAW</span>
                <span>STATE: RECONSTRUCTED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
