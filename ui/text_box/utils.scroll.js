/**
 * DevExtreme (ui/text_box/utils.scroll.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.allowScroll = void 0;
var _renderer = require("../../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var allowScroll = function(container, delta, shiftKey) {
    var $container = (0, _renderer2.default)(container);
    var scrollTopPos = shiftKey ? $container.scrollLeft() : $container.scrollTop();
    var prop = shiftKey ? "Width" : "Height";
    var scrollBottomPos = $container.prop("scroll".concat(prop)) - $container.prop("client".concat(prop)) - scrollTopPos;
    if (0 === scrollTopPos && 0 === scrollBottomPos) {
        return false
    }
    var isScrollFromTop = 0 === scrollTopPos && delta >= 0;
    var isScrollFromBottom = 0 === scrollBottomPos && delta <= 0;
    var isScrollFromMiddle = scrollTopPos > 0 && scrollBottomPos > 0;
    if (isScrollFromTop || isScrollFromBottom || isScrollFromMiddle) {
        return true
    }
};
exports.allowScroll = allowScroll;
