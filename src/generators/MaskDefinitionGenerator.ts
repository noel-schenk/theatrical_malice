import { MaskFeatureType } from "../models/MaskFeatureDefinition";

const createFeature = (type: MaskFeatureType) => (image: string) => ({
    url: image,
    name: image.split('/').pop(),
    type
});

export const masks = Object.values(import.meta.glob('../assets/masks/*.png', {
    eager: true,
    as: 'url'
})).map(createFeature(MaskFeatureType.MASK));
export const top = Object.values(import.meta.glob('../assets/top/*.png', {
    eager: true,
    as: 'url'
})).map(createFeature(MaskFeatureType.EAR));
export const noses = Object.values(import.meta.glob('../assets/nose/*.png', {
    eager: true,
    as: 'url'
})).map(createFeature(MaskFeatureType.NOSE));
export const decorations = Object.values(import.meta.glob('../assets/decorations/*.png', {
    eager: true,
    as: 'url'
})).map(createFeature(MaskFeatureType.DECORATION));

const getRandomElement = (array: any[], optional = false, position?: 'left' | 'right') => {
    const offset = optional ? 1 : 0;
    const index = Math.floor(Math.random() * (array.length + offset)) - offset;
    if (index === -1) {
        return undefined
    }
    return { ...array[index], position };
}

const createMaskFeatureDefinitions = () => {
    const topLeft = getRandomElement(top, true, 'left');
    const topRight = getRandomElement(top, true, 'right');
    const nose = getRandomElement(noses, true);
    const decoration = getRandomElement(decorations, true);
    return [
        topLeft, topRight, nose, decoration
    ].filter(element => element);
};

export const createMaskDefinition = () => {
    const mask = getRandomElement(masks);
    return {
        url: mask.url,
        name: mask.name,
        features: createMaskFeatureDefinitions()
    };
}