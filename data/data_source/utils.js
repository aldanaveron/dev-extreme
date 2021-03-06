/**
 * DevExtreme (data/data_source/utils.js)
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
exports.normalizeDataSourceOptions = exports.normalizeLoadResult = exports.mapDataRespectingGrouping = exports.normalizeStoreLoadOptionAccessorArguments = exports.isPending = exports.CANCELED_TOKEN = void 0;
var _ajax = require("../../core/utils/ajax");
var _abstract_store = require("../abstract_store");
var _abstract_store2 = _interopRequireDefault(_abstract_store);
var _array_store = require("../array_store");
var _array_store2 = _interopRequireDefault(_array_store);
var _iterator = require("../../core/utils/iterator");
var _custom_store = require("../custom_store");
var _custom_store2 = _interopRequireDefault(_custom_store);
var _extend = require("../../core/utils/extend");
var _type = require("../../core/utils/type");
var _utils = require("../utils");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var CANCELED_TOKEN = exports.CANCELED_TOKEN = "canceled";
var isPending = exports.isPending = function(deferred) {
    return "pending" === deferred.state()
};
var normalizeStoreLoadOptionAccessorArguments = exports.normalizeStoreLoadOptionAccessorArguments = function(originalArguments) {
    switch (originalArguments.length) {
        case 0:
            return;
        case 1:
            return originalArguments[0]
    }
    return [].slice.call(originalArguments)
};
var mapGroup = function(group, level, mapper) {
    return (0, _iterator.map)(group, function(item) {
        var result = {
            key: item.key,
            items: mapRecursive(item.items, level - 1, mapper)
        };
        if ("aggregates" in item) {
            result.aggregates = item.aggregates
        }
        return result
    })
};
var mapRecursive = function(items, level, mapper) {
    if (!Array.isArray(items)) {
        return items
    }
    return level ? mapGroup(items, level, mapper) : (0, _iterator.map)(items, mapper)
};
var mapDataRespectingGrouping = exports.mapDataRespectingGrouping = function(items, mapper, groupInfo) {
    var level = groupInfo ? (0, _utils.normalizeSortingInfo)(groupInfo).length : 0;
    return mapRecursive(items, level, mapper)
};
var normalizeLoadResult = exports.normalizeLoadResult = function(data, extra) {
    var _data;
    if (null === (_data = data) || void 0 === _data ? void 0 : _data.data) {
        extra = data;
        data = data.data
    }
    if (!Array.isArray(data)) {
        data = [data]
    }
    return {
        data: data,
        extra: extra
    }
};
var createCustomStoreFromLoadFunc = function(options) {
    var storeConfig = {};
    (0, _iterator.each)(["useDefaultSearch", "key", "load", "loadMode", "cacheRawData", "byKey", "lookup", "totalCount", "insert", "update", "remove"], function() {
        storeConfig[this] = options[this];
        delete options[this]
    });
    return new _custom_store2.default(storeConfig)
};
var createStoreFromConfig = function(storeConfig) {
    var alias = storeConfig.type;
    delete storeConfig.type;
    return _abstract_store2.default.create(alias, storeConfig)
};
var createCustomStoreFromUrl = function(url, normalizationOptions) {
    return new _custom_store2.default({
        load: function() {
            return (0, _ajax.sendRequest)({
                url: url,
                dataType: "json"
            })
        },
        loadMode: null === normalizationOptions || void 0 === normalizationOptions ? void 0 : normalizationOptions.fromUrlLoadMode
    })
};
var normalizeDataSourceOptions = exports.normalizeDataSourceOptions = function(options, normalizationOptions) {
    var store;
    if ("string" === typeof options) {
        options = {
            paginate: false,
            store: createCustomStoreFromUrl(options, normalizationOptions)
        }
    }
    if (void 0 === options) {
        options = []
    }
    if (Array.isArray(options) || options instanceof _abstract_store2.default) {
        options = {
            store: options
        }
    } else {
        options = (0, _extend.extend)({}, options)
    }
    if (void 0 === options.store) {
        options.store = []
    }
    store = options.store;
    if ("load" in options) {
        store = createCustomStoreFromLoadFunc(options)
    } else {
        if (Array.isArray(store)) {
            store = new _array_store2.default(store)
        } else {
            if ((0, _type.isPlainObject)(store)) {
                store = createStoreFromConfig((0, _extend.extend)({}, store))
            }
        }
    }
    options.store = store;
    return options
};
