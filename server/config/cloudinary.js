const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Uploads a file buffer (from multer's memory storage) to Cloudinary and
 * resolves with { secure_url, public_id }.
 */
function uploadBufferToCloudinary(buffer, folder = 'the18house') {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}

function deleteFromCloudinary(publicId) {
  if (!publicId) return Promise.resolve();
  return cloudinary.uploader.destroy(publicId).catch((err) => {
    // Non-fatal: log and move on, we don't want a stale Cloudinary asset
    // to block the database operation the caller is performing.
    console.error('[Cloudinary] Failed to delete asset:', publicId, err.message);
  });
}

module.exports = { cloudinary, uploadBufferToCloudinary, deleteFromCloudinary };
