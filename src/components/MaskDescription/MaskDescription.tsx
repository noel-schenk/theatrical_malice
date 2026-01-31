import type { FC } from 'react';
import { MaskDescriptionWrapper } from './MaskDescription.styled';
import type { MaskDefinition } from '@/models/MaskDefinition';
import { getDescriptionsFor } from '@/generators/maskDescription';
import { MaskFeatureType } from '@/models/MaskFeatureDefinition';

interface MaskDescriptionProps {
   maskDefinition: MaskDefinition
}

const MaskDescription: FC<MaskDescriptionProps> = (props) => {
console.log(props.maskDefinition.name)
 return <MaskDescriptionWrapper>
    <div>
      <img src={props.maskDefinition.url}></img>
      {getDescriptionsFor(MaskFeatureType.MASK)[props.maskDefinition.name]} mit
    </div>
    <ul>
      {props.maskDefinition.features.map((feature, index) => 
         <li key={index}>
            <div><img src={feature.url}></img>{getDescriptionsFor(feature.type)[feature.name]}</div>
         </li>
      )}
    </ul>
 </MaskDescriptionWrapper>
};

export default MaskDescription;
