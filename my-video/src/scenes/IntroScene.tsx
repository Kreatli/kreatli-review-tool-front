import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { KreatliLogo } from "../components/KreatliLogo";
import { GlowOrb } from "../components/GlowOrb";
import { ParticleField } from "../components/ParticleField";
import { COLORS, GRADIENT } from "../lib/brand";
import { SPRING_SMOOTH } from "../lib/easings";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeInBg = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const vignetteOpacity = spring({
    frame,
    fps,
    config: SPRING_SMOOTH,
    delay: 10,
  });

  const fadeOutAll = interpolate(
    frame,
    [fps * 3.2, fps * 3.8],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.darkBg,
        opacity: fadeInBg,
      }}
    >
      {/* Background vignette */}
      <AbsoluteFill
        style={{
          background: GRADIENT.darkVignette,
          opacity: vignetteOpacity,
        }}
      />

      {/* Floating orbs */}
      <GlowOrb
        x="25%"
        y="30%"
        size={400}
        color1={COLORS.white}
        color2={COLORS.textMuted}
        delay={5}
        opacity={0.06}
      />
      <GlowOrb
        x="75%"
        y="60%"
        size={350}
        color1={COLORS.white}
        color2="#888888"
        delay={15}
        opacity={0.05}
        pulseSpeed={0.02}
      />
      <GlowOrb
        x="50%"
        y="80%"
        size={300}
        color1="#CCCCCC"
        color2={COLORS.white}
        delay={25}
        opacity={0.04}
        pulseSpeed={0.012}
      />

      {/* Particles */}
      <ParticleField count={35} direction="up" seed={77} />

      {/* Center logo */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: fadeOutAll,
        }}
      >
        <KreatliLogo
          scale={1.8}
          showWordmark={true}
          animationDelay={15}
          shimmer={true}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
