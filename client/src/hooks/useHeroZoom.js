import { useEffect } from 'react';

export default function useHeroZoom() {
  useEffect(() => {
    const hero = document.querySelector('.hero');
    const stage = document.querySelector('.hero-zoom-stage');
    const imageBox = document.querySelector('.hero-image-box');
    if (!hero || !stage || !imageBox) return;

    let isRevealed = false;
    let isAnimating = false;

    // Check if user has reduced motion enabled
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      hero.classList.add('hero--revealed');
      return;
    }

    // Calculates scale factor and origin point to expand image full-screen
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

    // Plays the full zoom -> reveal sequence
    function playAnimation() {
      if (isAnimating || isRevealed) return;
      isAnimating = true;

      // Step 1: Start image zoom
      hero.classList.add('hero--zooming');

      // Step 2: After zoom duration, trigger top-slide reveal
      setTimeout(() => {
        hero.classList.remove('hero--zooming');
        hero.classList.add('hero--revealed');
        isRevealed = true;
        isAnimating = false;
      }, 500); // Adjust duration to match CSS zoom transition
    }

    // Mouse wheel intercept for desktop
    function handleWheel(e) {
      // If at top of page and animation hasn't completed yet
      if (window.scrollY <= 10 && !isRevealed) {
        if (e.deltaY > 0) {
          // Prevent page from scrolling down on 1st scroll
          e.preventDefault();
          playAnimation();
        }
      }
    }

    // Touch gesture intercept for mobile
    let touchStartY = 0;
    function handleTouchStart(e) {
      touchStartY = e.touches[0].clientY;
    }

    function handleTouchMove(e) {
      if (window.scrollY <= 10 && !isRevealed) {
        const touchCurrentY = e.touches[0].clientY;
        if (touchStartY - touchCurrentY > 10) { // Swiping up (scrolling down)
          e.preventDefault();
          playAnimation();
        }
      }
    }

    // Event Listeners (passive: false allows e.preventDefault())
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('resize', primeZoom);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', primeZoom);
    };
  }, []);
}