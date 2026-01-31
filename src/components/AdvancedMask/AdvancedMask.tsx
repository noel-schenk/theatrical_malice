import { useEffect, useState, type FC } from "react";
import { AdvancedMaskWrapper } from "./AdvancedMask.styled";
import Mask from "../Mask/Mask";
import { Vec2 } from "../../models/Vec2";
import { random } from "lodash-es";
import type { MaskDefinition } from "@/models/MaskDefinition";

interface MAdvancedMaskProps {
  id: number;
  velocityInput: Vec2;
  position: Vec2;
  maskDefinition: MaskDefinition;
}

const AdvancedMask: FC<MAdvancedMaskProps> = ({
  id,
  position,
  maskDefinition,
}) => {
  const [delayedPositionUpdate, setDelayedPositionUpdate] = useState(
    new Vec2(),
  );

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        setDelayedPositionUpdate(position);
      },
      random(0, 2000, false),
    );

    return () => clearTimeout(timeout);
  }, [position]);

  return (
    <AdvancedMaskWrapper
      style={{
        transform: `translate3d(${delayedPositionUpdate.x}px, ${delayedPositionUpdate.y}px, 0)`,
      }}
    >
      <Mask id={id} maskDefinition={maskDefinition} />
    </AdvancedMaskWrapper>
  );
};

export default AdvancedMask;
