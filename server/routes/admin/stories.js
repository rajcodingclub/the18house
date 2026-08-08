const express = require('express');
const { body, validationResult } = require('express-validator');
const Story = require('../../models/Story');
const { deleteFromCloudinary } = require('../../config/cloudinary');
const requireAdmin = require('../../middleware/requireAdmin');

const router = express.Router();

const storyValidators = [
  body('title').trim().notEmpty().withMessage('Title is required.'),
  body('imageUrl').trim().notEmpty().withMessage('Image is required — upload one first.'),
  body('imagePublicId').trim().notEmpty().withMessage('Missing Cloudinary public id.')
];

// GET /api/admin/stories -> list all stories (active + inactive) for the dashboard
router.get('/', requireAdmin, async (req, res) => {
  try {
    const stories = await Story.find().sort({ order: 1, createdAt: -1 });
    res.json({ stories });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load stories.', error: err.message });
  }
});

// POST /api/admin/stories -> create a story (after the image has been uploaded)
router.post('/', requireAdmin, storyValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation failed.', errors: errors.array() });
  }

  try {
    const { title, imageUrl, imagePublicId, order, isActive } = req.body;
    const story = await Story.create({
      title,
      imageUrl,
      imagePublicId,
      order: order ?? 0,
      isActive: isActive ?? true
    });
    res.status(201).json({ message: 'Story added.', story });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create story.', error: err.message });
  }
});

// PUT /api/admin/stories/:id -> update a story (optionally replacing its image)
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ message: 'Story not found.' });

    const { title, imageUrl, imagePublicId, order, isActive } = req.body;

    // If a new image was uploaded, remove the old Cloudinary asset
    if (imageUrl && imagePublicId && imagePublicId !== story.imagePublicId) {
      await deleteFromCloudinary(story.imagePublicId);
      story.imageUrl = imageUrl;
      story.imagePublicId = imagePublicId;
    }

    if (title !== undefined) story.title = title;
    if (order !== undefined) story.order = order;
    if (isActive !== undefined) story.isActive = isActive;

    await story.save();
    res.json({ message: 'Story updated.', story });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update story.', error: err.message });
  }
});

// DELETE /api/admin/stories/:id
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const story = await Story.findByIdAndDelete(req.params.id);
    if (!story) return res.status(404).json({ message: 'Story not found.' });
    await deleteFromCloudinary(story.imagePublicId);
    res.json({ message: 'Story deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete story.', error: err.message });
  }
});

module.exports = router;
