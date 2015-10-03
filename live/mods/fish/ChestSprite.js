define(["exports", "module", "mods/fish/Sprite"], function (exports, module, _modsFishSprite) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var _Sprite2 = _interopRequireDefault(_modsFishSprite);

    var ChestSprite = (function (_Sprite) {
        _inherits(ChestSprite, _Sprite);

        function ChestSprite() {
            _classCallCheck(this, ChestSprite);

            _Sprite.call(this);

            // defaults
            this.x = 500;
            this.y = 50;

            this.img_path = 'mods/fish/assets/chest.png';
            this.img_height = 70;
            this.img_width = 70;
        }

        return ChestSprite;
    })(_Sprite2["default"]);

    module.exports = ChestSprite;
});
