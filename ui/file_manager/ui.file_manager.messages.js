/**
 * DevExtreme (ui/file_manager/ui.file_manager.messages.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FileManagerMessages = void 0;
var _message = require("../../localization/message");
var _message2 = _interopRequireDefault(_message);
var _errors = require("../../file_management/errors");
var _errors2 = _interopRequireDefault(_errors);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var FileManagerMessages = exports.FileManagerMessages = {
    get: function(errorId, args) {
        switch (errorId) {
            case _errors2.default.NoAccess:
                return _message2.default.format("dxFileManager-errorNoAccess");
            case _errors2.default.FileExists:
                return _message2.default.format("dxFileManager-errorFileExistsFormat", args);
            case _errors2.default.FileNotFound:
                return _message2.default.format("dxFileManager-errorFileNotFoundFormat", args);
            case _errors2.default.DirectoryExists:
                return _message2.default.format("dxFileManager-errorDirectoryExistsFormat", args);
            case _errors2.default.DirectoryNotFound:
                return _message2.default.format("dxFileManager-errorDirectoryNotFoundFormat", args);
            case _errors2.default.WrongFileExtension:
                return _message2.default.format("dxFileManager-errorWrongFileExtension");
            case _errors2.default.MaxFileSizeExceeded:
                return _message2.default.format("dxFileManager-errorMaxFileSizeExceeded");
            case _errors2.default.InvalidSymbols:
                return _message2.default.format("dxFileManager-errorInvalidSymbols")
        }
        return _message2.default.format("dxFileManager-errorDefault")
    }
};
module.exports.ErrorCode = _errors2.default;
