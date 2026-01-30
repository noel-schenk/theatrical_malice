import { useEffect, useState, type FC } from "react";
import { AdvancedMaskWrapper } from "./AdvancedMask.styled";
import Mask from "../Mask/Mask";
import { defaultMaskMovement } from "../../utils/maskMovement";
import type { Vec2 } from "../../models/Vec2";
import { useTick } from "../../utils/tick";

interface MAdvancedMaskProps {
  id: number;
  velocityInput: Vec2;
  spawnPosition: Vec2;
}

const AdvancedMask: FC<MAdvancedMaskProps> = ({ id, spawnPosition }) => {
  const [maskPosition, setMaskPosition] = useState(spawnPosition);

  useTick(
    () => {
      const defaultMovement = defaultMaskMovement(maskPosition);
      setMaskPosition(defaultMovement);
    },
    { every: 20, random: true },
  );

  return (
    <AdvancedMaskWrapper
      style={{
        transform: `translate3d(${maskPosition.x}px, ${maskPosition.y}px, 0)`,
      }}
    >
      <Mask id={id} />
    </AdvancedMaskWrapper>
  );
};

export default AdvancedMask;
