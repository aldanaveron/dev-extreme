/**
 * DevExtreme (ui/tree_list/ui.tree_list.master_detail.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _uiTree_list = require("./ui.tree_list.core");
var _uiTree_list2 = _interopRequireDefault(_uiTree_list);
var _uiGrid_core = require("../grid_core/ui.grid_core.master_detail");
var _uiGrid_core2 = _interopRequireDefault(_uiGrid_core);
var _extend = require("../../core/utils/extend");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
_uiTree_list2.default.registerModule("masterDetail", (0, _extend.extend)(true, {}, _uiGrid_core2.default, {
    extenders: {
        controllers: {
            data: {
                isRowExpanded: function() {
                    return this.callBase.apply(this, arguments)
                },
                _processItems: function() {
                    return this.callBase.apply(this, arguments)
                },
                _processDataItem: function() {
                    return this.callBase.apply(this, arguments)
                }
            }
        }
    }
}));
