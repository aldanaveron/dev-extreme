/**
 * DevExtreme (ui/drawer/ui.drawer.rendering.strategy.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";

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
var _renderer = require("../../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _fx = require("../../animation/fx");
var _fx2 = _interopRequireDefault(_fx);
var _deferred = require("../../core/utils/deferred");
var _inflector = require("../../core/utils/inflector");
var _type = require("../../core/utils/type");
var _z_index = require("../overlay/z_index");
var zIndexPool = _interopRequireWildcard(_z_index);

function _getRequireWildcardCache() {
    if ("function" !== typeof WeakMap) {
        return null
    }
    var cache = new WeakMap;
    _getRequireWildcardCache = function() {
        return cache
    };
    return cache
}

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj
    }
    if (null === obj || "object" !== _typeof(obj) && "function" !== typeof obj) {
        return {
            "default": obj
        }
    }
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) {
        return cache.get(obj)
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc)
            } else {
                newObj[key] = obj[key]
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj)
    }
    return newObj
}

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
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
var animation = {
    moveTo: function(config) {
        var $element = config.$element;
        var position = config.position;
        var direction = config.direction || "left";
        var toConfig = {};
        var animationType;
        switch (direction) {
            case "right":
                toConfig.transform = "translate(" + position + "px, 0px)";
                animationType = "custom";
                break;
            case "left":
                toConfig.left = position;
                animationType = "slide";
                break;
            case "top":
            case "bottom":
                toConfig.top = position;
                animationType = "slide"
        }
        _fx2.default.animate($element, {
            type: animationType,
            to: toConfig,
            duration: config.duration,
            complete: config.complete
        })
    },
    margin: function margin(config) {
        var $element = config.$element;
        var margin = config.margin;
        var direction = config.direction || "left";
        var toConfig = {};
        toConfig["margin" + (0, _inflector.camelize)(direction, true)] = margin;
        _fx2.default.animate($element, {
            to: toConfig,
            duration: config.duration,
            complete: config.complete
        })
    },
    fade: function($element, config, duration, completeAction) {
        _fx2.default.animate($element, {
            type: "fade",
            to: config.to,
            from: config.from,
            duration: duration,
            complete: completeAction
        })
    },
    size: function size(config) {
        var $element = config.$element;
        var size = config.size;
        var direction = config.direction || "left";
        var marginTop = config.marginTop || 0;
        var duration = config.duration;
        var toConfig = {};
        if ("right" === direction || "left" === direction) {
            toConfig.width = size
        } else {
            toConfig.height = size
        }
        if ("bottom" === direction) {
            toConfig.marginTop = marginTop
        }
        _fx2.default.animate($element, {
            to: toConfig,
            duration: duration,
            complete: config.complete
        })
    },
    complete: function($element) {
        _fx2.default.stop($element, true)
    }
};
var DrawerStrategy = function() {
    function DrawerStrategy(drawer) {
        _classCallCheck(this, DrawerStrategy);
        this._drawer = drawer
    }
    _createClass(DrawerStrategy, [{
        key: "getDrawerInstance",
        value: function() {
            return this._drawer
        }
    }, {
        key: "renderPanelContent",
        value: function(whenPanelContentRendered) {
            var drawer = this.getDrawerInstance();
            var template = drawer._getTemplate(drawer.option("template"));
            if (template) {
                template.render({
                    container: drawer.content(),
                    onRendered: function() {
                        whenPanelContentRendered.resolve()
                    }
                })
            }
        }
    }, {
        key: "renderPosition",
        value: function(isDrawerOpened, animate) {
            this._prepareAnimationDeferreds(animate);
            var config = this._getPositionRenderingConfig(isDrawerOpened);
            if (this._useDefaultAnimation()) {
                this._defaultPositionRendering(config, isDrawerOpened, animate)
            } else {
                var revealMode = this.getDrawerInstance().option("revealMode");
                if ("slide" === revealMode) {
                    this._slidePositionRendering(config, isDrawerOpened, animate)
                } else {
                    if ("expand" === revealMode) {
                        this._expandPositionRendering(config, isDrawerOpened, animate)
                    }
                }
            }
        }
    }, {
        key: "_prepareAnimationDeferreds",
        value: function(animate) {
            var drawer = this.getDrawerInstance();
            this._contentAnimation = new _deferred.Deferred;
            this._panelAnimation = new _deferred.Deferred;
            this._shaderAnimation = new _deferred.Deferred;
            drawer._animations.push(this._contentAnimation, this._panelAnimation, this._shaderAnimation);
            if (animate) {
                _deferred.when.apply(_renderer2.default, drawer._animations).done(function() {
                    drawer._animationCompleteHandler()
                })
            } else {
                drawer.resizeViewContent()
            }
        }
    }, {
        key: "_getPositionRenderingConfig",
        value: function(isDrawerOpened) {
            var drawer = this.getDrawerInstance();
            return {
                direction: drawer.calcTargetPosition(),
                $panel: (0, _renderer2.default)(drawer.content()),
                $content: (0, _renderer2.default)(drawer.viewContent()),
                defaultAnimationConfig: this._defaultAnimationConfig(),
                size: this._getPanelSize(isDrawerOpened)
            }
        }
    }, {
        key: "_useDefaultAnimation",
        value: function() {
            return false
        }
    }, {
        key: "_elementsAnimationCompleteHandler",
        value: function() {
            this._contentAnimation.resolve();
            this._panelAnimation.resolve()
        }
    }, {
        key: "_defaultAnimationConfig",
        value: function() {
            var _this = this;
            return {
                complete: function() {
                    _this._elementsAnimationCompleteHandler()
                }
            }
        }
    }, {
        key: "_getPanelOffset",
        value: function(isDrawerOpened) {
            var drawer = this.getDrawerInstance();
            var size = drawer.isHorizontalDirection() ? drawer.getRealPanelWidth() : drawer.getRealPanelHeight();
            if (isDrawerOpened) {
                return -(size - drawer.getMaxSize())
            } else {
                return -(size - drawer.getMinSize())
            }
        }
    }, {
        key: "_getPanelSize",
        value: function(isDrawerOpened) {
            return isDrawerOpened ? this.getDrawerInstance().getMaxSize() : this.getDrawerInstance().getMinSize()
        }
    }, {
        key: "renderShaderVisibility",
        value: function(isShaderVisible, animate, duration) {
            var _this2 = this;
            var drawer = this.getDrawerInstance();
            var fadeConfig = isShaderVisible ? {
                from: 0,
                to: 1
            } : {
                from: 1,
                to: 0
            };
            if (animate) {
                animation.fade((0, _renderer2.default)(drawer._$shader), fadeConfig, duration, function() {
                    _this2._drawer._toggleShaderVisibility(isShaderVisible);
                    _this2._shaderAnimation.resolve()
                })
            } else {
                drawer._toggleShaderVisibility(isShaderVisible);
                drawer._$shader.css("opacity", fadeConfig.to)
            }
        }
    }, {
        key: "updateZIndex",
        value: function() {
            if (!(0, _type.isDefined)(this._shaderZIndex)) {
                this._shaderZIndex = zIndexPool.base() + 500;
                this._drawer._$shader.css("zIndex", this._shaderZIndex)
            }
        }
    }, {
        key: "clearZIndex",
        value: function() {
            if ((0, _type.isDefined)(this._shaderZIndex)) {
                this._drawer._$shader.css("zIndex", "");
                delete this._shaderZIndex
            }
        }
    }, {
        key: "getPanelContent",
        value: function() {
            return (0, _renderer2.default)(this.getDrawerInstance().content())
        }
    }, {
        key: "setPanelSize",
        value: function(calcFromRealPanelSize) {
            this.refreshPanelElementSize(calcFromRealPanelSize)
        }
    }, {
        key: "refreshPanelElementSize",
        value: function(calcFromRealPanelSize) {
            var drawer = this.getDrawerInstance();
            var panelSize = this._getPanelSize(drawer.option("opened"));
            if (drawer.isHorizontalDirection()) {
                (0, _renderer2.default)(drawer.content()).width(calcFromRealPanelSize ? drawer.getRealPanelWidth() : panelSize)
            } else {
                (0, _renderer2.default)(drawer.content()).height(calcFromRealPanelSize ? drawer.getRealPanelHeight() : panelSize)
            }
        }
    }, {
        key: "isViewContentFirst",
        value: function() {
            return false
        }
    }]);
    return DrawerStrategy
}();
module.exports = DrawerStrategy;
module.exports.animation = animation;
