/**
 * DevExtreme (ui/scheduler/ui.scheduler.appointments.layout_manager.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _common = require("../../core/utils/common");
var _uiSchedulerAppointmentsStrategy = require("./rendering_strategies/ui.scheduler.appointments.strategy.vertical");
var _uiSchedulerAppointmentsStrategy2 = _interopRequireDefault(_uiSchedulerAppointmentsStrategy);
var _uiSchedulerAppointmentsStrategy3 = require("./rendering_strategies/ui.scheduler.appointments.strategy.horizontal");
var _uiSchedulerAppointmentsStrategy4 = _interopRequireDefault(_uiSchedulerAppointmentsStrategy3);
var _uiSchedulerAppointmentsStrategy5 = require("./rendering_strategies/ui.scheduler.appointments.strategy.horizontal_month_line");
var _uiSchedulerAppointmentsStrategy6 = _interopRequireDefault(_uiSchedulerAppointmentsStrategy5);
var _uiSchedulerAppointmentsStrategy7 = require("./rendering_strategies/ui.scheduler.appointments.strategy.horizontal_month");
var _uiSchedulerAppointmentsStrategy8 = _interopRequireDefault(_uiSchedulerAppointmentsStrategy7);
var _uiSchedulerAppointmentsStrategy9 = require("./rendering_strategies/ui.scheduler.appointments.strategy.agenda");
var _uiSchedulerAppointmentsStrategy10 = _interopRequireDefault(_uiSchedulerAppointmentsStrategy9);

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
var RENDERING_STRATEGIES = {
    horizontal: _uiSchedulerAppointmentsStrategy4.default,
    horizontalMonth: _uiSchedulerAppointmentsStrategy8.default,
    horizontalMonthLine: _uiSchedulerAppointmentsStrategy6.default,
    vertical: _uiSchedulerAppointmentsStrategy2.default,
    agenda: _uiSchedulerAppointmentsStrategy10.default
};
var AppointmentLayoutManager = function() {
    function AppointmentLayoutManager(instance, renderingStrategy) {
        _classCallCheck(this, AppointmentLayoutManager);
        this.instance = instance;
        renderingStrategy && this.initRenderingStrategy(renderingStrategy)
    }
    _createClass(AppointmentLayoutManager, [{
        key: "getCellDimensions",
        value: function(options) {
            if (this.instance._workSpace) {
                return {
                    width: this.instance._workSpace.getCellWidth(),
                    height: this.instance._workSpace.getCellHeight(),
                    allDayHeight: this.instance._workSpace.getAllDayHeight()
                }
            }
        }
    }, {
        key: "getGroupOrientation",
        value: function(options) {
            if (this.instance._workSpace) {
                options.callback(this.instance._workSpace._getRealGroupOrientation())
            }
        }
    }, {
        key: "initRenderingStrategy",
        value: function(renderingStrategy) {
            var Strategy = RENDERING_STRATEGIES[renderingStrategy];
            this._renderingStrategyInstance = new Strategy(this.instance);
            this.renderingStrategy = renderingStrategy
        }
    }, {
        key: "createAppointmentsMap",
        value: function(items) {
            var _this = this;
            var _this$getCellDimensio = this.getCellDimensions(),
                width = _this$getCellDimensio.width,
                height = _this$getCellDimensio.height,
                allDayHeight = _this$getCellDimensio.allDayHeight;
            this.instance._cellWidth = width;
            this.instance._cellHeight = height;
            this.instance._allDayCellHeight = allDayHeight;
            this.getGroupOrientation({
                callback: function(groupOrientation) {
                    return _this.instance._groupOrientation = groupOrientation
                }
            });
            this._positionMap = this._renderingStrategyInstance.createTaskPositionMap(items);
            return this._createAppointmentsMapCore(items || [], this._positionMap)
        }
    }, {
        key: "_createAppointmentsMapCore",
        value: function(list, positionMap) {
            var _this2 = this;
            return list.map(function(data, index) {
                if (!_this2._renderingStrategyInstance.keepAppointmentSettings()) {
                    delete data.settings
                }
                var appointmentSettings = positionMap[index];
                appointmentSettings.forEach(function(settings) {
                    settings.direction = "vertical" === _this2.renderingStrategy && !settings.allDay ? "vertical" : "horizontal"
                });
                return {
                    itemData: data,
                    settings: appointmentSettings,
                    needRepaint: true,
                    needRemove: false
                }
            })
        }
    }, {
        key: "_hasChangesInData",
        value: function(data) {
            var updatedData = this.instance.getUpdatedAppointment();
            return updatedData === data || this.instance.getUpdatedAppointmentKeys().some(function(item) {
                return data[item.key] === item.value
            })
        }
    }, {
        key: "_hasChangesInSettings",
        value: function(settingList, oldSettingList) {
            if (settingList.length !== oldSettingList.length) {
                return true
            }
            for (var i = 0; i < settingList.length; i++) {
                var newSettings = settingList[i];
                var oldSettings = oldSettingList[i];
                if (oldSettings) {
                    oldSettings.sortedIndex = newSettings.sortedIndex
                }
                if (!(0, _common.equalByValue)(newSettings, oldSettings)) {
                    return true
                }
            }
            return false
        }
    }, {
        key: "_getEqualAppointmentFromList",
        value: function(appointment, list) {
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                if (item.itemData === appointment.itemData) {
                    return item
                }
            }
            return null
        }
    }, {
        key: "_getDeletedAppointments",
        value: function(appointmentList, oldAppointmentList) {
            var result = [];
            for (var i = 0; i < oldAppointmentList.length; i++) {
                var oldAppointment = oldAppointmentList[i];
                var appointment = this._getEqualAppointmentFromList(oldAppointment, appointmentList);
                if (!appointment) {
                    oldAppointment.needRemove = true;
                    result.push(oldAppointment)
                }
            }
            return result
        }
    }, {
        key: "getRepaintedAppointments",
        value: function(appointmentList, oldAppointmentList) {
            if (0 === oldAppointmentList.length || "agenda" === this.renderingStrategy) {
                return appointmentList
            }
            for (var i = 0; i < appointmentList.length; i++) {
                var appointment = appointmentList[i];
                var oldAppointment = this._getEqualAppointmentFromList(appointment, oldAppointmentList);
                if (oldAppointment) {
                    appointment.needRepaint = this._hasChangesInData(appointment.itemData) || this._hasChangesInSettings(appointment.settings, oldAppointment.settings)
                }
            }
            return appointmentList.concat(this._getDeletedAppointments(appointmentList, oldAppointmentList))
        }
    }, {
        key: "getRenderingStrategyInstance",
        value: function() {
            return this._renderingStrategyInstance
        }
    }]);
    return AppointmentLayoutManager
}();
module.exports = AppointmentLayoutManager;
