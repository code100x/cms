import { twitterData } from '@/utiles/success-tweets';
import { Tweet } from 'react-tweet';
import { motion } from 'framer-motion';
// import { useState } from 'react';

const columnData = [
  twitterData.slice(0, 5),
  twitterData.slice(6, 11),
  twitterData.slice(12, 16),
];

export default function TwitterEmbed() {
  // const [isMouseHovered, setIsMouseHovered] = useState(false);

  // const handleHover = () => setIsMouseHovered(true);
  // const handleNoHover = () => setIsMouseHovered(false);
  return (
    <div className="relative mt-20 grid h-[50rem] w-full gap-8 overflow-hidden p-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {columnData.map((column, columnIndex) => (
        <motion.div
          key={columnIndex}
          className="flex flex-col"
          // animate={!isMouseHovered ? { y: ['0%', '-100%'] } : {}}
          animate={{ y: ['0%', '-100%'] }}
          transition={{
            // repeat: isMouseHovered ? Infinity : 0,
            repeat: Infinity,
            duration: 50,
            ease: 'linear',
          }}
          // onMouseEnter={handleHover}
          // onMouseLeave={handleNoHover}
        >
          {[...column, ...column].map((tweet, index) => (
            <Tweet key={`${tweet}-${index}`} id={tweet} />
          ))}
        </motion.div>
      ))}
      {/* </div> */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-blue-500 to-blue-200 blur-[16rem]"></div>
    </div>
  );
}
