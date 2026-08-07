const express = require('express');
const { body, validationResult } = require('express-validator');
const Subscriber = require('../models/Subscriber');

const router = express.Router();

// POST /api/subscribe -> footer email subscribe form
router.post('/', [body('email').trim().isEmail().withMessage('A valid email is required.')], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation failed.', errors: errors.array() });
  }

  try {
    const { email } = req.body;
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(200).json({ message: 'You are already subscribed!' });
    }
    await Subscriber.create({ email });
    res.status(201).json({ message: 'Subscribed successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to subscribe.', error: err.message });
  }
});

module.exports = router;
