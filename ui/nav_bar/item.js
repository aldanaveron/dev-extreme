/**
 * DevExtreme (ui/nav_bar/item.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var TabsItem = require("../tabs/item");
var TABS_ITEM_BADGE_CLASS = "dx-tabs-item-badge";
var NAVBAR_ITEM_BADGE_CLASS = "dx-navbar-item-badge";
var NavBarItem = TabsItem.inherit({
    _renderBadge: function(badge) {
        this.callBase(badge);
        this._$element.children("." + TABS_ITEM_BADGE_CLASS).removeClass(TABS_ITEM_BADGE_CLASS).addClass(NAVBAR_ITEM_BADGE_CLASS)
    }
});
module.exports = NavBarItem;
