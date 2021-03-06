/**
 * DevExtreme (integration/jquery/events.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _jquery = require("jquery");
var _jquery2 = _interopRequireDefault(_jquery);
var _events_engine = require("../../events/core/events_engine");
var _events_engine2 = _interopRequireDefault(_events_engine);
var _use_jquery = require("./use_jquery");
var _use_jquery2 = _interopRequireDefault(_use_jquery);
var _event_registrator_callbacks = require("../../events/core/event_registrator_callbacks");
var _event_registrator_callbacks2 = _interopRequireDefault(_event_registrator_callbacks);
var _dom_adapter = require("../../core/dom_adapter");
var _dom_adapter2 = _interopRequireDefault(_dom_adapter);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var useJQuery = (0, _use_jquery2.default)();
if (useJQuery) {
    _event_registrator_callbacks2.default.add(function(name, eventObject) {
        _jquery2.default.event.special[name] = eventObject
    });
    if (_events_engine2.default.passiveEventHandlersSupported()) {
        _events_engine2.default.forcePassiveFalseEventNames.forEach(function(eventName) {
            _jquery2.default.event.special[eventName] = {
                setup: function(data, namespaces, handler) {
                    _dom_adapter2.default.listen(this, eventName, handler, {
                        passive: false
                    })
                }
            }
        })
    }
    _events_engine2.default.set({
        on: function(element) {
            (0, _jquery2.default)(element).on.apply((0, _jquery2.default)(element), Array.prototype.slice.call(arguments, 1))
        },
        one: function(element) {
            (0, _jquery2.default)(element).one.apply((0, _jquery2.default)(element), Array.prototype.slice.call(arguments, 1))
        },
        off: function(element) {
            (0, _jquery2.default)(element).off.apply((0, _jquery2.default)(element), Array.prototype.slice.call(arguments, 1))
        },
        trigger: function(element) {
            (0, _jquery2.default)(element).trigger.apply((0, _jquery2.default)(element), Array.prototype.slice.call(arguments, 1))
        },
        triggerHandler: function(element) {
            (0, _jquery2.default)(element).triggerHandler.apply((0, _jquery2.default)(element), Array.prototype.slice.call(arguments, 1))
        },
        Event: _jquery2.default.Event
    })
}
