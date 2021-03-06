/**
 * DevExtreme (ui/diagram/ui.diagram.floating_panel.js)
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
var _window = require("../../core/utils/window");
var _popup = require("../popup");
var _popup2 = _interopRequireDefault(_popup);
var _uiDiagram = require("./ui.diagram.panel");
var _uiDiagram2 = _interopRequireDefault(_uiDiagram);

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
var DIAGRAM_MOBILE_POPUP_CLASS = "dx-diagram-mobile-popup";
var DiagramFloatingPanel = function(_DiagramPanel) {
    _inherits(DiagramFloatingPanel, _DiagramPanel);
    var _super = _createSuper(DiagramFloatingPanel);

    function DiagramFloatingPanel() {
        _classCallCheck(this, DiagramFloatingPanel);
        return _super.apply(this, arguments)
    }
    _createClass(DiagramFloatingPanel, [{
        key: "_init",
        value: function() {
            _get(_getPrototypeOf(DiagramFloatingPanel.prototype), "_init", this).call(this);
            this._createOnVisibilityChangingAction();
            this._createOnVisibilityChangedAction()
        }
    }, {
        key: "isVisible",
        value: function() {
            return this.option("isVisible")
        }
    }, {
        key: "isMobileView",
        value: function() {
            return this.option("isMobileView")
        }
    }, {
        key: "_initMarkup",
        value: function() {
            _get(_getPrototypeOf(DiagramFloatingPanel.prototype), "_initMarkup", this).call(this);
            var $parent = this.$element();
            var $popupElement = (0, _renderer2.default)("<div>").addClass(this._getPopupClass()).addClass(this.isMobileView() && DIAGRAM_MOBILE_POPUP_CLASS).appendTo($parent);
            this._popup = this._createComponent($popupElement, _popup2.default, this._getPopupOptions());
            this._updatePopupVisible()
        }
    }, {
        key: "show",
        value: function() {
            this.option("isVisible", true)
        }
    }, {
        key: "hide",
        value: function() {
            this.option("isVisible", false)
        }
    }, {
        key: "toggle",
        value: function() {
            this.option("isVisible", !this.isVisible())
        }
    }, {
        key: "repaint",
        value: function() {
            this._popup.repaint()
        }
    }, {
        key: "_getPopupContent",
        value: function() {
            return this._popup.content()
        }
    }, {
        key: "_getPopupTitle",
        value: function() {
            return this._getPopupContent().parent().find(".dx-popup-title")
        }
    }, {
        key: "_getPointerUpElement",
        value: function() {
            return this._getPopupContent()
        }
    }, {
        key: "_getVerticalPaddingsAndBorders",
        value: function() {
            var $content = (0, _renderer2.default)(this._getPopupContent());
            return $content.outerHeight() - $content.height()
        }
    }, {
        key: "_getHorizontalPaddingsAndBorders",
        value: function() {
            var $content = (0, _renderer2.default)(this._getPopupContent());
            return $content.outerWidth() - $content.width()
        }
    }, {
        key: "_getPopupClass",
        value: function() {
            return ""
        }
    }, {
        key: "_getPopupWidth",
        value: function() {
            return this.option("width") || "auto"
        }
    }, {
        key: "_getPopupMaxWidth",
        value: function() {
            return this.option("maxWidth")
        }
    }, {
        key: "_getPopupMinWidth",
        value: function() {
            return this.option("minWidth")
        }
    }, {
        key: "_getPopupHeight",
        value: function() {
            return this.option("height") || "auto"
        }
    }, {
        key: "_getPopupMaxHeight",
        value: function() {
            return this.option("maxHeight")
        }
    }, {
        key: "_getPopupMinHeight",
        value: function() {
            return this.option("minHeight")
        }
    }, {
        key: "_getPopupPosition",
        value: function() {
            return {}
        }
    }, {
        key: "_getPopupContainer",
        value: function() {
            return this.option("container")
        }
    }, {
        key: "_getPopupSlideAnimationObject",
        value: function(properties) {
            return (0, _extend.extend)({
                type: "slide",
                start: function() {
                    (0, _renderer2.default)("body").css("overflow", "hidden")
                },
                complete: function() {
                    (0, _renderer2.default)("body").css("overflow", "")
                }
            }, properties)
        }
    }, {
        key: "_getPopupAnimation",
        value: function() {
            return {
                hide: {
                    type: "fadeOut"
                },
                show: {
                    type: "fadeIn"
                }
            }
        }
    }, {
        key: "_getPopupOptions",
        value: function() {
            var _this = this;
            var that = this;
            return {
                animation: (0, _window.hasWindow)() ? this._getPopupAnimation() : null,
                shading: false,
                showTitle: false,
                focusStateEnabled: false,
                container: this._getPopupContainer(),
                width: this._getPopupWidth(),
                height: this._getPopupHeight(),
                maxWidth: this._getPopupMaxWidth(),
                maxHeight: this._getPopupMaxHeight(),
                minWidth: this._getPopupMinWidth(),
                minHeight: this._getPopupMinHeight(),
                position: this._getPopupPosition(),
                onContentReady: function() {
                    that._renderPopupContent(that._popup.content())
                },
                onShowing: function() {
                    _this._onVisibilityChangingAction({
                        visible: true,
                        component: _this
                    })
                },
                onShown: function() {
                    _this.option("isVisible", true);
                    _this._onVisibilityChangedAction({
                        visible: true,
                        component: _this
                    })
                },
                onHiding: function() {
                    _this._onVisibilityChangingAction({
                        visible: false,
                        component: _this
                    })
                },
                onHidden: function() {
                    _this.option("isVisible", false);
                    _this._onVisibilityChangedAction({
                        visible: false,
                        component: _this
                    })
                }
            }
        }
    }, {
        key: "_renderPopupContent",
        value: function($parent) {}
    }, {
        key: "_updatePopupVisible",
        value: function() {
            this._popup.option("visible", this.isVisible())
        }
    }, {
        key: "_createOnVisibilityChangingAction",
        value: function() {
            this._onVisibilityChangingAction = this._createActionByOption("onVisibilityChanging")
        }
    }, {
        key: "_createOnVisibilityChangedAction",
        value: function() {
            this._onVisibilityChangedAction = this._createActionByOption("onVisibilityChanged")
        }
    }, {
        key: "_optionChanged",
        value: function(args) {
            switch (args.name) {
                case "onVisibilityChanging":
                    this._createOnVisibilityChangingAction();
                    break;
                case "onVisibilityChanged":
                    this._createOnVisibilityChangedAction();
                    break;
                case "container":
                    this._popup.option("container", this._getPopupContainer());
                    break;
                case "width":
                    this._popup.option("width", this._getPopupWidth());
                    break;
                case "height":
                    this._popup.option("height", this._getPopupHeight());
                    break;
                case "maxWidth":
                    this._popup.option("maxWidth", this._getPopupMaxWidth());
                    break;
                case "maxHeight":
                    this._popup.option("maxHeight", this._getPopupMaxHeight());
                    break;
                case "minWidth":
                    this._popup.option("minWidth", this._getPopupMinWidth());
                    break;
                case "minHeight":
                    this._popup.option("minHeight", this._getPopupMinHeight());
                    break;
                case "isMobileView":
                    this._invalidate();
                    break;
                case "isVisible":
                    this._updatePopupVisible();
                    break;
                default:
                    _get(_getPrototypeOf(DiagramFloatingPanel.prototype), "_optionChanged", this).call(this, args)
            }
        }
    }, {
        key: "_getDefaultOptions",
        value: function() {
            return (0, _extend.extend)(_get(_getPrototypeOf(DiagramFloatingPanel.prototype), "_getDefaultOptions", this).call(this), {
                isVisible: true,
                isMobileView: false,
                offsetX: 0,
                offsetY: 0
            })
        }
    }]);
    return DiagramFloatingPanel
}(_uiDiagram2.default);
module.exports = DiagramFloatingPanel;
