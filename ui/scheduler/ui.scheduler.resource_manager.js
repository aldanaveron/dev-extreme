/**
 * DevExtreme (ui/scheduler/ui.scheduler.resource_manager.js)
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
exports.default = void 0;
var _array = require("../../core/utils/array");
var _array2 = _interopRequireDefault(_array);
var _common = require("../../core/utils/common");
var _type = require("../../core/utils/type");
var _object = require("../../core/utils/object");
var _object2 = _interopRequireDefault(_object);
var _iterator = require("../../core/utils/iterator");
var _iterator2 = _interopRequireDefault(_iterator);
var _extend = require("../../core/utils/extend");
var _query = require("../../data/query");
var _query2 = _interopRequireDefault(_query);
var _data = require("../../core/utils/data");
var _data2 = _interopRequireDefault(_data);
var _data_source = require("../../data/data_source/data_source");
var _deferred = require("../../core/utils/deferred");
var _utils = require("../../data/data_source/utils");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
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
var getValueExpr = function(resource) {
    return resource.valueExpr || "id"
};
var getDisplayExpr = function(resource) {
    return resource.displayExpr || "text"
};
var ResourceManager = function() {
    function ResourceManager(resources) {
        _classCallCheck(this, ResourceManager);
        this._resourceLoader = {};
        this.setResources(resources)
    }
    _createClass(ResourceManager, [{
        key: "_wrapDataSource",
        value: function(dataSource) {
            if (dataSource instanceof _data_source.DataSource) {
                return dataSource
            } else {
                return new _data_source.DataSource({
                    store: (0, _utils.normalizeDataSourceOptions)(dataSource).store,
                    pageSize: 0
                })
            }
        }
    }, {
        key: "_mapResourceData",
        value: function(resource, data) {
            var valueGetter = _data2.default.compileGetter(getValueExpr(resource));
            var displayGetter = _data2.default.compileGetter(getDisplayExpr(resource));
            return _iterator2.default.map(data, function(item) {
                var result = {
                    id: valueGetter(item),
                    text: displayGetter(item)
                };
                if (item.color) {
                    result.color = item.color
                }
                return result
            })
        }
    }, {
        key: "_isMultipleResource",
        value: function(resourceField) {
            var result = false;
            _iterator2.default.each(this.getResources(), function(_, resource) {
                var field = this.getField(resource);
                if (field === resourceField) {
                    result = resource.allowMultiple;
                    return false
                }
            }.bind(this));
            return result
        }
    }, {
        key: "getDataAccessors",
        value: function(field, type) {
            var result = null;
            _iterator2.default.each(this._dataAccessors[type], function(accessorName, accessors) {
                if (field === accessorName) {
                    result = accessors;
                    return false
                }
            });
            return result
        }
    }, {
        key: "getField",
        value: function(resource) {
            return resource.fieldExpr || resource.field
        }
    }, {
        key: "setResources",
        value: function(resources) {
            this._resources = resources;
            this._dataAccessors = {
                getter: {},
                setter: {}
            };
            this._resourceFields = _iterator2.default.map(resources || [], function(resource) {
                var field = this.getField(resource);
                this._dataAccessors.getter[field] = _data2.default.compileGetter(field);
                this._dataAccessors.setter[field] = _data2.default.compileSetter(field);
                return field
            }.bind(this))
        }
    }, {
        key: "getResources",
        value: function() {
            return this._resources || []
        }
    }, {
        key: "getResourcesData",
        value: function() {
            return this._resourcesData || []
        }
    }, {
        key: "getEditors",
        value: function() {
            var result = [];
            var that = this;
            _iterator2.default.each(this.getResources(), function(i, resource) {
                var field = that.getField(resource);
                var currentResourceItems = that._getResourceDataByField(field);
                result.push({
                    editorOptions: {
                        dataSource: currentResourceItems.length ? currentResourceItems : that._wrapDataSource(resource.dataSource),
                        displayExpr: getDisplayExpr(resource),
                        valueExpr: getValueExpr(resource)
                    },
                    dataField: field,
                    editorType: resource.allowMultiple ? "dxTagBox" : "dxSelectBox",
                    label: {
                        text: resource.label || field
                    }
                })
            });
            return result
        }
    }, {
        key: "getResourceDataByValue",
        value: function(field, value) {
            var that = this;
            var result = new _deferred.Deferred;
            _iterator2.default.each(this.getResources(), function(_, resource) {
                var resourceField = that.getField(resource);
                if (resourceField === field) {
                    var dataSource = that._wrapDataSource(resource.dataSource);
                    var valueExpr = getValueExpr(resource);
                    if (!that._resourceLoader[field]) {
                        that._resourceLoader[field] = dataSource.load()
                    }
                    that._resourceLoader[field].done(function(data) {
                        var filteredData = (0, _query2.default)(data).filter(valueExpr, value).toArray();
                        delete that._resourceLoader[field];
                        result.resolve(filteredData[0])
                    }).fail(function() {
                        delete that._resourceLoader[field];
                        result.reject()
                    });
                    return false
                }
            });
            return result.promise()
        }
    }, {
        key: "setResourcesToItem",
        value: function(itemData, resources) {
            var resourcesSetter = this._dataAccessors.setter;
            for (var name in resources) {
                if (Object.prototype.hasOwnProperty.call(resources, name)) {
                    var resourceData = resources[name];
                    resourcesSetter[name](itemData, this._isMultipleResource(name) ? _array2.default.wrapToArray(resourceData) : resourceData)
                }
            }
        }
    }, {
        key: "getResourcesFromItem",
        value: function(itemData, wrapOnlyMultipleResources) {
            var _this = this;
            var result = null;
            if (!(0, _type.isDefined)(wrapOnlyMultipleResources)) {
                wrapOnlyMultipleResources = false
            }
            this._resourceFields.forEach(function(field) {
                _iterator2.default.each(itemData, function(fieldName, fieldValue) {
                    var tempObject = {};
                    tempObject[fieldName] = fieldValue;
                    var resourceData = _this.getDataAccessors(field, "getter")(tempObject);
                    if ((0, _type.isDefined)(resourceData)) {
                        if (!result) {
                            result = {}
                        }
                        if (1 === resourceData.length) {
                            resourceData = resourceData[0]
                        }
                        if (!wrapOnlyMultipleResources || wrapOnlyMultipleResources && _this._isMultipleResource(field)) {
                            _this.getDataAccessors(field, "setter")(tempObject, _array2.default.wrapToArray(resourceData))
                        } else {
                            _this.getDataAccessors(field, "setter")(tempObject, resourceData)
                        }(0, _extend.extend)(result, tempObject);
                        return true
                    }
                })
            });
            return result
        }
    }, {
        key: "loadResources",
        value: function(groups) {
            var result = new _deferred.Deferred;
            var that = this;
            var deferreds = [];
            _iterator2.default.each(this.getResourcesByFields(groups), function(i, resource) {
                var deferred = new _deferred.Deferred;
                var field = that.getField(resource);
                deferreds.push(deferred);
                that._wrapDataSource(resource.dataSource).load().done(function(data) {
                    deferred.resolve({
                        name: field,
                        items: that._mapResourceData(resource, data),
                        data: data
                    })
                }).fail(function() {
                    deferred.reject()
                })
            });
            if (!deferreds.length) {
                that._resourcesData = [];
                return result.resolve([])
            }
            _deferred.when.apply(null, deferreds).done(function() {
                var data = Array.prototype.slice.call(arguments);
                var mapFunction = function(obj) {
                    return {
                        name: obj.name,
                        items: obj.items,
                        data: obj.data
                    }
                };
                that._resourcesData = data;
                result.resolve(data.map(mapFunction))
            }).fail(function() {
                result.reject()
            });
            return result.promise()
        }
    }, {
        key: "getResourcesByFields",
        value: function(fields) {
            return (0, _common.grep)(this.getResources(), function(resource) {
                var field = this.getField(resource);
                return (0, _array.inArray)(field, fields) > -1
            }.bind(this))
        }
    }, {
        key: "getResourceByField",
        value: function(field) {
            return this.getResourcesByFields([field])[0] || {}
        }
    }, {
        key: "getResourceColor",
        value: function(field, value) {
            var valueExpr = this.getResourceByField(field).valueExpr || "id";
            var valueGetter = _data2.default.compileGetter(valueExpr);
            var colorExpr = this.getResourceByField(field).colorExpr || "color";
            var colorGetter = _data2.default.compileGetter(colorExpr);
            var result = new _deferred.Deferred;
            var resourceData = this._getResourceDataByField(field);
            var resourceDataLength = resourceData.length;
            var color;
            if (resourceDataLength) {
                for (var i = 0; i < resourceDataLength; i++) {
                    if (valueGetter(resourceData[i]) === value) {
                        color = colorGetter(resourceData[i]);
                        break
                    }
                }
                result.resolve(color)
            } else {
                this.getResourceDataByValue(field, value).done(function(resourceData) {
                    if (resourceData) {
                        color = colorGetter(resourceData)
                    }
                    result.resolve(color)
                }).fail(function() {
                    result.reject()
                })
            }
            return result.promise()
        }
    }, {
        key: "getResourceForPainting",
        value: function(groups) {
            var resources = this.getResources();
            var result;
            _iterator2.default.each(resources, function(index, resource) {
                if (resource.useColorAsDefault) {
                    result = resource;
                    return false
                }
            });
            if (!result) {
                if (Array.isArray(groups) && groups.length) {
                    resources = this.getResourcesByFields(groups)
                }
                result = resources[resources.length - 1]
            }
            return result
        }
    }, {
        key: "createResourcesTree",
        value: function(groups) {
            var leafIndex = 0;
            var groupIndex = groupIndex || 0;

            function make(group, groupIndex, result, parent) {
                result = result || [];
                for (var i = 0; i < group.items.length; i++) {
                    var currentGroupItem = group.items[i];
                    var resultItem = {
                        name: group.name,
                        value: currentGroupItem.id,
                        title: currentGroupItem.text,
                        data: group.data && group.data[i],
                        children: [],
                        parent: parent ? parent : null
                    };
                    result.push(resultItem);
                    var nextGroupIndex = groupIndex + 1;
                    if (groups[nextGroupIndex]) {
                        make.call(this, groups[nextGroupIndex], nextGroupIndex, resultItem.children, resultItem)
                    }
                    if (!resultItem.children.length) {
                        resultItem.leafIndex = leafIndex;
                        leafIndex++
                    }
                }
                return result
            }
            return make.call(this, groups[0], 0)
        }
    }, {
        key: "_hasGroupItem",
        value: function(appointmentResources, groupName, itemValue) {
            var group = this.getDataAccessors(groupName, "getter")(appointmentResources);
            if (group) {
                if ((0, _array.inArray)(itemValue, group) > -1) {
                    return true
                }
            }
            return false
        }
    }, {
        key: "_getResourceDataByField",
        value: function(fieldName) {
            var loadedResources = this.getResourcesData();
            var currentResourceData = [];
            for (var i = 0, resourceCount = loadedResources.length; i < resourceCount; i++) {
                if (loadedResources[i].name === fieldName) {
                    currentResourceData = loadedResources[i].data;
                    break
                }
            }
            return currentResourceData
        }
    }, {
        key: "getResourceTreeLeaves",
        value: function(tree, appointmentResources, result) {
            result = result || [];
            for (var i = 0; i < tree.length; i++) {
                if (!this._hasGroupItem(appointmentResources, tree[i].name, tree[i].value)) {
                    continue
                }
                if ((0, _type.isDefined)(tree[i].leafIndex)) {
                    result.push(tree[i].leafIndex)
                }
                if (tree[i].children) {
                    this.getResourceTreeLeaves(tree[i].children, appointmentResources, result)
                }
            }
            return result
        }
    }, {
        key: "groupAppointmentsByResources",
        value: function(appointments, resources) {
            var tree = this.createResourcesTree(resources);
            var result = {};
            _iterator2.default.each(appointments, function(_, appointment) {
                var appointmentResources = this.getResourcesFromItem(appointment);
                var treeLeaves = this.getResourceTreeLeaves(tree, appointmentResources);
                for (var i = 0; i < treeLeaves.length; i++) {
                    if (!result[treeLeaves[i]]) {
                        result[treeLeaves[i]] = []
                    }
                    result[treeLeaves[i]].push(_object2.default.deepExtendArraySafe({}, appointment, true))
                }
            }.bind(this));
            return result
        }
    }, {
        key: "reduceResourcesTree",
        value: function(tree, existingAppointments, _result) {
            _result = _result ? _result.children : [];
            var that = this;
            tree.forEach(function(node, index) {
                var ok = false;
                var resourceName = node.name;
                var resourceValue = node.value;
                var resourceTitle = node.title;
                var resourceData = node.data;
                var resourceGetter = that.getDataAccessors(resourceName, "getter");
                existingAppointments.forEach(function(appointment) {
                    if (!ok) {
                        var resourceFromAppointment = resourceGetter(appointment);
                        if (Array.isArray(resourceFromAppointment)) {
                            if (resourceFromAppointment.indexOf(resourceValue) > -1) {
                                _result.push({
                                    name: resourceName,
                                    value: resourceValue,
                                    title: resourceTitle,
                                    data: resourceData,
                                    children: []
                                });
                                ok = true
                            }
                        } else {
                            if (resourceFromAppointment === resourceValue) {
                                _result.push({
                                    name: resourceName,
                                    value: resourceValue,
                                    title: resourceTitle,
                                    data: resourceData,
                                    children: []
                                });
                                ok = true
                            }
                        }
                    }
                });
                if (ok && node.children && node.children.length) {
                    that.reduceResourcesTree(node.children, existingAppointments, _result[index])
                }
            });
            return _result
        }
    }]);
    return ResourceManager
}();
exports.default = ResourceManager;
