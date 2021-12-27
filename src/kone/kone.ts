import * as helpers from "../helpers";
import * as koneHelpers from "./helpers";
import * as consts from "../consts";
import * as deviceHelper from "../deviceHelper";

export class RoccatKone {
    private readonly ledDevice;
    private currentColors: { r: number, g: number, b: number }[];
    private autoRender: NodeJS.Timer;

    constructor(options: { productId?: number, ready?: Function }) {
        options = options ? options : {productId: null, ready: null};

        console.log("Initialize Kone")
        this.currentColors = [];
        for (let i: number = 0; i < 11; i++) {
            this.currentColors[i] = helpers.hexToRgb('#000000')
        }
        // wheel, inside-left (4 times), inside-right (4 times), outside-left, outside-right

        if (options.productId) {
            this.ledDevice = deviceHelper.getLedDevice('kone', options.productId)
        } else {
            this.ledDevice = deviceHelper.getLedDevice('kone')
        }

        if (options.ready) {
            console.log("Kone is ready")
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
        let rgbColor: { r: number, g: number, b: number };
        if (typeof color === 'string') {
            rgbColor = helpers.hexToRgb(color);
        } else {
            rgbColor = color;
        }

        for (let i = 0; i < this.currentColors.length; i++) {
            this.currentColors[i] = rgbColor;
        }
    }

    render(): void {
        try {
            let colorBuffer = koneHelpers.buildColorBuffer(this.currentColors);

            //this switches to manual light mode
            this.ledDevice.sendFeatureReport([14, 0x00, 0x00, 0x06, 0x00, 0x0e, 0x06, 0x01, 0x01, 0x00, 0xff]);

            //Sets the colors
            this.ledDevice.sendFeatureReport([13, 0x00].concat(colorBuffer));
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