import { Panel } from './Panel';

interface EmotionCheckInProps {
  value: string;
  onChange: (val: string) => void;
  onAnalyze: () => void;
  onOpenWebcam?: () => void;
}

export function EmotionCheckIn({ value, onChange, onAnalyze, onOpenWebcam }: EmotionCheckInProps) {
  const chips = [
    { label: 'Stressed', text: 'I feel drained, anxious, and mentally overloaded today.' },
    { label: 'Low Mood', text: 'I feel disconnected, tired, and low on motivation.' },
    { label: 'Need Focus', text: 'I feel okay overall, but I need help staying calm and focused.' }
  ];

  return (
    <Panel className="input-panel">
      <div className="panel-header">
        <div>
          <p className="section-label">Step 1</p>
          <h3>Emotion Check-In</h3>
        </div>
        <button 
          className="icon-button" 
          type="button" 
          aria-label="Open webcam"
          onClick={onOpenWebcam}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 4h6l1.2 2H20a2 2 0 0 1 2 2v9a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V8a2 2 0 0 1 2-2h3.8L9 4Zm3 14a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z" />
          </svg>
        </button>
      </div>

      <label className="textarea-label" htmlFor="emotionInput">How are you feeling today?</label>
      <textarea
        id="emotionInput"
        rows={8}
        placeholder="Example: I’ve been overwhelmed with deadlines, not sleeping well, and I feel anxious even when I try to relax."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <div className="toolbar">
        <div className="chip-row">
          {chips.map(chip => (
            <button 
              key={chip.label} 
              className="chip" 
              type="button"
              onClick={() => onChange(chip.text)}
            >
              {chip.label}
            </button>
          ))}
        </div>
        <button className="primary-button" type="button" onClick={onAnalyze}>
          Analyze Well-Being
        </button>
      </div>
    </Panel>
  );
}
