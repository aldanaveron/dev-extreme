/**
 * DevExtreme (integration/knockout/components.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var ko = require("knockout");
var iconUtils = require("../../core/utils/icon");
ko.bindingHandlers.dxControlsDescendantBindings = {
    init: function(_, valueAccessor) {
        return {
            controlsDescendantBindings: ko.unwrap(valueAccessor())
        }
    }
};
ko.bindingHandlers.dxIcon = {
    init: function(element, valueAccessor) {
        var options = ko.utils.unwrapObservable(valueAccessor()) || {};
        var iconElement = iconUtils.getImageContainer(options);
        ko.virtualElements.emptyNode(element);
        if (iconElement) {
            ko.virtualElements.prepend(element, iconElement.get(0))
        }
    },
    update: function(element, valueAccessor) {
        var options = ko.utils.unwrapObservable(valueAccessor()) || {};
        var iconElement = iconUtils.getImageContainer(options);
        ko.virtualElements.emptyNode(element);
        if (iconElement) {
            ko.virtualElements.prepend(element, iconElement.get(0))
        }
    }
};
ko.virtualElements.allowedBindings.dxIcon = true;
