import Face from '../assets/face/Face.png';
import { decorations, masks, noses, top } from "@/generators/MaskDefinitionGenerator"

const loadImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.src = url;
    });
}

export const loadAllImages = async () => {
    const urls = [
        Face, 
        ...masks.map((mask) => mask.url),
        ...top.map((top) => top.url),
        ...noses.map((nose) => nose.url),
        ...decorations.map((decoration) => decoration.url)
    ];

    const images: { [key: string]: HTMLImageElement } = {};
    for (let url of urls) {
        const image = await loadImage(url);
        images[url] = image;
    }
    return images;
}