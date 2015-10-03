define(['exports', 'zepto', 'lodash', 'mods', 'text!blacklist.json'], function (exports, _zepto, _lodash, _mods, _textBlacklistJson) {
    'use strict';

    exports.__esModule = true;

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _$ = _interopRequireDefault(_zepto);

    var blacklist = JSON.parse(_textBlacklistJson);

    // choose a random mod to be the starting one
    var modnames = names();
    var modcount = _lodash.size(modnames);
    var i = Math.max(0, modnames.indexOf(location.hash.slice(1)));
    var curmod = undefined;
    var gfx = undefined;

    var display_title = _$['default']('#nowplaying #title');
    var display_author = _$['default']('#nowplaying #author');

    function next() {
        i += 1;
        i %= modcount;
        set(modnames[i]);
    }

    function set(modname) {
        i = _lodash.indexOf(modnames, modname);
        curmod.destroy(gfx);
        gfx.reset();

        create(gfx);

        location.hash = modname;

        //this is only needed for long-running art installations
        //location.reload();
    }

    function names() {
        return _lodash.without.apply(undefined, [_lodash.keys(_mods), '__esModule'].concat(blacklist));
    }

    function get() {
        return curmod;
    }

    function update(_gfx) {
        curmod.update(gfx);

        //modnames = names();
        //modcount = size(modnames); // probably need this for DIY station mods
    }

    function create(_gfx) {
        var modname = arguments.length <= 1 || arguments[1] === undefined ? modnames[i] : arguments[1];

        console.log('Activating mod: ' + modname);

        if (_lodash.contains(modnames, modname)) {
            gfx = _gfx;
            curmod = new _mods[modname](gfx);
        } else {
            gfx = _gfx;
            curmod = new _mods[modnames[i]](gfx);
            location.hash = modnames[i];
        }

        // display the title and author
        display_title.text(curmod.title);
        display_author.text(curmod.author);
    }

    exports.next = next;
    exports.get = get;
    exports.set = set;
    exports.names = names;
    exports.update = update;
    exports.create = create;
});
