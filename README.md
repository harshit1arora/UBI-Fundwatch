<div align="center">

# 🛡️ UBI FundWatch
### AI-Powered Financial Intelligence & AML Surveillance Console

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

> **Next-generation, AI-driven financial intelligence and Anti-Money Laundering (AML) platform built for high-stakes Security Operations Centers.**

</div>

---

## 📸 Overview

UBI FundWatch is a premium-grade financial surveillance platform that combines real-time transaction monitoring, AI-powered analysis, and forensic investigation tools into a single unified console. Designed for compliance officers, AML analysts, and SOC teams who need actionable intelligence in real time.

---

## ✨ Features

### 🖥️ Mission Control Dashboard
- **Real-time KPI Cards** — Live widgets displaying total transactions, flagged transactions, active investigations, and system health at a glance
- **Security Operations Pulse** — Visual health monitor for all underlying AI detection algorithms with accuracy scores and false-positive rates
- **Recent Alerts Feed** — Prioritized, color-coded alert stream with risk levels (Critical / High / Medium / Low)
- **Live Telemetry** — Sub-millisecond system latency tracking and automated heuristic analysis
- **Tactical Command Stream** — Live audit log of system events, detection matches, and automated isolation of high-risk nodes

---

### 🔍 Fund Flow Visualizer
- **Interactive Network Graph** — D3-powered visualization of multi-hop transaction chains, entity relationships, and layering patterns
- **Time-Lapse Replay** — Step-by-step reconstruction of suspicious transaction sequences to analyze velocity and behavioral patterns
- **Mule Node Tracker** — Detects and highlights money mule accounts and infers hidden controllers within complex fund-flow networks
- **Global Risk Pulse** — World heatmap showing real-time geographic risk concentrations and cross-border movement anomalies

---

### 🚨 Alerts & Case Management
- **Smart Alert Console** — Filterable, searchable alert queue with severity tiers, entity tags, and investigation linkage
- **One-Click Case Escalation** — Promote any alert directly to an active investigation with full context preserved
- **Bulk Alert Actions** — Mass-acknowledge, export, or archive multiple alerts simultaneously
- **Alert Timeline** — Chronological event history for every alert, showing detection chain and analyst actions

---

### 🧪 Investigation Center
- **Dedicated Investigation Workspace** — Structured environment for deep-diving flagged entities with full profile, transaction history, and network graph
- **AI Briefing Hub** — LLM-generated plain-language summaries of each case with risk reasoning and recommended next steps
- **Fraud DNA Fingerprinting** — Pattern-matching engine that identifies behavioral signatures unique to known AML typologies (e.g., Hawala structuring, smurfing, layering)
- **Entity Risk Scoring** — Dynamic composite risk scores calculated from transaction velocity, counterparty exposure, and geographic risk

---

### 🏛️ Forensics Center
- **Advanced Transaction Forensics** — Deep packet-level inspection of individual transactions with metadata overlays
- **Behavioral Anomaly Detection** — ML-based deviation analysis comparing entity behavior against peer cohorts and historical baselines
- **Pattern Library** — Searchable catalogue of known fraud typologies with visual examples and detection heuristics
- **Cross-Entity Link Analysis** — Correlation engine that surfaces hidden connections between seemingly unrelated accounts

---

### 📊 Reports & Compliance
- **One-Click Forensic PDF Export** — Generates court-ready, professionally formatted forensic reports via jsPDF with full transaction tables, risk summaries, and network diagrams
- **Scheduled Report Builder** — Configure automated compliance report delivery for regulatory submissions
- **Audit Trail Export** — Full tamper-evident audit logs exportable in CSV and PDF formats
- **Regulatory Compliance Dashboard** — Track submission deadlines, SAR filings, and compliance KPIs

---

### 🤖 AI Co-Pilot (Chat Assistant)
- **Contextual Intelligence Chat** — Conversational AI assistant embedded directly in the platform for instant query resolution
- **Natural Language Queries** — Ask questions like *"Show me all transactions over $50K to high-risk jurisdictions in the last 30 days"* and get structured results
- **Investigative Suggestions** — AI proactively recommends next investigation steps based on current case context
- **Explainable AI** — Every AI decision includes a human-readable explanation of the reasoning chain

---

### 🔐 Authentication & Security
- **Secure Auth Flow** — Role-based access control with analyst, supervisor, and admin tiers
- **Premium Login UI** — Immersive, animated cybersecurity-themed authentication experience
- **Session Management** — Automatic session expiry and secure token handling

---

## 🛠️ Technology Stack

| Category | Technology |
|---|---|
| **Framework** | React 18 + Vite 6 |
| **Language** | TypeScript 5.8 |
| **Styling** | Tailwind CSS 3.4 + Shadcn UI |
| **Animations** | Framer Motion 12 |
| **Data Visualization** | Recharts + D3.js + Custom SVG Gradients |
| **State Management** | TanStack Query (React Query) v5 |
| **Routing** | React Router DOM v6 |
| **Forms** | React Hook Form + Zod |
| **Icons** | Lucide React |
| **PDF Generation** | jsPDF + jsPDF-AutoTable |
| **Component Library** | Radix UI Primitives |
| **Testing** | Vitest + Playwright |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18 or higher
- **npm** v9+ or **bun**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/harshit1arora/UBI-Fundwatch.git
cd UBI-Fundwatch

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
npm run test         # Run unit tests (Vitest)
npm run test:watch   # Run tests in watch mode
```

---

## 🎨 Design System & UI Philosophy

UBI FundWatch is built around a **Premium Cybersecurity Aesthetic** designed for 24/7 SOC environments:

| Principle | Implementation |
|---|---|
| **Dark Mode First** | High-contrast dark palette easy on the eyes during extended operations |
| **Glassmorphism** | Semi-transparent panels with subtle backdrop blur for depth and hierarchy |
| **Micro-Animations** | Purposeful motion via Framer Motion that provides feedback and brings data to life |
| **Responsive Design** | Fully optimized for large command-center displays and widescreen monitors |
| **Corporate Typography** | Clean, professional Inter/system font stack aligned with banking aesthetics |
| **Color-Coded Risk** | Consistent red/amber/yellow/green risk taxonomy across all surfaces |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── chat/           # AI Co-Pilot chat assistant
│   ├── dashboard/      # Dashboard widgets & cards
│   ├── layout/         # Navbar, Sidebar, Shell
│   └── ui/             # Shadcn base components
├── pages/
│   ├── AlertsPage.tsx
│   ├── AuthPage.tsx
│   ├── Dashboard.tsx
│   ├── ForensicsPage.tsx
│   ├── FundFlowPage.tsx
│   ├── InvestigationPage.tsx
│   ├── ReportsPage.tsx
│   └── SettingsPage.tsx
├── hooks/              # Custom React hooks
├── lib/                # Utilities & helpers
└── App.tsx             # Root router & layout
```

---

## 🗺️ Roadmap

- [ ] Live backend integration with real transaction streams
- [ ] SAR (Suspicious Activity Report) automated filing workflow
- [ ] Multi-tenant support for enterprise deployments
- [ ] WebSocket-based real-time alert push
- [ ] Mobile-responsive tactical view
- [ ] Role-based dashboard customization

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is proprietary software developed for UBI (Union Bank of India) internal use.

---

<div align="center">

Built with ❤️ by [Harshit Arora](https://github.com/harshit1arora)

**UBI FundWatch** — *Surveillance that never sleeps.*

</div>
