import React from "react";
import {
  AbsoluteFill,
  Img,
  Loop,
  OffthreadVideo,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../lib/brand";
import {
  STOCK_CLIPS,
  stockClipForSeed,
  stockImageForSeed,
} from "../lib/stockAssets";

export type MediaPreviewPlaceholderVariant = "video" | "image" | "file";

/**
 * Fills a media / video preview region. Uses stock clips and stills from
 * `public/stock/` by default; falls back to abstract placeholders when disabled.
 */
export const MediaPreviewPlaceholder: React.FC<{
  variant?: MediaPreviewPlaceholderVariant;
  /** Prefix for SVG defs IDs — unique per mounted instance */
  uniqueId: string;
  /** Visual variety when many placeholders share one composition */
  seed?: number;
  style?: React.CSSProperties;
  /** When true (default), show `public/stock` video or image instead of abstract art */
  useStockMedia?: boolean;
  /** Override stock picker — must be a `staticFile()` path or absolute URL */
  videoSrc?: string;
  imageSrc?: string;
}> = ({
  variant = "video",
  uniqueId,
  seed = 0,
  style,
  useStockMedia = true,
  videoSrc: videoSrcProp,
  imageSrc: imageSrcProp,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const gid = `${uniqueId}-bg`;

  const clipFromSeed = stockClipForSeed(seed);
  const resolvedVideoSrc = videoSrcProp ?? clipFromSeed.src;
  const resolvedImageSrc = imageSrcProp ?? stockImageForSeed(seed);
  const clipForLoop =
    STOCK_CLIPS.find((c) => c.src === resolvedVideoSrc) ?? clipFromSeed;
  const loopFrames = Math.max(1, Math.round(clipForLoop.durationSec * fps));

  if (variant === "video" && useStockMedia) {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          backgroundColor: COLORS.darkSurface,
          ...style,
        }}
      >
        <Loop durationInFrames={loopFrames} layout="none">
          <AbsoluteFill>
            <OffthreadVideo
              src={resolvedVideoSrc}
              muted
              volume={0}
              pauseWhenBuffering={false}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </AbsoluteFill>
        </Loop>
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 35%, rgba(0,0,0,0.35) 100%)",
          }}
        />
      </div>
    );
  }

  if (variant === "image" && useStockMedia) {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          backgroundColor: COLORS.darkSurface,
          ...style,
        }}
      >
        <AbsoluteFill>
          <Img
            src={resolvedImageSrc}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.25) 100%)",
          }}
        />
      </div>
    );
  }

  const hue = 210 + (seed % 5) * 14;
  const c1 = `hsl(${hue}, 32%, 11%)`;
  const c2 = `hsl(${(hue + 48) % 360}, 26%, 7%)`;
  const c3 = "#06060c";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        ...style,
      }}
    >
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={c1} />
            <stop offset="48%" stopColor={c2} />
            <stop offset="100%" stopColor={c3} />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${gid})`} />
      </svg>

      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.22,
          background: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 5px,
            ${COLORS.whiteAlpha05} 5px,
            ${COLORS.whiteAlpha05} 6px
          )`,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at ${42 + Math.sin(frame * 0.018 + seed) * 5}% ${48 + Math.cos(frame * 0.022 + seed * 0.7) * 6}%, ${COLORS.primary}22 0%, transparent 58%)`,
        }}
      />

      {variant === "video" ? (
        <svg
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -52%)",
            width: "min(22%, 88px)",
            height: "min(22%, 88px)",
          }}
          viewBox="0 0 88 88"
        >
          <circle
            cx="44"
            cy="44"
            r="40"
            fill={COLORS.whiteAlpha10}
            stroke={COLORS.whiteAlpha20}
            strokeWidth="2"
          />
          <polygon
            points="36,30 36,58 60,44"
            fill={COLORS.white}
            opacity={0.92}
          />
        </svg>
      ) : null}

      {variant === "image" ? (
        <svg
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -52%)",
            width: "min(26%, 96px)",
            height: "min(26%, 96px)",
          }}
          viewBox="0 0 88 88"
        >
          <rect
            x="12"
            y="16"
            width="64"
            height="56"
            rx="8"
            fill={COLORS.whiteAlpha10}
            stroke={COLORS.whiteAlpha20}
            strokeWidth="2"
          />
          <circle cx="32" cy="36" r="8" fill={COLORS.whiteAlpha40} />
          <path
            d="M20 62 L36 46 L52 58 L68 42 L76 50 V68 H20 Z"
            fill={COLORS.whiteAlpha20}
          />
        </svg>
      ) : null}

      {variant === "file" ? (
        <svg
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -52%)",
            width: "min(22%, 80px)",
            height: "min(22%, 80px)",
          }}
          viewBox="0 0 72 88"
        >
          <path
            d="M14 8h32l14 14v58a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V12a4 4 0 0 1 4-4z"
            fill={COLORS.whiteAlpha10}
            stroke={COLORS.whiteAlpha20}
            strokeWidth="2"
          />
          <path d="M46 8v14h14" fill="none" stroke={COLORS.whiteAlpha20} strokeWidth="2" />
          <line x1="22" y1="40" x2="50" y2="40" stroke={COLORS.whiteAlpha40} strokeWidth="3" strokeLinecap="round" />
          <line x1="22" y1="52" x2="46" y2="52" stroke={COLORS.whiteAlpha20} strokeWidth="3" strokeLinecap="round" />
          <line x1="22" y1="64" x2="42" y2="64" stroke={COLORS.whiteAlpha20} strokeWidth="3" strokeLinecap="round" />
        </svg>
      ) : null}

      {variant === "video" ? (
        <svg
          style={{
            position: "absolute",
            left: "10%",
            right: "10%",
            bottom: "6%",
            height: "18%",
            minHeight: 18,
            opacity: 0.35,
          }}
          viewBox="0 0 200 28"
          preserveAspectRatio="none"
        >
          {Array.from({ length: 28 }).map((_, i) => {
            const h =
              6 +
              Math.abs(
                Math.sin(frame * 0.06 + seed * 0.4 + i * 0.35) * 10
              );
            return (
              <rect
                key={i}
                x={4 + i * 7}
                y={22 - h}
                width={4}
                height={h}
                rx={1}
                fill={COLORS.whiteAlpha40}
              />
            );
          })}
        </svg>
      ) : null}
    </div>
  );
};
