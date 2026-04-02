import React, { useEffect, useRef } from 'react';

export const HeroVideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const STORAGE_KEY = 'kreatli:heroVideo:muted';
    // Avoid persisting mute state for programmatic mute/unmute attempts
    // (e.g. when the browser blocks unmuted autoplay).
    const skipPersistRef = { current: false };

    const setMutedProgrammatically = (muted: boolean) => {
      // Mark as programmatic before updating the element.
      skipPersistRef.current = true;
      video.muted = muted;
      // `volumechange` can fire after the mute flag is applied.
      window.setTimeout(() => {
        skipPersistRef.current = false;
      }, 100);
    };

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
    setMutedProgrammatically(getSavedMuted());

    const handleVolumeChange = () => {
      if (skipPersistRef.current) return;
      setSavedMuted(video.muted);
    };
    video.addEventListener('volumechange', handleVolumeChange);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // Respect user's in-session preference; don't force sound back on if they muted it.
            const savedMuted = getSavedMuted();

            const attemptPlay = () => {
              setMutedProgrammatically(savedMuted);
              void video.play().catch(() => {
                // Browsers often block unmuted autoplay without a user gesture; fall back so playback still starts.
                setMutedProgrammatically(true);
                void video.play().catch(() => {
                  /* Still blocked in strict privacy modes */
                });
              });
            };

            // Avoid calling `play()` too early (some browsers reject it until metadata is ready).
            if (video.readyState >= 2) {
              attemptPlay();
            } else {
              video.addEventListener(
                'loadedmetadata',
                () => {
                  attemptPlay();
                },
                { once: true },
              );
            }
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
            src="/videos/ad-compressed.mp4"
            controls
            playsInline
            preload="metadata"
          />
        </div>
      </div>
    </section>
  );
};
