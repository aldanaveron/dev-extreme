/**
 * DevExtreme (viz/funnel/tracker.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var proto = require("./funnel").prototype;
var Tracker = require("../components/tracker").Tracker;
var DATA_KEY_BASE = "__funnel_data_";
var isDefined = require("../../core/utils/type").isDefined;
var dataKeyModifier = 0;
proto._eventsMap.onItemClick = {
    name: "itemClick"
};
proto._eventsMap.onLegendClick = {
    name: "legendClick"
};
exports.plugin = {
    name: "tracker",
    init: function() {
        var that = this;
        var dataKey = DATA_KEY_BASE + dataKeyModifier++;
        var getProxyData = function(e) {
            var rootOffset = that._renderer.getRootOffset();
            var x = Math.floor(e.pageX - rootOffset.left);
            var y = Math.floor(e.pageY - rootOffset.top);
            return that._hitTestTargets(x, y)
        };
        that._tracker = new Tracker({
            widget: that,
            root: that._renderer.root,
            getData: function(e, tooltipData) {
                var target = e.target;
                var data = target[dataKey];
                var proxyData;
                if (isDefined(data)) {
                    return data
                }
                proxyData = getProxyData(e);
                if (tooltipData && proxyData && "inside-label" !== proxyData.type) {
                    return
                }
                return proxyData && proxyData.id
            },
            getNode: function(index) {
                return that._items[index]
            },
            click: function(e) {
                var proxyData = getProxyData(e.event);
                var dataType = proxyData && proxyData.type;
                var event = "legend" === dataType ? "legendClick" : "itemClick";
                that._eventTrigger(event, {
                    item: e.node,
                    event: e.event
                })
            }
        });
        this._dataKey = dataKey
    },
    dispose: function() {
        this._tracker.dispose()
    },
    extenders: {
        _change_TILING: function() {
            var dataKey = this._dataKey;
            this._items.forEach(function(item, index) {
                item.element.data(dataKey, index)
            })
        }
    }
};
