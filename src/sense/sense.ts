import * as consts from "../consts.js";
import * as helpers from "../helpers.js";
import * as senseHelpers from "./helpers.js";
import * as deviceHelper from "../deviceHelper.js";

export class RoccatSense {
    private readonly ledDevice;
    private currentColors: { r: number, g: number, b: number }[];
    private autoRender: NodeJS.Timer | undefined;

    constructor(options: { productId?: number, ready?: Function }) {
        options = options ? options : {};

        console.log("Initialize Sense")
        this.currentColors = [helpers.hexToRgb('#000000'), helpers.hexToRgb('#000000')];

        if (options.productId !== undefined) {
            this.ledDevice = deviceHelper.getLedDevice('sense', options.productId)
        } else {
            this.ledDevice = deviceHelper.getLedDevice('sense')
        }

        if (options.ready !== undefined) {
            console.log("Sense is ready")
            // @ts-ignore
            helpers.sleep().then(() => options.ready());
        }
    }

    setColor(index: number, color: string | { r: number, g: number, b: number }): void {
        if (index > this.currentColors.length) {
            console.info("no valid key");
        }
        if (typeof color === 'string') {
            this.currentColors[index] = helpers.hexToRgb(color);
        } else {
            this.currentColors[index] = color;
        }
    }

    fillAll(color: string | { r: number, g: number, b: number }): void {
        if (typeof color === 'string') {
            this.currentColors = [helpers.hexToRgb(color), helpers.hexToRgb(color)];
        } else {
            this.currentColors = [color, color];
        }
    }

    render(): void {
        try {
            let colorBuffer = senseHelpers.buildColorBuffer(this.currentColors);
            this.ledDevice.sendFeatureReport([3].concat(colorBuffer));
        } catch (e) {
            throw new Error(`Error changing Color: ${e}`);
        }
    }

    renderStart(interval: number): void {
        this.renderStop();

        interval = interval ? interval : consts.ANIMATIONINTERVAL;
        this.autoRender = setInterval(() => this.render(), interval);
    }

    renderStop(): void {
        if (this.autoRender)
            clearInterval(this.autoRender);
    }

    close(): void {
        if (this.ledDevice) {
            this.ledDevice.close();
        }
    }
}