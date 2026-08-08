import { useState } from 'react';

export default function DishForm({ initial, onCancel, onSubmit, submitting }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [orderUrl, setOrderUrl] = useState(initial?.orderUrl || '#order');

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ title, description, orderUrl });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="admin-field">
        <label htmlFor="dish-title">Dish Title</label>
        <input id="dish-title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="admin-field">
        <label htmlFor="dish-desc">Description</label>
        <textarea id="dish-desc" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div className="admin-field">
        <label htmlFor="dish-order-url">Order Link (optional)</label>
        <input id="dish-order-url" value={orderUrl} onChange={(e) => setOrderUrl(e.target.value)} placeholder="#order" />
      </div>
      <div className="admin-modal-actions">
        <button type="button" className="admin-btn admin-btn-secondary" onClick={onCancel}>Cancel</button>
        <button type="submit" className="admin-btn admin-btn-primary" disabled={submitting}>
          {submitting ? 'Saving…' : 'Save Dish'}
        </button>
      </div>
    </form>
  );
}
