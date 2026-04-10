import React from 'react';

interface ConfidenceEntry {
  label: string;
  value: number;
}

interface ExpressionConfidenceProps {
  confidences: ConfidenceEntry[];
  dominantExpression: string;
}

export const ExpressionConfidence: React.FC<ExpressionConfidenceProps> = ({ 
  confidences, 
  dominantExpression 
}) => {
  if (!confidences || confidences.length === 0) return null;

  return (
    <div className="expression-ai-card animate-in" style={{ animationDelay: '0.15s' }}>
      <div className="expression-ai-header">
        <div>
          <span className="section-label">Vision AI Sensing</span>
          <h3>Confidence Map</h3>
        </div>
        <div className="status-pill">Active Sensor</div>
      </div>
      
      <div className="expression-confidence-list">
        {confidences.map((entry, idx) => (
          <div key={idx} className="confidence-row">
            <label>{entry.label}</label>
            <div className="confidence-track">
              <div 
                className="confidence-fill" 
                style={{ width: `${entry.value}%` }} 
              />
            </div>
            <div className="confidence-value">{Math.round(entry.value)}%</div>
          </div>
        ))}
      </div>

      <div className="expression-reliability">
        <span>Dominant Cue</span>
        <strong>{dominantExpression || 'Neutral'}</strong>
        <p className="small-note">Confidence: {Math.max(...confidences.map(c => c.value))}%</p>
      </div>
    </div>
  );
};
