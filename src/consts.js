//ProductInfo

module.exports.DEVICETYPES = [ 'sense', 'vulcan', 'kone' ]

// Khan
const KHAN_PRODUCT_IDS = [14800];
const KHAN_LED_INTERFACE = 3;
const KHAN_LED_USAGEPAGE = 12;

// Kone
const KONE_PRODUCT_IDS = [11815];
const KONE_LED_INTERFACE = 0;
const KONE_LED_USAGEPAGE = 11;

// Sense
const SENSE_PRODUCT_IDS = [13371];
const SENSE_LED_INTERFACE = 0;
const SENSE_LED_USAGEPAGE = 65281;

// Vulcan
const VULCAN_PRODUCT_IDS = [
    12410, /*Vulcan 100*/
    12440 /*Vulcan 120*/
]
const VULCAN_LED_INTERFACE = 3;
const VULCAN_CTRL_INTERFACE = 1;
const VULCAN_CTRL_USAGEPAGE = 10;

//Animation interval for animateKeys()
module.exports.ANIMATIONINTERVAL = 10;
//Space between keys in marquee()
module.exports.SPACEBETWEENCHARS = 2;
//No Key Key
module.exports.NOKEY = -1;
//Number of Keys
module.exports.NUMKEYS = 144;

module.exports.getProductIDs = function (type) {
    switch (type) {
        case 'sense':
            return SENSE_PRODUCT_IDS;
        case 'vulcan':
            return VULCAN_PRODUCT_IDS;
        case 'kone':
            return KONE_PRODUCT_IDS;
        case 'khan':
            return KHAN_PRODUCT_IDS;
        default:
            throw new Error("specified device type not found. possible device types are: " + String.join(", ", this.DEVICETYPES));
    }
}

module.exports.getLedInterface = function (type) {
    switch (type) {
        case 'sense':
            return SENSE_LED_INTERFACE;
        case 'vulcan':
            return VULCAN_LED_INTERFACE;
        case 'kone':
            return KONE_LED_INTERFACE;
        case 'khan':
            return KHAN_LED_INTERFACE;
        default:
            throw new Error("specified device type not found. possible device types are: " + String.join(", ", this.DEVICETYPES));
    }
}

module.exports.getCtrlInterface = function (type) {
    switch (type) {
        case 'sense':
        case 'kone':
        case 'khan':
            throw new Error("specified device does has no implemented controls");
        case 'vulcan':
            return VULCAN_CTRL_INTERFACE;
        default:
            throw new Error("specified device type not found. possible device types are: " + String.join(", ", this.DEVICETYPES));
    }
}

module.exports.getLedUsagePage = function (type) {
    switch (type) {
        case 'sense':
            return SENSE_LED_USAGEPAGE;
        case 'kone':
            return KONE_LED_USAGEPAGE;
        case 'khan':
            return KHAN_LED_USAGEPAGE;
        case 'vulcan':
            return null;
        default:
            throw new Error("specified device type not found. possible device types are: " + String.join(", ", this.DEVICETYPES));
    }
}

module.exports.getCtrlUsagePage = function (type) {
    switch (type) {
        case 'sense':
        case 'kone':
        case 'khan':
            return null;
        case 'vulcan':
            return VULCAN_CTRL_USAGEPAGE;
        default:
            throw new Error("specified device type not found. possible device types are: " + String.join(", ", this.DEVICETYPES));
    }
}


