import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { GRADIENT, FONT } from "../lib/brand";
import { SPRING_SMOOTH } from "../lib/easings";

export const GradientText: React.FC<{
  text: string;
  fontSize?: number;
  fontWeight?: string;
  delay?: number;
  gradient?: string;
  animateScale?: boolean;
  style?: React.CSSProperties;
}> = ({
  text,
  fontSize = 80,
  fontWeight = FONT.bold,
  delay = 0,
  gradient = GRADIENT.brandText,
  animateScale = false,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = spring({
    frame,
    fps,
    config: SPRING_SMOOTH,
    delay,
  });

  const scaleVal = animateScale
    ? interpolate(
        spring({ frame, fps, config: { damping: 14, stiffness: 150 }, delay }),
        [0, 1],
        [0.6, 1]
      )
    : 1;

  const shimmerOffset = interpolate(
    frame - delay,
    [0, 60],
    [-100, 200],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "relative",
        opacity,
        transform: `scale(${scaleVal})`,
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: FONT.family,
          fontWeight,
          fontSize,
          background: gradient,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          display: "inline-block",
        }}
      >
        {text}
      </span>
      <span
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          fontFamily: FONT.family,
          fontWeight,
          fontSize,
          background: `linear-gradient(90deg, transparent ${shimmerOffset}%, rgba(255,255,255,0.3) ${shimmerOffset + 10}%, transparent ${shimmerOffset + 20}%)`,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          display: "inline-block",
          pointerEvents: "none",
        }}
      >
        {text}
      </span>
    </div>
  );
};
