let HID = require('node-hid');
const controller = require('./controller.js');
const consts = require('./consts.js')
const {LEDINTERFACE, USAGEPAGE} = require("./consts");

module.exports = class RoccatSense
{
  constructor(options)
  {
    options = options ? options : {};
    
    console.log("Initialize Sense")
    this.currentColor = '#000000';

    //All USB Devices
    const allDevices = HID.devices();

    //Filter Roccat
    const productIds = options.productId ? [options.productId] : consts.PRODUCTIDS;
    let roccatDevices = allDevices.filter(d => productIds.includes(d.productId));

    //Find LED Interface Number (No 0)
    const ledDeviceInfo = roccatDevices.find(e => e['interface'] ===  LEDINTERFACE && e['usagePage'] === USAGEPAGE)

    if(!ledDeviceInfo) 
    {
      const msg = 'Could not find Mousepad (LED Device). You need to update the productId. This products are connected to your computer:'
      console.log(msg)
      const dev = allDevices.filter(d => d.manufacturer && d.manufacturer.toLowerCase() === 'roccat');
      console.log(dev)
      throw(msg)
    }

    //Open LED Device
    this.ledDevice = new HID.HID(ledDeviceInfo.path);

    if(options.ready) {
      options.ready();
    }
  }
  
  setColor(color)
  {
    this.currentColor = color;
  }

  render()
  {
    controller.sendColorToMousepad(this.ledDevice, this.currentColor);
  }

  close()
  {
    if(this.ledDevice)
    {
      this.ledDevice.close();
    }
  }

  renderStart(interval)
  {
    this.renderStop();

    interval = interval ? interval : consts.ANIMATIONINTERVAL;
    this.autoRender = setInterval(() => this.render(), interval);
  }

  renderStop()
  {
    if(this.autoRender)
      clearInterval(this.autoRender);
  }

}