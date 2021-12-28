//ProductInfo

// TODO: convert to enum
export const DEVICETYPES: string[] = ['sense', 'vulcan', 'kone'];
// TODO: create rgb-type
// TODO: create hex-type

// Khan
const KHAN_PRODUCT_IDS: number[] = [14800];
const KHAN_LED_INTERFACE: number = 3;
const KHAN_LED_USAGEPAGE: number = 12;

// Kone
const KONE_PRODUCT_IDS: number[] = [11815];
const KONE_LED_INTERFACE: number = 0;
const KONE_LED_USAGEPAGE: number = 11;

// Sense
const SENSE_PRODUCT_IDS: number[] = [13371];
const SENSE_LED_INTERFACE: number = 0;
const SENSE_LED_USAGEPAGE: number = 65281;

// Vulcan
const VULCAN_PRODUCT_IDS: number[] = [
    12410, /*Vulcan 100*/
    12440 /*Vulcan 120*/
]
const VULCAN_LED_INTERFACE: number = 3;
const VULCAN_CTRL_INTERFACE: number = 1;
const VULCAN_CTRL_USAGEPAGE: number = 10;

//Animation interval for animateKeys()
export const ANIMATIONINTERVAL: number = 10;
//Space between keys in marquee()
export const SPACEBETWEENCHARS: number = 2;
//No Key Key
export const NOKEY: number = -1;
//Number of Keys
export const NUMKEYS: number = 144;

export function getProductIDs(type: string): number[] {
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
            throw new Error("specified device type not found. possible device types are: " + DEVICETYPES.join(', '));
    }
}

export function getLedInterface(type: string): number {
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
            throw new Error("specified device type not found. possible device types are: " + DEVICETYPES.join(', '));
    }
}

export function getCtrlInterface(type: string): number {
    switch (type) {
        case 'sense':
        case 'kone':
        case 'khan':
            throw new Error("specified device does has no implemented controls");
        case 'vulcan':
            return VULCAN_CTRL_INTERFACE;
        default:
            throw new Error("specified device type not found. possible device types are: " + DEVICETYPES.join(', '));
    }
}

export function getLedUsagePage(type: string): number | null {
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
            throw new Error("specified device type not found. possible device types are: " + DEVICETYPES.join(', '));
    }
}

export function getCtrlUsagePage(type: string): number | null {
    switch (type) {
        case 'sense':
        case 'kone':
        case 'khan':
            return null;
        case 'vulcan':
            return VULCAN_CTRL_USAGEPAGE;
        default:
            throw new Error("specified device type not found. possible device types are: " + DEVICETYPES.join(', '));
    }
}


