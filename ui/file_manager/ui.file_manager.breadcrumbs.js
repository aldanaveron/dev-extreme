/**
 * DevExtreme (ui/file_manager/ui.file_manager.breadcrumbs.js)
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
var _ui = require("../widget/ui.widget");
var _ui2 = _interopRequireDefault(_ui);
var _ui3 = require("../menu/ui.menu");
var _ui4 = _interopRequireDefault(_ui3);

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
var FILE_MANAGER_BREADCRUMBS_CLASS = "dx-filemanager-breadcrumbs";
var FILE_MANAGER_BREADCRUMBS_PARENT_FOLDER_ITEM_CLASS = FILE_MANAGER_BREADCRUMBS_CLASS + "-parent-folder-item";
var FILE_MANAGER_BREADCRUMBS_SEPARATOR_ITEM_CLASS = FILE_MANAGER_BREADCRUMBS_CLASS + "-separator-item";
var FILE_MANAGER_BREADCRUMBS_PATH_SEPARATOR_ITEM_CLASS = FILE_MANAGER_BREADCRUMBS_CLASS + "-path-separator-item";
var MENU_ITEMS_CONTAINER_CLASS = "dx-menu-items-container";
var FILE_MANAGER_BREADCRUMBS_EVENT_NAMESPACE = "dxFileManager_breadcrubms";
var FileManagerBreadcrumbs = function(_Widget) {
    _inherits(FileManagerBreadcrumbs, _Widget);
    var _super = _createSuper(FileManagerBreadcrumbs);

    function FileManagerBreadcrumbs() {
        _classCallCheck(this, FileManagerBreadcrumbs);
        return _super.apply(this, arguments)
    }
    _createClass(FileManagerBreadcrumbs, [{
        key: "_init",
        value: function() {
            _get(_getPrototypeOf(FileManagerBreadcrumbs.prototype), "_init", this).call(this);
            this._currentDirectory = null
        }
    }, {
        key: "_initMarkup",
        value: function() {
            _get(_getPrototypeOf(FileManagerBreadcrumbs.prototype), "_initMarkup", this).call(this);
            this._initActions();
            if (this._currentDirectory) {
                this._renderMenu()
            }
            this.$element().addClass(FILE_MANAGER_BREADCRUMBS_CLASS)
        }
    }, {
        key: "setCurrentDirectory",
        value: function(directory) {
            if (!this._areDirsEqual(this._currentDirectory, directory)) {
                this._currentDirectory = directory;
                this.repaint()
            }
        }
    }, {
        key: "_renderMenu",
        value: function() {
            var $menu = (0, _renderer2.default)("<div>").appendTo(this.$element());
            this._menu = this._createComponent($menu, _ui4.default, {
                dataSource: this._getMenuItems(),
                onItemClick: this._onItemClick.bind(this),
                onItemRendered: this._onItemRendered.bind(this)
            });
            var clickEvent = (0, _utils.addNamespace)("click", FILE_MANAGER_BREADCRUMBS_EVENT_NAMESPACE);
            _events_engine2.default.on($menu, clickEvent, this._onClick.bind(this))
        }
    }, {
        key: "_getMenuItems",
        value: function() {
            var dirLine = this._getParentDirsLine();
            var result = [{
                icon: "arrowup",
                directory: this._currentDirectory.parentDirectory,
                isPathItem: true,
                cssClass: FILE_MANAGER_BREADCRUMBS_PARENT_FOLDER_ITEM_CLASS
            }, {
                text: "\xa0",
                cssClass: FILE_MANAGER_BREADCRUMBS_SEPARATOR_ITEM_CLASS
            }];
            dirLine.forEach(function(dir, index) {
                result.push({
                    text: dir.getDisplayName(),
                    directory: dir,
                    isPathItem: true
                });
                if (index !== dirLine.length - 1) {
                    result.push({
                        icon: "spinnext",
                        cssClass: FILE_MANAGER_BREADCRUMBS_PATH_SEPARATOR_ITEM_CLASS
                    })
                }
            });
            return result
        }
    }, {
        key: "_onItemClick",
        value: function(_ref) {
            var itemData = _ref.itemData;
            if (!itemData.isPathItem) {
                return
            }
            var newDir = itemData.directory;
            if (!this._areDirsEqual(newDir, this._currentDirectory)) {
                this._raiseCurrentDirectoryChanged(newDir)
            }
        }
    }, {
        key: "_onClick",
        value: function(_ref2) {
            var target = _ref2.target;
            var $item = (0, _renderer2.default)(target).closest(".".concat(MENU_ITEMS_CONTAINER_CLASS));
            if (0 === $item.length) {
                this._raiseOutsideClick()
            }
        }
    }, {
        key: "_onItemRendered",
        value: function(_ref3) {
            var itemElement = _ref3.itemElement,
                itemData = _ref3.itemData;
            if (itemData.cssClass) {
                (0, _renderer2.default)(itemElement).addClass(itemData.cssClass)
            }
        }
    }, {
        key: "_getParentDirsLine",
        value: function() {
            var currentDirectory = this._currentDirectory;
            var result = [];
            while (currentDirectory) {
                result.unshift(currentDirectory);
                currentDirectory = currentDirectory.parentDirectory
            }
            return result
        }
    }, {
        key: "_areDirsEqual",
        value: function(dir1, dir2) {
            return dir1 && dir2 && dir1 === dir2 && dir1.fileItem.key === dir2.fileItem.key
        }
    }, {
        key: "_initActions",
        value: function() {
            this._actions = {
                onCurrentDirectoryChanging: this._createActionByOption("onCurrentDirectoryChanging"),
                onOutsideClick: this._createActionByOption("onOutsideClick")
            }
        }
    }, {
        key: "_raiseCurrentDirectoryChanged",
        value: function(currentDirectory) {
            this._actions.onCurrentDirectoryChanging({
                currentDirectory: currentDirectory
            })
        }
    }, {
        key: "_raiseOutsideClick",
        value: function() {
            this._actions.onOutsideClick()
        }
    }, {
        key: "_getDefaultOptions",
        value: function() {
            return (0, _extend.extend)(_get(_getPrototypeOf(FileManagerBreadcrumbs.prototype), "_getDefaultOptions", this).call(this), {
                rootFolderDisplayName: "Files",
                onCurrentDirectoryChanging: null,
                onOutsideClick: null
            })
        }
    }, {
        key: "_optionChanged",
        value: function(args) {
            var name = args.name;
            switch (name) {
                case "rootFolderDisplayName":
                    this.repaint();
                    break;
                case "onCurrentDirectoryChanging":
                case "onOutsideClick":
                    this._actions[name] = this._createActionByOption(name);
                    break;
                default:
                    _get(_getPrototypeOf(FileManagerBreadcrumbs.prototype), "_optionChanged", this).call(this, args)
            }
        }
    }]);
    return FileManagerBreadcrumbs
}(_ui2.default);
module.exports = FileManagerBreadcrumbs;
