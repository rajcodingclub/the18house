const express = require('express');
const Category = require('../models/Category');

const router = express.Router();

// GET /api/menu  -> all categories with their dishes, sorted for display
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ order: 1, name: 1 });
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load menu.', error: err.message });
  }
});

// GET /api/menu/:id -> a single category by its slug (e.g. "starters")
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findOne({ id: req.params.id });
    if (!category) return res.status(404).json({ message: 'Category not found.' });
    res.json({ category });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load category.', error: err.message });
  }
});

module.exports = router;
