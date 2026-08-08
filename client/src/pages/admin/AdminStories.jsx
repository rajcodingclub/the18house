import { useEffect, useState } from 'react';
import { api } from '../../api/client.js';
import ImageUploader from '../../components/admin/ImageUploader.jsx';

const emptyForm = { title: '', imageUrl: '', imagePublicId: '', order: 0, isActive: true };

export default function AdminStories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function loadStories() {
    setLoading(true);
    api
      .adminGetStories()
      .then((res) => setStories(res.stories))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(loadStories, []);

  function startEdit(story) {
    setEditingId(story._id);
    setForm({
      title: story.title,
      imageUrl: story.imageUrl,
      imagePublicId: story.imagePublicId,
      order: story.order,
      isActive: story.isActive
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.imageUrl) {
      setError('Please upload an image first.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      if (editingId) {
        await api.adminUpdateStory(editingId, form);
      } else {
        await api.adminCreateStory(form);
      }
      resetForm();
      loadStories();
    } catch (err) {
      setError(err.message || 'Failed to save story.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this story? This also removes the image from Cloudinary.')) return;
    try {
      await api.adminDeleteStory(id);
      loadStories();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1>Stories</h1>
          <p>Manage the photo marquee shown on the homepage &amp; menu page.</p>
        </div>
      </div>

      <div className="admin-card">
        <h2>{editingId ? 'Edit Story' : 'Add a New Story'}</h2>
        <form onSubmit={handleSubmit}>
          <ImageUploader
            label="Story Image"
            currentUrl={form.imageUrl}
            onUploaded={({ url, publicId }) => setForm((prev) => ({ ...prev, imageUrl: url, imagePublicId: publicId }))}
          />

          <div className="admin-form-row">
            <div className="admin-field">
              <label htmlFor="story-title">Title / Caption</label>
              <input
                type="text"
                id="story-title"
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="e.g. Poke Salad Bowl"
                required
              />
            </div>
            <div className="admin-field">
              <label htmlFor="story-order">Display Order</label>
              <input
                type="number"
                id="story-order"
                value={form.order}
                onChange={(e) => setForm((prev) => ({ ...prev, order: Number(e.target.value) }))}
              />
            </div>
          </div>

          <div className="admin-field" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              id="story-active"
              checked={form.isActive}
              onChange={(e) => setForm((prev) => ({ ...prev, isActive: e.target.checked }))}
              style={{ width: 'auto' }}
            />
            <label htmlFor="story-active" style={{ margin: 0 }}>Visible on site</label>
          </div>

          <div className="admin-actions-row">
            <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
              {saving ? 'Saving…' : editingId ? 'Update Story' : 'Add Story'}
            </button>
            {editingId && (
              <button type="button" className="admin-btn admin-btn-secondary" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>

          {error && <p className="admin-error-text">{error}</p>}
        </form>
      </div>

      <div className="admin-card">
        <h2>All Stories</h2>
        {loading && <p>Loading…</p>}
        {!loading && stories.length === 0 && <div className="admin-empty-state">No stories yet — add your first one above.</div>}

        {!loading && stories.length > 0 && (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Order</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {stories.map((story) => (
                  <tr key={story._id}>
                    <td><img src={story.imageUrl} alt={story.title} className="admin-thumb" /></td>
                    <td>{story.title}</td>
                    <td>{story.order}</td>
                    <td>
                      <span className={`admin-badge ${story.isActive ? 'admin-badge-confirmed' : 'admin-badge-cancelled'}`}>
                        {story.isActive ? 'Visible' : 'Hidden'}
                      </span>
                    </td>
                    <td>
                      <div className="admin-actions-row">
                        <button className="admin-btn admin-btn-secondary" onClick={() => startEdit(story)}>Edit</button>
                        <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(story._id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
