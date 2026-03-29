import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";

import { IntroScene } from "./scenes/IntroScene";
import { ProblemScene } from "./scenes/ProblemScene";
import { RevealScene } from "./scenes/RevealScene";
import { BoardOverviewScene } from "./scenes/BoardOverviewScene";
import { DragDropScene } from "./scenes/DragDropScene";
import { TaskDetailScene } from "./scenes/TaskDetailScene";
import { FeaturesShowcaseScene } from "./scenes/FeaturesShowcaseScene";
import { CtaScene } from "./scenes/CtaScene";

const FPS = 60;
const TRANSITION_FRAMES = 20;

// Total transition overlap: 20+30+20+20+20+20+30 = 160 frames
// Scene sum must be 3600 + 160 = 3760 to yield exactly 60s
const SCENE_DURATIONS = {
  intro: 4 * FPS,         // 240
  problem: 6 * FPS,       // 360
  reveal: 4 * FPS,        // 240
  boardOverview: 3 * FPS, // 180
  dragDrop: 330,          // 5.5s (scene 5 ends at 20s mark)
  taskDetail: 3 * FPS,    // 180
  features: 12 * FPS,     // 720
  cta: 310,               // ~5.2s (video ends at 40s mark)
} as const;

export const TasksBoardsLaunchVideo: React.FC = () => {
  return (
    <TransitionSeries>
      {/* Scene 1: Logo Intro */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.intro}>
        <IntroScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />

      {/* Scene 2: The Problem */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.problem}>
        <ProblemScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES + 10 })}
      />

      {/* Scene 3: The Reveal */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.reveal}>
        <RevealScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={wipe({ direction: "from-left" })}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />

      {/* Scene 4: Board Overview */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.boardOverview}>
        <BoardOverviewScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />

      {/* Scene 5: Drag & Drop */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.dragDrop}>
        <DragDropScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />

      {/* Scene 6: Task Detail */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.taskDetail}>
        <TaskDetailScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-bottom" })}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />

      {/* Scene 7: Features Showcase */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.features}>
        <FeaturesShowcaseScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES + 10 })}
      />

      {/* Scene 8: CTA */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.cta}>
        <CtaScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
