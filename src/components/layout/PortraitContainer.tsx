import React from 'react';

interface PortraitContainerProps {
  children: React.ReactNode;
}

export const PortraitContainer: React.FC<PortraitContainerProps> = ({ children }) => {
  return (
    <div className="fixed inset-0 bg-black flex justify-center items-center overflow-hidden">
      <div className="relative w-full max-w-[450px] h-full max-h-[900px] overflow-hidden shadow-2xl bg-darkest border-x border-white/10">
        {children}
      </div>
    </div>
  );
};
