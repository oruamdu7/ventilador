import { Composition } from "remotion";
import { MainSequence } from "./MainSequence";
import { DURATION } from "./utils/timing";

export const RemotionRoot: React.FC = () => {
  return <Composition id="Ventilador" component={MainSequence} durationInFrames={DURATION} fps={30} width={1080} height={1920} />;
};