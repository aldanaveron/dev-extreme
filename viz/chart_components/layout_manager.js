/**
 * DevExtreme (viz/chart_components/layout_manager.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var extend = require("../../core/utils/extend").extend;
var layoutElementModule = require("../core/layout_element");
var _isNumber = require("../../core/utils/type").isNumeric;
var _min = Math.min;
var _max = Math.max;
var _floor = Math.floor;
var _sqrt = Math.sqrt;
var consts = require("../components/consts");
var RADIAL_LABEL_INDENT = consts.radialLabelIndent;

function getNearestCoord(firstCoord, secondCoord, pointCenterCoord) {
    var nearestCoord;
    if (pointCenterCoord < firstCoord) {
        nearestCoord = firstCoord
    } else {
        if (secondCoord < pointCenterCoord) {
            nearestCoord = secondCoord
        } else {
            nearestCoord = pointCenterCoord
        }
    }
    return nearestCoord
}

function getLabelLayout(point) {
    if (point._label.isVisible() && "inside" !== point._label.getLayoutOptions().position) {
        return point._label.getBoundingRect()
    }
}

function getPieRadius(series, paneCenterX, paneCenterY, accessibleRadius, minR) {
    series.some(function(singleSeries) {
        return singleSeries.getVisiblePoints().reduce(function(radiusIsFound, point) {
            var labelBBox = getLabelLayout(point);
            if (labelBBox) {
                var xCoords = getNearestCoord(labelBBox.x, labelBBox.x + labelBBox.width, paneCenterX);
                var yCoords = getNearestCoord(labelBBox.y, labelBBox.y + labelBBox.height, paneCenterY);
                accessibleRadius = _min(_max(getLengthFromCenter(xCoords, yCoords, paneCenterX, paneCenterY) - RADIAL_LABEL_INDENT, minR), accessibleRadius);
                radiusIsFound = true
            }
            return radiusIsFound
        }, false)
    });
    return accessibleRadius
}

function getSizeLabels(series) {
    return series.reduce(function(res, singleSeries) {
        var maxWidth = singleSeries.getVisiblePoints().reduce(function(width, point) {
            var labelBBox = getLabelLayout(point);
            if (labelBBox && labelBBox.width > width) {
                width = labelBBox.width
            }
            return width
        }, 0);
        var rWidth = maxWidth;
        if (maxWidth) {
            res.outerLabelsCount++;
            if (res.outerLabelsCount > 1) {
                maxWidth += consts.pieLabelSpacing
            }
            rWidth += consts.pieLabelSpacing
        }
        res.sizes.push(maxWidth);
        res.rSizes.push(rWidth);
        res.common += maxWidth;
        return res
    }, {
        sizes: [],
        rSizes: [],
        common: 0,
        outerLabelsCount: 0
    })
}

function correctLabelRadius(labelSizes, radius, series, canvas, averageWidthLabels, centerX) {
    var curRadius;
    var i;
    var runningWidth = 0;
    var sizes = labelSizes.sizes;
    var rSizes = labelSizes.rSizes;
    for (i = 0; i < series.length; i++) {
        if (0 === sizes[i]) {
            curRadius && (curRadius += rSizes[i - 1]);
            continue
        }
        curRadius = _floor(curRadius ? curRadius + rSizes[i - 1] : radius);
        series[i].correctLabelRadius(curRadius);
        runningWidth += averageWidthLabels || sizes[i];
        rSizes[i] = averageWidthLabels || rSizes[i];
        series[i].setVisibleArea({
            left: _floor(centerX - radius - runningWidth),
            right: _floor(canvas.width - (centerX + radius + runningWidth)),
            top: canvas.top,
            bottom: canvas.bottom,
            width: canvas.width,
            height: canvas.height
        })
    }
}

function getLengthFromCenter(x, y, paneCenterX, paneCenterY) {
    return _sqrt((x - paneCenterX) * (x - paneCenterX) + (y - paneCenterY) * (y - paneCenterY))
}

function getInnerRadius(series) {
    var innerRadius;
    if ("pie" === series.type) {
        innerRadius = 0
    } else {
        innerRadius = _isNumber(series.innerRadius) ? Number(series.innerRadius) : .5;
        innerRadius = innerRadius < .2 ? .2 : innerRadius;
        innerRadius = innerRadius > .8 ? .8 : innerRadius
    }
    return innerRadius
}
var inverseAlign = {
    left: "right",
    right: "left",
    top: "bottom",
    bottom: "top",
    center: "center"
};

function downSize(canvas, layoutOptions) {
    canvas[layoutOptions.cutLayoutSide] += "horizontal" === layoutOptions.cutSide ? layoutOptions.width : layoutOptions.height
}

function getOffset(layoutOptions, offsets) {
    var side = layoutOptions.cutLayoutSide;
    var offset = {
        horizontal: 0,
        vertical: 0
    };
    switch (side) {
        case "top":
        case "left":
            offset[layoutOptions.cutSide] = -offsets[side];
            break;
        case "bottom":
        case "right":
            offset[layoutOptions.cutSide] = offsets[side]
    }
    return offset
}

function LayoutManager() {}

function toLayoutElementCoords(canvas) {
    return new layoutElementModule.WrapperLayoutElement(null, {
        x: canvas.left,
        y: canvas.top,
        width: canvas.width - canvas.left - canvas.right,
        height: canvas.height - canvas.top - canvas.bottom
    })
}

function getAverageLabelWidth(centerX, radius, canvas, sizeLabels) {
    return (centerX - radius - RADIAL_LABEL_INDENT - canvas.left) / sizeLabels.outerLabelsCount
}

function getFullRadiusWithLabels(centerX, canvas, sizeLabels) {
    return centerX - canvas.left - (sizeLabels.outerLabelsCount > 0 ? sizeLabels.common + RADIAL_LABEL_INDENT : 0)
}

function correctAvailableRadius(availableRadius, canvas, series, minR, paneCenterX, paneCenterY) {
    var sizeLabels = getSizeLabels(series);
    var averageWidthLabels;
    var fullRadiusWithLabels = getFullRadiusWithLabels(paneCenterX, canvas, sizeLabels);
    if (fullRadiusWithLabels < minR) {
        availableRadius = minR;
        averageWidthLabels = getAverageLabelWidth(paneCenterX, availableRadius, canvas, sizeLabels)
    } else {
        availableRadius = _min(getPieRadius(series, paneCenterX, paneCenterY, availableRadius, minR), fullRadiusWithLabels)
    }
    correctLabelRadius(sizeLabels, availableRadius + RADIAL_LABEL_INDENT, series, canvas, averageWidthLabels, paneCenterX);
    return availableRadius
}
LayoutManager.prototype = {
    constructor: LayoutManager,
    setOptions: function(options) {
        this._options = options
    },
    applyPieChartSeriesLayout: function(canvas, series, hideLayoutLabels) {
        var paneSpaceHeight = canvas.height - canvas.top - canvas.bottom;
        var paneSpaceWidth = canvas.width - canvas.left - canvas.right;
        var paneCenterX = paneSpaceWidth / 2 + canvas.left;
        var paneCenterY = paneSpaceHeight / 2 + canvas.top;
        var piePercentage = this._options.piePercentage;
        var availableRadius;
        var minR;
        if (_isNumber(piePercentage)) {
            availableRadius = minR = piePercentage * _min(canvas.height, canvas.width) / 2
        } else {
            availableRadius = _min(paneSpaceWidth, paneSpaceHeight) / 2;
            minR = this._options.minPiePercentage * availableRadius
        }
        if (!hideLayoutLabels) {
            availableRadius = correctAvailableRadius(availableRadius, canvas, series, minR, paneCenterX, paneCenterY)
        }
        return {
            centerX: _floor(paneCenterX),
            centerY: _floor(paneCenterY),
            radiusInner: _floor(availableRadius * getInnerRadius(series[0])),
            radiusOuter: _floor(availableRadius)
        }
    },
    applyEqualPieChartLayout: function(series, layout) {
        var radius = layout.radius;
        return {
            centerX: _floor(layout.x),
            centerY: _floor(layout.y),
            radiusInner: _floor(radius * getInnerRadius(series[0])),
            radiusOuter: _floor(radius)
        }
    },
    correctPieLabelRadius: function(series, layout, canvas) {
        var sizeLabels = getSizeLabels(series);
        var averageWidthLabels;
        var radius = layout.radiusOuter + RADIAL_LABEL_INDENT;
        var availableLabelWidth = layout.centerX - canvas.left - radius;
        if (sizeLabels.common + RADIAL_LABEL_INDENT > availableLabelWidth) {
            averageWidthLabels = getAverageLabelWidth(layout.centerX, layout.radiusOuter, canvas, sizeLabels)
        }
        correctLabelRadius(sizeLabels, radius, series, canvas, averageWidthLabels, layout.centerX)
    },
    needMoreSpaceForPanesCanvas: function(panes, rotated, fixedSizeCallback) {
        var options = this._options;
        var width = options.width;
        var height = options.height;
        var piePercentage = options.piePercentage;
        var percentageIsValid = _isNumber(piePercentage);
        var needHorizontalSpace = 0;
        var needVerticalSpace = 0;
        panes.forEach(function(pane) {
            var paneCanvas = pane.canvas;
            var minSize = percentageIsValid ? _min(paneCanvas.width, paneCanvas.height) * piePercentage : void 0;
            var paneSized = fixedSizeCallback ? fixedSizeCallback(pane) : {
                width: false,
                height: false
            };
            var needPaneHorizontalSpace = !paneSized.width ? (percentageIsValid ? minSize : width) - (paneCanvas.width - paneCanvas.left - paneCanvas.right) : 0;
            var needPaneVerticalSpace = !paneSized.height ? (percentageIsValid ? minSize : height) - (paneCanvas.height - paneCanvas.top - paneCanvas.bottom) : 0;
            if (rotated) {
                needHorizontalSpace += needPaneHorizontalSpace > 0 ? needPaneHorizontalSpace : 0;
                needVerticalSpace = _max(needPaneVerticalSpace > 0 ? needPaneVerticalSpace : 0, needVerticalSpace)
            } else {
                needHorizontalSpace = _max(needPaneHorizontalSpace > 0 ? needPaneHorizontalSpace : 0, needHorizontalSpace);
                needVerticalSpace += needPaneVerticalSpace > 0 ? needPaneVerticalSpace : 0
            }
        });
        return needHorizontalSpace > 0 || needVerticalSpace > 0 ? {
            width: needHorizontalSpace,
            height: needVerticalSpace
        } : false
    },
    layoutElements: function(elements, canvas, funcAxisDrawer, panes, rotated) {
        this._elements = elements;
        this._probeDrawing(canvas);
        this._drawElements(canvas);
        funcAxisDrawer();
        this._processAdaptiveLayout(panes, rotated, canvas, funcAxisDrawer);
        this._positionElements(canvas)
    },
    _processAdaptiveLayout: function(panes, rotated, canvas, funcAxisDrawer) {
        var that = this;
        var size = that.needMoreSpaceForPanesCanvas(panes, rotated);
        var items = this._elements;
        if (!size) {
            return
        }

        function processCanvases(item, layoutOptions, side) {
            if (!item.getLayoutOptions()[side]) {
                canvas[layoutOptions.cutLayoutSide] -= layoutOptions[side];
                size[side] = size[side] - layoutOptions[side]
            }
        }
        items.slice().reverse().forEach(function(item) {
            var layoutOptions = item.getLayoutOptions();
            var needRedraw = false;
            var sizeObject;
            var cutSide;
            if (!layoutOptions) {
                return
            }
            sizeObject = extend({}, layoutOptions);
            needRedraw = "vertical" === layoutOptions.cutSide && size.width < 0 || "horizontal" === layoutOptions.cutSide && size.height < 0 || "vertical" === layoutOptions.cutSide && size.height > 0 || "horizontal" === layoutOptions.cutSide && size.width > 0;
            cutSide = "horizontal" === layoutOptions.cutSide ? "width" : "height";
            if (needRedraw) {
                var width = sizeObject.width - size.width;
                var height = sizeObject.height - size.height;
                if ("height" === cutSide && size.width < 0) {
                    width = canvas.width - canvas.left - canvas.right
                }
                if ("width" === cutSide && size.height < 0) {
                    height = canvas.height - canvas.top - canvas.bottom
                }
                item.draw(width, height)
            }
            processCanvases(item, layoutOptions, cutSide)
        });
        funcAxisDrawer(size)
    },
    _probeDrawing: function(canvas) {
        var that = this;
        this._elements.forEach(function(item) {
            var layoutOptions = item.getLayoutOptions();
            var sizeObject;
            if (!layoutOptions) {
                return
            }
            sizeObject = {
                width: canvas.width - canvas.left - canvas.right,
                height: canvas.height - canvas.top - canvas.bottom
            };
            if ("vertical" === layoutOptions.cutSide) {
                sizeObject.height -= that._options.height
            } else {
                sizeObject.width -= that._options.width
            }
            item.probeDraw(sizeObject.width, sizeObject.height);
            downSize(canvas, item.getLayoutOptions())
        })
    },
    _drawElements: function(canvas) {
        this._elements.slice().reverse().forEach(function(item) {
            var layoutOptions = item.getLayoutOptions();
            var sizeObject;
            var cutSide;
            var length;
            if (!layoutOptions) {
                return
            }
            sizeObject = {
                width: canvas.width - canvas.left - canvas.right,
                height: canvas.height - canvas.top - canvas.bottom
            };
            cutSide = layoutOptions.cutSide;
            length = "horizontal" === cutSide ? "width" : "height";
            sizeObject[length] = layoutOptions[length];
            item.draw(sizeObject.width, sizeObject.height)
        })
    },
    _positionElements: function(canvas) {
        var offsets = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        };
        this._elements.slice().reverse().forEach(function(item) {
            var layoutOptions = item.getLayoutOptions();
            var position;
            var cutSide;
            var my;
            if (!layoutOptions) {
                return
            }
            position = layoutOptions.position;
            cutSide = layoutOptions.cutSide;
            my = {
                horizontal: position.horizontal,
                vertical: position.vertical
            };
            my[cutSide] = inverseAlign[my[cutSide]];
            item.position({
                of: toLayoutElementCoords(canvas),
                my: my,
                at: position,
                offset: getOffset(layoutOptions, offsets)
            });
            offsets[layoutOptions.cutLayoutSide] += layoutOptions["horizontal" === layoutOptions.cutSide ? "width" : "height"]
        })
    }
};
exports.LayoutManager = LayoutManager;
