const express = require('express');
const mongoose = require('mongoose');
const exploredRouter = require('./router/elxploredData.router.js');
require('dotenv').config();
const cors = require('cors');

const app = express();

mongoose
  .connect(process.env.connectionstr)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());

// CORS configuration
const allowedOrigins = ['https://taskui-lemon.vercel.app']; // Replace with your frontend domain
if (process.env.NODE_ENV !== 'production') {
  allowedOrigins.push('http://localhost:5173');
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(Origin ${origin} not allowed by CORS));
      }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: false,
  })
);

// Routes
app.use('/api', exploredRouter); // Mount the router on a specific path, e.g., /api

// Health check route for Vercel
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Export for Vercel serverless functions
module.exports = app;

// Start server only if not running in Vercel
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 9000;
  app.listen(PORTlives, () => {
    console.log(Server is running on port ${PORT});
  });
}
