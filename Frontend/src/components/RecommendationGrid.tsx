import { Panel } from './Panel';

export interface Recommendation {
  tag: string;
  title: string;
  text: string;
}

interface RecommendationGridProps {
  recommendations: Recommendation[];
}

export function RecommendationGrid({ recommendations }: RecommendationGridProps) {
  return (
    <Panel className="recommendations-panel">
      <div className="panel-header">
        <div>
          <p className="section-label">Step 4</p>
          <h3>Personalized Calming Recommendations</h3>
        </div>
      </div>

      <div className="recommendation-grid">
        {recommendations.map((item, idx) => (
          <article className="recommendation-card" key={idx}>
            <span className="tag">{item.tag}</span>
            <strong>{item.title}</strong>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </Panel>
  );
}
