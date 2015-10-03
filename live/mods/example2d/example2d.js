define(['exports', 'module', 'threejs', 'mod'], function (exports, module, _threejs, _mod2) {
    /* global rect, background, fill, stroke */

    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var _THREE = _interopRequireDefault(_threejs);

    var _mod3 = _interopRequireDefault(_mod2);

    var example2d = (function (_mod) {
        _inherits(example2d, _mod);

        function example2d(gfx) {
            _classCallCheck(this, example2d);

            _mod.call(this, gfx);

            // enable 2D mode (see http://p5js.org/ for tutorials and such!)
            gfx.set(this, '2d');

            // enable hand/object tracking
            this.add_effect('handtracking2d');

            // set your name and title for your mod so we can display it on the
            // screen!
            this.author = 'Your Name';
            this.title = 'example';

            background(255); // white
            fill(255); // white
            stroke(0); // black borders
        }

        example2d.prototype.update = function update(gfx) {

            if (gfx.hand.x && gfx.hand.y) {
                rect(gfx.hand.x, gfx.hand.y, 60, 60);
            }

            _mod.prototype.update.call(this, gfx);
        };

        return example2d;
    })(_mod3['default']);

    module.exports = example2d;
});
