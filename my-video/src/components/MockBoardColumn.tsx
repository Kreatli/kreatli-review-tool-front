import React from "react";
import { spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS, FONT } from "../lib/brand";
import { SPRING_SNAPPY } from "../lib/easings";
import { MockTaskCard, type TaskData } from "./MockTaskCard";

export const MockBoardColumn: React.FC<{
  label: string;
  color: string;
  tasks: readonly TaskData[];
  delay?: number;
  taskStartDelay?: number;
  counterOverride?: number;
}> = ({ label, color, tasks, delay = 0, taskStartDelay, counterOverride }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: SPRING_SNAPPY,
    delay,
  });

  const y = interpolate(entrance, [0, 1], [80, 0]);
  const opacity = interpolate(entrance, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  const taskDelay = taskStartDelay ?? delay + 12;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minWidth: 220,
        flex: 1,
        background: COLORS.foreground100,
        borderRadius: 12,
        overflow: "hidden",
        transform: `translateY(${y}px)`,
        opacity,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 14px",
          borderBottom: `1px solid ${COLORS.darkBorder}`,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: color,
            boxShadow: `0 0 8px ${color}80`,
          }}
        />
        <span
          style={{
            fontSize: 13,
            fontWeight: FONT.semibold,
            color: COLORS.whiteAlpha60,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            fontFamily: FONT.family,
          }}
        >
          {label}
        </span>
        <div
          style={{
            marginLeft: "auto",
            background: COLORS.foreground200,
            borderRadius: 10,
            padding: "1px 8px",
            fontSize: 12,
            fontWeight: FONT.bold,
            color: COLORS.whiteAlpha60,
            fontFamily: FONT.family,
          }}
        >
          {counterOverride ?? tasks.length}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          padding: 10,
        }}
      >
        {tasks.map((task, i) => (
          <MockTaskCard
            key={task.id}
            task={task as TaskData}
            delay={taskDelay + i * 6}
          />
        ))}
      </div>
    </div>
  );
};
