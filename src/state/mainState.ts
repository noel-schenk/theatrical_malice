import type { MaskDefinition } from "@/models/MaskDefinition";
import type { Vec2 } from "@/models/Vec2";
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
  advancedMaskProperties: [] as {
    key: number;
    id: number;
    velocityInput: Vec2;
    position: Vec2;
    maskDefinition: MaskDefinition;
  }[],
});
