# Emotional Intelligence Pipeline: Project Overview

This project is a sophisticated, AI-powered mental well-being companion designed to detect, understand, and support users in real-time. It combines advanced Large Language Models (LLMs) with browser-side biometric sensing to provide a premium, empathetic support experience.

## 🎨 Frontend Architecture

The frontend was recently migrated from a basic structure to a high-end, responsive application using **React** and **Vite**.

- **Modern Design System**: Built with a "CalmDown AI" aesthetic, featuring a charcoal-and-clay color palette, smooth gradients, and glassmorphism.
- **Biometric Sensing**: Integrated **face-api.js** to perform real-time facial expression detection directly in the browser's webcam feed.
- **Modular Components**:
    - `HeroSection`: Real-time stress and balance summary.
    - `EmotionCheckIn`: Emotive text input with quick-select demo chips.
    - `WebcamPanel`: Live facial cue estimation.
    - `AnalysisDashboard`: Weekly mood trend tracking (persisted via `localStorage`) and sentiment scoring.
    - `RecommendationGrid`: Dynamic, context-aware suggestions for breathing, music, and grounding routines.
- **Hybrid Intelligence**: The frontend implements a dual-layer analysis. It uses a local heuristic lexicon for instant feedback and seamlessly merges this with deep insights fetched from the backend LLM.

## ⚙️ Backend & AI Pipeline

The backend functions as a secure, high-performance intelligence layer.

- **Engine**: Built with **Node.js** and **Express**.
- **LLM Integration**: Utilizes the **Groq SDK** to access **Llama 3.3 70B Versatile**, a state-of-the-art model chosen for its speed and empathetic reasoning capabilities.
- **Safety Protocol**:
    - **Crisis Detection**: A pre-emptive regex-based layer intercepts high-risk keywords (e.g., self-harm) before they reach the LLM, triggering immediate safety resources.
    - **Structured Output**: The pipeline enforces a strict JSON schema via Zod, ensuring the model returns precise mood labels, stress scores (1–10), and actionable psychological insights.
    - **Fallback Logic**: Robust error handling ensures that even if the API is unreachable, the user receives local check-in support and grounding exercises.

## 🚀 Key Features

1. **Multimodal Analysis**: Combines what the user *says* (text) with how they *look* (webcam) to estimate distress risk.
2. **Actionable Support**: Generates custom steps (e.g., "4-6-6 breathing", "Lo-fi playlist") based on the detected stress intensity.
3. **Weekly Progress**: Persists emotional states locally to help users visualize their well-being trends over time.
4. **Responsible AI**: Integrated mandatory crisis resources and responsible AI disclaimers to ensure user safety.
