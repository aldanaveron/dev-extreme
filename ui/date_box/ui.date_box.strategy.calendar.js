/**
 * DevExtreme (ui/date_box/ui.date_box.strategy.calendar.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var Calendar = require("../calendar");
var DateBoxStrategy = require("./ui.date_box.strategy");
var dateUtils = require("../../core/utils/date");
var commonUtils = require("../../core/utils/common");
var isFunction = require("../../core/utils/type").isFunction;
var extend = require("../../core/utils/extend").extend;
var messageLocalization = require("../../localization/message");
var CalendarStrategy = DateBoxStrategy.inherit({
    NAME: "Calendar",
    supportedKeys: function() {
        var homeEndHandler = function(e) {
            if (this.option("opened")) {
                e.preventDefault();
                return true
            }
            return false
        };
        return {
            rightArrow: function() {
                if (this.option("opened")) {
                    return true
                }
            },
            leftArrow: function() {
                if (this.option("opened")) {
                    return true
                }
            },
            enter: function(e) {
                if (this.dateBox.option("opened")) {
                    e.preventDefault();
                    if (this._widget.option("zoomLevel") === this._widget.option("maxZoomLevel")) {
                        var contouredDate = this._widget._view.option("contouredDate");
                        var lastActionElement = this._lastActionElement;
                        if (contouredDate && "calendar" === lastActionElement) {
                            this.dateBoxValue(contouredDate, e)
                        }
                        this.dateBox.close();
                        this.dateBox._valueChangeEventHandler(e)
                    } else {
                        return true
                    }
                } else {
                    this.dateBox._valueChangeEventHandler(e)
                }
            }.bind(this),
            home: homeEndHandler,
            end: homeEndHandler
        }
    },
    getDisplayFormat: function(displayFormat) {
        return displayFormat || "shortdate"
    },
    _getWidgetName: function() {
        return Calendar
    },
    getKeyboardListener: function() {
        return this._widget
    },
    _getWidgetOptions: function() {
        var disabledDates = this.dateBox.option("disabledDates");
        return extend(this.dateBox.option("calendarOptions"), {
            value: this.dateBoxValue() || null,
            dateSerializationFormat: null,
            min: this.dateBox.dateOption("min"),
            max: this.dateBox.dateOption("max"),
            onValueChanged: this._valueChangedHandler.bind(this),
            onCellClick: this._cellClickHandler.bind(this),
            tabIndex: null,
            disabledDates: isFunction(disabledDates) ? this._injectComponent(disabledDates.bind(this.dateBox)) : disabledDates,
            onContouredChanged: this._refreshActiveDescendant.bind(this),
            hasFocus: function() {
                return true
            }
        })
    },
    _injectComponent: function(func) {
        var that = this;
        return function(params) {
            extend(params, {
                component: that.dateBox
            });
            return func(params)
        }
    },
    _refreshActiveDescendant: function(e) {
        this._lastActionElement = "calendar";
        this.dateBox.setAria("activedescendant", e.actionValue)
    },
    popupConfig: function(_popupConfig) {
        var toolbarItems = _popupConfig.toolbarItems;
        var buttonsLocation = this.dateBox.option("buttonsLocation");
        var position = [];
        if ("default" !== buttonsLocation) {
            position = commonUtils.splitPair(buttonsLocation)
        } else {
            position = ["bottom", "center"]
        }
        if ("useButtons" === this.dateBox.option("applyValueMode")) {
            toolbarItems.unshift({
                widget: "dxButton",
                toolbar: position[0],
                location: "after" === position[1] ? "before" : position[1],
                options: {
                    onInitialized: function(e) {
                        e.component.registerKeyHandler("escape", this._escapeHandler.bind(this))
                    }.bind(this),
                    onClick: function() {
                        this._widget._toTodayView()
                    }.bind(this),
                    text: messageLocalization.format("dxCalendar-todayButtonText"),
                    type: "today"
                }
            })
        }
        return extend(true, _popupConfig, {
            toolbarItems: toolbarItems,
            position: {
                collision: "flipfit flip"
            }
        })
    },
    _escapeHandler: function() {
        this.dateBox.close();
        this.dateBox.focus()
    },
    _valueChangedHandler: function(e) {
        var dateBox = this.dateBox;
        var value = e.value;
        var prevValue = e.previousValue;
        if (dateUtils.sameDate(value, prevValue)) {
            return
        }
        if ("instantly" === dateBox.option("applyValueMode")) {
            this.dateBoxValue(this.getValue(), e.event)
        }
    },
    _updateValue: function() {
        if (!this._widget) {
            return
        }
        this._widget.option("value", this.dateBoxValue())
    },
    textChangedHandler: function() {
        this._lastActionElement = "input";
        if (this.dateBox.option("opened") && this._widget) {
            this._updateValue(true)
        }
    },
    _cellClickHandler: function(e) {
        var dateBox = this.dateBox;
        if ("instantly" === dateBox.option("applyValueMode")) {
            dateBox.option("opened", false);
            this.dateBoxValue(this.getValue(), e.event)
        }
    }
});
module.exports = CalendarStrategy;
