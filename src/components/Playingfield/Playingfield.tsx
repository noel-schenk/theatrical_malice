import type { PlayerType } from '@/models/Player'
import { mainState } from '@/state/mainState'

import { type FC, useEffect } from 'react'

import { useSnapshot } from 'valtio'

import Player from '../Player/Player'
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
        <Player player={player as PlayerType} key={player.maskUUID} />
      ))}
    </PlayingfieldWrapper>
  )
}

export default Playingfield
