/**
 * DevExtreme (ui/calendar/ui.calendar.views.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _renderer = require("../../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _uiCalendar = require("./ui.calendar.base_view");
var _uiCalendar2 = _interopRequireDefault(_uiCalendar);
var _common = require("../../core/utils/common");
var _date = require("../../core/utils/date");
var _extend = require("../../core/utils/extend");
var _date2 = require("../../localization/date");
var _date_serialization = require("../../core/utils/date_serialization");
var _type = require("../../core/utils/type");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var CALENDAR_OTHER_MONTH_CLASS = "dx-calendar-other-month";
var CALENDAR_OTHER_VIEW_CLASS = "dx-calendar-other-view";
var Views = {
    month: _uiCalendar2.default.inherit({
        _getViewName: function() {
            return "month"
        },
        _getDefaultOptions: function() {
            return (0, _extend.extend)(this.callBase(), {
                firstDayOfWeek: void 0,
                rowCount: 6,
                colCount: 7
            })
        },
        _renderImpl: function() {
            this.callBase();
            this._renderHeader()
        },
        _renderBody: function() {
            this.callBase();
            this._$table.find(".".concat(CALENDAR_OTHER_VIEW_CLASS)).addClass(CALENDAR_OTHER_MONTH_CLASS)
        },
        _renderFocusTarget: _common.noop,
        getCellAriaLabel: function(date) {
            return (0, _date2.format)(date, "longdate")
        },
        _renderHeader: function() {
            var $headerRow = (0, _renderer2.default)("<tr>");
            var $header = (0, _renderer2.default)("<thead>").append($headerRow);
            this._$table.prepend($header);
            for (var colIndex = 0, colCount = this.option("colCount"); colIndex < colCount; colIndex++) {
                this._renderHeaderCell(colIndex, $headerRow)
            }
        },
        _renderHeaderCell: function(cellIndex, $headerRow) {
            var _this$_getDayCaption = this._getDayCaption(this._getFirstDayOfWeek() + cellIndex),
                fullCaption = _this$_getDayCaption.full,
                abbrCaption = _this$_getDayCaption.abbreviated;
            var $cell = (0, _renderer2.default)("<th>").attr({
                scope: "col",
                abbr: fullCaption
            }).text(abbrCaption);
            this._appendCell($headerRow, $cell)
        },
        getNavigatorCaption: function() {
            return (0, _date2.format)(this.option("date"), "monthandyear")
        },
        _isTodayCell: function(cellDate) {
            var today = new Date;
            return (0, _date.sameDate)(cellDate, today)
        },
        _isDateOutOfRange: function(cellDate) {
            var minDate = this.option("min");
            var maxDate = this.option("max");
            return !(0, _date.dateInRange)(cellDate, minDate, maxDate, "date")
        },
        _isOtherView: function(cellDate) {
            return cellDate.getMonth() !== this.option("date").getMonth()
        },
        _getCellText: function(cellDate) {
            return (0, _date2.format)(cellDate, "d")
        },
        _getDayCaption: function(day) {
            var daysInWeek = this.option("colCount");
            var dayIndex = day % daysInWeek;
            return {
                full: (0, _date2.getDayNames)()[dayIndex],
                abbreviated: (0, _date2.getDayNames)("abbreviated")[dayIndex]
            }
        },
        _getFirstCellData: function() {
            var firstDay = (0, _date.getFirstMonthDate)(this.option("date"));
            var firstMonthDayOffset = this._getFirstDayOfWeek() - firstDay.getDay();
            var daysInWeek = this.option("colCount");
            if (firstMonthDayOffset >= 0) {
                firstMonthDayOffset -= daysInWeek
            }
            firstDay.setDate(firstDay.getDate() + firstMonthDayOffset);
            return firstDay
        },
        _getNextCellData: function(date) {
            date = new Date(date);
            date.setDate(date.getDate() + 1);
            return date
        },
        _getFirstDayOfWeek: function() {
            return (0, _type.isDefined)(this.option("firstDayOfWeek")) ? this.option("firstDayOfWeek") : (0, _date2.firstDayOfWeekIndex)()
        },
        _getCellByDate: function(date) {
            return this._$table.find("td[data-value='".concat((0, _date_serialization.serializeDate)(date, (0, _date.getShortDateFormat)()), "']"))
        },
        isBoundary: function(date) {
            return (0, _date.sameMonthAndYear)(date, this.option("min")) || (0, _date.sameMonthAndYear)(date, this.option("max"))
        },
        _getDefaultDisabledDatesHandler: function(disabledDates) {
            return function(args) {
                var isDisabledDate = disabledDates.some(function(item) {
                    return (0, _date.sameDate)(item, args.date)
                });
                if (isDisabledDate) {
                    return true
                }
            }
        }
    }),
    year: _uiCalendar2.default.inherit({
        _getViewName: function() {
            return "year"
        },
        _isTodayCell: function(cellDate) {
            return (0, _date.sameMonthAndYear)(cellDate, new Date)
        },
        _isDateOutOfRange: function(cellDate) {
            return !(0, _date.dateInRange)(cellDate, (0, _date.getFirstMonthDate)(this.option("min")), (0, _date.getLastMonthDate)(this.option("max")))
        },
        _isOtherView: function() {
            return false
        },
        _getCellText: function(cellDate) {
            return (0, _date2.getMonthNames)("abbreviated")[cellDate.getMonth()]
        },
        _getFirstCellData: function() {
            var data = new Date(this.option("date"));
            data.setDate(1);
            data.setMonth(0);
            return data
        },
        _getNextCellData: function(date) {
            date = new Date(date);
            date.setMonth(date.getMonth() + 1);
            return date
        },
        _getCellByDate: function(date) {
            var foundDate = new Date(date);
            foundDate.setDate(1);
            return this._$table.find("td[data-value='".concat((0, _date_serialization.serializeDate)(foundDate, (0, _date.getShortDateFormat)()), "']"))
        },
        getCellAriaLabel: function(date) {
            return (0, _date2.format)(date, "monthandyear")
        },
        getNavigatorCaption: function() {
            return (0, _date2.format)(this.option("date"), "yyyy")
        },
        isBoundary: function(date) {
            return (0, _date.sameYear)(date, this.option("min")) || (0, _date.sameYear)(date, this.option("max"))
        }
    }),
    decade: _uiCalendar2.default.inherit({
        _getViewName: function() {
            return "decade"
        },
        _isTodayCell: function(cellDate) {
            return (0, _date.sameYear)(cellDate, new Date)
        },
        _isDateOutOfRange: function(cellDate) {
            var min = this.option("min");
            var max = this.option("max");
            return !(0, _date.dateInRange)(cellDate.getFullYear(), min && min.getFullYear(), max && max.getFullYear())
        },
        _isOtherView: function(cellDate) {
            var date = new Date(cellDate);
            date.setMonth(1);
            return !(0, _date.sameDecade)(date, this.option("date"))
        },
        _getCellText: function(cellDate) {
            return (0, _date2.format)(cellDate, "yyyy")
        },
        _getFirstCellData: function() {
            var year = (0, _date.getFirstYearInDecade)(this.option("date")) - 1;
            return new Date(year, 0, 1)
        },
        _getNextCellData: function(date) {
            date = new Date(date);
            date.setFullYear(date.getFullYear() + 1);
            return date
        },
        getNavigatorCaption: function() {
            var currentDate = this.option("date");
            var firstYearInDecade = (0, _date.getFirstYearInDecade)(currentDate);
            var startDate = new Date(currentDate);
            var endDate = new Date(currentDate);
            startDate.setFullYear(firstYearInDecade);
            endDate.setFullYear(firstYearInDecade + 9);
            return (0, _date2.format)(startDate, "yyyy") + "-" + (0, _date2.format)(endDate, "yyyy")
        },
        _isValueOnCurrentView: function(currentDate, value) {
            return (0, _date.sameDecade)(currentDate, value)
        },
        _getCellByDate: function(date) {
            var foundDate = new Date(date);
            foundDate.setDate(1);
            foundDate.setMonth(0);
            return this._$table.find("td[data-value='".concat((0, _date_serialization.serializeDate)(foundDate, (0, _date.getShortDateFormat)()), "']"))
        },
        isBoundary: function(date) {
            return (0, _date.sameDecade)(date, this.option("min")) || (0, _date.sameDecade)(date, this.option("max"))
        }
    }),
    century: _uiCalendar2.default.inherit({
        _getViewName: function() {
            return "century"
        },
        _isTodayCell: function(cellDate) {
            return (0, _date.sameDecade)(cellDate, new Date)
        },
        _isDateOutOfRange: function(cellDate) {
            var decade = (0, _date.getFirstYearInDecade)(cellDate);
            var minDecade = (0, _date.getFirstYearInDecade)(this.option("min"));
            var maxDecade = (0, _date.getFirstYearInDecade)(this.option("max"));
            return !(0, _date.dateInRange)(decade, minDecade, maxDecade)
        },
        _isOtherView: function(cellDate) {
            var date = new Date(cellDate);
            date.setMonth(1);
            return !(0, _date.sameCentury)(date, this.option("date"))
        },
        _getCellText: function(cellDate) {
            var startDate = (0, _date2.format)(cellDate, "yyyy");
            var endDate = new Date(cellDate);
            endDate.setFullYear(endDate.getFullYear() + 9);
            return startDate + " - " + (0, _date2.format)(endDate, "yyyy")
        },
        _getFirstCellData: function() {
            var decade = (0, _date.getFirstDecadeInCentury)(this.option("date")) - 10;
            return new Date(decade, 0, 1)
        },
        _getNextCellData: function(date) {
            date = new Date(date);
            date.setFullYear(date.getFullYear() + 10);
            return date
        },
        _getCellByDate: function(date) {
            var foundDate = new Date(date);
            foundDate.setDate(1);
            foundDate.setMonth(0);
            foundDate.setFullYear((0, _date.getFirstYearInDecade)(foundDate));
            return this._$table.find("td[data-value='".concat((0, _date_serialization.serializeDate)(foundDate, (0, _date.getShortDateFormat)()), "']"))
        },
        getNavigatorCaption: function() {
            var currentDate = this.option("date");
            var firstDecadeInCentury = (0, _date.getFirstDecadeInCentury)(currentDate);
            var startDate = new Date(currentDate);
            var endDate = new Date(currentDate);
            startDate.setFullYear(firstDecadeInCentury);
            endDate.setFullYear(firstDecadeInCentury + 99);
            return (0, _date2.format)(startDate, "yyyy") + "-" + (0, _date2.format)(endDate, "yyyy")
        },
        isBoundary: function(date) {
            return (0, _date.sameCentury)(date, this.option("min")) || (0, _date.sameCentury)(date, this.option("max"))
        }
    })
};
module.exports = Views;
