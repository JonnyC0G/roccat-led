const consts = require("../consts");
const helpers = require('../helpers')
module.exports.buildColorBuffer = function(keylist)
{
    //Create empty Array
    let colorbuffer = []
    for(let i = 0; i < consts.NUMKEYS * 3; i++)
    {
        colorbuffer.push({})
    }

    //Fill List
    keylist.forEach((key, i) => {

        // Send colors in groups with 12 values each. First 12x the red, then 12x green, then 12x blue
        const paquet = Math.floor(i / 12)
        const offset = (i % 12) + 36 * paquet;
        colorbuffer[offset] = key.r;
        colorbuffer[offset +  12] = key.g;
        colorbuffer[offset + 24] = key.b;

    })

    return colorbuffer;
}

module.exports.getKeys = function(color)
{
    let keys = [];
    const c = helpers.hexToRgb(color)

    for(let i = 0; i < consts.NUMKEYS; i++)
    {
        keys.push(Object.assign({}, c));
    }
    return keys;
}

module.exports.replaceAll = function(str, search, replacement)
{
    return str.replace(new RegExp(search, 'g'), replacement);
};