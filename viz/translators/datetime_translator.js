/**
 * DevExtreme (viz/translators/datetime_translator.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";

function parse(value) {
    return null !== value ? new Date(value) : value
}
module.exports = {
    _fromValue: parse,
    _toValue: parse,
    _add: require("../../core/utils/date").addDateInterval
};
