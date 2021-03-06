/**
 * DevExtreme (ui/file_manager/ui.file_manager.item_list.details.js)
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
var _uiFile_manager = require("./ui.file_manager.common");
var _type = require("../../core/utils/type");
var _message = require("../../localization/message");
var _message2 = _interopRequireDefault(_message);
var _ui = require("../data_grid/ui.data_grid");
var _ui2 = _interopRequireDefault(_ui);
var _uiFile_manager2 = require("./ui.file_manager.item_list");
var _uiFile_manager3 = _interopRequireDefault(_uiFile_manager2);
var _uiFile_manager4 = require("./ui.file_manager.file_actions_button");
var _uiFile_manager5 = _interopRequireDefault(_uiFile_manager4);

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
var FILE_MANAGER_DETAILS_ITEM_LIST_CLASS = "dx-filemanager-details";
var FILE_MANAGER_DETAILS_ITEM_THUMBNAIL_CLASS = "dx-filemanager-details-item-thumbnail";
var FILE_MANAGER_DETAILS_ITEM_NAME_CLASS = "dx-filemanager-details-item-name";
var FILE_MANAGER_DETAILS_ITEM_NAME_WRAPPER_CLASS = "dx-filemanager-details-item-name-wrapper";
var FILE_MANAGER_DETAILS_ITEM_IS_DIRECTORY_CLASS = "dx-filemanager-details-item-is-directory";
var FILE_MANAGER_PARENT_DIRECTORY_ITEM = "dx-filemanager-parent-directory-item";
var DATA_GRID_DATA_ROW_CLASS = "dx-data-row";
var DEFAULT_COLUMN_CONFIGS = {
    thumbnail: {
        caption: "",
        calculateSortValue: "isDirectory",
        width: 36,
        alignment: "center",
        cssClass: FILE_MANAGER_DETAILS_ITEM_IS_DIRECTORY_CLASS
    },
    name: {
        caption: _message2.default.format("dxFileManager-listDetailsColumnCaptionName")
    },
    dateModified: {
        caption: _message2.default.format("dxFileManager-listDetailsColumnCaptionDateModified"),
        width: 110,
        hidingPriority: 1
    },
    size: {
        caption: _message2.default.format("dxFileManager-listDetailsColumnCaptionFileSize"),
        width: 90,
        alignment: "right",
        hidingPriority: 0
    },
    isParentFolder: {
        caption: "isParentFolder",
        visible: false,
        sortIndex: 0,
        sortOrder: "asc"
    }
};
var FileManagerDetailsItemList = function(_FileManagerItemListB) {
    _inherits(FileManagerDetailsItemList, _FileManagerItemListB);
    var _super = _createSuper(FileManagerDetailsItemList);

    function FileManagerDetailsItemList() {
        _classCallCheck(this, FileManagerDetailsItemList);
        return _super.apply(this, arguments)
    }
    _createClass(FileManagerDetailsItemList, [{
        key: "_initMarkup",
        value: function() {
            var _this = this;
            this._itemCount = 0;
            this._focusedItem = null;
            this._hasParentDirectoryItem = false;
            this._parentDirectoryItemKey = null;
            this._selectAllCheckBox = null;
            this._selectAllCheckBoxUpdating = false;
            this.$element().addClass(FILE_MANAGER_DETAILS_ITEM_LIST_CLASS);
            this._createFilesView();
            this._contextMenu.option("onContextMenuHidden", function() {
                return _this._onContextMenuHidden()
            });
            _get(_getPrototypeOf(FileManagerDetailsItemList.prototype), "_initMarkup", this).call(this)
        }
    }, {
        key: "_createFilesView",
        value: function() {
            var $filesView = (0, _renderer2.default)("<div>").appendTo(this.$element());
            var selectionMode = this._isMultipleSelectionMode() ? "multiple" : "none";
            this._filesView = this._createComponent($filesView, _ui2.default, {
                dataSource: this._createDataSource(),
                hoverStateEnabled: true,
                selection: {
                    mode: selectionMode,
                    showCheckBoxesMode: this._isDesktop() ? "onClick" : "none"
                },
                selectedRowKeys: this.option("selectedItemKeys"),
                focusedRowKey: this.option("focusedItemKey"),
                focusedRowEnabled: true,
                allowColumnResizing: true,
                scrolling: {
                    mode: "virtual"
                },
                sorting: {
                    mode: "single",
                    showSortIndexes: false
                },
                showColumnLines: false,
                showRowLines: false,
                columnHidingEnabled: true,
                columns: this._createColumns(),
                onEditorPreparing: this._onEditorPreparing.bind(this),
                onRowPrepared: this._onRowPrepared.bind(this),
                onContextMenuPreparing: this._onContextMenuPreparing.bind(this),
                onSelectionChanged: this._onFilesViewSelectionChanged.bind(this),
                onFocusedRowChanged: this._onFocusedRowChanged.bind(this),
                onOptionChanged: this._onFilesViewOptionChanged.bind(this)
            })
        }
    }, {
        key: "_createColumns",
        value: function() {
            var _this2 = this;
            var columns = this.option("detailColumns");
            columns = columns.slice(0);
            columns = columns.map(function(column) {
                var extendedItem = column;
                if ((0, _type.isString)(column)) {
                    extendedItem = {
                        dataField: column
                    }
                }
                return _this2._getPreparedColumn(extendedItem)
            });
            var customizeDetailColumns = this.option("customizeDetailColumns");
            if ((0, _type.isFunction)(customizeDetailColumns)) {
                columns = customizeDetailColumns(columns)
            }
            columns.push(this._getPreparedColumn({
                dataField: "isParentFolder"
            }));
            columns.forEach(function(column) {
                return _this2._updateColumnDataField(column)
            });
            return columns
        }
    }, {
        key: "_getPreparedColumn",
        value: function(columnOptions) {
            var result = {};
            var resultCssClass = "";
            if (this._isDefaultColumn(columnOptions.dataField)) {
                var defaultConfig = (0, _extend.extend)(true, {}, DEFAULT_COLUMN_CONFIGS[columnOptions.dataField]);
                resultCssClass = defaultConfig.cssClass;
                if (columnOptions.cssClass) {
                    resultCssClass += " ".concat(columnOptions.cssClass)
                }
                if ("thumbnail" === columnOptions.dataField) {
                    defaultConfig.cellTemplate = this._createThumbnailColumnCell.bind(this);
                    defaultConfig.calculateSortValue = "fileItem.".concat(defaultConfig.calculateSortValue)
                }
                if ("name" === columnOptions.dataField) {
                    defaultConfig.cellTemplate = this._createNameColumnCell.bind(this)
                }
                if ("size" === columnOptions.dataField) {
                    defaultConfig.calculateCellValue = this._calculateSizeColumnCellValue.bind(this)
                }(0, _extend.extend)(true, result, defaultConfig)
            }(0, _uiFile_manager.extendAttributes)(result, columnOptions, ["alignment", "caption", "dataField", "hidingPriority", "sortIndex", "sortOrder", "visible", "width"]);
            if (resultCssClass) {
                result.cssClass = resultCssClass
            }
            return result
        }
    }, {
        key: "_updateColumnDataField",
        value: function(column) {
            var dataItemSuffix = this._isDefaultColumn(column.dataField) ? "" : "dataItem.";
            column.dataField = "fileItem." + dataItemSuffix + column.dataField;
            return column
        }
    }, {
        key: "_isDefaultColumn",
        value: function(columnDataField) {
            return !!DEFAULT_COLUMN_CONFIGS[columnDataField]
        }
    }, {
        key: "_onFileItemActionButtonClick",
        value: function(_ref) {
            var component = _ref.component,
                element = _ref.element,
                event = _ref.event;
            event.stopPropagation();
            var $row = component.$element().closest(this._getItemSelector());
            var fileItemInfo = $row.data("item");
            this._selectItem(fileItemInfo);
            this._showContextMenu(this._getFileItemsForContextMenu(fileItemInfo), element);
            this._activeFileActionsButton = component;
            this._activeFileActionsButton.setActive(true)
        }
    }, {
        key: "_onContextMenuHidden",
        value: function() {
            if (this._activeFileActionsButton) {
                this._activeFileActionsButton.setActive(false)
            }
        }
    }, {
        key: "_getItemThumbnailCssClass",
        value: function() {
            return FILE_MANAGER_DETAILS_ITEM_THUMBNAIL_CLASS
        }
    }, {
        key: "_getItemSelector",
        value: function() {
            return ".".concat(DATA_GRID_DATA_ROW_CLASS)
        }
    }, {
        key: "_onItemDblClick",
        value: function(e) {
            var $row = (0, _renderer2.default)(e.currentTarget);
            var fileItemInfo = $row.data("item");
            this._raiseSelectedItemOpened(fileItemInfo)
        }
    }, {
        key: "_isAllItemsSelected",
        value: function() {
            var selectableItemsCount = this._hasParentDirectoryItem ? this._itemCount - 1 : this._itemCount;
            var selectedRowKeys = this._filesView.option("selectedRowKeys");
            if (!selectedRowKeys.length) {
                return false
            }
            return selectedRowKeys.length >= selectableItemsCount ? true : void 0
        }
    }, {
        key: "_onEditorPreparing",
        value: function(_ref2) {
            var _this3 = this;
            var component = _ref2.component,
                command = _ref2.command,
                row = _ref2.row,
                parentType = _ref2.parentType,
                editorOptions = _ref2.editorOptions;
            if (!this._filesView) {
                this._filesView = component
            }
            if ("select" === command && row) {
                if (this._isParentDirectoryItem(row.data)) {
                    editorOptions.disabled = true
                }
            } else {
                if ("headerRow" === parentType) {
                    editorOptions.onInitialized = function(_ref3) {
                        var component = _ref3.component;
                        _this3._selectAllCheckBox = component
                    };
                    editorOptions.value = this._isAllItemsSelected();
                    editorOptions.onValueChanged = function(args) {
                        return _this3._onSelectAllCheckBoxValueChanged(args)
                    }
                }
            }
        }
    }, {
        key: "_onSelectAllCheckBoxValueChanged",
        value: function(_ref4) {
            var event = _ref4.event,
                previousValue = _ref4.previousValue,
                value = _ref4.value;
            if (!event) {
                if (previousValue && !this._selectAllCheckBoxUpdating && this._selectAllCheckBox) {
                    this._selectAllCheckBox.option("value", previousValue)
                }
                return
            }
            if (this._isAllItemsSelected() === value) {
                return
            }
            if (value) {
                this._filesView.selectAll()
            } else {
                this._filesView.deselectAll()
            }
            event.preventDefault()
        }
    }, {
        key: "_onRowPrepared",
        value: function(_ref5) {
            var rowType = _ref5.rowType,
                rowElement = _ref5.rowElement,
                data = _ref5.data;
            if ("data" === rowType) {
                var $row = (0, _renderer2.default)(rowElement);
                $row.data("item", data);
                if (this._isParentDirectoryItem(data)) {
                    $row.addClass(FILE_MANAGER_PARENT_DIRECTORY_ITEM)
                }
            }
        }
    }, {
        key: "_onContextMenuPreparing",
        value: function(e) {
            if (!this._isDesktop()) {
                return
            }
            var fileItems = null;
            if (e.row && "data" === e.row.rowType) {
                var item = e.row.data;
                this._selectItem(item);
                fileItems = this._getFileItemsForContextMenu(item)
            }
            e.items = this._contextMenu.createContextMenuItems(fileItems)
        }
    }, {
        key: "_onFilesViewSelectionChanged",
        value: function(_ref6) {
            var component = _ref6.component,
                selectedRowsData = _ref6.selectedRowsData,
                selectedRowKeys = _ref6.selectedRowKeys,
                currentSelectedRowKeys = _ref6.currentSelectedRowKeys,
                currentDeselectedRowKeys = _ref6.currentDeselectedRowKeys;
            this._filesView = this._filesView || component;
            if (this._selectAllCheckBox) {
                this._selectAllCheckBoxUpdating = true;
                this._selectAllCheckBox.option("value", this._isAllItemsSelected());
                this._selectAllCheckBoxUpdating = false
            }
            var selectedItems = selectedRowsData.map(function(itemInfo) {
                return itemInfo.fileItem
            });
            this._tryRaiseSelectionChanged({
                selectedItemInfos: selectedRowsData,
                selectedItems: selectedItems,
                selectedItemKeys: selectedRowKeys,
                currentSelectedItemKeys: currentSelectedRowKeys,
                currentDeselectedItemKeys: currentDeselectedRowKeys
            })
        }
    }, {
        key: "_onFocusedRowChanged",
        value: function(e) {
            if (!this._isMultipleSelectionMode()) {
                this._selectItemSingleSelection(e.row.data)
            }
            this._raiseFocusedItemChanged(e)
        }
    }, {
        key: "_onFilesViewOptionChanged",
        value: function(_ref7) {
            var fullName = _ref7.fullName;
            if (fullName.indexOf("sortOrder") > -1) {
                this._filesView.columnOption("isParentFolder", {
                    sortOrder: "asc",
                    sortIndex: 0
                })
            }
        }
    }, {
        key: "_createThumbnailColumnCell",
        value: function(container, cellInfo) {
            this._getItemThumbnailContainer(cellInfo.data).appendTo(container)
        }
    }, {
        key: "_createNameColumnCell",
        value: function(container, cellInfo) {
            var _this4 = this;
            var $button = (0, _renderer2.default)("<div>");
            var $name = (0, _renderer2.default)("<span>").text(cellInfo.data.fileItem.name).addClass(FILE_MANAGER_DETAILS_ITEM_NAME_CLASS);
            var $wrapper = (0, _renderer2.default)("<div>").append($name, $button).addClass(FILE_MANAGER_DETAILS_ITEM_NAME_WRAPPER_CLASS);
            (0, _renderer2.default)(container).append($wrapper);
            this._createComponent($button, _uiFile_manager5.default, {
                onClick: function(e) {
                    return _this4._onFileItemActionButtonClick(e)
                }
            })
        }
    }, {
        key: "_calculateSizeColumnCellValue",
        value: function(rowData) {
            return rowData.fileItem.isDirectory ? "" : (0, _uiFile_manager.getDisplayFileSize)(rowData.fileItem.size)
        }
    }, {
        key: "_selectItem",
        value: function(fileItemInfo) {
            var selectItemFunc = this._isMultipleSelectionMode() ? this._selectItemMultipleSelection : this._selectItemSingleSelection;
            selectItemFunc.call(this, fileItemInfo)
        }
    }, {
        key: "_deselectItem",
        value: function(item) {
            this._filesView.deselectRows([item.fileItem.key])
        }
    }, {
        key: "_selectItemSingleSelection",
        value: function(fileItemInfo) {
            if (!this._focusedItem || this._focusedItem.fileItem.key !== fileItemInfo.fileItem.key) {
                var oldFocusedItem = this._focusedItem;
                this._focusedItem = fileItemInfo;
                var deselectedKeys = [];
                if (oldFocusedItem) {
                    deselectedKeys.push(oldFocusedItem.fileItem.key)
                }
                this._raiseSelectionChanged({
                    selectedItems: [fileItemInfo.fileItem],
                    selectedItemKeys: [fileItemInfo.fileItem.key],
                    currentSelectedItemKeys: [fileItemInfo.fileItem.key],
                    currentDeselectedItemKeys: deselectedKeys
                })
            }
        }
    }, {
        key: "_selectItemMultipleSelection",
        value: function(_ref8) {
            var fileItem = _ref8.fileItem;
            if (!this._filesView.isRowSelected(fileItem.key)) {
                var selectionController = this._filesView.getController("selection");
                var preserve = selectionController.isSelectionWithCheckboxes();
                this._filesView.selectRows([fileItem.key], preserve)
            }
        }
    }, {
        key: "_setSelectedItemKeys",
        value: function(itemKeys) {
            this._filesView.option("selectedRowKeys", itemKeys)
        }
    }, {
        key: "_setFocusedItemKey",
        value: function(itemKey) {
            this._filesView.option("focusedRowKey", itemKey)
        }
    }, {
        key: "clearSelection",
        value: function() {
            this._filesView.clearSelection()
        }
    }, {
        key: "refresh",
        value: function() {
            this._filesView.option("dataSource", this._createDataSource())
        }
    }, {
        key: "getSelectedItems",
        value: function() {
            if (this._isMultipleSelectionMode()) {
                return this._filesView.getSelectedRowsData()
            }
            return this._focusedItem && !this._isParentDirectoryItem(this._focusedItem) ? [this._focusedItem] : []
        }
    }]);
    return FileManagerDetailsItemList
}(_uiFile_manager3.default);
module.exports = FileManagerDetailsItemList;
