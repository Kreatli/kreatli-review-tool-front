import { SafeZoneScreen } from './SafeZoneScreen/SafeZoneScreen';

export const SocialMediaSafeZoneChecker = () => {
  return (
    <div className="p-6 border-t border-foreground-200 pb-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col gap-4 pt-8 pb-4">
          <h2 className="text-2xl sm:text-4xl font-bold font-sans text-center">Social Media Safe Zone Checker</h2>
          <p className="text-foreground-500 text-center text-large max-w-2xl mx-auto">
            Preview your content with platform-specific safe zones and UI overlays for TikTok, Instagram Reels, and
            YouTube Shorts.
          </p>
        </div>
        <SafeZoneScreen />
      </div>
    </div>
  );
};
