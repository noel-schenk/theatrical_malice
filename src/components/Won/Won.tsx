import { mainState } from '@/state/mainState'

import type { FC } from 'react'

import Confetti from '../Confetti/Confetti'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { WonWrapper } from './Won.styled'

interface WonProps {}

const Won: FC<WonProps> = () => (
  <WonWrapper>
    <div className="absolute z-60 p-8">
      <Card>
        <CardContent>
          <div className="flex flex-col flex-wrap gap-4">
            <div>
              <div className="flex flex-wrap gap-4 ">
                <div className="typography w-full">
                  <h2>You've WON</h2>
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
              <img className="w-60" src="/ui/endscreen/won.png" />
            </div>
          </div>
          <Confetti />
        </CardContent>
      </Card>
    </div>
  </WonWrapper>
)

export default Won
