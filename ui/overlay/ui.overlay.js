/**
 * DevExtreme (ui/overlay/ui.overlay.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";

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
var $ = require("../../core/renderer");
var domAdapter = require("../../core/dom_adapter");
var windowUtils = require("../../core/utils/window");
var ready = require("../../core/utils/ready_callbacks").add;
var window = windowUtils.getWindow();
var navigator = windowUtils.getNavigator();
var eventsEngine = require("../../events/core/events_engine");
var fx = require("../../animation/fx");
var translator = require("../../animation/translator");
var compareVersions = require("../../core/utils/version").compare;
var viewPortUtils = require("../../core/utils/view_port");
var extend = require("../../core/utils/extend").extend;
var inArray = require("../../core/utils/array").inArray;
var getPublicElement = require("../../core/utils/dom").getPublicElement;
var viewPortChanged = viewPortUtils.changeCallback;
var hideTopOverlayCallback = require("../../mobile/hide_top_overlay").hideCallback;
var positionUtils = require("../../animation/position");
var fitIntoRange = require("../../core/utils/math").fitIntoRange;
var domUtils = require("../../core/utils/dom");
var noop = require("../../core/utils/common").noop;
var typeUtils = require("../../core/utils/type");
var each = require("../../core/utils/iterator").each;
var devices = require("../../core/devices");
var browser = require("../../core/utils/browser");
var registerComponent = require("../../core/component_registrator");
var Widget = require("../widget/ui.widget");
var keyboard = require("../../events/short").keyboard;
var selectors = require("../widget/selectors");
var dragEvents = require("../../events/drag");
var eventUtils = require("../../events/utils");
var pointerEvents = require("../../events/pointer");
var Resizable = require("../resizable");
var EmptyTemplate = require("../../core/templates/empty_template").EmptyTemplate;
var Deferred = require("../../core/utils/deferred").Deferred;
var zIndexPool = require("./z_index");
var swatch = require("../widget/swatch_container");
var OVERLAY_CLASS = "dx-overlay";
var OVERLAY_WRAPPER_CLASS = "dx-overlay-wrapper";
var OVERLAY_CONTENT_CLASS = "dx-overlay-content";
var OVERLAY_SHADER_CLASS = "dx-overlay-shader";
var OVERLAY_MODAL_CLASS = "dx-overlay-modal";
var INNER_OVERLAY_CLASS = "dx-inner-overlay";
var INVISIBLE_STATE_CLASS = "dx-state-invisible";
var ANONYMOUS_TEMPLATE_NAME = "content";
var RTL_DIRECTION_CLASS = "dx-rtl";
var ACTIONS = ["onShowing", "onShown", "onHiding", "onHidden", "onPositioning", "onPositioned", "onResizeStart", "onResize", "onResizeEnd"];
var OVERLAY_STACK = [];
var DISABLED_STATE_CLASS = "dx-state-disabled";
var PREVENT_SAFARI_SCROLLING_CLASS = "dx-prevent-safari-scrolling";
var TAB_KEY = "tab";
var POSITION_ALIASES = {
    top: {
        my: "top center",
        at: "top center"
    },
    bottom: {
        my: "bottom center",
        at: "bottom center"
    },
    right: {
        my: "right center",
        at: "right center"
    },
    left: {
        my: "left center",
        at: "left center"
    },
    center: {
        my: "center",
        at: "center"
    },
    "right bottom": {
        my: "right bottom",
        at: "right bottom"
    },
    "right top": {
        my: "right top",
        at: "right top"
    },
    "left bottom": {
        my: "left bottom",
        at: "left bottom"
    },
    "left top": {
        my: "left top",
        at: "left top"
    }
};
var realDevice = devices.real();
var realVersion = realDevice.version;
var firefoxDesktop = browser.mozilla && "desktop" === realDevice.deviceType;
var iOS = "ios" === realDevice.platform;
var hasSafariAddressBar = browser.safari && "desktop" !== realDevice.deviceType;
var android4_0nativeBrowser = "android" === realDevice.platform && 0 === compareVersions(realVersion, [4, 0], 2) && navigator.userAgent.indexOf("Chrome") === -1;
var forceRepaint = function($element) {
    if (firefoxDesktop) {
        $element.width()
    }
    if (android4_0nativeBrowser) {
        var $parents = $element.parents();
        var inScrollView = $parents.is(".dx-scrollable-native");
        if (!inScrollView) {
            $parents.css("backfaceVisibility", "hidden");
            $parents.css("backfaceVisibility");
            $parents.css("backfaceVisibility", "visible")
        }
    }
};
var getElement = function(value) {
    return value && $(value.target || value)
};
ready(function() {
    eventsEngine.subscribeGlobal(domAdapter.getDocument(), pointerEvents.down, function(e) {
        for (var i = OVERLAY_STACK.length - 1; i >= 0; i--) {
            if (!OVERLAY_STACK[i]._proxiedDocumentDownHandler(e)) {
                return
            }
        }
    })
});
var Overlay = Widget.inherit({
    _supportedKeys: function() {
        var offsetSize = 5;
        var move = function(top, left, e) {
            if (!this.option("dragEnabled")) {
                return
            }
            e.preventDefault();
            e.stopPropagation();
            var allowedOffsets = this._allowedOffsets();
            var offset = {
                top: fitIntoRange(top, -allowedOffsets.top, allowedOffsets.bottom),
                left: fitIntoRange(left, -allowedOffsets.left, allowedOffsets.right)
            };
            this._changePosition(offset)
        };
        return extend(this.callBase(), {
            escape: function() {
                this.hide()
            },
            upArrow: move.bind(this, -offsetSize, 0),
            downArrow: move.bind(this, offsetSize, 0),
            leftArrow: move.bind(this, 0, -offsetSize),
            rightArrow: move.bind(this, 0, offsetSize)
        })
    },
    _getDefaultOptions: function() {
        return extend(this.callBase(), {
            activeStateEnabled: false,
            visible: false,
            deferRendering: true,
            shading: true,
            shadingColor: "",
            position: {
                my: "center",
                at: "center"
            },
            width: function() {
                return .8 * $(window).width()
            },
            minWidth: null,
            maxWidth: null,
            height: function() {
                return .8 * $(window).height()
            },
            minHeight: null,
            maxHeight: null,
            animation: {
                show: {
                    type: "pop",
                    duration: 300,
                    from: {
                        scale: .55
                    }
                },
                hide: {
                    type: "pop",
                    duration: 300,
                    to: {
                        opacity: 0,
                        scale: .55
                    },
                    from: {
                        opacity: 1,
                        scale: 1
                    }
                }
            },
            closeOnOutsideClick: false,
            onShowing: null,
            onShown: null,
            onHiding: null,
            onHidden: null,
            contentTemplate: "content",
            dragEnabled: false,
            resizeEnabled: false,
            onResizeStart: null,
            onResize: null,
            onResizeEnd: null,
            innerOverlay: false,
            target: void 0,
            container: void 0,
            hideTopOverlayHandler: function() {
                this.hide()
            }.bind(this),
            closeOnTargetScroll: false,
            onPositioned: null,
            boundaryOffset: {
                h: 0,
                v: 0
            },
            propagateOutsideClick: false,
            ignoreChildEvents: true,
            _checkParentVisibility: true
        })
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: function() {
                var realDevice = devices.real();
                var realPlatform = realDevice.platform;
                var realVersion = realDevice.version;
                return "android" === realPlatform && compareVersions(realVersion, [4, 2]) < 0
            },
            options: {
                animation: {
                    show: {
                        type: "fade",
                        duration: 400
                    },
                    hide: {
                        type: "fade",
                        duration: 400,
                        to: {
                            opacity: 0
                        },
                        from: {
                            opacity: 1
                        }
                    }
                }
            }
        }, {
            device: function() {
                return !windowUtils.hasWindow()
            },
            options: {
                width: null,
                height: null,
                animation: null,
                _checkParentVisibility: false
            }
        }])
    },
    _setOptionsByReference: function() {
        this.callBase();
        extend(this._optionsByReference, {
            animation: true
        })
    },
    _wrapper: function() {
        return this._$wrapper
    },
    _container: function() {
        return this._$content
    },
    _eventBindingTarget: function() {
        return this._$content
    },
    _init: function() {
        this.callBase();
        this._initActions();
        this._initCloseOnOutsideClickHandler();
        this._initTabTerminatorHandler();
        this._$wrapper = $("<div>").addClass(OVERLAY_WRAPPER_CLASS);
        this._$content = $("<div>").addClass(OVERLAY_CONTENT_CLASS);
        this._initInnerOverlayClass();
        var $element = this.$element();
        this._$wrapper.addClass($element.attr("class"));
        $element.addClass(OVERLAY_CLASS);
        this._$wrapper.attr("data-bind", "dxControlsDescendantBindings: true");
        eventsEngine.on(this._$wrapper, "MSPointerDown", noop);
        eventsEngine.on(this._$wrapper, "focusin", function(e) {
            e.stopPropagation()
        });
        this._toggleViewPortSubscription(true);
        this._initHideTopOverlayHandler(this.option("hideTopOverlayHandler"))
    },
    _initOptions: function(options) {
        this._initTarget(options.target);
        var container = void 0 === options.container ? this.option("container") : options.container;
        this._initContainer(container);
        this.callBase(options)
    },
    _initInnerOverlayClass: function() {
        this._$content.toggleClass(INNER_OVERLAY_CLASS, this.option("innerOverlay"))
    },
    _initTarget: function(target) {
        if (!typeUtils.isDefined(target)) {
            return
        }
        var options = this.option();
        each(["position.of", "animation.show.from.position.of", "animation.show.to.position.of", "animation.hide.from.position.of", "animation.hide.to.position.of"], function(_, path) {
            var pathParts = path.split(".");
            var option = options;
            while (option) {
                if (1 === pathParts.length) {
                    if (typeUtils.isPlainObject(option)) {
                        option[pathParts.shift()] = target
                    }
                    break
                } else {
                    option = option[pathParts.shift()]
                }
            }
        })
    },
    _initContainer: function(container) {
        container = void 0 === container ? viewPortUtils.value() : container;
        var $element = this.$element();
        var $container = $element.closest(container);
        if (!$container.length) {
            $container = $(container).first()
        }
        this._$container = $container.length ? $container : $element.parent()
    },
    _initHideTopOverlayHandler: function(handler) {
        this._hideTopOverlayHandler = handler
    },
    _initActions: function() {
        this._actions = {};
        each(ACTIONS, function(_, action) {
            this._actions[action] = this._createActionByOption(action, {
                excludeValidators: ["disabled", "readOnly"]
            }) || noop
        }.bind(this))
    },
    _initCloseOnOutsideClickHandler: function() {
        var that = this;
        this._proxiedDocumentDownHandler = function() {
            return that._documentDownHandler.apply(that, arguments)
        }
    },
    _documentDownHandler: function(e) {
        if (this._showAnimationProcessing) {
            this._stopAnimation()
        }
        var closeOnOutsideClick = this.option("closeOnOutsideClick");
        if (typeUtils.isFunction(closeOnOutsideClick)) {
            closeOnOutsideClick = closeOnOutsideClick(e)
        }
        var $container = this._$content;
        var isAttachedTarget = $(window.document).is(e.target) || domUtils.contains(window.document, e.target);
        var isInnerOverlay = $(e.target).closest("." + INNER_OVERLAY_CLASS).length;
        var outsideClick = isAttachedTarget && !isInnerOverlay && !($container.is(e.target) || domUtils.contains($container.get(0), e.target));
        if (outsideClick && closeOnOutsideClick) {
            this._outsideClickHandler(e)
        }
        return this.option("propagateOutsideClick")
    },
    _outsideClickHandler: function(e) {
        if (this.option("shading")) {
            e.preventDefault()
        }
        this.hide()
    },
    _getAnonymousTemplateName: function() {
        return ANONYMOUS_TEMPLATE_NAME
    },
    _initTemplates: function() {
        this._templateManager.addDefaultTemplates({
            content: new EmptyTemplate
        });
        this.callBase()
    },
    _isTopOverlay: function() {
        var overlayStack = this._overlayStack();
        for (var i = overlayStack.length - 1; i >= 0; i--) {
            var tabbableElements = overlayStack[i]._findTabbableBounds();
            if (tabbableElements.first || tabbableElements.last) {
                return overlayStack[i] === this
            }
        }
        return false
    },
    _overlayStack: function() {
        return OVERLAY_STACK
    },
    _zIndexInitValue: function() {
        return Overlay.baseZIndex()
    },
    _toggleViewPortSubscription: function(toggle) {
        viewPortChanged.remove(this._viewPortChangeHandle);
        if (toggle) {
            this._viewPortChangeHandle = this._viewPortChangeHandler.bind(this);
            viewPortChanged.add(this._viewPortChangeHandle)
        }
    },
    _viewPortChangeHandler: function() {
        this._initContainer(this.option("container"));
        this._refresh()
    },
    _renderVisibilityAnimate: function(visible) {
        this._stopAnimation();
        return visible ? this._show() : this._hide()
    },
    _normalizePosition: function() {
        var position = this.option("position");
        this._position = "function" === typeof position ? position() : position
    },
    _getAnimationConfig: function() {
        var animation = this.option("animation");
        if (typeUtils.isFunction(animation)) {
            animation = animation.call(this)
        }
        return animation
    },
    _show: function() {
        var that = this;
        var deferred = new Deferred;
        this._parentHidden = this._isParentHidden();
        deferred.done(function() {
            delete that._parentHidden
        });
        if (this._parentHidden) {
            this._isHidden = true;
            return deferred.resolve()
        }
        if (this._currentVisible) {
            return (new Deferred).resolve().promise()
        }
        this._currentVisible = true;
        this._isShown = false;
        this._normalizePosition();
        var animation = that._getAnimationConfig() || {};
        var showAnimation = this._normalizeAnimation(animation.show, "to");
        var startShowAnimation = showAnimation && showAnimation.start || noop;
        var completeShowAnimation = showAnimation && showAnimation.complete || noop;
        if (this._isHidingActionCanceled) {
            delete this._isHidingActionCanceled;
            deferred.resolve()
        } else {
            var show = function() {
                this._renderVisibility(true);
                if (this._isShowingActionCanceled) {
                    delete this._isShowingActionCanceled;
                    deferred.resolve();
                    return
                }
                this._animate(showAnimation, function() {
                    if (that.option("focusStateEnabled")) {
                        eventsEngine.trigger(that._focusTarget(), "focus")
                    }
                    completeShowAnimation.apply(this, arguments);
                    that._showAnimationProcessing = false;
                    that._isShown = true;
                    that._actions.onShown();
                    that._toggleSafariScrolling(false);
                    deferred.resolve()
                }, function() {
                    startShowAnimation.apply(this, arguments);
                    that._showAnimationProcessing = true
                })
            }.bind(this);
            if (this.option("templatesRenderAsynchronously")) {
                this._stopShowTimer();
                this._asyncShowTimeout = setTimeout(show)
            } else {
                show()
            }
        }
        return deferred.promise()
    },
    _normalizeAnimation: function(animation, prop) {
        if (animation) {
            animation = extend({
                type: "slide"
            }, animation);
            if (animation[prop] && "object" === _typeof(animation[prop])) {
                extend(animation[prop], {
                    position: this._position
                })
            }
        }
        return animation
    },
    _hide: function() {
        if (!this._currentVisible) {
            return (new Deferred).resolve().promise()
        }
        this._currentVisible = false;
        var that = this;
        var deferred = new Deferred;
        var animation = that._getAnimationConfig() || {};
        var hideAnimation = this._normalizeAnimation(animation.hide, "from");
        var startHideAnimation = hideAnimation && hideAnimation.start || noop;
        var completeHideAnimation = hideAnimation && hideAnimation.complete || noop;
        var hidingArgs = {
            cancel: false
        };
        if (this._isShowingActionCanceled) {
            deferred.resolve()
        } else {
            this._actions.onHiding(hidingArgs);
            that._toggleSafariScrolling(true);
            if (hidingArgs.cancel) {
                this._isHidingActionCanceled = true;
                this.option("visible", true);
                deferred.resolve()
            } else {
                this._forceFocusLost();
                this._toggleShading(false);
                this._toggleSubscriptions(false);
                this._stopShowTimer();
                this._animate(hideAnimation, function() {
                    that._$content.css("pointerEvents", "");
                    that._renderVisibility(false);
                    completeHideAnimation.apply(this, arguments);
                    that._actions.onHidden();
                    deferred.resolve()
                }, function() {
                    that._$content.css("pointerEvents", "none");
                    startHideAnimation.apply(this, arguments)
                })
            }
        }
        return deferred.promise()
    },
    _forceFocusLost: function() {
        var activeElement = domAdapter.getActiveElement();
        var shouldResetActiveElement = !!this._$content.find(activeElement).length;
        if (shouldResetActiveElement) {
            domUtils.resetActiveElement()
        }
    },
    _animate: function(animation, completeCallback, startCallback) {
        if (animation) {
            startCallback = startCallback || animation.start || noop;
            fx.animate(this._$content, extend({}, animation, {
                start: startCallback,
                complete: completeCallback
            }))
        } else {
            completeCallback()
        }
    },
    _stopAnimation: function() {
        fx.stop(this._$content, true)
    },
    _renderVisibility: function(visible) {
        if (visible && this._isParentHidden()) {
            return
        }
        this._currentVisible = visible;
        this._stopAnimation();
        if (!visible) {
            domUtils.triggerHidingEvent(this._$content)
        }
        this._toggleVisibility(visible);
        this._$content.toggleClass(INVISIBLE_STATE_CLASS, !visible);
        this._updateZIndexStackPosition(visible);
        if (visible) {
            this._renderContent();
            var showingArgs = {
                cancel: false
            };
            this._actions.onShowing(showingArgs);
            if (showingArgs.cancel) {
                this._toggleVisibility(false);
                this._$content.toggleClass(INVISIBLE_STATE_CLASS, true);
                this._updateZIndexStackPosition(false);
                this._moveFromContainer();
                this._isShowingActionCanceled = true;
                this.option("visible", false);
                return
            }
            this._moveToContainer();
            this._renderGeometry();
            domUtils.triggerShownEvent(this._$content);
            domUtils.triggerResizeEvent(this._$content)
        } else {
            this._moveFromContainer()
        }
        this._toggleShading(visible);
        this._toggleSubscriptions(visible)
    },
    _updateZIndexStackPosition: function(pushToStack) {
        var overlayStack = this._overlayStack();
        var index = inArray(this, overlayStack);
        if (pushToStack) {
            if (index === -1) {
                this._zIndex = zIndexPool.create(this._zIndexInitValue());
                overlayStack.push(this)
            }
            this._$wrapper.css("zIndex", this._zIndex);
            this._$content.css("zIndex", this._zIndex)
        } else {
            if (index !== -1) {
                overlayStack.splice(index, 1);
                zIndexPool.remove(this._zIndex)
            }
        }
    },
    _toggleShading: function(visible) {
        this._$wrapper.toggleClass(OVERLAY_MODAL_CLASS, this.option("shading") && !this.option("container"));
        this._$wrapper.toggleClass(OVERLAY_SHADER_CLASS, visible && this.option("shading"));
        this._$wrapper.css("backgroundColor", this.option("shading") ? this.option("shadingColor") : "");
        this._toggleTabTerminator(visible && this.option("shading"))
    },
    _initTabTerminatorHandler: function() {
        var that = this;
        this._proxiedTabTerminatorHandler = function() {
            that._tabKeyHandler.apply(that, arguments)
        }
    },
    _toggleTabTerminator: function(enabled) {
        var eventName = eventUtils.addNamespace("keydown", this.NAME);
        if (enabled) {
            eventsEngine.on(domAdapter.getDocument(), eventName, this._proxiedTabTerminatorHandler)
        } else {
            eventsEngine.off(domAdapter.getDocument(), eventName, this._proxiedTabTerminatorHandler)
        }
    },
    _findTabbableBounds: function() {
        var $elements = this._$wrapper.find("*");
        var elementsCount = $elements.length - 1;
        var result = {
            first: null,
            last: null
        };
        for (var i = 0; i <= elementsCount; i++) {
            if (!result.first && $elements.eq(i).is(selectors.tabbable)) {
                result.first = $elements.eq(i)
            }
            if (!result.last && $elements.eq(elementsCount - i).is(selectors.tabbable)) {
                result.last = $elements.eq(elementsCount - i)
            }
            if (result.first && result.last) {
                break
            }
        }
        return result
    },
    _tabKeyHandler: function(e) {
        if (eventUtils.normalizeKeyName(e) !== TAB_KEY || !this._isTopOverlay()) {
            return
        }
        var tabbableElements = this._findTabbableBounds();
        var $firstTabbable = tabbableElements.first;
        var $lastTabbable = tabbableElements.last;
        var isTabOnLast = !e.shiftKey && e.target === $lastTabbable.get(0);
        var isShiftTabOnFirst = e.shiftKey && e.target === $firstTabbable.get(0);
        var isEmptyTabList = 0 === tabbableElements.length;
        var isOutsideTarget = !domUtils.contains(this._$wrapper.get(0), e.target);
        if (isTabOnLast || isShiftTabOnFirst || isEmptyTabList || isOutsideTarget) {
            e.preventDefault();
            var $focusElement = e.shiftKey ? $lastTabbable : $firstTabbable;
            eventsEngine.trigger($focusElement, "focusin");
            eventsEngine.trigger($focusElement, "focus")
        }
    },
    _toggleSubscriptions: function(enabled) {
        if (windowUtils.hasWindow()) {
            this._toggleHideTopOverlayCallback(enabled);
            this._toggleParentsScrollSubscription(enabled)
        }
    },
    _toggleHideTopOverlayCallback: function(subscribe) {
        if (!this._hideTopOverlayHandler) {
            return
        }
        if (subscribe) {
            hideTopOverlayCallback.add(this._hideTopOverlayHandler)
        } else {
            hideTopOverlayCallback.remove(this._hideTopOverlayHandler)
        }
    },
    _toggleParentsScrollSubscription: function(subscribe) {
        if (!this._position) {
            return
        }
        var target = this._position.of || $();
        var closeOnScroll = this.option("closeOnTargetScroll");
        var $parents = getElement(target).parents();
        var scrollEvent = eventUtils.addNamespace("scroll", this.NAME);
        if ("desktop" === devices.real().deviceType) {
            $parents = $parents.add(window)
        }
        this._proxiedTargetParentsScrollHandler = this._proxiedTargetParentsScrollHandler || function(e) {
            this._targetParentsScrollHandler(e)
        }.bind(this);
        eventsEngine.off($().add(this._$prevTargetParents), scrollEvent, this._proxiedTargetParentsScrollHandler);
        if (subscribe && closeOnScroll) {
            eventsEngine.on($parents, scrollEvent, this._proxiedTargetParentsScrollHandler);
            this._$prevTargetParents = $parents
        }
    },
    _targetParentsScrollHandler: function(e) {
        var closeHandled = false;
        var closeOnScroll = this.option("closeOnTargetScroll");
        if (typeUtils.isFunction(closeOnScroll)) {
            closeHandled = closeOnScroll(e)
        }
        if (!closeHandled && !this._showAnimationProcessing) {
            this.hide()
        }
    },
    _render: function() {
        this.callBase();
        this._appendContentToElement();
        this._renderVisibilityAnimate(this.option("visible"))
    },
    _appendContentToElement: function() {
        if (!this._$content.parent().is(this.$element())) {
            this._$content.appendTo(this.$element())
        }
    },
    _renderContent: function() {
        var shouldDeferRendering = !this._currentVisible && this.option("deferRendering");
        var isParentHidden = this.option("visible") && this._isParentHidden();
        if (isParentHidden) {
            this._isHidden = true;
            return
        }
        if (this._contentAlreadyRendered || shouldDeferRendering) {
            return
        }
        this._contentAlreadyRendered = true;
        this._appendContentToElement();
        this.callBase()
    },
    _isParentHidden: function() {
        if (!this.option("_checkParentVisibility")) {
            return false
        }
        if (void 0 !== this._parentHidden) {
            return this._parentHidden
        }
        var $parent = this.$element().parent();
        if ($parent.is(":visible")) {
            return false
        }
        var isHidden = false;
        $parent.add($parent.parents()).each(function() {
            var $element = $(this);
            if ("none" === $element.css("display")) {
                isHidden = true;
                return false
            }
        });
        return isHidden || !domAdapter.getBody().contains($parent.get(0))
    },
    _renderContentImpl: function() {
        var _this = this;
        var whenContentRendered = new Deferred;
        var contentTemplateOption = this.option("contentTemplate");
        var contentTemplate = this._getTemplate(contentTemplateOption);
        var transclude = this._templateManager.anonymousTemplateName === contentTemplateOption;
        contentTemplate && contentTemplate.render({
            container: getPublicElement(this.$content()),
            noModel: true,
            transclude: transclude,
            onRendered: function() {
                whenContentRendered.resolve()
            }
        });
        this._renderDrag();
        this._renderResize();
        this._renderScrollTerminator();
        whenContentRendered.done(function() {
            if (_this.option("visible")) {
                _this._moveToContainer()
            }
        });
        return whenContentRendered.promise()
    },
    _renderDrag: function() {
        var $dragTarget = this._getDragTarget();
        if (!$dragTarget) {
            return
        }
        var startEventName = eventUtils.addNamespace(dragEvents.start, this.NAME);
        var updateEventName = eventUtils.addNamespace(dragEvents.move, this.NAME);
        eventsEngine.off($dragTarget, startEventName);
        eventsEngine.off($dragTarget, updateEventName);
        if (!this.option("dragEnabled")) {
            return
        }
        eventsEngine.on($dragTarget, startEventName, this._dragStartHandler.bind(this));
        eventsEngine.on($dragTarget, updateEventName, this._dragUpdateHandler.bind(this))
    },
    _renderResize: function() {
        this._resizable = this._createComponent(this._$content, Resizable, {
            handles: this.option("resizeEnabled") ? "all" : "none",
            onResizeEnd: this._resizeEndHandler.bind(this),
            onResize: this._actions.onResize.bind(this),
            onResizeStart: this._actions.onResizeStart.bind(this),
            minHeight: 100,
            minWidth: 100,
            area: this._getDragResizeContainer()
        })
    },
    _resizeEndHandler: function() {
        this._positionChangeHandled = true;
        var width = this._resizable.option("width");
        var height = this._resizable.option("height");
        width && this.option("width", width);
        height && this.option("height", height);
        this._actions.onResizeEnd()
    },
    _renderScrollTerminator: function() {
        var $scrollTerminator = this._wrapper();
        var terminatorEventName = eventUtils.addNamespace(dragEvents.move, this.NAME);
        eventsEngine.off($scrollTerminator, terminatorEventName);
        eventsEngine.on($scrollTerminator, terminatorEventName, {
            validate: function() {
                return true
            },
            getDirection: function() {
                return "both"
            },
            _toggleGestureCover: function(toggle) {
                if (!toggle) {
                    this._toggleGestureCoverImpl(toggle)
                }
            },
            _clearSelection: noop,
            isNative: true
        }, function(e) {
            var originalEvent = e.originalEvent.originalEvent;
            e._cancelPreventDefault = true;
            if (originalEvent && "mousemove" !== originalEvent.type) {
                e.preventDefault()
            }
        })
    },
    _getDragTarget: function() {
        return this.$content()
    },
    _dragStartHandler: function(e) {
        e.targetElements = [];
        this._prevOffset = {
            x: 0,
            y: 0
        };
        var allowedOffsets = this._allowedOffsets();
        e.maxTopOffset = allowedOffsets.top;
        e.maxBottomOffset = allowedOffsets.bottom;
        e.maxLeftOffset = allowedOffsets.left;
        e.maxRightOffset = allowedOffsets.right
    },
    _getDragResizeContainer: function() {
        var isContainerDefined = viewPortUtils.originalViewPort().get(0) || this.option("container");
        var $container = !isContainerDefined ? $(window) : this._$container;
        return $container
    },
    _deltaSize: function() {
        var $content = this._$content;
        var $container = this._getDragResizeContainer();
        var contentWidth = $content.outerWidth();
        var contentHeight = $content.outerHeight();
        var containerWidth = $container.outerWidth();
        var containerHeight = $container.outerHeight();
        if (this._isWindow($container)) {
            var document = domAdapter.getDocument();
            var fullPageHeight = Math.max($(document).outerHeight(), containerHeight);
            var fullPageWidth = Math.max($(document).outerWidth(), containerWidth);
            containerHeight = fullPageHeight;
            containerWidth = fullPageWidth
        }
        return {
            width: containerWidth - contentWidth,
            height: containerHeight - contentHeight
        }
    },
    _dragUpdateHandler: function(e) {
        var offset = e.offset;
        var prevOffset = this._prevOffset;
        var targetOffset = {
            top: offset.y - prevOffset.y,
            left: offset.x - prevOffset.x
        };
        this._changePosition(targetOffset);
        this._prevOffset = offset
    },
    _changePosition: function(offset) {
        var position = translator.locate(this._$content);
        translator.move(this._$content, {
            left: position.left + offset.left,
            top: position.top + offset.top
        });
        this._positionChangeHandled = true
    },
    _allowedOffsets: function() {
        var position = translator.locate(this._$content);
        var deltaSize = this._deltaSize();
        var isAllowedDrag = deltaSize.height >= 0 && deltaSize.width >= 0;
        var shaderOffset = this.option("shading") && !this.option("container") && !this._isWindow(this._getContainer()) ? translator.locate(this._$wrapper) : {
            top: 0,
            left: 0
        };
        var boundaryOffset = this.option("boundaryOffset");
        return {
            top: isAllowedDrag ? position.top + shaderOffset.top + boundaryOffset.v : 0,
            bottom: isAllowedDrag ? -position.top - shaderOffset.top + deltaSize.height - boundaryOffset.v : 0,
            left: isAllowedDrag ? position.left + shaderOffset.left + boundaryOffset.h : 0,
            right: isAllowedDrag ? -position.left - shaderOffset.left + deltaSize.width - boundaryOffset.h : 0
        }
    },
    _moveFromContainer: function() {
        this._$content.appendTo(this.$element());
        this._detachWrapperToContainer()
    },
    _detachWrapperToContainer: function() {
        this._$wrapper.detach()
    },
    _moveToContainer: function() {
        this._attachWrapperToContainer();
        this._$content.appendTo(this._$wrapper)
    },
    _attachWrapperToContainer: function() {
        var $element = this.$element();
        var containerDefined = void 0 !== this.option("container");
        var renderContainer = containerDefined ? this._$container : swatch.getSwatchContainer($element);
        if (renderContainer && renderContainer[0] === $element.parent()[0]) {
            renderContainer = $element
        }
        this._$wrapper.appendTo(renderContainer)
    },
    _fixHeightAfterSafariAddressBarResizing: function() {
        if (this._isWindow(this._getContainer()) && hasSafariAddressBar) {
            this._$wrapper.css("minHeight", window.innerHeight)
        }
    },
    _renderGeometry: function(isDimensionChanged) {
        if (this.option("visible") && windowUtils.hasWindow()) {
            this._renderGeometryImpl(isDimensionChanged)
        }
    },
    _renderGeometryImpl: function(isDimensionChanged) {
        this._stopAnimation();
        this._normalizePosition();
        this._renderWrapper();
        this._fixHeightAfterSafariAddressBarResizing();
        this._renderDimensions();
        var resultPosition = this._renderPosition();
        this._actions.onPositioned({
            position: resultPosition
        })
    },
    _fixWrapperPosition: function() {
        this._$wrapper.css("position", this._useFixedPosition() ? "fixed" : "absolute")
    },
    _useFixedPosition: function() {
        var $container = this._getContainer();
        return this._isWindow($container) && (!iOS || void 0 !== this._bodyScrollTop)
    },
    _toggleSafariScrolling: function(scrollingEnabled) {
        if (iOS && this._useFixedPosition()) {
            var body = domAdapter.getBody();
            if (scrollingEnabled) {
                $(body).removeClass(PREVENT_SAFARI_SCROLLING_CLASS);
                window.scrollTo(0, this._bodyScrollTop);
                this._bodyScrollTop = void 0
            } else {
                if (this.option("visible")) {
                    this._bodyScrollTop = window.pageYOffset;
                    $(body).addClass(PREVENT_SAFARI_SCROLLING_CLASS)
                }
            }
        }
    },
    _renderWrapper: function() {
        this._fixWrapperPosition();
        this._renderWrapperDimensions();
        this._renderWrapperPosition()
    },
    _renderWrapperDimensions: function() {
        var wrapperWidth;
        var wrapperHeight;
        var $container = this._getContainer();
        if (!$container) {
            return
        }
        var isWindow = this._isWindow($container);
        wrapperWidth = isWindow ? null : $container.outerWidth(), wrapperHeight = isWindow ? null : $container.outerHeight();
        this._$wrapper.css({
            width: wrapperWidth,
            height: wrapperHeight
        })
    },
    _isWindow: function($element) {
        return !!$element && typeUtils.isWindow($element.get(0))
    },
    _renderWrapperPosition: function() {
        var $container = this._getContainer();
        if ($container) {
            positionUtils.setup(this._$wrapper, {
                my: "top left",
                at: "top left",
                of: $container
            })
        }
    },
    _getContainer: function() {
        var position = this._position;
        var container = this.option("container");
        var positionOf = null;
        if (!container && position) {
            var isEvent = !!(position.of && position.of.preventDefault);
            positionOf = isEvent ? window : position.of || window
        }
        return getElement(container || positionOf)
    },
    _renderDimensions: function() {
        var content = this._$content.get(0);
        this._$content.css({
            minWidth: this._getOptionValue("minWidth", content),
            maxWidth: this._getOptionValue("maxWidth", content),
            minHeight: this._getOptionValue("minHeight", content),
            maxHeight: this._getOptionValue("maxHeight", content),
            width: this._getOptionValue("width", content),
            height: this._getOptionValue("height", content)
        })
    },
    _renderPosition: function() {
        if (this._positionChangeHandled) {
            var allowedOffsets = this._allowedOffsets();
            this._changePosition({
                top: fitIntoRange(0, -allowedOffsets.top, allowedOffsets.bottom),
                left: fitIntoRange(0, -allowedOffsets.left, allowedOffsets.right)
            })
        } else {
            this._renderOverlayBoundaryOffset();
            translator.resetPosition(this._$content);
            var position = this._transformStringPosition(this._position, POSITION_ALIASES);
            var resultPosition = positionUtils.setup(this._$content, position);
            forceRepaint(this._$content);
            this._actions.onPositioning();
            return resultPosition
        }
    },
    _transformStringPosition: function(position, positionAliases) {
        if (typeUtils.isString(position)) {
            position = extend({}, positionAliases[position])
        }
        return position
    },
    _renderOverlayBoundaryOffset: function() {
        var boundaryOffset = this.option("boundaryOffset");
        this._$content.css("margin", boundaryOffset.v + "px " + boundaryOffset.h + "px")
    },
    _focusTarget: function() {
        return this._$content
    },
    _attachKeyboardEvents: function() {
        var _this2 = this;
        this._keyboardListenerId = keyboard.on(this._$content, null, function(opts) {
            return _this2._keyboardHandler(opts)
        })
    },
    _keyboardHandler: function(options) {
        var e = options.originalEvent;
        var $target = $(e.target);
        if ($target.is(this._$content) || !this.option("ignoreChildEvents")) {
            this.callBase.apply(this, arguments)
        }
    },
    _isVisible: function() {
        return this.option("visible")
    },
    _visibilityChanged: function(visible) {
        if (visible) {
            if (this.option("visible")) {
                this._renderVisibilityAnimate(visible)
            }
        } else {
            this._renderVisibilityAnimate(visible)
        }
    },
    _dimensionChanged: function() {
        this._renderGeometry(true)
    },
    _clean: function() {
        if (!this._contentAlreadyRendered) {
            this.$content().empty()
        }
        this._renderVisibility(false);
        this._stopShowTimer();
        this._cleanFocusState()
    },
    _stopShowTimer: function() {
        if (this._asyncShowTimeout) {
            clearTimeout(this._asyncShowTimeout)
        }
        this._asyncShowTimeout = null
    },
    _dispose: function() {
        fx.stop(this._$content, false);
        clearTimeout(this._deferShowTimer);
        this._toggleViewPortSubscription(false);
        this._toggleSubscriptions(false);
        this._updateZIndexStackPosition(false);
        this._toggleTabTerminator(false);
        this._toggleSafariScrolling(true);
        this._actions = null;
        this.callBase();
        zIndexPool.remove(this._zIndex);
        this._$wrapper.remove();
        this._$content.remove()
    },
    _toggleDisabledState: function(value) {
        this.callBase.apply(this, arguments);
        this._$content.toggleClass(DISABLED_STATE_CLASS, Boolean(value))
    },
    _toggleRTLDirection: function(rtl) {
        this._$content.toggleClass(RTL_DIRECTION_CLASS, rtl)
    },
    _optionChanged: function(args) {
        var value = args.value;
        if (inArray(args.name, ACTIONS) > -1) {
            this._initActions();
            return
        }
        switch (args.name) {
            case "dragEnabled":
                this._renderDrag();
                this._renderGeometry();
                break;
            case "resizeEnabled":
                this._renderResize();
                this._renderGeometry();
                break;
            case "shading":
            case "shadingColor":
                this._toggleShading(this.option("visible"));
                break;
            case "width":
            case "height":
            case "minWidth":
            case "maxWidth":
            case "minHeight":
            case "maxHeight":
            case "boundaryOffset":
                this._renderGeometry();
                break;
            case "position":
                this._positionChangeHandled = false;
                this._renderGeometry();
                break;
            case "visible":
                this._renderVisibilityAnimate(value).done(function() {
                    if (!this._animateDeferred) {
                        return
                    }
                    this._animateDeferred.resolveWith(this)
                }.bind(this));
                break;
            case "target":
                this._initTarget(value);
                this._invalidate();
                break;
            case "container":
                this._initContainer(value);
                this._invalidate();
                break;
            case "innerOverlay":
                this._initInnerOverlayClass();
                break;
            case "deferRendering":
            case "contentTemplate":
                this._contentAlreadyRendered = false;
                this._clean();
                this._invalidate();
                break;
            case "hideTopOverlayHandler":
                this._toggleHideTopOverlayCallback(false);
                this._initHideTopOverlayHandler(args.value);
                this._toggleHideTopOverlayCallback(this.option("visible"));
                break;
            case "closeOnTargetScroll":
                this._toggleParentsScrollSubscription(this.option("visible"));
                break;
            case "closeOnOutsideClick":
            case "animation":
            case "propagateOutsideClick":
                break;
            case "rtlEnabled":
                this._contentAlreadyRendered = false;
                this.callBase(args);
                break;
            default:
                this.callBase(args)
        }
    },
    toggle: function(showing) {
        showing = void 0 === showing ? !this.option("visible") : showing;
        var result = new Deferred;
        if (showing === this.option("visible")) {
            return result.resolveWith(this, [showing]).promise()
        }
        var animateDeferred = new Deferred;
        this._animateDeferred = animateDeferred;
        this.option("visible", showing);
        animateDeferred.promise().done(function() {
            delete this._animateDeferred;
            result.resolveWith(this, [this.option("visible")])
        }.bind(this));
        return result.promise()
    },
    $content: function() {
        return this._$content
    },
    show: function() {
        return this.toggle(true)
    },
    hide: function() {
        return this.toggle(false)
    },
    content: function() {
        return getPublicElement(this._$content);
    },
    repaint: function() {
        this._renderGeometry();
        domUtils.triggerResizeEvent(this._$content)
    }
});
Overlay.baseZIndex = function(zIndex) {
    return zIndexPool.base(zIndex)
};
registerComponent("dxOverlay", Overlay);
module.exports = Overlay;
