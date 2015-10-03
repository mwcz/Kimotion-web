define(['exports', 'module', 'conf'], function (exports, module, _conf) {
    'use strict';

    module.exports = recording_init;

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _conf2 = _interopRequireDefault(_conf);

    function recording_init() {

        console.log('Using recording data source');

        var i = 0;
        var step = _conf2['default'].kinect.res.width * _conf2['default'].kinect.res.height;

        var depth = new Uint16Array(step);
        var recording = new Uint16Array(depth.length);

        function read() {
            return depth;
        }

        function send_message() {
            console.log('Attempted to send message to recording, ignored.');
        }

        setInterval(update_frame, 1000 / 30);

        function update_frame() {
            depth = new Uint16Array(recording.subarray(i, i + step));
            i += step;
            i %= recording.length;
        }

        function fetch_recording(name) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', name, true);
            xhr.responseType = 'arraybuffer';

            xhr.onload = function (e) {
                if (this.status === 200) {
                    console.log('successfully fetched recording ' + name);
                    i = 0;
                    recording = new Uint16Array(this.response);
                } else {
                    throw new Error('non-200 response code on recording GET for ' + name);
                }
            };

            xhr.onerror = function () {
                throw new Error('failed to load recording ' + name);
            };

            xhr.send();
        }

        fetch_recording('http://scripta.co/kimotion/recordings/short-recording.bin');

        var exports = {
            read: read,
            send_message: send_message
        };

        return exports;
    }
});
