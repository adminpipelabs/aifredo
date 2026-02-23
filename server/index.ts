import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import botRoutes from './routes/bots.js';
import paymentRoutes from './routes/payments.js';
import claimRoutes from './routes/claims.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = parseInt(process.env.PORT || '4000', 10);

app.use(cors());

// Stripe webhook needs raw body — must be before express.json()
app.post('/api/payments/webhook', express.raw({ type: 'application/json' }), (req, res, next) => {
  // Route to payments handler — body is raw Buffer
  next();
});

app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/bots', botRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/claims', claimRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Serve frontend in production
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));
// SPA fallback — serve index.html for all non-API routes
app.use((_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[agentforge] API server running on port ${PORT}`);
});
