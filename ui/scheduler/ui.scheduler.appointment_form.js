/**
 * DevExtreme (ui/scheduler/ui.scheduler.appointment_form.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _form = require("../form");
var _form2 = _interopRequireDefault(_form);
var _date_serialization = require("../../core/utils/date_serialization");
var _date_serialization2 = _interopRequireDefault(_date_serialization);
var _message = require("../../localization/message");
var _message2 = _interopRequireDefault(_message);
var _devices = require("../../core/devices");
var _devices2 = _interopRequireDefault(_devices);
require("./ui.scheduler.recurrence_editor");
require("./timezones/ui.scheduler.timezone_editor");
require("../text_area");
require("../tag_box");
require("../switch");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var SCREEN_SIZE_OF_SINGLE_COLUMN = 600;
var SchedulerAppointmentForm = {
    _appointmentForm: {},
    _lockDateShiftFlag: false,
    _validateAppointmentFormDate: function(editor, value, previousValue) {
        var isCurrentDateCorrect = null === value || !!value;
        var isPreviousDateCorrect = null === previousValue || !!previousValue;
        if (!isCurrentDateCorrect && isPreviousDateCorrect) {
            editor.option("value", previousValue)
        }
    },
    _getAllDayStartDate: function(startDate) {
        return new Date(new Date(startDate).setHours(0, 0, 0, 0))
    },
    _getAllDayEndDate: function(startDate) {
        return new Date(new Date(startDate).setDate(startDate.getDate() + 1))
    },
    _getStartDateWithStartHour: function(startDate, startDayHour) {
        return new Date(new Date(startDate).setHours(startDayHour))
    },
    create: function(componentCreator, $container, isReadOnly, formData) {
        this._appointmentForm = componentCreator($container, _form2.default, {
            items: this._editors,
            readOnly: isReadOnly,
            showValidationSummary: true,
            scrollingEnabled: true,
            colCount: "auto",
            colCountByScreen: {
                lg: 2,
                xs: 1
            },
            formData: formData,
            showColonAfterLabel: false,
            labelLocation: "top",
            screenByWidth: function(width) {
                return width < SCREEN_SIZE_OF_SINGLE_COLUMN || "desktop" !== _devices2.default.current().deviceType ? "xs" : "lg"
            }
        });
        return this._appointmentForm
    },
    _dateBoxValueChanged: function(args, dateExpr, isNeedCorrect) {
        this._validateAppointmentFormDate(args.component, args.value, args.previousValue);
        var value = _date_serialization2.default.deserializeDate(args.value);
        var previousValue = _date_serialization2.default.deserializeDate(args.previousValue);
        var dateEditor = this._appointmentForm.getEditor(dateExpr);
        var dateValue = _date_serialization2.default.deserializeDate(dateEditor.option("value"));
        if (!this._appointmentForm._lockDateShiftFlag && dateValue && value && isNeedCorrect(dateValue, value)) {
            var duration = previousValue ? dateValue.getTime() - previousValue.getTime() : 0;
            dateEditor.option("value", new Date(value.getTime() + duration))
        }
    },
    _getTimezoneEditor: function(timeZoneExpr, secondTimeZoneExpr, visibleIndex, colSpan, schedulerInst, isMainTimeZone) {
        var _this = this;
        var isShow = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : false;
        return {
            dataField: timeZoneExpr,
            editorType: "dxSchedulerTimezoneEditor",
            visibleIndex: visibleIndex,
            colSpan: colSpan,
            label: {
                text: " "
            },
            editorOptions: {
                observer: schedulerInst,
                onValueChanged: function(args) {
                    var form = _this._appointmentForm;
                    var secondTimezoneEditor = form.getEditor(secondTimeZoneExpr);
                    if (isMainTimeZone) {
                        secondTimezoneEditor.option("value", args.value)
                    }
                }
            },
            visible: isShow
        }
    },
    _getDateBoxEditor: function(dataExpr, colSpan, firstDayOfWeek, label, callback) {
        return {
            dataField: dataExpr,
            editorType: "dxDateBox",
            colSpan: colSpan,
            label: {
                text: _message2.default.format(label)
            },
            validationRules: [{
                type: "required"
            }],
            editorOptions: {
                width: "100%",
                calendarOptions: {
                    firstDayOfWeek: firstDayOfWeek
                },
                onValueChanged: callback
            }
        }
    },
    _getDateBoxItems: function(dataExprs, schedulerInst, allowEditingTimeZones) {
        var _this2 = this;
        var colSpan = allowEditingTimeZones ? 2 : 1;
        var firstDayOfWeek = schedulerInst.option("firstDayOfWeek");
        return [this._getDateBoxEditor(dataExprs.startDateExpr, colSpan, firstDayOfWeek, "dxScheduler-editorLabelStartDate", function(args) {
            _this2._dateBoxValueChanged(args, dataExprs.endDateExpr, function(endValue, startValue) {
                return endValue < startValue
            })
        }), this._getTimezoneEditor(dataExprs.startDateTimeZoneExpr, dataExprs.endDateTimeZoneExpr, 1, colSpan, schedulerInst, true, allowEditingTimeZones), this._getDateBoxEditor(dataExprs.endDateExpr, colSpan, firstDayOfWeek, "dxScheduler-editorLabelEndDate", function(args) {
            _this2._dateBoxValueChanged(args, dataExprs.startDateExpr, function(startValue, endValue) {
                return endValue < startValue
            })
        }), this._getTimezoneEditor(dataExprs.endDateTimeZoneExpr, dataExprs.startDateTimeZoneExpr, 3, colSpan, schedulerInst, false, allowEditingTimeZones)]
    },
    _getMainItems: function(dataExprs, schedulerInst, triggerResize, changeSize, allowEditingTimeZones) {
        var _this3 = this;
        return [{
            dataField: dataExprs.textExpr,
            editorType: "dxTextBox",
            colSpan: 2,
            label: {
                text: _message2.default.format("dxScheduler-editorLabelTitle")
            }
        }, {
            itemType: "group",
            colSpan: 2,
            colCountByScreen: {
                lg: 2,
                xs: 1
            },
            items: this._getDateBoxItems(dataExprs, schedulerInst, allowEditingTimeZones)
        }, {
            itemType: "group",
            colCountByScreen: {
                lg: 3,
                xs: 3
            },
            colSpan: 2,
            items: [{
                dataField: dataExprs.allDayExpr,
                cssClass: "dx-appointment-form-switch",
                editorType: "dxSwitch",
                label: {
                    text: _message2.default.format("dxScheduler-allDay"),
                    location: "right"
                },
                editorOptions: {
                    onValueChanged: function(args) {
                        var value = args.value;
                        var startDateEditor = _this3._appointmentForm.getEditor(dataExprs.startDateExpr);
                        var endDateEditor = _this3._appointmentForm.getEditor(dataExprs.endDateExpr);
                        var startDate = _date_serialization2.default.deserializeDate(startDateEditor.option("value"));
                        if (!_this3._appointmentForm._lockDateShiftFlag && startDate) {
                            if (value) {
                                var allDayStartDate = _this3._getAllDayStartDate(startDate);
                                startDateEditor.option("value", allDayStartDate);
                                endDateEditor.option("value", _this3._getAllDayEndDate(allDayStartDate))
                            } else {
                                var startDateWithStartHour = _this3._getStartDateWithStartHour(startDate, schedulerInst.option("startDayHour"));
                                var endDate = schedulerInst._workSpace.calculateEndDate(startDateWithStartHour);
                                startDateEditor.option("value", startDateWithStartHour);
                                endDateEditor.option("value", endDate)
                            }
                        }
                        startDateEditor.option("type", value ? "date" : "datetime");
                        endDateEditor.option("type", value ? "date" : "datetime")
                    }
                }
            }, {
                editorType: "dxSwitch",
                dataField: "repeat",
                cssClass: "dx-appointment-form-switch",
                name: "visibilityChanged",
                label: {
                    text: _message2.default.format("dxScheduler-editorLabelRecurrence"),
                    location: "right"
                },
                editorOptions: {
                    onValueChanged: function(args) {
                        var form = _this3._appointmentForm;
                        form.option("items[0].colSpan", args.value ? 1 : 2);
                        form.getEditor(dataExprs.recurrenceRuleExpr).option("visible", args.value);
                        changeSize(args.value);
                        triggerResize()
                    }
                }
            }]
        }, {
            itemType: "empty",
            colSpan: 2
        }, {
            dataField: dataExprs.descriptionExpr,
            editorType: "dxTextArea",
            colSpan: 2,
            label: {
                text: _message2.default.format("dxScheduler-editorLabelDescription")
            }
        }, {
            itemType: "empty",
            colSpan: 2
        }]
    },
    prepareAppointmentFormEditors: function(dataExprs, schedulerInst, triggerResize, changeSize, appointmentData, allowEditingTimeZones) {
        var _this4 = this;
        var recurrenceEditorVisibility = !!this.getRecurrenceRule(appointmentData, dataExprs);
        this._editors = [{
            itemType: "group",
            colCountByScreen: {
                lg: 2,
                xs: 1
            },
            colSpan: recurrenceEditorVisibility ? 1 : 2,
            items: this._getMainItems(dataExprs, schedulerInst, triggerResize, changeSize, allowEditingTimeZones)
        }, {
            dataField: dataExprs.recurrenceRuleExpr,
            editorType: "dxRecurrenceEditor",
            editorOptions: {
                firstDayOfWeek: schedulerInst.option("firstDayOfWeek"),
                onInitialized: function(e) {
                    var form = _this4._appointmentForm;
                    if (form.option) {
                        e.component.option("visible", !!_this4.getRecurrenceRule(form.option("formData"), dataExprs))
                    }
                }
            },
            label: {
                text: " ",
                visible: false
            }
        }];
        return this._editors
    },
    getRecurrenceRule: function(data, dataExprs) {
        return data[dataExprs.recurrenceRuleExpr]
    },
    concatResources: function(resources) {
        this._editors[0].items = this._editors[0].items.concat(resources)
    },
    setEditorsType: function(form, startDateExpr, endDateExpr, allDay) {
        var startDateFormItem = form.itemOption(startDateExpr);
        var endDateFormItem = form.itemOption(endDateExpr);
        if (startDateFormItem && endDateFormItem) {
            var startDateEditorOptions = startDateFormItem.editorOptions;
            var endDateEditorOptions = endDateFormItem.editorOptions;
            startDateEditorOptions.type = endDateEditorOptions.type = allDay ? "date" : "datetime";
            form.itemOption(startDateExpr, "editorOptions", startDateEditorOptions);
            form.itemOption(endDateExpr, "editorOptions", endDateEditorOptions)
        }
    },
    updateFormData: function(appointmentForm, formData) {
        appointmentForm._lockDateShiftFlag = true;
        appointmentForm.option("formData", formData);
        appointmentForm._lockDateShiftFlag = false
    }
};
module.exports = SchedulerAppointmentForm;
