/**
 * DevExtreme (events/core/events_engine.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _event_registrator_callbacks = require("./event_registrator_callbacks");
var _event_registrator_callbacks2 = _interopRequireDefault(_event_registrator_callbacks);
var _extend = require("../../core/utils/extend");
var _dom_adapter = require("../../core/dom_adapter");
var _dom_adapter2 = _interopRequireDefault(_dom_adapter);
var _window = require("../../core/utils/window");
var _window2 = _interopRequireDefault(_window);
var _dependency_injector = require("../../core/utils/dependency_injector");
var _dependency_injector2 = _interopRequireDefault(_dependency_injector);
var _type = require("../../core/utils/type");
var _type2 = _interopRequireDefault(_type);
var _callbacks = require("../../core/utils/callbacks");
var _callbacks2 = _interopRequireDefault(_callbacks);
var _errors = require("../../core/errors");
var _errors2 = _interopRequireDefault(_errors);
var _weak_map = require("../../core/polyfills/weak_map");
var _weak_map2 = _interopRequireDefault(_weak_map);
var _hook_touch_props = require("../../events/core/hook_touch_props");
var _hook_touch_props2 = _interopRequireDefault(_hook_touch_props);
var _call_once = require("../../core/utils/call_once");
var _call_once2 = _interopRequireDefault(_call_once);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _typeof(obj) {
    "@babel/helpers - typeof";
    if ("function" === typeof Symbol && "symbol" === typeof Symbol.iterator) {
        _typeof = function(obj) {
            return typeof obj
        }
    } else {
        _typeof = function(obj) {
            return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
        }
    }
    return _typeof(obj)
}
var window = _window2.default.getWindow();
var isWindow = _type2.default.isWindow;
var isFunction = _type2.default.isFunction;
var isString = _type2.default.isString;
var EMPTY_EVENT_NAME = "dxEmptyEventType";
var NATIVE_EVENTS_TO_SUBSCRIBE = {
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
};
var NATIVE_EVENTS_TO_TRIGGER = {
    focusin: "focus",
    focusout: "blur"
};
var NO_BUBBLE_EVENTS = ["blur", "focus", "load"];
var forcePassiveFalseEventNames = ["touchmove", "wheel", "mousewheel", "touchstart"];

function matchesSafe(target, selector) {
    return !isWindow(target) && "#document" !== target.nodeName && _dom_adapter2.default.elementMatches(target, selector)
}
var elementDataMap = new _weak_map2.default;
var guid = 0;
var skipEvent;
var special = function() {
    var specialData = {};
    _event_registrator_callbacks2.default.add(function(eventName, eventObject) {
        specialData[eventName] = eventObject
    });
    return {
        getField: function(eventName, field) {
            return specialData[eventName] && specialData[eventName][field]
        },
        callMethod: function(eventName, methodName, context, args) {
            return specialData[eventName] && specialData[eventName][methodName] && specialData[eventName][methodName].apply(context, args)
        }
    }
}();
var eventsEngine = (0, _dependency_injector2.default)({
    on: getHandler(normalizeOnArguments(iterate(function(element, eventName, selector, data, handler) {
        var handlersController = getHandlersController(element, eventName);
        handlersController.addHandler(handler, selector, data)
    }))),
    one: getHandler(normalizeOnArguments(function(element, eventName, selector, data, handler) {
        var oneTimeHandler = function oneTimeHandler() {
            eventsEngine.off(element, eventName, selector, oneTimeHandler);
            handler.apply(this, arguments)
        };
        eventsEngine.on(element, eventName, selector, data, oneTimeHandler)
    })),
    off: getHandler(normalizeOffArguments(iterate(function(element, eventName, selector, handler) {
        var handlersController = getHandlersController(element, eventName);
        handlersController.removeHandler(handler, selector)
    }))),
    trigger: getHandler(normalizeTriggerArguments(function(element, event, extraParameters) {
        var eventName = event.type;
        var handlersController = getHandlersController(element, event.type);
        special.callMethod(eventName, "trigger", element, [event, extraParameters]);
        handlersController.callHandlers(event, extraParameters);
        var noBubble = special.getField(eventName, "noBubble") || event.isPropagationStopped() || NO_BUBBLE_EVENTS.indexOf(eventName) !== -1;
        if (!noBubble) {
            var parents = [];
            var getParents = function getParents(element) {
                var parent = element.parentNode;
                if (parent) {
                    parents.push(parent);
                    getParents(parent)
                }
            };
            getParents(element);
            parents.push(window);
            var i = 0;
            while (parents[i] && !event.isPropagationStopped()) {
                var parentDataByEvent = getHandlersController(parents[i], event.type);
                parentDataByEvent.callHandlers((0, _extend.extend)(event, {
                    currentTarget: parents[i]
                }), extraParameters);
                i++
            }
        }
        if (element.nodeType || isWindow(element)) {
            special.callMethod(eventName, "_default", element, [event, extraParameters]);
            callNativeMethod(eventName, element)
        }
    })),
    triggerHandler: getHandler(normalizeTriggerArguments(function(element, event, extraParameters) {
        var handlersController = getHandlersController(element, event.type);
        handlersController.callHandlers(event, extraParameters)
    }))
});

function applyForEach(args, method) {
    var element = args[0];
    if (!element) {
        return
    }
    if (_dom_adapter2.default.isNode(element) || isWindow(element)) {
        method.apply(eventsEngine, args)
    } else {
        if (!isString(element) && "length" in element) {
            var itemArgs = Array.prototype.slice.call(args, 0);
            Array.prototype.forEach.call(element, function(itemElement) {
                itemArgs[0] = itemElement;
                applyForEach(itemArgs, method)
            })
        } else {
            throw _errors2.default.Error("E0025")
        }
    }
}

function getHandler(method) {
    return function() {
        applyForEach(arguments, method)
    }
}

function detectPassiveEventHandlersSupport() {
    var isSupported = false;
    try {
        var options = Object.defineProperty({}, "passive", {
            get: function() {
                isSupported = true;
                return true
            }
        });
        window.addEventListener("test", null, options)
    } catch (e) {}
    return isSupported
}
var passiveEventHandlersSupported = (0, _call_once2.default)(detectPassiveEventHandlersSupport);

function getHandlersController(element, eventName) {
    var elementData = elementDataMap.get(element);
    eventName = eventName || "";
    var eventNameParts = eventName.split(".");
    var namespaces = eventNameParts.slice(1);
    var eventNameIsDefined = !!eventNameParts[0];
    eventName = eventNameParts[0] || EMPTY_EVENT_NAME;
    if (!elementData) {
        elementData = {};
        elementDataMap.set(element, elementData)
    }
    if (!elementData[eventName]) {
        elementData[eventName] = {
            handleObjects: [],
            nativeHandler: null
        }
    }
    var eventData = elementData[eventName];
    return {
        addHandler: function(handler, selector, data) {
            var callHandler = function(e, extraParameters) {
                var handlerArgs = [e];
                var target = e.currentTarget;
                var relatedTarget = e.relatedTarget;
                var secondaryTargetIsInside;
                var result;
                if (eventName in NATIVE_EVENTS_TO_SUBSCRIBE) {
                    secondaryTargetIsInside = relatedTarget && target && (relatedTarget === target || target.contains(relatedTarget))
                }
                if (void 0 !== extraParameters) {
                    handlerArgs.push(extraParameters)
                }
                special.callMethod(eventName, "handle", element, [e, data]);
                if (!secondaryTargetIsInside) {
                    result = handler.apply(target, handlerArgs)
                }
                if (false === result) {
                    e.preventDefault();
                    e.stopPropagation()
                }
            };
            var wrappedHandler = function(e, extraParameters) {
                if (skipEvent && e.type === skipEvent) {
                    return
                }
                e.data = data;
                e.delegateTarget = element;
                if (selector) {
                    var currentTarget = e.target;
                    while (currentTarget && currentTarget !== element) {
                        if (matchesSafe(currentTarget, selector)) {
                            e.currentTarget = currentTarget;
                            callHandler(e, extraParameters)
                        }
                        currentTarget = currentTarget.parentNode
                    }
                } else {
                    e.currentTarget = e.delegateTarget || e.target;
                    callHandler(e, extraParameters)
                }
            };
            var handleObject = {
                handler: handler,
                wrappedHandler: wrappedHandler,
                selector: selector,
                type: eventName,
                data: data,
                namespace: namespaces.join("."),
                namespaces: namespaces,
                guid: ++guid
            };
            eventData.handleObjects.push(handleObject);
            var firstHandlerForTheType = 1 === eventData.handleObjects.length;
            var shouldAddNativeListener = firstHandlerForTheType && eventNameIsDefined;
            var nativeListenerOptions;
            if (shouldAddNativeListener) {
                shouldAddNativeListener = !special.callMethod(eventName, "setup", element, [data, namespaces, handler])
            }
            if (shouldAddNativeListener) {
                eventData.nativeHandler = getNativeHandler(eventName);
                if (passiveEventHandlersSupported() && forcePassiveFalseEventNames.indexOf(eventName) > -1) {
                    nativeListenerOptions = {
                        passive: false
                    }
                }
                eventData.removeListener = _dom_adapter2.default.listen(element, NATIVE_EVENTS_TO_SUBSCRIBE[eventName] || eventName, eventData.nativeHandler, nativeListenerOptions)
            }
            special.callMethod(eventName, "add", element, [handleObject])
        },
        removeHandler: function(handler, selector) {
            var removeByEventName = function(eventName) {
                var eventData = elementData[eventName];
                if (!eventData.handleObjects.length) {
                    delete elementData[eventName];
                    return
                }
                var removedHandler;
                eventData.handleObjects = eventData.handleObjects.filter(function(handleObject) {
                    var skip = namespaces.length && !isSubset(handleObject.namespaces, namespaces) || handler && handleObject.handler !== handler || selector && handleObject.selector !== selector;
                    if (!skip) {
                        removedHandler = handleObject.handler;
                        special.callMethod(eventName, "remove", element, [handleObject])
                    }
                    return skip
                });
                var lastHandlerForTheType = !eventData.handleObjects.length;
                var shouldRemoveNativeListener = lastHandlerForTheType && eventName !== EMPTY_EVENT_NAME;
                if (shouldRemoveNativeListener) {
                    special.callMethod(eventName, "teardown", element, [namespaces, removedHandler]);
                    if (eventData.nativeHandler) {
                        eventData.removeListener()
                    }
                    delete elementData[eventName]
                }
            };
            if (eventNameIsDefined) {
                removeByEventName(eventName)
            } else {
                for (var name in elementData) {
                    removeByEventName(name)
                }
            }
            var elementDataIsEmpty = 0 === Object.keys(elementData).length;
            if (elementDataIsEmpty) {
                elementDataMap.delete(element)
            }
        },
        callHandlers: function(event, extraParameters) {
            var forceStop = false;
            var handleCallback = function(handleObject) {
                if (forceStop) {
                    return
                }
                if (!namespaces.length || isSubset(handleObject.namespaces, namespaces)) {
                    handleObject.wrappedHandler(event, extraParameters);
                    forceStop = event.isImmediatePropagationStopped()
                }
            };
            eventData.handleObjects.forEach(handleCallback);
            if (namespaces.length && elementData[EMPTY_EVENT_NAME]) {
                elementData[EMPTY_EVENT_NAME].handleObjects.forEach(handleCallback)
            }
        }
    }
}

function getNativeHandler(subscribeName) {
    return function(event, extraParameters) {
        var handlersController = getHandlersController(this, subscribeName);
        event = eventsEngine.Event(event);
        handlersController.callHandlers(event, extraParameters)
    }
}

function isSubset(original, checked) {
    for (var i = 0; i < checked.length; i++) {
        if (original.indexOf(checked[i]) < 0) {
            return false
        }
    }
    return true
}

function normalizeOnArguments(callback) {
    return function(element, eventName, selector, data, handler) {
        if (!handler) {
            handler = data;
            data = void 0
        }
        if ("string" !== typeof selector) {
            data = selector;
            selector = void 0
        }
        if (!handler && "string" === typeof eventName) {
            handler = data || selector;
            selector = void 0;
            data = void 0
        }
        callback(element, eventName, selector, data, handler)
    }
}

function normalizeOffArguments(callback) {
    return function(element, eventName, selector, handler) {
        if ("function" === typeof selector) {
            handler = selector;
            selector = void 0
        }
        callback(element, eventName, selector, handler)
    }
}

function normalizeTriggerArguments(callback) {
    return function(element, src, extraParameters) {
        if ("string" === typeof src) {
            src = {
                type: src
            }
        }
        if (!src.target) {
            src.target = element
        }
        src.currentTarget = element;
        if (!src.delegateTarget) {
            src.delegateTarget = element
        }
        if (!src.type && src.originalEvent) {
            src.type = src.originalEvent.type
        }
        callback(element, src instanceof eventsEngine.Event ? src : eventsEngine.Event(src), extraParameters)
    }
}

function normalizeEventArguments(callback) {
    return function(src, config) {
        if (!(this instanceof eventsEngine.Event)) {
            return new eventsEngine.Event(src, config)
        }
        if (!src) {
            src = {}
        }
        if ("string" === typeof src) {
            src = {
                type: src
            }
        }
        if (!config) {
            config = {}
        }
        callback.call(this, src, config)
    }
}

function iterate(callback) {
    var iterateEventNames = function(element, eventName) {
        if (eventName && eventName.indexOf(" ") > -1) {
            var args = Array.prototype.slice.call(arguments, 0);
            eventName.split(" ").forEach(function(eventName) {
                args[1] = eventName;
                callback.apply(this, args)
            })
        } else {
            callback.apply(this, arguments)
        }
    };
    return function(element, eventName) {
        if ("object" === _typeof(eventName)) {
            var args = Array.prototype.slice.call(arguments, 0);
            for (var name in eventName) {
                args[1] = name;
                args[args.length - 1] = eventName[name];
                iterateEventNames.apply(this, args)
            }
        } else {
            iterateEventNames.apply(this, arguments)
        }
    }
}

function callNativeMethod(eventName, element) {
    var nativeMethodName = NATIVE_EVENTS_TO_TRIGGER[eventName] || eventName;
    var isLinkClickEvent = function(eventName, element) {
        return "click" === eventName && "a" === element.localName
    };
    if (isLinkClickEvent(eventName, element)) {
        return
    }
    if (isFunction(element[nativeMethodName])) {
        skipEvent = eventName;
        element[nativeMethodName]();
        skipEvent = void 0
    }
}

function calculateWhich(event) {
    var setForMouseEvent = function(event) {
        var mouseEventRegex = /^(?:mouse|pointer|contextmenu|drag|drop)|click/;
        return !event.which && void 0 !== event.button && mouseEventRegex.test(event.type)
    };
    var setForKeyEvent = function(event) {
        return null == event.which && 0 === event.type.indexOf("key")
    };
    if (setForKeyEvent(event)) {
        return null != event.charCode ? event.charCode : event.keyCode
    }
    if (setForMouseEvent(event)) {
        var whichByButton = {
            1: 1,
            2: 3,
            3: 1,
            4: 2
        };
        return whichByButton[event.button]
    }
    return event.which
}

function initEvent(EventClass) {
    if (EventClass) {
        eventsEngine.Event = EventClass;
        eventsEngine.Event.prototype = EventClass.prototype
    }
}
initEvent(normalizeEventArguments(function(src, config) {
    var that = this;
    var propagationStopped = false;
    var immediatePropagationStopped = false;
    var defaultPrevented = false;
    (0, _extend.extend)(that, src);
    if (src instanceof eventsEngine.Event || _window2.default.hasWindow() && src instanceof window.Event) {
        that.originalEvent = src;
        that.currentTarget = void 0
    }
    if (!(src instanceof eventsEngine.Event)) {
        (0, _extend.extend)(that, {
            isPropagationStopped: function() {
                return !!(propagationStopped || that.originalEvent && that.originalEvent.propagationStopped)
            },
            stopPropagation: function() {
                propagationStopped = true;
                that.originalEvent && that.originalEvent.stopPropagation()
            },
            isImmediatePropagationStopped: function() {
                return immediatePropagationStopped
            },
            stopImmediatePropagation: function() {
                this.stopPropagation();
                immediatePropagationStopped = true;
                that.originalEvent && that.originalEvent.stopImmediatePropagation()
            },
            isDefaultPrevented: function() {
                return !!(defaultPrevented || that.originalEvent && that.originalEvent.defaultPrevented)
            },
            preventDefault: function() {
                defaultPrevented = true;
                that.originalEvent && that.originalEvent.preventDefault()
            }
        })
    }
    addProperty("which", calculateWhich, that);
    if (0 === src.type.indexOf("touch")) {
        delete config.pageX;
        delete config.pageY
    }(0, _extend.extend)(that, config);
    that.guid = ++guid
}));

function addProperty(propName, hook, eventInstance) {
    Object.defineProperty(eventInstance || eventsEngine.Event.prototype, propName, {
        enumerable: true,
        configurable: true,
        get: function() {
            return this.originalEvent && hook(this.originalEvent)
        },
        set: function(value) {
            Object.defineProperty(this, propName, {
                enumerable: true,
                configurable: true,
                writable: true,
                value: value
            })
        }
    })
}(0, _hook_touch_props2.default)(addProperty);
var beforeSetStrategy = (0, _callbacks2.default)();
var afterSetStrategy = (0, _callbacks2.default)();
eventsEngine.set = function(engine) {
    beforeSetStrategy.fire();
    eventsEngine.inject(engine);
    initEvent(engine.Event);
    afterSetStrategy.fire()
};
eventsEngine.subscribeGlobal = function() {
    applyForEach(arguments, normalizeOnArguments(function() {
        var args = arguments;
        eventsEngine.on.apply(this, args);
        beforeSetStrategy.add(function() {
            var offArgs = Array.prototype.slice.call(args, 0);
            offArgs.splice(3, 1);
            eventsEngine.off.apply(this, offArgs)
        });
        afterSetStrategy.add(function() {
            eventsEngine.on.apply(this, args)
        })
    }))
};
eventsEngine.forcePassiveFalseEventNames = forcePassiveFalseEventNames;
eventsEngine.passiveEventHandlersSupported = passiveEventHandlersSupported;
module.exports = eventsEngine;
