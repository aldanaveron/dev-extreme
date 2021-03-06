/**
 * DevExtreme (data/abstract_store.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var Class = require("../core/class");
var abstract = Class.abstract;
var EventsStrategy = require("../core/events_strategy").EventsStrategy;
var each = require("../core/utils/iterator").each;
var errorsModule = require("./errors");
var dataUtils = require("./utils");
var compileGetter = require("../core/utils/data").compileGetter;
var storeHelper = require("./store_helper");
var queryByOptions = storeHelper.queryByOptions;
var Deferred = require("../core/utils/deferred").Deferred;
var noop = require("../core/utils/common").noop;
var storeImpl = {};
var Store = Class.inherit({
    ctor: function(options) {
        var that = this;
        options = options || {};
        this._eventsStrategy = new EventsStrategy(this);
        each(["onLoaded", "onLoading", "onInserted", "onInserting", "onUpdated", "onUpdating", "onPush", "onRemoved", "onRemoving", "onModified", "onModifying"], function(_, optionName) {
            if (optionName in options) {
                that.on(optionName.slice(2).toLowerCase(), options[optionName])
            }
        });
        this._key = options.key;
        this._errorHandler = options.errorHandler;
        this._useDefaultSearch = true
    },
    _customLoadOptions: function() {
        return null
    },
    key: function() {
        return this._key
    },
    keyOf: function(obj) {
        if (!this._keyGetter) {
            this._keyGetter = compileGetter(this.key())
        }
        return this._keyGetter(obj)
    },
    _requireKey: function() {
        if (!this.key()) {
            throw errorsModule.errors.Error("E4005")
        }
    },
    load: function(options) {
        var that = this;
        options = options || {};
        this._eventsStrategy.fireEvent("loading", [options]);
        return this._withLock(this._loadImpl(options)).done(function(result) {
            that._eventsStrategy.fireEvent("loaded", [result, options])
        })
    },
    _loadImpl: function(options) {
        return queryByOptions(this.createQuery(options), options).enumerate()
    },
    _withLock: function(task) {
        var result = new Deferred;
        task.done(function() {
            var that = this;
            var args = arguments;
            dataUtils.processRequestResultLock.promise().done(function() {
                result.resolveWith(that, args)
            })
        }).fail(function() {
            result.rejectWith(this, arguments)
        });
        return result
    },
    createQuery: abstract,
    totalCount: function(options) {
        return this._totalCountImpl(options)
    },
    _totalCountImpl: function(options) {
        return queryByOptions(this.createQuery(options), options, true).count()
    },
    byKey: function(key, extraOptions) {
        return this._addFailHandlers(this._withLock(this._byKeyImpl(key, extraOptions)))
    },
    _byKeyImpl: abstract,
    insert: function(values) {
        var that = this;
        that._eventsStrategy.fireEvent("modifying");
        that._eventsStrategy.fireEvent("inserting", [values]);
        return that._addFailHandlers(that._insertImpl(values).done(function(callbackValues, callbackKey) {
            that._eventsStrategy.fireEvent("inserted", [callbackValues, callbackKey]);
            that._eventsStrategy.fireEvent("modified")
        }))
    },
    _insertImpl: abstract,
    update: function(key, values) {
        var that = this;
        that._eventsStrategy.fireEvent("modifying");
        that._eventsStrategy.fireEvent("updating", [key, values]);
        return that._addFailHandlers(that._updateImpl(key, values).done(function() {
            that._eventsStrategy.fireEvent("updated", [key, values]);
            that._eventsStrategy.fireEvent("modified")
        }))
    },
    _updateImpl: abstract,
    push: function(changes) {
        this._pushImpl(changes);
        this._eventsStrategy.fireEvent("push", [changes])
    },
    _pushImpl: noop,
    remove: function(key) {
        var that = this;
        that._eventsStrategy.fireEvent("modifying");
        that._eventsStrategy.fireEvent("removing", [key]);
        return that._addFailHandlers(that._removeImpl(key).done(function(callbackKey) {
            that._eventsStrategy.fireEvent("removed", [callbackKey]);
            that._eventsStrategy.fireEvent("modified")
        }))
    },
    _removeImpl: abstract,
    _addFailHandlers: function(deferred) {
        return deferred.fail(this._errorHandler).fail(errorsModule._errorHandler)
    },
    on: function(eventName, eventHandler) {
        this._eventsStrategy.on(eventName, eventHandler);
        return this
    },
    off: function(eventName, eventHandler) {
        this._eventsStrategy.off(eventName, eventHandler);
        return this
    }
});
Store.create = function(alias, options) {
    if (!(alias in storeImpl)) {
        throw errorsModule.errors.Error("E4020", alias)
    }
    return new storeImpl[alias](options)
};
Store.registerClass = function(type, alias) {
    if (alias) {
        storeImpl[alias] = type
    }
    return type
};
Store.inherit = function(inheritor) {
    return function(members, alias) {
        var type = inheritor.apply(this, [members]);
        Store.registerClass(type, alias);
        return type
    }
}(Store.inherit);
module.exports = Store;
