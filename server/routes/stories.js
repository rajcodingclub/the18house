const express = require('express');
const Story = require('../models/Story');

const router = express.Router();

// GET /api/stories -> active stories, in display order (public, no auth)
router.get('/', async (req, res) => {
  try {
    const stories = await Story.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json({ stories });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load stories.', error: err.message });
  }
});

module.exports = router;
