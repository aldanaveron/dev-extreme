/**
 * DevExtreme (ui/file_manager/ui.file_manager.adaptivity.js)
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
var _type = require("../../core/utils/type");
var _window = require("../../core/utils/window");
var _ui = require("../widget/ui.widget");
var _ui2 = _interopRequireDefault(_ui);
var _ui3 = require("../drawer/ui.drawer");
var _ui4 = _interopRequireDefault(_ui3);
var _splitter = require("../splitter");
var _splitter2 = _interopRequireDefault(_splitter);

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
var window = (0, _window.getWindow)();
var ADAPTIVE_STATE_SCREEN_WIDTH = 573;
var DRAWER_PANEL_CONTENT_INITIAL = "dx-drawer-panel-content-initial";
var FileManagerAdaptivityControl = function(_Widget) {
    _inherits(FileManagerAdaptivityControl, _Widget);
    var _super = _createSuper(FileManagerAdaptivityControl);

    function FileManagerAdaptivityControl() {
        _classCallCheck(this, FileManagerAdaptivityControl);
        return _super.apply(this, arguments)
    }
    _createClass(FileManagerAdaptivityControl, [{
        key: "_initMarkup",
        value: function() {
            _get(_getPrototypeOf(FileManagerAdaptivityControl.prototype), "_initMarkup", this).call(this);
            this._initActions();
            this._isInAdaptiveState = false;
            var $drawer = (0, _renderer2.default)("<div>").appendTo(this.$element());
            var contentRenderer = this.option("contentTemplate");
            if ((0, _type.isFunction)(contentRenderer)) {
                contentRenderer($drawer)
            }
            this._drawer = this._createComponent($drawer, _ui4.default);
            this._drawer.option({
                opened: true,
                template: this._createDrawerTemplate.bind(this)
            });
            (0, _renderer2.default)(this._drawer.content()).addClass(DRAWER_PANEL_CONTENT_INITIAL)
        }
    }, {
        key: "_createDrawerTemplate",
        value: function(container) {
            this.option("drawerTemplate")(container);
            this._splitter = this._createComponent("<div>", _splitter2.default, {
                container: this.$element(),
                leftElement: (0, _renderer2.default)(this._drawer.content()),
                rightElement: (0, _renderer2.default)(this._drawer.viewContent()),
                onApplyPanelSize: this._onApplyPanelSize.bind(this)
            });
            this._splitter.$element().appendTo(container)
        }
    }, {
        key: "_render",
        value: function() {
            _get(_getPrototypeOf(FileManagerAdaptivityControl.prototype), "_render", this).call(this);
            this._checkAdaptiveState()
        }
    }, {
        key: "_onApplyPanelSize",
        value: function(e) {
            if (!(0, _window.hasWindow)()) {
                return
            }
            if (!this._splitter.isSplitterMoved()) {
                this._updateDrawerDimensions();
                return
            }(0, _renderer2.default)(this._drawer.content()).removeClass(DRAWER_PANEL_CONTENT_INITIAL);
            (0, _renderer2.default)(this._drawer.content()).css("width", e.leftPanelWidth);
            this._drawer._initSize();
            this._drawer.resizeContent()
        }
    }, {
        key: "_updateDrawerDimensions",
        value: function() {
            (0, _renderer2.default)(this._drawer.content()).css("width", "");
            this._drawer._initSize();
            this._drawer._strategy.setPanelSize(true)
        }
    }, {
        key: "_dimensionChanged",
        value: function(dimension) {
            if (!dimension || "height" !== dimension) {
                this._checkAdaptiveState()
            }
        }
    }, {
        key: "_checkAdaptiveState",
        value: function() {
            var oldState = this._isInAdaptiveState;
            this._isInAdaptiveState = this._isSmallScreen();
            if (oldState !== this._isInAdaptiveState) {
                this.toggleDrawer(!this._isInAdaptiveState, true);
                this._raiseAdaptiveStateChanged(this._isInAdaptiveState)
            }
        }
    }, {
        key: "_isSmallScreen",
        value: function() {
            return (0, _renderer2.default)(window).width() <= ADAPTIVE_STATE_SCREEN_WIDTH
        }
    }, {
        key: "_initActions",
        value: function() {
            this._actions = {
                onAdaptiveStateChanged: this._createActionByOption("onAdaptiveStateChanged")
            }
        }
    }, {
        key: "_raiseAdaptiveStateChanged",
        value: function(enabled) {
            this._actions.onAdaptiveStateChanged({
                enabled: enabled
            })
        }
    }, {
        key: "_getDefaultOptions",
        value: function() {
            return (0, _extend.extend)(_get(_getPrototypeOf(FileManagerAdaptivityControl.prototype), "_getDefaultOptions", this).call(this), {
                drawerTemplate: null,
                contentTemplate: null,
                onAdaptiveStateChanged: null
            })
        }
    }, {
        key: "_optionChanged",
        value: function(args) {
            var name = args.name;
            switch (name) {
                case "drawerTemplate":
                case "contentTemplate":
                    this.repaint();
                    break;
                case "onAdaptiveStateChanged":
                    this._actions[name] = this._createActionByOption(name);
                    break;
                default:
                    _get(_getPrototypeOf(FileManagerAdaptivityControl.prototype), "_optionChanged", this).call(this, args)
            }
        }
    }, {
        key: "isInAdaptiveState",
        value: function() {
            return this._isInAdaptiveState
        }
    }, {
        key: "toggleDrawer",
        value: function(showing, skipAnimation) {
            this._drawer.option("animationEnabled", !skipAnimation);
            this._drawer.toggle(showing);
            var isSplitterActive = this._drawer.option("opened") && !this.isInAdaptiveState();
            this._splitter.toggleState(isSplitterActive)
        }
    }]);
    return FileManagerAdaptivityControl
}(_ui2.default);
module.exports = FileManagerAdaptivityControl;
