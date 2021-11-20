const { buildColorBuffer} = require("./helpers");

module.exports.sendColorToMousepad = function (ledDevice, color) {
    let response;

    try {

        /*
        let one = [
            0x1c, 0x00, //header length (28)
            0x10, 0x20, 0x67, 0x3a, 0x0d, 0xd9, 0xff, 0xff, //IRP ID
            0x00, 0x00, 0x00, 0x00, //IRP USBD_STATUS (success)
            0x0b, 0x00, //URB FUNCTION (class interface)
            0x00, // IRP INFORMATION (direction)
            0x01, 0x00, //URB bus id (1)
            0x0d, 0x00, //device address (13)
            0x80, //endpoint (80)
            0x02, //URB TRANSFER TYPE (urb_control)
            0x08, 0x00, 0x00, 0x00, //packet data length
            0x00, // control transfer stage (Setup:0)
            // ACTUAL DATA
            0xa1, //bmmrequestType
            0x01, // GET_REPORT
            0x01, 0x03, // report id 1, report type 3 (feature)
            0x00, 0x00, //wIndex
            0x05, 0x00]; //length

         */

        /*
        response = ledDevice.getFeatureReport(1, 5); // WORKS
        response = ledDevice.getFeatureReport(2, 19);
        response = ledDevice.getFeatureReport(4, 4);
        response = ledDevice.getFeatureReport(6, 96);
*/

        //endpoint 0
        //response = ledDevice.sendFeatureReport([1, 0x00, 0x00, 0x05, 0x00, 0x01, 0xff, 0x00, 0x00, 0x00]);

        let colorBuffer = buildColorBuffer(color);
        response = ledDevice.sendFeatureReport([3, 0x00, 0x00, 0x09, 0x00].concat(colorBuffer).concat([0xff]));

    } catch (e) {
        console.error(e);
    }

    return;

}

