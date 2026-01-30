import { useEffect } from "react";
import { mainState } from "../state/mainState";
import { subscribeKey } from "valtio/utils";
import { random } from "lodash-es";

interface TickProps {
  every: number;
  random: boolean;
}

setInterval(() => {
  mainState.tick++;
}, 100);

export const useTick = (
  cb: () => void,
  tickProps: TickProps = { every: 0, random: false },
) => {
  useEffect(() => {
    let every = 0;

    const unsubscribe = subscribeKey(mainState, "tick", () => {
      every++;
      if (every < tickProps.every) return;
      every = 0;
      tickProps.random ? setTimeout(cb, random(100, 200, false)) : cb();
    });

    return unsubscribe;
  }, [cb, tickProps.every]);
};
