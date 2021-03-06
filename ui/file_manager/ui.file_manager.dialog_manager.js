/**
 * DevExtreme (ui/file_manager/ui.file_manager.dialog_manager.js)
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
var _uiFile_managerDialog = require("./ui.file_manager.dialog.name_editor");
var _uiFile_managerDialog2 = _interopRequireDefault(_uiFile_managerDialog);
var _uiFile_managerDialog3 = require("./ui.file_manager.dialog.folder_chooser");
var _uiFile_managerDialog4 = _interopRequireDefault(_uiFile_managerDialog3);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
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
var FileManagerDialogManager = function() {
    function FileManagerDialogManager($element, options) {
        var _this = this;
        _classCallCheck(this, FileManagerDialogManager);
        this._$element = $element;
        this._options = options;
        var $chooseFolderDialog = (0, _renderer2.default)("<div>").appendTo(this._$element);
        this._chooseDirectoryDialog = new _uiFile_managerDialog4.default($chooseFolderDialog, (0, _extend.extend)(this._options.chooseDirectoryDialog, {
            onClosed: this._options.onDialogClosed
        }));
        var $renameDialog = (0, _renderer2.default)("<div>").appendTo(this._$element);
        this._renameItemDialog = new _uiFile_managerDialog2.default($renameDialog, {
            title: _message2.default.format("dxFileManager-dialogRenameItemTitle"),
            buttonText: _message2.default.format("dxFileManager-dialogRenameItemButtonText"),
            onClosed: this._options.onDialogClosed
        });
        var $createDialog = (0, _renderer2.default)("<div>").appendTo(this._$element);
        this._createItemDialog = new _uiFile_managerDialog2.default($createDialog, {
            title: _message2.default.format("dxFileManager-dialogCreateDirectoryTitle"),
            buttonText: _message2.default.format("dxFileManager-dialogCreateDirectoryButtonText"),
            onClosed: this._options.onDialogClosed
        });
        this._confirmationDialog = {
            show: function() {
                setTimeout(function() {
                    _this._options.onDialogClosed({
                        dialogResult: {}
                    })
                })
            }
        }
    }
    _createClass(FileManagerDialogManager, [{
        key: "getCopyDialog",
        value: function() {
            this._chooseDirectoryDialog.switchToCopyDialog();
            return this._chooseDirectoryDialog
        }
    }, {
        key: "getMoveDialog",
        value: function() {
            this._chooseDirectoryDialog.switchToMoveDialog();
            return this._chooseDirectoryDialog
        }
    }, {
        key: "getRenameItemDialog",
        value: function() {
            return this._renameItemDialog
        }
    }, {
        key: "getCreateItemDialog",
        value: function() {
            return this._createItemDialog
        }
    }, {
        key: "getConfirmationDialog",
        value: function() {
            return this._confirmationDialog
        }
    }]);
    return FileManagerDialogManager
}();
module.exports = FileManagerDialogManager;
