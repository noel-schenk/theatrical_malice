import { mainState } from '@/state/mainState'

import type { FC } from 'react'

import { useSnapshot } from 'valtio'

import { Badge } from '../ui/badge'
import { Spinner } from '../ui/spinner'
import { FlashingInfoWrapper } from './FlashingInfo.styled'

interface FlashingInfoProps {}

const FlashingInfo: FC<FlashingInfoProps> = () => {
  const mainSnap = useSnapshot(mainState)

  return (
    <FlashingInfoWrapper className="fixed top-8 left-8">
      {mainSnap.flashPlayers.length > 0 && (
        <Badge variant="destructive">
          <Spinner data-icon="inline-start" />
          Revealing all alive Players that are not hidden!
        </Badge>
      )}
    </FlashingInfoWrapper>
  )
}

export default FlashingInfo
