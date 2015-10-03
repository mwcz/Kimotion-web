define(['exports', 'module', 'mod'], function (exports, module, _mod2) {
    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var _mod3 = _interopRequireDefault(_mod2);

    var THRESHOLD_MIN = 600;
    var THRESHOLD_MAX = 700;

    var handcube = (function (_mod) {
        _inherits(handcube, _mod);

        function handcube(gfx) {
            _classCallCheck(this, handcube);

            _mod.call(this, gfx);
            gfx.set(this, '3d');
            this.author = 'Michael Clayton';
            this.title = 'Hand Cube';
            this.add_effect('cube');

            for (var i = 0; i < gfx.gl.cube.geometry.faces.length; i += 2) {
                var hex = Math.random() * 0xffffff;
                gfx.gl.cube.geometry.faces[i].color.setHex(hex);
                gfx.gl.cube.geometry.faces[i + 1].color.setHex(hex);
            }

            this.prev_x = 0;
            this.prev_y = 0;

            this.prev_vel_x = 0;
            this.prev_vel_y = 0;
        }

        handcube.prototype.update = function update(gfx) {

            var sumx = 0;
            var sumy = 0;
            var count = 0;

            for (var i = 0; i < gfx.depth.length; ++i) {
                var x = i % gfx.conf.kinect.res.width;
                var y = gfx.conf.kinect.res.height - Math.floor(i / gfx.conf.kinect.res.width);

                if (gfx.depth[i] > THRESHOLD_MIN && gfx.depth[i] < THRESHOLD_MAX) {
                    sumx += x;
                    sumy += y;
                    count += 1;
                }
            }

            var new_x = sumx / count;
            var new_y = sumy / count;

            var vel_x = this.prev_x - new_x;
            var vel_y = this.prev_y - new_y;

            gfx.gl.cube.rotation.x = Math.log(this.velocity_x);
            gfx.gl.cube.rotation.y = Math.log(this.velocity_x);

            _mod.prototype.update.call(this, gfx);
        };

        return handcube;
    })(_mod3['default']);

    module.exports = handcube;
});
