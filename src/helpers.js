function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;

}

module.exports.hexToRgb = hexToRgb;

module.exports.buildColorBuffer = function (color) {
    //Create empty Array
    let colorBuffer = Array(3).fill({});
    let rgbColor = hexToRgb(color);

    colorBuffer[0] = rgbColor.r;
    colorBuffer[1] = rgbColor.g;
    colorBuffer[2] = rgbColor.b;

    return colorBuffer;
}