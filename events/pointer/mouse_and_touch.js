/**
 * DevExtreme (events/pointer/mouse_and_touch.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var extend = require("../../core/utils/extend").extend;
var BaseStrategy = require("./base");
var MouseStrategy = require("./mouse");
var TouchStrategy = require("./touch");
var eventUtils = require("../utils");
var eventMap = {
    dxpointerdown: "touchstart mousedown",
    dxpointermove: "touchmove mousemove",
    dxpointerup: "touchend mouseup",
    dxpointercancel: "touchcancel",
    dxpointerover: "mouseover",
    dxpointerout: "mouseout",
    dxpointerenter: "mouseenter",
    dxpointerleave: "mouseleave"
};
var activated = false;
var activateStrategy = function() {
    if (activated) {
        return
    }
    MouseStrategy.activate();
    activated = true
};
var MouseAndTouchStrategy = BaseStrategy.inherit({
    EVENT_LOCK_TIMEOUT: 100,
    ctor: function() {
        this.callBase.apply(this, arguments);
        activateStrategy()
    },
    _handler: function(e) {
        var isMouseEvent = eventUtils.isMouseEvent(e);
        if (!isMouseEvent) {
            this._skipNextEvents = true
        }
        if (isMouseEvent && this._mouseLocked) {
            return
        }
        if (isMouseEvent && this._skipNextEvents) {
            this._skipNextEvents = false;
            this._mouseLocked = true;
            clearTimeout(this._unlockMouseTimer);
            var that = this;
            this._unlockMouseTimer = setTimeout(function() {
                that._mouseLocked = false
            }, this.EVENT_LOCK_TIMEOUT);
            return
        }
        return this.callBase(e)
    },
    _fireEvent: function(args) {
        var isMouseEvent = eventUtils.isMouseEvent(args.originalEvent);
        var normalizer = isMouseEvent ? MouseStrategy.normalize : TouchStrategy.normalize;
        return this.callBase(extend(normalizer(args.originalEvent), args))
    },
    dispose: function() {
        this.callBase();
        this._skipNextEvents = false;
        this._mouseLocked = false;
        clearTimeout(this._unlockMouseTimer)
    }
});
MouseAndTouchStrategy.map = eventMap;
MouseAndTouchStrategy.resetObserver = MouseStrategy.resetObserver;
module.exports = MouseAndTouchStrategy;
