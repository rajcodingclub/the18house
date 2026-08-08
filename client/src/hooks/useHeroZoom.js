import { useEffect } from 'react';

/**
 * Hero animation triggered by SCROLL instead of timer:
 * 1) Page starts in initial compact layout when scrolled at the top.
 * 2) As user begins scrolling down, .hero--zooming is added (grows image full-bleed).
 * 3) Scrolling further adds .hero--revealed (hides initial stage, slides final overlay down from top).
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

    // Scroll listener to toggle animation states based on scroll distance
    function handleScroll() {
      const scrollY = window.scrollY;

      // Adjust these scroll pixel thresholds if needed:
      const ZOOM_THRESHOLD = 30;    // Scroll pixels to trigger image zoom
      const REVEAL_THRESHOLD = 160;  // Scroll pixels to reveal final top-slide content

      if (scrollY >= REVEAL_THRESHOLD) {
        hero.classList.remove('hero--zooming');
        hero.classList.add('hero--revealed');
      } else if (scrollY >= ZOOM_THRESHOLD) {
        hero.classList.add('hero--zooming');
        hero.classList.remove('hero--revealed');
      } else {
        // Returned to top of page: reset back to initial stage
        hero.classList.remove('hero--zooming', 'hero--revealed');
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