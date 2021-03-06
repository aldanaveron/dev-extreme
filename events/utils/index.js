/**
 * DevExtreme (events/utils/index.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addNamespace = exports.getChar = exports.normalizeKeyName = exports.fireEvent = exports.createEvent = exports.setEventFixMethod = exports.needSkipEvent = exports.stopEventsSkipping = exports.forceSkipEvents = exports.hasTouches = exports.eventDelta = exports.eventData = exports.isFakeClickEvent = exports.isKeyboardEvent = exports.isTouchEvent = exports.isDxMouseWheelEvent = exports.isMouseEvent = exports.isPointerEvent = exports.eventSource = void 0;
var _renderer = require("../../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _add_namespace = require("./add_namespace");
var _add_namespace2 = _interopRequireDefault(_add_namespace);
var _events_engine = require("../core/events_engine");
var _events_engine2 = _interopRequireDefault(_events_engine);
var _iterator = require("../../core/utils/iterator");
var _extend = require("../../core/utils/extend");
var _selectors = require("../../ui/widget/selectors");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var KEY_MAP = {
    backspace: "backspace",
    tab: "tab",
    enter: "enter",
    escape: "escape",
    pageup: "pageUp",
    pagedown: "pageDown",
    end: "end",
    home: "home",
    arrowleft: "leftArrow",
    arrowup: "upArrow",
    arrowright: "rightArrow",
    arrowdown: "downArrow",
    "delete": "del",
    " ": "space",
    f: "F",
    a: "A",
    "*": "asterisk",
    "-": "minus",
    alt: "alt",
    control: "control",
    shift: "shift",
    left: "leftArrow",
    up: "upArrow",
    right: "rightArrow",
    down: "downArrow",
    multiply: "asterisk",
    spacebar: "space",
    del: "del",
    subtract: "minus",
    esc: "escape"
};
var LEGACY_KEY_CODES = {
    8: "backspace",
    9: "tab",
    13: "enter",
    27: "escape",
    33: "pageUp",
    34: "pageDown",
    35: "end",
    36: "home",
    37: "leftArrow",
    38: "upArrow",
    39: "rightArrow",
    40: "downArrow",
    46: "del",
    32: "space",
    70: "F",
    65: "A",
    106: "asterisk",
    109: "minus",
    189: "minus",
    173: "minus",
    16: "shift",
    17: "control",
    18: "alt"
};
var EVENT_SOURCES_REGEX = {
    dx: /^dx/i,
    mouse: /(mouse|wheel)/i,
    touch: /^touch/i,
    keyboard: /^key/i,
    pointer: /^(ms)?pointer/i
};
var fixMethod = function(e) {
    return e
};
var copyEvent = function(originalEvent) {
    return fixMethod((0, _events_engine.Event)(originalEvent, originalEvent), originalEvent)
};
var isDxEvent = function(e) {
    return "dx" === eventSource(e)
};
var isNativeMouseEvent = function(e) {
    return "mouse" === eventSource(e)
};
var isNativeTouchEvent = function(e) {
    return "touch" === eventSource(e)
};
var eventSource = exports.eventSource = function(_ref) {
    var type = _ref.type;
    var result = "other";
    (0, _iterator.each)(EVENT_SOURCES_REGEX, function(key) {
        if (this.test(type)) {
            result = key;
            return false
        }
    });
    return result
};
var isPointerEvent = exports.isPointerEvent = function(e) {
    return "pointer" === eventSource(e)
};
var isMouseEvent = exports.isMouseEvent = function(e) {
    return isNativeMouseEvent(e) || (isPointerEvent(e) || isDxEvent(e)) && "mouse" === e.pointerType
};
var isDxMouseWheelEvent = exports.isDxMouseWheelEvent = function(e) {
    return e && "dxmousewheel" === e.type
};
var isTouchEvent = exports.isTouchEvent = function(e) {
    return isNativeTouchEvent(e) || (isPointerEvent(e) || isDxEvent(e)) && "touch" === e.pointerType
};
var isKeyboardEvent = exports.isKeyboardEvent = function(e) {
    return "keyboard" === eventSource(e)
};
var isFakeClickEvent = exports.isFakeClickEvent = function(_ref2) {
    var screenX = _ref2.screenX,
        offsetX = _ref2.offsetX,
        pageX = _ref2.pageX;
    return 0 === screenX && !offsetX && 0 === pageX
};
var eventData = exports.eventData = function(_ref3) {
    var pageX = _ref3.pageX,
        pageY = _ref3.pageY,
        timeStamp = _ref3.timeStamp;
    return {
        x: pageX,
        y: pageY,
        time: timeStamp
    }
};
var eventDelta = exports.eventDelta = function(from, to) {
    return {
        x: to.x - from.x,
        y: to.y - from.y,
        time: to.time - from.time || 1
    }
};
var hasTouches = exports.hasTouches = function(e) {
    var originalEvent = e.originalEvent,
        pointers = e.pointers;
    if (isNativeTouchEvent(e)) {
        return (originalEvent.touches || []).length
    }
    if (isDxEvent(e)) {
        return (pointers || []).length
    }
    return 0
};
var skipEvents = false;
var forceSkipEvents = exports.forceSkipEvents = function() {
    return skipEvents = true
};
var stopEventsSkipping = exports.stopEventsSkipping = function() {
    return skipEvents = false
};
var needSkipEvent = exports.needSkipEvent = function(e) {
    if (skipEvents) {
        return true
    }
    var target = e.target;
    var $target = (0, _renderer2.default)(target);
    var touchInInput = $target.is("input, textarea, select");
    if ($target.is(".dx-skip-gesture-event *, .dx-skip-gesture-event")) {
        return true
    }
    if (isDxMouseWheelEvent(e)) {
        var isTextArea = $target.is("textarea") && $target.hasClass("dx-texteditor-input");
        if (isTextArea) {
            return false
        }
        var isContentEditable = target.isContentEditable || target.hasAttribute("contenteditable");
        if (isContentEditable) {
            return false
        }
        var isInputFocused = $target.is("input[type='number'], textarea, select") && $target.is(":focus");
        return isInputFocused
    }
    if (isMouseEvent(e)) {
        return touchInInput || e.which > 1
    }
    if (isTouchEvent(e)) {
        return touchInInput && (0, _selectors.focused)($target)
    }
};
var setEventFixMethod = exports.setEventFixMethod = function(func) {
    return fixMethod = func
};
var createEvent = exports.createEvent = function(originalEvent, args) {
    var event = copyEvent(originalEvent);
    args && (0, _extend.extend)(event, args);
    return event
};
var fireEvent = exports.fireEvent = function(props) {
    var originalEvent = props.originalEvent,
        delegateTarget = props.delegateTarget;
    var event = createEvent(originalEvent, props);
    _events_engine2.default.trigger(delegateTarget || event.target, event);
    return event
};
var normalizeKeyName = exports.normalizeKeyName = function(_ref4) {
    var key = _ref4.key,
        which = _ref4.which;
    var isKeySupported = !!key;
    key = isKeySupported ? key : which;
    if (key) {
        if (isKeySupported) {
            key = KEY_MAP[key.toLowerCase()] || key
        } else {
            key = LEGACY_KEY_CODES[key] || String.fromCharCode(key)
        }
        return key
    }
};
var getChar = exports.getChar = function(_ref5) {
    var key = _ref5.key,
        which = _ref5.which;
    return key || String.fromCharCode(which)
};
var addNamespace = exports.addNamespace = _add_namespace2.default;
