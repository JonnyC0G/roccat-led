# `roccat-led` is an extended version of [`roccatvulcan`](https://github.com/simonhuwiler/roccatvulcan) by Simon Huwiler
With this Node Module you can control your ROCCAT devices. Bring your setup to life!

## Background
This module was inspired by the npm package `roccatvulcan` created by Simon Huwiler.
[Link](https://github.com/simonhuwiler/roccatvulcan) to his repo, check out his amazing work.
<br>This module not only supports *Vulcan AIMO* keyboards, but also *Sense AIMO* mousepads and *Kone AIMO* mouse. If you want to integrate even more devices feel free to contribute!

## Versions
### `0.2.8`
Added color types for safer use
```javascript
let color = new HexColor("#00ff00");
mousepad.fillAll(color);
```
Added animation for sense and kone

### `0.2.6`
Added typescript definitions

### `0.2.1`
initial release

## Installation
Install per npm  
`npm install roccat-led`  
or clone repository  
`git clone git@github.com:jonnyc0g/roccat-led.git`

## Usage
**Important**:
- Set you Sense-Illumination Mode to "Custom"
- Close your Roccat Swarm App (right click -> close)
```javascript
//Load module
import { RoccatKone, RoccatSense, RoccatVulcan } from "roccat-led/dist/index.js";

let mouse = new RoccatKone({
        ready: () => {
            mouse.fillAll("#00ff00"); // mouse.fillAll(new HexCode("#00ff00") since module version 0.2.8
            mouse.render();
        }
    }
);

let mousepad = new RoccatSense({
        ready: () => {
            mousepad.fillAll("#00ff00");
            mousepad.render();
        }
    }
);

let keyboard = new RoccatVulcan({
        layout: 'de-de',
        ready: () => {
            keyboard.fillAll("#00ff00");
            keyboard.render();
        }
    }
)
```

## Init Parameters
`productId` (optional)  
The Api will search automatically for your device. Although it may be possible, that your devices version is unknown. Then you need to provide a productId. If the device is not found, you will see all possible devices in your terminal. Copy the Id of the corresponding one.

`ready` (optional)  
Callback after device is initialised.

## Interaction-Methods
### General

#### Setting color
```javascript
fillAll(color);
```
Will colorize the device. **Be aware**: Only hex-colors are supported. No `blue` or `black`. Since version `0.2.8` only HexCode-Objects

When ever you change the colors of a key, the api will store every key in the memory. The api will not send the new colors to the keyboard by itself, you need to **render** the current state. Two methods will help you:
#### Single rendering
```javascript
mousepad.render()
```
This will send all the current colors to the keyboard
#### Auto rendering
```javascript
mousepad.renderStart(50);
```
This will start continous rendering every 50 millisecond.

```javascript
mousepad.renderStop();
```
Stops the auto renderer.

### For ROCCAT Sense AIMO
<details>

Sense contains 2 seperated LED, they can be set using<br>
**setColor(index, color)**
```javascript
// index can be 0-1: left, right
setColor(index, color);
```
</details>

### For ROCCAT Kone AIMO
<details>

Kone contains 11 seperated LED, they can be set using<br>
**setColor(index, color)**
```javascript
// index can be 0-10: wheel, inside-left (4 times), inside-right (4 times), outside-left, outside-right
setColor(index, color);
```
</details>

### For ROCCAT Vulcan AIMO
<details>

**Update Keys**
```javascript
updateKey(key, colors)
updateKey(key, colors, backgroundColor)
```
Will only update the given keys, all other keys will remain the same. Except: `backgroundColor` is given!  
Params:
* `keys`: List of Keys
* `color`: New color in hex
* `backgroundColor`: optional. Changes the color of all other keys


```javascript
// Example
keyboard.updateKeys(['W', 'A', 'S' ,'D'], '#ff0000')
```
**Update Key**
```javascript
updateKey(key, colors)
updateKey(key, colors, backgroundColor)
```
Same as `updateKeys` but takes only one key.
```javascript
// Example
keyboard.updateKeys('W', '#ff0000')
```

**Animate Keys**
```javascript
animateKeys(keys, colorFrom, colorTo, duration)
```
Creates a transition between two colors. Be aware: Auto Rendering needs to be running!  
Params:
* `keys`: List of Keys to animate
* `colorFrom`: Start color
* `colorTo`: End Color
* `duration`: Duration in Miliseconds

```javascript
// Example
keyboard.animateKeys(['W', 'A', 'S', 'D'], '#000000', '#ff0000', 1000);
```

**Animate Key**
```javascript
animateKey(key, colorFrom, colorTo, duration)
```
Same as above with single key
```javascript
// Example
keyboard.animateKeys('W', '#000000', '#ff0000', 1000);
```

**Write Text (Experimental!)**
```javascript
write(text, color, keyOffset)
```
Writes given Text on the keyboard. **Only a few keys are currently supported! Have a look at**
[vulcan/keyboardlayout/ch-de/alphabet.js](./src/vulcan/keyboardlayout/ch-de/alphabet.js)
```javascript
// Example
keyboard.write("ANNA", '#ff0000', 20)
```

**Marquee (Experimental!)**
```javascript
marquee(text, color, speed)
```

Writes text the same way as `write` but let the text scroll over the keyboard. Like the old HTML-Tag `marquee`. **Only a few keys are currently supported! Have a look at** [vulcan/keyboardlayout/ch-de/alphabet.js](./src/vulcan/keyboardlayout/ch-de/alphabet.js)
```javascript
// Example
keyboard.marquee("ANNA", '#ff0000', 200);
```

## AnimationQueue
You can queue animations and run them at will. Use the AnimationQueue for that purpose.

### Add Animation to Queue
```javascript
keyboard.animationQueueAdd(animation, timeout);
```
Params:
* `animation`: Function which will be triggered.
* `timeout`: After how many milliseconds **after the last animation** this animation should be triggered

### Start Animation Queue
```javascript
keyboard.animationQueueStart(onFinish)
```
Starts the Animation Queue and will trigger `onFinish` after all animations have finished

### Stop and Clear Animation Queue
```javascript
keyboard.animationQueueStop()
```

### Example
This will change the colors of the Keys AWSD.
```javascript
keyboard.animationQueueAdd(() => this.keyboard.animateKeys(['W', 'A', 'S', 'D'], '#000000', '#ffcc00', 2000), 0);
keyboard.animationQueueAdd(() => this.keyboard.animateKeys(['W', 'A', 'S', 'D'], '#ffcc00', '#3224ee', 2000), 2000);
keyboard.animationQueueAdd(() => this.keyboard.animateKeys(['W', 'A', 'S', 'D'], '#3224ee', '#d324ee', 2000), 2000);
keyboard.animationQueueAdd(() => this.keyboard.animateKeys(['W', 'A', 'S', 'D'], '#d324ee', '#55bc18', 2000), 2000);
keyboard.animationQueueStart();
```

## Get Key Pressed event
To get the key press event, you can bind an event to the `onData` option on initialisation:
```javascript
//Init Keyboard
keyboard = new RoccatVulcan({
  productId: 12440,
  layout: 'ch-de',
  onData: data => {
    console.log("Key", data.key);
    console.log("State", data.state);
  }
});
```
The data parameter is an object with two states:
* `key`: The key pressed
* `state`: The state: 1 = pressed, 0 = released


## Turn of a Key
To turn of a key, you need to send the color (#000000) black to the keyboard.
```javascript
keyboard.fillAll('#000000');
```

## Grid
Sometimes you want to access your key by its position on the keyboard, instead of its value. Use the `grid` where each key is in a cell.
```javascript
var grid = keyboard.getGrid();
```  
Returns a multi array. Have a look at the file [src/vulcan/keyboardlayout/ch-de/grid.js](./src/vulcan/keyboardlayout/ch-de/grid.js)

To change the color of the first row (`ESC, F1, F2`...) use it this way:
```javascript
var grid = keyboard.getGrid();
keyboard.animateKeys(grid[0], '#000000', '#ff0000', 1000)
```

</details>

## Projects made with this library
* you could be the first!
* 
Write me to be listed here!
