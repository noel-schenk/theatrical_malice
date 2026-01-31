import type { MaskDefinition } from '@/models/MaskDefinition'
import { mainState } from '@/state/mainState'

import { type FC, useState } from 'react'

import { cloneDeep, isNil } from 'lodash-es'
import { useSnapshot } from 'valtio'

import Mask from '../Mask/Mask'
import MaskDescription from '../MaskDescription/MaskDescription'
import { Avatar, AvatarFallback } from '../ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { PlayerHintsWrapper } from './PlayerHints.styled'

interface PlayerHintsProps {}

const PlayerHints: FC<PlayerHintsProps> = () => {
  const mainSnap = useSnapshot(mainState)

  const [selectedPlayerHint, setSelectedPlayerHint] = useState<MaskDefinition>()

  return (
    <PlayerHintsWrapper>
      {mainSnap.players
        .filter(player => !isNil(player.playerUUID) && player.found === false)
        .map((player, index) => (
          <Avatar
            key={index}
            onClick={() => {
              setSelectedPlayerHint(
                cloneDeep(
                  player.advancedMaskProperty.maskDefinition
                ) as MaskDefinition
              )
            }}
          >
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
      <Dialog
        open={!isNil(selectedPlayerHint)}
        onOpenChange={open => {
          if (!open) setSelectedPlayerHint(undefined)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>You want a hint? We got you!</DialogTitle>
            <DialogDescription className="p-4 py-8">
              {!isNil(selectedPlayerHint) && (
                <MaskDescription maskDefinition={selectedPlayerHint} />
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </PlayerHintsWrapper>
  )
}

export default PlayerHints
