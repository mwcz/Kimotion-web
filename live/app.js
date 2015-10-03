define(['exports', 'modctrl', 'gfx', 'modernizr', 'lodash'], function (exports, _modctrl, _gfx, _modernizr, _lodash) {
    /* global Modernizr */

    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _gfx2 = _interopRequireDefault(_gfx);

    var browser_reqs = ['typedarrays', 'queryselector', 'websockets', 'webgl', 'xhrresponsetypearraybuffer', 'requestanimationframe', 'raf'];

    // 'FAKE_BROWSER_FEATURE', // this can be used for testing the bad-browser message
    function create() {
        var modname = location.hash.replace(/^#/, '');

        var good_browser = _lodash.every(_lodash.map(browser_reqs, function (n) {
            return Modernizr[n];
        }), function (n) {
            return !!n;
        });

        if (good_browser) {
            _modctrl.create(_gfx2['default'], modname);
            update();
        } else {
            document.body.classList.add('bad-browser');
        }
    }

    function update() {
        requestAnimationFrame(update);
        _modctrl.update(_gfx2['default']);
        _gfx2['default'].update();
    }

    create();
});
