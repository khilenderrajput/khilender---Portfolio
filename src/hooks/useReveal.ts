import { useEffect, useRef } from 'react';

/** 
 * Attaches an IntersectionObserver that adds the `visible` class once,
 * pairing with the global `.reveal` CSS in globals.css.
 * Matches the reference portfolio scroll-reveal logic with rootMargin: '0px 0px -8% 0px'
 * and threshold: 0.12 for smooth, natural entrance transitions.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      el.classList.add('visible');
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          io.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}
