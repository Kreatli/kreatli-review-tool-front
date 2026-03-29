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

interface BoardTask {
  id: string;
  title: string;
  responsible: string;
  initial: string;
  hue: number;
  hasMedia: boolean;
  contributors: number;
}

const COLUMNS: { id: string; label: string; color: string; tasks: BoardTask[] }[] = [
  {
    id: "briefing",
    label: "Briefing",
    color: STAGE_COLORS.briefing,
    tasks: [
      { id: "t1", title: "Write campaign brief", responsible: "Alex", initial: "A", hue: 200, hasMedia: true, contributors: 2 },
      { id: "t2", title: "Collect brand assets", responsible: "Sam", initial: "S", hue: 120, hasMedia: true, contributors: 1 },
    ],
  },
  {
    id: "production",
    label: "Production",
    color: STAGE_COLORS.production,
    tasks: [
      { id: "t3", title: "Edit hero video v3", responsible: "Jordan", initial: "J", hue: 280, hasMedia: true, contributors: 3 },
    ],
  },
  {
    id: "review",
    label: "Client Review",
    color: STAGE_COLORS.review,
    tasks: [
      { id: "t4", title: "Final cut sign-off", responsible: "Taylor", initial: "T", hue: 340, hasMedia: false, contributors: 1 },
      { id: "t5", title: "Social media cutdowns", responsible: "Casey", initial: "C", hue: 40, hasMedia: true, contributors: 2 },
    ],
  },
  {
    id: "delivered",
    label: "Delivered",
    color: STAGE_COLORS.delivered,
    tasks: [
      { id: "t6", title: "Teaser trailer v2", responsible: "Morgan", initial: "M", hue: 160, hasMedia: true, contributors: 2 },
    ],
  },
];

const TaskCard: React.FC<{
  task: BoardTask;
  delay: number;
  isLifted?: boolean;
  glowColor?: string;
}> = ({ task, delay, isLifted = false, glowColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrance = spring({ frame, fps, config: SPRING_SNAPPY, delay });
  const y = interpolate(entrance, [0, 1], [20, 0]);
  const opacity = interpolate(entrance, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        padding: "10px 12px",
        borderRadius: 10,
        background: isLifted ? COLORS.darkSurface : COLORS.foreground50,
        border: `1px solid ${isLifted ? (glowColor || COLORS.primary) + "50" : COLORS.darkBorder}`,
        boxShadow: isLifted ? `0 12px 40px rgba(0,0,0,0.5), 0 0 20px ${glowColor || COLORS.primary}30` : "0 1px 2px rgba(0,0,0,0.2)",
        transform: `translateY(${y}px) ${isLifted ? "scale(1.03)" : ""}`,
        opacity,
        fontFamily: FONT.family,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div style={{ fontSize: 13, fontWeight: FONT.medium, color: COLORS.white, lineHeight: 1.4 }}>
        {task.title}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 20, height: 20, borderRadius: "50%", background: `hsl(${task.hue}, 50%, 45%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: FONT.bold, color: COLORS.white }}>
            {task.initial}
          </div>
          <span style={{ fontSize: 11, color: COLORS.whiteAlpha40 }}>{task.responsible}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {task.hasMedia && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="3" width="20" height="18" rx="3" stroke={COLORS.whiteAlpha40} strokeWidth="2" />
              <circle cx="8" cy="9" r="2" fill={COLORS.whiteAlpha40} />
            </svg>
          )}
          {task.contributors > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 10, color: COLORS.whiteAlpha40 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <circle cx="9" cy="7" r="3" stroke={COLORS.whiteAlpha40} strokeWidth="2" />
                <path d="M2 21v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1" stroke={COLORS.whiteAlpha40} strokeWidth="2" />
                <circle cx="17" cy="7" r="2" stroke={COLORS.whiteAlpha40} strokeWidth="2" />
                <path d="M22 21v-1a3 3 0 0 0-2-2.83" stroke={COLORS.whiteAlpha40} strokeWidth="2" />
              </svg>
              {task.contributors}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const WalkthroughTasksBoardScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const topTextEntrance = spring({ frame, fps, config: SPRING_SMOOTH, delay: 3 });

  const dragStart = fps * 1.8;
  const dragMid = fps * 2.5;
  const dragEnd = fps * 3.2;
  const isDragging = frame >= dragStart && frame < dragEnd;

  const dragProgress = interpolate(frame, [dragStart, dragMid, dragEnd], [0, 0.5, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const liftScale = interpolate(frame, [dragStart, dragStart + 8, dragEnd - 8, dragEnd], [1, 1.04, 1.04, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const currentX = interpolate(dragProgress, [0, 1], [0, 260]);
  const currentY = interpolate(dragProgress, [0, 0.5, 1], [0, -50, -15]);

  const showInProduction = frame < dragStart;
  const showInReview = frame >= dragEnd;

  return (
    <FeatureSceneLayout
      headlineOpacity={topTextEntrance}
      headlineTransform={`translateY(${interpolate(topTextEntrance, [0, 1], [-12, 0])}px)`}
      motionAccent="green"
      motionDelay={8}
      orb={
        <GlowOrb
          x="50%"
          y="46%"
          size={520}
          color1={COLORS.success}
          color2={STAGE_COLORS.production}
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
          Board-driven tasks.{" "}
          <span
            style={{
              fontWeight: FONT.bold,
              background: GRADIENT.brandText,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Stage = Progress.
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
            boxShadow: `0 24px 90px rgba(0,0,0,0.55), 0 0 48px ${STAGE_COLORS.briefing}12`,
          }}
        >
          {/* Board header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderBottom: `1px solid ${COLORS.darkBorder}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: COLORS.foreground100, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="7" height="7" rx="1" stroke={COLORS.whiteAlpha60} strokeWidth="2" />
                  <rect x="14" y="3" width="7" height="7" rx="1" stroke={COLORS.whiteAlpha60} strokeWidth="2" />
                  <rect x="3" y="14" width="7" height="7" rx="1" stroke={COLORS.whiteAlpha60} strokeWidth="2" />
                  <rect x="14" y="14" width="7" height="7" rx="1" stroke={COLORS.whiteAlpha60} strokeWidth="2" />
                </svg>
              </div>
              <div>
                <span style={{ fontFamily: FONT.family, fontWeight: FONT.semibold, fontSize: 14, color: COLORS.white }}>Spring Campaign</span>
                <span style={{ fontFamily: FONT.family, fontSize: 12, color: COLORS.whiteAlpha40, marginLeft: 8 }}>Tasks board &middot; 4 stages</span>
              </div>
            </div>
            <div style={{ padding: "4px 12px", borderRadius: 8, background: COLORS.foreground100, fontFamily: FONT.family, fontSize: 12, color: COLORS.whiteAlpha40 }}>
              Drag between stages to advance work
            </div>
          </div>

          {/* Columns */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, padding: 14, position: "relative" }}>
            {COLUMNS.map((col, colIdx) => {
              const colEntrance = spring({ frame, fps, config: SPRING_SNAPPY, delay: 12 + colIdx * 4 });
              let tasks = col.tasks;
              let count = col.tasks.length;

              if (col.id === "production") {
                tasks = showInProduction ? col.tasks : [];
                count = showInReview ? 0 : 1;
              }
              if (col.id === "review" && showInReview) {
                tasks = [COLUMNS[1].tasks[0], ...col.tasks];
                count = 3;
              }

              return (
                <div
                  key={col.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    opacity: interpolate(colEntrance, [0, 0.3], [0, 1], { extrapolateRight: "clamp" }),
                    transform: `translateY(${interpolate(colEntrance, [0, 1], [30, 0])}px)`,
                  }}
                >
                  {/* Column header */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 12px", borderRadius: 8, background: COLORS.foreground50 }}>
                    <span style={{ fontFamily: FONT.family, fontSize: 11, fontWeight: FONT.semibold, color: COLORS.whiteAlpha40, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      {col.label}
                    </span>
                    <span style={{ width: 20, height: 20, borderRadius: "50%", background: `${COLORS.foreground200}90`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT.family, fontSize: 10, fontWeight: FONT.bold, color: COLORS.whiteAlpha60 }}>
                      {count}
                    </span>
                  </div>
                  {/* Tasks */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {tasks.map((task, tIdx) => (
                      <TaskCard key={task.id} task={task} delay={20 + colIdx * 6 + tIdx * 5} />
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Dragging card overlay */}
            {isDragging && (
              <div
                style={{
                  position: "absolute",
                  left: `calc(25% + 14px + ${currentX}px)`,
                  top: `calc(60px + ${currentY}px)`,
                  zIndex: 20,
                  transform: `scale(${liftScale})`,
                  pointerEvents: "none",
                  width: 230,
                }}
              >
                <TaskCard
                  task={COLUMNS[1].tasks[0]}
                  delay={0}
                  isLifted
                  glowColor={STAGE_COLORS.review}
                />
              </div>
            )}
          </div>
        </div>
    </FeatureSceneLayout>
  );
};
