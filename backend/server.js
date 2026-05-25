require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const workshopRoutes = require('./routes/workshops');
const personalRoutes = require('./routes/personal');
const adminRoutes = require('./routes/admin');
const seedDatabase = require('./seed');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const defaultAllowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://genalphacodes.vercel.app',
  'https://freeworkshopwith-pragyann-e9wpxqxcf.vercel.app'
];

const envAllowedOrigins = [
  process.env.CLIENT_URL,
  ...(process.env.CORS_ORIGINS || '').split(',')
]
  .map((origin) => (origin || '').trim())
  .filter(Boolean);

const allowedOrigins = new Set([
  ...defaultAllowedOrigins,
  ...envAllowedOrigins
]);

app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser tools and same-origin requests without an Origin header.
      if (!origin) return callback(null, true);

      if (allowedOrigins.has(origin)) {
        return callback(null, true);
      }

      // Allow Vercel production and preview deployments.
      if (/^https:\/\/pragyann(?:-.*)?\.vercel\.app$/.test(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true
  })
);
app.use(express.json());

// Routes
app.use('/api/workshops', workshopRoutes);
app.use('/api/personal', personalRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database:
      mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

if (process.env.NODE_ENV === 'production') {
  const frontendBuildPath = path.join(__dirname, '..', 'frontend', 'build');
  app.use(express.static(frontendBuildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });
}

// Start the web server first so deployment platforms can detect the open port.
app.listen(PORT, () => {
  console.log(`Pragyan server running on port ${PORT}`);
});

// Connect to MongoDB after the server is listening.
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pragyan';

mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await seedDatabase();
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
  });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on ${PORT}`));