import "./index.css";
import { Composition } from "remotion";
import { TasksBoardsLaunchVideo } from "./TasksBoardsLaunchVideo";
import { KreatliWalkthroughVideo } from "./KreatliWalkthroughVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TasksBoardsLaunch"
        component={TasksBoardsLaunchVideo}
        durationInFrames={2400}
        fps={60}
        width={1920}
        height={1080}
      />
      <Composition
        id="KreatliWalkthrough"
        component={KreatliWalkthroughVideo}
        durationInFrames={3230}
        fps={60}
        width={1920}
        height={1080}
      />
    </>
  );
};
