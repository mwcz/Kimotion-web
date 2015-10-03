define(['exports', 'module', 'nprogress', 'dat-gui', 'timer', 'modctrl', 'mods', 'input', 'lodash'], function (exports, module, _nprogress, _datGui, _timer, _modctrl, _mods, _input, _lodash) {
    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _nprogress2 = _interopRequireDefault(_nprogress);

    var _input2 = _interopRequireDefault(_input);

    var conf = {
        mods: _modctrl.names(),
        server: localStorage.ws_url || 'localhost:1337',
        timer: {
            enabled: false,
            duration: 1.0,
            remaining: 1.0, // minutes remaining on current mod
            tick: 1 / 60 },
        // update time remaining every this many minutes
        kinect_tilt: 10,
        kinect: {
            res: { width: 640, height: 480 }
        }
    };

    var gui = new _datGui.GUI();

    var folder = gui.addFolder('Kimotion global settings');

    function get_ctrl(folder, prop_name) {
        var ctrl = _lodash.where(folder.__controllers, { 'property': prop_name });
        try {
            return ctrl[0];
        } catch (e) {
            console.error('Couldn\'t find requested datgui controller: ' + prop_name);
        }
    }

    function update_remaining_time() {
        conf.timer.remaining -= conf.timer.tick;
    }

    function next_mod() {
        _modctrl.next();
        conf.timer.remaining = conf.timer.duration; // make sure remaining doesn't go negative
    }

    folder.add(conf, 'server').name('Server').onChange(function (server_host) {
        localStorage.ws_url = server_host;
    });

    folder.add(conf, 'mods', conf.mods).name('Mods').onChange(_modctrl.set);

    function timer_ctrl(enabled) {
        if (enabled) {
            conf.timer.remaining = conf.timer.duration;
            _timer.start(conf.timer.duration, conf.timer.tick, update_remaining_time, next_mod);
        } else {
            _timer.stop();
            conf.timer.remaining = conf.timer.duration;
        }
    }
    timer_ctrl(conf.timer.enabled);

    folder.add(conf.timer, 'enabled', conf.timer.enabled).name('Cycle mods').onChange(timer_ctrl);

    folder.add(conf.timer, 'duration', 0.1, 10).name('Mins per mod').onChange(function (new_dur) {
        if (conf.timer.enbled) {
            _timer.start(new_dur, conf.timer.tick, update_remaining_time, _modctrl.next);
        }
    });

    folder.add(conf, 'kinect_tilt', 0, 30).name('Kinect Tilt').onChange(_input2['default'].send_message);

    folder.open();

    var mod_folder = gui.addFolder('Mod settings');

    mod_folder.open();

    // expose the mod config folder to mod authors
    conf.gui = mod_folder;

    // if the timer is enabled, assume this is sparkcon mode and close the gui
    if (conf.timer.enabled) {
        gui.close();
    }

    module.exports = conf;
});
