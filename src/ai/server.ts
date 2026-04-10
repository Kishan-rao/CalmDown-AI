import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { runEmotionalPipeline } from './pipeline.js';
import { PipelineInputSchema } from '../types.js';

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────

app.use(cors());
app.use(express.json());

// ─── Routes ───────────────────────────────────────────────────────────────────

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'emotional-intelligence-pipeline' });
});

// Main analysis endpoint
app.post('/analyze', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate input
    const inputResult = PipelineInputSchema.safeParse(req.body);
    if (!inputResult.success) {
      res.status(400).json({
        error: 'Invalid input',
        details: inputResult.error.flatten(),
      });
      return;
    }

    const { message } = inputResult.data;
    const output = await runEmotionalPipeline(message);

    res.json(output);
  } catch (err) {
    next(err);
  }
});

// ─── Error Handler ────────────────────────────────────────────────────────────

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Pipeline Error]', err.message);
  res.status(500).json({
    error: 'Pipeline processing failed',
    message: err.message,
  });
});

export default app;
