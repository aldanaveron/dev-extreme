/**
 * DevExtreme (ui/file_manager/ui.file_manager.dialog.name_editor.js)
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
var _text_box = require("../text_box");
var _text_box2 = _interopRequireDefault(_text_box);
var _uiFile_managerDialog = require("./ui.file_manager.dialog.js");
var _uiFile_managerDialog2 = _interopRequireDefault(_uiFile_managerDialog);

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
var FILE_MANAGER_DIALOG_NAME_EDITOR = "dx-filemanager-dialog-name-editor";
var FILE_MANAGER_DIALOG_NAME_EDITOR_POPUP = "dx-filemanager-dialog-name-editor-popup";
var FileManagerNameEditorDialog = function(_FileManagerDialogBas) {
    _inherits(FileManagerNameEditorDialog, _FileManagerDialogBas);
    var _super = _createSuper(FileManagerNameEditorDialog);

    function FileManagerNameEditorDialog() {
        _classCallCheck(this, FileManagerNameEditorDialog);
        return _super.apply(this, arguments)
    }
    _createClass(FileManagerNameEditorDialog, [{
        key: "show",
        value: function(name) {
            name = name || "";
            if (this._nameTextBox) {
                this._nameTextBox.option("value", name)
            } else {
                this._initialNameValue = name
            }
            _get(_getPrototypeOf(FileManagerNameEditorDialog.prototype), "show", this).call(this)
        }
    }, {
        key: "_onPopupShown",
        value: function() {
            if (!this._nameTextBox) {
                return
            }
            var $textBoxInput = this._nameTextBox._input();
            $textBoxInput.length && $textBoxInput[0].select();
            this._nameTextBox.focus()
        }
    }, {
        key: "_getDialogOptions",
        value: function() {
            return (0, _extend.extend)(_get(_getPrototypeOf(FileManagerNameEditorDialog.prototype), "_getDialogOptions", this).call(this), {
                title: this.option("title"),
                buttonText: this.option("buttonText"),
                contentCssClass: FILE_MANAGER_DIALOG_NAME_EDITOR,
                popupCssClass: FILE_MANAGER_DIALOG_NAME_EDITOR_POPUP
            })
        }
    }, {
        key: "_createContentTemplate",
        value: function(element) {
            _get(_getPrototypeOf(FileManagerNameEditorDialog.prototype), "_createContentTemplate", this).call(this, element);
            this._nameTextBox = this._createComponent((0, _renderer2.default)("<div>"), _text_box2.default, {
                value: this._initialNameValue,
                onEnterKey: this._applyDialogChanges.bind(this)
            });
            this._$contentElement.append(this._nameTextBox.$element())
        }
    }, {
        key: "_getDialogResult",
        value: function() {
            var nameValue = this._nameTextBox.option("value");
            return nameValue ? {
                name: nameValue
            } : null
        }
    }, {
        key: "_getDefaultOptions",
        value: function() {
            return (0, _extend.extend)(_get(_getPrototypeOf(FileManagerNameEditorDialog.prototype), "_getDefaultOptions", this).call(this), {
                title: "",
                buttonText: ""
            })
        }
    }]);
    return FileManagerNameEditorDialog
}(_uiFile_managerDialog2.default);
module.exports = FileManagerNameEditorDialog;
