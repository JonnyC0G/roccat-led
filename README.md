# Roccat Sense API
With this Node Module you can control your Roccat Sense Mousepad. Bring your mousepad to life!

## Background
This module was inspired by the npm package `roccatvulcan` created by Simon Huwiler.
[Link](https://github.com/simonhuwiler/roccatvulcan) to his repo, check out his amazing work.

## Installation
Install per npm  
`npm install roccatsense`  
or clone repository  
`git clone git@github.com:jonnyc0g/roccatsense.git`

## Usage
**Important**: Close your Roccat Swarm App (right click -> close)
```javascript
//Load module
const RoccatSense = require('roccatsense');

//Init Mousepad
let mousepad = new RoccatSense({
    productId: 13371,
    ready: () => {
        console.log('mousepad is ready!');

        sleep(200).then(() => testMethod());
    }
});

function testMethod() {
    mousepad.setColor("#ff00ff");
    mousepad.render();
}
```

## Init Parameters
`productId` (optional)  
The Api will search automatically for your mousepad. Although it may be possible, that your mousepad version is unknown. Then you need to provide a productId. If the mousepad is not found, you will see all possible devices in your terminal. Copy the Id of the corresponding one.

`ready` (optional)  
Callback after keyboard is initialised.

## Render-Methods
When ever you change the colors of a key, the api will store every key in the memory. The api will not send the new colors to the keyboard by itself, you need to **render** the current state. Two methods will help you:
### Single rendering
```javascript
mousepad.render()
```
This will send all the current colors to the keyboard
### Auto rendering
```javascript
mousepad.renderStart(50);
```
This will start continous rendering every 50 millisecond.

```javascript
mousepad.renderStop();
```
Stops the auto renderer.

## Coloring-Methods
**setColor**
```javascript
setColor(color)
```
Will colorize the mousepad. **Be aware**: Only hex-colors are supported. No `blue` or `black`.
```javascript
// Example
mousepad.setColor('#ffcc00');
```

## Projects made with this library
* you could be the first!
* 
Write me to be listed here!