/**
 * DevExtreme (viz/series/points/range_bar_point.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var noop = require("../../../core/utils/common").noop;
var extend = require("../../../core/utils/extend").extend;
var barPoint = require("./bar_point");
var rangeSymbolPointMethods = require("./range_symbol_point");
var _extend = extend;
module.exports = _extend({}, barPoint, {
    deleteLabel: rangeSymbolPointMethods.deleteLabel,
    _getFormatObject: rangeSymbolPointMethods._getFormatObject,
    clearVisibility: function() {
        var graphic = this.graphic;
        if (graphic && graphic.attr("visibility")) {
            graphic.attr({
                visibility: null
            })
        }
    },
    setInvisibility: function() {
        var graphic = this.graphic;
        if (graphic && "hidden" !== graphic.attr("visibility")) {
            graphic.attr({
                visibility: "hidden"
            })
        }
        this._topLabel.draw(false);
        this._bottomLabel.draw(false)
    },
    getTooltipParams: function(location) {
        var that = this;
        var edgeLocation = "edge" === location;
        var x;
        var y;
        if (that._options.rotated) {
            x = edgeLocation ? that.x + that.width : that.x + that.width / 2;
            y = that.y + that.height / 2
        } else {
            x = that.x + that.width / 2;
            y = edgeLocation ? that.y : that.y + that.height / 2
        }
        return {
            x: x,
            y: y,
            offset: 0
        }
    },
    _translate: function() {
        var that = this;
        var barMethods = barPoint;
        barMethods._translate.call(that);
        if (that._options.rotated) {
            that.width = that.width || 1
        } else {
            that.height = that.height || 1
        }
    },
    hasCoords: rangeSymbolPointMethods.hasCoords,
    _updateData: rangeSymbolPointMethods._updateData,
    _getLabelPosition: rangeSymbolPointMethods._getLabelPosition,
    _getLabelMinFormatObject: rangeSymbolPointMethods._getLabelMinFormatObject,
    _updateLabelData: rangeSymbolPointMethods._updateLabelData,
    _updateLabelOptions: rangeSymbolPointMethods._updateLabelOptions,
    getCrosshairData: rangeSymbolPointMethods.getCrosshairData,
    _createLabel: rangeSymbolPointMethods._createLabel,
    _checkOverlay: rangeSymbolPointMethods._checkOverlay,
    _checkLabelsOverlay: rangeSymbolPointMethods._checkLabelsOverlay,
    _getOverlayCorrections: rangeSymbolPointMethods._getOverlayCorrections,
    _drawLabel: rangeSymbolPointMethods._drawLabel,
    _getLabelCoords: rangeSymbolPointMethods._getLabelCoords,
    getLabel: rangeSymbolPointMethods.getLabel,
    getLabels: rangeSymbolPointMethods.getLabels,
    getBoundingRect: noop,
    getMinValue: rangeSymbolPointMethods.getMinValue,
    getMaxValue: rangeSymbolPointMethods.getMaxValue
});
