/**
 * DevExtreme (viz/core/annotations.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.plugins = exports.__test_utils = exports.createAnnotations = void 0;
var _dom_adapter = require("../../core/dom_adapter");
var _type = require("../../core/utils/type");
var _tooltip = require("../core/tooltip");
var _extend = require("../../core/utils/extend");
var _utils = require("./utils");
var _plaque = require("./plaque");
var _pointer = require("../../events/pointer");
var _pointer2 = _interopRequireDefault(_pointer);
var _drag = require("../../events/drag");
var _drag2 = _interopRequireDefault(_drag);
var _utils2 = require("../../events/utils");
var _events_engine = require("../../events/core/events_engine");
var _events_engine2 = _interopRequireDefault(_events_engine);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var EVENT_NS = "annotations";
var DOT_EVENT_NS = "." + EVENT_NS;
var POINTER_ACTION = (0, _utils2.addNamespace)([_pointer2.default.down, _pointer2.default.move], EVENT_NS);
var POINTER_UP_EVENT_NAME = (0, _utils2.addNamespace)(_pointer2.default.up, EVENT_NS);
var DRAG_START_EVENT_NAME = _drag2.default.start + DOT_EVENT_NS;
var DRAG_EVENT_NAME = _drag2.default.move + DOT_EVENT_NS;
var DRAG_END_EVENT_NAME = _drag2.default.end + DOT_EVENT_NS;

function coreAnnotation(options, contentTemplate) {
    return {
        draw: function(widget, group) {
            var _this = this;
            var annotationGroup = widget._renderer.g().append(group).css((0, _utils.patchFontOptions)(options.font));
            this.plaque = new _plaque.Plaque((0, _extend.extend)(true, {}, options, {
                cornerRadius: (options.border || {}).cornerRadius
            }), widget, annotationGroup, contentTemplate, (0, _type.isDefined)(options.value) || (0, _type.isDefined)(options.argument));
            this.plaque.draw(widget._getAnnotationCoords(this));
            if (options.allowDragging) {
                annotationGroup.on(DRAG_START_EVENT_NAME, {
                    immediate: true
                }, function(e) {
                    _this._dragOffsetX = _this.plaque.x - e.pageX;
                    _this._dragOffsetY = _this.plaque.y - e.pageY
                }).on(DRAG_EVENT_NAME, function(e) {
                    _this.plaque.move(e.pageX + _this._dragOffsetX, e.pageY + _this._dragOffsetY)
                }).on(DRAG_END_EVENT_NAME, function(e) {
                    _this.offsetX = (_this.offsetX || 0) + e.offset.x;
                    _this.offsetY = (_this.offsetY || 0) + e.offset.y
                })
            }
        },
        hitTest: function(x, y) {
            return this.plaque.hitTest(x, y)
        },
        showTooltip: function(tooltip, _ref) {
            var x = _ref.x,
                y = _ref.y;
            if (tooltip.annotation !== this) {
                tooltip.setTemplate(this.options.tooltipTemplate);
                if (tooltip.show(this.options, {
                        x: x,
                        y: y
                    }, {
                        target: this.options
                    }, this.options.customizeTooltip)) {
                    tooltip.annotation = this
                }
            } else {
                tooltip.move(x, y)
            }
        }
    }
}

function getTemplateFunction(options, widget) {
    var template;
    if ("text" === options.type) {
        template = function(item, groupElement) {
            var text = widget._renderer.text(item.text).attr({
                "class": item.cssClass
            }).append({
                element: groupElement
            });
            if (item.width > 0 || item.height > 0) {
                text.setMaxSize(item.width, item.height, {
                    wordWrap: item.wordWrap,
                    textOverflow: item.textOverflow
                })
            }
        }
    } else {
        if ("image" === options.type) {
            template = function(item, groupElement) {
                var _ref2 = item.image || {},
                    width = _ref2.width,
                    height = _ref2.height,
                    url = _ref2.url,
                    location = _ref2.location;
                var outerWidth = item.width,
                    outerHeight = item.height;
                var imageWidth = outerWidth > 0 ? Math.min(width, outerWidth) : width;
                var imageHeight = outerHeight > 0 ? Math.min(height, outerHeight) : height;
                widget._renderer.image(0, 0, imageWidth, imageHeight, url, location || "center").append({
                    element: groupElement
                })
            }
        } else {
            if ("custom" === options.type) {
                template = options.template
            }
        }
    }
    return template
}

function getImageObject(image) {
    return "string" === typeof image ? {
        url: image
    } : image
}
var createAnnotations = exports.createAnnotations = function(widget, items) {
    var commonAnnotationSettings = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    var customizeAnnotation = arguments.length > 3 ? arguments[3] : void 0;
    var pullOptions = arguments.length > 4 ? arguments[4] : void 0;
    var commonImageOptions = getImageObject(commonAnnotationSettings.image);
    return items.reduce(function(arr, item) {
        var currentImageOptions = getImageObject(item.image);
        var options = (0, _extend.extend)(true, {}, commonAnnotationSettings, item, {
            image: commonImageOptions
        }, {
            image: currentImageOptions
        }, customizeAnnotation && customizeAnnotation.call ? customizeAnnotation(item) : {});
        var templateFunction = getTemplateFunction(options, widget);
        var annotation = templateFunction && (0, _extend.extend)(true, pullOptions(options), coreAnnotation(options, widget._getTemplate(templateFunction)));
        annotation && arr.push(annotation);
        return arr
    }, [])
};
var chartPlugin = {
    name: "annotations_chart",
    init: function() {},
    dispose: function() {},
    members: {
        _getAnnotationCoords: function(annotation) {
            var coords = {
                offsetX: annotation.offsetX,
                offsetY: annotation.offsetY
            };
            var argCoordName = this._options.silent("rotated") ? "y" : "x";
            var valCoordName = this._options.silent("rotated") ? "x" : "y";
            var argAxis = this.getArgumentAxis();
            var argument = argAxis.validateUnit(annotation.argument);
            var axis = this.getValueAxis(annotation.axis);
            var series;
            var pane = (0, _type.isDefined)(axis) ? axis.pane : void 0;
            if (annotation.series) {
                series = this.series.filter(function(s) {
                    return s.name === annotation.series
                })[0];
                axis = series && series.getValueAxis();
                (0, _type.isDefined)(axis) && (pane = axis.pane)
            }
            if ((0, _type.isDefined)(argument)) {
                if (series) {
                    var center = series.getPointCenterByArg(argument);
                    center && (coords[argCoordName] = center[argCoordName])
                } else {
                    coords[argCoordName] = argAxis.getTranslator().translate(argument)
                }!(0, _type.isDefined)(pane) && (pane = argAxis.pane)
            }
            var value = axis && axis.validateUnit(annotation.value);
            if ((0, _type.isDefined)(value)) {
                coords[valCoordName] = axis && axis.getTranslator().translate(value);
                !(0, _type.isDefined)(pane) && (0, _type.isDefined)(axis) && (pane = axis.pane)
            }
            coords.canvas = this._getCanvasForPane(pane);
            if ((0, _type.isDefined)(coords[argCoordName]) && !(0, _type.isDefined)(value)) {
                if (!(0, _type.isDefined)(axis) && !(0, _type.isDefined)(series)) {
                    coords[valCoordName] = argAxis.getAxisPosition()
                } else {
                    if ((0, _type.isDefined)(axis) && !(0, _type.isDefined)(series)) {
                        coords[valCoordName] = this._argumentAxes.filter(function(a) {
                            return a.pane === axis.pane
                        })[0].getAxisPosition()
                    } else {
                        if ((0, _type.isDefined)(series) && series.checkSeriesViewportCoord(argAxis, coords[argCoordName])) {
                            coords[valCoordName] = series.getSeriesPairCoord(coords[argCoordName], true)
                        }
                    }
                }
            }
            if (!(0, _type.isDefined)(argument) && (0, _type.isDefined)(coords[valCoordName])) {
                if ((0, _type.isDefined)(axis) && !(0, _type.isDefined)(series)) {
                    coords[argCoordName] = axis.getAxisPosition()
                } else {
                    if ((0, _type.isDefined)(series)) {
                        if (series.checkSeriesViewportCoord(axis, coords[valCoordName])) {
                            coords[argCoordName] = series.getSeriesPairCoord(coords[valCoordName], false)
                        }
                    }
                }
            }
            return coords
        },
        _annotationsPointerEventHandler: function(event) {
            var originalEvent = event.originalEvent || {};
            var touch = originalEvent.touches && originalEvent.touches[0] || {};
            var rootOffset = this._renderer.getRootOffset();
            var coords = {
                x: touch.pageX || originalEvent.pageX || event.pageX,
                y: touch.pageY || originalEvent.pageY || event.pageY
            };
            var annotation = this._annotations.items.filter(function(a) {
                return a.hitTest(coords.x - rootOffset.left, coords.y - rootOffset.top)
            })[0];
            if (!annotation || !annotation.options.tooltipEnabled) {
                this._annotations.hideTooltip();
                return
            }
            this.hideTooltip();
            this.clearHover();
            if (annotation.options.allowDragging && event.type === _pointer2.default.down) {
                this._annotations._hideToolTipForDrag = true
            }
            if (!this._annotations._hideToolTipForDrag) {
                annotation.showTooltip(this._annotations.tooltip, coords);
                event.stopPropagation()
            }
        },
        _pullOptions: function(options) {
            return {
                type: options.type,
                name: options.name,
                x: options.x,
                y: options.y,
                value: options.value,
                argument: options.argument,
                axis: options.axis,
                series: options.series,
                options: options,
                offsetX: options.offsetX,
                offsetY: options.offsetY
            }
        }
    }
};
var polarChartPlugin = {
    name: "annotations_polar_chart",
    init: function() {},
    dispose: function() {},
    members: {
        _getAnnotationCoords: function(annotation) {
            var coords = {
                offsetX: annotation.offsetX,
                offsetY: annotation.offsetY,
                canvas: this._calcCanvas()
            };
            var argAxis = this.getArgumentAxis();
            var argument = argAxis.validateUnit(annotation.argument);
            var value = this.getValueAxis().validateUnit(annotation.value);
            var radius = annotation.radius;
            var angle = annotation.angle;
            var pointCoords;
            var series;
            if (annotation.series) {
                series = this.series.filter(function(s) {
                    return s.name === annotation.series
                })[0]
            }(0, _extend.extend)(true, coords, this.getXYFromPolar(angle, radius, argument, value));
            if ((0, _type.isDefined)(series)) {
                if ((0, _type.isDefined)(coords.angle) && !(0, _type.isDefined)(value) && !(0, _type.isDefined)(radius)) {
                    if (!(0, _type.isDefined)(argument)) {
                        argument = argAxis.getTranslator().from(isFinite(angle) ? this.getActualAngle(angle) : coords.angle)
                    }
                    pointCoords = series.getSeriesPairCoord({
                        argument: argument,
                        angle: -coords.angle
                    }, true)
                } else {
                    if ((0, _type.isDefined)(coords.radius) && !(0, _type.isDefined)(argument) && !(0, _type.isDefined)(angle)) {
                        pointCoords = series.getSeriesPairCoord({
                            radius: coords.radius
                        }, false)
                    }
                }
                if ((0, _type.isDefined)(pointCoords)) {
                    coords.x = pointCoords.x;
                    coords.y = pointCoords.y
                }
            }
            if (annotation.series && !(0, _type.isDefined)(pointCoords)) {
                coords.x = coords.y = void 0
            }
            return coords
        },
        _annotationsPointerEventHandler: chartPlugin.members._annotationsPointerEventHandler,
        _pullOptions: function(options) {
            var polarOptions = (0, _extend.extend)({}, {
                radius: options.radius,
                angle: options.angle
            }, chartPlugin.members._pullOptions(options));
            delete polarOptions.axis;
            return polarOptions
        }
    }
};
var corePlugin = {
    name: "annotations_core",
    init: function() {
        this._annotations = {
            items: [],
            _hideToolTipForDrag: false,
            tooltip: new _tooltip.Tooltip({
                cssClass: "".concat(this._rootClassPrefix, "-annotation-tooltip"),
                eventTrigger: this._eventTrigger,
                widgetRoot: this.element(),
                widget: this
            }),
            hideTooltip: function() {
                this.tooltip.annotation = null;
                this.tooltip.hide()
            }
        };
        this._annotations.tooltip.setRendererOptions(this._getRendererOptions());
        var tooltipOptions = (0, _extend.extend)({}, this._themeManager.getOptions("tooltip"));
        tooltipOptions.contentTemplate = tooltipOptions.customizeTooltip = void 0;
        this._annotations.tooltip.update(tooltipOptions)
    },
    dispose: function() {
        this._annotationsGroup.linkRemove().linkOff();
        _events_engine2.default.off((0, _dom_adapter.getDocument)(), DOT_EVENT_NS);
        this._annotationsGroup.off(DOT_EVENT_NS);
        this._annotations.tooltip && this._annotations.tooltip.dispose()
    },
    extenders: {
        _createHtmlStructure: function() {
            var _this2 = this;
            this._annotationsGroup = this._renderer.g().attr({
                "class": "".concat(this._rootClassPrefix, "-annotations")
            }).linkOn(this._renderer.root, "annotations").linkAppend();
            _events_engine2.default.on((0, _dom_adapter.getDocument)(), POINTER_ACTION, function() {
                return _this2._annotations.hideTooltip()
            });
            _events_engine2.default.on((0, _dom_adapter.getDocument)(), POINTER_UP_EVENT_NAME, function(event) {
                _this2._annotations._hideToolTipForDrag = false;
                _this2._annotationsPointerEventHandler(event)
            });
            this._annotationsGroup.on(POINTER_ACTION, this._annotationsPointerEventHandler.bind(this))
        },
        _renderExtraElements: function() {
            var _this3 = this;
            this._annotationsGroup.clear();
            this._annotations.items.forEach(function(item) {
                return item.draw(_this3, _this3._annotationsGroup)
            })
        },
        _stopCurrentHandling: function() {
            this._annotations.hideTooltip()
        }
    },
    members: {
        _buildAnnotations: function() {
            this._annotations.items = [];
            var items = this._getOption("annotations");
            if (!items || !items.length) {
                return
            }
            this._annotations.items = createAnnotations(this, items, this._getOption("commonAnnotationSettings"), this._getOption("customizeAnnotation"), this._pullOptions)
        },
        _getAnnotationCoords: function() {
            return {}
        },
        _pullOptions: function() {
            return {}
        }
    },
    customize: function(constructor) {
        constructor.addChange({
            code: "ANNOTATIONITEMS",
            handler: function() {
                this._requestChange(["ANNOTATIONS"])
            },
            isOptionChange: true,
            option: "annotations"
        });
        constructor.addChange({
            code: "ANNOTATIONSSETTINGS",
            handler: function() {
                this._requestChange(["ANNOTATIONS"])
            },
            isOptionChange: true,
            option: "commonAnnotationSettings"
        });
        constructor.addChange({
            code: "ANNOTATIONS",
            handler: function() {
                this._buildAnnotations();
                this._change(["FORCE_RENDER"])
            },
            isThemeDependent: true,
            isOptionChange: true
        })
    },
    fontFields: ["commonAnnotationSettings.font"]
};
var plugins = exports.plugins = {
    core: corePlugin,
    chart: chartPlugin,
    polarChart: polarChartPlugin
};
