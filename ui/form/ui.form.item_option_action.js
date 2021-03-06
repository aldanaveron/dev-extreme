/**
 * DevExtreme (ui/form/ui.form.item_option_action.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _class = require("../../core/class");

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function")
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
            descriptor.writable = true
        }
        Object.defineProperty(target, descriptor.key, descriptor)
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        _defineProperties(Constructor.prototype, protoProps)
    }
    if (staticProps) {
        _defineProperties(Constructor, staticProps)
    }
    return Constructor
}
var ItemOptionAction = function() {
    function ItemOptionAction(options) {
        _classCallCheck(this, ItemOptionAction);
        this._options = options;
        this._itemsRunTimeInfo = this._options.itemsRunTimeInfo
    }
    _createClass(ItemOptionAction, [{
        key: "findInstance",
        value: function() {
            return this._itemsRunTimeInfo.findWidgetInstanceByItem(this._options.item)
        }
    }, {
        key: "findItemContainer",
        value: function() {
            return this._itemsRunTimeInfo.findItemContainerByItem(this._options.item)
        }
    }, {
        key: "tryExecute",
        value: function() {
            (0, _class.abstract)()
        }
    }]);
    return ItemOptionAction
}();
exports.default = ItemOptionAction;
