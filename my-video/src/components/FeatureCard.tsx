import React from "react";
import { spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS, FONT, GRADIENT } from "../lib/brand";
import { SPRING_SNAPPY } from "../lib/easings";

export const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
  children?: React.ReactNode;
}> = ({ icon, title, description, delay = 0, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleEntrance = spring({
    frame,
    fps,
    config: SPRING_SNAPPY,
    delay,
  });

  const descEntrance = spring({
    frame,
    fps,
    config: SPRING_SNAPPY,
    delay: delay + 10,
  });

  const childEntrance = spring({
    frame,
    fps,
    config: SPRING_SNAPPY,
    delay: delay + 18,
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 28,
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            opacity: interpolate(titleEntrance, [0, 0.5], [0, 1], {
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(titleEntrance, [0, 1], [20, 0])}px)`,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: COLORS.whiteAlpha10,
              border: `1px solid ${COLORS.whiteAlpha20}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </div>
          <span
            style={{
              fontFamily: FONT.family,
              fontWeight: FONT.bold,
              fontSize: 42,
              background: GRADIENT.brandText,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.2,
            }}
          >
            {title}
          </span>
        </div>

        <p
          style={{
            fontFamily: FONT.family,
            fontWeight: FONT.regular,
            fontSize: 22,
            color: COLORS.whiteAlpha60,
            textAlign: "center",
            maxWidth: 680,
            lineHeight: 1.5,
            opacity: interpolate(descEntrance, [0, 0.5], [0, 1], {
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(descEntrance, [0, 1], [15, 0])}px)`,
          }}
        >
          {description}
        </p>
      </div>

      {children && (
        <div
          style={{
            opacity: interpolate(childEntrance, [0, 0.5], [0, 1], {
              extrapolateRight: "clamp",
            }),
            transform: `scale(${interpolate(childEntrance, [0, 1], [0.92, 1])})`,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};
