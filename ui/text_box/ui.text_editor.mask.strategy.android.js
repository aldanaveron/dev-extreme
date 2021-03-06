/**
 * DevExtreme (ui/text_box/ui.text_editor.mask.strategy.android.js)
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
var DELETE_INPUT_TYPE = "deleteContentBackward";
var AndroidMaskStrategy = function(_BaseMaskStrategy) {
    _inherits(AndroidMaskStrategy, _BaseMaskStrategy);
    var _super = _createSuper(AndroidMaskStrategy);

    function AndroidMaskStrategy() {
        _classCallCheck(this, AndroidMaskStrategy);
        return _super.apply(this, arguments)
    }
    _createClass(AndroidMaskStrategy, [{
        key: "_getStrategyName",
        value: function() {
            return "android"
        }
    }, {
        key: "getHandleEventNames",
        value: function() {
            return [].concat(_toConsumableArray(_get(_getPrototypeOf(AndroidMaskStrategy.prototype), "getHandleEventNames", this).call(this)), ["beforeInput"])
        }
    }, {
        key: "_beforeInputHandler",
        value: function() {
            this._prevCaret = this.editorCaret()
        }
    }, {
        key: "_inputHandler",
        value: function(_ref) {
            var originalEvent = _ref.originalEvent;
            if (!originalEvent) {
                return
            }
            var inputType = originalEvent.inputType,
                data = originalEvent.data;
            var currentCaret = this.editorCaret();
            if (inputType === DELETE_INPUT_TYPE) {
                var length = this._prevCaret.end - this._prevCaret.start || 1;
                this.editor.setBackwardDirection();
                this._updateEditorMask({
                    start: currentCaret.start,
                    length: length,
                    text: this._getEmptyString(length)
                })
            } else {
                if (!currentCaret.end) {
                    return
                }
                this.editorCaret(currentCaret);
                var _length = this._prevCaret.end - this._prevCaret.start;
                var newData = data + (_length ? this._getEmptyString(_length - data.length) : "");
                this.editor.setForwardDirection();
                var hasValidChars = this._updateEditorMask({
                    start: this._prevCaret.start,
                    length: _length || newData.length,
                    text: newData
                });
                if (!hasValidChars) {
                    this.editorCaret(this._prevCaret)
                }
            }
        }
    }, {
        key: "_getEmptyString",
        value: function(length) {
            return Array(length + 1).join(" ")
        }
    }, {
        key: "_updateEditorMask",
        value: function(args) {
            var textLength = args.text.length;
            var updatedCharsCount = this.editor._handleChain(args);
            if (this.editor.isForwardDirection()) {
                var _this$editorCaret = this.editorCaret(),
                    start = _this$editorCaret.start,
                    end = _this$editorCaret.end;
                var correction = updatedCharsCount - textLength;
                if (start <= updatedCharsCount && updatedCharsCount > 1) {
                    this.editorCaret({
                        start: start + correction,
                        end: end + correction
                    })
                }
                this.editor.isForwardDirection() && this.editor._adjustCaret()
            }
            this.editor._displayMask();
            return !!updatedCharsCount
        }
    }]);
    return AndroidMaskStrategy
}(_uiText_editorMaskStrategy2.default);
exports.default = AndroidMaskStrategy;
