
"use client";
import React, { useRef, useState } from 'react';

interface ResizeBarProps {
  isResized: React.MutableRefObject<boolean>;
}

const ResizeBar = ({ isResized }: ResizeBarProps) => {
  const [mouseY, setMouseY] = useState<number | null>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (handleRef.current) {
      const rect = handleRef.current.getBoundingClientRect();
      setMouseY(e.clientY - rect.top);
    }
  };

  const handleMouseLeave = () => {
    setMouseY(null);
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">

        {/* Resize handle */}
        <div 
          ref={handleRef}
          className="w-4 h-full cursor-col-resize relative flex items-center justify-center"
          onMouseDown={() => {isResized.current = true;}}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Vertical dots pattern - centered */}
          <div className="flex flex-col gap-1 relative z-10">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i} 
                className="w-1 h-1 rounded-full bg-gray-400 transition-transform duration-200"
                style={{
                  transform: mouseY && Math.abs(mouseY - (i * 16 + 358)) < 20 
                    ? 'scale(2)' 
                    : 'scale(1)'
                }}
              />
            ))}
          </div>
          
          {/* Localized glow effect that follows mouse */}
         {mouseY !== null && (
            <div 
                className="absolute w-full h-12 pointer-events-none"
                style={{
                    top: Math.max(0, mouseY - 24),
                    background: 'radial-gradient(circle at center, rgba(96, 165, 250, 0.2) 0%, rgba(255, 255, 255, 0) 70%)',
                    filter: 'blur(4px)'
                }}
            />
        )}  
          
          {/* Vertical borders */}
          <div className="absolute inset-y-0 -left-px w-px bg-slate-800"/>
          <div className="absolute inset-y-0 -right-px w-px bg-slate-800"/>

     </div>
     </div> 
  );
};

export default ResizeBar;