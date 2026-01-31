import type { MaskDefinition } from '@/models/MaskDefinition'

import { type FC, useEffect, useState } from 'react'

import { random } from 'lodash-es'

import { Vec2 } from '../../models/Vec2'
import Mask from '../Mask/Mask'
import { AdvancedMaskWrapper } from './AdvancedMask.styled'

export interface AdvancedMaskProps {
  velocityInput: Vec2
  position: Vec2
  maskDefinition: MaskDefinition
}

const AdvancedMask: FC<AdvancedMaskProps> = ({ position, maskDefinition }) => {
  const [delayedPositionUpdate, setDelayedPositionUpdate] = useState(new Vec2())

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        setDelayedPositionUpdate(position)
      },
      random(0, 2000, false)
    )

    return () => clearTimeout(timeout)
  }, [position])

  return (
    <AdvancedMaskWrapper
      style={{
        transform: `translate3d(${delayedPositionUpdate.x}px, ${delayedPositionUpdate.y}px, 0)`,
      }}
    >
      <Mask maskDefinition={maskDefinition} />
    </AdvancedMaskWrapper>
  )
}

export default AdvancedMask
