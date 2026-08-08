const express = require('express');
const { body, validationResult } = require('express-validator');
const Category = require('../../models/Category');
const { deleteFromCloudinary } = require('../../config/cloudinary');
const requireAdmin = require('../../middleware/requireAdmin');

const router = express.Router();

// GET /api/admin/categories -> same data as the public endpoint, kept here too
// so the dashboard doesn't need a separate unauthenticated call.
router.get('/', requireAdmin, async (req, res) => {
  try {
    const categories = await Category.find().sort({ order: 1, name: 1 });
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load categories.', error: err.message });
  }
});

const categoryValidators = [
  body('id').trim().notEmpty().withMessage('A URL-safe slug (id) is required.'),
  body('name').trim().notEmpty().withMessage('Name is required.'),
  body('description').trim().notEmpty().withMessage('Description is required.'),
  body('featuredImage').trim().notEmpty().withMessage('A featured image is required — upload one first.')
];

// POST /api/admin/categories -> create a new menu category
router.post('/', requireAdmin, categoryValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation failed.', errors: errors.array() });
  }

  try {
    const { id, name, description, imagePosition, featuredImage, featuredImagePublicId, order } = req.body;

    const existing = await Category.findOne({ id });
    if (existing) {
      return res.status(409).json({ message: `A category with slug "${id}" already exists.` });
    }

    const category = await Category.create({
      id,
      name,
      description,
      imagePosition: imagePosition || 'left',
      featuredImage,
      featuredImagePublicId: featuredImagePublicId || null,
      order: order ?? 0,
      dishes: []
    });

    res.status(201).json({ message: 'Category created.', category });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create category.', error: err.message });
  }
});

// PUT /api/admin/categories/:categoryId -> update category fields (and optionally its image)
router.put('/:categoryId', requireAdmin, async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) return res.status(404).json({ message: 'Category not found.' });

    const { name, description, imagePosition, order, featuredImage, featuredImagePublicId } = req.body;

    if (featuredImage && featuredImagePublicId && featuredImagePublicId !== category.featuredImagePublicId) {
      if (category.featuredImagePublicId) await deleteFromCloudinary(category.featuredImagePublicId);
      category.featuredImage = featuredImage;
      category.featuredImagePublicId = featuredImagePublicId;
    }

    if (name !== undefined) category.name = name;
    if (description !== undefined) category.description = description;
    if (imagePosition !== undefined) category.imagePosition = imagePosition;
    if (order !== undefined) category.order = order;

    await category.save();
    res.json({ message: 'Category updated.', category });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update category.', error: err.message });
  }
});

// DELETE /api/admin/categories/:categoryId
router.delete('/:categoryId', requireAdmin, async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.categoryId);
    if (!category) return res.status(404).json({ message: 'Category not found.' });
    if (category.featuredImagePublicId) await deleteFromCloudinary(category.featuredImagePublicId);
    res.json({ message: 'Category deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete category.', error: err.message });
  }
});

// ---- Dishes (sub-documents within a category) ----

const dishValidators = [
  body('title').trim().notEmpty().withMessage('Dish title is required.'),
  body('description').trim().notEmpty().withMessage('Dish description is required.')
];

// POST /api/admin/categories/:categoryId/dishes -> add a dish to a category
router.post('/:categoryId/dishes', requireAdmin, dishValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation failed.', errors: errors.array() });
  }

  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) return res.status(404).json({ message: 'Category not found.' });

    const { title, description, orderUrl } = req.body;
    category.dishes.push({ title, description, orderUrl: orderUrl || '#order' });
    await category.save();

    res.status(201).json({ message: 'Dish added.', category });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add dish.', error: err.message });
  }
});

// PUT /api/admin/categories/:categoryId/dishes/:dishId -> update a dish
router.put('/:categoryId/dishes/:dishId', requireAdmin, async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) return res.status(404).json({ message: 'Category not found.' });

    const dish = category.dishes.id(req.params.dishId);
    if (!dish) return res.status(404).json({ message: 'Dish not found.' });

    const { title, description, orderUrl } = req.body;
    if (title !== undefined) dish.title = title;
    if (description !== undefined) dish.description = description;
    if (orderUrl !== undefined) dish.orderUrl = orderUrl;

    await category.save();
    res.json({ message: 'Dish updated.', category });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update dish.', error: err.message });
  }
});

// DELETE /api/admin/categories/:categoryId/dishes/:dishId
router.delete('/:categoryId/dishes/:dishId', requireAdmin, async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) return res.status(404).json({ message: 'Category not found.' });

    const dish = category.dishes.id(req.params.dishId);
    if (!dish) return res.status(404).json({ message: 'Dish not found.' });

    dish.deleteOne();
    await category.save();
    res.json({ message: 'Dish deleted.', category });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete dish.', error: err.message });
  }
});

module.exports = router;
