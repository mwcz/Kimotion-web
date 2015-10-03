define(["exports", "module"], function (exports, module) {
    "use strict";

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var Particle = function Particle(position, acceleration, velocity) {
        _classCallCheck(this, Particle);

        // particle vars
        this.position = position;
        this.acceleration = acceleration;
        this.velocity = velocity;
    };

    module.exports = Particle;
});
