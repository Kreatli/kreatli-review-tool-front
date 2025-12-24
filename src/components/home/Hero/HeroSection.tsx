'use client';

import { Button } from '@heroui/react';
import { Icon } from '../../various/Icon';
import styles from './HeroSection.module.css';
import { Typewriter } from './Typewriter';

export const HeroSection = () => {
  const scrollToDemo = () => {
    const demoSection = document.getElementById('arcade-demo');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const typewriterWords = [
    'Ad & Marketing Agencies',
    'Animation Studios',
    'In-House Video Teams',
    'Creative & Content Teams',
  ];

  return (
    <section className="relative w-full flex items-center justify-center overflow-hidden">
      <div className="text-center w-full flex flex-col gap-16 px-6 pt-10 pb-20 relative z-10">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-4">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-sans">
            End-to-End Creative
            <br />
            Production Platform for
            <br />
            <Typewriter words={typewriterWords} />
          </h1>
          <div className="flex flex-col mt-4 md:flex-row gap-6">
            <Button onClick={scrollToDemo} size="lg" className="bg-foreground text-content1">
              See How it Works
              <Icon icon="chevronDown" size={20} />
            </Button>
            <Button
              as="a"
              href="https://calendar.app.google/NXbAeTAUwaBGh5x49"
              target="_blank"
              size="lg"
              variant="light"
            >
              <Icon icon="calendar" />
              Book a Demo
            </Button>
          </div>
        </div>
        <div id="arcade-demo" className="max-w-6xl mx-auto w-full scroll-mt-20">
          <div className="relative h-0 w-full pb-[calc(51%)]">
            <iframe
              src="https://demo.arcade.software/PPu2mnyNxXzs5sVzGfOA?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true"
              title="Review Video Feedback and Compare Creative Asset Versions"
              frameBorder="0"
              loading="lazy"
              allowFullScreen
              allow="clipboard-write"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                colorScheme: 'light',
              }}
            />
          </div>
        </div>
      </div>

      <div className="fixed inset-y-8 inset-x-0 pointer-events-none">
        <div
          className={`absolute top-20 left-24 w-32 h-32 bg-gradient-to-br from-blue-300/30 to-purple-300/30 rounded-full ${styles.animateFloatSlow}`}
        />
        <div
          className={`absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-pink-300/30 to-orange-300/30 rounded-full ${styles.animateFloatMedium}`}
        />
        <div
          className={`absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-br from-green-300/30 to-blue-300/30 rounded-full ${styles.animateFloatFast}`}
        />
        <div
          className={`absolute bottom-20 right-1/4 w-28 h-28 bg-gradient-to-br from-purple-300/30 to-pink-300/30 rounded-full ${styles.animateFloatSlow}`}
        />

        <div
          className={`absolute top-1/3 left-1/4 w-16 h-16 bg-gradient-to-br from-yellow-300/25 to-orange-300/25 rounded-full ${styles.animateFloatMedium}`}
        />
        <div
          className={`absolute top-1/2 right-1 left-12 w-12 h-12 bg-gradient-to-br from-cyan-300/25 to-blue-300/25 rounded-full ${styles.animateFloatFast}`}
        />
        <div
          className={`absolute bottom-1/3 left-1/2 w-14 h-14 bg-gradient-to-br from-pink-300/25 to-purple-300/25 rounded-full ${styles.animateFloatSlow}`}
        />

        <div className={`absolute top-16 left-1/3 w-3 h-3 bg-blue-400/50 rounded-full ${styles.animateFloatFast}`} />
        <div
          className={`absolute top-24 right-1/4 w-2 h-2 bg-purple-400/50 rounded-full ${styles.animateFloatMedium}`}
        />
        <div className={`absolute top-1/2 left-1/3 w-4 h-4 bg-pink-400/50 rounded-full ${styles.animateFloatSlow}`} />
        <div className={`absolute top-2/3 right-16 w-3 h-3 bg-green-400/50 rounded-full ${styles.animateFloatFast}`} />
        <div
          className={`absolute bottom-24 left-1/4 w-2 h-2 bg-orange-400/50 rounded-full ${styles.animateFloatMedium}`}
        />
        <div className={`absolute bottom-32 right-24 w-3 h-3 bg-cyan-400/50 rounded-full ${styles.animateFloatSlow}`} />
        <div
          className={`absolute bottom-16 left-1/2 w-2 h-2 bg-yellow-400/50 rounded-full ${styles.animateFloatFast}`}
        />
        <div
          className={`absolute bottom-28 right-1 left-10 w-4 h-4 bg-indigo-400/50 rounded-full ${styles.animateFloatMedium}`}
        />
      </div>
    </section>
  );
};
