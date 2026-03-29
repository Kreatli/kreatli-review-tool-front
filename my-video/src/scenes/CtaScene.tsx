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
import { COLORS, FONT, GRADIENT } from "../lib/brand";
import { SPRING_SNAPPY } from "../lib/easings";

export const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ctaDelay = fps * 0.8;
  const ctaEntrance = spring({
    frame,
    fps,
    config: SPRING_SNAPPY,
    delay: ctaDelay,
  });
  const ctaY = interpolate(
    spring({ frame, fps, config: SPRING_SNAPPY, delay: ctaDelay }),
    [0, 1],
    [25, 0],
  );

  const shimmerX = interpolate(frame, [fps * 1.8, fps * 4.2], [-300, 1200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(frame, [fps * 4.2, fps * 5.1], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkBg }}>
      {/* Background vignette -- same as IntroScene */}
      <AbsoluteFill
        style={{
          background: GRADIENT.darkVignette,
          opacity: 1,
        }}
      />

      {/* Floating orbs -- exact mirror of IntroScene */}
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

      {/* Particles -- same seed and count as IntroScene */}
      <ParticleField count={35} direction="up" seed={77} />

      {/* Logo -- exact same position as IntroScene */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: fadeOut,
        }}
      >
        <KreatliLogo
          scale={1.8}
          showWordmark={true}
          animationDelay={15}
          shimmer={true}
        />
      </AbsoluteFill>

      {/* CTA text -- separate layer below centered logo */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 110,
          opacity: fadeOut,
          zIndex: 20,
        }}
      >
        <div
          style={{
            fontFamily: FONT.family,
            fontWeight: FONT.bold,
            fontSize: 40,
            color: COLORS.white,
            textAlign: "center",
            opacity: ctaEntrance,
            transform: `translateY(${ctaY}px)`,
            position: "relative",
          }}
        >
          <span>Start your free trial</span>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(90deg, transparent ${shimmerX}px, rgba(255,255,255,0.15) ${shimmerX + 80}px, transparent ${shimmerX + 160}px)`,
              pointerEvents: "none",
            }}
          />
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
