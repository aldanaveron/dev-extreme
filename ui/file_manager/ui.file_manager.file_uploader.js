/**
 * DevExtreme (ui/file_manager/ui.file_manager.file_uploader.js)
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
var _deferred = require("../../core/utils/deferred");
var _type = require("../../core/utils/type");
var _guid = require("../../core/guid");
var _guid2 = _interopRequireDefault(_guid);
var _ui = require("../widget/ui.widget");
var _ui2 = _interopRequireDefault(_ui);
var _file_uploader = require("../file_uploader");
var _file_uploader2 = _interopRequireDefault(_file_uploader);
var _uiFile_manager = require("./ui.file_manager.common");
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
var FILE_MANAGER_FILE_UPLOADER_CLASS = "dx-filemanager-fileuploader";
var FileManagerFileUploader = function(_Widget) {
    _inherits(FileManagerFileUploader, _Widget);
    var _super = _createSuper(FileManagerFileUploader);

    function FileManagerFileUploader() {
        _classCallCheck(this, FileManagerFileUploader);
        return _super.apply(this, arguments)
    }
    _createClass(FileManagerFileUploader, [{
        key: "_initMarkup",
        value: function() {
            this._initActions();
            this.$element().addClass(FILE_MANAGER_FILE_UPLOADER_CLASS);
            this._uploaderInfos = [];
            this._createInternalFileUploader();
            _get(_getPrototypeOf(FileManagerFileUploader.prototype), "_initMarkup", this).call(this)
        }
    }, {
        key: "_createInternalFileUploader",
        value: function() {
            var _this = this;
            var chunkSize = this._getController().chunkSize;
            var $fileUploader = (0, _renderer2.default)("<div>").appendTo(this.$element());
            var fileUploader = this._createComponent($fileUploader, _file_uploader2.default, {
                name: "file",
                multiple: true,
                showFileList: false,
                activeStateEnabled: false,
                focusStateEnabled: false,
                hoverStateEnabled: false,
                labelText: "",
                readyToUploadMessage: "",
                accept: "*",
                chunkSize: chunkSize,
                onValueChanged: function(e) {
                    return _this._onFileUploaderValueChanged(e)
                },
                onProgress: function(e) {
                    return _this._onFileUploaderProgress(e)
                },
                onUploaded: function(e) {
                    return _this._onFileUploaderUploaded(e)
                },
                onUploadAborted: function(e) {
                    return _this._onFileUploaderUploadAborted(e)
                },
                onUploadError: function(e) {
                    return _this._onFileUploaderUploadError(e)
                }
            });
            fileUploader.option({
                uploadChunk: function(file, chunksData) {
                    return _this._fileUploaderUploadChunk(fileUploader, file, chunksData)
                },
                abortUpload: function(file, chunksData) {
                    return _this._fileUploaderAbortUpload(fileUploader, file, chunksData)
                }
            });
            var uploaderInfo = {
                fileUploader: fileUploader
            };
            this._uploaderInfos.push(uploaderInfo)
        }
    }, {
        key: "tryUpload",
        value: function() {
            var info = this._findAvailableUploaderInfo();
            if (info) {
                info.fileUploader._selectButtonClickHandler()
            }
        }
    }, {
        key: "cancelUpload",
        value: function(sessionId) {
            this._cancelUpload(sessionId)
        }
    }, {
        key: "cancelFileUpload",
        value: function(sessionId, fileIndex) {
            this._cancelUpload(sessionId, fileIndex)
        }
    }, {
        key: "_cancelUpload",
        value: function(sessionId, fileIndex) {
            var _this$_findUploaderIn = this._findUploaderInfoBySessionId(sessionId),
                fileUploader = _this$_findUploaderIn.fileUploader;
            var files = (0, _type.isDefined)(fileIndex) ? [fileUploader._files[fileIndex]] : fileUploader._files;
            fileUploader._preventFilesUploading(files)
        }
    }, {
        key: "_fileUploaderUploadChunk",
        value: function(fileUploader, file, chunksInfo) {
            var _this$_findSessionByF = this._findSessionByFile(fileUploader, file),
                session = _this$_findSessionByF.session,
                fileIndex = _this$_findSessionByF.fileIndex;
            var controller = session.controller;
            chunksInfo.fileIndex = fileIndex;
            return controller.uploadFileChunk(file, chunksInfo)
        }
    }, {
        key: "_fileUploaderAbortUpload",
        value: function(fileUploader, file, chunksInfo) {
            var _this$_findSessionByF2 = this._findSessionByFile(fileUploader, file),
                session = _this$_findSessionByF2.session,
                fileIndex = _this$_findSessionByF2.fileIndex;
            var controller = session.controller;
            chunksInfo.fileIndex = fileIndex;
            return controller.abortFileUpload(file, chunksInfo)
        }
    }, {
        key: "_onFileUploaderValueChanged",
        value: function(_ref) {
            var _this2 = this;
            var component = _ref.component,
                value = _ref.value;
            if (0 === value.length) {
                return
            }
            var files = value.slice();
            var uploaderInfo = this._findUploaderInfo(component);
            this._uploadFiles(uploaderInfo, files);
            setTimeout(function() {
                if (!_this2._findAvailableUploaderInfo()) {
                    _this2._createInternalFileUploader()
                }
            })
        }
    }, {
        key: "_onFileUploaderProgress",
        value: function(_ref2) {
            var component = _ref2.component,
                file = _ref2.file,
                bytesLoaded = _ref2.bytesLoaded,
                bytesTotal = _ref2.bytesTotal;
            var _this$_findSessionByF3 = this._findSessionByFile(component, file),
                session = _this$_findSessionByF3.session,
                fileIndex = _this$_findSessionByF3.fileIndex;
            var fileValue = 0 !== bytesTotal ? bytesLoaded / bytesTotal : 1;
            var commonValue = component.option("progress") / 100;
            var args = {
                sessionId: session.id,
                fileIndex: fileIndex,
                commonValue: commonValue,
                fileValue: fileValue
            };
            this._raiseUploadProgress(args)
        }
    }, {
        key: "_onFileUploaderUploaded",
        value: function(_ref3) {
            var component = _ref3.component,
                file = _ref3.file;
            var deferred = this._getDeferredForFile(component, file);
            deferred.resolve()
        }
    }, {
        key: "_onFileUploaderUploadAborted",
        value: function(_ref4) {
            var component = _ref4.component,
                file = _ref4.file;
            var deferred = this._getDeferredForFile(component, file);
            deferred.resolve({
                canceled: true
            })
        }
    }, {
        key: "_onFileUploaderUploadError",
        value: function(_ref5) {
            var component = _ref5.component,
                file = _ref5.file,
                error = _ref5.error;
            var deferred = this._getDeferredForFile(component, file);
            deferred.reject(error)
        }
    }, {
        key: "_uploadFiles",
        value: function(uploaderInfo, files) {
            var sessionId = (new _guid2.default).toString();
            var controller = this._getController();
            var deferreds = files.map(function() {
                return new _deferred.Deferred
            });
            var session = {
                id: sessionId,
                controller: controller,
                files: files,
                deferreds: deferreds
            };
            uploaderInfo.session = session;
            var sessionInfo = {
                sessionId: sessionId,
                deferreds: deferreds,
                files: files
            };
            this._raiseUploadSessionStarted(sessionInfo);
            return (0, _uiFile_manager2.default)(deferreds).always(function() {
                return setTimeout(function() {
                    uploaderInfo.fileUploader.option("value", []);
                    uploaderInfo.session = null
                })
            })
        }
    }, {
        key: "_getDeferredForFile",
        value: function(fileUploader, file) {
            var _this$_findSessionByF4 = this._findSessionByFile(fileUploader, file),
                session = _this$_findSessionByF4.session,
                fileIndex = _this$_findSessionByF4.fileIndex;
            return session.deferreds[fileIndex]
        }
    }, {
        key: "_findSessionByFile",
        value: function(fileUploader, file) {
            var uploaderInfo = this._findUploaderInfo(fileUploader);
            var session = uploaderInfo.session;
            var fileIndex = session.files.indexOf(file);
            return {
                session: session,
                fileIndex: fileIndex
            }
        }
    }, {
        key: "_findUploaderInfoBySessionId",
        value: function(sessionId) {
            for (var i = 0; i < this._uploaderInfos.length; i++) {
                var uploaderInfo = this._uploaderInfos[i];
                var session = uploaderInfo.session;
                if (session && session.id === sessionId) {
                    return uploaderInfo
                }
            }
            return null
        }
    }, {
        key: "_findAvailableUploaderInfo",
        value: function() {
            for (var i = 0; i < this._uploaderInfos.length; i++) {
                var info = this._uploaderInfos[i];
                if (!info.session) {
                    return info
                }
            }
            return null
        }
    }, {
        key: "_findUploaderInfo",
        value: function(fileUploader) {
            for (var i = 0; i < this._uploaderInfos.length; i++) {
                var info = this._uploaderInfos[i];
                if (info.fileUploader === fileUploader) {
                    return info
                }
            }
            return null
        }
    }, {
        key: "_getController",
        value: function() {
            var controllerGetter = this.option("getController");
            return controllerGetter()
        }
    }, {
        key: "_raiseUploadSessionStarted",
        value: function(sessionInfo) {
            this._actions.onUploadSessionStarted({
                sessionInfo: sessionInfo
            })
        }
    }, {
        key: "_raiseUploadProgress",
        value: function(args) {
            this._actions.onUploadProgress(args)
        }
    }, {
        key: "_initActions",
        value: function() {
            this._actions = {
                onUploadSessionStarted: this._createActionByOption("onUploadSessionStarted"),
                onUploadProgress: this._createActionByOption("onUploadProgress")
            }
        }
    }, {
        key: "_getDefaultOptions",
        value: function() {
            return (0, _extend.extend)(_get(_getPrototypeOf(FileManagerFileUploader.prototype), "_getDefaultOptions", this).call(this), {
                getController: null,
                onUploadSessionStarted: null,
                onUploadProgress: null
            })
        }
    }, {
        key: "_optionChanged",
        value: function(args) {
            var name = args.name;
            switch (name) {
                case "getController":
                    this.repaint();
                    break;
                case "onUploadSessionStarted":
                case "onUploadProgress":
                    this._actions[name] = this._createActionByOption(name);
                    break;
                default:
                    _get(_getPrototypeOf(FileManagerFileUploader.prototype), "_optionChanged", this).call(this, args)
            }
        }
    }]);
    return FileManagerFileUploader
}(_ui2.default);
module.exports = FileManagerFileUploader;
