import { Panel } from './Panel';

interface MoodEntry {
  day: string;
  value: number;
  emotion?: string;
  sentiment?: number;
}

interface AnalysisDashboardProps {
  dominantEmotion: string;
  sentimentScore: number;
  stressIndex: number;
  supportMode: string;
  moodHistory: MoodEntry[];
}

const POSITIVE_EMOTIONS = new Set(['happy', 'joy', 'calm', 'stable', 'reflective']);
const NEGATIVE_EMOTIONS = new Set(['stress', 'anxiety', 'sadness', 'anger', 'burnout', 'strained', 'high distress']);

function getEmotionCategory(emotion: string = 'Neutral'): 'positive' | 'neutral' | 'negative' {
  const key = emotion.toLowerCase();
  if (POSITIVE_EMOTIONS.has(key)) return 'positive';
  if (NEGATIVE_EMOTIONS.has(key)) return 'negative';
  return 'neutral';
}

export function AnalysisDashboard({
  dominantEmotion,
  sentimentScore,
  stressIndex,
  supportMode,
  moodHistory
}: AnalysisDashboardProps) {
  return (
    <Panel className="dashboard-panel">
      <div className="panel-header">
        <div>
          <p className="section-label">Step 3</p>
          <h3>Sentiment &amp; Risk Overview</h3>
        </div>
      </div>

      <div className="analysis-cards">
        <article className="stat-card">
          <span>Dominant emotion</span>
          <strong>{dominantEmotion}</strong>
        </article>
        <article className="stat-card">
          <span>Sentiment score</span>
          <strong>{sentimentScore} / 100</strong>
        </article>
        <article className="stat-card">
          <span>Stress index</span>
          <strong>{stressIndex} / 100</strong>
        </article>
        <article className="stat-card">
          <span>Recommended support</span>
          <strong>{supportMode}</strong>
        </article>
      </div>

      <div className="mood-chart-card">
        <div className="mood-chart-header">
          <div>
            <span className="section-label">Mood Tracking</span>
            <h4>Weekly emotional trend</h4>
          </div>
          <span className="small-note">Updates after every analysis</span>
        </div>

        {/* Legend */}
        <div className="mood-legend">
          <span className="mood-legend-pill mood-legend-positive">Positive</span>
          <span className="mood-legend-pill mood-legend-neutral">Neutral</span>
          <span className="mood-legend-pill mood-legend-negative">Negative</span>
        </div>

        <div className="mood-bars">
          {moodHistory.map((entry, index) => {
            const category = getEmotionCategory(entry.emotion);
            const barHeight = Math.max(entry.sentiment ?? entry.value, 18);
            return (
              <div className="mood-bar" key={index}>
                <div
                  className={`mood-bar-fill mood-bar-${category}`}
                  style={{ height: `${barHeight}%` }}
                  title={`${entry.emotion ?? 'Neutral'} — Sentiment: ${entry.sentiment ?? entry.value}`}
                />
                <label className="mood-bar-label">
                  <span className="mood-bar-day">{entry.day}</span>
                  <span className={`mood-bar-tag mood-tag-${category}`}>{entry.emotion ?? 'Neutral'}</span>
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </Panel>
  );
}
