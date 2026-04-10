import { useState, useEffect } from 'react';

const historyStorageKey = "calmdown-ai-mood-history";

export interface MoodEntry {
  day: string;
  value: number;
}

const defaultMoodHistory: MoodEntry[] = [
  { day: "Mon", value: 44 },
  { day: "Tue", value: 58 },
  { day: "Wed", value: 52 },
  { day: "Thu", value: 48 },
  { day: "Fri", value: 60 },
  { day: "Sat", value: 42 },
  { day: "Sun", value: 36 },
];

function getTodayLabel() {
  return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(new Date());
}

export function useMoodHistory() {
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>(defaultMoodHistory);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(historyStorageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMoodHistory(parsed.slice(-7));
        }
      }
    } catch (e) {
      console.error('Failed to load mood history', e);
    }
  }, []);

  const addMoodEntry = (value: number) => {
    setMoodHistory(prev => {
      const newHistory = [...prev, { day: getTodayLabel(), value }];
      if (newHistory.length > 7) {
        newHistory.shift();
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
