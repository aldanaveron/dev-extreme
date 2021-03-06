/**
 * DevExtreme (ui/diagram/ui.diagram.scroll_view.js)
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
var _scroll_view = require("../scroll_view");
var _scroll_view2 = _interopRequireDefault(_scroll_view);
var _diagram = require("./diagram.importer");

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
var DiagramScrollView = function(_Widget) {
    _inherits(DiagramScrollView, _Widget);
    var _super = _createSuper(DiagramScrollView);

    function DiagramScrollView() {
        _classCallCheck(this, DiagramScrollView);
        return _super.apply(this, arguments)
    }
    _createClass(DiagramScrollView, [{
        key: "_init",
        value: function() {
            _get(_getPrototypeOf(DiagramScrollView.prototype), "_init", this).call(this);
            var _getDiagram = (0, _diagram.getDiagram)(),
                EventDispatcher = _getDiagram.EventDispatcher;
            this.onScroll = new EventDispatcher;
            this._createOnCreateDiagramAction()
        }
    }, {
        key: "_initMarkup",
        value: function() {
            var _this = this;
            _get(_getPrototypeOf(DiagramScrollView.prototype), "_initMarkup", this).call(this);
            var $scrollViewWrapper = (0, _renderer2.default)("<div>").appendTo(this.$element());
            this._scrollView = this._createComponent($scrollViewWrapper, _scroll_view2.default, {
                direction: "both",
                bounceEnabled: false,
                onScroll: function(_ref) {
                    var scrollOffset = _ref.scrollOffset;
                    _this._raiseOnScroll(scrollOffset.left, scrollOffset.top)
                }
            });
            this._onCreateDiagramAction({
                $parent: (0, _renderer2.default)(this._scrollView.content()),
                scrollView: this
            })
        }
    }, {
        key: "setScroll",
        value: function(left, top) {
            this._scrollView.scrollTo({
                left: left,
                top: top
            })
        }
    }, {
        key: "offsetScroll",
        value: function(left, top) {
            this._scrollView.scrollBy({
                left: left,
                top: top
            })
        }
    }, {
        key: "getSize",
        value: function() {
            var _getDiagram2 = (0, _diagram.getDiagram)(),
                Size = _getDiagram2.Size;
            var $element = this._scrollView.$element();
            return new Size(Math.floor($element.width()), Math.floor($element.height()))
        }
    }, {
        key: "getScrollContainer",
        value: function() {
            return this._scrollView.$element()[0]
        }
    }, {
        key: "getScrollBarWidth",
        value: function() {
            return 0
        }
    }, {
        key: "detachEvents",
        value: function() {}
    }, {
        key: "_raiseOnScroll",
        value: function(left, top) {
            var _getDiagram3 = (0, _diagram.getDiagram)(),
                Point = _getDiagram3.Point;
            this.onScroll.raise("notifyScrollChanged", function() {
                return new Point(left, top)
            })
        }
    }, {
        key: "_createOnCreateDiagramAction",
        value: function() {
            this._onCreateDiagramAction = this._createActionByOption("onCreateDiagram")
        }
    }, {
        key: "_optionChanged",
        value: function(args) {
            switch (args.name) {
                case "onCreateDiagram":
                    this._createOnCreateDiagramAction();
                    break;
                default:
                    _get(_getPrototypeOf(DiagramScrollView.prototype), "_optionChanged", this).call(this, args)
            }
        }
    }]);
    return DiagramScrollView
}(_ui2.default);
module.exports = DiagramScrollView;
