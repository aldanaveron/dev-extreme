/**
 * DevExtreme (ui/defer_rendering.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var $ = require("../core/renderer");
var domAdapter = require("../core/dom_adapter");
var windowUtils = require("../core/utils/window");
var window = windowUtils.getWindow();
var eventsEngine = require("../events/core/events_engine");
var registerComponent = require("../core/component_registrator");
var commonUtils = require("../core/utils/common");
var extend = require("../core/utils/extend").extend;
var each = require("../core/utils/iterator").each;
var domUtils = require("../core/utils/dom");
var TransitionExecutorModule = require("../animation/transition_executor/transition_executor");
var Widget = require("./widget/ui.widget");
var LoadIndicator = require("./load_indicator");
var isPromise = require("../core/utils/type").isPromise;
var deferredUtils = require("../core/utils/deferred");
var Deferred = deferredUtils.Deferred;
var WIDGET_CLASS = "dx-widget";
var DEFER_RENDERING_CLASS = "dx-deferrendering";
var PENDING_RENDERING_CLASS = "dx-pending-rendering";
var PENDING_RENDERING_MANUAL_CLASS = "dx-pending-rendering-manual";
var PENDING_RENDERING_ACTIVE_CLASS = "dx-pending-rendering-active";
var VISIBLE_WHILE_PENDING_RENDERING_CLASS = "dx-visible-while-pending-rendering";
var INVISIBLE_WHILE_PENDING_RENDERING_CLASS = "dx-invisible-while-pending-rendering";
var LOADINDICATOR_CONTAINER_CLASS = "dx-loadindicator-container";
var DEFER_RENDERING_LOADINDICATOR_CONTAINER_CLASS = "dx-deferrendering-loadindicator-container";
var DEFER_DEFER_RENDERING_LOAD_INDICATOR = "dx-deferrendering-load-indicator";
var ANONYMOUS_TEMPLATE_NAME = "content";
var ACTIONS = ["onRendered", "onShown"];
var DeferRendering = Widget.inherit({
    _getDefaultOptions: function() {
        return extend(this.callBase(), {
            showLoadIndicator: false,
            renderWhen: void 0,
            animation: void 0,
            staggerItemSelector: void 0,
            onRendered: null,
            onShown: null
        })
    },
    _getAnonymousTemplateName: function() {
        return ANONYMOUS_TEMPLATE_NAME
    },
    _init: function() {
        this.transitionExecutor = new TransitionExecutorModule.TransitionExecutor;
        this._initElement();
        this._initRender();
        this._$initialContent = this.$element().clone().contents();
        this._initActions();
        this.callBase()
    },
    _initElement: function() {
        this.$element().addClass(DEFER_RENDERING_CLASS)
    },
    _initRender: function() {
        var that = this;
        var $element = this.$element();
        var renderWhen = this.option("renderWhen");
        var doRender = function() {
            return that._renderDeferredContent()
        };
        if (isPromise(renderWhen)) {
            deferredUtils.fromPromise(renderWhen).done(doRender)
        } else {
            $element.data("dx-render-delegate", doRender);
            if (void 0 === renderWhen) {
                $element.addClass(PENDING_RENDERING_MANUAL_CLASS)
            }
        }
    },
    _initActions: function() {
        this._actions = {};
        each(ACTIONS, function(_, action) {
            this._actions[action] = this._createActionByOption(action) || commonUtils.noop
        }.bind(this))
    },
    _initMarkup: function() {
        this.callBase();
        if (!this._initContent) {
            this._initContent = this._renderContent;
            this._renderContent = function() {}
        }
        this._initContent()
    },
    _renderContentImpl: function() {
        this.$element().removeClass(WIDGET_CLASS);
        this.$element().append(this._$initialContent);
        this._setLoadingState()
    },
    _renderDeferredContent: function() {
        var that = this;
        var $element = this.$element();
        var result = new Deferred;
        $element.removeClass(PENDING_RENDERING_MANUAL_CLASS);
        $element.addClass(PENDING_RENDERING_ACTIVE_CLASS);
        this._abortRenderTask();
        this._renderTask = commonUtils.executeAsync(function() {
            that._renderImpl().done(function() {
                var shownArgs = {
                    element: $element
                };
                that._actions.onShown([shownArgs]);
                result.resolve(shownArgs)
            }).fail(function() {
                result.rejectWith(result, arguments)
            })
        });
        return result.promise()
    },
    _isElementInViewport: function(element) {
        var rect = element.getBoundingClientRect();
        return rect.bottom >= 0 && rect.right >= 0 && rect.top <= (window.innerHeight || domAdapter.getDocumentElement().clientHeight) && rect.left <= (window.innerWidth || domAdapter.getDocumentElement().clientWidth)
    },
    _animate: function() {
        var that = this;
        var $element = this.$element();
        var animation = windowUtils.hasWindow() && this.option("animation");
        var staggerItemSelector = this.option("staggerItemSelector");
        var animatePromise;
        that.transitionExecutor.stop();
        if (animation) {
            if (staggerItemSelector) {
                $element.find(staggerItemSelector).each(function() {
                    if (that._isElementInViewport(this)) {
                        that.transitionExecutor.enter($(this), animation)
                    }
                })
            } else {
                that.transitionExecutor.enter($element, animation)
            }
            animatePromise = that.transitionExecutor.start()
        } else {
            animatePromise = (new Deferred).resolve().promise()
        }
        return animatePromise
    },
    _renderImpl: function() {
        var $element = this.$element();
        var renderedArgs = {
            element: $element
        };
        var contentTemplate = this._getTemplate(this._templateManager.anonymousTemplateName);
        if (contentTemplate) {
            contentTemplate.render({
                container: $element.empty(),
                noModel: true
            })
        }
        this._setRenderedState($element);
        eventsEngine.trigger($element, "dxcontentrendered");
        this._actions.onRendered([renderedArgs]);
        this._isRendered = true;
        return this._animate()
    },
    _setLoadingState: function() {
        var $element = this.$element();
        var hasCustomLoadIndicator = !!$element.find("." + VISIBLE_WHILE_PENDING_RENDERING_CLASS).length;
        $element.addClass(PENDING_RENDERING_CLASS);
        if (!hasCustomLoadIndicator) {
            $element.children().addClass(INVISIBLE_WHILE_PENDING_RENDERING_CLASS)
        }
        if (this.option("showLoadIndicator")) {
            this._showLoadIndicator($element)
        }
    },
    _showLoadIndicator: function($container) {
        this._$loadIndicator = new LoadIndicator($("<div>"), {
            visible: true
        }).$element().addClass(DEFER_DEFER_RENDERING_LOAD_INDICATOR);
        $("<div>").addClass(LOADINDICATOR_CONTAINER_CLASS).addClass(DEFER_RENDERING_LOADINDICATOR_CONTAINER_CLASS).append(this._$loadIndicator).appendTo($container)
    },
    _setRenderedState: function() {
        var $element = this.$element();
        if (this._$loadIndicator) {
            this._$loadIndicator.remove()
        }
        $element.removeClass(PENDING_RENDERING_CLASS);
        $element.removeClass(PENDING_RENDERING_ACTIVE_CLASS);
        domUtils.triggerShownEvent($element.children())
    },
    _optionChanged: function(args) {
        var value = args.value;
        var previousValue = args.previousValue;
        switch (args.name) {
            case "renderWhen":
                if (false === previousValue && true === value) {
                    this._renderOrAnimate()
                } else {
                    if (true === previousValue && false === value) {
                        this.transitionExecutor.stop();
                        this._setLoadingState()
                    }
                }
                break;
            case "showLoadIndicator":
            case "onRendered":
            case "onShown":
                break;
            default:
                this.callBase(args)
        }
    },
    _renderOrAnimate: function() {
        var result;
        if (this._isRendered) {
            this._setRenderedState();
            result = this._animate()
        } else {
            result = this._renderDeferredContent()
        }
        return result
    },
    renderContent: function() {
        return this._renderOrAnimate()
    },
    _abortRenderTask: function() {
        if (this._renderTask) {
            this._renderTask.abort();
            this._renderTask = void 0
        }
    },
    _dispose: function() {
        this.transitionExecutor.stop(true);
        this._abortRenderTask();
        this._actions = void 0;
        this._$initialContent = void 0;
        this.callBase()
    }
});
registerComponent("dxDeferRendering", DeferRendering);
module.exports = DeferRendering;
module.exports.default = module.exports;
