const express = require('express');
const { body, validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const { sendBookingEmails } = require('../utils/mailer');

const router = express.Router();

const bookingValidators = [
  body('name').trim().notEmpty().withMessage('Name is required.'),
  body('email').trim().isEmail().withMessage('A valid email is required.'),
  body('phone').trim().notEmpty().withMessage('Phone number is required.'),
  body('date').trim().notEmpty().withMessage('Date is required.'),
  body('time').trim().notEmpty().withMessage('Time is required.'),
  body('message').optional({ checkFalsy: true }).trim()
];

// POST /api/bookings -> create a new table reservation (public).
// On success, emails the restaurant (thehouseof18th@gmail.com) with the
// full details, and sends a confirmation copy to the guest.
router.post('/', bookingValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation failed.', errors: errors.array() });
  }

  try {
    const { name, email, phone, date, time, message } = req.body;
    const booking = await Booking.create({ name, email, phone, date, time, message });

    // Don't let a slow/broken mail provider block the booking response.
    sendBookingEmails(booking).catch((err) =>
      console.error('[Bookings] Email dispatch failed:', err.message)
    );

    res.status(201).json({ message: 'Booking received! We will confirm shortly.', booking });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save booking.', error: err.message });
  }
});

// NOTE: listing/managing bookings now lives at /api/admin/bookings (auth required).

module.exports = router;
