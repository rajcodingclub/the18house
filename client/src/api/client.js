const BASE_URL = import.meta.env.VITE_API_URL || '';
const TOKEN_KEY = 'the18house_admin_token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}/api${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    if (res.status === 401) clearToken();
    const error = new Error(data?.message || 'Request failed.');
    error.status = res.status;
    error.details = data;
    throw error;
  }

  return data;
}

// Multipart upload (no JSON Content-Type — the browser sets the boundary itself)
async function requestMultipart(path, formData) {
  const token = getToken();
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}/api${path}`, { method: 'POST', headers, body: formData });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    if (res.status === 401) clearToken();
    const error = new Error(data?.message || 'Upload failed.');
    error.status = res.status;
    error.details = data;
    throw error;
  }

  return data;
}

export const api = {
  // --- Public ---
  getMenu: () => request('/menu'),
  getCategory: (id) => request(`/menu/${id}`),
  getStories: () => request('/stories'),
  createBooking: (payload) => request('/bookings', { method: 'POST', body: JSON.stringify(payload) }),
  subscribe: (email) => request('/subscribe', { method: 'POST', body: JSON.stringify({ email }) }),

  // --- Auth ---
  login: (email, password) => request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  me: () => request('/auth/me'),

  // --- Admin: uploads ---
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return requestMultipart('/admin/upload', formData);
  },

  // --- Admin: stories ---
  adminGetStories: () => request('/admin/stories'),
  adminCreateStory: (payload) => request('/admin/stories', { method: 'POST', body: JSON.stringify(payload) }),
  adminUpdateStory: (id, payload) => request(`/admin/stories/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  adminDeleteStory: (id) => request(`/admin/stories/${id}`, { method: 'DELETE' }),

  // --- Admin: categories & dishes ---
  adminGetCategories: () => request('/admin/categories'),
  adminCreateCategory: (payload) => request('/admin/categories', { method: 'POST', body: JSON.stringify(payload) }),
  adminUpdateCategory: (id, payload) => request(`/admin/categories/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  adminDeleteCategory: (id) => request(`/admin/categories/${id}`, { method: 'DELETE' }),
  adminAddDish: (categoryId, payload) =>
    request(`/admin/categories/${categoryId}/dishes`, { method: 'POST', body: JSON.stringify(payload) }),
  adminUpdateDish: (categoryId, dishId, payload) =>
    request(`/admin/categories/${categoryId}/dishes/${dishId}`, { method: 'PUT', body: JSON.stringify(payload) }),
  adminDeleteDish: (categoryId, dishId) =>
    request(`/admin/categories/${categoryId}/dishes/${dishId}`, { method: 'DELETE' }),

  // --- Admin: bookings ---
  adminGetBookings: () => request('/admin/bookings'),
  adminUpdateBookingStatus: (id, status) =>
    request(`/admin/bookings/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  adminDeleteBooking: (id) => request(`/admin/bookings/${id}`, { method: 'DELETE' }),

  // --- Admin: subscribers ---
  adminGetSubscribers: () => request('/admin/subscribers'),
  adminDeleteSubscriber: (id) => request(`/admin/subscribers/${id}`, { method: 'DELETE' })
};
