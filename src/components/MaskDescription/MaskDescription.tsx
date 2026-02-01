import type { FC } from 'react';
import { MaskDescriptionWrapper } from './MaskDescription.styled';
import type { MaskDefinition } from '@/models/MaskDefinition';
import { getDescriptionsFor } from '@/generators/maskDescription';
import { MaskFeatureType } from '@/models/MaskFeatureDefinition';

interface MaskDescriptionProps {
   maskDefinition: MaskDefinition
}

const resolvePosition = (position?: 'left' | 'right') => {
   if (position === 'left') {
      return 'links';
   } else if (position === 'right') {
      return ' rechts ';
   } else {
      return '';
   }
}

const MaskDescription: FC<MaskDescriptionProps> = (props) => {
 return <MaskDescriptionWrapper>
    <div>
      <img src={props.maskDefinition.url}></img>
      {getDescriptionsFor(MaskFeatureType.MASK)[props.maskDefinition.name]} mit
    </div>
    <ul>
      {props.maskDefinition.features.map((feature, index) => 
         <li key={index}>
            <div><img className={feature.position === 'right' ? 'flipped' : ''} src={feature.url}></img><span>{getDescriptionsFor(feature.type)[feature.name]} <span className="position">{resolvePosition(feature.position)}</span></span></div>
         </li>
      )}
    </ul>
 </MaskDescriptionWrapper>
};

export default MaskDescription;
