define(['exports', 'module', 'threejs', 'mod', 'text!./shaders/particle.frag', 'text!./shaders/vertex.vert'], function (exports, module, _threejs, _mod2, _textShadersParticleFrag, _textShadersVertexVert) {
    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var _THREE = _interopRequireDefault(_threejs);

    var _mod3 = _interopRequireDefault(_mod2);

    var params = { storminess: 0.90 };

    var sandstorm = (function (_mod) {
        _inherits(sandstorm, _mod);

        function sandstorm(gfx) {
            _classCallCheck(this, sandstorm);

            _mod.call(this, gfx);
            gfx.set(this, '3d');

            gfx.conf.gui.add(params, 'storminess', 0, 0.99).step(0.01).name('storminess');

            this.author = 'Michael Clayton';
            this.title = 'Sandstorm';
            this.add_effect('particles');
            this.add_effect('handtracking3d');
            gfx.gl.particles.material.vertexShader = _textShadersVertexVert;
            gfx.gl.particles.material.fragmentShader = _textShadersParticleFrag;
            gfx.gl.particles.material.blending = _THREE['default'].AdditiveBlending;

            // set custom colors
            gfx.gl.particles.set_near_color('#e56b00');
            gfx.gl.particles.set_mid_color('#280072');
            gfx.gl.particles.set_far_color('#02020c');

            // set particle size
            gfx.gl.particles.set_particle_size(3);

            this.prev_depth = gfx.depth;

            //
            this.prevpos = { x: 0, y: 0 };
            this.avgx = 0;
            this.avgy = 0;
        }

        /**
         * Average together two arrays with an optional scale value that weighs one
         * array more highly than the other.
         */

        sandstorm.prototype.update = function update(gfx) {
            // drift particles towards their destinations 10% at a time
            avg(gfx.depth, this.prev_depth, 1 - params.storminess);

            // gfx.gl.camera.position.x += ( 100 * Math.sin(performance.now()/2000) - gfx.gl.camera.position.x ) * 0.5;
            // gfx.gl.camera.position.y += ( 100 * Math.cos(performance.now()/2000) - gfx.gl.camera.position.y ) * 0.5;
            // gfx.gl.camera.lookAt(gfx.gl.scene.position);

            this.prev_depth = gfx.depth;

            // add handtracking-based camera controls
            // camera.position.x += ( mouseX - camera.position.x ) * .05;
            // camera.position.y += ( - mouseY + 200 - camera.position.y ) * .05;

            _mod.prototype.update.call(this, gfx);
        };

        return sandstorm;
    })(_mod3['default']);

    module.exports = sandstorm;
    function avg(tar1, tar2) {
        var scale = arguments.length <= 2 || arguments[2] === undefined ? 0.5 : arguments[2];

        for (var i = 0; i < tar1.length; i += 1) {
            tar1[i] = scale * tar1[i] + (1 - scale) * tar2[i];
        }
    }
});
