/**
 * DevExtreme (ui/validation_group.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _renderer = require("../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _component_registrator = require("../core/component_registrator");
var _component_registrator2 = _interopRequireDefault(_component_registrator);
var _dom_component = require("../core/dom_component");
var _dom_component2 = _interopRequireDefault(_dom_component);
var _validation_summary = require("./validation_summary");
var _validation_summary2 = _interopRequireDefault(_validation_summary);
var _validation_engine = require("./validation_engine");
var _validation_engine2 = _interopRequireDefault(_validation_engine);
var _validator = require("./validator");
var _validator2 = _interopRequireDefault(_validator);

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

function _get(target, property, receiver) {
    if ("undefined" !== typeof Reflect && Reflect.get) {
        _get = Reflect.get
    } else {
        _get = function(target, property, receiver) {
            var base = _superPropBase(target, property);
            if (!base) {
                return
            }
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
                return desc.get.call(receiver)
            }
            return desc.value
        }
    }
    return _get(target, property, receiver || target)
}

function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
        object = _getPrototypeOf(object);
        if (null === object) {
            break
        }
    }
    return object
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
var VALIDATION_ENGINE_CLASS = "dx-validationgroup";
var VALIDATOR_CLASS = "dx-validator";
var VALIDATION_SUMMARY_CLASS = "dx-validationsummary";
var ValidationGroup = function(_DOMComponent) {
    _inherits(ValidationGroup, _DOMComponent);
    var _super = _createSuper(ValidationGroup);

    function ValidationGroup() {
        _classCallCheck(this, ValidationGroup);
        return _super.apply(this, arguments)
    }
    _createClass(ValidationGroup, [{
        key: "_getDefaultOptions",
        value: function() {
            return _get(_getPrototypeOf(ValidationGroup.prototype), "_getDefaultOptions", this).call(this)
        }
    }, {
        key: "_init",
        value: function() {
            _get(_getPrototypeOf(ValidationGroup.prototype), "_init", this).call(this);
            _validation_engine2.default.addGroup(this)
        }
    }, {
        key: "_initMarkup",
        value: function() {
            var $element = this.$element();
            $element.addClass(VALIDATION_ENGINE_CLASS);
            $element.find(".".concat(VALIDATOR_CLASS)).each(function(_, validatorContainer) {
                _validator2.default.getInstance((0, _renderer2.default)(validatorContainer))._initGroupRegistration()
            });
            $element.find(".".concat(VALIDATION_SUMMARY_CLASS)).each(function(_, summaryContainer) {
                _validation_summary2.default.getInstance((0, _renderer2.default)(summaryContainer))._initGroupRegistration()
            });
            _get(_getPrototypeOf(ValidationGroup.prototype), "_initMarkup", this).call(this)
        }
    }, {
        key: "validate",
        value: function() {
            return _validation_engine2.default.validateGroup(this)
        }
    }, {
        key: "reset",
        value: function() {
            return _validation_engine2.default.resetGroup(this)
        }
    }, {
        key: "_dispose",
        value: function() {
            _validation_engine2.default.removeGroup(this);
            this.$element().removeClass(VALIDATION_ENGINE_CLASS);
            _get(_getPrototypeOf(ValidationGroup.prototype), "_dispose", this).call(this)
        }
    }, {
        key: "_useTemplates",
        value: function() {
            return false
        }
    }]);
    return ValidationGroup
}(_dom_component2.default);
(0, _component_registrator2.default)("dxValidationGroup", ValidationGroup);
module.exports = ValidationGroup;
module.exports.default = module.exports;
