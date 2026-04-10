import React from 'react';

export interface EmotionMetric {
  label: string;
  value: number;
  description: string;
}

interface EmotionBarProps {
  metric: EmotionMetric;
}

export const EmotionBar: React.FC<EmotionBarProps> = ({ metric }) => {
  return (
    <div className="emotion-row">
      <div className="emotion-row-head">
        <strong>{metric.label}</strong>
        <span>{Math.round(metric.value)}%</span>
      </div>
      <div className="emotion-bar">
        <div 
          className="emotion-bar-fill" 
          style={{ 
            width: `${metric.value}%`,
            background: 'linear-gradient(90deg, #327c74 0%, #4facfe 100%)',
            transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
      </div>
      <div className="emotion-row-meta" style={{ marginTop: '4px', fontSize: '0.85rem', opacity: 0.8 }}>
        {metric.description}
      </div>
    </div>
  );
};
