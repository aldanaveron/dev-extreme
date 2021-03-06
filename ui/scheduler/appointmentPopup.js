/**
 * DevExtreme (ui/scheduler/appointmentPopup.js)
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
exports.default = void 0;
var _renderer = require("../../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _popup = require("../popup");
var _popup2 = _interopRequireDefault(_popup);
var _window = require("../../core/utils/window");
var _window2 = _interopRequireDefault(_window);
var _uiScheduler = require("./ui.scheduler.appointment_form");
var _uiScheduler2 = _interopRequireDefault(_uiScheduler);
var _devices = require("../../core/devices");
var _devices2 = _interopRequireDefault(_devices);
var _dom = require("../../core/utils/dom");
var _dom2 = _interopRequireDefault(_dom);
var _object = require("../../core/utils/object");
var _object2 = _interopRequireDefault(_object);
var _date = require("../../core/utils/date");
var _date2 = _interopRequireDefault(_date);
var _extend = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
var _deferred = require("../../core/utils/deferred");
var _type = require("../../core/utils/type");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function")
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
            descriptor.writable = true
        }
        Object.defineProperty(target, descriptor.key, descriptor)
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        _defineProperties(Constructor.prototype, protoProps)
    }
    if (staticProps) {
        _defineProperties(Constructor, staticProps)
    }
    return Constructor
}
var toMs = _date2.default.dateToMilliseconds;
var WIDGET_CLASS = "dx-scheduler";
var APPOINTMENT_POPUP_CLASS = "".concat(WIDGET_CLASS, "-appointment-popup");
var APPOINTMENT_POPUP_WIDTH = 485;
var APPOINTMENT_POPUP_WIDTH_WITH_RECURRENCE = 970;
var APPOINTMENT_POPUP_FULLSCREEN_WINDOW_WIDTH = 1e3;
var APPOINTMENT_POPUP_FULLSCREEN_WINDOW_WIDTH_MOBILE = 500;
var APPOINTMENT_POPUP_WIDTH_MOBILE = 350;
var TOOLBAR_ITEM_AFTER_LOCATION = "after";
var TOOLBAR_ITEM_BEFORE_LOCATION = "before";
var AppointmentPopup = function() {
    function AppointmentPopup(scheduler) {
        _classCallCheck(this, AppointmentPopup);
        this.scheduler = scheduler;
        this._popup = null;
        this._appointmentForm = null;
        this.state = {
            lastEditData: null,
            appointment: {
                data: null,
                processTimeZone: false,
                isEmptyText: false,
                isEmptyDescription: false
            }
        }
    }
    _createClass(AppointmentPopup, [{
        key: "show",
        value: function() {
            var data = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            var showButtons = arguments.length > 1 ? arguments[1] : void 0;
            var processTimeZone = arguments.length > 2 ? arguments[2] : void 0;
            this.state.appointment.data = data;
            this.state.appointment.processTimeZone = processTimeZone;
            if (!this._popup) {
                var popupConfig = this._createPopupConfig(showButtons);
                this._popup = this._createPopup(popupConfig)
            } else {
                this._updateForm()
            }
            this._popup.show()
        }
    }, {
        key: "hide",
        value: function() {
            this._popup.hide()
        }
    }, {
        key: "isVisible",
        value: function() {
            return this._popup ? this._popup.option("visible") : false
        }
    }, {
        key: "dispose",
        value: function() {
            if (this._$popup) {
                this._popup.$element().remove();
                this._$popup = null
            }
        }
    }, {
        key: "_createPopup",
        value: function(options) {
            var popupElement = (0, _renderer2.default)("<div>").addClass(APPOINTMENT_POPUP_CLASS).appendTo(this.scheduler.$element());
            return this.scheduler._createComponent(popupElement, _popup2.default, options)
        }
    }, {
        key: "_createPopupConfig",
        value: function(showButtons) {
            var _this = this;
            return {
                height: "auto",
                maxHeight: "100%",
                toolbarItems: showButtons ? this._getPopupToolbarItems() : [],
                showCloseButton: false,
                showTitle: false,
                onHiding: function() {
                    _this.scheduler.focus()
                },
                contentTemplate: function() {
                    return _this._createPopupContent()
                },
                onShowing: this._onShowing.bind(this),
                defaultOptionsRules: [{
                    device: function() {
                        return _devices2.default.current().android
                    },
                    options: {
                        showTitle: false
                    }
                }]
            }
        }
    }, {
        key: "_onShowing",
        value: function(e) {
            var _this2 = this;
            var arg = {
                form: this._appointmentForm,
                appointmentData: this.state.appointment.data,
                cancel: false
            };
            this.scheduler._actions.onAppointmentFormOpening(arg);
            this.scheduler._processActionResult(arg, function(canceled) {
                if (canceled) {
                    e.cancel = true
                } else {
                    _this2.updatePopupFullScreenMode()
                }
            })
        }
    }, {
        key: "_createPopupContent",
        value: function() {
            var formElement = (0, _renderer2.default)("<div>");
            this._appointmentForm = this._createForm(formElement);
            this._updateForm();
            return formElement
        }
    }, {
        key: "_createAppointmentFormData",
        value: function(appointmentData) {
            var result = (0, _extend.extend)(true, {
                repeat: !!appointmentData.recurrenceRule
            }, appointmentData);
            (0, _iterator.each)(this.scheduler._resourcesManager.getResourcesFromItem(result, true) || {}, function(name, value) {
                return result[name] = value
            });
            return result
        }
    }, {
        key: "_createForm",
        value: function(element) {
            var expr = this.scheduler._dataAccessors.expr;
            var resources = this.scheduler.option("resources");
            var allowEditingTimeZones = this.scheduler.option("editing").allowEditingTimeZones;
            var appointmentData = this.state.appointment.data;
            var formData = this._createAppointmentFormData(appointmentData);
            _uiScheduler2.default.prepareAppointmentFormEditors(expr, this.scheduler, this.triggerResize.bind(this), this.changeSize.bind(this), formData, allowEditingTimeZones);
            if (resources && resources.length) {
                _uiScheduler2.default.concatResources(this.scheduler._resourcesManager.getEditors())
            }
            return _uiScheduler2.default.create(this.scheduler._createComponent.bind(this.scheduler), element, this._isReadOnly(appointmentData), formData)
        }
    }, {
        key: "_isReadOnly",
        value: function(data) {
            if (data && data.disabled) {
                return true
            }
            return this.scheduler._editAppointmentData ? !this.scheduler._editing.allowUpdating : false
        }
    }, {
        key: "_updateForm",
        value: function() {
            var _this$state$appointme = this.state.appointment,
                data = _this$state$appointme.data,
                processTimeZone = _this$state$appointme.processTimeZone;
            var allDay = this.scheduler.fire("getField", "allDay", data);
            var startDate = this.scheduler.fire("getField", "startDate", data);
            var endDate = this.scheduler.fire("getField", "endDate", data);
            this.state.appointment.isEmptyText = void 0 === data || void 0 === data.text;
            this.state.appointment.isEmptyDescription = void 0 === data || void 0 === data.description;
            var formData = (0, _extend.extend)({}, {
                text: "",
                description: "",
                recurrenceRule: ""
            }, this._createAppointmentFormData(data));
            if (processTimeZone) {
                if (startDate) {
                    startDate = this.scheduler.fire("convertDateByTimezone", startDate);
                    this.scheduler.fire("setField", "startDate", formData, startDate)
                }
                if (endDate) {
                    endDate = this.scheduler.fire("convertDateByTimezone", endDate);
                    this.scheduler.fire("setField", "endDate", formData, endDate)
                }
            }
            var _this$scheduler$_data = this.scheduler._dataAccessors.expr,
                startDateExpr = _this$scheduler$_data.startDateExpr,
                endDateExpr = _this$scheduler$_data.endDateExpr,
                recurrenceRuleExpr = _this$scheduler$_data.recurrenceRuleExpr;
            var recurrenceEditorOptions = this._getEditorOptions(recurrenceRuleExpr);
            var isRecurrence = _uiScheduler2.default.getRecurrenceRule(formData, this.scheduler._dataAccessors.expr);
            this._setEditorOptions(recurrenceRuleExpr, (0, _extend.extend)({}, recurrenceEditorOptions, {
                startDate: startDate,
                visible: !!isRecurrence
            }));
            this._appointmentForm.option("readOnly", this._isReadOnly(data));
            _uiScheduler2.default.updateFormData(this._appointmentForm, formData);
            _uiScheduler2.default.setEditorsType(this._appointmentForm, startDateExpr, endDateExpr, allDay)
        }
    }, {
        key: "_getEditorOptions",
        value: function(name) {
            if (!name) {
                return
            }
            var editor = this._appointmentForm.itemOption(name);
            return editor ? editor.editorOptions : {}
        }
    }, {
        key: "_setEditorOptions",
        value: function(name, options) {
            if (!name) {
                return
            }
            var editor = this._appointmentForm.itemOption(name);
            editor && this._appointmentForm.itemOption(name, "editorOptions", options)
        }
    }, {
        key: "_isDeviceMobile",
        value: function() {
            return "desktop" !== _devices2.default.current().deviceType
        }
    }, {
        key: "_isPopupFullScreenNeeded",
        value: function() {
            var width = this._tryGetWindowWidth();
            if (width) {
                return this._isDeviceMobile() ? width < APPOINTMENT_POPUP_FULLSCREEN_WINDOW_WIDTH_MOBILE : width < APPOINTMENT_POPUP_FULLSCREEN_WINDOW_WIDTH
            }
            return false
        }
    }, {
        key: "_tryGetWindowWidth",
        value: function() {
            if (_window2.default.hasWindow()) {
                var window = _window2.default.getWindow();
                return (0, _renderer2.default)(window).width()
            }
        }
    }, {
        key: "triggerResize",
        value: function() {
            this._popup && _dom2.default.triggerResizeEvent(this._popup.$element())
        }
    }, {
        key: "_getMaxWidth",
        value: function(isRecurrence) {
            if (this._isDeviceMobile()) {
                return APPOINTMENT_POPUP_WIDTH_MOBILE
            }
            return isRecurrence ? APPOINTMENT_POPUP_WIDTH_WITH_RECURRENCE : APPOINTMENT_POPUP_WIDTH
        }
    }, {
        key: "changeSize",
        value: function(isRecurrence) {
            var isFullScreen = this._isPopupFullScreenNeeded();
            this._popup.option({
                maxWidth: isFullScreen ? "100%" : this._getMaxWidth(isRecurrence),
                fullScreen: isFullScreen
            })
        }
    }, {
        key: "updatePopupFullScreenMode",
        value: function() {
            if (!this._appointmentForm) {
                return
            }
            var isRecurrence = _uiScheduler2.default.getRecurrenceRule(this._appointmentForm.option("formData"), this.scheduler._dataAccessors.expr);
            if (this.isVisible()) {
                this.changeSize(isRecurrence)
            }
        }
    }, {
        key: "_getPopupToolbarItems",
        value: function() {
            var _this3 = this;
            var isIOs = "ios" === _devices2.default.current().platform;
            return [{
                shortcut: "done",
                options: {
                    text: "Done"
                },
                location: TOOLBAR_ITEM_AFTER_LOCATION,
                onClick: function(e) {
                    return _this3._doneButtonClickHandler(e)
                }
            }, {
                shortcut: "cancel",
                location: isIOs ? TOOLBAR_ITEM_BEFORE_LOCATION : TOOLBAR_ITEM_AFTER_LOCATION
            }]
        }
    }, {
        key: "saveChanges",
        value: function(disableButton) {
            var _this4 = this;
            var deferred = new _deferred.Deferred;
            var validation = this._appointmentForm.validate();
            var state = this.state.appointment;
            var convert = function(obj, dateFieldName) {
                var date = new Date(_this4.scheduler.fire("getField", dateFieldName, obj));
                var tzDiff = _this4.scheduler._getTimezoneOffsetByOption() * toMs("hour") + _this4.scheduler.fire("getClientTimezoneOffset", date);
                return new Date(date.getTime() + tzDiff)
            };
            disableButton && this._disableDoneButton();
            (0, _deferred.when)(validation && validation.complete || validation).done(function(validation) {
                if (validation && !validation.isValid) {
                    _this4._enableDoneButton();
                    deferred.resolve(false);
                    return
                }
                var formData = _object2.default.deepExtendArraySafe({}, _this4._getFormData(), true);
                var oldData = _this4.scheduler._editAppointmentData;
                var recData = _this4.scheduler._updatedRecAppointment;
                if (state.isEmptyText && "" === formData.text) {
                    delete formData.text
                }
                if (state.isEmptyDescription && "" === formData.description) {
                    delete formData.description
                }
                if (void 0 === state.data.recurrenceRule && "" === formData.recurrenceRule) {
                    delete formData.recurrenceRule
                }
                if ((0, _type.isDefined)(formData.repeat)) {
                    delete formData.repeat
                }
                if (oldData) {
                    _this4.scheduler._convertDatesByTimezoneBack(false, formData)
                }
                if (oldData && !recData) {
                    _this4.scheduler.updateAppointment(oldData, formData)
                } else {
                    if (recData) {
                        _this4.scheduler.updateAppointment(oldData, recData);
                        delete _this4.scheduler._updatedRecAppointment;
                        if ("number" === typeof _this4.scheduler._getTimezoneOffsetByOption()) {
                            _this4.scheduler.fire("setField", "startDate", formData, convert.call(_this4, formData, "startDate"));
                            _this4.scheduler.fire("setField", "endDate", formData, convert.call(_this4, formData, "endDate"))
                        }
                    }
                    _this4.scheduler.addAppointment(formData)
                }
                _this4._enableDoneButton();
                _this4.state.lastEditData = formData;
                deferred.resolve(true)
            });
            return deferred.promise()
        }
    }, {
        key: "_getFormData",
        value: function() {
            var formData = this._appointmentForm.option("formData");
            var startDate = this.scheduler.fire("getField", "startDate", formData);
            var endDate = this.scheduler.fire("getField", "endDate", formData);
            this.scheduler.fire("setField", "startDate", formData, startDate);
            this.scheduler.fire("setField", "endDate", formData, endDate);
            return formData
        }
    }, {
        key: "_doneButtonClickHandler",
        value: function(e) {
            e.cancel = true;
            this.saveEditData()
        }
    }, {
        key: "saveEditData",
        value: function() {
            var _this5 = this;
            var deferred = new _deferred.Deferred;
            (0, _deferred.when)(this.saveChanges(true)).done(function() {
                if (_this5.state.lastEditData) {
                    var startDate = _this5.scheduler.fire("getField", "startDate", _this5.state.lastEditData);
                    _this5.scheduler._workSpace.updateScrollPosition(startDate);
                    _this5.state.lastEditData = null
                }
                deferred.resolve()
            });
            return deferred.promise()
        }
    }, {
        key: "_enableDoneButton",
        value: function() {
            var toolbarItems = this._popup.option("toolbarItems");
            toolbarItems[0].options = (0, _extend.extend)(toolbarItems[0].options, {
                disabled: false
            });
            this._popup.option("toolbarItems", toolbarItems)
        }
    }, {
        key: "_disableDoneButton",
        value: function() {
            var toolbarItems = this._popup.option("toolbarItems");
            toolbarItems[0].options = (0, _extend.extend)(toolbarItems[0].options, {
                disabled: true
            });
            this._popup.option("toolbarItems", toolbarItems)
        }
    }]);
    return AppointmentPopup
}();
exports.default = AppointmentPopup;
