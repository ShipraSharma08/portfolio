# Shipra Sharma | Developer Portfolio

> **Cybersecurity Enthusiast & Backend/Network Systems Developer**  
> Bilaspur, Chhattisgarh, India • [shiprasharma34724@gmail.com](mailto:shiprasharma34724@gmail.com) • +91-9644701604

A high-impact, modern, interactive developer portfolio inspired by [antigravity.google](https://antigravity.google) featuring Three.js 3D anti-gravity physics, packet trace meshes, interactive mock hacker terminal, live network packet analyzer simulation, cryptography playground, and glassmorphic micro-interactions.

---

## 🚀 Live Features & Architectural Highlights

1. **3D Three.js Anti-Gravity & Packet Trace Network**:
   - Floating polyhedral geometric nodes (icosahedrons, octahedrons, and glowing particle points) in a dynamic gravitational orbit.
   - Interactive cursor repulsion physics: nodes gently repel when the cursor nears and return smoothly into orbit.
   - Real-time packet pulses traveling along network edges simulating live TCP/IP traffic hops.
   - Throttles or pauses rendering when offscreen via `IntersectionObserver` to sustain 60 FPS and conserve power.

2. **Interactive Mock Hacker Terminal (`shipra@security-box:~`)**:
   - Draggable & expandable terminal emulator with history navigation, quick action suggestion chips, and procedural audio keyclicks.
   - Commands: `whoami`, `about`, `skills`, `projects`, `education`, `honors`, `contact`, `nmap localhost`, `inspect packet`, `resume`, `matrix`, `clear`, `help`.
   - Toggle anytime via the HUD button or keyboard shortcut (`~` / `` ` ``).

3. **Live Packet Analyzer Simulation**:
   - Interactive telemetry console demonstrating her **Flow Trace** and **SentinelX** projects.
   - Inspects real-time synthetic TCP, TLS, DNS, and HTTP packets with 5-tuple addressing, flags (SYN, ACK, PSH, RST), and ML anomaly detection risk scoring.
   - Includes a live attack simulation button (`Inject Port Scan Probe`) triggering automated risk classification.

4. **Interactive Cryptography & Entropy Engine**:
   - Live interactive visualizer demonstrating her **Cryptography Dashboard** project.
   - Real-time Caesar rotational shifts (1-25) and XOR bitwise stream masking with hexadecimal memory inspection and one-click copy.

5. **Skills & Architecture Matrix**:
   - Categorized cards with hover glowing borders: Languages, Cybersecurity, Networking, Backend & DevOps, Cloud & Tools.
   - Proficiency meters and contextual notes detailing real-world application.

6. **Featured Projects Deep Dive**:
   - **SentinelX**: AI-Powered Network Security Platform (FastAPI, React, ML, MITRE ATT&CK, PostgreSQL)
   - **Flow Trace**: Real-Time TCP Session & Network Flow Analyzer (Scapy, FastAPI, SQLite)
   - **CyberGuard**: Automated Network Security Scanner (Bash, Linux, Kali Linux, Nmap)
   - **SentinelOS**: Cryptographic File Integrity Monitor (Flask, SHA-256, SQLite)
   - **Cryptography Dashboard**: Classical & Modern Cipher Mechanics (Streamlit, Cryptography)
   - Detailed modal view with architecture breakdown, CLI invocation spec, and metrics.

7. **Honors & Hackathons**:
   - **Adobe University Hackathon 2026**: Reached Round 4 (Top 150 out of ~300,000 participants / Top 0.05% nationwide)
   - **IIIT Naya Raipur E-Summit Hackathon 2026**: National Finalist (Top 120 Teams)
   - **Business Ghar Ideathon 2026**: Runner-Up (2nd Place)
   - **Academic Record**: B.Tech in IT at Government Engineering College, Bilaspur (SPI: 8.00 / 10.00)

8. **Encrypted Message Dispatch & Interactive Resume**:
   - Form submission sequence simulating AES-256-GCM payload encryption with confetti burst.
   - Integrated full-screen printable resume viewer with ATS formatting and JSON export.

---

## 🛠️ Tech Stack

- **Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS with custom cybernetic color palette (`#08080C`, `#0F1017`, `#161822`) and neon accents (Emerald, Cyan, Violet)
- **3D Graphics**: Three.js (custom WebGL scene, particle shaders, cursor raycasting physics)
- **Icons**: Lucide React
- **Audio Engine**: Web Audio API procedural synthesizer (zero external sound files)
- **VFX**: Canvas Confetti
- **Build Tool**: Vite 5

---

## 💻 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build optimized production bundle
npm run build

# 4. Preview production build
npm run preview
```

