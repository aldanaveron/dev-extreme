/**
 * DevExtreme (ui/data_grid/ui.data_grid.utils.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _uiGrid_core = require("../grid_core/ui.grid_core.utils");
var _uiGrid_core2 = _interopRequireDefault(_uiGrid_core);
var _utils = require("../../data/utils");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
exports.createGroupFilter = function(path, storeLoadOptions) {
    var groups = (0, _utils.normalizeSortingInfo)(storeLoadOptions.group);
    var i;
    var filter = [];
    for (i = 0; i < path.length; i++) {
        filter.push([groups[i].selector, "=", path[i]])
    }
    if (storeLoadOptions.filter) {
        filter.push(storeLoadOptions.filter)
    }
    return _uiGrid_core2.default.combineFilters(filter)
};
