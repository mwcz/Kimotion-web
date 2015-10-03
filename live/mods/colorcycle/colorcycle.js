define(['exports', 'module', 'threejs', 'tinycolor', 'mod', 'text!./shaders/particle.frag', 'text!./shaders/vertex.vert'], function (exports, module, _threejs, _tinycolor, _mod2, _textShadersParticleFrag, _textShadersVertexVert) {
    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var _THREE = _interopRequireDefault(_threejs);

    var _color = _interopRequireDefault(_tinycolor);

    var _mod3 = _interopRequireDefault(_mod2);

    var colorcycle = (function (_mod) {
        _inherits(colorcycle, _mod);

        function colorcycle(gfx) {
            _classCallCheck(this, colorcycle);

            _mod.call(this, gfx);
            gfx.set(this, '3d');
            this.author = 'Michael Clayton';
            this.title = 'Color Cycle';
            this.add_effect('particles');

            // use custom shaders
            gfx.gl.particles.material.vertexShader = _textShadersVertexVert;
            gfx.gl.particles.material.fragmentShader = _textShadersParticleFrag;

            gfx.gl.particles.set_near_color('#e60073');
            gfx.gl.particles.set_mid_color('#004116');
            gfx.gl.particles.set_far_color('#110c00');
        }

        colorcycle.prototype.update = function update(gfx) {
            // get starting colors
            var near_color = _color['default'].fromRatio(gfx.gl.particles.material.uniforms.near_color.value);
            var mid_color = _color['default'].fromRatio(gfx.gl.particles.material.uniforms.mid_color.value);
            var far_color = _color['default'].fromRatio(gfx.gl.particles.material.uniforms.far_color.value);

            // spin hues
            near_color = near_color.spin(0.6);
            mid_color = mid_color.spin(0.6);
            far_color = far_color.spin(0.6);

            // set new colors
            gfx.gl.particles.set_near_color(near_color._r / 255, near_color._g / 255, near_color._b / 255);
            gfx.gl.particles.set_mid_color(mid_color._r / 255, mid_color._g / 255, mid_color._b / 255);
            gfx.gl.particles.set_far_color(far_color._r / 255, far_color._g / 255, far_color._b / 255);

            _mod.prototype.update.call(this, gfx);
        };

        return colorcycle;
    })(_mod3['default']);

    module.exports = colorcycle;
});
