/**
 * DevExtreme (ui/grid_core/ui.grid_core.grid_view.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _renderer = require("../../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _uiGrid_core = require("./ui.grid_core.modules");
var _uiGrid_core2 = _interopRequireDefault(_uiGrid_core);
var _common = require("../../core/utils/common");
var _common2 = _interopRequireDefault(_common);
var _window = require("../../core/utils/window");
var _window2 = _interopRequireDefault(_window);
var _iterator = require("../../core/utils/iterator");
var _type = require("../../core/utils/type");
var _type2 = _interopRequireDefault(_type);
var _uiGrid_core3 = require("./ui.grid_core.utils");
var _uiGrid_core4 = _interopRequireDefault(_uiGrid_core3);
var _message = require("../../localization/message");
var _message2 = _interopRequireDefault(_message);
var _deferred = require("../../core/utils/deferred");
var _dom_adapter = require("../../core/dom_adapter");
var _dom_adapter2 = _interopRequireDefault(_dom_adapter);
var _browser = require("../../core/utils/browser");
var _browser2 = _interopRequireDefault(_browser);
var _accessibility = require("../shared/accessibility");
var _accessibility2 = _interopRequireDefault(_accessibility);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var TABLE_CLASS = "table";
var BORDERS_CLASS = "borders";
var TABLE_FIXED_CLASS = "table-fixed";
var IMPORTANT_MARGIN_CLASS = "important-margin";
var TEXT_CONTENT_CLASS = "text-content";
var HIDDEN_CLASS = "dx-hidden";
var GRIDBASE_CONTAINER_CLASS = "dx-gridbase-container";
var HIDDEN_COLUMNS_WIDTH = "adaptiveHidden";
var EDITORS_INPUT_SELECTOR = "input:not([type='hidden'])";
var VIEW_NAMES = ["columnsSeparatorView", "blockSeparatorView", "trackerView", "headerPanel", "columnHeadersView", "rowsView", "footerView", "columnChooserView", "filterPanelView", "pagerView", "draggingHeaderView", "contextMenuView", "errorView", "headerFilterView", "filterBuilderView"];
var isPercentWidth = function(width) {
    return _type2.default.isString(width) && "%" === width.slice(-1)
};
var isPixelWidth = function(width) {
    return _type2.default.isString(width) && "px" === width.slice(-2)
};
var mergeArraysByMaxValue = function(values1, values2) {
    var result = [];
    var i;
    if (values1 && values2 && values1.length && values1.length === values2.length) {
        for (i = 0; i < values1.length; i++) {
            result.push(values1[i] > values2[i] ? values1[i] : values2[i])
        }
    } else {
        if (values1 && values1.length) {
            result = values1
        } else {
            if (values2) {
                result = values2
            }
        }
    }
    return result
};
var getContainerHeight = function($container) {
    var clientHeight = $container.get(0).clientHeight;
    var paddingTop = parseFloat($container.css("paddingTop"));
    var paddingBottom = parseFloat($container.css("paddingBottom"));
    return clientHeight - paddingTop - paddingBottom
};
var calculateFreeWidth = function(that, widths) {
    var contentWidth = that._rowsView.contentWidth();
    var totalWidth = that._getTotalWidth(widths, contentWidth);
    return contentWidth - totalWidth
};
var calculateFreeWidthWithCurrentMinWidth = function(that, columnIndex, currentMinWidth, widths) {
    return calculateFreeWidth(that, widths.map(function(width, index) {
        return index === columnIndex ? currentMinWidth : width
    }))
};
var restoreFocus = function(focusedElement, selectionRange) {
    _accessibility2.default.hiddenFocus(focusedElement);
    _uiGrid_core4.default.setSelectionRange(focusedElement, selectionRange)
};
var ResizingController = _uiGrid_core2.default.ViewController.inherit({
    _initPostRenderHandlers: function() {
        var that = this;
        var dataController = that._dataController;
        if (!that._refreshSizesHandler) {
            that._refreshSizesHandler = function(e) {
                dataController.changed.remove(that._refreshSizesHandler);
                var resizeDeferred;
                var changeType = e && e.changeType;
                var isDelayed = e && e.isDelayed;
                var items = dataController.items();
                if (!e || "refresh" === changeType || "prepend" === changeType || "append" === changeType) {
                    if (!isDelayed) {
                        resizeDeferred = that.resize()
                    }
                } else {
                    if ("update" === changeType && e.changeTypes) {
                        if ((items.length > 1 || "insert" !== e.changeTypes[0]) && !(0 === items.length && "remove" === e.changeTypes[0]) && !e.needUpdateDimensions) {
                            _common2.default.deferUpdate(function() {
                                that._rowsView.resize()
                            })
                        } else {
                            resizeDeferred = that.resize()
                        }
                    }
                }
                if (changeType && "updateSelection" !== changeType && "updateFocusedRow" !== changeType && !isDelayed) {
                    (0, _deferred.when)(resizeDeferred).done(function() {
                        that._setAriaRowColCount();
                        that.fireContentReadyAction()
                    })
                }
            };
            that._dataController.changed.add(function() {
                that._dataController.changed.add(that._refreshSizesHandler)
            })
        }
    },
    fireContentReadyAction: function() {
        this.component._fireContentReadyAction()
    },
    _setAriaRowColCount: function() {
        var component = this.component;
        component.setAria({
            rowCount: this._dataController.totalItemsCount(),
            colCount: component.columnCount()
        }, component.$element().children("." + GRIDBASE_CONTAINER_CLASS))
    },
    _getBestFitWidths: function() {
        if (!this.option("legacyRendering")) {
            return this._rowsView.getColumnWidths()
        }
        var that = this;
        var rowsColumnWidths;
        var headerColumnWidths;
        var footerColumnWidths;
        var resultWidths;
        rowsColumnWidths = that._rowsView.getColumnWidths();
        headerColumnWidths = that._columnHeadersView && that._columnHeadersView.getColumnWidths();
        footerColumnWidths = that._footerView && that._footerView.getColumnWidths();
        resultWidths = mergeArraysByMaxValue(rowsColumnWidths, headerColumnWidths);
        resultWidths = mergeArraysByMaxValue(resultWidths, footerColumnWidths);
        return resultWidths
    },
    _setVisibleWidths: function(visibleColumns, widths) {
        var columnsController = this._columnsController;
        columnsController.beginUpdate();
        (0, _iterator.each)(visibleColumns, function(index, column) {
            var columnId = columnsController.getColumnId(column);
            columnsController.columnOption(columnId, "visibleWidth", widths[index])
        });
        columnsController.endUpdate()
    },
    _toggleBestFitModeForView: function(view, className, isBestFit) {
        var _this = this;
        if (!view || !view.isVisible()) {
            return
        }
        var $rowsTables = this._rowsView.getTableElements();
        var $viewTables = view.getTableElements();
        (0, _iterator.each)($rowsTables, function(index, tableElement) {
            var $tableBody;
            var $rowsTable = (0, _renderer2.default)(tableElement);
            var $viewTable = $viewTables.eq(index);
            if ($viewTable && $viewTable.length) {
                if (isBestFit) {
                    $tableBody = $viewTable.children("tbody").appendTo($rowsTable)
                } else {
                    $tableBody = $rowsTable.children("." + className).appendTo($viewTable)
                }
                $tableBody.toggleClass(className, isBestFit);
                $tableBody.toggleClass(_this.addWidgetPrefix("best-fit"), isBestFit)
            }
        })
    },
    _toggleBestFitMode: function(isBestFit) {
        var $element = this.component.$element();
        var that = this;
        if (!that.option("legacyRendering")) {
            var $rowsTable = that._rowsView._getTableElement();
            var $rowsFixedTable = that._rowsView.getTableElements().eq(1);
            if (!$rowsTable) {
                return
            }
            $rowsTable.css("tableLayout", isBestFit ? "auto" : "fixed");
            $rowsTable.children("colgroup").css("display", isBestFit ? "none" : "");
            $rowsFixedTable.toggleClass(this.addWidgetPrefix(TABLE_FIXED_CLASS), !isBestFit);
            that._toggleBestFitModeForView(that._columnHeadersView, "dx-header", isBestFit);
            that._toggleBestFitModeForView(that._footerView, "dx-footer", isBestFit);
            if (that._needStretch()) {
                $rowsTable.get(0).style.width = isBestFit ? "auto" : ""
            }
            if (_browser2.default.msie && 11 === parseInt(_browser2.default.version)) {
                $rowsTable.find("." + this.addWidgetPrefix(TABLE_FIXED_CLASS)).each(function() {
                    this.style.width = isBestFit ? "10px" : ""
                })
            }
        } else {
            $element.find("." + this.addWidgetPrefix(TABLE_CLASS)).toggleClass(this.addWidgetPrefix(TABLE_FIXED_CLASS), !isBestFit);
            $element.find(EDITORS_INPUT_SELECTOR).toggleClass(HIDDEN_CLASS, isBestFit);
            $element.find(".dx-group-cell").toggleClass(HIDDEN_CLASS, isBestFit);
            $element.find(".dx-header-row ." + this.addWidgetPrefix(TEXT_CONTENT_CLASS)).css("maxWidth", "")
        }
    },
    _synchronizeColumns: function() {
        var that = this;
        var columnsController = that._columnsController;
        var visibleColumns = columnsController.getVisibleColumns();
        var columnAutoWidth = that.option("columnAutoWidth");
        var legacyRendering = that.option("legacyRendering");
        var needBestFit = that._needBestFit();
        var hasMinWidth = false;
        var resetBestFitMode;
        var isColumnWidthsCorrected = false;
        var resultWidths = [];
        var focusedElement;
        var isFocusOutsideWindow;
        var selectionRange;
        var normalizeWidthsByExpandColumns = function() {
            var expandColumnWidth;
            (0, _iterator.each)(visibleColumns, function(index, column) {
                if ("groupExpand" === column.type) {
                    expandColumnWidth = resultWidths[index]
                }
            });
            (0, _iterator.each)(visibleColumns, function(index, column) {
                if ("groupExpand" === column.type && expandColumnWidth) {
                    resultWidths[index] = expandColumnWidth
                }
            })
        };
        !needBestFit && (0, _iterator.each)(visibleColumns, function(index, column) {
            if ("auto" === column.width || legacyRendering && column.fixed) {
                needBestFit = true;
                return false
            }
        });
        (0, _iterator.each)(visibleColumns, function(index, column) {
            if (column.minWidth) {
                hasMinWidth = true;
                return false
            }
        });
        that._setVisibleWidths(visibleColumns, []);
        if (needBestFit) {
            focusedElement = _dom_adapter2.default.getActiveElement();
            selectionRange = _uiGrid_core4.default.getSelectionRange(focusedElement);
            that._toggleBestFitMode(true);
            resetBestFitMode = true
        }
        _common2.default.deferUpdate(function() {
            if (needBestFit) {
                resultWidths = that._getBestFitWidths();
                (0, _iterator.each)(visibleColumns, function(index, column) {
                    var columnId = columnsController.getColumnId(column);
                    columnsController.columnOption(columnId, "bestFitWidth", resultWidths[index], true)
                })
            } else {
                if (hasMinWidth) {
                    resultWidths = that._getBestFitWidths()
                }
            }(0, _iterator.each)(visibleColumns, function(index) {
                var width = this.width;
                if ("auto" !== width) {
                    if (_type2.default.isDefined(width)) {
                        resultWidths[index] = _type2.default.isNumeric(width) || isPixelWidth(width) ? parseFloat(width) : width
                    } else {
                        if (!columnAutoWidth) {
                            resultWidths[index] = void 0
                        }
                    }
                }
            });
            if (resetBestFitMode) {
                that._toggleBestFitMode(false);
                resetBestFitMode = false;
                if (focusedElement && focusedElement !== _dom_adapter2.default.getActiveElement()) {
                    isFocusOutsideWindow = focusedElement.getBoundingClientRect().bottom < 0;
                    if (!isFocusOutsideWindow) {
                        if (_browser2.default.msie) {
                            setTimeout(function() {
                                restoreFocus(focusedElement, selectionRange)
                            })
                        } else {
                            restoreFocus(focusedElement, selectionRange)
                        }
                    }
                }
            }
            isColumnWidthsCorrected = that._correctColumnWidths(resultWidths, visibleColumns);
            if (columnAutoWidth) {
                normalizeWidthsByExpandColumns();
                if (that._needStretch()) {
                    that._processStretch(resultWidths, visibleColumns)
                }
            }
            _common2.default.deferRender(function() {
                if (needBestFit || isColumnWidthsCorrected) {
                    that._setVisibleWidths(visibleColumns, resultWidths)
                }
            })
        })
    },
    _needBestFit: function() {
        return this.option("columnAutoWidth")
    },
    _needStretch: function() {
        return this.option("legacyRendering") || this._columnsController.getVisibleColumns().some(function(c) {
            return "auto" === c.width && !c.command
        })
    },
    _getAverageColumnsWidth: function(resultWidths) {
        var freeWidth = calculateFreeWidth(this, resultWidths);
        var columnCountWithoutWidth = resultWidths.filter(function(width) {
            return void 0 === width
        }).length;
        return freeWidth / columnCountWithoutWidth
    },
    _correctColumnWidths: function(resultWidths, visibleColumns) {
        var that = this;
        var i;
        var hasPercentWidth = false;
        var hasAutoWidth = false;
        var isColumnWidthsCorrected = false;
        var $element = that.component.$element();
        var hasWidth = that._hasWidth;
        var averageColumnsWidth;
        var lastColumnIndex;
        for (i = 0; i < visibleColumns.length; i++) {
            var index = i;
            var column = visibleColumns[index];
            var isHiddenColumn = resultWidths[index] === HIDDEN_COLUMNS_WIDTH;
            var width = resultWidths[index];
            var minWidth = column.minWidth;
            if (minWidth) {
                if (void 0 === width) {
                    averageColumnsWidth = that._getAverageColumnsWidth(resultWidths);
                    width = averageColumnsWidth
                } else {
                    if (isPercentWidth(width)) {
                        var freeWidth = calculateFreeWidthWithCurrentMinWidth(that, index, minWidth, resultWidths);
                        if (freeWidth < 0) {
                            width = -1
                        }
                    }
                }
            }
            if (minWidth && that._getRealColumnWidth(width) < minWidth && !isHiddenColumn) {
                resultWidths[index] = minWidth;
                isColumnWidthsCorrected = true;
                i = -1
            }
            if (!_type2.default.isDefined(column.width)) {
                hasAutoWidth = true
            }
            if (isPercentWidth(column.width)) {
                hasPercentWidth = true
            }
        }
        if ($element && that._maxWidth) {
            delete that._maxWidth;
            $element.css("maxWidth", "")
        }
        if (!hasAutoWidth && resultWidths.length) {
            var contentWidth = that._rowsView.contentWidth();
            var scrollbarWidth = that._rowsView.getScrollbarWidth();
            var totalWidth = that._getTotalWidth(resultWidths, contentWidth);
            if (totalWidth < contentWidth) {
                lastColumnIndex = _uiGrid_core4.default.getLastResizableColumnIndex(visibleColumns, resultWidths);
                if (lastColumnIndex >= 0) {
                    resultWidths[lastColumnIndex] = "auto";
                    isColumnWidthsCorrected = true;
                    if (false === hasWidth && !hasPercentWidth) {
                        that._maxWidth = totalWidth + scrollbarWidth + (that.option("showBorders") ? 2 : 0);
                        $element.css("maxWidth", that._maxWidth)
                    }
                }
            }
        }
        return isColumnWidthsCorrected
    },
    _processStretch: function(resultSizes, visibleColumns) {
        var groupSize = this._rowsView.contentWidth();
        var tableSize = this._getTotalWidth(resultSizes, groupSize);
        var unusedIndexes = {
            length: 0
        };
        var diff;
        var diffElement;
        var onePixelElementsCount;
        var i;
        if (!resultSizes.length) {
            return
        }(0, _iterator.each)(visibleColumns, function(index) {
            if (this.width || resultSizes[index] === HIDDEN_COLUMNS_WIDTH) {
                unusedIndexes[index] = true;
                unusedIndexes.length++
            }
        });
        diff = groupSize - tableSize;
        diffElement = Math.floor(diff / (resultSizes.length - unusedIndexes.length));
        onePixelElementsCount = diff - diffElement * (resultSizes.length - unusedIndexes.length);
        if (diff >= 0) {
            for (i = 0; i < resultSizes.length; i++) {
                if (unusedIndexes[i]) {
                    continue
                }
                resultSizes[i] += diffElement;
                if (onePixelElementsCount > 0) {
                    if (onePixelElementsCount < 1) {
                        resultSizes[i] += onePixelElementsCount;
                        onePixelElementsCount = 0
                    } else {
                        resultSizes[i]++;
                        onePixelElementsCount--
                    }
                }
            }
        }
    },
    _getRealColumnWidth: function(width, groupWidth) {
        if (!isPercentWidth(width)) {
            return parseFloat(width)
        }
        groupWidth = groupWidth || this._rowsView.contentWidth();
        return parseFloat(width) * groupWidth / 100
    },
    _getTotalWidth: function(widths, groupWidth) {
        var result = 0;
        var width;
        var i;
        for (i = 0; i < widths.length; i++) {
            width = widths[i];
            if (width && width !== HIDDEN_COLUMNS_WIDTH) {
                result += this._getRealColumnWidth(width, groupWidth)
            }
        }
        return result
    },
    updateSize: function($rootElement) {
        var that = this;
        var $groupElement;
        var width;
        var importantMarginClass = that.addWidgetPrefix(IMPORTANT_MARGIN_CLASS);
        if (void 0 === that._hasHeight && $rootElement && $rootElement.is(":visible") && $rootElement.width()) {
            $groupElement = $rootElement.children("." + that.getWidgetContainerClass());
            if ($groupElement.length) {
                $groupElement.detach()
            }
            that._hasHeight = !!getContainerHeight($rootElement);
            width = $rootElement.width();
            $rootElement.addClass(importantMarginClass);
            that._hasWidth = $rootElement.width() === width;
            $rootElement.removeClass(importantMarginClass);
            if ($groupElement.length) {
                $groupElement.appendTo($rootElement)
            }
        }
    },
    publicMethods: function() {
        return ["resize", "updateDimensions"]
    },
    resize: function() {
        return !this.component._requireResize && this.updateDimensions()
    },
    updateDimensions: function(checkSize) {
        var that = this;
        that._initPostRenderHandlers();
        if (!that._checkSize(checkSize)) {
            return
        }
        var prevResult = that._resizeDeferred;
        var result = that._resizeDeferred = new _deferred.Deferred;
        (0, _deferred.when)(prevResult).always(function() {
            _common2.default.deferRender(function() {
                if (that._dataController.isLoaded()) {
                    that._synchronizeColumns()
                }
                that._resetGroupElementHeight();
                _common2.default.deferUpdate(function() {
                    _common2.default.deferRender(function() {
                        _common2.default.deferUpdate(function() {
                            that._updateDimensionsCore()
                        })
                    })
                })
            }).done(result.resolve).fail(result.reject)
        });
        return result.promise()
    },
    _resetGroupElementHeight: function() {
        var groupElement = this.component.$element().children().get(0);
        var scrollable = this._rowsView.getScrollable();
        if (groupElement && groupElement.style.height && (!scrollable || !scrollable.scrollTop())) {
            groupElement.style.height = ""
        }
    },
    _checkSize: function(checkSize) {
        var $rootElement = this.component.$element();
        if (checkSize && (this._lastWidth === $rootElement.width() && this._lastHeight === $rootElement.height() || !$rootElement.is(":visible"))) {
            return false
        }
        return true
    },
    _setScrollerSpacingCore: function(hasHeight) {
        var that = this;
        var vScrollbarWidth = hasHeight ? that._rowsView.getScrollbarWidth() : 0;
        var hScrollbarWidth = that._rowsView.getScrollbarWidth(true);
        _common2.default.deferRender(function() {
            that._columnHeadersView && that._columnHeadersView.setScrollerSpacing(vScrollbarWidth);
            that._footerView && that._footerView.setScrollerSpacing(vScrollbarWidth);
            that._rowsView.setScrollerSpacing(vScrollbarWidth, hScrollbarWidth)
        })
    },
    _setScrollerSpacing: function(hasHeight) {
        var _this2 = this;
        if (true === this.option("scrolling.useNative")) {
            _common2.default.deferRender(function() {
                _common2.default.deferUpdate(function() {
                    _this2._setScrollerSpacingCore(hasHeight)
                })
            })
        } else {
            this._setScrollerSpacingCore(hasHeight)
        }
    },
    _updateDimensionsCore: function() {
        var that = this;
        var hasHeight;
        var dataController = that._dataController;
        var rowsView = that._rowsView;
        var $rootElement = that.component.$element();
        var groupElement = $rootElement.children().get(0);
        var rootElementHeight = $rootElement && ($rootElement.get(0).clientHeight || $rootElement.height());
        var maxHeight = parseInt($rootElement.css("maxHeight"));
        var maxHeightHappened = maxHeight && rootElementHeight >= maxHeight;
        var height = that.option("height") || $rootElement.get(0).style.height;
        var editorFactory = that.getController("editorFactory");
        var isMaxHeightApplied = maxHeightHappened && groupElement.scrollHeight === groupElement.offsetHeight;
        var $testDiv;
        that.updateSize($rootElement);
        hasHeight = that._hasHeight || maxHeightHappened;
        if (height && that._hasHeight ^ "auto" !== height) {
            $testDiv = (0, _renderer2.default)("<div>").height(height).appendTo($rootElement);
            that._hasHeight = !!$testDiv.height();
            $testDiv.remove()
        }
        _common2.default.deferRender(function() {
            rowsView.height(null, hasHeight);
            if (maxHeightHappened && !isMaxHeightApplied) {
                (0, _renderer2.default)(groupElement).css("height", maxHeight)
            }
            if (!dataController.isLoaded()) {
                rowsView.setLoading(dataController.isLoading());
                return
            }
            _common2.default.deferUpdate(function() {
                that._updateLastSizes($rootElement);
                that._setScrollerSpacing(hasHeight);
                (0, _iterator.each)(VIEW_NAMES, function(index, viewName) {
                    var view = that.getView(viewName);
                    if (view) {
                        view.resize()
                    }
                });
                editorFactory && editorFactory.resize()
            })
        })
    },
    _updateLastSizes: function($rootElement) {
        this._lastWidth = $rootElement.width();
        this._lastHeight = $rootElement.height()
    },
    optionChanged: function(args) {
        switch (args.name) {
            case "width":
            case "height":
                this.component._renderDimensions();
                this.resize();
            case "legacyRendering":
            case "renderAsync":
                args.handled = true;
                return;
            default:
                this.callBase(args)
        }
    },
    init: function() {
        var that = this;
        that._dataController = that.getController("data");
        that._columnsController = that.getController("columns");
        that._columnHeadersView = that.getView("columnHeadersView");
        that._footerView = that.getView("footerView");
        that._rowsView = that.getView("rowsView")
    }
});
var SynchronizeScrollingController = _uiGrid_core2.default.ViewController.inherit({
    _scrollChangedHandler: function(views, pos, viewName) {
        for (var j = 0; j < views.length; j++) {
            if (views[j] && views[j].name !== viewName) {
                views[j].scrollTo({
                    left: pos.left,
                    top: pos.top
                })
            }
        }
    },
    init: function() {
        var view;
        var views = [this.getView("columnHeadersView"), this.getView("footerView"), this.getView("rowsView")];
        var i;
        for (i = 0; i < views.length; i++) {
            view = views[i];
            if (view) {
                view.scrollChanged.add(this._scrollChangedHandler.bind(this, views))
            }
        }
    }
});
var GridView = _uiGrid_core2.default.View.inherit({
    _endUpdateCore: function() {
        if (this.component._requireResize) {
            this.component._requireResize = false;
            this._resizingController.resize()
        }
    },
    _getWidgetAriaLabel: function() {
        return "dxDataGrid-ariaDataGrid"
    },
    init: function() {
        var that = this;
        that._resizingController = that.getController("resizing");
        that._dataController = that.getController("data")
    },
    getView: function(name) {
        return this.component._views[name]
    },
    element: function() {
        return this._groupElement
    },
    optionChanged: function(args) {
        var that = this;
        if (_type2.default.isDefined(that._groupElement) && "showBorders" === args.name) {
            that._groupElement.toggleClass(that.addWidgetPrefix(BORDERS_CLASS), !!args.value);
            args.handled = true
        } else {
            that.callBase(args)
        }
    },
    _renderViews: function($groupElement) {
        var that = this;
        (0, _iterator.each)(VIEW_NAMES, function(index, viewName) {
            var view = that.getView(viewName);
            if (view) {
                view.render($groupElement)
            }
        })
    },
    _getTableRoleName: function() {
        return "grid"
    },
    render: function($rootElement) {
        var that = this;
        var isFirstRender = !that._groupElement;
        var $groupElement = that._groupElement || (0, _renderer2.default)("<div>").addClass(that.getWidgetContainerClass());
        $groupElement.addClass(GRIDBASE_CONTAINER_CLASS);
        $groupElement.toggleClass(that.addWidgetPrefix(BORDERS_CLASS), !!that.option("showBorders"));
        that.setAria("role", "presentation", $rootElement);
        that.component.setAria({
            role: this._getTableRoleName(),
            label: _message2.default.format(that._getWidgetAriaLabel())
        }, $groupElement);
        that._rootElement = $rootElement || that._rootElement;
        if (isFirstRender) {
            that._groupElement = $groupElement;
            _window2.default.hasWindow() && that.getController("resizing").updateSize($rootElement);
            $groupElement.appendTo($rootElement)
        }
        that._renderViews($groupElement)
    },
    update: function() {
        var that = this;
        var $rootElement = that._rootElement;
        var $groupElement = that._groupElement;
        var resizingController = that.getController("resizing");
        if ($rootElement && $groupElement) {
            resizingController.resize();
            if (that._dataController.isLoaded()) {
                that._resizingController.fireContentReadyAction()
            }
        }
    }
});
module.exports = {
    defaultOptions: function() {
        return {
            showBorders: false,
            renderAsync: false,
            legacyRendering: false
        }
    },
    controllers: {
        resizing: ResizingController,
        synchronizeScrolling: SynchronizeScrollingController
    },
    views: {
        gridView: GridView
    }
};
