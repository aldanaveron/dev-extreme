/**
 * DevExtreme (events/click.js)
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
var domAdapter = require("../core/dom_adapter");
var domUtils = require("../core/utils/dom");
var animationFrame = require("../animation/frame");
var eventUtils = require("./utils");
var pointerEvents = require("./pointer");
var Emitter = require("./core/emitter");
var registerEmitter = require("./core/emitter_registrator");
var compareVersions = require("../core/utils/version").compare;
var CLICK_EVENT_NAME = "dxclick";
var TOUCH_BOUNDARY = 10;
var abs = Math.abs;
var isInput = function(element) {
    return $(element).is("input, textarea, select, button ,:focus, :focus *")
};
var misc = {
    requestAnimationFrame: animationFrame.requestAnimationFrame,
    cancelAnimationFrame: animationFrame.cancelAnimationFrame
};
var ClickEmitter = Emitter.inherit({
    ctor: function(element) {
        this.callBase(element);
        this._makeElementClickable($(element))
    },
    _makeElementClickable: function($element) {
        if (!$element.attr("onclick")) {
            $element.attr("onclick", "void(0)")
        }
    },
    start: function(e) {
        this._blurPrevented = e.isDefaultPrevented();
        this._startTarget = e.target;
        this._startEventData = eventUtils.eventData(e)
    },
    end: function(e) {
        if (this._eventOutOfElement(e, this.getElement().get(0)) || e.type === pointerEvents.cancel) {
            this._cancel(e);
            return
        }
        if (!isInput(e.target) && !this._blurPrevented) {
            domUtils.resetActiveElement()
        }
        this._accept(e);
        this._clickAnimationFrame = misc.requestAnimationFrame(function() {
            this._fireClickEvent(e)
        }.bind(this))
    },
    _eventOutOfElement: function(e, element) {
        var target = e.target;
        var targetChanged = !domUtils.contains(element, target) && element !== target;
        var gestureDelta = eventUtils.eventDelta(eventUtils.eventData(e), this._startEventData);
        var boundsExceeded = abs(gestureDelta.x) > TOUCH_BOUNDARY || abs(gestureDelta.y) > TOUCH_BOUNDARY;
        return targetChanged || boundsExceeded
    },
    _fireClickEvent: function(e) {
        this._fireEvent(CLICK_EVENT_NAME, e, {
            target: domUtils.closestCommonParent(this._startTarget, e.target)
        })
    },
    dispose: function() {
        misc.cancelAnimationFrame(this._clickAnimationFrame)
    }
});
! function() {
    var NATIVE_CLICK_CLASS = "dx-native-click";
    var realDevice = devices.real();
    var useNativeClick = realDevice.generic || realDevice.ios && compareVersions(realDevice.version, [9, 3]) >= 0 || realDevice.android && compareVersions(realDevice.version, [5]) >= 0;
    var isNativeClickEvent = function(target) {
        return useNativeClick || $(target).closest("." + NATIVE_CLICK_CLASS).length
    };
    var prevented = null;
    var lastFiredEvent = null;
    var clickHandler = function(e) {
        var originalEvent = e.originalEvent;
        var eventAlreadyFired = lastFiredEvent === originalEvent || originalEvent && originalEvent.DXCLICK_FIRED;
        var leftButton = !e.which || 1 === e.which;
        if (leftButton && !prevented && isNativeClickEvent(e.target) && !eventAlreadyFired) {
            if (originalEvent) {
                originalEvent.DXCLICK_FIRED = true
            }
            lastFiredEvent = originalEvent;
            eventUtils.fireEvent({
                type: CLICK_EVENT_NAME,
                originalEvent: e
            })
        }
    };
    ClickEmitter = ClickEmitter.inherit({
        _makeElementClickable: function($element) {
            if (!isNativeClickEvent($element)) {
                this.callBase($element)
            }
            eventsEngine.on($element, "click", clickHandler)
        },
        configure: function(data) {
            this.callBase(data);
            if (data.useNative) {
                this.getElement().addClass(NATIVE_CLICK_CLASS)
            }
        },
        start: function(e) {
            prevented = null;
            if (!isNativeClickEvent(e.target)) {
                this.callBase(e)
            }
        },
        end: function(e) {
            if (!isNativeClickEvent(e.target)) {
                this.callBase(e)
            }
        },
        cancel: function() {
            prevented = true
        },
        dispose: function() {
            this.callBase();
            eventsEngine.off(this.getElement(), "click", clickHandler)
        }
    })
}();
! function() {
    var desktopDevice = devices.real().generic;
    if (!desktopDevice) {
        var startTarget = null;
        var blurPrevented = false;
        var pointerDownHandler = function(e) {
            startTarget = e.target;
            blurPrevented = e.isDefaultPrevented()
        };
        var clickHandler = function(e) {
            var $target = $(e.target);
            if (!blurPrevented && startTarget && !$target.is(startTarget) && !$(startTarget).is("label") && isInput($target)) {
                domUtils.resetActiveElement()
            }
            startTarget = null;
            blurPrevented = false
        };
        var NATIVE_CLICK_FIXER_NAMESPACE = "NATIVE_CLICK_FIXER";
        var document = domAdapter.getDocument();
        eventsEngine.subscribeGlobal(document, eventUtils.addNamespace(pointerEvents.down, NATIVE_CLICK_FIXER_NAMESPACE), pointerDownHandler);
        eventsEngine.subscribeGlobal(document, eventUtils.addNamespace("click", NATIVE_CLICK_FIXER_NAMESPACE), clickHandler)
    }
}();
registerEmitter({
    emitter: ClickEmitter,
    bubble: true,
    events: [CLICK_EVENT_NAME]
});
exports.name = CLICK_EVENT_NAME;
