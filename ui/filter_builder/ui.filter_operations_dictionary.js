/**
 * DevExtreme (ui/filter_builder/ui.filter_operations_dictionary.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var OPERATION_ICONS = {
    "=": "equal",
    "<>": "notequal",
    "<": "less",
    "<=": "lessorequal",
    ">": "greater",
    ">=": "greaterorequal",
    notcontains: "doesnotcontain",
    contains: "contains",
    startswith: "startswith",
    endswith: "endswith",
    isblank: "isblank",
    isnotblank: "isnotblank"
};
var OPERATION_NAME = {
    "=": "equal",
    "<>": "notEqual",
    "<": "lessThan",
    "<=": "lessThanOrEqual",
    ">": "greaterThan",
    ">=": "greaterThanOrEqual",
    startswith: "startsWith",
    contains: "contains",
    notcontains: "notContains",
    endswith: "endsWith",
    isblank: "isBlank",
    isnotblank: "isNotBlank",
    between: "between"
};
module.exports = {
    getIconByFilterOperation: function(filterOperation) {
        return OPERATION_ICONS[filterOperation]
    },
    getNameByFilterOperation: function(filterOperation) {
        return OPERATION_NAME[filterOperation]
    }
};
