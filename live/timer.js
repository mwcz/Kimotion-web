define(['exports', 'nprogress'], function (exports, _nprogress) {
    'use strict';

    exports.__esModule = true;
    exports.start = start;
    exports.stop = stop;

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _np = _interopRequireDefault(_nprogress);

    var iid = undefined; // interval id
    var tid = undefined; // tick id

    function start(minutes, tick, tick_cb, end_cb) {

        // stop everything, just in case start/stop calls accidentally overlap
        stop();

        // configure nprogress (the minimalistic progress bar)
        _np['default'].configure({
            minimum: 0,
            showSpinner: false,
            trickle: false,
            easing: 'linear',
            speed: minutes * 1000 * 60
        });

        // now kick off the new stuff!
        _np['default'].start();

        // set the progress bar to done, but it doesn't fill immediately due to the linear easing lasting the same duration as our mod
        _np['default'].set(1.0);

        iid = setInterval(end(minutes, tick, tick_cb, end_cb), minutes * 1000 * 60);

        tid = setInterval(tick_cb, tick * 1000 * 60);
    }

    function end(minutes, tick, tick_cb, end_cb) {
        return function end_fn() {
            stop();
            end_cb();
            start(minutes, tick, tick_cb, end_cb);
        };
    }

    function stop() {
        clearInterval(iid);
        clearInterval(tid);
        _np['default'].remove();
    }
});
