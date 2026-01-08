import { cn } from '@heroui/react';

import styles from './Decorations.module.scss';

export const Decorations = () => {
  return (
    <div className="pointer-events-none fixed inset-x-0 inset-y-8">
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
      <div className={cn('absolute right-16 top-2/3 h-3 w-3 rounded-full bg-green-400/50', styles.animateFloatFast)} />
      <div
        className={cn('absolute bottom-24 left-1/4 h-2 w-2 rounded-full bg-orange-400/50', styles.animateFloatMedium)}
      />
      <div className={cn('absolute bottom-32 right-24 h-3 w-3 rounded-full bg-cyan-400/50', styles.animateFloatSlow)} />
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
  );
};
