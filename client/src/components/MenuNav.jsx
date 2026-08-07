import { Link } from 'react-router-dom';

export default function MenuNav() {
  return (
    <nav className="site-nav menu-nav">
      <span className="nav-mark">CONTACT US</span>
      <div className="nav-menu-links">
        <Link to="/" className="nav-link-item">HOME</Link>
        <Link to="/menu" className="nav-link-item active">MENU</Link>
      </div>
    </nav>
  );
}
