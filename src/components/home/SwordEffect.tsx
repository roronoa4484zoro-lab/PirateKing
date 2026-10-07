import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

// Deterministic seed generation to ensure pure rendering and avoid impure Math.random during render
const generateDustParticles = (): Particle[] => {
  const colors = [
    'rgba(245, 245, 240, 0.4)',  // off-white paper grain
    'rgba(212, 212, 206, 0.3)',  // steel gray dust
    'rgba(197, 160, 89, 0.35)',  // subtle antique bronze speck
    'rgba(161, 161, 161, 0.25)', // ink dust
  ];

  return Array.from({ length: 16 }).map((_, i) => ({
    id: i,
    x: 15 + ((i * 23) % 70), // Distributed along the central blade area
    y: 40 + ((i * 17) % 55),
    size: 1 + (i % 3) * 0.75, // 1px - 2.5px micro grains
    duration: 6 + (i % 5) * 1.8,
    delay: (i % 4) * 1.2,
    color: colors[i % colors.length],
  }));
};

export const SwordEffect: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [particles] = useState<Particle[]>(() => generateDustParticles());

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden select-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: p.size > 2 ? '0 0 4px rgba(245, 245, 240, 0.3)' : 'none',
          }}
          animate={{
            y: ['0%', '-45%'],
            x: ['0%', (p.id % 2 === 0 ? 1 : -1) * (10 + (p.id % 15)) + '%'],
            opacity: [0, 0.65, 0],
            scale: [0.6, 1.1, 0.4],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}

      {/* Extremely subtle ambient vertical air current / blade atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
    </div>
  );
};

