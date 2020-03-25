/**
 * DevExtreme (ui/grid_core/ui.grid_core.state_storing.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _common = require("../../core/utils/common");
var _type = require("../../core/utils/type");
var _extend = require("../../core/utils/extend");
var _uiGrid_core = require("./ui.grid_core.state_storing_core");
var _uiGrid_core2 = _interopRequireDefault(_uiGrid_core);
var _deferred = require("../../core/utils/deferred");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var getDataState = function(that) {
    var pagerView = that.getView("pagerView");
    var dataController = that.getController("data");
    var state = {
        allowedPageSizes: pagerView ? pagerView.getPageSizes() : void 0,
        filterPanel: {
            filterEnabled: that.option("filterPanel.filterEnabled")
        },
        filterValue: that.option("filterValue"),
        focusedRowKey: that.option("focusedRowEnabled") ? that.option("focusedRowKey") : void 0
    };
    return (0, _extend.extend)(state, dataController.getUserState())
};
var processLoadState = function(that) {
    var columnsController = that.getController("columns");
    var selectionController = that.getController("selection");
    var exportController = that.getController("export");
    var dataController = that.getController("data");
    if (columnsController) {
        columnsController.columnsChanged.add(function() {
            that.updateState({
                columns: columnsController.getUserState()
            })
        })
    }
    if (selectionController) {
        selectionController.selectionChanged.add(function(e) {
            that.updateState({
                selectedRowKeys: e.selectedRowKeys,
                selectionFilter: e.selectionFilter
            })
        })
    }
    if (dataController) {
        that._initialPageSize = that.option("paging.pageSize");
        that._initialFilterValue = that.option("filterValue");
        dataController.changed.add(function() {
            var state = getDataState(that);
            that.updateState(state)
        })
    }
    if (exportController) {
        exportController.selectionOnlyChanged.add(function() {
            that.updateState({
                exportSelectionOnly: exportController.selectionOnly()
            })
        })
    }
};
var DEFAULT_FILTER_VALUE = null;
var getFilterValue = function(that, state) {
    var filterSyncController = that.getController("filterSync");
    var columnsController = that.getController("columns");
    var hasFilterState = state.columns || void 0 !== state.filterValue;
    if (filterSyncController) {
        if (hasFilterState) {
            return state.filterValue || filterSyncController.getFilterValueFromColumns(state.columns)
        } else {
            return that._initialFilterValue || filterSyncController.getFilterValueFromColumns(columnsController.getColumns())
        }
    }
    return DEFAULT_FILTER_VALUE
};
module.exports = {
    defaultOptions: function() {
        return {
            stateStoring: {
                enabled: false,
                storageKey: null,
                type: "localStorage",
                customLoad: null,
                customSave: null,
                savingTimeout: 2e3
            }
        }
    },
    controllers: {
        stateStoring: _uiGrid_core2.default.StateStoringController
    },
    extenders: {
        views: {
            rowsView: {
                init: function() {
                    var that = this;
                    var dataController = that.getController("data");
                    that.callBase();
                    dataController.stateLoaded.add(function() {
                        if (dataController.isLoaded() && !dataController.getDataSource()) {
                            that.setLoading(false);
                            that.renderNoDataText();
                            var columnHeadersView = that.component.getView("columnHeadersView");
                            columnHeadersView && columnHeadersView.render();
                            that.component._fireContentReadyAction()
                        }
                    })
                }
            }
        },
        controllers: {
            stateStoring: {
                init: function() {
                    this.callBase.apply(this, arguments);
                    processLoadState(this)
                },
                isLoading: function() {
                    return this.callBase() || this.getController("data").isStateLoading()
                },
                state: function(_state) {
                    var result = this.callBase.apply(this, arguments);
                    if (void 0 !== _state) {
                        this.applyState((0, _extend.extend)({}, _state))
                    }
                    return result
                },
                updateState: function(state) {
                    if (this.isEnabled()) {
                        var oldState = this.state();
                        var newState = (0, _extend.extend)({}, oldState, state);
                        var oldStateHash = (0, _common.getKeyHash)(oldState);
                        var newStateHash = (0, _common.getKeyHash)(newState);
                        if (!(0, _common.equalByValue)(oldStateHash, newStateHash)) {
                            (0, _extend.extend)(this._state, state);
                            this.save()
                        }
                    } else {
                        (0, _extend.extend)(this._state, state)
                    }
                },
                applyState: function(state) {
                    var that = this;
                    var allowedPageSizes = state.allowedPageSizes;
                    var searchText = state.searchText;
                    var selectedRowKeys = state.selectedRowKeys;
                    var selectionFilter = state.selectionFilter;
                    var exportController = that.getController("export");
                    var columnsController = that.getController("columns");
                    var dataController = that.getController("data");
                    var scrollingMode = that.option("scrolling.mode");
                    var isVirtualScrollingMode = "virtual" === scrollingMode || "infinite" === scrollingMode;
                    var showPageSizeSelector = true === that.option("pager.visible") && that.option("pager.showPageSizeSelector");
                    that.component.beginUpdate();
                    if (columnsController) {
                        columnsController.setUserState(state.columns)
                    }
                    if (exportController) {
                        exportController.selectionOnly(state.exportSelectionOnly)
                    }
                    if (selectedRowKeys) {
                        that.option("selectedRowKeys", selectedRowKeys)
                    }
                    that.option("selectionFilter", selectionFilter);
                    if (allowedPageSizes && "auto" === that.option("pager.allowedPageSizes")) {
                        that.option("pager").allowedPageSizes = allowedPageSizes
                    }
                    if (that.option("focusedRowEnabled")) {
                        that.option("focusedRowKey", state.focusedRowKey)
                    }
                    that.component.endUpdate();
                    that.option("searchPanel.text", searchText || "");
                    that.option("filterValue", getFilterValue(that, state));
                    that.option("filterPanel.filterEnabled", state.filterPanel ? state.filterPanel.filterEnabled : true);
                    that.option("paging.pageSize", (!isVirtualScrollingMode || showPageSizeSelector) && (0, _type.isDefined)(state.pageSize) ? state.pageSize : that._initialPageSize);
                    that.option("paging.pageIndex", state.pageIndex || 0);
                    dataController && dataController.reset()
                }
            },
            columns: {
                getVisibleColumns: function() {
                    var visibleColumns = this.callBase.apply(this, arguments);
                    var stateStoringController = this.getController("stateStoring");
                    return stateStoringController.isEnabled() && !stateStoringController.isLoaded() ? [] : visibleColumns
                }
            },
            data: {
                callbackNames: function() {
                    return this.callBase().concat(["stateLoaded"])
                },
                _refreshDataSource: function() {
                    var that = this;
                    var callBase = that.callBase;
                    var stateStoringController = that.getController("stateStoring");
                    if (stateStoringController.isEnabled() && !stateStoringController.isLoaded()) {
                        clearTimeout(that._restoreStateTimeoutID);
                        var deferred = new _deferred.Deferred;
                        that._restoreStateTimeoutID = setTimeout(function() {
                            stateStoringController.load().always(function() {
                                that._restoreStateTimeoutID = null;
                                callBase.call(that);
                                that.stateLoaded.fire();
                                deferred.resolve()
                            })
                        });
                        return deferred.promise()
                    } else {
                        if (!that.isStateLoading()) {
                            callBase.call(that)
                        }
                    }
                },
                isLoading: function() {
                    var that = this;
                    var stateStoringController = that.getController("stateStoring");
                    return this.callBase() || stateStoringController.isLoading()
                },
                isStateLoading: function() {
                    return (0, _type.isDefined)(this._restoreStateTimeoutID)
                },
                isLoaded: function() {
                    return this.callBase() && !this.isStateLoading()
                },
                dispose: function() {
                    clearTimeout(this._restoreStateTimeoutID);
                    this.callBase()
                }
            }
        }
    }
};
