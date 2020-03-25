/**
 * DevExtreme (ui/file_manager/ui.file_manager.notification.progress_panel.js)
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
var _common = require("../../core/utils/common");
var _icon = require("../../core/utils/icon");
var _message = require("../../localization/message");
var _message2 = _interopRequireDefault(_message);
var _ui = require("../widget/ui.widget");
var _ui2 = _interopRequireDefault(_ui);
var _progress_bar = require("../progress_bar");
var _progress_bar2 = _interopRequireDefault(_progress_bar);
var _button = require("../button");
var _button2 = _interopRequireDefault(_button);
var _ui3 = require("../scroll_view/ui.scroll_view");
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
var FILE_MANAGER_PROGRESS_PANEL_CLASS = "dx-filemanager-progress-panel";
var FILE_MANAGER_PROGRESS_PANEL_CONTAINER_CLASS = "".concat(FILE_MANAGER_PROGRESS_PANEL_CLASS, "-container");
var FILE_MANAGER_PROGRESS_PANEL_TITLE_CLASS = "".concat(FILE_MANAGER_PROGRESS_PANEL_CLASS, "-title");
var FILE_MANAGER_PROGRESS_PANEL_TITLE_TEXT_CLASS = "".concat(FILE_MANAGER_PROGRESS_PANEL_CLASS, "-title-text");
var FILE_MANAGER_PROGRESS_PANEL_CLOSE_BUTTON_CLASS = "".concat(FILE_MANAGER_PROGRESS_PANEL_CLASS, "-close-button");
var FILE_MANAGER_PROGRESS_PANEL_INFOS_CONTAINER_CLASS = "".concat(FILE_MANAGER_PROGRESS_PANEL_CLASS, "-infos-container");
var FILE_MANAGER_PROGRESS_PANEL_SEPARATOR_CLASS = "".concat(FILE_MANAGER_PROGRESS_PANEL_CLASS, "-separator");
var FILE_MANAGER_PROGRESS_PANEL_INFO_CLASS = "".concat(FILE_MANAGER_PROGRESS_PANEL_CLASS, "-info");
var FILE_MANAGER_PROGRESS_PANEL_COMMON_CLASS = "".concat(FILE_MANAGER_PROGRESS_PANEL_CLASS, "-common");
var FILE_MANAGER_PROGRESS_PANEL_INFO_WITH_DETAILS_CLASS = "".concat(FILE_MANAGER_PROGRESS_PANEL_CLASS, "-info-with-details");
var FILE_MANAGER_PROGRESS_PANEL_DETAILS_CLASS = "".concat(FILE_MANAGER_PROGRESS_PANEL_CLASS, "-details");
var FILE_MANAGER_PROGRESS_BOX_CLASS = "dx-filemanager-progress-box";
var FILE_MANAGER_PROGRESS_BOX_ERROR_CLASS = "".concat(FILE_MANAGER_PROGRESS_BOX_CLASS, "-error");
var FILE_MANAGER_PROGRESS_BOX_WITHOUT_CLOSE_BUTTON_CLASS = "".concat(FILE_MANAGER_PROGRESS_BOX_CLASS, "-without-close-button");
var FILE_MANAGER_PROGRESS_BOX_IMAGE_CLASS = "".concat(FILE_MANAGER_PROGRESS_BOX_CLASS, "-image");
var FILE_MANAGER_PROGRESS_BOX_WRAPPER_CLASS = "".concat(FILE_MANAGER_PROGRESS_BOX_CLASS, "-wrapper");
var FILE_MANAGER_PROGRESS_BOX_COMMON_CLASS = "".concat(FILE_MANAGER_PROGRESS_BOX_CLASS, "-common");
var FILE_MANAGER_PROGRESS_BOX_PROGRESS_BAR_CLASS = "".concat(FILE_MANAGER_PROGRESS_BOX_CLASS, "-progress-bar");
var FILE_MANAGER_PROGRESS_BOX_CLOSE_BUTTON_CLASS = "".concat(FILE_MANAGER_PROGRESS_BOX_CLASS, "-close-button");
var DX_CARD_CLASS = "dx-card";
var FileManagerProgressPanel = function(_Widget) {
    _inherits(FileManagerProgressPanel, _Widget);
    var _super = _createSuper(FileManagerProgressPanel);

    function FileManagerProgressPanel() {
        _classCallCheck(this, FileManagerProgressPanel);
        return _super.apply(this, arguments)
    }
    _createClass(FileManagerProgressPanel, [{
        key: "_initMarkup",
        value: function() {
            var _this = this;
            _get(_getPrototypeOf(FileManagerProgressPanel.prototype), "_initMarkup", this).call(this);
            this._initActions();
            this._operationCount = 0;
            this.$element().addClass(FILE_MANAGER_PROGRESS_PANEL_CLASS);
            var $scrollView = (0, _renderer2.default)("<div>").appendTo(this.$element());
            var $container = (0, _renderer2.default)("<div>").addClass(FILE_MANAGER_PROGRESS_PANEL_CONTAINER_CLASS).appendTo($scrollView);
            this._scrollView = this._createComponent($scrollView, _ui4.default, {
                scrollByContent: true,
                scrollByThumb: true,
                showScrollbar: "onScroll"
            });
            var $title = (0, _renderer2.default)("<div>").addClass(FILE_MANAGER_PROGRESS_PANEL_TITLE_CLASS).appendTo($container);
            (0, _renderer2.default)("<div>").text(_message2.default.format("dxFileManager-notificationProgressPanelTitle")).addClass(FILE_MANAGER_PROGRESS_PANEL_TITLE_TEXT_CLASS).appendTo($title);
            var $closeButton = (0, _renderer2.default)("<div>").addClass(FILE_MANAGER_PROGRESS_PANEL_CLOSE_BUTTON_CLASS).appendTo($title);
            this._createComponent($closeButton, _button2.default, {
                icon: "close",
                stylingMode: "text",
                onClick: function() {
                    return _this._raisePanelClosed()
                }
            });
            this._$infosContainer = (0, _renderer2.default)("<div>").text(_message2.default.format("dxFileManager-notificationProgressPanelEmptyListText")).addClass(FILE_MANAGER_PROGRESS_PANEL_INFOS_CONTAINER_CLASS).appendTo($container)
        }
    }, {
        key: "_getDefaultOptions",
        value: function() {
            return (0, _extend.extend)(_get(_getPrototypeOf(FileManagerProgressPanel.prototype), "_getDefaultOptions", this).call(this), {
                onOperationClosed: null,
                onOperationCanceled: null,
                onOperationItemCanceled: null,
                onPanelClosed: null
            })
        }
    }, {
        key: "_initActions",
        value: function() {
            this._actions = {
                onOperationClosed: this._createActionByOption("onOperationClosed"),
                onOperationCanceled: this._createActionByOption("onOperationCanceled"),
                onOperationItemCanceled: this._createActionByOption("onOperationItemCanceled"),
                onPanelClosed: this._createActionByOption("onPanelClosed")
            }
        }
    }, {
        key: "_optionChanged",
        value: function(args) {
            var name = args.name;
            switch (name) {
                case "test":
                    break;
                case "onOperationClosed":
                case "onOperationCanceled":
                case "onOperationItemCanceled":
                    this._actions[name] = this._createActionByOption(name);
                    break;
                default:
                    _get(_getPrototypeOf(FileManagerProgressPanel.prototype), "_optionChanged", this).call(this, args)
            }
        }
    }, {
        key: "addOperation",
        value: function(commonText, showCloseButtonAlways, allowProgressAutoUpdate) {
            var _this2 = this;
            if (this._operationCount) {
                (0, _renderer2.default)("<div>").addClass(FILE_MANAGER_PROGRESS_PANEL_SEPARATOR_CLASS).prependTo(this._$infosContainer)
            } else {
                this._$infosContainer.empty()
            }
            this._operationCount++;
            var info = {
                customCloseHandling: showCloseButtonAlways,
                allowProgressAutoUpdate: (0, _common.ensureDefined)(allowProgressAutoUpdate, true)
            };
            var $info = (0, _renderer2.default)("<div>").addClass(FILE_MANAGER_PROGRESS_PANEL_INFO_CLASS).prependTo(this._$infosContainer);
            info.$info = $info;
            var $common = (0, _renderer2.default)("<div>").addClass(FILE_MANAGER_PROGRESS_PANEL_COMMON_CLASS).appendTo($info);
            info.common = this._createProgressBox($common, {
                commonText: commonText,
                showCloseButton: true,
                showCloseButtonAlways: showCloseButtonAlways,
                onCloseButtonClick: function() {
                    return _this2._closeOperation(info)
                }
            });
            return info
        }
    }, {
        key: "addOperationDetails",
        value: function(info, details, showCloseButton) {
            var _this3 = this;
            info.$info.addClass(FILE_MANAGER_PROGRESS_PANEL_INFO_WITH_DETAILS_CLASS);
            var $details = (0, _renderer2.default)("<div>").addClass(FILE_MANAGER_PROGRESS_PANEL_DETAILS_CLASS).appendTo(info.$info);
            info.details = details.map(function(itemInfo, index) {
                itemInfo.info = info;
                return _this3._createDetailsItem($details, itemInfo, index, false, showCloseButton)
            })
        }
    }, {
        key: "_createDetailsItem",
        value: function($container, item, itemIndex, skipProgressBox, showCloseButton) {
            var _this4 = this;
            var $detailsItem = (0, _renderer2.default)("<div>").appendTo($container);
            if (itemIndex !== -1) {
                $detailsItem.addClass(DX_CARD_CLASS)
            }
            return this._createProgressBox($detailsItem, {
                commonText: item.commonText,
                imageUrl: item.imageUrl,
                skipProgressBox: skipProgressBox,
                showCloseButton: showCloseButton,
                showCloseButtonAlways: showCloseButton,
                onCloseButtonClick: function() {
                    return _this4._cancelOperationItem(item, itemIndex)
                }
            })
        }
    }, {
        key: "completeOperationItem",
        value: function(operationInfo, itemIndex, commonProgress) {
            if (operationInfo.allowProgressAutoUpdate) {
                this.updateOperationItemProgress(operationInfo, itemIndex, 100, commonProgress)
            }
            this._setCloseButtonVisible(operationInfo.details[itemIndex], false)
        }
    }, {
        key: "updateOperationItemProgress",
        value: function(operationInfo, itemIndex, itemProgress, commonProgress) {
            operationInfo.common.progressBar.option("value", commonProgress);
            if (operationInfo.details) {
                var detailsItem = operationInfo.details[itemIndex];
                detailsItem.progressBar.option("value", itemProgress)
            }
        }
    }, {
        key: "completeOperation",
        value: function(info, commonText, isError, statusText) {
            info.completed = true;
            info.common.$commonText.text(commonText);
            if (isError) {
                this._removeProgressBar(info.common)
            } else {
                if (info.allowProgressAutoUpdate) {
                    info.common.progressBar.option("value", 100)
                }
            }
            if (statusText) {
                this._setProgressBarText(info.common, statusText)
            }
            this._setCloseButtonVisible(info.common, true)
        }
    }, {
        key: "completeSingleOperationWithError",
        value: function(info, errorText) {
            info.completed = true;
            this._renderOperationError(info.common, errorText);
            this._setCloseButtonVisible(info.common, true)
        }
    }, {
        key: "addOperationDetailsError",
        value: function(info, index, errorText) {
            var detailsItem = info.details[index];
            this._renderOperationError(detailsItem, errorText);
            this._setCloseButtonVisible(detailsItem, false)
        }
    }, {
        key: "renderError",
        value: function($container, $target, errorText) {
            (0, _renderer2.default)("<div>").text(errorText).addClass(FILE_MANAGER_PROGRESS_BOX_ERROR_CLASS).appendTo($container)
        }
    }, {
        key: "createErrorDetailsProgressBox",
        value: function($container, item, errorText) {
            var detailsItem = this._createDetailsItem($container, item, -1, true);
            this._renderOperationError(detailsItem, errorText)
        }
    }, {
        key: "_renderOperationError",
        value: function(info, errorText) {
            this._removeProgressBar(info);
            this.renderError(info.$wrapper, info.$commonText, errorText)
        }
    }, {
        key: "_removeProgressBar",
        value: function(progressBox) {
            if (progressBox.progressBar) {
                progressBox.progressBar.dispose();
                progressBox.progressBar.$element().remove();
                progressBox.progressBar = null
            }
        }
    }, {
        key: "_createProgressBox",
        value: function($container, options) {
            var _this5 = this;
            $container.addClass(FILE_MANAGER_PROGRESS_BOX_CLASS);
            if (!options.showCloseButtonAlways) {
                $container.addClass(FILE_MANAGER_PROGRESS_BOX_WITHOUT_CLOSE_BUTTON_CLASS)
            }
            if (options.imageUrl) {
                (0, _icon.getImageContainer)(options.imageUrl).addClass(FILE_MANAGER_PROGRESS_BOX_IMAGE_CLASS).appendTo($container)
            }
            var $wrapper = (0, _renderer2.default)("<div>").addClass(FILE_MANAGER_PROGRESS_BOX_WRAPPER_CLASS).appendTo($container);
            var $commonText = (0, _renderer2.default)("<div>").addClass(FILE_MANAGER_PROGRESS_BOX_COMMON_CLASS).text(options.commonText).appendTo($wrapper);
            var progressBar = null;
            if (!options.skipProgressBox) {
                var $progressBar = (0, _renderer2.default)("<div>").addClass(FILE_MANAGER_PROGRESS_BOX_PROGRESS_BAR_CLASS).appendTo($wrapper);
                progressBar = this._createComponent($progressBar, _progress_bar2.default, {
                    min: 0,
                    max: 100,
                    width: "100%",
                    validationMessageMode: "always",
                    statusFormat: function(ratio, value) {
                        return _this5._getStatusString(ratio, value)
                    }
                })
            }
            var closeButton = null;
            if (options.showCloseButton) {
                var $button = (0, _renderer2.default)("<div>").addClass(FILE_MANAGER_PROGRESS_BOX_CLOSE_BUTTON_CLASS).appendTo($container);
                closeButton = this._createComponent($button, _button2.default, {
                    icon: "dx-filemanager-i dx-filemanager-i-cancel",
                    stylingMode: "text",
                    visible: options.showCloseButtonAlways,
                    onClick: options.onCloseButtonClick
                })
            }
            return {
                $commonText: $commonText,
                progressBar: progressBar,
                $element: $container,
                $wrapper: $wrapper,
                closeButton: closeButton
            }
        }
    }, {
        key: "_setCloseButtonVisible",
        value: function(progressBox, visible) {
            if (progressBox.closeButton) {
                progressBox.$element.toggleClass(FILE_MANAGER_PROGRESS_BOX_WITHOUT_CLOSE_BUTTON_CLASS, !visible);
                progressBox.closeButton.option("visible", visible)
            }
        }
    }, {
        key: "_setProgressBarText",
        value: function(progressBox, text) {
            progressBox.progressBar.option("statusFormat", function() {
                return text
            })
        }
    }, {
        key: "_closeOperation",
        value: function(info) {
            var _this6 = this;
            if (info.customCloseHandling && !info.completed) {
                this._raiseOperationCanceled(info);
                this._setCloseButtonVisible(info.common, false);
                info.details.forEach(function(item) {
                    return _this6._displayClosedOperationItem(item)
                })
            } else {
                this._raiseOperationClosed(info);
                info.$info.next(".".concat(FILE_MANAGER_PROGRESS_PANEL_SEPARATOR_CLASS)).remove();
                info.$info.remove()
            }
        }
    }, {
        key: "_cancelOperationItem",
        value: function(item, itemIndex) {
            this._raiseOperationItemCanceled(item, itemIndex);
            var itemInfo = item.info.details[itemIndex];
            this._displayClosedOperationItem(itemInfo)
        }
    }, {
        key: "_displayClosedOperationItem",
        value: function(itemInfo) {
            this._setProgressBarText(itemInfo, _message2.default.format("dxFileManager-notificationProgressPanelOperationCanceled"));
            this._setCloseButtonVisible(itemInfo, false)
        }
    }, {
        key: "_getStatusString",
        value: function(ratio, value) {
            return 1 === ratio ? _message2.default.format("Done") : Math.round(100 * ratio) + "%"
        }
    }, {
        key: "_raiseOperationClosed",
        value: function(info) {
            this._actions.onOperationClosed({
                info: info
            })
        }
    }, {
        key: "_raiseOperationCanceled",
        value: function(info) {
            this._actions.onOperationCanceled({
                info: info
            })
        }
    }, {
        key: "_raiseOperationItemCanceled",
        value: function(item, itemIndex) {
            this._actions.onOperationItemCanceled({
                item: item,
                itemIndex: itemIndex
            })
        }
    }, {
        key: "_raisePanelClosed",
        value: function() {
            this._actions.onPanelClosed()
        }
    }]);
    return FileManagerProgressPanel
}(_ui2.default);
module.exports = FileManagerProgressPanel;
