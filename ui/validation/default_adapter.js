/**
 * DevExtreme (ui/validation/default_adapter.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _callbacks = require("../../core/utils/callbacks");
var _callbacks2 = _interopRequireDefault(_callbacks);
var _class = require("../../core/class");
var _class2 = _interopRequireDefault(_class);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var DefaultAdapter = _class2.default.inherit({
    ctor: function(editor, validator) {
        var _this = this;
        this.editor = editor;
        this.validator = validator;
        this.validationRequestsCallbacks = (0, _callbacks2.default)();
        var handler = function(args) {
            _this.validationRequestsCallbacks.fire(args)
        };
        editor.validationRequest.add(handler);
        editor.on("disposing", function() {
            editor.validationRequest.remove(handler)
        })
    },
    getValue: function() {
        return this.editor.option("value")
    },
    getCurrentValidationError: function() {
        return this.editor.option("validationError")
    },
    bypass: function() {
        return this.editor.option("disabled")
    },
    applyValidationResults: function(params) {
        this.editor.option({
            validationErrors: params.brokenRules,
            validationStatus: params.status
        })
    },
    reset: function() {
        this.editor.reset()
    },
    focus: function() {
        this.editor.focus()
    }
});
module.exports = DefaultAdapter;
