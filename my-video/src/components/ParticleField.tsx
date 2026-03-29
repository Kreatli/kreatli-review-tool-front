import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
  phase: number;
}

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export const ParticleField: React.FC<{
  count?: number;
  direction?: "up" | "down";
  fadeIn?: boolean;
  seed?: number;
}> = ({ count = 40, direction = "up", fadeIn = true, seed = 42 }) => {
  const frame = useCurrentFrame();

  const particles = useMemo<Particle[]>(() => {
    const rand = seededRandom(seed);
    const colors = [
      "#FFFFFF",
      "#CCCCCC",
      "#999999",
      "#DDDDDD",
    ];
    return Array.from({ length: count }, () => ({
      x: rand() * 100,
      y: rand() * 100,
      size: 1 + rand() * 3,
      speed: 0.1 + rand() * 0.3,
      opacity: 0.15 + rand() * 0.4,
      color: colors[Math.floor(rand() * colors.length)],
      phase: rand() * Math.PI * 2,
    }));
  }, [count, seed]);

  const globalOpacity = fadeIn
    ? interpolate(frame, [0, 30], [0, 1], {
        extrapolateRight: "clamp",
      })
    : 1;

  return (
    <AbsoluteFill style={{ opacity: globalOpacity, overflow: "hidden" }}>
      {particles.map((p, i) => {
        const dy = direction === "up" ? -p.speed * frame : p.speed * frame;
        const yPos = ((p.y + dy) % 120) - 10;
        const xWobble = Math.sin(frame * 0.02 + p.phase) * 8;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${p.x + xWobble * 0.1}%`,
              top: `${yPos}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: p.color,
              opacity: p.opacity,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
