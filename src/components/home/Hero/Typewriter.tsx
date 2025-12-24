'use client';

import { useEffect, useState } from 'react';
import styles from './HeroSection.module.css';

interface TypewriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

export const Typewriter = ({ words, typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000 }: TypewriterProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(pauseTimeout);
    }

    const currentWord = words[currentWordIndex];
    if (!currentWord) return;

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (currentText.length < currentWord.length) {
            setCurrentText(currentWord.slice(0, currentText.length + 1));
          } else {
            // Finished typing, pause then start deleting
            setIsPaused(true);
          }
        } else {
          // Deleting
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1));
          } else {
            // Finished deleting, move to next word
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed,
    );

    return () => clearTimeout(timeout);
  }, [currentText, currentWordIndex, isDeleting, isPaused, words, typingSpeed, deletingSpeed, pauseTime]);

  // Calculate the width needed for the longest word to prevent layout shifts
  const longestWord = words.reduce((a, b) => (a.length > b.length ? a : b), '');

  return (
    <span className="inline-block min-w-[1ch] relative" style={{ minWidth: `${longestWord.length}ch` }}>
      <span className="relative inline-block px-3 py-1.5">
        {/* Background highlight badge */}
        <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-lg blur-sm -z-10" />
        <span className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-lg -z-10" />

        {/* Main text with vibrant gradient */}
        <span
          className={`inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-extrabold ${styles.animateGradient}`}
        >
          {currentText}
        </span>

        {/* Glow effect */}
        <span className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-xl rounded-lg -z-10" />
      </span>

      {/* Enhanced cursor */}
      <span
        className={`ml-1.5 inline-block w-0.5 h-[1em] align-middle bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full ${styles.animateBlink}`}
      />
    </span>
  );
};
