import { random, sample } from "lodash-es";
import { Vec2 } from "../models/Vec2";
import {
  MASK_HEIGHT,
  MASK_WIDTH,
  PLAYINGFIELD_HEIGHT,
  PLAYINGFIELD_HEIGHT_WITHOUT_MASK,
  PLAYINGFIELD_WIDTH,
  PLAYINGFIELD_WIDTH_WITHOUT_MASK,
} from "../components/consts";

export const DEFAULT_MASK_MOVEMENT_DISTANCE = 200;

export const defaultMaskMovement = (position: Vec2): Vec2 => {
  const change = [sample([true, false]), sample([true, false])];

  const newPosition = new Vec2(
    change[0]
      ? position.x - DEFAULT_MASK_MOVEMENT_DISTANCE
      : position.x + DEFAULT_MASK_MOVEMENT_DISTANCE,
    change[1]
      ? position.y - DEFAULT_MASK_MOVEMENT_DISTANCE
      : position.y + DEFAULT_MASK_MOVEMENT_DISTANCE,
  );

  if (newPosition.x <= 0)
    newPosition.x = random(0, PLAYINGFIELD_HEIGHT_WITHOUT_MASK / 2, false);

  if (newPosition.x >= PLAYINGFIELD_HEIGHT_WITHOUT_MASK)
    newPosition.x = random(
      PLAYINGFIELD_HEIGHT_WITHOUT_MASK / 2,
      PLAYINGFIELD_HEIGHT_WITHOUT_MASK,
      false,
    );

  if (newPosition.y <= 0)
    newPosition.y = random(0, PLAYINGFIELD_WIDTH_WITHOUT_MASK / 2, false);

  if (newPosition.y >= PLAYINGFIELD_WIDTH_WITHOUT_MASK)
    newPosition.y = random(
      PLAYINGFIELD_WIDTH_WITHOUT_MASK / 2,
      PLAYINGFIELD_WIDTH_WITHOUT_MASK,
      false,
    );

  return newPosition;
};
