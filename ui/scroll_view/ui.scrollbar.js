/**
 * DevExtreme (ui/scroll_view/ui.scrollbar.js)
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
var _renderer = require("../../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _dom_adapter = require("../../core/dom_adapter");
var _dom_adapter2 = _interopRequireDefault(_dom_adapter);
var _events_engine = require("../../events/core/events_engine");
var _events_engine2 = _interopRequireDefault(_events_engine);
var _ready_callbacks = require("../../core/utils/ready_callbacks");
var _ready_callbacks2 = _interopRequireDefault(_ready_callbacks);
var _translator = require("../../animation/translator");
var _translator2 = _interopRequireDefault(_translator);
var _ui = require("../widget/ui.widget");
var _ui2 = _interopRequireDefault(_ui);
var _utils = require("../../events/utils");
var eventUtils = _interopRequireWildcard(_utils);
var _common = require("../../core/utils/common");
var _common2 = _interopRequireDefault(_common);
var _type = require("../../core/utils/type");
var _extend = require("../../core/utils/extend");
var _pointer = require("../../events/pointer");
var _pointer2 = _interopRequireDefault(_pointer);

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
var SCROLLBAR = "dxScrollbar";
var SCROLLABLE_SCROLLBAR_CLASS = "dx-scrollable-scrollbar";
var SCROLLABLE_SCROLLBAR_ACTIVE_CLASS = "".concat(SCROLLABLE_SCROLLBAR_CLASS, "-active");
var SCROLLABLE_SCROLL_CLASS = "dx-scrollable-scroll";
var SCROLLABLE_SCROLL_CONTENT_CLASS = "dx-scrollable-scroll-content";
var HOVER_ENABLED_STATE = "dx-scrollbar-hoverable";
var HORIZONTAL = "horizontal";
var THUMB_MIN_SIZE = 15;
var SCROLLBAR_VISIBLE = {
    onScroll: "onScroll",
    onHover: "onHover",
    always: "always",
    never: "never"
};
var activeScrollbar = null;
var Scrollbar = _ui2.default.inherit({
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            direction: null,
            visible: false,
            activeStateEnabled: false,
            visibilityMode: SCROLLBAR_VISIBLE.onScroll,
            containerSize: 0,
            contentSize: 0,
            expandable: true,
            scaleRatio: 1
        })
    },
    _init: function() {
        this.callBase();
        this._isHovered = false
    },
    _initMarkup: function() {
        this._renderThumb();
        this.callBase()
    },
    _render: function() {
        this.callBase();
        this._renderDirection();
        this._update();
        this._attachPointerDownHandler();
        this.option("hoverStateEnabled", this._isHoverMode());
        this.$element().toggleClass(HOVER_ENABLED_STATE, this.option("hoverStateEnabled"))
    },
    _renderThumb: function() {
        this._$thumb = (0, _renderer2.default)("<div>").addClass(SCROLLABLE_SCROLL_CLASS);
        (0, _renderer2.default)("<div>").addClass(SCROLLABLE_SCROLL_CONTENT_CLASS).appendTo(this._$thumb);
        this.$element().addClass(SCROLLABLE_SCROLLBAR_CLASS).append(this._$thumb)
    },
    isThumb: function($element) {
        return !!this.$element().find($element).length
    },
    _isHoverMode: function() {
        var visibilityMode = this.option("visibilityMode");
        return (visibilityMode === SCROLLBAR_VISIBLE.onHover || visibilityMode === SCROLLBAR_VISIBLE.always) && this.option("expandable")
    },
    _renderDirection: function() {
        var direction = this.option("direction");
        this.$element().addClass("dx-scrollbar-" + direction);
        this._dimension = direction === HORIZONTAL ? "width" : "height";
        this._prop = direction === HORIZONTAL ? "left" : "top"
    },
    _attachPointerDownHandler: function() {
        _events_engine2.default.on(this._$thumb, eventUtils.addNamespace(_pointer2.default.down, SCROLLBAR), this.feedbackOn.bind(this))
    },
    feedbackOn: function() {
        this.$element().addClass(SCROLLABLE_SCROLLBAR_ACTIVE_CLASS);
        activeScrollbar = this
    },
    feedbackOff: function() {
        this.$element().removeClass(SCROLLABLE_SCROLLBAR_ACTIVE_CLASS);
        activeScrollbar = null
    },
    cursorEnter: function() {
        this._isHovered = true;
        if (this._needScrollbar()) {
            this.option("visible", true)
        }
    },
    cursorLeave: function() {
        this._isHovered = false;
        this.option("visible", false)
    },
    _renderDimensions: function() {
        this._$thumb.css({
            width: this.option("width"),
            height: this.option("height")
        })
    },
    _toggleVisibility: function(visible) {
        if (this.option("visibilityMode") === SCROLLBAR_VISIBLE.onScroll) {
            this._$thumb.css("opacity")
        }
        visible = this._adjustVisibility(visible);
        this.option().visible = visible;
        this._$thumb.toggleClass("dx-state-invisible", !visible)
    },
    _adjustVisibility: function(visible) {
        if (this._baseContainerToContentRatio && !this._needScrollbar()) {
            return false
        }
        switch (this.option("visibilityMode")) {
            case SCROLLBAR_VISIBLE.onScroll:
                break;
            case SCROLLBAR_VISIBLE.onHover:
                visible = visible || !!this._isHovered;
                break;
            case SCROLLBAR_VISIBLE.never:
                visible = false;
                break;
            case SCROLLBAR_VISIBLE.always:
                visible = true
        }
        return visible
    },
    moveTo: function(location) {
        if (this._isHidden()) {
            return
        }
        if ((0, _type.isPlainObject)(location)) {
            location = location[this._prop] || 0
        }
        var scrollBarLocation = {};
        scrollBarLocation[this._prop] = this._calculateScrollBarPosition(location);
        _translator2.default.move(this._$thumb, scrollBarLocation)
    },
    _calculateScrollBarPosition: function(location) {
        return -location * this._thumbRatio
    },
    _update: function() {
        var containerSize = Math.round(this.option("containerSize"));
        var contentSize = Math.round(this.option("contentSize"));
        var baseContainerSize = Math.round(this.option("baseContainerSize"));
        var baseContentSize = Math.round(this.option("baseContentSize"));
        if (isNaN(baseContainerSize)) {
            baseContainerSize = containerSize;
            baseContentSize = contentSize
        }
        this._baseContainerToContentRatio = baseContentSize ? baseContainerSize / baseContentSize : baseContainerSize;
        this._realContainerToContentRatio = contentSize ? containerSize / contentSize : containerSize;
        var thumbSize = Math.round(Math.max(Math.round(containerSize * this._realContainerToContentRatio), THUMB_MIN_SIZE));
        this._thumbRatio = (containerSize - thumbSize) / (this.option("scaleRatio") * (contentSize - containerSize));
        this.option(this._dimension, thumbSize / this.option("scaleRatio"));
        this.$element().css("display", this._needScrollbar() ? "" : "none")
    },
    _isHidden: function() {
        return this.option("visibilityMode") === SCROLLBAR_VISIBLE.never
    },
    _needScrollbar: function() {
        return !this._isHidden() && this._baseContainerToContentRatio < 1
    },
    containerToContentRatio: function() {
        return this._realContainerToContentRatio
    },
    _normalizeSize: function(size) {
        return (0, _type.isPlainObject)(size) ? size[this._dimension] || 0 : size
    },
    _clean: function() {
        this.callBase();
        if (this === activeScrollbar) {
            activeScrollbar = null
        }
        _events_engine2.default.off(this._$thumb, "." + SCROLLBAR)
    },
    _optionChanged: function(args) {
        if (this._isHidden()) {
            return
        }
        switch (args.name) {
            case "containerSize":
            case "contentSize":
                this.option()[args.name] = this._normalizeSize(args.value);
                this._update();
                break;
            case "baseContentSize":
            case "baseContainerSize":
                this._update();
                break;
            case "visibilityMode":
            case "direction":
                this._invalidate();
                break;
            case "scaleRatio":
                this._update();
                break;
            default:
                this.callBase.apply(this, arguments)
        }
    },
    update: _common2.default.deferRenderer(function() {
        this._adjustVisibility() && this.option("visible", true)
    })
});
_ready_callbacks2.default.add(function() {
    _events_engine2.default.subscribeGlobal(_dom_adapter2.default.getDocument(), eventUtils.addNamespace(_pointer2.default.up, SCROLLBAR), function() {
        if (activeScrollbar) {
            activeScrollbar.feedbackOff()
        }
    })
});
module.exports = Scrollbar;
