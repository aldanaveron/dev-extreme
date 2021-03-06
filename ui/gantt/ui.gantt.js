/**
 * DevExtreme (ui/gantt/ui.gantt.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _renderer = require("../../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _type = require("../../core/utils/type");
var _type2 = _interopRequireDefault(_type);
var _ui = require("../widget/ui.widget");
var _ui2 = _interopRequireDefault(_ui);
var _component_registrator = require("../../core/component_registrator");
var _component_registrator2 = _interopRequireDefault(_component_registrator);
var _data = require("../../core/utils/data");
var _data2 = _interopRequireDefault(_data);
var _uiGantt = require("./ui.gantt.view");
var _uiGantt2 = require("./ui.gantt.bars");
var _tree_list = require("../tree_list");
var _tree_list2 = _interopRequireDefault(_tree_list);
var _extend = require("../../core/utils/extend");
var _window = require("../../core/utils/window");
var _uiGanttData = require("./ui.gantt.data.option");
var _uiGanttData2 = _interopRequireDefault(_uiGanttData);
var _splitter = require("../splitter");
var _splitter2 = _interopRequireDefault(_splitter);
var _uiGantt3 = require("./ui.gantt.dialogs");
var _load_panel = require("../load_panel");
var _load_panel2 = _interopRequireDefault(_load_panel);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _typeof(obj) {
    "@babel/helpers - typeof";
    if ("function" === typeof Symbol && "symbol" === typeof Symbol.iterator) {
        _typeof = function(obj) {
            return typeof obj
        }
    } else {
        _typeof = function(obj) {
            return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
        }
    }
    return _typeof(obj)
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function")
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
            descriptor.writable = true
        }
        Object.defineProperty(target, descriptor.key, descriptor)
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        _defineProperties(Constructor.prototype, protoProps)
    }
    if (staticProps) {
        _defineProperties(Constructor, staticProps)
    }
    return Constructor
}

function _get(target, property, receiver) {
    if ("undefined" !== typeof Reflect && Reflect.get) {
        _get = Reflect.get
    } else {
        _get = function(target, property, receiver) {
            var base = _superPropBase(target, property);
            if (!base) {
                return
            }
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
                return desc.get.call(receiver)
            }
            return desc.value
        }
    }
    return _get(target, property, receiver || target)
}

function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
        object = _getPrototypeOf(object);
        if (null === object) {
            break
        }
    }
    return object
}

function _createSuper(Derived) {
    return function() {
        var result, Super = _getPrototypeOf(Derived);
        if (_isNativeReflectConstruct()) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget)
        } else {
            result = Super.apply(this, arguments)
        }
        return _possibleConstructorReturn(this, result)
    }
}

function _possibleConstructorReturn(self, call) {
    if (call && ("object" === _typeof(call) || "function" === typeof call)) {
        return call
    }
    return _assertThisInitialized(self)
}

function _assertThisInitialized(self) {
    if (void 0 === self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
    }
    return self
}

function _isNativeReflectConstruct() {
    if ("undefined" === typeof Reflect || !Reflect.construct) {
        return false
    }
    if (Reflect.construct.sham) {
        return false
    }
    if ("function" === typeof Proxy) {
        return true
    }
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
        return true
    } catch (e) {
        return false
    }
}

function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function(o) {
        return o.__proto__ || Object.getPrototypeOf(o)
    };
    return _getPrototypeOf(o)
}

function _inherits(subClass, superClass) {
    if ("function" !== typeof superClass && null !== superClass) {
        throw new TypeError("Super expression must either be null or a function")
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) {
        _setPrototypeOf(subClass, superClass)
    }
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function(o, p) {
        o.__proto__ = p;
        return o
    };
    return _setPrototypeOf(o, p)
}
var GANTT_CLASS = "dx-gantt";
var GANTT_VIEW_CLASS = "dx-gantt-view";
var GANTT_COLLAPSABLE_ROW = "dx-gantt-collapsable-row";
var GANTT_TREE_LIST_WRAPPER = "dx-gantt-treelist-wrapper";
var GANTT_TOOLBAR_WRAPPER = "dx-gantt-toolbar-wrapper";
var GANTT_MAIN_WRAPPER = "dx-gantt-main-wrapper";
var GANTT_TASKS = "tasks";
var GANTT_DEPENDENCIES = "dependencies";
var GANTT_RESOURCES = "resources";
var GANTT_RESOURCE_ASSIGNMENTS = "resourceAssignments";
var GANTT_DEFAULT_ROW_HEIGHT = 34;
var Gantt = function(_Widget) {
    _inherits(Gantt, _Widget);
    var _super = _createSuper(Gantt);

    function Gantt() {
        _classCallCheck(this, Gantt);
        return _super.apply(this, arguments)
    }
    _createClass(Gantt, [{
        key: "_initMarkup",
        value: function() {
            _get(_getPrototypeOf(Gantt.prototype), "_initMarkup", this).call(this);
            this.$element().addClass(GANTT_CLASS);
            this._$toolbarWrapper = (0, _renderer2.default)("<div>").addClass(GANTT_TOOLBAR_WRAPPER).appendTo(this.$element());
            this._$toolbar = (0, _renderer2.default)("<div>").appendTo(this._$toolbarWrapper);
            this._$mainWrapper = (0, _renderer2.default)("<div>").addClass(GANTT_MAIN_WRAPPER).appendTo(this.$element());
            this._$treeListWrapper = (0, _renderer2.default)("<div>").addClass(GANTT_TREE_LIST_WRAPPER).appendTo(this._$mainWrapper);
            this._$treeList = (0, _renderer2.default)("<div>").appendTo(this._$treeListWrapper);
            this._$splitter = (0, _renderer2.default)("<div>").appendTo(this._$mainWrapper);
            this._$ganttView = (0, _renderer2.default)("<div>").addClass(GANTT_VIEW_CLASS).appendTo(this._$mainWrapper);
            this._$dialog = (0, _renderer2.default)("<div>").appendTo(this.$element());
            this._$loadPanel = (0, _renderer2.default)("<div>").appendTo(this.$element());
            this._$contextMenu = (0, _renderer2.default)("<div>").appendTo(this.$element());
            this._refreshDataSource(GANTT_TASKS);
            this._refreshDataSource(GANTT_DEPENDENCIES);
            this._refreshDataSource(GANTT_RESOURCES);
            this._refreshDataSource(GANTT_RESOURCE_ASSIGNMENTS)
        }
    }, {
        key: "_renderContent",
        value: function() {
            this._renderBars();
            this._renderTreeList();
            this._renderSplitter()
        }
    }, {
        key: "_renderTreeList",
        value: function() {
            var _this = this;
            var _this$option = this.option(GANTT_TASKS),
                keyExpr = _this$option.keyExpr,
                parentIdExpr = _this$option.parentIdExpr;
            this._treeList = this._createComponent(this._$treeList, _tree_list2.default, {
                dataSource: this._tasksRaw,
                keyExpr: keyExpr,
                parentIdExpr: parentIdExpr,
                columns: this.option("columns"),
                columnResizingMode: "nextColumn",
                height: this._$treeList.height() ? this._$treeList.height() : "100%",
                width: this.option("taskListWidth"),
                selection: {
                    mode: this._getSelectionMode(this.option("allowSelection"))
                },
                selectedRowKeys: this._getArrayFromOneElement(this.option("selectedRowKey")),
                sorting: {
                    mode: "none"
                },
                scrolling: {
                    showScrollbar: "onHover",
                    mode: "virtual"
                },
                allowColumnResizing: true,
                autoExpandAll: true,
                showRowLines: this.option("showRowLines"),
                onContentReady: function(e) {
                    _this._onTreeListContentReady(e)
                },
                onSelectionChanged: function(e) {
                    _this._onTreeListSelectionChanged(e)
                },
                onRowCollapsed: function(e) {
                    return _this._ganttView.changeTaskExpanded(e.key, false)
                },
                onRowExpanded: function(e) {
                    return _this._ganttView.changeTaskExpanded(e.key, true)
                },
                onRowPrepared: function(e) {
                    _this._onTreeListRowPrepared(e)
                },
                onContextMenuPreparing: function(e) {
                    _this._onTreeListContextMenuPreparing(e)
                },
                onRowDblClick: function() {
                    _this._onTreeListRowDblClick()
                }
            })
        }
    }, {
        key: "_renderSplitter",
        value: function() {
            this._splitter = this._createComponent(this._$splitter, _splitter2.default, {
                container: this.$element(),
                leftElement: this._$treeListWrapper,
                rightElement: this._$ganttView,
                onApplyPanelSize: this._onApplyPanelSize.bind(this)
            });
            this._splitter.option("initialLeftPanelWidth", this.option("taskListWidth"))
        }
    }, {
        key: "_renderBars",
        value: function() {
            this._bars = [];
            this._toolbar = new _uiGantt2.GanttToolbar(this._$toolbar, this);
            this._updateToolbarContent();
            this._bars.push(this._toolbar);
            this._contextMenuBar = new _uiGantt2.GanttContextMenuBar(this._$contextMenu, this);
            this._bars.push(this._contextMenuBar)
        }
    }, {
        key: "_initGanttView",
        value: function() {
            if (this._ganttView) {
                return
            }
            this._ganttView = this._createComponent(this._$ganttView, _uiGantt.GanttView, {
                width: "100%",
                height: this._treeList._$element.get(0).offsetHeight,
                rowHeight: this._getTreeListRowHeight(),
                headerHeight: this._getTreeListHeaderHeight(),
                tasks: this._tasks,
                dependencies: this._dependencies,
                resources: this._resources,
                resourceAssignments: this._resourceAssignments,
                allowSelection: this.option("allowSelection"),
                selectedRowKey: this.option("selectedRowKey"),
                showResources: this.option("showResources"),
                taskTitlePosition: this.option("taskTitlePosition"),
                showRowLines: this.option("showRowLines"),
                scaleType: this.option("scaleType"),
                editing: this.option("editing"),
                validation: this.option("validation"),
                stripLines: this.option("stripLines"),
                bars: this._bars,
                mainElement: this.$element(),
                onSelectionChanged: this._onGanttViewSelectionChanged.bind(this),
                onScroll: this._onGanttViewScroll.bind(this),
                onDialogShowing: this._showDialog.bind(this),
                onPopupMenuShowing: this._showPopupMenu.bind(this),
                modelChangesListener: this._createModelChangesListener()
            });
            this._fireContentReadyAction()
        }
    }, {
        key: "_onApplyPanelSize",
        value: function(e) {
            this._setInnerElementsWidth(e)
        }
    }, {
        key: "_onTreeListContentReady",
        value: function(e) {
            if (e.component.getDataSource()) {
                this._initGanttView();
                this._initScrollSync(e.component)
            }
        }
    }, {
        key: "_onTreeListRowPrepared",
        value: function(e) {
            if ("data" === e.rowType && e.node.children.length > 0) {
                (0, _renderer2.default)(e.rowElement).addClass(GANTT_COLLAPSABLE_ROW)
            }
        }
    }, {
        key: "_onTreeListContextMenuPreparing",
        value: function(e) {
            if (e.row && "data" === e.row.rowType) {
                this._setTreeListOption("selectedRowKeys", [e.row.data.id]);
                e.items = [];
                this._showPopupMenu({
                    position: {
                        x: e.event.clientX,
                        y: e.event.clientY
                    }
                })
            }
        }
    }, {
        key: "_onTreeListRowDblClick",
        value: function() {
            this._ganttView._ganttViewCore.commandManager.showTaskEditDialog.execute()
        }
    }, {
        key: "_onTreeListSelectionChanged",
        value: function(e) {
            var selectedRowKey = e.currentSelectedRowKeys[0];
            this._setGanttViewOption("selectedRowKey", selectedRowKey);
            this.option("selectedRowKey", selectedRowKey);
            this._raiseSelectionChangedAction(selectedRowKey)
        }
    }, {
        key: "_onGanttViewSelectionChanged",
        value: function(e) {
            this._setTreeListOption("selectedRowKeys", this._getArrayFromOneElement(e.id))
        }
    }, {
        key: "_onGanttViewScroll",
        value: function(e) {
            var treeListScrollable = this._treeList.getScrollable();
            if (treeListScrollable) {
                var diff = e.scrollTop - treeListScrollable.scrollTop();
                if (0 !== diff) {
                    treeListScrollable.scrollBy({
                        left: 0,
                        top: diff
                    })
                }
            }
        }
    }, {
        key: "_onTreeListScroll",
        value: function(treeListScrollView) {
            var ganttViewTaskAreaContainer = this._ganttView.getTaskAreaContainer();
            if (ganttViewTaskAreaContainer.scrollTop !== treeListScrollView.component.scrollTop()) {
                ganttViewTaskAreaContainer.scrollTop = treeListScrollView.component.scrollTop()
            }
        }
    }, {
        key: "_initScrollSync",
        value: function(treeList) {
            var _this2 = this;
            var treeListScrollable = treeList.getScrollable();
            if (treeListScrollable) {
                treeListScrollable.off("scroll");
                treeListScrollable.on("scroll", function(e) {
                    _this2._onTreeListScroll(e)
                })
            }
        }
    }, {
        key: "_getTreeListRowHeight",
        value: function() {
            var $row = this._treeList._$element.find(".dx-data-row");
            var height = $row.length ? $row.last().get(0).getBoundingClientRect().height : GANTT_DEFAULT_ROW_HEIGHT;
            return height ? height : GANTT_DEFAULT_ROW_HEIGHT
        }
    }, {
        key: "_getTreeListHeaderHeight",
        value: function() {
            return this._treeList._$element.find(".dx-treelist-headers").get(0).getBoundingClientRect().height
        }
    }, {
        key: "_setInnerElementsWidth",
        value: function(widths) {
            if (!(0, _window.hasWindow)()) {
                return
            }
            if (!widths) {
                widths = this._getPanelsWidthByOption()
            }
            var leftPanelWidth = widths.leftPanelWidth;
            var rightPanelWidth = widths.rightPanelWidth;
            this._$treeListWrapper.width(leftPanelWidth);
            var isPercentage = _type2.default.isString(leftPanelWidth) && "%" === leftPanelWidth.slice(-1);
            this._$treeList.width(isPercentage ? "100%" : leftPanelWidth);
            this._$ganttView.width(rightPanelWidth);
            this._setGanttViewOption("width", this._$ganttView.width())
        }
    }, {
        key: "_getPanelsWidthByOption",
        value: function() {
            return {
                leftPanelWidth: this.option("taskListWidth"),
                rightPanelWidth: this._$element.width() - this.option("taskListWidth")
            }
        }
    }, {
        key: "_setGanttViewOption",
        value: function(optionName, value) {
            this._ganttView && this._ganttView.option(optionName, value)
        }
    }, {
        key: "_setTreeListOption",
        value: function(optionName, value) {
            this._treeList && this._treeList.option(optionName, value)
        }
    }, {
        key: "_refreshDataSource",
        value: function(name) {
            var _this3 = this;
            var dataOption = this["_".concat(name, "Option")];
            if (dataOption) {
                dataOption._disposeDataSource();
                delete this["_".concat(name, "Option")];
                delete this["_".concat(name)]
            }
            if (this.option("".concat(name, ".dataSource"))) {
                dataOption = new _uiGanttData2.default(name, this._getLoadPanel(), function(name, data) {
                    _this3._dataSourceChanged(name, data)
                });
                dataOption.option("dataSource", this._getSpecificDataSourceOption(name));
                dataOption._refreshDataSource();
                this["_".concat(name, "Option")] = dataOption
            }
        }
    }, {
        key: "_getSpecificDataSourceOption",
        value: function(name) {
            var dataSource = this.option("".concat(name, ".dataSource"));
            if (Array.isArray(dataSource)) {
                return {
                    store: {
                        type: "array",
                        data: dataSource,
                        key: this.option("".concat(name, ".keyExpr"))
                    }
                }
            }
            return dataSource
        }
    }, {
        key: "_compileGettersByOption",
        value: function(optionName) {
            var getters = {};
            var optionValue = this.option(optionName);
            for (var field in optionValue) {
                var exprMatches = field.match(/(\w*)Expr/);
                if (exprMatches) {
                    getters[exprMatches[1]] = _data2.default.compileGetter(optionValue[exprMatches[0]])
                }
            }
            return getters
        }
    }, {
        key: "_compileSettersByOption",
        value: function(optionName) {
            var setters = {};
            var optionValue = this.option(optionName);
            for (var field in optionValue) {
                var exprMatches = field.match(/(\w*)Expr/);
                if (exprMatches) {
                    setters[exprMatches[1]] = _data2.default.compileSetter(optionValue[exprMatches[0]])
                }
            }
            return setters
        }
    }, {
        key: "_getStoreObject",
        value: function(optionName, modelObject) {
            var setters = this._compileSettersByOption(optionName);
            return Object.keys(setters).reduce(function(previous, key) {
                if ("key" !== key) {
                    setters[key](previous, modelObject[key])
                }
                return previous
            }, {})
        }
    }, {
        key: "_prepareMapHandler",
        value: function(getters) {
            return function(data) {
                return Object.keys(getters).reduce(function(previous, key) {
                    var resultKey = "key" === key ? "id" : key;
                    previous[resultKey] = getters[key](data);
                    return previous
                }, {})
            }
        }
    }, {
        key: "_dataSourceChanged",
        value: function(dataSourceName, data) {
            var getters = this._compileGettersByOption(dataSourceName);
            var mappedData = data.map(this._prepareMapHandler(getters));
            this["_".concat(dataSourceName)] = mappedData;
            this._setGanttViewOption(dataSourceName, mappedData);
            if (dataSourceName === GANTT_TASKS) {
                this._tasksRaw = data;
                this._setTreeListOption("dataSource", data)
            }
        }
    }, {
        key: "_createModelChangesListener",
        value: function() {
            var _this4 = this;
            return {
                NotifyTaskCreated: function(task, callback) {
                    _this4._onRecordInserted(GANTT_TASKS, task, callback)
                },
                NotifyTaskRemoved: function(taskId) {
                    _this4._onRecordRemoved(GANTT_TASKS, taskId)
                },
                NotifyTaskTitleChanged: function(taskId, newValue) {
                    _this4._onRecordUpdated(GANTT_TASKS, taskId, "title", newValue)
                },
                NotifyTaskDescriptionChanged: function(taskId, newValue) {
                    _this4._onRecordUpdated(GANTT_TASKS, taskId, "description", newValue)
                },
                NotifyTaskStartChanged: function(taskId, newValue) {
                    _this4._onRecordUpdated(GANTT_TASKS, taskId, "start", newValue)
                },
                NotifyTaskEndChanged: function(taskId, newValue) {
                    _this4._onRecordUpdated(GANTT_TASKS, taskId, "end", newValue)
                },
                NotifyTaskProgressChanged: function(taskId, newValue) {
                    _this4._onRecordUpdated(GANTT_TASKS, taskId, "progress", newValue)
                },
                NotifyDependencyInserted: function(dependency, callback) {
                    _this4._onRecordInserted(GANTT_DEPENDENCIES, dependency, callback)
                },
                NotifyDependencyRemoved: function(dependencyId) {
                    _this4._onRecordRemoved(GANTT_DEPENDENCIES, dependencyId)
                },
                NotifyResourceCreated: function(resource, callback) {
                    _this4._onRecordInserted(GANTT_RESOURCES, resource, callback)
                },
                NotifyResourceRemoved: function(resource) {
                    _this4._onRecordRemoved(GANTT_RESOURCES, resource)
                },
                NotifyResourceAssigned: function(assignment, callback) {
                    _this4._onRecordInserted(GANTT_RESOURCE_ASSIGNMENTS, assignment, callback)
                },
                NotifyResourceUnassigned: function(assignmentId) {
                    _this4._onRecordRemoved(GANTT_RESOURCE_ASSIGNMENTS, assignmentId)
                }
            }
        }
    }, {
        key: "_onRecordInserted",
        value: function(optionName, record, callback) {
            var _this5 = this;
            var dataOption = this["_".concat(optionName, "Option")];
            if (dataOption) {
                var data = this._getStoreObject(optionName, record);
                dataOption.insert(data, function(response) {
                    var keyGetter = _data2.default.compileGetter(_this5.option("".concat(optionName, ".keyExpr")));
                    var insertedId = keyGetter(response);
                    callback(insertedId);
                    if (optionName === GANTT_TASKS) {
                        _this5._updateTreeListDataSource();
                        var parentId = record.parentId;
                        if (void 0 !== parentId) {
                            var expandedRowKeys = _this5._treeList.option("expandedRowKeys");
                            expandedRowKeys.push(parentId);
                            _this5._treeList.option("expandedRowKeys", expandedRowKeys)
                        }
                    }
                })
            }
        }
    }, {
        key: "_onRecordRemoved",
        value: function(optionName, key) {
            var _this6 = this;
            var dataOption = this["_".concat(optionName, "Option")];
            if (dataOption) {
                dataOption.remove(key, function() {
                    if (optionName === GANTT_TASKS) {
                        _this6._updateTreeListDataSource()
                    }
                })
            }
        }
    }, {
        key: "_onRecordUpdated",
        value: function(optionName, key, fieldName, value) {
            var _this7 = this;
            var dataOption = this["_".concat(optionName, "Option")];
            if (dataOption) {
                var setter = _data2.default.compileSetter(this.option("".concat(optionName, ".").concat(fieldName, "Expr")));
                var data = {};
                setter(data, value);
                dataOption.update(key, data, function() {
                    if (optionName === GANTT_TASKS) {
                        _this7._updateTreeListDataSource()
                    }
                })
            }
        }
    }, {
        key: "_updateTreeListDataSource",
        value: function() {
            var storeArray = this._tasksOption._getStore()._array;
            this._setTreeListOption("dataSource", storeArray ? storeArray : this.option("tasks.dataSource"))
        }
    }, {
        key: "_getLoadPanel",
        value: function() {
            if (!this._loadPanel) {
                this._loadPanel = this._createComponent(this._$loadPanel, _load_panel2.default, {
                    position: {
                        of: this.$element()
                    }
                })
            }
            return this._loadPanel
        }
    }, {
        key: "_createSelectionChangedAction",
        value: function() {
            this._selectionChangedAction = this._createActionByOption("onSelectionChanged")
        }
    }, {
        key: "_raiseSelectionChangedAction",
        value: function(selectedRowKey) {
            if (!this._selectionChangedAction) {
                this._createSelectionChangedAction()
            }
            this._selectionChangedAction({
                selectedRowKey: selectedRowKey
            })
        }
    }, {
        key: "_getSelectionMode",
        value: function(allowSelection) {
            return allowSelection ? "single" : "none"
        }
    }, {
        key: "_getArrayFromOneElement",
        value: function(element) {
            return void 0 === element || null === element ? [] : [element]
        }
    }, {
        key: "_getToolbarItems",
        value: function() {
            var items = this.option("toolbar.items");
            return items ? items : []
        }
    }, {
        key: "_updateToolbarContent",
        value: function() {
            var items = this._getToolbarItems();
            if (items.length) {
                this._$toolbarWrapper.show()
            } else {
                this._$toolbarWrapper.hide()
            }
            this._toolbar && this._toolbar.createItems(items);
            this._updateBarItemsState()
        }
    }, {
        key: "_updateBarItemsState",
        value: function() {
            this._ganttView && this._ganttView.updateBarItemsState()
        }
    }, {
        key: "_showDialog",
        value: function(e) {
            if (!this._dialogInstance) {
                this._dialogInstance = new _uiGantt3.GanttDialog(this, this._$dialog)
            }
            this._dialogInstance.show(e.name, e.parameters, e.callback, e.afterClosing, this.option("editing"))
        }
    }, {
        key: "_showPopupMenu",
        value: function(e) {
            this._ganttView.getBarManager().updateContextMenu();
            this._contextMenuBar.show(e.position)
        }
    }, {
        key: "_executeCoreCommand",
        value: function(id) {
            this._ganttView.executeCoreCommand(id)
        }
    }, {
        key: "_clean",
        value: function() {
            delete this._ganttView;
            delete this._dialogInstance;
            _get(_getPrototypeOf(Gantt.prototype), "_clean", this).call(this)
        }
    }, {
        key: "_getDefaultOptions",
        value: function() {
            return (0, _extend.extend)(_get(_getPrototypeOf(Gantt.prototype), "_getDefaultOptions", this).call(this), {
                tasks: {
                    dataSource: null,
                    keyExpr: "id",
                    parentIdExpr: "parentId",
                    startExpr: "start",
                    endExpr: "end",
                    progressExpr: "progress",
                    titleExpr: "title",
                    colorExpr: "color"
                },
                dependencies: {
                    dataSource: null,
                    keyExpr: "id",
                    predecessorIdExpr: "predecessorId",
                    successorIdExpr: "successorId",
                    typeExpr: "type"
                },
                resources: {
                    dataSource: null,
                    keyExpr: "id",
                    textExpr: "text",
                    colorExpr: "color"
                },
                resourceAssignments: {
                    dataSource: null,
                    keyExpr: "id",
                    taskIdExpr: "taskId",
                    resourceIdExpr: "resourceId"
                },
                columns: void 0,
                taskListWidth: 300,
                showResources: true,
                taskTitlePosition: "inside",
                selectedRowKey: void 0,
                onSelectionChanged: null,
                allowSelection: true,
                showRowLines: true,
                stripLines: void 0,
                scaleType: "auto",
                editing: {
                    enabled: false,
                    allowTaskAdding: true,
                    allowTaskDeleting: true,
                    allowTaskUpdating: true,
                    allowDependencyAdding: true,
                    allowDependencyDeleting: true,
                    allowDependencyUpdating: true,
                    allowResourceAdding: true,
                    allowResourceDeleting: true,
                    allowResourceUpdating: true
                },
                validation: {
                    enableDependencyValidation: false,
                    autoUpdateParentTasks: false
                },
                toolbar: null
            })
        }
    }, {
        key: "_optionChanged",
        value: function(args) {
            switch (args.name) {
                case "tasks":
                    this._refreshDataSource(GANTT_TASKS);
                    break;
                case "dependencies":
                    this._refreshDataSource(GANTT_DEPENDENCIES);
                    break;
                case "resources":
                    this._refreshDataSource(GANTT_RESOURCES);
                    break;
                case "resourceAssignments":
                    this._refreshDataSource(GANTT_RESOURCE_ASSIGNMENTS);
                    break;
                case "columns":
                    this._setTreeListOption("columns", this.option(args.name));
                    break;
                case "taskListWidth":
                    this._setInnerElementsWidth();
                    break;
                case "showResources":
                    this._setGanttViewOption("showResources", args.value);
                    break;
                case "taskTitlePosition":
                    this._setGanttViewOption("taskTitlePosition", args.value);
                    break;
                case "selectedRowKey":
                    this._setTreeListOption("selectedRowKeys", this._getArrayFromOneElement(args.value));
                    break;
                case "onSelectionChanged":
                    this._createSelectionChangedAction();
                    break;
                case "allowSelection":
                    this._setTreeListOption("selection.mode", this._getSelectionMode(args.value));
                    this._setGanttViewOption("allowSelection", args.value);
                    break;
                case "showRowLines":
                    this._setTreeListOption("showRowLines", args.value);
                    this._setGanttViewOption("showRowLines", args.value);
                    break;
                case "stripLines":
                    this._setGanttViewOption("stripLines", args.value);
                    break;
                case "scaleType":
                    this._setGanttViewOption("scaleType", args.value);
                    break;
                case "editing":
                    this._setGanttViewOption("editing", this.option(args.name));
                    break;
                case "validation":
                    this._setGanttViewOption("validation", this.option(args.name));
                    break;
                case "toolbar":
                    this._updateToolbarContent();
                    break;
                default:
                    _get(_getPrototypeOf(Gantt.prototype), "_optionChanged", this).call(this, args)
            }
        }
    }]);
    return Gantt
}(_ui2.default);
(0, _component_registrator2.default)("dxGantt", Gantt);
module.exports = Gantt;
