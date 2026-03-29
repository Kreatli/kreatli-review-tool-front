import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FeatureSceneLayout } from "../components/FeatureSceneLayout";
import { GlowOrb } from "../components/GlowOrb";
import { MediaPreviewPlaceholder } from "../components/MediaPreviewPlaceholder";
import { COLORS, FONT, GRADIENT } from "../lib/brand";
import { SPRING_SNAPPY, SPRING_SMOOTH } from "../lib/easings";

const COMMENTS_LEFT = [
  { user: "Kate L.", initial: "K", hue: 320, comment: "The color grading looks better in this version.", timestamp: "00:05", date: "Jul 24" },
];

const COMMENTS_RIGHT = [
  { user: "Peter R.", initial: "P", hue: 200, comment: "This version has better transitions.", timestamp: "00:08", date: "Jul 25" },
];

export const CompareScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const topTextEntrance = spring({ frame, fps, config: SPRING_SMOOTH, delay: 3 });

  const panelTilt = spring({ frame, fps, config: SPRING_SNAPPY, delay: 22 });
  const leftRotY = interpolate(panelTilt, [0, 1], [-6.5, 0]);
  const rightRotY = interpolate(panelTilt, [0, 1], [6.5, 0]);

  const activeSwitch = interpolate(frame, [fps * 1.5, fps * 1.7], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const isRight = activeSwitch > 0.5;

  return (
    <FeatureSceneLayout
      headlineOpacity={topTextEntrance}
      headlineTransform={`translateY(${interpolate(topTextEntrance, [0, 1], [-12, 0])}px)`}
      motionAccent="purple"
      motionDelay={8}
      orb={
        <GlowOrb
          x="50%"
          y="44%"
          size={540}
          color1={COLORS.secondaryLight}
          color2={COLORS.primary}
          opacity={0.09}
        />
      }
      headline={
        <div
          style={{
            fontFamily: FONT.family,
            fontSize: 36,
            fontWeight: FONT.regular,
            lineHeight: 1.22,
            letterSpacing: "-0.02em",
            color: COLORS.whiteAlpha60,
            textAlign: "center",
          }}
        >
          Compare versions side-by-side.{" "}
          <span
            style={{
              fontWeight: FONT.bold,
              background: GRADIENT.brandText,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Spot every change.
          </span>
        </div>
      }
    >
        <div
          style={{
            width: 1060,
            background: COLORS.darkCard,
            borderRadius: 16,
            border: `1px solid ${COLORS.darkBorder}`,
            overflow: "hidden",
            boxShadow: `0 24px 90px rgba(0,0,0,0.55), 0 0 60px ${COLORS.secondary}14`,
          }}
        >
          {/* Three-column layout: left file | right file | comments */}
          <div
            style={{
              perspective: 1100,
              transformStyle: "preserve-3d",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 240px",
                transformStyle: "preserve-3d",
              }}
            >
            {/* Left column */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
                transform: `rotateY(${leftRotY}deg)`,
                transformOrigin: "right center",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 14px",
                  background: !isRight ? `${COLORS.primary}18` : COLORS.foreground50,
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
              >
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "hsl(200, 50%, 45%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: FONT.bold, fontFamily: FONT.family, color: COLORS.white }}>
                  P
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: FONT.family, fontWeight: FONT.semibold, fontSize: 13, color: !isRight ? COLORS.primary : COLORS.white }}>walkthrough_v2.mp4</div>
                  <div style={{ fontFamily: FONT.family, fontSize: 11, color: COLORS.whiteAlpha40 }}>278 MB</div>
                </div>
              </div>
              <div
                style={{
                  height: 280,
                  background: COLORS.foreground50,
                  border: !isRight ? `2px solid ${COLORS.primary}` : "2px solid transparent",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <MediaPreviewPlaceholder uniqueId="compare-v2" variant="video" seed={1} />
                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 35% 45%, rgba(30,30,60,0.32) 0%, transparent 60%)`, opacity: 0.65, pointerEvents: "none" }} />
              </div>
            </div>

            {/* Right column */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
                transform: `rotateY(${rightRotY}deg)`,
                transformOrigin: "left center",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 14px",
                  background: isRight ? `${COLORS.primary}18` : COLORS.foreground50,
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
              >
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "hsl(280, 50%, 45%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: FONT.bold, fontFamily: FONT.family, color: COLORS.white }}>
                  M
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: FONT.family, fontWeight: FONT.semibold, fontSize: 13, color: isRight ? COLORS.primary : COLORS.white }}>walkthrough_v3.mp4</div>
                  <div style={{ fontFamily: FONT.family, fontSize: 11, color: COLORS.whiteAlpha40 }}>285 MB</div>
                </div>
              </div>
              <div
                style={{
                  height: 280,
                  background: COLORS.foreground50,
                  border: isRight ? `2px solid ${COLORS.primary}` : "2px solid transparent",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <MediaPreviewPlaceholder uniqueId="compare-v3" variant="video" seed={6} />
                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 55% 45%, rgba(50,50,100,0.4) 0%, transparent 60%)`, pointerEvents: "none" }} />
              </div>
            </div>

            {/* Comments sidebar */}
            <div style={{ borderLeft: `1px solid ${COLORS.darkBorder}`, padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ fontFamily: FONT.family, fontWeight: FONT.semibold, fontSize: 14, color: COLORS.white, paddingBottom: 8, borderBottom: `1px solid ${COLORS.darkBorder}` }}>
                Comments
              </div>
              {(isRight ? COMMENTS_RIGHT : COMMENTS_LEFT).map((c, i) => {
                const cEntrance = spring({ frame, fps, config: SPRING_SNAPPY, delay: 18 + i * 10 });
                return (
                  <div
                    key={`${c.user}-${c.timestamp}`}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                      opacity: interpolate(cEntrance, [0, 0.5], [0, 1], { extrapolateRight: "clamp" }),
                      transform: `translateY(${interpolate(cEntrance, [0, 1], [8, 0])}px)`,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 18, height: 18, borderRadius: "50%", background: `hsl(${c.hue}, 50%, 45%)`, border: `1.5px solid ${COLORS.whiteAlpha20}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: FONT.bold, fontFamily: FONT.family, color: COLORS.white }}>
                          {c.initial}
                        </div>
                        <span style={{ fontFamily: FONT.family, fontSize: 12, fontWeight: FONT.semibold, color: COLORS.white }}>{c.user}</span>
                      </div>
                      <span style={{ fontFamily: FONT.family, fontSize: 10, color: COLORS.whiteAlpha40 }}>{c.date}</span>
                    </div>
                    <div style={{ fontFamily: FONT.family, fontSize: 12, color: COLORS.whiteAlpha60, lineHeight: 1.4 }}>
                      <span style={{ fontWeight: FONT.semibold, color: COLORS.whiteAlpha40 }}>{c.timestamp} </span>
                      {c.comment}
                    </div>
                  </div>
                );
              })}
            </div>
            </div>
          </div>

          {/* Shared comment input */}
          <div style={{ padding: "10px 16px", borderTop: `1px solid ${COLORS.darkBorder}`, display: "grid", gridTemplateColumns: "1fr 1fr 240px", gap: 0 }}>
            <div style={{ gridColumn: "1 / 3", display: "flex", alignItems: "center", gap: 8, paddingRight: 16 }}>
              <div style={{ flex: 1, padding: "8px 12px", borderRadius: 8, background: COLORS.foreground100, border: `1px solid ${COLORS.darkBorder}` }}>
                <span style={{ fontFamily: FONT.family, fontSize: 13, color: COLORS.whiteAlpha40 }}>Leave your comment here...</span>
              </div>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: COLORS.white, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <line x1="22" y1="2" x2="11" y2="13" stroke={COLORS.darkBg} strokeWidth="2" />
                  <polygon points="22,2 15,22 11,13 2,9" stroke={COLORS.darkBg} strokeWidth="2" fill="none" />
                </svg>
              </div>
            </div>
          </div>
        </div>
    </FeatureSceneLayout>
  );
};
