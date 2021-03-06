/**
 * DevExtreme (ui/diagram/diagram.items_option.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _component = require("../../core/component");
var _component2 = _interopRequireDefault(_component);
var _data_helper = require("../../data_helper");
var _data_helper2 = _interopRequireDefault(_data_helper);

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

function _createSuper(Derived) {
    return function() {
        var result, Super = _getPrototypeOf(Derived);
        if (_isNativeReflectConstruct()) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget)
        } else {
            result = Super.apply(this, arguments)
        }
        return _possibleConstructorReturn(this, result)
    }
}

function _possibleConstructorReturn(self, call) {
    if (call && ("object" === _typeof(call) || "function" === typeof call)) {
        return call
    }
    return _assertThisInitialized(self)
}

function _assertThisInitialized(self) {
    if (void 0 === self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
    }
    return self
}

function _isNativeReflectConstruct() {
    if ("undefined" === typeof Reflect || !Reflect.construct) {
        return false
    }
    if (Reflect.construct.sham) {
        return false
    }
    if ("function" === typeof Proxy) {
        return true
    }
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
        return true
    } catch (e) {
        return false
    }
}

function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function(o) {
        return o.__proto__ || Object.getPrototypeOf(o)
    };
    return _getPrototypeOf(o)
}

function _inherits(subClass, superClass) {
    if ("function" !== typeof superClass && null !== superClass) {
        throw new TypeError("Super expression must either be null or a function")
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) {
        _setPrototypeOf(subClass, superClass)
    }
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function(o, p) {
        o.__proto__ = p;
        return o
    };
    return _setPrototypeOf(o, p)
}
var ItemsOption = function(_Component) {
    _inherits(ItemsOption, _Component);
    var _super = _createSuper(ItemsOption);

    function ItemsOption(diagramWidget) {
        var _this;
        _classCallCheck(this, ItemsOption);
        _this = _super.call(this);
        _this._diagramWidget = diagramWidget;
        _this._resetCache();
        return _this
    }
    _createClass(ItemsOption, [{
        key: "_dataSourceChangedHandler",
        value: function(newItems, e) {
            this._items = newItems;
            this._diagramWidget._onDataSourceChanged()
        }
    }, {
        key: "_dataSourceLoadingChangedHandler",
        value: function(isLoading) {
            if (isLoading && !this._dataSource.isLoaded()) {
                this._diagramWidget._showLoadingIndicator()
            } else {
                this._diagramWidget._hideLoadingIndicator()
            }
        }
    }, {
        key: "insert",
        value: function(data, callback, errorCallback) {
            var _this2 = this;
            this._resetCache();
            this._getStore().insert(data).done(function(data) {
                if (callback) {
                    callback(data)
                }
                _this2._resetCache()
            }).fail(function(error) {
                if (errorCallback) {
                    errorCallback(error)
                }
                _this2._resetCache()
            })
        }
    }, {
        key: "update",
        value: function(key, data, callback, errorCallback) {
            var storeKey = this._getStoreKey(data);
            this._getStore().update(storeKey, data).done(function(data, key) {
                if (callback) {
                    callback(key, data)
                }
            }).fail(function(error) {
                if (errorCallback) {
                    errorCallback(error)
                }
            })
        }
    }, {
        key: "remove",
        value: function(key, data, callback, errorCallback) {
            var _this3 = this;
            this._resetCache();
            var storeKey = this._getStoreKey(data);
            this._getStore().remove(storeKey).done(function(key) {
                if (callback) {
                    callback(key, data)
                }
                _this3._resetCache()
            }).fail(function(error) {
                if (errorCallback) {
                    errorCallback(error)
                }
                _this3._resetCache()
            })
        }
    }, {
        key: "findItem",
        value: function(itemKey) {
            if (!this._items) {
                return null
            }
            var index = this._getIndexByKey(itemKey);
            return this._items[index]
        }
    }, {
        key: "getItems",
        value: function() {
            return this._items
        }
    }, {
        key: "hasItems",
        value: function() {
            return !!this._items
        }
    }, {
        key: "_getIndexByKey",
        value: function(key) {
            var cache = this._cache;
            var keys = cache.keys || this._getKeys() || [];
            if (!cache.keys) {
                cache.keys = keys
            }
            if ("object" === _typeof(key)) {
                for (var i = 0, length = keys.length; i < length; i++) {
                    if (keys[i] === key) {
                        return i
                    }
                }
            } else {
                var set = cache.set || keys.reduce(function(accumulator, key, index) {
                    accumulator[key] = index;
                    return accumulator
                }, {});
                if (!cache.set) {
                    cache.set = set
                }
                return set[key]
            }
            return -1
        }
    }, {
        key: "_getKeys",
        value: function() {
            if (!this._items) {
                return []
            }
            var keyExpr = this._getKeyExpr();
            return keyExpr && this._items && this._items.map(function(item) {
                return keyExpr(item)
            })
        }
    }, {
        key: "_getKeyExpr",
        value: function() {
            throw "Not Implemented"
        }
    }, {
        key: "_dataSourceOptions",
        value: function() {
            return {
                paginate: false
            }
        }
    }, {
        key: "_getStore",
        value: function() {
            return this._dataSource.store()
        }
    }, {
        key: "_getStoreKey",
        value: function(data) {
            return this._getStore().keyOf(data)
        }
    }, {
        key: "_resetCache",
        value: function() {
            this._cache = {}
        }
    }]);
    return ItemsOption
}(_component2.default);
ItemsOption.include(_data_helper2.default);
module.exports = ItemsOption;
