import { useEffect } from 'react';

/**
 * Hero animation triggered ONCE on scroll down:
 * 1) Page starts in initial compact layout when scrolled at the top.
 * 2) As user scrolls down, .hero--zooming and .hero--revealed are applied.
 * 3) Once revealed, the state locks and does NOT reverse when scrolling back up.
 */
export default function useHeroZoom() {
  useEffect(() => {
    const hero = document.querySelector('.hero');
    const stage = document.querySelector('.hero-zoom-stage');
    const imageBox = document.querySelector('.hero-image-box');
    if (!hero || !stage || !imageBox) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      hero.classList.add('hero--revealed');
      return;
    }

    // Calculates the required scale factor & origin to zoom image to full screen
    function primeZoom() {
      const viewportW = window.innerWidth;
      const viewportH = window.innerHeight;
      const box = imageBox.getBoundingClientRect();
      const scale = Math.max(viewportW / box.width, viewportH / box.height) * 1.08;
      const originX = ((box.left + box.width / 2) / viewportW) * 100;
      const originY = ((box.top + box.height / 2) / viewportH) * 100;
      stage.style.setProperty('--zoom-scale', scale.toFixed(3));
      stage.style.transformOrigin = `${originX}% ${originY}%`;
    }

    primeZoom();

    function handleScroll() {
      // If already permanently revealed, stop checking
      if (hero.classList.contains('hero--revealed')) return;

      const scrollY = window.scrollY;

      const ZOOM_THRESHOLD = 30;    // Scroll pixels to trigger image zoom
      const REVEAL_THRESHOLD = 160;  // Scroll pixels to reveal final top-slide content

      if (scrollY >= REVEAL_THRESHOLD) {
        hero.classList.remove('hero--zooming');
        hero.classList.add('hero--revealed');
        // Remove scroll listener once permanently revealed so it never reverses
        window.removeEventListener('scroll', handleScroll);
      } else if (scrollY >= ZOOM_THRESHOLD) {
        hero.classList.add('hero--zooming');
      }
    }

    // Run check on initial load (in case page refreshed midway)
    handleScroll();

    function handleResize() {
      primeZoom();
      handleScroll();
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
}