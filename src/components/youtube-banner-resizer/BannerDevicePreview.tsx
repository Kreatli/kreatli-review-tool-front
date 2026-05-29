import { cn } from '@heroui/react';
import { useCallback, useEffect, useRef, useState } from 'react';

import {
  DESKTOP_SAFE_HEIGHT,
  DESKTOP_SAFE_WIDTH,
  MOBILE_SAFE_HEIGHT,
  MOBILE_SAFE_WIDTH,
  SAFE_ZONE,
} from './bannerGeometry';
import { FrameRelative } from './bannerViewport';

type DeviceTab = 'desktop' | 'mobile';

interface BannerDevicePreviewProps {
  imageUrl: string | null;
  frameRelative: FrameRelative;
  naturalWidth: number;
  naturalHeight: number;
}

const DEVICE_CONFIGS = {
  desktop: {
    label: 'Desktop',
    safeWidth: DESKTOP_SAFE_WIDTH,
    safeHeight: DESKTOP_SAFE_HEIGHT,
    srcLeft: 0,
    srcTop: SAFE_ZONE.desktop.top,
    srcWidth: 1,
    srcHeight: SAFE_ZONE.desktop.bottom - SAFE_ZONE.desktop.top,
  },
  mobile: {
    label: 'Mobile',
    safeWidth: MOBILE_SAFE_WIDTH,
    safeHeight: MOBILE_SAFE_HEIGHT,
    srcLeft: SAFE_ZONE.mobile.left,
    srcTop: SAFE_ZONE.mobile.top,
    srcWidth: SAFE_ZONE.mobile.right - SAFE_ZONE.mobile.left,
    srcHeight: SAFE_ZONE.mobile.bottom - SAFE_ZONE.mobile.top,
  },
} as const;

const CANVAS_RENDER_HEIGHT = 160;

function drawDeviceBanner(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  frame: FrameRelative,
  natW: number,
  natH: number,
  device: DeviceTab,
) {
  const cfg = DEVICE_CONFIGS[device];
  const aspect = cfg.safeWidth / cfg.safeHeight;

  const renderW = Math.round(CANVAS_RENDER_HEIGHT * aspect);
  const renderH = CANVAS_RENDER_HEIGHT;
  canvas.width = renderW;
  canvas.height = renderH;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.fillStyle = '#0f0f0f';
  ctx.fillRect(0, 0, renderW, renderH);

  const fx = frame.nx * natW;
  const fy = frame.ny * natH;
  const fw = frame.nw * natW;
  const fh = frame.nh * natH;

  const sx = fx + cfg.srcLeft * fw;
  const sy = fy + cfg.srcTop * fh;
  const sw = cfg.srcWidth * fw;
  const sh = cfg.srcHeight * fh;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, renderW, renderH);
}

export const BannerDevicePreview = ({
  imageUrl,
  frameRelative,
  naturalWidth,
  naturalHeight,
}: BannerDevicePreviewProps) => {
  const [activeTab, setActiveTab] = useState<DeviceTab>('desktop');
  const desktopCanvasRef = useRef<HTMLCanvasElement>(null);
  const mobileCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const renderPreviews = useCallback(() => {
    const img = imgRef.current;
    if (!img || !naturalWidth || !naturalHeight) return;

    if (desktopCanvasRef.current) {
      drawDeviceBanner(desktopCanvasRef.current, img, frameRelative, naturalWidth, naturalHeight, 'desktop');
    }
    if (mobileCanvasRef.current) {
      drawDeviceBanner(mobileCanvasRef.current, img, frameRelative, naturalWidth, naturalHeight, 'mobile');
    }
  }, [frameRelative, naturalWidth, naturalHeight]);

  useEffect(() => {
    if (!imageUrl) {
      imgRef.current = null;
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imgRef.current = img;
      renderPreviews();
    };
    img.src = imageUrl;
  }, [imageUrl, renderPreviews]);

  useEffect(() => {
    renderPreviews();
  }, [renderPreviews]);

  if (!imageUrl) return null;

  return (
    <div className="rounded-lg border border-foreground-200 bg-content1 p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold text-foreground-700">Device Preview</h3>

      {/* Tab buttons */}
      <div className="mb-4 flex gap-1 rounded-lg bg-foreground-100 p-1">
        {(['desktop', 'mobile'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={cn(
              'flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-all',
              activeTab === tab
                ? 'bg-white text-foreground-900 shadow-sm'
                : 'text-foreground-500 hover:text-foreground-700',
            )}
          >
            {tab === 'desktop' ? 'Desktop' : 'Mobile'}
          </button>
        ))}
      </div>

      {/* Desktop preview */}
      <div className={cn('transition-opacity duration-200', activeTab !== 'desktop' && 'hidden')}>
        <DesktopMockup canvasRef={desktopCanvasRef} />
      </div>

      {/* Mobile preview */}
      <div className={cn('transition-opacity duration-200', activeTab !== 'mobile' && 'hidden')}>
        <MobileMockup canvasRef={mobileCanvasRef} />
      </div>

      <p className="mt-3 text-[11px] leading-relaxed text-foreground-400">
        {activeTab === 'desktop'
          ? `Desktop viewers see the full ${DESKTOP_SAFE_WIDTH}×${DESKTOP_SAFE_HEIGHT}px strip across the top of your channel page.`
          : `Mobile viewers see a ${MOBILE_SAFE_WIDTH}×${MOBILE_SAFE_HEIGHT}px centered crop. Keep logos and text inside this zone.`}
      </p>
    </div>
  );
};

function DesktopMockup({ canvasRef }: { canvasRef: React.RefObject<HTMLCanvasElement | null> }) {
  return (
    <div className="overflow-hidden rounded-lg border border-foreground-200 bg-[#0f0f0f]">
      {/* YouTube top bar */}
      <div className="flex items-center gap-2 bg-[#0f0f0f] px-3 py-1.5">
        <YoutubeLogo className="h-3.5" />
        <div className="ml-auto flex items-center gap-2">
          <div className="h-2 w-12 rounded-sm bg-white/10" />
          <div className="size-4 rounded-full bg-white/15" />
        </div>
      </div>

      {/* Banner */}
      <div style={{ aspectRatio: `${DESKTOP_SAFE_WIDTH} / ${DESKTOP_SAFE_HEIGHT}` }}>
        <canvas ref={canvasRef} className="h-full w-full" style={{ imageRendering: 'auto' }} />
      </div>

      {/* Channel info */}
      <div className="flex items-center gap-2.5 px-4 py-2.5">
        <div className="size-8 shrink-0 rounded-full bg-gradient-to-br from-sky-400 to-purple-500" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-24 rounded-sm bg-white/80" />
            <div className="h-2 w-2 rounded-full bg-white/40" />
          </div>
          <div className="mt-1 h-2 w-16 rounded-sm bg-white/30" />
        </div>
        <div className="h-5 w-16 rounded-full bg-white/90" />
      </div>

      {/* Navigation tabs */}
      <div className="flex gap-4 border-t border-white/10 px-4 py-1.5">
        {['Home', 'Videos', 'Shorts', 'Live', 'Community'].map((tab, i) => (
          <span key={tab} className={cn('text-[9px]', i === 0 ? 'font-medium text-white/90' : 'text-white/40')}>
            {tab}
          </span>
        ))}
      </div>
    </div>
  );
}

function MobileMockup({ canvasRef }: { canvasRef: React.RefObject<HTMLCanvasElement | null> }) {
  return (
    <div className="mx-auto max-w-[240px] overflow-hidden rounded-xl border border-foreground-200 bg-[#0f0f0f]">
      {/* Mobile status bar */}
      <div className="flex items-center justify-between px-3 py-1">
        <div className="h-1.5 w-6 rounded-sm bg-white/30" />
        <div className="flex items-center gap-1">
          <div className="h-1.5 w-3 rounded-sm bg-white/30" />
          <div className="h-1.5 w-3 rounded-sm bg-white/30" />
        </div>
      </div>

      {/* YouTube top bar */}
      <div className="flex items-center gap-2 px-3 py-1">
        <YoutubeLogo className="h-3" />
        <div className="ml-auto flex items-center gap-1.5">
          <div className="size-3 rounded-full bg-white/15" />
          <div className="size-3 rounded-full bg-white/15" />
        </div>
      </div>

      {/* Banner */}
      <div style={{ aspectRatio: `${MOBILE_SAFE_WIDTH} / ${MOBILE_SAFE_HEIGHT}` }}>
        <canvas ref={canvasRef} className="h-full w-full" style={{ imageRendering: 'auto' }} />
      </div>

      {/* Channel info (mobile layout) */}
      <div className="flex flex-col items-center gap-1.5 px-3 py-3">
        <div className="size-10 rounded-full bg-gradient-to-br from-sky-400 to-purple-500" />
        <div className="h-2.5 w-20 rounded-sm bg-white/80" />
        <div className="h-2 w-14 rounded-sm bg-white/30" />
        <div className="mt-0.5 h-4 w-14 rounded-full bg-white/90" />
      </div>

      {/* Navigation tabs */}
      <div className="flex justify-center gap-3 border-t border-white/10 px-3 py-1.5">
        {['Home', 'Videos', 'Shorts', 'Live'].map((tab, i) => (
          <span key={tab} className={cn('text-[8px]', i === 0 ? 'font-medium text-white/90' : 'text-white/40')}>
            {tab}
          </span>
        ))}
      </div>
    </div>
  );
}

function YoutubeLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 90 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="2" width="16" height="16" rx="3" fill="#FF0000" />
      <path d="M6.5 6.5L12 10L6.5 13.5V6.5Z" fill="white" />
      <text x="19" y="14.5" fill="white" fontSize="11" fontFamily="Arial, sans-serif" fontWeight="600">
        YouTube
      </text>
    </svg>
  );
}
