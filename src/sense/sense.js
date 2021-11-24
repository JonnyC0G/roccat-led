const consts = require('../consts.js')
const helpers = require('../helpers')
const senseHelpers = require("./helpers");
const deviceHelper = require("../deviceHelper");

module.exports = class RoccatSense {
    ledDevice;

    constructor(options) {
        options = options ? options : {};

        console.log("Initialize Sense")
        this.currentColors = ['#000000', '#000000'];

        if (options.productId) {
            this.ledDevice = deviceHelper.getLedDevice('sense', options.productId)
        } else {
            this.ledDevice = deviceHelper.getLedDevice('sense')
        }

        if (options.ready) {
            console.log("Sense is ready")
            helpers.sleep().then(options.ready);
        }
    }

    setColor(index, color) {
        if (index > this.currentColors.length) {
            console.info("no valid key");
        }
        this.currentColors[index] = color;
    }

    fillAll(color) {
        this.currentColors = [color, color];
    }

    render() {
        try {
            let colorBuffer = senseHelpers.buildColorBuffer(this.currentColors);
            this.ledDevice.sendFeatureReport([3].concat(colorBuffer));
        } catch (e) {
            throw new Error("Error changing Color: ", e);
        }
    }

    renderStart(interval) {
        this.renderStop();

        interval = interval ? interval : consts.ANIMATIONINTERVAL;
        this.autoRender = setInterval(() => this.render(), interval);
    }

    renderStop() {
        if (this.autoRender)
            clearInterval(this.autoRender);
    }

    close() {
        if (this.ledDevice) {
            this.ledDevice.close();
        }
    }
}