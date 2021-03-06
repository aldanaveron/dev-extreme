/**
 * DevExtreme (ui/file_manager/ui.file_manager.toolbar.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _renderer = require("../../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _extend = require("../../core/utils/extend");
var _type = require("../../core/utils/type");
var _common = require("../../core/utils/common");
var _message = require("../../localization/message");
var _message2 = _interopRequireDefault(_message);
var _uiFile_manager = require("./ui.file_manager.common");
var _ui = require("../widget/ui.widget");
var _ui2 = _interopRequireDefault(_ui);
var _toolbar = require("../toolbar");
var _toolbar2 = _interopRequireDefault(_toolbar);
require("../drop_down_button");

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
var FILE_MANAGER_TOOLBAR_CLASS = "dx-filemanager-toolbar";
var FILE_MANAGER_GENERAL_TOOLBAR_CLASS = "dx-filemanager-general-toolbar";
var FILE_MANAGER_FILE_TOOLBAR_CLASS = "dx-filemanager-file-toolbar";
var FILE_MANAGER_TOOLBAR_SEPARATOR_ITEM_CLASS = FILE_MANAGER_TOOLBAR_CLASS + "-separator-item";
var FILE_MANAGER_TOOLBAR_VIEWMODE_ITEM_CLASS = FILE_MANAGER_TOOLBAR_CLASS + "-viewmode-item";
var FILE_MANAGER_TOOLBAR_HAS_LARGE_ICON_CLASS = FILE_MANAGER_TOOLBAR_CLASS + "-has-large-icon";
var FILE_MANAGER_VIEW_SWITCHER_POPUP_CLASS = "dx-filemanager-view-switcher-popup";
var DEFAULT_ITEM_CONFIGS = {
    showNavPane: {
        location: "before"
    },
    create: {
        location: "before",
        compactMode: {
            showText: "inMenu",
            locateInMenu: "auto"
        }
    },
    upload: {
        location: "before",
        compactMode: {
            showText: "inMenu",
            locateInMenu: "auto"
        }
    },
    refresh: {
        location: "after",
        showText: "inMenu",
        cssClass: FILE_MANAGER_TOOLBAR_HAS_LARGE_ICON_CLASS,
        compactMode: {
            showText: "inMenu",
            locateInMenu: "auto"
        }
    },
    switchView: {
        location: "after"
    },
    download: {
        location: "before",
        compactMode: {
            showText: "inMenu",
            locateInMenu: "auto"
        }
    },
    move: {
        location: "before",
        compactMode: {
            showText: "inMenu",
            locateInMenu: "auto"
        }
    },
    copy: {
        location: "before",
        compactMode: {
            showText: "inMenu",
            locateInMenu: "auto"
        }
    },
    rename: {
        location: "before",
        compactMode: {
            showText: "inMenu",
            locateInMenu: "auto"
        }
    },
    "delete": {
        location: "before",
        compactMode: {
            showText: "inMenu"
        }
    },
    clear: {
        location: "after",
        locateInMenu: "never",
        compactMode: {
            showText: "inMenu"
        }
    },
    separator: {
        location: "before"
    }
};
var ALWAYS_VISIBLE_TOOLBAR_ITEMS = ["separator", "switchView"];
var REFRESH_ICON_MAP = {
    "default": "dx-filemanager-i dx-filemanager-i-refresh",
    progress: "dx-filemanager-i dx-filemanager-i-progress",
    success: "dx-filemanager-i dx-filemanager-i-done",
    error: "dx-filemanager-i dx-filemanager-i-danger"
};
var REFRESH_ITEM_PROGRESS_MESSAGE_DELAY = 500;
var FileManagerToolbar = function(_Widget) {
    _inherits(FileManagerToolbar, _Widget);
    var _super = _createSuper(FileManagerToolbar);

    function FileManagerToolbar() {
        _classCallCheck(this, FileManagerToolbar);
        return _super.apply(this, arguments)
    }
    _createClass(FileManagerToolbar, [{
        key: "_initMarkup",
        value: function() {
            this._commandManager = this.option("commandManager");
            this._createItemClickedAction();
            this._generalToolbarVisible = true;
            this._$viewSwitcherPopup = (0, _renderer2.default)("<div>").addClass(FILE_MANAGER_VIEW_SWITCHER_POPUP_CLASS);
            this._generalToolbar = this._createToolbar(this.option("generalItems"));
            this._fileToolbar = this._createToolbar(this.option("fileItems"), true);
            this._$viewSwitcherPopup.appendTo(this.$element());
            this.$element().addClass(FILE_MANAGER_TOOLBAR_CLASS + " " + FILE_MANAGER_GENERAL_TOOLBAR_CLASS)
        }
    }, {
        key: "_render",
        value: function() {
            _get(_getPrototypeOf(FileManagerToolbar.prototype), "_render", this).call(this);
            var toolbar = this._getVisibleToolbar();
            this._checkCompactMode(toolbar)
        }
    }, {
        key: "_dimensionChanged",
        value: function(dimension) {
            if (!dimension || "height" !== dimension) {
                var toolbar = this._getVisibleToolbar();
                this._checkCompactMode(toolbar)
            }
        }
    }, {
        key: "_getVisibleToolbar",
        value: function() {
            return this._generalToolbarVisible ? this._generalToolbar : this._fileToolbar
        }
    }, {
        key: "_createToolbar",
        value: function(items, hidden) {
            var _this = this;
            var toolbarItems = this._getPreparedItems(items);
            var $toolbar = (0, _renderer2.default)("<div>").appendTo(this.$element());
            var result = this._createComponent($toolbar, _toolbar2.default, {
                items: toolbarItems,
                visible: !hidden,
                onItemClick: function(args) {
                    return _this._raiseItemClicked(args)
                }
            });
            result.compactMode = false;
            return result
        }
    }, {
        key: "_getPreparedItems",
        value: function(items) {
            var _this2 = this;
            items = items.map(function(item) {
                var extendedItem = item;
                if ((0, _type.isString)(item)) {
                    extendedItem = {
                        name: item
                    }
                }
                var commandName = extendedItem.name;
                var preparedItem = _this2._configureItemByCommandName(commandName, extendedItem);
                preparedItem.originalItemData = item;
                if ("separator" !== commandName) {
                    preparedItem.available = _this2._isToolbarItemAvailable(preparedItem);
                    var itemVisible = preparedItem.available;
                    preparedItem.visible = itemVisible
                }
                return preparedItem
            });
            return this._updateSeparatorsVisibility(items)
        }
    }, {
        key: "_updateSeparatorsVisibility",
        value: function(items, toolbar) {
            for (var i = 0; i < items.length; i++) {
                if ("separator" === items[i].name) {
                    var isSeparatorVisible = this._groupHasItems(items, i, true) && this._groupHasItems(items, i, false);
                    if (toolbar) {
                        var optionName = "items[".concat(i, "].visible");
                        toolbar.option(optionName, isSeparatorVisible)
                    } else {
                        items[i].visible = isSeparatorVisible
                    }
                }
            }
            return items
        }
    }, {
        key: "_groupHasItems",
        value: function(items, separatorIndex, isBeforeGroup) {
            var delta = isBeforeGroup ? -1 : 1;
            var i = separatorIndex + delta;
            while (items[i] && "separator" !== items[i].name) {
                if (items[i].visible) {
                    return true
                }
                i += delta
            }
            return false
        }
    }, {
        key: "_configureItemByCommandName",
        value: function(commandName, item) {
            var result = {};
            var command = this._commandManager.getCommandByName(commandName);
            if (command) {
                result = this._createCommandItem(command)
            }
            switch (commandName) {
                case "separator":
                    result = this._createSeparatorItem();
                    break;
                case "switchView":
                    result = this._createViewModeItem()
            }
            if (this._isDefaultItem(commandName)) {
                var defaultConfig = DEFAULT_ITEM_CONFIGS[commandName];
                (0, _extend.extend)(true, result, defaultConfig);
                (0, _uiFile_manager.extendAttributes)(result, item, ["visible", "location", "locateInMenu"]);
                if (!(0, _type.isDefined)(item.visible)) {
                    result._autoHide = true
                } else {
                    (0, _uiFile_manager.extendAttributes)(result, item, ["disabled"])
                }(0, _uiFile_manager.extendAttributes)(result.options, item, ["text", "icon"])
            } else {
                (0, _extend.extend)(true, result, item);
                if (!result.widget) {
                    result.widget = "dxButton"
                }
            }
            if (commandName && !result.name) {
                (0, _extend.extend)(result, {
                    name: commandName
                })
            }
            if ("dxButton" === result.widget) {
                (0, _extend.extend)(true, result, {
                    options: {
                        stylingMode: "text"
                    }
                })
            }
            if ("dxSelectBox" === result.widget) {
                (0, _extend.extend)(true, result, {
                    options: {
                        stylingMode: "filled"
                    }
                })
            }
            return result
        }
    }, {
        key: "_isDefaultItem",
        value: function(commandName) {
            return !!DEFAULT_ITEM_CONFIGS[commandName]
        }
    }, {
        key: "_createCommandItem",
        value: function(command) {
            var _this3 = this;
            return {
                widget: "dxButton",
                options: {
                    text: command.text,
                    commandText: command.text,
                    icon: command.icon,
                    stylingMode: "text",
                    onClick: function(e) {
                        return _this3._executeCommand(command)
                    }
                }
            }
        }
    }, {
        key: "_createSeparatorItem",
        value: function() {
            return {
                template: function(data, index, element) {
                    (0, _renderer2.default)(element).addClass(FILE_MANAGER_TOOLBAR_SEPARATOR_ITEM_CLASS)
                }
            }
        }
    }, {
        key: "_createViewModeItem",
        value: function() {
            var _this4 = this;
            var commandItems = ["details", "thumbnails"].map(function(name) {
                var _this4$_commandManage = _this4._commandManager.getCommandByName(name),
                    text = _this4$_commandManage.text,
                    icon = _this4$_commandManage.icon;
                return {
                    name: name,
                    text: text,
                    icon: icon
                }
            });
            var selectedIndex = "thumbnails" === this.option("itemViewMode") ? 1 : 0;
            return {
                cssClass: FILE_MANAGER_TOOLBAR_VIEWMODE_ITEM_CLASS,
                widget: "dxDropDownButton",
                options: {
                    items: commandItems,
                    keyExpr: "name",
                    selectedItemKey: this.option("itemViewMode"),
                    displayExpr: " ",
                    hint: commandItems[selectedIndex].text,
                    stylingMode: "text",
                    showArrowIcon: false,
                    useSelectMode: true,
                    dropDownOptions: {
                        container: this._$viewSwitcherPopup
                    },
                    onItemClick: function(e) {
                        return _this4._executeCommand(e.itemData.name)
                    }
                }
            }
        }
    }, {
        key: "_checkCompactMode",
        value: function(toolbar) {
            if (toolbar.compactMode) {
                this._toggleCompactMode(toolbar, false)
            }
            var toolbarWidth = toolbar.$element().width();
            var itemsWidth = toolbar._getItemsWidth();
            var useCompactMode = toolbarWidth < itemsWidth;
            if (toolbar.compactMode !== useCompactMode) {
                if (!toolbar.compactMode) {
                    this._toggleCompactMode(toolbar, useCompactMode)
                }
                toolbar.compactMode = useCompactMode
            } else {
                if (toolbar.compactMode) {
                    this._toggleCompactMode(toolbar, true)
                }
            }
        }
    }, {
        key: "_toggleCompactMode",
        value: function(toolbar, useCompactMode) {
            var _this5 = this;
            toolbar.beginUpdate();
            var items = toolbar.option("items");
            items.forEach(function(item, index) {
                if (item.compactMode) {
                    var optionsSource = null;
                    if (useCompactMode) {
                        item.saved = _this5._getCompactModeOptions(item, item.available);
                        optionsSource = item.compactMode
                    } else {
                        optionsSource = item.saved
                    }
                    var options = _this5._getCompactModeOptions(optionsSource, item.available);
                    toolbar.option("items[".concat(index, "]"), options)
                }
            });
            toolbar.endUpdate()
        }
    }, {
        key: "_getCompactModeOptions",
        value: function(_ref, available) {
            var showText = _ref.showText,
                locateInMenu = _ref.locateInMenu;
            return {
                visible: available,
                showText: (0, _common.ensureDefined)(showText, "always"),
                locateInMenu: (0, _common.ensureDefined)(locateInMenu, "never")
            }
        }
    }, {
        key: "_ensureAvailableCommandsVisible",
        value: function(toolbar, fileItems) {
            var _this6 = this;
            toolbar.beginUpdate();
            var items = toolbar.option("items");
            items.forEach(function(item, index) {
                if ("separator" !== item.name) {
                    var itemVisible = item.available;
                    item.available = _this6._isToolbarItemAvailable(item, fileItems);
                    if (item.available !== itemVisible) {
                        var optionName = "items[".concat(index, "].visible");
                        toolbar.option(optionName, item.available)
                    }
                }
            });
            this._updateSeparatorsVisibility(toolbar.option("items"), toolbar);
            toolbar.endUpdate()
        }
    }, {
        key: "_fileToolbarHasEffectiveItems",
        value: function(fileItems) {
            var _this7 = this;
            var items = this._fileToolbar.option("items");
            return items.some(function(_ref2) {
                var name = _ref2.name;
                return "clear" !== name && "refresh" !== name && _this7._commandManager.isCommandAvailable(name, fileItems)
            })
        }
    }, {
        key: "_executeCommand",
        value: function(command) {
            this._commandManager.executeCommand(command)
        }
    }, {
        key: "_isToolbarItemAvailable",
        value: function(toolbarItem, fileItems) {
            if (!this._isDefaultItem(toolbarItem.name) || !toolbarItem._autoHide) {
                return (0, _common.ensureDefined)(toolbarItem.visible, true)
            }
            if ("refresh" === toolbarItem.name) {
                return this._generalToolbarVisible || !!this._isRefreshVisibleInFileToolbar
            }
            if (ALWAYS_VISIBLE_TOOLBAR_ITEMS.indexOf(toolbarItem.name) > -1) {
                return true
            }
            return this._commandManager.isCommandAvailable(toolbarItem.name, fileItems)
        }
    }, {
        key: "_updateItemInToolbar",
        value: function(toolbar, commandName, options) {
            toolbar.beginUpdate();
            var items = toolbar.option("items");
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (item.name === commandName) {
                    toolbar.option("items[".concat(i, "]"), options);
                    break
                }
            }
            toolbar.endUpdate()
        }
    }, {
        key: "_raiseItemClicked",
        value: function(args) {
            var changedArgs = (0, _extend.extend)(true, {}, args);
            changedArgs.itemData = args.itemData.originalItemData;
            this._itemClickedAction(changedArgs)
        }
    }, {
        key: "_createItemClickedAction",
        value: function() {
            this._itemClickedAction = this._createActionByOption("onItemClick")
        }
    }, {
        key: "_getDefaultOptions",
        value: function() {
            return (0, _extend.extend)(_get(_getPrototypeOf(FileManagerToolbar.prototype), "_getDefaultOptions", this).call(this), {
                commandManager: null,
                generalItems: [],
                fileItems: [],
                itemViewMode: "details",
                onItemClick: null
            })
        }
    }, {
        key: "_optionChanged",
        value: function(args) {
            var name = args.name;
            switch (name) {
                case "commandManager":
                case "itemViewMode":
                case "generalItems":
                case "fileItems":
                    this.repaint();
                    break;
                case "onItemClick":
                    this._itemClickedAction = this._createActionByOption(name);
                    break;
                default:
                    _get(_getPrototypeOf(FileManagerToolbar.prototype), "_optionChanged", this).call(this, args)
            }
        }
    }, {
        key: "updateRefreshItem",
        value: function(message, status) {
            var generalToolbarOptions = null;
            var text = _message2.default.format("dxFileManager-commandRefresh");
            var showText = "inMenu";
            this._isRefreshVisibleInFileToolbar = false;
            if ("default" === status) {
                generalToolbarOptions = {
                    options: {
                        icon: REFRESH_ICON_MAP.default
                    }
                }
            } else {
                generalToolbarOptions = {
                    options: {
                        icon: REFRESH_ICON_MAP[status]
                    }
                };
                this._isRefreshVisibleInFileToolbar = true;
                text = message;
                showText = "always"
            }
            var fileToolbarOptions = (0, _extend.extend)({}, generalToolbarOptions, {
                visible: this._isRefreshVisibleInFileToolbar
            });
            this._applyRefreshItemOptions(generalToolbarOptions, fileToolbarOptions);
            this._refreshItemTextTimeout = this._updateRefreshItemText("progress" === status, text, showText)
        }
    }, {
        key: "_updateRefreshItemText",
        value: function(isDeferredUpdate, text, showText) {
            var _this8 = this;
            var options = {
                showText: showText,
                options: {
                    text: text
                }
            };
            if (isDeferredUpdate) {
                return setTimeout(function() {
                    _this8._applyRefreshItemOptions(options);
                    _this8._refreshItemTextTimeout = void 0
                }, REFRESH_ITEM_PROGRESS_MESSAGE_DELAY)
            } else {
                if (this._refreshItemTextTimeout) {
                    clearTimeout(this._refreshItemTextTimeout)
                }
                this._applyRefreshItemOptions(options);
                return
            }
        }
    }, {
        key: "_applyRefreshItemOptions",
        value: function(generalToolbarOptions, fileToolbarOptions) {
            if (!fileToolbarOptions) {
                fileToolbarOptions = (0, _extend.extend)({}, generalToolbarOptions)
            }
            this._updateItemInToolbar(this._generalToolbar, "refresh", generalToolbarOptions);
            this._updateItemInToolbar(this._fileToolbar, "refresh", fileToolbarOptions)
        }
    }, {
        key: "update",
        value: function(fileItems) {
            fileItems = (0, _common.ensureDefined)(fileItems, []);
            var showGeneralToolbar = 0 === fileItems.length || !this._fileToolbarHasEffectiveItems(fileItems);
            if (this._generalToolbarVisible !== showGeneralToolbar) {
                this._generalToolbar.option("visible", showGeneralToolbar);
                this._fileToolbar.option("visible", !showGeneralToolbar);
                this._generalToolbarVisible = showGeneralToolbar;
                this.$element().toggleClass(FILE_MANAGER_GENERAL_TOOLBAR_CLASS, showGeneralToolbar);
                this.$element().toggleClass(FILE_MANAGER_FILE_TOOLBAR_CLASS, !showGeneralToolbar)
            }
            var toolbar = this._getVisibleToolbar();
            this._ensureAvailableCommandsVisible(toolbar, fileItems);
            this._checkCompactMode(toolbar)
        }
    }]);
    return FileManagerToolbar
}(_ui2.default);
module.exports = FileManagerToolbar;
