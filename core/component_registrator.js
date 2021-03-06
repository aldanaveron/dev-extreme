/**
 * DevExtreme (core/component_registrator.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _renderer = require("./renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _component_registrator_callbacks = require("./component_registrator_callbacks");
var _component_registrator_callbacks2 = _interopRequireDefault(_component_registrator_callbacks);
var _errors = require("./errors");
var _errors2 = _interopRequireDefault(_errors);
var _public_component = require("./utils/public_component");
var _public_component2 = _interopRequireDefault(_public_component);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var registerComponent = function(name, namespace, componentClass) {
    if (!componentClass) {
        componentClass = namespace
    } else {
        namespace[name] = componentClass
    }
    _public_component2.default.name(componentClass, name);
    _component_registrator_callbacks2.default.fire(name, componentClass)
};
var registerRendererComponent = function(name, componentClass) {
    _renderer2.default.fn[name] = function(options) {
        var isMemberInvoke = "string" === typeof options;
        var result;
        if (isMemberInvoke) {
            var memberName = options;
            var memberArgs = [].slice.call(arguments).slice(1);
            this.each(function() {
                var instance = componentClass.getInstance(this);
                if (!instance) {
                    throw _errors2.default.Error("E0009", name)
                }
                var member = instance[memberName];
                var memberValue = member.apply(instance, memberArgs);
                if (void 0 === result) {
                    result = memberValue
                }
            })
        } else {
            this.each(function() {
                var instance = componentClass.getInstance(this);
                if (instance) {
                    instance.option(options)
                } else {
                    new componentClass(this, options)
                }
            });
            result = this
        }
        return result
    }
};
_component_registrator_callbacks2.default.add(registerRendererComponent);
module.exports = registerComponent;
module.exports.default = module.exports;
