import { cn, Radio, RadioGroup, Tooltip } from '@heroui/react';
import { AnimatePresence, motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import InstagramOverlay from '../../../assets/images/safe-zone-overlays/instagram-reels-overlay.png';
import InstagramSafeZoneOverlay from '../../../assets/images/safe-zone-overlays/instagram-reels-safe-zone-overlay.png';
import TiktokOverlay from '../../../assets/images/safe-zone-overlays/tiktok-overlay.png';
import TiktokSafeZoneOverlay from '../../../assets/images/safe-zone-overlays/tiktok-safe-zone-overlay.png';
import YoutubeOverlay from '../../../assets/images/safe-zone-overlays/youtube-shorts-overlay.png';
import YoutubeSafeZoneOverlay from '../../../assets/images/safe-zone-overlays/youtube-shorts-safe-zone-overlay.png';
import { useSession } from '../../../hooks/useSession';
import { useSignUpModalVisibility } from '../../../hooks/useSignUpModalVisibility';
import { Icon } from '../../various/Icon';
import { SafeZoneScreenEmptyState } from './SafeZoneScreenEmptyState';
import { SafeZoneScreenImage } from './SafeZoneScreenImage';
import { SafeZoneScreenVideo } from './SafeZoneScreenVideo';

const OVERLAYS = {
  instagram: InstagramOverlay,
  tiktok: TiktokOverlay,
  youtube: YoutubeOverlay,
};

const SAFE_ZONE_OVERLAYS = {
  instagram: InstagramSafeZoneOverlay,
  tiktok: TiktokSafeZoneOverlay,
  youtube: YoutubeSafeZoneOverlay,
};

interface SafeZoneScreenProps {
  defaultPlatform?: keyof typeof OVERLAYS;
}

export const SafeZoneScreen = ({ defaultPlatform = 'instagram' }: SafeZoneScreenProps = {}) => {
  const captureRef = useRef(null);
  const previousOverlayRef = useRef<keyof typeof OVERLAYS>(defaultPlatform);
  const platformSwitchCountRef = useRef(0);
  const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [activeOverlay, setActiveOverlay] = useState<keyof typeof OVERLAYS>(defaultPlatform);
  const [shouldShowSafeZone, setShouldShowSafeZone] = useState(false);

  const router = useRouter();
  const { openSignUpModal } = useSignUpModalVisibility();
  const { isSignedIn } = useSession();

  const activeOverlayData = (shouldShowSafeZone ? SAFE_ZONE_OVERLAYS : OVERLAYS)[activeOverlay];

  useEffect(() => {
    // Only count switches if the overlay actually changed and it's one of the three platforms
    // Don't show modal if user is already signed in
    if (activeOverlay !== previousOverlayRef.current && !isSignedIn) {
      platformSwitchCountRef.current += 1;

      // Show sign up modal every 3 switches (at 3, 6, 9, 12, etc.)
      if (platformSwitchCountRef.current % 3 === 0 && platformSwitchCountRef.current > 0) {
        openSignUpModal();
      }

      previousOverlayRef.current = activeOverlay;
    }
  }, [activeOverlay, openSignUpModal, isSignedIn]);

  // Gating: When a file is uploaded and user is not signed in, show preview then redirect to sign up
  useEffect(() => {
    // Clear any existing timeout
    if (redirectTimeoutRef.current) {
      clearTimeout(redirectTimeoutRef.current);
      redirectTimeoutRef.current = null;
    }

    // If file is uploaded and user is not signed in, redirect to sign up after showing preview
    if (file && !isSignedIn) {
      // Show preview for 2 seconds, then redirect to sign up
      redirectTimeoutRef.current = setTimeout(() => {
        router.push('/sign-up');
      }, 2000);
    }

    // Cleanup timeout on unmount or when file/signed in status changes
    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
        redirectTimeoutRef.current = null;
      }
    };
  }, [file, isSignedIn, router]);

  const isImageFile = file?.type.startsWith('image/');
  const isVideoFile = file?.type.startsWith('video/');

  const filePreviewUrl = useMemo(() => {
    return file ? URL.createObjectURL(file) : null;
  }, [file]);

  const handleDownload = async () => {
    const element = captureRef.current;

    if (!element) {
      return;
    }

    const canvas = await html2canvas(element, { useCORS: true });

    const imageURL = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = imageURL;
    link.download = `${file?.name ?? 'capture'}.png`;
    link.click();
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
      'video/*': [],
    },
    onDrop: (files) => {
      setFile(files[0]);
    },
    multiple: false,
  });

  return (
    <div className="flex flex-col items-center gap-3">
      <RadioGroup
        value={activeOverlay}
        orientation="horizontal"
        onValueChange={(value) => setActiveOverlay(value as keyof typeof OVERLAYS)}
      >
        <Radio value="instagram">Instagram</Radio>
        <Radio value="tiktok">TikTok</Radio>
        <Radio value="youtube">YouTube</Radio>
      </RadioGroup>
      <div className="w-full max-w-80">
        {filePreviewUrl && (
          <div className="flex w-full justify-between gap-2 p-2">
            <button
              type="button"
              className="flex items-center gap-1 text-xs text-foreground"
              onClick={() => setShouldShowSafeZone(!shouldShowSafeZone)}
            >
              <Icon icon={shouldShowSafeZone ? 'eyeCrossed' : 'eye'} size={12} />
              {shouldShowSafeZone ? 'Hide' : 'Show'} safe zone
            </button>
            <div className="flex gap-3">
              <button type="button" className="flex items-center gap-1 text-xs text-foreground" {...getRootProps()}>
                <input {...getInputProps()} />
                <Icon icon="addImage" size={16} />
                Select
              </button>
              <button
                type="button"
                className="flex items-center gap-1 text-xs text-foreground"
                onClick={openSignUpModal}
              >
                <Icon icon="share" size={16} />
                Share
              </button>
              <Tooltip content="Download" isDisabled={!filePreviewUrl}>
                <button
                  type="button"
                  className={cn('text-foreground', { 'cursor-not-allowed opacity-50': !filePreviewUrl })}
                  disabled={!filePreviewUrl}
                  onClick={handleDownload}
                >
                  <Icon icon="download" size={16} />
                </button>
              </Tooltip>
            </div>
          </div>
        )}
        <div className="relative w-full">
          <div ref={captureRef} className="relative w-full border border-foreground-300">
            <div className="aspect-[9/16] w-full">
              {filePreviewUrl && isImageFile && <SafeZoneScreenImage src={filePreviewUrl} />}
              {filePreviewUrl && isVideoFile && (
                <SafeZoneScreenVideo src={filePreviewUrl} activeOverlay={activeOverlay} />
              )}
              {!filePreviewUrl && <SafeZoneScreenEmptyState onUploadFile={setFile} />}
            </div>
            <AnimatePresence>
              <motion.img
                src={activeOverlayData.src}
                className={cn('pointer-events-none absolute inset-0 w-full rounded-none')}
                exit={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                initial={{ opacity: 0 }}
                key={activeOverlayData.src}
                alt="Instagram Overlay"
              />
            </AnimatePresence>
            <div className="flex h-14 w-full items-center justify-center bg-black text-white">
              <Icon icon={activeOverlay} size={28} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
