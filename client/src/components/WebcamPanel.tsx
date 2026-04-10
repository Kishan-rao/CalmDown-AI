
import { Panel } from './Panel';

interface WebcamPanelProps {
  cameraStatus: string;
  cameraMessage: string;
  expressionOutput: string;
  expressionHint: string;
  onStart: () => void;
  onStop: () => void;
  onCapture: () => void;
  videoRef: React.RefObject<HTMLVideoElement>;
}

export function WebcamPanel({ 
  cameraStatus, 
  cameraMessage, 
  expressionOutput, 
  expressionHint,
  onStart,
  onStop,
  onCapture,
  videoRef
}: WebcamPanelProps) {
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
    </Panel>
  );
}
