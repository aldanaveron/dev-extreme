/**
 * DevExtreme (ui/grid_core/ui.grid_core.accessibility.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _accessibility = require("../../ui/shared/accessibility");
var _accessibility2 = _interopRequireDefault(_accessibility);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
module.exports = {
    registerKeyboardAction: function(viewName, instance, $element, selector, action) {
        var keyboardController = instance.getController("keyboardNavigation");
        if (instance.option("useLegacyKeyboardNavigation") || keyboardController && !keyboardController.isKeyboardEnabled()) {
            return
        }
        var executeKeyDown = function(args) {
            instance.executeAction("onKeyDown", args)
        };
        instance.createAction("onKeyDown");
        _accessibility2.default.registerKeyboardAction(viewName, instance, $element, selector, action, executeKeyDown)
    }
};
