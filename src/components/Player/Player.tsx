import type { PlayerType } from '@/models/PlayerType'
import { mainState } from '@/state/mainState'
import { requestFoundPlayer } from '@/utils/multiplayer'
import { playerHasBeenFound } from '@/utils/playerHasBeenFound'
import { useTrigger } from '@/utils/useTrigger'

import { type FC, useEffect, useState } from 'react'

import { isNil } from 'lodash-es'
import { toast } from 'sonner'
import useSound from 'use-sound'

import AdvancedMask from '../AdvancedMask/AdvancedMask'
import { PlayerWrapper } from './Player.styled'

interface PlayerProps {
  player: PlayerType
}

const Player: FC<PlayerProps> = ({ player }) => {
  const wrongPersonTrigger = useTrigger()
  const flashTrigger = useTrigger()
  const [found, setFound] = useState(false)

  const [playExploding] = useSound('/audio/exploding.mp3')
  const [playWrong] = useSound('/audio/wrong.mp3')

  useEffect(() => {
    if (isNil(player.playerUUID)) return

    mainState.players = mainState.players.map(mainStatePlayer => {
      if (mainStatePlayer.playerUUID === player.playerUUID)
        mainStatePlayer.skipFlash = false
      return mainStatePlayer
    })

    console.log('removedSkipFlash again')

    if (!mainState.flashPlayers.includes(player.playerUUID)) return

    flashTrigger()

    setTimeout(() => {
      mainState.flashPlayers = mainState.flashPlayers.filter(
        playerUUID => playerUUID !== player.playerUUID
      )
    }, 2000)
  }, [mainState.flashPlayers])

  if (mainState.gameState !== 'running') return <></>

  return (
    <PlayerWrapper>
      <div
        onClick={() => {
          if (mainState.playerUUID === player.playerUUID)
            return toast('Silly you clicked on yourself :)')

          if (!isNil(player.playerUUID) && !playerHasBeenFound()) {
            requestFoundPlayer(player.playerUUID)
            setFound(true)
            playExploding()
          } else {
            wrongPersonTrigger()
            playWrong()
          }
        }}
      >
        <AdvancedMask
          {...player.advancedMaskProperty}
          wrongPersonTrigger={wrongPersonTrigger}
          found={found}
          flashTrigger={flashTrigger}
        />
      </div>
    </PlayerWrapper>
  )
}

export default Player
