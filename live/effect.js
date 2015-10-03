define(["exports", "module"], function (exports, module) {
    "use strict";

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var effect = (function () {
        function effect() {
            _classCallCheck(this, effect);
        }

        effect.prototype.update = function update() {};

        effect.prototype.destroy = function destroy() {};

        return effect;
    })();

    module.exports = effect;
});
