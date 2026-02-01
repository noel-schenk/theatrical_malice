import { mainState } from '@/state/mainState'

import type { FC } from 'react'

import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { LostWrapper } from './Lost.styled'

interface LostProps {}

const Lost: FC<LostProps> = () => (
  <LostWrapper>
    <div className="absolute z-45 p-8">
      <Card>
        <CardContent>
          <div className="flex flex-col flex-wrap gap-4">
            <div>
              <div className="flex flex-wrap gap-4">
                <div className="typography w-full">
                  <h2>
                    {mainState.players.find(
                      player => player.playerUUID === mainState.yourKiller
                    )?.name ?? 'Someone'}{' '}
                    has found you
                  </h2>
                </div>
                <Button
                  onClick={() => {
                    mainState.showNavigation = 'game'
                  }}
                >
                  Continue spectating
                </Button>
              </div>
            </div>
            <div className="flex">
              <img className="w-60" src="/ui/endscreen/lost.png" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </LostWrapper>
)

export default Lost
