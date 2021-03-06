/**
 * DevExtreme (ui/diagram/diagram.commands_manager.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _diagram = require("./diagram.importer");
var _file_saver = require("../../exporter/file_saver");
var _type = require("../../core/utils/type");
var _window = require("../../core/utils/window");
var _extend = require("../../core/utils/extend");
var _message = require("../../localization/message");
var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var SEPARATOR = "separator";
var SEPARATOR_COMMAND = {
    widget: SEPARATOR
};
var CSS_CLASSES = {
    SMALL_EDITOR_ITEM: "dx-diagram-sm-edit-item",
    MEDIUM_EDITOR_ITEM: "dx-diagram-md-edit-item",
    LARGE_EDITOR_ITEM: "dx-diagram-lg-edit-item",
    IMAGE_DROPDOWN_ITEM: "dx-diagram-image-dropdown-item",
    COLOR_EDITOR_ITEM: "dx-diagram-color-edit-item",
    LARGE_ICON_ITEM: "dx-diagram-lg-icon-item"
};
var DiagramCommandsManager = {
    SHOW_TOOLBOX_COMMAND_NAME: "toolbox",
    SHOW_PROPERTIES_PANEL_COMMAND_NAME: "propertiesPanel",
    getAllCommands: function() {
        var _this = this;
        var _getDiagram = (0, _diagram.getDiagram)(),
            DiagramCommand = _getDiagram.DiagramCommand;
        return this._allCommands || (this._allCommands = {
            separator: SEPARATOR_COMMAND,
            exportSvg: {
                command: DiagramCommand.ExportSvg,
                text: _message2.default.format("dxDiagram-commandExportToSvg"),
                getParameter: function(widget) {
                    return function(dataURI) {
                        return _this._exportTo(widget, dataURI, "SVG", "image/svg+xml")
                    }
                }
            },
            exportPng: {
                command: DiagramCommand.ExportPng,
                text: _message2.default.format("dxDiagram-commandExportToPng"),
                getParameter: function(widget) {
                    return function(dataURI) {
                        return _this._exportTo(widget, dataURI, "PNG", "image/png")
                    }
                }
            },
            exportJpg: {
                command: DiagramCommand.ExportJpg,
                text: _message2.default.format("dxDiagram-commandExportToJpg"),
                getParameter: function(widget) {
                    return function(dataURI) {
                        return _this._exportTo(widget, dataURI, "JPEG", "image/jpeg")
                    }
                }
            },
            undo: {
                command: DiagramCommand.Undo,
                hint: _message2.default.format("dxDiagram-commandUndo"),
                text: _message2.default.format("dxDiagram-commandUndo"),
                icon: "undo",
                menuIcon: "undo"
            },
            redo: {
                command: DiagramCommand.Redo,
                hint: _message2.default.format("dxDiagram-commandRedo"),
                text: _message2.default.format("dxDiagram-commandRedo"),
                icon: "redo",
                menuIcon: "redo"
            },
            cut: {
                command: DiagramCommand.Cut,
                hint: _message2.default.format("dxDiagram-commandCut"),
                text: _message2.default.format("dxDiagram-commandCut"),
                icon: "cut",
                menuIcon: "cut"
            },
            copy: {
                command: DiagramCommand.Copy,
                hint: _message2.default.format("dxDiagram-commandCopy"),
                text: _message2.default.format("dxDiagram-commandCopy"),
                icon: "copy",
                menuIcon: "copy"
            },
            paste: {
                command: DiagramCommand.PasteInPosition,
                hint: _message2.default.format("dxDiagram-commandPaste"),
                text: _message2.default.format("dxDiagram-commandPaste"),
                icon: "paste",
                menuIcon: "paste",
                getParameter: function(diagramContextMenu) {
                    return diagramContextMenu.clickPosition
                }
            },
            selectAll: {
                command: DiagramCommand.SelectAll,
                hint: _message2.default.format("dxDiagram-commandSelectAll"),
                text: _message2.default.format("dxDiagram-commandSelectAll"),
                icon: "dx-diagram-i-button-select-all dx-diagram-i",
                menuIcon: "dx-diagram-i-menu-select-all dx-diagram-i"
            },
            "delete": {
                command: DiagramCommand.Delete,
                hint: _message2.default.format("dxDiagram-commandDelete"),
                text: _message2.default.format("dxDiagram-commandDelete"),
                icon: "remove",
                menuIcon: "remove"
            },
            fontName: {
                command: DiagramCommand.FontName,
                hint: _message2.default.format("dxDiagram-commandFontName"),
                text: _message2.default.format("dxDiagram-commandFontName"),
                widget: "dxSelectBox",
                items: ["Arial", "Arial Black", "Helvetica", "Times New Roman", "Courier New", "Courier", "Verdana", "Georgia", "Comic Sans MS", "Trebuchet MS"].map(function(item) {
                    return {
                        text: item,
                        value: item
                    }
                }),
                cssClass: CSS_CLASSES.MEDIUM_EDITOR_ITEM
            },
            fontSize: {
                command: DiagramCommand.FontSize,
                hint: _message2.default.format("dxDiagram-commandFontSize"),
                text: _message2.default.format("dxDiagram-commandFontSize"),
                widget: "dxSelectBox",
                items: [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72].map(function(item) {
                    return {
                        text: item + "pt",
                        value: item + "pt"
                    }
                }),
                cssClass: CSS_CLASSES.SMALL_EDITOR_ITEM
            },
            bold: {
                command: DiagramCommand.Bold,
                hint: _message2.default.format("dxDiagram-commandBold"),
                text: _message2.default.format("dxDiagram-commandBold"),
                icon: "bold",
                menuIcon: "bold"
            },
            italic: {
                command: DiagramCommand.Italic,
                hint: _message2.default.format("dxDiagram-commandItalic"),
                text: _message2.default.format("dxDiagram-commandItalic"),
                icon: "italic",
                menuIcon: "italic"
            },
            underline: {
                command: DiagramCommand.Underline,
                hint: _message2.default.format("dxDiagram-commandUnderline"),
                text: _message2.default.format("dxDiagram-commandUnderline"),
                icon: "underline",
                menuIcon: "underline"
            },
            fontColor: {
                command: DiagramCommand.FontColor,
                text: _message2.default.format("dxDiagram-commandTextColor"),
                hint: _message2.default.format("dxDiagram-commandTextColor"),
                widget: "dxColorBox",
                icon: "dx-icon dx-icon-color",
                menuIcon: "dx-icon dx-icon-color",
                cssClass: CSS_CLASSES.COLOR_EDITOR_ITEM
            },
            lineColor: {
                command: DiagramCommand.StrokeColor,
                text: _message2.default.format("dxDiagram-commandLineColor"),
                hint: _message2.default.format("dxDiagram-commandLineColor"),
                widget: "dxColorBox",
                icon: "dx-icon dx-icon-background",
                menuIcon: "dx-icon dx-icon-background",
                cssClass: CSS_CLASSES.COLOR_EDITOR_ITEM
            },
            lineWidth: {
                command: DiagramCommand.StrokeWidth,
                text: _message2.default.format("dxDiagram-commandLineWidth"),
                hint: _message2.default.format("dxDiagram-commandLineWidth"),
                widget: "dxSelectBox",
                items: [1, 2, 3, 4, 5, 6, 7, 8].map(function(item) {
                    return {
                        text: item + "px",
                        value: item.toString()
                    }
                }),
                cssClass: CSS_CLASSES.SMALL_EDITOR_ITEM
            },
            lineStyle: {
                command: DiagramCommand.StrokeStyle,
                text: _message2.default.format("dxDiagram-commandLineStyle"),
                hint: _message2.default.format("dxDiagram-commandLineStyle"),
                widget: "dxSelectBox",
                items: [{
                    value: "",
                    menuIcon: "dx-diagram-i-line-solid dx-diagram-i",
                    hint: _message2.default.format("dxDiagram-commandLineStyleSolid")
                }, {
                    value: "2,2",
                    menuIcon: "dx-diagram-i-line-dotted dx-diagram-i",
                    hint: _message2.default.format("dxDiagram-commandLineStyleDotted")
                }, {
                    value: "6,2",
                    menuIcon: "dx-diagram-i-line-dashed dx-diagram-i",
                    hint: _message2.default.format("dxDiagram-commandLineStyleDashed")
                }],
                cssClass: CSS_CLASSES.IMAGE_DROPDOWN_ITEM
            },
            fillColor: {
                command: DiagramCommand.FillColor,
                text: _message2.default.format("dxDiagram-commandFillColor"),
                hint: _message2.default.format("dxDiagram-commandFillColor"),
                widget: "dxColorBox",
                icon: "dx-diagram-i dx-diagram-i-button-fill",
                menuIcon: "dx-diagram-i dx-diagram-i-menu-fill",
                cssClass: CSS_CLASSES.COLOR_EDITOR_ITEM
            },
            textAlignLeft: {
                command: DiagramCommand.TextLeftAlign,
                hint: _message2.default.format("dxDiagram-commandAlignLeft"),
                text: _message2.default.format("dxDiagram-commandAlignLeft"),
                icon: "alignleft",
                menuIcon: "alignleft"
            },
            textAlignCenter: {
                command: DiagramCommand.TextCenterAlign,
                hint: _message2.default.format("dxDiagram-commandAlignCenter"),
                text: _message2.default.format("dxDiagram-commandAlignCenter"),
                icon: "aligncenter",
                menuIcon: "aligncenter"
            },
            textAlignRight: {
                command: DiagramCommand.TextRightAlign,
                hint: _message2.default.format("dxDiagram-commandAlignRight"),
                text: _message2.default.format("dxDiagram-commandAlignRight"),
                icon: "alignright",
                menu: "alignright"
            },
            lock: {
                command: DiagramCommand.Lock,
                hint: _message2.default.format("dxDiagram-commandLock"),
                text: _message2.default.format("dxDiagram-commandLock"),
                icon: "dx-diagram-i-button-lock dx-diagram-i",
                menuIcon: "dx-diagram-i-menu-lock dx-diagram-i"
            },
            unlock: {
                command: DiagramCommand.Unlock,
                hint: _message2.default.format("dxDiagram-commandUnlock"),
                text: _message2.default.format("dxDiagram-commandUnlock"),
                icon: "dx-diagram-i-button-unlock dx-diagram-i",
                menuIcon: "dx-diagram-i-menu-unlock dx-diagram-i"
            },
            bringToFront: {
                command: DiagramCommand.BringToFront,
                hint: _message2.default.format("dxDiagram-commandBringToFront"),
                text: _message2.default.format("dxDiagram-commandBringToFront"),
                icon: "dx-diagram-i-button-bring-to-front dx-diagram-i",
                menuIcon: "dx-diagram-i-menu-bring-to-front dx-diagram-i"
            },
            sendToBack: {
                command: DiagramCommand.SendToBack,
                hint: _message2.default.format("dxDiagram-commandSendToBack"),
                text: _message2.default.format("dxDiagram-commandSendToBack"),
                icon: "dx-diagram-i-button-send-to-back dx-diagram-i",
                menuIcon: "dx-diagram-i-menu-send-to-back dx-diagram-i"
            },
            insertShapeImage: {
                command: DiagramCommand.InsertShapeImage,
                text: _message2.default.format("dxDiagram-commandInsertShapeImage"),
                icon: "dx-diagram-i-button-image-insert dx-diagram-i",
                menuIcon: "dx-diagram-i-menu-image-insert dx-diagram-i"
            },
            editShapeImage: {
                command: DiagramCommand.EditShapeImage,
                text: _message2.default.format("dxDiagram-commandEditShapeImage"),
                icon: "dx-diagram-i-button-image-edit dx-diagram-i",
                menuIcon: "dx-diagram-i-menu-image-edit dx-diagram-i"
            },
            deleteShapeImage: {
                command: DiagramCommand.DeleteShapeImage,
                text: _message2.default.format("dxDiagram-commandDeleteShapeImage"),
                icon: "dx-diagram-i-button-image-delete dx-diagram-i",
                menuIcon: "dx-diagram-i-menu-image-delete dx-diagram-i"
            },
            connectorLineType: {
                command: DiagramCommand.ConnectorLineOption,
                widget: "dxSelectBox",
                hint: _message2.default.format("dxDiagram-commandConnectorLineType"),
                items: [{
                    value: 0,
                    menuIcon: "dx-diagram-i-connector-straight dx-diagram-i",
                    hint: _message2.default.format("dxDiagram-commandConnectorLineStraight")
                }, {
                    value: 1,
                    menuIcon: "dx-diagram-i-connector-orthogonal dx-diagram-i",
                    hint: _message2.default.format("dxDiagram-commandConnectorLineOrthogonal")
                }],
                cssClass: CSS_CLASSES.IMAGE_DROPDOWN_ITEM
            },
            connectorLineStart: {
                command: DiagramCommand.ConnectorStartLineEnding,
                widget: "dxSelectBox",
                items: [{
                    value: 0,
                    menuIcon: "dx-diagram-i-connector-begin-none dx-diagram-i",
                    hint: _message2.default.format("dxDiagram-commandConnectorLineNone")
                }, {
                    value: 1,
                    menuIcon: "dx-diagram-i-connector-begin-arrow dx-diagram-i",
                    hint: _message2.default.format("dxDiagram-commandConnectorLineArrow")
                }],
                hint: _message2.default.format("dxDiagram-commandConnectorLineStart"),
                cssClass: CSS_CLASSES.IMAGE_DROPDOWN_ITEM
            },
            connectorLineEnd: {
                command: DiagramCommand.ConnectorEndLineEnding,
                widget: "dxSelectBox",
                items: [{
                    value: 0,
                    menuIcon: "dx-diagram-i-connector-begin-none dx-diagram-i",
                    hint: _message2.default.format("dxDiagram-commandConnectorLineNone")
                }, {
                    value: 1,
                    menuIcon: "dx-diagram-i-connector-begin-arrow dx-diagram-i",
                    hint: _message2.default.format("dxDiagram-commandConnectorLineArrow")
                }],
                hint: _message2.default.format("dxDiagram-commandConnectorLineEnd"),
                cssClass: CSS_CLASSES.IMAGE_DROPDOWN_ITEM
            },
            layoutTreeTopToBottom: {
                command: DiagramCommand.AutoLayoutTreeVertical,
                text: _message2.default.format("dxDiagram-commandLayoutTopToBottom"),
                hint: _message2.default.format("dxDiagram-commandLayoutTopToBottom"),
                icon: "dx-diagram-i-button-layout-tree-tb dx-diagram-i",
                cssClass: CSS_CLASSES.LARGE_ICON_ITEM
            },
            layoutTreeBottomToTop: {
                command: DiagramCommand.AutoLayoutTreeVerticalBottomToTop,
                text: _message2.default.format("dxDiagram-commandLayoutBottomToTop"),
                hint: _message2.default.format("dxDiagram-commandLayoutBottomToTop"),
                icon: "dx-diagram-i-button-layout-tree-bt dx-diagram-i",
                cssClass: CSS_CLASSES.LARGE_ICON_ITEM
            },
            layoutTreeLeftToRight: {
                command: DiagramCommand.AutoLayoutTreeHorizontal,
                text: _message2.default.format("dxDiagram-commandLayoutLeftToRight"),
                hint: _message2.default.format("dxDiagram-commandLayoutLeftToRight"),
                icon: "dx-diagram-i-button-layout-tree-lr dx-diagram-i",
                cssClass: CSS_CLASSES.LARGE_ICON_ITEM
            },
            layoutTreeRightToLeft: {
                command: DiagramCommand.AutoLayoutTreeHorizontalRightToLeft,
                text: _message2.default.format("dxDiagram-commandLayoutRightToLeft"),
                hint: _message2.default.format("dxDiagram-commandLayoutRightToLeft"),
                icon: "dx-diagram-i-button-layout-tree-rl dx-diagram-i",
                cssClass: CSS_CLASSES.LARGE_ICON_ITEM
            },
            layoutLayeredTopToBottom: {
                command: DiagramCommand.AutoLayoutLayeredVertical,
                text: _message2.default.format("dxDiagram-commandLayoutTopToBottom"),
                hint: _message2.default.format("dxDiagram-commandLayoutTopToBottom"),
                icon: "dx-diagram-i-button-layout-layered-tb dx-diagram-i",
                cssClass: CSS_CLASSES.LARGE_ICON_ITEM
            },
            layoutLayeredBottomToTop: {
                command: DiagramCommand.AutoLayoutLayeredVerticalBottomToTop,
                text: _message2.default.format("dxDiagram-commandLayoutBottomToTop"),
                hint: _message2.default.format("dxDiagram-commandLayoutBottomToTop"),
                icon: "dx-diagram-i-button-layout-layered-bt dx-diagram-i",
                cssClass: CSS_CLASSES.LARGE_ICON_ITEM
            },
            layoutLayeredLeftToRight: {
                command: DiagramCommand.AutoLayoutLayeredHorizontal,
                text: _message2.default.format("dxDiagram-commandLayoutLeftToRight"),
                hint: _message2.default.format("dxDiagram-commandLayoutLeftToRight"),
                icon: "dx-diagram-i-button-layout-layered-lr dx-diagram-i",
                cssClass: CSS_CLASSES.LARGE_ICON_ITEM
            },
            layoutLayeredRightToLeft: {
                command: DiagramCommand.AutoLayoutLayeredHorizontalRightToLeft,
                text: _message2.default.format("dxDiagram-commandLayoutRightToLeft"),
                hint: _message2.default.format("dxDiagram-commandLayoutRightToLeft"),
                icon: "dx-diagram-i-button-layout-layered-rl dx-diagram-i",
                cssClass: CSS_CLASSES.LARGE_ICON_ITEM
            },
            fullScreen: {
                command: DiagramCommand.Fullscreen,
                hint: _message2.default.format("dxDiagram-commandFullscreen"),
                text: _message2.default.format("dxDiagram-commandFullscreen"),
                icon: "dx-diagram-i dx-diagram-i-button-fullscreen",
                menuIcon: "dx-diagram-i dx-diagram-i-menu-fullscreen",
                cssClass: CSS_CLASSES.COLOR_EDITOR_ITEM
            },
            units: {
                command: DiagramCommand.ViewUnits,
                hint: _message2.default.format("dxDiagram-commandUnits"),
                text: _message2.default.format("dxDiagram-commandUnits"),
                widget: "dxSelectBox"
            },
            simpleView: {
                command: DiagramCommand.ToggleSimpleView,
                hint: _message2.default.format("dxDiagram-commandSimpleView"),
                text: _message2.default.format("dxDiagram-commandSimpleView"),
                widget: "dxCheckBox"
            },
            showGrid: {
                command: DiagramCommand.ShowGrid,
                hint: _message2.default.format("dxDiagram-commandShowGrid"),
                text: _message2.default.format("dxDiagram-commandShowGrid"),
                widget: "dxCheckBox"
            },
            snapToGrid: {
                command: DiagramCommand.SnapToGrid,
                hint: _message2.default.format("dxDiagram-commandSnapToGrid"),
                text: _message2.default.format("dxDiagram-commandSnapToGrid"),
                widget: "dxCheckBox"
            },
            gridSize: {
                command: DiagramCommand.GridSize,
                hint: _message2.default.format("dxDiagram-commandGridSize"),
                text: _message2.default.format("dxDiagram-commandGridSize"),
                widget: "dxSelectBox"
            },
            pageSize: {
                command: DiagramCommand.PageSize,
                hint: _message2.default.format("dxDiagram-commandPageSize"),
                text: _message2.default.format("dxDiagram-commandPageSize"),
                widget: "dxSelectBox",
                cssClass: CSS_CLASSES.LARGE_EDITOR_ITEM,
                getCommandValue: function(v) {
                    return JSON.parse(v)
                },
                getEditorValue: function(v) {
                    return JSON.stringify(v)
                }
            },
            pageOrientation: {
                command: DiagramCommand.PageLandscape,
                hint: _message2.default.format("dxDiagram-commandPageOrientation"),
                text: _message2.default.format("dxDiagram-commandPageOrientation"),
                widget: "dxSelectBox",
                items: [{
                    value: true,
                    text: _message2.default.format("dxDiagram-commandPageOrientationLandscape")
                }, {
                    value: false,
                    text: _message2.default.format("dxDiagram-commandPageOrientationPortrait")
                }],
                cssClass: CSS_CLASSES.MEDIUM_EDITOR_ITEM
            },
            pageColor: {
                command: DiagramCommand.PageColor,
                hint: _message2.default.format("dxDiagram-commandPageColor"),
                text: _message2.default.format("dxDiagram-commandPageColor"),
                widget: "dxColorBox",
                icon: "dx-diagram-i dx-diagram-i-button-fill",
                menuIcon: "dx-diagram-i dx-diagram-i-menu-fill",
                cssClass: CSS_CLASSES.COLOR_EDITOR_ITEM
            },
            zoomLevel: {
                command: DiagramCommand.ZoomLevel,
                hint: _message2.default.format("dxDiagram-commandZoomLevel"),
                text: _message2.default.format("dxDiagram-commandZoomLevel"),
                widget: "dxTextBox",
                items: [SEPARATOR_COMMAND, {
                    command: DiagramCommand.FitToScreen,
                    hint: _message2.default.format("dxDiagram-commandFitToContent"),
                    text: _message2.default.format("dxDiagram-commandFitToContent")
                }, {
                    command: DiagramCommand.FitToWidth,
                    hint: _message2.default.format("dxDiagram-commandFitToWidth"),
                    text: _message2.default.format("dxDiagram-commandFitToWidth")
                }, SEPARATOR_COMMAND, {
                    command: DiagramCommand.AutoZoomToContent,
                    hint: _message2.default.format("dxDiagram-commandAutoZoomByContent"),
                    text: _message2.default.format("dxDiagram-commandAutoZoomByContent")
                }, {
                    command: DiagramCommand.AutoZoomToWidth,
                    hint: _message2.default.format("dxDiagram-commandAutoZoomByWidth"),
                    text: _message2.default.format("dxDiagram-commandAutoZoomByWidth")
                }],
                getEditorDisplayValue: function(v) {
                    return Math.round(100 * v) + "%"
                },
                cssClass: CSS_CLASSES.SMALL_EDITOR_ITEM
            },
            showToolbox: {
                command: this.SHOW_TOOLBOX_COMMAND_NAME,
                iconChecked: "dx-diagram-i dx-diagram-i-button-toolbox-close",
                iconUnchecked: "dx-diagram-i dx-diagram-i-button-toolbox-open",
                hint: _message2.default.format("dxDiagram-uiShowToolbox"),
                text: _message2.default.format("dxDiagram-uiShowToolbox")
            },
            showPropertiesPanel: {
                command: this.SHOW_PROPERTIES_PANEL_COMMAND_NAME,
                iconChecked: "close",
                iconUnchecked: "dx-diagram-i dx-diagram-i-button-properties-panel-open",
                hint: _message2.default.format("dxDiagram-uiProperties"),
                text: _message2.default.format("dxDiagram-uiProperties")
            }
        })
    },
    getMainToolbarCommands: function(commands, excludeCommands) {
        var allCommands = this.getAllCommands();
        var mainToolbarCommands = commands ? this._getPreparedCommands(allCommands, commands) : this._getDefaultMainToolbarCommands(allCommands);
        return this._prepareToolbarCommands(mainToolbarCommands, excludeCommands)
    },
    _getDefaultMainToolbarCommands: function(allCommands) {
        return this._defaultMainToolbarCommands || (this._defaultMainToolbarCommands = [allCommands.undo, allCommands.redo, allCommands.separator, allCommands.fontName, allCommands.fontSize, allCommands.bold, allCommands.italic, allCommands.underline, allCommands.separator, allCommands.lineWidth, allCommands.lineStyle, allCommands.separator, allCommands.fontColor, allCommands.lineColor, allCommands.fillColor, allCommands.separator, allCommands.textAlignLeft, allCommands.textAlignCenter, allCommands.textAlignRight, allCommands.separator, allCommands.connectorLineType, allCommands.connectorLineStart, allCommands.connectorLineEnd, allCommands.separator, {
            text: _message2.default.format("dxDiagram-uiLayout"),
            showText: "always",
            items: [{
                text: _message2.default.format("dxDiagram-uiLayoutTree"),
                items: [allCommands.layoutTreeTopToBottom, allCommands.layoutTreeBottomToTop, allCommands.layoutTreeLeftToRight, allCommands.layoutTreeRightToLeft]
            }, {
                text: _message2.default.format("dxDiagram-uiLayoutLayered"),
                items: [allCommands.layoutLayeredTopToBottom, allCommands.layoutLayeredBottomToTop, allCommands.layoutLayeredLeftToRight, allCommands.layoutLayeredRightToLeft]
            }]
        }])
    },
    getHistoryToolbarCommands: function(commands, excludeCommands) {
        var allCommands = this.getAllCommands();
        var historyToolbarCommands = commands ? this._getPreparedCommands(allCommands, commands) : this._getDefaultHistoryToolbarCommands(allCommands);
        return this._prepareToolbarCommands(historyToolbarCommands, excludeCommands)
    },
    _getDefaultHistoryToolbarCommands: function(allCommands) {
        return this._defaultHistoryToolbarCommands || (this._defaultHistoryToolbarCommands = [allCommands.undo, allCommands.redo, allCommands.separator, allCommands.showToolbox])
    },
    getViewToolbarCommands: function(commands, excludeCommands) {
        var allCommands = this.getAllCommands();
        var viewToolbarCommands = commands ? this._getPreparedCommands(allCommands, commands) : this._getDefaultViewToolbarCommands(allCommands);
        return this._prepareToolbarCommands(viewToolbarCommands, excludeCommands)
    },
    _getDefaultViewToolbarCommands: function(allCommands) {
        return this._defaultViewToolbarCommands || (this._defaultViewToolbarCommands = [allCommands.zoomLevel, allCommands.separator, allCommands.fullScreen, allCommands.separator, {
            widget: "dxButton",
            icon: "export",
            text: _message2.default.format("dxDiagram-uiExport"),
            hint: _message2.default.format("dxDiagram-uiExport"),
            items: [allCommands.exportSvg, allCommands.exportPng, allCommands.exportJpg]
        }, {
            icon: "preferences",
            hint: _message2.default.format("dxDiagram-uiSettings"),
            text: _message2.default.format("dxDiagram-uiSettings"),
            items: [allCommands.units, allCommands.separator, allCommands.showGrid, allCommands.snapToGrid, allCommands.gridSize, allCommands.separator, allCommands.simpleView, allCommands.showToolbox]
        }])
    },
    getPropertiesToolbarCommands: function(commands, excludeCommands) {
        var allCommands = this.getAllCommands();
        var propertiesCommands = commands ? this._getPreparedCommands(allCommands, commands) : this._getDefaultPropertiesToolbarCommands(allCommands);
        return this._prepareToolbarCommands(propertiesCommands, excludeCommands)
    },
    _getDefaultPropertiesToolbarCommands: function(allCommands) {
        return this._defaultPropertiesToolbarCommands || (this._defaultPropertiesToolbarCommands = [allCommands.showPropertiesPanel])
    },
    _getDefaultPropertyPanelCommandGroups: function() {
        return this._defaultPropertyPanelCommandGroups || (this._defaultPropertyPanelCommandGroups = [{
            title: _message2.default.format("dxDiagram-uiStyle"),
            groups: [{
                title: _message2.default.format("dxDiagram-uiText"),
                commands: ["fontName", "fontSize", "bold", "italic", "underline", "textAlignLeft", "textAlignCenter", "textAlignRight", "fontColor"]
            }, {
                title: _message2.default.format("dxDiagram-uiObject"),
                commands: ["lineStyle", "lineWidth", "lineColor", "fillColor"]
            }, {
                title: _message2.default.format("dxDiagram-uiConnector"),
                commands: ["connectorLineType", "connectorLineStart", "connectorLineEnd"]
            }]
        }, {
            title: _message2.default.format("dxDiagram-uiLayout"),
            groups: [{
                title: _message2.default.format("dxDiagram-uiLayoutLayered"),
                commands: ["layoutLayeredTopToBottom", "layoutLayeredBottomToTop", "layoutLayeredLeftToRight", "layoutLayeredRightToLeft"]
            }, {
                title: _message2.default.format("dxDiagram-uiLayoutTree"),
                commands: ["layoutTreeTopToBottom", "layoutTreeBottomToTop", "layoutTreeLeftToRight", "layoutTreeRightToLeft"]
            }]
        }, {
            title: _message2.default.format("dxDiagram-uiDiagram"),
            groups: [{
                title: _message2.default.format("dxDiagram-uiPage"),
                commands: ["pageSize", "pageOrientation", "pageColor"]
            }]
        }])
    },
    _preparePropertyPanelGroups: function(groups) {
        var _this2 = this;
        var allCommands = this.getAllCommands();
        var result = [];
        groups.forEach(function(g) {
            var commands = g.commands;
            if (commands) {
                commands = _this2._getPreparedCommands(allCommands, commands);
                commands = _this2._prepareToolbarCommands(commands)
            }
            var subGroups;
            if (g.groups) {
                subGroups = [];
                g.groups.forEach(function(sg) {
                    var subCommands = sg.commands;
                    if (subCommands) {
                        subCommands = _this2._getPreparedCommands(allCommands, subCommands);
                        subCommands = _this2._prepareToolbarCommands(subCommands)
                    }
                    subGroups.push({
                        title: sg.title,
                        commands: subCommands
                    })
                })
            }
            result.push({
                title: g.title,
                commands: commands,
                groups: subGroups
            })
        });
        return result
    },
    getPropertyPanelCommandTabs: function(commandGroups) {
        commandGroups = commandGroups || this._getDefaultPropertyPanelCommandGroups();
        return this._preparePropertyPanelGroups(commandGroups)
    },
    getContextMenuCommands: function(commands) {
        var allCommands = this.getAllCommands();
        var contextMenuCommands = commands ? this._getPreparedCommands(allCommands, commands) : this._getDefaultContextMenuCommands(allCommands);
        return this._prepareContextMenuCommands(contextMenuCommands)
    },
    _getDefaultContextMenuCommands: function(allCommands) {
        return this._defaultContextMenuCommands || (this._defaultContextMenuCommands = [allCommands.cut, allCommands.copy, allCommands.paste, allCommands.delete, allCommands.separator, allCommands.selectAll, allCommands.separator, allCommands.bringToFront, allCommands.sendToBack, allCommands.separator, allCommands.lock, allCommands.unlock, allCommands.separator, allCommands.insertShapeImage, allCommands.editShapeImage, allCommands.deleteShapeImage])
    },
    _getPreparedCommands: function(allCommands, commands) {
        var _this3 = this;
        return commands.map(function(c) {
            if (allCommands[c]) {
                return allCommands[c]
            } else {
                if (c.text || c.icon) {
                    var command = {
                        command: c.name,
                        text: c.text,
                        hint: c.text,
                        icon: c.icon,
                        menuIcon: c.icon
                    };
                    if (Array.isArray(c.items)) {
                        command.items = _this3._getPreparedCommands(allCommands, c.items)
                    }
                    return command
                }
            }
        }).filter(function(c) {
            return c
        })
    },
    _prepareContextMenuCommands: function(commands, excludeCommands, rootCommand) {
        var _this4 = this;
        var beginGroup = false;
        return commands.map(function(c) {
            if (!_this4._isValidCommand(c, excludeCommands)) {
                return
            }
            if (c === SEPARATOR_COMMAND) {
                beginGroup = true
            } else {
                var command = _this4._cloneCommand(c, excludeCommands);
                command.icon = command.menuIcon;
                command.beginGroup = beginGroup;
                command.rootCommand = !command.command ? rootCommand && rootCommand.command : void 0;
                beginGroup = false;
                return command
            }
        }).filter(function(c) {
            return c
        })
    },
    _prepareToolbarCommands: function(commands, excludeCommands) {
        var _this5 = this;
        return commands.map(function(c) {
            if (_this5._isValidCommand(c, excludeCommands)) {
                return _this5._cloneCommand(c, excludeCommands)
            }
        }).filter(function(c) {
            return c
        }).filter(function(c, index, arr) {
            if (c.widget === SEPARATOR && index === arr.length - 1) {
                return false
            }
            return c
        })
    },
    _cloneCommand: function(c, excludeCommands) {
        var command = (0, _extend.extend)({}, c);
        if (Array.isArray(c.items)) {
            command.items = this._prepareContextMenuCommands(c.items, excludeCommands, command)
        }
        return command
    },
    _isValidCommand: function(c, excludeCommands) {
        excludeCommands = excludeCommands || [];
        return excludeCommands.indexOf(c.command) === -1
    },
    _exportTo: function(widget, dataURI, format, mimeString) {
        var window = (0, _window.getWindow)();
        if (window && window.atob && (0, _type.isFunction)(window.Blob)) {
            var blob = this._getBlobByDataURI(window, dataURI, mimeString);
            var options = widget.option("export");
            _file_saver.fileSaver.saveAs(options.fileName || "foo", format, blob, options.proxyURL)
        }
    },
    _getBlobByDataURI: function(window, dataURI, mimeString) {
        var byteString = window.atob(dataURI.split(",")[1]);
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i)
        }
        return new window.Blob([ia.buffer], {
            type: mimeString
        })
    }
};
module.exports = DiagramCommandsManager;
