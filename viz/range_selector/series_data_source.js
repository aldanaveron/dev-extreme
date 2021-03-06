/**
 * DevExtreme (viz/range_selector/series_data_source.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var seriesModule = require("../series/base_series");
var seriesFamilyModule = require("../core/series_family");
var typeUtils = require("../../core/utils/type");
var extend = require("../../core/utils/extend").extend;
var inArray = require("../../core/utils/array").inArray;
var each = require("../../core/utils/iterator").each;
var vizUtils = require("../core/utils");
var rangeModule = require("../translators/range");
var dataValidatorModule = require("../components/data_validator");
var ChartThemeManager = require("../components/chart_theme_manager").ThemeManager;
var SeriesDataSource;
var createThemeManager = function(chartOptions) {
    return new ChartThemeManager({
        options: chartOptions,
        themeSection: "rangeSelector.chart",
        fontFields: ["commonSeriesSettings.label.font"]
    })
};
var processSeriesFamilies = function(series, equalBarWidth, minBubbleSize, maxBubbleSize, barOptions, negativesAsZeroes) {
    var families = [];
    var types = [];
    each(series, function(i, item) {
        if (inArray(item.type, types) === -1) {
            types.push(item.type)
        }
    });
    each(types, function(_, type) {
        var family = new seriesFamilyModule.SeriesFamily({
            type: type,
            equalBarWidth: equalBarWidth,
            minBubbleSize: minBubbleSize,
            maxBubbleSize: maxBubbleSize,
            barWidth: barOptions.barWidth,
            barGroupPadding: barOptions.barGroupPadding,
            barGroupWidth: barOptions.barGroupWidth,
            negativesAsZeroes: negativesAsZeroes
        });
        family.add(series);
        family.adjustSeriesValues();
        families.push(family)
    });
    return families
};
SeriesDataSource = function(options) {
    var that = this;
    var themeManager = that._themeManager = createThemeManager(options.chart);
    var topIndent;
    var bottomIndent;
    themeManager.setTheme(options.chart.theme);
    topIndent = themeManager.getOptions("topIndent");
    bottomIndent = themeManager.getOptions("bottomIndent");
    that._indent = {
        top: topIndent >= 0 && topIndent < 1 ? topIndent : 0,
        bottom: bottomIndent >= 0 && bottomIndent < 1 ? bottomIndent : 0
    };
    that._valueAxis = themeManager.getOptions("valueAxisRangeSelector") || {};
    that._hideChart = false;
    that._series = that._calculateSeries(options);
    that._seriesFamilies = []
};
SeriesDataSource.prototype = {
    constructor: SeriesDataSource,
    _calculateSeries: function(options) {
        var that = this;
        var series = [];
        var particularSeriesOptions;
        var seriesTheme;
        var data = options.dataSource || [];
        var parsedData;
        var chartThemeManager = that._themeManager;
        var seriesTemplate = chartThemeManager.getOptions("seriesTemplate");
        var allSeriesOptions = seriesTemplate ? vizUtils.processSeriesTemplate(seriesTemplate, data) : options.chart.series;
        var dataSourceField;
        var valueAxis = that._valueAxis;
        var i;
        var newSeries;
        var groupsData;
        if (options.dataSource && !allSeriesOptions) {
            dataSourceField = options.dataSourceField || "arg";
            allSeriesOptions = {
                argumentField: dataSourceField,
                valueField: dataSourceField
            };
            that._hideChart = true
        }
        allSeriesOptions = Array.isArray(allSeriesOptions) ? allSeriesOptions : allSeriesOptions ? [allSeriesOptions] : [];
        for (i = 0; i < allSeriesOptions.length; i++) {
            particularSeriesOptions = extend(true, {}, allSeriesOptions[i]);
            particularSeriesOptions.rotated = false;
            seriesTheme = chartThemeManager.getOptions("series", particularSeriesOptions, allSeriesOptions.length);
            seriesTheme.argumentField = seriesTheme.argumentField || options.dataSourceField;
            if (!seriesTheme.name) {
                seriesTheme.name = "Series " + (i + 1).toString()
            }
            if (data && data.length > 0) {
                newSeries = new seriesModule.Series({
                    renderer: options.renderer,
                    argumentAxis: options.argumentAxis,
                    valueAxis: options.valueAxis,
                    incidentOccurred: options.incidentOccurred
                }, seriesTheme);
                series.push(newSeries)
            }
        }
        if (series.length) {
            groupsData = {
                groups: [{
                    series: series,
                    valueAxis: options.valueAxis,
                    valueOptions: {
                        type: valueAxis.type,
                        valueType: dataSourceField ? options.valueType : valueAxis.valueType
                    }
                }],
                argumentOptions: {
                    categories: options.categories,
                    argumentType: options.valueType,
                    type: options.axisType
                }
            };
            parsedData = dataValidatorModule.validateData(data, groupsData, options.incidentOccurred, chartThemeManager.getOptions("dataPrepareSettings"));
            that.argCategories = groupsData.categories;
            for (i = 0; i < series.length; i++) {
                series[i].updateData(parsedData[series[i].getArgumentField()])
            }
        }
        return series
    },
    createPoints: function() {
        if (0 === this._series.length) {
            return
        }
        var series = this._series;
        var viewport = new rangeModule.Range;
        var axis = series[0].getArgumentAxis();
        var themeManager = this._themeManager;
        var negativesAsZeroes = themeManager.getOptions("negativesAsZeroes");
        var negativesAsZeros = themeManager.getOptions("negativesAsZeros");
        series.forEach(function(s) {
            viewport.addRange(s.getArgumentRange())
        });
        axis.getTranslator().updateBusinessRange(viewport);
        series.forEach(function(s) {
            s.createPoints()
        });
        this._seriesFamilies = processSeriesFamilies(series, themeManager.getOptions("equalBarWidth"), themeManager.getOptions("minBubbleSize"), themeManager.getOptions("maxBubbleSize"), {
            barWidth: themeManager.getOptions("barWidth"),
            barGroupPadding: themeManager.getOptions("barGroupPadding"),
            barGroupWidth: themeManager.getOptions("barGroupWidth")
        }, typeUtils.isDefined(negativesAsZeroes) ? negativesAsZeroes : negativesAsZeros)
    },
    adjustSeriesDimensions: function() {
        each(this._seriesFamilies, function(_, family) {
            family.adjustSeriesDimensions()
        })
    },
    getBoundRange: function() {
        var that = this;
        var rangeData;
        var valueAxis = that._valueAxis;
        var valRange = new rangeModule.Range({
            min: valueAxis.min,
            minVisible: valueAxis.min,
            max: valueAxis.max,
            maxVisible: valueAxis.max,
            axisType: valueAxis.type,
            base: valueAxis.logarithmBase
        });
        var argRange = new rangeModule.Range({});
        var rangeYSize;
        var rangeVisibleSizeY;
        var minIndent;
        var maxIndent;
        each(that._series, function(_, series) {
            rangeData = series.getRangeData();
            valRange.addRange(rangeData.val);
            argRange.addRange(rangeData.arg)
        });
        if (!valRange.isEmpty() && !argRange.isEmpty()) {
            minIndent = valueAxis.inverted ? that._indent.top : that._indent.bottom;
            maxIndent = valueAxis.inverted ? that._indent.bottom : that._indent.top;
            rangeYSize = valRange.max - valRange.min;
            rangeVisibleSizeY = (typeUtils.isNumeric(valRange.maxVisible) ? valRange.maxVisible : valRange.max) - (typeUtils.isNumeric(valRange.minVisible) ? valRange.minVisible : valRange.min);
            if (typeUtils.isDate(valRange.min)) {
                valRange.min = new Date(valRange.min.valueOf() - rangeYSize * minIndent)
            } else {
                valRange.min -= rangeYSize * minIndent
            }
            if (typeUtils.isDate(valRange.max)) {
                valRange.max = new Date(valRange.max.valueOf() + rangeYSize * maxIndent)
            } else {
                valRange.max += rangeYSize * maxIndent
            }
            if (typeUtils.isNumeric(rangeVisibleSizeY)) {
                valRange.maxVisible = valRange.maxVisible ? valRange.maxVisible + rangeVisibleSizeY * maxIndent : void 0;
                valRange.minVisible = valRange.minVisible ? valRange.minVisible - rangeVisibleSizeY * minIndent : void 0
            }
            valRange.invert = valueAxis.inverted
        }
        return {
            arg: argRange,
            val: valRange
        }
    },
    getMarginOptions: function(canvas) {
        var bubbleSize = Math.min(canvas.width, canvas.height) * this._themeManager.getOptions("maxBubbleSize");
        return this._series.reduce(function(marginOptions, series) {
            var seriesOptions = series.getMarginOptions();
            if (true === seriesOptions.processBubbleSize) {
                seriesOptions.size = bubbleSize
            }
            return vizUtils.mergeMarginOptions(marginOptions, seriesOptions)
        }, {})
    },
    getSeries: function() {
        return this._series
    },
    isEmpty: function() {
        return 0 === this.getSeries().length
    },
    isShowChart: function() {
        return !this._hideChart
    },
    getCalculatedValueType: function() {
        var series = this._series[0];
        return series && series.argumentType
    },
    getThemeManager: function() {
        return this._themeManager
    }
};
exports.SeriesDataSource = SeriesDataSource;
