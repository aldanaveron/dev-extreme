/**
 * DevExtreme (ui/toolbar/ui.toolbar.strategy.action_sheet.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var ToolbarStrategy = require("./ui.toolbar.strategy");
var extend = require("../../core/utils/extend").extend;
var ActionSheet = require("../action_sheet");
var ActionSheetStrategy = ToolbarStrategy.inherit({
    NAME: "actionSheet",
    _getMenuItemTemplate: function() {
        return this._toolbar._getTemplate("actionSheetItem")
    },
    render: function() {
        if (!this._hasVisibleMenuItems()) {
            return
        }
        this.callBase()
    },
    _menuWidgetClass: function() {
        return ActionSheet
    },
    _menuContainer: function() {
        return this._toolbar.$element()
    },
    _widgetOptions: function() {
        return extend({}, this.callBase(), {
            target: this._$button,
            showTitle: false
        })
    },
    _menuButtonOptions: function() {
        return extend({}, this.callBase(), {
            icon: "overflow"
        })
    },
    _toggleMenu: function() {
        this.callBase.apply(this, arguments);
        this._menu.toggle(this._menuShown);
        this._menuShown = false
    }
});
module.exports = ActionSheetStrategy;
