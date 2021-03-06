/**
 * DevExtreme (ui/html_editor/converterController.js)
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
var ConverterController = function() {
    function ConverterController() {
        _classCallCheck(this, ConverterController);
        this._converters = {}
    }
    _createClass(ConverterController, [{
        key: "addConverter",
        value: function(name, converter) {
            this._converters[name] = converter
        }
    }, {
        key: "getConverter",
        value: function(name) {
            return this._converters[name]
        }
    }]);
    return ConverterController
}();
var controller = new ConverterController;
exports.default = controller;
