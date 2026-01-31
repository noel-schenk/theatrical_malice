import type { MaskDefinition } from '@/models/MaskDefinition'

import { type FC, useEffect, useState } from 'react'
import { useUpdate } from 'react-use'

import { random } from 'lodash-es'

import { Vec2 } from '../../models/Vec2'
import Mask from '../Mask/Mask'
import { AdvancedMaskWrapper } from './AdvancedMask.styled'

export interface AdvancedMaskProps {
  velocityInput: Vec2
  position: Vec2
  maskDefinition: MaskDefinition
  wrongPersonTrigger?: () => void
  rightPersonTrigger?: () => void
}

const AdvancedMask: FC<AdvancedMaskProps> = ({
  position,
  maskDefinition,
  wrongPersonTrigger,
  rightPersonTrigger,
}) => {
  const [delayedPositionUpdate, setDelayedPositionUpdate] = useState(new Vec2())

  const [headshake, setHeadshake] = useState(false)
  const [dead, setDead] = useState(false)

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
    setDead(true)
    setTimeout(() => {
      setDead(false)
    }, 1000)
  }, [rightPersonTrigger])

  return (
    <AdvancedMaskWrapper
      style={{
        transform: `translate3d(${delayedPositionUpdate.x}px, ${delayedPositionUpdate.y}px, 0)`,
      }}
    >
      <div
        className={[headshake ? 'headshake' : '', dead ? 'dead' : ''].join(' ')}
      >
        <Mask maskDefinition={maskDefinition} />
      </div>
    </AdvancedMaskWrapper>
  )
}

export default AdvancedMask
