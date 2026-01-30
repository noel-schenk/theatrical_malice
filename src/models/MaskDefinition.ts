import type { MaskFeatureDefinition } from "./MaskFeatureDefinition";

export interface MaskDefinition {
    url: string;
    name: string;
    features: MaskFeatureDefinition[];
}