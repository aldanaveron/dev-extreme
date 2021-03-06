/**
 * DevExtreme (ui/scheduler/rendering_strategies/ui.scheduler.appointments.strategy.horizontal_month_line.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _uiSchedulerAppointmentsStrategy = require("./ui.scheduler.appointments.strategy.horizontal");
var _uiSchedulerAppointmentsStrategy2 = _interopRequireDefault(_uiSchedulerAppointmentsStrategy);
var _date = require("../../../core/utils/date");
var _date2 = _interopRequireDefault(_date);
var _query = require("../../../data/query");
var _query2 = _interopRequireDefault(_query);

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
var HOURS_IN_DAY = 24;
var MINUTES_IN_HOUR = 60;
var MILLISECONDS_IN_MINUTE = 6e4;
var ZERO_APPOINTMENT_DURATION_IN_DAYS = 1;
var HorizontalMonthLineRenderingStrategy = function(_HorizontalAppointmen) {
    _inherits(HorizontalMonthLineRenderingStrategy, _HorizontalAppointmen);
    var _super = _createSuper(HorizontalMonthLineRenderingStrategy);

    function HorizontalMonthLineRenderingStrategy() {
        _classCallCheck(this, HorizontalMonthLineRenderingStrategy);
        return _super.apply(this, arguments)
    }
    _createClass(HorizontalMonthLineRenderingStrategy, [{
        key: "calculateAppointmentWidth",
        value: function(appointment, position, isRecurring) {
            var startDate = _date2.default.trimTime(new Date(this.startDate(appointment, false, position)));
            var endDate = new Date(this.endDate(appointment, position, isRecurring, true));
            var cellWidth = this.getDefaultCellWidth() || this.getAppointmentMinSize();
            var duration = this._getDurationInDays(startDate, endDate);
            var width = this.cropAppointmentWidth(Math.ceil(duration) * cellWidth, cellWidth);
            return width
        }
    }, {
        key: "_getDurationInDays",
        value: function(startDate, endDate) {
            var adjustedDuration = this._adjustDurationByDaylightDiff(endDate.getTime() - startDate.getTime(), startDate, endDate);
            return adjustedDuration / _date2.default.dateToMilliseconds("day") || ZERO_APPOINTMENT_DURATION_IN_DAYS
        }
    }, {
        key: "getDeltaTime",
        value: function(args, initialSize) {
            return HOURS_IN_DAY * MINUTES_IN_HOUR * MILLISECONDS_IN_MINUTE * this._getDeltaWidth(args, initialSize)
        }
    }, {
        key: "isAllDay",
        value: function() {
            return false
        }
    }, {
        key: "createTaskPositionMap",
        value: function(items, skipSorting) {
            if (!skipSorting) {
                this.instance.getAppointmentsInstance()._sortAppointmentsByStartDate(items)
            }
            return _get(_getPrototypeOf(HorizontalMonthLineRenderingStrategy.prototype), "createTaskPositionMap", this).call(this, items)
        }
    }, {
        key: "_getSortedPositions",
        value: function(map, skipSorting) {
            var result = _get(_getPrototypeOf(HorizontalMonthLineRenderingStrategy.prototype), "_getSortedPositions", this).call(this, map);
            if (!skipSorting) {
                result = (0, _query2.default)(result).sortBy("top").thenBy("left").thenBy("cellPosition").thenBy("i").toArray()
            }
            return result
        }
    }, {
        key: "needCorrectAppointmentDates",
        value: function() {
            return false
        }
    }]);
    return HorizontalMonthLineRenderingStrategy
}(_uiSchedulerAppointmentsStrategy2.default);
module.exports = HorizontalMonthLineRenderingStrategy;
