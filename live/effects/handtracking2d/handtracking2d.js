define(['exports', 'module', 'handtracking'], function (exports, module, _handtracking2) {
    /* global width, height */

    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var _handtracking3 = _interopRequireDefault(_handtracking2);

    var handtracking2d = (function (_handtracking) {
        _inherits(handtracking2d, _handtracking);

        function handtracking2d() {
            _classCallCheck(this, handtracking2d);

            _handtracking.apply(this, arguments);
        }

        handtracking2d.prototype.rescale = function rescale(gfx) {
            // scale the kinect's resolution up to the screen's resolution
            this.avgx *= window.innerWidth / gfx.conf.kinect.res.width;
            this.avgy = gfx.conf.kinect.res.height - this.avgy; // flip y
            this.avgy *= window.innerHeight / gfx.conf.kinect.res.height;
        };

        return handtracking2d;
    })(_handtracking3['default']);

    module.exports = handtracking2d;
});
