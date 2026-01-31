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
  // TODO: do camera stuff or else
}

const gameHasFinished = (wonPlayerUUID: string) => {
  if (mainState.playerUUID === wonPlayerUUID) mainState.showNavigation = 'won'
  else mainState.showNavigation = 'lost'
}

export const playerFound = (playerUUID: string) => {
  if (!mainState.isHost) return

  mainState.players = mainState.players.map(player => {
    if (player.playerUUID === playerUUID) player.found = true
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
    })
  )
}

const onRespondPlayers = (name: string) => {
  console.log('onRespondPlayers 1')
  if (isNil(partyData.partySocket)) return
  console.log('onRespondPlayers 2', name)
  mainState.connectedPlayers = uniq([...mainState.connectedPlayers, name])
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

const onFoundPlayer = (playerUUID: string) => {
  playerFound(playerUUID)
  if (playerUUID === mainState.playerUUID) mainState.showNavigation = 'lost'
}

const onGameHasFinished = (playerUUID: string) => {
  gameHasFinished(playerUUID)
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
        onRespondPlayers(data.name)
        break
      case 'sync':
        onSync(data.players, data.gameState)
        break
      case 'request_mask':
        onRequestMask(data.playerUUID)
        break
      case 'found_player':
        onFoundPlayer(data.playerUUID)
        break
      case 'game_finished':
        onGameHasFinished(data.playerUUID)
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
  partyData.partySocket.send(encode({ type: 'found_player', playerUUID }))
  playerFound(playerUUID)
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
