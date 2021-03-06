/**
 * DevExtreme (ui/diagram/diagram.options_update.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _diagram = require("./diagram.bar");
var _diagram2 = _interopRequireDefault(_diagram);
var _diagram3 = require("./diagram.importer");

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
var DiagramOptionsUpdateBar = function(_DiagramBar) {
    _inherits(DiagramOptionsUpdateBar, _DiagramBar);
    var _super = _createSuper(DiagramOptionsUpdateBar);

    function DiagramOptionsUpdateBar(owner) {
        var _this;
        _classCallCheck(this, DiagramOptionsUpdateBar);
        _this = _super.call(this, owner);
        var _getDiagram = (0, _diagram3.getDiagram)(),
            DiagramCommand = _getDiagram.DiagramCommand;
        _this.commandOptions = {};
        _this.commandOptions[DiagramCommand.Fullscreen] = "fullScreen";
        _this.commandOptions[DiagramCommand.ZoomLevel] = function(value) {
            if ("object" === _typeof(this._getOption("zoomLevel"))) {
                this._setOption("zoomLevel.value", value)
            } else {
                this._setOption("zoomLevel", value)
            }
        };
        _this.commandOptions[DiagramCommand.SwitchAutoZoom] = function(value) {
            var _getDiagram2 = (0, _diagram3.getDiagram)(),
                AutoZoomMode = _getDiagram2.AutoZoomMode;
            switch (value) {
                case AutoZoomMode.FitContent:
                    this._setOption("autoZoomMode", "fitContent");
                    break;
                case AutoZoomMode.FitToWidth:
                    this._setOption("autoZoomMode", "fitWidth");
                    break;
                case AutoZoomMode.Disabled:
                    this._setOption("autoZoomMode", "disabled")
            }
        };
        _this.commandOptions[DiagramCommand.ToggleSimpleView] = "simpleView";
        _this.commandOptions[DiagramCommand.ShowGrid] = "showGrid";
        _this.commandOptions[DiagramCommand.SnapToGrid] = "snapToGrid";
        _this.commandOptions[DiagramCommand.GridSize] = function(value) {
            if ("object" === _typeof(this._getOption("gridSize"))) {
                this._setOption("gridSize.value", value)
            } else {
                this._setOption("gridSize", value)
            }
        };
        _this.commandOptions[DiagramCommand.ViewUnits] = "viewUnits";
        _this.commandOptions[DiagramCommand.PageSize] = "pageSize";
        _this.commandOptions[DiagramCommand.PageLandscape] = function(value) {
            this._setOption("pageOrientation", value ? "landscape" : "portrait")
        };
        _this.commandOptions[DiagramCommand.ViewUnits] = function(value) {
            var _getDiagram3 = (0, _diagram3.getDiagram)(),
                DiagramUnit = _getDiagram3.DiagramUnit;
            switch (value) {
                case DiagramUnit.In:
                    this._setOption("viewUnits", "in");
                    break;
                case DiagramUnit.Cm:
                    this._setOption("viewUnits", "cm");
                    break;
                case DiagramUnit.Px:
                    this._setOption("viewUnits", "px")
            }
        };
        _this.commandOptions[DiagramCommand.PageColor] = "pageColor";
        _this._updateLock = 0;
        return _this
    }
    _createClass(DiagramOptionsUpdateBar, [{
        key: "getCommandKeys",
        value: function() {
            return Object.keys(this.commandOptions).map(function(key) {
                return parseInt(key)
            })
        }
    }, {
        key: "setItemValue",
        value: function(key, value) {
            if (this.isUpdateLocked()) {
                return
            }
            this.beginUpdate();
            try {
                if ("function" === typeof this.commandOptions[key]) {
                    this.commandOptions[key].call(this, value)
                } else {
                    this._setOption(this.commandOptions[key], value)
                }
            } finally {
                this.endUpdate()
            }
        }
    }, {
        key: "beginUpdate",
        value: function() {
            this._updateLock++
        }
    }, {
        key: "endUpdate",
        value: function() {
            this._updateLock--
        }
    }, {
        key: "isUpdateLocked",
        value: function() {
            return this._updateLock > 0
        }
    }, {
        key: "_getOption",
        value: function(name) {
            return this._owner.option(name)
        }
    }, {
        key: "_setOption",
        value: function(name, value) {
            this._owner.option(name, value)
        }
    }]);
    return DiagramOptionsUpdateBar
}(_diagram2.default);
module.exports = DiagramOptionsUpdateBar;
