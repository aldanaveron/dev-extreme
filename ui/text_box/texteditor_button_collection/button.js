/**
 * DevExtreme (ui/text_box/texteditor_button_collection/button.js)
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
exports.default = void 0;
var _renderer = require("../../../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);

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
var TextEditorButton = function() {
    function TextEditorButton(name, editor, options) {
        _classCallCheck(this, TextEditorButton);
        this.instance = null;
        this.$container = null;
        this.$placeMarker = null;
        this.editor = editor;
        this.name = name;
        this.options = options || {}
    }
    _createClass(TextEditorButton, [{
        key: "_addPlaceMarker",
        value: function($container) {
            this.$placeMarker = (0, _renderer2.default)("<div>").appendTo($container)
        }
    }, {
        key: "_addToContainer",
        value: function($element) {
            var $placeMarker = this.$placeMarker,
                $container = this.$container;
            $placeMarker ? $placeMarker.replaceWith($element) : $element.appendTo($container)
        }
    }, {
        key: "_attachEvents",
        value: function() {
            throw "Not implemented"
        }
    }, {
        key: "_create",
        value: function() {
            throw "Not implemented"
        }
    }, {
        key: "_isRendered",
        value: function() {
            return !!this.instance
        }
    }, {
        key: "_isVisible",
        value: function() {
            var editor = this.editor,
                options = this.options;
            return options.visible || !editor.option("readOnly")
        }
    }, {
        key: "_isDisabled",
        value: function() {
            throw "Not implemented"
        }
    }, {
        key: "_shouldRender",
        value: function() {
            return this._isVisible() && !this._isRendered()
        }
    }, {
        key: "dispose",
        value: function() {
            var instance = this.instance,
                $placeMarker = this.$placeMarker;
            if (instance) {
                instance.dispose ? instance.dispose() : instance.remove();
                this.instance = null
            }
            $placeMarker && $placeMarker.remove()
        }
    }, {
        key: "render",
        value: function() {
            var $container = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.$container;
            this.$container = $container;
            if (this._isVisible()) {
                var _this$_create = this._create(),
                    instance = _this$_create.instance,
                    $element = _this$_create.$element;
                this.instance = instance;
                this._attachEvents(instance, $element)
            } else {
                this._addPlaceMarker($container)
            }
        }
    }, {
        key: "update",
        value: function() {
            if (this._shouldRender()) {
                this.render()
            }
            return !!this.instance
        }
    }]);
    return TextEditorButton
}();
exports.default = TextEditorButton;
