import HID from "node-hid";
import * as consts from "./consts.js";

export function getLedDevice(type: string, productId?: number) {
    let productIds: number[] = productId ? [productId] : consts.getProductIDs(type);
    let usagePage: number | null = consts.getLedUsagePage(type);
    let ledInterface: number = consts.getLedInterface(type);

    //All USB Devices
    const allDevices = HID.devices();

    //Filter Roccat
    let roccatDevices = allDevices.filter(d => (productIds.indexOf(d.productId) != -1));

    //Find LED Interface Number
    let ledDeviceInfo;
    if (usagePage === null) {
        ledDeviceInfo = roccatDevices.find(e => e['interface'] === ledInterface)
    } else {
        ledDeviceInfo = roccatDevices.find(e => e['interface'] === ledInterface && e['usagePage'] === usagePage)
    }

    if (!ledDeviceInfo) {
        const msg: string = 'Could not find LED Device. This products are connected to your computer:'
        console.log(msg)
        const dev = allDevices.filter(d => d.manufacturer && d.manufacturer.toLowerCase() === 'roccat');
        console.log(dev)
        throw(msg)
    }

    //Open LED Device
    return new HID.HID(ledDeviceInfo.path);
}

export function getCtrlDevice(type: string, productId?: number, bruteForce: boolean = false) {
    let productIds = productId ? [productId] : consts.getProductIDs(type);
    let usagePage = consts.getCtrlUsagePage(type);
    let ctrlInterface = consts.getCtrlInterface(type);

    //All USB Devices
    const allDevices = HID.devices();

    //Filter Roccat
    let roccatDevices = allDevices.filter(d => (productIds.indexOf(d.productId) != -1));

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