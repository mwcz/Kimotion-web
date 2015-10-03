define(['exports', 'module', 'mod'], function (exports, module, _mod2) {
    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var _mod3 = _interopRequireDefault(_mod2);

    var MAX_DEPTH_SUM = 337920000;

    var cube = (function (_mod) {
        _inherits(cube, _mod);

        function cube(gfx) {
            _classCallCheck(this, cube);

            _mod.call(this, gfx);
            gfx.set(this, '3d');
            this.author = 'Michael Clayton';
            this.title = 'Cube';
            this.add_effect('cube');

            for (var i = 0; i < gfx.gl.cube.geometry.faces.length; i += 2) {
                var hex = Math.random() * 0xffffff;
                gfx.gl.cube.geometry.faces[i].color.setHex(hex);
                gfx.gl.cube.geometry.faces[i + 1].color.setHex(hex);
            }

            this.spin = 0;
        }

        cube.prototype.update = function update(gfx) {

            /**
             * positive rotation.x is down
             * negative rotation.x is up
             * positive rotation.y is right
             * negative rotation.y is left
             */

            var left_depth = 0;
            var right_depth = 0;

            for (var i = 0; i < gfx.depth.length; i += gfx.conf.kinect.res.width) {
                // add up the left half of the depth values
                for (var j = 0; j < gfx.conf.kinect.res.width / 2; ++j) {
                    left_depth += gfx.depth[j];
                }
                // add up the right half of the depth values
                for (var j = gfx.conf.kinect.res.width / 2; j < gfx.conf.kinect.res.width; ++j) {
                    right_depth += gfx.depth[j];
                }
            }

            // scale down the depths to usable levels
            left_depth /= MAX_DEPTH_SUM * 2;
            right_depth /= MAX_DEPTH_SUM * 2;

            this.spin = 0.99 * this.spin + 0.01 * (right_depth - left_depth);

            gfx.gl.cube.rotation.y += this.spin;

            _mod.prototype.update.call(this, gfx);
        };

        return cube;
    })(_mod3['default']);

    module.exports = cube;
});
