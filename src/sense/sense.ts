import * as consts from "../consts.js";
import * as helpers from "../helpers.js";
import * as senseHelpers from "./helpers.js";
import * as deviceHelper from "../deviceHelper.js";
import {Color, DEVICE_TYPES, HexCode} from "../../types.js";

export class RoccatSense {
    private readonly ledDevice;
    private currentColors: Color[];
    private autoRender: NodeJS.Timer | undefined;
    private animateTimers: any;

    constructor(options: { productId?: number, ready?: Function }) {
        options = options ? options : {};

        console.log("Initialize Sense")
        this.currentColors = [new Color(), new Color()];

        if (options.productId !== undefined) {
            this.ledDevice = deviceHelper.getLedDevice(DEVICE_TYPES.sense, options.productId)
        } else {
            this.ledDevice = deviceHelper.getLedDevice(DEVICE_TYPES.sense)
        }

        if (options.ready !== undefined) {
            console.log("Sense is ready")
            // @ts-ignore
            helpers.sleep().then(() => options.ready());
        }
    }

    setColor(index: number, color: HexCode | Color): void {
        if (index > this.currentColors.length) {
            console.info("no valid key");
        }
        if (color instanceof HexCode) {
            this.currentColors[index] = helpers.hexToRgb(color);
        } else {
            this.currentColors[index] = color;
        }
    }

    fillAll(color: HexCode | Color): void {
        if (color instanceof HexCode) {
            this.currentColors = [helpers.hexToRgb(color), helpers.hexToRgb(color)];
        } else {
            this.currentColors = [color, color];
        }
    }

    private animate(colorFrom: HexCode, colorTo: HexCode, duration: number, leds?: number[]): void {
        let start = Date.now();
        let rgbFrom = helpers.hexToRgb(colorFrom);
        let rgbTo = helpers.hexToRgb(colorTo);
        let rgbRunning = Object.assign({}, rgbFrom);

        const rMax = rgbTo.r - rgbFrom.r;
        const gMax = rgbTo.g - rgbFrom.g;
        const bMax = rgbTo.b - rgbFrom.b;

        const timer = setInterval(() => {

            let runningTime = Date.now() - start;
            runningTime = runningTime > duration ? duration : runningTime;

            //Calculate new RGB-Value
            const percentage = 100 / duration * runningTime;
            rgbRunning.r = Math.round(rgbFrom.r + rMax / 100 * percentage);
            rgbRunning.g = Math.round(rgbFrom.g + gMax / 100 * percentage);
            rgbRunning.b = Math.round(rgbFrom.b + bMax / 100 * percentage);

            if (leds) {
                //Send new Values
                for (let i = 0; i < leds.length; i++)
                {
                    this.setColor(i, rgbRunning);
                }
            } else {
                //Send new Value
                this.fillAll(rgbRunning);
                this.render();
            }

            //Clear Timer if duration ends
            if (runningTime >= duration) {
                const t = this.animateTimers.find(e => e === timer)
                if (t)
                    clearInterval(t)
            }

        }, consts.ANIMATIONINTERVAL);
        this.animateTimers.push(timer);
    }

    animateAll(colorFrom: HexCode, colorTo: HexCode, duration: number): void {
        this.animate(colorFrom, colorTo, duration);
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