define(['exports', 'module', 'effects', 'lodash'], function (exports, module, _effects, _lodash) {
    'use strict';

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    var mod = (function () {
        function mod(gfx) {
            _classCallCheck(this, mod);

            this.author = '';
            this.title = '';
            this.effects = [];
            this.gfx = gfx;
            // gfx.set(this, '2d'); // default to 2d
        }

        mod.prototype.update = function update(gfx) {
            // update each effect in this.effects
            _lodash.invoke(this.effects, 'update', gfx);
        };

        mod.prototype.destroy = function destroy(gfx) {
            // remove any datgui controllers that were created for this mod
            for (var i = gfx.conf.gui.__controllers.length - 1; i >= 0; i -= 1) {
                gfx.conf.gui.remove(gfx.conf.gui.__controllers[i]);
            }
        };

        mod.prototype.add_effect = function add_effect(effect_name) {
            var new_effect = new _effects[effect_name](this.gfx);
            this.effects.push(new_effect);
        };

        return mod;
    })();

    module.exports = mod;
});
