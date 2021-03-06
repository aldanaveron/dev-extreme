/**
 * DevExtreme (ui/gantt/ui.gantt.data.option.js)
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
var DataOption = function(_Component) {
    _inherits(DataOption, _Component);
    var _super = _createSuper(DataOption);

    function DataOption(optionName, loadPanel, dataSourceChangedCallback) {
        var _this;
        _classCallCheck(this, DataOption);
        _this = _super.call(this);
        _this._optionName = optionName;
        _this._loadPanel = loadPanel;
        _this._dataSourceChangedCallback = dataSourceChangedCallback;
        return _this
    }
    _createClass(DataOption, [{
        key: "insert",
        value: function(data, callback, errorCallback) {
            var _this2 = this;
            this._showLoadPanel();
            this._getStore().insert(data).done(function(response) {
                if (callback) {
                    callback(response)
                }
                _this2._hideLoadPanel()
            }).fail(function(error) {
                if (errorCallback) {
                    errorCallback(error)
                }
                _this2._hideLoadPanel()
            })
        }
    }, {
        key: "update",
        value: function(key, data, callback, errorCallback) {
            var _this3 = this;
            this._showLoadPanel();
            this._getStore().update(key, data).done(function(data, key) {
                if (callback) {
                    callback(data, key)
                }
                _this3._hideLoadPanel()
            }).fail(function(error) {
                if (errorCallback) {
                    errorCallback(error)
                }
                _this3._hideLoadPanel()
            })
        }
    }, {
        key: "remove",
        value: function(key, callback, errorCallback) {
            var _this4 = this;
            this._showLoadPanel();
            this._getStore().remove(key).done(function(key) {
                if (callback) {
                    callback(key)
                }
                _this4._hideLoadPanel()
            }).fail(function(error) {
                if (errorCallback) {
                    errorCallback(error)
                }
                _this4._hideLoadPanel()
            })
        }
    }, {
        key: "_dataSourceChangedHandler",
        value: function(newItems, e) {
            this._dataSourceChangedCallback(this._optionName, newItems)
        }
    }, {
        key: "_dataSourceOptions",
        value: function() {
            return {
                paginate: false
            }
        }
    }, {
        key: "_dataSourceLoadingChangedHandler",
        value: function(isLoading) {
            if (isLoading && !this._dataSource.isLoaded()) {
                this._showLoadPanel()
            } else {
                this._hideLoadPanel()
            }
        }
    }, {
        key: "_showLoadPanel",
        value: function() {
            this._loadPanel.show()
        }
    }, {
        key: "_hideLoadPanel",
        value: function() {
            this._loadPanel.hide()
        }
    }, {
        key: "_getStore",
        value: function() {
            return this._dataSource.store()
        }
    }]);
    return DataOption
}(_component2.default);
DataOption.include(_data_helper2.default);
module.exports = DataOption;
