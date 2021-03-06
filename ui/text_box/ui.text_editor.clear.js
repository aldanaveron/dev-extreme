/**
 * DevExtreme (ui/text_box/ui.text_editor.clear.js)
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
var _renderer = require("../../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _events_engine = require("../../events/core/events_engine");
var _events_engine2 = _interopRequireDefault(_events_engine);
var _button = require("./texteditor_button_collection/button");
var _button2 = _interopRequireDefault(_button);
var _utils = require("../../events/utils");
var _pointer = require("../../events/pointer");
var _click = require("../../events/click");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _typeof(obj) {
    "@babel/helpers - typeof";
    if ("function" === typeof Symbol && "symbol" === typeof Symbol.iterator) {
        _typeof = function(obj) {
            return typeof obj
        }
    } else {
        _typeof = function(obj) {
            return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
        }
    }
    return _typeof(obj)
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

function _get(target, property, receiver) {
    if ("undefined" !== typeof Reflect && Reflect.get) {
        _get = Reflect.get
    } else {
        _get = function(target, property, receiver) {
            var base = _superPropBase(target, property);
            if (!base) {
                return
            }
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
                return desc.get.call(receiver)
            }
            return desc.value
        }
    }
    return _get(target, property, receiver || target)
}

function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
        object = _getPrototypeOf(object);
        if (null === object) {
            break
        }
    }
    return object
}

function _createSuper(Derived) {
    return function() {
        var result, Super = _getPrototypeOf(Derived);
        if (_isNativeReflectConstruct()) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget)
        } else {
            result = Super.apply(this, arguments)
        }
        return _possibleConstructorReturn(this, result)
    }
}

function _possibleConstructorReturn(self, call) {
    if (call && ("object" === _typeof(call) || "function" === typeof call)) {
        return call
    }
    return _assertThisInitialized(self)
}

function _assertThisInitialized(self) {
    if (void 0 === self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
    }
    return self
}

function _isNativeReflectConstruct() {
    if ("undefined" === typeof Reflect || !Reflect.construct) {
        return false
    }
    if (Reflect.construct.sham) {
        return false
    }
    if ("function" === typeof Proxy) {
        return true
    }
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
        return true
    } catch (e) {
        return false
    }
}

function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function(o) {
        return o.__proto__ || Object.getPrototypeOf(o)
    };
    return _getPrototypeOf(o)
}

function _inherits(subClass, superClass) {
    if ("function" !== typeof superClass && null !== superClass) {
        throw new TypeError("Super expression must either be null or a function")
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) {
        _setPrototypeOf(subClass, superClass)
    }
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function(o, p) {
        o.__proto__ = p;
        return o
    };
    return _setPrototypeOf(o, p)
}
var STATE_INVISIBLE_CLASS = "dx-state-invisible";
var TEXTEDITOR_CLEAR_BUTTON_CLASS = "dx-clear-button-area";
var TEXTEDITOR_CLEAR_ICON_CLASS = "dx-icon-clear";
var TEXTEDITOR_ICON_CLASS = "dx-icon";
var TEXTEDITOR_SHOW_CLEAR_BUTTON_CLASS = "dx-show-clear-button";
var ClearButton = function(_TextEditorButton) {
    _inherits(ClearButton, _TextEditorButton);
    var _super = _createSuper(ClearButton);

    function ClearButton() {
        _classCallCheck(this, ClearButton);
        return _super.apply(this, arguments)
    }
    _createClass(ClearButton, [{
        key: "_create",
        value: function() {
            var $element = (0, _renderer2.default)("<span>").addClass(TEXTEDITOR_CLEAR_BUTTON_CLASS).append((0, _renderer2.default)("<span>").addClass(TEXTEDITOR_ICON_CLASS).addClass(TEXTEDITOR_CLEAR_ICON_CLASS));
            this._addToContainer($element);
            this.update(true);
            return {
                instance: $element,
                $element: $element
            }
        }
    }, {
        key: "_isVisible",
        value: function() {
            var editor = this.editor;
            return editor._isClearButtonVisible()
        }
    }, {
        key: "_attachEvents",
        value: function(instance, $button) {
            var editor = this.editor;
            var editorName = editor.NAME;
            _events_engine2.default.on($button, (0, _utils.addNamespace)(_pointer.down, editorName), function(e) {
                "mouse" === e.pointerType ? e.preventDefault() : editor._clearValueHandler(e)
            });
            _events_engine2.default.on($button, (0, _utils.addNamespace)(_click.name, editorName), function(e) {
                return editor._clearValueHandler(e)
            })
        }
    }, {
        key: "_legacyRender",
        value: function($editor, isVisible) {
            $editor.toggleClass(TEXTEDITOR_SHOW_CLEAR_BUTTON_CLASS, isVisible)
        }
    }, {
        key: "update",
        value: function() {
            var rendered = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : false;
            !rendered && _get(_getPrototypeOf(ClearButton.prototype), "update", this).call(this);
            var editor = this.editor,
                instance = this.instance;
            var $editor = editor.$element();
            var isVisible = this._isVisible();
            instance && instance.toggleClass(STATE_INVISIBLE_CLASS, !isVisible);
            this._legacyRender($editor, isVisible)
        }
    }]);
    return ClearButton
}(_button2.default);
exports.default = ClearButton;
