define(['exports', 'module', 'threejs', 'mod', 'text!./shaders/particle.frag', 'text!./shaders/vertex.vert'], function (exports, module, _threejs, _mod2, _textShadersParticleFrag, _textShadersVertexVert) {
    'use strict';

    var _bind = Function.prototype.bind;

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var _THREE = _interopRequireDefault(_threejs);

    var _mod3 = _interopRequireDefault(_mod2);

    var params = {
        spot_0_speed: 0.5,
        spot_1_speed: 1.0,
        spot_radius: 100,
        spot_brightness: 10,
        background_alpha: 0,
        overlay_color: '#FFFFFF',
        storminess: 0.5
    };

    var spotlights = (function (_mod) {
        _inherits(spotlights, _mod);

        function spotlights(gfx) {
            _classCallCheck(this, spotlights);

            _mod.call(this, gfx);
            gfx.set(this, '3d');

            this.author = 'Densaugeo & MC';
            this.title = 'Portal';

            gfx.conf.gui.add(params, 'spot_0_speed', 0.1, 10).step(0.1).name('Spot 0 Speed');
            gfx.conf.gui.add(params, 'spot_1_speed', 0.1, 10).step(0.1).name('Spot 1 Speed');
            gfx.conf.gui.add(params, 'spot_radius', 0, 200).step(1).name('Spot Radius');
            gfx.conf.gui.add(params, 'spot_brightness', 0, 10).step(0.1).name('Spot Bright'); // 'Spot Brightness' glitches in UI
            gfx.conf.gui.add(params, 'background_alpha', 0, 1).step(0.01).name('Back Alpha');

            this.add_effect('particles');
            gfx.gl.particles.material.vertexShader = _textShadersVertexVert;
            gfx.gl.particles.material.fragmentShader = _textShadersParticleFrag;

            gfx.gl.particles.set_particle_size(8);

            gfx.gl.particles.material.uniforms.spot_radius = { type: 'f', value: params.spot_radius };
            gfx.gl.particles.material.uniforms.spot_brightness = { type: 'f', value: params.spot_brightness };
            gfx.gl.particles.material.uniforms.background_alpha = { type: 'f', value: params.background_alpha };
            gfx.gl.particles.material.uniforms.overlay_color = { type: 'c', value: new _THREE['default'].Color(params.overlay_color) };

            gfx.conf.gui.addColor(params, 'overlay_color').onChange(this.set_overlay_color.bind(this));

            gfx.gl.particles.material.uniforms.spot_0_x = { type: 'f', value: 0 };
            gfx.gl.particles.material.uniforms.spot_0_y = { type: 'f', value: 0 };

            gfx.gl.particles.material.uniforms.spot_1_x = { type: 'f', value: 0 };
            gfx.gl.particles.material.uniforms.spot_1_y = { type: 'f', value: 0 };

            // set custom colors
            gfx.gl.particles.set_near_color('#2679C3');
            gfx.gl.particles.set_mid_color('#DC9C26');
            gfx.gl.particles.set_far_color('#FFFFFF'); // Not used, idk how to remove this from UI so I set it to 0

            this.prev_depth = gfx.depth;
        }

        /**
         * Average together two arrays with an optional scale value that weighs one
         * array more highly than the other.
         */

        spotlights.prototype.set_overlay_color = function set_overlay_color(prop) {
            for (var _len = arguments.length, c = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                c[_key - 1] = arguments[_key];
            }

            var new_color = new (_bind.apply(_THREE['default'].Color, [null].concat(c)))();
            this.gfx.gl.particles.material.uniforms.overlay_color.value = new_color;
            params.overlay_color = '#' + new_color.getHexString();
        };

        spotlights.prototype.update = function update(gfx) {
            avg(gfx.depth, this.prev_depth, 1 - params.storminess);
            this.prev_depth = gfx.depth;

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
    function avg(tar1, tar2) {
        var scale = arguments.length <= 2 || arguments[2] === undefined ? 0.5 : arguments[2];

        for (var i = 0; i < tar1.length; i += 1) {
            tar1[i] = scale * tar1[i] + (1 - scale) * tar2[i];
        }
    }
});
