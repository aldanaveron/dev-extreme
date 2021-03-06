/**
 * DevExtreme (ui/gantt/ui.gantt.bars.js)
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
exports.GanttContextMenuBar = exports.GanttToolbar = void 0;
var _renderer = require("../../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _toolbar = require("../toolbar");
var _toolbar2 = _interopRequireDefault(_toolbar);
var _context_menu = require("../context_menu");
var _context_menu2 = _interopRequireDefault(_context_menu);
var _message = require("../../localization/message");
var _message2 = _interopRequireDefault(_message);
var _extend = require("../../core/utils/extend");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _typeof(obj) {
    "@babel/helpers - typeof";
    if ("function" === typeof Symbol && "symbol" === typeof Symbol.iterator) {
        _typeof = function(obj) {
            return typeof obj
        }
    } else {
        _typeof = function(obj) {
            return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
        }
    }
    return _typeof(obj)
}

function _createSuper(Derived) {
    return function() {
        var result, Super = _getPrototypeOf(Derived);
        if (_isNativeReflectConstruct()) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget)
        } else {
            result = Super.apply(this, arguments)
        }
        return _possibleConstructorReturn(this, result)
    }
}

function _possibleConstructorReturn(self, call) {
    if (call && ("object" === _typeof(call) || "function" === typeof call)) {
        return call
    }
    return _assertThisInitialized(self)
}

function _assertThisInitialized(self) {
    if (void 0 === self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
    }
    return self
}

function _isNativeReflectConstruct() {
    if ("undefined" === typeof Reflect || !Reflect.construct) {
        return false
    }
    if (Reflect.construct.sham) {
        return false
    }
    if ("function" === typeof Proxy) {
        return true
    }
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
        return true
    } catch (e) {
        return false
    }
}

function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function(o) {
        return o.__proto__ || Object.getPrototypeOf(o)
    };
    return _getPrototypeOf(o)
}

function _inherits(subClass, superClass) {
    if ("function" !== typeof superClass && null !== superClass) {
        throw new TypeError("Super expression must either be null or a function")
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) {
        _setPrototypeOf(subClass, superClass)
    }
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function(o, p) {
        o.__proto__ = p;
        return o
    };
    return _setPrototypeOf(o, p)
}

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
var TOOLBAR_SEPARATOR_CLASS = "dx-gantt-toolbar-separator";
var COMMANDS = {
    createTask: 0,
    createSubTask: 1,
    removeTask: 2,
    removeDependency: 3,
    taskInformation: 4,
    taskAddContextItem: 5,
    undo: 6,
    redo: 7,
    zoomIn: 8,
    zoomOut: 9,
    fullScreen: 10,
    collapseAll: 11,
    expandAll: 12
};
var Bar = function() {
    function Bar(element, owner) {
        _classCallCheck(this, Bar);
        this._element = element;
        this._owner = owner;
        this._createControl()
    }
    _createClass(Bar, [{
        key: "_getItemsCache",
        value: function() {
            if (!this._cache) {
                this._cache = {};
                this._fillCache(this._items)
            }
            return this._cache
        }
    }, {
        key: "_fillCache",
        value: function(items) {
            var _this = this;
            items.forEach(function(item) {
                var key = item.commandId;
                if (void 0 !== key) {
                    if (!_this._cache[key]) {
                        _this._cache[key] = []
                    }
                    _this._cache[key].push(item)
                }
                if (item.items) {
                    _this._fillCache(item.items)
                }
            })
        }
    }, {
        key: "getCommandKeys",
        value: function() {
            var itemsCache = this._getItemsCache();
            var result = [];
            for (var itemKey in itemsCache) {
                result.push(parseInt(itemKey))
            }
            return result
        }
    }, {
        key: "setItemEnabled",
        value: function(key, enabled) {
            var itemsCache = this._getItemsCache();
            itemsCache[key].forEach(function(item) {
                item.disabled = !enabled
            })
        }
    }, {
        key: "setItemVisible",
        value: function(key, visible) {
            var itemsCache = this._getItemsCache();
            itemsCache[key].forEach(function(item) {
                item.visible = visible
            })
        }
    }, {
        key: "setItemValue",
        value: function(_key, _value) {}
    }, {
        key: "setEnabled",
        value: function(enabled) {
            this._menu.option("disabled", !enabled)
        }
    }, {
        key: "updateItemsList",
        value: function() {}
    }, {
        key: "isVisible",
        value: function() {
            return true
        }
    }, {
        key: "isContextMenu",
        value: function() {
            return false
        }
    }, {
        key: "completeUpdate",
        value: function() {}
    }]);
    return Bar
}();
var GanttToolbar = exports.GanttToolbar = function(_Bar) {
    _inherits(GanttToolbar, _Bar);
    var _super = _createSuper(GanttToolbar);

    function GanttToolbar() {
        _classCallCheck(this, GanttToolbar);
        return _super.apply(this, arguments)
    }
    _createClass(GanttToolbar, [{
        key: "_createControl",
        value: function() {
            var _this2 = this;
            this._menu = this._owner._createComponent(this._element, _toolbar2.default, {
                onItemClick: function(e) {
                    var commandId = e.itemData.commandId;
                    if (void 0 !== commandId) {
                        _this2._owner._executeCoreCommand(e.itemData.commandId)
                    }
                }
            })
        }
    }, {
        key: "createItems",
        value: function(items) {
            var _this3 = this;
            this._cache = null;
            this._items = items.map(function(item) {
                if ("string" === typeof item) {
                    return _this3._createItemByText(item)
                } else {
                    if (item.formatName) {
                        return (0, _extend.extend)(_this3._createItemByText(item.formatName), item)
                    } else {
                        return (0, _extend.extend)(_this3._getDefaultItemOptions(), item)
                    }
                }
            });
            this._menu.option("items", this._items)
        }
    }, {
        key: "_createItemByText",
        value: function(text) {
            switch (text.toLowerCase()) {
                case "separator":
                    return this._createSeparator();
                case "undo":
                    return this._createDefaultItem(COMMANDS.undo, "undo");
                case "redo":
                    return this._createDefaultItem(COMMANDS.redo, "redo");
                case "zoomin":
                    return this._createDefaultItem(COMMANDS.zoomIn, "plus");
                case "zoomout":
                    return this._createDefaultItem(COMMANDS.zoomOut, "minus");
                default:
                    return (0, _extend.extend)(this._getDefaultItemOptions(), {
                        options: {
                            text: text
                        }
                    })
            }
        }
    }, {
        key: "_createDefaultItem",
        value: function(commandId, icon) {
            return {
                commandId: commandId,
                disabled: true,
                widget: "dxButton",
                location: "before",
                options: {
                    icon: icon,
                    stylingMode: "text"
                }
            }
        }
    }, {
        key: "_createSeparator",
        value: function() {
            return {
                location: "before",
                template: function(_data, _index, element) {
                    (0, _renderer2.default)(element).addClass(TOOLBAR_SEPARATOR_CLASS)
                }
            }
        }
    }, {
        key: "_getDefaultItemOptions",
        value: function() {
            return {
                location: "before",
                widget: "dxButton"
            }
        }
    }, {
        key: "completeUpdate",
        value: function() {
            this._menu.option("items", this._items)
        }
    }]);
    return GanttToolbar
}(Bar);
var GanttContextMenuBar = exports.GanttContextMenuBar = function(_Bar2) {
    _inherits(GanttContextMenuBar, _Bar2);
    var _super2 = _createSuper(GanttContextMenuBar);

    function GanttContextMenuBar() {
        _classCallCheck(this, GanttContextMenuBar);
        return _super2.apply(this, arguments)
    }
    _createClass(GanttContextMenuBar, [{
        key: "_createControl",
        value: function() {
            var _this4 = this;
            this._createItems();
            this._menu = this._owner._createComponent(this._element, _context_menu2.default, {
                showEvent: void 0,
                items: this._items,
                onItemClick: function(e) {
                    var commandId = e.itemData.commandId;
                    if (void 0 !== commandId) {
                        _this4._owner._executeCoreCommand(e.itemData.commandId)
                    }
                }
            })
        }
    }, {
        key: "_createItems",
        value: function() {
            this._items = [{
                text: _message2.default.format("dxGantt-dialogButtonAdd"),
                commandId: COMMANDS.taskAddContextItem,
                items: [{
                    text: _message2.default.format("dxGantt-contextMenuNewTask"),
                    commandId: COMMANDS.createTask
                }, {
                    text: _message2.default.format("dxGantt-contextMenuNewSubtask"),
                    commandId: COMMANDS.createSubTask
                }]
            }, {
                text: _message2.default.format("dxGantt-dialogTaskDetailsTitle") + "...",
                commandId: COMMANDS.taskInformation
            }, {
                text: _message2.default.format("dxGantt-contextMenuRemoveTask"),
                commandId: COMMANDS.removeTask
            }, {
                text: _message2.default.format("dxGantt-contextMenuRemoveDependency"),
                commandId: COMMANDS.removeDependency
            }]
        }
    }, {
        key: "show",
        value: function(point) {
            this._menu.option("items", this._items);
            this._menu.option("position.offset", {
                x: point.x,
                y: point.y
            });
            this._menu.show()
        }
    }, {
        key: "isContextMenu",
        value: function() {
            return true
        }
    }]);
    return GanttContextMenuBar
}(Bar);
