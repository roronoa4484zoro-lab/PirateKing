import React from 'react';

interface PortraitContainerProps {
  children: React.ReactNode;
}

export const PortraitContainer: React.FC<PortraitContainerProps> = ({ children }) => {
  return (
    <div className="relative min-h-[100dvh] w-full bg-[#050505] flex justify-center items-center overflow-x-hidden selection:bg-bronze/30">
      {/* Ambient background glow/vignette on wide desktop viewports */}
      <div 
        className="fixed inset-0 pointer-events-none hidden md:block opacity-40 z-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(25, 25, 25, 0.4) 0%, rgba(5, 5, 5, 0.95) 70%, #050505 100%)',
        }}
        aria-hidden="true"
      />

      {/* Main Responsive Cinematic Frame */}
      <main className="relative z-10 w-full md:max-w-[520px] lg:max-w-[580px] xl:max-w-[620px] min-h-[100dvh] flex flex-col justify-between overflow-x-hidden md:border-x md:border-white/[0.08] bg-[#050505] shadow-[0_0_90px_rgba(0,0,0,0.95)] transition-all duration-300">
        {children}
      </main>
    </div>
  );
};

