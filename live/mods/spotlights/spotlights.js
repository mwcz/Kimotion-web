define(['exports', 'module', 'threejs', 'mod', 'text!./shaders/particle.frag', 'text!./shaders/vertex.vert'], function (exports, module, _threejs, _mod2, _textShadersParticleFrag, _textShadersVertexVert) {
    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var _THREE = _interopRequireDefault(_threejs);

    var _mod3 = _interopRequireDefault(_mod2);

    var params = { spot_0_speed: 1, spot_1_speed: 1.1, spot_radius: 50, spot_brightness: 2, background_alpha: 0.2 };

    var spotlights = (function (_mod) {
        _inherits(spotlights, _mod);

        function spotlights(gfx) {
            _classCallCheck(this, spotlights);

            _mod.call(this, gfx);
            gfx.set(this, '3d');

            this.author = 'Densaugeo';
            this.title = 'spotlights';

            gfx.conf.gui.add(params, 'spot_0_speed', 0.1, 10).step(0.1).name('Spot 0 Speed');
            gfx.conf.gui.add(params, 'spot_1_speed', 0.1, 10).step(0.1).name('Spot 1 Speed');
            gfx.conf.gui.add(params, 'spot_radius', 0, 100).step(1).name('Spot Radius');
            gfx.conf.gui.add(params, 'spot_brightness', 0, 10).step(0.1).name('Spot Bright'); // 'Spot Brightness' glitches in UI
            gfx.conf.gui.add(params, 'background_alpha', 0, 1).step(0.01).name('Back Alpha');

            this.add_effect('particles');
            gfx.gl.particles.material.vertexShader = _textShadersVertexVert;
            gfx.gl.particles.material.fragmentShader = _textShadersParticleFrag;

            gfx.gl.particles.material.uniforms.spot_radius = { type: 'f', value: params.spot_radius };
            gfx.gl.particles.material.uniforms.spot_brightness = { type: 'f', value: params.spot_brightness };
            gfx.gl.particles.material.uniforms.background_alpha = { type: 'f', value: params.background_alpha };

            gfx.gl.particles.material.uniforms.spot_0_x = { type: 'f', value: 0 };
            gfx.gl.particles.material.uniforms.spot_0_y = { type: 'f', value: 0 };

            gfx.gl.particles.material.uniforms.spot_1_x = { type: 'f', value: 0 };
            gfx.gl.particles.material.uniforms.spot_1_y = { type: 'f', value: 0 };

            // set custom colors
            gfx.gl.particles.set_near_color('#FFFFFF');
            gfx.gl.particles.set_mid_color('#00FFFF');
            gfx.gl.particles.set_far_color('#000000'); // Not used, idk how to remove this from UI so I set it to 0
        }

        spotlights.prototype.update = function update(gfx) {
            gfx.gl.particles.material.uniforms.spot_radius.value = params.spot_radius;
            gfx.gl.particles.material.uniforms.spot_brightness.value = params.spot_brightness;
            gfx.gl.particles.material.uniforms.background_alpha.value = params.background_alpha;

            // Simple parametric formula to move the spots in circles
            gfx.gl.particles.material.uniforms.spot_0_x.value = 150 * Math.sin(Date.now() / 1000 * params.spot_0_speed) + 100;
            gfx.gl.particles.material.uniforms.spot_0_y.value = 150 * Math.cos(Date.now() / 1000 * params.spot_0_speed);

            gfx.gl.particles.material.uniforms.spot_1_x.value = 150 * Math.sin(Date.now() / 1000 * params.spot_1_speed) - 100;
            gfx.gl.particles.material.uniforms.spot_1_y.value = 150 * Math.cos(Date.now() / 1000 * params.spot_1_speed);

            _mod.prototype.update.call(this, gfx);
        };

        return spotlights;
    })(_mod3['default']);

    module.exports = spotlights;
});
