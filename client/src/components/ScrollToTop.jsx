import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Mirrors default multi-page behaviour: navigating index.php <-> menu.php
// used to load a fresh document at the top of the page.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
