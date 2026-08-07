const BASE_URL = import.meta.env.VITE_API_URL || '';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}/api${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message = data?.message || 'Request failed.';
    const error = new Error(message);
    error.details = data;
    throw error;
  }

  return data;
}

export const api = {
  getMenu: () => request('/menu'),
  createBooking: (payload) =>
    request('/bookings', { method: 'POST', body: JSON.stringify(payload) }),
  subscribe: (email) =>
    request('/subscribe', { method: 'POST', body: JSON.stringify({ email }) })
};
