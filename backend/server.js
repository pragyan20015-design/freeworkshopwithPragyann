require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const workshopRoutes = require('./routes/workshops');
const personalRoutes = require('./routes/personal');
const adminRoutes = require('./routes/admin');
const seedDatabase = require('./seed');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/workshops', workshopRoutes);
app.use('/api/personal', personalRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Connect to MongoDB then start server
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pragyan';

mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await seedDatabase();
    app.listen(PORT, () => {
      console.log(`Pragyan server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
