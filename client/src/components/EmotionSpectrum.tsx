import React from 'react';

interface EmotionEntry {
  label: string;
  intensity: number;
  meta: string;
}

interface EmotionSpectrumProps {
  entries: EmotionEntry[];
}

export const EmotionSpectrum: React.FC<EmotionSpectrumProps> = ({ entries }) => {
  if (!entries || entries.length === 0) return null;

  return (
    <div className="emotion-spectrum-card animate-in">
      <div className="emotion-spectrum-header">
        <div>
          <span className="section-label">Emotion Intensity</span>
          <h3>Spectrum Details</h3>
        </div>
        <div className="status-pill">Heuristic Analysis</div>
      </div>
      <div className="emotion-spectrum-list">
        {entries.map((entry, idx) => (
          <div key={idx} className="emotion-row">
            <div className="emotion-row-head">
              <strong>{entry.label}</strong>
              <span>{Math.round(entry.intensity)}%</span>
            </div>
            <div className="emotion-bar">
              <div 
                className="emotion-bar-fill" 
                style={{ width: `${entry.intensity}%` }}
              />
            </div>
            <div className="emotion-row-meta">{entry.meta}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
