/**
 * DevExtreme (ui/diagram/ui.diagram.dialogs.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _renderer = require("../../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _ui = require("../widget/ui.widget");
var _ui2 = _interopRequireDefault(_ui);
var _message = require("../../localization/message");
var _message2 = _interopRequireDefault(_message);

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
var Popup = require("../popup");
var extend = require("../../core/utils/extend").extend;
var DiagramDialog = function(_Widget) {
    _inherits(DiagramDialog, _Widget);
    var _super = _createSuper(DiagramDialog);

    function DiagramDialog() {
        _classCallCheck(this, DiagramDialog);
        return _super.apply(this, arguments)
    }
    _createClass(DiagramDialog, [{
        key: "_init",
        value: function() {
            _get(_getPrototypeOf(DiagramDialog.prototype), "_init", this).call(this);
            this._command = void 0;
            this._isShown = false;
            this._createOnGetContentOption();
            this._createOnHiddenOption()
        }
    }, {
        key: "_initMarkup",
        value: function() {
            _get(_getPrototypeOf(DiagramDialog.prototype), "_initMarkup", this).call(this);
            this._command = this.option("command");
            this._$popupElement = (0, _renderer2.default)("<div>").appendTo(this.$element());
            this._popup = this._createComponent(this._$popupElement, Popup, {
                title: this.option("title"),
                maxWidth: this.option("maxWidth"),
                height: this.option("height"),
                toolbarItems: this.option("toolbarItems"),
                onHidden: this._onHiddenAction
            })
        }
    }, {
        key: "_clean",
        value: function() {
            delete this._popup;
            this._$popupElement && this._$popupElement.remove()
        }
    }, {
        key: "_getDefaultOptions",
        value: function() {
            return extend(_get(_getPrototypeOf(DiagramDialog.prototype), "_getDefaultOptions", this).call(this), {
                title: "",
                maxWidth: 500,
                height: "auto",
                toolbarItems: this._getToolbarItems()
            })
        }
    }, {
        key: "_getToolbarItems",
        value: function() {
            return [this._getOkToolbarItem(), this._getCancelToolbarItem()]
        }
    }, {
        key: "_getOkToolbarItem",
        value: function() {
            return {
                widget: "dxButton",
                location: "after",
                toolbar: "bottom",
                options: {
                    text: _message2.default.format("dxDiagram-dialogButtonOK"),
                    onClick: function() {
                        this._command.execute(this._commandParameter);
                        this._hide()
                    }.bind(this)
                }
            }
        }
    }, {
        key: "_getCancelToolbarItem",
        value: function() {
            return {
                widget: "dxButton",
                location: "after",
                toolbar: "bottom",
                options: {
                    text: _message2.default.format("dxDiagram-dialogButtonCancel"),
                    onClick: this._hide.bind(this)
                }
            }
        }
    }, {
        key: "_optionChanged",
        value: function(args) {
            switch (args.name) {
                case "title":
                case "maxWidth":
                case "height":
                case "toolbarItems":
                    this._popup.option(args.name, args.value);
                    break;
                case "command":
                    this._command = args.value;
                    break;
                case "onGetContent":
                    this._createOnGetContentOption();
                    break;
                case "onHidden":
                    this._createOnHiddenOption();
                    break;
                default:
                    _get(_getPrototypeOf(DiagramDialog.prototype), "_optionChanged", this).call(this, args)
            }
        }
    }, {
        key: "_createOnGetContentOption",
        value: function() {
            this._onGetContentAction = this._createActionByOption("onGetContent")
        }
    }, {
        key: "_createOnHiddenOption",
        value: function() {
            this._onHiddenAction = this._createActionByOption("onHidden")
        }
    }, {
        key: "_hide",
        value: function() {
            this._popup.hide();
            this._isShown = false
        }
    }, {
        key: "_show",
        value: function() {
            this._popup.content().empty().append(this._onGetContentAction());
            this._popup.show();
            this._isShown = true
        }
    }, {
        key: "isVisible",
        value: function() {
            return this._isShown
        }
    }]);
    return DiagramDialog
}(_ui2.default);
module.exports = DiagramDialog;
