import { useState } from 'react';

const historyStorageKey = "calmdown-ai-mood-history";

export interface MoodEntry {
  day: string;
  value: number;
  emotion?: string;
  sentiment?: number;
}

const defaultMoodHistory: MoodEntry[] = [
  { day: "Mon", value: 44, emotion: "Neutral", sentiment: 52 },
  { day: "Tue", value: 28, emotion: "Happy", sentiment: 78 },
  { day: "Wed", value: 52, emotion: "Strained", sentiment: 40 },
  { day: "Thu", value: 68, emotion: "Stress", sentiment: 28 },
  { day: "Fri", value: 30, emotion: "Calm", sentiment: 72 },
  { day: "Sat", value: 42, emotion: "Mixed", sentiment: 50 },
  { day: "Sun", value: 20, emotion: "Happy", sentiment: 85 },
];

function getTodayLabel() {
  return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(new Date());
}

export function useMoodHistory() {
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>(() => {
    try {
      const saved = localStorage.getItem(historyStorageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((e: MoodEntry) => ({
            day: e.day ?? "?",
            value: e.value ?? 50,
            emotion: e.emotion ?? "Neutral",
            sentiment: e.sentiment ?? 50,
          })).slice(-7);
        }
      }
    } catch (e) {
      console.error('Failed to load mood history', e);
    }
    return defaultMoodHistory;
  });

  const addMoodEntry = (value: number, emotion = "Neutral", sentiment = 50) => {
    setMoodHistory(prev => {
      const today = getTodayLabel();
      const existingIndex = prev.findIndex(e => e.day === today);
      let newHistory: MoodEntry[];

      if (existingIndex !== -1) {
        // Update existing entry for today
        newHistory = prev.map((e, i) =>
          i === existingIndex ? { day: today, value, emotion, sentiment } : e
        );
      } else {
        // Append new entry and keep last 7
        newHistory = [...prev, { day: today, value, emotion, sentiment }];
        if (newHistory.length > 7) {
          newHistory.shift();
        }
      }

      try {
        localStorage.setItem(historyStorageKey, JSON.stringify(newHistory));
      } catch (e) {
        console.error('Failed to save mood history', e);
      }
      return newHistory;
    });
  };

  return { moodHistory, addMoodEntry };
}
