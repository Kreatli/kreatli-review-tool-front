import { SafeZoneScreen } from './SafeZoneScreen/SafeZoneScreen';

export const SocialMediaSafeZoneChecker = () => {
  return (
    <div className="p-6 pb-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-4 pb-4 pt-8">
          <h2 className="text-center font-sans text-2xl font-bold sm:text-4xl">Social Media Safe Zone Checker</h2>
          <p className="mx-auto max-w-2xl text-center text-large text-foreground-500">
            Preview your content with platform-specific safe zones and UI overlays for TikTok, Instagram Reels, and
            YouTube Shorts.
          </p>
        </div>
        <SafeZoneScreen />
      </div>
    </div>
  );
};
