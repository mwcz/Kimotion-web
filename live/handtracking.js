define(['exports', 'module'], function (exports, module) {
    /* global width, height */

    'use strict';

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    var THRESHOLD_MIN = 600;
    var THRESHOLD_MAX = 700;
    var NEW_WEIGHT = 0.4;

    var handtracking = (function () {
        function handtracking(gfx) {
            _classCallCheck(this, handtracking);

            gfx.hand = {};

            this.prevhand = { x: 0, y: 0 };
            this.avgx = 0;
            this.avgy = 0;

            gfx.conf.gui.add(this, 'avgx').name('Hand x').listen();
            gfx.conf.gui.add(this, 'avgy').name('Hand y').listen();
        }

        handtracking.prototype.update = function update(gfx) {

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

            if (count > 0) {
                this.avgx = gfx.conf.kinect.res.width - sumx / count;
                this.avgy = sumy / count;

                // allow subclasses to perform scaling, flippig, etc, based on the
                // needs of their coordinate systems
                this.rescale(gfx);

                gfx.hand.x = this.prevhand.x * (1 - NEW_WEIGHT) + this.avgx * NEW_WEIGHT;
                gfx.hand.y = this.prevhand.y * (1 - NEW_WEIGHT) + this.avgy * NEW_WEIGHT;

                this.prevhand.x = gfx.hand.x;
                this.prevhand.y = gfx.hand.y;
            }
        };

        handtracking.prototype.rescale = function rescale(gfx) {};

        handtracking.prototype.destroy = function destroy(gfx) {
            delete gfx.hand;
        };

        return handtracking;
    })();

    module.exports = handtracking;
});
