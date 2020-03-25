/**
 * DevExtreme (ui/data_grid/ui.data_grid.data_source_adapter.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _uiGrid_core = require("../grid_core/ui.grid_core.data_source_adapter");
var _uiGrid_core2 = _interopRequireDefault(_uiGrid_core);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var dataSourceAdapterType = _uiGrid_core2.default;
module.exports = {
    extend: function(extender) {
        dataSourceAdapterType = dataSourceAdapterType.inherit(extender)
    },
    create: function(component) {
        return new dataSourceAdapterType(component)
    }
};
