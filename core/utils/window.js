/**
 * DevExtreme (core/utils/window.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var domAdapter = require("../dom_adapter");
var hasWindow = function() {
    return "undefined" !== typeof window
};
var windowObject = hasWindow() && window;
if (!windowObject) {
    windowObject = {};
    windowObject.window = windowObject
}
var getWindow = function() {
    return windowObject
};
var hasProperty = function(prop) {
    return hasWindow() && prop in windowObject
};
var defaultScreenFactorFunc = function(width) {
    if (width < 768) {
        return "xs"
    } else {
        if (width < 992) {
            return "sm"
        } else {
            if (width < 1200) {
                return "md"
            } else {
                return "lg"
            }
        }
    }
};
var getCurrentScreenFactor = function(screenFactorCallback) {
    var screenFactorFunc = screenFactorCallback || defaultScreenFactorFunc;
    var windowWidth = domAdapter.getDocumentElement().clientWidth;
    return screenFactorFunc(windowWidth)
};
var getNavigator = function() {
    return hasWindow() ? windowObject.navigator : {
        userAgent: ""
    }
};
module.exports = {
    hasWindow: hasWindow,
    getWindow: getWindow,
    hasProperty: hasProperty,
    defaultScreenFactorFunc: defaultScreenFactorFunc,
    getCurrentScreenFactor: getCurrentScreenFactor,
    getNavigator: getNavigator
};
