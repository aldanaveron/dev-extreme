/**
 * DevExtreme (ui/calendar/ui.calendar.base_view.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _renderer = require("../../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _dom_adapter = require("../../core/dom_adapter");
var _dom_adapter2 = _interopRequireDefault(_dom_adapter);
var _events_engine = require("../../events/core/events_engine");
var _events_engine2 = _interopRequireDefault(_events_engine);
var _element_data = require("../../core/element_data");
var _element_data2 = _interopRequireDefault(_element_data);
var _dom = require("../../core/utils/dom");
var _dom2 = _interopRequireDefault(_dom);
var _ui = require("../widget/ui.widget");
var _ui2 = _interopRequireDefault(_ui);
var _date = require("../../core/utils/date");
var _extend = require("../../core/utils/extend");
var _common = require("../../core/utils/common");
var _date_serialization = require("../../core/utils/date_serialization");
var _message = require("../../localization/message");
var _utils = require("../../events/utils");
var _click = require("../../events/click");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var abstract = _ui2.default.abstract;
var CALENDAR_OTHER_VIEW_CLASS = "dx-calendar-other-view";
var CALENDAR_CELL_CLASS = "dx-calendar-cell";
var CALENDAR_EMPTY_CELL_CLASS = "dx-calendar-empty-cell";
var CALENDAR_TODAY_CLASS = "dx-calendar-today";
var CALENDAR_SELECTED_DATE_CLASS = "dx-calendar-selected-date";
var CALENDAR_CONTOURED_DATE_CLASS = "dx-calendar-contoured-date";
var CALENDAR_DXCLICK_EVENT_NAME = (0, _utils.addNamespace)(_click.name, "dxCalendar");
var CALENDAR_DATE_VALUE_KEY = "dxDateValueKey";
var BaseView = _ui2.default.inherit({
    _getViewName: function() {
        return "base"
    },
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            date: new Date,
            focusStateEnabled: false,
            cellTemplate: null,
            disabledDates: null,
            onCellClick: null,
            rowCount: 3,
            colCount: 4,
            allowValueSelection: true
        })
    },
    _init: function() {
        this.callBase();
        var value = this.option("value");
        this.option("value", new Date(value));
        if (!this.option("value").valueOf()) {
            this.option("value", new Date(0, 0, 0, 0, 0, 0))
        }
    },
    _initMarkup: function() {
        this.callBase();
        this._renderImpl()
    },
    _renderImpl: function() {
        this.$element().append(this._createTable());
        this._createDisabledDatesHandler();
        this._renderBody();
        this._renderContouredDate();
        this._renderValue();
        this._renderEvents()
    },
    _createTable: function() {
        this._$table = (0, _renderer2.default)("<table>");
        this.setAria({
            label: (0, _message.format)("dxCalendar-ariaWidgetName"),
            role: "grid"
        }, this._$table);
        return this._$table
    },
    _renderBody: function() {
        this.$body = (0, _renderer2.default)("<tbody>").appendTo(this._$table);
        var rowData = {
            cellDate: this._getFirstCellData(),
            prevCellDate: null
        };
        for (var rowIndex = 0, rowCount = this.option("rowCount"); rowIndex < rowCount; rowIndex++) {
            rowData.row = this._createRow();
            for (var colIndex = 0, colCount = this.option("colCount"); colIndex < colCount; colIndex++) {
                this._renderCell(rowData, colIndex)
            }
        }
    },
    _createRow: function() {
        var row = _dom_adapter2.default.createElement("tr");
        this.setAria("role", "row", (0, _renderer2.default)(row));
        this.$body.get(0).appendChild(row);
        return row
    },
    _appendCell: function(row, cell) {
        if (!this._appendMethodName) {
            this._cacheAppendMethodName()
        }(0, _renderer2.default)(row)[this._appendMethodName](cell)
    },
    _cacheAppendMethodName: function(rtlEnabled) {
        this._appendMethodName = (null !== rtlEnabled && void 0 !== rtlEnabled ? rtlEnabled : this.option("rtlEnabled")) ? "prepend" : "append"
    },
    _createCell: function(cellDate) {
        var cell = _dom_adapter2.default.createElement("td");
        var $cell = (0, _renderer2.default)(cell);
        cell.className = this._getClassNameByDate(cellDate);
        cell.setAttribute("data-value", (0, _date_serialization.serializeDate)(cellDate, (0, _date.getShortDateFormat)()));
        _element_data2.default.data(cell, CALENDAR_DATE_VALUE_KEY, cellDate);
        this.setAria({
            role: "gridcell",
            label: this.getCellAriaLabel(cellDate)
        }, $cell);
        return {
            cell: cell,
            $cell: $cell
        }
    },
    _renderCell: function(params, cellIndex) {
        var cellDate = params.cellDate,
            prevCellDate = params.prevCellDate,
            row = params.row;
        if (prevCellDate) {
            (0, _date.fixTimezoneGap)(prevCellDate, cellDate)
        }
        params.prevCellDate = cellDate;
        var _this$_createCell = this._createCell(cellDate),
            cell = _this$_createCell.cell,
            $cell = _this$_createCell.$cell;
        var cellTemplate = this.option("cellTemplate");
        this._appendCell(row, cell);
        if (cellTemplate) {
            cellTemplate.render(this._prepareCellTemplateData(cellDate, cellIndex, $cell))
        } else {
            cell.innerHTML = this._getCellText(cellDate)
        }
        params.cellDate = this._getNextCellData(cellDate)
    },
    _getClassNameByDate: function(cellDate) {
        var className = CALENDAR_CELL_CLASS;
        if (this._isTodayCell(cellDate)) {
            className += " ".concat(CALENDAR_TODAY_CLASS)
        }
        if (this._isDateOutOfRange(cellDate) || this.isDateDisabled(cellDate)) {
            className += " ".concat(CALENDAR_EMPTY_CELL_CLASS)
        }
        if (this._isOtherView(cellDate)) {
            className += " ".concat(CALENDAR_OTHER_VIEW_CLASS)
        }
        return className
    },
    _prepareCellTemplateData: function(cellDate, cellIndex, $cell) {
        return {
            model: {
                text: this._getCellText(cellDate),
                date: cellDate,
                view: this._getViewName()
            },
            container: _dom2.default.getPublicElement($cell),
            index: cellIndex
        }
    },
    _renderEvents: function() {
        var _this = this;
        this._createCellClickAction();
        _events_engine2.default.off(this._$table, CALENDAR_DXCLICK_EVENT_NAME);
        _events_engine2.default.on(this._$table, CALENDAR_DXCLICK_EVENT_NAME, "td", function(e) {
            if (!(0, _renderer2.default)(e.currentTarget).hasClass(CALENDAR_EMPTY_CELL_CLASS)) {
                _this._cellClickAction({
                    event: e,
                    value: (0, _renderer2.default)(e.currentTarget).data(CALENDAR_DATE_VALUE_KEY)
                })
            }
        })
    },
    _createCellClickAction: function() {
        this._cellClickAction = this._createActionByOption("onCellClick")
    },
    _createDisabledDatesHandler: function() {
        var disabledDates = this.option("disabledDates");
        this._disabledDatesHandler = Array.isArray(disabledDates) ? this._getDefaultDisabledDatesHandler(disabledDates) : disabledDates || _common.noop
    },
    _getDefaultDisabledDatesHandler: function(disabledDates) {
        return _common.noop
    },
    _isTodayCell: abstract,
    _isDateOutOfRange: abstract,
    isDateDisabled: function(cellDate) {
        var dateParts = {
            date: cellDate,
            view: this._getViewName()
        };
        return this._disabledDatesHandler(dateParts)
    },
    _isOtherView: abstract,
    _getCellText: abstract,
    _getFirstCellData: abstract,
    _getNextCellData: abstract,
    _renderContouredDate: function(contouredDate) {
        if (!this.option("focusStateEnabled")) {
            return
        }
        contouredDate = contouredDate || this.option("contouredDate");
        var $oldContouredCell = this._$table.find(".".concat(CALENDAR_CONTOURED_DATE_CLASS));
        var $newContouredCell = this._getCellByDate(contouredDate);
        $oldContouredCell.removeClass(CALENDAR_CONTOURED_DATE_CLASS);
        $newContouredCell.addClass(CALENDAR_CONTOURED_DATE_CLASS)
    },
    _changeValue: function(cellDate) {
        if (cellDate) {
            var value = this.option("value");
            var newValue = value ? new Date(value) : new Date;
            newValue.setDate(cellDate.getDate());
            newValue.setMonth(cellDate.getMonth());
            newValue.setFullYear(cellDate.getFullYear());
            newValue.setDate(cellDate.getDate());
            this.option("value", newValue)
        } else {
            this.option("value", null)
        }
    },
    _renderValue: function() {
        if (!this.option("allowValueSelection")) {
            return
        }
        var value = this.option("value");
        var selectedCell = this._getCellByDate(value);
        if (this._selectedCell) {
            this._selectedCell.removeClass(CALENDAR_SELECTED_DATE_CLASS)
        }
        selectedCell.addClass(CALENDAR_SELECTED_DATE_CLASS);
        this._selectedCell = selectedCell
    },
    getCellAriaLabel: function(date) {
        return this._getCellText(date)
    },
    _getFirstAvailableDate: function() {
        var date = this.option("date");
        var min = this.option("min");
        date = (0, _date.getFirstDateView)(this._getViewName(), date);
        return new Date(min && date < min ? min : date)
    },
    _getCellByDate: abstract,
    isBoundary: abstract,
    _optionChanged: function(args) {
        var name = args.name,
            value = args.value;
        switch (name) {
            case "value":
                this._renderValue();
                break;
            case "contouredDate":
                this._renderContouredDate(value);
                break;
            case "onCellClick":
                this._createCellClickAction();
                break;
            case "disabledDates":
            case "cellTemplate":
                this._invalidate();
                break;
            case "rtlEnabled":
                this._cacheAppendMethodName(value);
                this.callBase(args);
                break;
            default:
                this.callBase(args)
        }
    }
});
module.exports = BaseView;
