/**
 * DevExtreme (core/utils/icon.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _renderer = require("../../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var ICON_CLASS = "dx-icon";
var SVG_ICON_CLASS = "dx-svg-icon";
var getImageSourceType = function(source) {
    if (!source || "string" !== typeof source) {
        return false
    }
    if (/^\s*<svg[^>]*>(.|\r\n|\r|\n)*?<\/svg>\s*$/i.test(source)) {
        return "svg"
    }
    if (/data:.*base64|\.|[^<\s]\//.test(source)) {
        return "image"
    }
    if (/^[\w-_]+$/.test(source)) {
        return "dxIcon"
    }
    if (/^\s?([\w-_]\s?)+$/.test(source)) {
        return "fontIcon"
    }
    return false
};
var getImageContainer = function(source) {
    switch (getImageSourceType(source)) {
        case "image":
            return (0, _renderer2.default)("<img>").attr("src", source).addClass(ICON_CLASS);
        case "fontIcon":
            return (0, _renderer2.default)("<i>").addClass("".concat(ICON_CLASS, " ").concat(source));
        case "dxIcon":
            return (0, _renderer2.default)("<i>").addClass("".concat(ICON_CLASS, " ").concat(ICON_CLASS, "-").concat(source));
        case "svg":
            return (0, _renderer2.default)("<i>").addClass("".concat(ICON_CLASS, " ").concat(SVG_ICON_CLASS)).append(source);
        default:
            return null
    }
};
exports.getImageSourceType = getImageSourceType;
exports.getImageContainer = getImageContainer;
