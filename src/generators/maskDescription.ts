import { MaskFeatureType } from '@/models/MaskFeatureDefinition'

const decorations: { [key: string]: string } = {
  Crack: 'Riss',
  Moustache: 'Schnurrbart',
}

const ears: { [key: string]: string } = {
  Hase_Ohr: 'Tierohr',
  LeftEarBlueAlienMask: 'Antenne mit blauem Ende',
  LeftEarBlueCatMask: 'blaues Katzenohr',
  LeftEarBlueRonaldMask: 'Matrosenmütze mit blauem Band',
  LeftEarLongBlueClownMask: 'lange blaue Clownperücke',
  LeftEarLongPinkClownMask: 'lange pinke Clownperücke',
  LeftEarLongRedClownMask: 'lange rote Clownperücke',
  LeftEarLongYellowClownMask: 'lange gelbe Clownperücke',
  LeftEarPinkAlienMask: 'Antenne mit pinkem Ende',
  LeftEarPinkCatMask: 'pinkes Katzenohr',
  LeftEarPinkRonaldMask: 'Matrosenmütze mit pinkem Band',
  LeftEarRabbitMask: 'Hasenohr',
  LeftEarRedAlienMask: 'Antenne mit rotem Ende',
  LeftEarRedCatMask: 'rotes Katzenohr',
  LeftEarRedRonaldMask: 'Matrosenmütze mit rotem Band',
  LeftEarRobotMask: 'Roboterantenne gerade',
  LeftEarShortBlueClownMask: 'kurze blaue Clownperücke',
  LeftEarShortPinkClownMask: 'kurze pink Clownperücke',
  LeftEarShortRedClownMask: 'kurze rot Clownperücke',
  LeftEarShortYellowClownMask: 'kurze gelb Clownperücke',
  LeftEarSignalRobotMask: 'Signalantenne',
  LeftEarYellowAlienMask: 'Antenne mit gelbem Ende',
  LeftEarYellowCatMask: 'gelbes Katzenohr',
  LeftEarYellowRonaldMask: 'Matrosenmütze mit gelbem Band',
  NinjaMaskTopLeft: 'Dreieck',
}

const noses: { [key: string]: string } = {
  Hase_Schnauze: 'Tiernase',
  NoseAlienMask: 'schwarze Nasenlöcher',
  NoseBlueAlienMask: 'blaue Nasenlöcher',
  NoseBlueCatMask: 'blaue Dreiecksnase',
  NoseBlueClownMask: 'blaue runde Nase',
  NoseBlueRonaldMask: 'blauer Schnabel',
  NosePinkAlienMask: 'pinke Nasenlöcher',
  NosePinkCatMask: 'pinke Dreiecksnase',
  NosePinkClownMask: 'pinke runde Nase',
  NosePinkRobotMask: 'pinke rechteckige Nase',
  NosePinkRonaldMask: 'pinker Schnabel',
  NoseRabbitMask: 'Hasenzähne',
  NoseRedAlienMask: 'rote Nasenlöcher',
  NoseRedCatMask: 'rote Dreiecksnase',
  NoseRedClownMask: 'rote runde Nase',
  NoseRedRobotMask: 'rote rechteckige Nase',
  NoseRedRonaldMask: 'roter Schnabel',
  NoseYellowAlienMask: 'gelbe Nasenlöcher',
  NoseYellowCatMask: 'gelbe Dreiecksnase',
  NoseYellowClownMask: 'gelbe runde Nase',
  NoseYellowRonaldMask: 'gelber Schnabel',
}

const masks: { [key: string]: string } = {
  AlienMask: 'Alienmaske',
  CatMask: 'Fledermausmaske',
  ClownMask: 'Clownsmaske',
  Hase_Maske: 'Eichhörnchenmaske',
  NinjaMask: 'Ninjamaske',
  RabbitMask: 'Hasenmaske',
  RobotMask: 'Steinmaske',
  RonaldMask: 'Entenaugenmaske',
}

export const getDescriptionsFor = (type: MaskFeatureType) => {
  switch (type) {
    case MaskFeatureType.MASK:
      return masks
    case MaskFeatureType.EAR:
      return ears
    case MaskFeatureType.NOSE:
      return noses
    case MaskFeatureType.DECORATION:
      return decorations
  }
}
