/**
 * DevExtreme (ui/scheduler/rendering_strategies/ui.scheduler.appointments.strategy.horizontal.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _uiSchedulerAppointmentsStrategy = require("./ui.scheduler.appointments.strategy.base");
var _uiSchedulerAppointmentsStrategy2 = _interopRequireDefault(_uiSchedulerAppointmentsStrategy);
var _date = require("../../../core/utils/date");
var _date2 = _interopRequireDefault(_date);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _typeof(obj) {
    "@babel/helpers - typeof";
    if ("function" === typeof Symbol && "symbol" === typeof Symbol.iterator) {
        _typeof = function(obj) {
            return typeof obj
        }
    } else {
        _typeof = function(obj) {
            return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
        }
    }
    return _typeof(obj)
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

function _get(target, property, receiver) {
    if ("undefined" !== typeof Reflect && Reflect.get) {
        _get = Reflect.get
    } else {
        _get = function(target, property, receiver) {
            var base = _superPropBase(target, property);
            if (!base) {
                return
            }
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
                return desc.get.call(receiver)
            }
            return desc.value
        }
    }
    return _get(target, property, receiver || target)
}

function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
        object = _getPrototypeOf(object);
        if (null === object) {
            break
        }
    }
    return object
}

function _createSuper(Derived) {
    return function() {
        var result, Super = _getPrototypeOf(Derived);
        if (_isNativeReflectConstruct()) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget)
        } else {
            result = Super.apply(this, arguments)
        }
        return _possibleConstructorReturn(this, result)
    }
}

function _possibleConstructorReturn(self, call) {
    if (call && ("object" === _typeof(call) || "function" === typeof call)) {
        return call
    }
    return _assertThisInitialized(self)
}

function _assertThisInitialized(self) {
    if (void 0 === self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
    }
    return self
}

function _isNativeReflectConstruct() {
    if ("undefined" === typeof Reflect || !Reflect.construct) {
        return false
    }
    if (Reflect.construct.sham) {
        return false
    }
    if ("function" === typeof Proxy) {
        return true
    }
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
        return true
    } catch (e) {
        return false
    }
}

function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function(o) {
        return o.__proto__ || Object.getPrototypeOf(o)
    };
    return _getPrototypeOf(o)
}

function _inherits(subClass, superClass) {
    if ("function" !== typeof superClass && null !== superClass) {
        throw new TypeError("Super expression must either be null or a function")
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) {
        _setPrototypeOf(subClass, superClass)
    }
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function(o, p) {
        o.__proto__ = p;
        return o
    };
    return _setPrototypeOf(o, p)
}
var MAX_APPOINTMENT_HEIGHT = 100;
var DEFAULT_APPOINTMENT_HEIGHT = 60;
var MIN_APPOINTMENT_HEIGHT = 35;
var DROP_DOWN_BUTTON_OFFSET = 2;
var BOTTOM_CELL_GAP = 20;
var toMs = _date2.default.dateToMilliseconds;
var HorizontalRenderingStrategy = function(_BaseAppointmentsStra) {
    _inherits(HorizontalRenderingStrategy, _BaseAppointmentsStra);
    var _super = _createSuper(HorizontalRenderingStrategy);

    function HorizontalRenderingStrategy() {
        _classCallCheck(this, HorizontalRenderingStrategy);
        return _super.apply(this, arguments)
    }
    _createClass(HorizontalRenderingStrategy, [{
        key: "_needVerifyItemSize",
        value: function() {
            return true
        }
    }, {
        key: "calculateAppointmentWidth",
        value: function(appointment, position, isRecurring) {
            var cellWidth = this.getDefaultCellWidth() || this.getAppointmentMinSize();
            var allDay = this.instance.fire("getField", "allDay", appointment);
            var startDate = this.startDate(appointment, false, position);
            var endDate = this.endDate(appointment, position, isRecurring, false);
            var appointmentDuration = this._getAppointmentDurationInMs(startDate, endDate, allDay);
            appointmentDuration = this._adjustDurationByDaylightDiff(appointmentDuration, startDate, endDate);
            var cellDuration = this.instance.getAppointmentDurationInMinutes() * toMs("minute");
            var durationInCells = appointmentDuration / cellDuration;
            var width = this.cropAppointmentWidth(durationInCells * cellWidth, cellWidth);
            return width
        }
    }, {
        key: "_needAdjustDuration",
        value: function(diff) {
            return diff < 0
        }
    }, {
        key: "getAppointmentGeometry",
        value: function(coordinates) {
            var result = this._customizeAppointmentGeometry(coordinates);
            return _get(_getPrototypeOf(HorizontalRenderingStrategy.prototype), "getAppointmentGeometry", this).call(this, result)
        }
    }, {
        key: "_customizeAppointmentGeometry",
        value: function(coordinates) {
            var overlappingMode = this.instance.fire("getMaxAppointmentsPerCell");
            if (overlappingMode) {
                var config = this._calculateGeometryConfig(coordinates);
                return this._customizeCoordinates(coordinates, config.height, config.appointmentCountPerCell, config.offset)
            } else {
                var cellHeight = (this.getDefaultCellHeight() || this.getAppointmentMinSize()) - BOTTOM_CELL_GAP;
                var height = cellHeight / coordinates.count;
                if (height > MAX_APPOINTMENT_HEIGHT) {
                    height = MAX_APPOINTMENT_HEIGHT
                }
                var top = coordinates.top + coordinates.index * height;
                return {
                    height: height,
                    width: coordinates.width,
                    top: top,
                    left: coordinates.left
                }
            }
        }
    }, {
        key: "_getOffsets",
        value: function() {
            return {
                unlimited: 0,
                auto: 0
            }
        }
    }, {
        key: "_checkLongCompactAppointment",
        value: function(item, result) {
            var overlappingMode = this.instance.fire("getMaxAppointmentsPerCell");
            if (overlappingMode) {
                this._splitLongCompactAppointment(item, result);
                return result
            }
        }
    }, {
        key: "_getCompactLeftCoordinate",
        value: function(itemLeft, index) {
            var cellWidth = this.getDefaultCellWidth() || this.getAppointmentMinSize();
            return itemLeft + cellWidth * index
        }
    }, {
        key: "_getMaxHeight",
        value: function() {
            return this.getDefaultCellHeight() || this.getAppointmentMinSize()
        }
    }, {
        key: "_getAppointmentCount",
        value: function(overlappingMode, coordinates) {
            return this._getMaxAppointmentCountPerCellByType(false)
        }
    }, {
        key: "_getAppointmentDefaultHeight",
        value: function() {
            return DEFAULT_APPOINTMENT_HEIGHT
        }
    }, {
        key: "_getAppointmentMinHeight",
        value: function() {
            return MIN_APPOINTMENT_HEIGHT
        }
    }, {
        key: "_sortCondition",
        value: function(a, b) {
            return this._columnCondition(a, b)
        }
    }, {
        key: "_getOrientation",
        value: function() {
            return ["left", "right", "top"]
        }
    }, {
        key: "_getMaxAppointmentWidth",
        value: function(startDate) {
            return this.instance.fire("getMaxAppointmentWidth", {
                date: startDate
            })
        }
    }, {
        key: "getDropDownAppointmentWidth",
        value: function() {
            return this.getDefaultCellWidth() - 2 * DROP_DOWN_BUTTON_OFFSET
        }
    }, {
        key: "getDeltaTime",
        value: function(args, initialSize) {
            var deltaTime = 0;
            var deltaWidth = args.width - initialSize.width;
            deltaTime = toMs("minute") * Math.round(deltaWidth / this.getDefaultCellWidth() * this.instance.getAppointmentDurationInMinutes());
            return deltaTime
        }
    }, {
        key: "isAllDay",
        value: function(appointmentData) {
            return this.instance.fire("getField", "allDay", appointmentData)
        }
    }, {
        key: "needSeparateAppointment",
        value: function() {
            return this.instance.fire("isGroupedByDate")
        }
    }]);
    return HorizontalRenderingStrategy
}(_uiSchedulerAppointmentsStrategy2.default);
module.exports = HorizontalRenderingStrategy;
