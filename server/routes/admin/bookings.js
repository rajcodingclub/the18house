const express = require('express');
const Booking = require('../../models/Booking');
const requireAdmin = require('../../middleware/requireAdmin');

const router = express.Router();

// GET /api/admin/bookings -> all reservations, newest first
router.get('/', requireAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load bookings.', error: err.message });
  }
});

// PATCH /api/admin/bookings/:id -> update status (pending/confirmed/cancelled)
router.patch('/:id', requireAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' });
    }

    const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!booking) return res.status(404).json({ message: 'Booking not found.' });

    res.json({ message: 'Booking updated.', booking });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update booking.', error: err.message });
  }
});

// DELETE /api/admin/bookings/:id
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found.' });
    res.json({ message: 'Booking deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete booking.', error: err.message });
  }
});

module.exports = router;
