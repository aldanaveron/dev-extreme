/**
 * DevExtreme (ui/scheduler/tooltip_strategies/mobileTooltipStrategy.js)
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
exports.MobileTooltipStrategy = void 0;
var _overlay = require("../../overlay");
var _overlay2 = _interopRequireDefault(_overlay);
var _tooltipStrategyBase = require("./tooltipStrategyBase");
var _window = require("../../../core/utils/window");

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
var SLIDE_PANEL_CLASS_NAME = "dx-scheduler-overlay-panel";
var MAX_OVERLAY_HEIGHT = 250;
var animationConfig = {
    show: {
        type: "slide",
        duration: 300,
        from: {
            position: {
                my: "top",
                at: "bottom",
                of: (0, _window.getWindow)()
            }
        },
        to: {
            position: {
                my: "center",
                at: "center",
                of: (0, _window.getWindow)()
            }
        }
    },
    hide: {
        type: "slide",
        duration: 300,
        to: {
            position: {
                my: "top",
                at: "bottom",
                of: (0, _window.getWindow)()
            }
        },
        from: {
            position: {
                my: "center",
                at: "center",
                of: (0, _window.getWindow)()
            }
        }
    }
};
var positionConfig = {
    my: "bottom",
    at: "bottom",
    of: (0, _window.getWindow)()
};
var MobileTooltipStrategy = exports.MobileTooltipStrategy = function(_TooltipStrategyBase) {
    _inherits(MobileTooltipStrategy, _TooltipStrategyBase);
    var _super = _createSuper(MobileTooltipStrategy);

    function MobileTooltipStrategy() {
        _classCallCheck(this, MobileTooltipStrategy);
        return _super.apply(this, arguments)
    }
    _createClass(MobileTooltipStrategy, [{
        key: "_shouldUseTarget",
        value: function() {
            return false
        }
    }, {
        key: "_onShowing",
        value: function() {
            this._tooltip.option("height", "auto");
            var height = this._list.$element().outerHeight();
            this._tooltip.option("height", height > MAX_OVERLAY_HEIGHT ? MAX_OVERLAY_HEIGHT : "auto")
        }
    }, {
        key: "_createTooltip",
        value: function(target, dataList) {
            var _this = this;
            var $overlay = this._createTooltipElement(SLIDE_PANEL_CLASS_NAME);
            return this._options.createComponent($overlay, _overlay2.default, {
                shading: false,
                position: positionConfig,
                animation: animationConfig,
                target: this._options.container,
                container: this._options.container,
                closeOnOutsideClick: true,
                width: "100%",
                height: "auto",
                onShowing: function() {
                    return _this._onShowing()
                },
                onShown: this._onShown.bind(this),
                contentTemplate: this._getContentTemplate(dataList)
            })
        }
    }]);
    return MobileTooltipStrategy
}(_tooltipStrategyBase.TooltipStrategyBase);