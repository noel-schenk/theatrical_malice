import { type FC } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

import Playingfield from '../Playingfield/Playingfield'
import { ScreenWrapper } from './Screen.styled'

interface ScreenProps {}

const Screen: FC<ScreenProps> = () => {
  return (
    <ScreenWrapper>
      <TransformWrapper
        centerOnInit
        limitToBounds
        minScale={0.2}
        maxScale={0.6}
        smooth={false}
        velocityAnimation={{ disabled: true }}
        zoomAnimation={{ disabled: true }}
      >
        <TransformComponent
          wrapperStyle={{ width: '100dvw', height: '100dvh' }}
        >
          <Playingfield />
        </TransformComponent>
      </TransformWrapper>
    </ScreenWrapper>
  )
}

export default Screen
