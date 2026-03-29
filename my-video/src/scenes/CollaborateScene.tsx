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

const CHAT_MESSAGES = [
  {
    user: "Peter R.",
    initial: "P",
    hue: 200,
    message: "Hey team! Just uploaded the latest cut of walkthrough. Would love your thoughts before we lock it",
    date: "10:24 AM",
    asset: "walkthrough_v3.mp4",
  },
  {
    user: "Martin D.",
    initial: "M",
    hue: 280,
    message: "Got it, watching now",
    date: "10:25 AM",
    asset: null,
  },
];

export const CollaborateScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const card1Entrance = spring({ frame, fps, config: SPRING_SNAPPY, delay: 8 });
  const card2Entrance = spring({ frame, fps, config: SPRING_SNAPPY, delay: 14 });
  const topTextEntrance = spring({ frame, fps, config: SPRING_SMOOTH, delay: 3 });

  return (
    <FeatureSceneLayout
      headlineOpacity={topTextEntrance}
      headlineTransform={`translateY(${interpolate(topTextEntrance, [0, 1], [-12, 0])}px)`}
      motionAccent="purple"
      motionDelay={8}
      orb={
        <GlowOrb
          x="52%"
          y="44%"
          size={520}
          color1={COLORS.secondaryLight}
          color2={COLORS.cyan}
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
          Chat, share, notify.{" "}
          <span
            style={{
              fontWeight: FONT.bold,
              background: GRADIENT.brandText,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Keep everyone in sync.
          </span>
        </div>
      }
    >
        <div style={{ display: "flex", gap: 18, width: 1060 }}>
          {/* Chat card — matches ChatFeaturePreview layout */}
          <div
            style={{
              flex: 1,
              background: COLORS.darkCard,
              borderRadius: 16,
              border: `1px solid ${COLORS.darkBorder}`,
              overflow: "hidden",
              boxShadow: "0 16px 60px rgba(0,0,0,0.4)",
              display: "flex",
              opacity: interpolate(card1Entrance, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }),
              transform: `translateY(${interpolate(card1Entrance, [0, 1], [30, 0])}px)`,
            }}
          >
            {/* Left sidebar with avatars */}
            <div style={{ width: 56, padding: "14px 10px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, borderRight: `1px solid ${COLORS.darkBorder}` }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: COLORS.foreground100, border: `2px solid ${COLORS.darkBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="3" width="20" height="18" rx="3" stroke={COLORS.whiteAlpha40} strokeWidth="2" />
                </svg>
              </div>
              {[200, 280].map((hue, i) => (
                <div key={hue} style={{ width: 36, height: 36, borderRadius: "50%", background: `hsl(${hue}, 50%, 45%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: FONT.bold, fontFamily: FONT.family, color: COLORS.white }}>
                  {["P", "M"][i]}
                </div>
              ))}
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: COLORS.foreground100, border: `1px solid ${COLORS.darkBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 16, color: COLORS.whiteAlpha40 }}>+</span>
              </div>
            </div>

            {/* Chat content */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              {/* Chat header */}
              <div style={{ padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: COLORS.foreground100, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="3" width="20" height="18" rx="3" stroke={COLORS.whiteAlpha40} strokeWidth="2" />
                    </svg>
                  </div>
                  <span style={{ fontFamily: FONT.family, fontWeight: FONT.semibold, fontSize: 15, color: COLORS.white }}>Project chat</span>
                </div>
                <div style={{ display: "flex" }}>
                  {[200, 280].map((hue, i) => (
                    <div key={hue} style={{ width: 24, height: 24, borderRadius: "50%", background: `hsl(${hue}, 50%, 45%)`, border: `2px solid ${COLORS.darkCard}`, marginLeft: i > 0 ? -6 : 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: FONT.bold, fontFamily: FONT.family, color: COLORS.white }}>
                      {["P", "M"][i]}
                    </div>
                  ))}
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: COLORS.foreground200, border: `2px solid ${COLORS.darkCard}`, marginLeft: -6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: FONT.bold, fontFamily: FONT.family, color: COLORS.whiteAlpha60 }}>
                    +4
                  </div>
                </div>
              </div>

              {/* Messages area */}
              <div style={{ flex: 1, padding: "8px 14px", background: COLORS.foreground50, borderRadius: 10, margin: "0 10px", display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ alignSelf: "center", padding: "3px 12px", borderRadius: 8, background: COLORS.foreground100, fontFamily: FONT.family, fontSize: 12, color: COLORS.whiteAlpha60, boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }}>
                  Today
                </div>
                {CHAT_MESSAGES.map((msg, i) => {
                  const msgEntrance = spring({ frame, fps, config: SPRING_SNAPPY, delay: 18 + i * 12 });
                  return (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 8,
                        opacity: interpolate(msgEntrance, [0, 0.5], [0, 1], { extrapolateRight: "clamp" }),
                        transform: `translateY(${interpolate(msgEntrance, [0, 1], [10, 0])}px)`,
                      }}
                    >
                      <div style={{ width: 30, height: 30, borderRadius: "50%", background: `hsl(${msg.hue}, 50%, 45%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: FONT.bold, fontFamily: FONT.family, color: COLORS.white, flexShrink: 0 }}>
                        {msg.initial}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <div style={{ fontFamily: FONT.family, fontSize: 12, color: COLORS.white }}>
                          {msg.user} <span style={{ color: COLORS.whiteAlpha40, fontSize: 11 }}>{msg.date}</span>
                        </div>
                        <div style={{ padding: "8px 12px", borderRadius: 10, background: COLORS.foreground100, fontFamily: FONT.family, fontSize: 13, color: COLORS.whiteAlpha80, lineHeight: 1.4, maxWidth: 380 }}>
                          {msg.message}
                        </div>
                        {msg.asset && (
                          <div style={{ marginTop: 2 }}>
                            <div style={{ width: 220, height: 90, borderRadius: 8, background: COLORS.foreground50, position: "relative", overflow: "hidden" }}>
                              <MediaPreviewPlaceholder uniqueId="collab-chat-clip" variant="video" seed={5} />
                              <div style={{ position: "absolute", top: 6, left: 6, zIndex: 2, padding: "2px 8px", borderRadius: 6, background: COLORS.foreground50, border: `1px solid ${COLORS.darkBorder}` }}>
                                <span style={{ fontFamily: FONT.family, fontSize: 10, color: COLORS.whiteAlpha60 }}>{msg.asset}</span>
                              </div>
                              <div style={{ position: "absolute", bottom: 6, left: 6, zIndex: 2, display: "flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 6, background: COLORS.foreground100 }}>
                                <div style={{ width: 5, height: 5, borderRadius: "50%", background: COLORS.warning }} />
                                <span style={{ fontFamily: FONT.family, fontSize: 10, color: COLORS.warning }}>Review needed</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Input */}
              <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ flex: 1, padding: "8px 12px", fontFamily: FONT.family, fontSize: 13, color: COLORS.whiteAlpha40 }}>
                  Type a message...
                </div>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: COLORS.white, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <line x1="22" y1="2" x2="11" y2="13" stroke={COLORS.darkBg} strokeWidth="2" />
                    <polygon points="22,2 15,22 11,13 2,9" stroke={COLORS.darkBg} strokeWidth="2" fill="none" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Share card — matches ShareFeaturePreview */}
          <div
            style={{
              width: 340,
              background: COLORS.darkCard,
              borderRadius: 16,
              border: `1px solid ${COLORS.darkBorder}`,
              overflow: "hidden",
              boxShadow: "0 16px 60px rgba(0,0,0,0.4)",
              display: "flex",
              flexDirection: "column",
              opacity: interpolate(card2Entrance, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }),
              transform: `translateY(${interpolate(card2Entrance, [0, 1], [30, 0])}px)`,
            }}
          >
            {/* File header */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderBottom: `1px solid ${COLORS.darkBorder}` }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: "hsl(280, 50%, 45%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: FONT.bold, fontFamily: FONT.family, color: COLORS.white }}>
                M
              </div>
              <div>
                <div style={{ fontFamily: FONT.family, fontWeight: FONT.semibold, fontSize: 14, color: COLORS.white }}>interview_v2.mp4</div>
                <div style={{ fontFamily: FONT.family, fontSize: 11, color: COLORS.whiteAlpha40 }}>Vision review</div>
              </div>
            </div>

            {/* Preview thumbnail */}
            <div style={{ height: 100, background: COLORS.foreground50, position: "relative", overflow: "hidden" }}>
              <MediaPreviewPlaceholder uniqueId="collab-share-preview" variant="video" seed={8} />
            </div>

            {/* Share panel */}
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
              <div style={{ fontFamily: FONT.family, fontWeight: FONT.semibold, fontSize: 14, color: COLORS.white, paddingBottom: 8, borderBottom: `1px solid ${COLORS.darkBorder}` }}>
                Share File
              </div>

              {/* Copy link input */}
              <div>
                <span style={{ fontFamily: FONT.family, fontSize: 11, color: COLORS.whiteAlpha40, marginBottom: 4, display: "block" }}>Copy shareable link</span>
                <div style={{ display: "flex", gap: 6 }}>
                  <div style={{ flex: 1, padding: "6px 10px", borderRadius: 8, background: COLORS.foreground100, border: `1px solid ${COLORS.darkBorder}`, fontFamily: FONT.family, fontSize: 11, color: COLORS.whiteAlpha40, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    kreatli.com/share/example-link-id
                  </div>
                  <div style={{ width: 30, height: 30, borderRadius: 6, background: COLORS.foreground100, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <rect x="9" y="9" width="13" height="13" rx="2" stroke={COLORS.whiteAlpha60} strokeWidth="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke={COLORS.whiteAlpha60} strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div style={{ position: "relative", textAlign: "center" }}>
                <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 1, background: COLORS.darkBorder }} />
                <span style={{ position: "relative", background: COLORS.darkCard, padding: "0 8px", fontFamily: FONT.family, fontSize: 11, color: COLORS.whiteAlpha40 }}>or</span>
              </div>

              {/* Email chips */}
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {["john.doe@example.com", "sarah.smith@example.com"].map((email, i) => {
                  const chipEntrance = spring({ frame, fps, config: SPRING_SNAPPY, delay: 30 + i * 8 });
                  return (
                    <div
                      key={email}
                      style={{
                        padding: "3px 10px",
                        borderRadius: 6,
                        background: COLORS.foreground100,
                        fontFamily: FONT.family,
                        fontSize: 10,
                        color: COLORS.whiteAlpha60,
                        opacity: chipEntrance,
                        transform: `scale(${interpolate(chipEntrance, [0, 1], [0.8, 1])})`,
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      {email}
                      <span style={{ color: COLORS.whiteAlpha40, cursor: "pointer" }}>×</span>
                    </div>
                  );
                })}
              </div>

              {/* Send button */}
              <div style={{ padding: "7px 14px", borderRadius: 8, background: COLORS.white, fontFamily: FONT.family, fontSize: 12, fontWeight: FONT.bold, color: COLORS.darkBg, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <line x1="22" y1="2" x2="11" y2="13" stroke={COLORS.darkBg} strokeWidth="2" />
                  <polygon points="22,2 15,22 11,13 2,9" stroke={COLORS.darkBg} strokeWidth="2" fill="none" />
                </svg>
                Send link via email
              </div>
            </div>
          </div>
        </div>
    </FeatureSceneLayout>
  );
};
