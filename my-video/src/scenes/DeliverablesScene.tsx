import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FeatureSceneLayout } from "../components/FeatureSceneLayout";
import { GlowOrb } from "../components/GlowOrb";
import { COLORS, FONT, GRADIENT, STAGE_COLORS } from "../lib/brand";
import { SPRING_SNAPPY, SPRING_SMOOTH } from "../lib/easings";

const LIST_ROWS = [
  {
    name: "Hero video — final cut",
    due: "Apr 12",
    status: "In review",
    statusColor: STAGE_COLORS.review,
    owner: "Jordan",
    initial: "J",
    hue: 280,
  },
  {
    name: "Social cutdown pack (9×16)",
    due: "Apr 18",
    status: "In production",
    statusColor: STAGE_COLORS.production,
    owner: "Casey",
    initial: "C",
    hue: 40,
  },
  {
    name: "Landing page hero assets",
    due: "Apr 22",
    status: "Briefing",
    statusColor: STAGE_COLORS.briefing,
    owner: "Alex",
    initial: "A",
    hue: 200,
  },
  {
    name: "Master brand guidelines PDF",
    due: "Apr 28",
    status: "Delivered",
    statusColor: STAGE_COLORS.delivered,
    owner: "Sam",
    initial: "S",
    hue: 120,
  },
] as const;

const GANTT_ROWS = [
  { label: "Campaign brief", start: 0.05, end: 0.22, color: STAGE_COLORS.briefing },
  { label: "Hero video", start: 0.18, end: 0.55, color: STAGE_COLORS.production },
  { label: "Social pack", start: 0.48, end: 0.72, color: STAGE_COLORS.review },
  { label: "Final delivery", start: 0.68, end: 0.94, color: STAGE_COLORS.delivered },
] as const;

const WEEKS = ["Apr 1", "Apr 8", "Apr 15", "Apr 22", "Apr 29", "May 6"];

export const DeliverablesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const topTextEntrance = spring({ frame, fps, config: SPRING_SMOOTH, delay: 3 });

  const switchStart = fps * 1.75;
  const switchEnd = fps * 2.35;
  const listWeight = interpolate(frame, [switchStart, switchEnd], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ganttWeight = 1 - listWeight;
  const listActive = listWeight > 0.5;

  const ganttY = interpolate(
    Math.max(0, frame - switchStart),
    [0, fps * 0.35],
    [14, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <FeatureSceneLayout
      headlineOpacity={topTextEntrance}
      headlineTransform={`translateY(${interpolate(topTextEntrance, [0, 1], [-12, 0])}px)`}
      motionAccent="blue"
      motionDelay={8}
      orb={
        <GlowOrb
          x="52%"
          y="44%"
          size={500}
          color1={COLORS.primaryLight}
          color2={STAGE_COLORS.delivered}
          opacity={0.07}
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
          List and Gantt for deliverables.{" "}
          <span
            style={{
              fontWeight: FONT.bold,
              background: GRADIENT.brandText,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Same schedule, two views.
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
          boxShadow: `0 24px 90px rgba(0,0,0,0.55), 0 0 48px ${COLORS.primary}10`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 20px",
            borderBottom: `1px solid ${COLORS.darkBorder}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: COLORS.foreground100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  stroke={COLORS.whiteAlpha60}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <span
                style={{
                  fontFamily: FONT.family,
                  fontWeight: FONT.semibold,
                  fontSize: 14,
                  color: COLORS.white,
                }}
              >
                Spring Campaign
              </span>
              <span
                style={{
                  fontFamily: FONT.family,
                  fontSize: 12,
                  color: COLORS.whiteAlpha40,
                  marginLeft: 8,
                }}
              >
                Deliverables
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              padding: 3,
              borderRadius: 10,
              background: COLORS.foreground50,
              border: `1px solid ${COLORS.darkBorder}`,
            }}
          >
            <div
              style={{
                padding: "6px 16px",
                borderRadius: 8,
                fontFamily: FONT.family,
                fontSize: 12,
                fontWeight: FONT.semibold,
                color: listActive ? COLORS.white : COLORS.whiteAlpha40,
                background: listActive ? `${COLORS.primary}35` : "transparent",
                boxShadow: listActive ? `0 0 0 1px ${COLORS.primary}55` : "none",
              }}
            >
              List
            </div>
            <div
              style={{
                padding: "6px 16px",
                borderRadius: 8,
                fontFamily: FONT.family,
                fontSize: 12,
                fontWeight: FONT.semibold,
                color: !listActive ? COLORS.white : COLORS.whiteAlpha40,
                background: !listActive ? `${COLORS.secondary}35` : "transparent",
                boxShadow: !listActive ? `0 0 0 1px ${COLORS.secondaryLight}55` : "none",
              }}
            >
              Gantt
            </div>
          </div>
        </div>

        <div style={{ position: "relative", minHeight: 340, padding: 16 }}>
          {/* List panel */}
          <div
            style={{
              position: "absolute",
              inset: 16,
              opacity: listWeight,
              transform: `translateY(${interpolate(listWeight, [0, 1], [-8, 0])}px) scale(${interpolate(listWeight, [0, 0.5], [0.98, 1], { extrapolateRight: "clamp" })})`,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.4fr 0.55fr 0.75fr 0.65fr",
                gap: 0,
                padding: "10px 14px",
                borderRadius: 10,
                background: COLORS.foreground50,
                border: `1px solid ${COLORS.darkBorder}`,
                fontFamily: FONT.family,
                fontSize: 11,
                fontWeight: FONT.semibold,
                color: COLORS.whiteAlpha40,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              <span>Deliverable</span>
              <span>Due</span>
              <span>Status</span>
              <span>Owner</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0, marginTop: 6 }}>
              {LIST_ROWS.map((row, i) => {
                const rowIn = spring({ frame, fps, config: SPRING_SNAPPY, delay: 14 + i * 5 });
                return (
                  <div
                    key={row.name}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.4fr 0.55fr 0.75fr 0.65fr",
                      alignItems: "center",
                      padding: "12px 14px",
                      borderRadius: 10,
                      border: `1px solid ${COLORS.darkBorder}`,
                      background: COLORS.darkSurface,
                      marginTop: i === 0 ? 0 : 6,
                      opacity: interpolate(rowIn, [0, 0.35], [0, 1], { extrapolateRight: "clamp" }),
                      transform: `translateY(${interpolate(rowIn, [0, 1], [16, 0])}px)`,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONT.family,
                        fontSize: 13,
                        fontWeight: FONT.medium,
                        color: COLORS.white,
                      }}
                    >
                      {row.name}
                    </span>
                    <span style={{ fontFamily: FONT.family, fontSize: 12, color: COLORS.whiteAlpha60 }}>
                      {row.due}
                    </span>
                    <span
                      style={{
                        fontFamily: FONT.family,
                        fontSize: 11,
                        fontWeight: FONT.semibold,
                        color: row.statusColor,
                      }}
                    >
                      {row.status}
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: "50%",
                          background: `hsl(${row.hue}, 50%, 42%)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 10,
                          fontWeight: FONT.bold,
                          color: COLORS.white,
                        }}
                      >
                        {row.initial}
                      </div>
                      <span style={{ fontFamily: FONT.family, fontSize: 12, color: COLORS.whiteAlpha40 }}>
                        {row.owner}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Gantt panel */}
          <div
            style={{
              position: "absolute",
              inset: 16,
              opacity: ganttWeight,
              transform: `translateY(${ganttY}px) scale(${interpolate(ganttWeight, [0, 1], [0.97, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })})`,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                borderRadius: 10,
                border: `1px solid ${COLORS.darkBorder}`,
                background: COLORS.foreground50,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "160px repeat(6, 1fr)",
                  borderBottom: `1px solid ${COLORS.darkBorder}`,
                }}
              >
                <div
                  style={{
                    padding: "10px 12px",
                    fontFamily: FONT.family,
                    fontSize: 11,
                    fontWeight: FONT.semibold,
                    color: COLORS.whiteAlpha40,
                    borderRight: `1px solid ${COLORS.darkBorder}`,
                  }}
                >
                  Workstream
                </div>
                {WEEKS.map((w) => (
                  <div
                    key={w}
                    style={{
                      padding: "10px 8px",
                      textAlign: "center",
                      fontFamily: FONT.family,
                      fontSize: 10,
                      fontWeight: FONT.semibold,
                      color: COLORS.whiteAlpha40,
                      borderRight: `1px solid ${COLORS.darkBorder}`,
                    }}
                  >
                    {w}
                  </div>
                ))}
              </div>

              {GANTT_ROWS.map((gr, ri) => {
                const barIn = spring({
                  frame: Math.max(0, frame - switchEnd),
                  fps,
                  config: SPRING_SNAPPY,
                  delay: 4 + ri * 6,
                });
                const showBar = frame >= switchEnd - 2;
                return (
                  <div
                    key={gr.label}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "160px 1fr",
                      minHeight: 52,
                      borderBottom: `1px solid ${COLORS.darkBorder}`,
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        padding: "12px 12px",
                        fontFamily: FONT.family,
                        fontSize: 12,
                        fontWeight: FONT.medium,
                        color: COLORS.whiteAlpha80,
                        borderRight: `1px solid ${COLORS.darkBorder}`,
                      }}
                    >
                      {gr.label}
                    </div>
                    <div
                      style={{
                        position: "relative",
                        height: 52,
                        margin: "0 10px",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          inset: "14px 0",
                          display: "grid",
                          gridTemplateColumns: "repeat(6, 1fr)",
                          gap: 0,
                        }}
                      >
                        {[0, 1, 2, 3, 4, 5].map((k) => (
                          <div
                            key={k}
                            style={{
                              borderLeft: k === 0 ? "none" : `1px dashed ${COLORS.whiteAlpha10}`,
                            }}
                          />
                        ))}
                      </div>
                      {showBar && (
                        <div
                          style={{
                            position: "absolute",
                            left: `${gr.start * 100}%`,
                            width: `${(gr.end - gr.start) * 100}%`,
                            top: 16,
                            height: 20,
                            borderRadius: 6,
                            background: `${gr.color}45`,
                            border: `1px solid ${gr.color}`,
                            boxShadow: `0 0 20px ${gr.color}28`,
                            opacity: interpolate(barIn, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }),
                            transform: `scaleX(${interpolate(barIn, [0, 1], [0.2, 1])})`,
                            transformOrigin: "left center",
                          }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </FeatureSceneLayout>
  );
};
