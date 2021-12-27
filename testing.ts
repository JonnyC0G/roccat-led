import {RoccatSense, RoccatVulcan, RoccatKone} from "./index";

let mouse = new RoccatKone({
        ready: () => {
            mouse.fillAll("#ff0000");
            mouse.render();
        }
    }
);

let mousepad = new RoccatSense({
        ready: () => {
            mousepad.fillAll("#ff0000");
            mousepad.render();
        }
    }
);

let keyboard = new RoccatVulcan({
        layout: 'de-de',
        ready: () => {
            keyboard.fillAll("#ff0000");
            keyboard.render();
        }
    }
)


