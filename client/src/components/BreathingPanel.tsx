import { useState, useEffect } from 'react';

interface BreathingPanelProps {
  onClose: () => void;
}

export function BreathingPanel({ onClose }: BreathingPanelProps) {
  const [inhale, setInhale] = useState(true);

  useEffect(() => {
    // 4-second breathing cycle
    const interval = setInterval(() => {
      setInhale((prev) => !prev);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="breathing-overlay">
      <div className="breathing-panel">
        <button 
          className="icon-button close-breathing" 
          onClick={onClose} 
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
        
        <div className="breathing-container">
          <div className={`breathing-circle ${inhale ? 'inhale' : 'exhale'}`}></div>
          <h2 className="breathing-text">{inhale ? 'Breathe In' : 'Breathe Out'}</h2>
        </div>
      </div>
    </div>
  );
}
