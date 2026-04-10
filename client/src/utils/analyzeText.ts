import type { Recommendation } from '../components/RecommendationGrid';

export const recommendationLibrary: Record<'high' | 'medium' | 'low', Recommendation[]> = {
  high: [
    { tag: "Breathing", title: "4-6 calming breath cycle", text: "Inhale for 4 seconds, exhale for 6 seconds, and repeat for 3 minutes to lower physical tension." },
    { tag: "Music", title: "Lo-fi or soft piano focus mix", text: "Choose slow instrumental music with low intensity to reduce overstimulation during anxious moments." },
    { tag: "Reading", title: "Gentle reflective book", text: "Try a comforting, low-pressure read such as short essays or reflective fiction that does not demand heavy focus." },
    { tag: "Reset", title: "Screen-off recovery routine", text: "Step away for 10 minutes, hydrate, stretch your shoulders, and look away from your devices before returning to work." },
  ],
  medium: [
    { tag: "Routine", title: "Structured micro-break plan", text: "Use a 25-minute focus block followed by a 5-minute reset with breathing or a short walk." },
    { tag: "Audio", title: "Nature or ambient playlist", text: "Rain sounds, ocean ambience, or acoustic playlists can make concentration feel less strained." },
    { tag: "Movies", title: "Lighthearted comfort watch", text: "Pick a familiar feel-good movie or series episode that feels emotionally safe and relaxing." },
    { tag: "Mindset", title: "Thought download journal", text: "Write down worries in short bullet points, then circle only the ones that need action today." },
  ],
  low: [
    { tag: "Balance", title: "Mood maintenance walk", text: "A short outdoor walk with no notifications can help preserve calm and prevent stress build-up." },
    { tag: "Focus", title: "Positive playlist rotation", text: "Keep a small personal playlist of grounding songs ready for transitions between work and rest." },
    { tag: "Reading", title: "Inspirational short read", text: "Choose uplifting articles or a few pages of a meaningful book to maintain emotional steadiness." },
    { tag: "Care", title: "Daily gratitude prompt", text: "Write one thing that felt difficult and one thing that still went well today to keep perspective balanced." },
  ],
};

const distressLexicon = {
  high: ["anxious", "panic", "worthless", "hopeless", "alone", "depressed", "overwhelmed", "exhausted", "burnout", "crying", "can't cope", "cannot cope", "stressed", "helpless"],
  medium: ["tired", "worried", "pressure", "upset", "restless", "nervous", "drained", "confused", "frustrated", "sad"],
  positive: ["happy", "joyful", "excited", "hopeful", "calm", "grateful", "better", "relieved", "focused", "supported", "okay", "good", "great"],
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function analyzeText(text: string) {
  const normalized = text.trim().toLowerCase();

  if (!normalized) {
    return {
      emotion: "Neutral",
      sentiment: 50,
      stress: 18,
      risk: "Low",
      support: "Gentle check-in",
      response: "A quick emotional check-in will help the assistant tailor calming suggestions.",
      recommendations: recommendationLibrary.low,
    };
  }

  let sentiment = 50;
  let stress = 25;
  let highHits = 0;
  let mediumHits = 0;
  let positiveHits = 0;

  distressLexicon.high.forEach((term) => { if (normalized.includes(term)) highHits += 1; });
  distressLexicon.medium.forEach((term) => { if (normalized.includes(term)) mediumHits += 1; });
  distressLexicon.positive.forEach((term) => { if (normalized.includes(term)) positiveHits += 1; });

  sentiment = clamp(50 - highHits * 16 - mediumHits * 8 + positiveHits * 10, 0, 100);
  stress = clamp(25 + highHits * 18 + mediumHits * 9 - positiveHits * 6 + Math.min(normalized.length / 50, 15), 0, 100);

  let emotion = "Reflective";
  let risk = "Low";
  let support = "Gentle check-in";
  let response = "You sound fairly steady overall. A small recovery activity can help preserve that sense of calm.";
  let recommendations = recommendationLibrary.low;

  if (stress >= 70 || sentiment <= 20) {
    emotion = "High Distress";
    risk = "High";
    support = "Immediate calming support";
    response = "Your check-in suggests elevated stress and emotional overload. The interface should respond with grounding exercises, low-pressure support, and clear pathways to human help if things feel unsafe.";
    recommendations = recommendationLibrary.high;
  } else if (stress >= 45 || sentiment <= 45) {
    emotion = "Strained";
    risk = "Moderate";
    support = "Structured support";
    response = "Your words suggest that tension is building. The assistant should acknowledge that clearly, offer practical coping options, and keep the next step simple rather than overwhelming.";
    recommendations = recommendationLibrary.medium;
  } else if (positiveHits > 0) {
    emotion = "Stable";
    risk = "Low";
    support = "Mood maintenance";
    response = "You appear relatively balanced right now. The best support is to reinforce routines that keep your energy and focus steady.";
    recommendations = recommendationLibrary.low;
  }

  return { emotion, sentiment, stress, risk, support, response, recommendations };
}
