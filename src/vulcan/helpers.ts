import * as consts from "../consts.js";
import {Color} from "../../types.js";

export function buildColorBuffer(keylist: Color[]): number[] {
    //Create empty Array
    let colorbuffer: number[] = []
    for (let i: number = 0; i < consts.NUMKEYS * 3; i++) {
        colorbuffer.push(0)
    }

    //Fill List
    keylist.forEach((key: Color, i) => {

        // Send colors in groups with 12 values each. First 12x the red, then 12x green, then 12x blue
        const paquet: number = Math.floor(i / 12)
        const offset: number = (i % 12) + 36 * paquet;
        colorbuffer[offset] = key.r;
        colorbuffer[offset + 12] = key.g;
        colorbuffer[offset + 24] = key.b;

    })

    return colorbuffer;
}

export function getKeys(color: Color): Color[] {
    let keys: Color[] = [];

    for (let i:number = 0; i < consts.NUMKEYS; i++) {
        keys.push(Object.assign({}, color));
    }
    return keys;
}