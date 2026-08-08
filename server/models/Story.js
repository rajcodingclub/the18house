const mongoose = require('mongoose');

const storySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true }, // used as image alt text / caption
    imageUrl: { type: String, required: true }, // Cloudinary secure_url
    imagePublicId: { type: String, required: true }, // Cloudinary public_id, needed to delete later
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Story', storySchema);
