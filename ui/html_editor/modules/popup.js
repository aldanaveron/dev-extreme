/**
 * DevExtreme (ui/html_editor/modules/popup.js)
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
var _quill = require("quill");
var _quill2 = _interopRequireDefault(_quill);
var _renderer = require("../../../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _extend = require("../../../core/utils/extend");
var _window = require("../../../core/utils/window");
var _popup = require("../../popup");
var _popup2 = _interopRequireDefault(_popup);
var _list = require("../../list");
var _list2 = _interopRequireDefault(_list);

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
var ListPopupModule = {};
if (_quill2.default) {
    var SUGGESTION_LIST_CLASS = "dx-suggestion-list";
    var SUGGESTION_LIST_WRAPPER_CLASS = "dx-suggestion-list-wrapper";
    var BaseModule = _quill2.default.import("core/module");
    var MIN_HEIGHT = 100;
    ListPopupModule = function(_BaseModule) {
        _inherits(ListPopupModule, _BaseModule);
        var _super = _createSuper(ListPopupModule);
        _createClass(ListPopupModule, [{
            key: "_getDefaultOptions",
            value: function() {
                return {
                    dataSource: null
                }
            }
        }]);

        function ListPopupModule(quill, options) {
            var _this;
            _classCallCheck(this, ListPopupModule);
            _this = _super.call(this, quill, options);
            _this.options = (0, _extend.extend)({}, _this._getDefaultOptions(), options);
            _this._popup = _this.renderPopup();
            _this._popup._wrapper().addClass(SUGGESTION_LIST_WRAPPER_CLASS);
            return _this
        }
        _createClass(ListPopupModule, [{
            key: "renderList",
            value: function($container, options) {
                var $list = (0, _renderer2.default)("<div>").addClass(SUGGESTION_LIST_CLASS).appendTo($container);
                this._list = this.options.editorInstance._createComponent($list, _list2.default, options)
            }
        }, {
            key: "renderPopup",
            value: function() {
                var editorInstance = this.options.editorInstance;
                var $container = (0, _renderer2.default)("<div>").appendTo(editorInstance.$element());
                var popupConfig = this._getPopupConfig();
                return editorInstance._createComponent($container, _popup2.default, popupConfig)
            }
        }, {
            key: "_getPopupConfig",
            value: function() {
                var _this2 = this;
                return {
                    contentTemplate: function(contentElem) {
                        var listConfig = _this2._getListConfig(_this2.options);
                        _this2.renderList((0, _renderer2.default)(contentElem), listConfig)
                    },
                    deferRendering: false,
                    onShown: function() {
                        _this2._list.focus()
                    },
                    onHidden: function() {
                        _this2._list.unselectAll();
                        _this2._list.option("focusedElement", null)
                    },
                    showTitle: false,
                    width: "auto",
                    height: "auto",
                    shading: false,
                    closeOnTargetScroll: true,
                    closeOnOutsideClick: true,
                    animation: {
                        show: {
                            type: "fade",
                            duration: 0,
                            from: 0,
                            to: 1
                        },
                        hide: {
                            type: "fade",
                            duration: 400,
                            from: 1,
                            to: 0
                        }
                    },
                    fullScreen: false,
                    maxHeight: this.maxHeight
                }
            }
        }, {
            key: "_getListConfig",
            value: function(options) {
                return {
                    dataSource: options.dataSource,
                    onSelectionChanged: this.selectionChangedHandler.bind(this),
                    selectionMode: "single",
                    pageLoadMode: "scrollBottom"
                }
            }
        }, {
            key: "selectionChangedHandler",
            value: function(e) {
                if (this._popup.option("visible")) {
                    this._popup.hide();
                    this.insertEmbedContent(e)
                }
            }
        }, {
            key: "insertEmbedContent",
            value: function(selectionChangedEvent) {}
        }, {
            key: "showPopup",
            value: function() {
                this._popup && this._popup.show()
            }
        }, {
            key: "savePosition",
            value: function(position) {
                this.caretPosition = position
            }
        }, {
            key: "getPosition",
            value: function() {
                return this.caretPosition
            }
        }, {
            key: "maxHeight",
            get: function() {
                var window = (0, _window.getWindow)();
                var windowHeight = window && (0, _renderer2.default)(window).height() || 0;
                return Math.max(MIN_HEIGHT, .5 * windowHeight)
            }
        }]);
        return ListPopupModule
    }(BaseModule)
}
exports.default = ListPopupModule;
