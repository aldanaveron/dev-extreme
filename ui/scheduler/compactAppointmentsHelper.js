/**
 * DevExtreme (ui/scheduler/compactAppointmentsHelper.js)
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
exports.CompactAppointmentsHelper = void 0;
var _renderer = require("../../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _button = require("../button");
var _button2 = _interopRequireDefault(_button);
var _translator = require("../../animation/translator");
var _translator2 = _interopRequireDefault(_translator);
var _message = require("../../localization/message");
var _message2 = _interopRequireDefault(_message);
var _function_template = require("../../core/templates/function_template");
var _deferred = require("../../core/utils/deferred");
var _deferred2 = _interopRequireDefault(_deferred);
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
var APPOINTMENT_COLLECTOR_CLASS = "dx-scheduler-appointment-collector";
var COMPACT_APPOINTMENT_COLLECTOR_CLASS = APPOINTMENT_COLLECTOR_CLASS + "-compact";
var APPOINTMENT_COLLECTOR_CONTENT_CLASS = APPOINTMENT_COLLECTOR_CLASS + "-content";
var WEEK_VIEW_COLLECTOR_OFFSET = 5;
var COMPACT_THEME_WEEK_VIEW_COLLECTOR_OFFSET = 1;
var CompactAppointmentsHelper = exports.CompactAppointmentsHelper = function() {
    function CompactAppointmentsHelper(instance) {
        _classCallCheck(this, CompactAppointmentsHelper);
        this.instance = instance;
        this.elements = []
    }
    _createClass(CompactAppointmentsHelper, [{
        key: "render",
        value: function(options) {
            var isCompact = options.isCompact,
                items = options.items,
                buttonColor = options.buttonColor;
            var template = this._createTemplate(items.data.length, isCompact);
            var button = this._createCompactButton(template, options);
            var $button = button.$element();
            this._makeBackgroundColor($button, items.colors, buttonColor);
            this._makeBackgroundDarker($button);
            this.elements.push($button);
            $button.data("items", this._createAppointmentsData(items));
            return $button
        }
    }, {
        key: "clear",
        value: function() {
            this.elements.forEach(function(button) {
                button.detach();
                button.remove()
            });
            this.elements = []
        }
    }, {
        key: "_createAppointmentsData",
        value: function(items) {
            return items.data.map(function(item, index) {
                return {
                    data: item,
                    color: items.colors[index],
                    settings: items.settings[index]
                }
            })
        }
    }, {
        key: "_onButtonClick",
        value: function(e, options) {
            var $button = (0, _renderer2.default)(e.element);
            this.instance.showAppointmentTooltipCore($button, $button.data("items"), this._getExtraOptionsForTooltip(options))
        }
    }, {
        key: "_getExtraOptionsForTooltip",
        value: function(options) {
            return {
                clickEvent: this._clickEvent(options.onAppointmentClick).bind(this),
                dragBehavior: options.allowDrag && this._createTooltipDragBehavior(options).bind(this),
                dropDownAppointmentTemplate: this.instance.option().dropDownAppointmentTemplate,
                isButtonClick: true
            }
        }
    }, {
        key: "_clickEvent",
        value: function(onAppointmentClick) {
            var _this = this;
            return function(e) {
                var config = {
                    itemData: e.itemData.data,
                    itemElement: e.itemElement
                };
                var createClickEvent = (0, _extend.extendFromObject)(_this.instance.fire("mapAppointmentFields", config), e, false);
                delete createClickEvent.itemData;
                delete createClickEvent.itemIndex;
                delete createClickEvent.itemElement;
                onAppointmentClick(createClickEvent)
            }
        }
    }, {
        key: "_createTooltipDragBehavior",
        value: function(options) {
            var _this2 = this;
            return function(e) {
                var dragElement;
                var $element = (0, _renderer2.default)(e.element);
                var dragBehavior = _this2.instance.getWorkSpace().dragBehavior;
                dragBehavior.addTo($element, {
                    filter: ".".concat(_constants.LIST_ITEM_CLASS),
                    container: _this2.instance.$element().find(".".concat(_constants.FIXED_CONTAINER_CLASS)),
                    cursorOffset: function() {
                        var $dragElement = (0, _renderer2.default)(dragElement);
                        return {
                            x: $dragElement.width() / 2,
                            y: $dragElement.height() / 2
                        }
                    },
                    dragTemplate: function() {
                        return dragElement
                    },
                    onDragStart: function(e) {
                        var event = e.event;
                        var itemData = (0, _renderer2.default)(e.itemElement).data(_constants.LIST_ITEM_DATA_KEY);
                        if (itemData && !itemData.data.disabled) {
                            event.data = event.data || {};
                            event.data.itemElement = dragElement = _this2._createDragAppointment(itemData.data, itemData.settings);
                            dragBehavior.onDragStart(event.data);
                            _translator2.default.resetPosition((0, _renderer2.default)(dragElement))
                        }
                    },
                    onDragEnd: function(e) {
                        var itemData = (0, _renderer2.default)(e.itemElement).data(_constants.LIST_ITEM_DATA_KEY);
                        if (itemData && !itemData.data.disabled) {
                            dragBehavior.onDragEnd(e)
                        }
                    }
                })
            }
        }
    }, {
        key: "_createDragAppointment",
        value: function(itemData, settings) {
            var appointments = this.instance.getAppointmentsInstance();
            var appointmentIndex = appointments.option("items").length;
            settings.isCompact = false;
            settings.virtual = false;
            appointments._renderItem(appointmentIndex, {
                itemData: itemData,
                settings: [settings]
            });
            return appointments._findItemElementByItem(itemData)[0]
        }
    }, {
        key: "_getCollectorOffset",
        value: function(width, cellWidth) {
            return cellWidth - width - this._getCollectorRightOffset()
        }
    }, {
        key: "_getCollectorRightOffset",
        value: function() {
            return this.instance.getRenderingStrategyInstance()._isCompactTheme() ? COMPACT_THEME_WEEK_VIEW_COLLECTOR_OFFSET : WEEK_VIEW_COLLECTOR_OFFSET
        }
    }, {
        key: "_makeBackgroundDarker",
        value: function(button) {
            button.css("boxShadow", "inset ".concat(button.get(0).getBoundingClientRect().width, "px 0 0 0 rgba(0, 0, 0, 0.3)"))
        }
    }, {
        key: "_makeBackgroundColor",
        value: function($button, colors, color) {
            _deferred2.default.when.apply(null, colors).done(function() {
                this._makeBackgroundColorCore($button, color, arguments)
            }.bind(this))
        }
    }, {
        key: "_makeBackgroundColorCore",
        value: function($button, color, itemsColors) {
            var paintButton = true;
            var currentItemColor;
            color && color.done(function(color) {
                if (itemsColors.length) {
                    currentItemColor = itemsColors[0];
                    for (var i = 1; i < itemsColors.length; i++) {
                        if (currentItemColor !== itemsColors[i]) {
                            paintButton = false;
                            break
                        }
                        currentItemColor = color
                    }
                }
                color && paintButton && $button.css("backgroundColor", color)
            }.bind(this))
        }
    }, {
        key: "_setPosition",
        value: function(element, position) {
            _translator2.default.move(element, {
                top: position.top,
                left: position.left
            })
        }
    }, {
        key: "_createCompactButton",
        value: function(template, options) {
            var _this3 = this;
            var $button = this._createCompactButtonElement(options);
            return this.instance._createComponent($button, _button2.default, {
                type: "default",
                width: options.width,
                height: options.height,
                onClick: function(e) {
                    return _this3._onButtonClick(e, options)
                },
                template: this._renderTemplate(template, options.items, options.isCompact)
            })
        }
    }, {
        key: "_createCompactButtonElement",
        value: function(_ref) {
            var isCompact = _ref.isCompact,
                $container = _ref.$container,
                width = _ref.width,
                coordinates = _ref.coordinates,
                applyOffset = _ref.applyOffset,
                cellWidth = _ref.cellWidth;
            var result = (0, _renderer2.default)("<div>").addClass(APPOINTMENT_COLLECTOR_CLASS).toggleClass(COMPACT_APPOINTMENT_COLLECTOR_CLASS, isCompact).appendTo($container);
            var offset = applyOffset ? this._getCollectorOffset(width, cellWidth) : 0;
            this._setPosition(result, {
                top: coordinates.top,
                left: coordinates.left + offset
            });
            return result
        }
    }, {
        key: "_renderTemplate",
        value: function(template, items, isCompact) {
            return new _function_template.FunctionTemplate(function(options) {
                return template.render({
                    model: {
                        appointmentCount: items.data.length,
                        isCompact: isCompact
                    },
                    container: options.container
                })
            })
        }
    }, {
        key: "_createTemplate",
        value: function(count, isCompact) {
            this._initButtonTemplate(count, isCompact);
            return this.instance._getAppointmentTemplate("appointmentCollectorTemplate")
        }
    }, {
        key: "_initButtonTemplate",
        value: function(count, isCompact) {
            var _this4 = this;
            this.instance._templateManager.addDefaultTemplates({
                appointmentCollector: new _function_template.FunctionTemplate(function(options) {
                    return _this4._createButtonTemplate(count, (0, _renderer2.default)(options.container), isCompact)
                })
            })
        }
    }, {
        key: "_createButtonTemplate",
        value: function(appointmentCount, element, isCompact) {
            var text = isCompact ? appointmentCount : _message2.default.getFormatter("dxScheduler-moreAppointments")(appointmentCount);
            return element.append((0, _renderer2.default)("<span>").text(text)).addClass(APPOINTMENT_COLLECTOR_CONTENT_CLASS)
        }
    }]);
    return CompactAppointmentsHelper
}();
