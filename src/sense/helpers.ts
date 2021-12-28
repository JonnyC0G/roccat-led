import {hexToRgb} from "../helpers.js";
import {Color, HexCode} from "../../types.js";

export function buildColorBuffer(currentColors: HexCode[] | (Color[])): number[] {
    let colorBuffer = Array(currentColors.length * 4).fill({});

    let index = 0;
    for (let colorIndex = 0; colorIndex < currentColors.length; colorIndex++) {
        //Create empty Array
        let color = currentColors[colorIndex];
        let rgbColor: Color;
        if (color instanceof HexCode) {
            rgbColor = hexToRgb(color);
        } else {
            rgbColor = color;
        }

        colorBuffer[index++] = rgbColor.r;
        colorBuffer[index++] = rgbColor.g;
        colorBuffer[index++] = rgbColor.b;
        colorBuffer[index++] = 0xff;
    }
    return colorBuffer;
}