import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, GRADIENT } from "../lib/brand";
import {
  FeatureMotionShell,
  type FeatureMotionAccent,
} from "./FeatureMotionShell";

export type { FeatureMotionAccent };

/** Vertical gap between headline and feature mock — reads as “title just above” the UI */
const HEADLINE_TO_FEATURE_GAP = 28;

export const FeatureSceneLayout: React.FC<{
  headline: React.ReactNode;
  headlineOpacity: number;
  headlineTransform: string;
  orb?: React.ReactNode;
  contentScale?: number;
  motionAccent?: FeatureMotionAccent;
  motionDelay?: number;
  children: React.ReactNode;
}> = ({
  headline,
  headlineOpacity,
  headlineTransform,
  orb,
  contentScale = 1,
  motionAccent = "blue",
  motionDelay = 10,
  children,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.darkBg,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <AbsoluteFill style={{ background: GRADIENT.darkVignette, zIndex: 0 }} />
      {orb ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          {orb}
        </div>
      ) : null}

      {/* One centered block: headline sits slightly above the feature mock */}
      <div
        style={{
          position: "relative",
          zIndex: 20,
          flex: 1,
          minHeight: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: 56,
          paddingRight: 56,
          paddingTop: 40,
          paddingBottom: 44,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: HEADLINE_TO_FEATURE_GAP,
            width: "100%",
            maxWidth: 1180,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 1020,
              display: "flex",
              justifyContent: "center",
              opacity: headlineOpacity,
              transform: headlineTransform,
            }}
          >
            {headline}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <FeatureMotionShell
              delay={motionDelay}
              accent={motionAccent}
              extraScale={contentScale}
            >
              {children}
            </FeatureMotionShell>
          </div>
        </div>
      </div>

      <AbsoluteFill
        style={{
          background: GRADIENT.darkVignette,
          pointerEvents: "none",
          zIndex: 12,
        }}
      />
    </AbsoluteFill>
  );
};
