import React, { useEffect, useRef } from 'react';

export const CursorGlow: React.FC = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const targetPos = useRef({ x: -500, y: -500 });

  useEffect(() => {
    // Disable on non-pointer / touch devices or reduced motion
    const isTouch = window.matchMedia('(hover: none) or (pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    const el = glowRef.current;
    if (!el) return;

    const updatePosition = () => {
      if (el) {
        el.style.transform = `translate3d(${targetPos.current.x - 250}px, ${targetPos.current.y - 250}px, 0)`;
      }
      rafId.current = null;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;

      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(updatePosition);
      }
    };

    const handleMouseLeave = () => {
      if (el) el.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      if (el) el.style.opacity = '1';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 w-[500px] h-[500px] rounded-full z-30 transition-opacity duration-500 ease-out will-change-transform hidden md:block"
      style={{
        transform: 'translate3d(-500px, -500px, 0)',
        background: 'radial-gradient(circle, rgba(245, 245, 240, 0.045) 0%, rgba(200, 190, 175, 0.02) 40%, transparent 70%)',
        mixBlendMode: 'screen',
      }}
      aria-hidden="true"
    />
  );
};

