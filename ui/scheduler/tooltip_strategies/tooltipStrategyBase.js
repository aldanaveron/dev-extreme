/**
 * DevExtreme (ui/scheduler/tooltip_strategies/tooltipStrategyBase.js)
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
exports.TooltipStrategyBase = void 0;
var _button = require("../../button");
var _button2 = _interopRequireDefault(_button);
var _function_template = require("../../../core/templates/function_template");
var _renderer = require("../../../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _uiList = require("../../list/ui.list.edit");
var _uiList2 = _interopRequireDefault(_uiList);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        })
    } else {
        obj[key] = value
    }
    return obj
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
var TOOLTIP_APPOINTMENT_ITEM = "dx-tooltip-appointment-item";
var TOOLTIP_APPOINTMENT_ITEM_CONTENT = TOOLTIP_APPOINTMENT_ITEM + "-content";
var TOOLTIP_APPOINTMENT_ITEM_CONTENT_SUBJECT = TOOLTIP_APPOINTMENT_ITEM + "-content-subject";
var TOOLTIP_APPOINTMENT_ITEM_CONTENT_DATE = TOOLTIP_APPOINTMENT_ITEM + "-content-date";
var TOOLTIP_APPOINTMENT_ITEM_MARKER = TOOLTIP_APPOINTMENT_ITEM + "-marker";
var TOOLTIP_APPOINTMENT_ITEM_MARKER_BODY = TOOLTIP_APPOINTMENT_ITEM + "-marker-body";
var TOOLTIP_APPOINTMENT_ITEM_DELETE_BUTTON_CONTAINER = TOOLTIP_APPOINTMENT_ITEM + "-delete-button-container";
var TOOLTIP_APPOINTMENT_ITEM_DELETE_BUTTON = TOOLTIP_APPOINTMENT_ITEM + "-delete-button";
var TooltipStrategyBase = exports.TooltipStrategyBase = function() {
    function TooltipStrategyBase(options) {
        _classCallCheck(this, TooltipStrategyBase);
        this._tooltip = null;
        this._options = options;
        this._extraOptions = null
    }
    _createClass(TooltipStrategyBase, [{
        key: "show",
        value: function(target, dataList, extraOptions) {
            if (this._canShowTooltip(dataList)) {
                this.hide();
                this._extraOptions = extraOptions;
                this._showCore(target, dataList)
            }
        }
    }, {
        key: "_showCore",
        value: function(target, dataList) {
            if (!this._tooltip) {
                this._tooltip = this._createTooltip(target, dataList)
            } else {
                this._shouldUseTarget() && this._tooltip.option("target", target);
                this._list.option("dataSource", dataList)
            }
            this._tooltip.option("visible", true)
        }
    }, {
        key: "_getContentTemplate",
        value: function(dataList) {
            var _this = this;
            return function(container) {
                var listElement = (0, _renderer2.default)("<div>");
                (0, _renderer2.default)(container).append(listElement);
                _this._list = _this._createList(listElement, dataList)
            }
        }
    }, {
        key: "isAlreadyShown",
        value: function(target) {
            if (this._tooltip && this._tooltip.option("visible")) {
                return this._tooltip.option("target")[0] === target[0]
            }
        }
    }, {
        key: "_onShown",
        value: function() {
            this._list.option("focusStateEnabled", this._extraOptions.focusStateEnabled)
        }
    }, {
        key: "dispose",
        value: function() {}
    }, {
        key: "hide",
        value: function() {
            if (this._tooltip) {
                this._tooltip.option("visible", false)
            }
        }
    }, {
        key: "_shouldUseTarget",
        value: function() {
            return true
        }
    }, {
        key: "_createTooltip",
        value: function() {}
    }, {
        key: "_canShowTooltip",
        value: function(dataList) {
            if (!dataList.length) {
                return false
            }
            return true
        }
    }, {
        key: "_createListOption",
        value: function(dataList) {
            var _this2 = this;
            return {
                dataSource: dataList,
                onContentReady: this._onListRender.bind(this),
                onItemClick: function(e) {
                    return _this2._onListItemClick(e)
                },
                itemTemplate: function(item, index) {
                    var currentData = item.settings && item.settings.targetedAppointmentData || item.currentData || item.data;
                    return _this2._renderTemplate(item.data, currentData, index, item.color)
                }
            }
        }
    }, {
        key: "_onListRender",
        value: function() {}
    }, {
        key: "_createTooltipElement",
        value: function(wrapperClass) {
            return (0, _renderer2.default)("<div>").appendTo(this._options.container).addClass(wrapperClass)
        }
    }, {
        key: "_createList",
        value: function(listElement, dataList) {
            return this._options.createComponent(listElement, _uiList2.default, this._createListOption(dataList))
        }
    }, {
        key: "_renderTemplate",
        value: function(data, currentData, index, color) {
            var itemListContent = this._createItemListContent(data, currentData, color);
            this._options.addDefaultTemplates(_defineProperty({}, this._getItemListTemplateName(), new _function_template.FunctionTemplate(function(options) {
                var $container = (0, _renderer2.default)(options.container);
                $container.append(itemListContent);
                return $container
            })));
            var template = this._options.getAppointmentTemplate(this._getItemListTemplateName() + "Template");
            return this._createFunctionTemplate(template, data, currentData, index)
        }
    }, {
        key: "_createFunctionTemplate",
        value: function(template, data, targetData, index) {
            var isEmptyDropDownAppointmentTemplate = this._isEmptyDropDownAppointmentTemplate();
            return new _function_template.FunctionTemplate(function(options) {
                return template.render({
                    model: isEmptyDropDownAppointmentTemplate ? {
                        appointmentData: data,
                        targetedAppointmentData: targetData
                    } : data,
                    container: options.container,
                    index: index
                })
            })
        }
    }, {
        key: "_getItemListTemplateName",
        value: function() {
            return this._isEmptyDropDownAppointmentTemplate() ? "appointmentTooltip" : "dropDownAppointment"
        }
    }, {
        key: "_isEmptyDropDownAppointmentTemplate",
        value: function() {
            return !this._extraOptions.dropDownAppointmentTemplate || "dropDownAppointment" === this._extraOptions.dropDownAppointmentTemplate
        }
    }, {
        key: "_onListItemClick",
        value: function(e) {
            this.hide();
            if (this._extraOptions.clickEvent) {
                this._extraOptions.clickEvent(e)
            }
            this._options.showAppointmentPopup(e.itemData.data, false, e.itemData.currentData)
        }
    }, {
        key: "_createItemListContent",
        value: function(data, currentData, color) {
            var editing = this._extraOptions.editing;
            var $itemElement = (0, _renderer2.default)("<div>").addClass(TOOLTIP_APPOINTMENT_ITEM);
            $itemElement.append(this._createItemListMarker(color));
            $itemElement.append(this._createItemListInfo(this._options.getTextAndFormatDate(data, currentData)));
            if (!data.disabled && (editing && true === editing.allowDeleting || true === editing)) {
                var singleAppointmentData = this._options.getSingleAppointmentData(data, this._tooltip.option("target"));
                $itemElement.append(this._createDeleteButton(data, singleAppointmentData))
            }
            return $itemElement
        }
    }, {
        key: "_createItemListMarker",
        value: function(color) {
            var $marker = (0, _renderer2.default)("<div>").addClass(TOOLTIP_APPOINTMENT_ITEM_MARKER);
            var $markerBody = (0, _renderer2.default)("<div>").addClass(TOOLTIP_APPOINTMENT_ITEM_MARKER_BODY);
            $marker.append($markerBody);
            color && color.done(function(value) {
                return $markerBody.css("background", value)
            });
            return $marker
        }
    }, {
        key: "_createItemListInfo",
        value: function(object) {
            var result = (0, _renderer2.default)("<div>").addClass(TOOLTIP_APPOINTMENT_ITEM_CONTENT);
            var $title = (0, _renderer2.default)("<div>").addClass(TOOLTIP_APPOINTMENT_ITEM_CONTENT_SUBJECT).text(object.text);
            var $date = (0, _renderer2.default)("<div>").addClass(TOOLTIP_APPOINTMENT_ITEM_CONTENT_DATE).text(object.formatDate);
            return result.append($title).append($date)
        }
    }, {
        key: "_createDeleteButton",
        value: function(data, currentData) {
            var _this3 = this;
            var $container = (0, _renderer2.default)("<div>").addClass(TOOLTIP_APPOINTMENT_ITEM_DELETE_BUTTON_CONTAINER);
            var $deleteButton = (0, _renderer2.default)("<div>").addClass(TOOLTIP_APPOINTMENT_ITEM_DELETE_BUTTON);
            $container.append($deleteButton);
            this._options.createComponent($deleteButton, _button2.default, {
                icon: "trash",
                stylingMode: "text",
                onClick: function(e) {
                    _this3.hide();
                    e.event.stopPropagation();
                    _this3._options.checkAndDeleteAppointment(data, currentData)
                }
            });
            return $container
        }
    }]);
    return TooltipStrategyBase
}();
