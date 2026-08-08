import { useEffect, useState } from 'react';
import { api } from '../../api/client.js';
import ImageUploader from '../../components/admin/ImageUploader.jsx';
import Modal from '../../components/admin/Modal.jsx';
import DishForm from '../../components/admin/DishForm.jsx';

const emptyCategoryForm = {
  id: '',
  name: '',
  description: '',
  imagePosition: 'left',
  featuredImage: '',
  featuredImagePublicId: '',
  order: 0
};

export default function AdminMenu() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [categoryForm, setCategoryForm] = useState(emptyCategoryForm);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [savingCategory, setSavingCategory] = useState(false);

  // { categoryId, dish } | null — dish is null when adding a new one
  const [dishModal, setDishModal] = useState(null);
  const [savingDish, setSavingDish] = useState(false);

  function loadCategories() {
    setLoading(true);
    api
      .adminGetCategories()
      .then((res) => setCategories(res.categories))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(loadCategories, []);

  function startEditCategory(category) {
    setEditingCategoryId(category._id);
    setCategoryForm({
      id: category.id,
      name: category.name,
      description: category.description,
      imagePosition: category.imagePosition,
      featuredImage: category.featuredImage,
      featuredImagePublicId: category.featuredImagePublicId || '',
      order: category.order
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function resetCategoryForm() {
    setEditingCategoryId(null);
    setCategoryForm(emptyCategoryForm);
  }

  async function handleCategorySubmit(e) {
    e.preventDefault();
    setError('');

    if (!categoryForm.featuredImage) {
      setError('Please upload a featured image first.');
      return;
    }

    setSavingCategory(true);
    try {
      if (editingCategoryId) {
        await api.adminUpdateCategory(editingCategoryId, categoryForm);
      } else {
        await api.adminCreateCategory(categoryForm);
      }
      resetCategoryForm();
      loadCategories();
    } catch (err) {
      setError(err.message || 'Failed to save category.');
    } finally {
      setSavingCategory(false);
    }
  }

  async function handleDeleteCategory(category) {
    if (!window.confirm(`Delete "${category.name}" and all its dishes? This cannot be undone.`)) return;
    try {
      await api.adminDeleteCategory(category._id);
      loadCategories();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDishSubmit(payload) {
    setSavingDish(true);
    try {
      if (dishModal.dish) {
        await api.adminUpdateDish(dishModal.categoryId, dishModal.dish._id, payload);
      } else {
        await api.adminAddDish(dishModal.categoryId, payload);
      }
      setDishModal(null);
      loadCategories();
    } catch (err) {
      setError(err.message || 'Failed to save dish.');
    } finally {
      setSavingDish(false);
    }
  }

  async function handleDeleteDish(categoryId, dish) {
    if (!window.confirm(`Delete "${dish.title}"?`)) return;
    try {
      await api.adminDeleteDish(categoryId, dish._id);
      loadCategories();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1>Menu &amp; Categories</h1>
          <p>Manage menu categories and the dishes inside each one.</p>
        </div>
      </div>

      <div className="admin-card">
        <h2>{editingCategoryId ? 'Edit Category' : 'Add a New Category'}</h2>
        <form onSubmit={handleCategorySubmit}>
          <div className="admin-form-row">
            <div className="admin-field">
              <label htmlFor="cat-name">Category Name</label>
              <input
                id="cat-name"
                value={categoryForm.name}
                onChange={(e) => setCategoryForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. STARTERS"
                required
              />
            </div>
            <div className="admin-field">
              <label htmlFor="cat-id">Slug (URL-safe id)</label>
              <input
                id="cat-id"
                value={categoryForm.id}
                onChange={(e) => setCategoryForm((prev) => ({ ...prev, id: e.target.value.toLowerCase().replace(/\s+/g, '-') }))}
                placeholder="e.g. starters"
                required
                disabled={Boolean(editingCategoryId)}
              />
            </div>
          </div>

          <div className="admin-field">
            <label htmlFor="cat-desc">Description</label>
            <textarea
              id="cat-desc"
              rows="2"
              value={categoryForm.description}
              onChange={(e) => setCategoryForm((prev) => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>

          <div className="admin-form-row">
            <div className="admin-field">
              <label htmlFor="cat-position">Image Position</label>
              <select
                id="cat-position"
                value={categoryForm.imagePosition}
                onChange={(e) => setCategoryForm((prev) => ({ ...prev, imagePosition: e.target.value }))}
              >
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </div>
            <div className="admin-field">
              <label htmlFor="cat-order">Display Order</label>
              <input
                type="number"
                id="cat-order"
                value={categoryForm.order}
                onChange={(e) => setCategoryForm((prev) => ({ ...prev, order: Number(e.target.value) }))}
              />
            </div>
          </div>

          <ImageUploader
            label="Featured Image"
            currentUrl={categoryForm.featuredImage}
            onUploaded={({ url, publicId }) =>
              setCategoryForm((prev) => ({ ...prev, featuredImage: url, featuredImagePublicId: publicId }))
            }
          />

          <div className="admin-actions-row">
            <button type="submit" className="admin-btn admin-btn-primary" disabled={savingCategory}>
              {savingCategory ? 'Saving…' : editingCategoryId ? 'Update Category' : 'Add Category'}
            </button>
            {editingCategoryId && (
              <button type="button" className="admin-btn admin-btn-secondary" onClick={resetCategoryForm}>
                Cancel
              </button>
            )}
          </div>

          {error && <p className="admin-error-text">{error}</p>}
        </form>
      </div>

      <div className="admin-card">
        <h2>All Categories</h2>
        {loading && <p>Loading…</p>}
        {!loading && categories.length === 0 && <div className="admin-empty-state">No categories yet.</div>}

        {!loading &&
          categories.map((category) => (
            <div className="admin-category-block" key={category._id}>
              <div className="admin-category-block-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={category.featuredImage} alt={category.name} className="admin-thumb" />
                  <div>
                    <h3>{category.name}</h3>
                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                      {category.dishes.length} dish{category.dishes.length === 1 ? '' : 'es'}
                    </span>
                  </div>
                </div>
                <div className="admin-actions-row">
                  <button className="admin-btn admin-btn-secondary" onClick={() => setDishModal({ categoryId: category._id, dish: null })}>
                    + Add Dish
                  </button>
                  <button className="admin-btn admin-btn-secondary" onClick={() => startEditCategory(category)}>Edit</button>
                  <button className="admin-btn admin-btn-danger" onClick={() => handleDeleteCategory(category)}>Delete</button>
                </div>
              </div>

              {category.dishes.length === 0 && (
                <div className="admin-empty-state" style={{ padding: '16px' }}>No dishes yet.</div>
              )}

              {category.dishes.map((dish) => (
                <div className="admin-dish-row" key={dish._id}>
                  <div className="dish-info">
                    <h4>{dish.title}</h4>
                    <p>{dish.description}</p>
                  </div>
                  <div className="admin-actions-row">
                    <button
                      className="admin-btn admin-btn-secondary"
                      onClick={() => setDishModal({ categoryId: category._id, dish })}
                    >
                      Edit
                    </button>
                    <button className="admin-btn admin-btn-danger" onClick={() => handleDeleteDish(category._id, dish)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>

      {dishModal && (
        <Modal title={dishModal.dish ? 'Edit Dish' : 'Add Dish'} onClose={() => setDishModal(null)}>
          <DishForm
            initial={dishModal.dish}
            onCancel={() => setDishModal(null)}
            onSubmit={handleDishSubmit}
            submitting={savingDish}
          />
        </Modal>
      )}
    </>
  );
}
