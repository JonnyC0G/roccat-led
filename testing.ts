import {RoccatSense, RoccatVulcan, RoccatKone} from "./index.js";
import {HexCode} from "./types.js";

let mouse = new RoccatKone({
        ready: () => {
            mouse.fillAll(new HexCode("#ff0000"));
            mouse.render();
        }
    }
);

let mousepad = new RoccatSense({
        ready: () => {
            mousepad.fillAll(new HexCode("#ff0000"));
            mousepad.render();
        }
    }
);

let keyboard = new RoccatVulcan({
        layout: 'de-de',
        ready: () => {
            keyboard.fillAll(new HexCode("#ff0000"));
            keyboard.render();
        }
    }
)


