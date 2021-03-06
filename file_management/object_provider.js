/**
 * DevExtreme (file_management/object_provider.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _array = require("../core/utils/array");
var _common = require("../core/utils/common");
var _data = require("../core/utils/data");
var _guid = require("../core/guid");
var _guid2 = _interopRequireDefault(_guid);
var _type = require("../core/utils/type");
var _type2 = _interopRequireDefault(_type);
var _errors = require("../data/errors");
var _deferred = require("../core/utils/deferred");
var _window = require("../core/utils/window");
var _file_saver = require("../exporter/file_saver");
var _ui = require("../ui/widget/ui.errors");
var _ui2 = _interopRequireDefault(_ui);
var _jszip = require("jszip");
var _jszip2 = _interopRequireDefault(_jszip);
var _provider_base = require("./provider_base");
var _provider_base2 = _interopRequireDefault(_provider_base);
var _errors2 = require("./errors");
var _errors3 = _interopRequireDefault(_errors2);
var _utils = require("./utils");

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
var window = (0, _window.getWindow)();
var ObjectFileSystemProvider = function(_FileSystemProviderBa) {
    _inherits(ObjectFileSystemProvider, _FileSystemProviderBa);
    var _super = _createSuper(ObjectFileSystemProvider);

    function ObjectFileSystemProvider(options) {
        var _this;
        _classCallCheck(this, ObjectFileSystemProvider);
        options = (0, _common.ensureDefined)(options, {});
        _this = _super.call(this, options);
        var initialArray = options.data;
        if (initialArray && !Array.isArray(initialArray)) {
            throw _errors.errors.Error("E4006")
        }
        var itemsExpr = options.itemsExpr || "items";
        _this._subFileItemsGetter = (0, _data.compileGetter)(itemsExpr);
        _this._subFileItemsSetter = _this._getSetter(itemsExpr);
        var contentExpr = options.contentExpr || "content";
        _this._contentGetter = (0, _data.compileGetter)(contentExpr);
        _this._contentSetter = _this._getSetter(contentExpr);
        var nameExpr = _this._getNameExpr(options);
        _this._nameSetter = _this._getSetter(nameExpr);
        var isDirExpr = _this._getIsDirExpr(options);
        _this._getIsDirSetter = _this._getSetter(isDirExpr);
        var keyExpr = _this._getKeyExpr(options);
        _this._keySetter = _this._getSetter(keyExpr);
        var sizeExpr = _this._getSizeExpr(options);
        _this._sizeSetter = _this._getSetter(sizeExpr);
        var dateModifiedExpr = _this._getDateModifiedExpr(options);
        _this._dateModifiedSetter = _this._getSetter(dateModifiedExpr);
        _this._data = initialArray || [];
        return _this
    }
    _createClass(ObjectFileSystemProvider, [{
        key: "getItems",
        value: function(parentDir) {
            var _this2 = this;
            return this._executeActionAsDeferred(function() {
                return _this2._getItems(parentDir)
            }, true)
        }
    }, {
        key: "renameItem",
        value: function(item, name) {
            var _this3 = this;
            return this._executeActionAsDeferred(function() {
                return _this3._renameItemCore(item, name)
            })
        }
    }, {
        key: "_renameItemCore",
        value: function(item, name) {
            if (!item) {
                return
            }
            this._nameSetter(item.dataItem, name);
            item.name = name;
            item.key = this._ensureDataObjectKey(item.dataItem)
        }
    }, {
        key: "createDirectory",
        value: function(parentDir, name) {
            var _this4 = this;
            return this._executeActionAsDeferred(function() {
                _this4._validateDirectoryExists(parentDir);
                _this4._createDataObject(parentDir, name, true)
            })
        }
    }, {
        key: "deleteItems",
        value: function(items) {
            var _this5 = this;
            return items.map(function(item) {
                return _this5._executeActionAsDeferred(function() {
                    return _this5._deleteItem(item)
                })
            })
        }
    }, {
        key: "moveItems",
        value: function(items, destinationDir) {
            var _this6 = this;
            var array = this._getDirectoryDataItems(destinationDir.dataItem);
            var deferreds = items.map(function(item) {
                return _this6._executeActionAsDeferred(function() {
                    _this6._checkAbilityToMoveOrCopyItem(item, destinationDir);
                    _this6._deleteItem(item);
                    array.push(item.dataItem)
                })
            });
            this._updateHasSubDirs(destinationDir);
            return deferreds
        }
    }, {
        key: "copyItems",
        value: function(items, destinationDir) {
            var _this7 = this;
            var array = this._getDirectoryDataItems(destinationDir.dataItem);
            var deferreds = items.map(function(item) {
                return _this7._executeActionAsDeferred(function() {
                    _this7._checkAbilityToMoveOrCopyItem(item, destinationDir);
                    var copiedItem = _this7._createCopy(item.dataItem);
                    array.push(copiedItem)
                })
            });
            this._updateHasSubDirs(destinationDir);
            return deferreds
        }
    }, {
        key: "uploadFileChunk",
        value: function(fileData, chunksInfo, destinationDirectory) {
            var _this8 = this;
            if (chunksInfo.chunkIndex > 0) {
                return chunksInfo.customData.deferred
            }
            this._validateDirectoryExists(destinationDirectory);
            var deferred = chunksInfo.customData.deferred = new _deferred.Deferred;
            var reader = this._createFileReader();
            reader.readAsDataURL(fileData);
            reader.onload = function() {
                var content = reader.result.split(",")[1];
                var dataObj = _this8._createDataObject(destinationDirectory, fileData.name, false);
                _this8._sizeSetter(dataObj, fileData.size);
                _this8._dateModifiedSetter(dataObj, fileData.lastModifiedDate);
                _this8._contentSetter(dataObj, content);
                deferred.resolve()
            };
            reader.onerror = function(error) {
                return deferred.reject(error)
            };
            return deferred
        }
    }, {
        key: "downloadItems",
        value: function(items) {
            if (1 === items.length) {
                this._downloadSingleFile(items[0])
            } else {
                this._downloadMultipleFiles(items)
            }
        }
    }, {
        key: "_downloadSingleFile",
        value: function(file) {
            var content = this._getFileContent(file);
            var byteString = window.atob(content);
            var arrayBuffer = new ArrayBuffer(byteString.length);
            var array = new Uint8Array(arrayBuffer);
            for (var i = 0; i < byteString.length; i++) {
                array[i] = byteString.charCodeAt(i)
            }
            var blob = new window.Blob([arrayBuffer], {
                type: "application/octet-stream"
            });
            _file_saver.fileSaver.saveAs(file.name, null, blob)
        }
    }, {
        key: "_downloadMultipleFiles",
        value: function(files) {
            var _this9 = this;
            var jsZip = getJSZip();
            var zip = new jsZip;
            files.forEach(function(file) {
                return zip.file(file.name, _this9._getFileContent(file), {
                    base64: true
                })
            });
            var options = {
                type: "blob",
                compression: "DEFLATE",
                mimeType: "application/zip"
            };
            var deferred = new _deferred.Deferred;
            if (zip.generateAsync) {
                zip.generateAsync(options).then(deferred.resolve)
            } else {
                deferred.resolve(zip.generate(options))
            }
            deferred.done(function(blob) {
                return _file_saver.fileSaver.saveAs("files.zip", null, blob)
            })
        }
    }, {
        key: "_getFileContent",
        value: function(file) {
            return this._contentGetter(file.dataItem) || ""
        }
    }, {
        key: "_validateDirectoryExists",
        value: function(directoryInfo) {
            if (!this._isFileItemExists(directoryInfo) || this._isDirGetter(directoryInfo.fileItem)) {
                throw {
                    errorId: _errors3.default.DirectoryNotFound,
                    fileItem: directoryInfo
                }
            }
        }
    }, {
        key: "_checkAbilityToMoveOrCopyItem",
        value: function(item, destinationDir) {
            var _this10 = this;
            var itemKey = this._getKeyFromDataObject(item.dataItem, item.parentPath);
            var pathInfo = destinationDir.getFullPathInfo();
            var currentPath = "";
            pathInfo.forEach(function(info) {
                currentPath = (0, _utils.pathCombine)(currentPath, info.name);
                var pathKey = _this10._getDataObjectKey(info.key, currentPath);
                if (pathKey === itemKey) {
                    throw {
                        errorId: _errors3.default.Other,
                        fileItem: item
                    }
                }
            })
        }
    }, {
        key: "_createDataObject",
        value: function(parentDir, name, isDirectory) {
            var dataObj = {};
            this._nameSetter(dataObj, name);
            this._getIsDirSetter(dataObj, isDirectory);
            this._keySetter(dataObj, String(new _guid2.default));
            var array = this._getDirectoryDataItems(parentDir.dataItem);
            array.push(dataObj);
            if (isDirectory) {
                this._updateHasSubDirs(parentDir)
            }
            return dataObj
        }
    }, {
        key: "_createCopy",
        value: function(dataObj) {
            var _this11 = this;
            var copyObj = {};
            this._nameSetter(copyObj, this._nameGetter(dataObj));
            this._getIsDirSetter(copyObj, this._isDirGetter(dataObj));
            var items = this._subFileItemsGetter(dataObj);
            if (Array.isArray(items)) {
                var itemsCopy = [];
                items.forEach(function(childItem) {
                    var childCopy = _this11._createCopy(childItem);
                    itemsCopy.push(childCopy)
                });
                this._subFileItemsSetter(copyObj, itemsCopy)
            }
            return copyObj
        }
    }, {
        key: "_deleteItem",
        value: function(fileItem) {
            var fileItemObj = this._findFileItemObj(fileItem.getFullPathInfo());
            if (!fileItemObj) {
                throw {
                    errorId: fileItem.isDirectory ? _errors3.default.DirectoryNotFound : _errors3.default.FileNotFound,
                    fileItem: fileItem
                }
            }
            var parentDirDataObj = this._findFileItemObj(fileItem.pathInfo);
            var array = this._getDirectoryDataItems(parentDirDataObj);
            var index = array.indexOf(fileItemObj);
            array.splice(index, 1)
        }
    }, {
        key: "_getDirectoryDataItems",
        value: function(directoryDataObj) {
            if (!directoryDataObj) {
                return this._data
            }
            var dataItems = this._subFileItemsGetter(directoryDataObj);
            if (!Array.isArray(dataItems)) {
                dataItems = [];
                this._subFileItemsSetter(directoryDataObj, dataItems)
            }
            return dataItems
        }
    }, {
        key: "_getItems",
        value: function(parentDir) {
            var pathInfo = parentDir.getFullPathInfo();
            var parentDirKey = pathInfo && pathInfo.length > 0 ? pathInfo[pathInfo.length - 1].key : null;
            var dirFileObjects = this._data;
            if (parentDirKey) {
                var directoryEntry = this._findFileItemObj(pathInfo);
                dirFileObjects = directoryEntry && this._subFileItemsGetter(directoryEntry) || []
            }
            this._ensureKeysForDuplicateNameItems(dirFileObjects);
            return this._convertDataObjectsToFileItems(dirFileObjects, pathInfo)
        }
    }, {
        key: "_ensureKeysForDuplicateNameItems",
        value: function(dataObjects) {
            var _this12 = this;
            var names = {};
            dataObjects.forEach(function(obj) {
                var name = _this12._nameGetter(obj);
                if (names[name]) {
                    _this12._ensureDataObjectKey(obj)
                } else {
                    names[name] = true
                }
            })
        }
    }, {
        key: "_findFileItemObj",
        value: function(pathInfo) {
            var _this13 = this;
            if (!Array.isArray(pathInfo)) {
                pathInfo = []
            }
            var currentPath = "";
            var fileItemObj = null;
            var fileItemObjects = this._data;
            var _loop = function(i) {
                fileItemObj = (0, _array.find)(fileItemObjects, function(item) {
                    var hasCorrectFileItemType = _this13._isDirGetter(item) || i === pathInfo.length - 1;
                    return _this13._getKeyFromDataObject(item, currentPath) === pathInfo[i].key && _this13._nameGetter(item) === pathInfo[i].name && hasCorrectFileItemType
                });
                if (fileItemObj) {
                    currentPath = (0, _utils.pathCombine)(currentPath, _this13._nameGetter(fileItemObj));
                    fileItemObjects = _this13._subFileItemsGetter(fileItemObj)
                }
            };
            for (var i = 0; i < pathInfo.length && (0 === i || fileItemObj); i++) {
                _loop(i)
            }
            return fileItemObj
        }
    }, {
        key: "_getKeyFromDataObject",
        value: function(dataObj, defaultKeyPrefix) {
            var key = this._keyGetter(dataObj);
            var relativeName = (0, _utils.pathCombine)(defaultKeyPrefix, this._nameGetter(dataObj));
            return this._getDataObjectKey(key, relativeName)
        }
    }, {
        key: "_getDataObjectKey",
        value: function(key, relativeName) {
            return key ? key : relativeName
        }
    }, {
        key: "_ensureDataObjectKey",
        value: function(dataObj) {
            var key = this._keyGetter(dataObj);
            if (!key) {
                key = String(new _guid2.default);
                this._keySetter(dataObj, key)
            }
            return key
        }
    }, {
        key: "_updateHasSubDirs",
        value: function(dir) {
            if (dir && !dir.isRoot()) {
                dir.hasSubDirs = this._hasSubDirs(dir.dataItem)
            }
        }
    }, {
        key: "_hasSubDirs",
        value: function(dataObj) {
            var subItems = (0, _common.ensureDefined)(this._subFileItemsGetter(dataObj), []);
            if (!Array.isArray(subItems)) {
                return true
            }
            for (var i = 0; i < subItems.length; i++) {
                if (true === this._isDirGetter(subItems[i])) {
                    return true
                }
            }
            return false
        }
    }, {
        key: "_getSetter",
        value: function(expr) {
            return _type2.default.isFunction(expr) ? expr : (0, _data.compileSetter)(expr)
        }
    }, {
        key: "_isFileItemExists",
        value: function(fileItem) {
            return fileItem.isDirectory && fileItem.isRoot() || !!this._findFileItemObj(fileItem.getFullPathInfo())
        }
    }, {
        key: "_createFileReader",
        value: function() {
            return new window.FileReader
        }
    }]);
    return ObjectFileSystemProvider
}(_provider_base2.default);

function getJSZip() {
    if (!_jszip2.default) {
        throw _ui2.default.Error("E1041", "JSZip")
    }
    return _jszip2.default
}
module.exports = ObjectFileSystemProvider;
module.exports.default = module.exports;
