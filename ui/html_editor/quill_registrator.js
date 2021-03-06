/**
 * DevExtreme (ui/html_editor/quill_registrator.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _quill_importer = require("./quill_importer");
var _base = require("./themes/base");
var _base2 = _interopRequireDefault(_base);
var _image = require("./formats/image");
var _image2 = _interopRequireDefault(_image);
var _link = require("./formats/link");
var _link2 = _interopRequireDefault(_link);
var _font = require("./formats/font");
var _font2 = _interopRequireDefault(_font);
var _size = require("./formats/size");
var _size2 = _interopRequireDefault(_size);
var _align = require("./formats/align");
var _align2 = _interopRequireDefault(_align);
var _toolbar = require("./modules/toolbar");
var _toolbar2 = _interopRequireDefault(_toolbar);
var _dropImage = require("./modules/dropImage");
var _dropImage2 = _interopRequireDefault(_dropImage);
var _variables = require("./modules/variables");
var _variables2 = _interopRequireDefault(_variables);
var _resizing = require("./modules/resizing");
var _resizing2 = _interopRequireDefault(_resizing);
var _mentions = require("./modules/mentions");
var _mentions2 = _interopRequireDefault(_mentions);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function")
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
            descriptor.writable = true
        }
        Object.defineProperty(target, descriptor.key, descriptor)
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        _defineProperties(Constructor.prototype, protoProps)
    }
    if (staticProps) {
        _defineProperties(Constructor, staticProps)
    }
    return Constructor
}
var QuillRegistrator = function() {
    function QuillRegistrator() {
        _classCallCheck(this, QuillRegistrator);
        if (QuillRegistrator.initialized) {
            return
        }
        var quill = this.getQuill();
        var DirectionStyle = quill.import("attributors/style/direction");
        quill.register({
            "formats/align": _align2.default,
            "formats/direction": DirectionStyle,
            "formats/font": _font2.default,
            "formats/size": _size2.default,
            "formats/extendedImage": _image2.default,
            "formats/link": _link2.default,
            "modules/toolbar": _toolbar2.default,
            "modules/dropImage": _dropImage2.default,
            "modules/variables": _variables2.default,
            "modules/resizing": _resizing2.default,
            "modules/mentions": _mentions2.default,
            "themes/basic": _base2.default
        }, true);
        this._customModules = [];
        QuillRegistrator._initialized = true
    }
    _createClass(QuillRegistrator, [{
        key: "createEditor",
        value: function(container, config) {
            var quill = this.getQuill();
            return new quill(container, config)
        }
    }, {
        key: "registerModules",
        value: function(modulesConfig) {
            var isModule = RegExp("modules/*");
            var quill = this.getQuill();
            var isRegisteredModule = function(modulePath) {
                return !!quill.imports[modulePath]
            };
            for (var modulePath in modulesConfig) {
                if (isModule.test(modulePath) && !isRegisteredModule(modulePath)) {
                    this._customModules.push(modulePath.slice(8))
                }
            }
            quill.register(modulesConfig, true)
        }
    }, {
        key: "getRegisteredModuleNames",
        value: function() {
            return this._customModules
        }
    }, {
        key: "getQuill",
        value: function() {
            return (0, _quill_importer.getQuill)()
        }
    }]);
    return QuillRegistrator
}();
exports.default = QuillRegistrator;
