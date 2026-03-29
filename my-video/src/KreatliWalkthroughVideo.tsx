import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";

import { IntroScene } from "./scenes/IntroScene";
import { PainPointScene } from "./scenes/PainPointScene";
import { SolutionRevealScene } from "./scenes/SolutionRevealScene";
import { DashboardScene } from "./scenes/DashboardScene";
import { MediaScene } from "./scenes/MediaScene";
import { ReviewScene } from "./scenes/ReviewScene";
import { CompareScene } from "./scenes/CompareScene";
import { WalkthroughTasksBoardScene } from "./scenes/WalkthroughTasksBoardScene";
import { DeliverablesScene } from "./scenes/DeliverablesScene";
import { CollaborateScene } from "./scenes/CollaborateScene";
import { CtaScene } from "./scenes/CtaScene";

const FPS = 60;
const T = 20;

const SCENE_DURATIONS = {
  intro: 4 * FPS,
  painPoint: 5 * FPS,
  solutionReveal: 3.5 * FPS,
  dashboard: 4.5 * FPS,
  media: 4.5 * FPS,
  review: 5.5 * FPS,
  compare: 4 * FPS,
  tasksBoard: 4.5 * FPS,
  deliverables: 4.5 * FPS,
  collaborate: 5 * FPS,
  cta: 310,
} as const;

export const KreatliWalkthroughVideo: React.FC = () => {
  return (
    <TransitionSeries>
      {/* Scene 1: Logo Intro */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.intro}>
        <IntroScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: T })}
      />

      {/* Scene 2: Pain Point */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.painPoint}>
        <PainPointScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: T + 10 })}
      />

      {/* Scene 3: Solution Reveal */}
      <TransitionSeries.Sequence
        durationInFrames={SCENE_DURATIONS.solutionReveal}
      >
        <SolutionRevealScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={wipe({ direction: "from-left" })}
        timing={linearTiming({ durationInFrames: T })}
      />

      {/* Scene 4: Dashboard */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.dashboard}>
        <DashboardScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: T })}
      />

      {/* Scene 5: Media */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.media}>
        <MediaScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: T })}
      />

      {/* Scene 6: Review */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.review}>
        <ReviewScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: T })}
      />

      {/* Scene 7: Compare */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.compare}>
        <CompareScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: T })}
      />

      {/* Scene 8: Tasks Board */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.tasksBoard}>
        <WalkthroughTasksBoardScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-bottom" })}
        timing={linearTiming({ durationInFrames: T })}
      />

      {/* Scene 9: Deliverables — list & Gantt */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.deliverables}>
        <DeliverablesScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={wipe({ direction: "from-left" })}
        timing={linearTiming({ durationInFrames: T })}
      />

      {/* Scene 10: Collaborate */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.collaborate}>
        <CollaborateScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: T + 10 })}
      />

      {/* Scene 11: CTA */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.cta}>
        <CtaScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
