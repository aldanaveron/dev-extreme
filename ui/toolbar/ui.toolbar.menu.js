/**
 * DevExtreme (ui/toolbar/ui.toolbar.menu.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var $ = require("../../core/renderer");
var registerComponent = require("../../core/component_registrator");
var each = require("../../core/utils/iterator").each;
var List = require("../list/ui.list.base");
var TOOLBAR_MENU_ACTION_CLASS = "dx-toolbar-menu-action";
var TOOLBAR_HIDDEN_BUTTON_CLASS = "dx-toolbar-hidden-button";
var TOOLBAR_MENU_SECTION_CLASS = "dx-toolbar-menu-section";
var TOOLBAR_MENU_LAST_SECTION_CLASS = "dx-toolbar-menu-last-section";
var ToolbarMenu = List.inherit({
    _activeStateUnit: "." + TOOLBAR_MENU_ACTION_CLASS,
    _initMarkup: function() {
        this._renderSections();
        this.callBase()
    },
    _getSections: function() {
        return this._itemContainer().children()
    },
    _itemElements: function() {
        return this._getSections().children(this._itemSelector())
    },
    _renderSections: function() {
        var that = this;
        var $container = this._itemContainer();
        each(["before", "center", "after", "menu"], function() {
            var sectionName = "_$" + this + "Section";
            var $section = that[sectionName];
            if (!$section) {
                that[sectionName] = $section = $("<div>").addClass(TOOLBAR_MENU_SECTION_CLASS)
            }
            $section.appendTo($container)
        })
    },
    _renderItems: function() {
        this.callBase.apply(this, arguments);
        this._updateSections()
    },
    _updateSections: function() {
        var $sections = this.$element().find("." + TOOLBAR_MENU_SECTION_CLASS);
        $sections.removeClass(TOOLBAR_MENU_LAST_SECTION_CLASS);
        $sections.not(":empty").eq(-1).addClass(TOOLBAR_MENU_LAST_SECTION_CLASS)
    },
    _renderItem: function(index, item, itemContainer, $after) {
        var location = item.location || "menu";
        var $container = this["_$" + location + "Section"];
        var itemElement = this.callBase(index, item, $container, $after);
        if (this._getItemTemplateName({
                itemData: item
            })) {
            itemElement.addClass("dx-toolbar-menu-custom")
        }
        if ("menu" === location || "dxButton" === item.widget || item.isAction) {
            itemElement.addClass(TOOLBAR_MENU_ACTION_CLASS)
        }
        if ("dxButton" === item.widget) {
            itemElement.addClass(TOOLBAR_HIDDEN_BUTTON_CLASS)
        }
        itemElement.addClass(item.cssClass);
        return itemElement
    },
    _getItemTemplateName: function(args) {
        var template = this.callBase(args);
        var data = args.itemData;
        var menuTemplate = data && data.menuItemTemplate;
        return menuTemplate || template
    },
    _itemClickHandler: function(e, args, config) {
        if ($(e.target).closest("." + TOOLBAR_MENU_ACTION_CLASS).length) {
            this.callBase(e, args, config)
        }
    },
    _clean: function() {
        this._getSections().empty();
        this.callBase()
    }
});
registerComponent("dxToolbarMenu", ToolbarMenu);
module.exports = ToolbarMenu;
