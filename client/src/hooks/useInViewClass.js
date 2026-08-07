import { useEffect, useRef } from 'react';

/**
 * Ports script.js's "OUR MENU SECTION: Fixed Scroll Entrance Animation".
 * Attach the returned ref to the element; once it's ~15% in view the
 * given className is added (once) and the observer disconnects.
 */
export default function useInViewClass(className, options = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.classList.add(className);
          obs.unobserve(entry.target);
        }
      });
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [className]);

  return ref;
}
