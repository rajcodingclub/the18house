import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api/client.js';

export default function AdminOverview() {
  const [stats, setStats] = useState({ bookings: 0, subscribers: 0, stories: 0, categories: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      api.adminGetBookings(),
      api.adminGetSubscribers(),
      api.adminGetStories(),
      api.adminGetCategories()
    ])
      .then(([bookingsRes, subscribersRes, storiesRes, categoriesRes]) => {
        if (cancelled) return;
        setStats({
          bookings: bookingsRes.bookings.length,
          subscribers: subscribersRes.subscribers.length,
          stories: storiesRes.stories.length,
          categories: categoriesRes.categories.length
        });
      })
      .catch(() => {})
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, []);

  const cards = [
    { label: 'Bookings', value: stats.bookings, to: '/admin/bookings' },
    { label: 'Subscribers', value: stats.subscribers, to: '/admin/subscribers' },
    { label: 'Stories', value: stats.stories, to: '/admin/stories' },
    { label: 'Menu Categories', value: stats.categories, to: '/admin/menu' }
  ];

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1>Overview</h1>
          <p>A quick snapshot of everything happening on the site.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
        {cards.map((card) => (
          <Link
            key={card.label}
            to={card.to}
            className="admin-card"
            style={{ display: 'block', textDecoration: 'none', color: 'inherit', marginBottom: 0 }}
          >
            <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
              {card.label}
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '8px', color: '#0b2b1b' }}>
              {loading ? '—' : card.value}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
