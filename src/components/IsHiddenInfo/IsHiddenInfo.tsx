import { mainState } from '@/state/mainState'

import type { FC } from 'react'

import { HatGlasses, Hourglass } from 'lucide-react'
import { useSnapshot } from 'valtio'

import { Badge } from '../ui/badge'
import { IsHiddenInfoWrapper } from './IsHiddenInfo.styled'

interface IsHiddenInfoProps {}

const IsHiddenInfo: FC<IsHiddenInfoProps> = () => {
  const mainSnap = useSnapshot(mainState)
  if (mainState.gameState !== 'running') return <></>

  return (
    <IsHiddenInfoWrapper className="fixed top-8 right-10">
      <div className="flex gap-4">
        {mainSnap.waitForNextClick && (
          <Badge variant="destructive">
            <Hourglass />
            Wait for your next guess
          </Badge>
        )}

        {mainSnap.players.find(
          player => player.playerUUID === mainSnap.playerUUID
        )?.skipFlash && (
          <Badge variant="destructive">
            <HatGlasses />
            You're hidden
          </Badge>
        )}
      </div>
    </IsHiddenInfoWrapper>
  )
}

export default IsHiddenInfo
