const express = require('express');
const { body, validationResult } = require('express-validator');
const Admin = require('../models/Admin');
const { signToken } = require('../utils/jwt');
const requireAdmin = require('../middleware/requireAdmin');

const router = express.Router();

// POST /api/auth/login
router.post(
  '/login',
  [
    body('email').trim().isEmail().withMessage('A valid email is required.'),
    body('password').notEmpty().withMessage('Password is required.')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed.', errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      const admin = await Admin.findOne({ email: email.toLowerCase() }).select('+password');

      if (!admin || !(await admin.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }

      const token = signToken(admin);
      res.json({
        message: 'Login successful.',
        token,
        admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role }
      });
    } catch (err) {
      res.status(500).json({ message: 'Login failed.', error: err.message });
    }
  }
);

// GET /api/auth/me -> confirms the current token is valid and returns the admin
router.get('/me', requireAdmin, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) return res.status(404).json({ message: 'Admin not found.' });
    res.json({ admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role } });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load session.', error: err.message });
  }
});

module.exports = router;
