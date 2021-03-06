/**
 * DevExtreme (ui/switch.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var $ = require("../core/renderer");
var eventsEngine = require("../events/core/events_engine");
var devices = require("../core/devices");
var extend = require("../core/utils/extend").extend;
var inkRipple = require("./widget/utils.ink_ripple");
var registerComponent = require("../core/component_registrator");
var Editor = require("./editor/editor");
var eventUtils = require("../events/utils");
var feedbackEvents = require("../events/core/emitter.feedback");
var themes = require("./themes");
var fx = require("../animation/fx");
var messageLocalization = require("../localization/message");
var clickEvent = require("../events/click");
var Swipeable = require("../events/gesture/swipeable");
var Deferred = require("../core/utils/deferred").Deferred;
var SWITCH_CLASS = "dx-switch";
var SWITCH_WRAPPER_CLASS = SWITCH_CLASS + "-wrapper";
var SWITCH_CONTAINER_CLASS = SWITCH_CLASS + "-container";
var SWITCH_INNER_CLASS = SWITCH_CLASS + "-inner";
var SWITCH_HANDLE_CLASS = SWITCH_CLASS + "-handle";
var SWITCH_ON_VALUE_CLASS = SWITCH_CLASS + "-on-value";
var SWITCH_ON_CLASS = SWITCH_CLASS + "-on";
var SWITCH_OFF_CLASS = SWITCH_CLASS + "-off";
var SWITCH_ANIMATION_DURATION = 100;
var Switch = Editor.inherit({
    _supportedKeys: function() {
        var isRTL = this.option("rtlEnabled");
        var click = function(e) {
            e.preventDefault();
            this._clickAction({
                event: e
            })
        };
        var move = function(value, e) {
            e.preventDefault();
            e.stopPropagation();
            this._animateValue(value)
        };
        return extend(this.callBase(), {
            space: click,
            enter: click,
            leftArrow: move.bind(this, isRTL ? true : false),
            rightArrow: move.bind(this, isRTL ? false : true)
        })
    },
    _getDefaultOptions: function() {
        return extend(this.callBase(), {
            hoverStateEnabled: true,
            activeStateEnabled: true,
            switchedOnText: this._getLocalizationMessage("On"),
            switchedOffText: this._getLocalizationMessage("Off"),
            value: false,
            useInkRipple: false,
            _animateHandle: true
        })
    },
    _defaultOptionsRules: function() {
        var themeName = themes.current();
        return this.callBase().concat([{
            device: function() {
                return "desktop" === devices.real().deviceType && !devices.isSimulator()
            },
            options: {
                focusStateEnabled: true
            }
        }, {
            device: function(_device) {
                return themes.isIos7(themeName)
            },
            options: {
                _animateHandle: false
            }
        }])
    },
    _setDeprecatedOptions: function() {
        this.callBase();
        extend(this._deprecatedOptions, {
            onText: {
                since: "18.2",
                alias: "switchedOnText"
            },
            offText: {
                since: "18.2",
                alias: "switchedOffText"
            }
        })
    },
    _getLocalizationMessage: function(state) {
        var newMessage = messageLocalization.format("dxSwitch-switched" + state + "Text");
        var oldMessage = messageLocalization.format("dxSwitch-" + state.toLowerCase() + "Text");
        return newMessage || oldMessage
    },
    _feedbackHideTimeout: 0,
    _animating: false,
    _initMarkup: function() {
        this._renderContainers();
        this.option("useInkRipple") && this._renderInkRipple();
        this.$element().addClass(SWITCH_CLASS).append(this._$switchWrapper);
        this._renderSubmitElement();
        this._renderClick();
        this.setAria("role", "button");
        this._renderSwipeable();
        this.callBase();
        this._renderSwitchInner();
        this._renderLabels();
        this._renderValue()
    },
    _getInnerOffset: function(value, offset) {
        var ratio = (offset - this._offsetDirection() * Number(!value)) / 2;
        return 100 * ratio + "%"
    },
    _getHandleOffset: function(value, offset) {
        if (this.option("rtlEnabled")) {
            value = !value
        }
        if (value) {
            var calcValue = -100 + 100 * -offset;
            return calcValue + "%"
        } else {
            return 100 * -offset + "%"
        }
    },
    _renderSwitchInner: function() {
        this._$switchInner = $("<div>").addClass(SWITCH_INNER_CLASS).appendTo(this._$switchContainer);
        this._$handle = $("<div>").addClass(SWITCH_HANDLE_CLASS).appendTo(this._$switchInner)
    },
    _renderLabels: function() {
        this._$labelOn = $("<div>").addClass(SWITCH_ON_CLASS).prependTo(this._$switchInner);
        this._$labelOff = $("<div>").addClass(SWITCH_OFF_CLASS).appendTo(this._$switchInner);
        this._setLabelsText()
    },
    _renderContainers: function() {
        this._$switchContainer = $("<div>").addClass(SWITCH_CONTAINER_CLASS);
        this._$switchWrapper = $("<div>").addClass(SWITCH_WRAPPER_CLASS).append(this._$switchContainer)
    },
    _renderSwipeable: function() {
        this._createComponent(this.$element(), Swipeable, {
            elastic: false,
            immediate: true,
            onStart: this._swipeStartHandler.bind(this),
            onUpdated: this._swipeUpdateHandler.bind(this),
            onEnd: this._swipeEndHandler.bind(this),
            itemSizeFunc: this._getItemSizeFunc.bind(this)
        })
    },
    _getItemSizeFunc: function() {
        return this._$switchContainer.outerWidth(true) - this._$handle.get(0).getBoundingClientRect().width
    },
    _renderSubmitElement: function() {
        this._$submitElement = $("<input>").attr("type", "hidden").appendTo(this.$element())
    },
    _getSubmitElement: function() {
        return this._$submitElement
    },
    _renderInkRipple: function() {
        this._inkRipple = inkRipple.render({
            waveSizeCoefficient: 1.7,
            isCentered: true,
            useHoldAnimation: false,
            wavesNumber: 2
        })
    },
    _renderInkWave: function(element, dxEvent, doRender, waveIndex) {
        if (!this._inkRipple) {
            return
        }
        var config = {
            element: element,
            event: dxEvent,
            wave: waveIndex
        };
        if (doRender) {
            this._inkRipple.showWave(config)
        } else {
            this._inkRipple.hideWave(config)
        }
    },
    _updateFocusState: function(e, value) {
        this.callBase.apply(this, arguments);
        this._renderInkWave(this._$handle, e, value, 0)
    },
    _toggleActiveState: function($element, value, e) {
        this.callBase.apply(this, arguments);
        this._renderInkWave(this._$handle, e, value, 1)
    },
    _offsetDirection: function() {
        return this.option("rtlEnabled") ? -1 : 1
    },
    _renderPosition: function(state, swipeOffset) {
        var innerOffset = this._getInnerOffset(state, swipeOffset);
        var handleOffset = this._getHandleOffset(state, swipeOffset);
        if (this.option("_animateHandle")) {
            this._$switchInner.css("transform", " translateX(" + innerOffset + ")");
            this._$handle.css("transform", " translateX(" + handleOffset + ")")
        }
    },
    _validateValue: function() {
        var check = this.option("value");
        if ("boolean" !== typeof check) {
            this._options.silent("value", !!check)
        }
    },
    _renderClick: function() {
        var eventName = eventUtils.addNamespace(clickEvent.name, this.NAME);
        var $element = this.$element();
        this._clickAction = this._createAction(this._clickHandler.bind(this));
        eventsEngine.off($element, eventName);
        eventsEngine.on($element, eventName, function(e) {
            this._clickAction({
                event: e
            })
        }.bind(this))
    },
    _clickHandler: function(args) {
        var e = args.event;
        this._saveValueChangeEvent(e);
        if (this._animating || this._swiping) {
            return
        }
        this._animateValue(!this.option("value"))
    },
    _animateValue: function(value) {
        var startValue = this.option("value");
        var endValue = value;
        if (startValue === endValue) {
            return
        }
        this._animating = true;
        var fromInnerOffset = this._getInnerOffset(startValue, 0);
        var toInnerOffset = this._getInnerOffset(endValue, 0);
        var fromHandleOffset = this._getHandleOffset(startValue, 0);
        var toHandleOffset = this._getHandleOffset(endValue, 0);
        var that = this;
        var fromInnerConfig = {};
        var toInnerConfig = {};
        var fromHandleConfig = {};
        var toHandlerConfig = {};
        fromInnerConfig.transform = " translateX(" + fromInnerOffset + ")";
        toInnerConfig.transform = " translateX(" + toInnerOffset + ")";
        fromHandleConfig.transform = " translateX(" + fromHandleOffset + ")";
        toHandlerConfig.transform = " translateX(" + toHandleOffset + ")";
        this.$element().toggleClass(SWITCH_ON_VALUE_CLASS, endValue);
        fx.animate(this._$handle, {
            from: fromHandleConfig,
            to: toHandlerConfig,
            duration: SWITCH_ANIMATION_DURATION
        });
        fx.animate(this._$switchInner, {
            from: fromInnerConfig,
            to: toInnerConfig,
            duration: SWITCH_ANIMATION_DURATION,
            complete: function() {
                that._animating = false;
                that.option("value", endValue)
            }
        })
    },
    _swipeStartHandler: function(e) {
        var state = this.option("value");
        var rtlEnabled = this.option("rtlEnabled");
        var maxOffOffset = rtlEnabled ? 0 : 1;
        var maxOnOffset = rtlEnabled ? 1 : 0;
        e.event.maxLeftOffset = state ? maxOffOffset : maxOnOffset;
        e.event.maxRightOffset = state ? maxOnOffset : maxOffOffset;
        this._swiping = true;
        this._feedbackDeferred = new Deferred;
        feedbackEvents.lock(this._feedbackDeferred);
        this._toggleActiveState(this.$element(), this.option("activeStateEnabled"))
    },
    _swipeUpdateHandler: function(e) {
        this._renderPosition(this.option("value"), e.event.offset)
    },
    _swipeEndHandler: function(e) {
        var that = this;
        var offsetDirection = this._offsetDirection();
        var toInnerConfig = {};
        var toHandleConfig = {};
        var innerOffset = this._getInnerOffset(that.option("value"), e.event.targetOffset);
        var handleOffset = this._getHandleOffset(that.option("value"), e.event.targetOffset);
        toInnerConfig.transform = " translateX(" + innerOffset + ")";
        toHandleConfig.transform = " translateX(" + handleOffset + ")";
        fx.animate(this._$handle, {
            to: toHandleConfig,
            duration: SWITCH_ANIMATION_DURATION
        });
        fx.animate(this._$switchInner, {
            to: toInnerConfig,
            duration: SWITCH_ANIMATION_DURATION,
            complete: function() {
                that._swiping = false;
                var pos = that.option("value") + offsetDirection * e.event.targetOffset;
                that._saveValueChangeEvent(e.event);
                that.option("value", Boolean(pos));
                that._feedbackDeferred.resolve();
                that._toggleActiveState(that.$element(), false)
            }
        })
    },
    _renderValue: function() {
        this._validateValue();
        var val = this.option("value");
        this._renderPosition(val, 0);
        this.$element().toggleClass(SWITCH_ON_VALUE_CLASS, val);
        this._getSubmitElement().val(val);
        this.setAria({
            pressed: val,
            label: val ? this.option("switchedOnText") : this.option("switchedOffText")
        })
    },
    _setLabelsText: function() {
        this._$labelOn && this._$labelOn.text(this.option("switchedOnText"));
        this._$labelOff && this._$labelOff.text(this.option("switchedOffText"))
    },
    _visibilityChanged: function(visible) {
        if (visible) {
            this.repaint()
        }
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "useInkRipple":
                this._invalidate();
                break;
            case "width":
                delete this._marginBound;
                this._refresh();
                break;
            case "switchedOnText":
            case "switchedOffText":
                this._setLabelsText();
                break;
            case "value":
                this._renderValue();
                this.callBase(args);
                break;
            case "_animateHandle":
                break;
            default:
                this.callBase(args)
        }
    },
    _clean: function() {
        delete this._inkRipple;
        this.callBase()
    }
});
registerComponent("dxSwitch", Switch);
module.exports = Switch;
module.exports.default = module.exports;
