import { type FC } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

import Playingfield from '../Playingfield/Playingfield'
import { ScreenWrapper } from './Screen.styled'

interface ScreenProps {}

const Screen: FC<ScreenProps> = () => {
  return (
    <ScreenWrapper>
      <TransformWrapper centerOnInit limitToBounds minScale={0.3}>
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
