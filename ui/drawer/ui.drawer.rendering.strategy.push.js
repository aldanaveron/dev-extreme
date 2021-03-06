/**
 * DevExtreme (ui/drawer/ui.drawer.rendering.strategy.push.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _uiDrawerRendering = require("./ui.drawer.rendering.strategy");
var _uiDrawerRendering2 = _interopRequireDefault(_uiDrawerRendering);
var _renderer = require("../../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _translator = require("../../animation/translator");
var _translator2 = _interopRequireDefault(_translator);
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
var PushStrategy = function(_DrawerStrategy) {
    _inherits(PushStrategy, _DrawerStrategy);
    var _super = _createSuper(PushStrategy);

    function PushStrategy() {
        _classCallCheck(this, PushStrategy);
        return _super.apply(this, arguments)
    }
    _createClass(PushStrategy, [{
        key: "_useDefaultAnimation",
        value: function() {
            return true
        }
    }, {
        key: "_defaultPositionRendering",
        value: function(config, _, animate) {
            var _this = this;
            var drawer = this.getDrawerInstance();
            (0, _renderer2.default)(drawer.content()).css(drawer.isHorizontalDirection() ? "width" : "height", config.maxSize);
            if (animate) {
                var animationConfig = {
                    $element: config.$content,
                    position: config.contentPosition,
                    direction: drawer.calcTargetPosition(),
                    duration: drawer.option("animationDuration"),
                    complete: function() {
                        _this._elementsAnimationCompleteHandler()
                    }
                };
                _uiDrawerRendering.animation.moveTo(animationConfig)
            } else {
                if (drawer.isHorizontalDirection()) {
                    _translator2.default.move(config.$content, {
                        left: config.contentPosition
                    })
                } else {
                    _translator2.default.move(config.$content, {
                        top: config.contentPosition
                    })
                }
            }
        }
    }, {
        key: "_getPositionRenderingConfig",
        value: function(isDrawerOpened) {
            return (0, _extend.extend)(_get(_getPrototypeOf(PushStrategy.prototype), "_getPositionRenderingConfig", this).call(this, isDrawerOpened), {
                contentPosition: this._getPanelSize(isDrawerOpened) * this.getDrawerInstance()._getPositionCorrection(),
                maxSize: this._getPanelSize(true)
            })
        }
    }]);
    return PushStrategy
}(_uiDrawerRendering2.default);
module.exports = PushStrategy;
