/**
 * DevExtreme (ui/list.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var ListEdit = require("./list/ui.list.edit.search");
var registerComponent = require("../core/component_registrator");
registerComponent("dxList", ListEdit);
module.exports = ListEdit;
module.exports.default = module.exports;
