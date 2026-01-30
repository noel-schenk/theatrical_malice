import { proxy } from "valtio";

export const mainState = proxy({ tick: 0 });
