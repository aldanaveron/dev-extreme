/**
 * DevExtreme (ui/notify.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _renderer = require("../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _action = require("../core/action");
var _action2 = _interopRequireDefault(_action);
var _view_port = require("../core/utils/view_port");
var _view_port2 = _interopRequireDefault(_view_port);
var _extend = require("../core/utils/extend");
var _type = require("../core/utils/type");
var _toast = require("./toast");
var _toast2 = _interopRequireDefault(_toast);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var $notify = null;
var notify = function(message, type, displayTime) {
    var options = (0, _type.isPlainObject)(message) ? message : {
        message: message
    };
    var userHiddenAction = options.onHidden;
    (0, _extend.extend)(options, {
        type: type,
        displayTime: displayTime,
        onHidden: function(args) {
            (0, _renderer2.default)(args.element).remove();
            new _action2.default(userHiddenAction, {
                context: args.model
            }).execute(arguments)
        }
    });
    $notify = (0, _renderer2.default)("<div>").appendTo(_view_port2.default.value());
    new _toast2.default($notify, options).show()
};
module.exports = notify;
module.exports.default = module.exports;
