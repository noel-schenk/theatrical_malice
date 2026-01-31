import { mainState } from "@/state/mainState";
import { isNil, uniq } from "lodash-es";
import PartySocket from "partysocket";

const HOST = "localhost:1984";

export const encode = (object: any): string => btoa(JSON.stringify(object));

export const decode = (message: any): any => JSON.parse(atob(message));

export const partyData = {
  partySocket: null as PartySocket | null,
};

const onRequestPlayers = () => {
  console.log("onRequestPlayers 1");
  if (isNil(partyData.partySocket)) return;
  console.log("onRequestPlayers 2");
  partyData.partySocket.send(
    encode({
      type: "respond_players",
      name: mainState.characterName,
    }),
  );
};

const onRespondPlayers = (name: string) => {
  console.log("onRespondPlayers 1");
  if (isNil(partyData.partySocket)) return;
  console.log("onRespondPlayers 2", name);
  mainState.connectedPlayers = uniq([...mainState.connectedPlayers, name]);
};

const onStartGame = () => {
  console.log("onStartGame");
  mainState.showNavigation = "game";
};

const onSync = (data: any) => {
  mainState.advancedMaskProperties = data;
};

const partyListener = () => {
  if (isNil(partyData.partySocket)) return;
  partyData.partySocket.addEventListener("message", (e) => {
    const data = decode(e.data);
    if (data.type === undefined) return;
    console.log(data.type, "e.data.type");
    switch (data.type) {
      case "request_players":
        console.log("request players 42");
        onRequestPlayers();
        break;
      case "respond_players":
        onRespondPlayers(data.name);
        break;
      case "start_game":
        onStartGame();
        break;
      case "sync":
        onSync(data.data);
    }
  });
};

export const createParty = async () => {
  const res = await fetch(
    `http://${HOST}/parties/main/lobby?check=${mainState.lobbyName}`,
  );
  const { exists } = await res.json();

  if (exists) return false;

  partyData.partySocket = new PartySocket({
    host: HOST,
    room: mainState.lobbyName,
  });
  partyListener();

  return true;
};

export const joinParty = (roomName: string) => {
  partyData.partySocket = new PartySocket({
    host: HOST,
    room: roomName,
  });
  partyListener();
};

export const requestPlayers = () => {
  if (isNil(partyData.partySocket)) return;
  partyData.partySocket.send(encode({ type: "request_players" }));
  mainState.connectedPlayers = [];
};

export const startGame = () => {
  if (isNil(partyData.partySocket)) return;
  partyData.partySocket.send(encode({ type: "start_game" }));
};

export const sync = () => {
  if (isNil(partyData.partySocket)) return;
  partyData.partySocket.send(
    encode({ type: "sync", data: mainState.advancedMaskProperties }),
  );
};

export const getLobbyList = async () => {
  const res = await fetch(`http://${HOST}/parties/main/lobby`);
  const { rooms } = await res.json();
  mainState.lobbyList = rooms;
};

// export const

// partySocket.send("Hello everyone");

// // print each incoming message from the server to console
// partySocket.addEventListener("message", (e) => {
//   console.log(e.data);
// });
