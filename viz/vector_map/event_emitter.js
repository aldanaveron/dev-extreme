/**
 * DevExtreme (viz/vector_map/event_emitter.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var Callbacks = require("../../core/utils/callbacks");
var eventEmitterMethods = {
    _initEvents: function() {
        var names = this._eventNames;
        var i;
        var ii = names.length;
        var events = this._events = {};
        for (i = 0; i < ii; ++i) {
            events[names[i]] = Callbacks()
        }
    },
    _disposeEvents: function() {
        var events = this._events;
        var name;
        for (name in events) {
            events[name].empty()
        }
        this._events = null
    },
    on: function(handlers) {
        var events = this._events;
        var name;
        for (name in handlers) {
            events[name].add(handlers[name])
        }
        return dispose;

        function dispose() {
            for (name in handlers) {
                events[name].remove(handlers[name])
            }
        }
    },
    _fire: function(name, arg) {
        this._events[name].fire(arg)
    }
};
exports.makeEventEmitter = function(target) {
    var proto = target.prototype;
    var name;
    for (name in eventEmitterMethods) {
        proto[name] = eventEmitterMethods[name]
    }
};
