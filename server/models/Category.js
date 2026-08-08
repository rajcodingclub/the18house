const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    orderUrl: { type: String, default: '#order' }
  },
  { _id: true }
);

const categorySchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, trim: true }, // slug used by the frontend, e.g. "starters"
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    imagePosition: { type: String, enum: ['left', 'right'], default: 'left' },
    featuredImage: { type: String, required: true }, // Cloudinary secure_url (or a local /images/*.svg fallback)
    featuredImagePublicId: { type: String, default: null }, // Cloudinary public_id, set when uploaded via admin
    order: { type: Number, default: 0 },
    dishes: [dishSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
