/**
 * DevExtreme (ui/pivot_grid/ui.pivot_grid.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _renderer = require("../../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _window = require("../../core/utils/window");
var _browser = require("../../core/utils/browser");
var _events_engine = require("../../events/core/events_engine");
var _events_engine2 = _interopRequireDefault(_events_engine);
var _component_registrator = require("../../core/component_registrator");
var _component_registrator2 = _interopRequireDefault(_component_registrator);
var _dom = require("../../core/utils/dom");
var _string = require("../../core/utils/string");
var _common = require("../../core/utils/common");
var _iterator = require("../../core/utils/iterator");
var _type = require("../../core/utils/type");
var _extend = require("../../core/utils/extend");
var _click = require("../../events/click");
var _message = require("../../localization/message");
var _ui = require("../widget/ui.widget");
var _ui2 = _interopRequireDefault(_ui);
var _utils = require("../../events/utils");
var _uiGrid_core = require("../grid_core/ui.grid_core.utils");
var _uiPivot_grid = require("./ui.pivot_grid.utils");
var _uiPivot_grid2 = require("./ui.pivot_grid.data_controller");
var _uiPivot_grid3 = require("./ui.pivot_grid.data_area");
var _uiPivot_grid4 = require("./ui.pivot_grid.headers_area");
var _size = require("../../core/utils/size");
var _uiPivot_grid5 = require("./ui.pivot_grid.fields_area");
var _uiPivot_grid6 = require("./ui.pivot_grid.field_chooser");
var _uiPivot_grid7 = _interopRequireDefault(_uiPivot_grid6);
var _uiPivot_grid8 = require("./ui.pivot_grid.field_chooser_base");
var _uiPivot_grid9 = _interopRequireDefault(_uiPivot_grid8);
var _uiPivot_grid10 = require("./ui.pivot_grid.export");
var _uiPivot_grid11 = require("./ui.pivot_grid.chart_integration");
var _uiPivot_grid12 = _interopRequireDefault(_uiPivot_grid11);
var _popup = require("../popup");
var _popup2 = _interopRequireDefault(_popup);
var _context_menu = require("../context_menu");
var _context_menu2 = _interopRequireDefault(_context_menu);
var _deferred = require("../../core/utils/deferred");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var window = (0, _window.getWindow)();
var DATA_AREA_CELL_CLASS = "dx-area-data-cell";
var ROW_AREA_CELL_CLASS = "dx-area-row-cell";
var COLUMN_AREA_CELL_CLASS = "dx-area-column-cell";
var DESCRIPTION_AREA_CELL_CLASS = "dx-area-description-cell";
var BORDERS_CLASS = "dx-pivotgrid-border";
var PIVOTGRID_CLASS = "dx-pivotgrid";
var ROW_LINES_CLASS = "dx-row-lines";
var BOTTOM_ROW_CLASS = "dx-bottom-row";
var BOTTOM_BORDER_CLASS = "dx-bottom-border";
var FIELDS_CONTAINER_CLASS = "dx-pivotgrid-fields-container";
var FIELDS_CLASS = "dx-area-fields";
var FIELD_CHOOSER_POPUP_CLASS = "dx-fieldchooser-popup";
var INCOMPRESSIBLE_FIELDS_CLASS = "dx-incompressible-fields";
var OVERFLOW_HIDDEN_CLASS = "dx-overflow-hidden";
var TR = "<tr>";
var TD = "<td>";
var DIV = "<div>";
var TEST_HEIGHT = 66666;

function getArraySum(array) {
    var sum = 0;
    (0, _iterator.each)(array, function(_, value) {
        sum += value || 0
    });
    return sum
}

function adjustSizeArray(sizeArray, space) {
    var delta = space / sizeArray.length;
    for (var i = 0; i < sizeArray.length; i++) {
        sizeArray[i] -= delta
    }
}

function unsubscribeScrollEvents(area) {
    area.off("scroll").off("stop")
}

function subscribeToScrollEvent(area, handler) {
    unsubscribeScrollEvents(area);
    area.on("scroll", handler).on("stop", handler)
}
var scrollBarInfoCache = {};

function getScrollBarInfo(useNativeScrolling) {
    if (scrollBarInfoCache[useNativeScrolling]) {
        return scrollBarInfoCache[useNativeScrolling]
    }
    var scrollBarWidth = 0;
    var options = {};
    var container = (0, _renderer2.default)(DIV).css({
        position: "absolute",
        visibility: "hidden",
        top: -1e3,
        left: -1e3,
        width: 100,
        height: 100
    }).appendTo("body");
    var content = (0, _renderer2.default)("<p>").css({
        width: "100%",
        height: 200
    }).appendTo(container);
    if ("auto" !== useNativeScrolling) {
        options.useNative = !!useNativeScrolling;
        options.useSimulatedScrollbar = !useNativeScrolling
    }
    container.dxScrollable(options);
    var scrollBarUseNative = container.dxScrollable("instance").option("useNative");
    scrollBarWidth = scrollBarUseNative ? container.width() - content.width() : 0;
    container.remove();
    scrollBarInfoCache[useNativeScrolling] = {
        scrollBarWidth: scrollBarWidth,
        scrollBarUseNative: scrollBarUseNative
    };
    return scrollBarInfoCache[useNativeScrolling]
}

function getCommonBorderWidth(elements, direction) {
    var borderStyleNames = "width" === direction ? ["borderLeftWidth", "borderRightWidth"] : ["borderTopWidth", "borderBottomWidth"];
    var width = 0;
    (0, _iterator.each)(elements, function(_, elem) {
        var computedStyle = window.getComputedStyle(elem.get(0));
        borderStyleNames.forEach(function(borderStyleName) {
            width += parseFloat(computedStyle[borderStyleName]) || 0
        })
    });
    return width
}

function clickedOnFieldsArea($targetElement) {
    return $targetElement.closest("." + FIELDS_CLASS).length || $targetElement.find("." + FIELDS_CLASS).length
}
var PivotGrid = _ui2.default.inherit({
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            scrolling: {
                timeout: 300,
                renderingThreshold: 150,
                minTimeout: 10,
                mode: "standard",
                useNative: "auto",
                removeInvisiblePages: true,
                virtualRowHeight: 50,
                virtualColumnWidth: 100
            },
            encodeHtml: true,
            dataSource: null,
            activeStateEnabled: false,
            fieldChooser: {
                minWidth: 250,
                minHeight: 250,
                enabled: true,
                allowSearch: false,
                searchTimeout: 500,
                layout: 0,
                title: (0, _message.format)("dxPivotGrid-fieldChooserTitle"),
                width: 600,
                height: 600,
                applyChangesMode: "instantly"
            },
            onContextMenuPreparing: null,
            allowSorting: false,
            allowSortingBySummary: false,
            allowFiltering: false,
            allowExpandAll: false,
            wordWrapEnabled: true,
            fieldPanel: {
                showColumnFields: true,
                showFilterFields: true,
                showDataFields: true,
                showRowFields: true,
                allowFieldDragging: true,
                visible: false,
                texts: {
                    columnFieldArea: (0, _message.format)("dxPivotGrid-columnFieldArea"),
                    rowFieldArea: (0, _message.format)("dxPivotGrid-rowFieldArea"),
                    filterFieldArea: (0, _message.format)("dxPivotGrid-filterFieldArea"),
                    dataFieldArea: (0, _message.format)("dxPivotGrid-dataFieldArea")
                }
            },
            dataFieldArea: "column",
            "export": {
                enabled: false,
                fileName: "PivotGrid",
                proxyUrl: void 0,
                ignoreExcelErrors: true
            },
            showRowTotals: true,
            showRowGrandTotals: true,
            showColumnTotals: true,
            showColumnGrandTotals: true,
            hideEmptySummaryCells: true,
            showTotalsPrior: "none",
            rowHeaderLayout: "standard",
            loadPanel: {
                enabled: true,
                text: (0, _message.format)("Loading"),
                width: 200,
                height: 70,
                showIndicator: true,
                indicatorSrc: "",
                showPane: true
            },
            texts: {
                grandTotal: (0, _message.format)("dxPivotGrid-grandTotal"),
                total: (0, _message.getFormatter)("dxPivotGrid-total"),
                noData: (0, _message.format)("dxDataGrid-noDataText"),
                showFieldChooser: (0, _message.format)("dxPivotGrid-showFieldChooser"),
                expandAll: (0, _message.format)("dxPivotGrid-expandAll"),
                collapseAll: (0, _message.format)("dxPivotGrid-collapseAll"),
                sortColumnBySummary: (0, _message.getFormatter)("dxPivotGrid-sortColumnBySummary"),
                sortRowBySummary: (0, _message.getFormatter)("dxPivotGrid-sortRowBySummary"),
                removeAllSorting: (0, _message.format)("dxPivotGrid-removeAllSorting"),
                exportToExcel: (0, _message.format)("dxDataGrid-exportToExcel"),
                dataNotAvailable: (0, _message.format)("dxPivotGrid-dataNotAvailable")
            },
            onCellClick: null,
            onCellPrepared: null,
            showBorders: false,
            stateStoring: {
                enabled: false,
                storageKey: null,
                type: "localStorage",
                customLoad: null,
                customSave: null,
                savingTimeout: 2e3
            },
            onExpandValueChanging: null,
            renderCellCountLimit: 2e4,
            onExporting: null,
            onExported: null,
            onFileSaving: null,
            headerFilter: {
                width: 252,
                height: 325,
                allowSearch: false,
                showRelevantValues: false,
                searchTimeout: 500,
                texts: {
                    emptyValue: (0, _message.format)("dxDataGrid-headerFilterEmptyValue"),
                    ok: (0, _message.format)("dxDataGrid-headerFilterOK"),
                    cancel: (0, _message.format)("dxDataGrid-headerFilterCancel")
                }
            }
        })
    },
    _getDataControllerOptions: function() {
        var that = this;
        return {
            component: that,
            dataSource: that.option("dataSource"),
            texts: that.option("texts"),
            showRowTotals: that.option("showRowTotals"),
            showRowGrandTotals: that.option("showRowGrandTotals"),
            showColumnTotals: that.option("showColumnTotals"),
            showTotalsPrior: that.option("showTotalsPrior"),
            showColumnGrandTotals: that.option("showColumnGrandTotals"),
            dataFieldArea: that.option("dataFieldArea"),
            rowHeaderLayout: that.option("rowHeaderLayout"),
            hideEmptySummaryCells: that.option("hideEmptySummaryCells"),
            onFieldsPrepared: function(fields) {
                (0, _iterator.each)(fields, function(index, field) {
                    (0, _iterator.each)(["allowSorting", "allowSortingBySummary", "allowFiltering", "allowExpandAll"], function(_, optionName) {
                        if (void 0 === field[optionName]) {
                            (0, _uiPivot_grid.setFieldProperty)(field, optionName, that.option(optionName))
                        }
                    })
                })
            }
        }
    },
    _initDataController: function() {
        var that = this;
        that._dataController && that._dataController.dispose();
        that._dataController = new _uiPivot_grid2.DataController(that._getDataControllerOptions());
        if ((0, _window.hasWindow)()) {
            that._dataController.changed.add(function() {
                that._render()
            })
        }
        that._dataController.scrollChanged.add(function(options) {
            that._scrollLeft = options.left;
            that._scrollTop = options.top
        });
        that._dataController.loadingChanged.add(function(isLoading) {
            that._updateLoading()
        });
        that._dataController.progressChanged.add(that._updateLoading.bind(that));
        that._dataController.dataSourceChanged.add(function() {
            that._trigger("onChanged")
        });
        var expandValueChanging = that.option("onExpandValueChanging");
        if (expandValueChanging) {
            that._dataController.expandValueChanging.add(function(e) {
                expandValueChanging(e)
            })
        }
    },
    _init: function() {
        var that = this;
        that.callBase();
        that._initDataController();
        that._scrollLeft = that._scrollTop = null;
        that._initActions()
    },
    _initActions: function() {
        var that = this;
        that._actions = {
            onChanged: that._createActionByOption("onChanged"),
            onContextMenuPreparing: that._createActionByOption("onContextMenuPreparing"),
            onCellClick: that._createActionByOption("onCellClick"),
            onExporting: that._createActionByOption("onExporting"),
            onExported: that._createActionByOption("onExported"),
            onFileSaving: that._createActionByOption("onFileSaving"),
            onCellPrepared: that._createActionByOption("onCellPrepared")
        }
    },
    _trigger: function(eventName, eventArg) {
        this._actions[eventName](eventArg)
    },
    _optionChanged: function(args) {
        var that = this;
        switch (args.name) {
            case "dataSource":
            case "allowSorting":
            case "allowFiltering":
            case "allowExpandAll":
            case "allowSortingBySummary":
            case "scrolling":
            case "stateStoring":
                that._initDataController();
                that._fieldChooserPopup.hide();
                that._renderFieldChooser();
                that._invalidate();
                break;
            case "texts":
            case "showTotalsPrior":
            case "showRowTotals":
            case "showRowGrandTotals":
            case "showColumnTotals":
            case "showColumnGrandTotals":
            case "hideEmptySummaryCells":
            case "dataFieldArea":
                that._dataController.updateViewOptions(that._getDataControllerOptions());
                break;
            case "useNativeScrolling":
            case "encodeHtml":
            case "renderCellCountLimit":
                break;
            case "rtlEnabled":
                that.callBase(args);
                that._renderFieldChooser();
                that._renderContextMenu();
                (0, _window.hasWindow)() && that._renderLoadPanel(that._dataArea.groupElement(), that.$element());
                that._invalidate();
                break;
            case "export":
                that._renderDescriptionArea();
                break;
            case "onExpandValueChanging":
                break;
            case "onCellClick":
            case "onContextMenuPreparing":
            case "onExporting":
            case "onExported":
            case "onFileSaving":
            case "onCellPrepared":
                that._actions[args.name] = that._createActionByOption(args.name);
                break;
            case "fieldChooser":
                that._renderFieldChooser();
                that._renderDescriptionArea();
                break;
            case "loadPanel":
                if ((0, _window.hasWindow)()) {
                    that._renderLoadPanel(that._dataArea.groupElement(), that.$element());
                    that._invalidate()
                }
                break;
            case "fieldPanel":
                that._renderDescriptionArea();
                that._invalidate();
                break;
            case "headerFilter":
                that._renderFieldChooser();
                that._invalidate();
                break;
            case "showBorders":
                that._tableElement().toggleClass(BORDERS_CLASS, !!args.value);
                that.updateDimensions();
                break;
            case "wordWrapEnabled":
                that._tableElement().toggleClass("dx-word-wrap", !!args.value);
                that.updateDimensions();
                break;
            case "rowHeaderLayout":
                that._tableElement().find("." + ROW_AREA_CELL_CLASS).toggleClass("dx-area-tree-view", "tree" === args.value);
                that._dataController.updateViewOptions(that._getDataControllerOptions());
                break;
            case "height":
            case "width":
                that._hasHeight = null;
                that.callBase(args);
                that.resize();
                break;
            default:
                that.callBase(args)
        }
    },
    _updateScrollPosition: function(columnsArea, rowsArea, dataArea) {
        var that = this;
        var scrollTop;
        var scrollLeft;
        var scrolled = that._scrollTop || that._scrollLeft;
        if (that._scrollUpdating) {
            return
        }
        that._scrollUpdating = true;
        if (rowsArea && !rowsArea.hasScroll() && that._hasHeight) {
            that._scrollTop = null
        }
        if (columnsArea && !columnsArea.hasScroll()) {
            that._scrollLeft = null
        }
        if (null !== that._scrollTop || null !== that._scrollLeft || scrolled || that.option("rtlEnabled")) {
            scrollTop = that._scrollTop || 0;
            scrollLeft = that._scrollLeft || 0;
            dataArea.scrollTo({
                x: scrollLeft,
                y: scrollTop
            });
            columnsArea.scrollTo(scrollLeft);
            rowsArea.scrollTo(scrollTop);
            that._dataController.updateWindowScrollPosition(that._scrollTop)
        }
        that._scrollUpdating = false
    },
    _subscribeToEvents: function(columnsArea, rowsArea, dataArea) {
        var that = this;
        var scrollHandler = function(e) {
            var scrollOffset = e.scrollOffset;
            var leftOffset = (0, _type.isDefined)(scrollOffset.left) ? scrollOffset.left : that._scrollLeft;
            var topOffset = (0, _type.isDefined)(scrollOffset.top) && that._hasHeight ? scrollOffset.top : that._scrollTop;
            if ((that._scrollLeft || 0) !== (leftOffset || 0) || (that._scrollTop || 0) !== (topOffset || 0)) {
                that._scrollLeft = leftOffset;
                that._scrollTop = topOffset;
                that._updateScrollPosition(columnsArea, rowsArea, dataArea);
                if ("virtual" === that.option("scrolling.mode")) {
                    that._dataController.setViewportPosition(that._scrollLeft, that._scrollTop)
                }
            }
        };
        (0, _iterator.each)([columnsArea, rowsArea, dataArea], function(_, area) {
            subscribeToScrollEvent(area, scrollHandler)
        });
        !that._hasHeight && that._dataController.subscribeToWindowScrollEvents(dataArea.groupElement())
    },
    _clean: _common.noop,
    _needDelayResizing: function(cellsInfo) {
        var cellsCount = cellsInfo.length * (cellsInfo.length ? cellsInfo[0].length : 0);
        return cellsCount > this.option("renderCellCountLimit")
    },
    _renderFieldChooser: function() {
        var that = this;
        var container = that._pivotGridContainer;
        var fieldChooserOptions = that.option("fieldChooser") || {};
        var toolbarItems = "onDemand" === fieldChooserOptions.applyChangesMode ? [{
            toolbar: "bottom",
            location: "after",
            widget: "dxButton",
            options: {
                text: (0, _message.format)("OK"),
                onClick: function(e) {
                    that._fieldChooserPopup.$content().dxPivotGridFieldChooser("applyChanges");
                    that._fieldChooserPopup.hide()
                }
            }
        }, {
            toolbar: "bottom",
            location: "after",
            widget: "dxButton",
            options: {
                text: (0, _message.format)("Cancel"),
                onClick: function(e) {
                    that._fieldChooserPopup.hide()
                }
            }
        }] : [];
        var fieldChooserComponentOptions = {
            layout: fieldChooserOptions.layout,
            texts: fieldChooserOptions.texts || {},
            dataSource: that.getDataSource(),
            allowSearch: fieldChooserOptions.allowSearch,
            searchTimeout: fieldChooserOptions.searchTimeout,
            width: void 0,
            height: void 0,
            headerFilter: that.option("headerFilter"),
            encodeHtml: that.option("encodeHtml"),
            applyChangesMode: fieldChooserOptions.applyChangesMode,
            onContextMenuPreparing: function(e) {
                that._trigger("onContextMenuPreparing", e)
            }
        };
        var popupOptions = {
            shading: false,
            title: fieldChooserOptions.title,
            width: fieldChooserOptions.width,
            height: fieldChooserOptions.height,
            showCloseButton: true,
            resizeEnabled: true,
            minWidth: fieldChooserOptions.minWidth,
            minHeight: fieldChooserOptions.minHeight,
            toolbarItems: toolbarItems,
            onResize: function(e) {
                e.component.$content().dxPivotGridFieldChooser("updateDimensions")
            },
            onShown: function(e) {
                that._createComponent(e.component.content(), _uiPivot_grid7.default, fieldChooserComponentOptions)
            },
            onHidden: function(e) {
                var fieldChooser = e.component.$content().dxPivotGridFieldChooser("instance");
                fieldChooser.resetTreeView();
                fieldChooser.cancelChanges()
            }
        };
        if (that._fieldChooserPopup) {
            that._fieldChooserPopup.option(popupOptions);
            that._fieldChooserPopup.$content().dxPivotGridFieldChooser(fieldChooserComponentOptions)
        } else {
            that._fieldChooserPopup = that._createComponent((0, _renderer2.default)(DIV).addClass(FIELD_CHOOSER_POPUP_CLASS).appendTo(container), _popup2.default, popupOptions)
        }
    },
    _renderContextMenu: function() {
        var that = this;
        var $container = that._pivotGridContainer;
        if (that._contextMenu) {
            that._contextMenu.$element().remove()
        }
        that._contextMenu = that._createComponent((0, _renderer2.default)(DIV).appendTo($container), _context_menu2.default, {
            onPositioning: function(actionArgs) {
                var event = actionArgs.event;
                actionArgs.cancel = true;
                if (!event) {
                    return
                }
                var targetElement = event.target.cellIndex >= 0 ? event.target : (0, _renderer2.default)(event.target).closest("td").get(0);
                if (!targetElement) {
                    return
                }
                var args = that._createEventArgs(targetElement, event);
                var items = that._getContextMenuItems(args);
                if (items) {
                    actionArgs.component.option("items", items);
                    actionArgs.cancel = false;
                    return
                }
            },
            onItemClick: function(params) {
                params.itemData.onItemClick && params.itemData.onItemClick(params)
            },
            cssClass: PIVOTGRID_CLASS,
            target: that.$element()
        })
    },
    _getContextMenuItems: function(e) {
        var that = this;
        var items = [];
        var texts = that.option("texts");
        if ("row" === e.area || "column" === e.area) {
            var areaFields = e[e.area + "Fields"];
            var oppositeAreaFields = e["column" === e.area ? "rowFields" : "columnFields"];
            var field = e.cell.path && areaFields[e.cell.path.length - 1];
            var dataSource = that.getDataSource();
            if (field && field.allowExpandAll && e.cell.path.length < e[e.area + "Fields"].length && !dataSource.paginate()) {
                items.push({
                    beginGroup: true,
                    icon: "none",
                    text: texts.expandAll,
                    onItemClick: function() {
                        dataSource.expandAll(field.index)
                    }
                });
                items.push({
                    text: texts.collapseAll,
                    icon: "none",
                    onItemClick: function() {
                        dataSource.collapseAll(field.index)
                    }
                })
            }
            if (e.cell.isLast && !dataSource.paginate()) {
                var sortingBySummaryItemCount = 0;
                (0, _iterator.each)(oppositeAreaFields, function(index, field) {
                    if (!field.allowSortingBySummary) {
                        return
                    }(0, _iterator.each)(e.dataFields, function(dataIndex, dataField) {
                        if ((0, _type.isDefined)(e.cell.dataIndex) && e.cell.dataIndex !== dataIndex) {
                            return
                        }
                        var showDataFieldCaption = !(0, _type.isDefined)(e.cell.dataIndex) && e.dataFields.length > 1;
                        var textFormat = "column" === e.area ? texts.sortColumnBySummary : texts.sortRowBySummary;
                        var checked = (0, _uiPivot_grid.findField)(e.dataFields, field.sortBySummaryField) === dataIndex && (e.cell.path || []).join("/") === (field.sortBySummaryPath || []).join("/");
                        var text = (0, _string.format)(textFormat, showDataFieldCaption ? field.caption + " - " + dataField.caption : field.caption);
                        items.push({
                            beginGroup: 0 === sortingBySummaryItemCount,
                            icon: checked ? "desc" === field.sortOrder ? "sortdowntext" : "sortuptext" : "none",
                            text: text,
                            onItemClick: function() {
                                dataSource.field(field.index, {
                                    sortBySummaryField: dataField.name || dataField.caption || dataField.dataField,
                                    sortBySummaryPath: e.cell.path,
                                    sortOrder: "desc" === field.sortOrder ? "asc" : "desc"
                                });
                                dataSource.load()
                            }
                        });
                        sortingBySummaryItemCount++
                    })
                });
                (0, _iterator.each)(oppositeAreaFields, function(index, field) {
                    if (!field.allowSortingBySummary || !(0, _type.isDefined)(field.sortBySummaryField)) {
                        return
                    }
                    items.push({
                        beginGroup: 0 === sortingBySummaryItemCount,
                        icon: "none",
                        text: texts.removeAllSorting,
                        onItemClick: function() {
                            (0, _iterator.each)(oppositeAreaFields, function(index, field) {
                                dataSource.field(field.index, {
                                    sortBySummaryField: void 0,
                                    sortBySummaryPath: void 0,
                                    sortOrder: void 0
                                })
                            });
                            dataSource.load()
                        }
                    });
                    return false
                })
            }
        }
        if (that.option("fieldChooser.enabled")) {
            items.push({
                beginGroup: true,
                icon: "columnchooser",
                text: texts.showFieldChooser,
                onItemClick: function() {
                    that._fieldChooserPopup.show()
                }
            })
        }
        if (that.option("export.enabled")) {
            items.push({
                beginGroup: true,
                icon: "xlsxfile",
                text: texts.exportToExcel,
                onItemClick: function() {
                    that.exportToExcel()
                }
            })
        }
        e.items = items;
        that._trigger("onContextMenuPreparing", e);
        items = e.items;
        if (items && items.length) {
            return items
        }
    },
    _createEventArgs: function(targetElement, dxEvent) {
        var that = this;
        var dataSource = that.getDataSource();
        var args = {
            rowFields: dataSource.getAreaFields("row"),
            columnFields: dataSource.getAreaFields("column"),
            dataFields: dataSource.getAreaFields("data"),
            event: dxEvent
        };
        if (clickedOnFieldsArea((0, _renderer2.default)(targetElement))) {
            return (0, _extend.extend)(that._createFieldArgs(targetElement), args)
        } else {
            return (0, _extend.extend)(that._createCellArgs(targetElement), args)
        }
    },
    _createFieldArgs: function(targetElement) {
        var field = (0, _renderer2.default)(targetElement).children().data("field");
        var args = {
            field: field
        };
        return (0, _type.isDefined)(field) ? args : {}
    },
    _createCellArgs: function(cellElement) {
        var $cellElement = (0, _renderer2.default)(cellElement);
        var columnIndex = cellElement.cellIndex;
        var rowIndex = cellElement.parentElement.rowIndex;
        var $table = $cellElement.closest("table");
        var data = $table.data("data");
        var cell = data && data[rowIndex] && data[rowIndex][columnIndex];
        var args = {
            area: $table.data("area"),
            rowIndex: rowIndex,
            columnIndex: columnIndex,
            cellElement: (0, _dom.getPublicElement)($cellElement),
            cell: cell
        };
        return args
    },
    _handleCellClick: function(e) {
        var that = this;
        var args = that._createEventArgs(e.currentTarget, e);
        var cell = args.cell;
        if (!cell || !args.area && (args.rowIndex || args.columnIndex)) {
            return
        }
        that._trigger("onCellClick", args);
        cell && !args.cancel && (0, _type.isDefined)(cell.expanded) && setTimeout(function() {
            that._dataController[cell.expanded ? "collapseHeaderItem" : "expandHeaderItem"](args.area, cell.path)
        })
    },
    _getNoDataText: function() {
        return this.option("texts.noData")
    },
    _renderNoDataText: _uiGrid_core.renderNoDataText,
    _renderLoadPanel: _uiGrid_core.renderLoadPanel,
    _updateLoading: function(progress) {
        var that = this;
        var isLoading = that._dataController.isLoading();
        if (!that._loadPanel) {
            return
        }
        var loadPanelVisible = that._loadPanel.option("visible");
        if (!loadPanelVisible) {
            that._startLoadingTime = new Date
        }
        if (isLoading) {
            if (progress) {
                if (new Date - that._startLoadingTime >= 1e3) {
                    that._loadPanel.option("message", Math.floor(100 * progress) + "%")
                }
            } else {
                that._loadPanel.option("message", that.option("loadPanel.text"))
            }
        }
        clearTimeout(that._hideLoadingTimeoutID);
        if (loadPanelVisible && !isLoading) {
            that._hideLoadingTimeoutID = setTimeout(function() {
                that._loadPanel.option("visible", false);
                that.$element().removeClass(OVERFLOW_HIDDEN_CLASS)
            })
        } else {
            that._loadPanel.option("visible", isLoading);
            that.$element().toggleClass(OVERFLOW_HIDDEN_CLASS, !isLoading)
        }
    },
    _renderDescriptionArea: function() {
        var _this = this;
        var $element = this.$element();
        var $descriptionCell = $element.find("." + DESCRIPTION_AREA_CELL_CLASS);
        var $toolbarContainer = (0, _renderer2.default)(DIV).addClass("dx-pivotgrid-toolbar");
        var fieldPanel = this.option("fieldPanel");
        var $filterHeader = $element.find(".dx-filter-header");
        var $columnHeader = $element.find(".dx-column-header");
        var $targetContainer;
        if (fieldPanel.visible && fieldPanel.showFilterFields) {
            $targetContainer = $filterHeader
        } else {
            if (fieldPanel.visible && (fieldPanel.showDataFields || fieldPanel.showColumnFields)) {
                $targetContainer = $columnHeader
            } else {
                $targetContainer = $descriptionCell
            }
        }
        $columnHeader.toggleClass(BOTTOM_BORDER_CLASS, !!(fieldPanel.visible && (fieldPanel.showDataFields || fieldPanel.showColumnFields)));
        $filterHeader.toggleClass(BOTTOM_BORDER_CLASS, !!(fieldPanel.visible && fieldPanel.showFilterFields));
        $descriptionCell.toggleClass("dx-pivotgrid-background", fieldPanel.visible && (fieldPanel.showDataFields || fieldPanel.showColumnFields || fieldPanel.showRowFields));
        this.$element().find(".dx-pivotgrid-toolbar").remove();
        $toolbarContainer.prependTo($targetContainer);
        if (this.option("fieldChooser.enabled")) {
            var $buttonElement = (0, _renderer2.default)(DIV).appendTo($toolbarContainer).addClass("dx-pivotgrid-field-chooser-button");
            var buttonOptions = {
                icon: "columnchooser",
                hint: this.option("texts.showFieldChooser"),
                onClick: function() {
                    _this.getFieldChooserPopup().show()
                }
            };
            this._createComponent($buttonElement, "dxButton", buttonOptions)
        }
        if (this.option("export.enabled")) {
            var _$buttonElement = (0, _renderer2.default)(DIV).appendTo($toolbarContainer).addClass("dx-pivotgrid-export-button");
            var _buttonOptions = {
                icon: "xlsxfile",
                hint: this.option("texts.exportToExcel"),
                onClick: function() {
                    _this.exportToExcel()
                }
            };
            this._createComponent(_$buttonElement, "dxButton", _buttonOptions)
        }
    },
    _detectHasContainerHeight: function() {
        var that = this;
        var element = that.$element();
        if ((0, _type.isDefined)(that._hasHeight) || element.is(":hidden")) {
            return
        }
        that._pivotGridContainer.addClass("dx-hidden");
        var testElement = (0, _renderer2.default)(DIV).height(TEST_HEIGHT);
        element.append(testElement);
        that._hasHeight = element.height() !== TEST_HEIGHT;
        that._pivotGridContainer.removeClass("dx-hidden");
        testElement.remove()
    },
    _renderHeaders: function(rowHeaderContainer, columnHeaderContainer, filterHeaderContainer, dataHeaderContainer) {
        var that = this;
        var dataSource = that.getDataSource();
        that._rowFields = that._rowFields || new _uiPivot_grid5.FieldsArea(that, "row");
        that._rowFields.render(rowHeaderContainer, dataSource.getAreaFields("row"));
        that._columnFields = that._columnFields || new _uiPivot_grid5.FieldsArea(that, "column");
        that._columnFields.render(columnHeaderContainer, dataSource.getAreaFields("column"));
        that._filterFields = that._filterFields || new _uiPivot_grid5.FieldsArea(that, "filter");
        that._filterFields.render(filterHeaderContainer, dataSource.getAreaFields("filter"));
        that._dataFields = that._dataFields || new _uiPivot_grid5.FieldsArea(that, "data");
        that._dataFields.render(dataHeaderContainer, dataSource.getAreaFields("data"));
        that.$element().dxPivotGridFieldChooserBase("instance").renderSortable()
    },
    _createTableElement: function() {
        var that = this;
        var $table = (0, _renderer2.default)("<table>").css({
            width: "100%"
        }).toggleClass(BORDERS_CLASS, !!that.option("showBorders")).toggleClass("dx-word-wrap", !!that.option("wordWrapEnabled"));
        _events_engine2.default.on($table, (0, _utils.addNamespace)(_click.name, "dxPivotGrid"), "td", that._handleCellClick.bind(that));
        return $table
    },
    _renderDataArea: function(dataAreaElement) {
        var that = this;
        var dataArea = that._dataArea || new _uiPivot_grid3.DataArea(that);
        that._dataArea = dataArea;
        dataArea.render(dataAreaElement, that._dataController.getCellsInfo());
        return dataArea
    },
    _renderRowsArea: function(rowsAreaElement) {
        var that = this;
        var rowsArea = that._rowsArea || new _uiPivot_grid4.VerticalHeadersArea(that);
        that._rowsArea = rowsArea;
        rowsArea.render(rowsAreaElement, that._dataController.getRowsInfo());
        return rowsArea
    },
    _renderColumnsArea: function(columnsAreaElement) {
        var that = this;
        var columnsArea = that._columnsArea || new _uiPivot_grid4.HorizontalHeadersArea(that);
        that._columnsArea = columnsArea;
        columnsArea.render(columnsAreaElement, that._dataController.getColumnsInfo());
        return columnsArea
    },
    _initMarkup: function() {
        var that = this;
        that.callBase.apply(this, arguments);
        that.$element().addClass(PIVOTGRID_CLASS)
    },
    _renderContentImpl: function() {
        var that = this;
        var columnsAreaElement;
        var rowsAreaElement;
        var dataAreaElement;
        var tableElement;
        var isFirstDrawing = !that._pivotGridContainer;
        var rowHeaderContainer;
        var columnHeaderContainer;
        var filterHeaderContainer;
        var dataHeaderContainer;
        tableElement = !isFirstDrawing && that._tableElement();
        if (!tableElement) {
            that.$element().addClass(ROW_LINES_CLASS).addClass(FIELDS_CONTAINER_CLASS);
            that._pivotGridContainer = (0, _renderer2.default)(DIV).addClass("dx-pivotgrid-container");
            that._renderFieldChooser();
            that._renderContextMenu();
            columnsAreaElement = (0, _renderer2.default)(TD).addClass(COLUMN_AREA_CELL_CLASS);
            rowsAreaElement = (0, _renderer2.default)(TD).addClass(ROW_AREA_CELL_CLASS);
            dataAreaElement = (0, _renderer2.default)(TD).addClass(DATA_AREA_CELL_CLASS);
            tableElement = that._createTableElement();
            dataHeaderContainer = (0, _renderer2.default)(TD).addClass("dx-data-header");
            filterHeaderContainer = (0, _renderer2.default)("<td>").attr("colspan", "2").addClass("dx-filter-header");
            columnHeaderContainer = (0, _renderer2.default)(TD).addClass("dx-column-header");
            rowHeaderContainer = (0, _renderer2.default)(TD).addClass(DESCRIPTION_AREA_CELL_CLASS);
            (0, _renderer2.default)(TR).append(filterHeaderContainer).appendTo(tableElement);
            (0, _renderer2.default)(TR).append(dataHeaderContainer).append(columnHeaderContainer).appendTo(tableElement);
            (0, _renderer2.default)(TR).toggleClass("dx-ie", true === _browser.msie).append(rowHeaderContainer).append(columnsAreaElement).appendTo(tableElement);
            (0, _renderer2.default)(TR).addClass(BOTTOM_ROW_CLASS).append(rowsAreaElement).append(dataAreaElement).appendTo(tableElement);
            that._pivotGridContainer.append(tableElement);
            that.$element().append(that._pivotGridContainer);
            if ("tree" === that.option("rowHeaderLayout")) {
                rowsAreaElement.addClass("dx-area-tree-view")
            }
        }
        that.$element().addClass(OVERFLOW_HIDDEN_CLASS);
        that._createComponent(that.$element(), _uiPivot_grid9.default, {
            dataSource: that.getDataSource(),
            encodeHtml: that.option("encodeHtml"),
            allowFieldDragging: that.option("fieldPanel.allowFieldDragging"),
            headerFilter: that.option("headerFilter"),
            visible: that.option("visible")
        });
        var dataArea = that._renderDataArea(dataAreaElement);
        var rowsArea = that._renderRowsArea(rowsAreaElement);
        var columnsArea = that._renderColumnsArea(columnsAreaElement);
        dataArea.tableElement().prepend(columnsArea.headElement());
        if (isFirstDrawing) {
            that._renderLoadPanel(dataArea.groupElement().parent(), that.$element());
            that._renderDescriptionArea();
            rowsArea.processScroll();
            columnsArea.processScroll()
        } [dataArea, rowsArea, columnsArea].forEach(function(area) {
            unsubscribeScrollEvents(area)
        });
        that._renderHeaders(rowHeaderContainer, columnHeaderContainer, filterHeaderContainer, dataHeaderContainer);
        that._update(isFirstDrawing)
    },
    _update: function(isFirstDrawing) {
        var that = this;
        var updateHandler = function() {
            that.updateDimensions().done(function() {
                that._subscribeToEvents(that._columnsArea, that._rowsArea, that._dataArea)
            })
        };
        if (that._needDelayResizing(that._dataArea.getData()) && isFirstDrawing) {
            setTimeout(updateHandler)
        } else {
            updateHandler()
        }
    },
    _fireContentReadyAction: function() {
        if (!this._dataController.isLoading()) {
            this.callBase()
        }
    },
    getScrollPath: function(area) {
        var that = this;
        if ("column" === area) {
            return that._columnsArea.getScrollPath(that._scrollLeft)
        } else {
            return that._rowsArea.getScrollPath(that._scrollTop)
        }
    },
    getDataSource: function() {
        return this._dataController.getDataSource()
    },
    getFieldChooserPopup: function() {
        return this._fieldChooserPopup
    },
    hasScroll: function(area) {
        var that = this;
        return "column" === area ? that._columnsArea.hasScroll() : that._rowsArea.hasScroll()
    },
    _dimensionChanged: function() {
        this.updateDimensions()
    },
    _visibilityChanged: function(visible) {
        if (visible) {
            this.updateDimensions()
        }
    },
    _dispose: function() {
        var that = this;
        clearTimeout(that._hideLoadingTimeoutID);
        that.callBase.apply(that, arguments);
        if (that._dataController) {
            that._dataController.dispose()
        }
    },
    _tableElement: function() {
        return this.$element().find("table").first()
    },
    addWidgetPrefix: function(className) {
        return "dx-pivotgrid-" + className
    },
    resize: function() {
        this.updateDimensions()
    },
    isReady: function() {
        return this.callBase() && !this._dataController.isLoading()
    },
    updateDimensions: function() {
        var that = this;
        var groupWidth;
        var tableElement = that._tableElement();
        var rowsArea = that._rowsArea;
        var columnsArea = that._columnsArea;
        var dataArea = that._dataArea;
        var dataAreaHeights;
        var rowsAreaHeights;
        var resultHeights;
        var resultWidths;
        var rowsAreaColumnWidths;
        var bordersWidth;
        var totalWidth = 0;
        var totalHeight = 0;
        var rowsAreaWidth = 0;
        var hasRowsScroll;
        var hasColumnsScroll;
        var scrollingOptions = that.option("scrolling") || {};
        var scrollBarInfo = getScrollBarInfo(scrollingOptions.useNative);
        var scrollBarWidth = scrollBarInfo.scrollBarWidth;
        var dataAreaCell = tableElement.find("." + DATA_AREA_CELL_CLASS);
        var rowAreaCell = tableElement.find("." + ROW_AREA_CELL_CLASS);
        var columnAreaCell = tableElement.find("." + COLUMN_AREA_CELL_CLASS);
        var descriptionCell = tableElement.find("." + DESCRIPTION_AREA_CELL_CLASS);
        var filterHeaderCell = tableElement.find(".dx-filter-header");
        var columnHeaderCell = tableElement.find(".dx-column-header");
        var elementWidth;
        var columnsAreaHeight;
        var descriptionCellHeight;
        var columnsAreaRowHeights;
        var rowHeights;
        var rowFieldsHeader = that._rowFields;
        var columnsAreaRowCount;
        var needSynchronizeFieldPanel;
        var d = new _deferred.Deferred;
        if (!(0, _window.hasWindow)()) {
            return
        }
        needSynchronizeFieldPanel = rowFieldsHeader.isVisible() && "tree" !== that.option("rowHeaderLayout"), that._detectHasContainerHeight();
        if (!dataArea.headElement().length) {
            dataArea.tableElement().prepend(columnsArea.headElement())
        }
        if (needSynchronizeFieldPanel) {
            rowsArea.updateColspans(rowFieldsHeader.getColumnsCount());
            rowsArea.tableElement().prepend(rowFieldsHeader.headElement())
        }
        tableElement.addClass(INCOMPRESSIBLE_FIELDS_CLASS);
        dataArea.reset();
        rowsArea.reset();
        columnsArea.reset();
        rowFieldsHeader.reset();
        var calculateHasScroll = function(areaSize, totalSize) {
            return totalSize - areaSize >= 1
        };
        var calculateGroupHeight = function(dataAreaHeight, totalHeight, hasRowsScroll, hasColumnsScroll, scrollBarWidth) {
            return hasRowsScroll ? dataAreaHeight : totalHeight + (hasColumnsScroll ? scrollBarWidth : 0)
        };
        (0, _common.deferUpdate)(function() {
            resultWidths = dataArea.getColumnsWidth();
            rowHeights = rowsArea.getRowsHeight();
            rowsAreaHeights = needSynchronizeFieldPanel ? rowHeights.slice(1) : rowHeights;
            dataAreaHeights = dataArea.getRowsHeight();
            descriptionCellHeight = (0, _size.getSize)(descriptionCell[0], "height", {
                paddings: true,
                borders: true,
                margins: true
            }) + (needSynchronizeFieldPanel ? rowHeights[0] : 0);
            columnsAreaRowCount = that._dataController.getColumnsInfo().length;
            resultHeights = (0, _uiPivot_grid.mergeArraysByMaxValue)(rowsAreaHeights, dataAreaHeights.slice(columnsAreaRowCount));
            columnsAreaRowHeights = dataAreaHeights.slice(0, columnsAreaRowCount);
            columnsAreaHeight = getArraySum(columnsAreaRowHeights);
            rowsAreaColumnWidths = rowsArea.getColumnsWidth();
            var filterAreaHeight = 0;
            var dataAreaHeight = 0;
            if (that._hasHeight) {
                filterAreaHeight = filterHeaderCell.height();
                bordersWidth = getCommonBorderWidth([columnAreaCell, dataAreaCell, tableElement, columnHeaderCell, filterHeaderCell], "height");
                dataAreaHeight = that.$element().height() - filterAreaHeight - tableElement.find(".dx-data-header").height() - (Math.max(dataArea.headElement().height(), columnAreaCell.height(), descriptionCellHeight) + bordersWidth)
            }
            totalWidth = dataArea.tableElement().width();
            totalHeight = getArraySum(resultHeights);
            if (!totalWidth || !totalHeight) {
                d.resolve();
                return
            }
            rowsAreaWidth = getArraySum(rowsAreaColumnWidths);
            elementWidth = that.$element().width();
            bordersWidth = getCommonBorderWidth([rowAreaCell, dataAreaCell, tableElement], "width");
            groupWidth = elementWidth - rowsAreaWidth - bordersWidth;
            groupWidth = groupWidth > 0 ? groupWidth : totalWidth;
            hasRowsScroll = that._hasHeight && calculateHasScroll(dataAreaHeight, totalHeight);
            hasColumnsScroll = calculateHasScroll(groupWidth, totalWidth);
            var groupHeight = calculateGroupHeight(dataAreaHeight, totalHeight, hasRowsScroll, hasColumnsScroll, scrollBarWidth);
            (0, _common.deferRender)(function() {
                columnsArea.tableElement().append(dataArea.headElement());
                rowFieldsHeader.tableElement().append(rowsArea.headElement());
                if (!hasColumnsScroll && hasRowsScroll && scrollBarWidth) {
                    adjustSizeArray(resultWidths, scrollBarWidth);
                    totalWidth -= scrollBarWidth
                }
                if (descriptionCellHeight > columnsAreaHeight) {
                    adjustSizeArray(columnsAreaRowHeights, columnsAreaHeight - descriptionCellHeight);
                    columnsArea.setRowsHeight(columnsAreaRowHeights)
                }
                tableElement.removeClass(INCOMPRESSIBLE_FIELDS_CLASS);
                columnHeaderCell.children().css("maxWidth", groupWidth);
                columnsArea.groupWidth(groupWidth);
                columnsArea.processScrollBarSpacing(hasRowsScroll ? scrollBarWidth : 0);
                columnsArea.setColumnsWidth(resultWidths);
                rowsArea.groupHeight(that._hasHeight ? groupHeight : "auto");
                rowsArea.processScrollBarSpacing(hasColumnsScroll ? scrollBarWidth : 0);
                rowsArea.setColumnsWidth(rowsAreaColumnWidths);
                rowsArea.setRowsHeight(resultHeights);
                dataArea.setColumnsWidth(resultWidths);
                dataArea.setRowsHeight(resultHeights);
                dataArea.groupWidth(groupWidth);
                dataArea.groupHeight(that._hasHeight ? groupHeight : "auto");
                needSynchronizeFieldPanel && rowFieldsHeader.setColumnsWidth(rowsAreaColumnWidths);
                dataAreaCell.toggleClass(BOTTOM_BORDER_CLASS, !hasRowsScroll);
                rowAreaCell.toggleClass(BOTTOM_BORDER_CLASS, !hasRowsScroll);
                if (!that._hasHeight && elementWidth !== that.$element().width()) {
                    var diff = elementWidth - that.$element().width();
                    if (!hasColumnsScroll) {
                        adjustSizeArray(resultWidths, diff);
                        columnsArea.setColumnsWidth(resultWidths);
                        dataArea.setColumnsWidth(resultWidths)
                    }
                    dataArea.groupWidth(groupWidth - diff);
                    columnsArea.groupWidth(groupWidth - diff)
                }
                if (that._hasHeight && that._filterFields.isVisible() && filterHeaderCell.height() !== filterAreaHeight) {
                    var _diff = filterHeaderCell.height() - filterAreaHeight;
                    if (_diff > 0) {
                        hasRowsScroll = calculateHasScroll(dataAreaHeight - _diff, totalHeight);
                        var _groupHeight = calculateGroupHeight(dataAreaHeight - _diff, totalHeight, hasRowsScroll, hasColumnsScroll, scrollBarWidth);
                        dataArea.groupHeight(_groupHeight);
                        rowsArea.groupHeight(_groupHeight)
                    }
                }
                if ("virtual" === scrollingOptions.mode) {
                    var virtualContentParams = that._dataController.calculateVirtualContentParams({
                        virtualRowHeight: scrollingOptions.virtualRowHeight,
                        virtualColumnWidth: scrollingOptions.virtualColumnWidth,
                        itemWidths: resultWidths,
                        itemHeights: resultHeights,
                        rowCount: resultHeights.length,
                        columnCount: resultWidths.length,
                        viewportWidth: groupWidth,
                        viewportHeight: that._hasHeight ? groupHeight : (0, _renderer2.default)(window).outerHeight()
                    });
                    dataArea.setVirtualContentParams({
                        top: virtualContentParams.contentTop,
                        left: virtualContentParams.contentLeft,
                        width: virtualContentParams.width,
                        height: virtualContentParams.height
                    });
                    rowsArea.setVirtualContentParams({
                        top: virtualContentParams.contentTop,
                        width: rowsAreaWidth,
                        height: virtualContentParams.height
                    });
                    columnsArea.setVirtualContentParams({
                        left: virtualContentParams.contentLeft,
                        width: virtualContentParams.width,
                        height: columnsArea.groupElement().height()
                    })
                }
                var updateScrollableResults = [];
                dataArea.processScroll(scrollBarInfo.scrollBarUseNative, hasColumnsScroll, hasRowsScroll);
                (0, _iterator.each)([columnsArea, rowsArea, dataArea], function(_, area) {
                    updateScrollableResults.push(area && area.updateScrollable())
                });
                that._updateLoading();
                that._renderNoDataText(dataAreaCell);
                _deferred.when.apply(_renderer2.default, updateScrollableResults).done(function() {
                    that._updateScrollPosition(columnsArea, rowsArea, dataArea);
                    d.resolve()
                })
            })
        });
        return d
    },
    applyPartialDataSource: function(area, path, dataSource) {
        this._dataController.applyPartialDataSource(area, path, dataSource)
    }
}).inherit(_uiPivot_grid10.ExportMixin).include(_uiPivot_grid12.default);
(0, _component_registrator2.default)("dxPivotGrid", PivotGrid);
module.exports = PivotGrid;
