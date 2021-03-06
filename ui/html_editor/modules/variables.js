/**
 * DevExtreme (ui/html_editor/modules/variables.js)
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
var _quill = require("quill");
var _quill2 = _interopRequireDefault(_quill);
var _renderer = require("../../../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _popup = require("./popup");
var _popup2 = _interopRequireDefault(_popup);
var _variable = require("../formats/variable");
var _variable2 = _interopRequireDefault(_variable);
var _extend = require("../../../core/utils/extend");

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

function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function(o) {
        return o.__proto__ || Object.getPrototypeOf(o)
    };
    return _getPrototypeOf(o)
}
var VariableModule = {};
if (_quill2.default) {
    var VARIABLE_FORMAT_CLASS = "dx-variable-format";
    var ACTIVE_FORMAT_CLASS = "dx-format-active";
    _quill2.default.register({
        "formats/variable": _variable2.default
    }, true);
    VariableModule = function(_PopupModule) {
        _inherits(VariableModule, _PopupModule);
        var _super = _createSuper(VariableModule);
        _createClass(VariableModule, [{
            key: "_getDefaultOptions",
            value: function() {
                var baseConfig = _get(_getPrototypeOf(VariableModule.prototype), "_getDefaultOptions", this).call(this);
                return (0, _extend.extend)(baseConfig, {
                    escapeChar: ""
                })
            }
        }]);

        function VariableModule(quill, options) {
            var _this;
            _classCallCheck(this, VariableModule);
            _this = _super.call(this, quill, options);
            var toolbar = quill.getModule("toolbar");
            if (toolbar) {
                toolbar.addClickHandler("variable", _this.showPopup.bind(_assertThisInitialized(_this)))
            }
            quill.keyboard.addBinding({
                key: "P",
                altKey: true
            }, _this.showPopup.bind(_assertThisInitialized(_this)));
            _this._popup.on("shown", function(e) {
                var $ofElement = (0, _renderer2.default)(e.component.option("position").of);
                if ($ofElement.hasClass(VARIABLE_FORMAT_CLASS)) {
                    $ofElement.addClass(ACTIVE_FORMAT_CLASS)
                }
            });
            return _this
        }
        _createClass(VariableModule, [{
            key: "showPopup",
            value: function(event) {
                var selection = this.quill.getSelection();
                var position = selection ? selection.index : this.quill.getLength();
                this.savePosition(position);
                this._resetPopupPosition(event, position);
                _get(_getPrototypeOf(VariableModule.prototype), "showPopup", this).call(this)
            }
        }, {
            key: "_resetPopupPosition",
            value: function(event, position) {
                if (event && event.element) {
                    this._popup.option("position", {
                        of: event.element,
                        offset: {
                            h: 0,
                            v: 0
                        },
                        my: "top center",
                        at: "bottom center",
                        collision: "fit"
                    })
                } else {
                    var mentionBounds = this.quill.getBounds(position);
                    var rootRect = this.quill.root.getBoundingClientRect();
                    this._popup.option("position", {
                        of: this.quill.root,
                        offset: {
                            h: mentionBounds.left,
                            v: mentionBounds.bottom - rootRect.height
                        },
                        my: "top center",
                        at: "bottom left",
                        collision: "fit flip"
                    })
                }
            }
        }, {
            key: "insertEmbedContent",
            value: function(selectionChangedEvent) {
                var caretPosition = this.getPosition();
                var selectedItem = selectionChangedEvent.component.option("selectedItem");
                var variableData = (0, _extend.extend)({}, {
                    value: selectedItem,
                    escapeChar: this.options.escapeChar
                });
                setTimeout(function() {
                    this.quill.insertEmbed(caretPosition, "variable", variableData);
                    this.quill.setSelection(caretPosition + 1)
                }.bind(this))
            }
        }]);
        return VariableModule
    }(_popup2.default)
}
exports.default = VariableModule;
