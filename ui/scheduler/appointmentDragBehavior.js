/**
 * DevExtreme (ui/scheduler/appointmentDragBehavior.js)
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
var _draggable = require("../draggable");
var _draggable2 = _interopRequireDefault(_draggable);
var _translator = require("../../animation/translator");
var _translator2 = _interopRequireDefault(_translator);
var _extend = require("../../core/utils/extend");
var _constants = require("./constants");

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
var FIXED_CONTAINER_PROP_NAME = "fixedContainer";
var APPOINTMENT_ITEM_CLASS = "dx-scheduler-appointment";
var AppointmentDragBehavior = function() {
    function AppointmentDragBehavior(scheduler) {
        _classCallCheck(this, AppointmentDragBehavior);
        this.scheduler = scheduler;
        this.appointments = scheduler._appointments;
        this.initialPosition = {
            left: 0,
            top: 0
        };
        this.currentAppointment = null
    }
    _createClass(AppointmentDragBehavior, [{
        key: "isAllDay",
        value: function(appointment) {
            return appointment.data("dxAppointmentSettings").allDay
        }
    }, {
        key: "getContainerShift",
        value: function(isAllDay) {
            var appointmentContainer = this.appointments._getAppointmentContainer(isAllDay);
            var dragAndDropContainer = this.appointments.option(FIXED_CONTAINER_PROP_NAME);
            var appointmentContainerRect = appointmentContainer[0].getBoundingClientRect();
            var dragAndDropContainerRect = dragAndDropContainer[0].getBoundingClientRect();
            return {
                left: appointmentContainerRect.left - dragAndDropContainerRect.left,
                top: appointmentContainerRect.top - dragAndDropContainerRect.top
            }
        }
    }, {
        key: "onDragStart",
        value: function(e) {
            this.initialPosition = _translator2.default.locate((0, _renderer2.default)(e.itemElement));
            this.appointments.notifyObserver("hideAppointmentTooltip")
        }
    }, {
        key: "getAppointmentElement",
        value: function(e) {
            var itemElement = e.event.data && e.event.data.itemElement || e.itemElement;
            return (0, _renderer2.default)(itemElement)
        }
    }, {
        key: "onDragEnd",
        value: function(e) {
            var $appointment = this.getAppointmentElement(e);
            var container = this.appointments._getAppointmentContainer(this.isAllDay($appointment));
            container.append($appointment);
            this.currentAppointment = $appointment;
            this.appointments.notifyObserver("updateAppointmentAfterDrag", {
                event: e,
                data: this.appointments._getItemData($appointment),
                $appointment: $appointment,
                coordinates: this.initialPosition
            })
        }
    }, {
        key: "getItemData",
        value: function(appointment) {
            var itemData = (0, _renderer2.default)(appointment).data(_constants.LIST_ITEM_DATA_KEY);
            return itemData && itemData.data || this.appointments._getItemData(appointment)
        }
    }, {
        key: "getItemSettings",
        value: function(appointment) {
            var itemData = (0, _renderer2.default)(appointment).data(_constants.LIST_ITEM_DATA_KEY);
            return itemData && itemData.settings || []
        }
    }, {
        key: "createDragStartHandler",
        value: function(options, appointmentDragging) {
            var _this = this;
            return function(e) {
                e.itemData = _this.getItemData(e.itemElement);
                e.itemSettings = _this.getItemSettings(e.itemElement);
                appointmentDragging.onDragStart && appointmentDragging.onDragStart(e);
                if (!e.cancel) {
                    options.onDragStart(e)
                }
            }
        }
    }, {
        key: "createDragEndHandler",
        value: function(options, appointmentDragging) {
            return function(e) {
                appointmentDragging.onDragEnd && appointmentDragging.onDragEnd(e);
                if (!e.cancel) {
                    options.onDragEnd(e);
                    if (e.fromComponent !== e.toComponent) {
                        appointmentDragging.onRemove && appointmentDragging.onRemove(e)
                    }
                }
            }
        }
    }, {
        key: "createDropHandler",
        value: function(appointmentDragging) {
            var _this2 = this;
            return function(e) {
                e.itemData = (0, _extend.extend)({}, e.itemData, _this2.appointments.invoke("getUpdatedData", {
                    data: e.itemData
                }));
                if (e.fromComponent !== e.toComponent) {
                    appointmentDragging.onAdd && appointmentDragging.onAdd(e)
                }
            }
        }
    }, {
        key: "addTo",
        value: function(container, config) {
            var appointmentDragging = this.scheduler.option("appointmentDragging") || {};
            var options = (0, _extend.extend)({
                component: this.scheduler,
                contentTemplate: null,
                filter: ".".concat(APPOINTMENT_ITEM_CLASS),
                immediate: false,
                onDragStart: this.onDragStart.bind(this),
                onDragEnd: this.onDragEnd.bind(this)
            }, config);
            this.appointments._createComponent(container, _draggable2.default, (0, _extend.extend)({}, options, appointmentDragging, {
                onDragStart: this.createDragStartHandler(options, appointmentDragging),
                onDragEnd: this.createDragEndHandler(options, appointmentDragging),
                onDrop: this.createDropHandler(appointmentDragging)
            }))
        }
    }, {
        key: "moveBack",
        value: function() {
            if (this.currentAppointment && void 0 !== this.initialPosition.left && void 0 !== this.initialPosition.top) {
                _translator2.default.move(this.currentAppointment, this.initialPosition)
            }
        }
    }]);
    return AppointmentDragBehavior
}();
exports.default = AppointmentDragBehavior;
module.exports = AppointmentDragBehavior;
