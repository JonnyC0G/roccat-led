export function hexToRgb(hex: string): {r: number, g: number, b:number} {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;

}

export function sleep(time:number = 200): Promise<void> {
    return new Promise<void>((resolve, reject) => setTimeout(() => resolve(), time));
}
