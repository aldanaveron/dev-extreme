/**
 * DevExtreme (viz/sparklines/base_sparkline.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var eventsEngine = require("../../events/core/events_engine");
var domAdapter = require("../../core/dom_adapter");
var isFunction = require("../../core/utils/type").isFunction;
var BaseWidget = require("../core/base_widget");
var extend = require("../../core/utils/extend").extend;
var addNamespace = require("../../events/utils").addNamespace;
var pointerEvents = require("../../events/pointer");
var pointInCanvas = require("../core/utils").pointInCanvas;
var DEFAULT_LINE_SPACING = 2;
var EVENT_NS = "sparkline-tooltip";
var POINTER_ACTION = addNamespace([pointerEvents.down, pointerEvents.move], EVENT_NS);
var translator2DModule = require("../translators/translator2d");
var _extend = extend;
var _floor = Math.floor;
var _noop = require("../../core/utils/common").noop;

function inCanvas(_ref, x, y) {
    var left = _ref.left,
        top = _ref.top,
        bottom = _ref.bottom,
        right = _ref.right,
        width = _ref.width,
        height = _ref.height;
    return pointInCanvas({
        left: left,
        top: top,
        right: width - right,
        bottom: height - bottom,
        width: width,
        height: height
    }, x, y)
}

function pointerHandler(_ref2) {
    var data = _ref2.data;
    var that = data.widget;
    that._enableOutHandler();
    that._showTooltip()
}

function generateDefaultCustomizeTooltipCallback(fontOptions, rtlEnabled) {
    var lineSpacing = fontOptions.lineSpacing;
    var lineHeight = (void 0 !== lineSpacing && null !== lineSpacing ? lineSpacing : DEFAULT_LINE_SPACING) + fontOptions.size;
    return function(customizeObject) {
        var html = "";
        var vt = customizeObject.valueText;
        for (var i = 0; i < vt.length; i += 2) {
            html += "<tr><td>" + vt[i] + "</td><td style='width: 15px'></td><td style='text-align: " + (rtlEnabled ? "left" : "right") + "'>" + vt[i + 1] + "</td></tr>"
        }
        return {
            html: "<table style='border-spacing:0px; line-height: " + lineHeight + "px'>" + html + "</table>"
        }
    }
}

function generateCustomizeTooltipCallback(customizeTooltip, fontOptions, rtlEnabled) {
    var defaultCustomizeTooltip = generateDefaultCustomizeTooltipCallback(fontOptions, rtlEnabled);
    if (isFunction(customizeTooltip)) {
        return function(customizeObject) {
            var res = customizeTooltip.call(customizeObject, customizeObject);
            if (!("html" in res) && !("text" in res)) {
                _extend(res, defaultCustomizeTooltip.call(customizeObject, customizeObject))
            }
            return res
        }
    } else {
        return defaultCustomizeTooltip
    }
}

function createAxis(isHorizontal) {
    var translator = new translator2DModule.Translator2D({}, {}, {
        shiftZeroValue: !isHorizontal,
        isHorizontal: !!isHorizontal
    });
    return {
        getTranslator: function() {
            return translator
        },
        update: function(range, canvas, options) {
            translator.update(range, canvas, options)
        },
        getVisibleArea: function() {
            var visibleArea = translator.getCanvasVisibleArea();
            return [visibleArea.min, visibleArea.max]
        },
        visualRange: _noop,
        calculateInterval: _noop,
        getMarginOptions: function() {
            return {}
        }
    }
}
var _initTooltip;
var BaseSparkline = BaseWidget.inherit({
    _getLayoutItems: _noop,
    _useLinks: false,
    _themeDependentChanges: ["OPTIONS"],
    _initCore: function() {
        var that = this;
        that._tooltipTracker = that._renderer.root;
        that._tooltipTracker.attr({
            "pointer-events": "visible"
        });
        that._createHtmlElements();
        that._initTooltipEvents();
        that._argumentAxis = createAxis(true);
        that._valueAxis = createAxis()
    },
    _getDefaultSize: function() {
        return this._defaultSize
    },
    _disposeCore: function() {
        this._disposeWidgetElements();
        this._disposeTooltipEvents();
        this._ranges = null
    },
    _optionChangesOrder: ["OPTIONS"],
    _change_OPTIONS: function() {
        this._prepareOptions();
        this._change(["UPDATE"])
    },
    _customChangesOrder: ["UPDATE"],
    _change_UPDATE: function() {
        this._update()
    },
    _update: function() {
        var that = this;
        if (that._tooltipShown) {
            that._tooltipShown = false;
            that._tooltip.hide()
        }
        that._cleanWidgetElements();
        that._updateWidgetElements();
        that._drawWidgetElements()
    },
    _updateWidgetElements: function() {
        var canvas = this._getCorrectCanvas();
        this._updateRange();
        this._argumentAxis.update(this._ranges.arg, canvas, this._getStick());
        this._valueAxis.update(this._ranges.val, canvas)
    },
    _getStick: function() {},
    _applySize: function(rect) {
        this._allOptions.size = {
            width: rect[2] - rect[0],
            height: rect[3] - rect[1]
        };
        this._change(["UPDATE"])
    },
    _setupResizeHandler: _noop,
    _prepareOptions: function() {
        return _extend(true, {}, this._themeManager.theme(), this.option())
    },
    _getTooltipCoords: function() {
        var canvas = this._canvas;
        var rootOffset = this._renderer.getRootOffset();
        return {
            x: canvas.width / 2 + rootOffset.left,
            y: canvas.height / 2 + rootOffset.top
        }
    },
    _initTooltipEvents: function() {
        var data = {
            widget: this
        };
        this._renderer.root.off("." + EVENT_NS).on(POINTER_ACTION, data, pointerHandler)
    },
    _showTooltip: function() {
        var that = this;
        var tooltip;
        if (!that._tooltipShown) {
            that._tooltipShown = true;
            tooltip = that._getTooltip();
            tooltip.isEnabled() && that._tooltip.show(that._getTooltipData(), that._getTooltipCoords(), {})
        }
    },
    _hideTooltip: function() {
        if (this._tooltipShown) {
            this._tooltipShown = false;
            this._tooltip.hide()
        }
    },
    _stopCurrentHandling: function() {
        this._hideTooltip()
    },
    _enableOutHandler: function() {
        var that = this;
        if (that._outHandler) {
            return
        }
        var handler = function(_ref3) {
            var pageX = _ref3.pageX,
                pageY = _ref3.pageY;
            var _that$_renderer$getRo = that._renderer.getRootOffset(),
                left = _that$_renderer$getRo.left,
                top = _that$_renderer$getRo.top;
            var x = _floor(pageX - left);
            var y = _floor(pageY - top);
            if (!inCanvas(that._canvas, x, y)) {
                that._hideTooltip();
                that._disableOutHandler()
            }
        };
        eventsEngine.on(domAdapter.getDocument(), POINTER_ACTION, handler);
        this._outHandler = handler
    },
    _disableOutHandler: function() {
        this._outHandler && eventsEngine.off(domAdapter.getDocument(), POINTER_ACTION, this._outHandler);
        this._outHandler = null
    },
    _disposeTooltipEvents: function() {
        this._tooltipTracker.off();
        this._disableOutHandler();
        this._renderer.root.off("." + EVENT_NS)
    },
    _getTooltip: function() {
        var that = this;
        if (!that._tooltip) {
            _initTooltip.apply(this, arguments);
            that._setTooltipRendererOptions(that._tooltipRendererOptions);
            that._tooltipRendererOptions = null;
            that._setTooltipOptions()
        }
        return that._tooltip
    }
});
module.exports = BaseSparkline;
BaseSparkline.addPlugin(require("../core/tooltip").plugin);
_initTooltip = BaseSparkline.prototype._initTooltip;
BaseSparkline.prototype._initTooltip = _noop;
var _disposeTooltip = BaseSparkline.prototype._disposeTooltip;
BaseSparkline.prototype._disposeTooltip = function() {
    if (this._tooltip) {
        _disposeTooltip.apply(this, arguments)
    }
};
BaseSparkline.prototype._setTooltipRendererOptions = function() {
    var options = this._getRendererOptions();
    if (this._tooltip) {
        this._tooltip.setRendererOptions(options)
    } else {
        this._tooltipRendererOptions = options
    }
};
BaseSparkline.prototype._setTooltipOptions = function() {
    var tooltip = this._tooltip;
    var options = tooltip && this._getOption("tooltip");
    tooltip && tooltip.update(_extend({}, options, {
        customizeTooltip: generateCustomizeTooltipCallback(options.customizeTooltip, options.font, this.option("rtlEnabled")),
        enabled: options.enabled && this._isTooltipEnabled()
    }))
};
var exportPlugin = extend(true, {}, require("../core/export").plugin, {
    init: _noop,
    dispose: _noop,
    customize: null,
    members: {
        _getExportMenuOptions: null
    }
});
BaseSparkline.addPlugin(exportPlugin);
