import { Toaster } from 'sonner'
import { useSnapshot } from 'valtio'

import { AppWrapper } from './App.styled'
import Lobby from './components/Lobby/Lobby'
import Lost from './components/Lost/Lost'
import Music from './components/Music/Music'
import PartyWaitingroom from './components/PartyWaitingroom/PartyWaitingroom'
import PlayerCreation from './components/PlayerCreation/PlayerCreation'
import Screen from './components/Screen/Screen'
import Won from './components/Won/Won'
import { mainState } from './state/mainState'

function App() {
  const mainSnap = useSnapshot(mainState)

  return (
    <>
      <AppWrapper>
        {mainSnap.showNavigation === 'playerCreation' && <PlayerCreation />}
        {mainSnap.showNavigation === 'lobby' && <Lobby />}
        {mainSnap.showNavigation === 'partyWaitingroom' && <PartyWaitingroom />}
        {mainSnap.showNavigation === 'lost' && <Lost />}
        {mainSnap.showNavigation === 'won' && <Won />}
        <Music />
        <Screen />
        <Toaster />
      </AppWrapper>
    </>
  )
}

export default App
