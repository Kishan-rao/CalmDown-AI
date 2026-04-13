import React from 'react';
import { Panel } from './Panel';

export interface MoodOption {
  emoji: string;
  label: string;
  text: string;
}

interface MoodSelectorProps {
  onSelect: (text: string) => void;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({ onSelect }) => {
  const moods: MoodOption[] = [
    { emoji: '😊', label: 'Happy', text: "I'm feeling really positive, happy, and balanced today." },
    { emoji: '😟', label: 'Anxious', text: "I'm feeling a bit anxious and worried about things right now." },
    { emoji: '😔', label: 'Sad', text: "I'm feeling quite low, sad, and disconnected today." },
    { emoji: '😤', label: 'Stressed', text: "I'm feeling very stressed, overwhelmed, and under pressure." },
    { emoji: '😌', label: 'Calm', text: "I'm feeling calm, peaceful, and mentally clear." }
  ];

  return (
    <Panel className="mood-selector-tray">
      <div className="panel-header" style={{ marginBottom: '16px' }}>
        <div>
          <span className="section-label">Quick Actions</span>
          <h3>Mood Shortcuts</h3>
        </div>
        <div className="status-pill">One-Tap Entry</div>
      </div>
      
      <div className="mood-chip-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
        gap: '12px' 
      }}>
        {moods.map((mood) => (
          <button
            key={mood.label}
            className="chip mood-chip"
            type="button"
            onClick={() => onSelect(mood.text)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px',
              fontSize: '0.92rem',
              fontWeight: 600,
              width: '100%',
              justifyContent: 'center'
            }}
          >
            <span style={{ fontSize: '1.4rem' }}>{mood.emoji}</span>
            {mood.label}
          </button>
        ))}
      </div>
      
      <p className="small-note" style={{ marginTop: '16px', textAlign: 'center' }}>
        Select a mood to pre-fill your check-in and trigger immediate analysis.
      </p>
    </Panel>
  );
};
