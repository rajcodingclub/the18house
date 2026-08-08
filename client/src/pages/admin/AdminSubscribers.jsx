import { useEffect, useState } from 'react';
import { api } from '../../api/client.js';

export default function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  function loadSubscribers() {
    setLoading(true);
    api
      .adminGetSubscribers()
      .then((res) => setSubscribers(res.subscribers))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(loadSubscribers, []);

  async function handleDelete(id) {
    if (!window.confirm('Remove this subscriber?')) return;
    try {
      await api.adminDeleteSubscriber(id);
      setSubscribers((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1>Subscribers</h1>
          <p>Emails collected from the footer newsletter signup.</p>
        </div>
      </div>

      <div className="admin-card">
        {loading && <p>Loading…</p>}
        {error && <p className="admin-error-text">{error}</p>}
        {!loading && subscribers.length === 0 && <div className="admin-empty-state">No subscribers yet.</div>}

        {!loading && subscribers.length > 0 && (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Subscribed</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((sub) => (
                  <tr key={sub._id}>
                    <td>{sub.email}</td>
                    <td>{new Date(sub.createdAt).toLocaleString()}</td>
                    <td>
                      <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(sub._id)}>Remove</button>
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
