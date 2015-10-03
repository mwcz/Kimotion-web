define(['exports', 'module', 'mods/fish/utils.js'], function (exports, module, _modsFishUtilsJs) {
    'use strict';

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    var Sprite = (function () {
        function Sprite() {
            _classCallCheck(this, Sprite);

            this.id = 'Sprite-' + _modsFishUtilsJs.randomIntInclusive(1, 1000); // uniqueness not important
            this.img_path;
            this.img_height = 0;
            this.img_width = 0;
            this.x = 0;
            this.y = 0;
            this.img = null;
        }

        Sprite.prototype.centerX = function centerX() {
            return this.x + this.img_width / 2;
        };

        Sprite.prototype.centerY = function centerY() {
            return this.y + this.img_height / 2;
        };

        Sprite.prototype.logInfo = function logInfo() {
            console.log('Sprite: ' + this.id + ' ' + this.x + ' ' + this.y);
        };

        return Sprite;
    })();

    module.exports = Sprite;
});
