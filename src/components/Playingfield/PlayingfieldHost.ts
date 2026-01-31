import { createMaskDefinition } from '@/generators/MaskDefinitionGenerator'
import { Vec2 } from '@/models/Vec2'
import { mainState } from '@/state/mainState'
import { getUUID } from '@/utils/getUUID'
import { initialMaskDistribution } from '@/utils/maskDistribution'
import { defaultMaskMovement } from '@/utils/maskMovement'
import { sync } from '@/utils/multiplayer'

export const initialPlayingfieldHost = () => {
  console.log('initialPlayingfieldHost')
  const advancedMaskPositions = initialMaskDistribution(200)
  const advancedMaskProperties = advancedMaskPositions.map(
    advancedMaskPosition => ({
      velocityInput: new Vec2(0, 0),
      position: new Vec2(advancedMaskPosition.x, advancedMaskPosition.y),
      maskDefinition: createMaskDefinition(),
    })
  )

  console.log(advancedMaskProperties, 'advancedMaskProperties')
  mainState.players = advancedMaskProperties.map(advancedMaskProperty => ({
    advancedMaskProperty: advancedMaskProperty,
    maskUUID: getUUID(),
    found: false,
    name: '',
  }))
}

export const updatePlayingfieldHost = () => {
  if (!mainState.isHost) return

  mainState.players.forEach((player, index) => {
    const defaultMovement = defaultMaskMovement(
      player.advancedMaskProperty.position
    )
    mainState.players[index].advancedMaskProperty.position = defaultMovement
  })

  sync()
}
