/**
 * DevExtreme (events/hover.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var eventsEngine = require("../events/core/events_engine");
var dataUtils = require("../core/element_data");
var Class = require("../core/class");
var devices = require("../core/devices");
var registerEvent = require("./core/event_registrator");
var eventUtils = require("./utils");
var pointerEvents = require("./pointer");
var HOVERSTART_NAMESPACE = "dxHoverStart";
var HOVERSTART = "dxhoverstart";
var POINTERENTER_NAMESPACED_EVENT_NAME = eventUtils.addNamespace(pointerEvents.enter, HOVERSTART_NAMESPACE);
var HOVEREND_NAMESPACE = "dxHoverEnd";
var HOVEREND = "dxhoverend";
var POINTERLEAVE_NAMESPACED_EVENT_NAME = eventUtils.addNamespace(pointerEvents.leave, HOVEREND_NAMESPACE);
var Hover = Class.inherit({
    noBubble: true,
    ctor: function() {
        this._handlerArrayKeyPath = this._eventNamespace + "_HandlerStore"
    },
    setup: function(element) {
        dataUtils.data(element, this._handlerArrayKeyPath, {})
    },
    add: function(element, handleObj) {
        var that = this;
        var handler = function(e) {
            that._handler(e)
        };
        eventsEngine.on(element, this._originalEventName, handleObj.selector, handler);
        dataUtils.data(element, this._handlerArrayKeyPath)[handleObj.guid] = handler
    },
    _handler: function(e) {
        if (eventUtils.isTouchEvent(e) || devices.isSimulator()) {
            return
        }
        eventUtils.fireEvent({
            type: this._eventName,
            originalEvent: e,
            delegateTarget: e.delegateTarget
        })
    },
    remove: function(element, handleObj) {
        var handler = dataUtils.data(element, this._handlerArrayKeyPath)[handleObj.guid];
        eventsEngine.off(element, this._originalEventName, handleObj.selector, handler)
    },
    teardown: function(element) {
        dataUtils.removeData(element, this._handlerArrayKeyPath)
    }
});
var HoverStart = Hover.inherit({
    ctor: function() {
        this._eventNamespace = HOVERSTART_NAMESPACE;
        this._eventName = HOVERSTART;
        this._originalEventName = POINTERENTER_NAMESPACED_EVENT_NAME;
        this.callBase()
    },
    _handler: function(e) {
        var pointers = e.pointers || [];
        if (!pointers.length) {
            this.callBase(e)
        }
    }
});
var HoverEnd = Hover.inherit({
    ctor: function() {
        this._eventNamespace = HOVEREND_NAMESPACE;
        this._eventName = HOVEREND;
        this._originalEventName = POINTERLEAVE_NAMESPACED_EVENT_NAME;
        this.callBase()
    }
});
registerEvent(HOVERSTART, new HoverStart);
registerEvent(HOVEREND, new HoverEnd);
exports.start = HOVERSTART;
exports.end = HOVEREND;
