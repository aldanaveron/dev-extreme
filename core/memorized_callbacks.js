/**
 * DevExtreme (core/memorized_callbacks.js)
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
exports.default = void 0;
var _iterator = require("../core/utils/iterator");
var _callbacks = require("./utils/callbacks");
var _callbacks2 = _interopRequireDefault(_callbacks);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function")
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
            descriptor.writable = true
        }
        Object.defineProperty(target, descriptor.key, descriptor)
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        _defineProperties(Constructor.prototype, protoProps)
    }
    if (staticProps) {
        _defineProperties(Constructor, staticProps)
    }
    return Constructor
}
var MemorizedCallbacks = function() {
    function MemorizedCallbacks() {
        _classCallCheck(this, MemorizedCallbacks);
        this.memory = [];
        this.callbacks = (0, _callbacks2.default)()
    }
    _createClass(MemorizedCallbacks, [{
        key: "add",
        value: function(fn) {
            (0, _iterator.each)(this.memory, function(_, item) {
                return fn.apply(fn, item)
            });
            this.callbacks.add(fn)
        }
    }, {
        key: "remove",
        value: function(fn) {
            this.callbacks.remove(fn)
        }
    }, {
        key: "fire",
        value: function() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key]
            }
            this.memory.push(args);
            this.callbacks.fire.apply(this.callbacks, args)
        }
    }]);
    return MemorizedCallbacks
}();
exports.default = MemorizedCallbacks;
