/**
 * DevExtreme (integration/knockout/template.js)
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
exports.KoTemplate = void 0;
var _renderer = require("../../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _dom_adapter = require("../../core/dom_adapter");
var _knockout = require("knockout");
var _knockout2 = _interopRequireDefault(_knockout);
var _type = require("../../core/utils/type");
var _template_base = require("../../core/templates/template_base");
var _dom = require("../../core/utils/dom");
var _utils = require("./utils");

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
var getParentContext = function(data) {
    var parentNode = (0, _dom_adapter.createElement)("div");
    _knockout2.default.applyBindingsToNode(parentNode, null, data);
    var parentContext = _knockout2.default.contextFor(parentNode);
    _knockout2.default.cleanNode(parentNode);
    return parentContext
};
var KoTemplate = exports.KoTemplate = function(_TemplateBase) {
    _inherits(KoTemplate, _TemplateBase);
    var _super = _createSuper(KoTemplate);

    function KoTemplate(element) {
        var _this;
        _classCallCheck(this, KoTemplate);
        _this = _super.call(this);
        _this._element = element;
        _this._template = (0, _renderer2.default)("<div>").append((0, _dom.normalizeTemplateElement)(element));
        _this._registerKoTemplate();
        return _this
    }
    _createClass(KoTemplate, [{
        key: "_registerKoTemplate",
        value: function() {
            var template = this._template.get(0);
            new _knockout2.default.templateSources.anonymousTemplate(template).nodes(template)
        }
    }, {
        key: "_prepareDataForContainer",
        value: function(data, container) {
            if (container && container.length) {
                var node = (0, _utils.getClosestNodeWithContext)(container.get(0));
                var containerContext = _knockout2.default.contextFor(node);
                data = void 0 !== data ? data : _knockout2.default.dataFor(node) || {};
                if (containerContext) {
                    return data === containerContext.$data ? containerContext : containerContext.createChildContext(data)
                }
            }
            return getParentContext(data).createChildContext(data)
        }
    }, {
        key: "_renderCore",
        value: function(options) {
            var model = this._prepareDataForContainer(options.model, (0, _renderer2.default)(options.container));
            if ((0, _type.isDefined)(options.index)) {
                model.$index = options.index
            }
            var $placeholder = (0, _renderer2.default)("<div>").appendTo(options.container);
            var $result;
            _knockout2.default.renderTemplate(this._template.get(0), model, {
                afterRender: function(nodes) {
                    $result = (0, _renderer2.default)(nodes)
                }
            }, $placeholder.get(0), "replaceNode");
            return $result
        }
    }, {
        key: "source",
        value: function() {
            return (0, _renderer2.default)(this._element).clone()
        }
    }, {
        key: "dispose",
        value: function() {
            this._template.remove()
        }
    }]);
    return KoTemplate
}(_template_base.TemplateBase);
