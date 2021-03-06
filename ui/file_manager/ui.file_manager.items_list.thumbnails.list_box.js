/**
 * DevExtreme (ui/file_manager/ui.file_manager.items_list.thumbnails.list_box.js)
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
var _array = require("../../core/utils/array");
var _type = require("../../core/utils/type");
var _hold = require("../../events/hold");
var _hold2 = _interopRequireDefault(_hold);
var _utils = require("../../events/utils");
var _events_engine = require("../../events/core/events_engine");
var _events_engine2 = _interopRequireDefault(_events_engine);
var _bindable_template = require("../../core/templates/bindable_template");
var _uiCollection_widget = require("../collection/ui.collection_widget.edit");
var _uiCollection_widget2 = _interopRequireDefault(_uiCollection_widget);

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
var FILE_MANAGER_THUMBNAILS_VIEW_PORT_CLASS = "dx-filemanager-thumbnails-view-port";
var FILE_MANAGER_THUMBNAILS_ITEM_LIST_CONTAINER_CLASS = "dx-filemanager-thumbnails-container";
var FILE_MANAGER_THUMBNAILS_ITEM_CLASS = "dx-filemanager-thumbnails-item";
var FILE_MANAGER_THUMBNAILS_ITEM_NAME_CLASS = "dx-filemanager-thumbnails-item-name";
var FILE_MANAGER_THUMBNAILS_ITEM_SPACER_CLASS = "dx-filemanager-thumbnails-item-spacer";
var FILE_MANAGER_THUMBNAILS_ITEM_DATA_KEY = "dxFileManagerItemData";
var FILE_MANAGER_THUMBNAILS_LIST_BOX_NAMESPACE = "dxFileManagerThumbnailsListBox";
var FILE_MANAGER_THUMBNAILS_LIST_BOX_HOLD_EVENT_NAME = (0, _utils.addNamespace)(_hold2.default.name, FILE_MANAGER_THUMBNAILS_LIST_BOX_NAMESPACE);
var FileManagerThumbnailListBox = function(_CollectionWidget) {
    _inherits(FileManagerThumbnailListBox, _CollectionWidget);
    var _super = _createSuper(FileManagerThumbnailListBox);

    function FileManagerThumbnailListBox() {
        _classCallCheck(this, FileManagerThumbnailListBox);
        return _super.apply(this, arguments)
    }
    _createClass(FileManagerThumbnailListBox, [{
        key: "_initMarkup",
        value: function() {
            this._initActions();
            this.$element().addClass(FILE_MANAGER_THUMBNAILS_VIEW_PORT_CLASS);
            this._renderItemsContainer();
            _get(_getPrototypeOf(FileManagerThumbnailListBox.prototype), "_initMarkup", this).call(this);
            this.onFocusedItemChanged = this._onFocusedItemChanged.bind(this);
            this._layoutUtils = new ListBoxLayoutUtils(this.$element(), this._$itemContainer, this.itemElements().first());
            this._syncFocusedItemKey()
        }
    }, {
        key: "_initActions",
        value: function() {
            this._actions = {
                onItemEnterKeyPressed: this._createActionByOption("onItemEnterKeyPressed"),
                onFocusedItemChanged: this._createActionByOption("onFocusedItemChanged")
            }
        }
    }, {
        key: "_initTemplates",
        value: function() {
            _get(_getPrototypeOf(FileManagerThumbnailListBox.prototype), "_initTemplates", this).call(this);
            this._itemThumbnailTemplate = this.option("itemThumbnailTemplate");
            this._getTooltipText = this.option("getTooltipText");
            this._templateManager.addDefaultTemplates({
                item: new _bindable_template.BindableTemplate(function($container, data, itemModel) {
                    var $itemElement = this._getDefaultItemTemplate(itemModel, $container);
                    $container.append($itemElement)
                }.bind(this), ["fileItem"], this.option("integrationOptions.watchMethod"))
            })
        }
    }, {
        key: "_renderItemsContainer",
        value: function() {
            if (!this._$itemContainer) {
                this._$itemContainer = (0, _renderer2.default)("<div>").addClass(FILE_MANAGER_THUMBNAILS_ITEM_LIST_CONTAINER_CLASS).appendTo(this.$element())
            }
        }
    }, {
        key: "_render",
        value: function() {
            _get(_getPrototypeOf(FileManagerThumbnailListBox.prototype), "_render", this).call(this);
            this._detachEventHandlers();
            this._attachEventHandlers()
        }
    }, {
        key: "_clean",
        value: function() {
            this._detachEventHandlers();
            _get(_getPrototypeOf(FileManagerThumbnailListBox.prototype), "_clean", this).call(this)
        }
    }, {
        key: "_supportedKeys",
        value: function() {
            return (0, _extend.extend)(_get(_getPrototypeOf(FileManagerThumbnailListBox.prototype), "_supportedKeys", this).call(this), {
                upArrow: function(e) {
                    this._beforeKeyProcessing(e);
                    this._processArrowKeys(-1, false, e)
                },
                downArrow: function(e) {
                    this._beforeKeyProcessing(e);
                    this._processArrowKeys(1, false, e)
                },
                home: function(e) {
                    this._beforeKeyProcessing(e);
                    this._processHomeEndKeys(0, true, e)
                },
                end: function(e) {
                    this._beforeKeyProcessing(e);
                    this._processHomeEndKeys(this._getItemsLength() - 1, true, e)
                },
                pageUp: function(e) {
                    this._beforeKeyProcessing(e);
                    this._processPageChange(true, e)
                },
                pageDown: function(e) {
                    this._beforeKeyProcessing(e);
                    this._processPageChange(false, e)
                },
                enter: function(e) {
                    this._beforeKeyProcessing(e);
                    this._onItemEnterKeyPressed(this._getFocusedItem())
                },
                A: function(e) {
                    this._beforeKeyProcessing(e);
                    if (e.ctrlKey || e.metaKey) {
                        this.selectAll()
                    }
                }
            })
        }
    }, {
        key: "_beforeKeyProcessing",
        value: function(e) {
            e.preventDefault();
            this._layoutUtils.reset()
        }
    }, {
        key: "_processArrowKeys",
        value: function(offset, horizontal, eventArgs) {
            var item = this._getFocusedItem();
            if (item) {
                if (!horizontal) {
                    var layout = this._layoutUtils.getLayoutModel();
                    if (!layout) {
                        return
                    }
                    offset *= layout.itemPerRowCount
                }
                var newItemIndex = this._getIndexByItem(item) + offset;
                this._focusItemByIndex(newItemIndex, true, eventArgs)
            }
        }
    }, {
        key: "_processHomeEndKeys",
        value: function(index, scrollToItem, eventArgs) {
            this._focusItemByIndex(index, scrollToItem, eventArgs)
        }
    }, {
        key: "_processPageChange",
        value: function(pageUp, eventArgs) {
            var item = this._getFocusedItem();
            if (!item) {
                return
            }
            var layout = this._layoutUtils.getLayoutModel();
            if (!layout) {
                return
            }
            var itemLayout = this._layoutUtils.createItemLayoutModel(this._getIndexByItem(item));
            var rowOffset = pageUp ? layout.rowPerPageRate : -layout.rowPerPageRate;
            var newRowRate = itemLayout.itemRowIndex - rowOffset;
            var roundFunc = pageUp ? Math.ceil : Math.floor;
            var newRowIndex = roundFunc(newRowRate);
            var newItemIndex = newRowIndex * layout.itemPerRowCount + itemLayout.itemColumnIndex;
            if (newItemIndex < 0) {
                newItemIndex = 0
            } else {
                if (newItemIndex >= this._getItemsLength()) {
                    newItemIndex = this._getItemsLength() - 1
                }
            }
            this._focusItemByIndex(newItemIndex, true, eventArgs)
        }
    }, {
        key: "_processLongTap",
        value: function(e) {
            var $targetItem = this._closestItemElement((0, _renderer2.default)(e.target));
            var itemIndex = this._getIndexByItemElement($targetItem);
            this._selection.changeItemSelection(itemIndex, {
                control: true
            })
        }
    }, {
        key: "_attachEventHandlers",
        value: function() {
            var _this = this;
            if ("multiple" === this.option("selectionMode")) {
                _events_engine2.default.on(this._itemContainer(), FILE_MANAGER_THUMBNAILS_LIST_BOX_HOLD_EVENT_NAME, ".".concat(this._itemContentClass()), function(e) {
                    _this._processLongTap(e);
                    e.stopPropagation()
                })
            }
            _events_engine2.default.on(this._itemContainer(), "mousedown selectstart", function(e) {
                if (e.shiftKey) {
                    e.preventDefault()
                }
            })
        }
    }, {
        key: "_detachEventHandlers",
        value: function() {
            _events_engine2.default.off(this._itemContainer(), FILE_MANAGER_THUMBNAILS_LIST_BOX_HOLD_EVENT_NAME);
            _events_engine2.default.off(this._itemContainer(), "mousedown selectstart")
        }
    }, {
        key: "_itemContainer",
        value: function() {
            return this._$itemContainer
        }
    }, {
        key: "_itemClass",
        value: function() {
            return FILE_MANAGER_THUMBNAILS_ITEM_CLASS
        }
    }, {
        key: "_itemDataKey",
        value: function() {
            return FILE_MANAGER_THUMBNAILS_ITEM_DATA_KEY
        }
    }, {
        key: "_getDefaultItemTemplate",
        value: function(fileItemInfo, $itemElement) {
            $itemElement.attr("title", this._getTooltipText(fileItemInfo));
            var $itemThumbnail = this._itemThumbnailTemplate(fileItemInfo);
            var $itemSpacer = (0, _renderer2.default)("<div>").addClass(FILE_MANAGER_THUMBNAILS_ITEM_SPACER_CLASS);
            var $itemName = (0, _renderer2.default)("<div>").addClass(FILE_MANAGER_THUMBNAILS_ITEM_NAME_CLASS).text(fileItemInfo.fileItem.name);
            $itemElement.append($itemThumbnail, $itemSpacer, $itemName)
        }
    }, {
        key: "_itemSelectHandler",
        value: function(e) {
            var options = {};
            if ("multiple" === this.option("selectionMode")) {
                if (!this._isPreserveSelectionMode) {
                    this._isPreserveSelectionMode = e.ctrlKey || e.metaKey || e.shiftKey
                }
                options = {
                    control: this._isPreserveSelectionMode,
                    shift: e.shiftKey
                }
            }
            var index = this._getIndexByItemElement(e.currentTarget);
            this._selection.changeItemSelection(index, options)
        }
    }, {
        key: "_updateSelection",
        value: function(addedSelection, removedSelection) {
            for (var i = 0; i < removedSelection.length; i++) {
                this._removeSelection(removedSelection[i])
            }
            for (var _i = 0; _i < addedSelection.length; _i++) {
                this._addSelection(addedSelection[_i])
            }
            var selectedItemsCount = this.getSelectedItems().length;
            if (0 === selectedItemsCount) {
                this._isPreserveSelectionMode = false
            }
        }
    }, {
        key: "_focusOutHandler",
        value: function() {}
    }, {
        key: "_getItems",
        value: function() {
            return this.option("items") || []
        }
    }, {
        key: "_getItemsLength",
        value: function() {
            return this._getItems().length
        }
    }, {
        key: "_getIndexByItemElement",
        value: function(itemElement) {
            return this._editStrategy.getNormalizedIndex(itemElement)
        }
    }, {
        key: "_getItemByIndex",
        value: function(index) {
            return this._getItems()[index]
        }
    }, {
        key: "_getFocusedItem",
        value: function() {
            return this.getItemByItemElement(this.option("focusedElement"))
        }
    }, {
        key: "_focusItem",
        value: function(item, scrollToItem) {
            this.option("focusedElement", this.getItemElementByItem(item));
            if (scrollToItem) {
                this._layoutUtils.scrollToItem(this._getIndexByItem(item))
            }
        }
    }, {
        key: "_focusItemByIndex",
        value: function(index, scrollToItem, eventArgs) {
            if (index >= 0 && index < this._getItemsLength()) {
                var item = this._getItemByIndex(index);
                this._focusItem(item, scrollToItem, eventArgs)
            }
        }
    }, {
        key: "_syncFocusedItemKey",
        value: function() {
            var _this2 = this;
            if (this._dataSource && this._dataSource.isLoading()) {
                return
            }
            var focusedItemKey = this.option("focusedItemKey");
            if (!(0, _type.isDefined)(focusedItemKey)) {
                return
            }
            var items = this.option("items");
            var focusedItem = (0, _array.find)(items, function(item) {
                return _this2.keyOf(item) === focusedItemKey
            });
            if (focusedItem) {
                this._focusItem(focusedItem)
            } else {
                this.option("focusedItemKey", void 0)
            }
        }
    }, {
        key: "_onFocusedItemChanged",
        value: function() {
            var focusedItem = this._getFocusedItem();
            var newFocusedItemKey = this.keyOf(focusedItem);
            var oldFocusedItemKey = this.option("focusedItemKey");
            if (newFocusedItemKey !== oldFocusedItemKey) {
                this.option("focusedItemKey", newFocusedItemKey);
                this._raiseFocusedItemChanged(focusedItem)
            }
        }
    }, {
        key: "_raiseFocusedItemChanged",
        value: function(focusedItem) {
            var args = {
                item: focusedItem,
                itemElement: this.option("focusedElement")
            };
            this._actions.onFocusedItemChanged(args)
        }
    }, {
        key: "_changeItemSelection",
        value: function(item, select) {
            if (this.isItemSelected(item) === select) {
                return
            }
            var itemElement = this.getItemElementByItem(item);
            var index = this._getIndexByItemElement(itemElement);
            this._selection.changeItemSelection(index, {
                control: this._isPreserveSelectionMode
            })
        }
    }, {
        key: "getSelectedItems",
        value: function() {
            return this._selection.getSelectedItems()
        }
    }, {
        key: "getItemElementByItem",
        value: function(item) {
            return this._findItemElementByItem(item)
        }
    }, {
        key: "getItemByItemElement",
        value: function(itemElement) {
            return this._getItemByIndex(this._getIndexByItemElement(itemElement))
        }
    }, {
        key: "selectAll",
        value: function() {
            this._selection.selectAll();
            this._isPreserveSelectionMode = true
        }
    }, {
        key: "selectItem",
        value: function(item) {
            this._changeItemSelection(item, true)
        }
    }, {
        key: "deselectItem",
        value: function(item) {
            this._changeItemSelection(item, false)
        }
    }, {
        key: "clearSelection",
        value: function() {
            this._selection.deselectAll()
        }
    }, {
        key: "_optionChanged",
        value: function(args) {
            switch (args.name) {
                case "items":
                    if (this._layoutUtils) {
                        this._layoutUtils.updateItems(this.itemElements().first())
                    }
                    _get(_getPrototypeOf(FileManagerThumbnailListBox.prototype), "_optionChanged", this).call(this, args);
                    break;
                case "focusedItemKey":
                    if ((0, _type.isDefined)(args.value)) {
                        this._syncFocusedItemKey();
                        this._onFocusedItemChanged()
                    } else {
                        this.option("focusedElement", null);
                        this._raiseFocusedItemChanged(null)
                    }
                    break;
                case "onItemEnterKeyPressed":
                case "onFocusedItemChanged":
                    this._actions[args.name] = this._createActionByOption(args.name);
                    break;
                default:
                    _get(_getPrototypeOf(FileManagerThumbnailListBox.prototype), "_optionChanged", this).call(this, args)
            }
        }
    }]);
    return FileManagerThumbnailListBox
}(_uiCollection_widget2.default);
var ListBoxLayoutUtils = function() {
    function ListBoxLayoutUtils($viewPort, $itemContainer, $item) {
        _classCallCheck(this, ListBoxLayoutUtils);
        this._layoutModel = null;
        this._$viewPort = $viewPort;
        this._$itemContainer = $itemContainer;
        this._$item = $item
    }
    _createClass(ListBoxLayoutUtils, [{
        key: "updateItems",
        value: function($item) {
            this._$item = $item
        }
    }, {
        key: "reset",
        value: function() {
            this._layoutModel = null
        }
    }, {
        key: "getLayoutModel",
        value: function() {
            if (!this._layoutModel) {
                this._layoutModel = this._createLayoutModel()
            }
            return this._layoutModel
        }
    }, {
        key: "_createLayoutModel",
        value: function() {
            if (!this._$item) {
                return null
            }
            var itemWidth = this._$item.outerWidth(true);
            if (0 === itemWidth) {
                return null
            }
            var itemHeight = this._$item.outerHeight(true);
            var viewPortWidth = this._$itemContainer.innerWidth();
            var viewPortHeight = this._$viewPort.innerHeight();
            var viewPortScrollTop = this._$viewPort.scrollTop();
            var viewPortScrollBottom = viewPortScrollTop + viewPortHeight;
            var itemPerRowCount = Math.floor(viewPortWidth / itemWidth);
            var rowPerPageRate = viewPortHeight / itemHeight;
            return {
                itemWidth: itemWidth,
                itemHeight: itemHeight,
                viewPortWidth: viewPortWidth,
                viewPortHeight: viewPortHeight,
                viewPortScrollTop: viewPortScrollTop,
                viewPortScrollBottom: viewPortScrollBottom,
                itemPerRowCount: itemPerRowCount,
                rowPerPageRate: rowPerPageRate
            }
        }
    }, {
        key: "createItemLayoutModel",
        value: function(index) {
            var layout = this.getLayoutModel();
            if (!layout) {
                return null
            }
            var itemRowIndex = Math.floor(index / layout.itemPerRowCount);
            var itemColumnIndex = index % layout.itemPerRowCount;
            var itemTop = itemRowIndex * layout.itemHeight;
            var itemBottom = itemTop + layout.itemHeight;
            return {
                itemRowIndex: itemRowIndex,
                itemColumnIndex: itemColumnIndex,
                itemTop: itemTop,
                itemBottom: itemBottom
            }
        }
    }, {
        key: "scrollToItem",
        value: function(index) {
            var layout = this.getLayoutModel();
            if (!layout) {
                return
            }
            var itemRowIndex = Math.floor(index / layout.itemPerRowCount);
            var itemTop = itemRowIndex * layout.itemHeight;
            var itemBottom = itemTop + layout.itemHeight;
            var newScrollTop = layout.viewPortScrollTop;
            if (itemTop < layout.viewPortScrollTop) {
                newScrollTop = itemTop
            } else {
                if (itemBottom > layout.viewPortScrollBottom) {
                    newScrollTop = itemBottom - layout.viewPortHeight
                }
            }
            this._$viewPort.scrollTop(newScrollTop)
        }
    }]);
    return ListBoxLayoutUtils
}();
module.exports = FileManagerThumbnailListBox;
