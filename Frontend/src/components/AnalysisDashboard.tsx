import { Panel } from './Panel';

interface MoodEntry {
  day: string;
  value: number;
  emotion?: string;
  sentiment?: number;
}

interface AnalysisDashboardProps {
  dominantEmotion: string;
  sentimentScore: number;
  stressIndex: number;
  supportMode: string;
  moodHistory: MoodEntry[];
}

const GRAPH_W = 600;
const GRAPH_H = 160;
const PAD_LEFT = 40;
const PAD_RIGHT = 20;
const PAD_TOP = 16;
const PAD_BOTTOM = 32;
const PLOT_W = GRAPH_W - PAD_LEFT - PAD_RIGHT;
const PLOT_H = GRAPH_H - PAD_TOP - PAD_BOTTOM;

function toPoint(index: number, total: number, score: number): [number, number] {
  const x = PAD_LEFT + (total === 1 ? PLOT_W / 2 : (index / (total - 1)) * PLOT_W);
  const y = PAD_TOP + PLOT_H - (score / 100) * PLOT_H;
  return [x, y];
}

export function AnalysisDashboard({
  dominantEmotion,
  sentimentScore,
  stressIndex,
  supportMode,
  moodHistory,
}: AnalysisDashboardProps) {
  const n = moodHistory.length;

  // Build SVG path
  const points = moodHistory.map((e, i) =>
    toPoint(i, n, e.sentiment ?? e.value)
  );

  const pathD =
    n === 0
      ? ''
      : n === 1
      ? `M ${points[0][0]} ${points[0][1]}`
      : points
          .map((p, i) => {
            if (i === 0) return `M ${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
            const prev = points[i - 1];
            const cpX = ((prev[0] + p[0]) / 2).toFixed(1);
            return `C ${cpX} ${prev[1].toFixed(1)}, ${cpX} ${p[1].toFixed(1)}, ${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
          })
          .join(' ');

  // Filled area under line
  const fillD =
    n < 2
      ? ''
      : `${pathD} L ${points[n - 1][0].toFixed(1)} ${(PAD_TOP + PLOT_H).toFixed(1)} L ${PAD_LEFT.toFixed(1)} ${(PAD_TOP + PLOT_H).toFixed(1)} Z`;

  // Y-axis grid lines at 0, 25, 50, 75, 100
  const gridLines = [100, 75, 50, 25, 0];

  return (
    <Panel className="dashboard-panel">
      <div className="panel-header">
        <div>
          <p className="section-label">Step 3</p>
          <h3>Sentiment &amp; Risk Overview</h3>
        </div>
      </div>

      <div className="analysis-cards">
        <article className="stat-card">
          <span>Dominant emotion</span>
          <strong>{dominantEmotion}</strong>
        </article>
        <article className="stat-card">
          <span>Sentiment score</span>
          <strong>{sentimentScore} / 100</strong>
        </article>
        <article className="stat-card">
          <span>Stress index</span>
          <strong>{stressIndex} / 100</strong>
        </article>
        <article className="stat-card">
          <span>Recommended support</span>
          <strong>{supportMode}</strong>
        </article>
      </div>

      <div className="mood-chart-card">
        <div className="mood-chart-header">
          <div>
            <span className="section-label">Mood Tracking</span>
            <h4>Weekly emotional trend</h4>
          </div>
          <span className="small-note">Updates after every analysis</span>
        </div>

        {/* Legend */}
        <div className="mood-legend">
          <span className="mood-legend-pill mood-legend-positive">Positive</span>
          <span className="mood-legend-pill mood-legend-neutral">Neutral</span>
          <span className="mood-legend-pill mood-legend-negative">Negative</span>
        </div>

        {/* SVG Line Graph */}
        <div className="line-graph-wrapper">
          <svg
            viewBox={`0 0 ${GRAPH_W} ${GRAPH_H}`}
            preserveAspectRatio="none"
            className="line-graph-svg"
            aria-label="Weekly emotional trend line graph"
          >
            <defs>
              <linearGradient id="lineAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#327c74" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#327c74" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {/* Horizontal grid lines */}
            {gridLines.map((val) => {
              const y = PAD_TOP + PLOT_H - (val / 100) * PLOT_H;
              return (
                <g key={val}>
                  <line
                    x1={PAD_LEFT}
                    y1={y}
                    x2={GRAPH_W - PAD_RIGHT}
                    y2={y}
                    className="graph-grid-line"
                  />
                  <text x={PAD_LEFT - 6} y={y + 4} className="graph-y-label">
                    {val}
                  </text>
                </g>
              );
            })}

            {/* Filled area */}
            {fillD && (
              <path d={fillD} fill="url(#lineAreaGrad)" />
            )}

            {/* Trend line */}
            {pathD && (
              <path
                d={pathD}
                fill="none"
                className="graph-trend-line"
              />
            )}

            {/* Data points + day labels */}
            {points.map(([x, y], i) => {
              const entry = moodHistory[i];
              const score = entry.sentiment ?? entry.value;
              return (
                <g key={i} className="graph-point-group">
                  {/* Outer glow ring */}
                  <circle cx={x} cy={y} r={9} fill="#327c74" opacity={0.15} />
                  {/* Main dot */}
                  <circle
                    cx={x}
                    cy={y}
                    r={5}
                    fill="#327c74"
                    stroke="#fff"
                    strokeWidth={2}
                    className="graph-dot"
                  />
                  {/* Tooltip on hover */}
                  <title>{`${entry.day}: ${entry.emotion ?? 'Neutral'} (${score})`}</title>
                  {/* Day label */}
                  <text
                    x={x}
                    y={PAD_TOP + PLOT_H + 18}
                    textAnchor="middle"
                    className="graph-x-label"
                  >
                    {entry.day}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

    </Panel>
  );
}
