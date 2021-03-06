/**
 * DevExtreme (ui/diagram/diagram.importer.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var Errors = require("../widget/ui.errors");
var Diagram = require("devexpress-diagram");

function getDiagram() {
    if (!Diagram) {
        throw Errors.Error("E1041", "devexpress-diagram")
    }
    return Diagram
}
module.exports.getDiagram = getDiagram;
