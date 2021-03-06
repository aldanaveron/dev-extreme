/**
 * DevExtreme (ui/diagram/ui.diagram.context_menu.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _renderer = require("../../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _ui = require("../widget/ui.widget");
var _ui2 = _interopRequireDefault(_ui);
var _context_menu = require("../context_menu");
var _context_menu2 = _interopRequireDefault(_context_menu);
var _diagram = require("./diagram.commands_manager");
var _diagram2 = _interopRequireDefault(_diagram);
var _uiDiagram = require("./ui.diagram.menu_helper");
var _uiDiagram2 = _interopRequireDefault(_uiDiagram);
var _diagram3 = require("./diagram.bar");
var _diagram4 = _interopRequireDefault(_diagram3);
var _diagram5 = require("./diagram.importer");

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

function _get(target, property, receiver) {
    if ("undefined" !== typeof Reflect && Reflect.get) {
        _get = Reflect.get
    } else {
        _get = function(target, property, receiver) {
            var base = _superPropBase(target, property);
            if (!base) {
                return
            }
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
                return desc.get.call(receiver)
            }
            return desc.value
        }
    }
    return _get(target, property, receiver || target)
}

function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
        object = _getPrototypeOf(object);
        if (null === object) {
            break
        }
    }
    return object
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
var DIAGRAM_TOUCHBAR_CLASS = "dx-diagram-touchbar";
var DIAGRAM_TOUCHBAR_TARGET_CLASS = "dx-diagram-touchbar-target";
var DIAGRAM_TOUCHBAR_MIN_UNWRAPPED_WIDTH = 800;
var DIAGRAM_TOUCHBAR_Y_OFFSET = 32;
var DiagramContextMenu = function(_Widget) {
    _inherits(DiagramContextMenu, _Widget);
    var _super = _createSuper(DiagramContextMenu);

    function DiagramContextMenu() {
        _classCallCheck(this, DiagramContextMenu);
        return _super.apply(this, arguments)
    }
    _createClass(DiagramContextMenu, [{
        key: "_init",
        value: function() {
            _get(_getPrototypeOf(DiagramContextMenu.prototype), "_init", this).call(this);
            this._createOnVisibilityChangingAction();
            this._createOnCustomCommand();
            this._createOnItemClickAction();
            this._tempState = void 0;
            this._commands = [];
            this._commandToIndexMap = {};
            this.bar = new DiagramContextMenuBar(this)
        }
    }, {
        key: "_initMarkup",
        value: function() {
            var _this = this;
            _get(_getPrototypeOf(DiagramContextMenu.prototype), "_initMarkup", this).call(this);
            this._commands = this._getCommands();
            this._commandToIndexMap = {};
            this._fillCommandToIndexMap(this._commands, []);
            this._$contextMenuTargetElement = (0, _renderer2.default)("<div>").addClass(DIAGRAM_TOUCHBAR_TARGET_CLASS).appendTo(this.$element());
            var $contextMenu = (0, _renderer2.default)("<div>").appendTo(this.$element());
            var _getDiagram = (0, _diagram5.getDiagram)(),
                Browser = _getDiagram.Browser;
            this._contextMenuInstance = this._createComponent($contextMenu, _context_menu2.default, {
                closeOnOutsideClick: false,
                showEvent: "",
                cssClass: Browser.TouchUI ? DIAGRAM_TOUCHBAR_CLASS : _uiDiagram2.default.getContextMenuCssClass(),
                items: this._commands,
                focusStateEnabled: false,
                position: Browser.TouchUI ? {
                    my: {
                        x: "center",
                        y: "bottom"
                    },
                    at: {
                        x: "center",
                        y: "top"
                    },
                    of: this._$contextMenuTargetElement
                } : {},
                itemTemplate: function(itemData, itemIndex, itemElement) {
                    _uiDiagram2.default.getContextMenuItemTemplate(this, itemData, itemIndex, itemElement)
                },
                onItemClick: function(_ref) {
                    var itemData = _ref.itemData;
                    return _this._onItemClick(itemData)
                },
                onShowing: function(e) {
                    if (true === _this._inOnShowing) {
                        return
                    }
                    _this._inOnShowing = true;
                    _this._onVisibilityChangingAction({
                        visible: true,
                        component: _this
                    });
                    e.component.option("items", e.component.option("items"));
                    delete _this._inOnShowing
                }
            })
        }
    }, {
        key: "_show",
        value: function(x, y, selection) {
            this.clickPosition = {
                x: x,
                y: y
            };
            var _getDiagram2 = (0, _diagram5.getDiagram)(),
                Browser = _getDiagram2.Browser;
            this._contextMenuInstance.hide();
            if (Browser.TouchUI) {
                this._$contextMenuTargetElement.show();
                if (!selection) {
                    selection = {
                        x: x,
                        y: y,
                        width: 0,
                        height: 0
                    }
                }
                var widthCorrection = selection.width > DIAGRAM_TOUCHBAR_MIN_UNWRAPPED_WIDTH ? 0 : (DIAGRAM_TOUCHBAR_MIN_UNWRAPPED_WIDTH - selection.width) / 2;
                this._$contextMenuTargetElement.css({
                    left: selection.x - widthCorrection,
                    top: selection.y - DIAGRAM_TOUCHBAR_Y_OFFSET,
                    width: selection.width + 2 * widthCorrection,
                    height: selection.height + 2 * DIAGRAM_TOUCHBAR_Y_OFFSET
                });
                this._contextMenuInstance.show()
            } else {
                this._contextMenuInstance.option("position", {
                    offset: x + " " + y
                });
                this._contextMenuInstance.show()
            }
        }
    }, {
        key: "_hide",
        value: function() {
            this._$contextMenuTargetElement.hide();
            this._contextMenuInstance.hide()
        }
    }, {
        key: "_onItemClick",
        value: function(itemData) {
            var processed = false;
            if (this._onItemClickAction) {
                processed = this._onItemClickAction(itemData)
            }
            if (!processed) {
                _uiDiagram2.default.onContextMenuItemClick(this, itemData, this._executeCommand.bind(this));
                this._contextMenuInstance.hide()
            }
        }
    }, {
        key: "_executeCommand",
        value: function(command, value) {
            if (void 0 === command) {
                return
            }
            if ("number" === typeof command) {
                this.bar.raiseBarCommandExecuted(command, value)
            }
            if ("string" === typeof command) {
                this._onCustomCommandAction({
                    command: command
                })
            }
        }
    }, {
        key: "_createOnCustomCommand",
        value: function() {
            this._onCustomCommandAction = this._createActionByOption("onCustomCommand")
        }
    }, {
        key: "_getCommands",
        value: function() {
            return _diagram2.default.getContextMenuCommands(this.option("commands"))
        }
    }, {
        key: "_fillCommandToIndexMap",
        value: function(commands, indexPath) {
            var _this2 = this;
            commands.forEach(function(command, index) {
                var commandIndexPath = indexPath.concat([index]);
                if (void 0 !== command.command) {
                    _this2._commandToIndexMap[command.command] = commandIndexPath
                }
                if (Array.isArray(command.items)) {
                    _this2._fillCommandToIndexMap(command.items, commandIndexPath)
                }
            })
        }
    }, {
        key: "_setItemEnabled",
        value: function(key, enabled) {
            this._setItemVisible(key, enabled)
        }
    }, {
        key: "_setItemVisible",
        value: function(key, visible) {
            var itemOptionText = _uiDiagram2.default.getItemOptionText(this._contextMenuInstance, this._commandToIndexMap[key]);
            _uiDiagram2.default.updateContextMenuItemVisible(this._contextMenuInstance, itemOptionText, visible)
        }
    }, {
        key: "_setItemValue",
        value: function(key, value) {
            var itemOptionText = _uiDiagram2.default.getItemOptionText(this._contextMenuInstance, this._commandToIndexMap[key]);
            _uiDiagram2.default.updateContextMenuItemValue(this._contextMenuInstance, itemOptionText, key, value)
        }
    }, {
        key: "_setItemSubItems",
        value: function(key, items) {
            var itemOptionText = _uiDiagram2.default.getItemOptionText(this._contextMenuInstance, this._commandToIndexMap[key]);
            _uiDiagram2.default.updateContextMenuItems(this._contextMenuInstance, itemOptionText, key, items)
        }
    }, {
        key: "_setEnabled",
        value: function(enabled) {
            this._contextMenuInstance.option("disabled", !enabled)
        }
    }, {
        key: "isVisible",
        value: function() {
            return this._inOnShowing
        }
    }, {
        key: "_createOnVisibilityChangingAction",
        value: function() {
            this._onVisibilityChangingAction = this._createActionByOption("onVisibilityChanging")
        }
    }, {
        key: "_createOnItemClickAction",
        value: function() {
            this._onItemClickAction = this._createActionByOption("onItemClick")
        }
    }, {
        key: "_optionChanged",
        value: function(args) {
            switch (args.name) {
                case "onVisibilityChanging":
                    this._createOnVisibilityChangingAction();
                    break;
                case "onCustomCommand":
                    this._createOnCustomCommand();
                    break;
                case "onItemClick":
                    this._createOnItemClickAction();
                    break;
                case "commands":
                    this._invalidate();
                    break;
                default:
                    _get(_getPrototypeOf(DiagramContextMenu.prototype), "_optionChanged", this).call(this, args)
            }
        }
    }]);
    return DiagramContextMenu
}(_ui2.default);
var DiagramContextMenuBar = function(_DiagramBar) {
    _inherits(DiagramContextMenuBar, _DiagramBar);
    var _super2 = _createSuper(DiagramContextMenuBar);

    function DiagramContextMenuBar(owner) {
        _classCallCheck(this, DiagramContextMenuBar);
        return _super2.call(this, owner)
    }
    _createClass(DiagramContextMenuBar, [{
        key: "getCommandKeys",
        value: function() {
            return this._getKeys(this._owner._commands)
        }
    }, {
        key: "setItemValue",
        value: function(key, value) {
            this._owner._setItemValue(key, value)
        }
    }, {
        key: "setItemEnabled",
        value: function(key, enabled) {
            this._owner._setItemEnabled(key, enabled)
        }
    }, {
        key: "setItemVisible",
        value: function(key, visible) {
            this._owner._setItemVisible(key, visible)
        }
    }, {
        key: "setItemSubItems",
        value: function(key, items) {
            this._owner._setItemSubItems(key, items)
        }
    }, {
        key: "setEnabled",
        value: function(enabled) {
            this._owner._setEnabled(enabled)
        }
    }, {
        key: "isVisible",
        value: function() {
            return this._owner.isVisible()
        }
    }]);
    return DiagramContextMenuBar
}(_diagram4.default);
module.exports = DiagramContextMenu;
