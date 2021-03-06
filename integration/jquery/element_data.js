/**
 * DevExtreme (integration/jquery/element_data.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var jQuery = require("jquery");
var dataUtils = require("../../core/element_data");
var useJQuery = require("./use_jquery")();
if (useJQuery) {
    dataUtils.setDataStrategy(jQuery)
}
