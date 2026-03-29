import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FeatureCard } from "../components/FeatureCard";
import { GlowOrb } from "../components/GlowOrb";
import { MediaPreviewPlaceholder } from "../components/MediaPreviewPlaceholder";
import { ParticleField } from "../components/ParticleField";
import { COLORS, FONT, GRADIENT } from "../lib/brand";
import { SPRING_SNAPPY } from "../lib/easings";

const FEATURE_DURATION = 180; // 3s at 60fps

const MediaLinkedVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 25,
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 60,
        position: "relative",
      }}
    >
      {/* Task card */}
      <div
        style={{
          width: 240,
          padding: 18,
          background: COLORS.darkSurface,
          borderRadius: 12,
          border: `1px solid ${COLORS.darkBorder}`,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div
          style={{
            fontFamily: FONT.family,
            fontWeight: FONT.semibold,
            fontSize: 15,
            color: COLORS.white,
          }}
        >
          Edit hero video v3
        </div>
        <div
          style={{
            fontFamily: FONT.family,
            fontSize: 12,
            color: COLORS.whiteAlpha40,
          }}
        >
          Production
        </div>
      </div>

      {/* Animated connection line */}
      <svg
        width="120"
        height="4"
        style={{ position: "absolute", left: 250, top: "50%" }}
      >
        <line
          x1="0"
          y1="2"
          x2={120 * lineProgress}
          y2="2"
          stroke={COLORS.white}
          strokeWidth="2"
          strokeDasharray="6 4"
        />
        <circle
          cx={120 * lineProgress}
          cy="2"
          r="4"
          fill={COLORS.white}
          opacity={lineProgress}
        />
      </svg>

      {/* Video thumbnail */}
      <div
        style={{
          width: 200,
          height: 130,
          borderRadius: 10,
          border: `1px solid ${COLORS.darkBorder}`,
          marginLeft: 60,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <MediaPreviewPlaceholder uniqueId="fc-media-linked" variant="video" seed={2} />
      </div>
    </div>
  );
};

const OwnershipVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 60 }}>
      {/* Responsible */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: `hsl(200, 50%, 45%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            fontWeight: FONT.bold,
            color: COLORS.white,
            fontFamily: FONT.family,
            boxShadow: `0 0 30px ${COLORS.whiteAlpha20}`,
            border: `3px solid ${COLORS.whiteAlpha40}`,
            transform: `scale(${interpolate(
              spring({ frame, fps, config: SPRING_SNAPPY, delay: 15 }),
              [0, 1],
              [0.5, 1]
            )})`,
          }}
        >
          J
        </div>
        <div
          style={{
            fontFamily: FONT.family,
            fontSize: 14,
            color: COLORS.whiteAlpha60,
          }}
        >
          Responsible
        </div>
      </div>

      <div
        style={{
          width: 2,
          height: 60,
          background: COLORS.darkBorder,
        }}
      />

      {/* Contributors */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div style={{ display: "flex" }}>
          {["A", "S", "C"].map((initial, i) => (
            <div
              key={initial}
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: `hsl(${120 + i * 80}, 50%, 45%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                fontWeight: FONT.bold,
                color: COLORS.white,
                fontFamily: FONT.family,
                border: `2px solid ${COLORS.darkCard}`,
                marginLeft: i > 0 ? -12 : 0,
                transform: `scale(${interpolate(
                  spring({
                    frame,
                    fps,
                    config: SPRING_SNAPPY,
                    delay: 20 + i * 6,
                  }),
                  [0, 1],
                  [0.5, 1]
                )})`,
              }}
            >
              {initial}
            </div>
          ))}
        </div>
        <div
          style={{
            fontFamily: FONT.family,
            fontSize: 14,
            color: COLORS.whiteAlpha60,
          }}
        >
          Contributors
        </div>
      </div>
    </div>
  );
};

const HiddenTaskVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chipEntrance = spring({
    frame,
    fps,
    config: SPRING_SNAPPY,
    delay: 20,
  });

  return (
    <div
      style={{
        width: 300,
        padding: 22,
        background: COLORS.darkSurface,
        borderRadius: 14,
        border: `1px solid ${COLORS.darkBorder}`,
        backdropFilter: "blur(10px)",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        boxShadow: `0 20px 60px rgba(0,0,0,0.4)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path
            d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
            fill="none"
            stroke={COLORS.whiteAlpha60}
            strokeWidth="2"
          />
          <line
            x1="1"
            y1="1"
            x2="23"
            y2="23"
            stroke={COLORS.whiteAlpha60}
            strokeWidth="2"
          />
        </svg>
        <div
          style={{
            fontFamily: FONT.family,
            fontWeight: FONT.semibold,
            fontSize: 16,
            color: COLORS.white,
          }}
        >
          Draft campaign brief
        </div>
      </div>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "5px 12px",
          background: `${COLORS.warning}18`,
          borderRadius: 8,
          alignSelf: "flex-start",
          opacity: chipEntrance,
          transform: `scale(${interpolate(chipEntrance, [0, 1], [0.8, 1])})`,
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24">
          <path
            d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"
            fill="none"
            stroke={COLORS.warning}
            strokeWidth="2"
          />
          <line x1="1" y1="1" x2="23" y2="23" stroke={COLORS.warning} strokeWidth="2" />
        </svg>
        <span
          style={{
            fontFamily: FONT.family,
            fontSize: 12,
            fontWeight: FONT.semibold,
            color: COLORS.warning,
          }}
        >
          Only visible to you
        </span>
      </div>
    </div>
  );
};

const NotificationsVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badges = [
    { text: "Task moved to Review", x: 60, y: -30, delay: 18 },
    { text: "Jordan assigned", x: -50, y: 40, delay: 26 },
    { text: "New comment", x: 70, y: 35, delay: 34 },
  ];

  return (
    <div style={{ position: "relative", width: 300, height: 160 }}>
      {/* Bell icon center */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24">
          <path
            d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"
            fill="none"
            stroke={COLORS.white}
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Badges */}
      {badges.map((badge, i) => {
        const entrance = spring({
          frame,
          fps,
          config: SPRING_SNAPPY,
          delay: badge.delay,
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `calc(50% + ${badge.x}px)`,
              top: `calc(50% + ${badge.y}px)`,
              transform: `scale(${interpolate(entrance, [0, 1], [0.5, 1])})`,
              opacity: interpolate(entrance, [0, 0.4], [0, 1], {
                extrapolateRight: "clamp",
              }),
              padding: "6px 14px",
              background: COLORS.darkSurface,
              border: `1px solid ${COLORS.whiteAlpha20}`,
              borderRadius: 8,
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                fontFamily: FONT.family,
                fontSize: 12,
                fontWeight: FONT.semibold,
                color: COLORS.whiteAlpha80,
              }}
            >
              {badge.text}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export const FeaturesShowcaseScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkBg }}>
      <Sequence durationInFrames={FEATURE_DURATION} premountFor={30}>
        <FeatureSlide
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24">
              <rect x="2" y="3" width="20" height="18" rx="3" stroke={COLORS.white} strokeWidth="2" fill="none" />
              <circle cx="8" cy="9" r="2" fill={COLORS.white} />
            </svg>
          }
          title="Media-Linked Tasks"
          description="Bridge review feedback into tracked execution on your board."
          orbColor1={COLORS.white}
          orbColor2="#888888"
        >
          <MediaLinkedVisual />
        </FeatureSlide>
      </Sequence>

      <Sequence from={FEATURE_DURATION} durationInFrames={FEATURE_DURATION} premountFor={30}>
        <FeatureSlide
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" stroke={COLORS.white} strokeWidth="2" fill="none" />
              <path d="M20 21a8 8 0 0 0-16 0" stroke={COLORS.white} strokeWidth="2" fill="none" />
            </svg>
          }
          title="Clear Ownership"
          description="One responsible owner. Multiple contributors. Nothing falls through."
          orbColor1={COLORS.white}
          orbColor2="#888888"
        >
          <OwnershipVisual />
        </FeatureSlide>
      </Sequence>

      <Sequence from={FEATURE_DURATION * 2} durationInFrames={FEATURE_DURATION} premountFor={30}>
        <FeatureSlide
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"
                fill="none"
                stroke={COLORS.white}
                strokeWidth="2"
              />
              <line x1="1" y1="1" x2="23" y2="23" stroke={COLORS.white} strokeWidth="2" />
            </svg>
          }
          title="Hidden Tasks"
          description="Draft in private. Unhide when ready for the team."
          orbColor1="#CCCCCC"
          orbColor2={COLORS.white}
        >
          <HiddenTaskVisual />
        </FeatureSlide>
      </Sequence>

      <Sequence from={FEATURE_DURATION * 3} durationInFrames={FEATURE_DURATION} premountFor={30}>
        <FeatureSlide
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"
                fill="none"
                stroke={COLORS.white}
                strokeWidth="2"
              />
            </svg>
          }
          title="Smart Notifications"
          description="Your team gets notified when it matters, never when it doesn't."
          orbColor1={COLORS.white}
          orbColor2="#888888"
        >
          <NotificationsVisual />
        </FeatureSlide>
      </Sequence>
    </AbsoluteFill>
  );
};

const FeatureSlide: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  orbColor1: string;
  orbColor2: string;
  children: React.ReactNode;
}> = ({ icon, title, description, orbColor1, orbColor2, children }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkBg }}>
      <GlowOrb
        x="50%"
        y="45%"
        size={500}
        color1={orbColor1}
        color2={orbColor2}
        opacity={0.1}
      />
      <ParticleField count={20} direction="up" seed={title.length * 7} />

      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FeatureCard icon={icon} title={title} description={description}>
          {children}
        </FeatureCard>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background: GRADIENT.darkVignette,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
