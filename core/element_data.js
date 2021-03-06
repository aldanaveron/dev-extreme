/**
 * DevExtreme (core/element_data.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _weak_map = require("./polyfills/weak_map");
var _weak_map2 = _interopRequireDefault(_weak_map);
var _dom_adapter = require("./dom_adapter");
var _dom_adapter2 = _interopRequireDefault(_dom_adapter);
var _events_engine = require("../events/core/events_engine");
var _events_engine2 = _interopRequireDefault(_events_engine);
var _memorized_callbacks = require("./memorized_callbacks");
var _memorized_callbacks2 = _interopRequireDefault(_memorized_callbacks);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var dataMap = new _weak_map2.default;
var strategy;
var strategyChanging = new _memorized_callbacks2.default;
var beforeCleanData = function() {};
var afterCleanData = function() {};
var setDataStrategy = exports.setDataStrategy = function(value) {
    strategyChanging.fire(value);
    strategy = value;
    var cleanData = strategy.cleanData;
    strategy.cleanData = function(nodes) {
        beforeCleanData(nodes);
        var result = cleanData.call(this, nodes);
        afterCleanData(nodes);
        return result
    }
};
setDataStrategy({
    data: function() {
        var element = arguments[0];
        var key = arguments[1];
        var value = arguments[2];
        if (!element) {
            return
        }
        var elementData = dataMap.get(element);
        if (!elementData) {
            elementData = {};
            dataMap.set(element, elementData)
        }
        if (void 0 === key) {
            return elementData
        }
        if (2 === arguments.length) {
            return elementData[key]
        }
        elementData[key] = value;
        return value
    },
    removeData: function(element, key) {
        if (!element) {
            return
        }
        if (void 0 === key) {
            dataMap.delete(element)
        } else {
            var elementData = dataMap.get(element);
            if (elementData) {
                delete elementData[key]
            }
        }
    },
    cleanData: function(elements) {
        for (var i = 0; i < elements.length; i++) {
            _events_engine2.default.off(elements[i]);
            dataMap.delete(elements[i])
        }
    }
});
exports.setDataStrategy = setDataStrategy;
exports.getDataStrategy = function() {
    return strategy
};
exports.data = function() {
    return strategy.data.apply(this, arguments)
};
exports.strategyChanging = strategyChanging;
exports.beforeCleanData = function(callback) {
    beforeCleanData = callback
};
exports.afterCleanData = function(callback) {
    afterCleanData = callback
};
exports.cleanData = function(nodes) {
    return strategy.cleanData.call(this, nodes)
};
exports.removeData = function(element, key) {
    return strategy.removeData.call(this, element, key)
};
exports.cleanDataRecursive = function(element, cleanSelf) {
    if (!_dom_adapter2.default.isElementNode(element)) {
        return
    }
    var childElements = element.getElementsByTagName("*");
    strategy.cleanData(childElements);
    if (cleanSelf) {
        strategy.cleanData([element])
    }
};
