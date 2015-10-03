define(['exports', './effects/cube/cube', './effects/handtracking2d/handtracking2d', './effects/handtracking3d/handtracking3d', './effects/particles/particles', './effects/torus/torus'], function (exports, _effectsCubeCube, _effectsHandtracking2dHandtracking2d, _effectsHandtracking3dHandtracking3d, _effectsParticlesParticles, _effectsTorusTorus) {
  'use strict';

  exports.__esModule = true;

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  exports.cube = _interopRequire(_effectsCubeCube);
  exports.handtracking2d = _interopRequire(_effectsHandtracking2dHandtracking2d);
  exports.handtracking3d = _interopRequire(_effectsHandtracking3dHandtracking3d);
  exports.particles = _interopRequire(_effectsParticlesParticles);
  exports.torus = _interopRequire(_effectsTorusTorus);
});
