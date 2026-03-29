import React, { useMemo } from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT } from "../lib/brand";
import { SPRING_SMOOTH, SPRING_SNAPPY } from "../lib/easings";
import { GlowOrb } from "../components/GlowOrb";

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const FloatingElement: React.FC<{
  x: number;
  y: number;
  rotation: number;
  type: "note" | "chat" | "file" | "clock";
  color: string;
  frame: number;
  enterDelay: number;
  collapseStart: number;
  durationFrames: number;
  phase: number;
}> = ({ x, y, rotation, type, color, frame, enterDelay, collapseStart, durationFrames, phase }) => {
  const enterProgress = interpolate(frame, [enterDelay, enterDelay + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const collapseProgress = interpolate(
    frame,
    [collapseStart, collapseStart + durationFrames * 0.3],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const drift = Math.sin(frame * 0.03 + phase) * 15;
  const driftY = Math.cos(frame * 0.02 + phase * 1.5) * 10;

  const currentX = interpolate(collapseProgress, [0, 1], [x + drift, 50]);
  const currentY = interpolate(collapseProgress, [0, 1], [y + driftY, 50]);
  const currentOpacity = enterProgress * interpolate(collapseProgress, [0, 0.7, 1], [1, 0.5, 0], {
    extrapolateRight: "clamp",
  });
  const currentRotation = rotation + Math.sin(frame * 0.02 + phase) * 8;
  const blur = interpolate(collapseProgress, [0, 1], [0, 8], {
    extrapolateRight: "clamp",
  });

  const size = 48;
  const iconMap: Record<string, React.ReactNode> = {
    note: (
      <svg width={size} height={size} viewBox="0 0 48 48">
        <rect x="6" y="4" width="36" height="40" rx="4" fill={color} opacity="0.8" />
        <line x1="14" y1="16" x2="34" y2="16" stroke="white" strokeWidth="2" opacity="0.6" />
        <line x1="14" y1="24" x2="28" y2="24" stroke="white" strokeWidth="2" opacity="0.4" />
        <line x1="14" y1="32" x2="32" y2="32" stroke="white" strokeWidth="2" opacity="0.3" />
      </svg>
    ),
    chat: (
      <svg width={size} height={size} viewBox="0 0 48 48">
        <path d="M8 10h32a4 4 0 014 4v16a4 4 0 01-4 4H18l-8 8V14a4 4 0 014-4z" fill={color} opacity="0.8" />
        <circle cx="18" cy="22" r="2" fill="white" opacity="0.5" />
        <circle cx="24" cy="22" r="2" fill="white" opacity="0.5" />
        <circle cx="30" cy="22" r="2" fill="white" opacity="0.5" />
      </svg>
    ),
    file: (
      <svg width={size} height={size} viewBox="0 0 48 48">
        <path d="M12 4h16l12 12v28a4 4 0 01-4 4H12a4 4 0 01-4-4V8a4 4 0 014-4z" fill={color} opacity="0.8" />
        <path d="M28 4v12h12" fill="none" stroke="white" strokeWidth="2" opacity="0.4" />
      </svg>
    ),
    clock: (
      <svg width={size} height={size} viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="20" fill={color} opacity="0.8" />
        <line x1="24" y1="12" x2="24" y2="24" stroke="white" strokeWidth="2.5" opacity="0.6" />
        <line x1="24" y1="24" x2="34" y2="28" stroke="white" strokeWidth="2" opacity="0.5" />
      </svg>
    ),
  };

  return (
    <div
      style={{
        position: "absolute",
        left: `${currentX}%`,
        top: `${currentY}%`,
        transform: `translate(-50%, -50%) rotate(${currentRotation}deg)`,
        opacity: currentOpacity,
        filter: `blur(${blur}px)`,
      }}
    >
      {iconMap[type]}
    </div>
  );
};

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1Opacity = spring({
    frame,
    fps,
    config: SPRING_SMOOTH,
    delay: 10,
  });
  const line1Y = interpolate(
    spring({ frame, fps, config: SPRING_SNAPPY, delay: 10 }),
    [0, 1],
    [40, 0]
  );

  const line2Start = fps * 2.5;
  const line2Opacity = spring({
    frame,
    fps,
    config: SPRING_SMOOTH,
    delay: line2Start,
  });
  const line2Y = interpolate(
    spring({ frame, fps, config: SPRING_SNAPPY, delay: line2Start }),
    [0, 1],
    [30, 0]
  );

  const line1FadeOut = interpolate(frame, [line2Start - 10, line2Start + 10], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const collapseStart = fps * 4.5;

  const elements = useMemo(() => {
    const rand = seededRandom(123);
    const types: Array<"note" | "chat" | "file" | "clock"> = [
      "note", "chat", "file", "clock", "note", "chat", "file", "clock",
      "note", "chat", "file", "note",
    ];
    const colors = ["#FFFFFF", "#CCCCCC", "#999999", "#666666", "#AAAAAA"];
    return types.map((type, i) => ({
      x: 10 + rand() * 80,
      y: 10 + rand() * 80,
      rotation: -30 + rand() * 60,
      type,
      color: colors[i % colors.length],
      enterDelay: 20 + i * 5,
      phase: rand() * Math.PI * 2,
    }));
  }, []);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkBg }}>
      <GlowOrb
        x="50%"
        y="50%"
        size={600}
        color1={COLORS.white}
        color2="#888888"
        opacity={0.05}
      />

      {/* Floating chaos elements */}
      {elements.map((el, i) => (
        <FloatingElement
          key={i}
          {...el}
          frame={frame}
          collapseStart={collapseStart}
          durationFrames={fps * 6}
        />
      ))}

      {/* Text: first line */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: line1Opacity * line1FadeOut,
          transform: `translateY(${line1Y}px)`,
        }}
      >
        <div
          style={{
            fontFamily: FONT.family,
            fontWeight: FONT.bold,
            fontSize: 56,
            color: COLORS.white,
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.3,
            textShadow: "0 4px 30px rgba(0,0,0,0.5)",
          }}
        >
          Creative projects have
          <br />
          too many moving parts
        </div>
      </AbsoluteFill>

      {/* Text: second line */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: line2Opacity,
          transform: `translateY(${line2Y}px)`,
        }}
      >
        <div
          style={{
            fontFamily: FONT.family,
            fontWeight: FONT.bold,
            fontSize: 52,
            color: COLORS.whiteAlpha80,
            textAlign: "center",
            maxWidth: 800,
            lineHeight: 1.3,
            textShadow: "0 4px 30px rgba(0,0,0,0.5)",
          }}
        >
          Deadlines slip.
          <br />
          Feedback gets lost.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
