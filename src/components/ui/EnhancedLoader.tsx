"use client"

import { motion } from "framer-motion"

interface EnhancedLoaderProps {
  color?: string
  size?: "sm" | "md" | "lg"
}

export function EnhancedLoader({ color = "white", size = "md" }: EnhancedLoaderProps) {
  const dotSize = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-2.5 h-2.5"
  }

  return (
    <div className="flex items-center justify-center">
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={index}
          className={`${dotSize[size]} rounded-full mx-0.5`}
          style={{ backgroundColor: color }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.2,
          }}
        />
      ))}
    </div>
  )
}
