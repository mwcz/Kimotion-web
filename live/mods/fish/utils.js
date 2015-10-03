define(["exports"], function (exports) {
    // Returns a random integer between min (included) and max (included)
    // Using Math.round() will give you a non-uniform distribution!
    "use strict";

    exports.__esModule = true;
    exports.randomIntInclusive = randomIntInclusive;

    function randomIntInclusive(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
});
