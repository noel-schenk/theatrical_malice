export enum MaskFeatureType {
    MASK = 'MASK',
    EAR = 'EAR',
    NOSE = 'NOSE',
    DECORATION = 'DECORATION'
}

export interface MaskFeatureDefinition {
    url: string,
    name: string,
    type: MaskFeatureType 
    position?: 'right' | 'left',
}