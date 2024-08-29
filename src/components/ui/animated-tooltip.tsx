'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from 'framer-motion';

export const AnimatedTooltip = ({
  items,
  expanded,
}: {
  items: {
    id: number;
    name: string;
    Component: any;
    href: string;
  }[];
  expanded: any;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); // going to set this value on mouse move
  // rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig,
  );
  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig,
  );
  return (
    <>
      {items.map((item) => (
        <div
          className="group relative"
          key={item.name}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {!expanded && (
            <AnimatePresence>
              {hoveredIndex === item.id && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.6 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: 'spring',
                      stiffness: 260,
                      damping: 10,
                    },
                  }}
                  exit={{ opacity: 0, y: 20, scale: 0.6 }}
                  style={{
                    translateX,
                    rotate,
                    whiteSpace: 'nowrap',
                  }}
                  className="absolute -top-16 z-50 flex translate-x-1/2 flex-col items-center justify-center rounded-md bg-[#0c0a09] px-4 py-2 text-xs shadow-xl"
                >
                  <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                  <div className="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
                  <div className="relative z-30 text-base font-bold text-white">
                    {item.name}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
          <Link
            href={item.href}
            className={`flex flex-row whitespace-nowrap ${hoveredIndex === item.id && 'rounded-md bg-gray-700/50'} items-center space-x-6 p-2`}
          >
            <item.Component selected={hoveredIndex === item.id} size={25} />
            {expanded && <h4 className="font-semibold">{item.name}</h4>}
          </Link>
        </div>
      ))}
    </>
  );
};
