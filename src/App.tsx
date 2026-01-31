import { useSnapshot } from "valtio";
import PlayerCreation from "./components/PlayerCreation/PlayerCreation";
import Screen from "./components/Screen/Screen";
import { mainState } from "./state/mainState";
import Lobby from "./components/Lobby/Lobby";
import { AppWrapper } from "./App.styled";
import PartyWaitingroom from "./components/PartyWaitingroom/PartyWaitingroom";
import { Toaster } from "sonner";

function App() {
  const mainSnap = useSnapshot(mainState);

  return (
    <>
      <AppWrapper>
        {mainSnap.showNavigation === "playerCreation" && <PlayerCreation />}
        {mainSnap.showNavigation === "lobby" && <Lobby />}
        {mainSnap.showNavigation === "partyWaitingroom" && <PartyWaitingroom />}
        <Screen />
        <Toaster />
      </AppWrapper>
    </>
  );
}

export default App;
