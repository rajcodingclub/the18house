require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

const menuRoutes = require('./routes/menu');
const bookingRoutes = require('./routes/bookings');
const subscribeRoutes = require('./routes/subscribe');

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(',');
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic rate limiting for the write-heavy public endpoints
const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api/bookings', writeLimiter);
app.use('/api/subscribe', writeLimiter);

// --- Routes ---
app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'the18house-api' }));
app.use('/api/menu', menuRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/subscribe', subscribeRoutes);

// --- 404 handler ---
app.use('/api', (req, res) => res.status(404).json({ message: 'Not found.' }));

// --- Error handler ---
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error.' });
});

connectDB().then(() => {
  app.listen(PORT, () => console.log(`[Server] The 18 House API running on port ${PORT}`));
});
