/**
 * DevExtreme (ui/file_manager/ui.file_manager.file_actions_button.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _renderer = require("../../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _extend = require("../../core/utils/extend");
var _ui = require("../widget/ui.widget");
var _ui2 = _interopRequireDefault(_ui);
var _button = require("../button");
var _button2 = _interopRequireDefault(_button);

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
var FILE_MANAGER_FILE_ACTIONS_BUTTON = "dx-filemanager-file-actions-button";
var FILE_MANAGER_FILE_ACTIONS_BUTTON_ACTIVATED = "dx-filemanager-file-actions-button-activated";
var ACTIVE_STATE_CLASS = "dx-state-active";
var FileManagerFileActionsButton = function(_Widget) {
    _inherits(FileManagerFileActionsButton, _Widget);
    var _super = _createSuper(FileManagerFileActionsButton);

    function FileManagerFileActionsButton() {
        _classCallCheck(this, FileManagerFileActionsButton);
        return _super.apply(this, arguments)
    }
    _createClass(FileManagerFileActionsButton, [{
        key: "_initMarkup",
        value: function() {
            var _this = this;
            this._createClickAction();
            var $button = (0, _renderer2.default)("<div>");
            this.$element().append($button).addClass(FILE_MANAGER_FILE_ACTIONS_BUTTON);
            this._button = this._createComponent($button, _button2.default, {
                icon: "overflow",
                stylingMode: "text",
                onClick: function(e) {
                    return _this._raiseClick(e)
                }
            });
            _get(_getPrototypeOf(FileManagerFileActionsButton.prototype), "_initMarkup", this).call(this)
        }
    }, {
        key: "_createClickAction",
        value: function() {
            this._clickAction = this._createActionByOption("onClick")
        }
    }, {
        key: "_raiseClick",
        value: function(e) {
            this._clickAction(e)
        }
    }, {
        key: "_getDefaultOptions",
        value: function() {
            return (0, _extend.extend)(_get(_getPrototypeOf(FileManagerFileActionsButton.prototype), "_getDefaultOptions", this).call(this), {
                cssClass: "",
                onClick: null
            })
        }
    }, {
        key: "_optionChanged",
        value: function(args) {
            var name = args.name;
            switch (name) {
                case "cssClass":
                    this.repaint();
                    break;
                case "onClick":
                    this._createClickAction();
                    break;
                default:
                    _get(_getPrototypeOf(FileManagerFileActionsButton.prototype), "_optionChanged", this).call(this, args)
            }
        }
    }, {
        key: "setActive",
        value: function(active) {
            var _this2 = this;
            this.$element().toggleClass(FILE_MANAGER_FILE_ACTIONS_BUTTON_ACTIVATED, active);
            setTimeout(function() {
                return _this2._button.$element().toggleClass(ACTIVE_STATE_CLASS, active)
            })
        }
    }]);
    return FileManagerFileActionsButton
}(_ui2.default);
module.exports = FileManagerFileActionsButton;
