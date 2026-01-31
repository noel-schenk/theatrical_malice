import type { PlayerType } from '@/models/PlayerType'
import { mainState } from '@/state/mainState'
import { requestFoundPlayer } from '@/utils/multiplayer'
import { playerHasBeenFound } from '@/utils/playerHasBeenFound'
import { useTrigger } from '@/utils/useTrigger'

import { type FC } from 'react'

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
  const rightPersonTrigger = useTrigger()

  const [playExploding] = useSound('/audio/exploding.mp3')
  const [playWrong] = useSound('/audio/wrong.mp3')

  return (
    <PlayerWrapper>
      <div
        onClick={() => {
          if (mainState.playerUUID === player.playerUUID)
            return toast('Silly you clicked on yourself :)')

          if (!isNil(player.playerUUID) && !playerHasBeenFound()) {
            requestFoundPlayer(player.playerUUID)
            rightPersonTrigger()
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
          rightPersonTrigger={rightPersonTrigger}
        />
      </div>
    </PlayerWrapper>
  )
}

export default Player
