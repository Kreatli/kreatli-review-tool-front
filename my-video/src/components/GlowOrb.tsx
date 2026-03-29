import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export const GlowOrb: React.FC<{
  x: string;
  y: string;
  size: number;
  color1: string;
  color2: string;
  pulseSpeed?: number;
  delay?: number;
  opacity?: number;
}> = ({
  x,
  y,
  size,
  color1,
  color2,
  pulseSpeed = 0.015,
  delay = 0,
  opacity = 0.3,
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);

  const scale = 1 + Math.sin(f * pulseSpeed) * 0.15;
  const fadeIn = interpolate(f, [0, 30], [0, opacity], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color1}80 0%, ${color2}40 50%, transparent 70%)`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity: fadeIn,
        filter: `blur(${size * 0.15}px)`,
      }}
    />
  );
};
