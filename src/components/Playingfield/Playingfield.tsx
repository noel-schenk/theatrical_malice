import { mainState } from '@/state/mainState'

import { type FC, useEffect } from 'react'

import { useSnapshot } from 'valtio'

import AdvancedMask from '../AdvancedMask/AdvancedMask'
import { PlayingfieldWrapper } from './Playingfield.styled'
import { updatePlayingfieldHost } from './PlayingfieldHost'

interface PlayingfieldProps {}

const Playingfield: FC<PlayingfieldProps> = () => {
  const mainSnap = useSnapshot(mainState, { sync: true })

  useEffect(() => {
    const interval = setInterval(() => {
      updatePlayingfieldHost()
    }, 2000)
    return () => clearInterval(interval)
  })

  return (
    <PlayingfieldWrapper>
      {mainSnap.players.map(player => (
        <AdvancedMask
          {...player.advancedMaskProperty}
          maskDefinition={
            { ...player.advancedMaskProperty.maskDefinition } as any
          }
          key={player.maskUUID}
        />
      ))}
    </PlayingfieldWrapper>
  )
}

export default Playingfield
