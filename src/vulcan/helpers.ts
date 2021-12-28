import * as consts from "../consts.js";

export function buildColorBuffer(keylist: { r: number, g: number, b: number }[]): number[] {
    //Create empty Array
    let colorbuffer: number[] = []
    for (let i: number = 0; i < consts.NUMKEYS * 3; i++) {
        colorbuffer.push()
    }

    //Fill List
    keylist.forEach((key, i) => {

        // Send colors in groups with 12 values each. First 12x the red, then 12x green, then 12x blue
        const paquet: number = Math.floor(i / 12)
        const offset: number = (i % 12) + 36 * paquet;
        colorbuffer[offset] = key.r;
        colorbuffer[offset + 12] = key.g;
        colorbuffer[offset + 24] = key.b;

    })

    return colorbuffer;
}

export function getKeys(color: { r: number, g: number, b: number }): { r: number, g: number, b: number }[] {
    let keys: { r: number, g: number, b: number }[] = [];

    for (let i:number = 0; i < consts.NUMKEYS; i++) {
        keys.push(Object.assign({}, color));
    }
    return keys;
}