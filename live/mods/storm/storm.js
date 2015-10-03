define(['exports', 'module', 'mod', 'text!./shaders/particle.frag', 'text!./shaders/vertex.vert'], function (exports, module, _mod2, _textShadersParticleFrag, _textShadersVertexVert) {
    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var _mod3 = _interopRequireDefault(_mod2);

    var params = { storminess: 0.5 };

    var storm = (function (_mod) {
        _inherits(storm, _mod);

        function storm(gfx) {
            _classCallCheck(this, storm);

            _mod.call(this, gfx);
            gfx.set(this, '3d');

            gfx.conf.gui.add(params, 'storminess', 0, 0.99).step(0.01).name('storminess');

            this.author = 'Michael Clayton';
            this.title = 'Storm';
            this.add_effect('particles');
            gfx.gl.particles.material.vertexShader = _textShadersVertexVert;
            gfx.gl.particles.material.fragmentShader = _textShadersParticleFrag;
            this.prev_depth = gfx.depth;
        }

        /**
         * Average together two arrays with an optional scale value that weighs one
         * array more highly than the other.
         */

        storm.prototype.update = function update(gfx) {
            // drift particles towards their destinations 10% at a time
            avg(gfx.depth, this.prev_depth, 1 - params.storminess);
            this.prev_depth = gfx.depth;
            _mod.prototype.update.call(this, gfx);
        };

        return storm;
    })(_mod3['default']);

    module.exports = storm;
    function avg(tar1, tar2) {
        var scale = arguments.length <= 2 || arguments[2] === undefined ? 0.5 : arguments[2];

        for (var i = 0; i < tar1.length; i += 1) {
            tar1[i] = scale * tar1[i] + (1 - scale) * tar2[i];
        }
    }
});
