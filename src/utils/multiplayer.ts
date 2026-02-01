import { mainState } from '@/state/mainState'

import { isNil, sample, uniq } from 'lodash-es'
import PartySocket from 'partysocket'
import { toast } from 'sonner'

import { assertTrue } from './assertTrue'

export const encode = (object: any): string => btoa(JSON.stringify(object))

export const decode = (message: any): any => JSON.parse(atob(message))

export const partyData = {
  partySocket: null as PartySocket | null,
}

export const gameHasStarted = () => {
  requestPlayers()
  // TODO: do camera stuff or else
}

const gameHasFinished = (wonPlayerUUID: string) => {
  if (mainState.playerUUID === wonPlayerUUID) mainState.showNavigation = 'won'
  else mainState.showNavigation = 'lost'
}

export const playerFound = (playerUUID: string, seekerPlayerUUID: string) => {
  if (playerUUID === mainState.playerUUID) {
    mainState.yourKiller = seekerPlayerUUID
    mainState.showNavigation = 'lost'
  }

  if (!mainState.isHost) return

  mainState.players = mainState.players.map(player => {
    if (player.playerUUID === playerUUID) player.found = true
    if (player.playerUUID === seekerPlayerUUID) player.skipFlash = true
    return player
  })

  const playerThatHaveNoYetBeenFound = mainState.players.filter(
    player => player.found === false && !isNil(player.playerUUID)
  )

  if (
    playerThatHaveNoYetBeenFound.length === 1 &&
    mainState.gameState !== 'start'
  ) {
    const lastPlayerUUID = playerThatHaveNoYetBeenFound[0].playerUUID
    assertTrue(!isNil(lastPlayerUUID), 'lastPlayerUUID was not found')
    gameFinished(lastPlayerUUID)
  }
}

const onRequestPlayers = () => {
  console.log('onRequestPlayers 1')
  if (isNil(partyData.partySocket)) return
  console.log('onRequestPlayers 2')
  partyData.partySocket.send(
    encode({
      type: 'respond_players',
      name: mainState.characterName,
      playerUUID: mainState.playerUUID,
    })
  )
}

export const setPlayerNameByPlayerUUID = (name: string, playerUUID: string) => {
  const player = mainState.players.find(
    player => player.playerUUID === playerUUID
  )
  assertTrue(!isNil(player), 'player not found')
  player.name = name
}

const onRespondPlayers = (name: string, playerUUID: string) => {
  console.log('onRespondPlayers 1')
  if (isNil(partyData.partySocket)) return
  console.log('onRespondPlayers 2', name)
  mainState.connectedPlayers = uniq([...mainState.connectedPlayers, name])

  if (!mainState.isHost) return

  setPlayerNameByPlayerUUID(name, playerUUID)
}

const onSync = (players: any, gameState: any) => {
  mainState.players = players
  mainState.gameState = gameState
  console.log('update mainState.gameState', gameState)
}

const onRequestMask = (playerUUID: string) => {
  if (isNil(partyData.partySocket)) return
  if (!mainState.isHost) return

  mainState.players = mainState.players.map(player => {
    if (player.playerUUID === playerUUID) player.playerUUID = undefined
    return player
  }) // Allows a player to get a new Mask

  const playerWithoutPlayerUUID = sample(
    mainState.players.filter(player => isNil(player.playerUUID))
  )

  assertTrue(
    !isNil(playerWithoutPlayerUUID),
    `No Player without playerUUID could be found ${JSON.stringify(mainState.players)}`
  )

  const playerIndexWithoutPlayerUUID = mainState.players.indexOf(
    playerWithoutPlayerUUID
  )
  mainState.players[playerIndexWithoutPlayerUUID].playerUUID = playerUUID

  sync()
}

const onFoundPlayer = (playerUUID: string, seekerPlayerUUID: string) => {
  playerFound(playerUUID, seekerPlayerUUID)
}

const onGameHasFinished = (playerUUID: string) => {
  gameHasFinished(playerUUID)
}

export const onFlashPlayers = (playerUUIDList: string[]) => {
  mainState.flashPlayers = playerUUIDList
}

const partyListener = () => {
  if (isNil(partyData.partySocket)) return
  partyData.partySocket.addEventListener('message', e => {
    const data = decode(e.data)
    if (data.type === undefined) return
    console.log(data.type, 'e.data.type')
    switch (data.type) {
      case 'request_players':
        console.log('request players 42')
        onRequestPlayers()
        break
      case 'respond_players':
        onRespondPlayers(data.name, data.playerUUID)
        break
      case 'sync':
        onSync(data.players, data.gameState)
        break
      case 'request_mask':
        onRequestMask(data.playerUUID)
        break
      case 'found_player':
        onFoundPlayer(data.playerUUID, data.seekerPlayerUUID)
        break
      case 'game_finished':
        onGameHasFinished(data.playerUUID)
        break
      case 'flash_players':
        onFlashPlayers(data.playerUUIDList)
        break
    }
  })
}

export const createParty = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/parties/main/lobby?check=${mainState.lobbyName}`
  )
  const { exists } = await res.json()

  if (exists) return false

  partyData.partySocket = new PartySocket({
    host: import.meta.env.VITE_BACKEND_URL,
    room: mainState.lobbyName,
  })
  partyListener()

  return true
}

export const joinParty = async (roomName: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/parties/main/lobby?check=${roomName}`
  )
  const { exists } = await res.json()

  if (!exists) {
    const url = new URL(window.location.href)
    url.searchParams.delete('lobby')
    window.history.replaceState({}, '', url.href)
    return toast("The party you're trying to join does not exist.")
  }

  partyData.partySocket = new PartySocket({
    host: import.meta.env.VITE_BACKEND_URL,
    room: roomName,
  })
  partyListener()
  mainState.isHost = false
  mainState.showNavigation = 'partyWaitingroom'
  requestMask()
}

export const requestPlayers = () => {
  if (isNil(partyData.partySocket)) return
  partyData.partySocket.send(encode({ type: 'request_players' }))
  mainState.connectedPlayers = []
}

export const sync = () => {
  if (isNil(partyData.partySocket)) return
  partyData.partySocket.send(
    encode({
      type: 'sync',
      players: mainState.players,
      gameState: mainState.gameState,
    })
  )
}

export const requestMask = () => {
  if (mainState.isHost) return onRequestMask(mainState.playerUUID)

  if (isNil(partyData.partySocket)) return
  partyData.partySocket.send(
    encode({ type: 'request_mask', playerUUID: mainState.playerUUID })
  )
}

export const requestFoundPlayer = (playerUUID: string) => {
  if (isNil(partyData.partySocket)) return
  partyData.partySocket.send(
    encode({
      type: 'found_player',
      playerUUID,
      seekerPlayerUUID: mainState.playerUUID,
    })
  )
  playerFound(playerUUID, mainState.playerUUID)
}

export const flashPlayers = () => {
  if (!mainState.isHost) return
  if (isNil(partyData.partySocket)) return

  const playerUUIDsWithoutFlashSkip = mainState.players
    .filter(player => player.skipFlash === false && !isNil(player.playerUUID))
    .map(player => player.playerUUID ?? '')

  onFlashPlayers(playerUUIDsWithoutFlashSkip)

  console.log('flashPlayers')
  partyData.partySocket.send(
    encode({
      type: 'flash_players',
      playerUUIDList: playerUUIDsWithoutFlashSkip,
    })
  )
}

const gameFinished = (playerUUID: string) => {
  if (isNil(partyData.partySocket)) return
  partyData.partySocket.send(encode({ type: 'game_finished', playerUUID }))
  gameHasFinished(playerUUID)
}

export const getLobbyList = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/parties/main/lobby`
  )
  const { rooms } = await res.json()
  mainState.lobbyList = rooms
}
