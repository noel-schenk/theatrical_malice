import { useEffect } from 'react'

import { isNil } from 'lodash-es'
import { Toaster } from 'sonner'
import { useSnapshot } from 'valtio'

import { AppWrapper } from './App.styled'
import Lobby from './components/Lobby/Lobby'
import Lost from './components/Lost/Lost'
import PartyWaitingroom from './components/PartyWaitingroom/PartyWaitingroom'
import PlayerCreation from './components/PlayerCreation/PlayerCreation'
import Screen from './components/Screen/Screen'
import Won from './components/Won/Won'
import { mainState } from './state/mainState'
import { joinParty } from './utils/multiplayer'

function App() {
  const mainSnap = useSnapshot(mainState)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const lobby = urlParams.get('lobby')
    if (isNil(lobby)) return
    joinParty(lobby)
  }, [])

  return (
    <>
      <AppWrapper>
        {mainSnap.showNavigation === 'playerCreation' && <PlayerCreation />}
        {mainSnap.showNavigation === 'lobby' && <Lobby />}
        {mainSnap.showNavigation === 'partyWaitingroom' && <PartyWaitingroom />}
        {mainSnap.showNavigation === 'lost' && <Lost />}
        {mainSnap.showNavigation === 'won' && <Won />}
        <Screen />
        <Toaster />
      </AppWrapper>
    </>
  )
}

export default App
