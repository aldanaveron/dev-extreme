/**
 * DevExtreme (ui/speed_dial_action/speed_dial_item.js)
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
var _events_engine = require("../../events/core/events_engine");
var _events_engine2 = _interopRequireDefault(_events_engine);
var _utils = require("../../events/utils");
var _click = require("../../events/click");
var _click2 = _interopRequireDefault(_click);
var _icon = require("../../core/utils/icon");
var _overlay = require("../overlay");
var _overlay2 = _interopRequireDefault(_overlay);
var _utils2 = require("../widget/utils.ink_ripple");
var _utils3 = _interopRequireDefault(_utils2);
var _themes = require("../themes");
var _themes2 = _interopRequireDefault(_themes);

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
var FAB_CLASS = "dx-fa-button";
var FAB_ICON_CLASS = "dx-fa-button-icon";
var FAB_LABEL_CLASS = "dx-fa-button-label";
var FAB_LABEL_WRAPPER_CLASS = "dx-fa-button-label-wrapper";
var FAB_CONTENT_REVERSE_CLASS = "dx-fa-button-content-reverse";
var OVERLAY_CONTENT_SELECTOR = ".dx-overlay-content";
var SpeedDialItem = function(_Overlay) {
    _inherits(SpeedDialItem, _Overlay);
    var _super = _createSuper(SpeedDialItem);

    function SpeedDialItem() {
        _classCallCheck(this, SpeedDialItem);
        return _super.apply(this, arguments)
    }
    _createClass(SpeedDialItem, [{
        key: "_getDefaultOptions",
        value: function() {
            return (0, _extend.extend)(_get(_getPrototypeOf(SpeedDialItem.prototype), "_getDefaultOptions", this).call(this), {
                shading: false,
                useInkRipple: false,
                callOverlayRenderShading: false,
                width: "auto",
                zIndex: 1500
            })
        }
    }, {
        key: "_defaultOptionsRules",
        value: function() {
            return _get(_getPrototypeOf(SpeedDialItem.prototype), "_defaultOptionsRules", this).call(this).concat([{
                device: function() {
                    return _themes2.default.isMaterial()
                },
                options: {
                    useInkRipple: true
                }
            }])
        }
    }, {
        key: "_render",
        value: function() {
            this.$element().addClass(FAB_CLASS);
            this._renderIcon();
            this._renderLabel();
            _get(_getPrototypeOf(SpeedDialItem.prototype), "_render", this).call(this);
            this.option("useInkRipple") && this._renderInkRipple();
            this._renderClick()
        }
    }, {
        key: "_renderLabel",
        value: function() {
            !!this._$label && this._$label.remove();
            var labelText = this.option("label");
            if (!labelText) {
                this._$label = null;
                return
            }
            var $element = (0, _renderer2.default)("<div>").addClass(FAB_LABEL_CLASS);
            var $wrapper = (0, _renderer2.default)("<div>").addClass(FAB_LABEL_WRAPPER_CLASS);
            this._$label = $wrapper.prependTo(this.$content()).append($element.text(labelText));
            this.$content().toggleClass(FAB_CONTENT_REVERSE_CLASS, this._isPositionLeft(this.option("parentPosition")))
        }
    }, {
        key: "_isPositionLeft",
        value: function(position) {
            var currentLocation = position ? position.at ? position.at.x ? position.at.x : position.at : "string" === typeof position ? position : "" : "";
            return "left" === currentLocation.split(" ")[0]
        }
    }, {
        key: "_renderButtonIcon",
        value: function($element, icon, iconClass) {
            !!$element && $element.remove();
            $element = (0, _renderer2.default)("<div>").addClass(iconClass);
            var $iconElement = (0, _icon.getImageContainer)(icon);
            $element.append($iconElement).appendTo(this.$content());
            return $element
        }
    }, {
        key: "_renderIcon",
        value: function() {
            this._$icon = this._renderButtonIcon(this._$icon, this._options.silent("icon"), FAB_ICON_CLASS)
        }
    }, {
        key: "_renderWrapper",
        value: function() {
            if (this._options.silent("callOverlayRenderShading")) {
                _get(_getPrototypeOf(SpeedDialItem.prototype), "_renderWrapper", this).call(this)
            }
        }
    }, {
        key: "_getVisibleActions",
        value: function(actions) {
            var currentActions = actions || this.option("actions");
            return currentActions.filter(function(action) {
                return action.option("visible")
            })
        }
    }, {
        key: "_getActionComponent",
        value: function() {
            return this.option("actionComponent") || this._getVisibleActions()[0] || this.option("actions")[0]
        }
    }, {
        key: "_initContentReadyAction",
        value: function() {
            this._contentReadyAction = this._getActionComponent()._createActionByOption("onContentReady", {
                excludeValidators: ["disabled", "readOnly"]
            }, true)
        }
    }, {
        key: "_fireContentReadyAction",
        value: function() {
            this._contentReadyAction({
                actionElement: this.$element()
            })
        }
    }, {
        key: "_updateZIndexStackPosition",
        value: function() {
            var zIndex = this.option("zIndex");
            this._$wrapper.css("zIndex", zIndex);
            this._$content.css("zIndex", zIndex)
        }
    }, {
        key: "_fixWrapperPosition",
        value: function() {
            var $wrapper = this._$wrapper;
            var $container = this._getContainer();
            $wrapper.css("position", this._isWindow($container) ? "fixed" : "absolute")
        }
    }, {
        key: "_setClickAction",
        value: function() {
            var _this = this;
            var eventName = (0, _utils.addNamespace)(_click2.default.name, this.NAME);
            var overlayContent = this.$element().find(OVERLAY_CONTENT_SELECTOR);
            _events_engine2.default.off(overlayContent, eventName);
            _events_engine2.default.on(overlayContent, eventName, function(e) {
                var clickActionArgs = {
                    event: e,
                    actionElement: _this.element(),
                    element: _this._getActionComponent().$element()
                };
                _this._clickAction(clickActionArgs)
            })
        }
    }, {
        key: "_defaultActionArgs",
        value: function() {
            return {
                component: this._getActionComponent()
            }
        }
    }, {
        key: "_renderClick",
        value: function() {
            this._clickAction = this._getActionComponent()._createActionByOption("onClick");
            this._setClickAction()
        }
    }, {
        key: "_renderInkRipple",
        value: function() {
            this._inkRipple = _utils3.default.render()
        }
    }, {
        key: "_getInkRippleContainer",
        value: function() {
            return this._$icon
        }
    }, {
        key: "_toggleActiveState",
        value: function($element, value, e) {
            _get(_getPrototypeOf(SpeedDialItem.prototype), "_toggleActiveState", this).apply(this, arguments);
            if (!this._inkRipple) {
                return
            }
            var config = {
                element: this._getInkRippleContainer(),
                event: e
            };
            if (value) {
                this._inkRipple.showWave(config)
            } else {
                this._inkRipple.hideWave(config)
            }
        }
    }, {
        key: "_optionChanged",
        value: function(args) {
            switch (args.name) {
                case "icon":
                    this._renderIcon();
                    break;
                case "onClick":
                    this._renderClick();
                    break;
                case "label":
                    this._renderLabel();
                    break;
                case "visible":
                    this._currentVisible = args.previousValue;
                    args.value ? this._show() : this._hide();
                    break;
                case "useInkRipple":
                    this._render();
                    break;
                default:
                    _get(_getPrototypeOf(SpeedDialItem.prototype), "_optionChanged", this).call(this, args)
            }
        }
    }]);
    return SpeedDialItem
}(_overlay2.default);
module.exports = SpeedDialItem;
