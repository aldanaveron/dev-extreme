/**
 * DevExtreme (ui/file_manager/ui.file_manager.editing.js)
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
var _iterator = require("../../core/utils/iterator");
var _string = require("../../core/utils/string");
var _message = require("../../localization/message");
var _message2 = _interopRequireDefault(_message);
var _ui = require("../widget/ui.widget");
var _ui2 = _interopRequireDefault(_ui);
var _uiFile_manager = require("./ui.file_manager.dialog_manager");
var _uiFile_manager2 = _interopRequireDefault(_uiFile_manager);
var _uiFile_manager3 = require("./ui.file_manager.file_uploader");
var _uiFile_manager4 = _interopRequireDefault(_uiFile_manager3);
var _uiFile_manager5 = require("./ui.file_manager.messages");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
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
var FileManagerEditingControl = function(_Widget) {
    _inherits(FileManagerEditingControl, _Widget);
    var _super = _createSuper(FileManagerEditingControl);

    function FileManagerEditingControl() {
        _classCallCheck(this, FileManagerEditingControl);
        return _super.apply(this, arguments)
    }
    _createClass(FileManagerEditingControl, [{
        key: "_initMarkup",
        value: function() {
            _get(_getPrototypeOf(FileManagerEditingControl.prototype), "_initMarkup", this).call(this);
            this._initActions();
            this._controller = this.option("controller");
            this._controller.on("EditActionStarting", this._onEditActionStarting.bind(this));
            this._controller.on("EditActionResultAcquired", this._onEditActionResultAcquired.bind(this));
            this._controller.on("EditActionItemError", this._onEditActionItemError.bind(this));
            this._controller.on("EditActionError", this._onEditActionError.bind(this));
            this._controller.on("CompleteEditActionItem", this._onCompleteEditActionItem.bind(this));
            this._controller.on("CompleteEditAction", this._onCompleteEditAction.bind(this));
            this._model = this.option("model");
            this._uploadOperationInfoMap = {};
            this._dialogManager = new _uiFile_manager2.default(this.$element(), {
                chooseDirectoryDialog: {
                    provider: this._controller._fileProvider,
                    getDirectories: this._controller.getDirectories.bind(this._controller),
                    getCurrentDirectory: this._controller.getCurrentDirectory.bind(this._controller)
                },
                onDialogClosed: this._onDialogClosed.bind(this)
            });
            this._fileUploader = this._createFileUploader();
            this._createMetadataMap()
        }
    }, {
        key: "_initNotificationControl",
        value: function(notificationControl) {
            var _this = this;
            this._notificationControl = notificationControl;
            this._notificationControl.option({
                onOperationCanceled: function(_ref) {
                    var info = _ref.info;
                    return _this._onCancelUploadSession(info)
                },
                onOperationItemCanceled: function(_ref2) {
                    var item = _ref2.item,
                        itemIndex = _ref2.itemIndex;
                    return _this._onCancelFileUpload(item, itemIndex)
                }
            })
        }
    }, {
        key: "_getFileUploaderComponent",
        value: function() {
            return _uiFile_manager4.default
        }
    }, {
        key: "_createFileUploader",
        value: function() {
            var _this2 = this;
            var $fileUploader = (0, _renderer2.default)("<div>").appendTo(this.$element());
            return this._createComponent($fileUploader, this._getFileUploaderComponent(), {
                getController: this._getFileUploaderController.bind(this),
                onUploadSessionStarted: function(e) {
                    return _this2._onUploadSessionStarted(e)
                },
                onUploadProgress: function(e) {
                    return _this2._onUploadProgress(e)
                }
            })
        }
    }, {
        key: "_getFileUploaderController",
        value: function() {
            var _this3 = this;
            var uploadDirectory = this._uploadDirectoryInfo && this._uploadDirectoryInfo.fileItem;
            return {
                chunkSize: this._controller.getFileUploadChunkSize(),
                uploadFileChunk: function(fileData, chunksInfo) {
                    return _this3._controller.uploadFileChunk(fileData, chunksInfo, uploadDirectory)
                },
                abortFileUpload: function(fileData, chunksInfo) {
                    return _this3._controller.abortFileUpload(fileData, chunksInfo, uploadDirectory)
                }
            }
        }
    }, {
        key: "_createMetadataMap",
        value: function() {
            var _this4 = this;
            this._metadataMap = {
                create: {
                    action: function(arg) {
                        return _this4._tryCreate(arg)
                    },
                    affectsAllItems: true,
                    singleItemProcessingMessage: _message2.default.format("dxFileManager-editingCreateSingleItemProcessingMessage"),
                    singleItemSuccessMessage: _message2.default.format("dxFileManager-editingCreateSingleItemSuccessMessage"),
                    singleItemErrorMessage: _message2.default.format("dxFileManager-editingCreateSingleItemErrorMessage"),
                    commonErrorMessage: _message2.default.format("dxFileManager-editingCreateCommonErrorMessage")
                },
                rename: {
                    action: function(arg) {
                        return _this4._tryRename(arg)
                    },
                    singleItemProcessingMessage: _message2.default.format("dxFileManager-editingRenameSingleItemProcessingMessage"),
                    singleItemSuccessMessage: _message2.default.format("dxFileManager-editingRenameSingleItemSuccessMessage"),
                    singleItemErrorMessage: _message2.default.format("dxFileManager-editingRenameSingleItemErrorMessage"),
                    commonErrorMessage: _message2.default.format("dxFileManager-editingRenameCommonErrorMessage")
                },
                "delete": {
                    action: function(arg) {
                        return _this4._tryDelete(arg)
                    },
                    singleItemProcessingMessage: _message2.default.format("dxFileManager-editingDeleteSingleItemProcessingMessage"),
                    multipleItemsProcessingMessage: _message2.default.format("dxFileManager-editingDeleteMultipleItemsProcessingMessage"),
                    singleItemSuccessMessage: _message2.default.format("dxFileManager-editingDeleteSingleItemSuccessMessage"),
                    multipleItemsSuccessMessage: _message2.default.format("dxFileManager-editingDeleteMultipleItemsSuccessMessage"),
                    singleItemErrorMessage: _message2.default.format("dxFileManager-editingDeleteSingleItemErrorMessage"),
                    multipleItemsErrorMessage: _message2.default.format("dxFileManager-editingDeleteMultipleItemsErrorMessage"),
                    commonErrorMessage: _message2.default.format("dxFileManager-editingDeleteCommonErrorMessage")
                },
                move: {
                    action: function(arg) {
                        return _this4._tryMove(arg)
                    },
                    singleItemProcessingMessage: _message2.default.format("dxFileManager-editingMoveSingleItemProcessingMessage"),
                    multipleItemsProcessingMessage: _message2.default.format("dxFileManager-editingMoveMultipleItemsProcessingMessage"),
                    singleItemSuccessMessage: _message2.default.format("dxFileManager-editingMoveSingleItemSuccessMessage"),
                    multipleItemsSuccessMessage: _message2.default.format("dxFileManager-editingMoveMultipleItemsSuccessMessage"),
                    singleItemErrorMessage: _message2.default.format("dxFileManager-editingMoveSingleItemErrorMessage"),
                    multipleItemsErrorMessage: _message2.default.format("dxFileManager-editingMoveMultipleItemsErrorMessage"),
                    commonErrorMessage: _message2.default.format("dxFileManager-editingMoveCommonErrorMessage")
                },
                copy: {
                    action: function(arg) {
                        return _this4._tryCopy(arg)
                    },
                    singleItemProcessingMessage: _message2.default.format("dxFileManager-editingCopySingleItemProcessingMessage"),
                    multipleItemsProcessingMessage: _message2.default.format("dxFileManager-editingCopyMultipleItemsProcessingMessage"),
                    singleItemSuccessMessage: _message2.default.format("dxFileManager-editingCopySingleItemSuccessMessage"),
                    multipleItemsSuccessMessage: _message2.default.format("dxFileManager-editingCopyMultipleItemsSuccessMessage"),
                    singleItemErrorMessage: _message2.default.format("dxFileManager-editingCopySingleItemErrorMessage"),
                    multipleItemsErrorMessage: _message2.default.format("dxFileManager-editingCopyMultipleItemsErrorMessage"),
                    commonErrorMessage: _message2.default.format("dxFileManager-editingCopyCommonErrorMessage")
                },
                upload: {
                    action: function(arg) {
                        return _this4._tryUpload(arg)
                    },
                    allowCancel: true,
                    allowItemProgress: true,
                    singleItemProcessingMessage: _message2.default.format("dxFileManager-editingUploadSingleItemProcessingMessage"),
                    multipleItemsProcessingMessage: _message2.default.format("dxFileManager-editingUploadMultipleItemsProcessingMessage"),
                    singleItemSuccessMessage: _message2.default.format("dxFileManager-editingUploadSingleItemSuccessMessage"),
                    multipleItemsSuccessMessage: _message2.default.format("dxFileManager-editingUploadMultipleItemsSuccessMessage"),
                    singleItemErrorMessage: _message2.default.format("dxFileManager-editingUploadSingleItemErrorMessage"),
                    multipleItemsErrorMessage: _message2.default.format("dxFileManager-editingUploadMultipleItemsErrorMessage"),
                    canceledMessage: _message2.default.format("dxFileManager-editingUploadCanceledMessage")
                },
                download: {
                    action: function(arg) {
                        return _this4._download(arg)
                    }
                },
                getItemContent: {
                    action: function(arg) {
                        return _this4._getItemContent(arg)
                    }
                }
            }
        }
    }, {
        key: "getCommandActions",
        value: function() {
            var _this5 = this;
            var result = {};
            (0, _iterator.each)(this._metadataMap, function(name) {
                if (Object.prototype.hasOwnProperty.call(_this5._metadataMap, name)) {
                    result[name] = function(arg) {
                        return _this5._executeAction(name, arg)
                    }
                }
            });
            return result
        }
    }, {
        key: "_executeAction",
        value: function(actionName, arg) {
            var actionMetadata = this._metadataMap[actionName];
            return actionMetadata ? actionMetadata.action(arg) : null
        }
    }, {
        key: "_onCancelUploadSession",
        value: function(info) {
            this._fileUploader.cancelUpload(info.uploadSessionId)
        }
    }, {
        key: "_onCancelFileUpload",
        value: function(item, itemIndex) {
            this._fileUploader.cancelFileUpload(item.info.uploadSessionId, itemIndex)
        }
    }, {
        key: "_onUploadProgress",
        value: function(_ref3) {
            var sessionId = _ref3.sessionId,
                fileIndex = _ref3.fileIndex,
                commonValue = _ref3.commonValue,
                fileValue = _ref3.fileValue;
            var operationInfo = this._uploadOperationInfoMap[sessionId];
            this._notificationControl.updateOperationItemProgress(operationInfo, fileIndex, 100 * fileValue, 100 * commonValue)
        }
    }, {
        key: "_onUploadSessionStarted",
        value: function(_ref4) {
            var sessionInfo = _ref4.sessionInfo;
            this._controller.processUploadSession(sessionInfo, this._uploadDirectoryInfo)
        }
    }, {
        key: "_onEditActionStarting",
        value: function(actionInfo) {
            var actionMetadata = this._metadataMap[actionInfo.name];
            var context = new FileManagerActionContext(actionMetadata, actionInfo.itemInfos, actionInfo.directory);
            var operationInfo = this._notificationControl.addOperation(context.processingMessage, actionMetadata.allowCancel, !actionMetadata.allowItemProgress);
            (0, _extend.extend)(actionInfo.customData, {
                context: context,
                operationInfo: operationInfo
            });
            if ("upload" === actionInfo.name) {
                var sessionId = actionInfo.customData.sessionInfo.sessionId;
                operationInfo.uploadSessionId = sessionId;
                this._uploadOperationInfoMap[sessionId] = operationInfo
            }
        }
    }, {
        key: "_onEditActionResultAcquired",
        value: function(actionInfo) {
            var _this6 = this;
            var _actionInfo$customDat = actionInfo.customData,
                context = _actionInfo$customDat.context,
                operationInfo = _actionInfo$customDat.operationInfo;
            context.singleRequest = actionInfo.singleRequest;
            if (!context.singleRequest) {
                var details = context.itemInfos.map(function(itemInfo) {
                    return _this6._getItemProgressDisplayInfo(itemInfo)
                });
                this._notificationControl.addOperationDetails(operationInfo, details, context.actionMetadata.allowCancel)
            }
        }
    }, {
        key: "_onEditActionError",
        value: function(actionInfo, error) {
            var _actionInfo$customDat2 = actionInfo.customData,
                context = _actionInfo$customDat2.context,
                operationInfo = _actionInfo$customDat2.operationInfo;
            context.singleRequest = actionInfo.singleRequest;
            this._handleActionError(operationInfo, context, error);
            this._completeAction(operationInfo, context)
        }
    }, {
        key: "_onEditActionItemError",
        value: function(actionInfo, info) {
            var _actionInfo$customDat3 = actionInfo.customData,
                context = _actionInfo$customDat3.context,
                operationInfo = _actionInfo$customDat3.operationInfo;
            this._handleActionError(operationInfo, context, info)
        }
    }, {
        key: "_onCompleteEditActionItem",
        value: function(actionInfo, info) {
            var _actionInfo$customDat4 = actionInfo.customData,
                context = _actionInfo$customDat4.context,
                operationInfo = _actionInfo$customDat4.operationInfo;
            if (!info.result || !info.result.canceled) {
                context.completeOperationItem(info.index);
                if (!context.singleRequest) {
                    this._notificationControl.completeOperationItem(operationInfo, info.index, context.commonProgress)
                }
            }
        }
    }, {
        key: "_onCompleteEditAction",
        value: function(actionInfo) {
            var _actionInfo$customDat5 = actionInfo.customData,
                context = _actionInfo$customDat5.context,
                operationInfo = _actionInfo$customDat5.operationInfo;
            this._completeAction(operationInfo, context);
            if ("upload" === actionInfo.name) {
                delete this._uploadOperationInfoMap[actionInfo.customData.sessionInfo.sessionId]
            }
        }
    }, {
        key: "_tryCreate",
        value: function(parentDirectories) {
            var _this7 = this;
            var parentDirectoryInfo = parentDirectories && parentDirectories[0] || this._getCurrentDirectory();
            var newDirName = _message2.default.format("dxFileManager-newDirectoryName");
            return this._showDialog(this._dialogManager.getCreateItemDialog(), newDirName).then(function(_ref5) {
                var name = _ref5.name;
                return _this7._controller.createDirectory(parentDirectoryInfo, name)
            })
        }
    }, {
        key: "_tryRename",
        value: function(itemInfos) {
            var _this8 = this;
            var itemInfo = itemInfos && itemInfos[0] || this._model.getMultipleSelectedItems()[0];
            return this._showDialog(this._dialogManager.getRenameItemDialog(), itemInfo.fileItem.name).then(function(_ref6) {
                var name = _ref6.name;
                return _this8._controller.renameItem(itemInfo, name)
            })
        }
    }, {
        key: "_tryDelete",
        value: function(itemInfos) {
            var _this9 = this;
            itemInfos = itemInfos || this._model.getMultipleSelectedItems();
            return this._showDialog(this._dialogManager.getConfirmationDialog()).then(function() {
                return _this9._controller.deleteItems(itemInfos)
            })
        }
    }, {
        key: "_tryMove",
        value: function(itemInfos) {
            var _this10 = this;
            itemInfos = itemInfos || this._model.getMultipleSelectedItems();
            return this._showDialog(this._dialogManager.getMoveDialog()).then(function(_ref7) {
                var folder = _ref7.folder;
                return _this10._controller.moveItems(itemInfos, folder)
            })
        }
    }, {
        key: "_tryCopy",
        value: function(itemInfos) {
            var _this11 = this;
            itemInfos = itemInfos || this._model.getMultipleSelectedItems();
            return this._showDialog(this._dialogManager.getCopyDialog()).then(function(_ref8) {
                var folder = _ref8.folder;
                return _this11._controller.copyItems(itemInfos, folder)
            })
        }
    }, {
        key: "_tryUpload",
        value: function(destinationFolder) {
            this._uploadDirectoryInfo = destinationFolder && destinationFolder[0] || this._getCurrentDirectory();
            this._fileUploader.tryUpload()
        }
    }, {
        key: "_download",
        value: function(itemInfos) {
            itemInfos = itemInfos || this._model.getMultipleSelectedItems();
            return this._controller.downloadItems(itemInfos)
        }
    }, {
        key: "_getItemContent",
        value: function(itemInfos) {
            itemInfos = itemInfos || this._model.getMultipleSelectedItems();
            return this._controller.getItemContent(itemInfos)
        }
    }, {
        key: "_completeAction",
        value: function(operationInfo, context) {
            this._notificationControl.completeOperation(operationInfo, context.completionMessage, !context.success, context.statusText);
            if (context.hasModifiedItems()) {
                this._raiseOnSuccess(context.onlyFiles)
            }
        }
    }, {
        key: "_handleActionError",
        value: function(operationInfo, context, errorInfo) {
            operationInfo.hasError = true;
            if (context.singleRequest) {
                this._handleSingleRequestActionError(operationInfo, context, errorInfo)
            } else {
                this._handleMultipleRequestActionError(operationInfo, context, errorInfo)
            }
        }
    }, {
        key: "_handleSingleRequestActionError",
        value: function(operationInfo, context, errorInfo) {
            var itemInfo = context.getItemForSingleRequestError();
            var errorText = this._getErrorText(errorInfo, itemInfo);
            context.processSingleRequestError(errorText);
            var operationErrorInfo = this._getOperationErrorInfo(context);
            this._notificationControl.completeSingleOperationWithError(operationInfo, operationErrorInfo);
            if (context.multipleItems) {
                this._raiseOnSuccess(context.onlyFiles)
            }
        }
    }, {
        key: "_handleMultipleRequestActionError",
        value: function(operationInfo, context, errorInfo) {
            var itemInfo = context.getItemForMultipleRequestError(errorInfo.index);
            var errorText = this._getErrorText(errorInfo, itemInfo);
            context.processMultipleRequestError(errorInfo.index, errorText);
            var operationErrorInfo = this._getOperationErrorInfo(context);
            this._notificationControl.addOperationDetailsError(operationInfo, operationErrorInfo)
        }
    }, {
        key: "_getOperationErrorInfo",
        value: function(context) {
            var detailError = context.errorState.currentDetailError;
            return {
                commonErrorText: context.errorState.commonErrorText,
                item: detailError.itemInfo ? this._getItemProgressDisplayInfo(detailError.itemInfo) : null,
                itemIndex: detailError.itemIndex,
                detailErrorText: detailError.errorText
            }
        }
    }, {
        key: "_getErrorText",
        value: function(errorInfo, itemInfo) {
            var itemName = itemInfo ? itemInfo.fileItem.name : null;
            var errorText = _uiFile_manager5.FileManagerMessages.get(errorInfo.errorId, itemName);
            var errorArgs = {
                fileSystemItem: itemInfo ? itemInfo.fileItem : null,
                errorCode: errorInfo.errorId,
                errorText: errorText
            };
            this._raiseOnError(errorArgs);
            return errorArgs.errorText
        }
    }, {
        key: "_getItemProgressDisplayInfo",
        value: function(itemInfo) {
            return {
                commonText: itemInfo.fileItem.name,
                imageUrl: this._getItemThumbnail(itemInfo)
            }
        }
    }, {
        key: "_showDialog",
        value: function(dialog, dialogArgument) {
            this._dialogDeferred = new _deferred.Deferred;
            dialog.show(dialogArgument);
            return this._dialogDeferred.promise()
        }
    }, {
        key: "_onDialogClosed",
        value: function(e) {
            var result = e.dialogResult;
            if (result) {
                this._dialogDeferred.resolve(result)
            } else {
                this._dialogDeferred.reject()
            }
        }
    }, {
        key: "_getItemThumbnail",
        value: function(item) {
            var itemThumbnailGetter = this.option("getItemThumbnail");
            if (!itemThumbnailGetter) {
                return null
            }
            var info = itemThumbnailGetter(item);
            return info ? info.thumbnail : null
        }
    }, {
        key: "_initActions",
        value: function() {
            this._actions = {
                onSuccess: this._createActionByOption("onSuccess"),
                onError: this._createActionByOption("onError"),
                onCreating: this._createActionByOption("onCreating")
            }
        }
    }, {
        key: "_getDefaultOptions",
        value: function() {
            return (0, _extend.extend)(_get(_getPrototypeOf(FileManagerEditingControl.prototype), "_getDefaultOptions", this).call(this), {
                model: {
                    getMultipleSelectedItems: null
                },
                notificationControl: null,
                getItemThumbnail: null,
                onSuccess: null,
                onError: null,
                onCreating: null
            })
        }
    }, {
        key: "_optionChanged",
        value: function(args) {
            var name = args.name;
            switch (name) {
                case "model":
                    this.repaint();
                    break;
                case "notificationControl":
                    this._initNotificationControl(args.value);
                    break;
                case "getItemThumbnail":
                    break;
                case "onSuccess":
                case "onError":
                case "onCreating":
                    this._actions[name] = this._createActionByOption(name);
                    break;
                default:
                    _get(_getPrototypeOf(FileManagerEditingControl.prototype), "_optionChanged", this).call(this, args)
            }
        }
    }, {
        key: "_raiseOnSuccess",
        value: function(updatedOnlyFiles) {
            this._actions.onSuccess({
                updatedOnlyFiles: updatedOnlyFiles
            })
        }
    }, {
        key: "_raiseOnError",
        value: function(args) {
            this._actions.onError(args)
        }
    }, {
        key: "_getCurrentDirectory",
        value: function() {
            return this._controller.getCurrentDirectory()
        }
    }]);
    return FileManagerEditingControl
}(_ui2.default);
var FileManagerActionContext = function() {
    function FileManagerActionContext(actionMetadata, itemInfos, directoryInfo) {
        _classCallCheck(this, FileManagerActionContext);
        this._actionMetadata = actionMetadata;
        this._itemInfos = itemInfos;
        this._onlyFiles = !this._actionMetadata.affectsAllItems && this._itemInfos.every(function(info) {
            return !info.fileItem.isDirectory
        });
        this._items = this._itemInfos.map(function(itemInfo) {
            return itemInfo.fileItem
        });
        this._multipleItems = this._items.length > 1;
        this._location = directoryInfo.getDisplayName();
        this._singleRequest = true;
        this._completedItems = [];
        this._commonProgress = 0;
        this._errorState = {
            failedCount: 0
        }
    }
    _createClass(FileManagerActionContext, [{
        key: "completeOperationItem",
        value: function(itemIndex) {
            if (this._singleRequest) {
                this._completedItems = _toConsumableArray(this._items)
            } else {
                var item = this._items[itemIndex];
                this._completedItems.push(item)
            }
            if (!this._actionMetadata.allowItemProgress) {
                this._commonProgress = this._completedItems.length / this._items.length * 100
            }
        }
    }, {
        key: "processSingleRequestError",
        value: function(errorText) {
            this._errorState.failedCount = 1;
            this._errorState.commonErrorText = this._multipleItems ? this._actionMetadata.commonErrorMessage : this._actionMetadata.singleItemErrorMessage;
            var itemIndex = this._multipleItems ? -1 : 1;
            var itemInfo = this.getItemForSingleRequestError();
            this._setCurrentDetailError(itemIndex, itemInfo, errorText)
        }
    }, {
        key: "processMultipleRequestError",
        value: function(itemIndex, errorText) {
            this._errorState.failedCount++;
            this._errorState.commonErrorText = this._errorState.failedCount > 1 ? (0, _string.format)(this._actionMetadata.multipleItemsErrorMessage, this._errorState.failedCount) : this._actionMetadata.singleItemErrorMessage;
            var itemInfo = this.getItemForMultipleRequestError(itemIndex);
            this._setCurrentDetailError(itemIndex, itemInfo, errorText)
        }
    }, {
        key: "hasModifiedItems",
        value: function() {
            return this._hasCompletedItems() || this._singleRequest && !this.success && this._multipleItems
        }
    }, {
        key: "getItemForSingleRequestError",
        value: function() {
            return this._multipleItems ? null : this._itemInfos[0]
        }
    }, {
        key: "getItemForMultipleRequestError",
        value: function(itemIndex) {
            return this._itemInfos[itemIndex]
        }
    }, {
        key: "_setCurrentDetailError",
        value: function(itemIndex, itemInfo, errorText) {
            this._errorState.currentDetailError = {
                itemIndex: itemIndex,
                itemInfo: itemInfo,
                errorText: errorText
            }
        }
    }, {
        key: "_hasCompletedItems",
        value: function() {
            return this._completedItems.length > 0
        }
    }, {
        key: "actionMetadata",
        get: function() {
            return this._actionMetadata
        }
    }, {
        key: "itemInfos",
        get: function() {
            return this._itemInfos
        }
    }, {
        key: "errorState",
        get: function() {
            return this._errorState
        }
    }, {
        key: "singleRequest",
        get: function() {
            return this._singleRequest
        },
        set: function(value) {
            this._singleRequest = value
        }
    }, {
        key: "multipleItems",
        get: function() {
            return this._multipleItems
        }
    }, {
        key: "onlyFiles",
        get: function() {
            return this._onlyFiles
        }
    }, {
        key: "processingMessage",
        get: function() {
            return this._multipleItems ? (0, _string.format)(this._actionMetadata.multipleItemsProcessingMessage, this._items.length, this._location) : (0, _string.format)(this._actionMetadata.singleItemProcessingMessage, this._location)
        }
    }, {
        key: "successMessage",
        get: function() {
            if (this._hasCompletedItems()) {
                return this._multipleItems ? (0, _string.format)(this._actionMetadata.multipleItemsSuccessMessage, this._completedItems.length, this._location) : (0, _string.format)(this._actionMetadata.singleItemSuccessMessage, this._location)
            } else {
                return this._multipleItems ? (0, _string.format)(this._actionMetadata.multipleItemsErrorMessage, this._items.length) : this._actionMetadata.singleItemErrorMessage
            }
        }
    }, {
        key: "completionMessage",
        get: function() {
            return this.success ? this.successMessage : this.errorState.commonErrorText
        }
    }, {
        key: "statusText",
        get: function() {
            return this.success && !this._hasCompletedItems() ? this._actionMetadata.canceledMessage : void 0
        }
    }, {
        key: "commonProgress",
        get: function() {
            return this._commonProgress
        }
    }, {
        key: "success",
        get: function() {
            return !this._errorState.failedCount
        }
    }]);
    return FileManagerActionContext
}();
module.exports = FileManagerEditingControl;
