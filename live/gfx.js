define(['exports', 'module', 'threejs', 'threejs_orbit_controls', 'p5', 'p5.sound', 'input', 'conf', 'lodash'], function (exports, module, _threejs, _threejs_orbit_controls, _p5, _p5Sound, _input, _conf, _lodash) {
    /* global createCanvas */

    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _THREE = _interopRequireDefault(_threejs);

    var _orbit_controls = _interopRequireDefault(_threejs_orbit_controls);

    var _p52 = _interopRequireDefault(_p5);

    var _input2 = _interopRequireDefault(_input);

    var _conf2 = _interopRequireDefault(_conf);

    var VALID_TYPES = ['2d', '3d'];

    var type = '2d'; // assume 2d at beginning, mods can update this

    var scene = undefined;
    var camera = undefined;
    var renderer = undefined;
    var depth = new Uint16Array(_conf2['default'].kinect.res.width * _conf2['default'].kinect.res.height);

    var render = _lodash.noop;

    var controls = undefined;

    function set(mod, newtype) {

        // remove any pre-existing canvases
        _lodash.invoke(document.querySelectorAll('canvas'), 'remove');

        // set the mode to either 2d or 3d based on the current mod
        if (_lodash.contains(VALID_TYPES, newtype)) {
            type = newtype;
            if (type === '2d') {

                delete this.gl;

                // create a skeleton p5 sketch; the current mod will draw into the
                // canvas created by this sketch
                var sketch = function mod_sketch(p) {
                    p.setup = function mod_sketch_setup() {
                        p.createCanvas(window.innerWidth, window.innerHeight);
                    };
                    p.draw = _lodash.noop; //mod.update.bind(mod);
                };

                // unlike threejs, p5 doesn't need to be explicitly rendered, so
                // set render to noop
                render = _lodash.noop;

                this.p5 = new _p52['default'](sketch, document.body);

                // since this p5 object inherits all the drawing functions, we must
                // bind them all to the p5 so THIS instance owns them, then assign
                // them to window.  this greatly simplifies the invokation of p5
                // drawing functions syntactically.
                // ie, rect() instead of gfx.p5.rect();
                // assign(window, bindAll(this.p5));

                _lodash.forIn(_lodash.bindAll(this.p5), function (v, k, o) {
                    window[k] = v;
                });
            } else if (type === '3d') {
                delete this.p5;
                scene = new _THREE['default'].Scene();
                camera = new _THREE['default'].PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 8000);
                camera.position.x = 0;
                camera.position.y = 0;
                camera.position.z = 1100;
                renderer = new _THREE['default'].WebGLRenderer();
                renderer.setClearColor(0x000000, 1);
                renderer.setSize(window.innerWidth, window.innerHeight);
                document.body.appendChild(renderer.domElement);

                controls = new _THREE['default'].OrbitControls(camera, renderer.domElement);

                render = function render3d() {
                    renderer.render(scene, camera);
                };

                this.gl = { scene: scene, camera: camera, renderer: renderer };
            }
        } else {
            throw new Error('Invalid type for gfx.set().  Must be "2d" or "3d"');
        }

        this.update();
    }

    function reset() {}

    function update() {
        this.depth = _input2['default'].read();
        render();
    }

    var gfx = {
        conf: _conf2['default'],
        set: set,
        reset: reset,
        depth: depth,
        update: update
    };

    gfx.reset();

    module.exports = gfx;
});
