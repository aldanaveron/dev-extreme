/**
 * DevExtreme (ui/number_box/number_box.base.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var $ = require("../../core/renderer");
var domAdapter = require("../../core/dom_adapter");
var eventsEngine = require("../../events/core/events_engine");
var commonUtils = require("../../core/utils/common");
var typeUtils = require("../../core/utils/type");
var mathUtils = require("../../core/utils/math");
var extend = require("../../core/utils/extend").extend;
var inArray = require("../../core/utils/array").inArray;
var devices = require("../../core/devices");
var browser = require("../../core/utils/browser");
var TextEditor = require("../text_box/ui.text_editor");
var eventUtils = require("../../events/utils");
var SpinButtons = require("./number_box.spins").default;
var messageLocalization = require("../../localization/message");
var Deferred = require("../../core/utils/deferred").Deferred;
var math = Math;
var WIDGET_CLASS = "dx-numberbox";
var FIREFOX_CONTROL_KEYS = ["tab", "del", "backspace", "leftArrow", "rightArrow", "home", "end", "enter"];
var FORCE_VALUECHANGE_EVENT_NAMESPACE = "NumberBoxForceValueChange";
var NumberBoxBase = TextEditor.inherit({
    _supportedKeys: function() {
        return extend(this.callBase(), {
            upArrow: function(e) {
                e.preventDefault();
                e.stopPropagation();
                this._spinUpChangeHandler(e)
            },
            downArrow: function(e) {
                e.preventDefault();
                e.stopPropagation();
                this._spinDownChangeHandler(e)
            },
            enter: function() {}
        })
    },
    _getDefaultOptions: function() {
        return extend(this.callBase(), {
            value: 0,
            min: void 0,
            max: void 0,
            step: 1,
            showSpinButtons: false,
            useLargeSpinButtons: true,
            mode: "text",
            invalidValueMessage: messageLocalization.format("dxNumberBox-invalidValueMessage"),
            buttons: void 0
        })
    },
    _getDefaultButtons: function() {
        return this.callBase().concat([{
            name: "spins",
            Ctor: SpinButtons
        }])
    },
    _isSupportInputMode: function() {
        var version = parseFloat(browser.version);
        return browser.chrome && version >= 66 || browser.safari && version >= 12 || browser.msie && version >= 75
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: function() {
                return devices.real().generic && !devices.isSimulator()
            },
            options: {
                useLargeSpinButtons: false
            }
        }, {
            device: function() {
                return "desktop" !== devices.real().deviceType && !this._isSupportInputMode()
            }.bind(this),
            options: {
                mode: "number"
            }
        }])
    },
    _initMarkup: function() {
        this._renderSubmitElement();
        this.$element().addClass(WIDGET_CLASS);
        this.callBase()
    },
    _applyInputAttributes: function($input, customAttributes) {
        $input.attr("inputmode", "decimal");
        this.callBase($input, customAttributes)
    },
    _renderContentImpl: function() {
        this.option("isValid") && this._validateValue(this.option("value"));
        this.setAria("role", "spinbutton")
    },
    _renderSubmitElement: function() {
        this._$submitElement = $("<input>").attr("type", "hidden").appendTo(this.$element());
        this._setSubmitValue(this.option("value"))
    },
    _setSubmitValue: function(value) {
        this._getSubmitElement().val(commonUtils.applyServerDecimalSeparator(value))
    },
    _getSubmitElement: function() {
        return this._$submitElement
    },
    _keyPressHandler: function(e) {
        this.callBase(e);
        var char = eventUtils.getChar(e);
        var validCharRegExp = /[\d.,eE\-+]|Subtract/;
        var isInputCharValid = validCharRegExp.test(char);
        if (!isInputCharValid) {
            var keyName = eventUtils.normalizeKeyName(e);
            if (e.metaKey || e.ctrlKey || keyName && inArray(keyName, FIREFOX_CONTROL_KEYS) >= 0) {
                return
            }
            e.preventDefault();
            return false
        }
        this._keyPressed = true
    },
    _onMouseWheel: function(dxEvent) {
        dxEvent.delta > 0 ? this._spinValueChange(1, dxEvent) : this._spinValueChange(-1, dxEvent)
    },
    _renderValue: function() {
        var inputValue = this._input().val();
        var value = this.option("value");
        if (!inputValue.length || Number(inputValue) !== value) {
            this._forceValueRender();
            this._toggleEmptinessEventHandler()
        }
        var valueText = typeUtils.isDefined(value) ? null : messageLocalization.format("dxNumberBox-noDataText");
        this.setAria({
            valuenow: commonUtils.ensureDefined(value, ""),
            valuetext: valueText
        });
        this.option("text", this._input().val());
        this._updateButtons();
        return (new Deferred).resolve()
    },
    _forceValueRender: function() {
        var value = this.option("value");
        var number = Number(value);
        var formattedValue = isNaN(number) ? "" : this._applyDisplayValueFormatter(value);
        this._renderDisplayText(formattedValue)
    },
    _applyDisplayValueFormatter: function(value) {
        return this.option("displayValueFormatter")(value)
    },
    _renderProps: function() {
        this.callBase();
        this._input().prop({
            min: this.option("min"),
            max: this.option("max"),
            step: this.option("step")
        });
        this.setAria({
            valuemin: commonUtils.ensureDefined(this.option("min"), ""),
            valuemax: commonUtils.ensureDefined(this.option("max"), "")
        })
    },
    _spinButtonsPointerDownHandler: function() {
        var $input = this._input();
        if (!this.option("useLargeSpinButtons") && domAdapter.getActiveElement() !== $input[0]) {
            eventsEngine.trigger($input, "focus")
        }
    },
    _spinUpChangeHandler: function(e) {
        if (!this.option("readOnly")) {
            this._spinValueChange(1, e.event || e)
        }
    },
    _spinDownChangeHandler: function(e) {
        if (!this.option("readOnly")) {
            this._spinValueChange(-1, e.event || e)
        }
    },
    _spinValueChange: function(sign, dxEvent) {
        var step = parseFloat(this.option("step"));
        if (0 === step) {
            return
        }
        var value = parseFloat(this._normalizeInputValue()) || 0;
        value = this._correctRounding(value, step * sign);
        var min = this.option("min");
        var max = this.option("max");
        if (void 0 !== min) {
            value = Math.max(min, value)
        }
        if (void 0 !== max) {
            value = Math.min(max, value)
        }
        this._saveValueChangeEvent(dxEvent);
        this.option("value", value)
    },
    _correctRounding: function(value, step) {
        var regex = /[,.](.*)/;
        var isFloatValue = regex.test(value);
        var isFloatStep = regex.test(step);
        if (isFloatValue || isFloatStep) {
            var valueAccuracy = isFloatValue ? regex.exec(value)[0].length : 0;
            var stepAccuracy = isFloatStep ? regex.exec(step)[0].length : 0;
            var accuracy = math.max(valueAccuracy, stepAccuracy);
            value = this._round(value + step, accuracy);
            return value
        }
        return value + step
    },
    _round: function(value, precision) {
        precision = precision || 0;
        var multiplier = Math.pow(10, precision);
        value *= multiplier;
        value = Math.round(value) / multiplier;
        return value
    },
    _renderValueChangeEvent: function() {
        this.callBase();
        var forceValueChangeEvent = eventUtils.addNamespace("focusout", FORCE_VALUECHANGE_EVENT_NAMESPACE);
        eventsEngine.off(this.element(), forceValueChangeEvent);
        eventsEngine.on(this.element(), forceValueChangeEvent, this._forceRefreshInputValue.bind(this))
    },
    _forceRefreshInputValue: function() {
        if ("number" === this.option("mode")) {
            return
        }
        var $input = this._input();
        var formattedValue = this._applyDisplayValueFormatter(this.option("value"));
        $input.val(null);
        $input.val(formattedValue)
    },
    _valueChangeEventHandler: function(e) {
        var $input = this._input();
        var inputValue = this._normalizeText();
        var value = this._parseValue(inputValue);
        var valueHasDigits = "." !== inputValue && "-" !== inputValue;
        if (this._isValueValid() && !this._validateValue(value)) {
            $input.val(this._applyDisplayValueFormatter(value));
            return
        }
        if (valueHasDigits) {
            this.callBase(e, isNaN(value) ? null : value)
        }
        this._applyValueBoundaries(inputValue, value);
        this.validationRequest.fire({
            value: value,
            editor: this
        })
    },
    _applyValueBoundaries: function(inputValue, parsedValue) {
        var isValueIncomplete = this._isValueIncomplete(inputValue);
        var isValueCorrect = this._isValueInRange(inputValue);
        if (!isValueIncomplete && !isValueCorrect && null !== parsedValue) {
            if (Number(inputValue) !== parsedValue) {
                this._input().val(this._applyDisplayValueFormatter(parsedValue))
            }
        }
    },
    _replaceCommaWithPoint: function(value) {
        return value.replace(",", ".")
    },
    _inputIsInvalid: function() {
        var isNumberMode = "number" === this.option("mode");
        var validityState = this._input().get(0).validity;
        return isNumberMode && validityState && validityState.badInput
    },
    _renderDisplayText: function(text) {
        if (this._inputIsInvalid()) {
            return
        }
        this.callBase(text)
    },
    _isValueIncomplete: function(value) {
        var incompleteRegex = /(^-$)|(^-?\d*\.$)|(\d+e-?$)/i;
        return incompleteRegex.test(value)
    },
    _isValueInRange: function(value) {
        return mathUtils.inRange(value, this.option("min"), this.option("max"))
    },
    _isNumber: function(value) {
        return null !== this._parseValue(value)
    },
    _validateValue: function(value) {
        var inputValue = this._normalizeText();
        var isValueValid = this._isValueValid();
        var isValid = true;
        var isNumber = this._isNumber(inputValue);
        if (isNaN(Number(value))) {
            isValid = false
        }
        if (!value && isValueValid) {
            isValid = true
        } else {
            if (!isNumber && !isValueValid) {
                isValid = false
            }
        }
        this.option({
            isValid: isValid,
            validationError: isValid ? null : {
                editorSpecific: true,
                message: this.option("invalidValueMessage")
            }
        });
        return isValid
    },
    _normalizeInputValue: function() {
        return this._parseValue(this._normalizeText())
    },
    _normalizeText: function() {
        var value = this._input().val().trim();
        return this._replaceCommaWithPoint(value)
    },
    _parseValue: function(value) {
        var number = parseFloat(value);
        if (isNaN(number)) {
            return null
        }
        return mathUtils.fitIntoRange(number, this.option("min"), this.option("max"))
    },
    _clearValue: function() {
        if (this._inputIsInvalid()) {
            this._input().val("");
            this._validateValue()
        }
        this.callBase()
    },
    reset: function() {
        if (null === this.option("value")) {
            this.option("text", "");
            this._renderValue()
        } else {
            this.option("value", null)
        }
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "value":
                this._validateValue(args.value);
                this._setSubmitValue(args.value);
                this.callBase(args);
                this._resumeValueChangeAction();
                break;
            case "step":
                this._renderProps();
                break;
            case "min":
            case "max":
                this._renderProps();
                this.option("value", this._parseValue(this.option("value")));
                break;
            case "showSpinButtons":
            case "useLargeSpinButtons":
                this._updateButtons(["spins"]);
                break;
            case "invalidValueMessage":
                break;
            default:
                this.callBase(args)
        }
    }
});
module.exports = NumberBoxBase;
