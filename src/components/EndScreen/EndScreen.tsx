import { mainState } from '@/state/mainState'

import { type FC, useEffect, useRef } from 'react'

import { isNil } from 'lodash-es'
import { useSnapshot } from 'valtio'

import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { EndScreenWrapper } from './EndScreen.styled'

interface EndScreenProps {}

const EndScreen: FC<EndScreenProps> = () => {
  const mainSnap = useSnapshot(mainState)
  const creditElement = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log('creditElement', creditElement.current)
    setTimeout(() => {
      if (isNil(creditElement.current)) return
      creditElement.current.scrollTo({
        top: creditElement.current.scrollHeight,
        behavior: 'smooth',
      })
    }, 1000)
  }, [creditElement.current])

  return (
    <EndScreenWrapper>
      <div className="absolute z-50 flex flex-wrap gap-4 p-4 w-full h-full shrink">
        <Card className="grow">
          <CardContent>
            <div
              className="flex flex-col gap-4 items-center text-center max-h-[calc(100vh-100px)] overflow-scroll"
              ref={creditElement}
            >
              <div className="typography">
                <h1>Game over</h1>
                <p>The winner is</p>
                <p className="winner">{mainSnap.winner}</p>
                <p className="thanks">Thank you for playing</p>

                <Button className="mt-8" onClick={() => location.reload()}>
                  Play again
                </Button>

                <h2>Credits</h2>
                <p>
                  Lucca (Baka Taco Games)
                  <br />
                  Lars
                  <br />
                  Shkelqim(AllFiciton27)
                  <br />
                  Noel
                </p>
                <img className="max-w-[200] w-full" src="image/group.jpg" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </EndScreenWrapper>
  )
}

export default EndScreen
