import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Routes
app.get('/api', (_req, res) => {
  res.json({ message: 'Welcome to MultiHub API' });
});

// Auth routes
app.use('/api/auth', authRoutes);

// Error handling
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
  console.log(`🔗 CORS enabled for ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  console.log(`📚 Routes initialized:`);
  console.log(`   POST /auth/login`);
  console.log(`   POST /auth/register`);
  console.log(`   POST /auth/logout`);
  console.log(`   POST /auth/refresh`);
  console.log(`   GET  /auth/me`);
});

export default app;
