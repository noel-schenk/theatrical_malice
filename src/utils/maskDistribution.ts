import PoissonDiskSampling from "poisson-disk-sampling";
import {
  PLAYINGFIELD_HEIGHT_WITHOUT_MASK,
  PLAYINGFIELD_WIDTH_WITHOUT_MASK,
} from "../components/consts";
import { sampleSize } from "lodash-es";
import { Vec2 } from "../models/Vec2";

export const initialMaskDistribution = (amount: number) => {
  const poissonDisk = new PoissonDiskSampling({
    shape: [PLAYINGFIELD_WIDTH_WITHOUT_MASK, PLAYINGFIELD_HEIGHT_WITHOUT_MASK],
    minDistance: 20,
    maxDistance: 30,
    tries: 10,
  });
  const points = poissonDisk.fill();
  const maskPositions = sampleSize(points, amount).map(
    (x) => new Vec2(x[0], x[1]),
  );

  console.log(maskPositions, "maskPositions");
  return maskPositions;
};
