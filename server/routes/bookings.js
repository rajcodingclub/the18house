const express = require('express');
const { body, validationResult } = require('express-validator');
const Booking = require('../models/Booking');

const router = express.Router();

const bookingValidators = [
  body('name').trim().notEmpty().withMessage('Name is required.'),
  body('email').trim().isEmail().withMessage('A valid email is required.'),
  body('phone').trim().notEmpty().withMessage('Phone number is required.'),
  body('date').trim().notEmpty().withMessage('Date is required.'),
  body('time').trim().notEmpty().withMessage('Time is required.'),
  body('message').optional({ checkFalsy: true }).trim()
];

// POST /api/bookings -> create a new table reservation
router.post('/', bookingValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation failed.', errors: errors.array() });
  }

  try {
    const { name, email, phone, date, time, message } = req.body;
    const booking = await Booking.create({ name, email, phone, date, time, message });
    res.status(201).json({ message: 'Booking received! We will confirm shortly.', booking });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save booking.', error: err.message });
  }
});

// GET /api/bookings -> list bookings (simple admin/back-office use)
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load bookings.', error: err.message });
  }
});

module.exports = router;
