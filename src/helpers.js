module.exports.hexToRgb = function (hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;

}

module.exports.sleep = function sleep(time = 200) {
    return new Promise((resolve, reject) => setTimeout(() => resolve(), time));
}
