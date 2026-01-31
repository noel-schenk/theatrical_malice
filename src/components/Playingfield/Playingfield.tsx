import { useEffect, type FC } from "react";
import { PlayingfieldWrapper } from "./Playingfield.styled";
import AdvancedMask from "../AdvancedMask/AdvancedMask";
import { useSnapshot } from "valtio";
import { mainState } from "@/state/mainState";
import {
  initialPlayingfieldHost,
  updatePlayingfieldHost,
} from "./PlayingfieldHost";

interface PlayingfieldProps {}

const Playingfield: FC<PlayingfieldProps> = () => {
  const mainSnap = useSnapshot(mainState, { sync: true });

  useEffect(() => {
    initialPlayingfieldHost();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      updatePlayingfieldHost();
    }, 2000);
    return () => clearInterval(interval);
  });

  return (
    <PlayingfieldWrapper>
      {mainSnap.advancedMaskProperties.map((advancedMaskProperty) => (
        <AdvancedMask
          {...advancedMaskProperty}
          maskDefinition={{ ...advancedMaskProperty.maskDefinition } as any}
        />
      ))}
    </PlayingfieldWrapper>
  );
};

export default Playingfield;
