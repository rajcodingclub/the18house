import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Menu from './pages/Menu.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </>
  );
}
