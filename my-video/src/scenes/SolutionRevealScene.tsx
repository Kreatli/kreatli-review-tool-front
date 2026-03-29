import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { GlowOrb } from "../components/GlowOrb";
import { GradientText } from "../components/GradientText";
import { ParticleField } from "../components/ParticleField";
import { COLORS, FONT, GRADIENT } from "../lib/brand";
import { SPRING_SMOOTH } from "../lib/easings";

export const SolutionRevealScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const flashOpacity = interpolate(frame, [0, 4, 14], [0, 0.85, 0], {
    extrapolateRight: "clamp",
  });

  const introducingOpacity = spring({
    frame,
    fps,
    config: SPRING_SMOOTH,
    delay: 8,
  });

  const lineWidth = interpolate(
    spring({ frame, fps, config: { damping: 200 }, delay: 30 }),
    [0, 1],
    [0, 400]
  );

  const subtitleEntrance = spring({
    frame,
    fps,
    config: SPRING_SMOOTH,
    delay: 40,
  });

  const fadeOutAll = interpolate(frame, [fps * 2.8, fps * 3.4], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkBg }}>
      <AbsoluteFill style={{ background: GRADIENT.darkVignette }} />

      <GlowOrb
        x="50%"
        y="45%"
        size={640}
        color1={COLORS.primaryLight}
        color2={COLORS.secondaryLight}
        opacity={0.12}
        delay={10}
      />

      <ParticleField count={25} direction="up" seed={42} />

      {/* Flash overlay — brand-tinted burst */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 42%, ${COLORS.white} 0%, ${COLORS.primary}55 35%, ${COLORS.secondary}44 55%, transparent 72%)`,
          opacity: flashOpacity,
          mixBlendMode: "screen",
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          opacity: fadeOutAll,
        }}
      >
        <div
          style={{
            fontFamily: FONT.family,
            fontWeight: FONT.medium,
            fontSize: 24,
            color: COLORS.whiteAlpha60,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            opacity: introducingOpacity,
            transform: `translateY(${interpolate(introducingOpacity, [0, 1], [15, 0])}px)`,
          }}
        >
          Introducing
        </div>

        <GradientText
          text="Kreatli"
          fontSize={110}
          delay={18}
          animateScale
        />

        {/* Animated brand spectrum line */}
        <div
          style={{
            width: lineWidth,
            height: 3,
            background: GRADIENT.brandSpectrum,
            borderRadius: 2,
            marginTop: 4,
            boxShadow: `0 0 24px ${COLORS.primary}88, 0 0 48px ${COLORS.secondary}44`,
          }}
        />

        <div
          style={{
            fontFamily: FONT.family,
            fontWeight: FONT.regular,
            fontSize: 28,
            color: COLORS.whiteAlpha60,
            textAlign: "center",
            marginTop: 8,
            opacity: subtitleEntrance,
            transform: `translateY(${interpolate(subtitleEntrance, [0, 1], [12, 0])}px)`,
          }}
        >
          Your creative workspace. From upload to approval.
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{ background: GRADIENT.darkVignette, pointerEvents: "none" }}
      />
    </AbsoluteFill>
  );
};
