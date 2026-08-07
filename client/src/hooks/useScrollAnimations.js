import { useEffect } from 'react';

/**
 * Ports the original script.js "SCROLL ENTRANCE ANIMATION OBSERVER".
 * Observes every .animate-from-top / .animate-from-left / .animate-from-right
 * element currently in the DOM and adds .is-in-view once each scrolls in.
 *
 * `deps` lets callers re-run the observer after content they render
 * changes (e.g. the menu page re-renders dish cards on filter/search).
 */
export default function useScrollAnimations(deps = []) {
  useEffect(() => {
    const animatedElements = document.querySelectorAll(
      '.animate-from-top, .animate-from-left, .animate-from-right'
    );
    if (!animatedElements.length) return;

    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -120px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in-view');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach((el) => scrollObserver.observe(el));

    return () => scrollObserver.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
