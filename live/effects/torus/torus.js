define(['exports', 'module', 'threejs', 'effect', 'lodash'], function (exports, module, _threejs, _effect, _lodash) {
    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    var _THREE = _interopRequireDefault(_threejs);

    var _effect2 = _interopRequireDefault(_effect);

    var scene = undefined;
    var gfx = undefined;
    var geometry = undefined;
    var torus = undefined;
    var material = undefined;

    var torus_effect = (function () {
        function torus_effect(_gfx) {
            _classCallCheck(this, torus_effect);

            gfx = _gfx;
            scene = gfx.gl.scene;

            geometry = new _THREE['default'].TorusKnotGeometry(150, 30, 100, 16);

            material = new _THREE['default'].MeshBasicMaterial({ vertexColors: _THREE['default'].FaceColors, overdraw: 0.5 });
            torus = new _THREE['default'].Mesh(geometry, material);
            scene.add(torus);

            gfx.gl.camera.lookAt(torus.position);

            console.log(torus.position);

            gfx.gl.material = material;
            gfx.gl.geometry = geometry;
            gfx.gl.torus = torus;
        }

        torus_effect.prototype.update = function update(gfx) {};

        torus_effect.prototype.destroy = function destroy() {};

        return torus_effect;
    })();

    module.exports = torus_effect;
});
