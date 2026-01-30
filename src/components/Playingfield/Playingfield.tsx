import type { FC } from "react";
import { PlayingfieldWrapper } from "./Playingfield.styled";
import AdvancedMask from "../AdvancedMask/AdvancedMask";
import { Vec2 } from "../../models/Vec2";
import { initialMaskDistribution } from "../../utils/maskDistribution";

interface PlayingfieldProps {}

const Playingfield: FC<PlayingfieldProps> = () => {
  const advancedMaskPositions = initialMaskDistribution(600);

  return (
    <PlayingfieldWrapper>
      {advancedMaskPositions.map((advancedMaskPosition, index) => (
        <AdvancedMask
          key={index}
          id={20}
          velocityInput={new Vec2(0, 0)}
          spawnPosition={
            new Vec2(advancedMaskPosition.x, advancedMaskPosition.y)
          }
        />
      ))}
    </PlayingfieldWrapper>
  );
};

export default Playingfield;
