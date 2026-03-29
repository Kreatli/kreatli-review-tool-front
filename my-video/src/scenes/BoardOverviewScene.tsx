import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { MockBoardColumn } from "../components/MockBoardColumn";
import { GlowOrb } from "../components/GlowOrb";
import { BOARD_DATA, COLORS, FONT, GRADIENT } from "../lib/brand";
import { SPRING_SMOOTH, SPRING_SNAPPY } from "../lib/easings";
import type { TaskData } from "../components/MockTaskCard";

export const BoardOverviewScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const frameEntrance = spring({
    frame,
    fps,
    config: SPRING_SMOOTH,
    delay: 2,
  });
  const frameScale = interpolate(frameEntrance, [0, 1], [0.9, 1]);
  const frameOpacity = interpolate(frameEntrance, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  const headerEntrance = spring({
    frame,
    fps,
    config: SPRING_SNAPPY,
    delay: 4,
  });
  const headerY = interpolate(headerEntrance, [0, 1], [20, 0]);
  const headerOpacity = interpolate(headerEntrance, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  const zoom = interpolate(frame, [0, fps * 2], [1, 1.03], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkBg }}>
      <GlowOrb
        x="30%"
        y="40%"
        size={500}
        color1={COLORS.white}
        color2="#888888"
        opacity={0.04}
      />
      <GlowOrb
        x="70%"
        y="60%"
        size={400}
        color1="#CCCCCC"
        color2={COLORS.white}
        opacity={0.03}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${zoom})`,
        }}
      >
        {/* App frame */}
        <div
          style={{
            width: 1580,
            background: COLORS.darkCard,
            borderRadius: 20,
            border: `1px solid ${COLORS.darkBorder}`,
            boxShadow: `0 30px 100px rgba(0,0,0,0.6), 0 0 60px ${COLORS.primary}10`,
            padding: 28,
            display: "flex",
            flexDirection: "column",
            gap: 20,
            opacity: frameOpacity,
            transform: `scale(${frameScale})`,
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              paddingBottom: 16,
              borderBottom: `1px solid ${COLORS.darkBorder}`,
              opacity: headerOpacity,
              transform: `translateY(${headerY}px)`,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: COLORS.foreground100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24">
                <path
                  d="M20.25 4.5H3.75a.75.75 0 0 0-.75.75V19.5A1.5 1.5 0 0 0 4.5 21h3.75a1.5 1.5 0 0 0 1.5-1.5V15h4.5v1.5a1.5 1.5 0 0 0 1.5 1.5h3.75a1.5 1.5 0 0 0 1.5-1.5V5.25a.75.75 0 0 0-.75-.75Zm-12 15H4.5V12h3.75v7.5Zm0-9H4.5V6h3.75v4.5Zm6 3h-4.5V6h4.5v7.5Zm5.25 3h-3.75V12h3.75v4.5Zm0-6h-3.75V6h3.75v4.5Z"
                  fill={COLORS.whiteAlpha60}
                />
              </svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span
                style={{
                  fontFamily: FONT.family,
                  fontWeight: FONT.semibold,
                  fontSize: 16,
                  color: COLORS.white,
                }}
              >
                {BOARD_DATA.projectName}
              </span>
              <span
                style={{
                  fontFamily: FONT.family,
                  fontSize: 13,
                  color: COLORS.whiteAlpha40,
                }}
              >
                {BOARD_DATA.subtitle}
              </span>
            </div>
            <div
              style={{
                marginLeft: "auto",
                padding: "6px 14px",
                borderRadius: 8,
                background: COLORS.foreground100,
                fontFamily: FONT.family,
                fontSize: 12,
                color: COLORS.whiteAlpha40,
              }}
            >
              Drag between stages to advance work
            </div>
          </div>

          {/* Columns */}
          <div
            style={{
              display: "flex",
              gap: 14,
            }}
          >
            {BOARD_DATA.columns.map((col, colIndex) => (
              <MockBoardColumn
                key={col.id}
                label={col.label}
                color={col.color}
                tasks={col.tasks as unknown as TaskData[]}
                delay={6 + colIndex * 2}
                taskStartDelay={10 + colIndex * 2}
              />
            ))}
          </div>
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
