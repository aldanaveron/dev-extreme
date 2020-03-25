/**
 * DevExtreme (viz/range_selector/common.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _format = require("../axes/smart_formatter").smartFormatter;
var isFunction = require("../../core/utils/type").isFunction;
var HEIGHT_COMPACT_MODE = 24;
var POINTER_SIZE = 4;
var EMPTY_SLIDER_MARKER_TEXT = ". . .";
var utils = {
    trackerSettings: {
        fill: "grey",
        stroke: "grey",
        opacity: 1e-4
    },
    animationSettings: {
        duration: 250
    }
};
var consts = {
    emptySliderMarkerText: EMPTY_SLIDER_MARKER_TEXT,
    pointerSize: POINTER_SIZE
};
var formatValue = function(value, formatOptions, tickIntervalsInfo, valueType, type, logarithmBase) {
    var formatObject = {
        value: value,
        valueText: _format(value, {
            labelOptions: formatOptions,
            ticks: tickIntervalsInfo ? tickIntervalsInfo.ticks : [],
            tickInterval: tickIntervalsInfo ? tickIntervalsInfo.tickInterval : void 0,
            dataType: valueType,
            type: type,
            logarithmBase: logarithmBase
        })
    };
    return String(isFunction(formatOptions.customizeText) ? formatOptions.customizeText.call(formatObject, formatObject) : formatObject.valueText)
};
exports.utils = utils;
exports.consts = consts;
exports.formatValue = formatValue;
exports.HEIGHT_COMPACT_MODE = HEIGHT_COMPACT_MODE;