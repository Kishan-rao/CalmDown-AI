import { z } from 'zod';

// ─── Enums ───────────────────────────────────────────────────────────────────

export const MoodEnum = z.enum([
  'Stress',
  'Anxiety',
  'Sadness',
  'Anger',
  'Burnout',
  'Neutral',
  'Mixed',
]);

export const StressLevelEnum = z.enum(['Low', 'Medium', 'High']);

// ─── Pipeline Output Schema ───────────────────────────────────────────────────

export const PipelineOutputSchema = z.object({
  mood: MoodEnum,
  stress_level: StressLevelEnum,
  stress_score: z.number().int().min(0).max(100),
  risk_indicator: z.enum(['None', 'Monitor', 'Elevated']),
  recommended_support: z.enum(['Self-care', 'Mindfulness', 'Social Support', 'Professional Guidance']),
  explanation: z.string().min(1),
  emotional_insight: z.string().min(1),
  supportive_response: z.string().min(1),
  suggested_actions: z.array(z.string()).min(2).max(4),
  early_warning: z.string().nullable(),
  personalization_note: z.string().min(1),
});

// ─── Pipeline Input Schema ────────────────────────────────────────────────────

export const PipelineInputSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty').max(2000, 'Message too long'),
});

// ─── TypeScript Types ─────────────────────────────────────────────────────────

export type Mood = z.infer<typeof MoodEnum>;
export type StressLevel = z.infer<typeof StressLevelEnum>;
export type PipelineOutput = z.infer<typeof PipelineOutputSchema>;
export type PipelineInput = z.infer<typeof PipelineInputSchema>;
