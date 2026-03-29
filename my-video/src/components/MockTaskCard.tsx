import React from "react";
import { spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS, FONT } from "../lib/brand";
import { SPRING_SNAPPY } from "../lib/easings";

export type TaskData = {
  id: string;
  title: string;
  owner: string;
  avatarSeed: string;
  commentCount: number;
  hasMedia: boolean;
};

export const MockTaskCard: React.FC<{
  task: TaskData;
  delay?: number;
  isLifted?: boolean;
  glowColor?: string;
  style?: React.CSSProperties;
}> = ({ task, delay = 0, isLifted = false, glowColor, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: SPRING_SNAPPY,
    delay,
  });

  const y = interpolate(entrance, [0, 1], [30, 0]);
  const opacity = interpolate(entrance, [0, 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });

  const initials = task.owner.charAt(0).toUpperCase();
  const hue = task.avatarSeed.charCodeAt(0) * 37 % 360;

  return (
    <div
      style={{
        background: isLifted ? COLORS.darkSurface : COLORS.foreground50,
        borderRadius: 10,
        padding: "12px 14px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        boxShadow: isLifted
          ? `0 12px 40px rgba(0,0,0,0.5), 0 0 30px ${glowColor || COLORS.primary}40`
          : "0 1px 3px rgba(0,0,0,0.3)",
        border: `1px solid ${isLifted ? (glowColor || COLORS.primary) + "50" : COLORS.darkBorder}`,
        transform: `translateY(${y}px) ${isLifted ? "scale(1.03)" : ""}`,
        opacity,
        fontFamily: FONT.family,
        ...style,
      }}
    >
      <div
        style={{
          fontSize: 14,
          fontWeight: FONT.semibold,
          color: COLORS.white,
          lineHeight: 1.4,
        }}
      >
        {task.title}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: `hsl(${hue}, 50%, 45%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: FONT.bold,
              color: COLORS.white,
            }}
          >
            {initials}
          </div>
          <span style={{ fontSize: 12, color: COLORS.whiteAlpha60 }}>
            {task.owner}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {task.hasMedia && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect
                x="2"
                y="3"
                width="20"
                height="18"
                rx="3"
                stroke={COLORS.whiteAlpha40}
                strokeWidth="2"
              />
              <circle cx="8" cy="9" r="2" fill={COLORS.whiteAlpha40} />
              <path
                d="M2 17l5-5 3 3 4-4 8 8v1a3 3 0 01-3 3H5a3 3 0 01-3-3v-3z"
                fill={COLORS.whiteAlpha20}
              />
            </svg>
          )}
          {task.commentCount > 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                fontSize: 11,
                color: COLORS.whiteAlpha40,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"
                  stroke={COLORS.whiteAlpha40}
                  strokeWidth="2"
                />
              </svg>
              {task.commentCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
