/**
 * DevExtreme (animation/translator.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var dataUtils = require("../core/element_data");
var type = require("../core/utils/type").type;
var TRANSLATOR_DATA_KEY = "dxTranslator";
var TRANSFORM_MATRIX_REGEX = /matrix(3d)?\((.+?)\)/;
var TRANSLATE_REGEX = /translate(?:3d)?\((.+?)\)/;
var locate = function($element) {
    var translate = getTranslate($element);
    return {
        left: translate.x,
        top: translate.y
    }
};

function isPercentValue(value) {
    return "string" === type(value) && "%" === value[value.length - 1]
}

function cacheTranslate($element, translate) {
    if ($element.length) {
        dataUtils.data($element.get(0), TRANSLATOR_DATA_KEY, translate)
    }
}
var clearCache = function($element) {
    if ($element.length) {
        dataUtils.removeData($element.get(0), TRANSLATOR_DATA_KEY)
    }
};
var getTranslateCss = function(translate) {
    translate.x = translate.x || 0;
    translate.y = translate.y || 0;
    var xValueString = isPercentValue(translate.x) ? translate.x : translate.x + "px";
    var yValueString = isPercentValue(translate.y) ? translate.y : translate.y + "px";
    return "translate(" + xValueString + ", " + yValueString + ")"
};
var getTranslate = function($element) {
    var result = $element.length ? dataUtils.data($element.get(0), TRANSLATOR_DATA_KEY) : null;
    if (!result) {
        var transformValue = $element.css("transform") || getTranslateCss({
            x: 0,
            y: 0
        });
        var matrix = transformValue.match(TRANSFORM_MATRIX_REGEX);
        var is3D = matrix && matrix[1];
        if (matrix) {
            matrix = matrix[2].split(",");
            if ("3d" === is3D) {
                matrix = matrix.slice(12, 15)
            } else {
                matrix.push(0);
                matrix = matrix.slice(4, 7)
            }
        } else {
            matrix = [0, 0, 0]
        }
        result = {
            x: parseFloat(matrix[0]),
            y: parseFloat(matrix[1]),
            z: parseFloat(matrix[2])
        };
        cacheTranslate($element, result)
    }
    return result
};
var move = function($element, position) {
    var left = position.left;
    var top = position.top;
    var translate;
    if (void 0 === left) {
        translate = getTranslate($element);
        translate.y = top || 0
    } else {
        if (void 0 === top) {
            translate = getTranslate($element);
            translate.x = left || 0
        } else {
            translate = {
                x: left || 0,
                y: top || 0,
                z: 0
            };
            cacheTranslate($element, translate)
        }
    }
    $element.css({
        transform: getTranslateCss(translate)
    });
    if (isPercentValue(left) || isPercentValue(top)) {
        clearCache($element)
    }
};
var resetPosition = function($element, finishTransition) {
    var originalTransition;
    var stylesConfig = {
        left: 0,
        top: 0,
        transform: "none"
    };
    if (finishTransition) {
        originalTransition = $element.css("transition");
        stylesConfig.transition = "none"
    }
    $element.css(stylesConfig);
    clearCache($element);
    if (finishTransition) {
        $element.get(0).offsetHeight;
        $element.css("transition", originalTransition)
    }
};
var parseTranslate = function(translateString) {
    var result = translateString.match(TRANSLATE_REGEX);
    if (!result || !result[1]) {
        return
    }
    result = result[1].split(",");
    result = {
        x: parseFloat(result[0]),
        y: parseFloat(result[1]),
        z: parseFloat(result[2])
    };
    return result
};
exports.move = move;
exports.locate = locate;
exports.clearCache = clearCache;
exports.parseTranslate = parseTranslate;
exports.getTranslate = getTranslate;
exports.getTranslateCss = getTranslateCss;
exports.resetPosition = resetPosition;
