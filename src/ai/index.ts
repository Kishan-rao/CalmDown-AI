// Entry point — loads env vars and starts the Express server
import 'dotenv/config';
import app from './server.js';

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`🧠 Emotional Intelligence API running on http://localhost:${PORT}`);
});
