import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { GlowOrb } from "../components/GlowOrb";
import { COLORS, FONT, GRADIENT } from "../lib/brand";
import { SPRING_SMOOTH, SPRING_SNAPPY } from "../lib/easings";

const TOOL_ICONS: {
  label: string;
  x: number;
  y: number;
  seed: number;
  icon: React.ReactNode;
}[] = [
  {
    label: "Cloud Storage",
    x: 18,
    y: 22,
    seed: 1,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path
          d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"
          stroke={COLORS.whiteAlpha60}
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    label: "Chat App",
    x: 72,
    y: 18,
    seed: 2,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path
          d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"
          stroke={COLORS.whiteAlpha60}
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    label: "PM Tool",
    x: 30,
    y: 68,
    seed: 3,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="3"
          width="7"
          height="7"
          rx="1"
          stroke={COLORS.whiteAlpha60}
          strokeWidth="2"
        />
        <rect
          x="14"
          y="3"
          width="7"
          height="7"
          rx="1"
          stroke={COLORS.whiteAlpha60}
          strokeWidth="2"
        />
        <rect
          x="3"
          y="14"
          width="7"
          height="7"
          rx="1"
          stroke={COLORS.whiteAlpha60}
          strokeWidth="2"
        />
        <rect
          x="14"
          y="14"
          width="7"
          height="7"
          rx="1"
          stroke={COLORS.whiteAlpha60}
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    label: "Email",
    x: 78,
    y: 72,
    seed: 4,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect
          x="2"
          y="4"
          width="20"
          height="16"
          rx="2"
          stroke={COLORS.whiteAlpha60}
          strokeWidth="2"
        />
        <polyline
          points="22,4 12,13 2,4"
          stroke={COLORS.whiteAlpha60}
          strokeWidth="2"
          fill="none"
        />
      </svg>
    ),
  },
  {
    label: "Review Tool",
    x: 50,
    y: 30,
    seed: 5,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <polygon
          points="8,5 19,12 8,19"
          stroke={COLORS.whiteAlpha60}
          strokeWidth="2"
          fill="none"
        />
      </svg>
    ),
  },
  {
    label: "File Transfer",
    x: 55,
    y: 75,
    seed: 6,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path
          d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
          stroke={COLORS.whiteAlpha60}
          strokeWidth="2"
        />
        <polyline
          points="7,10 12,15 17,10"
          stroke={COLORS.whiteAlpha60}
          strokeWidth="2"
          fill="none"
        />
        <line
          x1="12"
          y1="15"
          x2="12"
          y2="3"
          stroke={COLORS.whiteAlpha60}
          strokeWidth="2"
        />
      </svg>
    ),
  },
];

const FloatingTool: React.FC<{
  x: number;
  y: number;
  label: string;
  seed: number;
  icon: React.ReactNode;
}> = ({ x, y, label, seed, icon }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const collapseStart = fps * 3.5;
  const collapseEnd = fps * 4.5;

  const drift = Math.sin(frame * 0.02 + seed * 2) * 8;
  const driftY = Math.cos(frame * 0.015 + seed * 3) * 6;

  const entrance = spring({
    frame,
    fps,
    config: SPRING_SNAPPY,
    delay: seed * 8,
  });

  const collapseProgress = interpolate(
    frame,
    [collapseStart, collapseEnd],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const targetX = 50;
  const targetY = 50;
  const currentX = interpolate(collapseProgress, [0, 1], [x, targetX]);
  const currentY = interpolate(collapseProgress, [0, 1], [y, targetY]);

  const blur = interpolate(collapseProgress, [0.3, 1], [0, 12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(collapseProgress, [0, 1], [1, 0.3]);

  const tiltX = Math.sin(frame * 0.028 + seed * 0.9) * 5.5;
  const tiltY = Math.cos(frame * 0.022 + seed * 1.1) * 6.5;

  const accentRing = [
    COLORS.primary,
    COLORS.secondaryLight,
    COLORS.cyan,
    COLORS.pinkLight,
    COLORS.warning,
    COLORS.success,
  ][(seed - 1) % 6];

  return (
    <div
      style={{
        position: "absolute",
        left: `${currentX}%`,
        top: `${currentY}%`,
        transform: `translate(-50%, -50%) translate(${drift}px, ${driftY}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${entrance * scale})`,
        transformStyle: "preserve-3d",
        opacity: interpolate(entrance, [0, 0.5], [0, 1], {
          extrapolateRight: "clamp",
        }),
        filter: `blur(${blur}px)`,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: COLORS.foreground100,
            border: `1px solid ${accentRing}55`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 6px 28px rgba(0,0,0,0.45), 0 0 24px ${accentRing}22`,
          }}
        >
          {icon}
        </div>
        <span
          style={{
            fontFamily: FONT.family,
            fontSize: 12,
            fontWeight: FONT.medium,
            color: COLORS.whiteAlpha40,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

export const PainPointScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textDelay = fps * 1.5;
  const textEntrance = spring({
    frame,
    fps,
    config: SPRING_SMOOTH,
    delay: textDelay,
  });

  const line2Delay = fps * 2.2;
  const line2Entrance = spring({
    frame,
    fps,
    config: SPRING_SMOOTH,
    delay: line2Delay,
  });

  const fadeOutAll = interpolate(frame, [fps * 4.2, fps * 4.8], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkBg }}>
      <AbsoluteFill
        style={{ background: GRADIENT.darkVignette, opacity: 1 }}
      />

      <GlowOrb
        x="50%"
        y="50%"
        size={500}
        color1={COLORS.white}
        color2={COLORS.textMuted}
        opacity={0.06}
      />

      <AbsoluteFill
        style={{
          opacity: fadeOutAll,
          perspective: 1500,
          perspectiveOrigin: "50% 40%",
          transformStyle: "preserve-3d",
        }}
      >
        {TOOL_ICONS.map((tool) => (
          <FloatingTool key={tool.seed} {...tool} />
        ))}

        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontFamily: FONT.family,
              fontWeight: FONT.bold,
              fontSize: 52,
              color: COLORS.white,
              textAlign: "center",
              opacity: textEntrance,
              transform: `translateY(${interpolate(textEntrance, [0, 1], [20, 0])}px)`,
              lineHeight: 1.2,
            }}
          >
            Too many tools.
          </div>
          <div
            style={{
              fontFamily: FONT.family,
              fontWeight: FONT.bold,
              fontSize: 52,
              color: COLORS.whiteAlpha40,
              textAlign: "center",
              opacity: line2Entrance,
              transform: `translateY(${interpolate(line2Entrance, [0, 1], [20, 0])}px)`,
              lineHeight: 1.2,
            }}
          >
            Too little clarity.
          </div>
        </AbsoluteFill>
      </AbsoluteFill>

      <AbsoluteFill
        style={{ background: GRADIENT.darkVignette, pointerEvents: "none" }}
      />
    </AbsoluteFill>
  );
};
