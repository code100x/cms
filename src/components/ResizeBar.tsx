'use client';
import React, { useRef, useState } from 'react';

interface ResizeBarProps {
  isResized: React.MutableRefObject<boolean>;
}
const ResizeBar = ({ isResized }: ResizeBarProps) => {
  const [mouseY, setMouseY] = useState<number | null>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isResized.current = true;
    e.preventDefault(); // Prevent text selection during drag
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (handleRef.current) {
      const rect = handleRef.current.getBoundingClientRect();
      setMouseY(e.clientY - rect.top);
    }
  };

  const handleMouseLeave = () => {
    setMouseY(null);
  };
  const handleMouseUp = () => {
    isResized.current = false;
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      {/* Resize handle */}
      <div
        ref={handleRef}
        className="relative flex h-full w-4 cursor-col-resize items-center justify-center"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
      >
        {/* Vertical dots pattern - centered */}
        <div className="relative z-10 flex flex-col gap-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-1 w-1 rounded-full bg-gray-400 transition-transform duration-200"
              style={{
                transform:
                  mouseY && Math.abs(mouseY - (i * 16 + 358)) < 20
                    ? 'scale(2)'
                    : 'scale(1)',
              }}
            />
          ))}
        </div>

        {/* Localized glow effect that follows mouse */}
        {mouseY !== null && (
          <div
            className="pointer-events-none absolute h-12 w-full"
            style={{
              top: Math.max(0, mouseY - 24),
              background:
                'radial-gradient(circle at center, rgba(96, 165, 250, 0.2) 0%, rgba(255, 255, 255, 0) 70%)',
              filter: 'blur(4px)',
            }}
          />
        )}

        {/* Vertical borders */}
        <div className="absolute inset-y-0 -left-px w-px bg-slate-800" />
        <div className="absolute inset-y-0 -right-px w-px bg-slate-800" />
      </div>
    </div>
  );
};

export default ResizeBar;
