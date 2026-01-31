import type { PlayerType } from '@/models/PlayerType'

import { proxy } from 'valtio'

export const NAVIGATION_STATES = [
  'playerCreation',
  'lobby',
  'partyWaitingroom',
  'game',
  'lost',
  'won',
] as const

export const GAME_STATES = ['start', 'running', 'end'] as const

export const mainState = proxy({
  tick: 0,
  characterName: '',
  isHost: false,
  showNavigation: 'playerCreation' as (typeof NAVIGATION_STATES)[number],
  lobbyList: [] as Array<string>,
  lobbyName: '',
  connectedPlayers: [] as Array<string>,
  players: [] as Array<PlayerType>,
  playerUUID: '',
  gameState: 'start' as (typeof GAME_STATES)[number],
  yourKiller: '',
})
