import { Button, cn } from '@heroui/react';
import NextLink from 'next/link';

import { Icon } from '../../various/Icon';
import styles from './HeroSection.module.css';
import { Typewriter } from './Typewriter';

export const HeroSection = () => {
  const typewriterWords = [
    'Ad & Marketing Agencies',
    'Animation Studios',
    'In-House Teams',
    'Creative & Content Teams',
  ];

  return (
    <section className="relative flex w-full items-center justify-center overflow-hidden">
      <div className="relative z-10 flex w-full flex-col gap-8 px-4 pb-12 pt-6 text-center sm:gap-12 sm:px-6 sm:pb-20 sm:pt-10 lg:gap-16">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 sm:gap-6">
          <h1 className="font-sans text-2xl font-bold sm:text-4xl md:text-5xl lg:text-7xl">
            End-to-End{' '}
            <span
              className={cn(
                'inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent',
                styles.animateGradient,
              )}
            >
              Video
            </span>
            <br />
            Production Platform for
            <br />
            <Typewriter words={typewriterWords} />
          </h1>
          <div className="mt-4 flex w-full flex-col items-center gap-3 sm:mt-6 sm:w-auto sm:gap-4 md:flex-row md:gap-6">
            <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
              Start for Free
              <Icon icon="arrowRight" size={20} />
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
        <div id="arcade-demo" className="mx-auto w-full max-w-6xl scroll-mt-16 sm:scroll-mt-20">
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

      <div className="pointer-events-none fixed inset-x-0 inset-y-8 hidden sm:block">
        <div
          className={cn(
            'absolute left-24 top-20 h-32 w-32 rounded-full bg-gradient-to-br from-blue-300/30 to-purple-300/30',
            styles.animateFloatSlow,
          )}
        />
        <div
          className={cn(
            'absolute right-20 top-40 h-24 w-24 rounded-full bg-gradient-to-br from-pink-300/30 to-orange-300/30',
            styles.animateFloatMedium,
          )}
        />
        <div
          className={cn(
            'absolute bottom-32 left-1/4 h-20 w-20 rounded-full bg-gradient-to-br from-green-300/30 to-blue-300/30',
            styles.animateFloatFast,
          )}
        />
        <div
          className={cn(
            'absolute bottom-20 right-1/4 h-28 w-28 rounded-full bg-gradient-to-br from-purple-300/30 to-pink-300/30',
            styles.animateFloatSlow,
          )}
        />

        <div
          className={cn(
            'absolute left-1/4 top-1/3 h-16 w-16 rounded-full bg-gradient-to-br from-yellow-300/25 to-orange-300/25',
            styles.animateFloatMedium,
          )}
        />
        <div
          className={cn(
            'absolute left-12 right-1 top-1/2 h-12 w-12 rounded-full bg-gradient-to-br from-cyan-300/25 to-blue-300/25',
            styles.animateFloatFast,
          )}
        />
        <div
          className={cn(
            'absolute bottom-1/3 left-1/2 h-14 w-14 rounded-full bg-gradient-to-br from-pink-300/25 to-purple-300/25',
            styles.animateFloatSlow,
          )}
        />

        <div className={cn('absolute left-1/3 top-16 h-3 w-3 rounded-full bg-blue-400/50', styles.animateFloatFast)} />
        <div
          className={cn('absolute right-1/4 top-24 h-2 w-2 rounded-full bg-purple-400/50', styles.animateFloatMedium)}
        />
        <div className={cn('absolute left-1/3 top-1/2 h-4 w-4 rounded-full bg-pink-400/50', styles.animateFloatSlow)} />
        <div
          className={cn('absolute right-16 top-2/3 h-3 w-3 rounded-full bg-green-400/50', styles.animateFloatFast)}
        />
        <div
          className={cn('absolute bottom-24 left-1/4 h-2 w-2 rounded-full bg-orange-400/50', styles.animateFloatMedium)}
        />
        <div
          className={cn('absolute bottom-32 right-24 h-3 w-3 rounded-full bg-cyan-400/50', styles.animateFloatSlow)}
        />
        <div
          className={cn('absolute bottom-16 left-1/2 h-2 w-2 rounded-full bg-yellow-400/50', styles.animateFloatFast)}
        />
        <div
          className={cn(
            'absolute bottom-28 left-10 right-1 h-4 w-4 rounded-full bg-indigo-400/50',
            styles.animateFloatMedium,
          )}
        />
      </div>
    </section>
  );
};
