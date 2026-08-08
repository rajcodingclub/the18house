import { useState } from 'react';
import { api } from '../../api/client.js';

/**
 * Controlled image uploader. Calls onUploaded({ url, publicId }) once the
 * file has been sent to POST /api/admin/upload and Cloudinary responds.
 */
export default function ImageUploader({ currentUrl, onUploaded, label = 'Image' }) {
  const [preview, setPreview] = useState(currentUrl || '');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    setPreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      const res = await api.uploadImage(file);
      onUploaded({ url: res.url, publicId: res.publicId });
    } catch (err) {
      setError(err.message || 'Upload failed.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="admin-field">
      <label>{label}</label>
      <div className="admin-upload-box">
        {preview && <img src={preview} alt="Preview" className="admin-upload-preview" />}
        <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
          {uploading ? 'Uploading…' : preview ? 'Click to replace image' : 'Click to upload an image'}
        </p>
        <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} />
      </div>
      {error && <p className="admin-error-text">{error}</p>}
    </div>
  );
}
