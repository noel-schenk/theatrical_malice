import { MaskFeatureType } from '@/models/MaskFeatureDefinition'

const decorations: { [key: string]: string } = {
  Crack: 'Riss',
  Moustache: 'Schnurrbart',
  NoseBlueHatFakeFaceMask: 'blauer Zylinder',
  NosePinkHatFakeFaceMask: 'pinker Zylinder',
  NoseRedHatFakeFaceMask: 'roter Zylinder',
  NoseYellowHatFakeFaceMask: 'gelber Zylinder'
}

const ears: { [key: string]: string } = {
  Hase_Ohr: 'Tier langes ohr',
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
  Fuchs_Ohr: 'Tier dreiecks Ohr',
  LeftEarHeartFakeFaceMask: 'Herz an der Wange',
  LeftEarSkullFakeFaceMask: 'Totenkopf an der Wange',
  LeftEarStarFakeFaceMask: 'Stern an der Wange',
  LeftEarTearFakeFaceMask: 'Träne an der Wange',
  Panda_Ohr: 'rundes Panda Ohr'
}

const noses: { [key: string]: string } = {
  Hase_Schnauze: 'tier spitz nase',
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
  Fuchs_Schnauze: 'kleine tier knopf nase',
  Panda_Schnauze: 'große tier knopf nase'
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
  Fuchs_Maske: 'Fuchsmaske',
  HappyFakeFaceMask: 'Glücklichehälftemaske',
  Panda_Maske: 'Pandamaske',
  SadFakeFaceMask: 'Traurigehälftemaske'
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
