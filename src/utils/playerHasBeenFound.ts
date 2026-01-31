import { mainState } from '@/state/mainState'

export const playerHasBeenFound = () => {
  return (
    mainState.players.find(player => player.playerUUID === mainState.playerUUID)
      ?.found ?? false
  )
}
