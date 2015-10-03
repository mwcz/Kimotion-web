define(["exports", "module", "mods/fish/FishSprite", "mods/fish/utils.js", "mods/fish/consts.js"], function (exports, module, _modsFishFishSprite, _modsFishUtilsJs, _modsFishConstsJs) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var _FishSprite2 = _interopRequireDefault(_modsFishFishSprite);

    var GoldFishSprite = (function (_FishSprite) {
        _inherits(GoldFishSprite, _FishSprite);

        function GoldFishSprite() {
            _classCallCheck(this, GoldFishSprite);

            _FishSprite.call(this);

            this.type = _modsFishConstsJs.GOLD;

            this.max_outer_x = 8000;
            this.min_outer_x = 5000;

            this.img_height = 222;
            this.img_width = 299;

            this.max_speed = 16;
            this.min_speed = 11;

            this.coin_num = 10; // how many coins does the fish release

            this.value = 1000;
        }

        return GoldFishSprite;
    })(_FishSprite2["default"]);

    module.exports = GoldFishSprite;
});
