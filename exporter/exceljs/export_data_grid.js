/**
 * DevExtreme (exporter/exceljs/export_data_grid.js)
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
exports._getFullOptions = exports.MAX_EXCEL_COLUMN_WIDTH = exports.exportDataGrid = void 0;
var _type = require("../../core/utils/type");
var _excel_format_converter = require("../excel_format_converter");
var _excel_format_converter2 = _interopRequireDefault(_excel_format_converter);
var _message = require("../../localization/message");
var _message2 = _interopRequireDefault(_message);
var _extend = require("../../core/utils/extend");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var MAX_DIGIT_WIDTH_IN_PIXELS = 7;
var MAX_EXCEL_COLUMN_WIDTH = 255;

function exportDataGrid(options) {
    if (!(0, _type.isDefined)(options)) {
        return
    }
    var _getFullOptions2 = _getFullOptions(options),
        customizeCell = _getFullOptions2.customizeCell,
        component = _getFullOptions2.component,
        worksheet = _getFullOptions2.worksheet,
        topLeftCell = _getFullOptions2.topLeftCell,
        autoFilterEnabled = _getFullOptions2.autoFilterEnabled,
        keepColumnWidths = _getFullOptions2.keepColumnWidths,
        selectedRowsOnly = _getFullOptions2.selectedRowsOnly,
        loadPanel = _getFullOptions2.loadPanel;
    var initialLoadPanelOptions = (0, _extend.extend)({}, component.option("loadPanel"));
    if ("animation" in component.option("loadPanel")) {
        loadPanel.animation = null
    }
    component.option("loadPanel", loadPanel);
    var wrapText = !!component.option("wordWrapEnabled");
    worksheet.properties.outlineProperties = {
        summaryBelow: false,
        summaryRight: false
    };
    var cellRange = {
        from: {
            row: topLeftCell.row,
            column: topLeftCell.column
        },
        to: {
            row: topLeftCell.row,
            column: topLeftCell.column
        }
    };
    var dataProvider = component.getDataProvider(selectedRowsOnly);
    return new Promise(function(resolve) {
        dataProvider.ready().done(function() {
            var columns = dataProvider.getColumns();
            var headerRowCount = dataProvider.getHeaderRowCount();
            var dataRowsCount = dataProvider.getRowsCount();
            if (keepColumnWidths) {
                _setColumnsWidth(worksheet, columns, cellRange.from.column)
            }
            var mergedCells = [];
            var mergeRanges = [];
            for (var rowIndex = 0; rowIndex < dataRowsCount; rowIndex++) {
                var row = worksheet.getRow(cellRange.from.row + rowIndex);
                _exportRow(rowIndex, columns.length, row, cellRange.from.column, dataProvider, customizeCell, headerRowCount, mergedCells, mergeRanges, wrapText);
                if (rowIndex >= headerRowCount) {
                    row.outlineLevel = dataProvider.getGroupLevel(rowIndex)
                }
                if (rowIndex >= 1) {
                    cellRange.to.row++
                }
            }
            _mergeCells(worksheet, topLeftCell, mergeRanges);
            cellRange.to.column += columns.length > 0 ? columns.length - 1 : 0;
            var worksheetViewSettings = worksheet.views[0] || {};
            if (component.option("rtlEnabled")) {
                worksheetViewSettings.rightToLeft = true
            }
            if (headerRowCount > 0) {
                if (Object.keys(worksheetViewSettings).indexOf("state") === -1) {
                    (0, _extend.extend)(worksheetViewSettings, {
                        state: "frozen",
                        ySplit: cellRange.from.row + dataProvider.getFrozenArea().y - 1
                    })
                }
                _setAutoFilter(dataProvider, worksheet, component, cellRange, autoFilterEnabled)
            }
            if (Object.keys(worksheetViewSettings).length > 0) {
                worksheet.views = [worksheetViewSettings]
            }
            resolve(cellRange)
        }).always(function() {
            component.option("loadPanel", initialLoadPanelOptions)
        })
    })
}

function _getFullOptions(options) {
    var fullOptions = (0, _extend.extend)({}, options);
    if (!(0, _type.isDefined)(fullOptions.topLeftCell)) {
        fullOptions.topLeftCell = {
            row: 1,
            column: 1
        }
    } else {
        if ((0, _type.isString)(fullOptions.topLeftCell)) {
            var _fullOptions$workshee = fullOptions.worksheet.getCell(fullOptions.topLeftCell),
                row = _fullOptions$workshee.row,
                col = _fullOptions$workshee.col;
            fullOptions.topLeftCell = {
                row: row,
                column: col
            }
        }
    }
    if (!(0, _type.isDefined)(fullOptions.keepColumnWidths)) {
        fullOptions.keepColumnWidths = true
    }
    if (!(0, _type.isDefined)(fullOptions.selectedRowsOnly)) {
        fullOptions.selectedRowsOnly = false
    }
    if (!(0, _type.isDefined)(fullOptions.loadPanel)) {
        fullOptions.loadPanel = {}
    }
    if (!(0, _type.isDefined)(fullOptions.loadPanel.enabled)) {
        fullOptions.loadPanel.enabled = true
    }
    if (!(0, _type.isDefined)(fullOptions.loadPanel.text)) {
        fullOptions.loadPanel.text = _message2.default.format("dxDataGrid-exporting")
    }
    if (!(0, _type.isDefined)(fullOptions.autoFilterEnabled)) {
        fullOptions.autoFilterEnabled = false
    }
    return fullOptions
}

function _exportRow(rowIndex, cellCount, row, startColumnIndex, dataProvider, customizeCell, headerRowCount, mergedCells, mergeRanges, wrapText) {
    var styles = dataProvider.getStyles();
    for (var cellIndex = 0; cellIndex < cellCount; cellIndex++) {
        var cellData = dataProvider.getCellData(rowIndex, cellIndex, true);
        var gridCell = cellData.cellSourceData;
        var excelCell = row.getCell(startColumnIndex + cellIndex);
        excelCell.value = cellData.value;
        if ((0, _type.isDefined)(excelCell.value)) {
            var _styles$dataProvider$ = styles[dataProvider.getStyleId(rowIndex, cellIndex)],
                bold = _styles$dataProvider$.bold,
                horizontalAlignment = _styles$dataProvider$.alignment,
                format = _styles$dataProvider$.format,
                dataType = _styles$dataProvider$.dataType;
            var numberFormat = _tryConvertToExcelNumberFormat(format, dataType);
            if ((0, _type.isDefined)(numberFormat)) {
                numberFormat = numberFormat.replace(/&quot;/g, "")
            } else {
                if ((0, _type.isString)(excelCell.value) && /^[@=+-]/.test(excelCell.value)) {
                    numberFormat = "@"
                }
            }
            _setNumberFormat(excelCell, numberFormat);
            _setFont(excelCell, bold);
            _setAlignment(excelCell, wrapText, horizontalAlignment)
        }
        if ((0, _type.isDefined)(customizeCell)) {
            customizeCell({
                cell: excelCell,
                excelCell: excelCell,
                gridCell: gridCell
            })
        }
        if (rowIndex < headerRowCount) {
            var mergeRange = _tryGetMergeRange(rowIndex, cellIndex, mergedCells, dataProvider);
            if ((0, _type.isDefined)(mergeRange)) {
                mergeRanges.push(mergeRange)
            }
        }
    }
}

function _setAutoFilter(dataProvider, worksheet, component, cellRange, autoFilterEnabled) {
    if (autoFilterEnabled) {
        if (!(0, _type.isDefined)(worksheet.autoFilter) && dataProvider.getRowsCount() > 0) {
            worksheet.autoFilter = cellRange
        }
    }
}

function _setNumberFormat(excelCell, numberFormat) {
    excelCell.numFmt = numberFormat
}

function _tryConvertToExcelNumberFormat(format, dataType) {
    var newFormat = _formatObjectConverter(format, dataType);
    var currency = newFormat.currency;
    format = newFormat.format;
    dataType = newFormat.dataType;
    return _excel_format_converter2.default.convertFormat(format, newFormat.precision, dataType, currency)
}

function _formatObjectConverter(format, dataType) {
    var result = {
        format: format,
        precision: format && format.precision,
        dataType: dataType
    };
    if ((0, _type.isObject)(format)) {
        return (0, _extend.extend)(result, format, {
            format: format.formatter || format.type,
            currency: format.currency
        })
    }
    return result
}

function _setFont(excelCell, bold) {
    if ((0, _type.isDefined)(bold)) {
        excelCell.font = excelCell.font || {};
        excelCell.font.bold = bold
    }
}

function _setAlignment(excelCell, wrapText, horizontalAlignment) {
    excelCell.alignment = excelCell.alignment || {};
    if ((0, _type.isDefined)(wrapText)) {
        excelCell.alignment.wrapText = wrapText
    }
    if ((0, _type.isDefined)(horizontalAlignment)) {
        excelCell.alignment.horizontal = horizontalAlignment
    }
    excelCell.alignment.vertical = "top"
}

function _setColumnsWidth(worksheet, columns, startColumnIndex) {
    if (!(0, _type.isDefined)(columns)) {
        return
    }
    for (var i = 0; i < columns.length; i++) {
        var columnWidth = columns[i].width;
        if ("number" === typeof columnWidth && isFinite(columnWidth)) {
            worksheet.getColumn(startColumnIndex + i).width = Math.min(MAX_EXCEL_COLUMN_WIDTH, Math.floor(columnWidth / MAX_DIGIT_WIDTH_IN_PIXELS * 100) / 100)
        }
    }
}

function _tryGetMergeRange(rowIndex, cellIndex, mergedCells, dataProvider) {
    if (!mergedCells[rowIndex] || !mergedCells[rowIndex][cellIndex]) {
        var cellMerge = dataProvider.getCellMerging(rowIndex, cellIndex);
        if (cellMerge.colspan || cellMerge.rowspan) {
            for (var i = rowIndex; i <= rowIndex + cellMerge.rowspan || 0; i++) {
                for (var j = cellIndex; j <= cellIndex + cellMerge.colspan || 0; j++) {
                    if (!mergedCells[i]) {
                        mergedCells[i] = []
                    }
                    mergedCells[i][j] = true
                }
            }
            return {
                start: {
                    row: rowIndex,
                    column: cellIndex
                },
                end: {
                    row: rowIndex + (cellMerge.rowspan || 0),
                    column: cellIndex + (cellMerge.colspan || 0)
                }
            }
        }
    }
}

function _mergeCells(worksheet, topLeftCell, mergeRanges) {
    mergeRanges.forEach(function(mergeRange) {
        worksheet.mergeCells(mergeRange.start.row + topLeftCell.row, mergeRange.start.column + topLeftCell.column, mergeRange.end.row + topLeftCell.row, mergeRange.end.column + topLeftCell.column)
    })
}
exports.exportDataGrid = exportDataGrid;
exports.MAX_EXCEL_COLUMN_WIDTH = MAX_EXCEL_COLUMN_WIDTH;
exports._getFullOptions = _getFullOptions;
