define(["exports"], function (exports) {
    "use strict";

    exports.__esModule = true;

    var state = {};

    function clear() {
        state = {};
    }

    function current() {
        return state;
    }

    exports.clear = clear;
    exports.current = current;
});
