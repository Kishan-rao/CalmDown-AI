import { useState } from 'react';
import './index.css';

import { PageShell } from './components/PageShell';
import { HeroSection } from './components/HeroSection';
import { EmotionCheckIn } from './components/EmotionCheckIn';
import { WebcamPanel } from './components/WebcamPanel';
import { AnalysisDashboard } from './components/AnalysisDashboard';
import { RecommendationGrid } from './components/RecommendationGrid';
import { SupportResponse } from './components/SupportResponse';
import { BreathingPanel } from './components/BreathingPanel';

import { useWebcam } from './hooks/useWebcam';
import { useMoodHistory } from './hooks/useMoodHistory';
import { analyzeText, recommendationLibrary } from './utils/analyzeText';

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function App() {
  const [inputText, setInputText] = useState('');
  const [isBreathingOpen, setIsBreathingOpen] = useState(false);
  // Custom hooks
  const webcam = useWebcam();
  const { moodHistory, addMoodEntry } = useMoodHistory();

  // Local dashboard state (based on local heuristic + backend merged)
  const [moodLabel, setMoodLabel] = useState('Balanced');
  const [stressScore, setStressScore] = useState(34);
  const [summary, setSummary] = useState('Your check-ins, tone, and facial cues are used to estimate how supported you may need to feel right now.');
  const [sentimentLabel, setSentimentLabel] = useState('Neutral');
  const [sentimentScore, setSentimentScore] = useState(50);
  const [risk, setRisk] = useState('Low');
  const [supportMode, setSupportMode] = useState('Gentle check-in');
  const [supportText, setSupportText] = useState('Share a check-in above to receive a supportive response, risk summary, and calming next steps.');
  const [recommendations, setRecommendations] = useState(recommendationLibrary.low);
  const [spectrumEntries, setSpectrumEntries] = useState<{label: string, intensity: number, meta: string}[]>([]);

  const handleAnalyze = async () => {
    // Fallback/base local heuristic
    const localResult = analyzeText(inputText);
    const expression = webcam.expressionOutput.toLowerCase();
    const positiveFaceDetected = expression.includes('happy') || expression.includes('calm');
    const negativeFaceDetected =
      expression.includes('angry') ||
      expression.includes('fear') ||
      expression.includes('sad') ||
      expression.includes('tense');

    // Backend API Logic from Aura
    let finalSupportText = localResult.response;
    let finalRecommendations = localResult.recommendations;
    let finalMood = localResult.emotion;
    let textScore = localResult.stress;

    try {
      const response = await fetch('http://localhost:3000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputText }),
      });

      if (response.ok) {
        const data = await response.json();
        // Override local with Aura's deeper API insight
        finalSupportText = data.supportive_response + " " + (data.early_warning ? `🚨 Warning: ${data.early_warning}. ` : "") + "\n\nInsight: " + data.emotional_insight;
        finalMood = data.mood || localResult.emotion;
        textScore = data.stress_score ? data.stress_score * 10 : localResult.stress;
        
        // Push backend's suggested actions into the recommendation array
        if (data.suggested_actions && data.suggested_actions.length > 0) {
           finalRecommendations = finalRecommendations.map((rec, i) => {
             if (data.suggested_actions[i]) {
               return { ...rec, text: data.suggested_actions[i] };
             }
             return rec;
           });
        }
      }
    } catch (err) {
      console.warn("Backend API failed. Falling back to local heuristics.", err);
    }

    // Phase 6: Multimodal Fusion
    const finalStress = clamp((textScore * 0.7) + (webcam.faceScore * 0.3), 0, 100);
    let finalSentimentScore = localResult.sentiment;
    let finalSentimentLabel = localResult.sentiment >= 60 ? 'Positive' : localResult.sentiment >= 35 ? 'Mixed' : 'Negative';
    let finalRisk = localResult.risk;
    let finalSupportMode = localResult.support;

    if (positiveFaceDetected && localResult.sentiment >= 50 && finalStress <= 25) {
      finalMood = 'Happy';
      finalSentimentScore = Math.max(localResult.sentiment, 72);
      finalSentimentLabel = 'Positive';
      finalRisk = 'Low';
      finalSupportMode = 'Mood maintenance';
    } else if (localResult.sentiment >= 75 && finalStress <= 30) {
      finalMood = 'Happy';
      finalSentimentLabel = 'Positive';
      finalRisk = 'Low';
      finalSupportMode = 'Mood maintenance';
    } else if (positiveFaceDetected && finalStress <= 30) {
      finalMood = finalMood === 'Neutral' || finalMood === 'Reflective' ? 'Stable' : finalMood;
      finalSentimentScore = Math.max(localResult.sentiment, 60);
      finalSentimentLabel = 'Positive';
      finalRisk = 'Low';
    } else if (negativeFaceDetected && finalStress >= 45) {
      finalSentimentLabel = localResult.sentiment >= 35 ? 'Mixed' : 'Negative';
    }

    setMoodLabel(finalMood);
    setStressScore(finalStress);
    setSummary(`API response integrated. Facial cue: ${webcam.expressionOutput}.`);
    setSentimentLabel(finalSentimentLabel);
    setSentimentScore(finalSentimentScore);
    setRisk(finalRisk);
    setSupportMode(finalSupportMode);
    setSupportText(finalSupportText);
    setRecommendations(finalRecommendations);

    // Build the Emotion Spectrum intensity bars
    setSpectrumEntries([
      { label: "Sentiment Depth", intensity: finalSentimentScore, meta: "Intensity of positive/negative tone keywords." },
      { label: "Distress Index", intensity: finalStress, meta: "Combined physiological and semantic tension." },
      { label: "Mental Clarity", intensity: Math.max(0, 100 - finalStress + 10), meta: "Estimated baseline stability and focus." }
    ]);

    addMoodEntry(finalStress, finalMood, finalSentimentScore);
  };

  const handleDemoFill = () => {
    setInputText("I have been feeling overwhelmed with classes and deadlines. I am tired, anxious, and finding it hard to switch off my thoughts at night.");
    handleAnalyze();
  };

  return (
    <PageShell>
      <HeroSection
        onDemoFill={handleDemoFill}
        onBreathingStart={() => setIsBreathingOpen(true)}
        moodLabel={moodLabel}
        stressScore={Math.round(stressScore)}
        summary={summary}
        sentiment={sentimentLabel}
        risk={risk}
      />

      <main className="content-grid animate-in" style={{ animationDelay: '0.1s' }}>
        <EmotionCheckIn
          value={inputText}
          onChange={setInputText}
          onAnalyze={handleAnalyze}
          onOpenWebcam={webcam.startCamera}
          spectrumEntries={spectrumEntries}
        />

        <WebcamPanel
          cameraStatus={webcam.cameraStatus}
          cameraMessage={webcam.cameraMessage}
          expressionOutput={webcam.expressionOutput}
          expressionHint={webcam.expressionHint}
          onStart={webcam.startCamera}
          onStop={webcam.stopCamera}
          onCapture={async () => {
            await webcam.detectExpression();
            if (inputText) handleAnalyze();
          }}
          videoRef={webcam.videoRef}
          confidenceEntries={webcam.expressionConfidences}
          dominantExpression={moodLabel}
        />

        <AnalysisDashboard
          dominantEmotion={moodLabel}
          sentimentScore={Math.round(sentimentScore)}
          stressIndex={Math.round(stressScore)}
          supportMode={supportMode}
          moodHistory={moodHistory}
        />

        <RecommendationGrid recommendations={recommendations} />

        <SupportResponse response={supportText} />
      </main>

      {isBreathingOpen && (
        <BreathingPanel onClose={() => setIsBreathingOpen(false)} />
      )}
    </PageShell>
  );
}

export default App;
