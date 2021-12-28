import {Color, HexCode} from "../types.js";

export function hexToRgb(hex: HexCode): Color {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.value);
    if (result) {
        return new Color(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16))
    } else throw new Error('no valid hex-string');

}

export function sleep(time: number = 200): Promise<void> {
    return new Promise<void>((resolve, reject) => setTimeout(() => resolve(), time));
}
