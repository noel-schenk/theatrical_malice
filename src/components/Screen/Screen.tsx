import { type FC, useEffect, useRef } from 'react'

import { isNil } from 'lodash-es'
import createPanZoom, { type PanZoom } from 'panzoom'

import Playingfield from '../Playingfield/Playingfield'
import { ScreenWrapper } from './Screen.styled'

interface ScreenProps {}

export const screenInstance = {
  panzoom: null as PanZoom | null,
}

const Screen: FC<ScreenProps> = () => {
  const screenRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const screenElement = screenRef.current
    if (!isNil(screenElement))
      screenInstance.panzoom = createPanZoom(screenElement)
  }, [screenRef])

  return (
    <ScreenWrapper>
      <div ref={screenRef}>
        <Playingfield />
      </div>
    </ScreenWrapper>
  )
}

export default Screen
