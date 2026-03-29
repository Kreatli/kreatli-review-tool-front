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

const COMMENTS = [
  {
    user: "Kate L.",
    initial: "K",
    hue: 320,
    hasDrawings: true,
    comment: "Let's make sure we display QR code in the marked place.",
    timestamp: "00:07",
    date: "Jul 24",
  },
  {
    user: "Kate L.",
    initial: "K",
    hue: 320,
    hasDrawings: true,
    comment: "We should probably blur this part.",
    timestamp: "00:14",
    date: "Jul 25",
  },
];

export const ReviewScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const topTextEntrance = spring({ frame, fps, config: SPRING_SMOOTH, delay: 3 });

  return (
    <FeatureSceneLayout
      headlineOpacity={topTextEntrance}
      headlineTransform={`translateY(${interpolate(topTextEntrance, [0, 1], [-12, 0])}px)`}
      motionAccent="rose"
      motionDelay={8}
      orb={
        <GlowOrb
          x="50%"
          y="42%"
          size={520}
          color1={COLORS.pinkLight}
          color2={COLORS.secondary}
          opacity={0.08}
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
          Pin comments to exact frames.{" "}
          <span
            style={{
              fontWeight: FONT.bold,
              background: GRADIENT.brandText,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            No more guessing.
          </span>
        </div>
      }
    >
        <div
          style={{
            width: 1000,
            background: COLORS.darkCard,
            borderRadius: 16,
            border: `1px solid ${COLORS.darkBorder}`,
            overflow: "hidden",
            boxShadow: `0 24px 90px rgba(0,0,0,0.55), 0 0 48px ${COLORS.pink}18`,
          }}
        >
          {/* File header */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", borderBottom: `1px solid ${COLORS.darkBorder}` }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "hsl(200, 50%, 45%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: FONT.bold, fontFamily: FONT.family, color: COLORS.white }}>
              M
            </div>
            <div>
              <div style={{ fontFamily: FONT.family, fontWeight: FONT.semibold, fontSize: 16, color: COLORS.white }}>interview_v2.mp4</div>
              <div style={{ fontFamily: FONT.family, fontSize: 12, color: COLORS.whiteAlpha40 }}>Vision review - Interviews</div>
            </div>
          </div>

          {/* Main content: canvas + comments side */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 220px" }}>
            {/* Video canvas */}
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <div
                style={{
                  width: "100%",
                  height: 390,
                  background: COLORS.foreground50,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <MediaPreviewPlaceholder uniqueId="review-canvas" variant="video" seed={4} />
                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 40% 50%, rgba(40,40,80,0.35) 0%, transparent 60%)`, pointerEvents: "none" }} />

                {/* Play button */}
                <div style={{ position: "absolute", bottom: 16, left: 16, width: 42, height: 42, borderRadius: "50%", background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24"><polygon points="8,5 19,12 8,19" fill={COLORS.white} /></svg>
                </div>
              </div>

              {/* Textarea mock */}
              <div style={{ padding: "10px 16px", borderTop: `1px solid ${COLORS.darkBorder}`, display: "flex", alignItems: "center", gap: 8 }}>
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

            {/* Comments sidebar */}
            <div style={{ borderLeft: `1px solid ${COLORS.darkBorder}`, padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ fontFamily: FONT.family, fontWeight: FONT.semibold, fontSize: 14, color: COLORS.white, paddingBottom: 8, borderBottom: `1px solid ${COLORS.darkBorder}` }}>
                Comments
              </div>
              {COMMENTS.map((c, i) => {
                const cEntrance = spring({ frame, fps, config: SPRING_SNAPPY, delay: 20 + i * 12 });
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                      paddingBottom: 10,
                      borderBottom: i < COMMENTS.length - 1 ? `1px solid ${COLORS.darkBorder}` : "none",
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
                      {c.hasDrawings && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }}>
                          <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" stroke={COLORS.primary} strokeWidth="2" />
                        </svg>
                      )}
                      <span style={{ fontWeight: FONT.semibold, color: COLORS.whiteAlpha40 }}>{c.timestamp} </span>
                      {c.comment}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
    </FeatureSceneLayout>
  );
};
