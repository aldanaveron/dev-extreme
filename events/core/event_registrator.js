/**
 * DevExtreme (events/core/event_registrator.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _iterator = require("../../core/utils/iterator");
var _event_registrator_callbacks = require("./event_registrator_callbacks");
var _event_registrator_callbacks2 = _interopRequireDefault(_event_registrator_callbacks);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var registerEvent = function(name, eventObject) {
    var strategy = {};
    if ("noBubble" in eventObject) {
        strategy.noBubble = eventObject.noBubble
    }
    if ("bindType" in eventObject) {
        strategy.bindType = eventObject.bindType
    }
    if ("delegateType" in eventObject) {
        strategy.delegateType = eventObject.delegateType
    }(0, _iterator.each)(["setup", "teardown", "add", "remove", "trigger", "handle", "_default", "dispose"], function(_, methodName) {
        if (!eventObject[methodName]) {
            return
        }
        strategy[methodName] = function() {
            var args = [].slice.call(arguments);
            args.unshift(this);
            return eventObject[methodName].apply(eventObject, args)
        }
    });
    _event_registrator_callbacks2.default.fire(name, strategy)
};
registerEvent.callbacks = _event_registrator_callbacks2.default;
module.exports = registerEvent;
