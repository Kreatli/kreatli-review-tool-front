import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, GRADIENT } from "../lib/brand";
import { SPRING_BOUNCY, SPRING_SMOOTH } from "../lib/easings";

export const KreatliLogo: React.FC<{
  scale?: number;
  showWordmark?: boolean;
  animationDelay?: number;
  shimmer?: boolean;
}> = ({
  scale = 1,
  showWordmark = true,
  animationDelay = 0,
  shimmer = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - animationDelay;

  const piece1 = spring({
    frame: f,
    fps,
    config: SPRING_BOUNCY,
    delay: 0,
  });
  const piece2 = spring({
    frame: f,
    fps,
    config: SPRING_BOUNCY,
    delay: 6,
  });
  const piece3 = spring({
    frame: f,
    fps,
    config: SPRING_BOUNCY,
    delay: 12,
  });

  const wordmarkOpacity = spring({
    frame: f,
    fps,
    config: SPRING_SMOOTH,
    delay: 30,
  });

  const shimmerX = shimmer
    ? interpolate(f, [40, 90], [-200, 400], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : -200;

  const piece1X = interpolate(piece1, [0, 1], [-120, 0]);
  const piece1Y = interpolate(piece1, [0, 1], [80, 0]);
  const piece1Opacity = interpolate(piece1, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  const piece2X = interpolate(piece2, [0, 1], [0, 0]);
  const piece2Y = interpolate(piece2, [0, 1], [-100, 0]);
  const piece2Opacity = interpolate(piece2, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  const piece3X = interpolate(piece3, [0, 1], [120, 0]);
  const piece3Y = interpolate(piece3, [0, 1], [80, 0]);
  const piece3Opacity = interpolate(piece3, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24 * scale,
        transform: `scale(${scale})`,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={80}
        height={100}
        viewBox="0 0 18 22"
      >
        {/* Bottom-right triangle */}
        <path
          d="M8.797 12.196a1 1 0 0 1 1.406 0l6.662 6.593c.635.629.19 1.711-.704 1.711H2.84c-.894 0-1.339-1.082-.704-1.71l6.662-6.594Z"
          fill={COLORS.white}
          style={{
            transform: `translate(${piece1X}px, ${piece1Y}px)`,
            opacity: piece1Opacity,
          }}
        />
        {/* Top triangle */}
        <path
          d="M10.204 9.804a1 1 0 0 1-1.407 0L2.135 3.21C1.5 2.582 1.945 1.5 2.84 1.5H16.16c.894 0 1.339 1.082.704 1.71l-6.661 6.594Z"
          fill={COLORS.white}
          style={{
            transform: `translate(${piece2X}px, ${piece2Y}px)`,
            opacity: piece2Opacity,
          }}
        />
        {/* Left triangle */}
        <path
          d="M8.304 10.296a1 1 0 0 1 0 1.408l-6.593 6.66C1.082 19 0 18.555 0 17.662V4.34C0 3.445 1.082 3 1.71 3.635l6.594 6.662Z"
          fill={COLORS.white}
          style={{
            transform: `translate(${piece3X}px, ${piece3Y}px)`,
            opacity: piece3Opacity,
          }}
        />
      </svg>

      {showWordmark && (
        <div style={{ position: "relative", opacity: wordmarkOpacity }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={320}
            height={44}
            viewBox="19 0 72 22"
          >
            <path
              fill={COLORS.white}
              d="M19.163 16.6V5.4h2.752v4.896L26.443 5.4h3.328l-5.184 5.264L30.06 16.6h-3.648l-4.496-5.136V16.6h-2.752ZM30.83 16.6V5.4h5.729c.768 0 1.45.155 2.048.464.597.299 1.061.72 1.392 1.264.341.533.512 1.147.512 1.84 0 .704-.192 1.333-.576 1.888-.384.555-.89.976-1.52 1.264l2.448 4.48H37.79l-2.112-4.08h-2.096v4.08H30.83Zm2.753-6.32h2.72c.427 0 .768-.117 1.024-.352.267-.235.4-.539.4-.912s-.133-.677-.4-.912c-.256-.235-.597-.352-1.024-.352h-2.72v2.528ZM42.405 16.6V5.4h8.832v2.384h-6.08V9.8h4.016v2.304h-4.016v2.112H51.3V16.6h-8.896ZM52.517 16.6l4.591-11.2h3.153l4.527 11.2h-2.975l-1.025-2.704h-4.367L55.38 16.6h-2.864Zm4.735-4.896h2.72L58.63 8.12l-1.377 3.584ZM67.03 16.6V7.832h-3.665V5.4h10.08v2.432h-3.664V16.6H67.03ZM75.141 16.6V5.4h2.752v8.768h5.904V16.6h-8.656ZM85.809 16.6V5.4h2.752v11.2h-2.752Z"
            />
          </svg>
          {shimmer && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: GRADIENT.brandHorizontal,
                maskImage: `linear-gradient(90deg, transparent ${shimmerX}px, white ${shimmerX + 60}px, transparent ${shimmerX + 120}px)`,
                WebkitMaskImage: `linear-gradient(90deg, transparent ${shimmerX}px, white ${shimmerX + 60}px, transparent ${shimmerX + 120}px)`,
                mixBlendMode: "screen",
                borderRadius: 4,
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};
