/**
 * DevExtreme (events/short.js)
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
exports.keyboard = exports.click = exports.dxClick = exports.focus = exports.visibility = exports.hover = exports.resize = exports.active = void 0;
var _dom_adapter = require("../core/dom_adapter");
var _dom_adapter2 = _interopRequireDefault(_dom_adapter);
var _events_engine = require("./core/events_engine");
var _events_engine2 = _interopRequireDefault(_events_engine);
var _keyboard_processor = require("./core/keyboard_processor");
var _keyboard_processor2 = _interopRequireDefault(_keyboard_processor);
var _utils = require("./utils");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function addNamespace(event, namespace) {
    return namespace ? (0, _utils.addNamespace)(event, namespace) : event
}
var active = exports.active = {
    on: function($el, active, inactive, opts) {
        var selector = opts.selector,
            showTimeout = opts.showTimeout,
            hideTimeout = opts.hideTimeout,
            namespace = opts.namespace;
        _events_engine2.default.on($el, addNamespace("dxactive", namespace), selector, {
            timeout: showTimeout
        }, function(event) {
            return active.execute({
                event: event,
                element: event.currentTarget
            })
        });
        _events_engine2.default.on($el, addNamespace("dxinactive", namespace), selector, {
            timeout: hideTimeout
        }, function(event) {
            return inactive.execute({
                event: event,
                element: event.currentTarget
            })
        })
    },
    off: function($el, _ref) {
        var namespace = _ref.namespace,
            selector = _ref.selector;
        _events_engine2.default.off($el, addNamespace("dxactive", namespace), selector);
        _events_engine2.default.off($el, addNamespace("dxinactive", namespace), selector)
    }
};
var resize = exports.resize = {
    on: function($el, resize) {
        var _ref2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            namespace = _ref2.namespace;
        _events_engine2.default.on($el, addNamespace("dxresize", namespace), resize)
    },
    off: function($el) {
        var _ref3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            namespace = _ref3.namespace;
        _events_engine2.default.off($el, addNamespace("dxresize", namespace))
    }
};
var hover = exports.hover = {
    on: function($el, start, end, _ref4) {
        var selector = _ref4.selector,
            namespace = _ref4.namespace;
        _events_engine2.default.on($el, addNamespace("dxhoverend", namespace), selector, function(event) {
            return end(event)
        });
        _events_engine2.default.on($el, addNamespace("dxhoverstart", namespace), selector, function(event) {
            start.execute({
                element: event.target,
                event: event
            })
        })
    },
    off: function($el, _ref5) {
        var selector = _ref5.selector,
            namespace = _ref5.namespace;
        _events_engine2.default.off($el, addNamespace("dxhoverstart", namespace), selector);
        _events_engine2.default.off($el, addNamespace("dxhoverend", namespace), selector)
    }
};
var visibility = exports.visibility = {
    on: function($el, shown, hiding, _ref6) {
        var namespace = _ref6.namespace;
        _events_engine2.default.on($el, addNamespace("dxhiding", namespace), hiding);
        _events_engine2.default.on($el, addNamespace("dxshown", namespace), shown)
    },
    off: function($el, _ref7) {
        var namespace = _ref7.namespace;
        _events_engine2.default.off($el, addNamespace("dxhiding", namespace));
        _events_engine2.default.off($el, addNamespace("dxshown", namespace))
    }
};
var focus = exports.focus = {
    on: function($el, focusIn, focusOut, _ref8) {
        var namespace = _ref8.namespace,
            isFocusable = _ref8.isFocusable;
        _events_engine2.default.on($el, addNamespace("focusin", namespace), focusIn);
        _events_engine2.default.on($el, addNamespace("focusout", namespace), focusOut);
        if (_dom_adapter2.default.hasDocumentProperty("onbeforeactivate")) {
            _events_engine2.default.on($el, addNamespace("beforeactivate", namespace), function(e) {
                return isFocusable(e.target) || e.preventDefault()
            })
        }
    },
    off: function($el, _ref9) {
        var namespace = _ref9.namespace;
        _events_engine2.default.off($el, addNamespace("focusin", namespace));
        _events_engine2.default.off($el, addNamespace("focusout", namespace));
        if (_dom_adapter2.default.hasDocumentProperty("onbeforeactivate")) {
            _events_engine2.default.off($el, addNamespace("beforeactivate", namespace))
        }
    },
    trigger: function($el) {
        return _events_engine2.default.trigger($el, "focus")
    }
};
var dxClick = exports.dxClick = {
    on: function($el, click) {
        var _ref10 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            namespace = _ref10.namespace;
        _events_engine2.default.on($el, addNamespace("dxclick", namespace), click)
    },
    off: function($el) {
        var _ref11 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            namespace = _ref11.namespace;
        _events_engine2.default.off($el, addNamespace("dxclick", namespace))
    }
};
var click = exports.click = {
    on: function($el, click) {
        var _ref12 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            namespace = _ref12.namespace;
        _events_engine2.default.on($el, addNamespace("click", namespace), click)
    },
    off: function($el) {
        var _ref13 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            namespace = _ref13.namespace;
        _events_engine2.default.off($el, addNamespace("click", namespace))
    }
};
var index = 0;
var keyboardProcessors = {};
var generateListenerId = function() {
    return "keyboardProcessorId".concat(index++)
};
var keyboard = exports.keyboard = {
    on: function(element, focusTarget, handler) {
        var listenerId = generateListenerId();
        keyboardProcessors[listenerId] = new _keyboard_processor2.default({
            element: element,
            focusTarget: focusTarget,
            handler: handler
        });
        return listenerId
    },
    off: function(listenerId) {
        if (listenerId && keyboardProcessors[listenerId]) {
            keyboardProcessors[listenerId].dispose();
            delete keyboardProcessors[listenerId]
        }
    },
    _getProcessor: function(listenerId) {
        return keyboardProcessors[listenerId]
    }
};
