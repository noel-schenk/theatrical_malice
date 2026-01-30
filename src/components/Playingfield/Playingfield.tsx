import type { FC } from "react";
import { PlayingfieldWrapper } from "./Playingfield.styled";
import Mask from "../Mask/Mask";

interface PlayingfieldProps {}

const Playingfield: FC<PlayingfieldProps> = () => (
  <PlayingfieldWrapper>
    <Mask />
    <Mask />
    <Mask />
  </PlayingfieldWrapper>
);

export default Playingfield;
