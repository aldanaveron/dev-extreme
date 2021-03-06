/**
 * DevExtreme (ui/text_box/ui.text_editor.mask.strategy.default.js)
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
var _uiText_editorMaskStrategy = require("./ui.text_editor.mask.strategy.base");
var _uiText_editorMaskStrategy2 = _interopRequireDefault(_uiText_editorMaskStrategy);
var _utils = require("../../events/utils");
var _promise = require("../../core/polyfills/promise");
var _promise2 = _interopRequireDefault(_promise);

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

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) {
        return
    }
    if ("string" === typeof o) {
        return _arrayLikeToArray(o, minLen)
    }
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if ("Object" === n && o.constructor) {
        n = o.constructor.name
    }
    if ("Map" === n || "Set" === n) {
        return Array.from(n)
    }
    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
        return _arrayLikeToArray(o, minLen)
    }
}

function _iterableToArray(iter) {
    if ("undefined" !== typeof Symbol && Symbol.iterator in Object(iter)) {
        return Array.from(iter)
    }
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        return _arrayLikeToArray(arr)
    }
}

function _arrayLikeToArray(arr, len) {
    if (null == len || len > arr.length) {
        len = arr.length
    }
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i]
    }
    return arr2
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
var BACKSPACE_INPUT_TYPE = "deleteContentBackward";
var EMPTY_CHAR = " ";
var DefaultMaskStrategy = function(_BaseMaskStrategy) {
    _inherits(DefaultMaskStrategy, _BaseMaskStrategy);
    var _super = _createSuper(DefaultMaskStrategy);

    function DefaultMaskStrategy() {
        _classCallCheck(this, DefaultMaskStrategy);
        return _super.apply(this, arguments)
    }
    _createClass(DefaultMaskStrategy, [{
        key: "_getStrategyName",
        value: function() {
            return "default"
        }
    }, {
        key: "getHandleEventNames",
        value: function() {
            return [].concat(_toConsumableArray(_get(_getPrototypeOf(DefaultMaskStrategy.prototype), "getHandleEventNames", this).call(this)), ["keyPress"])
        }
    }, {
        key: "_keyPressHandler",
        value: function(event) {
            if (this._keyPressHandled) {
                return
            }
            this._keyPressHandled = true;
            if (this.editor._isControlKeyFired(event)) {
                return
            }
            var editor = this.editor;
            editor._maskKeyHandler(event, function() {
                return editor._handleKey((0, _utils.getChar)(event))
            })
        }
    }, {
        key: "_inputHandler",
        value: function(event) {
            if (this._backspaceInputHandled(event.originalEvent && event.originalEvent.inputType)) {
                this._handleBackspaceInput(event)
            }
            if (this._keyPressHandled) {
                return
            }
            this._keyPressHandled = true;
            var inputValue = this.editorInput().val();
            var caret = this.editorCaret();
            if (!caret.end) {
                return
            }
            caret.start = caret.end - 1;
            var oldValue = inputValue.substring(0, caret.start) + inputValue.substring(caret.end);
            var char = inputValue[caret.start];
            this.editorInput().val(oldValue);
            this._inputHandlerTimer = setTimeout(function() {
                var _this = this;
                this._caret({
                    start: caret.start,
                    end: caret.start
                });
                this._maskKeyHandler(event, function() {
                    return _this._handleKey(char)
                })
            }.bind(this.editor))
        }
    }, {
        key: "_backspaceHandler",
        value: function(event) {
            var _this2 = this;
            var editor = this.editor;
            this._keyPressHandled = true;
            var afterBackspaceHandler = function(needAdjustCaret, callBack) {
                if (needAdjustCaret) {
                    editor._direction(_this2.DIRECTION.FORWARD);
                    editor._adjustCaret()
                }
                var currentCaret = _this2.editorCaret();
                return new _promise2.default(function(resolve) {
                    clearTimeout(_this2._backspaceHandlerTimeout);
                    _this2._backspaceHandlerTimeout = setTimeout(function() {
                        callBack(currentCaret);
                        resolve()
                    })
                })
            };
            editor._maskKeyHandler(event, function() {
                if (editor._hasSelection()) {
                    return afterBackspaceHandler(true, function(currentCaret) {
                        editor._displayMask(currentCaret);
                        editor._maskRulesChain.reset()
                    })
                }
                if (editor._tryMoveCaretBackward()) {
                    return afterBackspaceHandler(false, function(currentCaret) {
                        _this2.editorCaret(currentCaret)
                    })
                }
                editor._handleKey(EMPTY_CHAR, _this2.DIRECTION.BACKWARD);
                return afterBackspaceHandler(true, function(currentCaret) {
                    editor._displayMask(currentCaret);
                    editor._maskRulesChain.reset()
                })
            })
        }
    }, {
        key: "_backspaceInputHandled",
        value: function(inputType) {
            return inputType === BACKSPACE_INPUT_TYPE && !this._keyPressHandled
        }
    }, {
        key: "_handleBackspaceInput",
        value: function(event) {
            var _this$editorCaret = this.editorCaret(),
                start = _this$editorCaret.start,
                end = _this$editorCaret.end;
            this.editorCaret({
                start: start + 1,
                end: end + 1
            });
            this._backspaceHandler(event)
        }
    }, {
        key: "clean",
        value: function() {
            _get(_getPrototypeOf(DefaultMaskStrategy.prototype), "clean", this).call(this);
            clearTimeout(this._inputHandlerTimer)
        }
    }]);
    return DefaultMaskStrategy
}(_uiText_editorMaskStrategy2.default);
exports.default = DefaultMaskStrategy;
