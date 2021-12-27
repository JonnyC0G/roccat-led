import {hexToRgb} from "../helpers";

export function buildColorBuffer (colors: string[] | {r:number, g:number, b:number}[]): number[] {
    //Create empty Array
    let colorBuffer = Array(44).fill({});
    let bufferIndex = 0;
    for(let colorIndex = 0; colorIndex < colors.length; colorIndex++) {
        let color = colors[colorIndex];
        let rgbColor: {r:number, g:number, b:number};
        if (typeof color === 'string') {
            rgbColor = hexToRgb(color);
        } else {
            rgbColor = color;
        }

        colorBuffer[bufferIndex++] = rgbColor.r;
        colorBuffer[bufferIndex++] = rgbColor.g;
        colorBuffer[bufferIndex++] = rgbColor.b;
        colorBuffer[bufferIndex++] = 0x00; //I have no idea why there are 4 channels
    }

    return colorBuffer;
}