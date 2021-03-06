/**
 * DevExtreme (viz/components/parse_utils.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var noop = require("../../core/utils/common").noop;
var dateSerialization = require("../../core/utils/date_serialization");
var isDefined = require("../../core/utils/type").isDefined;
var parsers = {
    string: function(val) {
        return isDefined(val) ? "" + val : val
    },
    numeric: function(val) {
        if (!isDefined(val)) {
            return val
        }
        var parsedVal = Number(val);
        if (isNaN(parsedVal)) {
            parsedVal = void 0
        }
        return parsedVal
    },
    datetime: function(val) {
        if (!isDefined(val)) {
            return val
        }
        var parsedVal;
        var numVal = Number(val);
        if (!isNaN(numVal)) {
            parsedVal = new Date(numVal)
        } else {
            parsedVal = dateSerialization.deserializeDate(val)
        }
        if (isNaN(Number(parsedVal))) {
            parsedVal = void 0
        }
        return parsedVal
    }
};

function correctValueType(type) {
    return "numeric" === type || "datetime" === type || "string" === type ? type : ""
}
module.exports = {
    correctValueType: correctValueType,
    getParser: function(valueType) {
        return parsers[correctValueType(valueType)] || noop
    }
};
