/**
 * DevExtreme (ui/grid_core/ui.grid_core.focus.js)
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
var _iterator = require("../../core/utils/iterator");
var _uiGrid_core3 = require("./ui.grid_core.utils");
var _common = require("../../core/utils/common");
var _type = require("../../core/utils/type");
var _deferred = require("../../core/utils/deferred");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var ROW_FOCUSED_CLASS = "dx-row-focused";
var FOCUSED_ROW_SELECTOR = ".dx-row." + ROW_FOCUSED_CLASS;
var TABLE_POSTFIX_CLASS = "table";
var CELL_FOCUS_DISABLED_CLASS = "dx-cell-focus-disabled";
exports.FocusController = _uiGrid_core2.default.ViewController.inherit(function() {
    return {
        init: function() {
            this._dataController = this.getController("data");
            this._keyboardController = this.getController("keyboardNavigation");
            this.component._optionsByReference.focusedRowKey = true
        },
        optionChanged: function(args) {
            if ("focusedRowIndex" === args.name) {
                var focusedRowKey = this.option("focusedRowKey");
                this._focusRowByIndex(args.value);
                this._triggerFocusedRowChangedIfNeed(focusedRowKey, args.value);
                args.handled = true
            } else {
                if ("focusedRowKey" === args.name) {
                    var focusedRowIndex = this.option("focusedRowIndex");
                    this._focusRowByKey(args.value);
                    this._triggerFocusedRowChangedIfNeed(args.value, focusedRowIndex);
                    args.handled = true
                } else {
                    if ("focusedColumnIndex" === args.name) {
                        args.handled = true
                    } else {
                        if ("focusedRowEnabled" === args.name) {
                            args.handled = true
                        } else {
                            if ("autoNavigateToFocusedRow" === args.name) {
                                args.handled = true
                            } else {
                                this.callBase(args)
                            }
                        }
                    }
                }
            }
        },
        _triggerFocusedRowChangedIfNeed: function(focusedRowKey, focusedRowIndex) {
            var focusedRowIndexByKey = this.getFocusedRowIndexByKey(focusedRowKey);
            if (focusedRowIndex === focusedRowIndexByKey) {
                var rowIndex = this._dataController.getRowIndexByKey(focusedRowKey);
                if (rowIndex >= 0) {
                    var $rowElement = (0, _renderer2.default)(this.getView("rowsView").getRowElement(rowIndex));
                    this.getController("keyboardNavigation")._fireFocusedRowChanged($rowElement, focusedRowIndex)
                }
            }
        },
        isAutoNavigateToFocusedRow: function() {
            return "infinite" !== this.option("scrolling.mode") && this.option("autoNavigateToFocusedRow")
        },
        _focusRowByIndex: function(index) {
            if (!this.option("focusedRowEnabled")) {
                return
            }
            index = void 0 !== index ? index : this.option("focusedRowIndex");
            if (index < 0) {
                if (this.isAutoNavigateToFocusedRow()) {
                    this._resetFocusedRow()
                }
            } else {
                this._focusRowByIndexCore(index)
            }
        },
        _focusRowByIndexCore: function(index) {
            var _this = this;
            var dataController = this.getController("data");
            var pageSize = dataController.pageSize();
            var setKeyByIndex = function() {
                if (_this._isValidFocusedRowIndex(index)) {
                    var visibleIndex = index - dataController.getRowIndexOffset();
                    var lastItemIndex = dataController._getLastItemIndex();
                    var rowIndex = Math.min(visibleIndex, lastItemIndex);
                    var focusedRowKey = dataController.getKeyByRowIndex(rowIndex);
                    if (void 0 !== focusedRowKey && !_this.isRowFocused(focusedRowKey)) {
                        _this.option("focusedRowKey", focusedRowKey)
                    }
                }
            };
            if (pageSize >= 0) {
                if (!this._isLocalRowIndex(index)) {
                    var pageIndex = Math.floor(index / dataController.pageSize());
                    (0, _deferred.when)(dataController.pageIndex(pageIndex), dataController.waitReady()).done(function() {
                        setKeyByIndex()
                    })
                } else {
                    setKeyByIndex()
                }
            }
        },
        _isLocalRowIndex: function(index) {
            var dataController = this.getController("data");
            var isVirtualScrolling = this.getController("keyboardNavigation")._isVirtualScrolling();
            if (isVirtualScrolling) {
                var pageIndex = Math.floor(index / dataController.pageSize());
                var virtualItems = dataController.virtualItemsCount();
                var virtualItemsBegin = virtualItems ? virtualItems.begin : -1;
                var visibleRowsCount = dataController.getVisibleRows().length + dataController.getRowIndexOffset();
                var visiblePagesCount = Math.ceil(visibleRowsCount / dataController.pageSize());
                return virtualItemsBegin <= index && visiblePagesCount > pageIndex
            }
            return true
        },
        _setFocusedRowKeyByIndex: function(index) {
            var dataController = this.getController("data");
            if (this._isValidFocusedRowIndex(index)) {
                var rowIndex = Math.min(index - dataController.getRowIndexOffset(), dataController.items().length - 1);
                var focusedRowKey = dataController.getKeyByRowIndex(rowIndex);
                if (void 0 !== focusedRowKey && !this.isRowFocused(focusedRowKey)) {
                    this.option("focusedRowKey", focusedRowKey)
                }
            }
        },
        _focusRowByKey: function(key) {
            if (void 0 === key) {
                this._resetFocusedRow()
            } else {
                this._navigateToRow(key, true)
            }
        },
        _resetFocusedRow: function() {
            if (void 0 === this.option("focusedRowKey") && this.option("focusedRowIndex") < 0) {
                return
            }
            var keyboardController = this.getController("keyboardNavigation");
            this.option("focusedRowKey", void 0);
            keyboardController.setFocusedRowIndex(-1);
            this.option("focusedRowIndex", -1);
            this.getController("data").updateItems({
                changeType: "updateFocusedRow",
                focusedRowKey: void 0
            });
            keyboardController._fireFocusedRowChanged(void 0, -1)
        },
        _isValidFocusedRowIndex: function(rowIndex) {
            var dataController = this.getController("data");
            var row = dataController.getVisibleRows()[rowIndex];
            return !row || "data" === row.rowType || "group" === row.rowType
        },
        publicMethods: function() {
            return ["navigateToRow", "isRowFocused"]
        },
        navigateToRow: function(key) {
            if (!this.isAutoNavigateToFocusedRow()) {
                this.option("focusedRowIndex", -1)
            }
            this._navigateToRow(key)
        },
        _navigateToRow: function(key, needFocusRow) {
            var that = this;
            var dataController = that.getController("data");
            var isAutoNavigate = that.isAutoNavigateToFocusedRow();
            var d = new _deferred.Deferred;
            if (void 0 === key || !dataController.dataSource()) {
                return d.reject().promise()
            }
            var rowIndexByKey = that.getFocusedRowIndexByKey(key);
            var isPaginate = dataController.getDataSource().paginate();
            if (!isAutoNavigate && needFocusRow || !isPaginate || rowIndexByKey >= 0) {
                that._navigateTo(key, d, needFocusRow)
            } else {
                dataController.getPageIndexByKey(key).done(function(pageIndex) {
                    if (pageIndex < 0) {
                        d.resolve(-1);
                        return
                    }
                    if (pageIndex === dataController.pageIndex()) {
                        dataController.reload().done(function() {
                            if (that.isRowFocused(key)) {
                                d.resolve(that.getFocusedRowIndexByKey(key))
                            } else {
                                that._navigateTo(key, d, needFocusRow)
                            }
                        }).fail(d.reject)
                    } else {
                        dataController.pageIndex(pageIndex).done(function() {
                            that._navigateTo(key, d, needFocusRow)
                        }).fail(d.reject)
                    }
                }).fail(d.reject)
            }
            return d.promise()
        },
        _navigateTo: function(key, deferred, needFocusRow) {
            var visibleRowIndex = this.getController("data").getRowIndexByKey(key);
            var isVirtualRowRenderingMode = "virtual" === this.option("scrolling.rowRenderingMode");
            var isAutoNavigate = this.isAutoNavigateToFocusedRow();
            if (isAutoNavigate && isVirtualRowRenderingMode && visibleRowIndex < 0) {
                this._navigateToVirtualRow(key, deferred, needFocusRow)
            } else {
                this._navigateToVisibleRow(key, deferred, needFocusRow)
            }
        },
        _navigateToVisibleRow: function(key, deferred, needFocusRow) {
            if (needFocusRow) {
                this._triggerUpdateFocusedRow(key, deferred)
            } else {
                this.getView("rowsView").scrollToRowElement(key)
            }
        },
        _navigateToVirtualRow: function(key, deferred, needFocusRow) {
            var that = this;
            var dataController = this.getController("data");
            var rowsScrollController = dataController._rowsScrollController;
            var rowIndex = (0, _uiGrid_core3.getIndexByKey)(key, dataController.items(true));
            var scrollable = that.getView("rowsView").getScrollable();
            if (rowsScrollController && scrollable && rowIndex >= 0) {
                var focusedRowIndex = rowIndex + dataController.getRowIndexOffset() - dataController.getRowIndexDelta();
                var offset = rowsScrollController.getItemOffset(focusedRowIndex);
                if (needFocusRow) {
                    var triggerUpdateFocusedRow = function triggerUpdateFocusedRow() {
                        that.component.off("contentReady", triggerUpdateFocusedRow);
                        that._triggerUpdateFocusedRow(key, deferred)
                    };
                    that.component.on("contentReady", triggerUpdateFocusedRow)
                }
                scrollable.scrollTo({
                    y: offset
                })
            }
        },
        _triggerUpdateFocusedRow: function(key, deferred) {
            var dataController = this.getController("data");
            var focusedRowIndex = this.getFocusedRowIndexByKey(key);
            if (this._isValidFocusedRowIndex(focusedRowIndex)) {
                this.getController("keyboardNavigation").setFocusedRowIndex(focusedRowIndex);
                if (this.option("focusedRowEnabled")) {
                    dataController.updateItems({
                        changeType: "updateFocusedRow",
                        focusedRowKey: key
                    })
                } else {
                    this.getView("rowsView").scrollToRowElement(key)
                }
                deferred && deferred.resolve(focusedRowIndex)
            } else {
                deferred && deferred.resolve(-1)
            }
        },
        getFocusedRowIndexByKey: function(key) {
            var dataController = this.getController("data");
            var rowIndex = dataController.getRowIndexByKey(key);
            return rowIndex >= 0 ? rowIndex + dataController.getRowIndexOffset() : -1
        },
        _focusRowByKeyOrIndex: function() {
            var _this2 = this;
            var focusedRowKey = this.option("focusedRowKey");
            var currentFocusedRowIndex = this.option("focusedRowIndex");
            var keyboardController = this.getController("keyboardNavigation");
            var dataController = this.getController("data");
            if (void 0 !== focusedRowKey) {
                var visibleRowIndex = dataController.getRowIndexByKey(focusedRowKey);
                if (visibleRowIndex >= 0) {
                    if (keyboardController._isVirtualScrolling()) {
                        currentFocusedRowIndex = visibleRowIndex + dataController.getRowIndexOffset()
                    }
                    keyboardController.setFocusedRowIndex(currentFocusedRowIndex);
                    this._triggerUpdateFocusedRow(focusedRowKey)
                } else {
                    this._navigateToRow(focusedRowKey, true).done(function(focusedRowIndex) {
                        if (currentFocusedRowIndex >= 0 && focusedRowIndex < 0) {
                            _this2._focusRowByIndex()
                        }
                    })
                }
            } else {
                if (currentFocusedRowIndex >= 0) {
                    this.getController("focus")._focusRowByIndex(currentFocusedRowIndex)
                }
            }
        },
        isRowFocused: function(key) {
            var focusedRowKey = this.option("focusedRowKey");
            if (void 0 !== focusedRowKey) {
                return (0, _common.equalByValue)(key, this.option("focusedRowKey"))
            }
        },
        updateFocusedRow: function(change) {
            var that = this;
            var focusedRowIndex = that._dataController.getRowIndexByKey(change.focusedRowKey);
            var rowsView = that.getView("rowsView");
            var $tableElement;
            (0, _iterator.each)(rowsView.getTableElements(), function(index, element) {
                var isMainTable = 0 === index;
                $tableElement = (0, _renderer2.default)(element);
                that._clearPreviousFocusedRow($tableElement, focusedRowIndex);
                that._prepareFocusedRow({
                    changedItem: change.items[focusedRowIndex],
                    $tableElement: $tableElement,
                    focusedRowIndex: focusedRowIndex,
                    isMainTable: isMainTable
                })
            })
        },
        _clearPreviousFocusedRow: function($tableElement, focusedRowIndex) {
            var _this3 = this;
            var isNotMasterDetailFocusedRow = function(_, focusedRow) {
                var $focusedRowTable = (0, _renderer2.default)(focusedRow).closest(".".concat(_this3.addWidgetPrefix(TABLE_POSTFIX_CLASS)));
                return $tableElement.is($focusedRowTable)
            };
            var $prevRowFocusedElement = $tableElement.find(FOCUSED_ROW_SELECTOR).filter(isNotMasterDetailFocusedRow);
            $prevRowFocusedElement.removeClass(ROW_FOCUSED_CLASS).removeClass(CELL_FOCUS_DISABLED_CLASS).removeAttr("tabindex");
            $prevRowFocusedElement.children("td").removeAttr("tabindex");
            if (0 !== focusedRowIndex) {
                var $firstRow = (0, _renderer2.default)(this.getView("rowsView").getRowElement(0));
                $firstRow.removeClass(CELL_FOCUS_DISABLED_CLASS).removeAttr("tabIndex")
            }
        },
        _prepareFocusedRow: function(options) {
            var $row;
            var changedItem = options.changedItem;
            if (changedItem && ("data" === changedItem.rowType || "group" === changedItem.rowType)) {
                var focusedRowIndex = options.focusedRowIndex;
                var $tableElement = options.$tableElement;
                var isMainTable = options.isMainTable;
                var tabIndex = this.option("tabindex") || 0;
                var rowsView = this.getView("rowsView");
                $row = (0, _renderer2.default)(rowsView._getRowElements($tableElement).eq(focusedRowIndex));
                $row.addClass(ROW_FOCUSED_CLASS).attr("tabindex", tabIndex);
                if (isMainTable) {
                    rowsView.scrollToElementVertically($row)
                }
            }
            return $row
        }
    }
}());
module.exports = {
    defaultOptions: function() {
        return {
            focusedRowEnabled: false,
            autoNavigateToFocusedRow: true,
            focusedRowKey: void 0,
            focusedRowIndex: -1,
            focusedColumnIndex: -1
        }
    },
    controllers: {
        focus: exports.FocusController
    },
    extenders: {
        controllers: {
            keyboardNavigation: {
                init: function() {
                    var rowIndex = this.option("focusedRowIndex");
                    var columnIndex = this.option("focusedColumnIndex");
                    this.createAction("onFocusedRowChanging", {
                        excludeValidators: ["disabled", "readOnly"]
                    });
                    this.createAction("onFocusedRowChanged", {
                        excludeValidators: ["disabled", "readOnly"]
                    });
                    this.createAction("onFocusedCellChanging", {
                        excludeValidators: ["disabled", "readOnly"]
                    });
                    this.createAction("onFocusedCellChanged", {
                        excludeValidators: ["disabled", "readOnly"]
                    });
                    this.callBase();
                    this.setRowFocusType();
                    this._focusedCellPosition = {};
                    if ((0, _type.isDefined)(rowIndex)) {
                        this._focusedCellPosition.rowIndex = this.option("focusedRowIndex")
                    }
                    if ((0, _type.isDefined)(columnIndex)) {
                        this._focusedCellPosition.columnIndex = this.option("focusedColumnIndex")
                    }
                },
                setFocusedRowIndex: function(rowIndex) {
                    this.callBase(rowIndex);
                    var visibleRow = this.getController("data").getVisibleRows()[rowIndex];
                    if (!visibleRow || !visibleRow.isNewRow) {
                        this.option("focusedRowIndex", rowIndex)
                    }
                },
                setFocusedColumnIndex: function(columnIndex) {
                    this.callBase(columnIndex);
                    this.option("focusedColumnIndex", columnIndex)
                },
                _escapeKeyHandler: function(eventArgs, isEditing) {
                    if (isEditing || !this.option("focusedRowEnabled")) {
                        this.callBase(eventArgs, isEditing);
                        return
                    }
                    if (this.isCellFocusType()) {
                        this.setRowFocusType();
                        this._focus(this._getCellElementFromTarget(eventArgs.originalEvent.target), true)
                    }
                },
                _updateFocusedCellPosition: function($cell, direction) {
                    var prevRowIndex = this.option("focusedRowIndex");
                    var prevColumnIndex = this.option("focusedColumnIndex");
                    if (this.callBase($cell, direction)) {
                        this._fireFocusedCellChanged($cell, prevColumnIndex, prevRowIndex)
                    }
                }
            },
            editorFactory: {
                renderFocusOverlay: function($element, hideBorder) {
                    var keyboardController = this.getController("keyboardNavigation");
                    var focusedRowEnabled = this.option("focusedRowEnabled");
                    var editingController = this.getController("editing");
                    var isRowElement = "row" === keyboardController._getElementType($element);
                    var $cell;
                    if (!focusedRowEnabled || !keyboardController.isRowFocusType() || editingController.isEditing()) {
                        this.callBase($element, hideBorder)
                    } else {
                        if (focusedRowEnabled) {
                            if (isRowElement && !$element.hasClass(ROW_FOCUSED_CLASS)) {
                                $cell = keyboardController.getFirstValidCellInRow($element);
                                keyboardController.focus($cell)
                            }
                        }
                    }
                }
            },
            columns: {
                getSortDataSourceParameters: function(_, sortByKey) {
                    var _this4 = this;
                    var result = this.callBase.apply(this, arguments);
                    var dataController = this.getController("data");
                    var dataSource = dataController._dataSource;
                    var store = dataController.store();
                    var key = store && store.key();
                    var remoteOperations = dataSource && dataSource.remoteOperations() || {};
                    var isLocalOperations = Object.keys(remoteOperations).every(function(operationName) {
                        return !remoteOperations[operationName]
                    });
                    if (key && (this.option("focusedRowEnabled") && false !== this.getController("focus").isAutoNavigateToFocusedRow() || sortByKey)) {
                        key = Array.isArray(key) ? key : [key];
                        var notSortedKeys = key.filter(function(key) {
                            return !_this4.columnOption(key, "sortOrder")
                        });
                        if (notSortedKeys.length) {
                            result = result || [];
                            if (isLocalOperations) {
                                result.push({
                                    selector: dataSource.getDataIndexGetter(),
                                    desc: false
                                })
                            } else {
                                notSortedKeys.forEach(function(notSortedKey) {
                                    return result.push({
                                        selector: notSortedKey,
                                        desc: false
                                    })
                                })
                            }
                        }
                    }
                    return result
                }
            },
            data: {
                _applyChange: function(change) {
                    if (change && "updateFocusedRow" === change.changeType) {
                        return
                    }
                    return this.callBase.apply(this, arguments)
                },
                _fireChanged: function(e) {
                    this.callBase(e);
                    if (this.option("focusedRowEnabled") && this._dataSource) {
                        var isPartialUpdate = "update" === e.changeType && e.repaintChangesOnly;
                        var isPartialUpdateWithDeleting = isPartialUpdate && e.changeTypes && e.changeTypes.indexOf("remove") >= 0;
                        if ("refresh" === e.changeType && e.items.length || isPartialUpdateWithDeleting) {
                            this.processUpdateFocusedRow()
                        } else {
                            if ("append" === e.changeType || "prepend" === e.changeType) {
                                this._updatePageIndexes()
                            }
                        }
                    }
                },
                _updatePageIndexes: function() {
                    this._lastPageIndex = this.pageIndex();
                    this._lastRenderingPageIndex = this._rowsScrollController ? this._rowsScrollController.pageIndex() : 0
                },
                processUpdateFocusedRow: function() {
                    var prevPageIndex = this._lastPageIndex;
                    var prevRenderingPageIndex = this._lastRenderingPageIndex || 0;
                    this._updatePageIndexes();
                    var pageIndex = this._lastPageIndex;
                    var renderingPageIndex = this._lastRenderingPageIndex;
                    var paging = void 0 !== prevPageIndex && prevPageIndex !== pageIndex;
                    var pagingByRendering = renderingPageIndex !== prevRenderingPageIndex;
                    var operationTypes = this._dataSource.operationTypes() || {};
                    var focusController = this.getController("focus");
                    var reload = operationTypes.reload;
                    var keyboardController = this.getController("keyboardNavigation");
                    var isVirtualScrolling = keyboardController._isVirtualScrolling();
                    var focusedRowKey = this.option("focusedRowKey");
                    var isAutoNavigate = focusController.isAutoNavigateToFocusedRow();
                    if (reload && void 0 !== focusedRowKey) {
                        focusController._navigateToRow(focusedRowKey, true).done(function(focusedRowIndex) {
                            if (focusedRowIndex < 0) {
                                focusController._focusRowByIndex()
                            }
                        })
                    } else {
                        if (paging) {
                            if (isAutoNavigate) {
                                var rowIndexByKey = this.getRowIndexByKey(focusedRowKey);
                                var isValidRowIndexByKey = rowIndexByKey >= 0;
                                var focusedRowIndex = this.option("focusedRowIndex");
                                var needFocusRowByIndex = focusedRowIndex >= 0 && (focusedRowIndex === rowIndexByKey || !isValidRowIndexByKey);
                                if (!isVirtualScrolling && needFocusRowByIndex) {
                                    focusController._focusRowByIndex()
                                }
                            } else {
                                if (!isVirtualScrolling && this.getRowIndexByKey(focusedRowKey) < 0) {
                                    this.option("focusedRowIndex", -1)
                                }
                            }
                        } else {
                            if (!pagingByRendering) {
                                focusController._focusRowByKeyOrIndex()
                            }
                        }
                    }
                },
                getPageIndexByKey: function(key) {
                    var that = this;
                    var d = new _deferred.Deferred;
                    that.getGlobalRowIndexByKey(key).done(function(globalIndex) {
                        d.resolve(globalIndex >= 0 ? Math.floor(globalIndex / that.pageSize()) : -1)
                    }).fail(d.reject);
                    return d.promise()
                },
                getGlobalRowIndexByKey: function(key) {
                    if (this._dataSource.group()) {
                        return this._calculateGlobalRowIndexByGroupedData(key)
                    }
                    return this._calculateGlobalRowIndexByFlatData(key)
                },
                _calculateGlobalRowIndexByFlatData: function(key, groupFilter, useGroup) {
                    var that = this;
                    var deferred = new _deferred.Deferred;
                    var dataSource = that._dataSource;
                    var filter = that._generateFilterByKey(key);
                    dataSource.load({
                        filter: that._concatWithCombinedFilter(filter),
                        skip: 0,
                        take: 1
                    }).done(function(data) {
                        if (data.length > 0) {
                            filter = that._generateOperationFilterByKey(key, data[0], useGroup);
                            dataSource.load({
                                filter: that._concatWithCombinedFilter(filter, groupFilter),
                                skip: 0,
                                take: 1,
                                requireTotalCount: true
                            }).done(function(_, extra) {
                                deferred.resolve(extra.totalCount)
                            })
                        } else {
                            deferred.resolve(-1)
                        }
                    });
                    return deferred.promise()
                },
                _concatWithCombinedFilter: function(filter, groupFilter) {
                    var combinedFilter = this.getCombinedFilter();
                    return (0, _uiGrid_core3.combineFilters)([filter, combinedFilter, groupFilter])
                },
                _generateBooleanFilter: function(selector, value, sortInfo) {
                    var result;
                    if (false === value) {
                        result = [selector, "=", sortInfo.desc ? true : null]
                    } else {
                        if (true === value ? !sortInfo.desc : sortInfo.desc) {
                            result = [selector, "<>", value]
                        }
                    }
                    return result
                },
                _generateOperationFilterByKey: function(key, rowData, useGroup) {
                    var that = this;
                    var booleanFilter;
                    var dataSource = that._dataSource;
                    var filter = that._generateFilterByKey(key, "<");
                    var sort = that._columnsController.getSortDataSourceParameters(!dataSource.remoteOperations().filtering, true);
                    if (useGroup) {
                        var group = that._columnsController.getGroupDataSourceParameters(!dataSource.remoteOperations().filtering);
                        if (group) {
                            sort = sort ? group.concat(sort) : group
                        }
                    }
                    if (sort) {
                        sort.slice().reverse().forEach(function(sortInfo) {
                            var selector = sortInfo.selector;
                            var getter;
                            if ("function" === typeof selector) {
                                getter = selector
                            } else {
                                getter = that._columnsController.columnOption(selector, "selector")
                            }
                            var value = getter ? getter(rowData) : rowData[selector];
                            filter = [
                                [selector, "=", value], "and", filter
                            ];
                            if (null === value || (0, _type.isBoolean)(value)) {
                                booleanFilter = that._generateBooleanFilter(selector, value, sortInfo);
                                if (booleanFilter) {
                                    filter = [booleanFilter, "or", filter]
                                }
                            } else {
                                filter = [
                                    [selector, sortInfo.desc ? ">" : "<", value], "or", filter
                                ]
                            }
                        })
                    }
                    return filter
                },
                _generateFilterByKey: function(key, operation) {
                    var dataSourceKey = this._dataSource.key();
                    var filter = [];
                    var keyPart;
                    if (!operation) {
                        operation = "="
                    }
                    if (Array.isArray(dataSourceKey)) {
                        for (var i = 0; i < dataSourceKey.length; ++i) {
                            keyPart = key[dataSourceKey[i]];
                            if (keyPart) {
                                if (filter.length > 0) {
                                    filter.push("and")
                                }
                                filter.push([dataSourceKey[i], operation, keyPart])
                            }
                        }
                    } else {
                        filter = [dataSourceKey, operation, key]
                    }
                    return filter
                },
                _getLastItemIndex: function() {
                    return this.items(true).length - 1
                }
            }
        },
        views: {
            rowsView: {
                _createRow: function(row) {
                    var $row = this.callBase(row);
                    if (this.option("focusedRowEnabled") && row) {
                        if (this.getController("focus").isRowFocused(row.key)) {
                            $row.addClass(ROW_FOCUSED_CLASS)
                        }
                    }
                    return $row
                },
                _checkRowKeys: function(options) {
                    this.callBase.apply(this, arguments);
                    if (this.option("focusedRowEnabled") && this.option("dataSource")) {
                        var store = this._dataController.store();
                        if (store && !store.key()) {
                            this._dataController.fireError("E1042", "Row focusing")
                        }
                    }
                },
                _update: function(change) {
                    if ("updateFocusedRow" === change.changeType) {
                        if (this.option("focusedRowEnabled")) {
                            this.getController("focus").updateFocusedRow(change)
                        }
                    } else {
                        this.callBase(change)
                    }
                },
                updateFocusElementTabIndex: function($cellElements) {
                    if (this.option("focusedRowEnabled")) {
                        this._setFocusedRowElementTabIndex()
                    } else {
                        this.callBase($cellElements)
                    }
                },
                _setFocusedRowElementTabIndex: function() {
                    var that = this;
                    var focusedRowKey = that.option("focusedRowKey");
                    var tabIndex = that.option("tabIndex") || 0;
                    var rowIndex = that._dataController.getRowIndexByKey(focusedRowKey);
                    var columnIndex = that.option("focusedColumnIndex");
                    var $row = that._findRowElementForTabIndex();
                    that._scrollToFocusOnResize = that._scrollToFocusOnResize || function() {
                        that.scrollToElementVertically(that._findRowElementForTabIndex());
                        that.resizeCompleted.remove(that._scrollToFocusOnResize)
                    };
                    $row.attr("tabIndex", tabIndex);
                    if (rowIndex >= 0) {
                        if (columnIndex < 0) {
                            columnIndex = 0
                        }
                        rowIndex += that.getController("data").getRowIndexOffset();
                        that.getController("keyboardNavigation").setFocusedCellPosition(rowIndex, columnIndex);
                        var dataSource = that.component.getController("data")._dataSource;
                        var operationTypes = dataSource && dataSource.operationTypes();
                        if (operationTypes && !operationTypes.paging) {
                            that.resizeCompleted.remove(that._scrollToFocusOnResize);
                            that.resizeCompleted.add(that._scrollToFocusOnResize)
                        }
                    }
                },
                _findRowElementForTabIndex: function() {
                    var focusedRowKey = this.option("focusedRowKey");
                    var rowIndex = this._dataController.getRowIndexByKey(focusedRowKey);
                    return (0, _renderer2.default)(this.getRowElement(rowIndex >= 0 ? rowIndex : 0))
                },
                scrollToRowElement: function(key) {
                    var rowIndex = this.getController("data").getRowIndexByKey(key);
                    var $row = (0, _renderer2.default)(this.getRow(rowIndex));
                    this.scrollToElementVertically($row)
                },
                scrollToElementVertically: function($row) {
                    var scrollable = this.getScrollable();
                    if (scrollable) {
                        var position = scrollable.getScrollElementPosition($row, "vertical");
                        scrollable.scrollTo({
                            top: position
                        })
                    }
                }
            }
        }
    }
};
