import { createContext, useContext, useEffect, useState } from 'react';
import { api, getToken, setToken, clearToken } from '../api/client.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    api
      .me()
      .then((res) => setAdmin(res.admin))
      .catch(() => clearToken())
      .finally(() => setLoading(false));
  }, []);

  async function login(email, password) {
    const res = await api.login(email, password);
    setToken(res.token);
    setAdmin(res.admin);
    return res.admin;
  }

  function logout() {
    clearToken();
    setAdmin(null);
  }

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout, isAuthenticated: Boolean(admin) }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
