define(["exports", "module", "mods/fish/Particle"], function (exports, module, _modsFishParticle) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var _Particle2 = _interopRequireDefault(_modsFishParticle);

    var CoinParticle = (function (_Particle) {
        _inherits(CoinParticle, _Particle);

        function CoinParticle(position, acceleration, velocity) {
            _classCallCheck(this, CoinParticle);

            _Particle.call(this, position, acceleration, velocity);

            // default coin values
            this.value = 200;
            this.img_height = 196;
            this.img_width = 200;

            // particle vars
            this.x = position.x;
            this.y = position.y;
        }

        /**
         * updates the particles position and velocity
         */

        CoinParticle.prototype.update = function update() {
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);

            // for convenience
            this.x = this.position.x;
            this.y = this.position.y;
        };

        return CoinParticle;
    })(_Particle2["default"]);

    module.exports = CoinParticle;
});
