import { useState, useRef, useCallback } from 'react';
import * as faceapi from '@vladmandic/face-api';

function titleCase(value: string) {
  return value
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function useWebcam() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraStatus, setCameraStatus] = useState("Camera off");
  const [cameraMessage, setCameraMessage] = useState("Turn on the camera so the frontend can estimate facial emotion cues.");
  const [expressionOutput, setExpressionOutput] = useState("Waiting for capture");
  const [expressionHint, setExpressionHint] = useState("Uses on-device browser access for webcam preview and can be connected to a face emotion model such as face-api.js.");
  const [faceScore, setFaceScore] = useState(30); // Default to a neutral score
  const [faceApiReady, setFaceApiReady] = useState(false);

  const expressionScoreMap: Record<string, number> = {
    angry: 85,
    fearful: 80,
    disgusted: 70,
    sad: 65,
    surprised: 50,
    neutral: 30,
    happy: 15
  };

  const loadFaceApiModels = useCallback(async () => {
    try {
      const modelBase = "https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/";
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(modelBase),
        faceapi.nets.faceExpressionNet.loadFromUri(modelBase),
      ]);
      setFaceApiReady(true);
      setExpressionHint("Expression model loaded. Capture a frame.");
    } catch (error) {
      console.error("Face model failed to load:", error);
      setExpressionHint("Webcam works, but the face emotion model could not load.");
    }
  }, []);

  const startCamera = async () => {
    if (cameraStream) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraStream(stream);
      setCameraStatus("Camera on");
      setCameraMessage("Camera is live. Capture a frame.");
      await loadFaceApiModels();
    } catch (error) {
      console.error("Camera access failed:", error);
      setCameraStatus("Camera blocked");
      setCameraMessage("Camera permission was denied.");
    }
  };

  const stopCamera = () => {
    if (!cameraStream) return;
    cameraStream.getTracks().forEach((track) => track.stop());
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraStream(null);
    setCameraStatus("Camera off");
    setCameraMessage("Turn on the camera.");
  };

  const detectExpression = async (): Promise<number> => {
    if (!cameraStream || !videoRef.current) {
      setExpressionOutput("Start camera first");
      return 30;
    }

    if (faceApiReady) {
      try {
        const detection = await faceapi
          .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();

        if (detection?.expressions) {
          const sorted = Object.entries(detection.expressions).sort((a, b) => b[1] - a[1]);
          const [label, confidence] = sorted[0];
          const prettyLabel = `${titleCase(label)} (${Math.round(confidence * 100)}%)`;
          setExpressionOutput(prettyLabel);
          
          const mappedScore = expressionScoreMap[label] || 30;
          setFaceScore(mappedScore);
          
          return mappedScore;
        }
      } catch (error) {
        console.error("Expression detection failed:", error);
      }
    }

    const fallbackExpressions = ["Neutral", "Slightly tense", "Calm", "Low energy", "Focused"];
    const picked = fallbackExpressions[Math.floor(Math.random() * fallbackExpressions.length)];
    const result = `${picked} (demo estimate)`;
    setExpressionOutput(result);
    setExpressionHint("Showing a demo estimate because no live face expression result was returned.");
    
    // Fallback pseudo score extraction
    const fallbackScore = picked === "Slightly tense" ? 50 : picked === "Low energy" ? 60 : 30;
    setFaceScore(fallbackScore);
    
    return fallbackScore;
  };

  return {
    videoRef,
    cameraStatus,
    cameraMessage,
    expressionOutput,
    expressionHint,
    faceScore,
    startCamera,
    stopCamera,
    detectExpression,
  };
}
