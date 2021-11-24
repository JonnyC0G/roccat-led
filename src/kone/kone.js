const consts = require('../consts.js')
const helpers = require('../helpers')
const koneHelpers = require('./helpers')
const deviceHelper = require("../deviceHelper");

module.exports = class RoccatKone {
    ledDevice;

    constructor(options) {
        options = options ? options : {};

        console.log("Initialize Kone")
        this.currentColors = ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000'];
        // wheel, inside-left (4 times), inside-right (4 times), outside-left, outside-right

        if (options.productId) {
            this.ledDevice = deviceHelper.getLedDevice('kone', options.productId)
        } else {
            this.ledDevice = deviceHelper.getLedDevice('kone')
        }

        if (options.ready) {
            console.log("Kone is ready")
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
        for (let i = 0; i < this.currentColors.length; i++) {
            this.currentColors[i] = color;
        }
    }

    render() {
        try {
            let colorBuffer = koneHelpers.buildColorBuffer(this.currentColors);

            //this switches to manual light mode
            this.ledDevice.sendFeatureReport([14, 0x00, 0x00, 0x06, 0x00, 0x0e, 0x06, 0x01, 0x01, 0x00, 0xff]);

            //Sets the colors
            this.ledDevice.sendFeatureReport([13, 0x00].concat(colorBuffer));
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