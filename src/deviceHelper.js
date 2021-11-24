const HID = require("node-hid");
const consts = require("./consts.js");

module.exports.getLedDevice = function (type, productId) {
    let productIds = productId ? Array.of(productId) : consts.getProductIDs(type);
    let usagePage = consts.getLedUsagePage(type);
    let ledInterface = consts.getLedInterface(type);

    //All USB Devices
    const allDevices = HID.devices();

    //Filter Roccat
    let roccatDevices = allDevices.filter(d => productIds.includes(d.productId));

    //Find LED Interface Number
    let ledDeviceInfo;
    if (usagePage === null) {
        ledDeviceInfo = roccatDevices.find(e => e['interface'] === ledInterface)
    } else {
        ledDeviceInfo = roccatDevices.find(e => e['interface'] === ledInterface && e['usagePage'] === usagePage)
    }

    if (!ledDeviceInfo) {
        const msg = 'Could not find LED Device. This products are connected to your computer:'
        console.log(msg)
        const dev = allDevices.filter(d => d.manufacturer && d.manufacturer.toLowerCase() === 'roccat');
        console.log(dev)
        throw(msg)
    }

    //Open LED Device
    return new HID.HID(ledDeviceInfo.path);
}

module.exports.getCtrlDevice = function (type, productId, bruteForce = false) {
    let productIds = productId ? Array.of(productId) : consts.getProductIDs(type);
    let usagePage = consts.getCtrlUsagePage(type);
    let ctrlInterface = consts.getCtrlInterface(type);

    //All USB Devices
    const allDevices = HID.devices();

    //Filter Roccat
    let roccatDevices = allDevices.filter(d => productIds.includes(d.productId));

    //Find control Interface Number
    let ctrlDeviceInfo;
    let ctrlDevice;
    if (bruteForce) {
        //Find Control Device
        const ctrlDeviceInfos = roccatDevices.filter(e => e['interface'] === ctrlInterface);

        //Bruteforce: Open one by one and look at result.
        for (let i in ctrlDeviceInfos) {
            try {
                ctrlDevice = new HID.HID(ctrlDeviceInfos[i].path);
                let buf = ctrlDevice.getFeatureReport(0x0f, 255);
                if (buf.length > 0) {
                    break;
                }
            } catch (e) {
                //console.error("Could not open device", e)
                // console.log("Could not open device", e)
            }
        }
    } else {
        ctrlDeviceInfo = roccatDevices.find(e => e['interface'] === ctrlInterface && e['usagePage'] === usagePage)
        ctrlDevice = new HID.HID(ctrlDeviceInfo.path);
    }

    if (!ctrlDevice) {
        const msg = 'Could not find control device. This products are connected to your computer:'
        console.log(msg)
        const dev = allDevices.filter(d => d.manufacturer && d.manufacturer.toLowerCase() === 'roccat');
        console.log(dev)
        throw(msg)
    }


    return ctrlDevice;
}