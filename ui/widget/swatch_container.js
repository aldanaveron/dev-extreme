/**
 * DevExtreme (ui/widget/swatch_container.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var $ = require("../../core/renderer");
var viewPortUtils = require("../../core/utils/view_port");
var SWATCH_CONTAINER_CLASS_PREFIX = "dx-swatch-";
var getSwatchContainer = function(element) {
    var $element = $(element);
    var swatchContainer = $element.closest('[class^="'.concat(SWATCH_CONTAINER_CLASS_PREFIX, '"], [class*=" ').concat(SWATCH_CONTAINER_CLASS_PREFIX, '"]'));
    var viewport = viewPortUtils.value();
    if (!swatchContainer.length) {
        return viewport
    }
    var swatchClassRegex = new RegExp("(\\s|^)(".concat(SWATCH_CONTAINER_CLASS_PREFIX, ".*?)(\\s|$)"));
    var swatchClass = swatchContainer[0].className.match(swatchClassRegex)[2];
    var viewportSwatchContainer = viewport.children("." + swatchClass);
    if (!viewportSwatchContainer.length) {
        viewportSwatchContainer = $("<div>").addClass(swatchClass).appendTo(viewport)
    }
    return viewportSwatchContainer
};
module.exports = {
    getSwatchContainer: getSwatchContainer
};
