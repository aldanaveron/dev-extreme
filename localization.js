/**
 * DevExtreme (localization.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var core = require("./localization/core");
var message = require("./localization/message");
var number = require("./localization/number");
var date = require("./localization/date");
require("./localization/currency");
exports.locale = core.locale.bind(core);
exports.loadMessages = message.load.bind(message);
exports.formatMessage = message.format.bind(message);
exports.formatNumber = number.format.bind(number);
exports.parseNumber = number.parse.bind(number);
exports.formatDate = date.format.bind(date);
exports.parseDate = date.parse.bind(date);
exports.message = message;
exports.number = number;
exports.date = date;
exports.disableIntl = function() {
    if ("intl" === number.engine()) {
        number.resetInjection()
    }
    if ("intl" === date.engine()) {
        date.resetInjection()
    }
};
