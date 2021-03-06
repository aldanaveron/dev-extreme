/**
 * DevExtreme (ui/list/ui.list.edit.decorator.static.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var $ = require("../../core/renderer");
var Button = require("../button");
var registerDecorator = require("./ui.list.edit.decorator_registry").register;
var EditDecorator = require("./ui.list.edit.decorator");
var STATIC_DELETE_BUTTON_CONTAINER_CLASS = "dx-list-static-delete-button-container";
var STATIC_DELETE_BUTTON_CLASS = "dx-list-static-delete-button";
registerDecorator("delete", "static", EditDecorator.inherit({
    afterBag: function(config) {
        var $itemElement = config.$itemElement;
        var $container = config.$container;
        var $button = $("<div>").addClass(STATIC_DELETE_BUTTON_CLASS);
        this._list._createComponent($button, Button, {
            icon: "remove",
            onClick: function(args) {
                args.event.stopPropagation();
                this._deleteItem($itemElement)
            }.bind(this),
            integrationOptions: {}
        });
        $container.addClass(STATIC_DELETE_BUTTON_CONTAINER_CLASS).append($button)
    },
    _deleteItem: function($itemElement) {
        if ($itemElement.is(".dx-state-disabled, .dx-state-disabled *")) {
            return
        }
        this._list.deleteItem($itemElement)
    }
}));
