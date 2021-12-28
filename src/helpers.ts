export function hexToRgb(hex: string): { r: number; b: number; g: number } {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
        return {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        }
    } else throw new Error('no valid hex-string');

}

export function sleep(time: number = 200): Promise<void> {
    return new Promise<void>((resolve, reject) => setTimeout(() => resolve(), time));
}
