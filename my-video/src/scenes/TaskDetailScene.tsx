import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { GlowOrb } from "../components/GlowOrb";
import { COLORS, FONT, GRADIENT, STAGE_COLORS } from "../lib/brand";
import { SPRING_SMOOTH, SPRING_SNAPPY } from "../lib/easings";

const SectionReveal: React.FC<{
  delay: number;
  children: React.ReactNode;
}> = ({ delay, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: SPRING_SNAPPY, delay });
  const y = interpolate(entrance, [0, 1], [25, 0]);
  const opacity = interpolate(entrance, [0, 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ transform: `translateY(${y}px)`, opacity }}>
      {children}
    </div>
  );
};

const Avatar: React.FC<{
  name: string;
  size?: number;
  hue?: number;
}> = ({ name, size = 32, hue }) => {
  const h = hue ?? name.charCodeAt(0) * 37 % 360;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `hsl(${h}, 50%, 45%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.42,
        fontWeight: FONT.bold,
        color: COLORS.white,
        fontFamily: FONT.family,
        flexShrink: 0,
      }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
};

export const TaskDetailScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const modalScale = interpolate(
    spring({ frame, fps, config: { damping: 18, stiffness: 140 }, delay: 2 }),
    [0, 1],
    [0.7, 1]
  );
  const modalOpacity = interpolate(
    spring({ frame, fps, config: SPRING_SMOOTH, delay: 2 }),
    [0, 0.3],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  const bgBlur = interpolate(frame, [0, 20], [0, 12], {
    extrapolateRight: "clamp",
  });

  const textStart = fps * 1.0;
  const textEntrance = spring({
    frame,
    fps,
    config: SPRING_SMOOTH,
    delay: textStart,
  });
  const textY = interpolate(
    spring({ frame, fps, config: SPRING_SNAPPY, delay: textStart }),
    [0, 1],
    [20, 0]
  );

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkBg }}>
      {/* Blurred board background suggestion */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(135deg, ${COLORS.darkCard} 0%, ${COLORS.darkSurface} 100%)`,
          filter: `blur(${bgBlur}px)`,
          opacity: 0.4,
        }}
      />

      <GlowOrb
        x="50%"
        y="40%"
        size={600}
        color1={COLORS.white}
        color2="#888888"
        opacity={0.05}
      />

      {/* Semi-transparent overlay */}
      <AbsoluteFill
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      />

      {/* Modal */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 1100,
            minHeight: 560,
            background: COLORS.darkCard,
            borderRadius: 18,
            border: `1px solid ${COLORS.darkBorder}`,
            boxShadow: `0 40px 120px rgba(0,0,0,0.7), 0 0 40px ${COLORS.primary}08`,
            padding: 36,
            display: "flex",
            gap: 32,
            transform: `scale(${modalScale})`,
            opacity: modalOpacity,
          }}
        >
          {/* Left panel */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 22,
            }}
          >
            {/* Task title */}
            <SectionReveal delay={4}>
              <div
                style={{
                  fontFamily: FONT.family,
                  fontWeight: FONT.bold,
                  fontSize: 28,
                  color: COLORS.white,
                  lineHeight: 1.3,
                }}
              >
                Edit hero video v3
              </div>
            </SectionReveal>

            {/* Description */}
            <SectionReveal delay={8}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    fontFamily: FONT.family,
                    fontSize: 13,
                    fontWeight: FONT.semibold,
                    color: COLORS.whiteAlpha40,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Description
                </div>
                <div
                  style={{
                    fontFamily: FONT.family,
                    fontSize: 15,
                    color: COLORS.whiteAlpha60,
                    lineHeight: 1.6,
                    background: COLORS.foreground100,
                    padding: 16,
                    borderRadius: 10,
                    minHeight: 80,
                  }}
                >
                  Apply color grading from the mood board. Use the LUT from the
                  approved reference. Export at 4K ProRes for final delivery.
                  Include alternate 16:9 and 9:16 crops.
                </div>
              </div>
            </SectionReveal>

            {/* Attachments */}
            <SectionReveal delay={12}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div
                  style={{
                    fontFamily: FONT.family,
                    fontSize: 13,
                    fontWeight: FONT.semibold,
                    color: COLORS.whiteAlpha40,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Attachments
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  {["hero-v3-final.mp4", "mood-board.pdf"].map((file, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "8px 14px",
                        background: COLORS.foreground100,
                        borderRadius: 8,
                        border: `1px solid ${COLORS.darkBorder}`,
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24">
                        <path
                          d="M12 2L4 6v12l8 4 8-4V6l-8-4z"
                          fill="none"
                          stroke={COLORS.primary}
                          strokeWidth="2"
                        />
                      </svg>
                      <span
                        style={{
                          fontFamily: FONT.family,
                          fontSize: 13,
                          color: COLORS.whiteAlpha60,
                        }}
                      >
                        {file}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>

            {/* Comments */}
            <SectionReveal delay={16}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div
                  style={{
                    fontFamily: FONT.family,
                    fontSize: 13,
                    fontWeight: FONT.semibold,
                    color: COLORS.whiteAlpha40,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Comments (3)
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                    padding: 12,
                    background: COLORS.foreground100,
                    borderRadius: 10,
                  }}
                >
                  <Avatar name="Taylor" size={28} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <span
                      style={{
                        fontFamily: FONT.family,
                        fontSize: 13,
                        fontWeight: FONT.semibold,
                        color: COLORS.whiteAlpha80,
                      }}
                    >
                      Taylor
                    </span>
                    <span
                      style={{
                        fontFamily: FONT.family,
                        fontSize: 13,
                        color: COLORS.whiteAlpha60,
                        lineHeight: 1.5,
                      }}
                    >
                      Looks great! Can we boost the saturation in the opening
                      shot?
                    </span>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Right side panel */}
          <div
            style={{
              width: 280,
              display: "flex",
              flexDirection: "column",
              gap: 22,
              paddingLeft: 24,
              borderLeft: `1px solid ${COLORS.darkBorder}`,
            }}
          >
            {/* Stage */}
            <SectionReveal delay={6}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div
                  style={{
                    fontFamily: FONT.family,
                    fontSize: 13,
                    fontWeight: FONT.semibold,
                    color: COLORS.whiteAlpha40,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Stage
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 14px",
                    background: `${STAGE_COLORS.review}18`,
                    border: `1px solid ${STAGE_COLORS.review}40`,
                    borderRadius: 10,
                  }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: STAGE_COLORS.review,
                      boxShadow: `0 0 8px ${STAGE_COLORS.review}80`,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: FONT.family,
                      fontSize: 14,
                      fontWeight: FONT.semibold,
                      color: STAGE_COLORS.review,
                    }}
                  >
                    Client Review
                  </span>
                </div>
              </div>
            </SectionReveal>

            {/* Owner */}
            <SectionReveal delay={10}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div
                  style={{
                    fontFamily: FONT.family,
                    fontSize: 13,
                    fontWeight: FONT.semibold,
                    color: COLORS.whiteAlpha40,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Responsible
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Avatar name="Jordan" size={34} />
                  <span
                    style={{
                      fontFamily: FONT.family,
                      fontSize: 14,
                      color: COLORS.whiteAlpha80,
                    }}
                  >
                    Jordan
                  </span>
                </div>
              </div>
            </SectionReveal>

            {/* Contributors */}
            <SectionReveal delay={14}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div
                  style={{
                    fontFamily: FONT.family,
                    fontSize: 13,
                    fontWeight: FONT.semibold,
                    color: COLORS.whiteAlpha40,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Contributors
                </div>
                <div style={{ display: "flex", gap: -4 }}>
                  {["Alex", "Sam", "Casey"].map((name, i) => (
                    <div key={name} style={{ marginLeft: i > 0 ? -6 : 0 }}>
                      <Avatar name={name} size={30} />
                    </div>
                  ))}
                  <span
                    style={{
                      fontFamily: FONT.family,
                      fontSize: 13,
                      color: COLORS.whiteAlpha60,
                      marginLeft: 10,
                      alignSelf: "center",
                    }}
                  >
                    3 contributors
                  </span>
                </div>
              </div>
            </SectionReveal>

            {/* Created at */}
            <SectionReveal delay={18}>
              <div
                style={{
                  fontFamily: FONT.family,
                  fontSize: 12,
                  color: COLORS.whiteAlpha40,
                  marginTop: "auto",
                  paddingTop: 16,
                  borderTop: `1px solid ${COLORS.darkBorder}`,
                }}
              >
                Created Mar 18, 2026 by Jordan
              </div>
            </SectionReveal>
          </div>
        </div>
      </AbsoluteFill>

      {/* Text overlay (matching Scene 5 style) */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: textEntrance,
          transform: `translateY(${textY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: FONT.family,
            fontWeight: FONT.bold,
            fontSize: 36,
            color: COLORS.white,
            textAlign: "center",
            textShadow: `0 4px 30px rgba(0,0,0,0.6)`,
          }}
        >
          Task details with{" "}
          <span
            style={{
              background: GRADIENT.brandText,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ownership clarity.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
