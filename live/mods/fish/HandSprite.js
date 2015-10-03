define(["exports", "module", "mods/fish/Sprite", "mods/fish/consts.js"], function (exports, module, _modsFishSprite, _modsFishConstsJs) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var _Sprite2 = _interopRequireDefault(_modsFishSprite);

    var HandSprite = (function (_Sprite) {
        _inherits(HandSprite, _Sprite);

        function HandSprite() {
            _classCallCheck(this, HandSprite);

            _Sprite.call(this);

            // hand defaults
            this.img_path = 'mods/fish/assets/hand.png';
            this.img_height = 299;
            this.img_width = 282;

            this.recentSharkBite = false;
            this.img_red_path = 'mods/fish/assets/hand_red.png';
            this.img_red = null;
            this.img_swap_count = _modsFishConstsJs.HAND_IMG_SWAP_DELAY;
            this.is_red = false;
            this.img_red_animated = this.img;

            this.toggle_frames = 0;
        }

        HandSprite.prototype.setRed = function setRed() {
            this.is_red = true;
            this.img_red_animated = this.img_red;
        };

        HandSprite.prototype.setYellow = function setYellow() {
            this.is_red = false;
            this.img_red_animated = this.img;
        };

        HandSprite.prototype.toggleRedAnimatedImg = function toggleRedAnimatedImg() {
            if (!this.is_red) {
                this.setRed();
            } else {
                this.setYellow();
            }
        };

        HandSprite.prototype.resetState = function resetState() {
            this.recentSharkBite = false;
            this.img_swap_count = _modsFishConstsJs.HAND_IMG_SWAP_DELAY;
            this.setYellow();
        };

        return HandSprite;
    })(_Sprite2["default"]);

    module.exports = HandSprite;
});
