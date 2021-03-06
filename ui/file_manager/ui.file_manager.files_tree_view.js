/**
 * DevExtreme (ui/file_manager/ui.file_manager.files_tree_view.js)
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
var _icon = require("../../core/utils/icon");
var _common = require("../../core/utils/common");
var _ui = require("../widget/ui.widget");
var _ui2 = _interopRequireDefault(_ui);
var _uiTree_view = require("../tree_view/ui.tree_view.search");
var _uiTree_view2 = _interopRequireDefault(_uiTree_view);
var _uiFile_manager = require("./ui.file_manager.file_actions_button");
var _uiFile_manager2 = _interopRequireDefault(_uiFile_manager);
var _deferred = require("../../core/utils/deferred");

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
var FILE_MANAGER_DIRS_TREE_CLASS = "dx-filemanager-dirs-tree";
var FILE_MANAGER_DIRS_TREE_FOCUSED_ITEM_CLASS = "dx-filemanager-focused-item";
var FILE_MANAGER_DIRS_TREE_ITEM_TEXT_CLASS = "dx-filemanager-dirs-tree-item-text";
var TREE_VIEW_ITEM_CLASS = "dx-treeview-item";
var FileManagerFilesTreeView = function(_Widget) {
    _inherits(FileManagerFilesTreeView, _Widget);
    var _super = _createSuper(FileManagerFilesTreeView);

    function FileManagerFilesTreeView() {
        _classCallCheck(this, FileManagerFilesTreeView);
        return _super.apply(this, arguments)
    }
    _createClass(FileManagerFilesTreeView, [{
        key: "_initMarkup",
        value: function() {
            var _this = this;
            this._getCurrentDirectory = this.option("getCurrentDirectory");
            this._createFileActionsButton = _common.noop;
            this._storeExpandedState = this.option("storeExpandedState") || false;
            var $treeView = (0, _renderer2.default)("<div>").addClass(FILE_MANAGER_DIRS_TREE_CLASS).appendTo(this.$element());
            var treeViewOptions = {
                dataStructure: "plain",
                rootValue: "",
                createChildren: this._onFilesTreeViewCreateSubDirectories.bind(this),
                itemTemplate: this._createFilesTreeViewItemTemplate.bind(this),
                keyExpr: "getInternalKey",
                parentIdExpr: "parentDirectory.getInternalKey",
                displayExpr: function(itemInfo) {
                    return itemInfo.getDisplayName()
                },
                hasItemsExpr: "fileItem.hasSubDirs",
                onItemClick: this._createActionByOption("onDirectoryClick"),
                onItemExpanded: function(e) {
                    return _this._onFilesTreeViewItemExpanded(e)
                },
                onItemCollapsed: function(e) {
                    return _this._onFilesTreeViewItemCollapsed(e)
                },
                onItemRendered: function(e) {
                    return _this._onFilesTreeViewItemRendered(e)
                }
            };
            if (this._contextMenu) {
                this._contextMenu.option("onContextMenuHidden", function() {
                    return _this._onContextMenuHidden()
                });
                treeViewOptions.onItemContextMenu = function(e) {
                    return _this._onFilesTreeViewItemContextMenu(e)
                };
                this._createFileActionsButton = function(element, options) {
                    return _this._createComponent(element, _uiFile_manager2.default, options)
                }
            }
            this._filesTreeView = this._createComponent($treeView, _uiTree_view2.default, treeViewOptions);
            _events_engine2.default.on($treeView, "click", this._createActionByOption("onClick"))
        }
    }, {
        key: "_render",
        value: function() {
            _get(_getPrototypeOf(FileManagerFilesTreeView.prototype), "_render", this).call(this);
            var that = this;
            setTimeout(function() {
                that._updateFocusedElement()
            })
        }
    }, {
        key: "_onFilesTreeViewCreateSubDirectories",
        value: function(rootItem) {
            var getDirectories = this.option("getDirectories");
            var directoryInfo = rootItem && rootItem.itemData || null;
            return getDirectories && getDirectories(directoryInfo)
        }
    }, {
        key: "_onFilesTreeViewItemRendered",
        value: function(_ref) {
            var itemData = _ref.itemData;
            var currentDirectory = this._getCurrentDirectory();
            if (currentDirectory && currentDirectory.fileItem.equals(itemData.fileItem)) {
                this._updateFocusedElement()
            }
        }
    }, {
        key: "_onFilesTreeViewItemExpanded",
        value: function(_ref2) {
            var itemData = _ref2.itemData,
                node = _ref2.node;
            if (this._storeExpandedState) {
                itemData.expanded = true
            }
            if (node.expandedDeferred) {
                node.expandedDeferred.resolve();
                delete node.expandedDeferred
            }
        }
    }, {
        key: "_onFilesTreeViewItemCollapsed",
        value: function(_ref3) {
            var itemData = _ref3.itemData;
            if (this._storeExpandedState) {
                itemData.expanded = false
            }
        }
    }, {
        key: "_createFilesTreeViewItemTemplate",
        value: function(itemData, itemIndex, itemElement) {
            var _this2 = this;
            var $itemElement = (0, _renderer2.default)(itemElement);
            var $itemWrapper = $itemElement.closest(this._filesTreeViewItemSelector);
            $itemWrapper.data("item", itemData);
            var $image = (0, _icon.getImageContainer)(itemData.icon);
            var $text = (0, _renderer2.default)("<span>").text(itemData.getDisplayName()).addClass(FILE_MANAGER_DIRS_TREE_ITEM_TEXT_CLASS);
            var $button = (0, _renderer2.default)("<div>");
            $itemElement.append($image, $text, $button);
            this._createFileActionsButton($button, {
                onClick: function(e) {
                    return _this2._onFileItemActionButtonClick(e)
                }
            })
        }
    }, {
        key: "_onFilesTreeViewItemContextMenu",
        value: function(_ref4) {
            var itemElement = _ref4.itemElement,
                event = _ref4.event;
            event.preventDefault();
            var itemData = (0, _renderer2.default)(itemElement).data("item");
            this._contextMenu.showAt([itemData], itemElement, event)
        }
    }, {
        key: "_onFileItemActionButtonClick",
        value: function(_ref5) {
            var component = _ref5.component,
                element = _ref5.element,
                event = _ref5.event;
            event.stopPropagation();
            var $item = component.$element().closest(this._filesTreeViewItemSelector);
            var item = $item.data("item");
            this._contextMenu.showAt([item], element);
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
        key: "_updateFocusedElement",
        value: function() {
            var directoryInfo = this._getCurrentDirectory();
            var $element = this._getItemElementByKey(directoryInfo.getInternalKey());
            if (this._$focusedElement) {
                this._$focusedElement.toggleClass(FILE_MANAGER_DIRS_TREE_FOCUSED_ITEM_CLASS, false)
            }
            this._$focusedElement = $element || (0, _renderer2.default)();
            this._$focusedElement.toggleClass(FILE_MANAGER_DIRS_TREE_FOCUSED_ITEM_CLASS, true)
        }
    }, {
        key: "_getItemElementByKey",
        value: function(key) {
            var node = this._filesTreeView && this._filesTreeView._dataAdapter.getNodeByKey(key);
            if (node) {
                var $node = this._filesTreeView._getNodeElement(node);
                if ($node) {
                    return $node.children(this._filesTreeViewItemSelector)
                }
            }
            return null
        }
    }, {
        key: "_getDefaultOptions",
        value: function() {
            return (0, _extend.extend)(_get(_getPrototypeOf(FileManagerFilesTreeView.prototype), "_getDefaultOptions", this).call(this), {
                storeExpandedState: false,
                initialFolder: null,
                contextMenu: null,
                getItems: null,
                getCurrentDirectory: null,
                onDirectoryClick: null
            })
        }
    }, {
        key: "_optionChanged",
        value: function(args) {
            var name = args.name;
            switch (name) {
                case "storeExpandedState":
                    this._storeExpandedState = this.option(name);
                    break;
                case "getItems":
                case "rootFolderDisplayName":
                case "initialFolder":
                case "contextMenu":
                    this.repaint();
                    break;
                case "getCurrentDirectory":
                    this.getCurrentDirectory = this.option(name);
                    break;
                case "onDirectoryClick":
                    this._filesTreeView.option("onItemClick", this._createActionByOption("onDirectoryClick"));
                    break;
                default:
                    _get(_getPrototypeOf(FileManagerFilesTreeView.prototype), "_optionChanged", this).call(this, args)
            }
        }
    }, {
        key: "expandDirectory",
        value: function(directoryInfo) {
            var deferred = new _deferred.Deferred;
            if (!directoryInfo || 0 === directoryInfo.items.length) {
                return deferred.reject().promise()
            }
            var treeViewNode = this._filesTreeView._dataAdapter.getNodeByKey(directoryInfo.getInternalKey());
            if (!treeViewNode) {
                return deferred.reject().promise()
            }
            if (treeViewNode.expanded) {
                return deferred.resolve().promise()
            }
            treeViewNode.expandedDeferred = deferred;
            this._filesTreeView.expandItem(directoryInfo.getInternalKey());
            return deferred.promise()
        }
    }, {
        key: "refresh",
        value: function() {
            this._$focusedElement = null;
            this._filesTreeView.option("dataSource", [])
        }
    }, {
        key: "updateCurrentDirectory",
        value: function() {
            this._updateFocusedElement();
            this._storeExpandedState && this._updateExpandedStateToCurrentDirectory()
        }
    }, {
        key: "_updateExpandedStateToCurrentDirectory",
        value: function() {
            var dirLine = [];
            for (var dirInfo = this._getCurrentDirectory(); dirInfo; dirInfo = dirInfo.parentDirectory) {
                dirLine.unshift(dirInfo)
            }
            this.expandDirectoryLineRecursive(dirLine)
        }
    }, {
        key: "expandDirectoryLineRecursive",
        value: function(dirLine) {
            var _this3 = this;
            if (!dirLine.length) {
                return (new _deferred.Deferred).resolve().promise()
            }
            return this.expandDirectory(dirLine.shift()).then(function() {
                return _this3.expandDirectoryLineRecursive(dirLine)
            })
        }
    }, {
        key: "_filesTreeViewItemSelector",
        get: function() {
            return ".".concat(TREE_VIEW_ITEM_CLASS)
        }
    }, {
        key: "_contextMenu",
        get: function() {
            return this.option("contextMenu")
        }
    }]);
    return FileManagerFilesTreeView
}(_ui2.default);
module.exports = FileManagerFilesTreeView;
