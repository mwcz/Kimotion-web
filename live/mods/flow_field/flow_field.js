define(['exports', 'module', 'threejs', 'mod'], function (exports, module, _threejs, _mod2) {
    /* global rect, background, fill, stroke */

    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var _THREE = _interopRequireDefault(_threejs);

    var _mod3 = _interopRequireDefault(_mod2);

    var FREQUENCY = 10;
    var RADIUS = 3;

    var flow_field = (function (_mod) {
        _inherits(flow_field, _mod);

        function flow_field(gfx) {
            _classCallCheck(this, flow_field);

            _mod.call(this, gfx);

            // enable 2D mode (see http://p5js.org/ for tutorials and such!)
            gfx.set(this, '2d');

            // enable hand/object tracking
            this.add_effect('handtracking2d');

            // set your name and title for your mod so we can display it on the
            // screen!
            this.author = 'Harvey Moon & Michael Clayton';
            this.title = 'Flow Field';

            this.Particle = function Particle(posN, accN, colorIn) {
                this.nowPos = createVector(posN.x, posN.y);
                this.acc = createVector(accN.x, accN.y);
                this.lifeCount = random(100, 400);
                this.colorN = colorIn;
            };

            this.Particle.prototype.update = function () {
                this.lifeCount--;
                this.nowPos.add(this.acc);
            };

            this.Particle.prototype.draw = function () {
                fill(this.colorN);
                ellipse(this.nowPos.x, this.nowPos.y, RADIUS, RADIUS);
            };

            this.particles = [];

            noStroke();
            fill(0);
            rectMode(CENTER);
            background(0);

            this.handpos = createVector(0, 0);
            this.MnowPos = createVector(500, 500);
            this.Macc = createVector(2, -2);
            colorMode(HSB, 360, 100, 100, 1);
        }

        flow_field.prototype.update = function update(gfx) {

            this.handpos.set(gfx.hand.x, gfx.hand.y);
            for (var i = 0; i < this.particles.length; i++) {
                this.particles[i].update();
                this.particles[i].draw();
                var noiseRot = map(noise(this.particles[i].nowPos.x * .006, this.particles[i].nowPos.y * .006), .2, .8, 0, PI * 2);
                this.particles[i].acc.set(cos(noiseRot) * 3, sin(noiseRot) * 3);
            }
            if (this.particles.length < 500) {
                this.MnowPos.set(this.handpos);
                this.MnowPos.add(random(-FREQUENCY, FREQUENCY), random(-FREQUENCY, FREQUENCY));
                this.particles[i] = new this.Particle(this.MnowPos, this.Macc, color(gfx.hand.x / width * 360, 100, 100, 0.2));
            }
            for (var j = 0; j < this.particles.length; j++) {
                if (this.particles[j].nowPos.x >= width - FREQUENCY || this.particles[j].nowPos.x <= FREQUENCY || this.particles[j].nowPos.y >= height - FREQUENCY || this.particles[j].nowPos.y <= FREQUENCY || this.particles[j].lifeCount <= 0) {
                    this.particles.splice(j, 1);
                }
            }

            _mod.prototype.update.call(this, gfx);
        };

        return flow_field;
    })(_mod3['default']);

    module.exports = flow_field;
});
