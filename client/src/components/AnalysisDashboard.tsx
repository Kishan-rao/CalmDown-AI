import { Panel } from './Panel';

interface AnalysisDashboardProps {
  dominantEmotion: string;
  sentimentScore: number;
  stressIndex: number;
  supportMode: string;
  moodHistory: { day: string; value: number }[];
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
          <h3>Sentiment & Risk Overview</h3>
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
          <span className="small-note">Demo data updates after every analysis</span>
        </div>
        <div className="mood-bars">
          {moodHistory.map((entry, index) => (
            <div className="mood-bar" key={index}>
              <div 
                className="mood-bar-fill" 
                style={{ height: `${Math.max(entry.value, 18)}%` }}
              ></div>
              <label>{entry.day}</label>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}
