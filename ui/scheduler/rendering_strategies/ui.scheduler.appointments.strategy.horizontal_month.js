/**
 * DevExtreme (ui/scheduler/rendering_strategies/ui.scheduler.appointments.strategy.horizontal_month.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _uiSchedulerAppointmentsStrategy = require("./ui.scheduler.appointments.strategy.horizontal_month_line");
var _uiSchedulerAppointmentsStrategy2 = _interopRequireDefault(_uiSchedulerAppointmentsStrategy);
var _extend = require("../../../core/utils/extend");

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
var MONTH_APPOINTMENT_HEIGHT_RATIO = .6;
var MONTH_APPOINTMENT_MIN_OFFSET = 26;
var MONTH_APPOINTMENT_MAX_OFFSET = 30;
var MONTH_DROPDOWN_APPOINTMENT_MIN_RIGHT_OFFSET = 36;
var MONTH_DROPDOWN_APPOINTMENT_MAX_RIGHT_OFFSET = 60;
var HorizontalMonthRenderingStrategy = function(_HorizontalMonthLineA) {
    _inherits(HorizontalMonthRenderingStrategy, _HorizontalMonthLineA);
    var _super = _createSuper(HorizontalMonthRenderingStrategy);

    function HorizontalMonthRenderingStrategy() {
        _classCallCheck(this, HorizontalMonthRenderingStrategy);
        return _super.apply(this, arguments)
    }
    _createClass(HorizontalMonthRenderingStrategy, [{
        key: "_getAppointmentParts",
        value: function(appointmentGeometry, appointmentSettings, startDate) {
            var deltaWidth = appointmentGeometry.sourceAppointmentWidth - appointmentGeometry.reducedWidth;
            var height = appointmentGeometry.height;
            var fullWeekAppointmentWidth = this._getFullWeekAppointmentWidth(appointmentSettings.groupIndex);
            var maxAppointmentWidth = this._getMaxAppointmentWidth(startDate);
            var longPartCount = Math.ceil(deltaWidth / fullWeekAppointmentWidth) - 1;
            var tailWidth = Math.floor(deltaWidth % fullWeekAppointmentWidth) || fullWeekAppointmentWidth;
            var result = [];
            var totalWidth = appointmentGeometry.reducedWidth + tailWidth;
            var currentPartTop = appointmentSettings.top + this.getDefaultCellHeight();
            var left = this._calculateMultiWeekAppointmentLeftOffset(appointmentSettings.hMax, fullWeekAppointmentWidth);
            if ("vertical" === this.instance._groupOrientation) {
                left += this.instance.fire("getWorkSpaceDateTableOffset")
            }
            for (var i = 0; i < longPartCount; i++) {
                if (totalWidth > maxAppointmentWidth) {
                    break
                }
                result.push((0, _extend.extend)(true, {}, appointmentSettings, {
                    top: currentPartTop,
                    left: left,
                    height: height,
                    width: fullWeekAppointmentWidth,
                    appointmentReduced: "body",
                    rowIndex: ++appointmentSettings.rowIndex,
                    cellIndex: 0
                }));
                currentPartTop += this.getDefaultCellHeight();
                totalWidth += fullWeekAppointmentWidth
            }
            if (tailWidth) {
                if (this._isRtl()) {
                    left += fullWeekAppointmentWidth - tailWidth
                }
                result.push((0, _extend.extend)(true, {}, appointmentSettings, {
                    top: currentPartTop,
                    left: left,
                    height: height,
                    width: tailWidth,
                    appointmentReduced: "tail",
                    rowIndex: ++appointmentSettings.rowIndex,
                    cellIndex: 0
                }))
            }
            return result
        }
    }, {
        key: "_calculateMultiWeekAppointmentLeftOffset",
        value: function(max, width) {
            return this._isRtl() ? max : max - width
        }
    }, {
        key: "_getFullWeekAppointmentWidth",
        value: function(groupIndex) {
            this._maxFullWeekAppointmentWidth = this.instance.fire("getFullWeekAppointmentWidth", {
                groupIndex: groupIndex
            });
            return this._maxFullWeekAppointmentWidth
        }
    }, {
        key: "_getAppointmentDefaultHeight",
        value: function() {
            return this._getAppointmentHeightByTheme()
        }
    }, {
        key: "_getAppointmentMinHeight",
        value: function() {
            return this._getAppointmentDefaultHeight()
        }
    }, {
        key: "_checkLongCompactAppointment",
        value: function(item, result) {
            this._splitLongCompactAppointment(item, result);
            return result
        }
    }, {
        key: "_columnCondition",
        value: function(a, b) {
            var conditions = this._getConditions(a, b);
            return conditions.rowCondition || conditions.columnCondition || conditions.cellPositionCondition
        }
    }, {
        key: "createTaskPositionMap",
        value: function(items) {
            return _get(_getPrototypeOf(HorizontalMonthRenderingStrategy.prototype), "createTaskPositionMap", this).call(this, items, true)
        }
    }, {
        key: "_getSortedPositions",
        value: function(map) {
            return _get(_getPrototypeOf(HorizontalMonthRenderingStrategy.prototype), "_getSortedPositions", this).call(this, map, true)
        }
    }, {
        key: "_customizeAppointmentGeometry",
        value: function(coordinates) {
            var config = this._calculateGeometryConfig(coordinates);
            return this._customizeCoordinates(coordinates, config.height, config.appointmentCountPerCell, config.offset)
        }
    }, {
        key: "_getDefaultRatio",
        value: function() {
            return MONTH_APPOINTMENT_HEIGHT_RATIO
        }
    }, {
        key: "_getOffsets",
        value: function() {
            return {
                unlimited: MONTH_APPOINTMENT_MIN_OFFSET,
                auto: MONTH_APPOINTMENT_MAX_OFFSET
            }
        }
    }, {
        key: "getDropDownAppointmentWidth",
        value: function(intervalCount) {
            if (this.instance.fire("isAdaptive")) {
                return this.getDropDownButtonAdaptiveSize()
            }
            var offset = intervalCount > 1 ? MONTH_DROPDOWN_APPOINTMENT_MAX_RIGHT_OFFSET : MONTH_DROPDOWN_APPOINTMENT_MIN_RIGHT_OFFSET;
            return this.getDefaultCellWidth() - offset
        }
    }, {
        key: "needCorrectAppointmentDates",
        value: function() {
            return false
        }
    }, {
        key: "_needVerticalGroupBounds",
        value: function() {
            return false
        }
    }, {
        key: "_needHorizontalGroupBounds",
        value: function() {
            return true
        }
    }]);
    return HorizontalMonthRenderingStrategy
}(_uiSchedulerAppointmentsStrategy2.default);
module.exports = HorizontalMonthRenderingStrategy;
