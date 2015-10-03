define(["exports", "module", "mods/fish/FishSprite", "mods/fish/utils.js", "mods/fish/consts.js"], function (exports, module, _modsFishFishSprite, _modsFishUtilsJs, _modsFishConstsJs) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var _FishSprite2 = _interopRequireDefault(_modsFishFishSprite);

    var BlueFishSprite = (function (_FishSprite) {
        _inherits(BlueFishSprite, _FishSprite);

        function BlueFishSprite() {
            _classCallCheck(this, BlueFishSprite);

            _FishSprite.call(this);

            this.type = _modsFishConstsJs.BLUE;

            this.max_outer_x = 600;
            this.min_outer_x = 0;

            this.img_height = 222;
            this.img_width = 299;

            this.max_speed = 6;
            this.min_speed = 2;

            this.coin_num = 1; // how many coins does the fish release
        }

        return BlueFishSprite;
    })(_FishSprite2["default"]);

    module.exports = BlueFishSprite;
});
