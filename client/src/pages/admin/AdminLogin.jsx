import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import '../../styles/admin.css';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login(email, password);
      const redirectTo = location.state?.from?.pathname || '/admin';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h1>The 18 House</h1>
        <p className="subtitle">Admin Dashboard — sign in to continue</p>

        <form onSubmit={handleSubmit}>
          <div className="admin-field">
            <label htmlFor="admin-email">Email</label>
            <input
              type="email"
              id="admin-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@the18house.com"
              required
              autoFocus
            />
          </div>

          <div className="admin-field">
            <label htmlFor="admin-password">Password</label>
            <input
              type="password"
              id="admin-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="admin-btn admin-btn-primary" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Sign In'}
          </button>

          {error && <p className="admin-error-text">{error}</p>}
        </form>
      </div>
    </div>
  );
}
