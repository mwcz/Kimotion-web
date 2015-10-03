define(['exports', 'module', 'threejs', 'effect', 'text!./shaders/particle.frag', 'text!./shaders/vertex.vert'], function (exports, module, _threejs, _effect, _textShadersParticleFrag, _textShadersVertexVert) {
    'use strict';

    var _bind = Function.prototype.bind;

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    var _THREE = _interopRequireDefault(_threejs);

    var _effect2 = _interopRequireDefault(_effect);

    var particles = (function () {
        function particles(gfx) {
            _classCallCheck(this, particles);

            this.gfx = gfx;

            this.scene = this.gfx.gl.scene;
            this.camera = this.gfx.gl.camera;
            this.conf = this.gfx.conf;
            this.size = 2;

            this.default_colors = {
                'near_color': '#4C2A3B',
                'mid_color': '#36C6A2',
                'far_color': '#EFE2BF'
            };

            // set the background color
            this.gfx.gl.renderer.setClearColor(new _THREE['default'].Color(this.default_colors.far_color));

            // attach this effect's stuff to gfx.gl so other mods can twist it to
            // their whims
            this.gfx.gl.particles = this;

            // add config values
            this.gfx.conf.gui.addColor(this.default_colors, 'near_color').listen().onChange(this.set_near_color.bind(this));
            this.gfx.conf.gui.addColor(this.default_colors, 'mid_color').listen().onChange(this.set_mid_color.bind(this));
            this.gfx.conf.gui.addColor(this.default_colors, 'far_color').listen().onChange(this.set_far_color.bind(this));

            this.gfx.conf.gui.add(this, 'size', 1, 64).step(1).onChange(this.set_particle_size.bind(this));

            this.add_particle_system();
        }

        // THREE.NoBlending
        // THREE.NormalBlending
        // THREE.AdditiveBlending
        // THREE.SubtractiveBlending
        // THREE.MultiplyBlending
        // THREE.CustomBlending

        particles.prototype.update = function update(gfx) {
            this.update_positions(gfx.depth);
        };

        particles.prototype.destroy = function destroy() {};

        particles.prototype.get_uniforms = function get_uniforms() {
            return {
                near_color: { type: 'c', value: new _THREE['default'].Color(this.default_colors.near_color) },
                mid_color: { type: 'c', value: new _THREE['default'].Color(this.default_colors.mid_color) },
                far_color: { type: 'c', value: new _THREE['default'].Color(this.default_colors.far_color) },
                particle_size: { type: 'f', value: this.size },
                texture: { type: 't', value: _THREE['default'].ImageUtils.loadTexture('images/circle.png') }
            };
        };

        // mouse     : { type : 'v2', value : new THREE.Vector2() },

        particles.prototype.get_attributes = function get_attributes() {
            return {
                //customColor  : { type : 'c',  value : null },
            };
        };

        particles.prototype.add_particle_system = function add_particle_system() {
            this.geometry = new _THREE['default'].BufferGeometry();
            this.material = new _THREE['default'].ShaderMaterial({
                uniforms: this.get_uniforms(),
                attributes: this.get_attributes(),
                vertexShader: _textShadersVertexVert,
                fragmentShader: _textShadersParticleFrag,
                blending: _THREE['default'].NormalBlending,
                depthTest: false,
                transparent: true
            });
            this.add_particle_system_attributes(this.geometry, 640 * 480);
            this.system = new _THREE['default'].PointCloud(this.geometry, this.material);
            this.system.sortParticles = true;

            // flip the particle system so lower depth values will become closer to the
            // camera (just as the actual objects are closer to the kinect)
            this.system.rotateY(Math.PI);

            this.gfx.gl.scene.add(this.system);
        };

        particles.prototype.add_particle_system_attributes = function add_particle_system_attributes(geo, count) {
            this.positions = this.get_initial_particle_positions(count);
            this.colors = new Float32Array(count);
            geo.addAttribute('position', new _THREE['default'].BufferAttribute(this.positions, 3));
        };

        particles.prototype.get_initial_particle_positions = function get_initial_particle_positions(count) {
            this.positions = new Float32Array(count * 3);
            var x = undefined,
                y = undefined,
                j = undefined;
            var w = this.conf.kinect.res.width;
            var h = this.conf.kinect.res.height;
            var halfw = w / 2;
            var halfh = h / 2;
            for (var i = 0; i < this.positions.length; i += 3) {

                j = Math.floor(i / 3);

                x = j % this.conf.kinect.res.width;
                // y must be flipped since kinect's coordinate system has +y going down and threejs has +y going up.
                y = this.conf.kinect.res.height - Math.floor(j / this.conf.kinect.res.width);

                this.positions[i] = x - halfw; // subtract half to center the particles on origin
                this.positions[i + 1] = y - halfh; // subtract half to center the particles on origin
                this.positions[i + 2] = 0;
            }
            return this.positions;
        };

        particles.prototype.update_positions = function update_positions(depth) {
            var pos = this.geometry.attributes.position.array;
            var z = 0,
                j = 0;
            for (var i = 2; i < pos.length; i += 3) {
                j = Math.floor(i / 3);
                z = depth[j];
                pos[i] = z;
            }
            this.geometry.attributes.position.needsUpdate = true;
        };

        particles.prototype.set_color = function set_color(prop) {
            for (var _len = arguments.length, c = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                c[_key - 1] = arguments[_key];
            }

            var new_color = new (_bind.apply(_THREE['default'].Color, [null].concat(c)))();
            this.material.uniforms[prop].value = new_color;
            this.default_colors[prop] = '#' + new_color.getHexString();

            if (prop === 'far_color') {
                // update the canvas background to match the far color
                this.gfx.gl.renderer.setClearColor(new_color);
            }
        };

        particles.prototype.set_near_color = function set_near_color() {
            for (var _len2 = arguments.length, c = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                c[_key2] = arguments[_key2];
            }

            this.set_color.apply(this, ['near_color'].concat(c));
        };

        particles.prototype.set_mid_color = function set_mid_color() {
            for (var _len3 = arguments.length, c = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                c[_key3] = arguments[_key3];
            }

            this.set_color.apply(this, ['mid_color'].concat(c));
        };

        particles.prototype.set_far_color = function set_far_color() {
            for (var _len4 = arguments.length, c = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                c[_key4] = arguments[_key4];
            }

            this.set_color.apply(this, ['far_color'].concat(c));
        };

        particles.prototype.set_particle_size = function set_particle_size(c) {
            this.material.uniforms.particle_size.value = c;
        };

        return particles;
    })();

    module.exports = particles;
    function NaNPositionError(message) {
        this.name = 'NaNPositionError';
        this.message = message || '';
    }
    NaNPositionError.prototype = Error.prototype;
});
