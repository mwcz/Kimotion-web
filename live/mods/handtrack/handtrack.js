define(['exports', 'module', 'threejs', 'mod', 'text!./shaders/particle.frag', 'text!./shaders/vertex.vert'], function (exports, module, _threejs, _mod2, _textShadersParticleFrag, _textShadersVertexVert) {
    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var _THREE = _interopRequireDefault(_threejs);

    var _mod3 = _interopRequireDefault(_mod2);

    var THRESHOLD_MIN = 600;
    var THRESHOLD_MAX = 700;

    var handtrack = (function (_mod) {
        _inherits(handtrack, _mod);

        function handtrack(gfx) {
            _classCallCheck(this, handtrack);

            _mod.call(this, gfx);
            gfx.set(this, '3d');
            this.author = 'Michael Clayton';
            this.title = 'handtrack';
            this.add_effect('particles');
            this.add_effect('handtracking3d');

            var geometry = new _THREE['default'].SphereGeometry(20, 62, 62);
            var material = new _THREE['default'].MeshBasicMaterial({ color: 0xffff00 });
            this.sphere = new _THREE['default'].Mesh(geometry, material);
            this.sphere.position.z = 0;
            gfx.gl.scene.add(this.sphere);

            gfx.gl.particles.material.vertexShader = _textShadersVertexVert;
            gfx.gl.particles.material.fragmentShader = _textShadersParticleFrag;
        }

        handtrack.prototype.update = function update(gfx) {

            this.sphere.position.x = gfx.hand.x;
            this.sphere.position.y = gfx.hand.y;

            _mod.prototype.update.call(this, gfx);
        };

        return handtrack;
    })(_mod3['default']);

    module.exports = handtrack;
});
