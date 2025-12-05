import { addToast, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import { useGoogleLogin } from '@react-oauth/google';
import React, { useState } from 'react';

import { usePostAuthSsoGoogle } from '../../services/hooks';
import { getAxiosInstance } from '../../services/config';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { downloadScreenshot, exportScreenshot } from '../../utils/safeZoneExport';
import { Platform } from './SafeZoneUpload';

const PLATFORM_LABELS: Record<Platform, string> = {
  tiktok: 'TikTok',
  'instagram-reels': 'Instagram Reels',
  'youtube-shorts': 'YouTube Shorts',
};

interface Props {
  file: File | null;
  platform: Platform;
  showSafeZones: boolean;
  currentTime?: number;
  isVideo: boolean;
  isSignedIn: boolean;
}

export const SafeZoneExport = ({ file, platform, showSafeZones, currentTime, isVideo, isSignedIn }: Props) => {
  const [isExporting, setIsExporting] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { mutate: ssoSignUp, isPending: isSsoPending } = usePostAuthSsoGoogle();
  const platformLabel = PLATFORM_LABELS[platform];

  const handleLowResExport = async () => {
    if (!file) return;

    setIsExporting(true);
    try {
      const dataUrl = await exportScreenshot({
        file,
        platform,
        showSafeZones,
        currentTime,
        quality: 'low',
      });

      const filename = `safe-zone-preview-${platform}-${Date.now()}.png`;
      downloadScreenshot(dataUrl, filename);

      addToast({
        title: 'Preview screenshot downloaded',
        color: 'success',
        variant: 'flat',
      });
    } catch (error) {
      addToast({
        title: getErrorMessage(error),
        color: 'danger',
        variant: 'flat',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const performFullResExport = async () => {
    if (!file) return;

    setIsExporting(true);
    try {
      const dataUrl = await exportScreenshot({
        file,
        platform,
        showSafeZones,
        currentTime,
        quality: 'high',
      });

      const filename = `safe-zone-export-${platform}-${Date.now()}.png`;
      downloadScreenshot(dataUrl, filename);

      addToast({
        title: 'Full-resolution screenshot exported',
        color: 'success',
        variant: 'flat',
      });
    } catch (error) {
      addToast({
        title: getErrorMessage(error),
        color: 'danger',
        variant: 'flat',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleFullResExport = async () => {
    if (!file) return;

    if (!isSignedIn) {
      setShowAuthModal(true);
      return;
    }

    await performFullResExport();
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      ssoSignUp(
        { requestBody: { token: response.access_token } },
        {
          onSuccess: ({ token }) => {
            localStorage.setItem('token', token);
            getAxiosInstance(undefined).defaults.headers.Authorization = `Bearer ${token}`;
            setShowAuthModal(false);
            addToast({
              title: 'Welcome to Kreatli. Your checked asset is now in a new project, ready for review.',
              color: 'success',
              variant: 'flat',
            });
            // After signup, automatically trigger full-res export
            performFullResExport();
          },
          onError: (error) => {
            addToast({
              title: getErrorMessage(error),
              color: 'danger',
              variant: 'flat',
            });
          },
        },
      );
    },
    onError: () => {
      addToast({
        title: 'Failed to sign up with Google. Please try again later.',
        color: 'danger',
        variant: 'flat',
      });
    },
  });

  if (!file) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div>
          <Button
            className="bg-foreground text-content1"
            onClick={handleFullResExport}
            isLoading={isExporting || isSsoPending}
            disabled={isExporting}
            aria-label={`Download ${platformLabel} safe zone overlay export`}
            aria-describedby="export-description"
          >
            {isExporting || isSsoPending
              ? `Exporting ${platformLabel} overlay...`
              : `Download ${platformLabel} Overlay`}
          </Button>
          <div id="export-description" className="sr-only">
            Export your content with {platformLabel} safe zone overlay and UI elements
          </div>
        </div>
      </div>

      <Modal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        size="md"
        aria-labelledby="auth-modal-title"
        aria-describedby="auth-modal-description"
      >
        <ModalContent>
          <ModalHeader id="auth-modal-title">Sign up to export</ModalHeader>
          <ModalBody>
            <p id="auth-modal-description" className="text-sm text-foreground-600">
              Export full-resolution screenshots with {platformLabel} overlay, save to a project, or share with a client
              by signing in with Google.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={() => setShowAuthModal(false)} aria-label="Cancel sign up">
              Cancel
            </Button>
            <Button
              color="primary"
              onPress={() => googleLogin()}
              isLoading={isSsoPending}
              aria-label="Sign up with Google to export"
            >
              Sign up with Google
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
