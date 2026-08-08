import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import '../../styles/admin.css';

const navItems = [
  { to: '/admin', label: 'Overview', end: true },
  { to: '/admin/stories', label: 'Stories' },
  { to: '/admin/menu', label: 'Menu & Categories' },
  { to: '/admin/bookings', label: 'Bookings' },
  { to: '/admin/subscribers', label: 'Subscribers' }
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/admin/login', { replace: true });
  }

  return (
    <div className="admin-shell">
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <div className="admin-sidebar-brand">
            THE 18 HOUSE
            <span>Admin Dashboard</span>
          </div>

          <nav>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `admin-nav-link${isActive ? ' active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="admin-sidebar-footer">
            <div className="admin-name">{admin?.name}</div>
            <div className="admin-email">{admin?.email}</div>
            <button className="admin-btn admin-btn-secondary" style={{ width: '100%' }} onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </aside>

        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
