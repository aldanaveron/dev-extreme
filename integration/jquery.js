/**
 * DevExtreme (integration/jquery.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _jquery = require("jquery");
var _jquery2 = _interopRequireDefault(_jquery);
var _version = require("../core/utils/version");
var _error = require("../core/utils/error");
var _error2 = _interopRequireDefault(_error);
var _use_jquery = require("./jquery/use_jquery");
var _use_jquery2 = _interopRequireDefault(_use_jquery);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var useJQuery = (0, _use_jquery2.default)();
if (useJQuery && (0, _version.compare)(_jquery2.default.fn.jquery, [1, 10]) < 0) {
    throw _error2.default.Error("E0012")
}
require("./jquery/renderer");
require("./jquery/hooks");
require("./jquery/deferred");
require("./jquery/hold_ready");
require("./jquery/events");
require("./jquery/easing");
require("./jquery/element_data");
require("./jquery/element");
require("./jquery/component_registrator");
require("./jquery/ajax");
