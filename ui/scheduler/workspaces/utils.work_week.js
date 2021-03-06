/**
 * DevExtreme (ui/scheduler/workspaces/utils.work_week.js)
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
var dateUtils = require("../../../core/utils/date");
var MONDAY_INDEX = 1;
var SATURDAY_INDEX = 6;
var SUNDAY_INDEX = 0;
var isDataOnWeekend = exports.isDataOnWeekend = function(date) {
    var day = date.getDay();
    return day === SATURDAY_INDEX || day === SUNDAY_INDEX
};
var getFirstDayOfWeek = exports.getFirstDayOfWeek = function(firstDayOfWeekOption) {
    return firstDayOfWeekOption || MONDAY_INDEX
};
var getWeekendsCount = exports.getWeekendsCount = function(days) {
    return 2 * Math.floor(days / 7)
};
var getFirstViewDate = exports.getFirstViewDate = function(viewStart, firstDayOfWeek) {
    var firstViewDate = dateUtils.getFirstWeekDate(viewStart, firstDayOfWeek);
    return dateUtils.normalizeDateByWeek(firstViewDate, viewStart)
};
