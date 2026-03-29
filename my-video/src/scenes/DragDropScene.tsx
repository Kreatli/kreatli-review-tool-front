import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { MockBoardColumn } from "../components/MockBoardColumn";
import { MockTaskCard } from "../components/MockTaskCard";
import { GlowOrb } from "../components/GlowOrb";
import { BOARD_DATA, COLORS, FONT, GRADIENT } from "../lib/brand";
import { SPRING_SMOOTH, SPRING_SNAPPY } from "../lib/easings";
import type { TaskData } from "../components/MockTaskCard";

export const DragDropScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dragTask = BOARD_DATA.columns[1].tasks[0];

  const liftStart = fps * 0.8;
  const moveStart = fps * 1.5;
  const moveEnd = fps * 3.0;
  const dropEnd = fps * 3.5;
  const textStart = fps * 3.8;

  const liftProgress = interpolate(frame, [liftStart, liftStart + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const moveProgress = interpolate(frame, [moveStart, moveEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

  const dropProgress = interpolate(frame, [moveEnd, dropEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const isLifted = frame >= liftStart && frame < dropEnd;
  const isDragging = frame >= moveStart && frame <= moveEnd;

  const cardStartX = 0;
  const cardEndX = 390;
  const cardX = interpolate(moveProgress, [0, 1], [cardStartX, cardEndX]);
  const arcY = -Math.sin(moveProgress * Math.PI) * 50;
  const liftY = interpolate(liftProgress, [0, 1], [0, -10]);
  const dropY = interpolate(dropProgress, [0, 1], [-10, 0]);
  const cardY = isLifted ? (isDragging ? arcY : frame < moveStart ? liftY : dropY) : 0;
  const cardScale = isLifted ? 1 + liftProgress * 0.05 - dropProgress * 0.05 : 1;

  const showNewCounter = frame >= moveEnd;

  const flashOpacity = interpolate(
    frame,
    [moveEnd, moveEnd + 8, moveEnd + 25],
    [0, 0.4, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

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

  const prodTasks: TaskData[] = showNewCounter ? [] : [dragTask as unknown as TaskData];
  const reviewTasks: TaskData[] = [
    ...(BOARD_DATA.columns[2].tasks as unknown as TaskData[]),
    ...(showNewCounter ? [dragTask as unknown as TaskData] : []),
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkBg }}>
      <GlowOrb
        x="50%"
        y="50%"
        size={500}
        color1={COLORS.white}
        color2="#888888"
        opacity={0.04}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 1400,
            background: COLORS.darkCard,
            borderRadius: 20,
            border: `1px solid ${COLORS.darkBorder}`,
            boxShadow: `0 30px 100px rgba(0,0,0,0.6)`,
            padding: 28,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {/* Simplified board: show 3 relevant columns */}
          <div style={{ display: "flex", gap: 14, position: "relative" }}>
            <MockBoardColumn
              label={BOARD_DATA.columns[0].label}
              color={BOARD_DATA.columns[0].color}
              tasks={BOARD_DATA.columns[0].tasks as unknown as TaskData[]}
              delay={0}
              taskStartDelay={0}
            />
            <MockBoardColumn
              label={BOARD_DATA.columns[1].label}
              color={BOARD_DATA.columns[1].color}
              tasks={prodTasks}
              delay={0}
              taskStartDelay={0}
              counterOverride={showNewCounter ? 0 : 1}
            />

            {/* Floating dragged card */}
            {isLifted && (
              <div
                style={{
                  position: "absolute",
                  left: 360,
                  top: 60,
                  width: 220,
                  transform: `translate(${cardX}px, ${cardY}px) scale(${cardScale})`,
                  zIndex: 100,
                  pointerEvents: "none",
                }}
              >
                <MockTaskCard
                  task={dragTask as unknown as TaskData}
                  delay={0}
                  isLifted={true}
                  glowColor={COLORS.primary}
                />
              </div>
            )}

            <div style={{ position: "relative" }}>
              {/* Flash highlight */}
              <div
                style={{
                  position: "absolute",
                  inset: -4,
                  borderRadius: 16,
                  border: `2px solid ${COLORS.warning}`,
                  opacity: flashOpacity,
                  boxShadow: `0 0 30px ${COLORS.warning}40`,
                  pointerEvents: "none",
                  zIndex: 50,
                }}
              />
              <MockBoardColumn
                label={BOARD_DATA.columns[2].label}
                color={BOARD_DATA.columns[2].color}
                tasks={reviewTasks}
                delay={0}
                taskStartDelay={0}
                counterOverride={showNewCounter ? 3 : 2}
              />
            </div>

            <MockBoardColumn
              label={BOARD_DATA.columns[3].label}
              color={BOARD_DATA.columns[3].color}
              tasks={BOARD_DATA.columns[3].tasks as unknown as TaskData[]}
              delay={0}
              taskStartDelay={0}
            />
          </div>
        </div>
      </AbsoluteFill>

      {/* Text overlay */}
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
          Drag to advance.{" "}
          <span
            style={{
              background: GRADIENT.brandText,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Stage = Progress.
          </span>
        </div>
      </div>

      <AbsoluteFill
        style={{
          background: GRADIENT.darkVignette,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
