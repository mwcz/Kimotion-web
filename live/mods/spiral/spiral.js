define(['exports', 'module', 'threejs', 'mod', 'lodash', 'text!./shaders/particle.frag', 'text!./shaders/vertex.vert'], function (exports, module, _threejs, _mod2, _lodash, _textShadersParticleFrag, _textShadersVertexVert) {
    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var _THREE = _interopRequireDefault(_threejs);

    var _mod3 = _interopRequireDefault(_mod2);

    var params = { spiral_strength: 40.0, smoothing: 0.5 };

    var spiral = (function (_mod) {
        _inherits(spiral, _mod);

        function spiral(gfx) {
            _classCallCheck(this, spiral);

            _mod.call(this, gfx);
            gfx.set(this, '3d');

            gfx.conf.gui.add(params, 'spiral_strength', 0, 500.0).step(1).name('Spiral Strength').onChange(_lodash.partial(this.updateUniform, gfx));

            gfx.conf.gui.add(params, 'smoothing', 0, 0.99).step(0.01).name('Smoothing');

            this.author = 'Kevin Howell';
            this.title = 'Spiral';
            this.add_effect('particles');
            this.updateUniform(gfx);
            gfx.gl.particles.material.vertexShader = _textShadersVertexVert;
            gfx.gl.particles.material.fragmentShader = _textShadersParticleFrag;
            gfx.gl.particles.material.blending = _THREE['default'].AdditiveBlending;

            // use some preset colors
            gfx.gl.particles.set_near_color('#e56b00');
            gfx.gl.particles.set_mid_color('#280072');
            gfx.gl.particles.set_far_color('#02020c');

            this.prev_depth = gfx.depth;
        }

        /**
         * Average together two arrays with an optional scale value that weighs one
         * array more highly than the other.
         */

        spiral.prototype.updateUniform = function updateUniform(gfx) {
            gfx.gl.particles.system.material.uniforms.spiral_strength = {
                type: 'f', value: params.spiral_strength
            };
            gfx.gl.particles.system.material.needsUpdate = true;
        };

        spiral.prototype.update = function update(gfx) {
            avg(gfx.depth, this.prev_depth, 1 - params.smoothing);
            this.prev_depth = gfx.depth;
            _mod.prototype.update.call(this, gfx);
        };

        return spiral;
    })(_mod3['default']);

    module.exports = spiral;
    function avg(tar1, tar2) {
        var scale = arguments.length <= 2 || arguments[2] === undefined ? 0.5 : arguments[2];

        for (var i = 0; i < tar1.length; i += 1) {
            tar1[i] = scale * tar1[i] + (1 - scale) * tar2[i];
        }
    }
});
