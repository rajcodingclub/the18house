import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className="site-nav">
      <a href="#booking" className="nav-mark">CONTACT US</a>
      <Link to="/menu" className="nav-mark">MENU</Link>
    </nav>
  );
}
