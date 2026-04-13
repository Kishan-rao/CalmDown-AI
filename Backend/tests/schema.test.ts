import { describe, it, expect } from 'vitest';
import { PipelineOutputSchema, PipelineInputSchema } from '../src/types';

// ─── Schema Validation Tests ──────────────────────────────────────────────────

describe('PipelineInputSchema', () => {
  it('accepts a valid message', () => {
    const result = PipelineInputSchema.safeParse({ message: 'I am feeling very stressed today.' });
    expect(result.success).toBe(true);
  });

  it('rejects an empty message', () => {
    const result = PipelineInputSchema.safeParse({ message: '' });
    expect(result.success).toBe(false);
  });

  it('rejects a message that is too long', () => {
    const result = PipelineInputSchema.safeParse({ message: 'a'.repeat(2001) });
    expect(result.success).toBe(false);
  });
});

describe('PipelineOutputSchema', () => {
  const validOutput = {
    mood: 'Stress',
    stress_level: 'High',
    stress_score: 80,
    risk_indicator: 'Elevated',
    recommended_support: 'Mindfulness',
    explanation: 'High stress indicated by multiple conflicting demands.',
    emotional_insight: 'The user is experiencing acute pressure from competing demands.',
    supportive_response: 'It sounds like you are carrying a heavy load right now.',
    suggested_actions: [
      'Take 5 slow deep breaths right now.',
      'Write down the top 3 most urgent tasks.',
      'Step away from screens for 10 minutes.',
    ],
    early_warning: 'Your emotional load appears significant. Consider taking a real break.',
    personalization_note: 'High-stress response with early warning and safety reminder included.',
  };

  it('validates a correct pipeline output', () => {
    const result = PipelineOutputSchema.safeParse(validOutput);
    expect(result.success).toBe(true);
  });

  it('rejects an invalid mood value', () => {
    const result = PipelineOutputSchema.safeParse({ ...validOutput, mood: 'Fear' });
    expect(result.success).toBe(false);
  });

  it('rejects a stress_score outside 0-100', () => {
    const result = PipelineOutputSchema.safeParse({ ...validOutput, stress_score: 101 });
    expect(result.success).toBe(false);
  });

  it('allows early_warning to be null when score is low', () => {
    const result = PipelineOutputSchema.safeParse({
      ...validOutput,
      stress_score: 30,
      stress_level: 'Low',
      risk_indicator: 'None',
      early_warning: null,
    });
    expect(result.success).toBe(true);
  });
});
