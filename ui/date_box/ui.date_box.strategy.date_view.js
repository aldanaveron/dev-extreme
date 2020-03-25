/**
 * DevExtreme (ui/date_box/ui.date_box.strategy.date_view.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var $ = require("../../core/renderer");
var window = require("../../core/utils/window").getWindow();
var DateView = require("./ui.date_view");
var DateBoxStrategy = require("./ui.date_box.strategy");
var support = require("../../core/utils/support");
var extend = require("../../core/utils/extend").extend;
var dateUtils = require("./ui.date_utils");
var messageLocalization = require("../../localization/message");
var DateViewStrategy = DateBoxStrategy.inherit({
    NAME: "DateView",
    getDefaultOptions: function() {
        return extend(this.callBase(), {
            openOnFieldClick: true,
            applyButtonText: messageLocalization.format("OK")
        })
    },
    getDisplayFormat: function(displayFormat) {
        return displayFormat || dateUtils.FORMATS_MAP[this.dateBox.option("type")]
    },
    popupConfig: function(config) {
        return {
            showTitle: true,
            toolbarItems: this.dateBox._popupToolbarItemsConfig(),
            onInitialized: config.onInitialized,
            defaultOptionsRules: [{
                device: {
                    platform: "android"
                },
                options: {
                    width: 333,
                    height: 331
                }
            }, {
                device: function(_device) {
                    var platform = _device.platform;
                    return "generic" === platform || "ios" === platform
                },
                options: {
                    width: "auto",
                    height: "auto"
                }
            }, {
                device: function(_device2) {
                    var platform = _device2.platform;
                    var phone = _device2.phone;
                    return "generic" === platform && phone
                },
                options: {
                    width: 333,
                    maxWidth: "100%",
                    maxHeight: "100%",
                    height: "auto",
                    position: {
                        collision: "flipfit flip"
                    }
                }
            }, {
                device: {
                    platform: "ios",
                    phone: true
                },
                options: {
                    width: "100%",
                    position: {
                        my: "bottom",
                        at: "bottom",
                        of: window
                    }
                }
            }]
        }
    },
    _renderWidget: function() {
        if (support.inputType(this.dateBox.option("mode")) && this.dateBox._isNativeType() || this.dateBox.option("readOnly")) {
            if (this._widget) {
                this._widget.$element().remove();
                this._widget = null
            }
            return
        }
        var popup = this._getPopup();
        if (this._widget) {
            this._widget.option(this._getWidgetOptions())
        } else {
            var element = $("<div>").appendTo(popup.$content());
            this._widget = this._createWidget(element)
        }
        this._widget.$element().appendTo(this._getWidgetContainer())
    },
    _getWidgetName: function() {
        return DateView
    },
    renderOpenedState: function() {
        this.callBase();
        if (this._widget) {
            this._widget.option("value", this._widget._getCurrentDate())
        }
    },
    _getWidgetOptions: function() {
        return {
            value: this.dateBoxValue() || new Date,
            type: this.dateBox.option("type"),
            minDate: this.dateBox.dateOption("min") || new Date(1900, 0, 1),
            maxDate: this.dateBox.dateOption("max") || new Date(Date.now() + 50 * dateUtils.ONE_YEAR),
            onDisposing: function() {
                this._widget = null
            }.bind(this)
        }
    }
});
module.exports = DateViewStrategy;
