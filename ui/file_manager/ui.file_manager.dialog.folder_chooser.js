/**
 * DevExtreme (ui/file_manager/ui.file_manager.dialog.folder_chooser.js)
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
var _message = require("../../localization/message");
var _message2 = _interopRequireDefault(_message);
var _uiFile_managerDialog = require("./ui.file_manager.dialog.js");
var _uiFile_managerDialog2 = _interopRequireDefault(_uiFile_managerDialog);
var _uiFile_manager = require("./ui.file_manager.files_tree_view");
var _uiFile_manager2 = _interopRequireDefault(_uiFile_manager);

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
var FILE_MANAGER_DIALOG_FOLDER_CHOOSER = "dx-filemanager-dialog-folder-chooser";
var FILE_MANAGER_DIALOG_FOLDER_CHOOSER_POPUP = "dx-filemanager-dialog-folder-chooser-popup";
var FileManagerFolderChooserDialog = function(_FileManagerDialogBas) {
    _inherits(FileManagerFolderChooserDialog, _FileManagerDialogBas);
    var _super = _createSuper(FileManagerFolderChooserDialog);

    function FileManagerFolderChooserDialog() {
        _classCallCheck(this, FileManagerFolderChooserDialog);
        return _super.apply(this, arguments)
    }
    _createClass(FileManagerFolderChooserDialog, [{
        key: "show",
        value: function() {
            this._filesTreeView && this._filesTreeView.refresh();
            _get(_getPrototypeOf(FileManagerFolderChooserDialog.prototype), "show", this).call(this)
        }
    }, {
        key: "switchToCopyDialog",
        value: function() {
            this._setTitle(_message2.default.format("dxFileManager-dialogDirectoryChooserCopyTitle"));
            this._setButtonText(_message2.default.format("dxFileManager-dialogDirectoryChooserCopyButtonText"))
        }
    }, {
        key: "switchToMoveDialog",
        value: function() {
            this._setTitle(_message2.default.format("dxFileManager-dialogDirectoryChooserMoveTitle"));
            this._setButtonText(_message2.default.format("dxFileManager-dialogDirectoryChooserMoveButtonText"))
        }
    }, {
        key: "_getDialogOptions",
        value: function() {
            return (0, _extend.extend)(_get(_getPrototypeOf(FileManagerFolderChooserDialog.prototype), "_getDialogOptions", this).call(this), {
                contentCssClass: FILE_MANAGER_DIALOG_FOLDER_CHOOSER,
                popupCssClass: FILE_MANAGER_DIALOG_FOLDER_CHOOSER_POPUP
            })
        }
    }, {
        key: "_createContentTemplate",
        value: function(element) {
            _get(_getPrototypeOf(FileManagerFolderChooserDialog.prototype), "_createContentTemplate", this).call(this, element);
            this._filesTreeView = this._createComponent((0, _renderer2.default)("<div>"), _uiFile_manager2.default, {
                getDirectories: this.option("getDirectories"),
                getCurrentDirectory: this._getDialogSelectedDirectory.bind(this),
                onDirectoryClick: this._onFilesTreeViewDirectoryClick.bind(this)
            });
            this._$contentElement.append(this._filesTreeView.$element())
        }
    }, {
        key: "_getDialogResult",
        value: function() {
            return {
                folder: this._getDialogSelectedDirectory()
            }
        }
    }, {
        key: "_getDefaultOptions",
        value: function() {
            return (0, _extend.extend)(_get(_getPrototypeOf(FileManagerFolderChooserDialog.prototype), "_getDefaultOptions", this).call(this), {
                getItems: null
            })
        }
    }, {
        key: "_getDialogSelectedDirectory",
        value: function() {
            return this._selectedDirectoryInfo || this.option("getCurrentDirectory")()
        }
    }, {
        key: "_onFilesTreeViewDirectoryClick",
        value: function(_ref) {
            var itemData = _ref.itemData;
            this._selectedDirectoryInfo = itemData;
            this._filesTreeView.updateCurrentDirectory()
        }
    }]);
    return FileManagerFolderChooserDialog
}(_uiFile_managerDialog2.default);
module.exports = FileManagerFolderChooserDialog;
