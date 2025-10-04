'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Props {
  logos: string[];
  delay?: number;
  direction?: 'top' | 'bottom';
}

export const LogoSlideshow = ({ logos, delay = 0, direction = 'bottom' }: Props) => {
  const [activeIndex, setActiveIndex] = useState(logos.length - 1);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setActiveIndex(0);
    }, 0);

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % logos.length);
    }, 3000);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <span className="inline relative">
      <span className="invisible">
        <img className="inline" src={logos[activeIndex]} width="96" height="24" />
      </span>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.img
          key={activeIndex}
          src={logos[activeIndex]}
          width="96"
          height="24"
          className="absolute inset-0 dark:invert dark:grayscale dark:brightness-50"
          initial={{ y: direction === 'top' ? '100%' : '-100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: direction === 'top' ? '-100%' : '100%', opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut', delay: delay }}
        />
      </AnimatePresence>
    </span>
  );
};
