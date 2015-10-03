define(['exports', 'module', 'mod', 'text!./shaders/particle.frag', 'text!./shaders/vertex.vert'], function (exports, module, _mod2, _textShadersParticleFrag, _textShadersVertexVert) {
    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var _mod3 = _interopRequireDefault(_mod2);

    var handviz = (function (_mod) {
        _inherits(handviz, _mod);

        function handviz(gfx) {
            _classCallCheck(this, handviz);

            _mod.call(this, gfx);
            gfx.set(this, '3d');
            this.author = 'Michael Clayton';
            this.title = 'Hand Viz';
            this.add_effect('particles');

            gfx.gl.particles.material.vertexShader = _textShadersVertexVert;
            gfx.gl.particles.material.fragmentShader = _textShadersParticleFrag;

            gfx.gl.particles.set_near_color('#C5C5C5');
            gfx.gl.particles.set_mid_color('#000000');
            gfx.gl.particles.set_far_color('#000000');
        }

        handviz.prototype.update = function update(gfx) {
            _mod.prototype.update.call(this, gfx);
        };

        return handviz;
    })(_mod3['default']);

    module.exports = handviz;
});
