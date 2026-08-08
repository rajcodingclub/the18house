import { useEffect, useState } from 'react';
import { api } from '../../api/client.js';

const statusOptions = ['pending', 'confirmed', 'cancelled'];

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  function loadBookings() {
    setLoading(true);
    api
      .adminGetBookings()
      .then((res) => setBookings(res.bookings))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(loadBookings, []);

  async function handleStatusChange(id, status) {
    try {
      await api.adminUpdateBookingStatus(id, status);
      setBookings((prev) => prev.map((b) => (b._id === id ? { ...b, status } : b)));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this booking?')) return;
    try {
      await api.adminDeleteBooking(id);
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1>Bookings</h1>
          <p>Table reservations submitted through the website&apos;s contact form.</p>
        </div>
      </div>

      <div className="admin-card">
        {loading && <p>Loading…</p>}
        {error && <p className="admin-error-text">{error}</p>}
        {!loading && bookings.length === 0 && <div className="admin-empty-state">No bookings yet.</div>}

        {!loading && bookings.length > 0 && (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Received</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking.name}</td>
                    <td>{booking.email}</td>
                    <td>{booking.phone}</td>
                    <td>{booking.date}</td>
                    <td>{booking.time}</td>
                    <td style={{ maxWidth: '220px', whiteSpace: 'normal' }}>{booking.message || '—'}</td>
                    <td>
                      <select
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                        style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td>{new Date(booking.createdAt).toLocaleString()}</td>
                    <td>
                      <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(booking._id)}>Delete</button>
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
