/**
 * DevExtreme (ui/html_editor/formats/align.js)
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
var _quill = require("quill");
var _quill2 = _interopRequireDefault(_quill);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var AlignStyle = {};
if (_quill2.default) {
    AlignStyle = _quill2.default.import("attributors/style/align");
    AlignStyle.whitelist.push("left")
}
exports.default = AlignStyle;
