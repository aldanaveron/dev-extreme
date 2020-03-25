/**
 * DevExtreme (integration/jquery/easing.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var jQuery = require("jquery");
var easing = require("../../animation/easing");
if (jQuery) {
    easing.setEasing(jQuery.easing)
}
