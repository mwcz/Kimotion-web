define(['exports', 'module', 'mod'], function (exports, module, _mod2) {
    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var _mod3 = _interopRequireDefault(_mod2);

    var particles = (function (_mod) {
        _inherits(particles, _mod);

        function particles(gfx) {
            _classCallCheck(this, particles);

            _mod.call(this, gfx);
            gfx.set(this, '3d');
            this.author = 'Michael Clayton';
            this.title = 'Particles';
            this.add_effect('particles');
        }

        particles.prototype.update = function update(gfx) {
            _mod.prototype.update.call(this, gfx);
        };

        return particles;
    })(_mod3['default']);

    module.exports = particles;
});
