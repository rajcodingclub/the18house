const express = require('express');
const Subscriber = require('../../models/Subscriber');
const requireAdmin = require('../../middleware/requireAdmin');

const router = express.Router();

// GET /api/admin/subscribers -> all newsletter subscribers, newest first
router.get('/', requireAdmin, async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.json({ subscribers });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load subscribers.', error: err.message });
  }
});

// DELETE /api/admin/subscribers/:id
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const subscriber = await Subscriber.findByIdAndDelete(req.params.id);
    if (!subscriber) return res.status(404).json({ message: 'Subscriber not found.' });
    res.json({ message: 'Subscriber deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete subscriber.', error: err.message });
  }
});

module.exports = router;
