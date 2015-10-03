define(['exports', 'module', 'mod'], function (exports, module, _mod2) {
    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var _mod3 = _interopRequireDefault(_mod2);

    var torus = (function (_mod) {
        _inherits(torus, _mod);

        function torus(gfx) {
            _classCallCheck(this, torus);

            _mod.call(this, gfx);
            gfx.set(this, '3d');
            this.author = 'Michael Clayton';
            this.title = 'Torus';
            this.add_effect('torus');

            for (var i = 0; i < gfx.gl.geometry.faces.length; i += 2) {
                var hex = Math.random() * 0xffffff;
                gfx.gl.geometry.faces[i].color.setHex(hex);
                gfx.gl.geometry.faces[i + 1].color.setHex(hex);
            }

            this.last_depth = gfx.depth;
            this.rotation = 0.01;
        }

        torus.prototype.update = function update(gfx) {
            var scale = 0.1; // new depth gets this much weight
            var dsum = 0;
            for (var i = 0; i < gfx.depth.length; i += 1) {
                dsum += Math.abs(this.last_depth[i] - gfx.depth[i]);
            }
            this.rotation = (1 - scale) * this.rotation + scale * dsum / 1e8;
            gfx.gl.torus.rotation.y += this.rotation;
            gfx.gl.torus.rotation.x += this.rotation;
            this.last_depth = gfx.depth;

            _mod.prototype.update.call(this, gfx);
        };

        return torus;
    })(_mod3['default']);

    module.exports = torus;
});
