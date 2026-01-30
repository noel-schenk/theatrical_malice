import type { FC } from "react";
import { ScreenWrapper } from "./Screen.styled";
import Playingfield from "../Playingfield/Playingfield";

interface ScreenProps {}

const Screen: FC<ScreenProps> = () => (
  <ScreenWrapper>
    <Playingfield />
  </ScreenWrapper>
);

export default Screen;
