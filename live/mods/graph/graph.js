define(['exports', 'module', 'threejs', 'mod'], function (exports, module, _threejs, _mod2) {
    /* jshint ignore:start */

    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var _THREE = _interopRequireDefault(_threejs);

    var _mod3 = _interopRequireDefault(_mod2);

    var PAD = { x: 400, y: 100 };
    var DIA = 8;
    var PADDIA = {
        x: PAD.x + DIA,
        y: PAD.y + DIA
    };
    var PADDIA2 = {
        x: PAD.x + DIA * 2,
        y: PAD.y + DIA * 2
    };

    var CLEAR_RECT = {};
    var DRAW_RECT = {};

    var graph = (function (_mod) {
        _inherits(graph, _mod);

        function graph(gfx) {
            _classCallCheck(this, graph);

            _mod.call(this, gfx);

            this.author = 'Michael Clayton';
            this.title = 'Graph';

            // use 2d mode (p5.js)
            gfx.set(this, '2d');

            // handtracking!
            this.add_effect('handtracking2d');

            CLEAR_RECT = {
                x: PADDIA.x,
                y: PADDIA.y,
                w: width - PADDIA.x * 2,
                h: height - PADDIA.y * 2
            };

            DRAW_RECT = {
                x: PADDIA2.x,
                y: PADDIA2.y,
                w: width - PADDIA2.x * 2,
                h: height - PADDIA2.y * 2
            };

            background(255);

            noStroke();
            fill(0);

            noiseDetail(2, 0.2);

            // create "handrawn" axis lines

            // x axis
            // for( var x = PAD; x < width - PAD; x += (width - 2*PAD) / HANDDRAWN_SEGMENTS ) {
            for (var x = PAD.x; x < width - PAD.x; x += 3) {
                ellipse(x, height - PAD.y + noise(x), DIA, DIA);
            }

            // y axis
            for (var y = PAD.y; y < height - PAD.y; y += 3) {
                ellipse(PAD.x + noise(y), y, DIA, DIA);
            }

            this.ticker = 0;
        }

        /* jshint ignore:end */

        graph.prototype.update = function update(gfx) {

            this.ticker += 1;

            if (this.ticker === 4) {
                fill(255, 255, 255, 8);
                // clear out the graph area
                rect(CLEAR_RECT.x, CLEAR_RECT.y, CLEAR_RECT.w, CLEAR_RECT.h);
                this.ticker = 0;
            }

            fill(0);

            var dot_x = DRAW_RECT.x + DRAW_RECT.w * (gfx.hand.x / width);
            var dot_y = DRAW_RECT.y + DRAW_RECT.h * (gfx.hand.y / height);

            ellipse(dot_x, dot_y, DIA, DIA);

            _mod.prototype.update.call(this, gfx);
        };

        return graph;
    })(_mod3['default']);

    module.exports = graph;
});
