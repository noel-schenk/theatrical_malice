import type { Player } from "@/models/Player";
import { proxy } from "valtio";

export const navigation = [
  "playerCreation",
  "lobby",
  "partyWaitingroom",
  "game",
];

export const mainState = proxy({
  tick: 0,
  characterName: "",
  isHost: false,
  showNavigation: "playerCreation" as (typeof navigation)[number],
  lobbyList: [] as Array<string>,
  lobbyName: "",
  connectedPlayers: [] as Array<string>,
  players: [] as Array<Player>,
  playerUUID: "",
});
