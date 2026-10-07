import React from 'react';
import { motion } from 'framer-motion';

interface MetallicButtonProps {
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'steel' | 'bronze' | 'action';
  ariaLabel?: string;
}

export const MetallicButton: React.FC<MetallicButtonProps> = ({
  label,
  onClick,
  icon,
  className = '',
  type = 'button',
  disabled = false,
  variant = 'steel',
  ariaLabel,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'bronze':
        return {
          border: 'border-[#c5a059]/30 hover:border-[#c5a059]/60 focus-visible:ring-[#c5a059]/50',
          bg: 'bg-gradient-to-b from-[#14120e] to-[#090806]',
          accentText: 'text-[#e0c58e]',
          sheen: 'rgba(224, 197, 142, 0.12)',
        };
      case 'action':
        return {
          border: 'border-white/20 hover:border-white/40 focus-visible:ring-white/40',
          bg: 'bg-gradient-to-b from-[#181818] to-[#0d0d0d]',
          accentText: 'text-[#f5f5f0]',
          sheen: 'rgba(255, 255, 255, 0.14)',
        };
      case 'steel':
      default:
        return {
          border: 'border-white/[0.12] hover:border-white/[0.28] focus-visible:ring-white/30',
          bg: 'bg-gradient-to-b from-[#121212] to-[#080808]',
          accentText: 'text-[#f5f5f0]',
          sheen: 'rgba(245, 245, 240, 0.10)',
        };
    }
  };

  const currentVariant = getVariantStyles();

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || label}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className={`relative group overflow-hidden px-5 py-2.5 rounded-lg border backdrop-blur-md transition-colors duration-300 focus:outline-none focus-visible:ring-1 disabled:opacity-50 disabled:pointer-events-none select-none ${currentVariant.border} ${currentVariant.bg} ${className}`}
    >
      {/* Subtle top bevel edge reflecting overhead light */}
      <div 
        className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
        aria-hidden="true" 
      />

      {/* Subtle light sweep across the metallic surface on hover */}
      <div
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${currentVariant.sheen} 50%, transparent 100%)`,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center gap-2.5">
        {icon ? (
          <span className="text-white/60 group-hover:text-white transition-colors duration-200 text-xs">
            {icon}
          </span>
        ) : (
          <span className="text-white/40 group-hover:text-white/80 transition-colors duration-200 text-[10px]">
            ◇
          </span>
        )}
        <span className={`text-xs font-medium tracking-wider uppercase ${currentVariant.accentText}`}>
          {label}
        </span>
      </div>
    </motion.button>
  );
};

export default MetallicButton;

