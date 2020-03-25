/**
 * DevExtreme (ui/data_grid/ui.data_grid.editing.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
require("./ui.data_grid.editor_factory");
var _uiData_grid = require("./ui.data_grid.core");
var _uiData_grid2 = _interopRequireDefault(_uiData_grid);
var _uiGrid_core = require("../grid_core/ui.grid_core.editing");
var _uiGrid_core2 = _interopRequireDefault(_uiGrid_core);
var _extend = require("../../core/utils/extend");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
_uiData_grid2.default.registerModule("editing", (0, _extend.extend)(true, {}, _uiGrid_core2.default, {
    extenders: {
        controllers: {
            data: {
                _changeRowExpandCore: function(key) {
                    var editingController = this._editingController;
                    if (Array.isArray(key)) {
                        editingController && editingController.refresh()
                    }
                    this.callBase.apply(this, arguments)
                }
            }
        }
    }
}));