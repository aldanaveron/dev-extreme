/**
 * DevExtreme (ui/form/ui.form.utils.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _type = require("../../core/utils/type");

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) {
        return
    }
    if ("string" === typeof o) {
        return _arrayLikeToArray(o, minLen)
    }
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if ("Object" === n && o.constructor) {
        n = o.constructor.name
    }
    if ("Map" === n || "Set" === n) {
        return Array.from(n)
    }
    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
        return _arrayLikeToArray(o, minLen)
    }
}

function _iterableToArray(iter) {
    if ("undefined" !== typeof Symbol && Symbol.iterator in Object(iter)) {
        return Array.from(iter)
    }
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        return _arrayLikeToArray(arr)
    }
}

function _arrayLikeToArray(arr, len) {
    if (null == len || len > arr.length) {
        len = arr.length
    }
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i]
    }
    return arr2
}
var createItemPathByIndex = function(index, isTabs) {
    return "".concat(isTabs ? "tabs" : "items", "[").concat(index, "]")
};
var concatPaths = function(path1, path2) {
    if ((0, _type.isDefined)(path1) && (0, _type.isDefined)(path2)) {
        return "".concat(path1, ".").concat(path2)
    }
    return path1 || path2
};
var getTextWithoutSpaces = function(text) {
    return text ? text.replace(/\s/g, "") : void 0
};
var isExpectedItem = function(item, fieldName) {
    return item && (item.dataField === fieldName || item.name === fieldName || getTextWithoutSpaces(item.title) === fieldName || "group" === item.itemType && getTextWithoutSpaces(item.caption) === fieldName)
};
var getFullOptionName = function(path, optionName) {
    return "".concat(path, ".").concat(optionName)
};
var getOptionNameFromFullName = function(fullName) {
    var parts = fullName.split(".");
    return parts[parts.length - 1].replace(/\[\d+]/, "")
};
var tryGetTabPath = function(fullPath) {
    var pathParts = fullPath.split(".");
    var resultPathParts = _toConsumableArray(pathParts);
    for (var i = pathParts.length - 1; i >= 0; i--) {
        if (isFullPathContainsTabs(pathParts[i])) {
            return resultPathParts.join(".")
        }
        resultPathParts.splice(i, 1)
    }
    return ""
};
var isFullPathContainsTabs = function(fullPath) {
    return fullPath.indexOf("tabs") > -1
};
exports.getOptionNameFromFullName = getOptionNameFromFullName;
exports.getFullOptionName = getFullOptionName;
exports.getTextWithoutSpaces = getTextWithoutSpaces;
exports.isExpectedItem = isExpectedItem;
exports.createItemPathByIndex = createItemPathByIndex;
exports.concatPaths = concatPaths;
exports.tryGetTabPath = tryGetTabPath;
exports.isFullPathContainsTabs = isFullPathContainsTabs;
