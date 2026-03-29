import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FeatureSceneLayout } from "../components/FeatureSceneLayout";
import { GlowOrb } from "../components/GlowOrb";
import { MediaPreviewPlaceholder } from "../components/MediaPreviewPlaceholder";
import { COLORS, FONT, GRADIENT } from "../lib/brand";
import { SPRING_SNAPPY, SPRING_SMOOTH } from "../lib/easings";

const CHECKLIST = [
  { text: "Invite Greg to the Project", checked: true },
  { text: "Upload Media", checked: false },
  { text: "Make Adjustments to the Landing Page", checked: false },
];

const CHAT_ITEMS = [
  {
    name: "George",
    avatar: "G",
    hasUnread: true,
    message: "Kreatli_Logo_v1.png",
    time: "4 days ago",
    hue: 200,
  },
  {
    name: "Team Chat (Vision review)",
    avatar: null,
    message: "No messages",
    time: "",
    hue: 0,
  },
];

const MEDIA_ITEMS = [
  { status: "Approved", color: "#17C964" },
  { status: "Changes required", color: "#F31260" },
  { status: "No status", color: "#71717A" },
];

export const DashboardScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const zoom = interpolate(frame, [0, fps * 3], [1, 1.02], {
    extrapolateRight: "clamp",
  });

  const topTextEntrance = spring({
    frame,
    fps,
    config: SPRING_SMOOTH,
    delay: 3,
  });

  return (
    <FeatureSceneLayout
      headlineOpacity={topTextEntrance}
      headlineTransform={`translateY(${interpolate(topTextEntrance, [0, 1], [-12, 0])}px)`}
      contentScale={zoom}
      motionAccent="blue"
      motionDelay={8}
      orb={
        <GlowOrb
          x="50%"
          y="40%"
          size={520}
          color1={COLORS.primaryLight}
          color2={COLORS.secondaryLight}
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
          Centralized dashboard.{" "}
          <span
            style={{
              fontWeight: FONT.bold,
              background: GRADIENT.brandText,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            One place for everything.
          </span>
        </div>
      }
    >
      {/* Dashboard card */}
      <div
        style={{
          width: 1060,
          background: COLORS.darkCard,
          borderRadius: 16,
          border: `1px solid ${COLORS.darkBorder}`,
          overflow: "hidden",
          boxShadow: `0 24px 90px rgba(0,0,0,0.55), 0 0 0 1px ${COLORS.primary}14`,
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
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: COLORS.foreground100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect
                  x="2"
                  y="3"
                  width="20"
                  height="18"
                  rx="3"
                  stroke={COLORS.whiteAlpha60}
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div>
              <div
                style={{
                  fontFamily: FONT.family,
                  fontWeight: FONT.semibold,
                  fontSize: 16,
                  color: COLORS.white,
                }}
              >
                Vision review
              </div>
              <div
                style={{
                  fontFamily: FONT.family,
                  fontSize: 12,
                  color: COLORS.whiteAlpha40,
                }}
              >
                27 items, 2.45GB
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Avatar group */}
            <div style={{ display: "flex" }}>
              {[200, 280, 120].map((hue, i) => (
                <div
                  key={hue}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: `hsl(${hue}, 50%, 45%)`,
                    border: `2px solid ${COLORS.darkCard}`,
                    marginLeft: i > 0 ? -8 : 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: FONT.bold,
                    fontFamily: FONT.family,
                    color: COLORS.white,
                  }}
                >
                  {["P", "M", "G"][i]}
                </div>
              ))}
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: COLORS.foreground200,
                  border: `2px solid ${COLORS.darkCard}`,
                  marginLeft: -8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  fontWeight: FONT.bold,
                  fontFamily: FONT.family,
                  color: COLORS.whiteAlpha60,
                }}
              >
                +3
              </div>
            </div>
            {/* New button */}
            <div
              style={{
                padding: "6px 14px",
                borderRadius: 8,
                background: COLORS.white,
                fontFamily: FONT.family,
                fontSize: 13,
                fontWeight: FONT.bold,
                color: COLORS.darkBg,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span style={{ fontSize: 16 }}>+</span> New
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: 0,
            padding: "0 20px",
            borderBottom: `1px solid ${COLORS.darkBorder}`,
          }}
        >
          {["Home", "Media", "Chat", "Activity"].map((tab, i) => (
            <div
              key={tab}
              style={{
                padding: "10px 18px",
                fontFamily: FONT.family,
                fontSize: 13,
                fontWeight: i === 0 ? FONT.semibold : FONT.regular,
                color: i === 0 ? COLORS.white : COLORS.whiteAlpha40,
                borderBottom:
                  i === 0
                    ? `2px solid ${COLORS.white}`
                    : "2px solid transparent",
              }}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Body */}
        <div style={{ display: "flex", gap: 0 }}>
          {/* Left: Project overview + checklist */}
          <div
            style={{
              flex: 3,
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div
              style={{
                padding: 14,
                borderRadius: 12,
                border: `1px solid ${COLORS.darkBorder}`,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontFamily: FONT.family,
                    fontWeight: FONT.semibold,
                    fontSize: 13,
                    color: COLORS.white,
                  }}
                >
                  Example - Project overview
                </span>
              </div>
              <span
                style={{
                  fontFamily: FONT.family,
                  fontSize: 12,
                  color: COLORS.whiteAlpha40,
                  lineHeight: 1.4,
                }}
              >
                Keep everything important for this project in one place.
              </span>
              {[
                "Requirements - briefs, specs",
                "Ideas - concepts, references",
                "Links",
              ].map((item, i) => {
                const itemEntrance = spring({
                  frame,
                  fps,
                  config: SPRING_SNAPPY,
                  delay: 18 + i * 5,
                });
                return (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      opacity: itemEntrance,
                      transform: `translateX(${interpolate(itemEntrance, [0, 1], [-8, 0])}px)`,
                    }}
                  >
                    <div
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: "50%",
                        border: `1.5px solid ${COLORS.whiteAlpha40}`,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: FONT.family,
                        fontSize: 12,
                        color: COLORS.whiteAlpha60,
                      }}
                    >
                      {item}
                    </span>
                  </div>
                );
              })}
              <div
                style={{
                  borderTop: `1px solid ${COLORS.darkBorder}`,
                  paddingTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                {CHECKLIST.map((item, i) => {
                  const checkEntrance = spring({
                    frame,
                    fps,
                    config: SPRING_SNAPPY,
                    delay: 30 + i * 6,
                  });
                  return (
                    <div
                      key={item.text}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        opacity: checkEntrance,
                      }}
                    >
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: 4,
                          background: item.checked
                            ? COLORS.white
                            : "transparent",
                          border: `1.5px solid ${item.checked ? COLORS.white : COLORS.whiteAlpha40}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {item.checked && (
                          <svg width="10" height="10" viewBox="0 0 24 24">
                            <polyline
                              points="20,6 9,17 4,12"
                              stroke={COLORS.darkBg}
                              strokeWidth="3"
                              fill="none"
                            />
                          </svg>
                        )}
                      </div>
                      <span
                        style={{
                          fontFamily: FONT.family,
                          fontSize: 12,
                          color: item.checked
                            ? COLORS.whiteAlpha40
                            : COLORS.whiteAlpha60,
                          textDecoration: item.checked
                            ? "line-through"
                            : "none",
                        }}
                      >
                        {item.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Chat panel */}
          <div
            style={{
              flex: 2,
              padding: 16,
              borderLeft: `1px solid ${COLORS.darkBorder}`,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontFamily: FONT.family,
                  fontWeight: FONT.bold,
                  fontSize: 13,
                  color: COLORS.white,
                }}
              >
                Chat{" "}
                <span
                  style={{
                    fontWeight: FONT.regular,
                    color: COLORS.whiteAlpha40,
                  }}
                >
                  (2 conversations)
                </span>
              </span>
              <div
                style={{
                  padding: "4px 10px",
                  borderRadius: 6,
                  background: `${COLORS.primary}20`,
                  fontFamily: FONT.family,
                  fontSize: 11,
                  fontWeight: FONT.semibold,
                  color: COLORS.primary,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                Go to Chat →
              </div>
            </div>
            {CHAT_ITEMS.map((item, i) => {
              const chatEntrance = spring({
                frame,
                fps,
                config: SPRING_SNAPPY,
                delay: 22 + i * 8,
              });
              return (
                <div
                  key={item.name}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    padding: 10,
                    borderRadius: 10,
                    border: `1px solid ${COLORS.darkBorder}`,
                    background: COLORS.foreground50,
                    opacity: interpolate(chatEntrance, [0, 0.5], [0, 1], {
                      extrapolateRight: "clamp",
                    }),
                    transform: `translateY(${interpolate(chatEntrance, [0, 1], [10, 0])}px)`,
                  }}
                >
                  {item.avatar ? (
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: `hsl(${item.hue}, 50%, 45%)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        fontWeight: FONT.bold,
                        fontFamily: FONT.family,
                        color: COLORS.white,
                        flexShrink: 0,
                      }}
                    >
                      {item.avatar}
                    </div>
                  ) : (
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 6,
                        background: COLORS.foreground100,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <rect
                          x="2"
                          y="3"
                          width="20"
                          height="18"
                          rx="3"
                          stroke={COLORS.whiteAlpha40}
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        marginBottom: 2,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: FONT.family,
                          fontSize: 12,
                          fontWeight: FONT.semibold,
                          color: COLORS.white,
                        }}
                      >
                        {item.name}
                      </span>
                      {item.hasUnread && (
                        <>
                          <div
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: COLORS.primary,
                            }}
                          />
                          <span
                            style={{
                              fontFamily: FONT.family,
                              fontSize: 11,
                              color: COLORS.white,
                            }}
                          >
                            unread messages
                          </span>
                        </>
                      )}
                    </div>
                    <div
                      style={{
                        fontFamily: FONT.family,
                        fontSize: 11,
                        color: COLORS.whiteAlpha60,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.message}
                    </div>
                  </div>
                  {item.time && (
                    <span
                      style={{
                        fontFamily: FONT.family,
                        fontSize: 10,
                        color: COLORS.whiteAlpha40,
                        flexShrink: 0,
                      }}
                    >
                      {item.time}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Media row */}
        <div
          style={{
            padding: "0 16px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div
            style={{
              padding: 14,
              borderRadius: 12,
              background: COLORS.foreground50,
              border: `1px solid ${COLORS.darkBorder}`,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontFamily: FONT.family,
                  fontWeight: FONT.semibold,
                  fontSize: 13,
                  color: COLORS.white,
                }}
              >
                Media (3 files)
              </span>
              <div
                style={{
                  padding: "4px 10px",
                  borderRadius: 6,
                  background: `${COLORS.primary}20`,
                  fontFamily: FONT.family,
                  fontSize: 11,
                  fontWeight: FONT.semibold,
                  color: COLORS.primary,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                Go to Media →
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 10,
              }}
            >
              {MEDIA_ITEMS.map((item, i) => {
                const mediaEntrance = spring({
                  frame,
                  fps,
                  config: SPRING_SNAPPY,
                  delay: 35 + i * 5,
                });
                return (
                  <div
                    key={i}
                    style={{
                      height: 90,
                      borderRadius: 10,
                      border: `1px solid ${COLORS.darkBorder}`,
                      background: COLORS.foreground50,
                      position: "relative",
                      overflow: "hidden",
                      opacity: interpolate(mediaEntrance, [0, 0.5], [0, 1], {
                        extrapolateRight: "clamp",
                      }),
                      transform: `scale(${interpolate(mediaEntrance, [0, 1], [0.92, 1])})`,
                    }}
                  >
                    <MediaPreviewPlaceholder
                      uniqueId={`dash-media-${i}`}
                      variant={i === 1 ? "image" : "video"}
                      seed={i + 2}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: 8,
                        left: 8,
                        zIndex: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        padding: "2px 8px",
                        borderRadius: 6,
                        background: COLORS.foreground50,
                      }}
                    >
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: item.color,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: FONT.family,
                          fontSize: 10,
                          fontWeight: FONT.semibold,
                          color: item.color,
                        }}
                      >
                        {item.status}
                      </span>
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
