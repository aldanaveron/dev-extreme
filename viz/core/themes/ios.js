/**
 * DevExtreme (viz/core/themes/ios.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var themeModule = require("../../themes");
var IOS7_DEFAULT = "ios7.default";
var SECONDARY_TEXT_COLOR = "#767676";
var BORDER_COLOR = "#d3d3d3";
var BLACK = "#000000";
themeModule.registerTheme({
    name: IOS7_DEFAULT,
    backgroundColor: "#ffffff",
    primaryTitleColor: BLACK,
    secondaryTitleColor: SECONDARY_TEXT_COLOR,
    gridColor: "#ececec",
    axisColor: SECONDARY_TEXT_COLOR,
    legend: {
        font: {
            color: BLACK
        }
    },
    tooltip: {
        font: {
            color: SECONDARY_TEXT_COLOR
        }
    },
    "chart:common": {
        commonSeriesSettings: {
            label: {
                border: {
                    color: BORDER_COLOR
                }
            }
        }
    },
    chart: {
        commonPaneSettings: {
            border: {
                color: BORDER_COLOR
            }
        }
    },
    rangeSelector: {
        scale: {
            tick: {
                color: BLACK,
                opacity: .1
            },
            minorTick: {
                color: BLACK,
                opacity: .03
            }
        }
    },
    treeMap: {
        group: {
            label: {
                font: {
                    color: SECONDARY_TEXT_COLOR
                }
            }
        }
    }
}, "generic.light");