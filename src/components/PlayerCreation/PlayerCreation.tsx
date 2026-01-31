import { mainState } from '@/state/mainState'
import { getUUID } from '@/utils/getUUID'

import { type FC } from 'react'

import { useSnapshot } from 'valtio'

import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { Input } from '../ui/input'
import { PlayerCreationWrapper } from './PlayerCreation.styled'

interface PlayerCreationProps {}

const PlayerCreation: FC<PlayerCreationProps> = () => {
  const mainSnap = useSnapshot(mainState)

  return (
    <PlayerCreationWrapper>
      <div className="flex flex-wrap gap-4 p-4">
        <Card className="grow">
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="typography">
                <h2>Create your character</h2>
              </div>
              <div className="flex flex-col gap-4">
                <Input
                  placeholder="Character Name"
                  value={mainSnap.characterName}
                  onChange={ev => (mainState.characterName = ev.target.value)}
                />
                <Button
                  disabled={mainState.characterName.length < 4}
                  onClick={() => {
                    mainState.playerUUID = getUUID()
                    mainState.showNavigation = 'lobby'
                  }}
                >
                  Start
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PlayerCreationWrapper>
  )
}

export default PlayerCreation
