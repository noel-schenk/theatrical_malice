import { Vec2 } from "@/models/Vec2";
import { mainState } from "@/state/mainState";
import { initialMaskDistribution } from "@/utils/maskDistribution";
import { defaultMaskMovement } from "@/utils/maskMovement";
import { sync } from "@/utils/multiplayer";
import { chunk } from "lodash-es";

export const initialPlayingfieldHost = () => {
  console.log("initialPlayingfieldHost");
  const advancedMaskPositions = initialMaskDistribution(600);
  const advancedMaskProperties = advancedMaskPositions.map(
    (advancedMaskPosition, index) => ({
      key: index,
      id: 20,
      velocityInput: new Vec2(0, 0),
      position: new Vec2(advancedMaskPosition.x, advancedMaskPosition.y),
    }),
  );

  console.log(advancedMaskProperties, "advancedMaskProperties");
  mainState.advancedMaskProperties = advancedMaskProperties;
};

export const updatePlayingfieldHost = () => {
  if (!mainState.isHost) return;

  mainState.advancedMaskProperties.forEach((advancedMaskProperty, index) => {
    const defaultMovement = defaultMaskMovement(advancedMaskProperty.position);
    mainState.advancedMaskProperties[index].position = defaultMovement;
  });

  sync();
};
