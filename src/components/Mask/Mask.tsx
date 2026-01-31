import type { FC } from 'react';
import { MaskWrapper } from './Mask.styled';
import type { MaskDefinition } from '../../models/MaskDefinition';
import MaskFeature from '../MaskFeature/MaskFeature';

interface MaskProps {
   id: number,
   maskDefinition: MaskDefinition
}

const Mask: FC<MaskProps> = (props) => (
 <MaskWrapper>
   <img src={props.maskDefinition.url} alt=""></img>
   {props.maskDefinition.features.map((feature) => <MaskFeature feature={feature}></MaskFeature>)}
 </MaskWrapper>
);

export default Mask;
