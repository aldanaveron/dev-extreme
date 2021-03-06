/**
 * DevExtreme (viz/sankey.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var dxSankey = require("./sankey/sankey");
var setTooltipCustomOptions = require("./sankey/tooltip").setTooltipCustomOptions;
dxSankey.addPlugin(require("./core/export").plugin);
dxSankey.addPlugin(require("./core/title").plugin);
dxSankey.addPlugin(require("./sankey/tracker").plugin);
dxSankey.addPlugin(require("./core/loading_indicator").plugin);
dxSankey.addPlugin(require("./core/tooltip").plugin);
setTooltipCustomOptions(dxSankey);
module.exports = dxSankey;
module.exports.default = module.exports;
