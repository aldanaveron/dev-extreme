/**
 * DevExtreme (ui/number_box/number_box.spins.js)
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
var _button = require("../text_box/texteditor_button_collection/button");
var _button2 = _interopRequireDefault(_button);
var _number_box = require("./number_box.spin");
var _number_box2 = _interopRequireDefault(_number_box);
var _utils = require("../../events/utils");
var _pointer = require("../../events/pointer");
var _extend = require("../../core/utils/extend");

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
var SPIN_CLASS = "dx-numberbox-spin";
var SPIN_CONTAINER_CLASS = "dx-numberbox-spin-container";
var SPIN_TOUCH_FRIENDLY_CLASS = "dx-numberbox-spin-touch-friendly";
var SpinButtons = function(_TextEditorButton) {
    _inherits(SpinButtons, _TextEditorButton);
    var _super = _createSuper(SpinButtons);

    function SpinButtons() {
        _classCallCheck(this, SpinButtons);
        return _super.apply(this, arguments)
    }
    _createClass(SpinButtons, [{
        key: "_attachEvents",
        value: function(instance, $spinContainer) {
            var editor = this.editor;
            var eventName = (0, _utils.addNamespace)(_pointer.down, editor.NAME);
            var $spinContainerChildren = $spinContainer.children();
            var pointerDownAction = editor._createAction(function(e) {
                return editor._spinButtonsPointerDownHandler(e)
            });
            _events_engine2.default.off($spinContainer, eventName);
            _events_engine2.default.on($spinContainer, eventName, function(e) {
                return pointerDownAction({
                    event: e
                })
            });
            _number_box2.default.getInstance($spinContainerChildren.eq(0)).option("onChange", function(e) {
                return editor._spinUpChangeHandler(e)
            });
            _number_box2.default.getInstance($spinContainerChildren.eq(1)).option("onChange", function(e) {
                return editor._spinDownChangeHandler(e)
            })
        }
    }, {
        key: "_create",
        value: function() {
            var editor = this.editor;
            var $spinContainer = (0, _renderer2.default)("<div>").addClass(SPIN_CONTAINER_CLASS);
            var $spinUp = (0, _renderer2.default)("<div>").appendTo($spinContainer);
            var $spinDown = (0, _renderer2.default)("<div>").appendTo($spinContainer);
            var options = this._getOptions();
            this._addToContainer($spinContainer);
            editor._createComponent($spinUp, _number_box2.default, (0, _extend.extend)({
                direction: "up"
            }, options));
            editor._createComponent($spinDown, _number_box2.default, (0, _extend.extend)({
                direction: "down"
            }, options));
            this._legacyRender(editor.$element(), this._isTouchFriendly(), options.visible);
            return {
                instance: $spinContainer,
                $element: $spinContainer
            }
        }
    }, {
        key: "_getOptions",
        value: function() {
            var editor = this.editor;
            var visible = this._isVisible();
            var disabled = editor.option("disabled");
            return {
                visible: visible,
                disabled: disabled
            }
        }
    }, {
        key: "_isVisible",
        value: function() {
            var editor = this.editor;
            return _get(_getPrototypeOf(SpinButtons.prototype), "_isVisible", this).call(this) && editor.option("showSpinButtons")
        }
    }, {
        key: "_isTouchFriendly",
        value: function() {
            var editor = this.editor;
            return editor.option("showSpinButtons") && editor.option("useLargeSpinButtons")
        }
    }, {
        key: "_legacyRender",
        value: function($editor, isTouchFriendly, isVisible) {
            $editor.toggleClass(SPIN_TOUCH_FRIENDLY_CLASS, isTouchFriendly);
            $editor.toggleClass(SPIN_CLASS, isVisible)
        }
    }, {
        key: "update",
        value: function() {
            var shouldUpdate = _get(_getPrototypeOf(SpinButtons.prototype), "update", this).call(this);
            if (shouldUpdate) {
                var editor = this.editor,
                    instance = this.instance;
                var $editor = editor.$element();
                var isVisible = this._isVisible();
                var isTouchFriendly = this._isTouchFriendly();
                var $spinButtons = instance.children();
                var spinUp = _number_box2.default.getInstance($spinButtons.eq(0));
                var spinDown = _number_box2.default.getInstance($spinButtons.eq(1));
                var options = this._getOptions();
                spinUp.option(options);
                spinDown.option(options);
                this._legacyRender($editor, isTouchFriendly, isVisible)
            }
        }
    }]);
    return SpinButtons
}(_button2.default);
exports.default = SpinButtons;
