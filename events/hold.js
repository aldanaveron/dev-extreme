/**
 * DevExtreme (events/hold.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var eventUtils = require("./utils");
var Emitter = require("./core/emitter");
var registerEmitter = require("./core/emitter_registrator");
var abs = Math.abs;
var HOLD_EVENT_NAME = "dxhold";
var HOLD_TIMEOUT = 750;
var TOUCH_BOUNDARY = 5;
var HoldEmitter = Emitter.inherit({
    start: function(e) {
        this._startEventData = eventUtils.eventData(e);
        this._startTimer(e)
    },
    _startTimer: function(e) {
        var holdTimeout = "timeout" in this ? this.timeout : HOLD_TIMEOUT;
        this._holdTimer = setTimeout(function() {
            this._requestAccept(e);
            this._fireEvent(HOLD_EVENT_NAME, e, {
                target: e.target
            });
            this._forgetAccept()
        }.bind(this), holdTimeout)
    },
    move: function(e) {
        if (this._touchWasMoved(e)) {
            this._cancel(e)
        }
    },
    _touchWasMoved: function(e) {
        var delta = eventUtils.eventDelta(this._startEventData, eventUtils.eventData(e));
        return abs(delta.x) > TOUCH_BOUNDARY || abs(delta.y) > TOUCH_BOUNDARY
    },
    end: function() {
        this._stopTimer()
    },
    _stopTimer: function() {
        clearTimeout(this._holdTimer)
    },
    cancel: function() {
        this._stopTimer()
    },
    dispose: function() {
        this._stopTimer()
    }
});
registerEmitter({
    emitter: HoldEmitter,
    bubble: true,
    events: [HOLD_EVENT_NAME]
});
module.exports = {
    name: HOLD_EVENT_NAME
};
