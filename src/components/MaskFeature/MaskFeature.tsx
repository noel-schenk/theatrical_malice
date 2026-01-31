import type { FC } from 'react';
import { MaskFeatureWrapper } from './MaskFeature.styled';
import type { MaskFeatureDefinition } from '../../models/MaskFeatureDefinition';

interface MaskFeatureProps {
   feature: MaskFeatureDefinition
}

const MaskFeature: FC<MaskFeatureProps> = (props) => (
 <MaskFeatureWrapper>
   <img src={props.feature.url} style={{ transform: props.feature.position === 'right' ? 'scaleX(-1)' : 'none' }} alt=""></img>
 </MaskFeatureWrapper>
);

export default MaskFeature;
