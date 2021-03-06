/**
 * DevExtreme (core/templates/bindable_template.js)
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
exports.BindableTemplate = void 0;
var _renderer = require("../renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _template_base = require("./template_base");
var _events_engine = require("../../events/core/events_engine");
var _remove_event = require("../remove_event");
var _remove_event2 = _interopRequireDefault(_remove_event);
var _type = require("../utils/type");

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
var watchChanges = function() {
    var globalWatch = function(data, watchMethod, callback) {
        return watchMethod(function() {
            return data
        }, callback)
    };
    var fieldsWatch = function(data, watchMethod, fields, fieldsMap, callback) {
        var resolvedData = {};
        var missedFields = fields.slice();
        var watchHandlers = fields.map(function(name) {
            var fieldGetter = fieldsMap[name];
            return watchMethod(fieldGetter ? function() {
                return fieldGetter(data)
            } : function() {
                return data[name]
            }, function(value) {
                resolvedData[name] = value;
                if (missedFields.length) {
                    var index = missedFields.indexOf(name);
                    if (index >= 0) {
                        missedFields.splice(index, 1)
                    }
                }
                if (!missedFields.length) {
                    callback(resolvedData)
                }
            })
        });
        return function() {
            watchHandlers.forEach(function(dispose) {
                return dispose()
            })
        }
    };
    return function(rawData, watchMethod, fields, fieldsMap, callback) {
        var fieldsDispose;
        var globalDispose = globalWatch(rawData, watchMethod, function(dataWithRawFields) {
            fieldsDispose && fieldsDispose();
            if ((0, _type.isPrimitive)(dataWithRawFields)) {
                callback(dataWithRawFields);
                return
            }
            fieldsDispose = fieldsWatch(dataWithRawFields, watchMethod, fields, fieldsMap, callback)
        });
        return function() {
            fieldsDispose && fieldsDispose();
            globalDispose && globalDispose()
        }
    }
}();
var BindableTemplate = exports.BindableTemplate = function(_TemplateBase) {
    _inherits(BindableTemplate, _TemplateBase);
    var _super = _createSuper(BindableTemplate);

    function BindableTemplate(render, fields, watchMethod, fieldsMap) {
        var _this;
        _classCallCheck(this, BindableTemplate);
        _this = _super.call(this);
        _this._render = render;
        _this._fields = fields;
        _this._fieldsMap = fieldsMap || {};
        _this._watchMethod = watchMethod;
        return _this
    }
    _createClass(BindableTemplate, [{
        key: "_renderCore",
        value: function(options) {
            var _this2 = this;
            var $container = (0, _renderer2.default)(options.container);
            var dispose = watchChanges(options.model, this._watchMethod, this._fields, this._fieldsMap, function(data) {
                $container.empty();
                _this2._render($container, data, options.model)
            });
            (0, _events_engine.on)($container, _remove_event2.default, dispose);
            return $container.contents()
        }
    }]);
    return BindableTemplate
}(_template_base.TemplateBase);
