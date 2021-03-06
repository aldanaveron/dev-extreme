/**
 * DevExtreme (ui/diagram/ui.diagram.js)
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
var _load_indicator = require("../load_indicator");
var _load_indicator2 = _interopRequireDefault(_load_indicator);
var _component_registrator = require("../../core/component_registrator");
var _component_registrator2 = _interopRequireDefault(_component_registrator);
var _extend = require("../../core/utils/extend");
var _type = require("../../core/utils/type");
var _type2 = _interopRequireDefault(_type);
var _data = require("../../core/utils/data");
var _data2 = _interopRequireDefault(_data);
var _position = require("../../animation/position");
var _position2 = _interopRequireDefault(_position);
var _resize_callbacks = require("../../core/utils/resize_callbacks");
var _resize_callbacks2 = _interopRequireDefault(_resize_callbacks);
var _diagram = require("./diagram.importer");
var _window = require("../../core/utils/window");
var _dom = require("../../core/utils/dom");
var _dom2 = _interopRequireDefault(_dom);
var _events_engine = require("../../events/core/events_engine");
var _events_engine2 = _interopRequireDefault(_events_engine);
var _utils = require("../../events/utils");
var eventUtils = _interopRequireWildcard(_utils);
var _message = require("../../localization/message");
var _message2 = _interopRequireDefault(_message);
var _number = require("../../localization/number");
var _number2 = _interopRequireDefault(_number);
var _z_index = require("../overlay/z_index");
var zIndexPool = _interopRequireWildcard(_z_index);
var _ui3 = require("../overlay/ui.overlay");
var _ui4 = _interopRequireDefault(_ui3);
var _uiDiagram = require("./ui.diagram.toolbar");
var _uiDiagram2 = _interopRequireDefault(_uiDiagram);
var _uiDiagram3 = require("./ui.diagram.main_toolbar");
var _uiDiagram4 = _interopRequireDefault(_uiDiagram3);
var _uiDiagram5 = require("./ui.diagram.history_toolbar");
var _uiDiagram6 = _interopRequireDefault(_uiDiagram5);
var _uiDiagram7 = require("./ui.diagram.view_toolbar");
var _uiDiagram8 = _interopRequireDefault(_uiDiagram7);
var _uiDiagram9 = require("./ui.diagram.properties_toolbar");
var _uiDiagram10 = _interopRequireDefault(_uiDiagram9);
var _uiDiagram11 = require("./ui.diagram.context_menu");
var _uiDiagram12 = _interopRequireDefault(_uiDiagram11);
var _uiDiagram13 = require("./ui.diagram.context_toolbox");
var _uiDiagram14 = _interopRequireDefault(_uiDiagram13);
var _uiDiagram15 = require("./ui.diagram.dialogs");
var _uiDiagram16 = _interopRequireDefault(_uiDiagram15);
var _uiDiagram17 = require("./ui.diagram.scroll_view");
var _uiDiagram18 = _interopRequireDefault(_uiDiagram17);
var _diagram2 = require("./diagram.toolbox_manager");
var _diagram3 = _interopRequireDefault(_diagram2);
var _uiDiagram19 = require("./ui.diagram.toolbox");
var _uiDiagram20 = _interopRequireDefault(_uiDiagram19);
var _uiDiagram21 = require("./ui.diagram.properties_panel");
var _uiDiagram22 = _interopRequireDefault(_uiDiagram21);
var _diagram4 = require("./diagram.options_update");
var _diagram5 = _interopRequireDefault(_diagram4);
var _uiDiagram23 = require("./ui.diagram.dialog_manager");
var _uiDiagram24 = _interopRequireDefault(_uiDiagram23);
var _diagram6 = require("./diagram.commands_manager");
var _diagram7 = _interopRequireDefault(_diagram6);
var _diagram8 = require("./diagram.nodes_option");
var _diagram9 = _interopRequireDefault(_diagram8);
var _diagram10 = require("./diagram.edges_option");
var _diagram11 = _interopRequireDefault(_diagram10);

function _getRequireWildcardCache() {
    if ("function" !== typeof WeakMap) {
        return null
    }
    var cache = new WeakMap;
    _getRequireWildcardCache = function() {
        return cache
    };
    return cache
}

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj
    }
    if (null === obj || "object" !== _typeof(obj) && "function" !== typeof obj) {
        return {
            "default": obj
        }
    }
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) {
        return cache.get(obj)
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc)
            } else {
                newObj[key] = obj[key]
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj)
    }
    return newObj
}

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
var DIAGRAM_CLASS = "dx-diagram";
var DIAGRAM_FULLSCREEN_CLASS = "dx-diagram-fullscreen";
var DIAGRAM_TOOLBAR_WRAPPER_CLASS = DIAGRAM_CLASS + "-toolbar-wrapper";
var DIAGRAM_CONTENT_WRAPPER_CLASS = DIAGRAM_CLASS + "-content-wrapper";
var DIAGRAM_CONTENT_CLASS = DIAGRAM_CLASS + "-content";
var DIAGRAM_SCROLL_VIEW_CLASS = DIAGRAM_CLASS + "-scroll-view";
var DIAGRAM_FLOATING_TOOLBAR_CONTAINER_CLASS = DIAGRAM_CLASS + "-floating-toolbar-container";
var DIAGRAM_PROPERTIES_PANEL_TOOLBAR_CONTAINER_CLASS = DIAGRAM_CLASS + "-properties-panel-toolbar-container";
var DIAGRAM_LOADING_INDICATOR_CLASS = DIAGRAM_CLASS + "-loading-indicator";
var DIAGRAM_FLOATING_PANEL_OFFSET = 12;
var DIAGRAM_DEFAULT_UNIT = "in";
var DIAGRAM_DEFAULT_ZOOMLEVEL = 1;
var DIAGRAM_DEFAULT_AUTOZOOM_MODE = "disabled";
var DIAGRAM_DEFAULT_PAGE_ORIENTATION = "portrait";
var DIAGRAM_DEFAULT_PAGE_COLOR = "white";
var DIAGRAM_MAX_MOBILE_WINDOW_WIDTH = 576;
var DIAGRAM_TOOLBOX_ITEM_SPACING = 12;
var DIAGRAM_TOOLBOX_ITEM_COUNT_IN_ROW = 3;
var DIAGRAM_CONTEXT_TOOLBOX_ITEM_COUNT_IN_ROW = 4;
var DIAGRAM_NAMESPACE = "dxDiagramEvent";
var FULLSCREEN_CHANGE_EVENT_NAME = eventUtils.addNamespace("fullscreenchange", DIAGRAM_NAMESPACE);
var IE_FULLSCREEN_CHANGE_EVENT_NAME = eventUtils.addNamespace("msfullscreenchange", DIAGRAM_NAMESPACE);
var WEBKIT_FULLSCREEN_CHANGE_EVENT_NAME = eventUtils.addNamespace("webkitfullscreenchange", DIAGRAM_NAMESPACE);
var MOZ_FULLSCREEN_CHANGE_EVENT_NAME = eventUtils.addNamespace("mozfullscreenchange", DIAGRAM_NAMESPACE);
var Diagram = function(_Widget) {
    _inherits(Diagram, _Widget);
    var _super = _createSuper(Diagram);

    function Diagram() {
        _classCallCheck(this, Diagram);
        return _super.apply(this, arguments)
    }
    _createClass(Diagram, [{
        key: "_init",
        value: function() {
            this._updateDiagramLockCount = 0;
            this._browserResizeTimer = -1;
            this._toolbars = [];
            _get(_getPrototypeOf(Diagram.prototype), "_init", this).call(this);
            this._initDiagram();
            this._createCustomCommand();
            this.optionsUpdateBar = new _diagram5.default(this)
        }
    }, {
        key: "_initMarkup",
        value: function() {
            var _this = this;
            _get(_getPrototypeOf(Diagram.prototype), "_initMarkup", this).call(this);
            this._toolbars = [];
            var isServerSide = !(0, _window.hasWindow)();
            this.$element().addClass(DIAGRAM_CLASS);
            delete this._mainToolbar;
            if (this.option("mainToolbar.visible")) {
                this._renderMainToolbar()
            }
            var $contentWrapper = (0, _renderer2.default)("<div>").addClass(DIAGRAM_CONTENT_WRAPPER_CLASS).appendTo(this.$element());
            delete this._historyToolbar;
            delete this._historyToolbarResizeCallback;
            if (this._isHistoryToolbarVisible()) {
                this._renderHistoryToolbar($contentWrapper)
            }
            delete this._propertiesToolbar;
            delete this._propertiesToolbarResizeCallback;
            if (this._isPropertiesPanelEnabled()) {
                this._renderPropertiesToolbar($contentWrapper)
            }
            delete this._viewToolbar;
            delete this._viewToolbarResizeCallback;
            if (this.option("viewToolbar.visible")) {
                this._renderViewToolbar($contentWrapper)
            }
            delete this._toolbox;
            delete this._toolboxResizeCallback;
            if (this._isToolboxEnabled()) {
                this._renderToolbox($contentWrapper)
            }
            delete this._propertiesPanel;
            delete this._propertiesPanelResizeCallback;
            if (this._isPropertiesPanelEnabled()) {
                this._renderPropertiesPanel($contentWrapper)
            }
            this._$content = (0, _renderer2.default)("<div>").addClass(DIAGRAM_CONTENT_CLASS).appendTo($contentWrapper);
            delete this._contextMenu;
            if (this.option("contextMenu.enabled")) {
                this._renderContextMenu(this._$content)
            }
            delete this._contextToolbox;
            if (this.option("contextToolbox.enabled")) {
                this._renderContextToolbox(this._$content)
            }
            this._renderDialog(this._$content);
            if (!isServerSide) {
                var $scrollViewWrapper = (0, _renderer2.default)("<div>").addClass(DIAGRAM_SCROLL_VIEW_CLASS).appendTo(this._$content);
                this._createComponent($scrollViewWrapper, _uiDiagram18.default, {
                    onCreateDiagram: function(e) {
                        _this._diagramInstance.createDocument(e.$parent[0], e.scrollView)
                    }
                })
            }
            if (this.option("zoomLevel") !== DIAGRAM_DEFAULT_ZOOMLEVEL) {
                this._updateZoomLevelState()
            }
            if (this.option("autoZoomMode") !== DIAGRAM_DEFAULT_AUTOZOOM_MODE) {
                this._updateAutoZoomState()
            }
            if (this.option("simpleView")) {
                this._updateSimpleViewState()
            }
            if (this.option("readOnly") || this.option("disabled")) {
                this._updateReadOnlyState()
            }
            if (this.option("fullScreen")) {
                this._updateFullscreenState()
            }
            this._diagramInstance.barManager.registerBar(this.optionsUpdateBar);
            if ((0, _window.hasWindow)()) {
                _resize_callbacks2.default.add(function() {
                    _this._killBrowserResizeTimer();
                    _this._browserResizeTimer = setTimeout(function() {
                        return _this._processBrowserResize()
                    }, 100)
                })
            }
            this._setCustomCommandChecked(_diagram7.default.SHOW_PROPERTIES_PANEL_COMMAND_NAME, this._isPropertiesPanelVisible());
            this._setCustomCommandChecked(_diagram7.default.SHOW_TOOLBOX_COMMAND_NAME, this._isToolboxVisible())
        }
    }, {
        key: "_processBrowserResize",
        value: function() {
            this._isMobileScreenSize = void 0;
            this._processDiagramResize();
            this._killBrowserResizeTimer()
        }
    }, {
        key: "_processDiagramResize",
        value: function() {
            this._historyToolbarResizeCallback.call(this);
            this._propertiesToolbarResizeCallback.call(this);
            this._propertiesPanelResizeCallback.call(this);
            this._viewToolbarResizeCallback.call(this);
            this._toolboxResizeCallback.call(this)
        }
    }, {
        key: "_killBrowserResizeTimer",
        value: function() {
            if (this._browserResizeTimer > -1) {
                clearTimeout(this._browserResizeTimer)
            }
            this._browserResizeTimer = -1
        }
    }, {
        key: "isMobileScreenSize",
        value: function() {
            if (void 0 !== this._isMobileScreenSize) {
                return this._isMobileScreenSize
            }
            return this._isMobileScreenSize = (0, _window.hasWindow)() && (0, _window.getWindow)().innerWidth < DIAGRAM_MAX_MOBILE_WINDOW_WIDTH
        }
    }, {
        key: "notifyBarCommandExecuted",
        value: function() {
            this._diagramInstance.captureFocus()
        }
    }, {
        key: "_registerToolbar",
        value: function(component) {
            this._registerBar(component);
            this._toolbars.push(component)
        }
    }, {
        key: "_registerBar",
        value: function(component) {
            component.bar.onChanged.add(this);
            this._diagramInstance.barManager.registerBar(component.bar)
        }
    }, {
        key: "_getExcludeCommands",
        value: function() {
            var excludeCommands = [];
            if (!this._isToolboxEnabled()) {
                excludeCommands.push(_diagram7.default.SHOW_TOOLBOX_COMMAND_NAME)
            }
            if (!this._isPropertiesPanelEnabled()) {
                excludeCommands.push(_diagram7.default.SHOW_PROPERTIES_PANEL_COMMAND_NAME)
            }
            return excludeCommands
        }
    }, {
        key: "_getToolbarBaseOptions",
        value: function() {
            var _this2 = this;
            return {
                onContentReady: function(_ref) {
                    var component = _ref.component;
                    return _this2._registerToolbar(component)
                },
                onSubMenuVisibilityChanging: function(_ref2) {
                    var component = _ref2.component;
                    return _this2._diagramInstance.barManager.updateBarItemsState(component.bar)
                },
                onPointerUp: this._onPanelPointerUp.bind(this),
                "export": this.option("export"),
                excludeCommands: this._getExcludeCommands(),
                onCustomCommand: this._onCustomCommand.bind(this),
                isMobileView: this.isMobileScreenSize()
            }
        }
    }, {
        key: "_onCustomCommand",
        value: function(e) {
            switch (e.command) {
                case _diagram7.default.SHOW_TOOLBOX_COMMAND_NAME:
                    if (this._toolbox) {
                        this._toolbox.toggle()
                    }
                    break;
                case _diagram7.default.SHOW_PROPERTIES_PANEL_COMMAND_NAME:
                    if (this._propertiesPanel) {
                        this._propertiesPanel.toggle()
                    }
                    break;
                default:
                    this._customCommandAction({
                        name: e.command
                    })
            }
        }
    }, {
        key: "_renderMainToolbar",
        value: function() {
            var $toolbarWrapper = (0, _renderer2.default)("<div>").addClass(DIAGRAM_TOOLBAR_WRAPPER_CLASS).appendTo(this.$element());
            this._mainToolbar = this._createComponent($toolbarWrapper, _uiDiagram4.default, (0, _extend.extend)(this._getToolbarBaseOptions(), {
                commands: this.option("mainToolbar.commands"),
                skipAdjustSize: true
            }))
        }
    }, {
        key: "_isHistoryToolbarVisible",
        value: function() {
            return this.option("historyToolbar.visible") && !this.option("readOnly") && !this.option("disabled")
        }
    }, {
        key: "_renderHistoryToolbar",
        value: function($parent) {
            var _this3 = this;
            var isServerSide = !(0, _window.hasWindow)();
            var $container = (0, _renderer2.default)("<div>").addClass(DIAGRAM_FLOATING_TOOLBAR_CONTAINER_CLASS).appendTo($parent);
            this._historyToolbar = this._createComponent($container, _uiDiagram6.default, (0, _extend.extend)(this._getToolbarBaseOptions(), {
                commands: this.option("historyToolbar.commands"),
                locateInMenu: "never"
            }));
            this._updateHistoryToolbarPosition($container, $parent, isServerSide);
            this._historyToolbarResizeCallback = function() {
                _this3._historyToolbar.option("isMobileView", _this3.isMobileScreenSize())
            }
        }
    }, {
        key: "_updateHistoryToolbarPosition",
        value: function($container, $parent, isServerSide) {
            if (isServerSide) {
                return
            }
            _position2.default.setup($container, {
                my: "left top",
                at: "left top",
                of: $parent,
                offset: DIAGRAM_FLOATING_PANEL_OFFSET + " " + DIAGRAM_FLOATING_PANEL_OFFSET
            })
        }
    }, {
        key: "_isToolboxEnabled",
        value: function() {
            return "disabled" !== this.option("toolbox.visibility") && !this.option("readOnly") && !this.option("disabled")
        }
    }, {
        key: "_isToolboxVisible",
        value: function() {
            return "visible" === this.option("toolbox.visibility") || "auto" === this.option("toolbox.visibility") && !this.isMobileScreenSize()
        }
    }, {
        key: "_renderToolbox",
        value: function($parent) {
            var _this4 = this;
            var isServerSide = !(0, _window.hasWindow)();
            var $toolBox = (0, _renderer2.default)("<div>").appendTo($parent);
            var bounds = this._getToolboxBounds($parent, isServerSide);
            this._toolbox = this._createComponent($toolBox, _uiDiagram20.default, {
                isMobileView: this.isMobileScreenSize(),
                isVisible: this._isToolboxVisible(),
                container: this.$element(),
                height: bounds.height,
                offsetParent: $parent,
                offsetX: bounds.offsetX,
                offsetY: bounds.offsetY,
                toolboxGroups: this._getToolboxGroups(),
                onShapeCategoryRendered: function(e) {
                    if (isServerSide) {
                        return
                    }
                    _this4._diagramInstance.createToolbox(e.$element[0], "texts" === e.displayMode, e.shapes || e.category, {
                        shapeIconSpacing: DIAGRAM_TOOLBOX_ITEM_SPACING,
                        shapeIconCountInRow: DIAGRAM_TOOLBOX_ITEM_COUNT_IN_ROW,
                        shapeIconAttributes: {
                            "data-toggle": e.dataToggle
                        }
                    })
                },
                onFilterChanged: function(e) {
                    if (isServerSide) {
                        return
                    }
                    _this4._diagramInstance.applyToolboxFilter(e.text, e.filteringToolboxes)
                },
                onVisibilityChanging: function(e) {
                    if (isServerSide) {
                        return
                    }
                    _this4._setCustomCommandChecked(_diagram7.default.SHOW_TOOLBOX_COMMAND_NAME, e.visible);
                    if (_this4._propertiesPanel) {
                        if (e.visible && _this4.isMobileScreenSize()) {
                            _this4._propertiesPanel.hide()
                        }
                    }
                    if (_this4._historyToolbar) {
                        if (e.visible && _this4.isMobileScreenSize()) {
                            _this4._historyToolbarZIndex = zIndexPool.create(_ui4.default.baseZIndex());
                            _this4._historyToolbar.$element().css("zIndex", _this4._historyToolbarZIndex);
                            _this4._historyToolbar.$element().css("boxShadow", "none")
                        }
                    }
                },
                onVisibilityChanged: function(e) {
                    if (isServerSide) {
                        return
                    }
                    if (_this4._historyToolbar) {
                        if (!e.visible && _this4.isMobileScreenSize() && _this4._historyToolbarZIndex) {
                            zIndexPool.remove(_this4._historyToolbarZIndex);
                            _this4._historyToolbar.$element().css("zIndex", "");
                            _this4._historyToolbar.$element().css("boxShadow", "");
                            _this4._historyToolbarZIndex = void 0
                        }
                    }
                },
                onPointerUp: this._onPanelPointerUp.bind(this)
            });
            this._toolboxResizeCallback = function() {
                var bounds = _this4._getToolboxBounds($parent, isServerSide);
                _this4._toolbox.option("height", bounds.height);
                var prevIsMobileView = _this4._toolbox.option("isMobileView");
                if (prevIsMobileView !== _this4.isMobileScreenSize()) {
                    _this4._toolbox.option({
                        isMobileView: _this4.isMobileScreenSize(),
                        isVisible: _this4._isToolboxVisible()
                    });
                    _this4._setCustomCommandChecked(_diagram7.default.SHOW_TOOLBOX_COMMAND_NAME, _this4._isToolboxVisible())
                }
                _this4._toolbox.updateMaxHeight()
            }
        }
    }, {
        key: "_getToolboxBounds",
        value: function($parent, isServerSide) {
            var result = {
                offsetX: DIAGRAM_FLOATING_PANEL_OFFSET,
                offsetY: DIAGRAM_FLOATING_PANEL_OFFSET,
                height: !isServerSide ? $parent.height() - 2 * DIAGRAM_FLOATING_PANEL_OFFSET : 0
            };
            if (this._historyToolbar && !isServerSide) {
                result.offsetY += this._historyToolbar.$element().outerHeight() + DIAGRAM_FLOATING_PANEL_OFFSET;
                result.height -= this._historyToolbar.$element().outerHeight() + DIAGRAM_FLOATING_PANEL_OFFSET
            }
            if (this._viewToolbar && !isServerSide) {
                result.height -= this._viewToolbar.$element().outerHeight() + this._getViewToolbarYOffset(isServerSide)
            }
            return result
        }
    }, {
        key: "_renderViewToolbar",
        value: function($parent) {
            var _this5 = this;
            var isServerSide = !(0, _window.hasWindow)();
            var $container = (0, _renderer2.default)("<div>").addClass(DIAGRAM_FLOATING_TOOLBAR_CONTAINER_CLASS).appendTo($parent);
            this._viewToolbar = this._createComponent($container, _uiDiagram8.default, (0, _extend.extend)(this._getToolbarBaseOptions(), {
                commands: this.option("viewToolbar.commands"),
                locateInMenu: "never"
            }));
            this._updateViewToolbarPosition($container, $parent, isServerSide);
            this._viewToolbarResizeCallback = function() {
                _this5._updateViewToolbarPosition($container, $parent, isServerSide)
            }
        }
    }, {
        key: "_getViewToolbarYOffset",
        value: function(isServerSide) {
            if (isServerSide) {
                return
            }
            var result = DIAGRAM_FLOATING_PANEL_OFFSET;
            if (this._viewToolbar && this._propertiesToolbar) {
                result += (this._propertiesToolbar.$element().outerHeight() - this._viewToolbar.$element().outerHeight()) / 2
            }
            return result
        }
    }, {
        key: "_updateViewToolbarPosition",
        value: function($container, $parent, isServerSide) {
            if (isServerSide) {
                return
            }
            _position2.default.setup($container, {
                my: "left bottom",
                at: "left bottom",
                of: $parent,
                offset: DIAGRAM_FLOATING_PANEL_OFFSET + " -" + this._getViewToolbarYOffset(isServerSide)
            })
        }
    }, {
        key: "_isPropertiesPanelEnabled",
        value: function() {
            return "disabled" !== this.option("propertiesPanel.visibility") && !this.option("readOnly") && !this.option("disabled")
        }
    }, {
        key: "_isPropertiesPanelVisible",
        value: function() {
            return "visible" === this.option("propertiesPanel.visibility")
        }
    }, {
        key: "_renderPropertiesToolbar",
        value: function($parent) {
            var _this6 = this;
            var isServerSide = !(0, _window.hasWindow)();
            var $container = (0, _renderer2.default)("<div>").addClass(DIAGRAM_FLOATING_TOOLBAR_CONTAINER_CLASS).addClass(DIAGRAM_PROPERTIES_PANEL_TOOLBAR_CONTAINER_CLASS).appendTo($parent);
            this._propertiesToolbar = this._createComponent($container, _uiDiagram10.default, (0, _extend.extend)(this._getToolbarBaseOptions(), {
                buttonStylingMode: "contained",
                buttonType: "default",
                locateInMenu: "never"
            }));
            this._updatePropertiesToolbarPosition($container, $parent, isServerSide);
            this._propertiesToolbarResizeCallback = function() {
                _this6._updatePropertiesToolbarPosition($container, $parent, isServerSide)
            }
        }
    }, {
        key: "_updatePropertiesToolbarPosition",
        value: function($container, $parent, isServerSide) {
            if (isServerSide) {
                return
            }
            _position2.default.setup($container, {
                my: "right bottom",
                at: "right bottom",
                of: $parent,
                offset: "-" + DIAGRAM_FLOATING_PANEL_OFFSET + " -" + DIAGRAM_FLOATING_PANEL_OFFSET
            })
        }
    }, {
        key: "_renderPropertiesPanel",
        value: function($parent) {
            var _this7 = this;
            var isServerSide = !(0, _window.hasWindow)();
            var $propertiesPanel = (0, _renderer2.default)("<div>").appendTo($parent);
            var offsetX = DIAGRAM_FLOATING_PANEL_OFFSET;
            var offsetY = 2 * DIAGRAM_FLOATING_PANEL_OFFSET + (!isServerSide ? this._propertiesToolbar.$element().outerHeight() : 0);
            this._propertiesPanel = this._createComponent($propertiesPanel, _uiDiagram22.default, {
                isMobileView: this.isMobileScreenSize(),
                isVisible: this._isPropertiesPanelVisible(),
                container: this.$element(),
                offsetParent: $parent,
                offsetX: offsetX,
                offsetY: offsetY,
                propertyTabs: this.option("propertiesPanel.tabs"),
                onCreateToolbar: function(e) {
                    e.toolbar = _this7._createComponent(e.$parent, _uiDiagram2.default, (0, _extend.extend)(_this7._getToolbarBaseOptions(), {
                        commands: e.commands,
                        locateInMenu: "never",
                        editorStylingMode: "outlined"
                    }))
                },
                onVisibilityChanging: function(e) {
                    if (isServerSide) {
                        return
                    }
                    _this7._updatePropertiesPanelGroupBars(e.component);
                    _this7._setCustomCommandChecked(_diagram7.default.SHOW_PROPERTIES_PANEL_COMMAND_NAME, e.visible);
                    if (_this7._toolbox) {
                        if (e.visible && _this7.isMobileScreenSize()) {
                            _this7._toolbox.hide()
                        }
                    }
                },
                onSelectedGroupChanged: function(_ref3) {
                    var component = _ref3.component;
                    return _this7._updatePropertiesPanelGroupBars(component)
                },
                onPointerUp: this._onPanelPointerUp.bind(this)
            });
            this._propertiesPanelResizeCallback = function() {
                var prevIsMobileView = _this7._propertiesPanel.option("isMobileView");
                if (prevIsMobileView !== _this7.isMobileScreenSize()) {
                    _this7._propertiesPanel.option({
                        isMobileView: _this7.isMobileScreenSize(),
                        isVisible: _this7._isPropertiesPanelVisible()
                    });
                    _this7._setCustomCommandChecked(_diagram7.default.SHOW_PROPERTIES_PANEL_COMMAND_NAME, _this7._isPropertiesPanelVisible())
                }
            }
        }
    }, {
        key: "_updatePropertiesPanelGroupBars",
        value: function(component) {
            var _this8 = this;
            component.getActiveToolbars().forEach(function(toolbar) {
                _this8._diagramInstance.barManager.updateBarItemsState(toolbar.bar)
            })
        }
    }, {
        key: "_onPanelPointerUp",
        value: function() {
            var _this9 = this;
            this._captureFocusTimeout = setTimeout(function() {
                _this9._diagramInstance.captureFocus();
                delete _this9._captureFocusTimeout
            }, 100)
        }
    }, {
        key: "_killCaptureFocusTimeout",
        value: function() {
            if (this._captureFocusTimeout) {
                clearTimeout(this._captureFocusTimeout);
                delete this._captureFocusTimeout
            }
        }
    }, {
        key: "_renderContextMenu",
        value: function($mainElement) {
            var _this10 = this;
            var $contextMenu = (0, _renderer2.default)("<div>").appendTo(this.$element());
            this._contextMenu = this._createComponent($contextMenu, _uiDiagram12.default, {
                commands: this.option("contextMenu.commands"),
                container: $mainElement,
                onContentReady: function(_ref4) {
                    var component = _ref4.component;
                    return _this10._registerBar(component)
                },
                onVisibilityChanging: function(_ref5) {
                    var component = _ref5.component;
                    return _this10._diagramInstance.barManager.updateBarItemsState(component.bar)
                },
                onItemClick: function(itemData) {
                    return _this10._onBeforeCommandExecuted(itemData.command)
                },
                "export": this.option("export"),
                excludeCommands: this._getExcludeCommands(),
                onCustomCommand: this._onCustomCommand.bind(this)
            })
        }
    }, {
        key: "_renderContextToolbox",
        value: function($mainElement) {
            var _this11 = this;
            var isServerSide = !(0, _window.hasWindow)();
            var category = this.option("contextToolbox.category");
            var displayMode = this.option("contextToolbox.displayMode");
            var shapes = this.option("contextToolbox.shapes");
            var $contextToolbox = (0, _renderer2.default)("<div>").appendTo(this.$element());
            this._contextToolbox = this._createComponent($contextToolbox, _uiDiagram14.default, {
                onShown: function(e) {
                    if (isServerSide) {
                        return
                    }
                    var $toolboxContainer = (0, _renderer2.default)(e.$element);
                    var isTextGroup = "texts" === displayMode;
                    if (!shapes && !category && !isTextGroup) {
                        var group = _this11._getToolboxGroups().filter(function(g) {
                            return g.category === e.category
                        })[0];
                        if (group) {
                            isTextGroup = "texts" === group.displayMode
                        }
                    }
                    _this11._diagramInstance.createContextToolbox($toolboxContainer[0], isTextGroup, shapes || category || e.category, {
                        shapeIconSpacing: DIAGRAM_TOOLBOX_ITEM_SPACING,
                        shapeIconCountInRow: DIAGRAM_CONTEXT_TOOLBOX_ITEM_COUNT_IN_ROW
                    }, function(shapeType) {
                        e.callback(shapeType);
                        _this11._diagramInstance.captureFocus();
                        e.hide()
                    })
                }
            })
        }
    }, {
        key: "_setCustomCommandChecked",
        value: function(command, checked) {
            this._toolbars.forEach(function(tb) {
                tb.setCommandChecked(command, checked)
            })
        }
    }, {
        key: "_onBeforeCommandExecuted",
        value: function(command) {
            var dialogParameters = _uiDiagram24.default.getDialogParameters(command);
            if (dialogParameters) {
                this._showDialog(dialogParameters)
            }
            return !!dialogParameters
        }
    }, {
        key: "_renderDialog",
        value: function($mainElement) {
            var $dialogElement = (0, _renderer2.default)("<div>").appendTo($mainElement);
            this._dialogInstance = this._createComponent($dialogElement, _uiDiagram16.default, {})
        }
    }, {
        key: "_showDialog",
        value: function(dialogParameters) {
            if (this._dialogInstance) {
                this._dialogInstance.option("onGetContent", dialogParameters.onGetContent);
                this._dialogInstance.option("onHidden", function() {
                    this._diagramInstance.captureFocus()
                }.bind(this));
                this._dialogInstance.option("command", this._diagramInstance.commandManager.getCommand(dialogParameters.command));
                this._dialogInstance.option("title", dialogParameters.title);
                this._dialogInstance._show()
            }
        }
    }, {
        key: "_showLoadingIndicator",
        value: function() {
            this._loadingIndicator = (0, _renderer2.default)("<div>").addClass(DIAGRAM_LOADING_INDICATOR_CLASS);
            this._createComponent(this._loadingIndicator, _load_indicator2.default, {});
            var $parent = this._$content || this.$element();
            $parent.append(this._loadingIndicator)
        }
    }, {
        key: "_hideLoadingIndicator",
        value: function() {
            if (!this._loadingIndicator) {
                return
            }
            this._loadingIndicator.remove();
            this._loadingIndicator = null
        }
    }, {
        key: "_initDiagram",
        value: function() {
            var _getDiagram = (0, _diagram.getDiagram)(),
                DiagramControl = _getDiagram.DiagramControl;
            this._diagramInstance = new DiagramControl;
            this._diagramInstance.onChanged = this._raiseDataChangeAction.bind(this);
            this._diagramInstance.onEdgeInserted = this._raiseEdgeInsertedAction.bind(this);
            this._diagramInstance.onEdgeUpdated = this._raiseEdgeUpdatedAction.bind(this);
            this._diagramInstance.onEdgeRemoved = this._raiseEdgeRemovedAction.bind(this);
            this._diagramInstance.onNodeInserted = this._raiseNodeInsertedAction.bind(this);
            this._diagramInstance.onNodeUpdated = this._raiseNodeUpdatedAction.bind(this);
            this._diagramInstance.onNodeRemoved = this._raiseNodeRemovedAction.bind(this);
            this._diagramInstance.onToolboxDragStart = this._raiseToolboxDragStart.bind(this);
            this._diagramInstance.onToolboxDragEnd = this._raiseToolboxDragEnd.bind(this);
            this._diagramInstance.onTextInputStart = this._raiseTextInputStart.bind(this);
            this._diagramInstance.onTextInputEnd = this._raiseTextInputEnd.bind(this);
            this._diagramInstance.onToggleFullscreen = this._onToggleFullScreen.bind(this);
            this._diagramInstance.onShowContextMenu = this._onShowContextMenu.bind(this);
            this._diagramInstance.onHideContextMenu = this._onHideContextMenu.bind(this);
            this._diagramInstance.onShowContextToolbox = this._onShowContextToolbox.bind(this);
            this._diagramInstance.onHideContextToolbox = this._onHideContextToolbox.bind(this);
            this._diagramInstance.onNativeAction.add({
                notifyItemClick: this._raiseItemClickAction.bind(this),
                notifyItemDblClick: this._raiseItemDblClickAction.bind(this),
                notifySelectionChanged: this._raiseSelectionChanged.bind(this)
            });
            this._updateEventSubscriptionMethods();
            this._updateShapeTexts();
            this._updateUnitItems();
            this._updateFormatUnitsMethod();
            if (this.option("units") !== DIAGRAM_DEFAULT_UNIT) {
                this._updateUnitsState()
            }
            if (this.option("pageSize")) {
                if (this.option("pageSize.items")) {
                    this._updatePageSizeItemsState()
                }
                if (this.option("pageSize.width") && this.option("pageSize.height")) {
                    this._updatePageSizeState()
                }
            }
            if (this.option("pageOrientation") !== DIAGRAM_DEFAULT_PAGE_ORIENTATION) {
                this._updatePageOrientationState()
            }
            if (this.option("pageColor") !== DIAGRAM_DEFAULT_PAGE_COLOR) {
                this._updatePageColorState()
            }
            if (this.option("viewUnits") !== DIAGRAM_DEFAULT_UNIT) {
                this._updateViewUnitsState()
            }
            if (!this.option("showGrid")) {
                this._updateShowGridState()
            }
            if (!this.option("snapToGrid")) {
                this._updateSnapToGridState()
            }
            if (this.option("gridSize")) {
                if (this.option("gridSize.items")) {
                    this._updateGridSizeItemsState()
                }
                this._updateGridSizeState()
            }
            if (this.option("zoomLevel.items")) {
                this._updateZoomLevelItemsState()
            }
            this._updateCustomShapes(this._getCustomShapes());
            this._refreshDataSources()
        }
    }, {
        key: "_clean",
        value: function() {
            if (this._diagramInstance) {
                this._diagramInstance.cleanMarkup()
            }
            _get(_getPrototypeOf(Diagram.prototype), "_clean", this).call(this)
        }
    }, {
        key: "_dispose",
        value: function() {
            this._killCaptureFocusTimeout();
            _get(_getPrototypeOf(Diagram.prototype), "_dispose", this).call(this);
            this._diagramInstance = void 0
        }
    }, {
        key: "_executeDiagramCommand",
        value: function(command, parameter) {
            this._diagramInstance.commandManager.getCommand(command).execute(parameter)
        }
    }, {
        key: "_refreshDataSources",
        value: function() {
            this._beginUpdateDiagram();
            this._refreshNodesDataSource();
            this._refreshEdgesDataSource();
            this._endUpdateDiagram()
        }
    }, {
        key: "_refreshNodesDataSource",
        value: function() {
            if (this._nodesOption) {
                this._nodesOption._disposeDataSource();
                delete this._nodesOption
            }
            if (this.option("nodes.dataSource")) {
                this._nodesOption = new _diagram9.default(this);
                this._nodesOption.option("dataSource", this.option("nodes.dataSource"));
                this._nodesOption._refreshDataSource()
            }
        }
    }, {
        key: "_refreshEdgesDataSource",
        value: function() {
            if (this._edgesOption) {
                this._edgesOption._disposeDataSource();
                delete this._edgesOption
            }
            if (this.option("edges.dataSource")) {
                this._edgesOption = new _diagram11.default(this);
                this._edgesOption.option("dataSource", this.option("edges.dataSource"));
                this._edgesOption._refreshDataSource()
            }
        }
    }, {
        key: "_getDiagramData",
        value: function() {
            var value;
            var _getDiagram2 = (0, _diagram.getDiagram)(),
                DiagramCommand = _getDiagram2.DiagramCommand;
            this._executeDiagramCommand(DiagramCommand.Export, function(data) {
                value = data
            });
            return value
        }
    }, {
        key: "_setDiagramData",
        value: function(data, keepExistingItems) {
            var _getDiagram3 = (0, _diagram.getDiagram)(),
                DiagramCommand = _getDiagram3.DiagramCommand;
            this._executeDiagramCommand(DiagramCommand.Import, {
                data: data,
                keepExistingItems: keepExistingItems
            })
        }
    }, {
        key: "_onDataSourceChanged",
        value: function() {
            this._bindDiagramData()
        }
    }, {
        key: "_createOptionGetter",
        value: function(optionName) {
            var expr = this.option(optionName);
            return expr && _data2.default.compileGetter(expr)
        }
    }, {
        key: "_createOptionSetter",
        value: function(optionName) {
            var expr = this.option(optionName);
            if (_type2.default.isFunction(expr)) {
                return expr
            }
            return expr && _data2.default.compileSetter(expr)
        }
    }, {
        key: "_bindDiagramData",
        value: function() {
            if (this._updateDiagramLockCount || !this._isBindingMode()) {
                return
            }
            var _getDiagram4 = (0, _diagram.getDiagram)(),
                DiagramCommand = _getDiagram4.DiagramCommand,
                ConnectorLineOption = _getDiagram4.ConnectorLineOption,
                ConnectorLineEnding = _getDiagram4.ConnectorLineEnding;
            var lineOptionGetter;
            var lineOptionSetter;
            var startLineEndingGetter;
            var startLineEndingSetter;
            var endLineEndingGetter;
            var endLineEndingSetter;
            var data = {
                nodeDataSource: this._nodesOption && this._nodesOption.getItems(),
                edgeDataSource: this._edgesOption && this._edgesOption.getItems(),
                nodeDataImporter: {
                    getKey: this._createOptionGetter("nodes.keyExpr"),
                    setKey: this._createOptionSetter("nodes.keyExpr"),
                    getLocked: this._createOptionGetter("nodes.lockedExpr"),
                    setLocked: this._createOptionSetter("nodes.lockedExpr"),
                    getStyle: this._createOptionGetter("nodes.styleExpr"),
                    setStyle: this._createOptionSetter("nodes.styleExpr"),
                    getStyleText: this._createOptionGetter("nodes.textStyleExpr"),
                    setStyleText: this._createOptionSetter("nodes.textStyleExpr"),
                    getZIndex: this._createOptionGetter("nodes.zIndexExpr"),
                    setZIndex: this._createOptionSetter("nodes.zIndexExpr"),
                    getType: this._createOptionGetter("nodes.typeExpr"),
                    setType: this._createOptionSetter("nodes.typeExpr"),
                    getText: this._createOptionGetter("nodes.textExpr"),
                    setText: this._createOptionSetter("nodes.textExpr"),
                    getImage: this._createOptionGetter("nodes.imageUrlExpr"),
                    setImage: this._createOptionSetter("nodes.imageUrlExpr"),
                    getLeft: this._createOptionGetter("nodes.leftExpr"),
                    setLeft: this._createOptionSetter("nodes.leftExpr"),
                    getTop: this._createOptionGetter("nodes.topExpr"),
                    setTop: this._createOptionSetter("nodes.topExpr"),
                    getWidth: this._createOptionGetter("nodes.widthExpr"),
                    setWidth: this._createOptionSetter("nodes.widthExpr"),
                    getHeight: this._createOptionGetter("nodes.heightExpr"),
                    setHeight: this._createOptionSetter("nodes.heightExpr"),
                    getParentKey: this._createOptionGetter("nodes.parentKeyExpr"),
                    setParentKey: this._createOptionSetter("nodes.parentKeyExpr"),
                    getItems: this._createOptionGetter("nodes.itemsExpr"),
                    setItems: this._createOptionSetter("nodes.itemsExpr"),
                    getContainerKey: this._createOptionGetter("nodes.containerKeyExpr"),
                    setContainerKey: this._createOptionSetter("nodes.containerKeyExpr"),
                    getChildren: this._createOptionGetter("nodes.childrenExpr"),
                    setChildren: this._createOptionSetter("nodes.childrenExpr")
                },
                edgeDataImporter: {
                    getKey: this._createOptionGetter("edges.keyExpr"),
                    setKey: this._createOptionSetter("edges.keyExpr"),
                    getLocked: this._createOptionGetter("edges.lockedExpr"),
                    setLocked: this._createOptionSetter("edges.lockedExpr"),
                    getStyle: this._createOptionGetter("edges.styleExpr"),
                    setStyle: this._createOptionSetter("edges.styleExpr"),
                    getStyleText: this._createOptionGetter("edges.textStyleExpr"),
                    setStyleText: this._createOptionSetter("edges.textStyleExpr"),
                    getZIndex: this._createOptionGetter("edges.zIndexExpr"),
                    setZIndex: this._createOptionSetter("edges.zIndexExpr"),
                    getFrom: this._createOptionGetter("edges.fromExpr"),
                    setFrom: this._createOptionSetter("edges.fromExpr"),
                    getFromPointIndex: this._createOptionGetter("edges.fromPointIndexExpr"),
                    setFromPointIndex: this._createOptionSetter("edges.fromPointIndexExpr"),
                    getTo: this._createOptionGetter("edges.toExpr"),
                    setTo: this._createOptionSetter("edges.toExpr"),
                    getToPointIndex: this._createOptionGetter("edges.toPointIndexExpr"),
                    setToPointIndex: this._createOptionSetter("edges.toPointIndexExpr"),
                    getPoints: this._createOptionGetter("edges.pointsExpr"),
                    setPoints: this._createOptionSetter("edges.pointsExpr"),
                    getText: this._createOptionGetter("edges.textExpr"),
                    setText: this._createOptionSetter("edges.textExpr"),
                    getLineOption: (lineOptionGetter = this._createOptionGetter("edges.lineTypeExpr")) && function(obj) {
                        var lineType = lineOptionGetter(obj);
                        switch (lineType) {
                            case "straight":
                                return ConnectorLineOption.Straight;
                            default:
                                return ConnectorLineOption.Orthogonal
                        }
                    }.bind(this),
                    setLineOption: (lineOptionSetter = this._createOptionSetter("edges.lineTypeExpr")) && function(obj, value) {
                        switch (value) {
                            case ConnectorLineOption.Straight:
                                value = "straight";
                                break;
                            case ConnectorLineOption.Orthogonal:
                                value = "orthogonal"
                        }
                        lineOptionSetter(obj, value)
                    }.bind(this),
                    getStartLineEnding: (startLineEndingGetter = this._createOptionGetter("edges.fromLineEndExpr")) && function(obj) {
                        var lineType = startLineEndingGetter(obj);
                        switch (lineType) {
                            case "arrow":
                                return ConnectorLineEnding.Arrow;
                            default:
                                return ConnectorLineEnding.None
                        }
                    }.bind(this),
                    setStartLineEnding: (startLineEndingSetter = this._createOptionSetter("edges.fromLineEndExpr")) && function(obj, value) {
                        switch (value) {
                            case ConnectorLineEnding.Arrow:
                                value = "arrow";
                                break;
                            case ConnectorLineEnding.None:
                                value = "none"
                        }
                        startLineEndingSetter(obj, value)
                    }.bind(this),
                    getEndLineEnding: (endLineEndingGetter = this._createOptionGetter("edges.toLineEndExpr")) && function(obj) {
                        var lineType = endLineEndingGetter(obj);
                        switch (lineType) {
                            case "none":
                                return ConnectorLineEnding.None;
                            default:
                                return ConnectorLineEnding.Arrow
                        }
                    }.bind(this),
                    setEndLineEnding: (endLineEndingSetter = this._createOptionSetter("edges.toLineEndExpr")) && function(obj, value) {
                        switch (value) {
                            case ConnectorLineEnding.Arrow:
                                value = "arrow";
                                break;
                            case ConnectorLineEnding.None:
                                value = "none"
                        }
                        endLineEndingSetter(obj, value)
                    }.bind(this)
                },
                layoutParameters: this._getDataBindingLayoutParameters()
            };
            this._executeDiagramCommand(DiagramCommand.BindDocument, data)
        }
    }, {
        key: "_getDataBindingLayoutParameters",
        value: function() {
            var _getDiagram5 = (0, _diagram.getDiagram)(),
                DataLayoutType = _getDiagram5.DataLayoutType,
                DataLayoutOrientation = _getDiagram5.DataLayoutOrientation;
            var layoutParametersOption = this.option("nodes.autoLayout") || "off";
            var layoutType = layoutParametersOption.type || layoutParametersOption;
            if ("off" === layoutType || "auto" === layoutType && this._hasNodePositionExprs()) {
                return
            } else {
                var parameters = {};
                switch (layoutType) {
                    case "tree":
                        parameters.type = DataLayoutType.Tree;
                        break;
                    default:
                        parameters.type = DataLayoutType.Sugiyama
                }
                switch (layoutParametersOption.orientation) {
                    case "vertical":
                        parameters.orientation = DataLayoutOrientation.Vertical;
                        break;
                    case "horizontal":
                        parameters.orientation = DataLayoutOrientation.Horizontal
                }
                if (this.option("edges.fromPointIndexExpr") || this.option("edges.toPointIndexExpr")) {
                    parameters.skipPointIndices = true
                }
                return parameters
            }
        }
    }, {
        key: "_hasNodePositionExprs",
        value: function() {
            return this.option("nodes.topExpr") && this.option("nodes.leftExpr")
        }
    }, {
        key: "_getAutoZoomValue",
        value: function(option) {
            var _getDiagram6 = (0, _diagram.getDiagram)(),
                AutoZoomMode = _getDiagram6.AutoZoomMode;
            switch (option) {
                case "fitContent":
                    return AutoZoomMode.FitContent;
                case "fitWidth":
                    return AutoZoomMode.FitToWidth;
                default:
                    return AutoZoomMode.Disabled
            }
        }
    }, {
        key: "_isBindingMode",
        value: function() {
            return this._nodesOption && this._nodesOption.hasItems() || this._edgesOption && this._nodesOption.hasItems()
        }
    }, {
        key: "_beginUpdateDiagram",
        value: function() {
            this._updateDiagramLockCount++
        }
    }, {
        key: "_endUpdateDiagram",
        value: function() {
            this._updateDiagramLockCount = Math.max(this._updateDiagramLockCount - 1, 0);
            if (!this._updateDiagramLockCount) {
                this._bindDiagramData()
            }
        }
    }, {
        key: "_getCustomShapes",
        value: function() {
            return this.option("customShapes") || []
        }
    }, {
        key: "_getToolboxGroups",
        value: function() {
            return _diagram3.default.getGroups(this.option("toolbox.groups"))
        }
    }, {
        key: "_updateCustomShapes",
        value: function(customShapes, prevCustomShapes) {
            var _this12 = this;
            if (Array.isArray(prevCustomShapes)) {
                this._diagramInstance.removeCustomShapes(prevCustomShapes.map(function(s) {
                    return s.type
                }))
            }
            if (Array.isArray(customShapes)) {
                this._diagramInstance.addCustomShapes(customShapes.map(function(s) {
                    var templateOption = s.template || _this12.option("customShapeTemplate");
                    var template = templateOption && _this12._getTemplate(templateOption);
                    return {
                        category: s.category,
                        type: s.type,
                        baseType: s.baseType,
                        title: s.title,
                        svgUrl: s.backgroundImageUrl,
                        svgToolboxUrl: s.backgroundImageToolboxUrl,
                        svgLeft: s.backgroundImageLeft,
                        svgTop: s.backgroundImageTop,
                        svgWidth: s.backgroundImageWidth,
                        svgHeight: s.backgroundImageHeight,
                        defaultWidth: s.defaultWidth,
                        defaultHeight: s.defaultHeight,
                        minWidth: s.minWidth,
                        minHeight: s.minHeight,
                        maxWidth: s.maxWidth,
                        maxHeight: s.maxHeight,
                        allowResize: s.allowResize,
                        defaultText: s.defaultText,
                        allowEditText: s.allowEditText,
                        textLeft: s.textLeft,
                        textTop: s.textTop,
                        textWidth: s.textWidth,
                        textHeight: s.textHeight,
                        defaultImageUrl: s.defaultImageUrl,
                        allowEditImage: s.allowEditImage,
                        imageLeft: s.imageLeft,
                        imageTop: s.imageTop,
                        imageWidth: s.imageWidth,
                        imageHeight: s.imageHeight,
                        connectionPoints: s.connectionPoints && s.connectionPoints.map(function(pt) {
                            return {
                                x: pt.x,
                                y: pt.y
                            }
                        }),
                        createTemplate: template && function(container, item) {
                            template.render({
                                model: _this12._nativeItemToDiagramItem(item),
                                container: _dom2.default.getPublicElement((0, _renderer2.default)(container))
                            })
                        },
                        templateLeft: s.templateLeft,
                        templateTop: s.templateTop,
                        templateWidth: s.templateWidth,
                        templateHeight: s.templateHeight
                    }
                }))
            }
        }
    }, {
        key: "_onToggleFullScreen",
        value: function(fullScreen) {
            this._changeNativeFullscreen(fullScreen);
            this.$element().toggleClass(DIAGRAM_FULLSCREEN_CLASS, fullScreen);
            this._diagramInstance.updateLayout();
            this._processDiagramResize();
            if (this._toolbox) {
                this._toolbox.repaint()
            }
            if (this._propertiesPanel) {
                this._propertiesPanel.repaint()
            }
        }
    }, {
        key: "_changeNativeFullscreen",
        value: function(setModeOn) {
            var window = (0, _window.getWindow)();
            if (window.self === window.top || setModeOn === this._inNativeFullscreen()) {
                return
            }
            if (setModeOn) {
                this._subscribeFullscreenNativeChanged()
            } else {
                this._unsubscribeFullscreenNativeChanged()
            }
            this._setNativeFullscreen(setModeOn)
        }
    }, {
        key: "_setNativeFullscreen",
        value: function(on) {
            var window = (0, _window.getWindow)();
            var document = window.self.document;
            var body = window.self.document.body;
            if (on) {
                if (body.requestFullscreen) {
                    body.requestFullscreen()
                } else {
                    if (body.mozRequestFullscreen) {
                        body.mozRequestFullscreen()
                    } else {
                        if (body.webkitRequestFullscreen) {
                            body.webkitRequestFullscreen()
                        } else {
                            if (body.msRequestFullscreen) {
                                body.msRequestFullscreen()
                            }
                        }
                    }
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen()
                } else {
                    if (document.mozCancelFullscreen) {
                        document.mozCancelFullscreen()
                    } else {
                        if (document.webkitExitFullscreen) {
                            document.webkitExitFullscreen()
                        } else {
                            if (document.msExitFullscreen) {
                                document.msExitFullscreen()
                            }
                        }
                    }
                }
            }
        }
    }, {
        key: "_inNativeFullscreen",
        value: function() {
            var document = (0, _window.getWindow)().document;
            var fullscreenElement = document.fullscreenElement || document.msFullscreenElement || document.webkitFullscreenElement;
            var isInFullscreen = fullscreenElement === document.body || document.webkitIsFullscreen;
            return !!isInFullscreen
        }
    }, {
        key: "_subscribeFullscreenNativeChanged",
        value: function() {
            var document = (0, _window.getWindow)().document;
            var handler = this._onNativeFullscreenChangeHandler.bind(this);
            _events_engine2.default.on(document, FULLSCREEN_CHANGE_EVENT_NAME, handler);
            _events_engine2.default.on(document, IE_FULLSCREEN_CHANGE_EVENT_NAME, handler);
            _events_engine2.default.on(document, WEBKIT_FULLSCREEN_CHANGE_EVENT_NAME, handler);
            _events_engine2.default.on(document, MOZ_FULLSCREEN_CHANGE_EVENT_NAME, handler)
        }
    }, {
        key: "_unsubscribeFullscreenNativeChanged",
        value: function() {
            var document = (0, _window.getWindow)().document;
            _events_engine2.default.off(document, FULLSCREEN_CHANGE_EVENT_NAME);
            _events_engine2.default.off(document, IE_FULLSCREEN_CHANGE_EVENT_NAME);
            _events_engine2.default.off(document, WEBKIT_FULLSCREEN_CHANGE_EVENT_NAME);
            _events_engine2.default.off(document, MOZ_FULLSCREEN_CHANGE_EVENT_NAME)
        }
    }, {
        key: "_onNativeFullscreenChangeHandler",
        value: function() {
            if (!this._inNativeFullscreen()) {
                this._unsubscribeFullscreenNativeChanged();
                this._onToggleFullScreen(false)
            }
        }
    }, {
        key: "_onShowContextMenu",
        value: function(x, y, selection) {
            if (this._contextMenu) {
                this._contextMenu._show(x, y, selection)
            }
        }
    }, {
        key: "_onHideContextMenu",
        value: function() {
            if (this._contextMenu) {
                this._contextMenu._hide()
            }
        }
    }, {
        key: "_onShowContextToolbox",
        value: function(x, y, side, category, callback) {
            if (this._contextToolbox) {
                this._contextToolbox._show(x, y, side, category, callback)
            }
        }
    }, {
        key: "_onHideContextToolbox",
        value: function() {
            if (this._contextToolbox) {
                this._contextToolbox._hide()
            }
        }
    }, {
        key: "_getDiagramUnitValue",
        value: function(value) {
            var _getDiagram7 = (0, _diagram.getDiagram)(),
                DiagramUnit = _getDiagram7.DiagramUnit;
            switch (value) {
                case "in":
                    return DiagramUnit.In;
                case "cm":
                    return DiagramUnit.Cm;
                case "px":
                    return DiagramUnit.Px;
                default:
                    return DiagramUnit.In
            }
        }
    }, {
        key: "_updateReadOnlyState",
        value: function() {
            var _getDiagram8 = (0, _diagram.getDiagram)(),
                DiagramCommand = _getDiagram8.DiagramCommand;
            var readOnly = this.option("readOnly") || this.option("disabled");
            this._executeDiagramCommand(DiagramCommand.ToggleReadOnly, readOnly);
            this._setToolboxVisible(!readOnly)
        }
    }, {
        key: "_updateZoomLevelState",
        value: function() {
            var zoomLevel = this.option("zoomLevel.value");
            if (!zoomLevel) {
                zoomLevel = this.option("zoomLevel")
            }
            var _getDiagram9 = (0, _diagram.getDiagram)(),
                DiagramCommand = _getDiagram9.DiagramCommand;
            this._executeDiagramCommand(DiagramCommand.ZoomLevel, zoomLevel)
        }
    }, {
        key: "_updateZoomLevelItemsState",
        value: function() {
            var zoomLevelItems = this.option("zoomLevel.items");
            if (!Array.isArray(zoomLevelItems)) {
                return
            }
            var _getDiagram10 = (0, _diagram.getDiagram)(),
                DiagramCommand = _getDiagram10.DiagramCommand;
            this._executeDiagramCommand(DiagramCommand.ZoomLevelItems, zoomLevelItems)
        }
    }, {
        key: "_updateAutoZoomState",
        value: function() {
            var _getDiagram11 = (0, _diagram.getDiagram)(),
                DiagramCommand = _getDiagram11.DiagramCommand;
            this._executeDiagramCommand(DiagramCommand.SwitchAutoZoom, this._getAutoZoomValue(this.option("autoZoomMode")))
        }
    }, {
        key: "_updateSimpleViewState",
        value: function() {
            var _getDiagram12 = (0, _diagram.getDiagram)(),
                DiagramCommand = _getDiagram12.DiagramCommand;
            this._executeDiagramCommand(DiagramCommand.ToggleSimpleView, this.option("simpleView"))
        }
    }, {
        key: "_updateFullscreenState",
        value: function() {
            var _getDiagram13 = (0, _diagram.getDiagram)(),
                DiagramCommand = _getDiagram13.DiagramCommand;
            var fullScreen = this.option("fullScreen");
            this._executeDiagramCommand(DiagramCommand.Fullscreen, fullScreen);
            this._onToggleFullScreen(fullScreen)
        }
    }, {
        key: "_updateShowGridState",
        value: function() {
            var _getDiagram14 = (0, _diagram.getDiagram)(),
                DiagramCommand = _getDiagram14.DiagramCommand;
            this._executeDiagramCommand(DiagramCommand.ShowGrid, this.option("showGrid"))
        }
    }, {
        key: "_updateSnapToGridState",
        value: function() {
            var _getDiagram15 = (0, _diagram.getDiagram)(),
                DiagramCommand = _getDiagram15.DiagramCommand;
            this._executeDiagramCommand(DiagramCommand.SnapToGrid, this.option("snapToGrid"))
        }
    }, {
        key: "_updateGridSizeState",
        value: function() {
            var gridSize = this.option("gridSize.value");
            if (!gridSize) {
                gridSize = this.option("gridSize")
            }
            var _getDiagram16 = (0, _diagram.getDiagram)(),
                DiagramCommand = _getDiagram16.DiagramCommand;
            this._executeDiagramCommand(DiagramCommand.GridSize, gridSize)
        }
    }, {
        key: "_updateGridSizeItemsState",
        value: function() {
            var gridSizeItems = this.option("gridSize.items");
            if (!Array.isArray(gridSizeItems)) {
                return
            }
            var _getDiagram17 = (0, _diagram.getDiagram)(),
                DiagramCommand = _getDiagram17.DiagramCommand;
            this._executeDiagramCommand(DiagramCommand.GridSizeItems, gridSizeItems)
        }
    }, {
        key: "_updateUnitItems",
        value: function() {
            var _getDiagram18 = (0, _diagram.getDiagram)(),
                DiagramLocalizationService = _getDiagram18.DiagramLocalizationService;
            var items = this._getUnitItems();
            if (this._unitItems !== items) {
                this._unitItems = items;
                DiagramLocalizationService.unitItems = items
            }
        }
    }, {
        key: "_getUnitItems",
        value: function() {
            var _getDiagram19 = (0, _diagram.getDiagram)(),
                DiagramUnit = _getDiagram19.DiagramUnit;
            var items = {};
            items[DiagramUnit.In] = _message2.default.format("dxDiagram-unitIn");
            items[DiagramUnit.Cm] = _message2.default.format("dxDiagram-unitCm");
            items[DiagramUnit.Px] = _message2.default.format("dxDiagram-unitPx");
            return items
        }
    }, {
        key: "_updateFormatUnitsMethod",
        value: function() {
            var _getDiagram20 = (0, _diagram.getDiagram)(),
                DiagramLocalizationService = _getDiagram20.DiagramLocalizationService;
            DiagramLocalizationService.formatUnit = function(value) {
                return _number2.default.format(value)
            }
        }
    }, {
        key: "_updateViewUnitsState",
        value: function() {
            var _getDiagram21 = (0, _diagram.getDiagram)(),
                DiagramCommand = _getDiagram21.DiagramCommand;
            this._executeDiagramCommand(DiagramCommand.ViewUnits, this._getDiagramUnitValue(this.option("viewUnits")))
        }
    }, {
        key: "_updateUnitsState",
        value: function() {
            var _getDiagram22 = (0, _diagram.getDiagram)(),
                DiagramCommand = _getDiagram22.DiagramCommand;
            this._executeDiagramCommand(DiagramCommand.Units, this._getDiagramUnitValue(this.option("units")))
        }
    }, {
        key: "_updatePageSizeState",
        value: function() {
            var pageSize = this.option("pageSize");
            if (!pageSize || !pageSize.width || !pageSize.height) {
                return
            }
            var _getDiagram23 = (0, _diagram.getDiagram)(),
                DiagramCommand = _getDiagram23.DiagramCommand;
            this._executeDiagramCommand(DiagramCommand.PageSize, pageSize)
        }
    }, {
        key: "_updatePageSizeItemsState",
        value: function() {
            var pageSizeItems = this.option("pageSize.items");
            if (!Array.isArray(pageSizeItems)) {
                return
            }
            var _getDiagram24 = (0, _diagram.getDiagram)(),
                DiagramCommand = _getDiagram24.DiagramCommand;
            this._executeDiagramCommand(DiagramCommand.PageSizeItems, pageSizeItems)
        }
    }, {
        key: "_updatePageOrientationState",
        value: function() {
            var _getDiagram25 = (0, _diagram.getDiagram)(),
                DiagramCommand = _getDiagram25.DiagramCommand;
            this._executeDiagramCommand(DiagramCommand.PageLandscape, "landscape" === this.option("pageOrientation"))
        }
    }, {
        key: "_updatePageColorState",
        value: function() {
            var _getDiagram26 = (0, _diagram.getDiagram)(),
                DiagramCommand = _getDiagram26.DiagramCommand;
            this._executeDiagramCommand(DiagramCommand.PageColor, this.option("pageColor"))
        }
    }, {
        key: "_updateShapeTexts",
        value: function() {
            var _getDiagram27 = (0, _diagram.getDiagram)(),
                DiagramLocalizationService = _getDiagram27.DiagramLocalizationService;
            var texts = this._getShapeTexts();
            if (this._shapeTexts !== texts) {
                this._shapeTexts = texts;
                DiagramLocalizationService.shapeTexts = texts
            }
        }
    }, {
        key: "_getShapeTexts",
        value: function() {
            var _getDiagram28 = (0, _diagram.getDiagram)(),
                ShapeTypes = _getDiagram28.ShapeTypes;
            var texts = {};
            texts[ShapeTypes.Text] = _message2.default.format("dxDiagram-shapeText");
            texts[ShapeTypes.Rectangle] = _message2.default.format("dxDiagram-shapeRectangle");
            texts[ShapeTypes.Ellipse] = _message2.default.format("dxDiagram-shapeEllipse");
            texts[ShapeTypes.Cross] = _message2.default.format("dxDiagram-shapeCross");
            texts[ShapeTypes.Triangle] = _message2.default.format("dxDiagram-shapeTriangle");
            texts[ShapeTypes.Diamond] = _message2.default.format("dxDiagram-shapeDiamond");
            texts[ShapeTypes.Heart] = _message2.default.format("dxDiagram-shapeHeart");
            texts[ShapeTypes.Pentagon] = _message2.default.format("dxDiagram-shapePentagon");
            texts[ShapeTypes.Hexagon] = _message2.default.format("dxDiagram-shapeHexagon");
            texts[ShapeTypes.Octagon] = _message2.default.format("dxDiagram-shapeOctagon");
            texts[ShapeTypes.Star] = _message2.default.format("dxDiagram-shapeStar");
            texts[ShapeTypes.ArrowLeft] = _message2.default.format("dxDiagram-shapeArrowLeft");
            texts[ShapeTypes.ArrowUp] = _message2.default.format("dxDiagram-shapeArrowUp");
            texts[ShapeTypes.ArrowRight] = _message2.default.format("dxDiagram-shapeArrowRight");
            texts[ShapeTypes.ArrowDown] = _message2.default.format("dxDiagram-shapeArrowDown");
            texts[ShapeTypes.ArrowUpDown] = _message2.default.format("dxDiagram-shapeArrowUpDown");
            texts[ShapeTypes.ArrowLeftRight] = _message2.default.format("dxDiagram-shapeArrowLeftRight");
            texts[ShapeTypes.Process] = _message2.default.format("dxDiagram-shapeProcess");
            texts[ShapeTypes.Decision] = _message2.default.format("dxDiagram-shapeDecision");
            texts[ShapeTypes.Terminator] = _message2.default.format("dxDiagram-shapeTerminator");
            texts[ShapeTypes.PredefinedProcess] = _message2.default.format("dxDiagram-shapePredefinedProcess");
            texts[ShapeTypes.Document] = _message2.default.format("dxDiagram-shapeDocument");
            texts[ShapeTypes.MultipleDocuments] = _message2.default.format("dxDiagram-shapeMultipleDocuments");
            texts[ShapeTypes.ManualInput] = _message2.default.format("dxDiagram-shapeManualInput");
            texts[ShapeTypes.Preparation] = _message2.default.format("dxDiagram-shapePreparation");
            texts[ShapeTypes.Data] = _message2.default.format("dxDiagram-shapeData");
            texts[ShapeTypes.Database] = _message2.default.format("dxDiagram-shapeDatabase");
            texts[ShapeTypes.HardDisk] = _message2.default.format("dxDiagram-shapeHardDisk");
            texts[ShapeTypes.InternalStorage] = _message2.default.format("dxDiagram-shapeInternalStorage");
            texts[ShapeTypes.PaperTape] = _message2.default.format("dxDiagram-shapePaperTape");
            texts[ShapeTypes.ManualOperation] = _message2.default.format("dxDiagram-shapeManualOperation");
            texts[ShapeTypes.Delay] = _message2.default.format("dxDiagram-shapeDelay");
            texts[ShapeTypes.StoredData] = _message2.default.format("dxDiagram-shapeStoredData");
            texts[ShapeTypes.Display] = _message2.default.format("dxDiagram-shapeDisplay");
            texts[ShapeTypes.Merge] = _message2.default.format("dxDiagram-shapeMerge");
            texts[ShapeTypes.Connector] = _message2.default.format("dxDiagram-shapeConnector");
            texts[ShapeTypes.Or] = _message2.default.format("dxDiagram-shapeOr");
            texts[ShapeTypes.SummingJunction] = _message2.default.format("dxDiagram-shapeSummingJunction");
            texts[ShapeTypes.Container] = _message2.default.format("dxDiagram-shapeContainerDefaultText");
            texts[ShapeTypes.VerticalContainer] = _message2.default.format("dxDiagram-shapeVerticalContainer");
            texts[ShapeTypes.HorizontalContainer] = _message2.default.format("dxDiagram-shapeHorizontalContainer");
            texts[ShapeTypes.Card] = _message2.default.format("dxDiagram-shapeCardDefaultText");
            texts[ShapeTypes.CardWithImageOnLeft] = _message2.default.format("dxDiagram-shapeCardWithImageOnLeft");
            texts[ShapeTypes.CardWithImageOnTop] = _message2.default.format("dxDiagram-shapeCardWithImageOnTop");
            texts[ShapeTypes.CardWithImageOnRight] = _message2.default.format("dxDiagram-shapeCardWithImageOnRight");
            return texts
        }
    }, {
        key: "_updateEventSubscriptionMethods",
        value: function() {
            var _getDiagram29 = (0, _diagram.getDiagram)(),
                RenderHelper = _getDiagram29.RenderHelper;
            RenderHelper.addEventListener = function(element, eventName, handler) {
                _events_engine2.default.on(element, eventName, handler)
            };
            RenderHelper.removeEventListener = function(element, eventName, handler) {
                _events_engine2.default.off(element, eventName, handler)
            }
        }
    }, {
        key: "focus",
        value: function() {
            this._diagramInstance.captureFocus()
        }
    }, {
        key: "export",
        value: function() {
            return this._getDiagramData()
        }
    }, {
        key: "exportTo",
        value: function(format, callback) {
            var command = this._getDiagramExportToCommand(format);
            this._executeDiagramCommand(command, callback)
        }
    }, {
        key: "_getDiagramExportToCommand",
        value: function(format) {
            var _getDiagram30 = (0, _diagram.getDiagram)(),
                DiagramCommand = _getDiagram30.DiagramCommand;
            switch (format) {
                case "png":
                    return DiagramCommand.ExportPng;
                case "jpg":
                    return DiagramCommand.ExportJpg;
                default:
                    return DiagramCommand.ExportSvg
            }
        }
    }, {
        key: "import",
        value: function(data, updateExistingItemsOnly) {
            this._setDiagramData(data, updateExistingItemsOnly);
            this._raiseDataChangeAction()
        }
    }, {
        key: "_getDefaultOptions",
        value: function() {
            return (0, _extend.extend)(_get(_getPrototypeOf(Diagram.prototype), "_getDefaultOptions", this).call(this), {
                readOnly: false,
                zoomLevel: DIAGRAM_DEFAULT_ZOOMLEVEL,
                simpleView: false,
                autoZoomMode: DIAGRAM_DEFAULT_AUTOZOOM_MODE,
                fullScreen: false,
                showGrid: true,
                snapToGrid: true,
                units: DIAGRAM_DEFAULT_UNIT,
                viewUnits: DIAGRAM_DEFAULT_UNIT,
                pageOrientation: DIAGRAM_DEFAULT_PAGE_ORIENTATION,
                pageColor: DIAGRAM_DEFAULT_PAGE_COLOR,
                hasChanges: false,
                nodes: {
                    dataSource: null,
                    keyExpr: "id",
                    lockedExpr: void 0,
                    styleExpr: void 0,
                    textStyleExpr: void 0,
                    zIndexExpr: void 0,
                    typeExpr: "type",
                    textExpr: "text",
                    imageUrlExpr: void 0,
                    parentKeyExpr: void 0,
                    itemsExpr: void 0,
                    leftExpr: void 0,
                    topExpr: void 0,
                    widthExpr: void 0,
                    heightExpr: void 0,
                    containerKeyExpr: void 0,
                    childrenExpr: "children",
                    autoLayout: "auto"
                },
                edges: {
                    dataSource: null,
                    keyExpr: "id",
                    lockedExpr: void 0,
                    styleExpr: void 0,
                    textStyleExpr: void 0,
                    zIndexExpr: void 0,
                    fromExpr: "from",
                    fromPointIndexExpr: void 0,
                    toExpr: "to",
                    toPointIndexExpr: void 0,
                    pointsExpr: void 0,
                    textExpr: void 0,
                    lineTypeExpr: void 0,
                    fromLineEndExpr: void 0,
                    toLineEndExpr: void 0
                },
                customShapes: [],
                toolbox: {
                    visibility: "auto"
                },
                mainToolbar: {
                    visible: false
                },
                historyToolbar: {
                    visible: true
                },
                viewToolbar: {
                    visible: true
                },
                contextMenu: {
                    enabled: true
                },
                contextToolbox: {
                    enabled: true
                },
                propertiesPanel: {
                    visibility: "auto"
                },
                "export": {
                    fileName: "Diagram",
                    proxyUrl: void 0
                },
                onItemClick: null,
                onItemDblClick: null,
                onSelectionChanged: null
            })
        }
    }, {
        key: "_raiseDataChangeAction",
        value: function() {
            this.option("hasChanges", true)
        }
    }, {
        key: "_raiseEdgeInsertedAction",
        value: function(data, callback, errorCallback) {
            if (this._edgesOption) {
                this._edgesOption.insert(data, callback, errorCallback)
            }
        }
    }, {
        key: "_raiseEdgeUpdatedAction",
        value: function(key, data, callback, errorCallback) {
            if (this._edgesOption) {
                this._edgesOption.update(key, data, callback, errorCallback)
            }
        }
    }, {
        key: "_raiseEdgeRemovedAction",
        value: function(key, data, callback, errorCallback) {
            if (this._edgesOption) {
                this._edgesOption.remove(key, data, callback, errorCallback)
            }
        }
    }, {
        key: "_raiseNodeInsertedAction",
        value: function(data, callback, errorCallback) {
            if (this._nodesOption) {
                this._nodesOption.insert(data, callback, errorCallback)
            }
        }
    }, {
        key: "_raiseNodeUpdatedAction",
        value: function(key, data, callback, errorCallback) {
            if (this._nodesOption) {
                this._nodesOption.update(key, data, callback, errorCallback)
            }
        }
    }, {
        key: "_raiseNodeRemovedAction",
        value: function(key, data, callback, errorCallback) {
            if (this._nodesOption) {
                this._nodesOption.remove(key, data, callback, errorCallback)
            }
        }
    }, {
        key: "_raiseToolboxDragStart",
        value: function() {
            if (this._toolbox) {
                this._toolbox._raiseToolboxDragStart();
                if (this.isMobileScreenSize()) {
                    this._toolbox.hide();
                    this._toolboxDragHidden = true
                }
            }
        }
    }, {
        key: "_raiseToolboxDragEnd",
        value: function() {
            if (this._toolbox) {
                this._toolbox._raiseToolboxDragEnd();
                if (this._toolboxDragHidden) {
                    this._toolbox.show();
                    delete this._toolboxDragHidden
                }
            }
        }
    }, {
        key: "_raiseTextInputStart",
        value: function() {
            if (this._propertiesPanel) {
                if (this.isMobileScreenSize() && this._propertiesPanel.isVisible()) {
                    this._propertiesPanel.hide();
                    this._propertiesPanelTextInputHidden = true
                }
            }
        }
    }, {
        key: "_raiseTextInputEnd",
        value: function() {
            if (this._propertiesPanel) {
                if (this._propertiesPanelTextInputHidden) {
                    this._propertiesPanel.show();
                    delete this._propertiesPanelTextInputHidden
                }
            }
        }
    }, {
        key: "_createItemClickAction",
        value: function() {
            this._itemClickAction = this._createActionByOption("onItemClick")
        }
    }, {
        key: "_createItemDblClickAction",
        value: function() {
            this._itemDblClickAction = this._createActionByOption("onItemDblClick")
        }
    }, {
        key: "_createSelectionChangedAction",
        value: function() {
            this._selectionChangedAction = this._createActionByOption("onSelectionChanged")
        }
    }, {
        key: "_createCustomCommand",
        value: function() {
            this._customCommandAction = this._createActionByOption("onCustomCommand")
        }
    }, {
        key: "_raiseItemClickAction",
        value: function(nativeItem) {
            if (!this._itemClickAction) {
                this._createItemClickAction()
            }
            this._itemClickAction({
                item: this._nativeItemToDiagramItem(nativeItem)
            })
        }
    }, {
        key: "_raiseItemDblClickAction",
        value: function(nativeItem) {
            if (!this._itemDblClickAction) {
                this._createItemDblClickAction()
            }
            this._itemDblClickAction({
                item: this._nativeItemToDiagramItem(nativeItem)
            })
        }
    }, {
        key: "_raiseSelectionChanged",
        value: function(nativeItems) {
            if (!this._selectionChangedAction) {
                this._createSelectionChangedAction()
            }
            this._selectionChangedAction({
                items: nativeItems.map(this._nativeItemToDiagramItem.bind(this))
            })
        }
    }, {
        key: "_nativeItemToDiagramItem",
        value: function(nativeItem) {
            var _getDiagram31 = (0, _diagram.getDiagram)(),
                NativeShape = _getDiagram31.NativeShape;
            var createMethod = nativeItem instanceof NativeShape ? this._nativeShapeToDiagramShape.bind(this) : this._nativeConnectorToDiagramConnector.bind(this);
            return (0, _extend.extend)({
                id: nativeItem.id
            }, createMethod(nativeItem))
        }
    }, {
        key: "_nativeShapeToDiagramShape",
        value: function(nativeShape) {
            return {
                dataItem: this._nodesOption && this._nodesOption.findItem(nativeShape.key),
                itemType: "shape",
                text: nativeShape.text,
                type: nativeShape.type
            }
        }
    }, {
        key: "_nativeConnectorToDiagramConnector",
        value: function(nativeConnector) {
            return {
                dataItem: this._edgesOption && this._edgesOption.findItem(nativeConnector.key),
                itemType: "connector",
                texts: nativeConnector.texts,
                fromKey: nativeConnector.fromKey,
                toKey: nativeConnector.toKey
            }
        }
    }, {
        key: "_invalidateContextMenuCommands",
        value: function() {
            if (this._contextMenu) {
                this._contextMenu.option({
                    commands: this.option("contextMenu.commands")
                })
            }
        }
    }, {
        key: "_invalidatePropertiesPanelTabs",
        value: function() {
            if (this._propertiesPanel) {
                this._propertiesPanel.option({
                    propertyTabs: this.option("propertiesPanel.tabs")
                })
            }
        }
    }, {
        key: "_invalidateMainToolbarCommands",
        value: function() {
            if (this._mainToolbar) {
                this._mainToolbar.option({
                    commands: this.option("mainToolbar.commands")
                })
            }
        }
    }, {
        key: "_invalidateHistoryToolbarCommands",
        value: function() {
            if (this._historyToolbar) {
                this._historyToolbar.option({
                    commands: this.option("historyToolbar.commands")
                })
            }
        }
    }, {
        key: "_invalidateViewToolbarCommands",
        value: function() {
            if (this._viewToolbar) {
                this._viewToolbar.option({
                    commands: this.option("viewToolbar.commands")
                })
            }
        }
    }, {
        key: "_invalidateToolboxGroups",
        value: function() {
            if (this._toolbox) {
                this._toolbox.option({
                    toolboxGroups: this._getToolboxGroups()
                })
            }
        }
    }, {
        key: "_setToolboxVisible",
        value: function(visible) {
            if (this._toolbox) {
                this._toolbox.option({
                    visible: visible
                })
            }
        }
    }, {
        key: "_optionChanged",
        value: function(args) {
            if (this.optionsUpdateBar.isUpdateLocked()) {
                return
            }
            this.optionsUpdateBar.beginUpdate();
            try {
                this._optionChangedCore(args)
            } finally {
                this.optionsUpdateBar.endUpdate()
            }
        }
    }, {
        key: "_optionChangedCore",
        value: function(args) {
            switch (args.name) {
                case "readOnly":
                case "disabled":
                    this._updateReadOnlyState();
                    break;
                case "zoomLevel":
                    if ("zoomLevel" === args.fullName || "zoomLevel.items" === args.fullName) {
                        this._updateZoomLevelItemsState()
                    }
                    if ("zoomLevel" === args.fullName || "zoomLevel.value" === args.fullName) {
                        this._updateZoomLevelState()
                    }
                    break;
                case "autoZoomMode":
                    this._updateAutoZoomState();
                    break;
                case "simpleView":
                    this._updateSimpleViewState();
                    break;
                case "fullScreen":
                    this._updateFullscreenState();
                    break;
                case "showGrid":
                    this._updateShowGridState();
                    break;
                case "snapToGrid":
                    this._updateSnapToGridState();
                    break;
                case "gridSize":
                    if ("gridSize" === args.fullName || "gridSize.items" === args.fullName) {
                        this._updateGridSizeItemsState()
                    }
                    if ("gridSize" === args.fullName || "gridSize.value" === args.fullName) {
                        this._updateGridSizeState()
                    }
                    break;
                case "viewUnits":
                    this._updateViewUnitsState();
                    break;
                case "units":
                    this._updateUnitsState();
                    break;
                case "pageSize":
                    if ("pageSize" === args.fullName || "pageSize.items" === args.fullName) {
                        this._updatePageSizeItemsState()
                    }
                    if ("pageSize" === args.fullName || "pageSize.width" === args.fullName || "pageSize.height" === args.fullName) {
                        this._updatePageSizeState()
                    }
                    break;
                case "pageOrientation":
                    this._updatePageOrientationState();
                    break;
                case "pageColor":
                    this._updatePageColorState();
                    break;
                case "nodes":
                    if ("nodes.autoLayout" === args.fullName) {
                        this._refreshDataSources()
                    } else {
                        this._refreshNodesDataSource()
                    }
                    break;
                case "edges":
                    this._refreshEdgesDataSource();
                    break;
                case "customShapes":
                    this._updateCustomShapes(args.value, args.previousValue);
                    this._invalidate();
                    break;
                case "contextMenu":
                    if ("contextMenu.commands" === args.fullName) {
                        this._invalidateContextMenuCommands()
                    } else {
                        this._invalidate()
                    }
                    break;
                case "contextToolbox":
                    if ("contextToolbox.enabled" === args.fullName) {
                        this._invalidate()
                    }
                    break;
                case "propertiesPanel":
                    if ("propertiesPanel.tabs" === args.name) {
                        this._invalidatePropertiesPanelTabs()
                    } else {
                        this._invalidate()
                    }
                    break;
                case "toolbox":
                    if ("toolbox.groups" === args.fullName) {
                        this._invalidateToolboxGroups()
                    } else {
                        this._invalidate()
                    }
                    break;
                case "mainToolbar":
                    if ("mainToolbar.commands" === args.fullName) {
                        this._invalidateMainToolbarCommands()
                    } else {
                        this._invalidate()
                    }
                    break;
                case "historyToolbar":
                    if ("historyToolbar.commands" === args.fullName) {
                        this._invalidateHistoryToolbarCommands()
                    } else {
                        this._invalidate()
                    }
                    break;
                case "viewToolbar":
                    if ("viewToolbar.commands" === args.fullName) {
                        this._invalidateViewToolbarCommands()
                    } else {
                        this._invalidate()
                    }
                    break;
                case "onItemClick":
                    this._createItemClickAction();
                    break;
                case "onItemDblClick":
                    this._createItemDblClickAction();
                    break;
                case "onSelectionChanged":
                    this._createSelectionChangedAction();
                    break;
                case "onCustomCommand":
                    this._createCustomCommand();
                    break;
                case "export":
                    if (this._mainToolbar) {
                        this._mainToolbar.option("export", args.value)
                    }
                    break;
                case "hasChanges":
                    break;
                default:
                    _get(_getPrototypeOf(Diagram.prototype), "_optionChanged", this).call(this, args)
            }
        }
    }]);
    return Diagram
}(_ui2.default);
(0, _component_registrator2.default)("dxDiagram", Diagram);
module.exports = Diagram;
