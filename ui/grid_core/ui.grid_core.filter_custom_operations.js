/**
 * DevExtreme (ui/grid_core/ui.grid_core.filter_custom_operations.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _filter_builder = require("../filter_builder/filter_builder");
var $ = require("../../core/renderer");
var messageLocalization = require("../../localization/message");
var extend = require("../../core/utils/extend").extend;
var DataSource = require("../../data/data_source/data_source").DataSource;
var deferredUtils = require("../../core/utils/deferred");
var utils = require("../filter_builder/utils");

function baseOperation(grid) {
    var calculateFilterExpression = function(filterValue, field) {
        var result = [];
        var lastIndex = filterValue.length - 1;
        filterValue && filterValue.forEach(function(value, index) {
            if (utils.isCondition(value) || utils.isGroup(value)) {
                var filterExpression = utils.getFilterExpression(value, [field], [], "headerFilter");
                result.push(filterExpression)
            } else {
                result.push(utils.getFilterExpression([field.dataField, "=", value], [field], [], "headerFilter"))
            }
            index !== lastIndex && result.push("or")
        });
        if (1 === result.length) {
            result = result[0]
        }
        return result
    };
    var getFullText = function(itemText, parentText) {
        return parentText ? parentText + "/" + itemText : itemText
    };
    var getSelectedItemsTexts = function getSelectedItemsTexts(items, parentText) {
        var result = [];
        items.forEach(function(item) {
            if (item.items) {
                var selectedItemsTexts = getSelectedItemsTexts(item.items, getFullText(item.text, parentText));
                result = result.concat(selectedItemsTexts)
            }
            item.selected && result.push(getFullText(item.text, parentText))
        });
        return result
    };
    var headerFilterController = grid && grid.getController("headerFilter");
    var customizeText = function(fieldInfo) {
        var value = fieldInfo.value;
        var column = grid.columnOption(fieldInfo.field.dataField);
        var headerFilter = column && column.headerFilter;
        var lookup = column && column.lookup;
        if (headerFilter && headerFilter.dataSource || lookup && lookup.dataSource) {
            column = extend({}, column, {
                filterType: "include",
                filterValues: [value]
            });
            var dataSourceOptions = headerFilterController.getDataSource(column);
            dataSourceOptions.paginate = false;
            var headerFilterDataSource = headerFilter && headerFilter.dataSource;
            if (!headerFilterDataSource && lookup.items) {
                dataSourceOptions.store = lookup.items
            }
            var dataSource = new DataSource(dataSourceOptions);
            var result = new deferredUtils.Deferred;
            dataSource.load().done(function(items) {
                result.resolve(getSelectedItemsTexts(items)[0])
            });
            return result
        } else {
            var text = headerFilterController.getHeaderItemText(value, column, 0, grid.option("headerFilter"));
            return text
        }
    };
    return {
        dataTypes: ["string", "date", "datetime", "number", "boolean", "object"],
        calculateFilterExpression: calculateFilterExpression,
        editorTemplate: function(conditionInfo, container) {
            var div = $("<div>").addClass("dx-filterbuilder-item-value-text").appendTo(container);
            var column = extend(true, {}, grid.columnOption(conditionInfo.field.dataField));
            (0, _filter_builder.renderValueText)(div, conditionInfo.text && conditionInfo.text.split("|"));
            var setValue = function(value) {
                conditionInfo.setValue(value)
            };
            column.filterType = "include";
            column.filterValues = conditionInfo.value ? conditionInfo.value.slice() : [];
            headerFilterController.showHeaderFilterMenuBase({
                columnElement: div,
                column: column,
                apply: function() {
                    setValue(this.filterValues);
                    headerFilterController.hideHeaderFilterMenu();
                    conditionInfo.closeEditor()
                },
                onHidden: function() {
                    conditionInfo.closeEditor()
                },
                isFilterBuilder: true
            });
            return container
        },
        customizeText: customizeText
    }
}

function anyOf(grid) {
    return extend(baseOperation(grid), {
        name: "anyof",
        icon: "selectall",
        caption: messageLocalization.format("dxFilterBuilder-filterOperationAnyOf")
    })
}

function noneOf(grid) {
    var baseOp = baseOperation(grid);
    return extend({}, baseOp, {
        calculateFilterExpression: function(filterValue, field) {
            var baseFilter = baseOp.calculateFilterExpression(filterValue, field);
            if (!baseFilter || 0 === baseFilter.length) {
                return null
            }
            return "!" === baseFilter[0] ? baseFilter : ["!", baseFilter]
        },
        name: "noneof",
        icon: "unselectall",
        caption: messageLocalization.format("dxFilterBuilder-filterOperationNoneOf")
    })
}
exports.anyOf = anyOf;
exports.noneOf = noneOf;
