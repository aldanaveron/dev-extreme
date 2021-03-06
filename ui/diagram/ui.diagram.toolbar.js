/**
 * DevExtreme (ui/diagram/ui.diagram.toolbar.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _renderer = require("../../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _toolbar = require("../toolbar");
var _toolbar2 = _interopRequireDefault(_toolbar);
var _context_menu = require("../context_menu");
var _context_menu2 = _interopRequireDefault(_context_menu);
var _diagram = require("./diagram.bar");
var _diagram2 = _interopRequireDefault(_diagram);
var _extend = require("../../core/utils/extend");
var _window = require("../../core/utils/window");
var _uiDiagram = require("./ui.diagram.panel");
var _uiDiagram2 = _interopRequireDefault(_uiDiagram);
var _uiDiagram3 = require("./ui.diagram.menu_helper");
var _uiDiagram4 = _interopRequireDefault(_uiDiagram3);
require("../select_box");
require("../color_box");
require("../check_box");

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
var ACTIVE_FORMAT_CLASS = "dx-format-active";
var DIAGRAM_TOOLBAR_CLASS = "dx-diagram-toolbar";
var DIAGRAM_TOOLBAR_SEPARATOR_CLASS = "dx-diagram-toolbar-separator";
var DIAGRAM_TOOLBAR_MENU_SEPARATOR_CLASS = "dx-diagram-toolbar-menu-separator";
var DIAGRAM_MOBILE_TOOLBAR_COLOR_BOX_OPENED_CLASS = "dx-diagram-mobile-toolbar-color-box-opened";
var DiagramToolbar = function(_DiagramPanel) {
    _inherits(DiagramToolbar, _DiagramPanel);
    var _super = _createSuper(DiagramToolbar);

    function DiagramToolbar() {
        _classCallCheck(this, DiagramToolbar);
        return _super.apply(this, arguments)
    }
    _createClass(DiagramToolbar, [{
        key: "_init",
        value: function() {
            this._commands = [];
            this._itemHelpers = {};
            this._contextMenus = {};
            this._valueConverters = {};
            this.bar = new DiagramToolbarBar(this);
            this._createOnCustomCommand();
            this._createOnSubMenuVisibilityChangingAction();
            _get(_getPrototypeOf(DiagramToolbar.prototype), "_init", this).call(this)
        }
    }, {
        key: "_initMarkup",
        value: function() {
            _get(_getPrototypeOf(DiagramToolbar.prototype), "_initMarkup", this).call(this);
            var isServerSide = !(0, _window.hasWindow)();
            if (!this.option("skipAdjustSize") && !isServerSide) {
                this.$element().width("")
            }
            this._commands = this._getCommands();
            this._itemHelpers = {};
            this._contextMenus = {};
            var $toolbar = this._createMainElement();
            this._renderToolbar($toolbar);
            if (!this.option("skipAdjustSize") && !isServerSide) {
                var $toolbarContent = this.$element().find(".dx-toolbar-before");
                this.$element().width($toolbarContent.width())
            }
        }
    }, {
        key: "_createMainElement",
        value: function() {
            return (0, _renderer2.default)("<div>").addClass(DIAGRAM_TOOLBAR_CLASS).appendTo(this._$element)
        }
    }, {
        key: "_getCommands",
        value: function() {
            return this.option("commands") || []
        }
    }, {
        key: "_renderToolbar",
        value: function($toolbar) {
            var beforeCommands = this._commands.filter(function(command) {
                return ["after", "center"].indexOf(command.position) === -1
            });
            var centerCommands = this._commands.filter(function(command) {
                return "center" === command.position
            });
            var afterCommands = this._commands.filter(function(command) {
                return "after" === command.position
            });
            var dataSource = [].concat(this._prepareToolbarItems(beforeCommands, "before", this._executeCommand)).concat(this._prepareToolbarItems(centerCommands, "center", this._executeCommand)).concat(this._prepareToolbarItems(afterCommands, "after", this._executeCommand));
            this._toolbarInstance = this._createComponent($toolbar, _toolbar2.default, {
                dataSource: dataSource
            })
        }
    }, {
        key: "_prepareToolbarItems",
        value: function(items, location, actionHandler) {
            var _this = this;
            return items.map(function(item) {
                return (0, _extend.extend)(true, {
                    location: location,
                    locateInMenu: _this.option("locateInMenu")
                }, _this._createItem(item, location, actionHandler), _this._createItemOptions(item), _this._createItemActionOptions(item, actionHandler))
            })
        }
    }, {
        key: "_createItem",
        value: function(item, location, actionHandler) {
            var _this2 = this;
            if (item.getCommandValue || item.getEditorValue || item.getEditorDisplayValue) {
                this._valueConverters[item.command] = {
                    getCommandValue: item.getCommandValue,
                    getEditorValue: item.getEditorValue,
                    getEditorDisplayValue: item.getEditorDisplayValue
                }
            }
            if ("separator" === item.widget) {
                return {
                    template: function(data, index, element) {
                        (0, _renderer2.default)(element).addClass(DIAGRAM_TOOLBAR_SEPARATOR_CLASS)
                    },
                    menuItemTemplate: function(data, index, element) {
                        (0, _renderer2.default)(element).addClass(DIAGRAM_TOOLBAR_MENU_SEPARATOR_CLASS)
                    }
                }
            }
            return {
                widget: item.widget || "dxButton",
                cssClass: item.cssClass,
                options: {
                    stylingMode: this.option("buttonStylingMode"),
                    type: this.option("buttonType"),
                    text: item.text,
                    hint: item.hint,
                    icon: item.icon || item.iconUnchecked || item.iconChecked,
                    iconChecked: item.iconChecked,
                    iconUnchecked: item.iconUnchecked,
                    onInitialized: function(e) {
                        return _this2._onItemInitialized(e.component, item)
                    },
                    onContentReady: function(e) {
                        return _this2._onItemContentReady(e.component, item, actionHandler)
                    }
                }
            }
        }
    }, {
        key: "_createItemOptions",
        value: function(_ref) {
            var widget = _ref.widget,
                command = _ref.command,
                items = _ref.items,
                valueExpr = _ref.valueExpr,
                displayExpr = _ref.displayExpr,
                showText = _ref.showText,
                hint = _ref.hint,
                icon = _ref.icon;
            if ("dxSelectBox" === widget) {
                return this._createSelectBoxItemOptions(command, hint, items, valueExpr, displayExpr)
            } else {
                if ("dxTextBox" === widget) {
                    return this._createTextBoxItemOptions(command, hint)
                } else {
                    if ("dxColorBox" === widget) {
                        return this._createColorBoxItemOptions(command, hint, icon)
                    } else {
                        if (!widget || "dxButton" === widget) {
                            return {
                                showText: showText || "inMenu"
                            }
                        }
                    }
                }
            }
        }
    }, {
        key: "_createSelectBoxItemOptions",
        value: function(command, hint, items, valueExpr, displayExpr) {
            var options = this._createTextEditorItemOptions(hint);
            options = (0, _extend.extend)(true, options, {
                options: {
                    dataSource: items,
                    displayExpr: displayExpr || "text",
                    valueExpr: valueExpr || "value"
                }
            });
            var isSelectButton = items && items.every(function(i) {
                return void 0 !== i.icon
            });
            if (isSelectButton) {
                options = (0, _extend.extend)(true, options, {
                    options: {
                        fieldTemplate: function(data, container) {
                            (0, _renderer2.default)("<i>").addClass(data && data.icon).appendTo(container);
                            (0, _renderer2.default)("<div>").dxTextBox({
                                readOnly: true,
                                stylingMode: "outlined"
                            }).appendTo(container)
                        },
                        itemTemplate: function(data, index, container) {
                            (0, _renderer2.default)(container).attr("title", data.hint);
                            return '<i class="'.concat(data.icon, '"></i>')
                        }
                    }
                })
            }
            return options
        }
    }, {
        key: "_createTextBoxItemOptions",
        value: function(command, hint) {
            var _this3 = this;
            var options = this._createTextEditorItemOptions(hint);
            options = (0, _extend.extend)(true, options, {
                options: {
                    readOnly: true,
                    focusStateEnabled: false,
                    hoverStateEnabled: false,
                    buttons: [{
                        name: "dropDown",
                        location: "after",
                        options: {
                            icon: "spindown",
                            disabled: false,
                            stylingMode: "text",
                            onClick: function() {
                                var contextMenu = _this3._contextMenus[command];
                                if (contextMenu) {
                                    contextMenu.toggle()
                                }
                            }
                        }
                    }]
                }
            });
            return options
        }
    }, {
        key: "_createColorBoxItemOptions",
        value: function(command, hint, icon) {
            var _this4 = this;
            var options = this._createTextEditorItemOptions(hint);
            if (icon) {
                options = (0, _extend.extend)(true, options, {
                    options: {
                        openOnFieldClick: true,
                        fieldTemplate: function(data, container) {
                            (0, _renderer2.default)("<i>").addClass(icon).css("borderBottomColor", data).appendTo(container);
                            (0, _renderer2.default)("<div>").dxTextBox({
                                readOnly: true,
                                stylingMode: "outlined"
                            }).appendTo(container)
                        }
                    }
                })
            }
            options = (0, _extend.extend)(true, options, {
                options: {
                    onOpened: function() {
                        if (_this4.option("isMobileView")) {
                            (0, _renderer2.default)("body").addClass(DIAGRAM_MOBILE_TOOLBAR_COLOR_BOX_OPENED_CLASS)
                        }
                    },
                    onClosed: function() {
                        (0, _renderer2.default)("body").removeClass(DIAGRAM_MOBILE_TOOLBAR_COLOR_BOX_OPENED_CLASS)
                    }
                }
            });
            return options
        }
    }, {
        key: "_createTextEditorItemOptions",
        value: function(hint) {
            return {
                options: {
                    stylingMode: this.option("editorStylingMode"),
                    hint: hint
                }
            }
        }
    }, {
        key: "_createItemActionOptions",
        value: function(item, handler) {
            var _this5 = this;
            switch (item.widget) {
                case "dxSelectBox":
                case "dxColorBox":
                case "dxCheckBox":
                    return {
                        options: {
                            onValueChanged: function(e) {
                                var parameter = _uiDiagram4.default.getItemCommandParameter(_this5, item, e.component.option("value"));
                                handler.call(_this5, item.command, parameter)
                            }
                        }
                    };
                case "dxTextBox":
                    return {};
                default:
                    if (!item.items) {
                        return {
                            options: {
                                onClick: function(e) {
                                    var parameter = _uiDiagram4.default.getItemCommandParameter(_this5, item);
                                    handler.call(_this5, item.command, parameter)
                                }
                            }
                        }
                    }
            }
        }
    }, {
        key: "_onItemInitialized",
        value: function(widget, item) {
            this._addItemHelper(item.command, new DiagramToolbarItemHelper(widget))
        }
    }, {
        key: "_onItemContentReady",
        value: function(widget, item, actionHandler) {
            var _this6 = this;
            if (("dxButton" === widget.NAME || "dxTextBox" === widget.NAME) && item.items) {
                var $menuContainer = (0, _renderer2.default)("<div>").appendTo(this.$element());
                widget._contextMenu = this._createComponent($menuContainer, _context_menu2.default, {
                    items: item.items,
                    target: widget.$element(),
                    cssClass: _uiDiagram4.default.getContextMenuCssClass(),
                    showEvent: "dxTextBox" === widget.NAME ? "" : "dxclick",
                    focusStateEnabled: false,
                    position: {
                        at: "left bottom"
                    },
                    itemTemplate: function(itemData, itemIndex, itemElement) {
                        _uiDiagram4.default.getContextMenuItemTemplate(this, itemData, itemIndex, itemElement)
                    },
                    onItemClick: function(_ref2) {
                        var component = _ref2.component,
                            itemData = _ref2.itemData;
                        _uiDiagram4.default.onContextMenuItemClick(_this6, itemData, actionHandler.bind(_this6));
                        if (!itemData.items || !itemData.items.length) {
                            component.hide()
                        }
                    },
                    onShowing: function(e) {
                        if (_this6._showingSubMenu) {
                            return
                        }
                        _this6._showingSubMenu = e.component;
                        _this6._onSubMenuVisibilityChangingAction({
                            visible: true,
                            component: _this6
                        });
                        e.component.option("items", e.component.option("items"));
                        delete _this6._showingSubMenu
                    },
                    onInitialized: function(_ref3) {
                        var component = _ref3.component;
                        return _this6._onContextMenuInitialized(component, item, widget)
                    },
                    onDisposing: function(_ref4) {
                        var component = _ref4.component;
                        return _this6._onContextMenuDisposing(component, item)
                    }
                })
            }
        }
    }, {
        key: "_onContextMenuInitialized",
        value: function(widget, item, rootWidget) {
            this._contextMenus[item.command] = widget;
            this._addContextMenuHelper(item, widget, [], rootWidget)
        }
    }, {
        key: "_addItemHelper",
        value: function(command, helper) {
            if (void 0 !== command) {
                if (this._itemHelpers[command]) {
                    throw new Error("Toolbar cannot contain duplicated commands.")
                }
                this._itemHelpers[command] = helper
            }
        }
    }, {
        key: "_addContextMenuHelper",
        value: function(item, widget, indexPath, rootWidget) {
            var _this7 = this;
            if (item.items) {
                item.items.forEach(function(subItem, index) {
                    var itemIndexPath = indexPath.concat(index);
                    _this7._addItemHelper(subItem.command, new DiagramToolbarSubItemHelper(widget, itemIndexPath, subItem.command, rootWidget));
                    _this7._addContextMenuHelper(subItem, widget, itemIndexPath, rootWidget)
                })
            }
        }
    }, {
        key: "_onContextMenuDisposing",
        value: function(widget, item) {
            delete this._contextMenus[item.command]
        }
    }, {
        key: "_executeCommand",
        value: function(command, value) {
            if (this._updateLocked || void 0 === command) {
                return
            }
            if ("number" === typeof command) {
                var valueConverter = this._valueConverters[command];
                if (valueConverter && valueConverter.getCommandValue) {
                    value = valueConverter.getCommandValue(value)
                }
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
        key: "_setItemEnabled",
        value: function(command, enabled) {
            if (command in this._itemHelpers) {
                var helper = this._itemHelpers[command];
                if (helper.canUpdate(this._showingSubMenu)) {
                    helper.setEnabled(enabled)
                }
            }
        }
    }, {
        key: "_setEnabled",
        value: function(enabled) {
            var _this8 = this;
            this._toolbarInstance.option("disabled", !enabled);
            Object.keys(this._contextMenus).forEach(function(command) {
                _this8._contextMenus[command].option("disabled", !enabled)
            })
        }
    }, {
        key: "_setItemValue",
        value: function(command, value) {
            try {
                this._updateLocked = true;
                if (command in this._itemHelpers) {
                    var helper = this._itemHelpers[command];
                    if (helper.canUpdate(this._showingSubMenu)) {
                        var valueConverter = this._valueConverters[command];
                        if (valueConverter && valueConverter.getEditorValue) {
                            value = valueConverter.getEditorValue(value)
                        }
                        var displayValue;
                        if (valueConverter && valueConverter.getEditorDisplayValue) {
                            displayValue = valueConverter.getEditorDisplayValue(value)
                        }
                        var contextMenu = this._contextMenus[command];
                        helper.setValue(value, displayValue, contextMenu, contextMenu && command)
                    }
                }
            } finally {
                this._updateLocked = false
            }
        }
    }, {
        key: "_setItemSubItems",
        value: function(command, items) {
            this._updateLocked = true;
            if (command in this._itemHelpers) {
                var helper = this._itemHelpers[command];
                if (helper.canUpdate(this._showingSubMenu)) {
                    var contextMenu = this._contextMenus[command];
                    helper.setItems(items, contextMenu, contextMenu && command)
                }
            }
            this._updateLocked = false
        }
    }, {
        key: "_createOnSubMenuVisibilityChangingAction",
        value: function() {
            this._onSubMenuVisibilityChangingAction = this._createActionByOption("onSubMenuVisibilityChanging")
        }
    }, {
        key: "_optionChanged",
        value: function(args) {
            switch (args.name) {
                case "isMobileView":
                    (0, _renderer2.default)("body").removeClass(DIAGRAM_MOBILE_TOOLBAR_COLOR_BOX_OPENED_CLASS);
                    this._invalidate();
                    break;
                case "onSubMenuVisibilityChanging":
                    this._createOnSubMenuVisibilityChangingAction();
                    break;
                case "onCustomCommand":
                    this._createOnCustomCommand();
                    break;
                case "commands":
                    this._invalidate();
                    break;
                case "export":
                    break;
                default:
                    _get(_getPrototypeOf(DiagramToolbar.prototype), "_optionChanged", this).call(this, args)
            }
        }
    }, {
        key: "_getDefaultOptions",
        value: function() {
            return (0, _extend.extend)(_get(_getPrototypeOf(DiagramToolbar.prototype), "_getDefaultOptions", this).call(this), {
                isMobileView: false,
                "export": {
                    fileName: "Diagram",
                    proxyUrl: void 0
                },
                locateInMenu: "auto",
                buttonStylingMode: "text",
                buttonType: "normal",
                editorStylingMode: "filled",
                skipAdjustSize: false
            })
        }
    }, {
        key: "setCommandChecked",
        value: function(command, checked) {
            this._setItemValue(command, checked)
        }
    }, {
        key: "setCommandEnabled",
        value: function(command, enabled) {
            this._setItemEnabled(command, enabled)
        }
    }]);
    return DiagramToolbar
}(_uiDiagram2.default);
var DiagramToolbarBar = function(_DiagramBar) {
    _inherits(DiagramToolbarBar, _DiagramBar);
    var _super2 = _createSuper(DiagramToolbarBar);

    function DiagramToolbarBar() {
        _classCallCheck(this, DiagramToolbarBar);
        return _super2.apply(this, arguments)
    }
    _createClass(DiagramToolbarBar, [{
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
        key: "setEnabled",
        value: function(enabled) {
            this._owner._setEnabled(enabled)
        }
    }, {
        key: "setItemSubItems",
        value: function(key, items) {
            this._owner._setItemSubItems(key, items)
        }
    }]);
    return DiagramToolbarBar
}(_diagram2.default);
var DiagramToolbarItemHelper = function() {
    function DiagramToolbarItemHelper(widget) {
        _classCallCheck(this, DiagramToolbarItemHelper);
        this._widget = widget
    }
    _createClass(DiagramToolbarItemHelper, [{
        key: "canUpdate",
        value: function(showingSubMenu) {
            return void 0 === showingSubMenu
        }
    }, {
        key: "setEnabled",
        value: function(enabled) {
            this._widget.option("disabled", !enabled)
        }
    }, {
        key: "setValue",
        value: function(value, displayValue, contextMenu, rootCommandKey) {
            if ("value" in this._widget.option()) {
                this._updateEditorValue(value, displayValue)
            } else {
                if (void 0 !== value) {
                    this._updateButtonValue(value)
                }
            }
            if (contextMenu) {
                this._updateContextMenuItemValue(contextMenu, "", rootCommandKey, value)
            }
        }
    }, {
        key: "setItems",
        value: function(items, contextMenu, rootCommandKey) {
            if (contextMenu) {
                this._updateContextMenuItems(contextMenu, "", rootCommandKey, items)
            } else {
                this._updateEditorItems(items)
            }
        }
    }, {
        key: "_updateContextMenuItems",
        value: function(contextMenu, itemOptionText, rootCommandKey, items) {
            _uiDiagram4.default.updateContextMenuItems(contextMenu, itemOptionText, rootCommandKey, items)
        }
    }, {
        key: "_updateEditorItems",
        value: function(items) {
            if ("items" in this._widget.option()) {
                this._widget.option("items", items.map(function(item) {
                    return {
                        value: _uiDiagram4.default.getItemValue(item),
                        text: item.text
                    }
                }))
            }
        }
    }, {
        key: "_updateEditorValue",
        value: function(value, displayValue) {
            this._widget.option("value", value);
            if (!this._widget.option("selectedItem") && displayValue) {
                this._widget.option("value", displayValue)
            }
        }
    }, {
        key: "_updateButtonValue",
        value: function(value) {
            if (this._widget.option("iconChecked") && this._widget.option("iconUnchecked")) {
                this._widget.option("icon", value ? this._widget.option("iconChecked") : this._widget.option("iconUnchecked"))
            } else {
                this._widget.$element().toggleClass(ACTIVE_FORMAT_CLASS, value)
            }
        }
    }, {
        key: "_updateContextMenuItemValue",
        value: function(contextMenu, itemOptionText, rootCommandKey, value) {
            _uiDiagram4.default.updateContextMenuItemValue(contextMenu, itemOptionText, rootCommandKey, value)
        }
    }]);
    return DiagramToolbarItemHelper
}();
var DiagramToolbarSubItemHelper = function(_DiagramToolbarItemHe) {
    _inherits(DiagramToolbarSubItemHelper, _DiagramToolbarItemHe);
    var _super3 = _createSuper(DiagramToolbarSubItemHelper);

    function DiagramToolbarSubItemHelper(widget, indexPath, rootCommandKey, rootWidget) {
        var _this9;
        _classCallCheck(this, DiagramToolbarSubItemHelper);
        _this9 = _super3.call(this, widget);
        _this9._indexPath = indexPath;
        _this9._rootCommandKey = rootCommandKey;
        _this9._rootWidget = rootWidget;
        return _this9
    }
    _createClass(DiagramToolbarSubItemHelper, [{
        key: "canUpdate",
        value: function(showingSubMenu) {
            return _get(_getPrototypeOf(DiagramToolbarSubItemHelper.prototype), "canUpdate", this).call(this, showingSubMenu) || showingSubMenu === this._widget
        }
    }, {
        key: "setEnabled",
        value: function(enabled) {
            this._widget.option(this._getItemOptionText() + "disabled", !enabled);
            var rootEnabled = this._hasEnabledCommandItems(this._widget.option("items"));
            this._rootWidget.option("disabled", !rootEnabled)
        }
    }, {
        key: "_hasEnabledCommandItems",
        value: function(items) {
            var _this10 = this;
            if (items) {
                return items.some(function(item) {
                    return void 0 !== item.command && !item.disabled || _this10._hasEnabledCommandItems(item.items)
                })
            }
            return false
        }
    }, {
        key: "setValue",
        value: function(value) {
            this._updateContextMenuItemValue(this._widget, this._getItemOptionText(), this._rootCommandKey, value)
        }
    }, {
        key: "setItems",
        value: function(items) {
            this._updateContextMenuItems(this._widget, this._getItemOptionText(), this._rootCommandKey, items)
        }
    }, {
        key: "_getItemOptionText",
        value: function() {
            return _uiDiagram4.default.getItemOptionText(this._widget, this._indexPath)
        }
    }]);
    return DiagramToolbarSubItemHelper
}(DiagramToolbarItemHelper);
module.exports = DiagramToolbar;
