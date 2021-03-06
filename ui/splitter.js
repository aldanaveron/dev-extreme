/**
 * DevExtreme (ui/splitter.js)
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
exports.default = void 0;
var _renderer = require("../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _ui = require("./widget/ui.widget");
var _ui2 = _interopRequireDefault(_ui);
var _dom_adapter = require("../core/dom_adapter");
var _dom_adapter2 = _interopRequireDefault(_dom_adapter);
var _events_engine = require("../events/core/events_engine");
var _events_engine2 = _interopRequireDefault(_events_engine);
var _pointer = require("../events/pointer");
var _pointer2 = _interopRequireDefault(_pointer);
var _utils = require("../events/utils");
var _type = require("../core/utils/type");

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
var SPLITTER_CLASS = "dx-splitter";
var SPLITTER_WRAPPER_CLASS = "".concat(SPLITTER_CLASS, "-wrapper");
var SPLITTER_INACTIVE_CLASS = "".concat(SPLITTER_CLASS, "-inactive");
var SPLITTER_BORDER_CLASS = "".concat(SPLITTER_CLASS, "-border");
var SPLITTER_INITIAL_STATE_CLASS = "".concat(SPLITTER_CLASS, "-initial");
var STATE_DISABLED_CLASS = "dx-state-disabled";
var SPLITTER_MODULE_NAMESPACE = "dxSplitterResizing";
var SPLITTER_POINTER_DOWN_EVENT_NAME = (0, _utils.addNamespace)(_pointer2.default.down, SPLITTER_MODULE_NAMESPACE);
var SPLITTER_POINTER_MOVE_EVENT_NAME = (0, _utils.addNamespace)(_pointer2.default.move, SPLITTER_MODULE_NAMESPACE);
var SPLITTER_POINTER_UP_EVENT_NAME = (0, _utils.addNamespace)(_pointer2.default.up, SPLITTER_MODULE_NAMESPACE);
var SplitterControl = function(_Widget) {
    _inherits(SplitterControl, _Widget);
    var _super = _createSuper(SplitterControl);

    function SplitterControl() {
        _classCallCheck(this, SplitterControl);
        return _super.apply(this, arguments)
    }
    _createClass(SplitterControl, [{
        key: "_initMarkup",
        value: function() {
            this._$container = this.option("container");
            this._$leftElement = this.option("leftElement");
            this._$rightElement = this.option("rightElement");
            this._onApplyPanelSize = this._createActionByOption("onApplyPanelSize");
            this.$element().addClass(SPLITTER_WRAPPER_CLASS).addClass(SPLITTER_INITIAL_STATE_CLASS);
            this._$splitterBorder = (0, _renderer2.default)("<div>").addClass(SPLITTER_BORDER_CLASS).appendTo(this.$element());
            this._$splitter = (0, _renderer2.default)("<div>").addClass(SPLITTER_CLASS).addClass(SPLITTER_INACTIVE_CLASS).appendTo(this._$splitterBorder)
        }
    }, {
        key: "_render",
        value: function() {
            _get(_getPrototypeOf(SplitterControl.prototype), "_render", this).call(this);
            this._detachEventHandlers();
            this._attachEventHandlers()
        }
    }, {
        key: "_clean",
        value: function() {
            this._detachEventHandlers();
            _get(_getPrototypeOf(SplitterControl.prototype), "_clean", this).call(this)
        }
    }, {
        key: "_attachEventHandlers",
        value: function() {
            var document = _dom_adapter2.default.getDocument();
            _events_engine2.default.on(this._$splitterBorder, SPLITTER_POINTER_DOWN_EVENT_NAME, this._onMouseDownHandler.bind(this));
            _events_engine2.default.on(document, SPLITTER_POINTER_MOVE_EVENT_NAME, this._onMouseMoveHandler.bind(this));
            _events_engine2.default.on(document, SPLITTER_POINTER_UP_EVENT_NAME, this._onMouseUpHandler.bind(this))
        }
    }, {
        key: "_detachEventHandlers",
        value: function() {
            var document = _dom_adapter2.default.getDocument();
            _events_engine2.default.off(this._$splitterBorder, SPLITTER_POINTER_DOWN_EVENT_NAME);
            _events_engine2.default.off(document, SPLITTER_POINTER_MOVE_EVENT_NAME);
            _events_engine2.default.off(document, SPLITTER_POINTER_UP_EVENT_NAME)
        }
    }, {
        key: "_dimensionChanged",
        value: function() {
            if (void 0 === this._leftPanelPercentageWidth) {
                var leftElementWidth = this._$leftElement.get(0).clientWidth + this.getSplitterOffset();
                this._leftPanelPercentageWidth = this._convertLeftPanelWidthToPercentage(leftElementWidth)
            }
            var rightPanelWidth = 100 - this._leftPanelPercentageWidth;
            this._onApplyPanelSize({
                leftPanelWidth: this._leftPanelPercentageWidth + "%",
                rightPanelWidth: rightPanelWidth + "%"
            });
            this.setSplitterPositionLeft(this._$leftElement.get(0).clientWidth - this.getSplitterOffset())
        }
    }, {
        key: "_onMouseDownHandler",
        value: function(e) {
            e.preventDefault();
            this._offsetX = e.pageX - this._$splitterBorder.offset().left <= this._getSplitterBorderWidth() ? e.pageX - this._$splitterBorder.offset().left : 0;
            this._isSplitterActive = true;
            this._containerWidth = this._$container.get(0).clientWidth;
            this.$element().removeClass(SPLITTER_INITIAL_STATE_CLASS);
            this._$splitter.removeClass(SPLITTER_INACTIVE_CLASS);
            this.setSplitterPositionLeft(null, true)
        }
    }, {
        key: "_onMouseMoveHandler",
        value: function(e) {
            if (!this._isSplitterActive) {
                return
            }
            this.setSplitterPositionLeft(this._getNewSplitterPositionLeft(e), true)
        }
    }, {
        key: "_onMouseUpHandler",
        value: function() {
            if (this._isSplitterActive) {
                this._$splitter.addClass(SPLITTER_INACTIVE_CLASS);
                this._isSplitterActive = false
            }
        }
    }, {
        key: "_getNewSplitterPositionLeft",
        value: function(e) {
            var newSplitterPositionLeft = e.pageX - this._$container.offset().left - this._offsetX;
            newSplitterPositionLeft = Math.max(0 - this.getSplitterOffset(), newSplitterPositionLeft);
            newSplitterPositionLeft = Math.min(this._containerWidth - this.getSplitterOffset() - this._getSplitterWidth(), newSplitterPositionLeft);
            return newSplitterPositionLeft
        }
    }, {
        key: "_isDomElement",
        value: function(element) {
            return element && element.nodeType && 1 === element.nodeType
        }
    }, {
        key: "_isPercentValue",
        value: function(value) {
            return (0, _type.isString)(value) && "%" === value.slice(-1)
        }
    }, {
        key: "getSplitterOffset",
        value: function() {
            return (this._getSplitterBorderWidth() - this._getSplitterWidth()) / 2
        }
    }, {
        key: "_getSplitterWidth",
        value: function() {
            return this._$splitter.get(0).clientWidth
        }
    }, {
        key: "_getSplitterBorderWidth",
        value: function() {
            return this._$splitterBorder.get(0).clientWidth
        }
    }, {
        key: "toggleState",
        value: function(isActive) {
            var classAction = isActive ? "removeClass" : "addClass";
            this.$element()[classAction](STATE_DISABLED_CLASS);
            this._$splitter[classAction](STATE_DISABLED_CLASS)
        }
    }, {
        key: "isSplitterMoved",
        value: function() {
            return !this.$element().hasClass(SPLITTER_INITIAL_STATE_CLASS)
        }
    }, {
        key: "setSplitterPositionLeft",
        value: function(splitterPositionLeft, needUpdatePanels) {
            splitterPositionLeft = splitterPositionLeft || this._$leftElement.get(0).clientWidth - this.getSplitterOffset();
            this.$element().css("left", splitterPositionLeft);
            if (!needUpdatePanels) {
                return
            }
            var leftPanelWidth = splitterPositionLeft + this.getSplitterOffset();
            var rightPanelWidth = this._containerWidth - leftPanelWidth;
            this._onApplyPanelSize({
                leftPanelWidth: leftPanelWidth,
                rightPanelWidth: rightPanelWidth
            });
            this._leftPanelPercentageWidth = this._convertLeftPanelWidthToPercentage(leftPanelWidth)
        }
    }, {
        key: "_optionChanged",
        value: function(args) {
            switch (args.name) {
                case "initialLeftPanelWidth":
                    this._leftPanelPercentageWidth = this._convertLeftPanelWidthToPercentage(args.value);
                    this._dimensionChanged();
                    break;
                case "leftElement":
                    this.repaint();
                    break;
                default:
                    _get(_getPrototypeOf(SplitterControl.prototype), "_optionChanged", this).call(this, args)
            }
        }
    }, {
        key: "_convertLeftPanelWidthToPercentage",
        value: function(leftPanelWidth) {
            return leftPanelWidth / this._$container.get(0).clientWidth * 100
        }
    }]);
    return SplitterControl
}(_ui2.default);
exports.default = SplitterControl;
