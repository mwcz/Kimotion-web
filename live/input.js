define(['exports', 'module', 'recording'], function (exports, module, _recording) {
  // import websockets from 'websockets';
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _recording2 = _interopRequireDefault(_recording);

  // var input_source = [websockets, recording][~~confirm('Ok for recording, Cancel for websockets')]();
  var input_source = _recording2['default']();

  module.exports = input_source;
});
