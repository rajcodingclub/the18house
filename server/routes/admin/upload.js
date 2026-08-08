const express = require('express');
const requireAdmin = require('../../middleware/requireAdmin');
const upload = require('../../middleware/upload');
const { uploadBufferToCloudinary } = require('../../config/cloudinary');

const router = express.Router();

// POST /api/admin/upload  (field name: "image")
// Generic image upload used by the Stories / Menu / Category admin forms.
// Returns { url, publicId } which the caller stores on its own document.
router.post('/', requireAdmin, upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image file provided.' });
  }

  try {
    const result = await uploadBufferToCloudinary(req.file.buffer, 'the18house');
    res.status(201).json({ url: result.secure_url, publicId: result.public_id });
  } catch (err) {
    res.status(500).json({ message: 'Image upload failed.', error: err.message });
  }
});

module.exports = router;
