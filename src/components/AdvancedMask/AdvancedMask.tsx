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
  wrongPersonTrigger?: () => void
  found?: boolean
  flashTrigger?: () => void
}

const AdvancedMask: FC<AdvancedMaskProps> = ({
  position,
  maskDefinition,
  wrongPersonTrigger,
  found,
  flashTrigger,
}) => {
  const [delayedPositionUpdate, setDelayedPositionUpdate] = useState(new Vec2())

  const [headshake, setHeadshake] = useState(false)

  const [flash, setFlash] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        setDelayedPositionUpdate(position)
      },
      random(0, 2000, false)
    )

    return () => clearTimeout(timeout)
  }, [position])

  useEffect(() => {
    setHeadshake(true)
    setTimeout(() => {
      setHeadshake(false)
    }, 1000)
  }, [wrongPersonTrigger])

  useEffect(() => {
    setFlash(true)
    setTimeout(() => {
      setFlash(false)
    }, 2000)
  }, [flashTrigger])

  return (
    <AdvancedMaskWrapper
      style={{
        transform: `translate3d(${delayedPositionUpdate.x}px, ${delayedPositionUpdate.y}px, 0)`,
      }}
    >
      <div
        className={[
          flash ? 'animate-pulsate' : '',
          'found-transition',
          headshake ? 'headshake' : '',
          found ? 'found' : '',
        ].join(' ')}
      >
        <Mask maskDefinition={maskDefinition} />
      </div>
    </AdvancedMaskWrapper>
  )
}

export default AdvancedMask
