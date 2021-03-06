/**
 * DevExtreme (ui/html_editor/quill_importer.js)
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
exports.getQuill = void 0;
var _ui = require("../widget/ui.errors");
var _ui2 = _interopRequireDefault(_ui);
var _quill = require("quill");
var _quill2 = _interopRequireDefault(_quill);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function getQuill() {
    if (!_quill2.default) {
        throw _ui2.default.Error("E1041", "Quill")
    }
    return _quill2.default
}
exports.getQuill = getQuill;
