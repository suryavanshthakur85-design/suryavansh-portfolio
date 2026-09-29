import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createApiApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json({ limit: '15mb' }));
  app.use(express.urlencoded({ extended: true, limit: '15mb' }));

  // Static uploads folder
  const uploadsDir = path.join(__dirname, 'uploads');
  app.use('/uploads', express.static(uploadsDir));

  // Mount API endpoints
  app.use('/api/auth', authRoutes);
  app.use('/api/portfolio', portfolioRoutes);

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  return app;
};

export const apiApp = createApiApp();
