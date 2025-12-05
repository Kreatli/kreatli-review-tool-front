import { Button, Chip } from '@heroui/react';
import React, { useState, useRef } from 'react';

import { useSession } from '../../hooks/useSession';
import { SafeZoneUpload, Platform } from './SafeZoneUpload';
import { SafeZonePreview } from './SafeZonePreview';
import { SafeZoneVideoControls } from './SafeZoneVideoControls';
import { SafeZoneExport } from './SafeZoneExport';
import { SafeZoneGuide } from './SafeZoneGuide';

const PLATFORM_LABELS: Record<Platform, string> = {
  tiktok: 'TikTok',
  'instagram-reels': 'Instagram Reels',
  'youtube-shorts': 'YouTube Shorts',
};

export const SafeZoneChecker = () => {
  const { isSignedIn } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('tiktok');
  const [showSafeZones, setShowSafeZones] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [suggestedPlatforms, setSuggestedPlatforms] = useState<Platform[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleFileSelect = (selectedFile: File, aspectRatio: number, platforms: Platform[]) => {
    setFile(selectedFile);
    setSuggestedPlatforms(platforms);
    if (platforms.length > 0) {
      setSelectedPlatform(platforms[0]);
    }
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const handleVideoLoad = (video: HTMLVideoElement) => {
    videoRef.current = video;
    setDuration(video.duration || 0);
    video.addEventListener('timeupdate', () => {
      if (!video.paused) {
        setCurrentTime(video.currentTime);
      }
    });
    video.addEventListener('play', () => setIsPlaying(true));
    video.addEventListener('pause', () => setIsPlaying(false));
  };

  const handleTimeChange = (time: number) => {
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const isVideo = file?.type.startsWith('video/') ?? false;

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center flex flex-col gap-6 relative z-10">
          <h1 className="text-2xl sm:text-4xl font-bold font-sans max-w-lg mx-auto">Safe Zone Checker</h1>
          <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
            Preview your content with platform-specific safe zones and UI overlays for TikTok, Instagram Reels, and
            YouTube Shorts.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="relative py-16 px-6 backdrop-blur-lg overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
            {/* Left Column - Upload and Controls */}
            <div className="lg:col-span-1 flex flex-col gap-4 md:gap-6">
              {!file ? (
                <SafeZoneUpload onFileSelect={handleFileSelect} />
              ) : (
                <>
                  <div className="flex flex-col gap-3 md:gap-4">
                    <div>
                      <h2 className="text-base md:text-lg font-semibold font-sans mb-2">Platform Overlay</h2>
                      <div className="flex gap-2">
                        {suggestedPlatforms.length > 0
                          ? suggestedPlatforms.map((platform) => (
                              <button
                                key={platform}
                                onClick={() => setSelectedPlatform(platform)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                  selectedPlatform === platform
                                    ? 'bg-foreground text-content1 shadow-sm'
                                    : 'bg-background border border-foreground-300 text-foreground'
                                }`}
                              >
                                {PLATFORM_LABELS[platform]}
                              </button>
                            ))
                          : Object.entries(PLATFORM_LABELS).map(([key, label]) => (
                              <button
                                key={key}
                                onClick={() => setSelectedPlatform(key as Platform)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                  selectedPlatform === key
                                    ? 'bg-foreground text-content1 shadow-sm'
                                    : 'bg-background border border-foreground-300 text-foreground'
                                }`}
                              >
                                {label}
                              </button>
                            ))}
                      </div>
                    </div>

                    {suggestedPlatforms.length === 0 && (
                      <Chip color="warning" variant="flat" size="sm">
                        Aspect ratio may not match 9:16 format
                      </Chip>
                    )}
                  </div>

                  {isVideo && videoRef.current && (
                    <SafeZoneVideoControls
                      video={videoRef.current}
                      currentTime={currentTime}
                      duration={duration}
                      isPlaying={isPlaying}
                      onTimeChange={handleTimeChange}
                      onPlayPause={handlePlayPause}
                    />
                  )}

                  <SafeZoneExport
                    file={file}
                    platform={selectedPlatform}
                    showSafeZones={showSafeZones}
                    currentTime={isVideo ? currentTime : undefined}
                    isVideo={isVideo}
                    isSignedIn={isSignedIn}
                  />

                  <Button
                    variant="bordered"
                    onPress={() => {
                      setFile(null);
                      setCurrentTime(0);
                      setDuration(0);
                      setIsPlaying(false);
                      videoRef.current = null;
                    }}
                  >
                    Upload New File
                  </Button>
                </>
              )}
            </div>

            {/* Right Column - Preview */}
            <div className="lg:col-span-2 flex items-center justify-center">
              {file ? (
                <div className="w-full max-w-md mx-auto flex items-center justify-center py-4">
                  <div
                    className="w-full"
                    style={{
                      aspectRatio: '9/16',
                      maxWidth: '100%',
                    }}
                  >
                    <SafeZonePreview
                      file={file}
                      platform={selectedPlatform}
                      showSafeZones={showSafeZones}
                      currentTime={isVideo ? currentTime : undefined}
                      onVideoLoad={handleVideoLoad}
                    />
                  </div>
                </div>
              ) : (
                <div
                  className="w-full max-w-md mx-auto bg-foreground-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-foreground-300"
                  style={{
                    aspectRatio: '9/16',
                    maxHeight: '100%',
                    maxWidth: '100%',
                  }}
                >
                  <p className="text-foreground-400">Upload a file to preview</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Safe Zone Guide Section */}
      <SafeZoneGuide />
    </>
  );
};
