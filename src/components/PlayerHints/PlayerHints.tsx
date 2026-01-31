import type { MaskDefinition } from '@/models/MaskDefinition'
import { mainState } from '@/state/mainState'

import type { FC } from 'react'

import { cloneDeep, isNil } from 'lodash-es'
import { useSnapshot } from 'valtio'

import Mask from '../Mask/Mask'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { PlayerHintsWrapper } from './PlayerHints.styled'

interface PlayerHintsProps {}

const PlayerHints: FC<PlayerHintsProps> = () => {
  const mainSnap = useSnapshot(mainState)

  return (
    <PlayerHintsWrapper>
      {mainSnap.players
        .filter(player => !isNil(player.playerUUID) && player.found === false)
        .map((player, index) => (
          <Avatar key={index}>
            <AvatarFallback>
              <div style={{ transform: 'scale(0.2)' }}>
                <Mask
                  maskDefinition={
                    cloneDeep(
                      player.advancedMaskProperty.maskDefinition
                    ) as MaskDefinition
                  }
                />
              </div>
            </AvatarFallback>
          </Avatar>
        ))}
    </PlayerHintsWrapper>
  )
}

export default PlayerHints
