/**
 * DevExtreme (ui/file_manager/ui.file_manager.command_manager.js)
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
exports.FileManagerCommandManager = void 0;
var _extend = require("../../core/utils/extend");
var _type = require("../../core/utils/type");
var _message = require("../../localization/message");
var _message2 = _interopRequireDefault(_message);

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
var FileManagerCommandManager = exports.FileManagerCommandManager = function() {
    function FileManagerCommandManager(permissions) {
        _classCallCheck(this, FileManagerCommandManager);
        this._actions = {};
        this._permissions = permissions || {};
        this._initCommands()
    }
    _createClass(FileManagerCommandManager, [{
        key: "_initCommands",
        value: function() {
            var _this = this;
            this._commands = [{
                name: "create",
                text: _message2.default.format("dxFileManager-commandCreate"),
                icon: "newfolder",
                enabled: this._permissions.create,
                noFileItemRequired: true
            }, {
                name: "rename",
                text: _message2.default.format("dxFileManager-commandRename"),
                icon: "rename",
                enabled: this._permissions.rename,
                isSingleFileItemCommand: true
            }, {
                name: "move",
                text: _message2.default.format("dxFileManager-commandMove"),
                icon: "movetofolder",
                enabled: this._permissions.move
            }, {
                name: "copy",
                text: _message2.default.format("dxFileManager-commandCopy"),
                icon: "copy",
                enabled: this._permissions.copy
            }, {
                name: "delete",
                text: _message2.default.format("dxFileManager-commandDelete"),
                icon: "trash",
                enabled: this._permissions.delete
            }, {
                name: "download",
                text: _message2.default.format("dxFileManager-commandDownload"),
                icon: "download",
                enabled: this._permissions.download
            }, {
                name: "upload",
                text: _message2.default.format("dxFileManager-commandUpload"),
                icon: "upload",
                enabled: this._permissions.upload,
                noFileItemRequired: true
            }, {
                name: "refresh",
                text: _message2.default.format("dxFileManager-commandRefresh"),
                icon: "dx-filemanager-i dx-filemanager-i-refresh",
                enabled: true,
                noFileItemRequired: true
            }, {
                name: "thumbnails",
                text: _message2.default.format("dxFileManager-commandThumbnails"),
                icon: "mediumiconslayout",
                enabled: true,
                noFileItemRequired: true
            }, {
                name: "details",
                text: _message2.default.format("dxFileManager-commandDetails"),
                icon: "detailslayout",
                enabled: true,
                noFileItemRequired: true
            }, {
                name: "clear",
                text: _message2.default.format("dxFileManager-commandClear"),
                icon: "remove",
                enabled: true
            }, {
                name: "showNavPane",
                icon: "menu",
                enabled: false,
                noFileItemRequired: true
            }];
            this._commandMap = {};
            this._commands.forEach(function(command) {
                _this._commandMap[command.name] = command
            })
        }
    }, {
        key: "registerActions",
        value: function(actions) {
            this._actions = (0, _extend.extend)(this._actions, actions)
        }
    }, {
        key: "executeCommand",
        value: function(command, arg) {
            var commandName = (0, _type.isString)(command) ? command : command.name;
            var action = this._actions[commandName];
            if (action) {
                return action(arg)
            }
        }
    }, {
        key: "setCommandEnabled",
        value: function(commandName, enabled) {
            var command = this.getCommandByName(commandName);
            if (command) {
                command.enabled = enabled
            }
        }
    }, {
        key: "getCommandByName",
        value: function(name) {
            return this._commandMap[name]
        }
    }, {
        key: "isCommandAvailable",
        value: function(commandName, itemInfos) {
            var command = this.getCommandByName(commandName);
            if (!command || !command.enabled) {
                return false
            }
            if (command.noFileItemRequired) {
                return true
            }
            var itemsLength = itemInfos && itemInfos.length || 0;
            if (0 === itemsLength || itemInfos.some(function(item) {
                    return item.fileItem.isRoot() || item.fileItem.isParentFolder
                })) {
                return false
            }
            if ("download" === commandName) {
                return itemInfos.every(function(itemInfo) {
                    return !itemInfo.fileItem.isDirectory
                })
            }
            return !command.isSingleFileItemCommand || 1 === itemsLength
        }
    }]);
    return FileManagerCommandManager
}();
