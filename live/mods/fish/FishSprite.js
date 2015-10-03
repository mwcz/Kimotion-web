define(["exports", "module", "mods/fish/Sprite", "mods/fish/utils.js", "mods/fish/consts.js"], function (exports, module, _modsFishSprite, _modsFishUtilsJs, _modsFishConstsJs) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var _Sprite2 = _interopRequireDefault(_modsFishSprite);

    var FishSprite = (function (_Sprite) {
        _inherits(FishSprite, _Sprite);

        function FishSprite() {
            _classCallCheck(this, FishSprite);

            _Sprite.call(this);

            // defaults
            this.max_speed = 25;
            this.min_speed = 2;
            this.speed = -10;
            this.direction = _modsFishConstsJs.RIGHT;
            this.x = -1000;
            this.y = 500;
        }

        FishSprite.prototype.resetOffScreen = function resetOffScreen(screenWidth, screenHeight) {
            this.direction = _modsFishUtilsJs.randomIntInclusive(_modsFishConstsJs.LEFT, _modsFishConstsJs.RIGHT);

            if (this.direction == _modsFishConstsJs.LEFT) {
                // reset off right side of screen
                this.x = _modsFishUtilsJs.randomIntInclusive(screenWidth + this.img_width + 100 + this.min_outer_x, screenWidth + this.max_outer_x);
            } else {
                // reset off left side of screen
                this.x = _modsFishUtilsJs.randomIntInclusive(0 - this.max_outer_x, 0 - this.img_width - 100 - this.min_outer_x);
            }

            // set the speed based on direction and type
            this.setSpeed();

            // set the image path based on new direction
            this.setImagePath();

            // random y position taking into account screen height
            this.y = _modsFishUtilsJs.randomIntInclusive(10, screenHeight - this.img_height);
        };

        FishSprite.prototype.logInfo = function logInfo() {
            console.log('FishSprite: ' + this.id + ' ' + this.type + ' ' + this.x + ' ' + this.y + ' ' + this.speed);
        };

        FishSprite.prototype.setImagePath = function setImagePath() {
            this.img_path = 'mods/fish/assets/fish_' + this.type + '_' + (this.direction == _modsFishConstsJs.LEFT ? 'left' : 'right') + '.png';
        };

        FishSprite.prototype.setSpeed = function setSpeed() {
            var abs_speed = _modsFishUtilsJs.randomIntInclusive(this.min_speed, this.max_speed);

            if (this.direction == _modsFishConstsJs.LEFT) {
                this.speed = abs_speed;
            } else {
                this.speed = -abs_speed;
            }
        };

        return FishSprite;
    })(_Sprite2["default"]);

    module.exports = FishSprite;
});
