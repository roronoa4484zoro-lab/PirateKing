import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { PortraitContainer } from '../components/layout/PortraitContainer';
import { SwordEffect } from '../components/home/SwordEffect';
import { CursorGlow } from '../components/home/CursorGlow';
import { RequestActions } from '../components/home/RequestActions';

export default function LandingPage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <PortraitContainer>
      <div className="relative w-full min-h-[100dvh] flex flex-col justify-between bg-[#050505] overflow-hidden selection:bg-[#c5a059]/30">
        
        {/* THE BACKGROUND ARTWORK - Primary Visual Identity */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <motion.div
            initial={{ opacity: 0, scale: 1.03 }}
            animate={
              shouldReduceMotion
                ? { opacity: 1, scale: 1 }
                : {
                    opacity: 1,
                    scale: [1, 1.018, 1],
                  }
            }
            transition={
              shouldReduceMotion
                ? { duration: 1.0 }
                : {
                    opacity: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
                    scale: { duration: 22, repeat: Infinity, ease: 'easeInOut' },
                  }
            }
            className="w-full h-full will-change-transform"
            style={{
              backgroundImage: "url('/surpass your limits.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center 20%',
              backgroundRepeat: 'no-repeat',
              filter: 'brightness(0.82) contrast(1.08)',
              width: '100%',
              height: '100%',
            }}
          />

          {/* Subtle dark vignette & contrast gradients to keep artwork dominant while providing legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-transparent to-[#050505]/90 pointer-events-none" />
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 35%, transparent 40%, rgba(5, 5, 5, 0.75) 100%)',
            }}
          />
        </div>

        {/* Ambient atmospheric layers */}
        <CursorGlow />
        <SwordEffect />

        {/* TOP IDENTITY & NAVIGATION */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 flex items-center justify-between px-5 pt-6 pb-2 select-none"
        >
          <div className="flex items-center gap-2">
            <span className="text-[#c5a059] text-[10px]">◇</span>
            <span className="text-[11px] font-mono tracking-[0.28em] text-steel-400 uppercase">
              PIRATE KING
            </span>
          </div>

          <Link
            to="/admin"
            className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] font-mono text-steel-500 hover:text-[#c5a059] transition-colors py-1 px-2 rounded border border-transparent hover:border-white/10 uppercase"
            aria-label="Admin command access"
          >
            <Shield className="w-3 h-3 text-steel-500 hover:text-[#c5a059]" />
            <span>COMMAND</span>
          </Link>
        </motion.header>

        {/* MAIN CINEMATIC CONTENT OVERLAY */}
        <div className="relative z-20 flex flex-col items-center justify-end flex-1 px-5 pt-12 pb-8 sm:pb-12 text-center w-full max-w-md mx-auto">
          
          {/* Engraved Small Subtitle / Label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mb-2 select-none"
          >
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#c5a059]/90 uppercase">
              THE WAY OF THE SWORD
            </span>
          </motion.div>

          {/* Hero Typography - Engraved monumental lettering */}
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-4xl sm:text-5xl md:text-[3.25rem] font-black tracking-tight leading-[0.95] text-[#f5f5f0] mb-3 select-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
          >
            SURPASS <br />
            <span className="bg-gradient-to-r from-[#f5f5f0] via-[#dfc07e] to-[#c5a059] bg-clip-text text-transparent">
              YOUR LIMITS
            </span>
          </motion.h1>

          {/* Supporting text */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-1.5 mb-7 select-none"
          >
            <div className="flex items-center gap-2 text-steel-500 text-[10px]" aria-hidden="true">
              <span className="w-6 h-[1px] bg-white/10" />
              <span className="text-[#c5a059]/70">◇</span>
              <span className="w-6 h-[1px] bg-white/10" />
            </div>
            <p className="text-steel-300 text-xs sm:text-sm font-sans tracking-wide max-w-[280px] leading-relaxed">
              Forged in fire. Tempered by will.
            </p>
          </motion.div>

          {/* Communication & Request Section */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <RequestActions />
          </motion.div>

          {/* Minimal footer mark */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="mt-6 text-[10px] font-mono tracking-[0.25em] text-steel-600 select-none uppercase"
          >
            BLADE ENGRAVED · MMXXVI
          </motion.div>
        </div>
      </div>
    </PortraitContainer>
  );
}

