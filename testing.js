const RoccatSense = require("./src");

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

function sleep() {
    return new Promise((resolve, reject) => setTimeout(() => resolve(), 200));
}