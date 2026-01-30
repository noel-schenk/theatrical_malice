import { useEffect, useRef, type FC, type Ref, type RefObject } from "react";
import { ScreenWrapper } from "./Screen.styled";
import Playingfield from "../Playingfield/Playingfield";
import createPanZoom from "panzoom";
import { isNil } from "lodash-es";

interface ScreenProps {}

const Screen: FC<ScreenProps> = () => {
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const screenElement = screenRef.current;
    if (!isNil(screenElement)) createPanZoom(screenElement);
  }, [screenRef]);

  return (
    <ScreenWrapper>
      <div ref={screenRef}>
        <Playingfield />
      </div>
    </ScreenWrapper>
  );
};

export default Screen;
