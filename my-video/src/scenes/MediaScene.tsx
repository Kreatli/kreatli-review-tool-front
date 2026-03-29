import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FeatureSceneLayout } from "../components/FeatureSceneLayout";
import { GlowOrb } from "../components/GlowOrb";
import { COLORS, FONT, GRADIENT } from "../lib/brand";
import { SPRING_SNAPPY, SPRING_SMOOTH } from "../lib/easings";

const UPLOADS = [
  { name: "product_launch_v2.mp4", size: "2.4 GB", type: "Video", progress: 0.68, completed: false },
  { name: "hero_image_final.jpg", size: "5.2 MB", type: "Image", progress: 1, completed: true },
  { name: "presentation_deck.pdf", size: "12 MB", type: "PDF", progress: 0.35, completed: false },
];

export const MediaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const topTextEntrance = spring({ frame, fps, config: SPRING_SMOOTH, delay: 3 });

  const animatedProgress0 = interpolate(frame, [fps * 0.5, fps * 3.0], [0.68, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const animatedProgress2 = interpolate(frame, [fps * 0.8, fps * 3.5], [0.35, 0.85], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const getProgress = (i: number) => {
    if (i === 0) return animatedProgress0;
    if (i === 1) return 1;
    return animatedProgress2;
  };

  const isCompleted = (i: number) => {
    if (i === 0) return animatedProgress0 >= 0.99;
    if (i === 1) return true;
    return false;
  };

  return (
    <FeatureSceneLayout
      headlineOpacity={topTextEntrance}
      headlineTransform={`translateY(${interpolate(topTextEntrance, [0, 1], [-12, 0])}px)`}
      motionAccent="cyan"
      motionDelay={8}
      orb={
        <GlowOrb
          x="28%"
          y="48%"
          size={440}
          color1={COLORS.cyan}
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
          Secure storage & upload.{" "}
          <span
            style={{
              fontWeight: FONT.bold,
              background: GRADIENT.brandText,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Always organized.
          </span>
        </div>
      }
    >
        <div
          style={{
            width: 700,
            background: COLORS.darkCard,
            borderRadius: 16,
            border: `1px solid ${COLORS.darkBorder}`,
            overflow: "hidden",
            boxShadow: `0 24px 90px rgba(0,0,0,0.55), 0 0 40px ${COLORS.cyan}12`,
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 20px",
              borderBottom: `1px solid ${COLORS.darkBorder}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: COLORS.foreground100, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v11z" stroke={COLORS.whiteAlpha60} strokeWidth="2" />
                </svg>
              </div>
              <div>
                <div style={{ fontFamily: FONT.family, fontWeight: FONT.semibold, fontSize: 16, color: COLORS.white }}>Creative Assets</div>
                <div style={{ fontFamily: FONT.family, fontSize: 12, color: COLORS.whiteAlpha40 }}>127 items, 45.2GB</div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 10px",
                borderRadius: 6,
                background: `${COLORS.success}18`,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={COLORS.success} strokeWidth="2" />
              </svg>
              <span style={{ fontFamily: FONT.family, fontSize: 12, fontWeight: FONT.semibold, color: COLORS.success }}>
                Encrypted
              </span>
            </div>
          </div>

          {/* Upload dropzone */}
          <div style={{ padding: "16px 20px" }}>
            <div
              style={{
                borderRadius: 14,
                border: `2px dashed ${COLORS.darkBorder}`,
                background: `linear-gradient(135deg, ${COLORS.foreground50}, ${COLORS.foreground100}50)`,
                padding: "28px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: `${COLORS.primary}18`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke={COLORS.primary} strokeWidth="2" />
                  <polyline points="17,8 12,3 7,8" stroke={COLORS.primary} strokeWidth="2" fill="none" />
                  <line x1="12" y1="3" x2="12" y2="15" stroke={COLORS.primary} strokeWidth="2" />
                </svg>
              </div>
              <div style={{ fontFamily: FONT.family, fontWeight: FONT.semibold, fontSize: 15, color: COLORS.white }}>
                Drag & drop files here
              </div>
              <div style={{ fontFamily: FONT.family, fontSize: 12, color: COLORS.whiteAlpha40 }}>
                or click to browse &middot; Supports files up to 10GB
              </div>
              <div style={{ padding: "7px 16px", borderRadius: 8, background: COLORS.white, fontFamily: FONT.family, fontSize: 13, fontWeight: FONT.bold, color: COLORS.darkBg, display: "flex", alignItems: "center", gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke={COLORS.darkBg} strokeWidth="2" />
                  <polyline points="17,8 12,3 7,8" stroke={COLORS.darkBg} strokeWidth="2" fill="none" />
                  <line x1="12" y1="3" x2="12" y2="15" stroke={COLORS.darkBg} strokeWidth="2" />
                </svg>
                Upload Files
              </div>
            </div>
          </div>

          {/* Upload list */}
          <div style={{ padding: "0 20px 18px", display: "flex", flexDirection: "column", gap: 8 }}>
            {UPLOADS.map((upload, i) => {
              const rowEntrance = spring({ frame, fps, config: SPRING_SNAPPY, delay: 18 + i * 7 });
              const prog = getProgress(i);
              const done = isCompleted(i);
              const barColor = done ? COLORS.success : COLORS.primary;
              return (
                <div
                  key={upload.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: 12,
                    borderRadius: 10,
                    border: `1px solid ${COLORS.darkBorder}`,
                    background: COLORS.foreground50,
                    opacity: interpolate(rowEntrance, [0, 0.5], [0, 1], { extrapolateRight: "clamp" }),
                    transform: `translateY(${interpolate(rowEntrance, [0, 1], [10, 0])}px)`,
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 10,
                      background: COLORS.foreground100,
                      border: `1px solid ${COLORS.darkBorder}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {upload.type === "Video" && (
                      <svg width="20" height="20" viewBox="0 0 24 24"><polygon points="8,5 19,12 8,19" fill={COLORS.whiteAlpha40} /></svg>
                    )}
                    {upload.type === "Image" && (
                      <svg width="20" height="20" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="18" rx="3" stroke={COLORS.whiteAlpha40} strokeWidth="2" fill="none" /><circle cx="8" cy="9" r="2" fill={COLORS.whiteAlpha40} /></svg>
                    )}
                    {upload.type === "PDF" && (
                      <svg width="20" height="20" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke={COLORS.whiteAlpha40} strokeWidth="2" fill="none" /></svg>
                    )}
                  </div>
                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: FONT.family, fontSize: 13, fontWeight: FONT.medium, color: COLORS.white, marginBottom: 2 }}>
                      {upload.name}
                    </div>
                    <div style={{ fontFamily: FONT.family, fontSize: 11, color: COLORS.whiteAlpha40, marginBottom: 5 }}>
                      {upload.size} &middot; {upload.type}
                    </div>
                    <div style={{ height: 4, borderRadius: 2, background: COLORS.foreground200, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${prog * 100}%`, background: barColor, borderRadius: 2, transition: "width 0.3s" }} />
                    </div>
                  </div>
                  {/* Circular progress */}
                  <div style={{ width: 36, height: 36, position: "relative" }}>
                    <svg width="36" height="36" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15" fill="none" stroke={COLORS.foreground200} strokeWidth="3" />
                      <circle
                        cx="18"
                        cy="18"
                        r="15"
                        fill="none"
                        stroke={barColor}
                        strokeWidth="3"
                        strokeDasharray={`${prog * 94.25} ${94.25}`}
                        strokeLinecap="round"
                        transform="rotate(-90 18 18)"
                      />
                    </svg>
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: FONT.family,
                        fontSize: 9,
                        fontWeight: FONT.bold,
                        color: COLORS.whiteAlpha60,
                      }}
                    >
                      {Math.round(prog * 100)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
    </FeatureSceneLayout>
  );
};
