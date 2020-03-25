/**
 * DevExtreme (viz/tree_map/tiling.squarified.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _max = Math.max;
var _squarify = require("./tiling.squarified.base");

function accumulate(total, current) {
    return _max(total, current)
}

function squarified(data) {
    return _squarify(data, accumulate, false)
}
require("./tiling").addAlgorithm("squarified", squarified);
module.exports = squarified;