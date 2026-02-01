import { mainState } from '@/state/mainState'

import type { FC } from 'react'

import { HatGlasses } from 'lucide-react'
import { useSnapshot } from 'valtio'

import { Badge } from '../ui/badge'
import { IsHiddenInfoWrapper } from './IsHiddenInfo.styled'

interface IsHiddenInfoProps {}

const IsHiddenInfo: FC<IsHiddenInfoProps> = () => {
  const mainSnap = useSnapshot(mainState)
  if (mainState.gameState !== 'running') return <></>

  return (
    <IsHiddenInfoWrapper className="fixed top-8 right-10">
      {mainSnap.players.find(
        player => player.playerUUID === mainSnap.playerUUID
      )?.skipFlash && (
        <Badge variant="destructive">
          <HatGlasses />
          You're hidden
        </Badge>
      )}
    </IsHiddenInfoWrapper>
  )
}

export default IsHiddenInfo
