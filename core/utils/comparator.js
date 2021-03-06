/**
 * DevExtreme (core/utils/comparator.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _dom_adapter = require("../dom_adapter");
var _dom_adapter2 = _interopRequireDefault(_dom_adapter);
var _data = require("./data");
var _type = require("./type");
var _type2 = _interopRequireDefault(_type);

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
var hasNegation = function(oldValue, newValue) {
    return 1 / oldValue === 1 / newValue
};
var equals = function(oldValue, newValue) {
    oldValue = (0, _data.toComparable)(oldValue, true);
    newValue = (0, _data.toComparable)(newValue, true);
    if (oldValue && newValue && _type2.default.isRenderer(oldValue) && _type2.default.isRenderer(newValue)) {
        return newValue.is(oldValue)
    }
    var oldValueIsNaN = oldValue !== oldValue;
    var newValueIsNaN = newValue !== newValue;
    if (oldValueIsNaN && newValueIsNaN) {
        return true
    }
    if (0 === oldValue && 0 === newValue) {
        return hasNegation(oldValue, newValue)
    }
    if (null === oldValue || "object" !== _typeof(oldValue) || _dom_adapter2.default.isElementNode(oldValue)) {
        return oldValue === newValue
    }
    return false
};
exports.equals = equals;
