/**
 * DevExtreme (ui/drawer/ui.drawer.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _renderer = require("../../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _events_engine = require("../../events/core/events_engine");
var _events_engine2 = _interopRequireDefault(_events_engine);
var _type = require("../../core/utils/type");
var _type2 = _interopRequireDefault(_type);
var _dom = require("../../core/utils/dom");
var _component_registrator = require("../../core/component_registrator");
var _component_registrator2 = _interopRequireDefault(_component_registrator);
var _extend = require("../../core/utils/extend");
var _ui = require("../widget/ui.widget");
var _ui2 = _interopRequireDefault(_ui);
var _empty_template = require("../../core/templates/empty_template");
var _window = require("../../core/utils/window");
var _uiDrawerRenderingStrategy = require("./ui.drawer.rendering.strategy.push");
var _uiDrawerRenderingStrategy2 = _interopRequireDefault(_uiDrawerRenderingStrategy);
var _uiDrawerRenderingStrategy3 = require("./ui.drawer.rendering.strategy.shrink");
var _uiDrawerRenderingStrategy4 = _interopRequireDefault(_uiDrawerRenderingStrategy3);
var _uiDrawerRenderingStrategy5 = require("./ui.drawer.rendering.strategy.overlap");
var _uiDrawerRenderingStrategy6 = _interopRequireDefault(_uiDrawerRenderingStrategy5);
var _uiDrawerRendering = require("./ui.drawer.rendering.strategy");
var _click = require("../../events/click");
var _fx = require("../../animation/fx");
var _fx2 = _interopRequireDefault(_fx);
var _deferred = require("../../core/utils/deferred");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var DRAWER_CLASS = "dx-drawer";
var DRAWER_WRAPPER_CLASS = "dx-drawer-wrapper";
var DRAWER_PANEL_CONTENT_CLASS = "dx-drawer-panel-content";
var DRAWER_VIEW_CONTENT_CLASS = "dx-drawer-content";
var DRAWER_SHADER_CLASS = "dx-drawer-shader";
var INVISIBLE_STATE_CLASS = "dx-state-invisible";
var OPENED_STATE_CLASS = "dx-drawer-opened";
var ANONYMOUS_TEMPLATE_NAME = "content";
var PANEL_TEMPLATE_NAME = "panel";
var Drawer = _ui2.default.inherit({
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            position: "left",
            opened: false,
            minSize: null,
            maxSize: null,
            shading: false,
            template: PANEL_TEMPLATE_NAME,
            openedStateMode: "shrink",
            revealMode: "slide",
            animationEnabled: true,
            animationDuration: 400,
            closeOnOutsideClick: false,
            contentTemplate: ANONYMOUS_TEMPLATE_NAME,
            target: void 0
        })
    },
    _init: function() {
        this.callBase();
        this._initStrategy();
        this.$element().addClass(DRAWER_CLASS);
        this._animations = [];
        this._whenAnimationCompleted = void 0;
        this._whenPanelContentRendered = void 0;
        this._whenPanelContentRefreshed = void 0;
        this._$wrapper = (0, _renderer2.default)("<div>").addClass(DRAWER_WRAPPER_CLASS);
        this._$viewContentWrapper = (0, _renderer2.default)("<div>").addClass(DRAWER_VIEW_CONTENT_CLASS);
        this._$wrapper.append(this._$viewContentWrapper);
        this.$element().append(this._$wrapper)
    },
    _initStrategy: function() {
        switch (this.option("openedStateMode")) {
            case "push":
                this._strategy = new _uiDrawerRenderingStrategy2.default(this);
                break;
            case "shrink":
                this._strategy = new _uiDrawerRenderingStrategy4.default(this);
                break;
            case "overlap":
                this._strategy = new _uiDrawerRenderingStrategy6.default(this);
                break;
            default:
                this._strategy = new _uiDrawerRenderingStrategy2.default(this)
        }
    },
    _getAnonymousTemplateName: function() {
        return ANONYMOUS_TEMPLATE_NAME
    },
    _initTemplates: function() {
        var defaultTemplates = {};
        defaultTemplates[PANEL_TEMPLATE_NAME] = new _empty_template.EmptyTemplate;
        defaultTemplates[ANONYMOUS_TEMPLATE_NAME] = new _empty_template.EmptyTemplate;
        this._templateManager.addDefaultTemplates(defaultTemplates);
        this.callBase()
    },
    _viewContentWrapperClickHandler: function(e) {
        var closeOnOutsideClick = this.option("closeOnOutsideClick");
        if (_type2.default.isFunction(closeOnOutsideClick)) {
            closeOnOutsideClick = closeOnOutsideClick(e)
        }
        if (closeOnOutsideClick && this.option("opened")) {
            this.stopAnimations();
            if (this.option("shading")) {
                e.preventDefault()
            }
            this.hide();
            this._toggleShaderVisibility(false)
        }
    },
    _initMarkup: function() {
        this.callBase();
        this._toggleOpenedStateClass(this.option("opened"));
        this._renderPanelContentWrapper();
        this._refreshOpenedStateModeClass();
        this._refreshRevealModeClass();
        this._renderShader();
        this._whenPanelContentRendered = new _deferred.Deferred;
        this._strategy.renderPanelContent(this._whenPanelContentRendered);
        this._renderViewContent();
        _events_engine2.default.off(this._$viewContentWrapper, _click.name);
        _events_engine2.default.on(this._$viewContentWrapper, _click.name, this._viewContentWrapperClickHandler.bind(this));
        this._refreshPositionClass();
        this._refreshWrapperChildrenOrder()
    },
    _render: function() {
        var _this = this;
        this._initMinMaxSize();
        this.callBase();
        this._whenPanelContentRendered.always(function() {
            _this._initMinMaxSize();
            _this._strategy.refreshPanelElementSize("slide" === _this.option("revealMode") || !_this.isHorizontalDirection());
            _this._renderPosition(_this.option("opened"), false)
        })
    },
    _renderPanelContentWrapper: function() {
        this._$panelContentWrapper = (0, _renderer2.default)("<div>").addClass(DRAWER_PANEL_CONTENT_CLASS);
        this._$wrapper.append(this._$panelContentWrapper)
    },
    _refreshOpenedStateModeClass: function(prevOpenedStateMode) {
        if (prevOpenedStateMode) {
            this.$element().removeClass(DRAWER_CLASS + "-" + prevOpenedStateMode)
        }
        this.$element().addClass(DRAWER_CLASS + "-" + this.option("openedStateMode"))
    },
    _refreshPositionClass: function(prevPosition) {
        if (prevPosition) {
            this.$element().removeClass(DRAWER_CLASS + "-" + prevPosition)
        }
        this.$element().addClass(DRAWER_CLASS + "-" + this.calcTargetPosition())
    },
    _refreshWrapperChildrenOrder: function() {
        var position = this.calcTargetPosition();
        if (this._strategy.isViewContentFirst(position, this.option("rtlEnabled"))) {
            this._$wrapper.prepend(this._$viewContentWrapper)
        } else {
            this._$wrapper.prepend(this._$panelContentWrapper)
        }
    },
    _refreshRevealModeClass: function(prevRevealMode) {
        if (prevRevealMode) {
            this.$element().removeClass(DRAWER_CLASS + "-" + prevRevealMode)
        }
        this.$element().addClass(DRAWER_CLASS + "-" + this.option("revealMode"))
    },
    _renderViewContent: function() {
        var contentTemplateOption = this.option("contentTemplate");
        var contentTemplate = this._getTemplate(contentTemplateOption);
        if (contentTemplate) {
            var $viewTemplate = contentTemplate.render({
                container: this.viewContent(),
                noModel: true,
                transclude: this._templateManager.anonymousTemplateName === contentTemplateOption
            });
            if ($viewTemplate.hasClass("ng-scope")) {
                (0, _renderer2.default)(this._$viewContentWrapper).children().not(".".concat(DRAWER_SHADER_CLASS)).replaceWith($viewTemplate)
            }
        }
    },
    _renderShader: function() {
        this._$shader = this._$shader || (0, _renderer2.default)("<div>").addClass(DRAWER_SHADER_CLASS);
        this._$shader.appendTo(this.viewContent());
        this._toggleShaderVisibility(this.option("opened"))
    },
    _initSize: function() {
        this._initMinMaxSize()
    },
    _initMinMaxSize: function() {
        var realPanelSize = this.isHorizontalDirection() ? this.getRealPanelWidth() : this.getRealPanelHeight();
        this._maxSize = this.option("maxSize") || realPanelSize;
        this._minSize = this.option("minSize") || 0
    },
    calcTargetPosition: function() {
        var position = this.option("position");
        var rtl = this.option("rtlEnabled");
        var result = position;
        if ("before" === position) {
            result = rtl ? "right" : "left"
        } else {
            if ("after" === position) {
                result = rtl ? "left" : "right"
            }
        }
        return result
    },
    getOverlayTarget: function() {
        return this.option("target") || this._$wrapper
    },
    getOverlay: function() {
        return this._overlay
    },
    getMaxSize: function() {
        return this._maxSize
    },
    getMinSize: function() {
        return this._minSize
    },
    getRealPanelWidth: function() {
        if ((0, _window.hasWindow)()) {
            if (_type2.default.isDefined(this.option("templateSize"))) {
                return this.option("templateSize")
            } else {
                return this.getElementWidth(this._strategy.getPanelContent())
            }
        } else {
            return 0
        }
    },
    getElementWidth: function($element) {
        var $children = $element.children();
        return $children.length ? $children.eq(0).get(0).getBoundingClientRect().width : $element.get(0).getBoundingClientRect().width
    },
    getRealPanelHeight: function() {
        if ((0, _window.hasWindow)()) {
            if (_type2.default.isDefined(this.option("templateSize"))) {
                return this.option("templateSize")
            } else {
                return this.getElementHeight(this._strategy.getPanelContent())
            }
        } else {
            return 0
        }
    },
    getElementHeight: function($element) {
        var $children = $element.children();
        return $children.length ? $children.eq(0).get(0).getBoundingClientRect().height : $element.get(0).getBoundingClientRect().height
    },
    isHorizontalDirection: function() {
        var position = this.calcTargetPosition();
        return "left" === position || "right" === position
    },
    stopAnimations: function(jumpToEnd) {
        _fx2.default.stop(this._$shader, jumpToEnd);
        _fx2.default.stop((0, _renderer2.default)(this.content()), jumpToEnd);
        _fx2.default.stop((0, _renderer2.default)(this.viewContent()), jumpToEnd);
        var overlay = this.getOverlay();
        if (overlay) {
            _fx2.default.stop((0, _renderer2.default)(overlay.$content()), jumpToEnd)
        }
    },
    resizeContent: function() {
        this.resizeViewContent
    },
    resizeViewContent: function() {
        (0, _dom.triggerResizeEvent)(this.viewContent())
    },
    _isInvertedPosition: function() {
        var position = this.calcTargetPosition();
        return "right" === position || "bottom" === position
    },
    _renderPosition: function(isDrawerOpened, animate, jumpToEnd) {
        this.stopAnimations(jumpToEnd);
        this._animations = [];
        if (!(0, _window.hasWindow)()) {
            return
        }
        animate = _type2.default.isDefined(animate) ? animate && this.option("animationEnabled") : this.option("animationEnabled");
        if (isDrawerOpened) {
            this._toggleShaderVisibility(isDrawerOpened)
        }
        this._strategy.renderPosition(isDrawerOpened, animate);
        this._strategy.renderShaderVisibility(isDrawerOpened, animate, this.option("animationDuration"))
    },
    _animationCompleteHandler: function() {
        this.resizeViewContent();
        if (this._whenAnimationCompleted) {
            this._whenAnimationCompleted.resolve();
            this._animations = []
        }
    },
    _getPositionCorrection: function() {
        return this._isInvertedPosition() ? -1 : 1
    },
    _dispose: function() {
        _uiDrawerRendering.animation.complete((0, _renderer2.default)(this.viewContent()));
        this.callBase()
    },
    _visibilityChanged: function(visible) {
        if (visible) {
            this._dimensionChanged()
        }
    },
    _dimensionChanged: function() {
        this._initMinMaxSize();
        this._strategy.refreshPanelElementSize("slide" === this.option("revealMode"))
    },
    _toggleShaderVisibility: function(visible) {
        if (this.option("shading")) {
            this._$shader.toggleClass(INVISIBLE_STATE_CLASS, !visible);
            this._$shader.css("visibility", visible ? "visible" : "hidden");
            this.updateZIndex(visible)
        } else {
            this._$shader.toggleClass(INVISIBLE_STATE_CLASS, true);
            this._$shader.css("visibility", "hidden")
        }
    },
    updateZIndex: function(visible) {
        if (visible) {
            this._strategy.updateZIndex()
        } else {
            this._strategy.clearZIndex()
        }
    },
    _toggleOpenedStateClass: function(opened) {
        this.$element().toggleClass(OPENED_STATE_CLASS, opened)
    },
    _refreshPanel: function() {
        var _this2 = this;
        (0, _renderer2.default)(this.viewContent()).css("paddingLeft", 0);
        (0, _renderer2.default)(this.viewContent()).css("left", 0);
        (0, _renderer2.default)(this.viewContent()).css("transform", "translate(0px, 0px)");
        this._removePanelContentWrapper();
        this._removeOverlay();
        this._renderPanelContentWrapper();
        this._refreshWrapperChildrenOrder();
        this._whenPanelContentRefreshed = new _deferred.Deferred;
        this._strategy.renderPanelContent(this._whenPanelContentRefreshed);
        if ((0, _window.hasWindow)()) {
            this._whenPanelContentRefreshed.always(function() {
                _this2._strategy.refreshPanelElementSize("slide" === _this2.option("revealMode"));
                _this2._renderPosition(_this2.option("opened"), false, true)
            })
        }
    },
    _clean: function() {
        this._cleanFocusState();
        this._strategy.clearZIndex();
        this._removePanelContentWrapper();
        this._removeOverlay()
    },
    _removePanelContentWrapper: function() {
        if (this._$panelContentWrapper) {
            this._$panelContentWrapper.remove()
        }
    },
    _removeOverlay: function() {
        if (this._overlay) {
            this._overlay.dispose();
            delete this._overlay;
            delete this._$panelContentWrapper
        }
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "width":
                this.callBase(args);
                this._dimensionChanged();
                break;
            case "opened":
                this._renderPosition(args.value);
                this._toggleOpenedStateClass(args.value);
                break;
            case "position":
                this._refreshPositionClass(args.previousValue);
                this._refreshWrapperChildrenOrder();
                this._invalidate();
                break;
            case "contentTemplate":
            case "template":
                this._invalidate();
                break;
            case "openedStateMode":
            case "target":
                this._initStrategy();
                this._refreshOpenedStateModeClass(args.previousValue);
                this._refreshPanel();
                break;
            case "minSize":
            case "maxSize":
                this._initMinMaxSize();
                this._renderPosition(this.option("opened"), false);
                break;
            case "revealMode":
                this._refreshRevealModeClass(args.previousValue);
                this._refreshPanel();
                break;
            case "shading":
                this._strategy.clearZIndex();
                this._toggleShaderVisibility(this.option("opened"));
                break;
            case "animationEnabled":
            case "animationDuration":
            case "closeOnOutsideClick":
                break;
            default:
                this.callBase(args)
        }
    },
    content: function() {
        return (0, _dom.getPublicElement)(this._$panelContentWrapper)
    },
    viewContent: function() {
        return (0, _dom.getPublicElement)(this._$viewContentWrapper)
    },
    show: function() {
        return this.toggle(true)
    },
    hide: function() {
        return this.toggle(false)
    },
    toggle: function(opened) {
        var targetOpened = void 0 === opened ? !this.option("opened") : opened;
        this._whenAnimationCompleted = new _deferred.Deferred;
        this.option("opened", targetOpened);
        return this._whenAnimationCompleted.promise()
    }
});
(0, _component_registrator2.default)("dxDrawer", Drawer);
module.exports = Drawer;
