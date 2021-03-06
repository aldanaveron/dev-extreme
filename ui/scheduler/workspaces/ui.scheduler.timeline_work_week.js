/**
 * DevExtreme (ui/scheduler/workspaces/ui.scheduler.timeline_work_week.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var registerComponent = require("../../../core/component_registrator");
var SchedulerTimelineWeek = require("./ui.scheduler.timeline_week");
var dateUtils = require("../../../core/utils/date");
var workWeekUtils = require("./utils.work_week");
var toMs = dateUtils.dateToMilliseconds;
var TIMELINE_CLASS = "dx-scheduler-timeline-work-week";
var LAST_DAY_WEEK_INDEX = 5;
var SchedulerTimelineWorkWeek = SchedulerTimelineWeek.inherit({
    _getElementClass: function() {
        return TIMELINE_CLASS
    },
    _getWeekDuration: function() {
        return 5
    },
    _firstDayOfWeek: function() {
        return workWeekUtils.getFirstDayOfWeek(this.option("firstDayOfWeek"))
    },
    _isSkippedData: workWeekUtils.isDataOnWeekend,
    _incrementDate: function(date) {
        var day = date.getDay();
        if (day === LAST_DAY_WEEK_INDEX) {
            date.setDate(date.getDate() + 2)
        }
        this.callBase(date)
    },
    _getOffsetByCount: function(cellIndex) {
        var weekendCount = Math.floor(cellIndex / (5 * this._getCellCountInDay()));
        return toMs("day") * weekendCount * 2
    },
    _getWeekendsCount: workWeekUtils.getWeekendsCount,
    _setFirstViewDate: function() {
        this._firstViewDate = workWeekUtils.getFirstViewDate(this.option("currentDate"), this._firstDayOfWeek());
        this._setStartDayHour(this._firstViewDate)
    }
});
registerComponent("dxSchedulerTimelineWorkWeek", SchedulerTimelineWorkWeek);
module.exports = SchedulerTimelineWorkWeek;
