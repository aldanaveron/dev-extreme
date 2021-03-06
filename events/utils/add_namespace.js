/**
 * DevExtreme (events/utils/add_namespace.js)
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
var _errors = require("../../core/errors");
var _errors2 = _interopRequireDefault(_errors);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var addNamespace = function addNamespace(eventNames, namespace) {
    if (!namespace) {
        throw _errors2.default.Error("E0017")
    }
    if (Array.isArray(eventNames)) {
        return eventNames.map(function(eventName) {
            return addNamespace(eventName, namespace)
        }).join(" ")
    }
    if (eventNames.indexOf(" ") !== -1) {
        return addNamespace(eventNames.split(/\s+/g), namespace)
    }
    return "".concat(eventNames, ".").concat(namespace)
};
exports.default = addNamespace;
