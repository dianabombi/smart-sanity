const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://smart_sanit:nxZhWiJpURb61y54@cluster0.lhm3dkv.mongodb.net/smart_sanit';

// Connect to MongoDB only if not already connected
if (mongoose.connection.readyState === 0) {
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));
}

// Import routes
const authRoutes = require('./routes/auth');
const brandRoutes = require('./routes/brands');
const contentRoutes = require('./routes/content');

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/content', contentRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

// Default API route
app.get('/api', (req, res) => {
  res.json({ message: 'Smart Sanit API Server' });
});

// Export for Vercel
module.exports = app;
