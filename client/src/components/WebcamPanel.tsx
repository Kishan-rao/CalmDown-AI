import { Panel } from './Panel';
import { ExpressionConfidence } from './ExpressionConfidence';

interface ConfidenceEntry {
  label: string;
  value: number;
}

interface WebcamPanelProps {
  cameraStatus: string;
  cameraMessage: string;
  expressionOutput: string;
  expressionHint: string;
  onStart: () => void;
  onStop: () => void;
  onCapture: () => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  confidenceEntries?: ConfidenceEntry[];
  dominantExpression?: string;
}

export function WebcamPanel({ 
  cameraStatus, 
  cameraMessage, 
  expressionOutput, 
  expressionHint,
  onStart,
  onStop,
  onCapture,
  videoRef,
  confidenceEntries = [],
  dominantExpression = 'Neutral'
}: WebcamPanelProps) {
  const quotes = [
    { text: "You may not control all the events that happen to you, but you can decide not to be reduced by them.", author: "Maya Angelou" },
    { text: "When we are no longer able to change a situation, we are challenged to change ourselves.", author: "Viktor E. Frankl" },
    { text: "There is hope, even when your brain tells you there isn't.", author: "John Green" },
    { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { text: "You must do the thing you think you cannot do.", author: "Eleanor Roosevelt" }
  ];
  return (
    <Panel className="webcam-panel">
      <div className="panel-header">
        <div>
          <p className="section-label">Step 2</p>
          <h3>Facial Expression Check</h3>
        </div>
        <span className="status-pill">{cameraStatus}</span>
      </div>

      <div className="camera-frame">
        <video ref={videoRef} autoPlay muted playsInline></video>
        <div className="camera-overlay" style={{ display: cameraStatus === 'Camera on' ? 'none' : 'grid' }}>
          <p>{cameraMessage}</p>
          <button className="secondary-button" type="button" onClick={onStart}>
            Start Camera
          </button>
        </div>
      </div>

      <div className="camera-actions">
        <button className="ghost-button" type="button" onClick={onCapture}>Capture Expression</button>
        <button className="ghost-button" type="button" onClick={onStop}>Stop Camera</button>
      </div>

      <div className="expression-result">
        <span>Detected expression</span>
        <strong>{expressionOutput}</strong>
        <p>{expressionHint}</p>
      </div>

      <div className="expression-confidence-container" style={{ marginTop: '24px' }}>
        <ExpressionConfidence 
          confidences={confidenceEntries} 
          dominantExpression={dominantExpression} 
        />
        {confidenceEntries.length === 0 && (
          <p className="small-note" style={{ marginTop: '12px', textAlign: 'center' }}>
            Capture a frame to see the Vision AI confidence map across all expressions.
          </p>
        )}
      </div>

      <div className="quote-stack">
        {quotes.map((q, i) => (
          <article key={i} className="quote-card">
            <p className="quote-text">"{q.text}"</p>
            <p className="quote-author">{q.author}</p>
          </article>
        ))}
      </div>
    </Panel>
  );
}
