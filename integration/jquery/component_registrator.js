/**
 * DevExtreme (integration/jquery/component_registrator.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _jquery = require("jquery");
var _jquery2 = _interopRequireDefault(_jquery);
var _component_registrator_callbacks = require("../../core/component_registrator_callbacks");
var _component_registrator_callbacks2 = _interopRequireDefault(_component_registrator_callbacks);
var _errors = require("../../core/errors");
var _errors2 = _interopRequireDefault(_errors);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
if (_jquery2.default) {
    var registerJQueryComponent = function(name, componentClass) {
        _jquery2.default.fn[name] = function(options) {
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
    _component_registrator_callbacks2.default.add(registerJQueryComponent)
}
