/**
 * DevExtreme (bundles/modules/file_management.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _core = require("./core");
var _core2 = _interopRequireDefault(_core);
var _file_system_item = require("../../file_management/file_system_item");
var _file_system_item2 = _interopRequireDefault(_file_system_item);
var _object_provider = require("../../file_management/object_provider");
var _object_provider2 = _interopRequireDefault(_object_provider);
var _remote_provider = require("../../file_management/remote_provider");
var _remote_provider2 = _interopRequireDefault(_remote_provider);
var _custom_provider = require("../../file_management/custom_provider");
var _custom_provider2 = _interopRequireDefault(_custom_provider);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
module.exports = _core2.default.fileManagement = _core2.default.fileManagement || {};
_core2.default.fileManagement.FileSystemItem = _file_system_item2.default;
_core2.default.fileManagement.ObjectFileSystemProvider = _object_provider2.default;
_core2.default.fileManagement.RemoteFileSystemProvider = _remote_provider2.default;
_core2.default.fileManagement.CustomFileSystemProvider = _custom_provider2.default;
