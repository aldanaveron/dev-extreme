/**
 * DevExtreme (ui/file_manager/ui.file_manager.dialog.js)
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
var _ui = require("../widget/ui.widget");
var _ui2 = _interopRequireDefault(_ui);
var _popup = require("../popup");
var _popup2 = _interopRequireDefault(_popup);

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
var FILE_MANAGER_DIALOG_CONTENT = "dx-filemanager-dialog";
var FILE_MANAGER_DIALOG_POPUP = "dx-filemanager-dialog-popup";
var FileManagerDialogBase = function(_Widget) {
    _inherits(FileManagerDialogBase, _Widget);
    var _super = _createSuper(FileManagerDialogBase);

    function FileManagerDialogBase() {
        _classCallCheck(this, FileManagerDialogBase);
        return _super.apply(this, arguments)
    }
    _createClass(FileManagerDialogBase, [{
        key: "_initMarkup",
        value: function() {
            _get(_getPrototypeOf(FileManagerDialogBase.prototype), "_initMarkup", this).call(this);
            this._createOnClosedAction();
            var options = this._getDialogOptions();
            var $popup = (0, _renderer2.default)("<div>").addClass(FILE_MANAGER_DIALOG_POPUP).appendTo(this.$element());
            if (options.popupCssClass) {
                $popup.addClass(options.popupCssClass)
            }
            this._popup = this._createComponent($popup, _popup2.default, {
                showTitle: true,
                title: options.title,
                visible: false,
                closeOnOutsideClick: true,
                contentTemplate: this._createContentTemplate.bind(this),
                toolbarItems: [{
                    widget: "dxButton",
                    toolbar: "bottom",
                    location: "after",
                    options: {
                        text: options.buttonText,
                        onClick: this._applyDialogChanges.bind(this)
                    }
                }, {
                    widget: "dxButton",
                    toolbar: "bottom",
                    location: "after",
                    options: {
                        text: _message2.default.format("dxFileManager-dialogButtonCancel"),
                        onClick: this._closeDialog.bind(this)
                    }
                }],
                onHidden: this._onPopupHidden.bind(this),
                onShown: this._onPopupShown.bind(this)
            })
        }
    }, {
        key: "show",
        value: function() {
            this._dialogResult = null;
            this._popup.show()
        }
    }, {
        key: "_getDialogOptions",
        value: function() {
            return {
                title: "Title",
                buttonText: "ButtonText",
                contentCssClass: "",
                popupCssClass: ""
            }
        }
    }, {
        key: "_createContentTemplate",
        value: function(element) {
            this._$contentElement = (0, _renderer2.default)("<div>").appendTo(element).addClass(FILE_MANAGER_DIALOG_CONTENT);
            var cssClass = this._getDialogOptions().contentCssClass;
            if (cssClass) {
                this._$contentElement.addClass(cssClass)
            }
        }
    }, {
        key: "_getDialogResult",
        value: function() {
            return null
        }
    }, {
        key: "_applyDialogChanges",
        value: function() {
            var result = this._getDialogResult();
            if (result) {
                this._dialogResult = result;
                this._popup.hide()
            }
        }
    }, {
        key: "_closeDialog",
        value: function() {
            this._popup.hide()
        }
    }, {
        key: "_onPopupHidden",
        value: function() {
            this._onClosedAction({
                dialogResult: this._dialogResult
            })
        }
    }, {
        key: "_onPopupShown",
        value: function() {}
    }, {
        key: "_createOnClosedAction",
        value: function() {
            this._onClosedAction = this._createActionByOption("onClosed")
        }
    }, {
        key: "_setTitle",
        value: function(newTitle) {
            this._popup.option("title", newTitle)
        }
    }, {
        key: "_setButtonText",
        value: function(newText) {
            this._popup.option("toolbarItems[0].options.text", newText)
        }
    }, {
        key: "_getDefaultOptions",
        value: function() {
            return (0, _extend.extend)(_get(_getPrototypeOf(FileManagerDialogBase.prototype), "_getDefaultOptions", this).call(this), {
                onClosed: null
            })
        }
    }, {
        key: "_optionChanged",
        value: function(args) {
            var name = args.name;
            switch (name) {
                case "onClosed":
                    this._createOnPathChangedAction();
                    break;
                default:
                    _get(_getPrototypeOf(FileManagerDialogBase.prototype), "_optionChanged", this).call(this, args)
            }
        }
    }]);
    return FileManagerDialogBase
}(_ui2.default);
module.exports = FileManagerDialogBase;
