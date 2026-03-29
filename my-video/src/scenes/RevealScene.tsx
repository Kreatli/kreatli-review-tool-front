import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { GradientText } from "../components/GradientText";
import { GlowOrb } from "../components/GlowOrb";
import { ParticleField } from "../components/ParticleField";
import { COLORS, FONT, GRADIENT } from "../lib/brand";
import { SPRING_SMOOTH, SPRING_SNAPPY } from "../lib/easings";

export const RevealScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const flashIntensity = interpolate(frame, [0, 8, 25], [0, 1, 0], {
    extrapolateRight: "clamp",
  });

  const introducingOpacity = spring({
    frame,
    fps,
    config: SPRING_SMOOTH,
    delay: 15,
  });
  const introducingY = interpolate(
    spring({ frame, fps, config: SPRING_SNAPPY, delay: 15 }),
    [0, 1],
    [20, 0]
  );

  const subtitleOpacity = spring({
    frame,
    fps,
    config: SPRING_SMOOTH,
    delay: fps * 1.8,
  });
  const subtitleY = interpolate(
    spring({ frame, fps, config: SPRING_SNAPPY, delay: fps * 1.8 }),
    [0, 1],
    [20, 0]
  );

  const lineWidth = interpolate(
    spring({ frame, fps, config: { damping: 200 }, delay: fps * 2.2 }),
    [0, 1],
    [0, 200]
  );

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkBg }}>
      {/* Flash overlay */}
      <AbsoluteFill
        style={{
          backgroundColor: COLORS.white,
          opacity: flashIntensity * 0.6,
          mixBlendMode: "overlay",
        }}
      />

      {/* Glow behind text */}
      <GlowOrb
        x="50%"
        y="45%"
        size={700}
        color1={COLORS.white}
        color2="#888888"
        opacity={0.08}
        delay={10}
      />

      {/* Particles */}
      <ParticleField count={30} direction="up" seed={99} />

      {/* Centered content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        {/* "Introducing" */}
        <div
          style={{
            fontFamily: FONT.family,
            fontWeight: FONT.semibold,
            fontSize: 24,
            color: COLORS.whiteAlpha60,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            opacity: introducingOpacity,
            transform: `translateY(${introducingY}px)`,
          }}
        >
          Introducing
        </div>

        {/* Main title */}
        <GradientText
          text="Tasks & Boards"
          fontSize={110}
          delay={fps * 0.6}
          animateScale={true}
        />

        {/* Decorative line */}
        <div
          style={{
            width: lineWidth,
            height: 3,
            background: GRADIENT.brandHorizontal,
            borderRadius: 2,
            marginTop: 8,
            marginBottom: 8,
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            fontFamily: FONT.family,
            fontWeight: FONT.semibold,
            fontSize: 32,
            color: COLORS.whiteAlpha80,
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
            letterSpacing: "0.02em",
          }}
        >
          On Your Project Stages
        </div>
      </AbsoluteFill>

      {/* Vignette */}
      <AbsoluteFill
        style={{
          background: GRADIENT.darkVignette,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
