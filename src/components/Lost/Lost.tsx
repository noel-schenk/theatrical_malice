import { mainState } from '@/state/mainState'

import type { FC } from 'react'

import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { LostWrapper } from './Lost.styled'

interface LostProps {}

const Lost: FC<LostProps> = () => (
  <LostWrapper>
    <div className="absolute z-60 p-8">
      <Card>
        <CardContent>
          <div className="flex flex-col flex-wrap gap-4">
            <div>
              <div className="flex flex-wrap gap-4">
                <div className="typography">
                  <h2>You've been found (again)</h2>
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
