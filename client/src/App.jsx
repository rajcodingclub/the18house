import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Menu from './pages/Menu.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/admin/ProtectedRoute.jsx';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import AdminOverview from './pages/admin/AdminOverview.jsx';
import AdminStories from './pages/admin/AdminStories.jsx';
import AdminMenu from './pages/admin/AdminMenu.jsx';
import AdminBookings from './pages/admin/AdminBookings.jsx';
import AdminSubscribers from './pages/admin/AdminSubscribers.jsx';

export default function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminOverview />} />
          <Route path="stories" element={<AdminStories />} />
          <Route path="menu" element={<AdminMenu />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="subscribers" element={<AdminSubscribers />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
