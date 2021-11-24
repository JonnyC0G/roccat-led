const {hexToRgb} = require("../helpers");
module.exports.buildColorBuffer = function (color) {
    //Create empty Array
    let colorBuffer = Array(44).fill({});
    let bufferIndex = 0;
    for(let colorIndex = 0; colorIndex < color.length; colorIndex++) {
        let rgbColor = hexToRgb(color[colorIndex]);

        colorBuffer[bufferIndex++] = rgbColor.r;
        colorBuffer[bufferIndex++] = rgbColor.g;
        colorBuffer[bufferIndex++] = rgbColor.b;
        colorBuffer[bufferIndex++] = 0x00; //I have no idea why there are 4 channels
    }

    return colorBuffer;
}