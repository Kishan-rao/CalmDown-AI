import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Panel } from './Panel';
import { EmotionBar } from './EmotionBar';
import type { EmotionMetric } from './EmotionBar';

interface EmotionIntensitySectionProps {
  isAnalyzed: boolean;
  metrics: EmotionMetric[];
}

export const EmotionIntensitySection: React.FC<EmotionIntensitySectionProps> = ({ 
  isAnalyzed, 
  metrics 
}) => {
  const showContent = isAnalyzed && metrics.length > 0;

  return (
    <AnimatePresence>
      {showContent && (
        <motion.div
          initial={{ height: 0, opacity: 0, marginBottom: 0 }}
          animate={{ 
            height: 'auto', 
            opacity: 1, 
            marginBottom: 24,
            transition: { 
              height: { duration: 0.5, ease: "easeOut" },
              opacity: { duration: 0.3, delay: 0.2 }
            }
          }}
          exit={{ height: 0, opacity: 0, marginBottom: 0 }}
          style={{ perspective: 1000 }}
        >
          <Panel className="emotion-spectrum-card">
            <div className="panel-header" style={{ marginBottom: '20px' }}>
              <div>
                <span className="section-label">Intensity Metrics</span>
                <h3>Emotion Spectrum</h3>
              </div>
              <div className="status-pill">AI Confidence Map</div>
            </div>

            <div className="emotion-spectrum-list" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
              gap: '20px' 
            }}>
              {metrics.map((metric, idx) => (
                <motion.div
                  key={metric.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ 
                    x: 0, 
                    opacity: 1,
                    transition: { delay: 0.1 * idx + 0.3 }
                  }}
                >
                  <EmotionBar metric={metric} />
                </motion.div>
              ))}
            </div>
          </Panel>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
