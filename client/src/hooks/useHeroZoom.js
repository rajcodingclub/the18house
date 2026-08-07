import { useEffect } from 'react';

/**
 * Ports the original script.js hero load animation:
 * 1) Page loads showing the compact "slide 1" layout.
 * 2) After a short beat, .hero--zooming is added; CSS grows the image
 *    to full-bleed and cross-fades the overlay copy in.
 * 3) .hero--revealed marks the final "slide 3" resting state.
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

    const HOLD_BEFORE_ZOOM = 1500;
    const ZOOM_DURATION = 1300;
    const HOLD_AFTER_ZOOM = 250;

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

    const zoomTimer = window.setTimeout(() => hero.classList.add('hero--zooming'), HOLD_BEFORE_ZOOM);
    const revealTimer = window.setTimeout(() => {
      hero.classList.remove('hero--zooming');
      hero.classList.add('hero--revealed');
    }, HOLD_BEFORE_ZOOM + ZOOM_DURATION + HOLD_AFTER_ZOOM);

    function handleResize() {
      if (!hero.classList.contains('hero--zooming') && !hero.classList.contains('hero--revealed')) {
        primeZoom();
      }
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.clearTimeout(zoomTimer);
      window.clearTimeout(revealTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
}
