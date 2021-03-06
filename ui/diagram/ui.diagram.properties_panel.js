/**
 * DevExtreme (ui/diagram/ui.diagram.properties_panel.js)
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
var _scroll_view = require("../scroll_view");
var _scroll_view2 = _interopRequireDefault(_scroll_view);
var _tab_panel = require("../tab_panel");
var _tab_panel2 = _interopRequireDefault(_tab_panel);
var _uiDiagram = require("./ui.diagram.floating_panel");
var _uiDiagram2 = _interopRequireDefault(_uiDiagram);
var _diagram = require("./diagram.commands_manager");
var _diagram2 = _interopRequireDefault(_diagram);

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
var DIAGRAM_PROPERTIES_POPUP_WIDTH = 420;
var DIAGRAM_PROPERTIES_POPUP_HEIGHT = 340;
var DIAGRAM_PROPERTIES_POPUP_CLASS = "dx-diagram-properties-popup";
var DIAGRAM_PROPERTIES_POPUP_NOTABS_CLASS = "dx-diagram-properties-popup-notabs";
var DIAGRAM_PROPERTIES_PANEL_CLASS = "dx-diagram-properties-panel";
var DIAGRAM_PROPERTIES_PANEL_GROUP_TITLE_CLASS = "dx-diagram-properties-panel-group-title";
var DIAGRAM_PROPERTIES_PANEL_GROUP_TOOLBAR_CLASS = "dx-diagram-properties-panel-group-toolbar";
var DiagramPropertiesPanel = function(_DiagramFloatingPanel) {
    _inherits(DiagramPropertiesPanel, _DiagramFloatingPanel);
    var _super = _createSuper(DiagramPropertiesPanel);

    function DiagramPropertiesPanel() {
        _classCallCheck(this, DiagramPropertiesPanel);
        return _super.apply(this, arguments)
    }
    _createClass(DiagramPropertiesPanel, [{
        key: "_init",
        value: function() {
            _get(_getPrototypeOf(DiagramPropertiesPanel.prototype), "_init", this).call(this);
            this._commandTabs = _diagram2.default.getPropertyPanelCommandTabs(this.option("propertyTabs"));
            this._createOnCreateToolbar();
            this._createOnSelectedGroupChanged()
        }
    }, {
        key: "_initMarkup",
        value: function() {
            this._toolbars = [];
            this._selectedToolbar = void 0;
            _get(_getPrototypeOf(DiagramPropertiesPanel.prototype), "_initMarkup", this).call(this)
        }
    }, {
        key: "_getPopupClass",
        value: function() {
            var className = DIAGRAM_PROPERTIES_POPUP_CLASS;
            if (!this._hasTabPanel()) {
                className += " " + DIAGRAM_PROPERTIES_POPUP_NOTABS_CLASS
            }
            return className
        }
    }, {
        key: "_getPopupWidth",
        value: function() {
            return this.isMobileView() ? "100%" : DIAGRAM_PROPERTIES_POPUP_WIDTH
        }
    }, {
        key: "_getPopupHeight",
        value: function() {
            return DIAGRAM_PROPERTIES_POPUP_HEIGHT
        }
    }, {
        key: "_getPopupPosition",
        value: function() {
            var $parent = this.option("offsetParent");
            if (this.isMobileView()) {
                return {
                    my: "left bottom",
                    at: "left bottom",
                    of: $parent
                }
            }
            return {
                my: "right bottom",
                at: "right bottom",
                of: $parent,
                offset: "-" + this.option("offsetX") + " -" + this.option("offsetY")
            }
        }
    }, {
        key: "_getPopupAnimation",
        value: function() {
            var $parent = this.option("offsetParent");
            if (this.isMobileView()) {
                return {
                    hide: this._getPopupSlideAnimationObject({
                        direction: "bottom",
                        from: {
                            position: {
                                my: "left bottom",
                                at: "left bottom",
                                of: $parent
                            }
                        },
                        to: {
                            position: {
                                my: "left top",
                                at: "left bottom",
                                of: $parent
                            }
                        }
                    }),
                    show: this._getPopupSlideAnimationObject({
                        direction: "top",
                        from: {
                            position: {
                                my: "left top",
                                at: "left bottom",
                                of: $parent
                            }
                        },
                        to: {
                            position: {
                                my: "left bottom",
                                at: "left bottom",
                                of: $parent
                            }
                        }
                    })
                }
            }
            return _get(_getPrototypeOf(DiagramPropertiesPanel.prototype), "_getPopupAnimation", this).call(this)
        }
    }, {
        key: "_getPopupOptions",
        value: function() {
            return (0, _extend.extend)(_get(_getPrototypeOf(DiagramPropertiesPanel.prototype), "_getPopupOptions", this).call(this), {
                showTitle: this.isMobileView(),
                showCloseButton: this.isMobileView()
            })
        }
    }, {
        key: "_renderPopupContent",
        value: function($parent) {
            if (!this._commandTabs.length) {
                return
            }
            var $panel = (0, _renderer2.default)("<div>").addClass(DIAGRAM_PROPERTIES_PANEL_CLASS).appendTo($parent);
            if (this._hasTabPanel()) {
                this._renderTabPanel($panel)
            } else {
                this._renderTabContent($panel, this._commandTabs[0], 0, true)
            }
        }
    }, {
        key: "_hasTabPanel",
        value: function() {
            return this._commandTabs.length > 1
        }
    }, {
        key: "_renderTabPanel",
        value: function($parent) {
            var _this = this;
            var $tabPanel = (0, _renderer2.default)("<div>").appendTo($parent);
            this._tabPanel = this._createComponent($tabPanel, _tab_panel2.default, {
                focusStateEnabled: false,
                dataSource: this._commandTabs,
                itemTemplate: function(data, index, $element) {
                    _this._renderTabContent($element, data, index)
                },
                onSelectionChanged: function(e) {
                    _this._onSelectedGroupChangedAction();
                    _this._onPointerUpAction()
                },
                onContentReady: function(e) {
                    _this._popup.option("height", e.component.$element().height() + _this._getVerticalPaddingsAndBorders());
                    if (_this._firstScrollView) {
                        _this._scrollViewHeight = _this._firstScrollView.$element().outerHeight();
                        _this._firstScrollView.option("height", _this._scrollViewHeight)
                    }
                }
            })
        }
    }, {
        key: "_renderTabContent",
        value: function($parent, tab, index, isSingleTab) {
            var $scrollViewWrapper = (0, _renderer2.default)("<div>").appendTo($parent);
            var scrollView = this._createComponent($scrollViewWrapper, _scroll_view2.default, {
                height: this._scrollViewHeight
            });
            this._renderTabInnerContent(scrollView.content(), tab, index);
            if (isSingleTab) {
                this._popup.option("height", scrollView.$element().height() + this._getVerticalPaddingsAndBorders())
            } else {
                this._firstScrollView = this._firstScrollView || scrollView
            }
        }
    }, {
        key: "_renderTabInnerContent",
        value: function($parent, group, index) {
            var _this2 = this;
            if (group.groups) {
                group.groups.forEach(function(sg, si) {
                    _this2._renderTabGroupContent($parent, index, sg.title, sg.commands)
                })
            } else {
                if (group.commands) {
                    this._renderTabGroupContent($parent, index, void 0, group.commands)
                }
            }
        }
    }, {
        key: "_renderTabGroupContent",
        value: function($parent, index, title, commands) {
            if (title) {
                (0, _renderer2.default)("<div>").addClass(DIAGRAM_PROPERTIES_PANEL_GROUP_TITLE_CLASS).appendTo($parent).text(title)
            }
            var $toolbar = (0, _renderer2.default)("<div>").addClass(DIAGRAM_PROPERTIES_PANEL_GROUP_TOOLBAR_CLASS).appendTo($parent);
            var args = {
                $parent: $toolbar,
                commands: commands
            };
            this._onCreateToolbarAction(args);
            if (!this._toolbars[index]) {
                this._toolbars[index] = []
            }
            this._toolbars[index].push(args.toolbar);
            this._selectedToolbar = args.toolbar
        }
    }, {
        key: "getActiveToolbars",
        value: function() {
            var index = this._tabPanel ? this._tabPanel.option("selectedIndex") : 0;
            return this._toolbars[index]
        }
    }, {
        key: "_createOnCreateToolbar",
        value: function() {
            this._onCreateToolbarAction = this._createActionByOption("onCreateToolbar")
        }
    }, {
        key: "_createOnSelectedGroupChanged",
        value: function() {
            this._onSelectedGroupChangedAction = this._createActionByOption("onSelectedGroupChanged")
        }
    }, {
        key: "_optionChanged",
        value: function(args) {
            switch (args.name) {
                case "onCreateToolbar":
                    this._createOnCreateToolbar();
                    break;
                case "onSelectedGroupChanged":
                    this._createOnSelectedGroupChanged();
                    break;
                case "propertyTabs":
                    this._invalidate();
                    break;
                default:
                    _get(_getPrototypeOf(DiagramPropertiesPanel.prototype), "_optionChanged", this).call(this, args)
            }
        }
    }]);
    return DiagramPropertiesPanel
}(_uiDiagram2.default);
module.exports = DiagramPropertiesPanel;
