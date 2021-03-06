/**
 * DevExtreme (ui/diagram/ui.diagram.context_toolbox.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _renderer = require("../../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _ui = require("../widget/ui.widget");
var _ui2 = _interopRequireDefault(_ui);
var _popover = require("../popover");
var _popover2 = _interopRequireDefault(_popover);

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
var DIAGRAM_CONTEXT_TOOLBOX_TARGET_CLASS = "dx-diagram-context-toolbox-target";
var DIAGRAM_CONTEXT_TOOLBOX_CLASS = "dx-diagram-context-toolbox";
var DIAGRAM_CONTEXT_TOOLBOX_CONTENT_CLASS = "dx-diagram-context-toolbox-content";
var DiagramContextToolbox = function(_Widget) {
    _inherits(DiagramContextToolbox, _Widget);
    var _super = _createSuper(DiagramContextToolbox);

    function DiagramContextToolbox() {
        _classCallCheck(this, DiagramContextToolbox);
        return _super.apply(this, arguments)
    }
    _createClass(DiagramContextToolbox, [{
        key: "_init",
        value: function() {
            _get(_getPrototypeOf(DiagramContextToolbox.prototype), "_init", this).call(this);
            this._onShownAction = this._createActionByOption("onShown");
            this._popoverPositionData = [{
                my: {
                    x: "center",
                    y: "top"
                },
                at: {
                    x: "center",
                    y: "bottom"
                },
                offset: {
                    x: 0,
                    y: 5
                }
            }, {
                my: {
                    x: "right",
                    y: "center"
                },
                at: {
                    x: "left",
                    y: "center"
                },
                offset: {
                    x: -5,
                    y: 0
                }
            }, {
                my: {
                    x: "center",
                    y: "bottom"
                },
                at: {
                    x: "center",
                    y: "top"
                },
                offset: {
                    x: 0,
                    y: -5
                }
            }, {
                my: {
                    x: "left",
                    y: "center"
                },
                at: {
                    x: "right",
                    y: "center"
                },
                offset: {
                    x: 5,
                    y: 0
                }
            }]
        }
    }, {
        key: "_initMarkup",
        value: function() {
            _get(_getPrototypeOf(DiagramContextToolbox.prototype), "_initMarkup", this).call(this);
            this._$popoverTargetElement = (0, _renderer2.default)("<div>").addClass(DIAGRAM_CONTEXT_TOOLBOX_TARGET_CLASS).appendTo(this.$element());
            var $popoverElement = (0, _renderer2.default)("<div>").appendTo(this.$element());
            this._popoverInstance = this._createComponent($popoverElement, _popover2.default, {
                closeOnOutsideClick: false,
                container: this.$element(),
                elementAttr: {
                    "class": DIAGRAM_CONTEXT_TOOLBOX_CLASS
                }
            })
        }
    }, {
        key: "_show",
        value: function(x, y, side, category, callback) {
            this._popoverInstance.hide();
            var $content = (0, _renderer2.default)("<div>").addClass(DIAGRAM_CONTEXT_TOOLBOX_CONTENT_CLASS);
            this._$popoverTargetElement.css({
                left: x + this._popoverPositionData[side].offset.x,
                top: y + this._popoverPositionData[side].offset.y
            }).show();
            this._popoverInstance.option({
                position: {
                    my: this._popoverPositionData[side].my,
                    at: this._popoverPositionData[side].at,
                    of: this._$popoverTargetElement
                },
                contentTemplate: $content,
                onContentReady: function() {
                    var _this = this;
                    var $element = this.$element().find("." + DIAGRAM_CONTEXT_TOOLBOX_CONTENT_CLASS);
                    this._onShownAction({
                        category: category,
                        callback: callback,
                        $element: $element,
                        hide: function() {
                            return _this._popoverInstance.hide()
                        }
                    })
                }.bind(this)
            });
            this._popoverInstance.show()
        }
    }, {
        key: "_hide",
        value: function() {
            this._$popoverTargetElement.hide();
            this._popoverInstance.hide()
        }
    }]);
    return DiagramContextToolbox
}(_ui2.default);
module.exports = DiagramContextToolbox;
