/**
 * DevExtreme (ui/grid_core/ui.grid_core.validating.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _renderer = require("../../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _events_engine = require("../../events/core/events_engine");
var _events_engine2 = _interopRequireDefault(_events_engine);
var _uiGrid_core = require("./ui.grid_core.modules");
var _uiGrid_core2 = _interopRequireDefault(_uiGrid_core);
var _uiGrid_core3 = require("./ui.grid_core.utils");
var _common = require("../../core/utils/common");
var _iterator = require("../../core/utils/iterator");
var _type = require("../../core/utils/type");
var _extend = require("../../core/utils/extend");
var _selectors = require("../widget/selectors");
var _message = require("../../localization/message");
var _message2 = _interopRequireDefault(_message);
var _button = require("../button");
var _button2 = _interopRequireDefault(_button);
var _pointer = require("../../events/pointer");
var _pointer2 = _interopRequireDefault(_pointer);
var _validation_engine = require("../validation_engine");
var _validation_engine2 = _interopRequireDefault(_validation_engine);
var _validator = require("../validator");
var _validator2 = _interopRequireDefault(_validator);
var _tooltip = require("../tooltip");
var _tooltip2 = _interopRequireDefault(_tooltip);
var _overlay = require("../overlay");
var _overlay2 = _interopRequireDefault(_overlay);
var _themes = require("../themes");
var _themes2 = _interopRequireDefault(_themes);
var _ui = require("../widget/ui.errors");
var _ui2 = _interopRequireDefault(_ui);
var _deferred = require("../../core/utils/deferred");
var _load_indicator = require("../load_indicator");
var _load_indicator2 = _interopRequireDefault(_load_indicator);
var _string = require("../../core/utils/string");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) {
        return
    }
    if ("string" === typeof o) {
        return _arrayLikeToArray(o, minLen)
    }
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if ("Object" === n && o.constructor) {
        n = o.constructor.name
    }
    if ("Map" === n || "Set" === n) {
        return Array.from(n)
    }
    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
        return _arrayLikeToArray(o, minLen)
    }
}

function _iterableToArray(iter) {
    if ("undefined" !== typeof Symbol && Symbol.iterator in Object(iter)) {
        return Array.from(iter)
    }
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        return _arrayLikeToArray(arr)
    }
}

function _arrayLikeToArray(arr, len) {
    if (null == len || len > arr.length) {
        len = arr.length
    }
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i]
    }
    return arr2
}
var INVALIDATE_CLASS = "invalid";
var REVERT_TOOLTIP_CLASS = "revert-tooltip";
var ROWS_VIEW_CLASS = "rowsview";
var INVALID_MESSAGE_CLASS = "dx-invalid-message";
var WIDGET_INVALID_MESSAGE_CLASS = "invalid-message";
var INVALID_MESSAGE_ALWAYS_CLASS = "dx-invalid-message-always";
var REVERT_BUTTON_CLASS = "dx-revert-button";
var CELL_HIGHLIGHT_OUTLINE = "dx-highlight-outline";
var VALIDATOR_CLASS = "validator";
var PENDING_INDICATOR_CLASS = "dx-pending-indicator";
var VALIDATION_PENDING_CLASS = "dx-validation-pending";
var INSERT_INDEX = "__DX_INSERT_INDEX__";
var PADDING_BETWEEN_TOOLTIPS = 2;
var EDIT_MODE_ROW = "row";
var EDIT_MODE_FORM = "form";
var EDIT_MODE_BATCH = "batch";
var EDIT_MODE_CELL = "cell";
var EDIT_MODE_POPUP = "popup";
var GROUP_CELL_CLASS = "dx-group-cell";
var FORM_BASED_MODES = [EDIT_MODE_POPUP, EDIT_MODE_FORM];
var COMMAND_TRANSPARENT = "transparent";
var VALIDATION_STATUS = {
    valid: "valid",
    invalid: "invalid",
    pending: "pending"
};
var EDIT_DATA_INSERT_TYPE = "insert";
var ValidatingController = _uiGrid_core2.default.Controller.inherit(function() {
    return {
        init: function() {
            this._editingController = this.getController("editing");
            this.createAction("onRowValidating")
        },
        _getBrokenRules: function(editData, validationResults) {
            var brokenRules;
            if (validationResults) {
                brokenRules = validationResults.brokenRules || validationResults.brokenRule && [validationResults.brokenRule]
            } else {
                brokenRules = editData.brokenRules || []
            }
            return brokenRules
        },
        _rowValidating: function(editData, validationResults) {
            var deferred = new _deferred.Deferred;
            var brokenRules = this._getBrokenRules(editData, validationResults);
            var isValid = validationResults ? validationResults.isValid : editData.isValid;
            var parameters = {
                brokenRules: brokenRules,
                isValid: isValid,
                key: editData.key,
                newData: editData.data,
                oldData: editData.oldData,
                promise: null,
                errorText: this.getHiddenValidatorsErrorText(brokenRules)
            };
            this.executeAction("onRowValidating", parameters);
            (0, _deferred.when)(parameters.promise).always(function() {
                editData.isValid = parameters.isValid;
                editData.errorText = parameters.errorText;
                deferred.resolve(parameters)
            });
            return deferred.promise()
        },
        getHiddenValidatorsErrorText: function(brokenRules) {
            var brokenRulesMessages = [];
            (0, _iterator.each)(brokenRules, function(_, brokenRule) {
                var column = brokenRule.column;
                var isGroupExpandColumn = column && void 0 !== column.groupIndex && !column.showWhenGrouped;
                var isVisibleColumn = column && column.visible;
                if (!brokenRule.validator.$element().parent().length && (!isVisibleColumn || isGroupExpandColumn)) {
                    brokenRulesMessages.push(brokenRule.message)
                }
            });
            return brokenRulesMessages.join(", ")
        },
        validate: function(isFull) {
            var _this = this;
            var isValid = true;
            var editingController = this._editingController;
            var deferred = new _deferred.Deferred;
            var completeList = [];
            var editMode = editingController.getEditMode();
            isFull = isFull || editMode === EDIT_MODE_ROW;
            if (this._isValidationInProgress) {
                return deferred.resolve(false).promise()
            }
            this._isValidationInProgress = true;
            if (isFull) {
                editingController.addDeferred(deferred);
                (0, _iterator.each)(editingController._editData, function(index, editData) {
                    var validationResult;
                    if (editData.type && "remove" !== editData.type) {
                        validationResult = _this.validateGroup(editData);
                        completeList.push(validationResult);
                        validationResult.done(function(validationResult) {
                            editData.validated = true;
                            isValid = isValid && validationResult.isValid
                        })
                    }
                })
            } else {
                if (this._currentCellValidator) {
                    var validationResult = this.validateGroup(this._currentCellValidator._findGroup());
                    completeList.push(validationResult);
                    validationResult.done(function(validationResult) {
                        isValid = validationResult.isValid
                    })
                }
            }
            _deferred.when.apply(void 0, completeList).done(function() {
                _this._isValidationInProgress = false;
                deferred.resolve(isValid)
            });
            return deferred.promise()
        },
        validateGroup: function validateGroup(editData) {
            var _this2 = this;
            var result = new _deferred.Deferred;
            var validateGroup = _validation_engine2.default.getGroupConfig(editData);
            var validationResult;
            if (validateGroup && validateGroup.validators.length) {
                this.resetRowValidationResults(editData);
                validationResult = _validation_engine2.default.validateGroup(editData)
            }(0, _deferred.when)(validationResult && validationResult.complete || validationResult).done(function(validationResult) {
                (0, _deferred.when)(_this2._rowValidating(editData, validationResult)).done(result.resolve)
            });
            return result.promise()
        },
        isRowDataModified: function(editData) {
            return !(0, _type.isEmptyObject)(editData.data)
        },
        updateEditData: function(editData) {
            var editMode = this._editingController.getEditMode();
            if (FORM_BASED_MODES.indexOf(editMode) === -1) {
                if (editData.type === EDIT_DATA_INSERT_TYPE && !this.isRowDataModified(editData)) {
                    editData.isValid = true;
                    return
                }
                this.setDisableApplyValidationResults(true);
                if (_validation_engine2.default.getGroupConfig(editData)) {
                    var validationResult = _validation_engine2.default.validateGroup(editData);
                    (0, _deferred.when)(validationResult.complete || validationResult).done(function(validationResult) {
                        editData.isValid = validationResult.isValid;
                        editData.brokenRules = validationResult.brokenRules
                    })
                } else {
                    if (!editData.brokenRules || !editData.brokenRules.length) {
                        editData.isValid = true
                    }
                }
                this.setDisableApplyValidationResults(false)
            } else {
                editData.isValid = true
            }
        },
        setValidator: function(validator) {
            this._currentCellValidator = validator
        },
        renderCellPendingIndicator: function($container) {
            var $indicator = $container.find("." + PENDING_INDICATOR_CLASS);
            if (!$indicator.length) {
                var $indicatorContainer = $container.find("." + CELL_HIGHLIGHT_OUTLINE);
                if (!$indicatorContainer.length) {
                    $indicatorContainer = $container
                }
                $indicator = (0, _renderer2.default)("<div>").appendTo($indicatorContainer).addClass(PENDING_INDICATOR_CLASS);
                this._createComponent($indicator, _load_indicator2.default);
                $container.addClass(VALIDATION_PENDING_CLASS)
            }
        },
        disposeCellPendingIndicator: function($container) {
            var $indicator = $container.find("." + PENDING_INDICATOR_CLASS);
            if ($indicator.length) {
                var indicator = _load_indicator2.default.getInstance($indicator);
                if (indicator) {
                    indicator.dispose();
                    indicator.$element().remove()
                }
                $container.removeClass(VALIDATION_PENDING_CLASS)
            }
        },
        validationStatusChanged: function(result) {
            var validator = result.validator;
            var editData = validator.option("validationGroup");
            var column = validator.option("dataGetter")().column;
            this.updateCellValidationResult({
                rowKey: editData.key,
                columnIndex: column.index,
                validationResult: result
            })
        },
        validatorInitialized: function(arg) {
            arg.component.on("validating", this.validationStatusChanged.bind(this));
            arg.component.on("validated", this.validationStatusChanged.bind(this))
        },
        validatorDisposing: function(arg) {
            var validator = arg.component;
            var editData = validator.option("validationGroup");
            var column = validator.option("dataGetter")().column;
            var result = this.getCellValidationResult({
                rowKey: editData.key,
                columnIndex: column.index
            });
            if (result && result.status === VALIDATION_STATUS.pending) {
                this.removeCellValidationResult({
                    editData: editData,
                    columnIndex: column.index
                })
            }
        },
        applyValidationResult: function($container, result) {
            var validator = result.validator;
            var editData = validator.option("validationGroup");
            var column = validator.option("dataGetter")().column;
            result.brokenRules && result.brokenRules.forEach(function(rule) {
                rule.columnIndex = column.index;
                rule.column = column
            });
            if ($container) {
                var validationResult = this.getCellValidationResult({
                    rowKey: editData.key,
                    columnIndex: column.index
                });
                var requestIsDisabled = validationResult && validationResult.disabledPendingId === result.id;
                if (this._disableApplyValidationResults || requestIsDisabled) {
                    return
                }
                if (result.status === VALIDATION_STATUS.invalid) {
                    var $focus = $container.find(":focus");
                    this._editingController.showHighlighting($container, true);
                    if (!(0, _selectors.focused)($focus)) {
                        _events_engine2.default.trigger($focus, "focus");
                        _events_engine2.default.trigger($focus, _pointer2.default.down)
                    }
                }
                var editor = !column.editCellTemplate && this.getController("editorFactory").getEditorInstance($container);
                if (result.status === VALIDATION_STATUS.pending) {
                    this._editingController.showHighlighting($container, true);
                    if (editor) {
                        editor.option("validationStatus", VALIDATION_STATUS.pending)
                    } else {
                        this.renderCellPendingIndicator($container)
                    }
                } else {
                    if (editor) {
                        editor.option("validationStatus", VALIDATION_STATUS.valid)
                    } else {
                        this.disposeCellPendingIndicator($container)
                    }
                }
                $container.toggleClass(this.addWidgetPrefix(INVALIDATE_CLASS), result.status === VALIDATION_STATUS.invalid)
            }
        },
        createValidator: function(parameters, $container) {
            var _this3 = this;
            var editData;
            var editIndex;
            var visibleColumns;
            var columnsController;
            var editingController = this._editingController;
            var column = parameters.column;
            var getValue = function() {
                var value = column.calculateCellValue(editData.data || {});
                return void 0 !== value ? value : parameters.value
            };
            var showEditorAlways = column.showEditorAlways;
            if (!column.validationRules || !Array.isArray(column.validationRules) || !column.validationRules.length || (0, _type.isDefined)(column.command)) {
                return
            }
            editIndex = editingController.getIndexByKey(parameters.key, editingController._editData);
            if (editIndex < 0) {
                if (!showEditorAlways) {
                    columnsController = this.getController("columns");
                    visibleColumns = columnsController && columnsController.getVisibleColumns() || [];
                    showEditorAlways = visibleColumns.some(function(column) {
                        return column.showEditorAlways
                    })
                }
                if (showEditorAlways) {
                    editIndex = editingController._addEditData({
                        key: parameters.key,
                        oldData: parameters.data
                    })
                }
            }
            if (editIndex >= 0) {
                if ($container && !$container.length) {
                    _ui2.default.log("E1050");
                    return
                }
                editData = editingController._editData[editIndex];
                var useDefaultValidator = $container && $container.hasClass("dx-widget");
                $container && $container.addClass(this.addWidgetPrefix(VALIDATOR_CLASS));
                var validator = new _validator2.default($container || (0, _renderer2.default)("<div>"), {
                    name: column.caption,
                    validationRules: (0, _extend.extend)(true, [], column.validationRules),
                    validationGroup: editData,
                    adapter: useDefaultValidator ? null : {
                        getValue: getValue,
                        applyValidationResults: function(result) {
                            _this3.applyValidationResult($container, result)
                        }
                    },
                    dataGetter: function() {
                        return {
                            data: (0, _uiGrid_core3.createObjectWithChanges)(editData.oldData, editData.data),
                            column: column
                        }
                    },
                    onInitialized: this.validatorInitialized.bind(this),
                    onDisposing: this.validatorDisposing.bind(this)
                });
                if (useDefaultValidator) {
                    var adapter = validator.option("adapter");
                    if (adapter) {
                        adapter.getValue = getValue;
                        adapter.validationRequestsCallbacks.empty()
                    }
                }
                return validator
            }
        },
        setDisableApplyValidationResults: function(flag) {
            this._disableApplyValidationResults = flag
        },
        getDisableApplyValidationResults: function() {
            return this._disableApplyValidationResults
        },
        isCurrentValidatorProcessing: function(_ref) {
            var rowKey = _ref.rowKey,
                columnIndex = _ref.columnIndex;
            return this._currentCellValidator && this._currentCellValidator.option("validationGroup").key === rowKey && this._currentCellValidator.option("dataGetter")().column.index === columnIndex
        },
        validateCell: function(validator) {
            var cellParams = {
                rowKey: validator.option("validationGroup").key,
                columnIndex: validator.option("dataGetter")().column.index
            };
            var validationResult = this.getCellValidationResult(cellParams);
            var stateRestored = !!validationResult;
            if (!validationResult) {
                validationResult = validator.validate()
            }
            var deferred = new _deferred.Deferred;
            var adapter = validator.option("adapter");
            if (stateRestored && validationResult.status === VALIDATION_STATUS.pending) {
                this.updateCellValidationResult(cellParams);
                adapter.applyValidationResults(validationResult)
            }(0, _deferred.when)(validationResult.complete || validationResult).done(function(validationResult) {
                stateRestored && adapter.applyValidationResults(validationResult);
                deferred.resolve(validationResult)
            });
            return deferred.promise()
        },
        updateCellValidationResult: function(_ref2) {
            var rowKey = _ref2.rowKey,
                columnIndex = _ref2.columnIndex,
                validationResult = _ref2.validationResult;
            var editData = this._editingController.getEditDataByKey(rowKey);
            if (!editData) {
                return
            }
            if (!editData.validationResults) {
                editData.validationResults = {}
            }
            var result;
            if (validationResult) {
                result = (0, _extend.extend)({}, validationResult);
                editData.validationResults[columnIndex] = result;
                if (validationResult.status === VALIDATION_STATUS.pending) {
                    if (this._editingController.getEditMode() === EDIT_MODE_CELL) {
                        result.deferred = new _deferred.Deferred;
                        result.complete.always(function() {
                            result.deferred.resolve()
                        });
                        this._editingController.addDeferred(result.deferred)
                    }
                    if (this._disableApplyValidationResults) {
                        result.disabledPendingId = validationResult.id;
                        return
                    }
                }
            } else {
                result = editData.validationResults[columnIndex]
            }
            if (result && result.disabledPendingId) {
                delete result.disabledPendingId
            }
        },
        getCellValidationResult: function(_ref3) {
            var rowKey = _ref3.rowKey,
                columnIndex = _ref3.columnIndex;
            var editData = this._editingController.getEditDataByKey(rowKey);
            return editData && editData.validationResults && editData.validationResults[columnIndex]
        },
        removeCellValidationResult: function(_ref4) {
            var editData = _ref4.editData,
                columnIndex = _ref4.columnIndex;
            if (editData && editData.validationResults) {
                var result = editData.validationResults[columnIndex];
                result.deferred && result.deferred.reject("cancel");
                delete editData.validationResults[columnIndex]
            }
        },
        resetRowValidationResults: function(editData) {
            if (editData) {
                editData.validationResults && delete editData.validationResults;
                delete editData.validated
            }
        },
        isInvalidCell: function(_ref5) {
            var rowKey = _ref5.rowKey,
                columnIndex = _ref5.columnIndex;
            var result = this.getCellValidationResult({
                rowKey: rowKey,
                columnIndex: columnIndex
            });
            var editData = this._editingController.getEditDataByKey(rowKey);
            return result && "invalid" === result.status && editData && editData.validated
        },
        getCellValidator: function(_ref6) {
            var rowKey = _ref6.rowKey,
                columnIndex = _ref6.columnIndex;
            var editData = this._editingController.getEditDataByKey(rowKey);
            var groupConfig = editData && _validation_engine2.default.getGroupConfig(editData);
            var validators = groupConfig && groupConfig.validators;
            return validators && validators.filter(function(v) {
                var column = v.option("dataGetter")().column;
                return column ? column.index === columnIndex : false
            })[0]
        }
    }
}());
module.exports = {
    defaultOptions: function() {
        return {
            editing: {
                texts: {
                    validationCancelChanges: _message2.default.format("dxDataGrid-validationCancelChanges")
                }
            }
        }
    },
    controllers: {
        validating: ValidatingController
    },
    extenders: {
        controllers: {
            editing: {
                _addEditData: function(options, row) {
                    var that = this;
                    var validatingController = that.getController("validating");
                    var editDataIndex = that.callBase(options, row);
                    var editData;
                    if (editDataIndex >= 0) {
                        editData = that._editData[editDataIndex];
                        validatingController.updateEditData(editData)
                    }
                    return editDataIndex
                },
                _updateRowAndPageIndices: function() {
                    var that = this;
                    var startInsertIndex = that.getView("rowsView").getTopVisibleItemIndex();
                    var rowIndex = startInsertIndex;
                    (0, _iterator.each)(that._editData, function(_, editData) {
                        if (!editData.isValid && editData.pageIndex !== that._pageIndex) {
                            editData.pageIndex = that._pageIndex;
                            if (editData.type === EDIT_DATA_INSERT_TYPE) {
                                editData.rowIndex = startInsertIndex
                            } else {
                                editData.rowIndex = rowIndex
                            }
                            rowIndex++
                        }
                    })
                },
                _needInsertItem: function(editData) {
                    var result = this.callBase.apply(this, arguments);
                    if (result && !editData.isValid) {
                        result = editData.key.pageIndex === this._pageIndex
                    }
                    return result
                },
                processItems: function(items, changeType) {
                    var that = this;
                    var i;
                    var editData = that._editData;
                    var dataController = that.getController("data");
                    var getIndexByEditData = function(editData, items) {
                        var index = -1;
                        var isInsert = editData.type === EDIT_DATA_INSERT_TYPE;
                        var key = editData.key;
                        (0, _iterator.each)(items, function(i, item) {
                            if ((0, _common.equalByValue)(key, isInsert ? item : dataController.keyOf(item))) {
                                index = i;
                                return false
                            }
                        });
                        return index
                    };
                    items = that.callBase(items, changeType);
                    var itemsCount = items.length;
                    var addInValidItem = function(editData) {
                        var data = {
                            key: editData.key
                        };
                        var index = getIndexByEditData(editData, items);
                        if (index >= 0) {
                            return
                        }
                        editData.rowIndex = editData.rowIndex > itemsCount ? editData.rowIndex % itemsCount : editData.rowIndex;
                        var rowIndex = editData.rowIndex;
                        data[INSERT_INDEX] = 1;
                        items.splice(rowIndex, 0, data)
                    };
                    if (that.getEditMode() === EDIT_MODE_BATCH && "prepend" !== changeType && "append" !== changeType) {
                        for (i = 0; i < editData.length; i++) {
                            if (editData[i].type && editData[i].pageIndex === that._pageIndex && editData[i].key.pageIndex !== that._pageIndex) {
                                addInValidItem(editData[i])
                            }
                        }
                    }
                    return items
                },
                processDataItem: function(item) {
                    var that = this;
                    var editIndex;
                    var editData;
                    var isInserted = item.data[INSERT_INDEX];
                    var key = isInserted ? item.data.key : item.key;
                    var editMode = that.getEditMode();
                    if (editMode === EDIT_MODE_BATCH && isInserted && key) {
                        editIndex = (0, _uiGrid_core3.getIndexByKey)(key, that._editData);
                        if (editIndex >= 0) {
                            editData = that._editData[editIndex];
                            if (editData.type !== EDIT_DATA_INSERT_TYPE) {
                                item.data = (0, _extend.extend)(true, {}, editData.oldData, editData.data);
                                item.key = key
                            }
                        }
                    }
                    that.callBase.apply(that, arguments)
                },
                _getInvisibleColumns: function(editData) {
                    var _this4 = this;
                    var columnsController = this.getController("columns");
                    var hasInvisibleRows;
                    var invisibleColumns = columnsController.getInvisibleColumns();
                    if (this.isCellOrBatchEditMode()) {
                        hasInvisibleRows = editData.some(function(rowEditData) {
                            var rowIndex = _this4._dataController.getRowIndexByKey(rowEditData.key);
                            return rowIndex < 0
                        })
                    }
                    return hasInvisibleRows ? columnsController.getColumns() : invisibleColumns
                },
                _createInvisibleColumnValidators: function(editData) {
                    var validatingController = this.getController("validating");
                    var columnsController = this.getController("columns");
                    var invisibleColumns = this._getInvisibleColumns(editData).filter(function(column) {
                        return !column.isBand
                    });
                    var groupColumns = columnsController.getGroupColumns().filter(function(column) {
                        return !column.showWhenGrouped && invisibleColumns.indexOf(column) === -1
                    });
                    var invisibleColumnValidators = [];
                    invisibleColumns.push.apply(invisibleColumns, _toConsumableArray(groupColumns));
                    if (FORM_BASED_MODES.indexOf(this.getEditMode()) === -1) {
                        (0, _iterator.each)(invisibleColumns, function(_, column) {
                            editData.forEach(function(options) {
                                var data;
                                if (options.type === EDIT_DATA_INSERT_TYPE) {
                                    data = options.data
                                } else {
                                    if ("update" === options.type) {
                                        data = (0, _uiGrid_core3.createObjectWithChanges)(options.oldData, options.data)
                                    }
                                }
                                if (data) {
                                    var validator = validatingController.createValidator({
                                        column: column,
                                        key: options.key,
                                        value: column.calculateCellValue(data)
                                    });
                                    if (validator) {
                                        invisibleColumnValidators.push(validator)
                                    }
                                }
                            })
                        })
                    }
                    return function() {
                        invisibleColumnValidators.forEach(function(validator) {
                            validator.dispose()
                        })
                    }
                },
                _beforeSaveEditData: function(editData, editIndex) {
                    var _this5 = this;
                    var isValid;
                    var result = this.callBase.apply(this, arguments);
                    var validatingController = this.getController("validating");
                    if (editData) {
                        isValid = "remove" === editData.type || editData.isValid;
                        result = result || !isValid
                    } else {
                        var disposeValidators = this._createInvisibleColumnValidators(this._editData);
                        result = new _deferred.Deferred;
                        this.executeOperation(result, function() {
                            validatingController.validate(true).done(function(isFullValid) {
                                disposeValidators();
                                _this5._updateRowAndPageIndices();
                                switch (_this5.getEditMode()) {
                                    case EDIT_MODE_CELL:
                                        if (!isFullValid) {
                                            _this5._focusEditingCell()
                                        }
                                        break;
                                    case EDIT_MODE_BATCH:
                                        if (!isFullValid) {
                                            _this5._editRowIndex = -1;
                                            _this5._editColumnIndex = -1;
                                            _this5.getController("data").updateItems()
                                        }
                                }
                                result.resolve(!isFullValid)
                            })
                        })
                    }
                    return result.promise ? result.promise() : result
                },
                _beforeEditCell: function(rowIndex, columnIndex, item) {
                    var result = this.callBase(rowIndex, columnIndex, item);
                    if (this.getEditMode() === EDIT_MODE_CELL) {
                        var $cell = this._rowsView._getCellElement(rowIndex, columnIndex);
                        var validator = $cell && $cell.data("dxValidator");
                        var value = validator && validator.option("adapter").getValue();
                        if (validator && void 0 !== value) {
                            var validatingController = this.getController("validating");
                            var deferred = new _deferred.Deferred;
                            (0, _deferred.when)(validatingController.validateCell(validator), result).done(function(validationResult, result) {
                                deferred.resolve(validationResult.status === VALIDATION_STATUS.valid && result)
                            });
                            return deferred.promise()
                        } else {
                            if (!validator) {
                                return result
                            }
                        }
                    }
                },
                _afterSaveEditData: function() {
                    var _this6 = this;
                    var $firstErrorRow;
                    (0, _iterator.each)(this._editData, function(_, editData) {
                        var $errorRow = _this6._showErrorRow(editData);
                        $firstErrorRow = $firstErrorRow || $errorRow
                    });
                    if ($firstErrorRow) {
                        var scrollable = this._rowsView.getScrollable();
                        if (scrollable) {
                            scrollable.update();
                            scrollable.scrollToElement($firstErrorRow)
                        }
                    }
                },
                _showErrorRow: function(editData) {
                    var $popupContent;
                    var errorHandling = this.getController("errorHandling");
                    var items = this.getController("data").items();
                    var rowIndex = this.getIndexByKey(editData.key, items);
                    if (!editData.isValid && editData.errorText && rowIndex >= 0) {
                        $popupContent = this.getPopupContent();
                        return errorHandling && errorHandling.renderErrorRow(editData.errorText, rowIndex, $popupContent)
                    }
                },
                updateFieldValue: function(e) {
                    var validatingController = this.getController("validating");
                    var deferred = new _deferred.Deferred;
                    validatingController.resetRowValidationResults(this.getEditDataByKey(e.key));
                    this.callBase.apply(this, arguments).done(function() {
                        var currentValidator = validatingController.getCellValidator({
                            rowKey: e.key,
                            columnIndex: e.column.index
                        });
                        (0, _deferred.when)(currentValidator && validatingController.validateCell(currentValidator)).done(deferred.resolve)
                    });
                    return deferred.promise()
                },
                showHighlighting: function($cell, skipValidation) {
                    var _this7 = this;
                    var isValid = true;
                    var callBase = this.callBase;
                    var validator;
                    if (!skipValidation) {
                        validator = $cell.data("dxValidator");
                        if (validator) {
                            (0, _deferred.when)(this.getController("validating").validateCell(validator)).done(function(validationResult) {
                                isValid = validationResult.status === VALIDATION_STATUS.valid;
                                if (isValid) {
                                    callBase.call(_this7, $cell)
                                }
                            });
                            return
                        }
                    }
                    if (isValid) {
                        callBase.call(this, $cell)
                    }
                },
                highlightDataCell: function($cell, parameters) {
                    var isEditableCell = parameters.setValue;
                    var cellModified = this.isCellModified(parameters);
                    if (!cellModified && isEditableCell) {
                        var validationResult = this.getController("validating").getCellValidationResult({
                            rowKey: parameters.key,
                            columnIndex: parameters.column.index
                        });
                        var isValidated = (0, _type.isDefined)(validationResult);
                        var skipValidation = parameters.row.isNewRow || !isValidated;
                        this.showHighlighting($cell, skipValidation);
                        return
                    }
                    this.callBase.apply(this, arguments)
                },
                getEditDataByKey: function(key) {
                    return this._editData[(0, _uiGrid_core3.getIndexByKey)(key, this._editData)]
                },
                isCellModified: function(parameters) {
                    var cellModified = this.callBase(parameters);
                    var isCellInvalidInNewRow = parameters.row && parameters.row.isNewRow && this.getController("validating").isInvalidCell({
                        rowKey: parameters.key,
                        columnIndex: parameters.column.index
                    });
                    return cellModified || isCellInvalidInNewRow
                }
            },
            editorFactory: function() {
                var getWidthOfVisibleCells = function(that, element) {
                    var rowIndex = (0, _renderer2.default)(element).closest("tr").index();
                    var $cellElements = (0, _renderer2.default)(that._rowsView.getRowElement(rowIndex)).first().children().filter(":not(.dx-hidden-cell)");
                    return that._rowsView._getWidths($cellElements).reduce(function(w1, w2) {
                        return w1 + w2
                    }, 0)
                };
                var getBoundaryNonFixedColumnsInfo = function(fixedColumns) {
                    var firstNonFixedColumnIndex;
                    var lastNonFixedColumnIndex;
                    fixedColumns.some(function(column, index) {
                        if (column.command === COMMAND_TRANSPARENT) {
                            firstNonFixedColumnIndex = 0 === index ? -1 : index;
                            lastNonFixedColumnIndex = index === fixedColumns.length - 1 ? -1 : index + column.colspan - 1;
                            return true
                        }
                    });
                    return {
                        startColumnIndex: firstNonFixedColumnIndex,
                        endColumnIndex: lastNonFixedColumnIndex
                    }
                };
                return {
                    _showRevertButton: function($container, $targetElement) {
                        var _this8 = this;
                        if (!$targetElement || !$targetElement.length) {
                            return
                        }
                        var $tooltipElement = $container.find("." + this.addWidgetPrefix(REVERT_TOOLTIP_CLASS));
                        $tooltipElement && $tooltipElement.remove();
                        $tooltipElement = (0, _renderer2.default)("<div>").addClass(this.addWidgetPrefix(REVERT_TOOLTIP_CLASS)).appendTo($container);
                        var tooltipOptions = {
                            animation: null,
                            visible: true,
                            target: $targetElement,
                            container: $container,
                            closeOnOutsideClick: false,
                            closeOnTargetScroll: false,
                            contentTemplate: function() {
                                var $buttonElement = (0, _renderer2.default)("<div>").addClass(REVERT_BUTTON_CLASS);
                                var buttonOptions = {
                                    icon: "revert",
                                    hint: _this8.option("editing.texts.validationCancelChanges"),
                                    onClick: function() {
                                        _this8._editingController.cancelEditData()
                                    }
                                };
                                return new _button2.default($buttonElement, buttonOptions).$element()
                            },
                            position: {
                                my: "left top",
                                at: "right top",
                                of: $targetElement,
                                offset: "1 0",
                                collision: "flip",
                                boundary: this._rowsView.element()
                            },
                            onPositioned: this._positionedHandler.bind(this)
                        };
                        return new _tooltip2.default($tooltipElement, tooltipOptions)
                    },
                    _hideFixedGroupCell: function($cell, overlayOptions) {
                        var nextRowOptions;
                        var $nextFixedRowElement;
                        var $groupCellElement;
                        var isFixedColumns = this._rowsView.isFixedColumns();
                        var isFormEditMode = this._editingController.isFormEditMode();
                        if (isFixedColumns && !isFormEditMode) {
                            nextRowOptions = $cell.closest(".dx-row").next().data("options");
                            if (nextRowOptions && "group" === nextRowOptions.rowType) {
                                $nextFixedRowElement = (0, _renderer2.default)(this._rowsView.getRowElement(nextRowOptions.rowIndex)).last();
                                $groupCellElement = $nextFixedRowElement.find("." + GROUP_CELL_CLASS);
                                if ($groupCellElement.length && "hidden" !== $groupCellElement.get(0).style.visibility) {
                                    $groupCellElement.css("visibility", "hidden");
                                    overlayOptions.onDisposing = function() {
                                        $groupCellElement.css("visibility", "")
                                    }
                                }
                            }
                        }
                    },
                    _positionedHandler: function(e, isOverlayVisible) {
                        if (!e.component.__skipPositionProcessing) {
                            var isRevertButton = (0, _renderer2.default)(e.element).hasClass(this.addWidgetPrefix(REVERT_TOOLTIP_CLASS));
                            var needRepaint = !isRevertButton && this._rowsView.updateFreeSpaceRowHeight();
                            var normalizedPosition = this._normalizeValidationMessagePositionAndMaxWidth(e, isRevertButton, isOverlayVisible);
                            e.component.__skipPositionProcessing = !!(needRepaint || normalizedPosition);
                            if (normalizedPosition) {
                                e.component.option(normalizedPosition)
                            } else {
                                if (needRepaint) {
                                    e.component.repaint()
                                }
                            }
                        }
                    },
                    _showValidationMessage: function($cell, messages, alignment, revertTooltip) {
                        var _this9 = this;
                        var $highlightContainer = $cell.find("." + CELL_HIGHLIGHT_OUTLINE);
                        var isMaterial = _themes2.default.isMaterial();
                        var overlayTarget = $highlightContainer.length && !isMaterial ? $highlightContainer : $cell;
                        var editorPopup = $cell.find(".dx-dropdowneditor-overlay").data("dxPopup");
                        var isOverlayVisible = editorPopup && editorPopup.option("visible");
                        var myPosition = isOverlayVisible ? "top right" : "top " + alignment;
                        var atPosition = isOverlayVisible ? "top left" : "bottom " + alignment;
                        var errorMessageText = "";
                        messages && messages.forEach(function(message) {
                            errorMessageText += (errorMessageText.length ? "<br/>" : "") + (0, _string.encodeHtml)(message)
                        });
                        var $overlayElement = (0, _renderer2.default)("<div>").addClass(INVALID_MESSAGE_CLASS).addClass(INVALID_MESSAGE_ALWAYS_CLASS).addClass(this.addWidgetPrefix(WIDGET_INVALID_MESSAGE_CLASS)).html(errorMessageText).appendTo($cell);
                        var overlayOptions = {
                            target: overlayTarget,
                            container: $cell,
                            shading: false,
                            width: "auto",
                            height: "auto",
                            visible: true,
                            animation: false,
                            propagateOutsideClick: true,
                            closeOnOutsideClick: false,
                            closeOnTargetScroll: false,
                            position: {
                                collision: "flip",
                                boundary: this._rowsView.element(),
                                boundaryOffset: "0 0",
                                my: myPosition,
                                at: atPosition
                            },
                            onPositioned: function(e) {
                                _this9._positionedHandler(e, isOverlayVisible);
                                _this9._shiftValidationMessageIfNeed(e.component.$content(), revertTooltip && revertTooltip.$content(), $cell)
                            }
                        };
                        this._hideFixedGroupCell($cell, overlayOptions);
                        new _overlay2.default($overlayElement, overlayOptions)
                    },
                    _normalizeValidationMessagePositionAndMaxWidth: function(options, isRevertButton, isOverlayVisible) {
                        var fixedColumns = this._columnsController.getFixedColumns();
                        if (!fixedColumns || !fixedColumns.length) {
                            return
                        }
                        var position;
                        var visibleTableWidth = !isRevertButton && getWidthOfVisibleCells(this, options.element);
                        var $overlayContentElement = isRevertButton ? options.component.overlayContent() : options.component.$content();
                        var validationMessageWidth = $overlayContentElement.outerWidth(true);
                        var needMaxWidth = !isRevertButton && validationMessageWidth > visibleTableWidth;
                        var columnIndex = this._rowsView.getCellIndex((0, _renderer2.default)(options.element).closest("td"));
                        var boundaryNonFixedColumnsInfo = getBoundaryNonFixedColumnsInfo(fixedColumns);
                        if (!isRevertButton && (columnIndex === boundaryNonFixedColumnsInfo.startColumnIndex || needMaxWidth)) {
                            position = {
                                collision: "none flip",
                                my: "top left",
                                at: isOverlayVisible ? "top right" : "bottom left"
                            }
                        } else {
                            if (columnIndex === boundaryNonFixedColumnsInfo.endColumnIndex) {
                                position = {
                                    collision: "none flip",
                                    my: "top right",
                                    at: isRevertButton || isOverlayVisible ? "top left" : "bottom right"
                                };
                                if (isRevertButton) {
                                    position.offset = "-1 0"
                                }
                            }
                        }
                        return position && {
                            position: position,
                            maxWidth: needMaxWidth ? visibleTableWidth - 2 : void 0
                        }
                    },
                    _shiftValidationMessageIfNeed: function($content, $revertContent, $cell) {
                        if (!$revertContent) {
                            return
                        }
                        var contentOffset = $content.offset();
                        var revertContentOffset = $revertContent.offset();
                        if (contentOffset.top === revertContentOffset.top && contentOffset.left + $content.width() > revertContentOffset.left) {
                            var left = $revertContent.width() + PADDING_BETWEEN_TOOLTIPS;
                            $content.css("left", revertContentOffset.left < $cell.offset().left ? -left : left)
                        }
                    },
                    _getTooltipsSelector: function() {
                        var invalidMessageClass = this.addWidgetPrefix(WIDGET_INVALID_MESSAGE_CLASS);
                        var revertTooltipClass = this.addWidgetPrefix(REVERT_TOOLTIP_CLASS);
                        return ".dx-editor-cell ." + revertTooltipClass + ", .dx-editor-cell ." + invalidMessageClass + ", .dx-cell-modified ." + invalidMessageClass
                    },
                    init: function() {
                        this.callBase();
                        this._editingController = this.getController("editing");
                        this._columnsController = this.getController("columns");
                        this._rowsView = this.getView("rowsView")
                    },
                    loseFocus: function(skipValidator) {
                        if (!skipValidator) {
                            this.getController("validating").setValidator(null)
                        }
                        this.callBase()
                    },
                    updateCellState: function($element, validationResult, hideBorder) {
                        var $focus = $element && $element.closest(this._getFocusCellSelector());
                        var $cell = $focus && $focus.is("td") ? $focus : null;
                        var rowOptions = $focus && $focus.closest(".dx-row").data("options");
                        var editData = rowOptions ? this.getController("editing").getEditDataByKey(rowOptions.key) : null;
                        var column = $cell && this.getController("columns").getVisibleColumns()[$cell.index()];
                        var revertTooltip;
                        if (validationResult && validationResult.status === VALIDATION_STATUS.invalid || editData && "update" === editData.type && !this._editingController.isSaving()) {
                            if (this._editingController.getEditMode() === EDIT_MODE_CELL) {
                                revertTooltip = this._showRevertButton($focus, $cell ? $focus.find("." + CELL_HIGHLIGHT_OUTLINE).first() : $focus)
                            }
                        }
                        var showValidationMessage = validationResult && validationResult.status === VALIDATION_STATUS.invalid;
                        if (showValidationMessage && $cell && column && validationResult && validationResult.brokenRules) {
                            var errorMessages = [];
                            validationResult.brokenRules.forEach(function(rule) {
                                errorMessages.push(rule.message)
                            });
                            this._showValidationMessage($focus, errorMessages, column.alignment || "left", revertTooltip)
                        }!hideBorder && this._rowsView.element() && this._rowsView.updateFreeSpaceRowHeight()
                    },
                    focus: function($element, hideBorder) {
                        var _this10 = this;
                        var $focus = $element && $element.closest(this._getFocusCellSelector());
                        var callBase = this.callBase;
                        var validator = $focus && ($focus.data("dxValidator") || $element.find("." + this.addWidgetPrefix(VALIDATOR_CLASS)).eq(0).data("dxValidator"));
                        var rowOptions = $focus && $focus.closest(".dx-row").data("options");
                        var editingController = this.getController("editing");
                        var editData = rowOptions ? editingController.getEditDataByKey(rowOptions.key) : null;
                        var validationResult;
                        var $tooltips = $focus && $focus.closest("." + this.addWidgetPrefix(ROWS_VIEW_CLASS)).find(this._getTooltipsSelector());
                        var $cell = $focus && $focus.is("td") ? $focus : null;
                        var column = $cell && this.getController("columns").getVisibleColumns()[$cell.index()];
                        var validatingController = this.getController("validating");
                        if (!arguments.length) {
                            return this.callBase()
                        }
                        $tooltips && $tooltips.remove();
                        if (validator) {
                            validatingController.setValidator(validator);
                            if (void 0 !== validator.option("adapter").getValue() || editData && editData.validated) {
                                editingController.waitForDeferredOperations().done(function() {
                                    (0, _deferred.when)(validatingController.validateCell(validator)).done(function(result) {
                                        validationResult = result;
                                        if (editData && column && !validatingController.isCurrentValidatorProcessing({
                                                rowKey: editData.key,
                                                columnIndex: column.index
                                            })) {
                                            return
                                        }
                                        if (validationResult.status === VALIDATION_STATUS.invalid) {
                                            hideBorder = true
                                        }
                                        _this10.updateCellState($element, validationResult, hideBorder);
                                        callBase.call(_this10, $element, hideBorder)
                                    })
                                });
                                return this.callBase($element, hideBorder)
                            }
                        }
                        this.updateCellState($element, validationResult, hideBorder);
                        return this.callBase($element, hideBorder)
                    },
                    getEditorInstance: function($container) {
                        var $editor = $container.find(".dx-texteditor").eq(0);
                        return (0, _uiGrid_core3.getWidgetInstance)($editor)
                    }
                }
            }()
        },
        views: {
            rowsView: {
                updateFreeSpaceRowHeight: function($table) {
                    var that = this;
                    var $rowElements;
                    var $freeSpaceRowElement;
                    var $freeSpaceRowElements;
                    var $element = that.element();
                    var $tooltipContent = $element && $element.find("." + that.addWidgetPrefix(WIDGET_INVALID_MESSAGE_CLASS) + " .dx-overlay-content");
                    that.callBase($table);
                    if ($tooltipContent && $tooltipContent.length) {
                        $rowElements = that._getRowElements();
                        $freeSpaceRowElements = that._getFreeSpaceRowElements($table);
                        $freeSpaceRowElement = $freeSpaceRowElements.first();
                        if ($freeSpaceRowElement && 1 === $rowElements.length && (!$freeSpaceRowElement.is(":visible") || $tooltipContent.outerHeight() > $freeSpaceRowElement.outerHeight())) {
                            $freeSpaceRowElements.show();
                            $freeSpaceRowElements.height($tooltipContent.outerHeight());
                            return true
                        }
                    }
                },
                _formItemPrepared: function(cellOptions, $container) {
                    var _this11 = this;
                    this.callBase.apply(this, arguments);
                    (0, _common.deferUpdate)(function() {
                        var $editor = $container.find(".dx-widget").first();
                        var isEditorDisposed = $editor.length && !$editor.children().length;
                        if (!isEditorDisposed) {
                            _this11.getController("validating").createValidator(cellOptions, $editor)
                        }
                    })
                },
                _cellPrepared: function($cell, parameters) {
                    if (!this.getController("editing").isFormEditMode()) {
                        this.getController("validating").createValidator(parameters, $cell)
                    }
                    this.callBase.apply(this, arguments)
                }
            }
        }
    }
};
