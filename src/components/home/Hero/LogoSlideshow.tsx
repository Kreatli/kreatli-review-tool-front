'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface Props {
  logos: string[];
  delay?: number;
  direction?: 'top' | 'bottom';
}

export const LogoSlideshow = ({ logos, delay = 0, direction = 'bottom' }: Props) => {
  const [activeIndex, setActiveIndex] = useState(logos.length - 1);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const pauseSlideshow = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = null;
  };

  const resumeSlideshow = () => {
    if (intervalRef.current) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % logos.length);
    }, 3000);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setActiveIndex(0);
    }, 0);

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % logos.length);
    }, 3000);

    return () => {
      clearTimeout(timeout);

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        pauseSlideshow();
      } else {
        resumeSlideshow();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Extract logo name from path for alt text
  const getLogoName = (logoPath: string) => {
    const match = logoPath.match(/\/([^/]+)\.(svg|png|jpg)$/i);
    if (match) {
      return match[1].replace(/[-_]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
    }
    return 'Partner logo';
  };

  const currentLogoName = getLogoName(logos[activeIndex]);

  return (
    <span className="relative inline">
      <span className="invisible">
        <img className="inline" src={logos[activeIndex]} width="96" height="24" alt={currentLogoName} />
      </span>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.img
          key={activeIndex}
          src={logos[activeIndex]}
          width="96"
          height="24"
          alt={currentLogoName}
          className="absolute inset-0 dark:brightness-50 dark:grayscale dark:invert"
          initial={{ y: direction === 'top' ? '100%' : '-100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: direction === 'top' ? '-100%' : '100%', opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut', delay: delay }}
        />
      </AnimatePresence>
    </span>
  );
};
