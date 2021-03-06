/**
 * DevExtreme (ui/popover.js)
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
var $ = require("../core/renderer");
var windowUtils = require("../core/utils/window");
var window = windowUtils.getWindow();
var getPublicElement = require("../core/utils/dom").getPublicElement;
var domAdapter = require("../core/dom_adapter");
var eventsEngine = require("../events/core/events_engine");
var registerComponent = require("../core/component_registrator");
var commonUtils = require("../core/utils/common");
var extend = require("../core/utils/extend").extend;
var browser = require("../core/utils/browser");
var translator = require("../animation/translator");
var positionUtils = require("../animation/position");
var typeUtils = require("../core/utils/type");
var mathUtils = require("../core/utils/math");
var eventUtils = require("../events/utils");
var Popup = require("./popup");
var POPOVER_CLASS = "dx-popover";
var POPOVER_WRAPPER_CLASS = "dx-popover-wrapper";
var POPOVER_ARROW_CLASS = "dx-popover-arrow";
var POPOVER_WITHOUT_TITLE_CLASS = "dx-popover-without-title";
var POSITION_FLIP_MAP = {
    left: "right",
    top: "bottom",
    right: "left",
    bottom: "top",
    center: "center"
};
var WEIGHT_OF_SIDES = {
    left: -1,
    top: -1,
    center: 0,
    right: 1,
    bottom: 1
};
var POSITION_ALIASES = {
    top: {
        my: "bottom center",
        at: "top center",
        collision: "fit flip"
    },
    bottom: {
        my: "top center",
        at: "bottom center",
        collision: "fit flip"
    },
    right: {
        my: "left center",
        at: "right center",
        collision: "flip fit"
    },
    left: {
        my: "right center",
        at: "left center",
        collision: "flip fit"
    }
};
var SIDE_BORDER_WIDTH_STYLES = {
    left: "borderLeftWidth",
    top: "borderTopWidth",
    right: "borderRightWidth",
    bottom: "borderBottomWidth"
};
var isFirefox = browser.mozilla;
var getEventNameByOption = function(optionValue) {
    return typeUtils.isObject(optionValue) ? optionValue.name : optionValue
};
var getEventName = function(that, optionName) {
    var optionValue = that.option(optionName);
    return getEventNameByOption(optionValue)
};
var getEventDelay = function(that, optionName) {
    var optionValue = that.option(optionName);
    return typeUtils.isObject(optionValue) && optionValue.delay
};
var attachEvent = function(that, name) {
    var target = that.option("target");
    var isSelector = typeUtils.isString(target);
    var event = getEventName(that, name + "Event");
    if (!event || that.option("disabled")) {
        return
    }
    var eventName = eventUtils.addNamespace(event, that.NAME);
    var action = that._createAction(function() {
        var delay = getEventDelay(that, name + "Event");
        this._clearEventsTimeouts();
        if (delay) {
            this._timeouts[name] = setTimeout(function() {
                that[name]()
            }, delay)
        } else {
            that[name]()
        }
    }.bind(that), {
        validatingTargetName: "target"
    });
    var handler = function(e) {
        action({
            event: e,
            target: $(e.currentTarget)
        })
    };
    var EVENT_HANDLER_NAME = "_" + name + "EventHandler";
    if (isSelector) {
        that[EVENT_HANDLER_NAME] = handler;
        eventsEngine.on(domAdapter.getDocument(), eventName, target, handler)
    } else {
        var targetElement = getPublicElement($(target));
        that[EVENT_HANDLER_NAME] = void 0;
        eventsEngine.on(targetElement, eventName, handler)
    }
};
var detachEvent = function(that, target, name, event) {
    var eventName = event || getEventName(that, name + "Event");
    if (!eventName) {
        return
    }
    eventName = eventUtils.addNamespace(eventName, that.NAME);
    var EVENT_HANDLER_NAME = "_" + name + "EventHandler";
    if (that[EVENT_HANDLER_NAME]) {
        eventsEngine.off(domAdapter.getDocument(), eventName, target, that[EVENT_HANDLER_NAME])
    } else {
        eventsEngine.off(getPublicElement($(target)), eventName)
    }
};
var Popover = Popup.inherit({
    _getDefaultOptions: function() {
        return extend(this.callBase(), {
            target: window,
            shading: false,
            position: "bottom",
            closeOnOutsideClick: true,
            animation: {
                show: {
                    type: "fade",
                    from: 0,
                    to: 1
                },
                hide: {
                    type: "fade",
                    to: 0
                }
            },
            showTitle: false,
            width: "auto",
            height: "auto",
            dragEnabled: false,
            resizeEnabled: false,
            fullScreen: false,
            closeOnTargetScroll: true,
            arrowPosition: "",
            arrowOffset: 0,
            boundaryOffset: {
                h: 10,
                v: 10
            }
        })
    },
    _defaultOptionsRules: function() {
        return [{
            device: {
                platform: "ios"
            },
            options: {
                arrowPosition: {
                    boundaryOffset: {
                        h: 20,
                        v: -10
                    },
                    collision: "fit"
                }
            }
        }, {
            device: function() {
                return !windowUtils.hasWindow()
            },
            options: {
                animation: null
            }
        }]
    },
    _init: function() {
        this.callBase();
        this._renderArrow();
        this._timeouts = {};
        this.$element().addClass(POPOVER_CLASS);
        this._wrapper().addClass(POPOVER_WRAPPER_CLASS)
    },
    _render: function() {
        this.callBase.apply(this, arguments);
        this._detachEvents(this.option("target"));
        this._attachEvents()
    },
    _detachEvents: function(target) {
        detachEvent(this, target, "show");
        detachEvent(this, target, "hide")
    },
    _attachEvents: function() {
        attachEvent(this, "show");
        attachEvent(this, "hide")
    },
    _renderArrow: function() {
        this._$arrow = $("<div>").addClass(POPOVER_ARROW_CLASS).prependTo(this.overlayContent())
    },
    _documentDownHandler: function(e) {
        if (this._isOutsideClick(e)) {
            return this.callBase(e)
        }
        return true
    },
    _isOutsideClick: function(e) {
        return !$(e.target).closest(this.option("target")).length
    },
    _animate: function(animation) {
        if (animation && animation.to && "object" === _typeof(animation.to)) {
            extend(animation.to, {
                position: this._getContainerPosition()
            })
        }
        this.callBase.apply(this, arguments)
    },
    _stopAnimation: function() {
        this.callBase.apply(this, arguments)
    },
    _renderTitle: function() {
        this._wrapper().toggleClass(POPOVER_WITHOUT_TITLE_CLASS, !this.option("showTitle"));
        this.callBase()
    },
    _renderPosition: function() {
        this.callBase();
        this._renderOverlayPosition()
    },
    _renderOverlayBoundaryOffset: commonUtils.noop,
    _renderOverlayPosition: function() {
        this._resetOverlayPosition();
        this._updateContentSize();
        var contentPosition = this._getContainerPosition();
        var resultLocation = positionUtils.setup(this._$content, contentPosition);
        var positionSide = this._getSideByLocation(resultLocation);
        this._togglePositionClass("dx-position-" + positionSide);
        this._toggleFlippedClass(resultLocation.h.flip, resultLocation.v.flip);
        var isArrowVisible = this._isHorizontalSide() || this._isVerticalSide();
        if (isArrowVisible) {
            this._renderArrowPosition(positionSide)
        }
    },
    _resetOverlayPosition: function() {
        this._setContentHeight(true);
        this._togglePositionClass("dx-position-" + this._positionSide);
        translator.move(this._$content, {
            left: 0,
            top: 0
        });
        this._$arrow.css({
            top: "auto",
            right: "auto",
            bottom: "auto",
            left: "auto"
        })
    },
    _updateContentSize: function() {
        if (!this._$popupContent) {
            return
        }
        var containerLocation = positionUtils.calculate(this._$content, this._getContainerPosition());
        if (containerLocation.h.oversize > 0 && this._isHorizontalSide() && !containerLocation.h.fit) {
            var newContainerWidth = this._$content.width() - containerLocation.h.oversize;
            this._$content.width(newContainerWidth)
        }
        if (containerLocation.v.oversize > 0 && this._isVerticalSide() && !containerLocation.v.fit) {
            var newOverlayContentHeight = this._$content.height() - containerLocation.v.oversize;
            var newPopupContentHeight = this._$popupContent.height() - containerLocation.v.oversize;
            this._$content.height(newOverlayContentHeight);
            this._$popupContent.height(newPopupContentHeight)
        }
    },
    _getContainerPosition: function() {
        var offset = commonUtils.pairToObject(this._position.offset || "");
        var hOffset = offset.h;
        var vOffset = offset.v;
        var isVerticalSide = this._isVerticalSide();
        var isHorizontalSide = this._isHorizontalSide();
        if (isVerticalSide || isHorizontalSide) {
            var isPopoverInside = this._isPopoverInside();
            var sign = (isPopoverInside ? -1 : 1) * WEIGHT_OF_SIDES[this._positionSide];
            var arrowSize = isVerticalSide ? this._$arrow.height() : this._$arrow.width();
            var arrowSizeCorrection = this._getContentBorderWidth(this._positionSide);
            var arrowOffset = sign * (arrowSize - arrowSizeCorrection);
            isVerticalSide ? vOffset += arrowOffset : hOffset += arrowOffset
        }
        return extend({}, this._position, {
            offset: hOffset + " " + vOffset
        })
    },
    _getContentBorderWidth: function(side) {
        var borderWidth = this._$content.css(SIDE_BORDER_WIDTH_STYLES[side]);
        return parseInt(borderWidth) || 0
    },
    _getSideByLocation: function(location) {
        var isFlippedByVertical = location.v.flip;
        var isFlippedByHorizontal = location.h.flip;
        return this._isVerticalSide() && isFlippedByVertical || this._isHorizontalSide() && isFlippedByHorizontal || this._isPopoverInside() ? POSITION_FLIP_MAP[this._positionSide] : this._positionSide
    },
    _togglePositionClass: function(positionClass) {
        this._$wrapper.removeClass("dx-position-left dx-position-right dx-position-top dx-position-bottom").addClass(positionClass)
    },
    _toggleFlippedClass: function(isFlippedHorizontal, isFlippedVertical) {
        this._$wrapper.toggleClass("dx-popover-flipped-horizontal", isFlippedHorizontal).toggleClass("dx-popover-flipped-vertical", isFlippedVertical)
    },
    _renderArrowPosition: function(side) {
        this._$arrow.css(POSITION_FLIP_MAP[side], -(this._isVerticalSide(side) ? this._$arrow.height() : this._$arrow.width()));
        var axis = this._isVerticalSide(side) ? "left" : "top";
        var sizeProperty = this._isVerticalSide(side) ? "outerWidth" : "outerHeight";
        var $target = $(this._position.of);
        var targetOffset = positionUtils.offset($target) || {
            top: 0,
            left: 0
        };
        var contentOffset = positionUtils.offset(this._$content);
        var arrowSize = this._$arrow[sizeProperty]();
        var contentLocation = contentOffset[axis];
        var contentSize = this._$content[sizeProperty]();
        var targetLocation = targetOffset[axis];
        var targetSize = $target.get(0).preventDefault ? 0 : $target[sizeProperty]();
        var min = Math.max(contentLocation, targetLocation);
        var max = Math.min(contentLocation + contentSize, targetLocation + targetSize);
        var arrowLocation;
        if ("start" === this.option("arrowPosition")) {
            arrowLocation = min - contentLocation
        } else {
            if ("end" === this.option("arrowPosition")) {
                arrowLocation = max - contentLocation - arrowSize
            } else {
                arrowLocation = (min + max) / 2 - contentLocation - arrowSize / 2
            }
        }
        var borderWidth = this._getContentBorderWidth(side);
        var finalArrowLocation = mathUtils.fitIntoRange(arrowLocation - borderWidth + this.option("arrowOffset"), borderWidth, contentSize - arrowSize - 2 * borderWidth);
        this._$arrow.css(axis, finalArrowLocation)
    },
    _isPopoverInside: function() {
        var position = this._transformStringPosition(this.option("position"), POSITION_ALIASES);
        var my = positionUtils.setup.normalizeAlign(position.my);
        var at = positionUtils.setup.normalizeAlign(position.at);
        return my.h === at.h && my.v === at.v
    },
    _setContentHeight: function(fullUpdate) {
        if (fullUpdate) {
            this.callBase()
        }
    },
    _renderWrapperPosition: function() {
        if (this.option("shading")) {
            this._$wrapper.css({
                top: 0,
                left: 0
            })
        }
    },
    _renderWrapperDimensions: function() {
        if (this.option("shading")) {
            this._$wrapper.css({
                width: "100%",
                height: "100%"
            })
        }
    },
    _normalizePosition: function() {
        var position = extend({}, this._transformStringPosition(this.option("position"), POSITION_ALIASES));
        if (!position.of) {
            position.of = this.option("target")
        }
        if (!position.collision) {
            position.collision = "flip"
        }
        if (!position.boundaryOffset) {
            position.boundaryOffset = this.option("boundaryOffset")
        }
        this._positionSide = this._getDisplaySide(position);
        this._position = position
    },
    _getDisplaySide: function(position) {
        var my = positionUtils.setup.normalizeAlign(position.my);
        var at = positionUtils.setup.normalizeAlign(position.at);
        var weightSign = WEIGHT_OF_SIDES[my.h] === WEIGHT_OF_SIDES[at.h] && WEIGHT_OF_SIDES[my.v] === WEIGHT_OF_SIDES[at.v] ? -1 : 1;
        var horizontalWeight = Math.abs(WEIGHT_OF_SIDES[my.h] - weightSign * WEIGHT_OF_SIDES[at.h]);
        var verticalWeight = Math.abs(WEIGHT_OF_SIDES[my.v] - weightSign * WEIGHT_OF_SIDES[at.v]);
        return horizontalWeight > verticalWeight ? at.h : at.v
    },
    _resetContentHeight: function() {
        this.callBase();
        if (isFirefox) {
            var originalOverflow = this._$popupContent.css("overflow");
            this._$popupContent.css("overflow", "visible");
            this._$popupContent.css("overflow", originalOverflow)
        }
    },
    _isVerticalSide: function(side) {
        side = side || this._positionSide;
        return "top" === side || "bottom" === side
    },
    _isHorizontalSide: function(side) {
        side = side || this._positionSide;
        return "left" === side || "right" === side
    },
    _clearEventTimeout: function(name) {
        clearTimeout(this._timeouts[name])
    },
    _clearEventsTimeouts: function() {
        this._clearEventTimeout("show");
        this._clearEventTimeout("hide")
    },
    _clean: function() {
        this._detachEvents(this.option("target"));
        this.callBase.apply(this, arguments)
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "boundaryOffset":
            case "arrowPosition":
            case "arrowOffset":
                this._renderGeometry();
                break;
            case "fullScreen":
                if (args.value) {
                    this.option("fullScreen", false)
                }
                break;
            case "target":
                args.previousValue && this._detachEvents(args.previousValue);
                this.callBase(args);
                break;
            case "showEvent":
            case "hideEvent":
                var name = args.name.substring(0, 4);
                var event = getEventNameByOption(args.previousValue);
                this.hide();
                detachEvent(this, this.option("target"), name, event);
                attachEvent(this, name);
                break;
            case "visible":
                this._clearEventTimeout(args.value ? "show" : "hide");
                this.callBase(args);
                break;
            default:
                this.callBase(args)
        }
    },
    show: function(target) {
        if (target) {
            this.option("target", target)
        }
        return this.callBase()
    }
});
registerComponent("dxPopover", Popover);
module.exports = Popover;
module.exports.default = module.exports;
