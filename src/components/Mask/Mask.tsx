import type { FC } from "react";
import { MaskWrapper } from "./Mask.styled";
import type { MaskDefinition } from "../../models/MaskDefinition";
import MaskFeature from "../MaskFeature/MaskFeature";
import Face from '../../assets/face/Face.png';

interface MaskProps {
  maskDefinition: MaskDefinition;
}

const Mask: FC<MaskProps> = (props) => (
  <MaskWrapper>
    <img src={Face} alt=""></img>
    <img src={props.maskDefinition.url} alt=""></img>
    {props.maskDefinition.features.map((feature) => (
      <MaskFeature feature={feature}></MaskFeature>
    ))}
  </MaskWrapper>
);

export default Mask;
