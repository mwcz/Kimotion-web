define(['exports', 'module', 'threejs', 'effect'], function (exports, module, _threejs, _effect) {
    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    var _THREE = _interopRequireDefault(_threejs);

    var _effect2 = _interopRequireDefault(_effect);

    var scene = undefined;
    var gfx = undefined;
    var geometry = undefined;
    var cube = undefined;
    var material = undefined;

    var cube_effect = (function () {
        function cube_effect(_gfx) {
            _classCallCheck(this, cube_effect);

            gfx = _gfx;
            scene = gfx.gl.scene;

            geometry = new _THREE['default'].BoxGeometry(150, 150, 150);

            for (var i = 0; i < geometry.faces.length; i += 2) {
                var hex = Math.random() * 0xffffff;
                geometry.faces[i].color.setHex(hex);
                geometry.faces[i + 1].color.setHex(hex);
            }

            material = new _THREE['default'].MeshBasicMaterial({ vertexColors: _THREE['default'].FaceColors, overdraw: 0.5 });
            cube = new _THREE['default'].Mesh(geometry, material);
            scene.add(cube);
            gfx.gl.camera.lookAt(cube.position);

            gfx.gl.cube = cube;

            this.prev_dsum = 0;
        }

        cube_effect.prototype.update = function update(gfx) {
            var dsum = 0;
            for (var i = 0; i < gfx.depth.length; i += 1) {
                dsum += gfx.depth[i];
            }
            var dsum_diff = (dsum - this.prev_dsum) / 5e7;
            cube.rotation.y += dsum_diff;
            this.prev_dsum = dsum;
        };

        cube_effect.prototype.destroy = function destroy() {};

        return cube_effect;
    })();

    module.exports = cube_effect;
});
