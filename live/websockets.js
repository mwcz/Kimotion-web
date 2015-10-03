define(['exports', 'module', 'lodash', 'conf'], function (exports, module, _lodash, _conf) {
    /* global prompt */
    'use strict';

    module.exports = websockets_init;

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _conf2 = _interopRequireDefault(_conf);

    function websockets_init() {

        console.log('Using websockets data source');

        var _ = _lodash.partial.placeholder;

        var MAX_DEPTH = 2047;
        var MIN_DEPTH = 0;

        var depth = new Uint16Array(_conf2['default'].kinect.res.width * _conf2['default'].kinect.res.height);
        var ws;

        function ask_for_ws_server() {
            if (localStorage.ws_url) {
                return localStorage.ws_url;
            } else {
                var ws_url = prompt('Where is the input server?', localStorage.ws_url || 'localhost:1337');
                localStorage.ws_url = ws_url;
                return ws_url;
            }
        }

        function create_ws_connection(ws_url) {
            var ws = new WebSocket('ws://' + ws_url);
            ws.binaryType = 'arraybuffer';
            ws.onopen = handle_open;
            ws.onmessage = handle_message;
            ws.onerror = handle_error;
            ws.onclose = handle_close;
            window.onbeforeunload = ws.close.bind(ws);
            return ws;
        }

        function handle_open() {
            console.log('WebSocket connection to ' + this.url + ' established.');
        }

        function handle_message(ws_message) {
            depth = new Uint16Array(ws_message.data);
        }

        function send_message(app_message) {
            if (ws.readyState === 1) {
                ws.send(app_message);
            }
        }

        function handle_error(event) {
            console.log('WebSocket error during connection to ' + this.url);
        }

        function handle_close() {
            console.log('WebSocket connection to ' + this.url + ' closed.');
        }

        ws = create_ws_connection(ask_for_ws_server());

        function read() {
            return depth;
        }

        var exports = {
            read: read,
            send_message: send_message
        };

        return exports;
    }
});
