const {hexToRgb} = require("../helpers");
module.exports.buildColorBuffer = function (currentColors) {
    let colorBuffer = Array(currentColors.length*4).fill({});

    let index = 0;
    for(let colorIndex = 0; colorIndex < currentColors.length; colorIndex++) {
        //Create empty Array
        let rgbColor = hexToRgb(currentColors[colorIndex]);

        colorBuffer[index++] = rgbColor.r;
        colorBuffer[index++] = rgbColor.g;
        colorBuffer[index++] = rgbColor.b;
        colorBuffer[index++] = 0xff;
    }
    return colorBuffer;
}