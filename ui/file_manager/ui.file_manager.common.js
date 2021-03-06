/**
 * DevExtreme (ui/file_manager/ui.file_manager.common.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _deferred = require("../../core/utils/deferred");
var _extend = require("../../core/utils/extend");
var _common = require("../../core/utils/common");
var _type = require("../../core/utils/type");
var _type2 = _interopRequireDefault(_type);

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
var whenSome = function(arg, onSuccess, onError) {
    onSuccess = onSuccess || _common.noop;
    onError = onError || _common.noop;
    if (!Array.isArray(arg)) {
        arg = [arg]
    }
    var deferreds = arg.map(function(item, index) {
        return (0, _deferred.when)(item).then(function(result) {
            _type2.default.isFunction(onSuccess) && onSuccess({
                item: item,
                index: index,
                result: result
            });
            return result
        }, function(error) {
            if (!error) {
                error = {}
            }
            error.index = index;
            _type2.default.isFunction(onError) && onError(error);
            return (new _deferred.Deferred).resolve().promise()
        })
    });
    return _deferred.when.apply(null, deferreds)
};
var getDisplayFileSize = function(byteSize) {
    var sizesTitles = ["B", "KB", "MB", "GB", "TB"];
    var index = 0;
    var displaySize = byteSize;
    while (displaySize >= 1024 && index <= sizesTitles.length - 1) {
        displaySize /= 1024;
        index++
    }
    displaySize = Math.round(10 * displaySize) / 10;
    return "".concat(displaySize, " ").concat(sizesTitles[index])
};
var extendAttributes = function(targetObject, sourceObject, objectKeysArray) {
    objectKeysArray.forEach(function(objectKey) {
        (0, _extend.extend)(true, targetObject, _type2.default.isDefined(sourceObject[objectKey]) ? _defineProperty({}, objectKey, sourceObject[objectKey]) : {})
    });
    return targetObject
};
var findItemsByKeys = function(itemInfos, keys) {
    var itemMap = {};
    keys.forEach(function(key) {
        itemMap[key] = null
    });
    itemInfos.forEach(function(itemInfo) {
        var key = itemInfo.fileItem.key;
        if (Object.prototype.hasOwnProperty.call(itemMap, key)) {
            itemMap[key] = itemInfo
        }
    });
    var result = [];
    keys.forEach(function(key) {
        var itemInfo = itemMap[key];
        if (itemInfo) {
            result.push(itemInfo)
        }
    });
    return result
};
module.exports = whenSome;
module.exports.getDisplayFileSize = getDisplayFileSize;
module.exports.extendAttributes = extendAttributes;
module.exports.findItemsByKeys = findItemsByKeys;
