define(['exports', 'module', 'threejs', 'mod'], function (exports, module, _threejs, _mod2) {
    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var _THREE = _interopRequireDefault(_threejs);

    var _mod3 = _interopRequireDefault(_mod2);

    var example = (function (_mod) {
        _inherits(example, _mod);

        function example(gfx) {
            _classCallCheck(this, example);

            _mod.call(this, gfx);
            gfx.set(this, '3d');
            this.author = 'Your Name';
            this.title = 'example';

            // create a 3d shape, a box!
            var geometry = new _THREE['default'].BoxGeometry(150, 150, 150);

            // create some clothing for the cube
            var material = new _THREE['default'].MeshBasicMaterial({ wireframe: true });

            // create a cube by putting the clothing on the box
            this.cube = new _THREE['default'].Mesh(geometry, material);

            // add it to the scene
            gfx.gl.scene.add(this.cube);

            // tell the camera to look at the cube
            gfx.gl.camera.lookAt(this.cube.position);
        }

        example.prototype.update = function update(gfx) {
            this.cube.rotation.x += 0.001;
            this.cube.rotation.y += 0.01;
            this.cube.rotation.z += 0.0001;
            _mod.prototype.update.call(this, gfx);
        };

        return example;
    })(_mod3['default']);

    module.exports = example;
});
