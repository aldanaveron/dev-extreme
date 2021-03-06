/**
 * DevExtreme (localization/default_date_names.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _iterator = require("../core/utils/iterator");
var _iterator2 = _interopRequireDefault(_iterator);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var PERIODS = ["AM", "PM"];
var QUARTERS = ["Q1", "Q2", "Q3", "Q4"];
var cutCaptions = function(captions, format) {
    var lengthByFormat = {
        abbreviated: 3,
        "short": 2,
        narrow: 1
    };
    return _iterator2.default.map(captions, function(caption) {
        return caption.substr(0, lengthByFormat[format])
    })
};
module.exports = {
    getMonthNames: function(format) {
        return cutCaptions(MONTHS, format)
    },
    getDayNames: function(format) {
        return cutCaptions(DAYS, format)
    },
    getQuarterNames: function(format) {
        return QUARTERS
    },
    getPeriodNames: function(format) {
        return PERIODS
    }
};
