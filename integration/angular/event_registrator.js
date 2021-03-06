/**
 * DevExtreme (integration/angular/event_registrator.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _event_registrator_callbacks = require("../../events/core/event_registrator_callbacks");
var _event_registrator_callbacks2 = _interopRequireDefault(_event_registrator_callbacks);
var _events_engine = require("../../events/core/events_engine");
var _events_engine2 = _interopRequireDefault(_events_engine);
var _module = require("./module");
var _module2 = _interopRequireDefault(_module);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
_event_registrator_callbacks2.default.add(function(name) {
    var ngEventName = name.slice(0, 2) + name.charAt(2).toUpperCase() + name.slice(3);
    _module2.default.directive(ngEventName, ["$parse", function($parse) {
        return function(scope, element, attr) {
            var attrValue = attr[ngEventName].trim();
            var handler;
            var eventOptions = {};
            if ("{" === attrValue.charAt(0)) {
                eventOptions = scope.$eval(attrValue);
                handler = $parse(eventOptions.execute)
            } else {
                handler = $parse(attr[ngEventName])
            }
            _events_engine2.default.on(element, name, eventOptions, function(e) {
                scope.$apply(function() {
                    handler(scope, {
                        $event: e
                    })
                })
            })
        }
    }])
});
