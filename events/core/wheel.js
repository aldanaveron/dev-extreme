/**
 * DevExtreme (events/core/wheel.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _renderer = require("../../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _events_engine = require("../../events/core/events_engine");
var _events_engine2 = _interopRequireDefault(_events_engine);
var _event_registrator = require("./event_registrator");
var _event_registrator2 = _interopRequireDefault(_event_registrator);
var _utils = require("../utils");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var EVENT_NAME = "dxmousewheel";
var EVENT_NAMESPACE = "dxWheel";
var NATIVE_EVENT_NAME = "wheel";
var PIXEL_MODE = 0;
var DELTA_MUTLIPLIER = 30;
var wheel = {
    setup: function(element) {
        var $element = (0, _renderer2.default)(element);
        _events_engine2.default.on($element, (0, _utils.addNamespace)(NATIVE_EVENT_NAME, EVENT_NAMESPACE), wheel._wheelHandler.bind(wheel))
    },
    teardown: function(element) {
        _events_engine2.default.off(element, ".".concat(EVENT_NAMESPACE))
    },
    _wheelHandler: function(e) {
        var _e$originalEvent = e.originalEvent,
            deltaMode = _e$originalEvent.deltaMode,
            deltaY = _e$originalEvent.deltaY,
            deltaX = _e$originalEvent.deltaX,
            deltaZ = _e$originalEvent.deltaZ;
        (0, _utils.fireEvent)({
            type: EVENT_NAME,
            originalEvent: e,
            delta: this._normalizeDelta(deltaY, deltaMode),
            deltaX: deltaX,
            deltaY: deltaY,
            deltaZ: deltaZ,
            deltaMode: deltaMode,
            pointerType: "mouse"
        });
        e.stopPropagation()
    },
    _normalizeDelta: function(delta) {
        var deltaMode = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : PIXEL_MODE;
        if (deltaMode === PIXEL_MODE) {
            return -delta
        } else {
            return -DELTA_MUTLIPLIER * delta
        }
    }
};
(0, _event_registrator2.default)(EVENT_NAME, wheel);
exports.name = EVENT_NAME;
