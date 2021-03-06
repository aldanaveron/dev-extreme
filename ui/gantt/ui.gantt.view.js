/**
 * DevExtreme (ui/gantt/ui.gantt.view.js)
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
exports.GanttView = void 0;
var _ui = require("../widget/ui.widget");
var _ui2 = _interopRequireDefault(_ui);
var _gantt_importer = require("./gantt_importer");
var _uiGanttTaskArea = require("./ui.gantt.task.area.container");
var _date = require("../../localization/date");
var _date2 = _interopRequireDefault(_date);

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
var GanttView = exports.GanttView = function(_Widget) {
    _inherits(GanttView, _Widget);
    var _super = _createSuper(GanttView);

    function GanttView() {
        _classCallCheck(this, GanttView);
        return _super.apply(this, arguments)
    }
    _createClass(GanttView, [{
        key: "_init",
        value: function() {
            _get(_getPrototypeOf(GanttView.prototype), "_init", this).call(this);
            this._onSelectionChanged = this._createActionByOption("onSelectionChanged");
            this._onScroll = this._createActionByOption("onScroll");
            this._onDialogShowing = this._createActionByOption("onDialogShowing");
            this._onPopupMenuShowing = this._createActionByOption("onPopupMenuShowing")
        }
    }, {
        key: "_initMarkup",
        value: function() {
            var _getGanttViewCore = (0, _gantt_importer.getGanttViewCore)(),
                GanttView = _getGanttViewCore.GanttView;
            this._ganttViewCore = new GanttView(this.$element().get(0), this, {
                showResources: this.option("showResources"),
                taskTitlePosition: this._getTaskTitlePosition(this.option("taskTitlePosition")),
                allowSelectTask: this.option("allowSelection"),
                editing: this.option("editing"),
                validation: this.option("validation"),
                stripLines: {
                    stripLines: this.option("stripLines")
                },
                areHorizontalBordersEnabled: this.option("showRowLines"),
                areAlternateRowsEnabled: false,
                viewType: this._getViewTypeByScaleType(this.option("scaleType")),
                cultureInfo: this._getCultureInfo()
            });
            this._selectTask(this.option("selectedRowKey"));
            this.updateBarItemsState()
        }
    }, {
        key: "getTaskAreaContainer",
        value: function() {
            return this._ganttViewCore.taskAreaContainer
        }
    }, {
        key: "getBarManager",
        value: function() {
            return this._ganttViewCore.barManager
        }
    }, {
        key: "executeCoreCommand",
        value: function(id) {
            var command = this._ganttViewCore.commandManager.getCommand(id);
            if (command) {
                command.execute()
            }
        }
    }, {
        key: "changeTaskExpanded",
        value: function(id, value) {
            this._ganttViewCore.changeTaskExpanded(id, value)
        }
    }, {
        key: "updateView",
        value: function() {
            this._ganttViewCore.updateView()
        }
    }, {
        key: "updateBarItemsState",
        value: function() {
            this._ganttViewCore.barManager.updateItemsState([])
        }
    }, {
        key: "setWidth",
        value: function(value) {
            this._ganttViewCore.setWidth(value)
        }
    }, {
        key: "_selectTask",
        value: function(id) {
            this._ganttViewCore.selectTaskById(id)
        }
    }, {
        key: "_update",
        value: function() {
            this._ganttViewCore.loadOptionsFromGanttOwner();
            this._ganttViewCore.resetAndUpdate()
        }
    }, {
        key: "_getCultureInfo",
        value: function() {
            return {
                monthNames: _date2.default.getMonthNames("wide"),
                dayNames: _date2.default.getDayNames("wide"),
                abbrMonthNames: _date2.default.getMonthNames("abbreviated"),
                abbrDayNames: _date2.default.getDayNames("abbreviated"),
                quarterNames: _date2.default.getQuarterNames(),
                amText: _date2.default.getPeriodNames()[0],
                pmText: _date2.default.getPeriodNames()[1]
            }
        }
    }, {
        key: "_getTaskTitlePosition",
        value: function(value) {
            switch (value) {
                case "outside":
                    return 1;
                case "none":
                    return 2;
                default:
                    return 0
            }
        }
    }, {
        key: "_getViewTypeByScaleType",
        value: function(scaleType) {
            switch (scaleType) {
                case "minutes":
                    return 0;
                case "hours":
                    return 1;
                case "days":
                    return 3;
                case "weeks":
                    return 4;
                case "months":
                    return 5;
                case "quarters":
                    return 6;
                case "years":
                    return 7;
                default:
                    return
            }
        }
    }, {
        key: "_optionChanged",
        value: function(args) {
            switch (args.name) {
                case "width":
                    _get(_getPrototypeOf(GanttView.prototype), "_optionChanged", this).call(this, args);
                    this._ganttViewCore.setWidth(args.value);
                    break;
                case "tasks":
                case "dependencies":
                case "resources":
                case "resourceAssignments":
                    this._update();
                    break;
                case "showResources":
                    this._ganttViewCore.setShowResources(args.value);
                    break;
                case "taskTitlePosition":
                    this._ganttViewCore.setTaskTitlePosition(this._getTaskTitlePosition(args.value));
                    break;
                case "allowSelection":
                    this._ganttViewCore.setAllowSelection(args.value);
                    break;
                case "selectedRowKey":
                    this._selectTask(args.value);
                    break;
                case "editing":
                    this._ganttViewCore.setEditingSettings(args.value);
                    break;
                case "validation":
                    this._ganttViewCore.setValidationSettings(args.value);
                    break;
                case "showRowLines":
                    this._ganttViewCore.setRowLinesVisible(args.value);
                    break;
                case "scaleType":
                    this._ganttViewCore.setViewType(this._getViewTypeByScaleType(args.value));
                    break;
                case "stripLines":
                    this._ganttViewCore.setStripLines({
                        stripLines: args.value
                    });
                    break;
                default:
                    _get(_getPrototypeOf(GanttView.prototype), "_optionChanged", this).call(this, args)
            }
        }
    }, {
        key: "getRowHeight",
        value: function() {
            return this.option("rowHeight")
        }
    }, {
        key: "getHeaderHeight",
        value: function() {
            return this.option("headerHeight")
        }
    }, {
        key: "getGanttTasksData",
        value: function() {
            return this.option("tasks")
        }
    }, {
        key: "getGanttDependenciesData",
        value: function() {
            return this.option("dependencies")
        }
    }, {
        key: "getGanttResourcesData",
        value: function() {
            return this.option("resources")
        }
    }, {
        key: "getGanttResourceAssignmentsData",
        value: function() {
            return this.option("resourceAssignments")
        }
    }, {
        key: "getGanttWorkTimeRules",
        value: function() {
            return {}
        }
    }, {
        key: "getExternalTaskAreaContainer",
        value: function(element) {
            if (!this._taskAreaContainer) {
                this._taskAreaContainer = new _uiGanttTaskArea.TaskAreaContainer(element, this)
            }
            return this._taskAreaContainer
        }
    }, {
        key: "changeGanttTaskSelection",
        value: function(id, selected) {
            this._onSelectionChanged({
                id: id,
                selected: selected
            })
        }
    }, {
        key: "onGanttScroll",
        value: function(scrollTop) {
            this._onScroll({
                scrollTop: scrollTop
            })
        }
    }, {
        key: "showDialog",
        value: function(name, parameters, callback, afterClosing) {
            this._onDialogShowing({
                name: name,
                parameters: parameters,
                callback: callback,
                afterClosing: afterClosing
            })
        }
    }, {
        key: "getModelChangesListener",
        value: function() {
            return this.option("modelChangesListener")
        }
    }, {
        key: "showPopupMenu",
        value: function(position) {
            this._onPopupMenuShowing({
                position: position
            })
        }
    }, {
        key: "getMainElement",
        value: function() {
            return this.option("mainElement").get(0)
        }
    }, {
        key: "adjustControl",
        value: function() {}
    }, {
        key: "bars",
        get: function() {
            return this.option("bars")
        }
    }]);
    return GanttView
}(_ui2.default);
