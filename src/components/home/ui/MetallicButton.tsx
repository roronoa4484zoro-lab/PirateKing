"use client";

import { useState } from 'react';
import { Sparkles } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MetallicButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
  baseColor?: string;
  sheenColor?: string;
}

export function MetallicButton({
  label = "Get Started",
  onClick,
  className = "",
  baseColor = "#000000",
  sheenColor = "#ffffff",
}: MetallicButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={cn("relative inline-block group", className)}>
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "relative px-8 py-3 rounded-full font-medium transition-all duration-300 ease-out",
          "text-white overflow-hidden shadow-xl",
          "active:scale-95 transition-transform",
          "border border-white/20"
        )}
        style={{ backgroundColor: baseColor }}
      >
        <div
          className={cn(
            "absolute inset-0 pointer-events-none transition-opacity duration-500",
            isHovered ? "opacity-100" : "opacity-40"
          )}
          style={{
            background: `linear-gradient(135deg, transparent 0%, ${sheenColor}33 50%, transparent 100%)`,
            backgroundSize: '200% 200%',
            animation: 'shimmer 3s infinite linear'
          }}
        />
        <div className="absolute inset-0 rounded-full border-t border-white/30 pointer-events-none" />
        <div className="relative z-10 flex items-center justify-center gap-2">
          <Sparkles className="size-4 text-white/80" />
          <span>{label}</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      </button>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}} />
    </div>
  );
}

export default MetallicButton;
