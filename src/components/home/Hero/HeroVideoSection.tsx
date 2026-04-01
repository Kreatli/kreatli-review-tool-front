import React, { useEffect, useRef } from 'react';

export const HeroVideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const STORAGE_KEY = 'kreatli:heroVideo:muted';

    const getSavedMuted = () => {
      try {
        return sessionStorage.getItem(STORAGE_KEY) === '1';
      } catch {
        return false;
      }
    };

    const setSavedMuted = (muted: boolean) => {
      try {
        sessionStorage.setItem(STORAGE_KEY, muted ? '1' : '0');
      } catch {
        // ignore (privacy mode / blocked storage)
      }
    };

    // Initialize from saved preference (defaults to sound on).
    video.muted = getSavedMuted();

    const handleVolumeChange = () => {
      setSavedMuted(video.muted);
    };
    video.addEventListener('volumechange', handleVolumeChange);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // Respect user's in-session preference; don't force sound back on if they muted it.
            video.muted = getSavedMuted();
            void video.play().catch(() => {
              // Browsers often block unmuted autoplay without a user gesture; fall back so playback still starts.
              video.muted = true;
              void video.play().catch(() => {
                /* Still blocked in strict privacy modes */
              });
            });
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.35, rootMargin: '0px' },
    );

    observer.observe(video);

    return () => {
      video.removeEventListener('volumechange', handleVolumeChange);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="w-full bg-background py-12 sm:py-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 px-4 sm:px-6">
        <h2 className="text-center font-sans text-3xl font-bold sm:text-4xl">See Kreatli in motion</h2>

        <div className="mt-4 w-full overflow-hidden rounded-2xl border border-default-200 bg-black shadow-lg">
          <video
            ref={videoRef}
            className="h-full w-full"
            src="/videos/202603271746.mp4"
            controls
            playsInline
            preload="metadata"
          />
        </div>
      </div>
    </section>
  );
};
