/**
 * DevExtreme (ui/diagram/diagram.bar.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _diagram = require("./diagram.importer");

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
var DiagramBar = function() {
    function DiagramBar(owner) {
        _classCallCheck(this, DiagramBar);
        var _getDiagram = (0, _diagram.getDiagram)(),
            EventDispatcher = _getDiagram.EventDispatcher;
        this.onChanged = new EventDispatcher;
        this._owner = owner
    }
    _createClass(DiagramBar, [{
        key: "raiseBarCommandExecuted",
        value: function(key, parameter) {
            this.onChanged.raise("notifyBarCommandExecuted", parseInt(key), parameter)
        }
    }, {
        key: "getCommandKeys",
        value: function() {
            throw "Not Implemented"
        }
    }, {
        key: "setItemValue",
        value: function(key, value) {}
    }, {
        key: "setItemEnabled",
        value: function(key, enabled) {}
    }, {
        key: "setItemVisible",
        value: function(key, enabled) {}
    }, {
        key: "setEnabled",
        value: function(enabled) {}
    }, {
        key: "setItemSubItems",
        value: function(key, items) {}
    }, {
        key: "isVisible",
        value: function() {
            return true
        }
    }, {
        key: "_getKeys",
        value: function(items) {
            var _this = this;
            var keys = items.reduce(function(commands, item) {
                if (void 0 !== item.command) {
                    commands.push(item.command)
                }
                if (item.items) {
                    commands = commands.concat(_this._getKeys(item.items))
                }
                return commands
            }, []);
            return keys
        }
    }]);
    return DiagramBar
}();
module.exports = DiagramBar;
