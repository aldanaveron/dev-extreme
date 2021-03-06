/**
 * DevExtreme (ui/file_manager/ui.file_manager.item_list.thumbnails.js)
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
var _events_engine = require("../../events/core/events_engine");
var _events_engine2 = _interopRequireDefault(_events_engine);
var _utils = require("../../events/utils");
var _contextmenu = require("../../events/contextmenu");
var _uiFile_manager = require("./ui.file_manager.common");
var _message = require("../../localization/message");
var _message2 = _interopRequireDefault(_message);
var _uiFile_managerItems_listThumbnails = require("./ui.file_manager.items_list.thumbnails.list_box");
var _uiFile_managerItems_listThumbnails2 = _interopRequireDefault(_uiFile_managerItems_listThumbnails);
var _uiFile_manager2 = require("./ui.file_manager.item_list");
var _uiFile_manager3 = _interopRequireDefault(_uiFile_manager2);

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
var FILE_MANAGER_THUMBNAILS_ITEM_LIST_CLASS = "dx-filemanager-thumbnails";
var FILE_MANAGER_THUMBNAILS_ITEM_CLASS = "dx-filemanager-thumbnails-item";
var FILE_MANAGER_THUMBNAILS_ITEM_THUMBNAIL_CLASS = "dx-filemanager-thumbnails-item-thumbnail";
var FILE_MANAGER_THUMBNAILS_EVENT_NAMESPACE = "dxFileManager_thumbnails";
var FileManagerThumbnailsItemList = function(_FileManagerItemListB) {
    _inherits(FileManagerThumbnailsItemList, _FileManagerItemListB);
    var _super = _createSuper(FileManagerThumbnailsItemList);

    function FileManagerThumbnailsItemList() {
        _classCallCheck(this, FileManagerThumbnailsItemList);
        return _super.apply(this, arguments)
    }
    _createClass(FileManagerThumbnailsItemList, [{
        key: "_initMarkup",
        value: function() {
            _get(_getPrototypeOf(FileManagerThumbnailsItemList.prototype), "_initMarkup", this).call(this);
            this.$element().addClass(FILE_MANAGER_THUMBNAILS_ITEM_LIST_CLASS);
            var contextMenuEvent = (0, _utils.addNamespace)(_contextmenu.name, FILE_MANAGER_THUMBNAILS_EVENT_NAMESPACE);
            _events_engine2.default.on(this.$element(), contextMenuEvent, this._onContextMenu.bind(this));
            this._createItemList()
        }
    }, {
        key: "_createItemList",
        value: function() {
            var selectionMode = this._isMultipleSelectionMode() ? "multiple" : "single";
            var $itemListContainer = (0, _renderer2.default)("<div>").appendTo(this.$element());
            this._itemList = this._createComponent($itemListContainer, _uiFile_managerItems_listThumbnails2.default, {
                dataSource: this._createDataSource(),
                selectionMode: selectionMode,
                selectedItemKeys: this.option("selectedItemKeys"),
                focusedItemKey: this.option("focusedItemKey"),
                activeStateEnabled: true,
                hoverStateEnabled: true,
                loopItemFocus: false,
                focusStateEnabled: true,
                onItemEnterKeyPressed: this._tryOpen.bind(this),
                itemThumbnailTemplate: this._getItemThumbnailContainer.bind(this),
                getTooltipText: this._getTooltipText.bind(this),
                onSelectionChanged: this._onItemListSelectionChanged.bind(this),
                onFocusedItemChanged: this._onItemListFocusedItemChanged.bind(this)
            })
        }
    }, {
        key: "_onContextMenu",
        value: function(e) {
            e.preventDefault();
            if (!this._isDesktop()) {
                return
            }
            var items = null;
            var targetItemElement = (0, _renderer2.default)(e.target).closest(this._getItemSelector());
            if (targetItemElement.length > 0) {
                var targetItem = this._itemList.getItemByItemElement(targetItemElement);
                this._itemList.selectItem(targetItem);
                items = this._getFileItemsForContextMenu(targetItem)
            }
            this._showContextMenu(items, e.target, e)
        }
    }, {
        key: "_getItemThumbnailCssClass",
        value: function() {
            return FILE_MANAGER_THUMBNAILS_ITEM_THUMBNAIL_CLASS
        }
    }, {
        key: "_getItemSelector",
        value: function() {
            return ".".concat(FILE_MANAGER_THUMBNAILS_ITEM_CLASS)
        }
    }, {
        key: "_getTooltipText",
        value: function(fileItemInfo) {
            var item = fileItemInfo.fileItem;
            if (item.tooltipText) {
                return item.tooltipText
            }
            var text = "".concat(item.name, "\r\n");
            if (!item.isDirectory) {
                text += "".concat(_message2.default.format("dxFileManager-listThumbnailsTooltipTextSize"), ": ").concat((0, _uiFile_manager.getDisplayFileSize)(item.size), "\r\n")
            }
            text += "".concat(_message2.default.format("dxFileManager-listThumbnailsTooltipTextDateModified"), ": ").concat(item.dateModified);
            return text
        }
    }, {
        key: "_onItemDblClick",
        value: function(e) {
            var $item = (0, _renderer2.default)(e.currentTarget);
            var item = this._itemList.getItemByItemElement($item);
            this._tryOpen(item)
        }
    }, {
        key: "_tryOpen",
        value: function(item) {
            if (item) {
                this._raiseSelectedItemOpened(item)
            }
        }
    }, {
        key: "_disableDragging",
        value: function() {
            return false
        }
    }, {
        key: "_getDefaultOptions",
        value: function() {
            return (0, _extend.extend)(_get(_getPrototypeOf(FileManagerThumbnailsItemList.prototype), "_getDefaultOptions", this).call(this), {
                focusStateEnabled: true
            })
        }
    }, {
        key: "_onItemListSelectionChanged",
        value: function(_ref) {
            var addedItems = _ref.addedItems,
                removedItems = _ref.removedItems;
            var selectedItemInfos = this.getSelectedItems();
            var selectedItems = selectedItemInfos.map(function(itemInfo) {
                return itemInfo.fileItem
            });
            var selectedItemKeys = selectedItems.map(function(item) {
                return item.key
            });
            var currentSelectedItemKeys = addedItems.map(function(itemInfo) {
                return itemInfo.fileItem.key
            });
            var currentDeselectedItemKeys = removedItems.map(function(itemInfo) {
                return itemInfo.fileItem.key
            });
            this._tryRaiseSelectionChanged({
                selectedItemInfos: selectedItemInfos,
                selectedItems: selectedItems,
                selectedItemKeys: selectedItemKeys,
                currentSelectedItemKeys: currentSelectedItemKeys,
                currentDeselectedItemKeys: currentDeselectedItemKeys
            })
        }
    }, {
        key: "_onItemListFocusedItemChanged",
        value: function(e) {
            this._raiseFocusedItemChanged(e)
        }
    }, {
        key: "_setSelectedItemKeys",
        value: function(itemKeys) {
            this._itemList.option("selectedItemKeys", itemKeys)
        }
    }, {
        key: "_setFocusedItemKey",
        value: function(itemKey) {
            this._itemList.option("focusedItemKey", itemKey)
        }
    }, {
        key: "refresh",
        value: function() {
            this.clearSelection();
            this._itemList.option("dataSource", this._createDataSource())
        }
    }, {
        key: "_deselectItem",
        value: function(item) {
            var itemElement = this._itemList.getItemElementByItem(item);
            this._itemList.unselectItem(itemElement)
        }
    }, {
        key: "clearSelection",
        value: function() {
            this._itemList.clearSelection()
        }
    }, {
        key: "getSelectedItems",
        value: function() {
            return this._itemList.getSelectedItems()
        }
    }]);
    return FileManagerThumbnailsItemList
}(_uiFile_manager3.default);
module.exports = FileManagerThumbnailsItemList;
