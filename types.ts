export enum DEVICE_TYPES { sense, vulcan, kone }

export class Color {
    r: number
    g: number
    b: number;

    constructor(r: number = 0, g: number = 0, b: number = 0) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
}

export class HexCode {
    value: string;

    constructor(newVal: string) {
        const reg = /^#([0-9a-f]{3}){1,2}$/i;
        if (reg.test(newVal)) {
            this.value = newVal
        } else {
            throw new Error('no valid hex code')
        }
    }
}
export function isHexCode(toBeDetermined): boolean {
    return !!toBeDetermined.value;
}