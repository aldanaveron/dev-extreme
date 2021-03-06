/**
 * DevExtreme (ui/calendar/ui.calendar.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _renderer = require("../../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _guid = require("../../core/guid");
var _guid2 = _interopRequireDefault(_guid);
var _component_registrator = require("../../core/component_registrator");
var _component_registrator2 = _interopRequireDefault(_component_registrator);
var _common = require("../../core/utils/common");
var _type = require("../../core/utils/type");
var _type2 = _interopRequireDefault(_type);
var _math = require("../../core/utils/math");
var _extend = require("../../core/utils/extend");
var _button = require("../button");
var _button2 = _interopRequireDefault(_button);
var _editor = require("../editor/editor");
var _editor2 = _interopRequireDefault(_editor);
var _swipeable = require("../../events/gesture/swipeable");
var _swipeable2 = _interopRequireDefault(_swipeable);
var _uiCalendar = require("./ui.calendar.navigator");
var _uiCalendar2 = _interopRequireDefault(_uiCalendar);
var _uiCalendar3 = require("./ui.calendar.views");
var _uiCalendar4 = _interopRequireDefault(_uiCalendar3);
var _translator = require("../../animation/translator");
var _translator2 = _interopRequireDefault(_translator);
var _browser = require("../../core/utils/browser");
var _browser2 = _interopRequireDefault(_browser);
var _date = require("../../core/utils/date");
var _date2 = _interopRequireDefault(_date);
var _date_serialization = require("../../core/utils/date_serialization");
var _date_serialization2 = _interopRequireDefault(_date_serialization);
var _devices = require("../../core/devices");
var _devices2 = _interopRequireDefault(_devices);
var _fx = require("../../animation/fx");
var _fx2 = _interopRequireDefault(_fx);
var _window = require("../../core/utils/window");
var _window2 = _interopRequireDefault(_window);
var _message = require("../../localization/message");
var _message2 = _interopRequireDefault(_message);
var _function_template = require("../../core/templates/function_template");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var CALENDAR_CLASS = "dx-calendar";
var CALENDAR_BODY_CLASS = "dx-calendar-body";
var CALENDAR_CELL_CLASS = "dx-calendar-cell";
var CALENDAR_FOOTER_CLASS = "dx-calendar-footer";
var CALENDAR_TODAY_BUTTON_CLASS = "dx-calendar-today-button";
var CALENDAR_HAS_FOOTER_CLASS = "dx-calendar-with-footer";
var CALENDAR_VIEWS_WRAPPER_CLASS = "dx-calendar-views-wrapper";
var CALENDAR_VIEW_CLASS = "dx-calendar-view";
var FOCUSED_STATE_CLASS = "dx-state-focused";
var ANIMATION_DURATION_SHOW_VIEW = 250;
var POP_ANIMATION_FROM = .6;
var POP_ANIMATION_TO = 1;
var CALENDAR_INPUT_STANDARD_PATTERN = "yyyy-MM-dd";
var CALENDAR_DATE_VALUE_KEY = "dxDateValueKey";
var LEVEL_COMPARE_MAP = {
    month: 3,
    year: 2,
    decade: 1,
    century: 0
};
var ZOOM_LEVEL = {
    MONTH: "month",
    YEAR: "year",
    DECADE: "decade",
    CENTURY: "century"
};
var Calendar = _editor2.default.inherit({
    _activeStateUnit: "." + CALENDAR_CELL_CLASS,
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            hoverStateEnabled: true,
            activeStateEnabled: true,
            currentDate: new Date,
            value: null,
            dateSerializationFormat: void 0,
            min: new Date(1e3, 0),
            max: new Date(3e3, 0),
            firstDayOfWeek: void 0,
            zoomLevel: ZOOM_LEVEL.MONTH,
            maxZoomLevel: ZOOM_LEVEL.MONTH,
            minZoomLevel: ZOOM_LEVEL.CENTURY,
            showTodayButton: false,
            cellTemplate: "cell",
            disabledDates: null,
            onCellClick: null,
            onContouredChanged: null,
            hasFocus: function(element) {
                return element.hasClass(FOCUSED_STATE_CLASS)
            }
        })
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: function() {
                return "desktop" === _devices2.default.real().deviceType && !_devices2.default.isSimulator()
            },
            options: {
                focusStateEnabled: true
            }
        }])
    },
    _supportedKeys: function() {
        return (0, _extend.extend)(this.callBase(), {
            rightArrow: function(e) {
                e.preventDefault();
                if (e.ctrlKey) {
                    this._waitRenderView(1)
                } else {
                    this._moveCurrentDateByOffset(1 * this._getRtlCorrection())
                }
            },
            leftArrow: function(e) {
                e.preventDefault();
                if (e.ctrlKey) {
                    this._waitRenderView(-1)
                } else {
                    this._moveCurrentDateByOffset(-1 * this._getRtlCorrection())
                }
            },
            upArrow: function(e) {
                e.preventDefault();
                if (e.ctrlKey) {
                    this._navigateUp()
                } else {
                    if (_fx2.default.isAnimating(this._view.$element())) {
                        return
                    }
                    this._moveCurrentDateByOffset(-1 * this._view.option("colCount"))
                }
            },
            downArrow: function(e) {
                e.preventDefault();
                if (e.ctrlKey) {
                    this._navigateDown()
                } else {
                    if (_fx2.default.isAnimating(this._view.$element())) {
                        return
                    }
                    this._moveCurrentDateByOffset(1 * this._view.option("colCount"))
                }
            },
            home: function(e) {
                e.preventDefault();
                var zoomLevel = this.option("zoomLevel");
                var currentDate = this.option("currentDate");
                var min = this._dateOption("min");
                if (this._view.isDateDisabled(currentDate)) {
                    return
                }
                var date = _date2.default.sameView(zoomLevel, currentDate, min) ? min : _date2.default.getViewFirstCellDate(zoomLevel, currentDate);
                this._moveToClosestAvailableDate(date)
            },
            end: function(e) {
                e.preventDefault();
                var zoomLevel = this.option("zoomLevel");
                var currentDate = this.option("currentDate");
                var max = this._dateOption("max");
                if (this._view.isDateDisabled(currentDate)) {
                    return
                }
                var date = _date2.default.sameView(zoomLevel, currentDate, max) ? max : _date2.default.getViewLastCellDate(zoomLevel, currentDate);
                this._moveToClosestAvailableDate(date)
            },
            pageUp: function(e) {
                e.preventDefault();
                this._waitRenderView(-1 * this._getRtlCorrection())
            },
            pageDown: function(e) {
                e.preventDefault();
                this._waitRenderView(1 * this._getRtlCorrection())
            },
            tab: _common.noop,
            enter: function(e) {
                if (!this._isMaxZoomLevel()) {
                    this._navigateDown()
                } else {
                    if (!this._view.isDateDisabled(this.option("currentDate"))) {
                        var value = this._updateTimeComponent(this.option("currentDate"));
                        this._dateValue(value, e)
                    }
                }
            }
        })
    },
    _getSerializationFormat: function(optionName) {
        var value = this.option(optionName || "value");
        if (this.option("dateSerializationFormat")) {
            return this.option("dateSerializationFormat")
        }
        if (_type2.default.isNumeric(value)) {
            return "number"
        }
        if (!_type2.default.isString(value)) {
            return
        }
        return _date_serialization2.default.getDateSerializationFormat(value)
    },
    _convertToDate: function(value, optionName) {
        return _date_serialization2.default.deserializeDate(value)
    },
    _dateValue: function(value, dxEvent) {
        if (dxEvent) {
            this._saveValueChangeEvent(dxEvent)
        }
        this._dateOption("value", value)
    },
    _dateOption: function(optionName, optionValue) {
        if (1 === arguments.length) {
            return this._convertToDate(this.option(optionName), optionName)
        }
        var serializationFormat = this._getSerializationFormat(optionName);
        this.option(optionName, _date_serialization2.default.serializeDate(optionValue, serializationFormat))
    },
    _shiftDate: function(zoomLevel, date, offset, reverse) {
        switch (zoomLevel) {
            case ZOOM_LEVEL.MONTH:
                date.setDate(date.getDate() + offset * reverse);
                break;
            case ZOOM_LEVEL.YEAR:
                date.setMonth(date.getMonth() + offset * reverse);
                break;
            case ZOOM_LEVEL.DECADE:
                date.setFullYear(date.getFullYear() + offset * reverse);
                break;
            case ZOOM_LEVEL.CENTURY:
                date.setFullYear(date.getFullYear() + 10 * offset * reverse)
        }
    },
    _moveCurrentDateByOffset: function(offset) {
        var baseDate = this.option("currentDate");
        var currentDate = new Date(baseDate);
        var zoomLevel = this.option("zoomLevel");
        this._shiftDate(zoomLevel, currentDate, offset, 1);
        var maxDate = this._getMaxDate();
        var minDate = this._getMinDate();
        var isDateForwardInNeighborView = this._areDatesInNeighborView(zoomLevel, currentDate, baseDate);
        var isDateForwardInRange = (0, _math.inRange)(currentDate, minDate, maxDate) && isDateForwardInNeighborView;
        var dateForward = new Date(currentDate);
        while (isDateForwardInRange) {
            if (isDateForwardInRange && !this._view.isDateDisabled(dateForward)) {
                currentDate = dateForward;
                break
            }
            this._shiftDate(zoomLevel, dateForward, offset, 1);
            isDateForwardInNeighborView = this._areDatesInNeighborView(zoomLevel, dateForward, baseDate);
            isDateForwardInRange = (0, _math.inRange)(dateForward, minDate, maxDate) && isDateForwardInNeighborView
        }
        if (this._view.isDateDisabled(baseDate) || this._view.isDateDisabled(currentDate)) {
            this._waitRenderView(offset > 0 ? 1 : -1)
        } else {
            this.option("currentDate", currentDate)
        }
    },
    _areDatesInSameView: function(zoomLevel, date1, date2) {
        switch (zoomLevel) {
            case ZOOM_LEVEL.MONTH:
                return date1.getMonth() === date2.getMonth();
            case ZOOM_LEVEL.YEAR:
                return date1.getYear() === date2.getYear();
            case ZOOM_LEVEL.DECADE:
                return parseInt(date1.getYear() / 10) === parseInt(date2.getYear() / 10);
            case ZOOM_LEVEL.CENTURY:
                return parseInt(date1.getYear() / 100) === parseInt(date2.getYear() / 100)
        }
    },
    _areDatesInNeighborView: function(zoomLevel, date1, date2) {
        var monthMinDistance = function(a, b) {
            var abs = Math.abs(a - b);
            return Math.min(abs, 12 - abs)
        };
        switch (zoomLevel) {
            case ZOOM_LEVEL.MONTH:
                return monthMinDistance(date1.getMonth(), date2.getMonth()) <= 1;
            case ZOOM_LEVEL.YEAR:
                return Math.abs(date1.getYear() - date2.getYear()) <= 1;
            case ZOOM_LEVEL.DECADE:
                return Math.abs(date1.getYear() - date2.getYear()) <= 10;
            case ZOOM_LEVEL.CENTURY:
                return Math.abs(date1.getYear() - date2.getYear()) <= 100
        }
    },
    _moveToClosestAvailableDate: function() {
        var baseDate = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.option("currentDate");
        var currentDate = new Date(baseDate);
        var zoomLevel = this.option("zoomLevel");
        var isCurrentDateAvailable = !this._isDateNotAvailable(currentDate);
        var isDateForwardAvailable = isCurrentDateAvailable;
        var isDateBackwardAvailable = isCurrentDateAvailable;
        var isDateForwardInStartView;
        var isDateBackwardInStartView;
        var dateForward = new Date(currentDate);
        var dateBackward = new Date(currentDate);
        do {
            if (isDateForwardAvailable) {
                currentDate = dateForward;
                break
            }
            if (isDateBackwardAvailable) {
                currentDate = dateBackward;
                break
            }
            this._shiftDate(zoomLevel, dateForward, 1, 1);
            this._shiftDate(zoomLevel, dateBackward, 1, -1);
            isDateForwardInStartView = this._areDatesInSameView(zoomLevel, dateForward, baseDate);
            isDateBackwardInStartView = this._areDatesInSameView(zoomLevel, dateBackward, baseDate);
            isDateForwardAvailable = isDateForwardInStartView && !this._isDateNotAvailable(dateForward);
            isDateBackwardAvailable = isDateBackwardInStartView && !this._isDateNotAvailable(dateBackward)
        } while (isDateForwardInStartView || isDateBackwardInStartView);
        this.option("currentDate", currentDate)
    },
    _isDateNotAvailable: function(date) {
        var maxDate = this._getMaxDate();
        var minDate = this._getMinDate();
        return !(0, _math.inRange)(date, minDate, maxDate) || this._view.isDateDisabled(date)
    },
    _init: function() {
        this.callBase();
        this._correctZoomLevel();
        this._initCurrentDate();
        this._initActions()
    },
    _correctZoomLevel: function() {
        var minZoomLevel = this.option("minZoomLevel");
        var maxZoomLevel = this.option("maxZoomLevel");
        var zoomLevel = this.option("zoomLevel");
        if (LEVEL_COMPARE_MAP[maxZoomLevel] < LEVEL_COMPARE_MAP[minZoomLevel]) {
            return
        }
        if (LEVEL_COMPARE_MAP[zoomLevel] > LEVEL_COMPARE_MAP[maxZoomLevel]) {
            this.option("zoomLevel", maxZoomLevel)
        } else {
            if (LEVEL_COMPARE_MAP[zoomLevel] < LEVEL_COMPARE_MAP[minZoomLevel]) {
                this.option("zoomLevel", minZoomLevel)
            }
        }
    },
    _initCurrentDate: function() {
        var currentDate = this._getNormalizedDate(this._dateOption("value")) || this._getNormalizedDate(this.option("currentDate"));
        this.option("currentDate", currentDate)
    },
    _getNormalizedDate: function(date) {
        date = _date2.default.normalizeDate(date, this._getMinDate(), this._getMaxDate());
        return _type2.default.isDefined(date) ? new Date(date) : date
    },
    _initActions: function() {
        this._cellClickAction = this._createActionByOption("onCellClick");
        this._onContouredChanged = this._createActionByOption("onContouredChanged")
    },
    _initTemplates: function() {
        this._templateManager.addDefaultTemplates({
            cell: new _function_template.FunctionTemplate(function(options) {
                var data = options.model;
                (0, _renderer2.default)(options.container).append((0, _renderer2.default)("<span>").text(data && data.text || String(data)))
            })
        });
        this.callBase()
    },
    _updateCurrentDate: function(date) {
        if (_fx2.default.isAnimating(this._$viewsWrapper)) {
            _fx2.default.stop(this._$viewsWrapper, true)
        }
        var min = this._getMinDate();
        var max = this._getMaxDate();
        if (min > max) {
            this.option("currentDate", new Date);
            return
        }
        var normalizedDate = this._getNormalizedDate(date);
        if (date.getTime() !== normalizedDate.getTime()) {
            this.option("currentDate", new Date(normalizedDate));
            return
        }
        var offset = this._getViewsOffset(this._view.option("date"), normalizedDate);
        if (0 !== offset && !this._isMaxZoomLevel() && this._isOtherViewCellClicked) {
            offset = 0
        }
        if (this._view && 0 !== offset && !this._suppressNavigation) {
            this._navigate(offset, normalizedDate)
        } else {
            this._renderNavigator();
            this._setViewContoured(normalizedDate);
            this._updateAriaId(normalizedDate)
        }
    },
    _setViewContoured: function(date) {
        if (this.option("hasFocus")(this._focusTarget())) {
            this._view.option("contouredDate", date)
        }
    },
    _getMinDate: function() {
        if (this.min) {
            return this.min
        }
        this.min = this._dateOption("min") || new Date(1e3, 0);
        return this.min
    },
    _getMaxDate: function() {
        if (this.max) {
            return this.max
        }
        this.max = this._dateOption("max") || new Date(3e3, 0);
        return this.max
    },
    _getViewsOffset: function(startDate, endDate) {
        var zoomLevel = this.option("zoomLevel");
        if (zoomLevel === ZOOM_LEVEL.MONTH) {
            return this._getMonthsOffset(startDate, endDate)
        }
        var zoomCorrection;
        switch (zoomLevel) {
            case ZOOM_LEVEL.CENTURY:
                zoomCorrection = 100;
                break;
            case ZOOM_LEVEL.DECADE:
                zoomCorrection = 10;
                break;
            default:
                zoomCorrection = 1
        }
        return parseInt(endDate.getFullYear() / zoomCorrection) - parseInt(startDate.getFullYear() / zoomCorrection)
    },
    _getMonthsOffset: function(startDate, endDate) {
        var yearOffset = endDate.getFullYear() - startDate.getFullYear();
        var monthOffset = endDate.getMonth() - startDate.getMonth();
        return 12 * yearOffset + monthOffset
    },
    _waitRenderView: function(offset) {
        var _this = this;
        if (this._alreadyViewRender) {
            return
        }
        this._alreadyViewRender = true;
        var date = this._getDateByOffset(offset * this._getRtlCorrection());
        this._moveToClosestAvailableDate(date);
        this._waitRenderViewTimeout = setTimeout(function() {
            _this._alreadyViewRender = false
        })
    },
    _getRtlCorrection: function() {
        return this.option("rtlEnabled") ? -1 : 1
    },
    _getDateByOffset: function(offset, date) {
        date = new Date(date || this.option("currentDate"));
        var currentDay = date.getDate();
        var difference = _date2.default.getDifferenceInMonth(this.option("zoomLevel")) * offset;
        date.setDate(1);
        date.setMonth(date.getMonth() + difference);
        var lastDay = _date2.default.getLastMonthDate(date).getDate();
        date.setDate(currentDay > lastDay ? lastDay : currentDay);
        return date
    },
    _focusTarget: function() {
        return this.$element()
    },
    _initMarkup: function() {
        this._renderSubmitElement();
        this.callBase();
        var $element = this.$element();
        $element.addClass(CALENDAR_CLASS);
        this._renderBody();
        $element.append(this.$body);
        this._renderViews();
        this._renderNavigator();
        $element.append(this._navigator.$element());
        this._renderSwipeable();
        this._renderFooter();
        this._updateAriaSelected();
        this._updateAriaId();
        this._moveToClosestAvailableDate()
    },
    _render: function() {
        this.callBase();
        this._setViewContoured(this.option("currentDate"))
    },
    _renderBody: function() {
        if (!this._$viewsWrapper) {
            this.$body = (0, _renderer2.default)("<div>").addClass(CALENDAR_BODY_CLASS);
            this._$viewsWrapper = (0, _renderer2.default)("<div>").addClass(CALENDAR_VIEWS_WRAPPER_CLASS);
            this.$body.append(this._$viewsWrapper)
        }
    },
    _getKeyboardListeners: function() {
        return this.callBase().concat([this._view])
    },
    _renderViews: function() {
        this.$element().addClass(CALENDAR_VIEW_CLASS + "-" + this.option("zoomLevel"));
        var currentDate = this.option("currentDate");
        this._view = this._renderSpecificView(currentDate);
        if (_window2.default.hasWindow()) {
            var beforeDate = this._getDateByOffset(-1, currentDate);
            this._beforeView = this._isViewAvailable(beforeDate) ? this._renderSpecificView(beforeDate) : null;
            var afterDate = this._getDateByOffset(1, currentDate);
            afterDate.setDate(1);
            this._afterView = this._isViewAvailable(afterDate) ? this._renderSpecificView(afterDate) : null
        }
        this._translateViews()
    },
    _renderSpecificView: function(date) {
        var specificView = _uiCalendar4.default[this.option("zoomLevel")];
        var $view = (0, _renderer2.default)("<div>").appendTo(this._$viewsWrapper);
        var config = this._viewConfig(date);
        return new specificView($view, config)
    },
    _viewConfig: function(date) {
        var disabledDates = this.option("disabledDates");
        disabledDates = _type2.default.isFunction(disabledDates) ? this._injectComponent(disabledDates.bind(this)) : disabledDates;
        return {
            date: date,
            min: this._getMinDate(),
            max: this._getMaxDate(),
            firstDayOfWeek: this.option("firstDayOfWeek"),
            value: this._dateOption("value"),
            rtlEnabled: this.option("rtlEnabled"),
            disabled: this.option("disabled"),
            tabIndex: void 0,
            focusStateEnabled: this.option("focusStateEnabled"),
            hoverStateEnabled: this.option("hoverStateEnabled"),
            disabledDates: disabledDates,
            onCellClick: this._cellClickHandler.bind(this),
            cellTemplate: this._getTemplateByOption("cellTemplate"),
            allowValueSelection: this._isMaxZoomLevel()
        }
    },
    _injectComponent: function(func) {
        var that = this;
        return function(params) {
            (0, _extend.extend)(params, {
                component: that
            });
            return func(params)
        }
    },
    _isViewAvailable: function(date) {
        var zoomLevel = this.option("zoomLevel");
        var min = _date2.default.getViewMinBoundaryDate(zoomLevel, this._getMinDate());
        var max = _date2.default.getViewMaxBoundaryDate(zoomLevel, this._getMaxDate());
        return _date2.default.dateInRange(date, min, max)
    },
    _translateViews: function() {
        _translator2.default.move(this._view.$element(), {
            left: 0,
            top: 0
        });
        this._beforeView && _translator2.default.move(this._beforeView.$element(), {
            left: this._getViewPosition(-1),
            top: 0
        });
        this._afterView && _translator2.default.move(this._afterView.$element(), {
            left: this._getViewPosition(1),
            top: 0
        })
    },
    _getViewPosition: function(coefficient) {
        var rtlCorrection = this.option("rtlEnabled") && !_browser2.default.msie ? -1 : 1;
        return 100 * coefficient * rtlCorrection + "%"
    },
    _cellClickHandler: function(e) {
        var zoomLevel = this.option("zoomLevel");
        var nextView = _date2.default.getViewDown(zoomLevel);
        var isMaxZoomLevel = this._isMaxZoomLevel();
        if (nextView && !isMaxZoomLevel) {
            this._navigateDown(e.event.currentTarget)
        } else {
            var newValue = this._updateTimeComponent(e.value);
            this._dateValue(newValue, e.event);
            this._cellClickAction(e)
        }
    },
    _updateTimeComponent: function(date) {
        var result = new Date(date);
        var currentValue = this._dateOption("value");
        if (currentValue) {
            result.setHours(currentValue.getHours());
            result.setMinutes(currentValue.getMinutes());
            result.setSeconds(currentValue.getSeconds());
            result.setMilliseconds(currentValue.getMilliseconds())
        }
        return result
    },
    _isMaxZoomLevel: function() {
        return this.option("zoomLevel") === this.option("maxZoomLevel")
    },
    _navigateDown: function(cell) {
        var zoomLevel = this.option("zoomLevel");
        if (this._isMaxZoomLevel()) {
            return
        }
        var nextView = _date2.default.getViewDown(zoomLevel);
        if (!nextView) {
            return
        }
        var newCurrentDate = this._view.option("contouredDate") || this._view.option("date");
        if (cell) {
            newCurrentDate = (0, _renderer2.default)(cell).data(CALENDAR_DATE_VALUE_KEY)
        }
        this._isOtherViewCellClicked = true;
        this.option("currentDate", newCurrentDate);
        this.option("zoomLevel", nextView);
        this._isOtherViewCellClicked = false;
        this._renderNavigator();
        this._animateShowView();
        this._moveToClosestAvailableDate();
        this._setViewContoured(this._getNormalizedDate(this.option("currentDate")))
    },
    _renderNavigator: function() {
        if (!this._navigator) {
            this._navigator = new _uiCalendar2.default((0, _renderer2.default)("<div>"), this._navigatorConfig())
        }
        this._navigator.option("text", this._view.getNavigatorCaption());
        this._updateButtonsVisibility()
    },
    _navigatorConfig: function() {
        return {
            text: this._view.getNavigatorCaption(),
            onClick: this._navigatorClickHandler.bind(this),
            onCaptionClick: this._navigateUp.bind(this),
            rtlEnabled: this.option("rtlEnabled")
        }
    },
    _navigatorClickHandler: function(e) {
        var currentDate = this._getDateByOffset(e.direction, this.option("currentDate"));
        this._moveToClosestAvailableDate(currentDate);
        this._updateNavigatorCaption(-e.direction * this._getRtlCorrection())
    },
    _navigateUp: function() {
        var zoomLevel = this.option("zoomLevel");
        var nextView = _date2.default.getViewUp(zoomLevel);
        if (!nextView || this._isMinZoomLevel(zoomLevel)) {
            return
        }
        this.option("zoomLevel", nextView);
        this._renderNavigator();
        this._animateShowView();
        this._moveToClosestAvailableDate();
        this._setViewContoured(this._getNormalizedDate(this.option("currentDate")))
    },
    _isMinZoomLevel: function(zoomLevel) {
        var min = this._getMinDate();
        var max = this._getMaxDate();
        return _date2.default.sameView(zoomLevel, min, max) || this.option("minZoomLevel") === zoomLevel
    },
    _updateButtonsVisibility: function() {
        this._navigator.toggleButton("next", !_type2.default.isDefined(this._getRequiredView("next")));
        this._navigator.toggleButton("prev", !_type2.default.isDefined(this._getRequiredView("prev")))
    },
    _renderSwipeable: function() {
        if (!this._swipeable) {
            this._swipeable = this._createComponent(this.$element(), _swipeable2.default, {
                onStart: this._swipeStartHandler.bind(this),
                onUpdated: this._swipeUpdateHandler.bind(this),
                onEnd: this._swipeEndHandler.bind(this),
                itemSizeFunc: this._viewWidth.bind(this)
            })
        }
    },
    _swipeStartHandler: function(e) {
        _fx2.default.stop(this._$viewsWrapper, true);
        e.event.maxLeftOffset = this._getRequiredView("next") ? 1 : 0;
        e.event.maxRightOffset = this._getRequiredView("prev") ? 1 : 0
    },
    _getRequiredView: function(name) {
        var view;
        var isRtl = this.option("rtlEnabled");
        if ("next" === name) {
            view = isRtl ? this._beforeView : this._afterView
        } else {
            if ("prev" === name) {
                view = isRtl ? this._afterView : this._beforeView
            }
        }
        return view
    },
    _swipeUpdateHandler: function(e) {
        var offset = e.event.offset;
        _translator2.default.move(this._$viewsWrapper, {
            left: offset * this._viewWidth(),
            top: 0
        });
        this._updateNavigatorCaption(offset)
    },
    _swipeEndHandler: function(e) {
        var targetOffset = e.event.targetOffset;
        var moveOffset = !targetOffset ? 0 : targetOffset / Math.abs(targetOffset);
        if (0 === moveOffset) {
            this._animateWrapper(0, ANIMATION_DURATION_SHOW_VIEW);
            return
        }
        var date = this._getDateByOffset(-moveOffset * this._getRtlCorrection());
        if (this._isDateInInvalidRange(date)) {
            if (moveOffset >= 0) {
                date = new Date(this._getMinDate())
            } else {
                date = new Date(this._getMaxDate())
            }
        }
        this.option("currentDate", date)
    },
    _viewWidth: function() {
        if (!this._viewWidthValue) {
            this._viewWidthValue = this.$element().width()
        }
        return this._viewWidthValue
    },
    _updateNavigatorCaption: function(offset) {
        offset *= this._getRtlCorrection();
        var view = this._view;
        if (offset > .5 && this._beforeView) {
            view = this._beforeView
        } else {
            if (offset < -.5 && this._afterView) {
                view = this._afterView
            }
        }
        this._navigator.option("text", view.getNavigatorCaption())
    },
    _isDateInInvalidRange: function(date) {
        if (this._view.isBoundary(date)) {
            return
        }
        var min = this._getMinDate();
        var max = this._getMaxDate();
        var normalizedDate = _date2.default.normalizeDate(date, min, max);
        return normalizedDate === min || normalizedDate === max
    },
    _renderFooter: function() {
        var showTodayButton = this.option("showTodayButton");
        if (showTodayButton) {
            var $todayButton = this._createComponent((0, _renderer2.default)("<a>"), _button2.default, {
                focusStateEnabled: false,
                text: _message2.default.format("dxCalendar-todayButtonText"),
                onClick: function() {
                    this._toTodayView()
                }.bind(this),
                integrationOptions: {}
            }).$element().addClass(CALENDAR_TODAY_BUTTON_CLASS);
            this._$footer = (0, _renderer2.default)("<div>").addClass(CALENDAR_FOOTER_CLASS).append($todayButton);
            this.$element().append(this._$footer)
        }
        this.$element().toggleClass(CALENDAR_HAS_FOOTER_CLASS, showTodayButton)
    },
    _renderSubmitElement: function() {
        this._$submitElement = (0, _renderer2.default)("<input>").attr("type", "hidden").appendTo(this.$element());
        this._setSubmitValue(this.option("value"))
    },
    _setSubmitValue: function(value) {
        var dateValue = this._convertToDate(value);
        this._getSubmitElement().val(_date_serialization2.default.serializeDate(dateValue, CALENDAR_INPUT_STANDARD_PATTERN))
    },
    _getSubmitElement: function() {
        return this._$submitElement
    },
    _animateShowView: function() {
        _fx2.default.stop(this._view.$element(), true);
        return this._popAnimationView(this._view, POP_ANIMATION_FROM, POP_ANIMATION_TO, ANIMATION_DURATION_SHOW_VIEW).promise()
    },
    _popAnimationView: function(view, from, to, duration) {
        return _fx2.default.animate(view.$element(), {
            type: "pop",
            from: {
                scale: from,
                opacity: from
            },
            to: {
                scale: to,
                opacity: to
            },
            duration: duration
        })
    },
    _navigate: function(offset, value) {
        if (0 !== offset && 1 !== Math.abs(offset) && this._isViewAvailable(value)) {
            var newView = this._renderSpecificView(value);
            if (offset > 0) {
                this._afterView && this._afterView.$element().remove();
                this._afterView = newView
            } else {
                this._beforeView && this._beforeView.$element().remove();
                this._beforeView = newView
            }
            this._translateViews()
        }
        var rtlCorrection = this._getRtlCorrection();
        var offsetSign = offset > 0 ? 1 : offset < 0 ? -1 : 0;
        var endPosition = -rtlCorrection * offsetSign * this._viewWidth();
        var viewsWrapperPosition = this._$viewsWrapper.position().left;
        if (viewsWrapperPosition !== endPosition) {
            if (this._preventViewChangeAnimation) {
                this._wrapperAnimationEndHandler(offset, value)
            } else {
                this._animateWrapper(endPosition, ANIMATION_DURATION_SHOW_VIEW).done(this._wrapperAnimationEndHandler.bind(this, offset, value))
            }
        }
    },
    _animateWrapper: function(to, duration) {
        return _fx2.default.animate(this._$viewsWrapper, {
            type: "slide",
            from: {
                left: this._$viewsWrapper.position().left
            },
            to: {
                left: to
            },
            duration: duration
        })
    },
    _toTodayView: function() {
        var today = new Date;
        if (this._isMaxZoomLevel()) {
            this._dateOption("value", today);
            return
        }
        this._preventViewChangeAnimation = true;
        this.option("zoomLevel", this.option("maxZoomLevel"));
        this._dateOption("value", today);
        this._animateShowView();
        this._preventViewChangeAnimation = false
    },
    _wrapperAnimationEndHandler: function(offset, newDate) {
        this._rearrangeViews(offset);
        this._translateViews();
        this._resetLocation();
        this._renderNavigator();
        this._setViewContoured(newDate);
        this._updateAriaId(newDate)
    },
    _rearrangeViews: function(offset) {
        if (0 === offset) {
            return
        }
        var viewOffset;
        var viewToCreateKey;
        var viewToRemoveKey;
        if (offset < 0) {
            viewOffset = 1;
            viewToCreateKey = "_beforeView";
            viewToRemoveKey = "_afterView"
        } else {
            viewOffset = -1;
            viewToCreateKey = "_afterView";
            viewToRemoveKey = "_beforeView"
        }
        if (!this[viewToCreateKey]) {
            return
        }
        var destinationDate = this[viewToCreateKey].option("date");
        if (this[viewToRemoveKey]) {
            this[viewToRemoveKey].$element().remove()
        }
        if (offset === viewOffset) {
            this[viewToRemoveKey] = this._view
        } else {
            this[viewToRemoveKey] = this._renderSpecificView(this._getDateByOffset(viewOffset, destinationDate));
            this._view.$element().remove()
        }
        this._view = this[viewToCreateKey];
        var dateByOffset = this._getDateByOffset(-viewOffset, destinationDate);
        this[viewToCreateKey] = this._isViewAvailable(dateByOffset) ? this._renderSpecificView(dateByOffset) : null
    },
    _resetLocation: function() {
        _translator2.default.move(this._$viewsWrapper, {
            left: 0,
            top: 0
        })
    },
    _clean: function() {
        this.callBase();
        this._clearViewWidthCache();
        delete this._$viewsWrapper;
        delete this._navigator;
        delete this._$footer
    },
    _clearViewWidthCache: function() {
        delete this._viewWidthValue
    },
    _disposeViews: function() {
        this._view.$element().remove();
        this._beforeView && this._beforeView.$element().remove();
        this._afterView && this._afterView.$element().remove();
        delete this._view;
        delete this._beforeView;
        delete this._afterView
    },
    _dispose: function() {
        clearTimeout(this._waitRenderViewTimeout);
        this.callBase()
    },
    _refreshViews: function() {
        this._disposeViews();
        this._renderViews()
    },
    _visibilityChanged: function() {
        this._translateViews()
    },
    _focusInHandler: function() {
        this.callBase.apply(this, arguments);
        this._view.option("contouredDate", this.option("currentDate"))
    },
    _focusOutHandler: function() {
        this.callBase.apply(this, arguments);
        this._view.option("contouredDate", null)
    },
    _updateViewsValue: function(value) {
        var newValue = value ? new Date(value) : null;
        this._view.option("value", newValue);
        this._beforeView && this._beforeView.option("value", newValue);
        this._afterView && this._afterView.option("value", newValue)
    },
    _updateAriaSelected: function(value, previousValue) {
        value = value || this._dateOption("value");
        var $prevSelectedCell = this._view._getCellByDate(previousValue);
        var $selectedCell = this._view._getCellByDate(value);
        this.setAria("selected", void 0, $prevSelectedCell);
        this.setAria("selected", true, $selectedCell);
        if (value && this.option("currentDate").getTime() === value.getTime()) {
            this._updateAriaId(value)
        }
    },
    _updateAriaId: function(value) {
        value = value || this.option("currentDate");
        var ariaId = "dx-" + new _guid2.default;
        var $newCell = this._view._getCellByDate(value);
        this.setAria("id", ariaId, $newCell);
        this.setAria("activedescendant", ariaId);
        this._onContouredChanged(ariaId)
    },
    _suppressingNavigation: function(callback, args) {
        this._suppressNavigation = true;
        callback.apply(this, args);
        delete this._suppressNavigation
    },
    _optionChanged: function(args) {
        var value = args.value;
        var previousValue = args.previousValue;
        switch (args.name) {
            case "width":
                this.callBase(args);
                this._clearViewWidthCache();
                break;
            case "min":
            case "max":
                this.min = void 0;
                this.max = void 0;
                this._suppressingNavigation(this._updateCurrentDate, [this.option("currentDate")]);
                this._refreshViews();
                this._renderNavigator();
                break;
            case "firstDayOfWeek":
                this._refreshViews();
                this._updateButtonsVisibility();
                break;
            case "currentDate":
                this.setAria("id", void 0, this._view._getCellByDate(previousValue));
                this._updateCurrentDate(value);
                break;
            case "zoomLevel":
                this.$element().removeClass(CALENDAR_VIEW_CLASS + "-" + previousValue);
                this._correctZoomLevel();
                this._refreshViews();
                this._renderNavigator();
                this._updateAriaId();
                break;
            case "minZoomLevel":
            case "maxZoomLevel":
                this._correctZoomLevel();
                this._updateButtonsVisibility();
                break;
            case "value":
                value = this._convertToDate(value);
                previousValue = this._convertToDate(previousValue);
                this._updateAriaSelected(value, previousValue);
                this.option("currentDate", _type2.default.isDefined(value) ? new Date(value) : new Date);
                this._updateViewsValue(value);
                this._setSubmitValue(value);
                this.callBase(args);
                break;
            case "disabled":
                this._view.option("disabled", value);
                this.callBase(args);
                break;
            case "onCellClick":
                this._view.option("onCellClick", value);
                break;
            case "onContouredChanged":
                this._onContouredChanged = this._createActionByOption("onContouredChanged");
                break;
            case "disabledDates":
            case "dateSerializationFormat":
            case "cellTemplate":
            case "showTodayButton":
                this._invalidate();
                break;
            case "hasFocus":
                break;
            default:
                this.callBase(args)
        }
    }
});
(0, _component_registrator2.default)("dxCalendar", Calendar);
module.exports = Calendar;
