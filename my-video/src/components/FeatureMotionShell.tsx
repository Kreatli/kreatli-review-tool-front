import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../lib/brand";
import { SPRING_CINEMATIC } from "../lib/easings";

export type FeatureMotionAccent =
  | "blue"
  | "purple"
  | "cyan"
  | "rose"
  | "amber"
  | "green";

const ACCENT_FILTER: Record<
  FeatureMotionAccent,
  { glow: string; mid: string }
> = {
  blue: { glow: COLORS.primary, mid: COLORS.secondary },
  purple: { glow: COLORS.secondaryLight, mid: COLORS.primary },
  cyan: { glow: COLORS.cyan, mid: COLORS.primary },
  rose: { glow: COLORS.pinkLight, mid: COLORS.secondary },
  amber: { glow: COLORS.warning, mid: COLORS.primary },
  green: { glow: COLORS.success, mid: COLORS.cyan },
};

export const FeatureMotionShell: React.FC<{
  children: React.ReactNode;
  delay?: number;
  accent?: FeatureMotionAccent;
  extraScale?: number;
}> = ({ children, delay = 10, accent = "blue", extraScale = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: SPRING_CINEMATIC,
    delay,
  });

  const alive = interpolate(entrance, [0, 0.88], [0, 1], {
    extrapolateRight: "clamp",
  });
  const swayY = Math.sin(frame * 0.028 + delay * 0.05) * 0.65 * alive;
  const swayX = Math.cos(frame * 0.022 + delay * 0.08) * 0.45 * alive;

  const baseRotX = interpolate(entrance, [0, 1], [11, 0.4]);
  const baseRotY = interpolate(entrance, [0, 1], [-4.5, 0]);
  const rotateX = baseRotX + swayY;
  const rotateY = baseRotY + swayX;
  const translateY = interpolate(entrance, [0, 1], [42, 0]);
  const scale = interpolate(entrance, [0, 1], [0.93, 1]);
  const opacity = interpolate(entrance, [0, 0.28], [0, 1], {
    extrapolateRight: "clamp",
  });

  const { glow, mid } = ACCENT_FILTER[accent];
  const dropShadow = `drop-shadow(0 26px 50px rgba(0,0,0,0.55)) drop-shadow(0 0 50px ${glow}33) drop-shadow(0 0 90px ${mid}18)`;

  return (
    <div
      style={{
        perspective: 1500,
        perspectiveOrigin: "50% 38%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          transformStyle: "preserve-3d",
          opacity,
          transform: `translateY(${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale * extraScale})`,
          filter: dropShadow,
        }}
      >
        {children}
      </div>
    </div>
  );
};
