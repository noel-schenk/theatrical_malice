import { mainState } from '@/state/mainState'
import {
  createParty,
  getLobbyList,
  joinParty,
  requestMask,
} from '@/utils/multiplayer'

import { type FC, useEffect, useMemo } from 'react'

import { toast } from 'sonner'
import type { CSSProperties } from 'styled-components'
import { useSnapshot } from 'valtio'

import { initialPlayingfieldHost } from '../Playingfield/PlayingfieldHost'
import { Banner, BannerAction, BannerTitle } from '../kibo-ui/banner'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { Input } from '../ui/input'
import { LobbyWrapper } from './Lobby.styled'

interface LobbyProps {}

const Lobby: FC<LobbyProps> = () => {
  const mainSnap = useSnapshot(mainState)

  const lobbyList = useMemo(() => {
    return mainSnap.lobbyList
  }, [mainSnap.lobbyList])

  useEffect(() => {
    getLobbyList()
  }, [])

  return (
    <LobbyWrapper>
      <div className="absolute z-50 flex flex-wrap gap-4 p-4">
        <Card className="grow">
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="typography">
                <h2>Create a new Lobby</h2>
              </div>
              <div className="flex flex-col gap-4">
                <Input
                  placeholder="Lobby name"
                  value={mainSnap.lobbyName
                    .replaceAll(' ', '')
                    .replaceAll('%', '')}
                  onChange={ev => (mainState.lobbyName = ev.target.value)}
                />
                <Button
                  disabled={mainSnap.lobbyName.length < 4}
                  onClick={async () => {
                    const partyWasCreated = await createParty()
                    if (!partyWasCreated)
                      return toast('This room name is already in use', {
                        position: 'top-left',
                      })

                    mainState.isHost = true

                    initialPlayingfieldHost()

                    mainState.showNavigation = 'partyWaitingroom'
                    requestMask()
                  }}
                >
                  Create Lobby
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shring grow basis-125">
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="typography">
                  <h2>Lobby Browser</h2>
                </div>
                <Button onClick={() => getLobbyList()}>Reload</Button>
              </div>

              <div className="flex flex-col gap-4">
                {lobbyList.map((lobby, index) => (
                  <Banner
                    key={lobby}
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
                    <BannerTitle>{lobby}</BannerTitle>
                    <BannerAction
                      onClick={() => {
                        joinParty(lobby)
                      }}
                    >
                      JOIN LOBBY
                    </BannerAction>
                  </Banner>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </LobbyWrapper>
  )
}

export default Lobby
