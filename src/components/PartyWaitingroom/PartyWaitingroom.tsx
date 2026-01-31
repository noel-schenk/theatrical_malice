import type { MaskDefinition } from '@/models/MaskDefinition'
import { mainState } from '@/state/mainState'
import { requestMask, requestPlayers, startGame } from '@/utils/multiplayer'

import { type FC, useEffect } from 'react'

import { cloneDeep } from 'lodash-es'
import type { CSSProperties } from 'styled-components'
import { useSnapshot } from 'valtio'

import AdvancedMask from '../AdvancedMask/AdvancedMask'
import Mask from '../Mask/Mask'
import { Banner, BannerTitle } from '../kibo-ui/banner'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { PartyWaitingroomWrapper } from './PartyWaitingroom.styled'

interface PartyWaitingroomProps {}

const PartyWaitingroom: FC<PartyWaitingroomProps> = () => {
  const mainSnap = useSnapshot(mainState)

  useEffect(() => {
    requestPlayers()
  }, [])

  const player = mainSnap.players.find(
    player => player.playerUUID === mainSnap.playerUUID
  )

  return (
    <PartyWaitingroomWrapper>
      <div className="flex flex-wrap gap-4 p-4">
        <Card className="grow">
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex gap-16 justify-between">
                <div className="typography">
                  <h2>Lobby: {mainSnap.lobbyName}</h2>
                </div>
                <Button onClick={() => requestPlayers()}>Refresh</Button>
              </div>
              <div className="flex flex-col gap-4">
                {mainSnap.connectedPlayers.map((connectedPlayer, index) => (
                  <Banner
                    key={connectedPlayer}
                    style={
                      {
                        '--primary': [
                          '#93827F',
                          '#6BA292',
                          '#35CE8D',
                          '#BCD8B7',
                          '#E0D2C3',
                        ][index % 5],
                        '--primary-foreground': 'white',
                      } as any as CSSProperties
                    }
                  >
                    <BannerTitle>{connectedPlayer}</BannerTitle>
                  </Banner>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <Card className="grow">
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-4">
                  <div className="typography">
                    <h3>This is what your Character will look like</h3>
                  </div>
                  <Button className="grow" onClick={requestMask}>
                    Randomize Character
                  </Button>
                </div>
                <div className="flex flex-col gap-4 items-center">
                  {player && (
                    <Mask
                      maskDefinition={
                        cloneDeep(
                          player.advancedMaskProperty.maskDefinition
                        ) as MaskDefinition
                      }
                      key={player.maskUUID}
                    />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shrink grow">
            <CardContent>
              {!mainSnap.isHost && (
                <div className="typography">
                  <p>Waiting for host to start the game...</p>
                </div>
              )}
              {mainSnap.isHost && (
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <div className="typography">
                      <h2>Start Game</h2>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      mainState.showNavigation = 'game'
                      startGame()
                    }}
                  >
                    Start
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PartyWaitingroomWrapper>
  )
}

export default PartyWaitingroom
