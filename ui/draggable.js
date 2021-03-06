/**
 * DevExtreme (ui/draggable.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";

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
var $ = require("../core/renderer");
var window = require("../core/utils/window").getWindow();
var eventsEngine = require("../events/core/events_engine");
var stringUtils = require("../core/utils/string");
var registerComponent = require("../core/component_registrator");
var translator = require("../animation/translator");
var Animator = require("./scroll_view/animator");
var browser = require("../core/utils/browser");
var dasherize = require("../core/utils/inflector").dasherize;
var extend = require("../core/utils/extend").extend;
var DOMComponent = require("../core/dom_component");
var getPublicElement = require("../core/utils/dom").getPublicElement;
var eventUtils = require("../events/utils");
var pointerEvents = require("../events/pointer");
var dragEvents = require("../events/drag");
var positionUtils = require("../animation/position");
var typeUtils = require("../core/utils/type");
var noop = require("../core/utils/common").noop;
var viewPortUtils = require("../core/utils/view_port");
var commonUtils = require("../core/utils/common");
var EmptyTemplate = require("../core/templates/empty_template").EmptyTemplate;
var deferredUtils = require("../core/utils/deferred");
var when = deferredUtils.when;
var fromPromise = deferredUtils.fromPromise;
var DRAGGABLE = "dxDraggable";
var DRAGSTART_EVENT_NAME = eventUtils.addNamespace(dragEvents.start, DRAGGABLE);
var DRAG_EVENT_NAME = eventUtils.addNamespace(dragEvents.move, DRAGGABLE);
var DRAGEND_EVENT_NAME = eventUtils.addNamespace(dragEvents.end, DRAGGABLE);
var DRAG_ENTER_EVENT_NAME = eventUtils.addNamespace(dragEvents.enter, DRAGGABLE);
var DRAGEND_LEAVE_EVENT_NAME = eventUtils.addNamespace(dragEvents.leave, DRAGGABLE);
var POINTERDOWN_EVENT_NAME = eventUtils.addNamespace(pointerEvents.down, DRAGGABLE);
var CLONE_CLASS = "clone";
var targetDraggable;
var sourceDraggable;
var ANONYMOUS_TEMPLATE_NAME = "content";
var ScrollHelper = function() {
    function ScrollHelper(orientation, component) {
        _classCallCheck(this, ScrollHelper);
        this._preventScroll = true;
        this._component = component;
        if ("vertical" === orientation) {
            this._scrollValue = "scrollTop";
            this._overFlowAttr = "overflowY";
            this._sizeAttr = "height";
            this._scrollSizeProp = "scrollHeight";
            this._limitProps = {
                start: "top",
                end: "bottom"
            }
        } else {
            this._scrollValue = "scrollLeft";
            this._overFlowAttr = "overflowX";
            this._sizeAttr = "width";
            this._scrollSizeProp = "scrollWidth";
            this._limitProps = {
                start: "left",
                end: "right"
            }
        }
    }
    _createClass(ScrollHelper, [{
        key: "updateScrollable",
        value: function(elements, mousePosition) {
            var that = this;
            if (!elements.some(function(element) {
                    return that._trySetScrollable(element, mousePosition)
                })) {
                that._$scrollable = null;
                that._scrollSpeed = 0
            }
        }
    }, {
        key: "isScrolling",
        value: function() {
            return !!this._scrollSpeed
        }
    }, {
        key: "isScrollable",
        value: function($element) {
            var that = this;
            return ("auto" === $element.css(that._overFlowAttr) || $element.hasClass("dx-scrollable-container")) && $element.prop(that._scrollSizeProp) > $element[that._sizeAttr]()
        }
    }, {
        key: "_trySetScrollable",
        value: function(element, mousePosition) {
            var that = this;
            var $element = $(element);
            var distanceToBorders;
            var sensitivity = that._component.option("scrollSensitivity");
            var isScrollable = that.isScrollable($element);
            if (isScrollable) {
                distanceToBorders = that._calculateDistanceToBorders($element, mousePosition);
                if (sensitivity > distanceToBorders[that._limitProps.start]) {
                    if (!that._preventScroll) {
                        that._scrollSpeed = -that._calculateScrollSpeed(distanceToBorders[that._limitProps.start]);
                        that._$scrollable = $element
                    }
                } else {
                    if (sensitivity > distanceToBorders[that._limitProps.end]) {
                        if (!that._preventScroll) {
                            that._scrollSpeed = that._calculateScrollSpeed(distanceToBorders[that._limitProps.end]);
                            that._$scrollable = $element
                        }
                    } else {
                        isScrollable = false;
                        that._preventScroll = false
                    }
                }
            }
            return isScrollable
        }
    }, {
        key: "_calculateDistanceToBorders",
        value: function($area, mousePosition) {
            var area = $area.get(0);
            var areaBoundingRect;
            if (area) {
                areaBoundingRect = area.getBoundingClientRect();
                return {
                    left: mousePosition.x - areaBoundingRect.left,
                    top: mousePosition.y - areaBoundingRect.top,
                    right: areaBoundingRect.right - mousePosition.x,
                    bottom: areaBoundingRect.bottom - mousePosition.y
                }
            } else {
                return {}
            }
        }
    }, {
        key: "_calculateScrollSpeed",
        value: function(distance) {
            var component = this._component;
            var sensitivity = component.option("scrollSensitivity");
            var maxSpeed = component.option("scrollSpeed");
            return Math.ceil(Math.pow((sensitivity - distance) / sensitivity, 2) * maxSpeed)
        }
    }, {
        key: "scrollByStep",
        value: function() {
            var that = this;
            var nextScrollPosition;
            if (that._$scrollable && that._scrollSpeed) {
                if (that._$scrollable.hasClass("dx-scrollable-container")) {
                    var $scrollable = that._$scrollable.closest(".dx-scrollable");
                    var scrollableInstance = $scrollable.data("dxScrollable") || $scrollable.data("dxScrollView");
                    if (scrollableInstance) {
                        nextScrollPosition = scrollableInstance.scrollOffset();
                        nextScrollPosition[that._limitProps.start] += that._scrollSpeed;
                        scrollableInstance.scrollTo(nextScrollPosition)
                    }
                } else {
                    nextScrollPosition = that._$scrollable[that._scrollValue]() + that._scrollSpeed;
                    that._$scrollable[that._scrollValue](nextScrollPosition)
                }
                var dragMoveArgs = that._component._dragMoveArgs;
                if (dragMoveArgs) {
                    that._component._dragMoveHandler(dragMoveArgs)
                }
            }
        }
    }, {
        key: "reset",
        value: function() {
            this._$scrollable = null;
            this._scrollSpeed = 0;
            this._preventScroll = true
        }
    }, {
        key: "isOutsideScrollable",
        value: function(target, event) {
            var component = this._component;
            if (!component._$scrollable || !target.closest(component._$scrollable).length) {
                return false
            }
            var scrollableSize = component._$scrollable.get(0).getBoundingClientRect();
            var start = scrollableSize[this._limitProps.start];
            var size = scrollableSize[this._sizeAttr];
            var location = "width" === this._sizeAttr ? event.pageX : event.pageY;
            return location < start || location > start + size
        }
    }]);
    return ScrollHelper
}();
var ScrollAnimator = Animator.inherit({
    ctor: function(strategy) {
        this.callBase();
        this._strategy = strategy
    },
    _step: function() {
        var horizontalScrollHelper = this._strategy._horizontalScrollHelper;
        var verticalScrollHelper = this._strategy._verticalScrollHelper;
        horizontalScrollHelper && horizontalScrollHelper.scrollByStep();
        verticalScrollHelper && verticalScrollHelper.scrollByStep()
    }
});
var Draggable = DOMComponent.inherit({
    reset: noop,
    dragMove: noop,
    dragEnter: noop,
    dragLeave: noop,
    dragEnd: function(sourceEvent) {
        var sourceDraggable = this._getSourceDraggable();
        sourceDraggable._fireRemoveEvent(sourceEvent)
    },
    _fireRemoveEvent: noop,
    _getDefaultOptions: function() {
        return extend(this.callBase(), {
            onDragStart: null,
            onDragMove: null,
            onDragEnd: null,
            onDrop: null,
            immediate: true,
            dragDirection: "both",
            boundary: void 0,
            boundOffset: 0,
            allowMoveByClick: false,
            itemData: null,
            container: void 0,
            dragTemplate: void 0,
            contentTemplate: "content",
            handle: "",
            filter: "",
            clone: false,
            autoScroll: true,
            scrollSpeed: 30,
            scrollSensitivity: 60,
            group: void 0,
            data: void 0
        })
    },
    _setOptionsByReference: function() {
        this.callBase.apply(this, arguments);
        extend(this._optionsByReference, {
            component: true,
            group: true,
            itemData: true,
            data: true
        })
    },
    _init: function() {
        this.callBase();
        this._attachEventHandlers();
        this._scrollAnimator = new ScrollAnimator(this);
        this._horizontalScrollHelper = new ScrollHelper("horizontal", this);
        this._verticalScrollHelper = new ScrollHelper("vertical", this)
    },
    _normalizeCursorOffset: function(offset) {
        if (typeUtils.isObject(offset)) {
            offset = {
                h: offset.x,
                v: offset.y
            }
        }
        offset = commonUtils.splitPair(offset).map(function(value) {
            return parseFloat(value)
        });
        return {
            left: offset[0],
            top: 1 === offset.length ? offset[0] : offset[1]
        }
    },
    _getNormalizedCursorOffset: function(offset, options) {
        if (typeUtils.isFunction(offset)) {
            offset = offset.call(this, options)
        }
        return this._normalizeCursorOffset(offset)
    },
    _calculateElementOffset: function(options) {
        var elementOffset;
        var dragElementOffset;
        var event = options.event;
        var $element = $(options.itemElement);
        var $dragElement = $(options.dragElement);
        var isCloned = this._dragElementIsCloned();
        var cursorOffset = this.option("cursorOffset");
        var normalizedCursorOffset = {
            left: 0,
            top: 0
        };
        var currentLocate = this._initialLocate = translator.locate($dragElement);
        if (isCloned || options.initialOffset || cursorOffset) {
            elementOffset = options.initialOffset || $element.offset();
            if (cursorOffset) {
                normalizedCursorOffset = this._getNormalizedCursorOffset(cursorOffset, options);
                if (isFinite(normalizedCursorOffset.left)) {
                    elementOffset.left = event.pageX
                }
                if (isFinite(normalizedCursorOffset.top)) {
                    elementOffset.top = event.pageY
                }
            }
            dragElementOffset = $dragElement.offset();
            elementOffset.top -= dragElementOffset.top + (normalizedCursorOffset.top || 0) - currentLocate.top;
            elementOffset.left -= dragElementOffset.left + (normalizedCursorOffset.left || 0) - currentLocate.left
        }
        return elementOffset
    },
    _initPosition: function(options) {
        var $dragElement = $(options.dragElement);
        var elementOffset = this._calculateElementOffset(options);
        if (elementOffset) {
            this._move(elementOffset, $dragElement)
        }
        this._startPosition = translator.locate($dragElement)
    },
    _startAnimator: function() {
        if (!this._scrollAnimator.inProgress()) {
            this._scrollAnimator.start()
        }
    },
    _stopAnimator: function() {
        this._scrollAnimator.stop()
    },
    _addWidgetPrefix: function(className) {
        var componentName = this.NAME;
        return dasherize(componentName) + (className ? "-" + className : "")
    },
    _getItemsSelector: function() {
        return this.option("filter") || ""
    },
    _$content: function() {
        var $element = this.$element();
        var $wrapper = $element.children(".dx-template-wrapper");
        return $wrapper.length ? $wrapper : $element
    },
    _attachEventHandlers: function() {
        var _this = this;
        if (this.option("disabled")) {
            return
        }
        var $element = this._$content();
        var itemsSelector = this._getItemsSelector();
        var allowMoveByClick = this.option("allowMoveByClick");
        var data = {
            direction: this.option("dragDirection"),
            immediate: this.option("immediate"),
            checkDropTarget: function(target, event) {
                var targetGroup = _this.option("group");
                var sourceGroup = _this._getSourceDraggable().option("group");
                if (_this._verticalScrollHelper.isOutsideScrollable(target, event) || _this._horizontalScrollHelper.isOutsideScrollable(target, event)) {
                    return false
                }
                return sourceGroup && sourceGroup === targetGroup
            }
        };
        if (allowMoveByClick) {
            $element = this._getArea();
            eventsEngine.on($element, POINTERDOWN_EVENT_NAME, data, this._pointerDownHandler.bind(this))
        }
        if (">" === itemsSelector[0]) {
            itemsSelector = itemsSelector.slice(1)
        }
        eventsEngine.on($element, DRAGSTART_EVENT_NAME, itemsSelector, data, this._dragStartHandler.bind(this));
        eventsEngine.on($element, DRAG_EVENT_NAME, data, this._dragMoveHandler.bind(this));
        eventsEngine.on($element, DRAGEND_EVENT_NAME, data, this._dragEndHandler.bind(this));
        eventsEngine.on($element, DRAG_ENTER_EVENT_NAME, data, this._dragEnterHandler.bind(this));
        eventsEngine.on($element, DRAGEND_LEAVE_EVENT_NAME, data, this._dragLeaveHandler.bind(this))
    },
    _dragElementIsCloned: function() {
        return this._$dragElement && this._$dragElement.hasClass(this._addWidgetPrefix(CLONE_CLASS))
    },
    _getDragTemplateArgs: function($element, $container) {
        return {
            container: getPublicElement($container),
            model: {
                itemData: this.option("itemData"),
                itemElement: getPublicElement($element)
            }
        }
    },
    _createDragElement: function($element) {
        var result = $element;
        var clone = this.option("clone");
        var $container = this._getContainer();
        var template = this.option("dragTemplate");
        if (template) {
            template = this._getTemplate(template);
            result = $("<div>").appendTo($container);
            template.render(this._getDragTemplateArgs($element, result))
        } else {
            if (clone) {
                result = $("<div>").appendTo($container);
                $element.clone().css({
                    width: $element.css("width"),
                    height: $element.css("height")
                }).appendTo(result)
            }
        }
        return result.toggleClass(this._addWidgetPrefix(CLONE_CLASS), result.get(0) !== $element.get(0)).toggleClass("dx-rtl", this.option("rtlEnabled"))
    },
    _resetDragElement: function() {
        if (this._dragElementIsCloned()) {
            this._$dragElement.remove()
        } else {
            this._toggleDraggingClass(false)
        }
        this._$dragElement = null
    },
    _resetSourceElement: function() {
        this._toggleDragSourceClass(false);
        this._$sourceElement = null
    },
    _detachEventHandlers: function() {
        eventsEngine.off(this._$content(), "." + DRAGGABLE);
        eventsEngine.off(this._getArea(), "." + DRAGGABLE)
    },
    _move: function(position, $element) {
        translator.move($element || this._$dragElement, position)
    },
    _getDraggableElement: function(e) {
        var $sourceElement = this._getSourceElement();
        if ($sourceElement) {
            return $sourceElement
        }
        var allowMoveByClick = this.option("allowMoveByClick");
        if (allowMoveByClick) {
            return this.$element()
        }
        var $target = $(e && e.target);
        var itemsSelector = this._getItemsSelector();
        if (">" === itemsSelector[0]) {
            var $items = this._$content().find(itemsSelector);
            if (!$items.is($target)) {
                $target = $target.closest($items)
            }
        }
        return $target
    },
    _getSourceElement: function() {
        var draggable = this._getSourceDraggable();
        return draggable._$sourceElement
    },
    _pointerDownHandler: function(e) {
        if (eventUtils.needSkipEvent(e)) {
            return
        }
        var position = {};
        var $element = this.$element();
        var dragDirection = this.option("dragDirection");
        if ("horizontal" === dragDirection || "both" === dragDirection) {
            position.left = e.pageX - $element.offset().left + translator.locate($element).left - $element.width() / 2
        }
        if ("vertical" === dragDirection || "both" === dragDirection) {
            position.top = e.pageY - $element.offset().top + translator.locate($element).top - $element.height() / 2
        }
        this._move(position, $element);
        this._getAction("onDragMove")(this._getEventArgs(e))
    },
    _isValidElement: function(event, $element) {
        var handle = this.option("handle");
        var $target = $(event.originalEvent && event.originalEvent.target);
        if (handle && !$target.closest(handle).length) {
            return false
        }
        if (!$element.length) {
            return false
        }
        return !$element.is(".dx-state-disabled, .dx-state-disabled *")
    },
    _dragStartHandler: function(e) {
        var $dragElement;
        var initialOffset;
        var isFixedPosition;
        var $element = this._getDraggableElement(e);
        if (this._$sourceElement) {
            return
        }
        if (!this._isValidElement(e, $element)) {
            e.cancel = true;
            return
        }
        var dragStartArgs = this._getDragStartArgs(e, $element);
        this._getAction("onDragStart")(dragStartArgs);
        if (dragStartArgs.cancel) {
            e.cancel = true;
            return
        }
        this.option("itemData", dragStartArgs.itemData);
        this._setSourceDraggable();
        this._$sourceElement = $element;
        initialOffset = $element.offset();
        $dragElement = this._$dragElement = this._createDragElement($element);
        this._toggleDraggingClass(true);
        this._toggleDragSourceClass(true);
        isFixedPosition = "fixed" === $dragElement.css("position");
        this._initPosition(extend({}, dragStartArgs, {
            dragElement: $dragElement.get(0),
            initialOffset: isFixedPosition && initialOffset
        }));
        var $area = this._getArea();
        var areaOffset = this._getAreaOffset($area);
        var boundOffset = this._getBoundOffset();
        var areaWidth = $area.outerWidth();
        var areaHeight = $area.outerHeight();
        var elementWidth = $dragElement.width();
        var elementHeight = $dragElement.height();
        var startOffset = {
            left: $dragElement.offset().left - areaOffset.left,
            top: $dragElement.offset().top - areaOffset.top
        };
        if ($area.length) {
            e.maxLeftOffset = startOffset.left - boundOffset.left;
            e.maxRightOffset = areaWidth - startOffset.left - elementWidth - boundOffset.right;
            e.maxTopOffset = startOffset.top - boundOffset.top;
            e.maxBottomOffset = areaHeight - startOffset.top - elementHeight - boundOffset.bottom
        }
        if (this.option("autoScroll")) {
            this._startAnimator()
        }
    },
    _getAreaOffset: function($area) {
        var offset = $area && positionUtils.offset($area);
        return offset ? offset : {
            left: 0,
            top: 0
        }
    },
    _toggleDraggingClass: function(value) {
        this._$dragElement && this._$dragElement.toggleClass(this._addWidgetPrefix("dragging"), value)
    },
    _toggleDragSourceClass: function(value, $element) {
        var $sourceElement = $element || this._$sourceElement;
        $sourceElement && $sourceElement.toggleClass(this._addWidgetPrefix("source"), value)
    },
    _getBoundOffset: function() {
        var boundOffset = this.option("boundOffset");
        if (typeUtils.isFunction(boundOffset)) {
            boundOffset = boundOffset.call(this)
        }
        return stringUtils.quadToObject(boundOffset)
    },
    _getArea: function() {
        var area = this.option("boundary");
        if (typeUtils.isFunction(area)) {
            area = area.call(this)
        }
        return $(area)
    },
    _getContainer: function() {
        var container = this.option("container");
        if (void 0 === container) {
            container = viewPortUtils.value()
        }
        return $(container)
    },
    _dragMoveHandler: function(e) {
        this._dragMoveArgs = e;
        if (!this._$dragElement) {
            e.cancel = true;
            return
        }
        var offset = e.offset;
        var startPosition = this._startPosition;
        this._move({
            left: startPosition.left + offset.x,
            top: startPosition.top + offset.y
        });
        this._updateScrollable(e);
        var eventArgs = this._getEventArgs(e);
        this._getAction("onDragMove")(eventArgs);
        if (true === eventArgs.cancel) {
            return
        }
        var targetDraggable = this._getTargetDraggable();
        targetDraggable.dragMove(e)
    },
    _updateScrollable: function(e) {
        var that = this;
        if (that.option("autoScroll")) {
            var $window = $(window);
            var mousePosition = {
                x: e.pageX - $window.scrollLeft(),
                y: e.pageY - $window.scrollTop()
            };
            var allObjects = that.getElementsFromPoint(mousePosition);
            that._verticalScrollHelper.updateScrollable(allObjects, mousePosition);
            that._horizontalScrollHelper.updateScrollable(allObjects, mousePosition)
        }
    },
    getElementsFromPoint: function(position) {
        var ownerDocument = this._$dragElement.get(0).ownerDocument;
        if (browser.msie) {
            var msElements = ownerDocument.msElementsFromPoint(position.x, position.y);
            if (msElements) {
                return Array.prototype.slice.call(msElements)
            }
            return []
        }
        return ownerDocument.elementsFromPoint(position.x, position.y)
    },
    _defaultActionArgs: function() {
        var args = this.callBase.apply(this, arguments);
        var component = this.option("component");
        if (component) {
            args.component = component;
            args.element = component.element()
        }
        return args
    },
    _getEventArgs: function(e) {
        var sourceDraggable = this._getSourceDraggable();
        var targetDraggable = this._getTargetDraggable();
        return {
            event: e,
            itemData: sourceDraggable.option("itemData"),
            itemElement: getPublicElement(sourceDraggable._$sourceElement),
            fromComponent: sourceDraggable.option("component") || sourceDraggable,
            toComponent: targetDraggable.option("component") || targetDraggable,
            fromData: sourceDraggable.option("data"),
            toData: targetDraggable.option("data")
        }
    },
    _getDragStartArgs: function(e, $itemElement) {
        var args = this._getEventArgs(e);
        return {
            event: args.event,
            itemData: args.itemData,
            itemElement: $itemElement,
            fromData: args.fromData
        }
    },
    _revertItemToInitialPosition: function() {
        !this._dragElementIsCloned() && this._move(this._initialLocate, this._$sourceElement)
    },
    _dragEndHandler: function(e) {
        var _this2 = this;
        var dragEndEventArgs = this._getEventArgs(e);
        var dropEventArgs = this._getEventArgs(e);
        var targetDraggable = this._getTargetDraggable();
        var needRevertPosition = true;
        try {
            this._getAction("onDragEnd")(dragEndEventArgs)
        } finally {
            when(fromPromise(dragEndEventArgs.cancel)).done(function(cancel) {
                if (!cancel) {
                    if (targetDraggable !== _this2) {
                        targetDraggable._getAction("onDrop")(dropEventArgs)
                    }
                    if (!dropEventArgs.cancel) {
                        targetDraggable.dragEnd(dragEndEventArgs);
                        needRevertPosition = false
                    }
                }
            }).always(function() {
                if (needRevertPosition) {
                    _this2._revertItemToInitialPosition()
                }
                _this2.reset();
                targetDraggable.reset();
                _this2._stopAnimator();
                _this2._horizontalScrollHelper.reset();
                _this2._verticalScrollHelper.reset();
                _this2._resetDragElement();
                _this2._resetSourceElement();
                _this2._resetTargetDraggable();
                _this2._resetSourceDraggable()
            })
        }
    },
    _dragEnterHandler: function(e) {
        this._setTargetDraggable();
        var sourceDraggable = this._getSourceDraggable();
        sourceDraggable.dragEnter(e)
    },
    _dragLeaveHandler: function(e) {
        this._resetTargetDraggable();
        if (this !== this._getSourceDraggable()) {
            this.reset()
        }
        var sourceDraggable = this._getSourceDraggable();
        sourceDraggable.dragLeave(e)
    },
    _getAction: function(name) {
        return this["_" + name + "Action"] || this._createActionByOption(name)
    },
    _getAnonymousTemplateName: function() {
        return ANONYMOUS_TEMPLATE_NAME
    },
    _initTemplates: function() {
        if (!this.option("contentTemplate")) {
            return
        }
        this._templateManager.addDefaultTemplates({
            content: new EmptyTemplate
        });
        this.callBase.apply(this, arguments)
    },
    _render: function() {
        this.callBase();
        this.$element().addClass(this._addWidgetPrefix());
        var transclude = this._templateManager.anonymousTemplateName === this.option("contentTemplate");
        var template = this._getTemplateByOption("contentTemplate");
        if (template) {
            $(template.render({
                container: this.element(),
                transclude: transclude
            }))
        }
    },
    _optionChanged: function(args) {
        var name = args.name;
        switch (name) {
            case "onDragStart":
            case "onDragMove":
            case "onDragEnd":
            case "onDrop":
                this["_" + name + "Action"] = this._createActionByOption(name);
                break;
            case "dragTemplate":
            case "contentTemplate":
            case "container":
            case "clone":
                this._resetDragElement();
                break;
            case "allowMoveByClick":
            case "dragDirection":
            case "disabled":
            case "boundary":
            case "filter":
            case "immediate":
                this._resetDragElement();
                this._detachEventHandlers();
                this._attachEventHandlers();
                break;
            case "autoScroll":
                this._verticalScrollHelper.reset();
                this._horizontalScrollHelper.reset();
                break;
            case "scrollSensitivity":
            case "scrollSpeed":
            case "boundOffset":
            case "handle":
            case "group":
            case "data":
            case "itemData":
                break;
            default:
                this.callBase(args)
        }
    },
    _getTargetDraggable: function() {
        return targetDraggable || this
    },
    _getSourceDraggable: function() {
        return sourceDraggable || this
    },
    _setTargetDraggable: function() {
        var currentGroup = this.option("group");
        var sourceDraggable = this._getSourceDraggable();
        if (currentGroup && currentGroup === sourceDraggable.option("group")) {
            targetDraggable = this
        }
    },
    _setSourceDraggable: function() {
        sourceDraggable = this
    },
    _resetSourceDraggable: function() {
        sourceDraggable = null
    },
    _resetTargetDraggable: function() {
        targetDraggable = null
    },
    _dispose: function() {
        this.callBase();
        this._detachEventHandlers();
        this._resetDragElement();
        this._resetTargetDraggable();
        this._resetSourceDraggable();
        this._$sourceElement = null;
        this._stopAnimator()
    }
});
registerComponent(DRAGGABLE, Draggable);
module.exports = Draggable;
module.exports.default = module.exports;
