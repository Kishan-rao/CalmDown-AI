

interface HeroSectionProps {
  onDemoFill?: () => void;
  onBreathingStart?: () => void;
  moodLabel?: string;
  stressScore?: number;
  summary?: string;
  sentiment?: string;
  risk?: string;
}

export function HeroSection({
  onDemoFill,
  onBreathingStart,
  moodLabel = 'Balanced',
  stressScore = 0,
  summary = 'Your check-ins, tone, and facial cues are used to estimate how supported you may need to feel right now.',
  sentiment = 'Neutral',
  risk = 'Low'
}: HeroSectionProps) {
  return (
    <header className="hero">
      <nav className="topbar">
        <div className="brand-lockup">
          <span className="brand-mark">C</span>
          <div>
            <p className="eyebrow">AI-powered emotional support</p>
            <h1>CalmDown AI</h1>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <button className="ghost-button" type="button" onClick={onDemoFill}>
            Try Demo Input
          </button>
          <button className="secondary-button" type="button" onClick={onBreathingStart}>
            Breathing Exercise
          </button>
        </div>
      </nav>

      <section className="hero-grid">
        <div className="hero-copy">
          <p className="section-label">Detect. Understand. Support.</p>
          <h2>Calms your emotions</h2>
          <p className="hero-text">
            This interface combines written emotion check-ins, webcam-based expression sensing,
            mood tracking, and personalized recommendations for breathing, books, music, and
            lighter routines.
          </p>

          <div className="hero-badges">
            <span>Text sentiment analysis</span>
            <span>Facial expression capture</span>
            <span>Mood history dashboard</span>
            <span>Support recommendations</span>
          </div>
        </div>

        <aside className="hero-card">
          <p className="card-kicker">Live support snapshot</p>
          <div className="hero-score">
            <span>{moodLabel}</span>
            <strong>{stressScore}%</strong>
          </div>
          <p>{summary}</p>
          <div className="hero-metrics">
            <div>
              <span>Sentiment</span>
              <strong>{sentiment}</strong>
            </div>
            <div>
              <span>Distress risk</span>
              <strong>{risk}</strong>
            </div>
          </div>
        </aside>
      </section>
    </header>
  );
}
