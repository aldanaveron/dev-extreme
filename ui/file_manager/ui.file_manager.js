/**
 * DevExtreme (ui/file_manager/ui.file_manager.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _renderer = require("../../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _events_engine = require("../../events/core/events_engine");
var _events_engine2 = _interopRequireDefault(_events_engine);
var _extend = require("../../core/utils/extend");
var _type = require("../../core/utils/type");
var _type2 = _interopRequireDefault(_type);
var _deferred = require("../../core/utils/deferred");
var _common = require("../../core/utils/common");
var _message = require("../../localization/message");
var _message2 = _interopRequireDefault(_message);
var _component_registrator = require("../../core/component_registrator");
var _component_registrator2 = _interopRequireDefault(_component_registrator);
var _ui = require("../widget/ui.widget");
var _ui2 = _interopRequireDefault(_ui);
var _notify = require("../notify");
var _notify2 = _interopRequireDefault(_notify);
var _uiFile_manager = require("./ui.file_manager.common");
var _file_items_controller = require("./file_items_controller");
var _file_items_controller2 = _interopRequireDefault(_file_items_controller);
var _uiFile_manager2 = require("./ui.file_manager.command_manager");
var _uiFile_manager3 = require("./ui.file_manager.context_menu");
var _uiFile_manager4 = _interopRequireDefault(_uiFile_manager3);
var _uiFile_manager5 = require("./ui.file_manager.files_tree_view");
var _uiFile_manager6 = _interopRequireDefault(_uiFile_manager5);
var _uiFile_managerItem_list = require("./ui.file_manager.item_list.details");
var _uiFile_managerItem_list2 = _interopRequireDefault(_uiFile_managerItem_list);
var _uiFile_managerItem_list3 = require("./ui.file_manager.item_list.thumbnails");
var _uiFile_managerItem_list4 = _interopRequireDefault(_uiFile_managerItem_list3);
var _uiFile_manager7 = require("./ui.file_manager.toolbar");
var _uiFile_manager8 = _interopRequireDefault(_uiFile_manager7);
var _uiFile_manager9 = require("./ui.file_manager.notification");
var _uiFile_manager10 = _interopRequireDefault(_uiFile_manager9);
var _uiFile_manager11 = require("./ui.file_manager.editing");
var _uiFile_manager12 = _interopRequireDefault(_uiFile_manager11);
var _uiFile_manager13 = require("./ui.file_manager.breadcrumbs");
var _uiFile_manager14 = _interopRequireDefault(_uiFile_manager13);
var _uiFile_manager15 = require("./ui.file_manager.adaptivity");
var _uiFile_manager16 = _interopRequireDefault(_uiFile_manager15);

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

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) {
        return
    }
    if ("string" === typeof o) {
        return _arrayLikeToArray(o, minLen)
    }
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if ("Object" === n && o.constructor) {
        n = o.constructor.name
    }
    if ("Map" === n || "Set" === n) {
        return Array.from(n)
    }
    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
        return _arrayLikeToArray(o, minLen)
    }
}

function _iterableToArray(iter) {
    if ("undefined" !== typeof Symbol && Symbol.iterator in Object(iter)) {
        return Array.from(iter)
    }
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        return _arrayLikeToArray(arr)
    }
}

function _arrayLikeToArray(arr, len) {
    if (null == len || len > arr.length) {
        len = arr.length
    }
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i]
    }
    return arr2
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
var FILE_MANAGER_CLASS = "dx-filemanager";
var FILE_MANAGER_WRAPPER_CLASS = FILE_MANAGER_CLASS + "-wrapper";
var FILE_MANAGER_CONTAINER_CLASS = FILE_MANAGER_CLASS + "-container";
var FILE_MANAGER_DIRS_PANEL_CLASS = FILE_MANAGER_CLASS + "-dirs-panel";
var FILE_MANAGER_INACTIVE_AREA_CLASS = FILE_MANAGER_CLASS + "-inactive-area";
var FILE_MANAGER_EDITING_CONTAINER_CLASS = FILE_MANAGER_CLASS + "-editing-container";
var FILE_MANAGER_ITEMS_PANEL_CLASS = FILE_MANAGER_CLASS + "-items-panel";
var FILE_MANAGER_ITEM_CUSTOM_THUMBNAIL_CLASS = FILE_MANAGER_CLASS + "-item-custom-thumbnail";
var FileManager = function(_Widget) {
    _inherits(FileManager, _Widget);
    var _super = _createSuper(FileManager);

    function FileManager() {
        _classCallCheck(this, FileManager);
        return _super.apply(this, arguments)
    }
    _createClass(FileManager, [{
        key: "_initTemplates",
        value: function() {}
    }, {
        key: "_initMarkup",
        value: function() {
            _get(_getPrototypeOf(FileManager.prototype), "_initMarkup", this).call(this);
            this._initActions();
            this._firstItemViewLoad = true;
            this._lockSelectionProcessing = false;
            this._lockFocusedItemProcessing = false;
            this._controller = new _file_items_controller2.default({
                currentPath: this.option("currentPath"),
                currentPathKeys: this.option("currentPathKeys"),
                rootText: this.option("rootFolderName"),
                fileProvider: this.option("fileSystemProvider"),
                allowedFileExtensions: this.option("allowedFileExtensions"),
                uploadMaxFileSize: this.option("upload").maxFileSize,
                uploadChunkSize: this.option("upload").chunkSize,
                onInitialized: this._onControllerInitialized.bind(this),
                onDataLoading: this._onDataLoading.bind(this),
                onSelectedDirectoryChanged: this._onSelectedDirectoryChanged.bind(this)
            });
            this._commandManager = new _uiFile_manager2.FileManagerCommandManager(this.option("permissions"));
            this.$element().addClass(FILE_MANAGER_CLASS);
            this._createNotificationControl();
            this._initCommandManager();
            this._setItemsViewAreaActive(false)
        }
    }, {
        key: "_createNotificationControl",
        value: function() {
            var _this = this;
            var $notificationControl = (0, _renderer2.default)("<div>").addClass("dx-filemanager-notification-container").appendTo(this.$element());
            this._notificationControl = this._createComponent($notificationControl, _uiFile_manager10.default, {
                progressPanelContainer: this.$element(),
                contentTemplate: function(container) {
                    return _this._createWrapper(container)
                },
                onActionProgress: function(e) {
                    return _this._onActionProgress(e)
                },
                positionTarget: ".".concat(FILE_MANAGER_CONTAINER_CLASS)
            });
            this._editing.option("notificationControl", this._notificationControl)
        }
    }, {
        key: "_createWrapper",
        value: function(container) {
            var _this2 = this;
            this._$wrapper = (0, _renderer2.default)("<div>").addClass(FILE_MANAGER_WRAPPER_CLASS).appendTo(container);
            this._createEditing();
            var $toolbar = (0, _renderer2.default)("<div>").appendTo(this._$wrapper);
            this._toolbar = this._createComponent($toolbar, _uiFile_manager8.default, {
                commandManager: this._commandManager,
                generalItems: this.option("toolbar.items"),
                fileItems: this.option("toolbar.fileSelectionItems"),
                itemViewMode: this.option("itemView").mode,
                onItemClick: function(args) {
                    return _this2._actions.onToolbarItemClick(args)
                }
            });
            this._createAdaptivityControl()
        }
    }, {
        key: "_createAdaptivityControl",
        value: function() {
            var _this3 = this;
            var $container = (0, _renderer2.default)("<div>").addClass(FILE_MANAGER_CONTAINER_CLASS).appendTo(this._$wrapper);
            this._adaptivityControl = this._createComponent($container, _uiFile_manager16.default, {
                drawerTemplate: function(container) {
                    return _this3._createFilesTreeView(container)
                },
                contentTemplate: function(container) {
                    return _this3._createItemsPanel(container)
                },
                onAdaptiveStateChanged: function(e) {
                    return _this3._onAdaptiveStateChanged(e)
                }
            })
        }
    }, {
        key: "_createEditing",
        value: function() {
            var _this4 = this;
            var $editingContainer = (0, _renderer2.default)("<div>").addClass(FILE_MANAGER_EDITING_CONTAINER_CLASS).appendTo(this.$element());
            this._editing = this._createComponent($editingContainer, _uiFile_manager12.default, {
                controller: this._controller,
                model: {
                    getMultipleSelectedItems: this._getMultipleSelectedItems.bind(this)
                },
                getItemThumbnail: this._getItemThumbnailInfo.bind(this),
                onSuccess: function(_ref) {
                    var updatedOnlyFiles = _ref.updatedOnlyFiles;
                    return _this4._redrawComponent(updatedOnlyFiles)
                },
                onCreating: function() {
                    return _this4._setItemsViewAreaActive(false)
                },
                onError: function(e) {
                    return _this4._onEditingError(e)
                }
            })
        }
    }, {
        key: "_createItemsPanel",
        value: function($container) {
            this._$itemsPanel = (0, _renderer2.default)("<div>").addClass(FILE_MANAGER_ITEMS_PANEL_CLASS).appendTo($container);
            this._createBreadcrumbs(this._$itemsPanel);
            this._createItemView(this._$itemsPanel)
        }
    }, {
        key: "_createFilesTreeView",
        value: function(container) {
            var _this5 = this;
            var $filesTreeView = (0, _renderer2.default)("<div>").addClass(FILE_MANAGER_DIRS_PANEL_CLASS).appendTo(container);
            this._filesTreeView = this._createComponent($filesTreeView, _uiFile_manager6.default, {
                storeExpandedState: true,
                contextMenu: this._createContextMenu(),
                getDirectories: this.getDirectories.bind(this),
                getCurrentDirectory: this._getCurrentDirectory.bind(this),
                onDirectoryClick: this._onFilesTreeViewDirectoryClick.bind(this),
                onClick: function() {
                    return _this5._setItemsViewAreaActive(false)
                }
            })
        }
    }, {
        key: "_createItemView",
        value: function($container, viewMode) {
            var _this6 = this;
            var itemViewOptions = this.option("itemView");
            var options = {
                selectionMode: this.option("selectionMode"),
                selectedItemKeys: this.option("selectedItemKeys"),
                focusedItemKey: this.option("focusedItemKey"),
                contextMenu: this._createContextMenu(true),
                getItems: this._getItemViewItems.bind(this),
                onError: function(_ref2) {
                    var error = _ref2.error;
                    return _this6._showError(error)
                },
                onSelectionChanged: this._onItemViewSelectionChanged.bind(this),
                onFocusedItemChanged: this._onItemViewFocusedItemChanged.bind(this),
                onSelectedItemOpened: this._onSelectedItemOpened.bind(this),
                getItemThumbnail: this._getItemThumbnailInfo.bind(this),
                customizeDetailColumns: this.option("customizeDetailColumns"),
                detailColumns: this.option("itemView.details.columns")
            };
            var $itemView = (0, _renderer2.default)("<div>").appendTo($container);
            viewMode = viewMode || itemViewOptions.mode;
            var widgetClass = "thumbnails" === viewMode ? _uiFile_managerItem_list4.default : _uiFile_managerItem_list2.default;
            this._itemView = this._createComponent($itemView, widgetClass, options);
            _events_engine2.default.on($itemView, "click", this._onItemViewClick.bind(this))
        }
    }, {
        key: "_createBreadcrumbs",
        value: function($container) {
            var _this7 = this;
            var $breadcrumbs = (0, _renderer2.default)("<div>").appendTo($container);
            this._breadcrumbs = this._createComponent($breadcrumbs, _uiFile_manager14.default, {
                rootFolderDisplayName: this.option("rootFolderName"),
                onCurrentDirectoryChanging: function(_ref3) {
                    var currentDirectory = _ref3.currentDirectory;
                    return _this7._setCurrentDirectory(currentDirectory)
                },
                onOutsideClick: function() {
                    return _this7._clearSelection()
                }
            });
            this._breadcrumbs.setCurrentDirectory(this._getCurrentDirectory())
        }
    }, {
        key: "_createContextMenu",
        value: function(isolateCreationItemCommands) {
            var _this8 = this;
            var $contextMenu = (0, _renderer2.default)("<div>").appendTo(this._$wrapper);
            return this._createComponent($contextMenu, _uiFile_manager4.default, {
                commandManager: this._commandManager,
                items: this.option("contextMenu.items"),
                onItemClick: function(args) {
                    return _this8._actions.onContextMenuItemClick(args)
                },
                isolateCreationItemCommands: isolateCreationItemCommands
            })
        }
    }, {
        key: "_initCommandManager",
        value: function() {
            var _this9 = this;
            var actions = (0, _extend.extend)(this._editing.getCommandActions(), {
                refresh: function() {
                    return _this9._refreshAndShowProgress()
                },
                thumbnails: function() {
                    return _this9.option("itemView.mode", "thumbnails")
                },
                details: function() {
                    return _this9.option("itemView.mode", "details")
                },
                clear: function() {
                    return _this9._clearSelection()
                },
                showNavPane: function() {
                    return _this9._adaptivityControl.toggleDrawer()
                }
            });
            this._commandManager.registerActions(actions)
        }
    }, {
        key: "_onFilesTreeViewDirectoryClick",
        value: function(_ref4) {
            var itemData = _ref4.itemData;
            this._setCurrentDirectory(itemData);
            this._setItemsViewAreaActive(false)
        }
    }, {
        key: "_onItemViewSelectionChanged",
        value: function(e) {
            this._updateToolbar(e.selectedItemInfos);
            this._lockSelectionProcessing = true;
            this.option("selectedItemKeys", e.selectedItemKeys);
            this._lockSelectionProcessing = false;
            this._actions.onSelectionChanged(e)
        }
    }, {
        key: "_onItemViewFocusedItemChanged",
        value: function(e) {
            this._lockFocusedItemProcessing = true;
            this.option("focusedItemKey", e.focusedItemKey);
            this._lockFocusedItemProcessing = false;
            this._actions.onFocusedItemChanged(e)
        }
    }, {
        key: "_onAdaptiveStateChanged",
        value: function(_ref5) {
            var enabled = _ref5.enabled;
            this._commandManager.setCommandEnabled("showNavPane", enabled);
            this._updateToolbar()
        }
    }, {
        key: "_onActionProgress",
        value: function(_ref6) {
            var message = _ref6.message,
                status = _ref6.status;
            this._toolbar.updateRefreshItem(message, status);
            this._updateToolbar()
        }
    }, {
        key: "_onEditingError",
        value: function(e) {
            var args = (0, _uiFile_manager.extendAttributes)({}, e, ["errorCode", "errorText", "fileSystemItem"]);
            this._actions.onErrorOccurred(args);
            e.errorText = args.errorText
        }
    }, {
        key: "_refreshAndShowProgress",
        value: function() {
            var _this10 = this;
            return (0, _deferred.when)(this._notificationControl.tryShowProgressPanel(), this._controller.refresh()).then(function() {
                return _this10._filesTreeView.refresh()
            })
        }
    }, {
        key: "_updateToolbar",
        value: function(selectedItems) {
            var items = selectedItems || this._getSelectedItemInfos();
            this._toolbar.update(items)
        }
    }, {
        key: "_setItemsViewAreaActive",
        value: function(active) {
            if (this._itemsViewAreaActive === active) {
                return
            }
            this._itemsViewAreaActive = active;
            var $activeArea = null;
            var $inactiveArea = null;
            if (active) {
                $activeArea = this._itemView.$element();
                $inactiveArea = this._filesTreeView.$element()
            } else {
                $activeArea = this._filesTreeView.$element();
                $inactiveArea = this._itemView.$element()
            }
            $activeArea.removeClass(FILE_MANAGER_INACTIVE_AREA_CLASS);
            $inactiveArea.addClass(FILE_MANAGER_INACTIVE_AREA_CLASS)
        }
    }, {
        key: "_switchView",
        value: function(viewMode) {
            this._disposeWidget(this._itemView.option("contextMenu"));
            this._disposeWidget(this._itemView);
            this._createItemView(this._$itemsPanel, viewMode);
            this._toolbar.option({
                itemViewMode: viewMode
            })
        }
    }, {
        key: "_disposeWidget",
        value: function(widget) {
            widget.dispose();
            widget.$element().remove()
        }
    }, {
        key: "_clearSelection",
        value: function() {
            this._itemView.clearSelection()
        }
    }, {
        key: "_getMultipleSelectedItems",
        value: function() {
            return this._itemsViewAreaActive ? this._getSelectedItemInfos() : [this._getCurrentDirectory()]
        }
    }, {
        key: "_showError",
        value: function(message) {
            this._showNotification(message, false)
        }
    }, {
        key: "_showNotification",
        value: function(message, isSuccess) {
            (0, _notify2.default)({
                message: message,
                width: 450
            }, isSuccess ? "success" : "error", 5e3)
        }
    }, {
        key: "_redrawComponent",
        value: function(onlyFileItemsView) {
            !onlyFileItemsView && this._filesTreeView.refresh();
            this._itemView.refresh()
        }
    }, {
        key: "_getItemViewItems",
        value: function() {
            var _this11 = this;
            var showFolders = this.option("itemView").showFolders;
            var result = this._controller.getCurrentItems(!showFolders);
            this._updateToolbarWithSelectionOnFirstLoad(result);
            if (this.option("itemView.showParentFolder")) {
                result = (0, _deferred.when)(result).then(function(items) {
                    return _this11._getPreparedItemViewItems(items)
                })
            }
            return result
        }
    }, {
        key: "_updateToolbarWithSelectionOnFirstLoad",
        value: function(itemsResult) {
            var _this12 = this;
            if (!this._firstItemViewLoad) {
                return
            }
            this._firstItemViewLoad = false;
            var selectedItemKeys = this.option("selectedItemKeys");
            if (selectedItemKeys.length > 0) {
                (0, _deferred.when)(itemsResult).done(function(items) {
                    var selectedItems = (0, _uiFile_manager.findItemsByKeys)(items, selectedItemKeys);
                    if (selectedItems.length > 0) {
                        _this12._updateToolbar(selectedItems)
                    }
                })
            }
        }
    }, {
        key: "_getPreparedItemViewItems",
        value: function(items) {
            var selectedDir = this._getCurrentDirectory();
            if (selectedDir.fileItem.isRoot()) {
                return items
            }
            var parentDirItem = selectedDir.fileItem.createClone();
            parentDirItem.isParentFolder = true;
            parentDirItem.name = "..";
            parentDirItem.relativeName = "..";
            var itemsCopy = _toConsumableArray(items);
            itemsCopy.unshift({
                fileItem: parentDirItem,
                icon: "parentfolder"
            });
            return itemsCopy
        }
    }, {
        key: "_onItemViewClick",
        value: function() {
            this._setItemsViewAreaActive(true)
        }
    }, {
        key: "_getItemThumbnailInfo",
        value: function(fileInfo) {
            var func = this.option("customizeThumbnail");
            var thumbnail = _type2.default.isFunction(func) ? func(fileInfo.fileItem) : fileInfo.fileItem.thumbnail;
            if (thumbnail) {
                return {
                    thumbnail: thumbnail,
                    cssClass: FILE_MANAGER_ITEM_CUSTOM_THUMBNAIL_CLASS
                }
            }
            return {
                thumbnail: fileInfo.icon
            }
        }
    }, {
        key: "_getDefaultOptions",
        value: function() {
            return (0, _extend.extend)(_get(_getPrototypeOf(FileManager.prototype), "_getDefaultOptions", this).call(this), {
                fileSystemProvider: null,
                currentPath: "",
                currentPathKeys: [],
                rootFolderName: _message2.default.format("dxFileManager-rootDirectoryName"),
                selectionMode: "multiple",
                selectedItemKeys: [],
                focusedItemKey: void 0,
                toolbar: {
                    items: ["showNavPane", "create", "upload", "switchView", {
                        name: "separator",
                        location: "after"
                    }, "refresh"],
                    fileSelectionItems: ["download", "separator", "move", "copy", "rename", "separator", "delete", "clear", {
                        name: "separator",
                        location: "after"
                    }, "refresh"]
                },
                contextMenu: {
                    items: ["create", "upload", "rename", "move", "copy", "delete", "refresh", "download"]
                },
                itemView: {
                    details: {
                        columns: ["thumbnail", "name", "dateModified", "size"]
                    },
                    mode: "details",
                    showFolders: true,
                    showParentFolder: true
                },
                customizeThumbnail: null,
                customizeDetailColumns: null,
                onContextMenuItemClick: null,
                onCurrentDirectoryChanged: null,
                onSelectedFileOpened: null,
                onSelectionChanged: null,
                onFocusedItemChanged: null,
                onToolbarItemClick: null,
                onErrorOccurred: null,
                allowedFileExtensions: [".txt", ".rtf", ".doc", ".docx", ".odt", ".xls", ".xlsx", ".ods", ".ppt", ".pptx", ".odp", ".pdf", ".xml", ".png", ".svg", ".gif", ".jpg", ".jpeg", ".ico", ".bmp", ".avi", ".mpeg", ".mkv", ""],
                upload: {
                    maxFileSize: 0,
                    chunkSize: 2e5
                },
                permissions: {
                    create: false,
                    copy: false,
                    move: false,
                    "delete": false,
                    rename: false,
                    upload: false,
                    download: false
                }
            })
        }
    }, {
        key: "_optionChanged",
        value: function(args) {
            var name = args.name;
            switch (name) {
                case "currentPath":
                    this._controller.setCurrentPath(args.value);
                    break;
                case "currentPathKeys":
                    this._controller.setCurrentPathByKeys(args.value);
                    break;
                case "selectedItemKeys":
                    if (!this._lockSelectionProcessing && this._itemView) {
                        this._itemView.option("selectedItemKeys", args.value)
                    }
                    break;
                case "focusedItemKey":
                    if (!this._lockFocusedItemProcessing && this._itemView) {
                        this._itemView.option("focusedItemKey", args.value)
                    }
                    break;
                case "fileSystemProvider":
                case "selectionMode":
                case "customizeThumbnail":
                case "customizeDetailColumns":
                case "rootFolderName":
                case "allowedFileExtensions":
                case "permissions":
                case "upload":
                    this.repaint();
                    break;
                case "itemView":
                    if ("itemView.mode" === args.fullName) {
                        this._switchView(args.value)
                    } else {
                        this.repaint()
                    }
                    break;
                case "toolbar":
                    var toolbarOptions = {};
                    if (args.value.items) {
                        toolbarOptions.generalItems = args.value.items
                    }
                    if (args.value.fileSelectionItems) {
                        toolbarOptions.fileItems = args.value.fileSelectionItems
                    }
                    this._toolbar.option(toolbarOptions);
                    break;
                case "contextMenu":
                    this._itemView.option("contextMenu", this._createContextMenu(true));
                    this._filesTreeView.option("contextMenu", this._createContextMenu());
                    break;
                case "onContextMenuItemClick":
                case "onCurrentDirectoryChanged":
                case "onSelectedFileOpened":
                case "onSelectionChanged":
                case "onFocusedItemChanged":
                case "onToolbarItemClick":
                case "onErrorOccurred":
                    this._actions[name] = this._createActionByOption(name);
                    break;
                default:
                    _get(_getPrototypeOf(FileManager.prototype), "_optionChanged", this).call(this, args)
            }
        }
    }, {
        key: "_initActions",
        value: function() {
            this._actions = {
                onContextMenuItemClick: this._createActionByOption("onContextMenuItemClick"),
                onCurrentDirectoryChanged: this._createActionByOption("onCurrentDirectoryChanged"),
                onSelectedFileOpened: this._createActionByOption("onSelectedFileOpened"),
                onSelectionChanged: this._createActionByOption("onSelectionChanged"),
                onFocusedItemChanged: this._createActionByOption("onFocusedItemChanged"),
                onToolbarItemClick: this._createActionByOption("onToolbarItemClick"),
                onErrorOccurred: this._createActionByOption("onErrorOccurred")
            }
        }
    }, {
        key: "executeCommand",
        value: function(commandName) {
            return this._commandManager.executeCommand(commandName)
        }
    }, {
        key: "_setCurrentDirectory",
        value: function(directoryInfo) {
            this._controller.setCurrentDirectory(directoryInfo)
        }
    }, {
        key: "_getCurrentDirectory",
        value: function() {
            return this._controller.getCurrentDirectory()
        }
    }, {
        key: "_onControllerInitialized",
        value: function(_ref7) {
            var controller = _ref7.controller;
            this._controller = this._controller || controller;
            var currentDirectory = controller.getCurrentDirectory();
            if (!currentDirectory.fileItem.isRoot()) {
                this._syncToCurrentDirectory()
            }
        }
    }, {
        key: "_onDataLoading",
        value: function() {
            this._itemView.refresh()
        }
    }, {
        key: "_onSelectedDirectoryChanged",
        value: function() {
            var currentDirectory = this._getCurrentDirectory();
            this._syncToCurrentDirectory();
            this._actions.onCurrentDirectoryChanged({
                directory: currentDirectory.fileItem
            })
        }
    }, {
        key: "_syncToCurrentDirectory",
        value: function() {
            var currentDirectory = this._getCurrentDirectory();
            var currentPath = this._controller.getCurrentPath();
            var currentPathKeys = currentDirectory.fileItem.pathKeys;
            if (this._filesTreeView) {
                this._filesTreeView.updateCurrentDirectory()
            }
            if (this._breadcrumbs) {
                this._breadcrumbs.setCurrentDirectory(currentDirectory)
            }
            var options = {
                currentPath: currentPath
            };
            if (!(0, _common.equalByValue)(this.option("currentPathKeys"), currentPathKeys)) {
                options.currentPathKeys = currentPathKeys
            }
            this.option(options)
        }
    }, {
        key: "getDirectories",
        value: function(parentDirectoryInfo) {
            return this._controller.getDirectories(parentDirectoryInfo)
        }
    }, {
        key: "_getSelectedItemInfos",
        value: function() {
            return this._itemView.getSelectedItems()
        }
    }, {
        key: "refresh",
        value: function() {
            return this.executeCommand("refresh")
        }
    }, {
        key: "getCurrentDirectory",
        value: function() {
            var directoryInfo = this._getCurrentDirectory();
            return directoryInfo && directoryInfo.fileItem || null
        }
    }, {
        key: "getSelectedItems",
        value: function() {
            return this._getSelectedItemInfos().map(function(itemInfo) {
                return itemInfo.fileItem
            })
        }
    }, {
        key: "_onSelectedItemOpened",
        value: function(_ref8) {
            var fileItemInfo = _ref8.fileItemInfo;
            var fileItem = fileItemInfo.fileItem;
            if (!fileItem.isDirectory) {
                this._actions.onSelectedFileOpened({
                    file: fileItem
                });
                return
            }
            var newCurrentDirectory = fileItem.isParentFolder ? this._getCurrentDirectory().parentDirectory : fileItemInfo;
            this._setCurrentDirectory(newCurrentDirectory);
            if (newCurrentDirectory) {
                this._filesTreeView.expandDirectory(newCurrentDirectory.parentDirectory)
            }
        }
    }]);
    return FileManager
}(_ui2.default);
(0, _component_registrator2.default)("dxFileManager", FileManager);
module.exports = FileManager;
