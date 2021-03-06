/**
 * DevExtreme (ui/list/item.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var $ = require("../../core/renderer");
var CollectionWidgetItem = require("../collection/item");
var LIST_ITEM_BADGE_CONTAINER_CLASS = "dx-list-item-badge-container";
var LIST_ITEM_BADGE_CLASS = "dx-list-item-badge";
var BADGE_CLASS = "dx-badge";
var LIST_ITEM_CHEVRON_CONTAINER_CLASS = "dx-list-item-chevron-container";
var LIST_ITEM_CHEVRON_CLASS = "dx-list-item-chevron";
var ListItem = CollectionWidgetItem.inherit({
    _renderWatchers: function() {
        this.callBase();
        this._startWatcher("badge", this._renderBadge.bind(this));
        this._startWatcher("showChevron", this._renderShowChevron.bind(this))
    },
    _renderBadge: function(badge) {
        this._$element.children("." + LIST_ITEM_BADGE_CONTAINER_CLASS).remove();
        if (!badge) {
            return
        }
        var $badge = $("<div>").addClass(LIST_ITEM_BADGE_CONTAINER_CLASS).append($("<div>").addClass(LIST_ITEM_BADGE_CLASS).addClass(BADGE_CLASS).text(badge));
        var $chevron = this._$element.children("." + LIST_ITEM_CHEVRON_CONTAINER_CLASS).first();
        $chevron.length > 0 ? $badge.insertBefore($chevron) : $badge.appendTo(this._$element)
    },
    _renderShowChevron: function(showChevron) {
        this._$element.children("." + LIST_ITEM_CHEVRON_CONTAINER_CLASS).remove();
        if (!showChevron) {
            return
        }
        var $chevronContainer = $("<div>").addClass(LIST_ITEM_CHEVRON_CONTAINER_CLASS);
        var $chevron = $("<div>").addClass(LIST_ITEM_CHEVRON_CLASS);
        $chevronContainer.append($chevron).appendTo(this._$element)
    }
});
module.exports = ListItem;
