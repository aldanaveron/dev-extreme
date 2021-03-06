/**
 * DevExtreme (viz/translators/logarithmic_translator.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var vizUtils = require("../core/utils");
var isDefined = require("../../core/utils/type").isDefined;
var raiseTo = vizUtils.raiseToExt;
var getLog = vizUtils.getLogExt;
module.exports = {
    _fromValue: function(value) {
        return null !== value ? getLog(value, this._canvasOptions.base, this._businessRange.allowNegatives, this._businessRange.linearThreshold) : value
    },
    _toValue: function(value) {
        return null !== value ? raiseTo(value, this._canvasOptions.base, this._businessRange.allowNegatives, this._businessRange.linearThreshold) : value
    },
    getMinBarSize: function(minBarSize) {
        var visibleArea = this.getCanvasVisibleArea();
        var minValue = this.from(visibleArea.min + minBarSize);
        var canvasOptions = this._canvasOptions;
        return Math.pow(canvasOptions.base, canvasOptions.rangeMinVisible + this._fromValue(this.from(visibleArea.min)) - this._fromValue(!isDefined(minValue) ? this.from(visibleArea.max) : minValue))
    },
    checkMinBarSize: function(initialValue, minShownValue, stackValue) {
        var canvasOptions = this._canvasOptions;
        var prevValue = stackValue - initialValue;
        var baseMethod = this.constructor.prototype.checkMinBarSize;
        var minBarSize;
        var updateValue;
        if (isDefined(minShownValue) && prevValue > 0) {
            minBarSize = baseMethod(this._fromValue(stackValue / prevValue), this._fromValue(minShownValue) - canvasOptions.rangeMinVisible);
            updateValue = Math.pow(canvasOptions.base, this._fromValue(prevValue) + minBarSize) - prevValue
        } else {
            updateValue = baseMethod(initialValue, minShownValue)
        }
        return updateValue
    }
};
