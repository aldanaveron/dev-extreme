/**
 * DevExtreme (integration/angular/action_executors.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _action = require("../../core/action");
var _action2 = _interopRequireDefault(_action);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
_action2.default.registerExecutor({
    ngExpression: {
        execute: function(e) {
            if ("string" === typeof e.action) {
                e.context.$eval(e.action)
            }
        }
    }
});
