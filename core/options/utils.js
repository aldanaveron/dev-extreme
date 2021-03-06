/**
 * DevExtreme (core/options/utils.js)
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
exports.getParentName = exports.getFieldName = exports.deviceMatch = exports.normalizeOptions = exports.convertRulesToOptions = void 0;
var _devices = require("../devices");
var _devices2 = _interopRequireDefault(_devices);
var _type = require("../utils/type");
var _common = require("../utils/common");
var _extend = require("../utils/extend");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        })
    } else {
        obj[key] = value
    }
    return obj
}
var convertRulesToOptions = exports.convertRulesToOptions = function(rules) {
    var currentDevice = _devices2.default.current();
    return rules.reduce(function(options, _ref) {
        var device = _ref.device,
            ruleOptions = _ref.options;
        var deviceFilter = device || {};
        var match = (0, _type.isFunction)(deviceFilter) ? deviceFilter(currentDevice) : deviceMatch(currentDevice, deviceFilter);
        if (match) {
            (0, _extend.extend)(options, ruleOptions)
        }
        return options
    }, {})
};
var normalizeOptions = exports.normalizeOptions = function(options, value) {
    return "string" !== typeof options ? options : _defineProperty({}, options, value)
};
var deviceMatch = exports.deviceMatch = function(device, filter) {
    return (0, _type.isEmptyObject)(filter) || (0, _common.findBestMatches)(device, [filter]).length > 0
};
var getFieldName = exports.getFieldName = function(fullName) {
    return fullName.substr(fullName.lastIndexOf(".") + 1)
};
var getParentName = exports.getParentName = function(fullName) {
    return fullName.substr(0, fullName.lastIndexOf("."))
};
