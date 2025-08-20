import { useEffect, useRef, useState } from "react";

export function useReveal<T extends HTMLElement>(
  opts?: IntersectionObserverInit
) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(entry.target); // 한 번만 재생
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px", ...(opts || {}) }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [opts]);

  return { ref, visible };
}
