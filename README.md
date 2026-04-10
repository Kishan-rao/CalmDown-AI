<div align="center">

<br/>

```
   ██████╗ █████╗ ██╗     ███╗   ███╗██████╗  ██████╗ ██╗    ██╗███╗   ██╗      █████╗ ██╗
  ██╔════╝██╔══██╗██║     ████╗ ████║██╔══██╗██╔═══██╗██║    ██║████╗  ██║     ██╔══██╗██║
  ██║     ███████║██║     ██╔████╔██║██║  ██║██║   ██║██║ █╗ ██║██╔██╗ ██║     ███████║██║
  ██║     ██╔══██║██║     ██║╚██╔╝██║██║  ██║██║   ██║██║███╗██║██║╚██╗██║     ██╔══██║██║
  ╚██████╗██║  ██║███████╗██║ ╚═╝ ██║██████╔╝╚██████╔╝╚███╔███╔╝██║ ╚████║     ██║  ██║██║
   ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝╚═════╝  ╚═════╝  ╚══╝╚══╝ ╚═╝  ╚═══╝     ╚═╝  ╚═╝╚═╝
```

### *Detect. Understand. Support.*

**An AI-powered emotional intelligence system for mental well-being.**  
Combines text sentiment, facial expression analysis, and a Groq-powered pipeline to deliver personalized, empathetic support — in real time.

<br/>

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![Groq](https://img.shields.io/badge/Groq-LLaMA_3.3_70B-F55036?style=for-the-badge&logo=groq&logoColor=white)](https://groq.com)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Zod](https://img.shields.io/badge/Zod-4-3E67B1?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev)

</div>

---

## ✨ What is CalmDown AI?

CalmDown AI is a full-stack emotional intelligence platform that meets you where you are — whether you're overwhelmed, calm, or anywhere in between. It analyzes the **text of your emotional check-ins**, detects **facial expressions via webcam**, fuses both signals through a **multimodal scoring pipeline**, and responds with personalized supportive insights, breathing exercises, and curated wellness recommendations.

No therapy jargon. No judgment. Just actionable, compassionate support.

---

## 🧠 How It Works

```
┌──────────────────────────────────────────────────────────────────────┐
│                        CalmDown AI Pipeline                          │
│                                                                      │
│  📝 Text Input          📷 Webcam Capture                            │
│       │                       │                                      │
│       ▼                       ▼                                      │
│  Local Heuristic         Face-API.js                                 │
│  (Keyword Lexicon)    (Expression Detection)                         │
│       │                       │                                      │
│       └─────────┬─────────────┘                                      │
│                 ▼                                                     │
│         Groq API (LLaMA 3.3 70B)                                     │
│         8-Step Reasoning Pipeline                                     │
│                 │                                                     │
│                 ▼                                                     │
│     ┌─────────────────────────┐                                      │
│     │  Multimodal Fusion      │  ← Weight: 70% text + 30% face      │
│     │  Emotion Classification │                                      │
│     │  Stress Score (0–100)   │                                      │
│     └─────────────────────────┘                                      │
│                 │                                                     │
│       ┌─────────┼──────────────┐                                     │
│       ▼         ▼              ▼                                     │
│  Sentiment   Support       Recommendations                           │
│  Dashboard   Response      (Music/Books/                             │
│  + Chart     + Insight      Breathing)                               │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Features

### 🔍 Multimodal Emotion Detection
| Signal | Method | Weight |
|---|---|---|
| Text check-in | Groq LLaMA 3.3 + local lexicon | **70%** |
| Facial expression | Face-API.js via webcam | **30%** |

### 🤖 8-Step AI Reasoning Pipeline
The Groq backend doesn't just classify emotion — it runs a structured chain-of-thought:

1. **Emotion Detection** → `Happy / Calm / Stress / Anxiety / Sadness / Anger / Burnout / Neutral / Mixed`
2. **Stress Scoring** → `stress_level: Low/Medium/High` + `stress_score: 1–10`
3. **Emotional Insight** → 1–2 sentence psychological observation
4. **Personalization** → Adjusts tone based on severity
5. **Supportive Response** → Empathetic, non-judgmental reply
6. **Suggested Actions** → 2–4 concrete next steps
7. **Early Warning** → Flags critical stress (score ≥ 7)
8. **Safety Protocol** → Crisis detection, Lifeline resources

### 📊 Emotion History Graph
- **Color-coded bars** per entry — 🟢 Positive | 🟤 Neutral | 🔴 Negative  
- Bar height represents **sentiment positivity**
- Each bar labelled with the short emotion tag (`HAPPY`, `STRESS`, etc.)
- **7-day rolling window** persisted in localStorage

### 🌬️ Breathing Exercise
An animated breathing guide with a pulsing circle that expands and contracts on a 4-second cycle. The "Breathe In / Breathe Out" text is centered inside the circle and scales with the animation.

### 💡 Personalized Recommendations
Three recommendation tiers based on emotional state:
- **High distress** → Breathing cycles, soft music, screen-off recovery
- **Medium** → Structured micro-breaks, ambient playlists, journaling
- **Low / Positive** → Mood maintenance walks, gratitude prompts, uplifting reads

---

## 🏗️ Project Structure

```
emotional-intelligence-pipeline/
│
├── 📁 src/                          # Backend (Express + Groq)
│   ├── 📁 ai/
│   │   ├── pipeline.ts              # 8-step Groq reasoning pipeline
│   │   └── index.ts                 # Express server + /analyze route
│   └── types.ts                     # Zod schemas + TypeScript types
│
├── 📁 client/                       # Frontend (React + Vite)
│   └── 📁 src/
│       ├── App.tsx                  # Root — analysis handler & multimodal fusion
│       ├── index.css                # Design system, tokens, all component styles
│       │
│       ├── 📁 components/
│       │   ├── HeroSection.tsx      # Top nav + live snapshot card
│       │   ├── EmotionCheckIn.tsx   # Text input + chip prompts
│       │   ├── WebcamPanel.tsx      # Webcam feed + expression capture
│       │   ├── AnalysisDashboard.tsx# Stat cards + emotion history chart
│       │   ├── RecommendationGrid.tsx # 4-card recommendation layout
│       │   ├── SupportResponse.tsx  # AI supportive message + disclaimer
│       │   ├── BreathingPanel.tsx   # Fullscreen animated breathing overlay
│       │   ├── Panel.tsx            # Shared panel wrapper
│       │   └── PageShell.tsx        # Outer page layout shell
│       │
│       ├── 📁 hooks/
│       │   ├── useMoodHistory.ts    # Emotion history state + localStorage
│       │   └── useWebcam.ts         # Webcam control + Face-API expression
│       │
│       └── 📁 utils/
│           └── analyzeText.ts       # Local keyword heuristic + recommendation lib
│
├── package.json                     # Backend scripts + deps
└── .env                             # GROQ_API_KEY lives here
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- A [Groq API Key](https://console.groq.com) (free tier available)

### 1 — Clone & Install

```bash
git clone https://github.com/Kishan-rao/CalmDown-AI.git
cd CalmDown-AI

# Install backend dependencies
npm install

# Install frontend dependencies
cd client && npm install && cd ..
```

### 2 — Environment Setup

Create a `.env` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key_here
```

### 3 — Run the Backend

```bash
npm run dev
```
> The Express API starts at `http://localhost:3000`

### 4 — Run the Frontend

```bash
cd client
npm run dev
```
> The React app starts at `http://localhost:5173`

---

## 🔌 API Reference

### `POST /analyze`

Runs the full 8-step emotional intelligence pipeline.

**Request Body**
```json
{
  "message": "I've been feeling overwhelmed with everything lately."
}
```

**Response**
```json
{
  "mood": "Stress",
  "stress_level": "High",
  "stress_score": 8,
  "emotional_insight": "Your words reflect a pattern of sustained overload. The mind and body are signalling that they need relief.",
  "supportive_response": "It takes courage to name what you're feeling. Let's slow down together.",
  "suggested_actions": [
    "Try a 4-second breathing cycle right now",
    "Write down three things causing the most pressure",
    "Take a 10-minute screen-free break"
  ],
  "early_warning": "Persistent high stress — consider speaking to someone you trust.",
  "personalization_note": "High-intensity grounding response activated"
}
```

**Emotion Categories**

| Emotion | Category | Color |
|---|---|---|
| Happy, Calm, Stable, Reflective | 🟢 Positive | Teal |
| Neutral, Mixed | 🟤 Neutral | Taupe |
| Stress, Anxiety, Sadness, Anger, Burnout | 🔴 Negative | Red |

---

## 🛡️ Safety & Ethics

- **No medical advice** — CalmDown AI explicitly avoids clinical diagnoses
- **Crisis detection** — Regex-based pre-screening for self-harm keywords triggers an immediate crisis response with helpline resources (988 Lifeline, Crisis Text Line)
- **Input sanitization** — User messages are truncated to 500 characters before being sent to the AI
- **Fallback safety** — All API failures return a safe, human-readable fallback response; the UI never crashes or exposes raw errors

---

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Type checking only (no emit)
npm run type-check
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React 18 + TypeScript | UI + component state |
| Styling | Vanilla CSS (Design Tokens) | Custom design system |
| Build tool | Vite 6 | Fast HMR dev server |
| Backend | Express 5 | REST API server |
| AI Model | Groq → LLaMA 3.3 70B | Emotional reasoning |
| Validation | Zod 4 | Schema + type safety |
| Testing | Vitest | Unit + integration tests |
| Webcam | Face-API.js | Real-time expression detection |

---

## 🗺️ Roadmap

- [ ] Voice check-in (Speech-to-text input)
- [ ] Multi-session longitudinal mood trends (weekly/monthly views)
- [ ] User accounts + cloud sync
- [ ] Therapist dashboard mode
- [ ] Mobile app (React Native)

---

## 📄 License

ISC — feel free to fork and use for personal projects or research.

---

<div align="center">

Built with empathy. Powered by AI. ❤️

**[⭐ Star this repo](https://github.com/Kishan-rao/CalmDown-AI)** if you found it useful!

</div>