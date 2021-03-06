/**
 * DevExtreme (ui/scheduler/workspaces/ui.scheduler.work_space_week.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var $ = require("../../../core/renderer");
var registerComponent = require("../../../core/component_registrator");
var dateUtils = require("../../../core/utils/date");
var dateLocalization = require("../../../localization/date");
var each = require("../../../core/utils/iterator").each;
var SchedulerWorkSpace = require("./ui.scheduler.work_space.indicator");
var WEEK_CLASS = "dx-scheduler-work-space-week";
var toMs = dateUtils.dateToMilliseconds;
var SchedulerWorkSpaceWeek = SchedulerWorkSpace.inherit({
    _getElementClass: function() {
        return WEEK_CLASS
    },
    _getRowCount: function() {
        return this._getCellCountInDay()
    },
    _getCellCount: function() {
        return 7 * this.option("intervalCount")
    },
    _getDateByIndex: function(headerIndex) {
        var resultDate = new Date(this._firstViewDate);
        resultDate.setDate(this._firstViewDate.getDate() + headerIndex);
        return resultDate
    },
    _getFormat: function() {
        return this._formatWeekdayAndDay
    },
    _getStartViewDate: function() {
        return dateUtils.getFirstWeekDate(this.option("startDate"), this._firstDayOfWeek() || dateLocalization.firstDayOfWeekIndex())
    },
    _getIntervalDuration: function() {
        return 7 * toMs("day") * this.option("intervalCount")
    },
    _getCellsBetween: function($first, $last) {
        if (this._hasAllDayClass($last)) {
            return this.callBase($first, $last)
        }
        var $cells = this._getCells();
        var firstColumn = $first.index();
        var firstRow = $first.parent().index();
        var lastColumn = $last.index();
        var lastRow = $last.parent().index();
        var groupCount = this._getGroupCount();
        var cellCount = groupCount > 0 ? this._getTotalCellCount(groupCount) : this._getCellCount();
        var rowCount = this._getTotalRowCount(groupCount);
        var result = [];
        for (var i = 0; i < cellCount; i++) {
            for (var j = 0; j < rowCount; j++) {
                var cell = $cells.get(cellCount * j + i);
                result.push(cell)
            }
        }
        var lastCellGroup = this.getCellData($last).groups;
        var indexesDifference = this.option("showAllDayPanel") && this._isVerticalGroupedWorkSpace() ? this._getGroupIndexByResourceId(lastCellGroup) + 1 : 0;
        var newFirstIndex = rowCount * firstColumn + firstRow - indexesDifference;
        var newLastIndex = rowCount * lastColumn + lastRow - indexesDifference;
        if (newFirstIndex > newLastIndex) {
            var buffer = newFirstIndex;
            newFirstIndex = newLastIndex;
            newLastIndex = buffer
        }
        $cells = $(result).slice(newFirstIndex, newLastIndex + 1);
        if (this._getGroupCount()) {
            var arr = [];
            var focusedGroupIndex = this._getGroupIndexByCell($first);
            each($cells, function(_, cell) {
                var groupIndex = this._getGroupIndexByCell($(cell));
                if (focusedGroupIndex === groupIndex) {
                    arr.push(cell)
                }
            }.bind(this));
            $cells = $(arr)
        }
        return $cells
    },
    _getRightCell: function(isMultiSelection) {
        if (!isMultiSelection) {
            return this.callBase(isMultiSelection)
        }
        var $rightCell;
        var $focusedCell = this._$focusedCell;
        var groupCount = this._getGroupCount();
        var rowCellCount = isMultiSelection ? this._getCellCount() : this._getTotalCellCount(groupCount);
        var edgeCellIndex = this._isRTL() ? 0 : rowCellCount - 1;
        var direction = this._isRTL() ? "prev" : "next";
        if ($focusedCell.index() === edgeCellIndex || this._isGroupEndCell($focusedCell)) {
            $rightCell = $focusedCell
        } else {
            $rightCell = $focusedCell[direction]();
            $rightCell = this._checkForViewBounds($rightCell)
        }
        return $rightCell
    },
    _getLeftCell: function(isMultiSelection) {
        if (!isMultiSelection) {
            return this.callBase(isMultiSelection)
        }
        var $leftCell;
        var $focusedCell = this._$focusedCell;
        var groupCount = this._getGroupCount();
        var rowCellCount = isMultiSelection ? this._getCellCount() : this._getTotalCellCount(groupCount);
        var edgeCellIndex = this._isRTL() ? rowCellCount - 1 : 0;
        var direction = this._isRTL() ? "next" : "prev";
        if ($focusedCell.index() === edgeCellIndex || this._isGroupStartCell($focusedCell)) {
            $leftCell = $focusedCell
        } else {
            $leftCell = $focusedCell[direction]();
            $leftCell = this._checkForViewBounds($leftCell)
        }
        return $leftCell
    },
    getPositionShift: function(timeShift, isAllDay) {
        if (!isAllDay && this.invoke("isAdaptive") && 0 === this.invoke("getMaxAppointmentCountPerCellByType")) {
            return {
                top: 0,
                left: 0,
                cellPosition: 0
            }
        }
        return this.callBase(timeShift, isAllDay)
    },
    _isApplyCompactAppointmentOffset: function() {
        if (this.invoke("isAdaptive") && 0 === this.invoke("getMaxAppointmentCountPerCellByType")) {
            return false
        }
        return this.callBase()
    }
});
registerComponent("dxSchedulerWorkSpaceWeek", SchedulerWorkSpaceWeek);
module.exports = SchedulerWorkSpaceWeek;
