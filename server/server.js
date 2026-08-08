require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

// Public routes
const menuRoutes = require('./routes/menu');
const bookingRoutes = require('./routes/bookings');
const subscribeRoutes = require('./routes/subscribe');
const storiesRoutes = require('./routes/stories');
const authRoutes = require('./routes/auth');

// Admin (protected) routes
const adminUploadRoutes = require('./routes/admin/upload');
const adminStoriesRoutes = require('./routes/admin/stories');
const adminCategoriesRoutes = require('./routes/admin/categories');
const adminBookingsRoutes = require('./routes/admin/bookings');
const adminSubscribersRoutes = require('./routes/admin/subscribers');

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

// Tighter limiter on login attempts to slow down brute-forcing
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api/auth/login', loginLimiter);

// --- Public routes ---
app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'the18house-api' }));
app.use('/api/menu', menuRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/subscribe', subscribeRoutes);
app.use('/api/stories', storiesRoutes);
app.use('/api/auth', authRoutes);

// --- Admin routes (all protected by requireAdmin inside each router) ---
app.use('/api/admin/upload', adminUploadRoutes);
app.use('/api/admin/stories', adminStoriesRoutes);
app.use('/api/admin/categories', adminCategoriesRoutes);
app.use('/api/admin/bookings', adminBookingsRoutes);
app.use('/api/admin/subscribers', adminSubscribersRoutes);

// --- 404 handler ---
app.use('/api', (req, res) => res.status(404).json({ message: 'Not found.' }));

// --- Error handler (also catches multer file errors) ---
app.use((err, req, res, next) => {
  console.error(err);
  if (err.message && err.message.includes('Only image files')) {
    return res.status(400).json({ message: err.message });
  }
  res.status(500).json({ message: 'Server error.' });
});

connectDB().then(() => {
  app.listen(PORT, () => console.log(`[Server] The 18 House API running on port ${PORT}`));
});
